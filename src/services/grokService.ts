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
}

export class GrokService {
  /**
   * Retrieves the current configuration from environment variables.
   * Reads GROK_API_KEY (with fallback to XAI_API_KEY or LLM_API_KEY)
   * and GROK_MODEL (defaulting to 'grok-2-latest').
   */
  public static getConfig(): GrokServiceConfig {
    const apiKey = (
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY ||
      process.env.LLM_API_KEY ||
      ''
    ).trim();

    const model = (
      process.env.GROK_MODEL ||
      process.env.LLM_MODEL ||
      'grok-2-latest'
    ).trim();

    const baseUrl = (
      process.env.GROK_API_BASE_URL ||
      process.env.LLM_API_URL ||
      'https://api.x.ai/v1/chat/completions'
    ).trim();

    return {
      apiKey: apiKey || null,
      model,
      baseUrl,
      isConfigured: Boolean(apiKey && apiKey.length > 0),
    };
  }

  /**
   * Checks if the Grok API is ready to accept requests.
   */
  public static isAvailable(): boolean {
    return this.getConfig().isConfigured;
  }

  /**
   * Dispatches a chat completion request to the Grok API endpoint.
   */
  public static async generateChat(options: GrokChatOptions): Promise<GrokChatResponse> {
    const config = this.getConfig();

    if (!config.apiKey) {
      return {
        success: false,
        text: '',
        model: config.model,
        source: 'xAI Grok Service',
        error: 'GROK_API_KEY is not configured in the server environment.',
      };
    }

    const targetModel = options.model || config.model;
    const temperature = typeof options.temperature === 'number' ? options.temperature : 0.6;
    const maxTokens = options.maxTokens || 2048;
    const timeoutMs = options.timeoutMs || 30000;

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
        source: 'xAI Grok Service',
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
        console.warn(`[GrokService] HTTP ${response.status} Error:`, errorBody);
        return {
          success: false,
          text: '',
          model: targetModel,
          source: 'xAI Grok Service',
          error: `Grok API error (HTTP ${response.status}): ${errorBody.slice(0, 300)}`,
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
          source: `Grok AI (${json?.model || targetModel}) · xAI Engine`,
          error: 'Empty response payload received from Grok API.',
        };
      }

      return {
        success: true,
        text: replyContent.trim(),
        model: json?.model || targetModel,
        source: `Grok AI (${json?.model || targetModel}) · xAI Engine`,
        finishReason: choice?.finish_reason,
        usage: json?.usage ? {
          promptTokens: json.usage.prompt_tokens,
          completionTokens: json.usage.completion_tokens,
          totalTokens: json.usage.total_tokens,
        } : undefined,
      };
    } catch (err: any) {
      const isAbort = err?.name === 'AbortError';
      const errMsg = isAbort ? `Grok request timed out after ${timeoutMs}ms` : (err?.message || String(err));
      console.warn('[GrokService] Request Exception:', errMsg);

      return {
        success: false,
        text: '',
        model: targetModel,
        source: 'xAI Grok Service',
        error: errMsg,
      };
    }
  }

  /**
   * System Prompt Formatter for HealthGPT Clinical Doctor Persona
   */
  public static getDoctorSystemPrompt(prescriptionContext?: string): string {
    let base = `You are HealthGPT Doctor AI, an advanced clinical healthcare intelligence assistant.
Provide clear, structured, evidence-based health guidance using markdown bold, bullet points, and practical lifestyle advice.
Maintain a calm, reassuring, and professional medical tone.
Always include appropriate medical disclaimers and recommend consulting a licensed medical professional for personal diagnoses or prescriptions.`;

    if (prescriptionContext) {
      base += `\n\nPrescription context provided by the patient:\n${prescriptionContext}\nExplain medication purposes, dosage guidelines, food interactions, precautions, and side effect profiles clearly in patient-friendly terms.`;
    }

    return base;
  }

  /**
   * System Prompt Formatter for HealthGPT AI Therapist & Mental Wellness Persona
   */
  public static getTherapistSystemPrompt(): string {
    return `You are the HealthGPT Wellness Companion & AI Therapist. You provide warm, compassionate, empathetic, and evidence-informed mental health and emotional wellness support.
Use calm formatting with markdown bold and bullet points. Never diagnose mental illnesses or prescribe pharmaceuticals. If severe self-harm or crisis is detected, immediately provide international crisis helpline resources.`;
  }

  /**
   * System Prompt Formatter for HealthGPT Gynecological & Menstrual Health Persona
   */
  public static getGynecologySystemPrompt(): string {
    return `You are the HealthGPT Specialized Gynecological & Menstrual Health AI Specialist.
Provide structured, compassionate, and clinically grounded responses for menstrual health, hormone balance, and fertility inquiry.
Include:
1. Direct Explanation & Biological mechanism (in simple reassuring terms)
2. Practical Evidence-Based Relief (Diet, hydration, thermal therapy, supplements like magnesium/ginger)
3. Cycle-Phase Synchronization Tips
4. Red Flags / When to consult a gynecologist (e.g. severe pelvic pain, bleeding >7 days)`;
  }
}
