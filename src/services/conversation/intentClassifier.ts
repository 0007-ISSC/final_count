/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Intent & Tone Classifier
 */

import type { DetectedIntent, EmotionalTone } from './types.ts';

export interface IntentClassificationResult {
  intent: DetectedIntent;
  confidence: number;
  emotionalTone: EmotionalTone;
  isTopicChange: boolean;
  isCorrection: boolean;
  explanationStyle?: 'simple' | 'technical' | 'standard';
  userMoodContext?: string;
}

export class IntentClassifier {
  /**
   * Classifies user input into intent, emotion, topic shift, and corrections
   */
  public static classify(
    message: string,
    previousIntent?: DetectedIntent,
    previousTopic?: string
  ): IntentClassificationResult {
    const text = message.trim().toLowerCase();

    // 1. Check for explanation style instructions
    let explanationStyle: 'simple' | 'technical' | 'standard' = 'standard';
    if (text.includes('like i am 10') || text.includes('like i\'m 10') || text.includes('explain like i\'m five') || text.includes('simple terms') || text.includes('in plain words')) {
      explanationStyle = 'simple';
    } else if (text.includes('technical explanation') || text.includes('clinical details') || text.includes('pharmacokinetics') || text.includes('mechanism of action in detail')) {
      explanationStyle = 'technical';
    }

    // 2. Emotional Tone Detection
    let emotionalTone: EmotionalTone = 'calm';
    if (text.includes('scared') || text.includes('terrified') || text.includes('frightened') || text.includes('panicking') || text.includes('panic')) {
      emotionalTone = 'scared';
    } else if (text.includes('anxious') || text.includes('worried') || text.includes('stress') || text.includes('freaking out') || text.includes('nervous')) {
      emotionalTone = 'anxious';
    } else if (text.includes('overwhelmed') || text.includes('exhausted') || text.includes('drained') || text.includes('can\'t take this')) {
      emotionalTone = 'overwhelmed';
    } else if (text.includes('sad') || text.includes('depressed') || text.includes('crying') || text.includes('hopeless') || text.includes('lonely')) {
      emotionalTone = 'sad';
    } else if (text.includes('frustrated') || text.includes('annoyed') || text.includes('angry') || text.includes('sick of this')) {
      emotionalTone = 'frustrated';
    } else if (text.includes('just curious') || text.includes('wondering') || text.includes('curious about') || text.includes('out of curiosity')) {
      emotionalTone = 'curious';
    } else if (text.startsWith('hey') || text.startsWith('hi') || text === 'hello' || text === 'sup' || text.includes('how are you')) {
      emotionalTone = 'casual';
    }

    // 3. Topic Shift / Pivot Detection
    let isTopicChange = false;
    if (
      text.startsWith('actually, forget that') ||
      text.startsWith('forget that') ||
      text.startsWith('never mind') ||
      text.startsWith('nevermind') ||
      text.startsWith('changing topic') ||
      text.startsWith('instead,') ||
      text.startsWith('switch topic') ||
      text.includes('let us talk about something else') ||
      text.includes('let\'s talk about something else')
    ) {
      isTopicChange = true;
    }

    // 4. Correction Detection
    let isCorrection = false;
    if (
      text.startsWith('actually i am') ||
      text.startsWith('actually i\'m') ||
      text.startsWith('wait, i am') ||
      text.startsWith('wait, i\'m') ||
      text.startsWith('correction:') ||
      text.includes('i made a mistake') ||
      text.includes('i meant ') ||
      text.includes('not 20, 21') ||
      text.startsWith('actually ')
    ) {
      isCorrection = true;
    }

    // 5. Short follow-up / clarification answers
    // e.g. "since yesterday", "moderate", "no fever", "2 weeks", "around 5 hours", "2 or 3 times", "maybe 6"
    const isShortFollowUpAnswer = (
      /^(since\s|for\s|\d+\s*(days?|hours?|weeks?|months?)|moderate|mild|severe|\d+(\/10)?|yes|no|none|no fever|left side|right side|both sides|throbbing|sharp|dull|forehead|temple)/i.test(text) ||
      (text.split(' ').length <= 5 && previousIntent === 'SYMPTOM_DISCUSSION')
    );

    if (isShortFollowUpAnswer && previousIntent && !isTopicChange) {
      return {
        intent: 'FOLLOW_UP',
        confidence: 0.95,
        emotionalTone,
        isTopicChange: false,
        isCorrection,
        explanationStyle
      };
    }

    // 6. Primary Intent Detection
    if (
      text.includes('suicide') ||
      text.includes('kill myself') ||
      text.includes('crushing chest pain') ||
      text.includes('cannot breathe') ||
      text.includes('face drooping')
    ) {
      return {
        intent: 'EMERGENCY',
        confidence: 0.99,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Casual Greeting
    if (/^(hi|hey|hello|good morning|good afternoon|good evening|sup|howdy)[\s!.]*$/i.test(text) || text === 'hey healthgpt') {
      return {
        intent: 'CASUAL_CONVERSATION',
        confidence: 0.98,
        emotionalTone: 'casual',
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Prescription & Medication
    if (
      text.includes('prescription') ||
      text.includes('medicine') ||
      text.includes('medication') ||
      text.includes('tablet') ||
      text.includes('dosage') ||
      text.includes('side effect') ||
      text.includes('interaction') ||
      text.includes('paracetamol') ||
      text.includes('amoxicillin') ||
      text.includes('telmisartan') ||
      text.includes('metformin') ||
      text.includes('ibuprofen')
    ) {
      return {
        intent: 'MEDICINE_INFORMATION',
        confidence: 0.9,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Mental Wellness & Stress
    if (
      text.includes('anxiety') ||
      text.includes('depressed') ||
      text.includes('stress') ||
      text.includes('panic') ||
      text.includes('mindfulness') ||
      text.includes('breathing') ||
      text.includes('grounding') ||
      text.includes('overthinking') ||
      text.includes('burnout') ||
      text.includes('lonely') ||
      text.includes('cbt') ||
      text.includes('emotional') ||
      text.includes('mood')
    ) {
      return {
        intent: 'MENTAL_WELLNESS',
        confidence: 0.92,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Sleep
    if (
      text.includes('sleep') ||
      text.includes('insomnia') ||
      text.includes('can\'t sleep') ||
      text.includes('cannot sleep') ||
      text.includes('waking up') ||
      text.includes('sleep routine') ||
      text.includes('circadian') ||
      text.includes('tired') ||
      text.includes('fatigue') ||
      text.includes('exhausted')
    ) {
      return {
        intent: 'SLEEP',
        confidence: 0.92,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Nutrition & Diet
    if (
      text.includes('diet') ||
      text.includes('nutrition') ||
      text.includes('calories') ||
      text.includes('protein') ||
      text.includes('meal') ||
      text.includes('vegetarian') ||
      text.includes('vegan') ||
      text.includes('carbs') ||
      text.includes('hydration') ||
      text.includes('water intake') ||
      text.includes('weight loss') ||
      text.includes('weight gain') ||
      text.includes('intermittent fasting')
    ) {
      return {
        intent: 'NUTRITION',
        confidence: 0.9,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Health Telemetry / Data
    if (
      text.includes('my vitals') ||
      text.includes('blood pressure') ||
      text.includes('heart rate') ||
      text.includes('telemetry') ||
      text.includes('pulse') ||
      text.includes('blood sugar') ||
      text.includes('glucose') ||
      text.includes('spo2') ||
      text.includes('how has my sleep been') ||
      text.includes('my health data') ||
      text.includes('my trends')
    ) {
      return {
        intent: 'HEALTH_DATA',
        confidence: 0.88,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    // Symptom Discussion
    if (
      text.includes('headache') ||
      text.includes('hurts') ||
      text.includes('pain') ||
      text.includes('fever') ||
      text.includes('dizzy') ||
      text.includes('nausea') ||
      text.includes('cough') ||
      text.includes('sore throat') ||
      text.includes('chest') ||
      text.includes('stomach') ||
      text.includes('don\'t feel good') ||
      text.includes('feeling sick') ||
      text.includes('swelling') ||
      text.includes('rash') ||
      text.includes('vomiting') ||
      text.includes('cramps')
    ) {
      return {
        intent: 'SYMPTOM_DISCUSSION',
        confidence: 0.94,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle
      };
    }

    return {
      intent: 'GENERAL_HEALTH',
      confidence: 0.8,
      emotionalTone,
      isTopicChange,
      isCorrection,
      explanationStyle
    };
  }
}
