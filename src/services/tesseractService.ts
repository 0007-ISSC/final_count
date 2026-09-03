/**
 * Tesseract OCR Pipeline Service
 * HealthGPT Prescription & Medical Document Intelligence
 *
 * Extracts text from uploaded prescription images and documents,
 * cross-references extracted drugs with the verified CDSCO/NLEM medication database,
 * validates dosages, generates interaction alerts & generic alternatives,
 * and structures clinical entities for automatic feeding into the AI Doctor.
 */

import { createWorker, type Worker } from 'tesseract.js';
import { LLMDispatcher } from './llmDispatcher.ts';
import { GrokService } from './grokService.ts';
import {
  crossReferencePrescriptionMedications,
  validateAndCrossReferenceDrug,
  lookupMedicineComprehensive,
  type PrescriptionValidationReport,
  type DrugValidationResult,
} from '../data/medicinesData.ts';

export interface ExtractedMedication {
  name: string;
  dosage: string;
  timing: string;
  duration: string;
  purpose: string;
  critical_precaution: string;
  // OCR Cross-Reference Validation Layer Fields
  isVerified?: boolean;
  canonicalName?: string;
  genericName?: string;
  validationConfidence?: number;
  matchType?: string;
  genericAlternative?: string;
  savingsPercent?: number;
  brandedPriceINR?: number;
  genericPriceINR?: number;
  foodInteractions?: string[];
  pregnancySafety?: string;
  prescriptionRequired?: boolean;
  defaultReminderTimes?: string[];
}

export interface ParsedPrescription {
  doctorName?: string;
  clinicHospital?: string;
  patientDetails?: string;
  date?: string;
  diagnosis?: string;
  medications: ExtractedMedication[];
  drugInteractions: string[];
  lifestyleAdvice: string[];
  aiDoctorPrompt: string;
  // Validation Metadata
  validationScore?: number;
  validationReport?: PrescriptionValidationReport;
  totalMedicationsCount?: number;
  verifiedMedicationsCount?: number;
  potentialMonthlySavingsINR?: number;
}

export interface OCRProcessResult {
  success: boolean;
  rawText: string;
  confidence: number;
  engine: 'tesseract' | 'sample' | 'fallback';
  parsed: ParsedPrescription;
  processingTimeMs: number;
  error?: string;
}

export class TesseractService {
  /**
   * Processes an image (Base64 string or Buffer) using Tesseract OCR.
   * Cleans extracted text and normalizes medical abbreviations.
   */
  public static async recognizeImage(imageInput: string | Buffer): Promise<{ rawText: string; confidence: number }> {
    let worker: Worker | null = null;
    try {
      // Initialize Tesseract worker for English language
      worker = await createWorker('eng');
      
      let inputTarget: string | Buffer = imageInput;

      // If Base64 string with data URI prefix, remove prefix if needed or pass directly
      if (typeof imageInput === 'string' && imageInput.startsWith('data:image')) {
        const commaIndex = imageInput.indexOf(',');
        if (commaIndex !== -1) {
          const base64Data = imageInput.substring(commaIndex + 1);
          inputTarget = Buffer.from(base64Data, 'base64');
        }
      } else if (typeof imageInput === 'string' && !imageInput.startsWith('http') && !imageInput.startsWith('/')) {
        // Raw base64 string
        inputTarget = Buffer.from(imageInput, 'base64');
      }

      const { data } = await worker.recognize(inputTarget);
      const rawText = data.text ? data.text.trim() : '';
      const confidence = typeof data.confidence === 'number' ? Math.round(data.confidence) : 85;

      return { rawText, confidence };
    } catch (err: any) {
      console.warn('[TesseractService] OCR extraction warning:', err?.message || err);
      throw err;
    } finally {
      if (worker) {
        try {
          await worker.terminate();
        } catch (_) {
          // Ignore cleanup errors
        }
      }
    }
  }

  /**
   * Clinical regex and rule-based parser for fallback when LLM is unavailable or for rapid parsing.
   */
  public static parsePrescriptionHeuristics(text: string): ParsedPrescription {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let doctorName = 'Verified Clinician';
    let hospital = 'Hospital / Medical Center';
    let diagnosis = 'Clinical Health Consultation';
    const rawMeds: any[] = [];

    for (const line of lines) {
      const lower = line.toLowerCase();
      if (lower.includes('dr.') || lower.includes('doctor:')) {
        doctorName = line.replace(/doctor:?/i, '').trim();
      }
      if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('speciality') || lower.includes('health center')) {
        hospital = line.trim();
      }
      if (lower.includes('diagnosis:') || lower.includes('condition:') || lower.includes('impression:')) {
        diagnosis = line.replace(/(diagnosis|condition|impression):?/i, '').trim();
      }

      // Check for prescription drug patterns (Tab, Cap, Syp, Inj, Ointment, mg, ml, SR, OD, BD, TDS)
      const drugMatch = line.match(/^(\d+[\.\)]\s*)?(\b(tab|cap|syp|inj|ointment|cream|gel|drops|syrup)\b\.?\s*)?([a-zA-Z0-9\-\+\s]{3,40})\s+(\d+\s*(?:mg|mcg|ml|g|iu|%)(?:\s*(?:SR|ER|CR|XL|DS))?)/i);
      
      if (drugMatch) {
        const drugName = `${drugMatch[3] ? drugMatch[3].toUpperCase() + '. ' : ''}${drugMatch[4].trim()} ${drugMatch[5].trim()}`;
        const rest = line.substring(line.indexOf(drugMatch[5]) + drugMatch[5].length).trim();
        
        let timing = 'Twice daily after food';
        if (rest.toLowerCase().includes('morning') || rest.toLowerCase().includes('od') || rest.toLowerCase().includes('daily')) {
          timing = 'Once daily in the morning';
        } else if (rest.toLowerCase().includes('night') || rest.toLowerCase().includes('bedtime') || rest.toLowerCase().includes('hs')) {
          timing = '1 tablet at bedtime';
        } else if (rest.toLowerCase().includes('sos') || rest.toLowerCase().includes('as needed') || rest.toLowerCase().includes('fever')) {
          timing = 'SOS (As needed for acute discomfort)';
        }

        let duration = '30 days';
        const durMatch = rest.match(/x\s*(\d+\s*(?:days|weeks|months|d|w|m))/i) || rest.match(/(\d+\s*(?:days|weeks|months))/i);
        if (durMatch) {
          duration = durMatch[1];
        }

        rawMeds.push({
          name: drugName,
          dosage: rest.includes('-') ? rest.split('-')[1].trim() : 'As prescribed by doctor',
          timing,
          duration,
          purpose: 'Prescribed therapeutic management',
          critical_precaution: 'Take with adequate water; do not exceed prescribed dosage',
        });
      }
    }

    if (rawMeds.length === 0) {
      // Default common clinical scaffold if OCR was partial
      rawMeds.push({
        name: 'Prescription Medication Course',
        dosage: '1 unit as directed',
        timing: 'Follow clinician instructions',
        duration: 'Duration specified on Rx',
        purpose: 'Prescribed treatment regimen',
        critical_precaution: 'Consult physician or pharmacist before modifying dose',
      });
    }

    // Apply the verified medication validation layer
    const validationReport = crossReferencePrescriptionMedications(rawMeds);
    const validatedMedications: ExtractedMedication[] = rawMeds.map((m, idx) => {
      const v = validationReport.validatedMedications[idx];
      if (v && v.isVerified) {
        return {
          name: v.canonicalName,
          dosage: m.dosage || v.matchedStrength || 'Standard',
          timing: m.timing || v.timing,
          duration: m.duration || 'As prescribed',
          purpose: v.therapeuticCategory || m.purpose,
          critical_precaution: v.criticalPrecautions[0] || m.critical_precaution,
          isVerified: true,
          canonicalName: v.canonicalName,
          genericName: v.genericName,
          validationConfidence: v.confidence,
          matchType: v.matchType,
          genericAlternative: v.genericAlternative,
          savingsPercent: v.savingsPercent,
          brandedPriceINR: v.brandedPriceINR,
          genericPriceINR: v.genericPriceINR,
          foodInteractions: v.foodInteractions,
          pregnancySafety: v.pregnancySafety,
          prescriptionRequired: v.prescriptionRequired,
          defaultReminderTimes: v.defaultReminderTimes
        };
      }
      return {
        ...m,
        isVerified: false,
        validationConfidence: v ? v.confidence : 40,
        matchType: 'unverified'
      };
    });

    const drugInteractions: string[] = [
      ...validationReport.flaggedInteractions.map(f => `[${f.severity} Alert] ${f.drugA} + ${f.drugB}: ${f.description} (${f.advice})`),
      'Review complete list of medications with your physician to prevent duplicate active ingredients.',
      'Avoid alcohol consumption with sedative and antibiotic medications.'
    ];

    return {
      doctorName,
      clinicHospital: hospital,
      patientDetails: 'Analyzed Patient Rx Document',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medications: validatedMedications,
      drugInteractions,
      lifestyleAdvice: [
        'Maintain healthy hydration, adhere strictly to the dosage schedule, and store medications in a cool, dry place.'
      ],
      aiDoctorPrompt: `I just scanned a prescription from ${doctorName} for ${diagnosis}. It contains: ${validatedMedications.map(m => `${m.name} (${m.dosage})`).join(', ')}. Can you explain what each medicine does, the proper schedule, potential food interactions, and precautions?`,
      validationScore: validationReport.validationScore,
      validationReport,
      totalMedicationsCount: validationReport.totalScanned,
      verifiedMedicationsCount: validationReport.verifiedCount,
      potentialMonthlySavingsINR: validationReport.potentialMonthlySavingsINR
    };
  }

  /**
   * Deep clinical entity extraction using Grok / Gemini with integrated OCR Validation Layer.
   */
  public static async extractClinicalEntities(rawText: string): Promise<ParsedPrescription> {
    const systemPrompt = `You are an expert Clinical Pharmacist and Medical Document OCR Analyst for HealthGPT.
Analyze the following prescription OCR text and output strict JSON with NO Markdown fences:
{
  "doctorName": "Doctor Name or N/A",
  "clinicHospital": "Hospital or Clinic Name",
  "patientDetails": "Patient age/gender/name",
  "date": "Prescription date",
  "diagnosis": "Diagnosed condition",
  "medications": [
    {
      "name": "Medicine Name and Strength",
      "dosage": "e.g. 1 tab twice daily",
      "timing": "e.g. After food / Morning",
      "duration": "e.g. 5 days / 30 days",
      "purpose": "Why this medicine is prescribed",
      "critical_precaution": "Important warning or food/drug caution"
    }
  ],
  "drugInteractions": ["Potential drug-drug or food interactions to be aware of"],
  "lifestyleAdvice": ["Key doctor advice mentioned or recommended for this condition"],
  "aiDoctorPrompt": "A synthesized patient question for HealthGPT AI Doctor regarding this exact prescription"
}`;

    let parsedResult: ParsedPrescription | null = null;

    // 1. Try through LLM Dispatcher
    try {
      const llmRes = await LLMDispatcher.execute({
        systemInstruction: systemPrompt,
        userPrompt: `Prescription OCR text:\n${rawText}`,
        preferredEngine: 'auto',
        temperature: 0.1,
      });

      if (llmRes && llmRes.text) {
        let cleanJson = llmRes.text.trim();
        if (cleanJson.startsWith('```json')) {
          cleanJson = cleanJson.substring(7);
        }
        if (cleanJson.startsWith('```')) {
          cleanJson = cleanJson.substring(3);
        }
        if (cleanJson.endsWith('```')) {
          cleanJson = cleanJson.substring(0, cleanJson.length - 3);
        }
        cleanJson = cleanJson.trim();

        const parsed = JSON.parse(cleanJson);
        if (parsed && Array.isArray(parsed.medications) && parsed.medications.length > 0) {
          parsedResult = parsed;
        }
      }
    } catch (err: any) {
      console.warn('[TesseractService] LLM clinical entity extraction fallback:', err?.message || err);
    }

    // 2. Fallback to heuristic parser if LLM failed
    if (!parsedResult) {
      parsedResult = this.parsePrescriptionHeuristics(rawText);
    }

    // 3. CORE VALIDATION LAYER: Cross-reference extracted medications against verified database
    const validationReport = crossReferencePrescriptionMedications(parsedResult.medications || []);
    
    const enrichedMedications: ExtractedMedication[] = (parsedResult.medications || []).map((med, idx) => {
      const v = validationReport.validatedMedications[idx];
      if (v && v.isVerified) {
        return {
          name: v.canonicalName || med.name,
          dosage: med.dosage || v.matchedStrength || 'Standard Dose',
          timing: med.timing || v.timing || 'After food',
          duration: med.duration || 'Full course',
          purpose: med.purpose || v.therapeuticCategory || 'Clinical therapeutic management',
          critical_precaution: v.criticalPrecautions[0] || med.critical_precaution || 'Take with water',
          isVerified: true,
          canonicalName: v.canonicalName,
          genericName: v.genericName,
          validationConfidence: v.confidence,
          matchType: v.matchType,
          genericAlternative: v.genericAlternative,
          savingsPercent: v.savingsPercent,
          brandedPriceINR: v.brandedPriceINR,
          genericPriceINR: v.genericPriceINR,
          foodInteractions: v.foodInteractions,
          pregnancySafety: v.pregnancySafety,
          prescriptionRequired: v.prescriptionRequired,
          defaultReminderTimes: v.defaultReminderTimes
        };
      }
      return {
        ...med,
        isVerified: false,
        validationConfidence: v ? v.confidence : 45,
        matchType: 'unverified',
        genericAlternative: 'Consult pharmacist for Jan Aushadhi generic alternative',
        savingsPercent: 50
      };
    });

    // Merge detected pairwise drug-drug interactions with existing alerts
    const interactionAlerts: string[] = [
      ...(parsedResult.drugInteractions || []),
      ...validationReport.flaggedInteractions.map(f => `[${f.severity} Alert] ${f.drugA} + ${f.drugB}: ${f.description} (${f.advice})`)
    ];
    // Remove duplicates
    const uniqueInteractions = Array.from(new Set(interactionAlerts));

    // Synthesize high-accuracy AI Doctor prompt
    const verifiedNames = enrichedMedications.map(m => m.name).join(', ');
    const aiDoctorPrompt = parsedResult.aiDoctorPrompt || `I just scanned a prescription for ${parsedResult.diagnosis || 'my condition'} containing ${verifiedNames}. Can you explain each medicine, how to take them, potential side effects, and any precautions I should know?`;

    return {
      doctorName: parsedResult.doctorName || 'Verified Clinician',
      clinicHospital: parsedResult.clinicHospital || 'Medical Center',
      patientDetails: parsedResult.patientDetails || 'Patient Rx Document',
      date: parsedResult.date || new Date().toISOString().split('T')[0],
      diagnosis: parsedResult.diagnosis || 'Clinical Prescription',
      medications: enrichedMedications,
      drugInteractions: uniqueInteractions,
      lifestyleAdvice: parsedResult.lifestyleAdvice || ['Follow prescribed timing and complete course.'],
      aiDoctorPrompt,
      validationScore: validationReport.validationScore,
      validationReport,
      totalMedicationsCount: validationReport.totalScanned,
      verifiedMedicationsCount: validationReport.verifiedCount,
      potentialMonthlySavingsINR: validationReport.potentialMonthlySavingsINR
    };
  }

  /**
   * Complete End-to-End Pipeline:
   * Image/Base64/Text -> Tesseract OCR -> Clinical Parsing -> Database Cross-Reference & Validation -> AI Doctor Context Payload
   */
  public static async processPrescriptionPipeline(params: {
    imageBase64?: string;
    rawText?: string;
    sampleId?: string;
  }): Promise<OCRProcessResult> {
    const startTime = Date.now();
    let textToProcess = (params.rawText || '').trim();
    let confidence = 95;
    let engine: 'tesseract' | 'sample' | 'fallback' = 'sample';

    // 1. If image provided, run Tesseract OCR
    if (params.imageBase64 && params.imageBase64.length > 100) {
      try {
        const ocrResult = await this.recognizeImage(params.imageBase64);
        if (ocrResult.rawText && ocrResult.rawText.length > 5) {
          textToProcess = ocrResult.rawText;
          confidence = ocrResult.confidence;
          engine = 'tesseract';
        }
      } catch (ocrErr: any) {
        console.warn('[TesseractService] OCR processing error, checking fallbacks:', ocrErr?.message);
      }
    }

    // 2. If no text yet and sampleId provided, use sample
    if (!textToProcess && params.sampleId) {
      const samples: Record<string, string> = {
        cardio_htn: `APOLLO HOSPITALS CLINICAL RX
Doctor: Dr. Rajesh Sharma (Reg: MCI-38291)
Patient: John Doe, 45M | Date: 2026-08-20
Diagnosis: Stage 1 Essential Hypertension & Mild Dyslipidemia
Rx:
1. Tab. Telmisartan 40 mg - 1 tab daily in morning after breakfast x 30 days
2. Tab. Amlodipine 5 mg - 1 tab at bedtime x 30 days
3. Tab. Rosuvastatin 10 mg - 1 tab at night after dinner x 30 days
Advice: Low sodium diet (< 2g/day), 30 min brisk walk daily, monitor BP weekly. Review in 1 month.`,
        resp_infect: `MAX SUPER SPECIALITY HOSPITAL RX
Doctor: Dr. Amit Bansal (Reg: DMC-67123)
Patient: Sarah Khan, 28F | Date: 2026-08-22
Diagnosis: Acute Bronchitis & Allergic Rhinosinusitis
Rx:
1. Cap. Amoxicillin-Clavulanate 625 mg - 1 cap twice daily after food x 5 days
2. Tab. Montelukast 10mg + Levocetirizine 5mg (Montair-LC) - 1 tab bedtime x 10 days
3. Syp. Ascoril-D (Dextromethorphan + Phenylephrine) - 10 ml thrice daily x 5 days
4. Tab. Paracetamol 650 mg (Dolo-650) - 1 tab SOS for fever/headache
Advice: Steam inhalation twice daily, warm water hydration, avoid cold drinks. Complete antibiotic course.`,
        diabetes_regimen: `YASHODA HOSPITALS METABOLIC RX
Doctor: Dr. Sunita Reddy (Reg: APMC-88342)
Patient: Ramesh Kumar, 52M | Date: 2026-08-21
Diagnosis: Type 2 Diabetes Mellitus & Metabolic Syndrome (HbA1c: 7.8%)
Rx:
1. Tab. Metformin Hydrochloride 500 mg SR - 1 tab twice daily with meals (breakfast & dinner) x 60 days
2. Tab. Glimepiride 1 mg - 1 tab before breakfast x 60 days
3. Cap. Methylcobalamin 1500 mcg + ALA - 1 cap daily after lunch x 30 days
Advice: Strict diabetic diet (low GI), post-meal walking 15 min, monitor fasting & post-prandial blood sugar.`,
        derma_allergy: `MANIPAL HOSPITAL DERMATOLOGY RX
Doctor: Dr. Priya Nair (Reg: KMC-59218)
Patient: Ananya Roy, 24F | Date: 2026-08-23
Diagnosis: Acute Contact Dermatitis & Allergic Urticaria
Rx:
1. Tab. Bilastine 20 mg - 1 tab once daily in empty stomach 1 hr before breakfast x 7 days
2. Cream Desonide 0.05% - Apply thin layer on affected rashes twice daily x 7 days
3. Calamine & Aloe soothing lotion - Apply SOS for itching
Advice: Avoid scented soaps and synthetic wool, keep skin moisturized.`
      };
      if (samples[params.sampleId]) {
        textToProcess = samples[params.sampleId];
        engine = 'sample';
        confidence = 99;
      }
    }

    if (!textToProcess) {
      return {
        success: false,
        rawText: '',
        confidence: 0,
        engine: 'fallback',
        parsed: this.parsePrescriptionHeuristics(''),
        processingTimeMs: Date.now() - startTime,
        error: 'No readable prescription text or image content detected.',
      };
    }

    // 3. Extract clinical entities with database cross-referencing validation layer
    const parsed = await this.extractClinicalEntities(textToProcess);

    return {
      success: true,
      rawText: textToProcess,
      confidence,
      engine,
      parsed,
      processingTimeMs: Date.now() - startTime,
    };
  }
}
