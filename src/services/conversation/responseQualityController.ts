/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Response Quality Controller
 */

export class ResponseQualityController {
  private static readonly BANNED_REPETITIVE_DISCLAIMERS = [
    /As an AI language model,?\s*/gi,
    /Disclaimer: This is for educational purposes only\. Consult a licensed physician\.?/gi,
    /I am an artificial intelligence and cannot give medical advice\.?/gi,
    /Always consult a doctor before making any medical decisions\.?\s*$/gi,
    /How can I assist you today\??\s*$/gi,
    /How may I assist you today\??\s*$/gi
  ];

  /**
   * Sanitizes and validates the generated response
   */
  public static process(rawText: string, isEmergency = false): string {
    if (!rawText) return '';

    let cleaned = rawText.trim();

    // 1. Remove banned robotic repetitive disclaimers unless it's an actual emergency
    if (!isEmergency) {
      for (const pattern of this.BANNED_REPETITIVE_DISCLAIMERS) {
        cleaned = cleaned.replace(pattern, '').trim();
      }
    }

    // 2. Remove markdown code fence wrapping if the model accidentally returned ```markdown ... ```
    if (cleaned.startsWith('```markdown')) {
      cleaned = cleaned.replace(/^```markdown\s*/, '').replace(/\s*```$/, '').trim();
    } else if (cleaned.startsWith('```') && cleaned.endsWith('```')) {
      cleaned = cleaned.replace(/^```\w*\s*/, '').replace(/\s*```$/, '').trim();
    }

    // 3. Prevent double greetings if conversation has already started
    // e.g. "Hello! Welcome back to HealthGPT. Got it..."
    cleaned = cleaned.replace(/^(?:Hello|Hi there|Greetings)!\s+(?:Welcome back to HealthGPT|I am Dr\. Nambi)[.,!]\s*/i, '');

    return cleaned.trim();
  }
}
