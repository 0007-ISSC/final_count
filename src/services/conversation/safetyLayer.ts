/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Safety & Emergency Guardrails
 */

export interface EmergencyEvaluation {
  isEmergency: boolean;
  alertType?: 'CARDIOVASCULAR' | 'STROKE_NEURO' | 'RESPIRATORY' | 'ANAPHYLAXIS' | 'SEVERE_TRAUMA' | 'CRISIS_SELF_HARM';
  message?: string;
  directives?: string[];
}

export class SafetyLayer {
  private static readonly CARDIOVASCULAR_FLAGS = [
    'crushing chest pain',
    'crushing pain in chest',
    'chest pressure radiating',
    'chest pain radiating to left arm',
    'chest pain radiating to jaw',
    'pressure in chest with sweat',
    'chest tightness with shortness of breath',
    'squeezing chest pain',
    'heavy pressure on my chest'
  ];

  private static readonly STROKE_FLAGS = [
    'face drooping',
    'facial droop',
    'slurred speech suddenly',
    'arm weakness suddenly',
    'cannot lift one arm',
    'cannot move one side of body',
    'sudden loss of vision in one eye',
    'sudden severe thunderclap headache'
  ];

  private static readonly RESPIRATORY_FLAGS = [
    'cannot breathe at all',
    'gasping for air',
    'lips turning blue',
    'blue lips',
    'severe shortness of breath unable to speak'
  ];

  private static readonly ANAPHYLAXIS_FLAGS = [
    'throat closing up',
    'throat swelling and cannot breathe',
    'tongue swelling allergic reaction',
    'anaphylaxis'
  ];

  private static readonly SELF_HARM_FLAGS = [
    'want to kill myself',
    'suicide',
    'end my life',
    'want to die right now',
    'commit suicide'
  ];

  /**
   * Evaluates message against critical red-flags
   */
  public static evaluate(text: string): EmergencyEvaluation {
    const lower = text.toLowerCase().trim();

    // 1. Crisis / Self-Harm
    for (const flag of this.SELF_HARM_FLAGS) {
      if (lower.includes(flag)) {
        return {
          isEmergency: true,
          alertType: 'CRISIS_SELF_HARM',
          message: 'If you are feeling overwhelmed or having thoughts of harming yourself, please know that you are not alone and there is compassionate, immediate support available right now.',
          directives: [
            'India Crisis Helpline: Tele-MANAS at 14416 or 1800-891-4416 (24x7, Toll-Free).',
            'US / Canada: Call or text 988 (Suicide & Crisis Lifeline).',
            'UK: Call 111 (NHS Mental Health) or Samaritans at 116 123.',
            'Reach out immediately to someone you trust or a local emergency department.'
          ]
        };
      }
    }

    // 2. Stroke / FAST
    for (const flag of this.STROKE_FLAGS) {
      if (lower.includes(flag)) {
        return {
          isEmergency: true,
          alertType: 'STROKE_NEURO',
          message: 'Sudden weakness, facial drooping, speech slurring, or vision loss can indicate an acute stroke (FAST emergency). Time is critical for brain preservation.',
          directives: [
            'Call emergency medical services immediately (112 in India, 911 in US/Canada, 999 in UK).',
            'Note the exact time symptoms began.',
            'Do NOT give food, water, or aspirin.',
            'Keep the person lying down on their side if vomiting occurs.'
          ]
        };
      }
    }

    // 3. Acute Chest Pressure / Coronary
    for (const flag of this.CARDIOVASCULAR_FLAGS) {
      if (lower.includes(flag)) {
        return {
          isEmergency: true,
          alertType: 'CARDIOVASCULAR',
          message: 'Chest pressure, squeezing, or pain spreading to the arm, neck, or jaw can indicate an acute cardiac event that requires immediate in-person emergency medical care.',
          directives: [
            'Call emergency services immediately (112 in India, 911 in US/Canada, 999 in UK).',
            'Stop all physical activity and rest in a comfortable, seated or upright position.',
            'Loosen any tight clothing around your neck and chest.',
            'If you have prescribed emergency nitroglycerin, take it as directed by your physician.'
          ]
        };
      }
    }

    // 4. Severe Respiratory / Anaphylaxis
    for (const flag of this.ANAPHYLAXIS_FLAGS) {
      if (lower.includes(flag)) {
        return {
          isEmergency: true,
          alertType: 'ANAPHYLAXIS',
          message: 'Rapid throat or facial swelling with breathing difficulty is a life-threatening anaphylactic emergency.',
          directives: [
            'Administer an epinephrine autoinjector (EpiPen) immediately into the outer thigh if available.',
            'Call emergency services (112, 911, or 999) without delay.',
            'Lie flat with feet elevated unless breathing is easier sitting up.'
          ]
        };
      }
    }

    for (const flag of this.RESPIRATORY_FLAGS) {
      if (lower.includes(flag)) {
        return {
          isEmergency: true,
          alertType: 'RESPIRATORY',
          message: 'Severe breathing impairment with inability to speak or cyanosis (bluish tint) is an acute medical emergency.',
          directives: [
            'Call emergency services immediately (112, 911, 999).',
            'Sit in a forward-leaning tripod position to ease lung expansion.',
            'Use rescue inhaler if prescribed for asthma/COPD.'
          ]
        };
      }
    }

    return { isEmergency: false };
  }
}
