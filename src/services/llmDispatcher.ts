/**
 * LLM Dispatcher & Routing Service
 * HealthGPT Multi-Model Architecture
 *
 * Routes requests dynamically across xAI Grok, Google Gemini,
 * or fallback local clinical algorithms based on user preference and environment credentials.
 */

import { GoogleGenAI } from '@google/genai';
import { GrokService } from './grokService.js';

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

let genAIClient: GoogleGenAI | null = null;

export function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

export async function callGeminiService(
  systemInstruction: string,
  userPrompt: string,
  temperature = 0.6
): Promise<{ text: string; model: string } | null> {
  const ai = getGenAIClient();
  if (!ai) return null;

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.7-flash';
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
    console.warn('[GeminiService] Generation failed:', err?.message || err);
  }
  return null;
}

export class LLMDispatcher {
  /**
   * Returns current availability status for all integrated LLM backends.
   */
  public static getStatus() {
    const grokConfig = GrokService.getConfig();
    const hasGemini = Boolean(process.env.GEMINI_API_KEY);

    return {
      grok: {
        available: grokConfig.isConfigured,
        model: grokConfig.model,
        provider: 'xAI',
        endpoint: grokConfig.baseUrl,
      },
      gemini: {
        available: hasGemini,
        model: process.env.GEMINI_MODEL || 'gemini-3.7-flash',
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
          source: `Gemini 3.7 Flash · Google AI`,
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
          source: `Gemini 3.7 Flash · Google AI`,
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
        source: `Gemini 3.7 Flash · Google AI`,
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
