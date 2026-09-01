/**
 * Medical Language Translation Service
 * HealthGPT Multi-Language Intelligence Layer
 *
 * Provides high-accuracy medical translation across 30+ global and regional languages,
 * preserving clinical terminology, drug dosages, brand names, and safety disclaimers.
 */

import { LLMDispatcher } from './llmDispatcher.js';
import { GrokService } from './grokService.js';

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechLocale: string;
  direction?: 'ltr' | 'rtl';
}

export interface TranslationResult {
  success: boolean;
  translatedText: string;
  sourceText: string;
  sourceLang: string;
  targetLang: string;
  targetLanguageName: string;
  targetNativeName: string;
  engine: string;
  source: string;
  cached?: boolean;
  error?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechLocale: 'en-US', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechLocale: 'hi-IN', direction: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechLocale: 'te-IN', direction: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechLocale: 'ta-IN', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speechLocale: 'bn-IN', direction: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechLocale: 'mr-IN', direction: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechLocale: 'gu-IN', direction: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechLocale: 'kn-IN', direction: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speechLocale: 'ml-IN', direction: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechLocale: 'pa-IN', direction: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', speechLocale: 'ur-PK', direction: 'rtl' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speechLocale: 'or-IN', direction: 'ltr' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speechLocale: 'as-IN', direction: 'ltr' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', speechLocale: 'ne-NP', direction: 'ltr' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳', speechLocale: 'sa-IN', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechLocale: 'es-ES', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechLocale: 'ar-SA', direction: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechLocale: 'fr-FR', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechLocale: 'de-DE', direction: 'ltr' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', speechLocale: 'zh-CN', direction: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechLocale: 'ja-JP', direction: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', speechLocale: 'ru-RU', direction: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', speechLocale: 'pt-BR', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speechLocale: 'it-IT', direction: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', speechLocale: 'tr-TR', direction: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', speechLocale: 'id-ID', direction: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speechLocale: 'ko-KR', direction: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', speechLocale: 'nl-NL', direction: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', speechLocale: 'pl-PL', direction: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', speechLocale: 'vi-VN', direction: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', speechLocale: 'th-TH', direction: 'ltr' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', speechLocale: 'fa-IR', direction: 'rtl' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', speechLocale: 'sw-KE', direction: 'ltr' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', speechLocale: 'el-GR', direction: 'ltr' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', speechLocale: 'sv-SE', direction: 'ltr' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', speechLocale: 'uk-UA', direction: 'ltr' },
  { code: 'tl', name: 'Tagalog (Filipino)', nativeName: 'Filipino', flag: '🇵🇭', speechLocale: 'fil-PH', direction: 'ltr' }
];

// Offline clinical translation dictionaries for rapid fallback
const COMMON_CLINICAL_DICTIONARY: Record<string, Record<string, string>> = {
  'Take 1 tablet daily after food': {
    hi: 'भोजन के बाद प्रतिदिन 1 गोली लें',
    es: 'Tome 1 tableta al día después de las comidas',
    te: 'భోజనం తర్వాత రోజుకు 1 మాత్ర తీసుకోండి',
    ta: 'உணவுக்குப் பிறகு தினமும் 1 மாத்திரை எடுக்கவும்',
    fr: 'Prendre 1 comprimé par jour après le repas',
    ar: 'تناول قرصاً واحداً يومياً بعد الأكل'
  },
  'Emergency: seek immediate medical attention': {
    hi: 'आपातकाल: तुरंत चिकित्सीय सहायता लें',
    es: 'Emergencia: busque atención médica inmediata',
    te: 'అత్యవసరం: వెంటనే వైద్య సహాయం పొందండి',
    ta: 'அவசரம்: உடனடியாக மருத்துவ உதவியை நாடுங்கள்',
    fr: 'Urgence : consultez immédiatement un médecin',
    ar: 'حالة طارئة: اطلب الرعاية الطبية الفورية'
  }
};

export class TranslationService {
  /**
   * Retrieves full list of supported languages.
   */
  public static getSupportedLanguages(): LanguageInfo[] {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Finds language info by code or name.
   */
  public static getLanguageInfo(codeOrName: string): LanguageInfo {
    const query = String(codeOrName || 'en').toLowerCase().trim();
    const found = SUPPORTED_LANGUAGES.find(
      l => l.code.toLowerCase() === query || l.name.toLowerCase() === query || l.nativeName.toLowerCase() === query
    );
    return found || SUPPORTED_LANGUAGES[0];
  }

  /**
   * Translates healthcare text, preserving clinical precision, medication dosages,
   * brand names, formatting, and markdown layout.
   */
  public static async translateMedicalText(options: {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
    preferredEngine?: string;
    domainContext?: 'general_medical' | 'prescription' | 'mental_health' | 'period_cycle';
  }): Promise<TranslationResult> {
    const {
      text,
      targetLanguage,
      sourceLanguage = 'auto',
      preferredEngine = 'auto',
      domainContext = 'general_medical'
    } = options;

    const trimmedText = String(text || '').trim();
    const targetInfo = this.getLanguageInfo(targetLanguage);

    if (!trimmedText) {
      return {
        success: false,
        translatedText: '',
        sourceText: '',
        sourceLang: sourceLanguage,
        targetLang: targetInfo.code,
        targetLanguageName: targetInfo.name,
        targetNativeName: targetInfo.nativeName,
        engine: 'none',
        source: 'Translation Service',
        error: 'No text provided for translation.'
      };
    }

    // If source and target are the same language, return immediately
    if (sourceLanguage.toLowerCase() === targetInfo.code.toLowerCase() || 
       (sourceLanguage === 'en' && targetInfo.code === 'en')) {
      return {
        success: true,
        translatedText: trimmedText,
        sourceText: trimmedText,
        sourceLang: 'en',
        targetLang: targetInfo.code,
        targetLanguageName: targetInfo.name,
        targetNativeName: targetInfo.nativeName,
        engine: 'passthrough',
        source: 'HealthGPT Multi-Language Engine'
      };
    }

    const systemPrompt = `You are HealthGPT's Certified Clinical Medical Translator.
Translate the following medical text accurately into ${targetInfo.name} (${targetInfo.nativeName}).

Translation Rules:
1. Preserve clinical accuracy, medical drug names (e.g., Telmisartan, Amoxicillin), dosages (mg, ml), and numerical metrics.
2. Keep the original markdown structure (bolding, bullet points, headers).
3. Ensure natural, fluent, and culturally appropriate phrasing in ${targetInfo.name}.
4. Output ONLY the translated text with NO meta-explanations or conversational filler.`;

    const userPrompt = `Source Language: ${sourceLanguage}
Target Language: ${targetInfo.name} (${targetInfo.nativeName})
Domain Context: ${domainContext}

Text to translate:
"""
${trimmedText}
"""`;

    // Dispatch translation via Grok or Gemini
    try {
      const llmResult = await LLMDispatcher.execute({
        systemInstruction: systemPrompt,
        userPrompt,
        preferredEngine,
        temperature: 0.2, // Low temperature for high translation fidelity
      });

      if (llmResult && llmResult.text) {
        let cleanText = llmResult.text.trim();
        // Remove surrounding quotes if model added them
        if (cleanText.startsWith('"""') && cleanText.endsWith('"""')) {
          cleanText = cleanText.substring(3, cleanText.length - 3).trim();
        }

        return {
          success: true,
          translatedText: cleanText,
          sourceText: trimmedText,
          sourceLang: sourceLanguage,
          targetLang: targetInfo.code,
          targetLanguageName: targetInfo.name,
          targetNativeName: targetInfo.nativeName,
          engine: llmResult.engine,
          source: `${llmResult.source} · Medical Translation`,
        };
      }
    } catch (err: any) {
      console.warn('[TranslationService] LLM translation fallback:', err?.message || err);
    }

    // Check offline dictionary fallback
    if (COMMON_CLINICAL_DICTIONARY[trimmedText] && COMMON_CLINICAL_DICTIONARY[trimmedText][targetInfo.code]) {
      return {
        success: true,
        translatedText: COMMON_CLINICAL_DICTIONARY[trimmedText][targetInfo.code],
        sourceText: trimmedText,
        sourceLang: 'en',
        targetLang: targetInfo.code,
        targetLanguageName: targetInfo.name,
        targetNativeName: targetInfo.nativeName,
        engine: 'offline_clinical_dict',
        source: 'HealthGPT Clinical Offline Lexicon'
      };
    }

    // Fallback: Return original text with warning note
    return {
      success: false,
      translatedText: trimmedText,
      sourceText: trimmedText,
      sourceLang: sourceLanguage,
      targetLang: targetInfo.code,
      targetLanguageName: targetInfo.name,
      targetNativeName: targetInfo.nativeName,
      engine: 'fallback',
      source: 'HealthGPT Fallback',
      error: `Could not translate to ${targetInfo.name}. Returning original text.`
    };
  }

  /**
   * Translates an entire structured prescription document.
   */
  public static async translatePrescription(
    prescription: any,
    targetLanguage: string,
    preferredEngine = 'auto'
  ): Promise<any> {
    const targetInfo = this.getLanguageInfo(targetLanguage);
    if (targetInfo.code === 'en') {
      return prescription;
    }

    const prompt = `Translate this structured clinical prescription JSON object into ${targetInfo.name} (${targetInfo.nativeName}).
Translate the diagnosis, medicine purpose, instructions, precautions, drug interactions, and lifestyle advice into natural ${targetInfo.name}.
Keep medicine brand names and scientific names understandable. Output valid JSON only:

${JSON.stringify(prescription, null, 2)}`;

    try {
      const llmResult = await LLMDispatcher.execute({
        systemInstruction: `You are a Medical Translation Specialist. Output valid JSON with no Markdown wrappers.`,
        userPrompt: prompt,
        preferredEngine,
        temperature: 0.1,
      });

      if (llmResult && llmResult.text) {
        let clean = llmResult.text.trim();
        if (clean.startsWith('```json')) clean = clean.substring(7);
        if (clean.startsWith('```')) clean = clean.substring(3);
        if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
        clean = clean.trim();

        const translatedObj = JSON.parse(clean);
        return translatedObj;
      }
    } catch (err) {
      console.warn('[TranslationService] Structured Rx translation fallback:', err);
    }

    return prescription;
  }

  /**
   * Translates a comprehensive clinical medicine monograph and pharmacology profile.
   */
  public static async translateMedicineProfile(
    medicineData: any,
    targetLanguage: string,
    preferredEngine = 'auto'
  ): Promise<any> {
    const targetInfo = this.getLanguageInfo(targetLanguage);
    if (targetInfo.code === 'en') {
      return {
        success: true,
        targetLanguage: 'en',
        targetLanguageName: 'English',
        targetNativeName: 'English',
        translatedProfile: medicineData,
        formattedSummary: typeof medicineData === 'object' ? JSON.stringify(medicineData, null, 2) : String(medicineData)
      };
    }

    const prompt = `You are an expert Clinical Pharmacologist and Medical Translator.
Translate the following Medicine AI Pharmacology Profile into ${targetInfo.name} (${targetInfo.nativeName}).

CRITICAL TRANSLATION MANDATES:
1. Translate clinical indications, dosage timings, food-drug warnings, contraindications, and patient advice clearly and naturally for patients in ${targetInfo.name}.
2. Keep the generic molecule chemical name in English / Latin script alongside ${targetInfo.name} phonetics (e.g., Telmisartan / टेल्मीसार्टन).
3. Provide a clear, empathetic summary explaining:
   - What this medicine treats
   - Exactly how and when to take it (with/without food)
   - Crucial precautions, missed dose steps, and food interactions to avoid
   - Generic alternatives with cost savings.

Input Medicine Profile:
${typeof medicineData === 'object' ? JSON.stringify(medicineData, null, 2) : String(medicineData)}

Output a valid JSON object with the following schema:
{
  "medicineName": "Original / Transliterated name",
  "genericName": "Active Molecule",
  "category": "Therapeutic Class in ${targetInfo.name}",
  "indications": "What it treats in ${targetInfo.name}",
  "dosageSchedule": "Dosage & timing guidance in ${targetInfo.name}",
  "howToTake": "Administration instructions (before/after meals) in ${targetInfo.name}",
  "warnings": "Side effects & safety warnings in ${targetInfo.name}",
  "foodInteractions": "Food & alcohol precautions in ${targetInfo.name}",
  "missedDoseAdvice": "What to do if a dose is missed in ${targetInfo.name}",
  "contraindications": ["Contraindication 1 in ${targetInfo.name}", "Contraindication 2 in ${targetInfo.name}"],
  "genericSavings": "Generic Jan Aushadhi alternatives and price savings in ${targetInfo.name}",
  "formattedPatientGuide": "A cohesive, formatted patient education guide in ${targetInfo.name}"
}`;

    try {
      const llmResult = await LLMDispatcher.execute({
        systemInstruction: `You are a certified Clinical Pharmacologist and Multi-Language Medical Translator. Always output strictly valid JSON.`,
        userPrompt: prompt,
        preferredEngine,
        temperature: 0.1,
      });

      if (llmResult && llmResult.text) {
        let clean = llmResult.text.trim();
        if (clean.startsWith('```json')) clean = clean.substring(7);
        if (clean.startsWith('```')) clean = clean.substring(3);
        if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
        clean = clean.trim();

        const translatedObj = JSON.parse(clean);
        return {
          success: true,
          targetLanguage: targetInfo.code,
          targetLanguageName: targetInfo.name,
          targetNativeName: targetInfo.nativeName,
          engine: llmResult.engine,
          source: `${llmResult.source} · Medicine AI Translator`,
          translatedProfile: translatedObj,
          formattedSummary: translatedObj.formattedPatientGuide || JSON.stringify(translatedObj, null, 2)
        };
      }
    } catch (err) {
      console.warn('[TranslationService] Medicine profile translation fallback:', err);
    }

    return {
      success: true,
      targetLanguage: targetInfo.code,
      targetLanguageName: targetInfo.name,
      targetNativeName: targetInfo.nativeName,
      engine: 'fallback',
      source: 'HealthGPT Clinical Fallback',
      translatedProfile: medicineData,
      formattedSummary: typeof medicineData === 'object' ? JSON.stringify(medicineData, null, 2) : String(medicineData)
    };
  }
}
