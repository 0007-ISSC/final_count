export const MEDICINE_SCHEMA_VERSION = '2026.1';

export interface MedicineProfile {
  name: string;
  genericName: string;
  brandNames: string[];
  class: string;
  therapeuticCategory: string;
  form: string;
  standardStrength: string;
  uses: string[];
  dosage_schedule: string;
  timing: string;
  defaultReminderTimes: string[];
  side_effects: string;
  warnings: string;
  contraindications: string[];
  drugInteractions: string[];
  foodInteractions: string[];
  pregnancySafety: string;
  genericPriceINR: number;
  brandedPriceINR: number;
  costSavingsPercent: number;
  prescriptionRequired: boolean;
}

export interface DrugValidationResult {
  isVerified: boolean;
  confidence: number;
  originalToken: string;
  canonicalName: string;
  genericName: string;
  matchedStrength?: string;
  matchedForm: string;
  therapeuticCategory: string;
  class: string;
  dosageSchedule: string;
  timing: string;
  defaultReminderTimes: string[];
  genericAlternative: string;
  savingsPercent: number;
  brandedPriceINR: number;
  genericPriceINR: number;
  criticalPrecautions: string[];
  contraindications: string[];
  foodInteractions: string[];
  pregnancySafety: string;
  prescriptionRequired: boolean;
  matchType: 'exact_key' | 'brand_match' | 'generic_match' | 'fuzzy_match' | 'category_match' | 'unverified';
}

export interface PrescriptionValidationReport {
  totalScanned: number;
  verifiedCount: number;
  validationScore: number;
  validatedMedications: Array<DrugValidationResult & {
    extractedDosage?: string;
    extractedTiming?: string;
    extractedDuration?: string;
  }>;
  flaggedInteractions: Array<{
    drugA: string;
    drugB: string;
    severity: 'High' | 'Moderate' | 'Low';
    description: string;
    advice: string;
  }>;
  estimatedMonthlyBrandedCostINR: number;
  estimatedMonthlyGenericCostINR: number;
  potentialMonthlySavingsINR: number;
  overallSafetySummary: string;
}
