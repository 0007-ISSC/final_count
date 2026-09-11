/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Intent & Tone Classifier
 */

import type { AppAction, DetectedIntent, EmotionalTone } from './types.ts';
import { PersonalityEngine } from './personalityEngine.ts';

export interface IntentClassificationResult {
  intent: DetectedIntent;
  confidence: number;
  emotionalTone: EmotionalTone;
  isTopicChange: boolean;
  isCorrection: boolean;
  explanationStyle?: 'simple' | 'technical' | 'standard';
  userMoodContext?: string;
  appAction?: AppAction;
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
    // 6a-0. Creator / Owner / Head / Iqra Sultana Inquiry
    if (PersonalityEngine.isCreatorInquiry(message)) {
      return {
        intent: 'CREATOR_INQUIRY',
        confidence: 0.99,
        emotionalTone: 'casual',
        isTopicChange: true,
        isCorrection: false,
        explanationStyle
      };
    }

    // 6a. Emergency / SOS (Highest Priority)
    if (
      text === 'emergency' ||
      text === 'sos' ||
      text.includes('emergency numbers') ||
      text.includes('emergency helpline') ||
      text.includes('need emergency help') ||
      text.includes('call ambulance') ||
      text.includes('call 112') ||
      text.includes('call 108') ||
      text.includes('suicide') ||
      text.includes('kill myself') ||
      text.includes('crushing chest pain') ||
      text.includes('cannot breathe') ||
      text.includes('face drooping') ||
      text.startsWith('nambi, emergency') ||
      text.startsWith('alex, emergency')
    ) {
      return {
        intent: 'SOS',
        confidence: 0.99,
        emotionalTone: 'scared',
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'SOS',
          target: 'sos',
          label: '🚨 Open Emergency SOS'
        }
      };
    }

    // 6b. Doctor Booking Flow
    if (
      text.includes('book a doctor') ||
      text.includes('book an appointment') ||
      text.includes('book appointment') ||
      text.includes('book my appointment') ||
      text.includes('book me an appointment') ||
      text.includes('doctor booking') ||
      text.includes('schedule a doctor') ||
      text.includes('schedule an appointment') ||
      text.includes('schedule appointment') ||
      text.includes('make an appointment with a doctor') ||
      text.includes('appointment slot') ||
      ((text.includes('book') || text.includes('schedule')) && (text.includes('appointment') || text.includes('doctor') || text.includes('consultation') || text.includes('slot')))
    ) {
      return {
        intent: 'DOCTOR_BOOKING',
        confidence: 0.98,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'BOOK_DOCTOR',
          target: 'doctorConnect',
          label: '📅 Confirmed Doctor Booking'
        }
      };
    }

    // 6c. Nearby Doctor Search
    if (
      text.includes('doctor near me') ||
      text.includes('doctors near me') ||
      text.includes('clinic near me') ||
      text.includes('hospital near me') ||
      text.includes('find nearby doctor') ||
      text.includes('specialist near me')
    ) {
      return {
        intent: 'NEARBY_DOCTOR_SEARCH',
        confidence: 0.96,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'NEARBY_DOCTOR_SEARCH',
          target: 'doctorConnect',
          params: { nearby: true },
          label: '📍 Find Nearby Verified Doctors'
        }
      };
    }

    // 6d. Search Doctor by Specialty
    const specialtyMap: Record<string, string> = {
      'dermatologist': 'Dermatologist',
      'skin doctor': 'Dermatologist',
      'cardiologist': 'Cardiologist',
      'heart doctor': 'Cardiologist',
      'heart specialist': 'Cardiologist',
      'neurologist': 'Neurologist',
      'brain specialist': 'Neurologist',
      'orthopedic': 'Orthopedic',
      'bone doctor': 'Orthopedic',
      'joint doctor': 'Orthopedic',
      'pediatrician': 'Pediatrician',
      'child doctor': 'Pediatrician',
      'gynecologist': 'Obstetrician & Gynecologist',
      'obgyn': 'Obstetrician & Gynecologist',
      'women doctor': 'Obstetrician & Gynecologist',
      'psychiatrist': 'Psychiatrist',
      'mental health doctor': 'Psychiatrist',
      'pulmonologist': 'Pulmonologist',
      'chest specialist': 'Pulmonologist',
      'lung specialist': 'Pulmonologist',
      'gastroenterologist': 'Gastroenterologist',
      'stomach specialist': 'Gastroenterologist',
      'physician': 'General Physician',
      'general physician': 'General Physician',
      'general doctor': 'General Physician',
      'dentist': 'Dentist',
      'eye doctor': 'Ophthalmologist',
      'ophthalmologist': 'Ophthalmologist',
      'ent': 'ENT Specialist',
      'ear nose throat': 'ENT Specialist'
    };

    for (const [key, specName] of Object.entries(specialtyMap)) {
      if (text.includes(key)) {
        return {
          intent: 'SEARCH_DOCTOR',
          confidence: 0.95,
          emotionalTone,
          isTopicChange,
          isCorrection,
          explanationStyle,
          appAction: {
            type: 'SEARCH_DOCTOR',
            target: 'doctorConnect',
            params: { specialty: specName },
            label: `🩺 View ${specName}s`
          }
        };
      }
    }

    // 6e. Connect to Doctor General
    if (
      text.includes('connect to a doctor') ||
      text.includes('connect to the doctors') ||
      text.includes('connect to doctors') ||
      text.includes('connect to doctor') ||
      text.includes('connect me to a doctor') ||
      text.includes('connect me to doctor') ||
      text.includes('connect me to doctors') ||
      text.includes('connect with a doctor') ||
      text.includes('connect with doctor') ||
      text.includes('connect with doctors') ||
      text.includes('doctor connection') ||
      text.includes('doctors connection') ||
      text.includes('doctor option') ||
      text.includes('doctors option') ||
      text.includes('talk to a doctor') ||
      text.includes('talk to doctors') ||
      text.includes('speak to a doctor') ||
      text.includes('speak to doctors') ||
      text.includes('speak to a real doctor') ||
      text.includes('see a doctor') ||
      text.includes('consult a doctor') ||
      text.includes('call a doctor') ||
      text.includes('call doctor') ||
      text.includes('human doctor') ||
      text.includes('real physician') ||
      text.includes('want a real doctor') ||
      text.includes('not an ai answer') ||
      (text.includes('connect') && (text.includes('doctor') || text.includes('specialist') || text.includes('physician')))
    ) {
      return {
        intent: 'CONNECT_TO_DOCTOR',
        confidence: 0.97,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'CONNECT_TO_DOCTOR',
          target: 'doctorConnect',
          label: '🩺 Open Doctor Connection'
        }
      };
    }

    // 6f. Prescription OCR
    if (
      text.includes('read my prescription') ||
      text.includes('read prescription') ||
      text.includes('scan my prescription') ||
      text.includes('scan prescription') ||
      text.includes('upload prescription') ||
      text.includes('ocr prescription') ||
      text.includes('prescription photo')
    ) {
      return {
        intent: 'PRESCRIPTION_OCR',
        confidence: 0.95,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'NAVIGATE',
          target: 'ocr',
          label: '📷 Open Prescription OCR'
        }
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

    // Prescription & Medication Intelligence
    if (
      text.includes('what is this medicine') ||
      text.includes('about this medicine') ||
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
        explanationStyle,
        appAction: {
          type: 'NAVIGATE',
          target: 'medicine',
          label: '💊 Open Medicine Intelligence'
        }
      };
    }

    // Mental Wellness & Stress
    if (
      text.includes('feeling stressed') ||
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
        explanationStyle,
        appAction: {
          type: 'SWITCH_PERSONA',
          params: { persona: 'therapist' },
          label: '🧘 Speak with Alex (Mental Wellness)'
        }
      };
    }

    // Digital Health Twin
    if (
      text.includes('digital twin') ||
      text.includes('my twin') ||
      text.includes('biological age') ||
      text.includes('health twin')
    ) {
      return {
        intent: 'DIGITAL_TWIN',
        confidence: 0.94,
        emotionalTone,
        isTopicChange,
        isCorrection,
        explanationStyle,
        appAction: {
          type: 'NAVIGATE',
          target: 'twinAnalytics',
          label: '🧬 Open Digital Health Twin'
        }
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
        explanationStyle,
        appAction: {
          type: 'NAVIGATE',
          target: 'nutrition',
          label: '🥗 Open Nutrition Planner'
        }
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
        explanationStyle,
        appAction: {
          type: 'NAVIGATE',
          target: 'dashboard',
          label: '📊 Open Health Overview'
        }
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
