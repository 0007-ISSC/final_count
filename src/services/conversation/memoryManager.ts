/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Memory & Context Manager
 */

import type { ExtractedEntityMemory, ConversationMessage } from './types.ts';

export class MemoryManager {
  /**
   * Initializes a clean entity memory structure
   */
  public static createEmptyMemory(): ExtractedEntityMemory {
    return {
      symptoms: [],
      onsetDuration: null,
      severity: null,
      location: null,
      character: null,
      associatedSymptoms: [],
      negatedSymptoms: [],
      triggers: [],
      relievingFactors: [],
      userDemographics: {},
      userPreferences: {},
      activeConcern: '',
      askedQuestions: [],
      confirmedFacts: {},
      unresolvedQuestions: []
    };
  }

  /**
   * Updates entity memory from a user turn with progressive extraction and correction handling
   */
  public static updateMemory(
    memory: ExtractedEntityMemory,
    userText: string,
    isCorrection = false
  ): { memory: ExtractedEntityMemory; detectedProfileFact?: { key: string; value: any; label: string } } {
    const text = userText.trim();
    const lower = text.toLowerCase();
    let detectedProfileFact: { key: string; value: any; label: string } | undefined;

    // 1. Correction Handling
    // E.g., "Actually I'm 21 now" or "Wait, I'm allergic to penicillin"
    const ageMatch = lower.match(/(?:actually\s+)?(?:i\s*am|i'm)\s*(\d{1,3})\s*(?:years?\s*old|now)?/);
    if (ageMatch) {
      const age = parseInt(ageMatch[1], 10);
      if (age > 0 && age < 125) {
        memory.userDemographics.age = age;
        detectedProfileFact = { key: 'age', value: age, label: `Age: ${age} years` };
      }
    }

    const allergyMatch = lower.match(/(?:allergic to|allergy to|allergic with)\s+([a-z0-9\s]+)/);
    if (allergyMatch) {
      const allergen = allergyMatch[1].replace(/[.,!]/g, '').trim();
      if (!memory.userPreferences.allergies) memory.userPreferences.allergies = [];
      if (!memory.userPreferences.allergies.includes(allergen)) {
        memory.userPreferences.allergies.push(allergen);
        detectedProfileFact = { key: 'allergies', value: memory.userPreferences.allergies, label: `Allergy: ${allergen}` };
      }
    }

    // Dietary preference
    if (lower.includes('vegetarian') || lower.includes('i am vegetarian') || lower.includes('i\'m vegetarian')) {
      memory.userPreferences.diet = 'vegetarian';
      detectedProfileFact = { key: 'diet', value: 'vegetarian', label: 'Diet: Vegetarian' };
    } else if (lower.includes('vegan')) {
      memory.userPreferences.diet = 'vegan';
      detectedProfileFact = { key: 'diet', value: 'vegan', label: 'Diet: Vegan' };
    } else if (lower.includes('non-vegetarian') || lower.includes('non vegetarian') || lower.includes('omnivore')) {
      memory.userPreferences.diet = 'non-vegetarian';
      detectedProfileFact = { key: 'diet', value: 'non-vegetarian', label: 'Diet: Non-Vegetarian' };
    }

    // 2. Symptom Extraction
    const knownSymptoms = [
      'headache', 'migraine', 'fever', 'nausea', 'vomiting', 'dizziness', 'lightheadedness',
      'chest pain', 'chest tightness', 'shortness of breath', 'cough', 'sore throat',
      'stomach pain', 'abdominal pain', 'cramps', 'fatigue', 'tiredness', 'exhaustion',
      'insomnia', 'sleep issues', 'back pain', 'joint pain', 'rash', 'itching', 'swelling',
      'diarrhea', 'constipation', 'palpitations', 'heart racing', 'anxiety', 'panic'
    ];

    for (const sym of knownSymptoms) {
      // Check if negated (e.g. "no fever", "without nausea")
      const negatedPattern = new RegExp(`(?:no|without|not having|no sign of|haven't had)\\s+${sym}`, 'i');
      if (negatedPattern.test(lower)) {
        if (!memory.negatedSymptoms.includes(sym)) {
          memory.negatedSymptoms.push(sym);
        }
        // Remove from positive symptoms if it was there previously
        memory.symptoms = memory.symptoms.filter(s => s !== sym);
        memory.associatedSymptoms = memory.associatedSymptoms.filter(s => s !== sym);
      } else if (lower.includes(sym)) {
        // Positive symptom
        if (memory.symptoms.length === 0) {
          memory.symptoms.push(sym);
          memory.activeConcern = sym;
        } else if (!memory.symptoms.includes(sym) && !memory.associatedSymptoms.includes(sym)) {
          memory.associatedSymptoms.push(sym);
        }
      }
    }

    // Also check for general complaints like "don't feel good" or "hurts"
    if (memory.symptoms.length === 0) {
      if (lower.includes('head hurts') || lower.includes('hurts in my head')) {
        memory.symptoms.push('headache');
        memory.activeConcern = 'headache';
      } else if (lower.includes('stomach hurts')) {
        memory.symptoms.push('stomach pain');
        memory.activeConcern = 'stomach pain';
      } else if (lower.includes('chest hurts')) {
        memory.symptoms.push('chest pain');
        memory.activeConcern = 'chest pain';
      } else if (lower.includes('tired') || lower.includes('exhausted')) {
        memory.symptoms.push('fatigue');
        memory.activeConcern = 'fatigue';
      }
    }

    // 3. Duration & Onset Extraction
    const durationMatch = lower.match(/(?:since\s+(?:yesterday|morning|last night|last week|a few days)|for\s+(?:\d+|two|three|four|five|several|a couple of)\s+(?:hours?|days?|weeks?|months?)|two weeks|three days|since 2 days)/i);
    if (durationMatch) {
      memory.onsetDuration = durationMatch[0].trim();
    } else if (lower === 'since yesterday' || lower === 'yesterday') {
      memory.onsetDuration = 'since yesterday';
    } else if (lower.includes('two weeks') || lower.includes('2 weeks')) {
      memory.onsetDuration = 'two weeks';
    } else if (lower.includes('a few days')) {
      memory.onsetDuration = 'a few days';
    }

    // 4. Severity Extraction
    if (lower.includes('moderate')) {
      memory.severity = 'moderate';
    } else if (lower.includes('mild')) {
      memory.severity = 'mild';
    } else if (lower.includes('severe') || lower.includes('unbearable') || lower.includes('excruciating')) {
      memory.severity = 'severe';
    } else {
      const scaleMatch = lower.match(/(?:maybe\s+|around\s+|it is\s+|rating\s*)?(\d{1,2})(?:\s*\/\s*10| out of 10)?/);
      if (scaleMatch) {
        const val = parseInt(scaleMatch[1], 10);
        if (val >= 1 && val <= 10) {
          memory.severity = `${val}/10`;
        }
      }
    }

    // 5. Sleep hours extraction
    const sleepMatch = lower.match(/(?:around|about|roughly|only)?\s*(\d(?:\.\d)?)\s*hours?(?:\s*of\s*sleep)?/);
    if (sleepMatch) {
      const hours = parseFloat(sleepMatch[1]);
      memory.confirmedFacts['sleepHours'] = hours;
      detectedProfileFact = { key: 'sleepHours', value: hours, label: `Typical Sleep: ${hours} hours/night` };
    } else if (lower.includes('barely sleep')) {
      memory.confirmedFacts['sleepQuality'] = 'poor';
    }

    // 6. Night awakenings extraction
    const wakeMatch = lower.match(/(?:wake up\s+)?(\d(?:\s*or\s*\d)?)\s*times/i);
    if (wakeMatch) {
      memory.confirmedFacts['nightAwakenings'] = wakeMatch[1];
    }

    // 7. Location & Character
    if (lower.includes('throbbing')) memory.character = 'throbbing';
    if (lower.includes('sharp')) memory.character = 'sharp';
    if (lower.includes('dull')) memory.character = 'dull';
    if (lower.includes('pressure')) memory.character = 'pressure';

    if (lower.includes('temple') || lower.includes('temples')) memory.location = 'temples';
    if (lower.includes('forehead')) memory.location = 'forehead';
    if (lower.includes('back of head')) memory.location = 'occipital / back of head';
    if (lower.includes('one side') || lower.includes('left side') || lower.includes('right side')) memory.location = 'unilateral';

    return { memory, detectedProfileFact };
  }

  /**
   * Summarizes long conversations into a structured clinical snapshot
   */
  public static generateConversationSummary(
    messages: ConversationMessage[],
    memory: ExtractedEntityMemory
  ): string {
    const parts: string[] = [];

    if (memory.activeConcern || memory.symptoms.length > 0) {
      parts.push(`- Primary Concern: ${memory.activeConcern || memory.symptoms.join(', ')}`);
    }
    if (memory.onsetDuration) {
      parts.push(`- Duration: ${memory.onsetDuration}`);
    }
    if (memory.severity) {
      parts.push(`- Severity: ${memory.severity}`);
    }
    if (memory.associatedSymptoms.length > 0) {
      parts.push(`- Associated Symptoms: ${memory.associatedSymptoms.join(', ')}`);
    }
    if (memory.negatedSymptoms.length > 0) {
      parts.push(`- Ruled Out / Negative Symptoms: ${memory.negatedSymptoms.join(', ')}`);
    }
    if (memory.location || memory.character) {
      parts.push(`- Presentation: ${[memory.character, memory.location].filter(Boolean).join(' in ')}`);
    }
    if (memory.userDemographics.age) {
      parts.push(`- User Age: ${memory.userDemographics.age}`);
    }
    if (memory.userPreferences.diet) {
      parts.push(`- Diet: ${memory.userPreferences.diet}`);
    }
    if (memory.userPreferences.allergies && memory.userPreferences.allergies.length > 0) {
      parts.push(`- Allergies: ${memory.userPreferences.allergies.join(', ')}`);
    }
    if (memory.confirmedFacts['sleepHours']) {
      parts.push(`- Reported Sleep: ${memory.confirmedFacts['sleepHours']} hours`);
    }

    // Add recent turns summary
    const recentTurns = messages.slice(-6);
    if (recentTurns.length > 0) {
      parts.push('\nRecent Discussion Flow:');
      for (const msg of recentTurns) {
        const role = msg.role === 'user' ? 'Patient' : 'Assistant';
        const snippet = msg.content.length > 120 ? msg.content.slice(0, 117) + '...' : msg.content;
        parts.push(`* ${role}: "${snippet}"`);
      }
    }

    return parts.join('\n');
  }

  /**
   * Formats a short context tag for the AI prompt and UI badge
   */
  public static formatContextBadge(memory: ExtractedEntityMemory): string {
    const items: string[] = [];
    if (memory.activeConcern || memory.symptoms.length > 0) {
      items.push(memory.activeConcern || memory.symptoms[0]);
    }
    if (memory.onsetDuration) {
      items.push(memory.onsetDuration);
    }
    if (memory.severity) {
      items.push(`severity: ${memory.severity}`);
    }
    if (memory.negatedSymptoms.length > 0) {
      items.push(`no ${memory.negatedSymptoms[0]}`);
    }
    return items.join(' · ');
  }
}
