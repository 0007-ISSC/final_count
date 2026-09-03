/**
 * LLM Dispatcher & Routing Service
 * HealthGPT Multi-Model Architecture
 *
 * Routes requests dynamically across xAI Grok, Google Gemini,
 * or fallback local clinical algorithms based on user preference and environment credentials.
 */

import { GoogleGenAI } from '@google/genai';
import { GrokService } from './grokService.ts';

export interface LLMCompletionResult {
  text: string;
  source: string;
  engine: 'grok' | 'gemini' | 'local';
  model: string;
  finishReason?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMRequestOptions {
  systemInstruction: string;
  userPrompt: string;
  preferredEngine?: 'auto' | 'grok' | 'gemini' | string;
  temperature?: number;
  maxTokens?: number;
  prescriptionContext?: string;
}

export const HEALTHGPT_MEDICINE_AI_SYSTEM_PROMPT = `
You are HealthGPT Medicine AI, an advanced, highly interactive clinical pharmacology and medication intelligence assistant.

Your role is to provide engaging, ultra-clear, structured, and actionable information about medicines, chemical salts, mechanisms, safety, and generic alternatives.

STYLE & FORMATTING GUIDELINES:
- Structure your response cleanly using markdown bolding, clear sections, bullet points, and concise key takeaways.
- Provide practical, direct insights:
  1. 🔬 **Active Chemical Salt & Class**: Primary molecule, drug class, and therapeutic category.
  2. 🩺 **Primary Uses & Mechanism**: What it does in the body in plain, clear language.
  3. ⏱️ **Standard Dosage & Timing Rules**: Administration schedule (before/with/after food) and water intake.
  4. ⚠️ **Common Side Effects & Precautions**: Mild vs. notable reactions and key organ considerations (liver/kidney).
  5. 🥗 **Dietary & Food Interactions**: Specific foods/drinks to avoid (e.g. alcohol, grapefruit, dairy chelation).
  6. 💰 **Jan Aushadhi Generic Equivalents**: Cost-effective generic options and approximate Indian market savings.
- Keep the tone lively, helpful, and interactive.
- DO NOT append repetitive legal disclaimers, caution footers, or boilerplate disclaimer warnings at the end of your response. Give the user direct, engaging, and high-value pharmacological guidance.
`;

let genAIClient: GoogleGenAI | null = null;

export function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.HEALTHGPT_MEDICINE_AI || process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

/**
 * Returns prioritized Gemini model candidates to handle spikes in demand (503)
 * or rate limits (429) gracefully without failing user requests.
 */
export function getGeminiCandidateModels(): string[] {
  const custom = process.env.GEMINI_MODEL?.trim();
  const candidates = [
    custom,
    'gemini-3.8-flash',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
  ].filter(Boolean) as string[];

  // Deduplicate preserving priority order
  return Array.from(new Set(candidates));
}

export interface MedicineGroundingSource {
  title: string;
  url: string;
  sourceType?: string;
}

export interface MedicineAIResult {
  text: string;
  model: string;
  source: string;
  searchGrounded: boolean;
  groundingSources?: MedicineGroundingSource[];
  searchQueries?: string[];
}

export async function callMedicineAIService(
  userPrompt: string,
  history: string[] = []
): Promise<MedicineAIResult | null> {
  const ai = getGenAIClient();
  if (!ai) return null;

  const recentConversation = history.slice(-10).join('\n');
  const fullPrompt = `
${HEALTHGPT_MEDICINE_AI_SYSTEM_PROMPT}

${recentConversation ? `Previous conversation:\n${recentConversation}\n` : ''}
User's latest question:
${userPrompt}

Use Google Search grounding to retrieve verified, up-to-date medical guidelines, clinical trials, FDA/CDSCO alerts, and drug interaction warnings for the specific medication or query.
Respond naturally, clearly, and directly.
`;

  const candidateModels = getGeminiCandidateModels();

  for (const model of candidateModels) {
    try {
      let response: any = null;
      let searchGrounded = false;
      const groundingSources: MedicineGroundingSource[] = [];
      const searchQueries: string[] = [];

      try {
        response = await ai.models.generateContent({
          model,
          contents: fullPrompt,
          config: {
            tools: [{ googleSearch: {} }],
            temperature: 0.3,
          },
        });
        searchGrounded = true;
      } catch (groundingErr: any) {
        console.warn(`[MedicineAIService] Search Grounding fallback on ${model}:`, groundingErr?.message || groundingErr);
        // Fallback without search tool on this model
        response = await ai.models.generateContent({
          model,
          contents: fullPrompt,
          config: {
            temperature: 0.4,
          },
        });
      }

      if (response && response.text) {
        // Extract Google Search grounding metadata if available
        try {
          const candidate = response.candidates?.[0];
          const groundingMetadata = candidate?.groundingMetadata;

          if (groundingMetadata) {
            if (Array.isArray(groundingMetadata.webSearchQueries)) {
              searchQueries.push(...groundingMetadata.webSearchQueries);
            }

            if (Array.isArray(groundingMetadata.groundingChunks)) {
              const seenUrls = new Set<string>();
              for (const chunk of groundingMetadata.groundingChunks) {
                const uri = chunk.web?.uri;
                const title = chunk.web?.title || 'Verified Medical Reference';
                if (uri && !seenUrls.has(uri)) {
                  seenUrls.add(uri);
                  let sourceType = 'Medical Reference';
                  const lowerUri = uri.toLowerCase();
                  if (lowerUri.includes('fda.gov')) sourceType = 'FDA Official';
                  else if (lowerUri.includes('cdsco.gov') || lowerUri.includes('mohfw')) sourceType = 'CDSCO / MoHFW India';
                  else if (lowerUri.includes('nih.gov') || lowerUri.includes('pubmed') || lowerUri.includes('ncbi')) sourceType = 'PubMed / NIH';
                  else if (lowerUri.includes('who.int')) sourceType = 'WHO Guidelines';
                  else if (lowerUri.includes('mayoclinic') || lowerUri.includes('hopkinsmedicine')) sourceType = 'Clinical Hospital';
                  else if (lowerUri.includes('drugs.com') || lowerUri.includes('webmd') || lowerUri.includes('medscape')) sourceType = 'Pharmacology Monograph';
                  else if (lowerUri.includes('nice.org.uk')) sourceType = 'NICE Clinical Guidelines';

                  groundingSources.push({
                    title: title.replace(/ - PubMed| - FDA| - Mayo Clinic/gi, '').trim(),
                    url: uri,
                    sourceType,
                  });
                }
              }
            }
          }
        } catch (metaErr) {
          console.warn('[MedicineAIService] Error parsing grounding metadata:', metaErr);
        }

        return {
          text: response.text.trim(),
          model,
          source: searchGrounded && groundingSources.length > 0
            ? `HealthGPT Medicine AI (${model} + Live Search Grounding)`
            : `HealthGPT Medicine AI (${model})`,
          searchGrounded: searchGrounded && groundingSources.length > 0,
          groundingSources: groundingSources.slice(0, 6),
          searchQueries: searchQueries.slice(0, 5),
        };
      }
    } catch (err: any) {
      console.warn(`[MedicineAIService] Generation failed on model ${model}, attempting fallback:`, err?.message || err);
    }
  }

  return null;
}

export async function fetchVerifiedMedicalGuidelines(queryOrMedicine: string): Promise<{
  guidelines: string;
  sources: MedicineGroundingSource[];
  searchQueries: string[];
  success: boolean;
}> {
  const ai = getGenAIClient();
  if (!ai) {
    return {
      guidelines: `Pharmacological guidelines for ${queryOrMedicine}: Follow standard CDSCO / FDA administration protocols, monitor therapeutic dosage limits, and avoid simultaneous CYP3A4 / renal chelation agents.`,
      sources: [],
      searchQueries: [],
      success: false,
    };
  }

  const prompt = `
You are a verified clinical pharmacology search engine.
Perform a live Google Search to fetch verified, current medical guidelines, drug interaction warnings, FDA/CDSCO alerts, dosage adjustments, and safety advisories for:
"${queryOrMedicine}"

Provide a concise, highly structured clinical summary in markdown:
1. 🏛️ **Official Regulatory Approvals & Indications** (CDSCO / FDA)
2. ⚠️ **Critical Boxed Warnings & Interaction Alerts** (Black box warnings, high-risk drug-drug combinations)
3. 🩺 **Clinical Guideline Recommendations** (First-line usage, dosing precautions, renal/hepatic adjustments)
4. 🔬 **Recent Clinical Trial Findings & Evidence Updates**
5. 🛡️ **Patient Monitoring Parameters** (Laboratory markers, vitals to track)

Keep it direct, professional, and free of disclaimers.
`;

  const candidateModels = getGeminiCandidateModels();

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
        },
      });

      const sources: MedicineGroundingSource[] = [];
      const searchQueries: string[] = [];
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      if (groundingMetadata) {
        if (Array.isArray(groundingMetadata.webSearchQueries)) {
          searchQueries.push(...groundingMetadata.webSearchQueries);
        }
        if (Array.isArray(groundingMetadata.groundingChunks)) {
          const seen = new Set<string>();
          for (const chunk of groundingMetadata.groundingChunks) {
            const uri = chunk.web?.uri;
            const title = chunk.web?.title || 'Verified Clinical Source';
            if (uri && !seen.has(uri)) {
              seen.add(uri);
              let sourceType = 'Medical Evidence';
              const lUri = uri.toLowerCase();
              if (lUri.includes('fda.gov')) sourceType = 'FDA Official';
              else if (lUri.includes('cdsco') || lUri.includes('mohfw')) sourceType = 'CDSCO India';
              else if (lUri.includes('nih.gov') || lUri.includes('pubmed')) sourceType = 'PubMed / NIH';
              else if (lUri.includes('who.int')) sourceType = 'WHO Guidelines';
              else if (lUri.includes('nice.org.uk')) sourceType = 'NICE UK';
              sources.push({ title, url: uri, sourceType });
            }
          }
        }
      }

      return {
        guidelines: response.text ? response.text.trim() : 'No real-time guidelines returned.',
        sources: sources.slice(0, 8),
        searchQueries: searchQueries.slice(0, 6),
        success: true,
      };
    } catch (err: any) {
      console.warn(`[fetchVerifiedMedicalGuidelines] Model ${model} failed, attempting next candidate:`, err?.message || err);
    }
  }

  return {
    guidelines: `Clinical guidance for ${queryOrMedicine}: Refer to standard pharmacopoeia monographs. Verify renal, hepatic, and concomitant medications.`,
    sources: [],
    searchQueries: [],
    success: false,
  };
}

export async function callGeminiService(
  systemInstruction: string,
  userPrompt: string,
  temperature = 0.6
): Promise<{ text: string; model: string } | null> {
  const ai = getGenAIClient();
  if (!ai) return null;

  const candidateModels = getGeminiCandidateModels();

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature,
        },
      });

      if (response && response.text) {
        return { text: response.text.trim(), model };
      }
    } catch (err: any) {
      console.warn(`[GeminiService] Generation failed on model ${model}:`, err?.message || err);
      // Automatically attempts next candidate model (e.g., gemini-3.8-flash -> gemini-2.5-flash)
    }
  }

  return null;
}

export class LLMDispatcher {
  /**
   * Returns current availability status for all integrated LLM backends.
   */
  public static getStatus() {
    const grokConfig = GrokService.getConfig();
    const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.HEALTHGPT_MEDICINE_AI);

    const providerLabels: Record<string, string> = {
      xai: 'xAI',
      groq: 'Groq Cloud',
      openai: 'OpenAI',
      generic: 'Custom LLM',
    };

    return {
      grok: {
        available: grokConfig.isConfigured,
        model: grokConfig.model,
        provider: providerLabels[grokConfig.provider] || 'xAI',
        endpoint: grokConfig.baseUrl,
      },
      gemini: {
        available: hasGemini,
        model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
        provider: 'Google AI',
      },
      active_default: grokConfig.isConfigured ? 'grok' : (hasGemini ? 'gemini' : 'local'),
    };
  }

  /**
   * Routes prompt to Grok API or Gemini according to preference and environment keys.
   */
  public static async execute(options: LLMRequestOptions): Promise<LLMCompletionResult | null> {
    const {
      systemInstruction,
      userPrompt,
      preferredEngine = 'auto',
      temperature = 0.6,
      maxTokens = 2048,
    } = options;

    const engine = String(preferredEngine).toLowerCase();

    // 1. Explicit Grok / xAI requested
    if (engine === 'grok' || engine === 'xai') {
      const grokRes = await GrokService.generateChat({
        systemInstruction,
        userPrompt,
        temperature,
        maxTokens,
      });

      if (grokRes.success && grokRes.text) {
        return {
          text: grokRes.text,
          source: grokRes.source,
          engine: 'grok',
          model: grokRes.model,
          finishReason: grokRes.finishReason,
          usage: grokRes.usage,
        };
      }

      // Grok fallback to Gemini
      const geminiRes = await callGeminiService(systemInstruction, userPrompt, temperature);
      if (geminiRes) {
        return {
          text: geminiRes.text,
          source: `${geminiRes.model} · Google AI`,
          engine: 'gemini',
          model: geminiRes.model,
        };
      }
      return null;
    }

    // 2. Explicit Gemini requested
    if (engine === 'gemini' || engine === 'google') {
      const geminiRes = await callGeminiService(systemInstruction, userPrompt, temperature);
      if (geminiRes) {
        return {
          text: geminiRes.text,
          source: `${geminiRes.model} · Google AI`,
          engine: 'gemini',
          model: geminiRes.model,
        };
      }

      // Gemini fallback to Grok
      const grokRes = await GrokService.generateChat({
        systemInstruction,
        userPrompt,
        temperature,
        maxTokens,
      });
      if (grokRes.success && grokRes.text) {
        return {
          text: grokRes.text,
          source: grokRes.source,
          engine: 'grok',
          model: grokRes.model,
          finishReason: grokRes.finishReason,
          usage: grokRes.usage,
        };
      }
      return null;
    }

    // 3. Auto / Hybrid Mode: If Grok API key is configured in env, prioritize Grok
    if (GrokService.isAvailable()) {
      const grokRes = await GrokService.generateChat({
        systemInstruction,
        userPrompt,
        temperature,
        maxTokens,
      });
      if (grokRes.success && grokRes.text) {
        return {
          text: grokRes.text,
          source: grokRes.source,
          engine: 'grok',
          model: grokRes.model,
          finishReason: grokRes.finishReason,
          usage: grokRes.usage,
        };
      }
    }

    // Next try Gemini
    const geminiRes = await callGeminiService(systemInstruction, userPrompt, temperature);
    if (geminiRes) {
      return {
        text: geminiRes.text,
        source: `${geminiRes.model} · Google AI`,
        engine: 'gemini',
        model: geminiRes.model,
      };
    }

    // Final attempt with Grok (if not attempted yet or in edge case)
    const finalGrok = await GrokService.generateChat({
      systemInstruction,
      userPrompt,
      temperature,
      maxTokens,
    });
    if (finalGrok.success && finalGrok.text) {
      return {
        text: finalGrok.text,
        source: finalGrok.source,
        engine: 'grok',
        model: finalGrok.model,
        finishReason: finalGrok.finishReason,
        usage: finalGrok.usage,
      };
    }

    return null;
  }
}
