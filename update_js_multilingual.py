import re

with open('frontend/myi10.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect where changeGlobalLanguage is currently located
pattern = r'const LANGUAGE_VOICE_MAP = \{[\s\S]*?function changeGlobalLanguage\(langCode\) \{[\s\S]*?toast\(`🌐 App Language switched to: \$\{optName\}`\);\s*\}'

replacement = '''const SUPPORTED_LANGUAGES_LIST = [
  // Indian Regional & National Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', group: 'Primary / International' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', group: 'Indian Regional & National' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', group: 'Indian Regional & National' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', group: 'Indian Regional & National' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳', group: 'Indian Regional & National' },
  // Major International Languages
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', group: 'International' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', group: 'International' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', group: 'International' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', group: 'International' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', group: 'International' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', group: 'International' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', group: 'International' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', group: 'International' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', group: 'International' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', group: 'International' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', group: 'International' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', group: 'International' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', group: 'International' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', group: 'International' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', group: 'International' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', group: 'International' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', group: 'International' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', group: 'International' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', group: 'International' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', group: 'International' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', group: 'International' },
  { code: 'tl', name: 'Tagalog (Filipino)', nativeName: 'Filipino', flag: '🇵🇭', group: 'International' }
];

const LANGUAGE_VOICE_MAP = {
  en: 'en-US', hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN', bn: 'bn-IN',
  mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN',
  ur: 'ur-PK', or: 'or-IN', as: 'as-IN', ne: 'ne-NP', sa: 'sa-IN',
  es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', de: 'de-DE', zh: 'zh-CN',
  ja: 'ja-JP', ru: 'ru-RU', pt: 'pt-BR', it: 'it-IT', tr: 'tr-TR',
  id: 'id-ID', ko: 'ko-KR', nl: 'nl-NL', pl: 'pl-PL', vi: 'vi-VN',
  th: 'th-TH', fa: 'fa-IR', sw: 'sw-KE', el: 'el-GR', sv: 'sv-SE',
  uk: 'uk-UA', tl: 'fil-PH'
};

const CHATBOT_LOCALIZATIONS = {
  en: {
    inputPlaceholder: 'Ask Dr. HealthGPT a medical question, describe symptoms, or ask about medications...',
    statusIndicator: 'Live in English — AI responds in English',
    preTranslateNotice: '⚡ Real-time translation to English active',
    doctor: {
      greeting: 'Hello! I am **Dr. HealthGPT**, your Chief Medical Intelligence Physician. How can I support your health today? You can describe symptoms, ask about medications, paste lab values, or attach a prescription for a detailed safety audit.',
      placeholder: 'Ask Dr. HealthGPT a medical question, describe symptoms, or ask about medications...',
      chips: [
        'What are the red-flag symptoms of high blood pressure?',
        'I have had a throbbing tension headache for 2 days',
        'Explain the medical risks of elevated fasting glucose',
        'How do I naturally lower high LDL cholesterol?'
      ]
    },
    therapist: {
      greeting: 'Hi, I am **Dr. Maya** 🌱. This is a calm, confidential space to explore your feelings, decompress from stress, or practice mindful breathing. What is on your mind today?',
      placeholder: 'Share what is on your mind or how you are feeling right now...',
      chips: [
        'Guide me through a 2-minute calming breathing loop',
        'I feel overwhelmed with work stress and exhaustion',
        'How can I break out of late-night overthinking?',
        'Give me a positive CBT reframing for self-doubt'
      ]
    },
    pharmacist: {
      greeting: 'Welcome! I am **PharmAI Specialist**, your Clinical Pharmacology AI. I can review drug combinations, explain active ingredients, verify Jan Aushadhi generic equivalents, and check food interactions.',
      placeholder: 'Ask PharmAI about medications, dosages, chemical salts, or interactions...',
      chips: [
        'Can I take Pantoprazole 40mg with morning coffee?',
        'What is the Jan Aushadhi generic alternative for Telmisartan?',
        'What are the critical boxed warnings for Metformin?',
        'Check drug interactions between Paracetamol and Ibuprofen'
      ]
    },
    nutritionist: {
      greeting: 'Hello! I am **Dr. Priya**, Clinical Dietitian & Metabolic Health Nutritionist. I craft evidence-based meal blueprints, manage blood sugar curves, and design customized micronutrient plans.',
      placeholder: 'Ask Dr. Priya about diet plans, glycemic index, gut health, or calories...',
      chips: [
        'Design a 7-day Indian diabetes-friendly meal plan',
        'What are the best low-glycemic breakfast options?',
        'How do I increase dietary fiber for gut microbiome health?',
        'Suggest high-protein vegetarian snacks under 200 calories'
      ]
    },
    pediatric: {
      greeting: 'Hello! I am **Dr. Sophie**, Pediatric & Family Wellness Consultant. I assist parents with child milestone tracking, pediatric fever management, vaccine schedules, and gentle family health guidance.',
      placeholder: 'Ask Dr. Sophie about child health, pediatric fever, vaccines, or milestones...',
      chips: [
        'How do I manage a 101°F fever in a 4-year-old child safely?',
        'What is the standard Indian vaccination schedule for toddlers?',
        'Tips for dealing with toddler colic and digestive discomfort',
        'When should childhood persistent cough be evaluated by a pediatrician?'
      ]
    },
    longevity: {
      greeting: 'Welcome! I am **Coach Ryan**, Longevity, Sleep & Biometric Optimization Specialist. I help you optimize Zone 2 cardio, elevate HRV (Heart Rate Variability), and build resilient sleep architecture.',
      placeholder: 'Ask Coach Ryan about sleep optimization, HRV, Zone 2 cardio, or VO2 max...',
      chips: [
        'How can I increase deep sleep percentage and optimize sleep architecture?',
        'What protocol should I follow to boost my Heart Rate Variability (HRV)?',
        'How many minutes of Zone 2 cardio per week is optimal for metabolic health?',
        'Explain the biomarkers for biological age versus chronological age'
      ]
    }
  },
  hi: {
    inputPlaceholder: 'चिकित्सा प्रश्न पूछें, लक्षण बताएं या दवाओं के बारे में जानकारी प्राप्त करें...',
    statusIndicator: 'हिन्दी में लाइव — AI हिन्दी में उत्तर देगा',
    preTranslateNotice: '⚡ हिन्दी में रीयल-टाइम AI अनुवाद सक्रिय',
    doctor: {
      greeting: 'नमस्ते! मैं **डॉ. HealthGPT** हूँ, आपका AI मुख्य चिकित्सा सलाहकार। आज मैं आपकी क्या सहायता कर सकता हूँ? आप लक्षण बता सकते हैं, दवाओं या लैब टेस्ट रिपोर्ट के बारे में पूछ सकते हैं।',
      placeholder: 'डॉ. HealthGPT से कोई भी स्वास्थ्य प्रश्न पूछें या लक्षण बताएं...',
      chips: [
        'उच्च रक्तचाप (High BP) के मुख्य लक्षण और सावधानियां क्या हैं?',
        'मुझे 2 दिनों से तेज सिरदर्द है, मुझे क्या करना चाहिए?',
        'फास्टिंग ब्लड शुगर सामान्य रखने के घरेलू व डॉक्टरी उपाय',
        'कोलेस्ट्रॉल कम करने के लिए सबसे बेहतर आहार और व्यायाम क्या हैं?'
      ]
    },
    therapist: {
      greeting: 'नमस्ते, मैं **डॉ. माया** 🌱 हूँ। यह आपके तनाव को कम करने, चिंता दूर करने और मन की बात साझा करने का सुरक्षित स्थान है। आज आपका मूड कैसा है?',
      placeholder: 'अपने विचार, तनाव या भावनाएं यहाँ साझा करें...',
      chips: [
        '2 मिनट का शांत और गहरा प्राणायाम / श्वास अभ्यास करवाएं',
        'काम के तनाव और अत्यधिक थकान से कैसे राहत पाएं?',
        'रात को अत्यधिक सोचने (Overthinking) की आदत कैसे रोकें?',
        'मानसिक शांति और सकारात्मक सोच के लिए उपयोगी टिप्स'
      ]
    },
    pharmacist: {
      greeting: 'स्वागत है! मैं **PharmAI विशेषज्ञ** हूँ, आपका क्लिनिकल फार्माकोलॉजी AI। मैं दवाओं के सही संयोजन, जन औषधि जेनेरिक विकल्प और भोजन के साथ परस्पर प्रभाव की जांच करता हूँ।',
      placeholder: 'दवाओं, खुराक, सॉल्ट नाम या ड्रग इंटरैक्शन के बारे में पूछें...',
      chips: [
        'क्या पैंटोप्राजोल 40mg को सुबह खाली पेट चाय/कॉफी के साथ ले सकते हैं?',
        'टेल्मिसार्टन (Telmisartan) का जन औषधि जेनेरिक विकल्प क्या है?',
        'मेटफॉर्मिन लेते समय किन सावधानियों का ध्यान रखना चाहिए?',
        'पैरासिटामोल और इबुप्रोफेन के बीच क्या कोई इंटरैक्शन है?'
      ]
    },
    nutritionist: {
      greeting: 'नमस्ते! मैं **डॉ. प्रिया** हूँ, क्लिनिकल डायटीशियन। मैं आपके ब्लड शुगर, वजन और मेटाबॉलिज्म के अनुसार संतुलित भारतीय आहार योजना तैयार करती हूँ।',
      placeholder: 'डाइट प्लान, कैलोरी, ग्लाइसेमिक इंडेक्स या पोषण के बारे में पूछें...',
      chips: [
        'डायबिटीज रोगियों के लिए 7 दिनों का स्वस्थ भारतीय डाइट चार्ट',
        'नाश्ते के लिए सबसे अच्छे कम ग्लाइसेमिक विकल्प क्या हैं?',
        'पाचन तंत्र और आंतों के स्वास्थ्य के लिए फाइबर कैसे बढ़ाएं?',
        'शाकाहारियों के लिए उच्च प्रोटीन युक्त हल्के स्नैक्स'
      ]
    },
    pediatric: {
      greeting: 'नमस्ते! मैं **डॉ. सोफी** हूँ, बाल रोग (Pediatrics) सलाहकार। मैं बच्चों के बुखार, टीकाकरण चार्ट और विकास के चरणों में मार्गदर्शन करती हूँ।',
      placeholder: 'बच्चों के स्वास्थ्य, बुखार, टीके या पोषण के बारे में पूछें...',
      chips: [
        '4 वर्ष के बच्चे में 101°F बुखार का सुरक्षित प्रबंधन कैसे करें?',
        'छोटे बच्चों के लिए महत्वपूर्ण टीकाकरण (Vaccine) चार्ट',
        'बच्चों में पेट दर्द और गैस की समस्या का घरेलू समाधान',
        'लगातार खांसी होने पर बाल रोग विशेषज्ञ को कब दिखाना चाहिए?'
      ]
    },
    longevity: {
      greeting: 'स्वागत है! मैं **कोच रयान** हूँ, स्लीप, HRV और दीर्घायु विशेषज्ञ। मैं आपकी गहरी नींद, हृदय गति परिवर्तनशीलता (HRV) और फिटनेस को बेहतर बनाने में मदद करता हूँ।',
      placeholder: 'नींद, HRV, कार्डियो या मेटाबॉलिक हेल्थ के बारे में पूछें...',
      chips: [
        'गहरी नींद (Deep Sleep) की मात्रा कैसे बढ़ाएं?',
        'हार्ट रेट वेरिएबिलिटी (HRV) सुधारने की सर्वोत्तम तकनीकें',
        'मेटाबॉलिक स्वास्थ्य के लिए प्रति सप्ताह कितने मिनट का कार्डियो आवश्यक है?',
        'बायोलॉजिकल उम्र घटाने के शीर्ष वैज्ञानिक तरीके'
      ]
    }
  },
  te: {
    inputPlaceholder: 'వైద్య ప్రశ్న అడగండి, లక్షణాలను వివరించండి లేదా ఔషధాల గురించి అడగండి...',
    statusIndicator: 'తెలుగులో లైవ్ — AI తెలుగులో స్పందిస్తుంది',
    preTranslateNotice: '⚡ తెలుగులో నిజ-సమయ అనువాదం క్రియాశీలంగా ఉంది',
    doctor: {
      greeting: 'నమస్కారం! నేను **డాక్టర్ HealthGPT**, మీ AI చీఫ్ మెడికల్ ఇంటెలిజెన్స్ ఫిజీషియన్‌ని. ఈరోజు మీ ఆరోగ్యానికి ఎలా సహాయపడగలను? లక్షణాలు వివరించండి లేదా మందుల గురించి అడగండి.',
      placeholder: 'డాక్టర్ HealthGPT ని వైద్య ప్రశ్న అడగండి...',
      chips: [
        'అధిక రక్తపోటు (High BP) యొక్క హెచ్చరిక లక్షణాలు ఏమిటి?',
        'నాకు 2 రోజులుగా తీవ్రమైన తలనొప్పి ఉంది, ఏమి చేయాలి?',
        'ఫాస్టింగ్ బ్లడ్ షుగర్ నియంత్రణలో ఉంచడానికి ఉత్తమ మార్గాలు',
        'కొలెస్ట్రాల్‌ను సహజంగా తగ్గించడానికి డైట్ సలహాలు'
      ]
    },
    therapist: {
      greeting: 'నమస్కారం, నేను **డాక్టర్ మాయ** 🌱. ఒత్తిడిని తగ్గించుకోవడానికి మరియు మానసిక ప్రశాంతతను పొందడానికి ఇది మీ సురక్షిత స్థలం.',
      placeholder: 'మీ భావాలు లేదా ఒత్తిడిని ఇక్కడ పంచుకోండి...',
      chips: [
        '2 నిమిషాల ప్రశాంతమైన శ్వాస వ్యాయామం చూపించండి',
        'పని ఒత్తిడి మరియు అలసట నుండి ఎలా ఉపశమనం పొందాలి?',
        'రాత్రిపూట అధికంగా ఆలోచించడాన్ని (Overthinking) ఎలా ఆపాలి?',
        'మానసిక ప్రశాంతత కోసం సానుకూల చిట్కాలు'
      ]
    },
    pharmacist: {
      greeting: 'స్వాగతం! నేను **PharmAI స్పెషలిస్ట్**. మందుల మోతాదు, జన ఔషధి ప్రత్యామ్నాయాలు మరియు ఆహార పరస్పర చర్యలను వివరిస్తాను.',
      placeholder: 'మందులు, మోతాదులు లేదా ఔషధ పరస్పర చర్యల గురించి అడగండి...',
      chips: [
        'పాంటోప్రాజోల్ 40mg ని పరగడుపున టీ/కాఫీతో తీసుకోవచ్చా?',
        'టెల్మిసార్టన్ కోసం జన ఔషధి జెనెరిక్ ప్రత్యామ్నాయం ఏమిటి?',
        'మెట్‌ఫార్మిన్ తీసుకునేటప్పుడు పాటించాల్సిన జాగ్రత్తలు',
        'పారాసిటమాల్ మరియు ఇబుప్రోఫెన్ మధ్య పరస్పర చర్యలు ఉన్నాయా?'
      ]
    },
    nutritionist: {
      greeting: 'నమస్కారం! నేను **డాక్టర్ ప్రియ**, క్లినికల్ డైటీషియన్. మీ రక్తంలో చక్కెర మరియు జీవక్రియ కోసం భారతీయ డైట్ ప్లాన్‌ను రూపొందిస్తాను.',
      placeholder: 'డైట్ ప్లాన్, కేలరీలు లేదా పోషకాహారం గురించి అడగండి...',
      chips: [
        'డయాబెటిస్ కోసం 7 రోజుల ఆరోగ్యకరమైన భారతీయ ఆహార ప్రణాళిక',
        'తక్కువ గ్లైసెమిక్ అల్పాహార ఎంపికలు ఏమిటి?',
        'జీర్ణక్రియ కోసం పీచు పదార్థాన్ని (Fiber) ఎలా పెంచాలి?',
        'శాకాహారులకు అధిక ప్రోటీన్ స్నాక్స్'
      ]
    },
    pediatric: {
      greeting: 'నమస్కారం! నేను **డాక్టర్ సోఫీ**, పీడియాట్రిక్ కన్సల్టెంట్. పిల్లల జ్వరం, టీకాలు మరియు పిల్లల ఆరోగ్యంలో సహాయం చేస్తాను.',
      placeholder: 'పిల్లల ఆరోగ్యం, జ్వరం లేదా టీకాల గురించి అడగండి...',
      chips: [
        '4 సంవత్సరాల పిల్లలలో 101°F జ్వరాన్ని సురక్షితంగా ఎలా తగ్గించాలి?',
        'చిన్నపిల్లల కోసం ముఖ్యమైన టీకాల (Vaccines) చార్ట్',
        'పిల్లలలో కడుపునొప్పి మరియు గ్యాస్ సమస్యకు నివారణలు',
        'నిరంతర దగ్గు ఉంటే పిల్లల వైద్యుడిని ఎప్పుడు సంప్రదించాలి?'
      ]
    },
    longevity: {
      greeting: 'స్వాగతం! నేను **కోచ్ ర్యాన్**, దీర్ఘాయువు మరియు నిద్ర ఆప్టిమైజేషన్ నిపుణుడిని.',
      placeholder: 'నిద్ర, HRV లేదా ఫిట్‌నెస్ గురించి అడగండి...',
      chips: [
        'గాఢ నిద్రను (Deep Sleep) ఎలా మెరుగుపరచాలి?',
        'హార్ట్ రేట్ వేరియబిలిటీ (HRV) ని పెంచే విధానాలు',
        'మెటబాలిక్ ఆరోగ్యం కోసం వారానికి ఎన్ని నిమిషాల వ్యాయామం అవసరం?',
        'బయోలాజికల్ వయస్సును తగ్గించే శాస్త్రీయ పద్ధతులు'
      ]
    }
  },
  ta: {
    inputPlaceholder: 'மருத்துவ கேள்வி கேளுங்கள், அறிகுறிகளை விவரிக்கவும் அல்லது மருந்துகள் பற்றி கேட்கவும்...',
    statusIndicator: 'தமிழில் நேரலை — AI தமிழில் பதிலளிக்கும்',
    preTranslateNotice: '⚡ தமிழில் நேரடி AI மொழிபெயர்ப்பு இயக்கத்தில் உள்ளது',
    doctor: {
      greeting: 'வணக்கம்! நான் **டாக்டர் HealthGPT**, உங்கள் முதன்மை மருத்துவ AI ஆலோசகர். இன்று உங்கள் உடல்நலத்திற்கு நான் எவ்வாறு உதவ முடியும்?',
      placeholder: 'டாக்டர் HealthGPT இடம் மருத்துவ கேள்விகள் கேளுங்கள்...',
      chips: [
        'உயர் இரத்த அழுத்தத்தின் முக்கிய அறிகுறிகள் என்ன?',
        'எனக்கு 2 நாட்களாக கடுமையான தலைவலி உள்ளது, என்ன செய்வது?',
        'இரத்த சர்க்கரை அளவைக் கட்டுக்குள் வைக்க சிறந்த வழிகள்',
        'கொலஸ்ட்ராலை இயற்கையாகக் குறைக்க உணவு ஆலோசனைகள்'
      ]
    },
    therapist: {
      greeting: 'வணக்கம், நான் **டாக்டர் மாயா** 🌱. மன அழுத்தத்தைக் குறைத்து மன அமைதி பெறுவதற்கான உங்கள் பாதுகாப்பான இடம்.',
      placeholder: 'உங்கள் உணர்வுகள் அல்லது மன அழுத்தத்தைப் பகிருங்கள்...',
      chips: [
        '2 நிமிட அமைதியான சுவாசப் பயிற்சியை வழிநடத்துங்கள்',
        'வேலை அழுத்தம் மற்றும் சோர்விலிருந்து விடுபடுவது எப்படி?',
        'இரவில் அதிகம் சிந்திப்பதை (Overthinking) தடுப்பது எப்படி?',
        'மன அமைதிக்கான நேர்மறை எண்ணங்கள்'
      ]
    },
    pharmacist: {
      greeting: 'வரவேற்கிறோம்! நான் **PharmAI நிபுணர்**. மருந்து சேர்க்கைகள் மற்றும் ஜன் ஔஷதி ஜெனரிக் மாற்று மருந்துகளை விளக்குகிறேன்.',
      placeholder: 'மருந்துகள், அளவுகள் அல்லது மருந்து தொடர்புகள் பற்றி கேளுங்கள்...',
      chips: [
        'பான்டோபிரசோல் 40mg மாத்திரையை தேநீருடன் சாப்பிடலாமா?',
        'டெல்மிசார்டன் மருந்திற்கான ஜன் ஔஷதி ஜெனரிக் மாற்று மருந்து என்ன?',
        'மெட்ஃபோர்மின் எடுக்கும்போது கவனிக்க வேண்டியவை',
        'பாராசிட்டமால் மற்றும் இப்யூபுரூஃபன் இடையே ஏதேனும் பக்கவிளைவு உள்ளதா?'
      ]
    },
    nutritionist: {
      greeting: 'வணக்கம்! நான் **டாக்டர் பிரியா**, மருத்துவ ஊட்டச்சத்து நிபுணர். உங்கள் ஆரோக்கியத்திற்கு ஏற்ற இந்திய உணவுத் திட்டத்தை வழங்குகிறேன்.',
      placeholder: 'உணவுத் திட்டம் அல்லது ஊட்டச்சத்து பற்றி கேளுங்கள்...',
      chips: [
        'சர்க்கரை நோயாளிகளுக்கான 7 நாள் ஆரோக்கியமான இந்திய உணவுத் திட்டம்',
        'குறைந்த கிளைசெமிக் காலை உணவு வகைகள்',
        'செரிமான ஆரோக்கியத்திற்காக நார்ச்சத்தை எவ்வாறு அதிகரிப்பது?',
        'சைவ உணவு உண்பவர்களுக்கான அதிக புரத சிற்றுண்டிகள்'
      ]
    },
    pediatric: {
      greeting: 'வணக்கம்! நான் **டாக்டர் சோஃபி**, குழந்தைகள் நல ஆலோசகர்.',
      placeholder: 'குழந்தைகள் நலம், காய்ச்சல் அல்லது தடுப்பூசிகள் பற்றி கேளுங்கள்...',
      chips: [
        '4 வயது குழந்தைக்கு 101°F காய்ச்சல் இருந்தால் என்ன செய்ய வேண்டும்?',
        'குழந்தைகளுக்கான முக்கிய தடுப்பூசி அட்டவணை',
        'குழந்தைகளின் வயிற்று வலிக்கு எளிய தீர்வுகள்',
        'தொடர் இருமலுக்கு எப்போது மருத்துவரை அணுக வேண்டும்?'
      ]
    },
    longevity: {
      greeting: 'வணக்கம்! நான் **கோச் ரியான்**, தூக்கம் மற்றும் ஆரோக்கிய நிபுணர்.',
      placeholder: 'தூக்கம், HRV அல்லது உடற்பயிற்சி பற்றி கேளுங்கள்...',
      chips: [
        'ஆழ்ந்த தூக்கத்தை (Deep Sleep) அதிகரிப்பது எப்படி?',
        'இதய துடிப்பு மாறுபாட்டை (HRV) மேம்படுத்தும் வழிகள்',
        'உடற்தகுதிக்கு வாரத்திற்கு எத்தனை நிமிட உடற்பயிற்சி தேவை?',
        'ஆயுளை நீட்டிக்க உதவும் சிறந்த அறிவியல் வழிகள்'
      ]
    }
  },
  bn: {
    inputPlaceholder: 'চিকিৎসা সংক্রান্ত প্রশ্ন জিজ্ঞাসা করুন, লক্ষণ বর্ণনা করুন বা ওষুধ সম্পর্কে জানুন...',
    statusIndicator: 'বাংলায় লাইভ — AI বাংলায় উত্তর দেবে',
    preTranslateNotice: '⚡ বাংলায় রিয়েল-টাইম AI অনুবাদ সক্রিয়',
    doctor: {
      greeting: 'নমস্কার! আমি **ডঃ HealthGPT**, আপনার প্রধান স্বাস্থ্য ও চিকিৎসা AI। আজ আপনাকে কীভাবে সাহায্য করতে পারি? লক্ষণ জানান বা ওষুধের বিষয়ে প্রশ্ন করুন।',
      placeholder: 'ডঃ HealthGPT-কে চিকিৎসা সংক্রান্ত প্রশ্ন করুন...',
      chips: [
        'উচ্চ রক্তচাপের প্রধান লক্ষণ ও সতর্কতা কী কী?',
        'আমার ২ দিন ধরে তীব্র মাথাব্যথা করছে, কী করা উচিত?',
        'ফাস্টিং ব্লাড সুগার স্বাভাবিক রাখার কার্যকরী উপায়',
        'কোলেস্টেরল স্বাভাবিক করতে সেরা খাদ্য ও ব্যায়াম'
      ]
    },
    therapist: {
      greeting: 'নমস্কার, আমি **ডঃ মায়া** 🌱। মানসিক চাপ কমাতে এবং শান্ত বোধ করতে এটি আপনার গোপনীয় স্থান।',
      placeholder: 'আপনার মনের কথা বা মানসিক চাপ শেয়ার করুন...',
      chips: [
        '২ মিনিটের শান্ত গভীর শ্বাস-প্রশ্বাসের ব্যায়াম দেখান',
        'কাজের চাপ এবং অতিরিক্ত ক্লান্তি থেকে মুক্তির উপায়',
        'রাতে অতিরিক্ত চিন্তা (Overthinking) বন্ধ করার উপায়',
        'মানসিক শান্তির জন্য ইতিবাচক চিন্তাভাবনার পরামর্শ'
      ]
    },
    pharmacist: {
      greeting: 'স্বাগতম! আমি **PharmAI বিশেষজ্ঞ**। ওষুধের সঠিক মাত্রা, জেন অউষধি বিকল্প ও পার্শ্বপ্রতিক্রিয়া পরীক্ষা করি।',
      placeholder: 'ওষুধ, ডোজ বা ড্রাগ ইন্টারঅ্যাকশন সম্পর্কে জানুন...',
      chips: [
        'প্যান্টোপ্রাজল ৪০ মিগ্রা খালি পেটে চায়ের সাথে খাওয়া যাবে?',
        'টেলমিসারটান ওষুধের জন ঔষধি জেনেরিক বিকল্প কী?',
        'মেটফর্মিন গ্রহণের সময় কী কী সতর্কতা জরুরি?',
        'প্যারাসিটামল এবং আইবুপ্রোফেন একসাথে খাওয়া যায় কি?'
      ]
    },
    nutritionist: {
      greeting: 'নমস্কার! আমি **ডঃ প্রিয়া**, ক্লিনিক্যাল পুষ্টিবিদ। আপনার রক্তের শর্করা ও স্বাস্থ্যের জন্য ভারতীয় ডায়েট চার্ট তৈরি করি।',
      placeholder: 'ডায়েট প্ল্যান বা পুষ্টি সংক্রান্ত প্রশ্ন জিজ্ঞাসা করুন...',
      chips: [
        'ডায়াবেটিসের জন্য ৭ দিনের সুষম ভারতীয় ডায়েট চার্ট',
        'কম গ্লাইসেমিক সকালের স্বাস্থ্যকর জলখাবার',
        'হজম শক্তি বাড়াতে ফাইবার সমৃদ্ধ খাবার',
        'নিরামিষাশীদের জন্য উচ্চ প্রোটিনযুক্ত স্ন্যাক্স'
      ]
    },
    pediatric: {
      greeting: 'নমস্কার! আমি **ডঃ সোফি**, শিশু বিশেষজ্ঞ। শিশুদের জ্বর, টিকা ও বিকাশ নিয়ে পরামর্শ দিই।',
      placeholder: 'শিশুর স্বাস্থ্য, জ্বর বা টিকা সম্পর্কে প্রশ্ন করুন...',
      chips: [
        '৪ বছরের শিশুর ১০১ ডিগ্রি জ্বর কীভাবে নিয়ন্ত্রণ করব?',
        'ছোট শিশুদের প্রয়োজনীয় টিকার (Vaccine) সময়সূচী',
        'শিশুদের পেটের গ্যাস ও অস্বস্তির সহজ সমাধান',
        'কখন শিশুকে ডাক্তারের কাছে নিয়ে যাওয়া জরুরি?'
      ]
    },
    longevity: {
      greeting: 'স্বাগতম! আমি **কোচ রায়ান**, ঘুম ও দীর্ঘায়ু বিশেষজ্ঞ।',
      placeholder: 'ঘুম, HRV বা ফিটনেস সম্পর্কে জানুন...',
      chips: [
        'গভীর ঘুম (Deep Sleep) কীভাবে বৃদ্ধি করবেন?',
        'হার্ট রেট ভ্যারিয়েবিলিটি (HRV) উন্নত করার উপায়',
        'মেটাবলিক স্বাস্থ্যের জন্য সপ্তাহে কতক্ষণ ব্যায়াম প্রয়োজন?',
        'জৈবিক বয়স কমানোর বৈজ্ঞানিক পদ্ধতি'
      ]
    }
  },
  es: {
    inputPlaceholder: 'Haga una pregunta médica, describa sus síntomas o consulte sobre medicamentos...',
    statusIndicator: 'En vivo en Español — La IA responde en español',
    preTranslateNotice: '⚡ Traducción médica en tiempo real activa en Español',
    doctor: {
      greeting: '¡Hola! Soy el **Dr. HealthGPT**, su Médico Jefe de Inteligencia Clínica. ¿Cómo puedo ayudarle hoy? Puede describir sus síntomas, consultar sobre medicamentos o adjuntar recetas médicas.',
      placeholder: 'Haga una pregunta médica al Dr. HealthGPT...',
      chips: [
        '¿Cuáles son los síntomas de alerta de la presión arterial alta?',
        'Tengo dolor de cabeza punzante desde hace 2 días, ¿qué hago?',
        '¿Cómo mantener niveles normales de glucosa en ayunas?',
        'Consejos para reducir el colesterol LDL de forma natural'
      ]
    },
    therapist: {
      greeting: 'Hola, soy la **Dra. Maya** 🌱. Este es un espacio seguro y confidencial para explorar sus emociones y aliviar el estrés.',
      placeholder: 'Comparta lo que siente o lo que le preocupa...',
      chips: [
        'Guíame en un ejercicio de respiración consciente de 2 minutos',
        'Me siento abrumado por el estrés laboral y el agotamiento',
        '¿Cómo puedo frenar los pensamientos excesivos por la noche?',
        'Consejos de reestructuración cognitiva positiva'
      ]
    },
    pharmacist: {
      greeting: '¡Bienvenido! Soy **PharmAI**, especialista en farmacología clínica e interacciones de medicamentos.',
      placeholder: 'Pregunte sobre medicamentos, dosis o interacciones...',
      chips: [
        '¿Se puede tomar Pantoprazol 40mg con café por la mañana?',
        '¿Cuáles son las alternativas genéricas para Telmisartán?',
        'Advertencias y precauciones importantes al tomar Metformina',
        'Interacciones entre Paracetamol e Ibuprofeno'
      ]
    },
    nutritionist: {
      greeting: '¡Hola! Soy la **Dra. Priya**, dietista clínica y nutricionista metabólica.',
      placeholder: 'Pregunte sobre planes de alimentación y nutrición...',
      chips: [
        'Diseña un plan de alimentación saludable de 7 días',
        '¿Cuáles son las mejores opciones de desayuno de bajo índice glucémico?',
        '¿Cómo aumentar la fibra para la salud digestiva?',
        'Snacks vegetarianos ricos en proteínas y bajos en calorías'
      ]
    },
    pediatric: {
      greeting: '¡Hola! Soy la **Dra. Sophie**, especialista en pediatría y salud familiar.',
      placeholder: 'Consulte sobre la salud infantil, fiebre o vacunas...',
      chips: [
        '¿Cómo manejar de forma segura una fiebre de 38.3°C en un niño de 4 años?',
        'Calendario de vacunación estándar para niños pequeños',
        'Consejos para aliviar el cólico y molestias digestivas en niños',
        '¿Cuándo acudir al pediatra por una tos persistente?'
      ]
    },
    longevity: {
      greeting: '¡Bienvenido! Soy el **Entrenador Ryan**, especialista en optimización del sueño y longevidad.',
      placeholder: 'Pregunte sobre sueño profundo, HRV o cardio...',
      chips: [
        '¿Cómo aumentar el porcentaje de sueño profundo?',
        'Protocolo para mejorar la variabilidad de la frecuencia cardíaca (HRV)',
        '¿Cuántos minutos de cardio Zona 2 se recomiendan por semana?',
        'Biomarcadores para reducir la edad biológica'
      ]
    }
  },
  ar: {
    inputPlaceholder: 'اطرح سؤالاً طبياً، أو صف الأعراض، أو استفسر عن الأدوية...',
    statusIndicator: 'مباشر باللغة العربية — الذكاء الاصطناعي يجيب بالعربية',
    preTranslateNotice: '⚡ الترجمة الطبية الفورية باللغة العربية مفعلة',
    doctor: {
      greeting: 'مرحباً! أنا **د. HealthGPT**، طبيب الذكاء الاصطناعي السريري. كيف يمكنني مساعدتك اليوم؟ يمكنك وصف الأعراض أو السؤال عن الأدوية والتحاليل المخبرية.',
      placeholder: 'اطرح سؤالاً طبياً على د. HealthGPT...',
      chips: [
        'ما هي الأعراض التحذيرية لارتفاع ضغط الدم؟',
        'أعاني من صداع نابض منذ يومين، ماذا أفعل؟',
        'كيف أحافظ على مستوى السكر في الدم ضمن المعدل الطبيعي؟',
        'أفضل الطرق الطبيعية لخفض الكوليسترول الضار'
      ]
    },
    therapist: {
      greeting: 'أهلاً بك، أنا **د. مايا** 🌱. هذه مساحة هادئة وسرية للتخلص من التوتر والقلق واستعادة راحة البال.',
      placeholder: 'شارك مشاعرك أو ما يقلقك هنا...',
      chips: [
        'أرشدني خلال تمرين تنفس مهدئ لمدة دقيقتين',
        'أشعر بالإرهاق الشديد وضغوط العمل المستمرة',
        'كيف أتغلب على التفكير الزائد ليلاً؟',
        'نصائح لبناء نظرة إيجابية والتغلب على القلق'
      ]
    },
    pharmacist: {
      greeting: 'أهلاً بك! أنا **PharmAI**، أخصائي الصيدلة السريرية وسلامة الأدوية والتداخلات الدوائية.',
      placeholder: 'استفسر عن الأدوية، الجرعات، أو التداخلات الدوائية...',
      chips: [
        'هل يمكن تناول بانتوبرازول 40 ملغ مع قهوة الصباح؟',
        'ما هي البدائل الجنيسة لدواء تيلميسارتان؟',
        'التحذيرات المهمة عند استخدام الميتفورمين',
        'التداخلات الدوائية بين الباراسيتامول والإيبوبروفين'
      ]
    },
    nutritionist: {
      greeting: 'مرحباً! أنا **د. بريا**، أخصائية التغذية العلاجية والصحة الأيضية.',
      placeholder: 'استفسر عن الأنظمة الغذائية والسعرات الحرارية...',
      chips: [
        'خطة غذائية صحية لمدة 7 أيام لمرضى السكري',
        'أفضل خيارات الإفطار ذات المؤشر الجلايسيمي المنخفض',
        'كيفية زيادة الألياف لتحسين صحة الجهاز الهضمي',
        'وجبات خفيفة نباتية غنية بالبروتين'
      ]
    },
    pediatric: {
      greeting: 'مرحباً! أنا **د. صوفي**، استشارية طب الأطفال وصحة الأسرة.',
      placeholder: 'استفسر عن صحة الأطفال، الحمى، أو التطعيمات...',
      chips: [
        'كيفية التعامل مع حمى 38.3 درجة مئوية لطفل عمره 4 سنوات بأمان؟',
        'جدول التطعيمات الأساسية للأطفال الصغار',
        'نصائح للتعامل مع مغص الأطفال والغازات',
        'متى يجب استشارة طبيب الأطفال عند استمرار السعال؟'
      ]
    },
    longevity: {
      greeting: 'مرحباً! أنا **المدرب رايان**، أخصائي جودة النوم وإطالة العمر الصحي وتحسين اللياقة البدنية.',
      placeholder: 'استفسر عن جودة النوم أو التمارين الرياضية...',
      chips: [
        'كيف يمكن زيادة نسبة النوم العميق واستعادة النشاط؟',
        'بروتوكول تحسين تقلب معدل ضربات القلب (HRV)',
        'كم دقيقة من تمارين المنطقة 2 (Zone 2) يُوصى بها أسبوعياً؟',
        'أهم المؤشرات الحيوية لتقليل العمر البيولوجي'
      ]
    }
  },
  fr: {
    inputPlaceholder: 'Posez une question médicale, décrivez vos symptômes ou posez des questions sur les médicaments...',
    statusIndicator: 'En direct en Français — L\'IA répond en français',
    preTranslateNotice: '⚡ Traduction médicale en direct active en Français',
    doctor: {
      greeting: 'Bonjour ! Je suis le **Dr HealthGPT**, votre médecin référent en intelligence clinique. Comment puis-je vous aider aujourd\'hui ?',
      placeholder: 'Posez une question médicale au Dr HealthGPT...',
      chips: [
        'Quels sont les symptômes d\'alerte de l\'hypertension artérielle ?',
        'J\'ai un mal de tête persistant depuis 2 jours, que faire ?',
        'Comment maintenir une glycémie à jeun optimale ?',
        'Conseils naturels pour réduire le cholestérol LDL'
      ]
    },
    therapist: {
      greeting: 'Bonjour, je suis le **Dr Maya** 🌱. Cet espace confidentiel et bienveillant est dédié à votre sérénité et à la gestion du stress.',
      placeholder: 'Partagez ce que vous ressentez en ce moment...',
      chips: [
        'Guide-moi dans un exercice de respiration apaisante de 2 minutes',
        'Je me sens dépassé par le stress professionnel et la fatigue',
        'Comment stopper les ruminations mentales nocturnes ?',
        'Techniques de recadrage cognitif positif'
      ]
    },
    pharmacist: {
      greeting: 'Bienvenue ! Je suis **PharmAI**, spécialiste en pharmacologie clinique et sécurité des médicaments.',
      placeholder: 'Questions sur les médicaments, posologies ou interactions...',
      chips: [
        'Peut-on prendre du Pantoprazole 40mg avec le café du matin ?',
        'Quelles sont les alternatives génériques du Telmisartan ?',
        'Précautions importantes lors de la prise de Metformine',
        'Interactions entre le Paracétamol et l\'Ibuprofène'
      ]
    },
    nutritionist: {
      greeting: 'Bonjour ! Je suis le **Dr Priya**, diététicienne clinicienne et nutritionniste métabolique.',
      placeholder: 'Questions sur les régimes alimentaires et la nutrition...',
      chips: [
        'Plan alimentaire équilibré sur 7 jours pour la glycémie',
        'Meilleures options de petit-déjeuner à faible indice glycémique',
        'Comment augmenter les fibres pour la flore intestinale ?',
        'Collations végétariennes riches en protéines'
      ]
    },
    pediatric: {
      greeting: 'Bonjour ! Je suis le **Dr Sophie**, consultante en pédiatrie et santé familiale.',
      placeholder: 'Questions sur la santé des enfants, la fièvre ou les vaccins...',
      chips: [
        'Comment gérer en sécurité une fièvre de 38,3°C chez un enfant de 4 ans ?',
        'Calendrier vaccinal standard pour les jeunes enfants',
        'Conseils pour soulager les coliques et maux de ventre',
        'Quand consulter un pédiatre pour une toux persistante ?'
      ]
    },
    longevity: {
      greeting: 'Bienvenue ! Je suis le **Coach Ryan**, spécialiste de la longévité et de l\'optimisation du sommeil.',
      placeholder: 'Questions sur le sommeil, le HRV ou le cardio...',
      chips: [
        'Comment augmenter le pourcentage de sommeil profond ?',
        'Protocole pour améliorer la variabilité de la fréquence cardiaque (HRV)',
        'Combien de minutes de cardio Zone 2 par semaine sont optimales ?',
        'Biomarqueurs pour rajeunir l\'âge biologique'
      ]
    }
  },
  de: {
    inputPlaceholder: 'Stellen Sie eine medizinische Frage, beschreiben Sie Symptome oder fragen Sie nach Medikamenten...',
    statusIndicator: 'Live auf Deutsch — KI antwortet auf Deutsch',
    preTranslateNotice: '⚡ Echtzeit-Übersetzung auf Deutsch aktiv',
    doctor: {
      greeting: 'Guten Tag! Ich bin **Dr. HealthGPT**, Ihr leitender Arzt für klinische KI. Wie kann ich heute für Ihre Gesundheit da sein?',
      placeholder: 'Stellen Sie Dr. HealthGPT eine medizinische Frage...',
      chips: [
        'Was sind Warnzeichen für Bluthochdruck?',
        'Ich habe seit 2 Tagen pochende Kopfschmerzen, was tun?',
        'Wie halte ich den Nüchternblutzucker im gesunden Bereich?',
        'Tipps zur natürlichen Senkung des LDL-Cholesterins'
      ]
    },
    therapist: {
      greeting: 'Hallo, ich bin **Dr. Maya** 🌱. Hier ist ein sicherer Raum, um Stress abzubauen und innere Ruhe zu finden.',
      placeholder: 'Teilen Sie Ihre Gedanken und Gefühle mit...',
      chips: [
        'Leite mich durch eine 2-minütige beruhigende Atemübung',
        'Ich fühle mich durch Arbeitsstress überfordert',
        'Wie stoppe ich nächtliches Grübeln (Overthinking)?',
        'Tipps für eine positive kognitive Umstrukturierung'
      ]
    },
    pharmacist: {
      greeting: 'Willkommen! Ich bin **PharmAI**, Ihr Spezialist für klinische Pharmakologie und Arzneimittelsicherheit.',
      placeholder: 'Fragen zu Medikamenten, Dosierungen oder Wechselwirkungen...',
      chips: [
        'Kann man Pantoprazol 40mg mit Kaffee am Morgen einnehmen?',
        'Welche Generika-Alternativen gibt es für Telmisartan?',
        'Wichtige Vorsichtsmaßnahmen bei der Einnahme von Metformin',
        'Wechselwirkungen zwischen Paracetamol und Ibuprofen'
      ]
    },
    nutritionist: {
      greeting: 'Guten Tag! Ich bin **Dr. Priya**, klinische Ernährungsberaterin für Stoffwechselgesundheit.',
      placeholder: 'Fragen zu Ernährungsplänen und Nährwerten...',
      chips: [
        '7-Tage-Ernährungsplan für einen stabilen Blutzucker',
        'Beste Frühstücksoptionen mit niedrigem glykämischen Index',
        'Wie erhöhe ich Ballaststoffe für eine gesunde Darmflora?',
        'Proteinreiche vegetarische Snacks unter 200 Kalorien'
      ]
    },
    pediatric: {
      greeting: 'Hallo! Ich bin **Dr. Sophie**, Fachärztin für Kinderheilkunde und Familiengesundheit.',
      placeholder: 'Fragen zu Kindergesundheit, Fieber oder Impfungen...',
      chips: [
        'Wie senke ich 38,3°C Fieber bei einem 4-jährigen Kind sicher?',
        'Standard-Impffahrplan für Kleinkinder',
        'Tipps bei Bauchschmerzen und Koliken bei Kindern',
        'Wann sollte man bei anhaltendem Husten zum Kinderarzt?'
      ]
    },
    longevity: {
      greeting: 'Willkommen! Ich bin **Coach Ryan**, Spezialist für Langlebigkeit und Schlafoptimierung.',
      placeholder: 'Fragen zu Tiefschlaf, HRV oder Ausdauertraining...',
      chips: [
        'Wie steigere ich den Anteil an Tiefschlafphasen?',
        'Protokoll zur Verbesserung der Herzratenvariabilität (HRV)',
        'Wie viele Minuten Zone-2-Cardio pro Woche sind optimal?',
        'Biomarker zur Senkung des biologischen Alters'
      ]
    }
  }
};

function getLanguageInfo(langCode) {
  return SUPPORTED_LANGUAGES_LIST.find(l => l.code === langCode) || {
    code: langCode,
    name: langCode,
    nativeName: langCode,
    flag: '🌐',
    group: 'Other'
  };
}

function getLanguageName(langCode) {
  const info = getLanguageInfo(langCode);
  return info.nativeName ? `${info.flag} ${info.nativeName} (${info.name})` : `${info.flag} ${info.name}`;
}

function populateAllLanguageDropdowns() {
  const groups = {};
  SUPPORTED_LANGUAGES_LIST.forEach(lang => {
    if (!groups[lang.group]) groups[lang.group] = [];
    groups[lang.group].push(lang);
  });

  const generateOptionsHtml = (selectedCode, includeAuto = false) => {
    let html = '';
    if (includeAuto) {
      html += `<option value="auto" ${selectedCode === 'auto' ? 'selected' : ''}>🌐 Auto-Detect Language</option>`;
    }
    for (const groupName in groups) {
      html += `<optgroup label="${groupName}">`;
      groups[groupName].forEach(l => {
        const isSel = l.code === selectedCode ? 'selected' : '';
        html += `<option value="${l.code}" ${isSel}>${l.flag} ${l.nativeName} (${l.name})</option>`;
      });
      html += `</optgroup>`;
    }
    return html;
  };

  // 1. Sidebar Menu Bar Language Select
  const menuBarSelect = document.getElementById('menuBarLanguageSelect');
  if (menuBarSelect) {
    menuBarSelect.innerHTML = generateOptionsHtml(currentAppLanguage);
    menuBarSelect.value = currentAppLanguage;
  }

  // 2. Top Bar Global Language Select
  const globalSelect = document.getElementById('globalLanguageSelect');
  if (globalSelect) {
    globalSelect.innerHTML = generateOptionsHtml(currentAppLanguage);
    globalSelect.value = currentAppLanguage;
  }

  // 3. Chat Language Select
  const chatSelect = document.getElementById('chatLanguageSelect');
  if (chatSelect) {
    chatSelect.innerHTML = generateOptionsHtml(currentAppLanguage);
    chatSelect.value = currentAppLanguage;
  }

  // 4. Translator Target Select
  const transTarget = document.getElementById('transTargetLang');
  if (transTarget) {
    transTarget.innerHTML = generateOptionsHtml(currentAppLanguage || 'hi');
    if (currentAppLanguage && currentAppLanguage !== 'auto') {
      transTarget.value = currentAppLanguage;
    }
  }

  // 5. Translator Source Select
  const transSource = document.getElementById('transSourceLang');
  if (transSource) {
    transSource.innerHTML = generateOptionsHtml('auto', true);
  }

  // 6. Medicine AI Language Select
  const medAiSelect = document.getElementById('medAiLanguageSelect');
  if (medAiSelect) {
    medAiSelect.innerHTML = generateOptionsHtml(currentAppLanguage);
    medAiSelect.value = currentAppLanguage;
  }

  // Update Menu Bar Badge & Status
  updateMenuBarLanguageBadge(currentAppLanguage);
}

function updateMenuBarLanguageBadge(langCode) {
  const badge = document.getElementById('menuBarActiveLangBadge');
  const nativeNameEl = document.getElementById('menuBarLangNativeName');
  const info = getLanguageInfo(langCode);
  if (badge) badge.textContent = langCode.toUpperCase();
  if (nativeNameEl) nativeNameEl.textContent = info.nativeName || info.name;
}

function onChatLanguageChange(langCode) {
  const info = getLanguageInfo(langCode);
  const loc = CHATBOT_LOCALIZATIONS[langCode] || CHATBOT_LOCALIZATIONS.en;
  const personaLoc = (loc && loc[currentPersona]) ? loc[currentPersona] : (CHATBOT_LOCALIZATIONS.en[currentPersona] || PERSONAS_CONFIG[currentPersona]);

  // 1. Update Input Placeholder
  const inputArea = document.getElementById('consultInputArea');
  const inputFallback = document.getElementById('consultInput');
  const targetPlaceholder = personaLoc.placeholder || loc.inputPlaceholder || PERSONAS_CONFIG[currentPersona].placeholder;
  if (inputArea) inputArea.placeholder = targetPlaceholder;
  if (inputFallback) inputFallback.placeholder = targetPlaceholder;

  // 2. Update Suggestion Chips in Real-Time
  const chipsToRender = personaLoc.chips || PERSONAS_CONFIG[currentPersona].chips;
  renderConsultChips(chipsToRender);

  // 3. Update Pre-Translation Indicator / Chat Status
  const statusIndicator = document.getElementById('chatStatusLanguageIndicator');
  if (statusIndicator) {
    statusIndicator.textContent = loc.statusIndicator || `Live in ${info.nativeName} (${info.name})`;
  }

  const preTransNotice = document.getElementById('chatPreTranslateNotice');
  if (preTransNotice) {
    preTransNotice.textContent = loc.preTranslateNotice || `⚡ Real-time translation to ${info.name} active`;
  }

  // 4. If conversation has not started or only has the welcome message, update greeting
  const log = document.getElementById('consultChatLog');
  if (log) {
    const msgs = log.querySelectorAll('.chat-msg');
    if (msgs.length <= 1) {
      const conf = PERSONAS_CONFIG[currentPersona];
      const targetGreeting = personaLoc.greeting || conf.greeting;
      log.innerHTML = `
        <div class="chat-msg bot" id="msg_welcome">
          <div class="chat-msg-header">
            <span class="chat-msg-avatar">${conf.avatar}</span>
            <span>${conf.name}</span>
            <span class="pill" style="margin-left:8px;font-size:10px;background:#e0f2fe;color:#0369a1;">${info.flag} ${info.nativeName}</span>
            <span style="font-size:10px;opacity:0.75;font-weight:normal;margin-left:auto;">Just now</span>
          </div>
          <div class="bot-text">${formatBotMarkdown(targetGreeting)}</div>
        </div>
      `;
    }
  }

  // 5. Update Menu Bar Language Badge
  updateMenuBarLanguageBadge(langCode);
}

function changeGlobalLanguage(langCode) {
  currentAppLanguage = langCode;

  // Synchronize all dropdowns in real-time
  const menuBarSelect = document.getElementById('menuBarLanguageSelect');
  const globalSelect = document.getElementById('globalLanguageSelect');
  const chatSelect = document.getElementById('chatLanguageSelect');
  const transTarget = document.getElementById('transTargetLang');
  const medAiSelect = document.getElementById('medAiLanguageSelect');

  if (menuBarSelect && menuBarSelect.value !== langCode) menuBarSelect.value = langCode;
  if (globalSelect && globalSelect.value !== langCode) globalSelect.value = langCode;
  if (chatSelect && chatSelect.value !== langCode) chatSelect.value = langCode;
  if (transTarget && langCode !== 'auto' && transTarget.value !== langCode) transTarget.value = langCode;
  if (medAiSelect && medAiSelect.value !== langCode) medAiSelect.value = langCode;

  // Real-time update of chatbot interface
  onChatLanguageChange(langCode);

  const optName = getLanguageName(langCode);
  toast(`🌐 Chatbot & app language switched to: ${optName}`);
}'''

if re.search(pattern, html):
    html = re.sub(pattern, replacement, html, count=1)
    print("Replaced global language section with rich multilingual handler!")
else:
    print("Pattern not matched directly, searching fallback insertion")
    # Let's search for function changeGlobalLanguage
    idx = html.indexOf("function changeGlobalLanguage")
    print("changeGlobalLanguage at:", idx)

with open('frontend/myi10.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved myi10.html")
