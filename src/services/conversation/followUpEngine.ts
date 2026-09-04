/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Follow-Up & Smart Suggestions Engine
 */

import type { ConversationPersona, ExtractedEntityMemory, DetectedIntent } from './types.ts';

export interface FollowUpDecision {
  shouldAsk: boolean;
  questionText?: string;
  smartSuggestions: string[];
  proactiveActions: Array<{
    id: string;
    type: string;
    label: string;
    payload?: any;
  }>;
}

export class FollowUpEngine {
  /**
   * Evaluates memory and determines the next single best question and contextual suggestions
   */
  public static evaluate(
    persona: ConversationPersona,
    intent: DetectedIntent,
    memory: ExtractedEntityMemory,
    userText: string
  ): FollowUpDecision {
    const text = userText.toLowerCase();

    // 1. Proactive actions based on persona and topic
    const proactiveActions: Array<{ id: string; type: string; label: string; payload?: any }> = [];

    if (text.includes('sleep') || intent === 'SLEEP') {
      proactiveActions.push(
        { id: 'act_check_sleep', type: 'tool_call', label: '🌙 Check my sleep data', payload: { tool: 'get_sleep_data' } },
        { id: 'act_sleep_routine', type: 'prompt', label: '🛏️ Build a sleep routine' }
      );
    } else if (text.includes('mood') || text.includes('stress') || persona === 'therapist') {
      proactiveActions.push(
        { id: 'act_breathing', type: 'modal', label: '🧘 2-Min Calm Breathing', payload: { modal: 'breathing' } },
        { id: 'act_grounding', type: 'modal', label: '🌿 5-4-3-2-1 Grounding', payload: { modal: 'grounding' } }
      );
    } else if (persona === 'nutrition' || intent === 'NUTRITION') {
      proactiveActions.push(
        { id: 'act_meal_plan', type: 'prompt', label: '🥗 Create a healthy meal plan' },
        { id: 'act_calc_bmi', type: 'prompt', label: '⚖️ Calculate my BMI & macros' }
      );
    } else {
      proactiveActions.push(
        { id: 'act_vitals', type: 'modal', label: '🫀 Check Vitals Assessment', payload: { modal: 'vitals' } },
        { id: 'act_symptom_scale', type: 'modal', label: '📈 Rate Severity (1-10)', payload: { modal: 'symptoms' } }
      );
    }

    // 2. Determine Smart Suggestions based on conversation turn
    let smartSuggestions: string[] = [];

    if (text.includes('headache') || (memory.symptoms.includes('headache') && !memory.onsetDuration)) {
      if (!memory.onsetDuration) {
        smartSuggestions = ['Since yesterday', 'Just started today', 'For a couple of weeks', 'It comes and goes'];
      } else if (!memory.severity) {
        smartSuggestions = ['Mild (1-3)', 'Moderate (4-6)', 'Severe (7-10)', 'Throbbing pressure'];
      } else if (memory.negatedSymptoms.length === 0) {
        smartSuggestions = ['No fever or nausea', 'Sensitive to light', 'Feeling a bit dizzy', 'What can I do now?'];
      } else {
        smartSuggestions = ['What could cause this?', 'What should I do now?', 'Is it serious?', 'When should I see a doctor?'];
      }
    } else if (text.includes('sleep') || intent === 'SLEEP') {
      if (!memory.confirmedFacts['sleepHours']) {
        smartSuggestions = ['Around 5 hours', 'About 6-7 hours', 'Barely 4 hours', 'I keep waking up'];
      } else if (!memory.confirmedFacts['nightAwakenings']) {
        smartSuggestions = ['I wake up 2-3 times', 'Trouble falling asleep', 'Wake up too early', 'Mind is racing'];
      } else {
        smartSuggestions = ['Build a sleep routine', 'Why can\'t I sleep?', 'Help me fall asleep tonight', 'Natural sleep tips'];
      }
    } else if (text.includes('stomach') || memory.symptoms.includes('stomach pain')) {
      smartSuggestions = ['Upper stomach', 'Lower right side', 'Cramping after meals', 'Mild ache'];
    } else if (persona === 'therapist') {
      smartSuggestions = ['I feel overwhelmed with work', 'Help me calm my racing thoughts', 'Guide me through breathing', 'I want to reframe this'];
    } else if (persona === 'nutrition') {
      smartSuggestions = ['High-protein vegetarian options', 'Healthy breakfast ideas', 'Tips for drinking more water', 'Healthy snack swaps'];
    } else if (text.includes('tired') || memory.symptoms.includes('fatigue')) {
      smartSuggestions = ['For a couple of weeks', 'Just the last few days', 'Sleep has been terrible', 'What tests should I get?'];
    } else {
      // General contextual suggestions
      smartSuggestions = ['What could cause this?', 'What are immediate relief steps?', 'What red-flags should I watch for?', 'Can we summarize this?'];
    }

    return {
      shouldAsk: true,
      smartSuggestions,
      proactiveActions
    };
  }
}
