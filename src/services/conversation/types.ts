/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Core Types
 */

export const CONVERSATION_ENGINE_VERSION = '2.1.0';

export type ConversationPersona = 'doctor' | 'therapist' | 'nutrition'; // Canonical 2 chatbots: doctor & therapist (nutrition redirected)

export type ConversationState =
  | 'GREETING'
  | 'UNDERSTANDING_INTENT'
  | 'COLLECTING_RELEVANT_INFORMATION'
  | 'ANALYZING'
  | 'RESPONDING'
  | 'FOLLOW_UP'
  | 'ACTION'
  | 'RESOLUTION';

export type DetectedIntent =
  | 'GENERAL_HEALTH'
  | 'SYMPTOM_DISCUSSION'
  | 'MEDICINE_INFORMATION'
  | 'NUTRITION'
  | 'MENTAL_WELLNESS'
  | 'SLEEP'
  | 'EXERCISE'
  | 'HEALTH_DATA'
  | 'PRESCRIPTION'
  | 'PRESCRIPTION_OCR'
  | 'CONNECT_TO_DOCTOR'
  | 'SEARCH_DOCTOR'
  | 'NEARBY_DOCTOR_SEARCH'
  | 'DOCTOR_BOOKING'
  | 'SOS'
  | 'DIGITAL_TWIN'
  | 'CARECAST'
  | 'TRANSLATOR'
  | 'EMERGENCY'
  | 'CASUAL_CONVERSATION'
  | 'FOLLOW_UP'
  | 'CLARIFICATION';

export interface AppAction {
  type: 'NAVIGATE' | 'SEARCH_DOCTOR' | 'NEARBY_DOCTOR_SEARCH' | 'BOOK_DOCTOR' | 'CONNECT_TO_DOCTOR' | 'SWITCH_PERSONA' | 'SOS' | 'TRIGGER_MODAL';
  target?: string;
  params?: Record<string, any>;
  label: string;
}

export type EmotionalTone =
  | 'calm'
  | 'anxious'
  | 'scared'
  | 'frustrated'
  | 'curious'
  | 'casual'
  | 'sad'
  | 'overwhelmed';

export interface ExtractedEntityMemory {
  symptoms: string[];
  onsetDuration: string | null;
  severity: string | null; // e.g. "moderate", "6/10", "mild"
  location: string | null;
  character: string | null; // e.g. "throbbing", "sharp", "dull pressure"
  associatedSymptoms: string[];
  negatedSymptoms: string[]; // e.g. "no fever", "no vomiting"
  triggers: string[];
  relievingFactors: string[];
  userDemographics: {
    age?: number;
    gender?: string;
    heightCm?: number;
    weightKg?: number;
  };
  userPreferences: {
    diet?: string;
    allergies?: string[];
    sleepTargetHours?: number;
    activityLevel?: string;
  };
  activeConcern: string;
  askedQuestions: string[]; // Questions already asked to prevent repeating
  confirmedFacts: Record<string, any>;
  unresolvedQuestions: string[];
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  persona?: ConversationPersona;
  intent?: DetectedIntent;
  suggestedReplies?: string[];
  actions?: Array<{
    id: string;
    type: string;
    label: string;
    payload?: any;
  }>;
  warningCard?: {
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'emergency';
  };
  infoCard?: {
    title: string;
    items: string[];
  };
  profileAction?: {
    factKey: string;
    factValue: any;
    label: string;
    actionType: 'save_profile' | 'update_profile';
  };
  appAction?: AppAction;
}

export interface ConversationSession {
  id: string;
  title: string;
  userId?: number;
  persona: ConversationPersona;
  state: ConversationState;
  intent: DetectedIntent;
  emotionalTone: EmotionalTone;
  memory: ExtractedEntityMemory;
  summary: string;
  messages: ConversationMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationTurnResult {
  sessionId: string;
  persona: ConversationPersona;
  state: ConversationState;
  intent: DetectedIntent;
  emotionalTone: EmotionalTone;
  responseText: string;
  suggestedReplies: string[];
  actions: Array<{
    id: string;
    type: string;
    label: string;
    payload?: any;
  }>;
  warningCard?: {
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'emergency';
  };
  infoCard?: {
    title: string;
    items: string[];
  };
  profileAction?: {
    factKey: string;
    factValue: any;
    label: string;
    actionType: 'save_profile' | 'update_profile';
  };
  appAction?: AppAction;
  memorySummary: {
    symptoms: string[];
    onsetDuration: string | null;
    severity: string | null;
    associated: string[];
    negated: string[];
  };
  source: string;
  engine: string;
  model: string;
}
