/**
 * HealthGPT Ultra-Interactive AI Conversation Engine - Controlled Tool Manager
 */

export interface ToolExecutionResult {
  toolName: string;
  success: boolean;
  data: any;
  humanReadableSummary: string;
}

export class ToolManager {
  /**
   * Retrieves user health profile from current data store
   */
  public static getHealthProfile(
    userId?: number,
    cachedUser?: any
  ): ToolExecutionResult {
    if (!userId && !cachedUser) {
      return {
        toolName: 'get_health_profile',
        success: false,
        data: null,
        humanReadableSummary: 'No authorized user profile attached.'
      };
    }

    const profile = cachedUser || {
      name: 'Patient',
      age: 32,
      gender: 'Female',
      diet: 'Balanced',
      allergies: ['None documented']
    };

    return {
      toolName: 'get_health_profile',
      success: true,
      data: profile,
      humanReadableSummary: `Patient: ${profile.name || 'Patient'}, Age: ${profile.age || 'Not specified'}, Gender: ${profile.gender || 'Not specified'}.`
    };
  }

  /**
   * Retrieves recent vitals and biometric metrics
   */
  public static getRecentHealthMetrics(
    metricsList: Array<{ metric: string; value: number; unit: string; recordedAt: string }>,
    userId?: number
  ): ToolExecutionResult {
    const list = metricsList || [];
    if (list.length === 0) {
      return {
        toolName: 'get_recent_health_metrics',
        success: false,
        data: [],
        humanReadableSummary: 'I don\'t have enough recent biometric vitals recorded in your HealthGPT profile yet.'
      };
    }

    // Get latest reading of each metric
    const latestMap: Record<string, { value: number; unit: string; recordedAt: string }> = {};
    for (const m of list) {
      if (!latestMap[m.metric] || new Date(m.recordedAt) > new Date(latestMap[m.metric].recordedAt)) {
        latestMap[m.metric] = { value: m.value, unit: m.unit, recordedAt: m.recordedAt };
      }
    }

    const summaryParts = Object.entries(latestMap).map(([key, val]) => {
      const cleanKey = key.replace(/_/g, ' ').toUpperCase();
      return `${cleanKey}: ${val.value} ${val.unit}`;
    });

    return {
      toolName: 'get_recent_health_metrics',
      success: true,
      data: latestMap,
      humanReadableSummary: `Recent Biometrics: ${summaryParts.join(' | ')}.`
    };
  }

  /**
   * Retrieves authorized sleep data and calculates 7-day average
   */
  public static getSleepData(
    metricsList: Array<{ metric: string; value: number; unit: string; recordedAt: string }>
  ): ToolExecutionResult {
    const sleepEntries = (metricsList || [])
      .filter(m => m.metric === 'sleep')
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());

    if (sleepEntries.length === 0) {
      return {
        toolName: 'get_sleep_data',
        success: false,
        data: null,
        humanReadableSummary: 'I don\'t have enough recent sleep data logged to calculate your trends yet.'
      };
    }

    const recent7 = sleepEntries.slice(0, 7);
    const avg7 = Math.round((recent7.reduce((sum, e) => sum + e.value, 0) / recent7.length) * 10) / 10;

    let avgPrev7: number | null = null;
    if (sleepEntries.length >= 8) {
      const prev7 = sleepEntries.slice(7, 14);
      avgPrev7 = Math.round((prev7.reduce((sum, e) => sum + e.value, 0) / prev7.length) * 10) / 10;
    }

    const summary = avgPrev7 !== null
      ? `Your average sleep over the last 7 days was approximately ${avg7} hours, compared with ${avgPrev7} hours the previous week.`
      : `Your average sleep over the last 7 logged days was approximately ${avg7} hours per night.`;

    return {
      toolName: 'get_sleep_data',
      success: true,
      data: {
        currentAvg7Days: avg7,
        previousAvg7Days: avgPrev7,
        totalEntries: sleepEntries.length,
        recentEntries: recent7
      },
      humanReadableSummary: summary
    };
  }

  /**
   * Retrieves active medication data
   */
  public static getMedicationData(activePrescriptions: any[]): ToolExecutionResult {
    const list = activePrescriptions || [];
    if (list.length === 0) {
      return {
        toolName: 'get_medication_data',
        success: false,
        data: [],
        humanReadableSummary: 'No active prescriptions or medications currently logged.'
      };
    }

    const medNames = list.map(p => `${p.medicineName || p.name} (${p.dosage || 'standard dosage'}, ${p.timing || 'as directed'})`);

    return {
      toolName: 'get_medication_data',
      success: true,
      data: list,
      humanReadableSummary: `Active Medications (${list.length}): ${medNames.join('; ')}.`
    };
  }

  /**
   * Calculates BMI and category
   */
  public static calculateBMI(weightKg: number, heightCm: number): ToolExecutionResult {
    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
      return {
        toolName: 'calculate_bmi',
        success: false,
        data: null,
        humanReadableSummary: 'Please provide valid weight (kg) and height (cm) values.'
      };
    }

    const heightM = heightCm / 100;
    const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

    let category = 'Normal weight';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
    else if (bmi >= 30) category = 'Obesity';

    return {
      toolName: 'calculate_bmi',
      success: true,
      data: { bmi, category, weightKg, heightCm },
      humanReadableSummary: `Calculated BMI is ${bmi} kg/m² (${category}).`
    };
  }
}
