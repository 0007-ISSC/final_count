/**
 * Grok API Service Layer
 * HealthGPT Backend Intelligence Engine
 *
 * Provides structured routing, error handling, persona framing,
 * and retry logic for xAI's Grok API via environment variables.
 */

export interface GrokMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GrokChatOptions {
  systemInstruction?: string;
  userPrompt?: string;
  messages?: GrokMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface GrokChatResponse {
  success: boolean;
  text: string;
  model: string;
  source: string;
  finishReason?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

export interface GrokServiceConfig {
  apiKey: string | null;
  model: string;
  baseUrl: string;
  isConfigured: boolean;
  provider: 'xai' | 'groq' | 'openai' | 'generic';
}

function isNonEmptyRealKey(key?: string | null): boolean {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (trimmed.length < 8) return false;
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('your ') ||
    lower.startsWith('your_') ||
    lower.startsWith('your-') ||
    lower.startsWith('same ') ||
    lower.startsWith('api key') ||
    lower.startsWith('replace_') ||
    lower.startsWith('placeholder') ||
    lower.startsWith('todo') ||
    lower.includes('your-api-key') ||
    lower.includes('your_api_key') ||
    lower.includes('api_key_here') ||
    lower.includes('example') ||
    lower.includes('dummy') ||
    lower.startsWith('<')
  ) {
    return false;
  }
  return true;
}

function normalizeChatCompletionsUrl(rawUrl: string, detectedProvider: string): string {
  let url = (rawUrl || '').trim();
  if (!url) {
    if (detectedProvider === 'groq') {
      return 'https://api.groq.com/openai/v1/chat/completions';
    }
    if (detectedProvider === 'openai') {
      return 'https://api.openai.com/v1/chat/completions';
    }
    return 'https://api.x.ai/v1/chat/completions';
  }

  // Strip trailing slashes
  while (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  // If it already ends with /chat/completions, return as-is
  if (url.endsWith('/chat/completions')) {
    return url;
  }

  // If it ends with /v1, append /chat/completions
  if (url.endsWith('/v1')) {
    return `${url}/chat/completions`;
  }

  // Handle provider host without path
  if (url.includes('api.groq.com') && !url.includes('/openai/v1')) {
    return `${url}/openai/v1/chat/completions`;
  }
  if (url.includes('api.x.ai') && !url.includes('/v1')) {
    return `${url}/v1/chat/completions`;
  }
  if (url.includes('api.openai.com') && !url.includes('/v1')) {
    return `${url}/v1/chat/completions`;
  }

  return `${url}/chat/completions`;
}

export class GrokService {
  /**
   * Retrieves the current configuration from environment variables.
   * Reads GROK_API_KEY (with fallback to XAI_API_KEY, GROQ_API_KEY, or LLM_API_KEY)
   * and automatically normalizes endpoint URLs for xAI, Groq, or OpenAI-compatible backends.
   */
  public static getConfig(): GrokServiceConfig {
    const rawApiKey = (
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY ||
      process.env.GROQ_API_KEY ||
      process.env.LLM_API_KEY ||
      ''
    ).trim();

    const isRealKey = isNonEmptyRealKey(rawApiKey);
    const rawUrl = (
      process.env.GROK_API_BASE_URL ||
      process.env.LLM_API_URL ||
      process.env.LLM_BASE_URL ||
      ''
    ).trim();

    // Detect provider
    let provider: 'xai' | 'groq' | 'openai' | 'generic' = 'xai';
    if (rawApiKey.startsWith('gsk_') || rawUrl.includes('groq.com') || process.env.GROQ_API_KEY) {
      provider = 'groq';
    } else if (rawApiKey.startsWith('sk-') || rawUrl.includes('openai.com')) {
      provider = 'openai';
    } else if (rawApiKey.startsWith('xai-') || rawUrl.includes('x.ai')) {
      provider = 'xai';
    } else if (rawUrl) {
      provider = 'generic';
    }

    const normalizedUrl = normalizeChatCompletionsUrl(rawUrl, provider);

    let defaultModel = 'grok-2-latest';
    if (provider === 'groq') {
      defaultModel = 'llama-3.3-70b-versatile';
    } else if (provider === 'openai') {
      defaultModel = 'gpt-4o-mini';
    }

    let model = (
      process.env.GROK_MODEL ||
      process.env.LLM_MODEL ||
      process.env.GROQ_MODEL ||
      defaultModel
    ).trim();

    // If target is Groq but model is set to a Grok model, adapt to a high-speed Groq model
    if (provider === 'groq' && (model.startsWith('grok-') || !model)) {
      model = process.env.LLM_MODEL || 'llama-3.3-70b-versatile';
    }

    return {
      apiKey: isRealKey ? rawApiKey : null,
      model,
      baseUrl: normalizedUrl,
      isConfigured: isRealKey,
      provider,
    };
  }

  /**
   * Checks if the Grok/LLM API is ready to accept requests.
   */
  public static isAvailable(): boolean {
    return this.getConfig().isConfigured;
  }

  /**
   * Dispatches a chat completion request to the Grok / OpenAI-compatible API endpoint.
   */
  public static async generateChat(options: GrokChatOptions): Promise<GrokChatResponse> {
    const config = this.getConfig();

    if (!config.apiKey) {
      return {
        success: false,
        text: '',
        model: config.model,
        source: config.provider === 'groq' ? 'Groq AI' : 'xAI Grok Service',
        error: 'No valid LLM API key configured in server environment.',
      };
    }

    const targetModel = options.model || config.model;
    const temperature = typeof options.temperature === 'number' ? options.temperature : 0.6;
    const maxTokens = options.maxTokens || 2048;
    const timeoutMs = options.timeoutMs || 25000;

    // Assemble messages array
    const messages: GrokMessage[] = [];

    if (options.messages && options.messages.length > 0) {
      messages.push(...options.messages);
    } else {
      if (options.systemInstruction) {
        messages.push({ role: 'system', content: options.systemInstruction });
      }
      if (options.userPrompt) {
        messages.push({ role: 'user', content: options.userPrompt });
      }
    }

    if (messages.length === 0) {
      return {
        success: false,
        text: '',
        model: targetModel,
        source: config.provider === 'groq' ? 'Groq AI' : 'xAI Grok Service',
        error: 'No prompt or messages provided to Grok API.',
      };
    }

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const requestPayload = {
        model: targetModel,
        messages,
        temperature,
        max_tokens: maxTokens,
      };

      const response = await fetch(config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.warn(`[GrokService] HTTP ${response.status} Error (${config.baseUrl}):`, errorBody);
        return {
          success: false,
          text: '',
          model: targetModel,
          source: config.provider === 'groq' ? 'Groq AI' : 'xAI Grok Service',
          error: `API error (HTTP ${response.status}): ${errorBody.slice(0, 300)}`,
        };
      }

      const json = await response.json() as any;
      const choice = json?.choices?.[0];
      const replyContent = choice?.message?.content;

      if (!replyContent || typeof replyContent !== 'string') {
        return {
          success: false,
          text: '',
          model: json?.model || targetModel,
          source: config.provider === 'groq' ? `Groq AI (${json?.model || targetModel})` : `Grok AI (${json?.model || targetModel}) · xAI Engine`,
          error: 'Empty response payload received from API.',
        };
      }

      return {
        success: true,
        text: replyContent.trim(),
        model: json?.model || targetModel,
        source: config.provider === 'groq' ? `Groq AI (${json?.model || targetModel})` : `Grok AI (${json?.model || targetModel}) · xAI Engine`,
        finishReason: choice?.finish_reason,
        usage: json?.usage ? {
          promptTokens: json.usage.prompt_tokens,
          completionTokens: json.usage.completion_tokens,
          totalTokens: json.usage.total_tokens,
        } : undefined,
      };
    } catch (err: any) {
      const isAbort = err?.name === 'AbortError';
      const errMsg = isAbort ? `Request timed out after ${timeoutMs}ms` : (err?.message || String(err));
      console.warn('[GrokService] Request Exception:', errMsg);

      return {
        success: false,
        text: '',
        model: targetModel,
        source: config.provider === 'groq' ? 'Groq AI' : 'xAI Grok Service',
        error: errMsg,
      };
    }
  }

  /**
   * System Prompt Formatter for Clinical Doctor Persona (Dr. Nambi)
   */
  public static getDoctorSystemPrompt(prescriptionContext?: string): string {
    let base = `You are Dr. Nambi, a world-class, caring, and friendly Chief Medical Doctor.
You are having a direct, spoken voice conversation with your patient.

MANDATORY VOICE & CONVERSATION RULES:
- NAME: Introduce or refer to yourself as Dr. Nambi.
- SWEET & CRISP: Keep your response short, punchy, sweet, and crisp (maximum 2 to 4 conversational sentences or 2 short bullet points). NEVER write huge essays or walls of text!
- NATURAL SPOKEN TONE: Speak warmly, naturally, and reassurance-first, exactly like an attentive doctor talking directly to a patient across the consultation desk or on a phone call.
- INTERACTIVE: Always conclude with one warm, relevant follow-up question so the patient can speak back to you naturally.
- MULTILINGUAL: If the patient speaks in another language (Hindi, Telugu, Tamil, Spanish, French, etc.), reply naturally and warmly in that exact language.
- NO ROBOTIC DISCLAIMERS: Do not end with canned legal AI disclaimers; stay in character as Dr. Nambi.`;

    if (prescriptionContext) {
      base += `\n\nPrescription context provided by the patient:\n${prescriptionContext}\nBriefly explain the medicine's key purpose, meal timing, and one key precaution in 2-3 sweet, clear sentences.`;
    }

    return base;
  }

  /**
   * System Prompt Formatter for AI Therapist Persona (Alex)
   */
  public static getTherapistSystemPrompt(): string {
    return `You are Alex, a gentle, deeply empathetic, and soothing AI Therapist & Mindful Wellness Guide.
You are having a direct, spoken voice conversation with the user.

MANDATORY VOICE & CONVERSATION RULES:
- NAME: Introduce or refer to yourself as Alex.
- SWEET & CRISP: Keep your response short, comforting, sweet, and crisp (maximum 2 to 4 soothing sentences). DO NOT write lengthy textbook lectures!
- NATURAL SPOKEN TONE: Speak with a calm, validating, and grounding voice as if in a quiet, cozy room together.
- INTERACTIVE: Validate their feeling warmly, offer one quick calming micro-action (like taking one deep breath or releasing tight shoulders), and ask one gentle, caring question to let them share more.
- MULTILINGUAL: Fluently and warmly respond in whatever language the user speaks.
- SAFETY: In any crisis or self-harm mention, warmly provide immediate crisis helpline numbers (e.g., US 988, UK 111, India 9152987821) with deep compassion.`;
  }

  /**
   * System Prompt Formatter for HealthGPT Clinical Pharmacist Persona
   */
  public static getPharmacistSystemPrompt(prescriptionContext?: string): string {
    let base = `You are PharmAI, a friendly, interactive clinical pharmacology and medication safety specialist.
You explain medications, active chemical salts, drug interactions, food pairings, and dosage schedules in warm, clear, and reassuring language.

MULTILINGUAL: Understands and fluently answers in ANY global or regional language.
FORMATTING: Clean bullet points, bold key terms, meal timing advice (before/with/after food), and helpful safety tips without dense medical jargon.
CRITICAL: No oversized boilerplate disclaimers at the end.`;
    if (prescriptionContext) {
      base += `\n\nScanned Patient Prescription Context:\n${prescriptionContext}\nReview all medications for safety, interactions, and clear dosage instructions.`;
    }
    return base;
  }

  /**
   * System Prompt Formatter for HealthGPT Clinical Nutritionist & Dietitian Persona
   */
  public static getNutritionistSystemPrompt(): string {
    return `You are HealthGPT Clinical Dietitian, a friendly, motivating, and interactive nutrition and metabolic coach.
You provide culturally adaptive (Indian and global), delicious, and evidence-based dietary recommendations.

MULTILINGUAL: Fully fluent in ANY language worldwide.
FORMATTING:
1. 🥗 **Nutritional Strategy & Macro Balance**
2. 🩸 **Metabolic & Energy Impact**
3. 📋 **Sample Meal Blueprint** (Breakfast, Lunch, Dinner & Snacks)
4. 💧 **Hydration & Practical Habits**
5. 💬 **Interactive Question** (Ask about their favorite foods or daily routine)
CRITICAL: Keep it inspiring, interactive, and free of bulky disclaimer footers.`;
  }

  /**
   * System Prompt Formatter for HealthGPT Pediatric & Family Health Persona
   */
  public static getPediatricSystemPrompt(): string {
    return `You are Dr. Sophie, an ultra-friendly, reassuring, and gentle Pediatric & Family Health Specialist.
You provide loving, patient-friendly guidance on child health, fevers, feeding, developmental stages, and common childhood illnesses.

MULTILINGUAL: Fluent in any language.
TONE: Warm, comforting for worried parents, encouraging, and clear. Highlight gentle home comfort measures and red-flag symptoms for pediatric clinic visits.
CRITICAL: No large disclaimer walls at the end.`;
  }

  /**
   * System Prompt Formatter for HealthGPT Longevity, Sleep & Performance Coach Persona
   */
  public static getLongevitySystemPrompt(): string {
    return `You are HealthGPT Longevity & Performance Coach, a friendly, energizing, and interactive health optimization guide.
You provide practical protocols for deep restorative sleep, HRV recovery, circadian rhythm synchronization, and sustainable daily energy.

MULTILINGUAL: Speaks and understands any language fluently.
FORMAT: Actionable bullet points, morning/evening protocols, and inspiring habit steps.
CRITICAL: No oversized disclaimers.`;
  }

  /**
   * System Prompt Formatter for HealthGPT Gynecological & Menstrual Health Persona
   */
  public static getGynecologySystemPrompt(): string {
    return `You are the HealthGPT Women's Health & Cycle AI Specialist, a warm, supportive, and interactive guide for menstrual wellness, cycle tracking, hormonal health, and fertility understanding.

MULTILINGUAL: Fully bilingual and multilingual across all languages.
TONE: Empathetic, respectful, clear, and reassuring. Offer practical comfort steps (nutrition, thermal relief, cycle phase alignment) and gentle guidance on when to consult a gynecologist.
CRITICAL: Keep responses clean, friendly, and without bulky disclaimer footers.`;
  }
}
