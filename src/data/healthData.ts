export interface OrganSystem {
  id: string;
  name: string;
  icon: string;
  score: number;
  riskLevel: 'Optimal' | 'Low' | 'Moderate' | 'Elevated';
  aiInsight: string;
  biomarkers: { name: string; value: string; status: 'Optimal' | 'Borderline' | 'Action Needed'; range: string }[];
}

export const UNIFIED_HEALTH_TWIN_ORGANS: OrganSystem[] = [
  {
    id: 'cardiovascular',
    name: 'Cardiovascular & Vascular System',
    icon: '🫀',
    score: 88,
    riskLevel: 'Optimal',
    aiInsight: 'Resting pulse is consistent at 68 bpm with healthy HRV of 54ms. Endothelial vascular flexibility is in top 15th percentile.',
    biomarkers: [
      { name: 'Resting Heart Rate', value: '68 bpm', status: 'Optimal', range: '60-80 bpm' },
      { name: 'Blood Pressure (Avg)', value: '118/76 mmHg', status: 'Optimal', range: '<120/80 mmHg' },
      { name: 'Heart Rate Variability (HRV)', value: '54 ms', status: 'Optimal', range: '>45 ms' },
      { name: 'Arterial Elasticity Index', value: '8.4 m/s', status: 'Optimal', range: '<9.0 m/s' }
    ]
  },
  {
    id: 'metabolic',
    name: 'Metabolic & Glycemic Engine',
    icon: '🩸',
    score: 86,
    riskLevel: 'Low',
    aiInsight: 'Fasting glucose stable at 92 mg/dL with excellent insulin sensitivity. Post-meal glucose spikes resolve within 90 minutes.',
    biomarkers: [
      { name: 'Fasting Blood Glucose', value: '92 mg/dL', status: 'Optimal', range: '70-99 mg/dL' },
      { name: 'Estimated HbA1c', value: '5.2%', status: 'Optimal', range: '<5.7%' },
      { name: 'Fasting Insulin', value: '5.8 µIU/mL', status: 'Optimal', range: '2.6-24.9 µIU/mL' },
      { name: 'HOMA-IR Insulin Index', value: '1.3', status: 'Optimal', range: '<1.9' }
    ]
  },
  {
    id: 'pulmonary',
    name: 'Pulmonary & Respiratory System',
    icon: '🫁',
    score: 94,
    riskLevel: 'Optimal',
    aiInsight: 'Blood oxygen saturation consistently 98-99% on room air. VO2 max estimation 44.5 mL/kg/min indicates high cardiopulmonary reserve.',
    biomarkers: [
      { name: 'SpO2 Oxygen Saturation', value: '99%', status: 'Optimal', range: '95-100%' },
      { name: 'Respiratory Rate (Sleep)', value: '14.2 rpm', status: 'Optimal', range: '12-18 rpm' },
      { name: 'Peak Expiratory Flow (PEF)', value: '520 L/min', status: 'Optimal', range: '450-600 L/min' },
      { name: 'Estimated VO2 Max', value: '44.5 mL/kg/min', status: 'Optimal', range: '>38 mL/kg/min' }
    ]
  },
  {
    id: 'hepatic',
    name: 'Hepatic & Liver Detox Matrix',
    icon: '🧪',
    score: 91,
    riskLevel: 'Optimal',
    aiInsight: 'Liver transaminases ALT & AST are well balanced. Hepatic lipid clearance and protein synthesis are functioning optimally.',
    biomarkers: [
      { name: 'SGPT / ALT', value: '22 U/L', status: 'Optimal', range: '7-56 U/L' },
      { name: 'SGOT / AST', value: '24 U/L', status: 'Optimal', range: '10-40 U/L' },
      { name: 'Serum Bilirubin Total', value: '0.8 mg/dL', status: 'Optimal', range: '0.2-1.2 mg/dL' },
      { name: 'Serum Albumin', value: '4.6 g/dL', status: 'Optimal', range: '3.5-5.0 g/dL' }
    ]
  },
  {
    id: 'renal',
    name: 'Renal & Fluid Filtration',
    icon: '💧',
    score: 92,
    riskLevel: 'Optimal',
    aiInsight: 'Estimated GFR is >95 mL/min with serum creatinine at 0.9 mg/dL. Renal filtration and sodium-potassium balance are pristine.',
    biomarkers: [
      { name: 'Serum Creatinine', value: '0.9 mg/dL', status: 'Optimal', range: '0.7-1.3 mg/dL' },
      { name: 'eGFR Filtration Rate', value: '98 mL/min/1.73m²', status: 'Optimal', range: '>90 mL/min' },
      { name: 'Blood Urea Nitrogen (BUN)', value: '14 mg/dL', status: 'Optimal', range: '7-20 mg/dL' },
      { name: 'Uric Acid', value: '5.1 mg/dL', status: 'Optimal', range: '3.5-7.2 mg/dL' }
    ]
  },
  {
    id: 'endocrine',
    name: 'Endocrine & Hormonal Rhythm',
    icon: '⚡',
    score: 87,
    riskLevel: 'Low',
    aiInsight: 'Thyroid stimulating hormone (TSH) at 2.1 µIU/mL with synchronized cortisol diurnal curve supporting daytime energy and deep restorative sleep.',
    biomarkers: [
      { name: 'TSH (Thyroid)', value: '2.1 µIU/mL', status: 'Optimal', range: '0.4-4.0 µIU/mL' },
      { name: 'Morning Cortisol', value: '14.2 µg/dL', status: 'Optimal', range: '6.0-18.4 µg/dL' },
      { name: 'Vitamin D3 (25-OH)', value: '42 ng/mL', status: 'Optimal', range: '30-100 ng/mL' },
      { name: 'Vitamin B12', value: '580 pg/mL', status: 'Optimal', range: '200-900 pg/mL' }
    ]
  },
  {
    id: 'immunological',
    name: 'Immune & Inflammatory Defense',
    icon: '🛡️',
    score: 90,
    riskLevel: 'Optimal',
    aiInsight: 'High-sensitivity C-reactive protein (hs-CRP) is <0.8 mg/L confirming ultra-low systemic cellular inflammation.',
    biomarkers: [
      { name: 'hs-CRP (Inflammation)', value: '0.75 mg/L', status: 'Optimal', range: '<1.0 mg/L' },
      { name: 'Total Leukocyte Count', value: '6,800 /µL', status: 'Optimal', range: '4,000-11,000 /µL' },
      { name: 'Neutrophil to Lymphocyte Ratio', value: '1.8', status: 'Optimal', range: '1.0-3.0' },
      { name: 'Absolute Eosinophil Count', value: '160 /µL', status: 'Optimal', range: '20-500 /µL' }
    ]
  },
  {
    id: 'neurological',
    name: 'Neuro-Cognitive & Sleep Architecture',
    icon: '🧠',
    score: 85,
    riskLevel: 'Low',
    aiInsight: 'Deep slow-wave sleep averaged 1 hr 45 min with optimal REM duration. Cognitive focus index scored 88/100.',
    biomarkers: [
      { name: 'Average Sleep Duration', value: '7 hrs 38 min', status: 'Optimal', range: '7.0-9.0 hrs' },
      { name: 'Deep Sleep Percentage', value: '22%', status: 'Optimal', range: '15-25%' },
      { name: 'REM Sleep Duration', value: '1 hr 40 min', status: 'Optimal', range: '>90 min' },
      { name: 'Sleep Latency', value: '12 min', status: 'Optimal', range: '10-20 min' }
    ]
  }
];

export interface CareCastItem {
  id: string;
  category: 'healthcare_news' | 'social_trends' | 'medical_research' | 'global_alerts';
  categoryLabel: string;
  badgeColor: string;
  icon: string;
  title: string;
  source: string;
  timestamp: string;
  readTime: string;
  summary: string;
  clinicalTakeaway: string;
  tags: string[];
  trendingScore: number;
  likes: number;
}

export const CARECAST_FEEDS: CareCastItem[] = [
  // Healthcare News
  {
    id: 'cc-1',
    category: 'healthcare_news',
    categoryLabel: 'Healthcare News',
    badgeColor: '#2563eb',
    icon: '🏥',
    title: 'FDA Grants Accelerated Approval for Next-Gen Dual Receptor Metabolic Therapy',
    source: 'FDA Medical Bulletin / Reuters Health',
    timestamp: '2 hours ago',
    readTime: '3 min read',
    summary: 'Clinical trials demonstrate unprecedented glycemic control and up to 22.5% sustained weight management with reduced cardiovascular events in adults with metabolic syndrome.',
    clinicalTakeaway: 'Represents a major leap forward in metabolic endocrinology, improving both HbA1c control and hepatic lipid markers.',
    tags: ['FDA Approval', 'Endocrinology', 'Diabetes', 'Metabolism'],
    trendingScore: 98,
    likes: 342
  },
  {
    id: 'cc-2',
    category: 'healthcare_news',
    categoryLabel: 'Healthcare News',
    badgeColor: '#2563eb',
    icon: '🩺',
    title: 'AI-Assisted Optical ECG Detects Silent Atrial Fibrillation 48 Hours Ahead',
    source: 'Digital Health Consortium / MedTech',
    timestamp: '5 hours ago',
    readTime: '4 min read',
    summary: 'A new non-invasive wearable photoplethysmography (rPPG) algorithm detected paroxysmal AFib with 96.4% specificity in a multicenter clinical trial of 15,000 patients.',
    clinicalTakeaway: 'Enables preventive anticoagulation timing and significantly lowers stroke risk in asymptomatic elderly populations.',
    tags: ['Cardiology', 'AI ECG', 'Wearables', 'Stroke Prevention'],
    trendingScore: 95,
    likes: 418
  },
  // Social Media & Wellness Trends
  {
    id: 'cc-3',
    category: 'social_trends',
    categoryLabel: 'Social Media & Trends',
    badgeColor: '#0d9488',
    icon: '📱',
    title: '#HealthTok Debunked: "Chlorophyll Drops for Internal Detox" vs Liver Reality',
    source: 'HealthGPT Trend Verification & Clinical Toxicology',
    timestamp: '3 hours ago',
    readTime: '2 min read',
    summary: 'Over 40 million views claimed liquid chlorophyll replaces liver detox. Clinical hepatologists explain your liver and kidneys handle 100% of biological filtration without expensive supplements.',
    clinicalTakeaway: 'Eating whole leafy greens (spinach, kale, arugula) provides dietary fiber and micronutrients that far exceed supplemental liquid chlorophyll drops.',
    tags: ['MythBusters', 'TikTok Trend', 'Liver Health', 'Dietary Truth'],
    trendingScore: 99,
    likes: 890
  },
  {
    id: 'cc-4',
    category: 'social_trends',
    categoryLabel: 'Social Media & Trends',
    badgeColor: '#0d9488',
    icon: '🧊',
    title: 'Cold Plunges & Ice Baths: When It Helps Recovery vs When It Blunts Muscle Growth',
    source: 'Sports Medicine Review / Instagram Trends',
    timestamp: '6 hours ago',
    readTime: '3 min read',
    summary: 'Viral ice plunges boost dopamine and reduce acute DOMS soreness, but doing a cold bath immediately after hypertrophy resistance training suppresses muscle protein synthesis (mTOR).',
    clinicalTakeaway: 'Wait at least 4 hours post-weight training before cold water immersion, or use cold therapy strictly on active recovery and cardio days.',
    tags: ['Fitness Trends', 'Cryotherapy', 'Hypertrophy', 'Recovery'],
    trendingScore: 92,
    likes: 567
  },
  {
    id: 'cc-5',
    category: 'social_trends',
    categoryLabel: 'Social Media & Trends',
    badgeColor: '#0d9488',
    icon: '💊',
    title: 'Magnesium Glycinate vs Citrate: Why Millions Are Switching for Sleep & Anxiety',
    source: 'Clinical Neurobiology & TikTok Wellness',
    timestamp: '8 hours ago',
    readTime: '3 min read',
    summary: 'Magnesium bound to glycine crosses the blood-brain barrier smoothly, binding to GABA receptors to calm the central nervous system without osmotic gastrointestinal distress.',
    clinicalTakeaway: 'Recommended dosage of 200-300mg elemental magnesium glycinate taken 60 minutes before bed enhances slow-wave deep sleep latency.',
    tags: ['Sleep Science', 'Magnesium', 'Anxiety Relief', 'Supplements'],
    trendingScore: 96,
    likes: 720
  },
  // Medical Research & Breakthroughs
  {
    id: 'cc-6',
    category: 'medical_research',
    categoryLabel: 'Medical Research',
    badgeColor: '#6366f1',
    icon: '🔬',
    title: 'The Lancet: 7,500 Daily Steps Lowers All-Cause Mortality by 48% in 10-Year Study',
    source: 'The Lancet Global Health',
    timestamp: '1 day ago',
    readTime: '5 min read',
    summary: 'Meta-analysis across 120,000 participants shows that brisk walking between 7,000 to 8,000 steps daily delivers the maximum cardiovascular and longevity risk reduction plateau.',
    clinicalTakeaway: 'Consistency matters more than extreme distance; incremental 1,000 daily steps yield measurable reductions in arterial stiffness and fasting insulin.',
    tags: ['Lancet Study', 'Longevity', 'Cardio Health', 'Step Count'],
    trendingScore: 97,
    likes: 654
  },
  {
    id: 'cc-7',
    category: 'medical_research',
    categoryLabel: 'Medical Research',
    badgeColor: '#6366f1',
    icon: '🧬',
    title: 'NEJM: Personalized mRNA Cancer Vaccine Shows 44% Reduction in Melanoma Recurrence',
    source: 'New England Journal of Medicine (NEJM)',
    timestamp: '1 day ago',
    readTime: '4 min read',
    summary: 'Phase 2b randomized trial combining personalized neoantigen mRNA vaccines with checkpoint inhibitors demonstrated sustained remission and anti-tumor T-cell persistence.',
    clinicalTakeaway: 'Marks an inflection point for personalized oncological immunotherapy, training patient-specific immune systems to identify tumor mutations.',
    tags: ['NEJM', 'Oncology', 'mRNA Vaccines', 'Immunotherapy'],
    trendingScore: 94,
    likes: 512
  },
  // Global Health & Outbreak Alerts
  {
    id: 'cc-8',
    category: 'global_alerts',
    categoryLabel: 'Global & Environmental Alerts',
    badgeColor: '#dc2626',
    icon: '🌍',
    title: 'WHO Seasonal Respiratory & Influenza A(H3N2) Surveillance Advisory',
    source: 'World Health Organization (WHO) Global Bulletin',
    timestamp: '4 hours ago',
    readTime: '2 min read',
    summary: 'Seasonal climatic shifts trigger heightened viral transmissions in densely populated metropolitan corridors. Hand hygiene and quadrivalent immunizations strongly advised.',
    clinicalTakeaway: 'Ensure adequate vitamin D levels, stay hydrated with electrolyte fluids, and isolate for 48 hours upon fever onset to protect vulnerable household members.',
    tags: ['WHO Bulletin', 'Respiratory Virus', 'Flu Season', 'Public Health'],
    trendingScore: 90,
    likes: 290
  },
  {
    id: 'cc-9',
    category: 'global_alerts',
    categoryLabel: 'Global & Environmental Alerts',
    badgeColor: '#d97706',
    icon: '🌫️',
    title: 'PM2.5 Air Quality & Environmental Bronchial Irritation Advisory',
    source: 'National Environmental & Health Authority',
    timestamp: '7 hours ago',
    readTime: '3 min read',
    summary: 'Elevated particulate matter in major metropolitan corridors increases airway hyperresponsiveness and dry cough among asthma and allergy sufferers.',
    clinicalTakeaway: 'Use indoor HEPA air purifiers, wear N95/FFP2 masks during highway commuting, and rinse nasal passages with isotonic saline saline spray.',
    tags: ['Air Quality', 'PM2.5', 'Asthma Care', 'Environmental Health'],
    trendingScore: 89,
    likes: 315
  }
];

export const DISEASE_BULLETINS = [
  {
    title: '🌧️ Seasonal Viral Respiratory & Rhinosinusitis Wave',
    category: 'Respiratory Viral',
    severity: 'Moderate',
    statusBadge: 'High Seasonal Index',
    badgeColor: 'warning',
    summary: 'Monsoon transitions and seasonal temperature shifts lead to increased cases of Rhinoviruses, Adenovirus, and mild Bronchitis. Keep hydrated and practice regular hand hygiene.',
    keyAdvice: 'Hydrate with warm fluids, prioritize vitamin C & zinc intake, steam inhalation twice daily if experiencing nasal congestion.',
    affectedRegions: ['North India (Delhi NCR, Punjab, UP)', 'Western Ghats (Mumbai, Pune, Kerala)', 'Bengaluru']
  },
  {
    title: '🦟 Vector-Borne Dengue & Chikungunya Active Surveillance',
    category: 'Vector-Borne Disease',
    severity: 'Active Watch',
    statusBadge: 'Active Surveillance',
    badgeColor: 'neutral',
    summary: 'Municipal corporations in urban hubs report localized vector breeding in stagnant rainwater reservoirs. Early recognition of retro-orbital pain and platelet trends is crucial.',
    keyAdvice: 'Inspect residential coolers and flowerpots, use mosquito repellents (DEET / Picaridin) during daylight dawn/dusk hours, seek prompt CBC on persistent fever.',
    affectedRegions: ['Hyderabad', 'Chennai', 'Bengaluru', 'Delhi NCR', 'Kolkata']
  },
  {
    title: '🥗 Food & Water-Borne Gastroenteritis & Typhoid Prevention',
    category: 'Gastrointestinal Infectious',
    severity: 'Controlled',
    statusBadge: 'Controlled',
    badgeColor: 'positive',
    summary: 'Sporadic episodes of acute bacterial gastroenteritis and Amoebiasis linked to outside street foods during humid monsoon spells.',
    keyAdvice: 'Consume strictly boiled or filtered RO water, thoroughly wash raw fruits and vegetables, avoid raw street salads.',
    affectedRegions: ['All Metros & Tier-2 Urban Centers']
  },
  {
    title: '🌫️ Particulate Matter (PM2.5) Air Quality & Asthma Advisory',
    category: 'Environmental Health',
    severity: 'Moderate to High',
    statusBadge: 'Environmental Alert',
    badgeColor: 'warning',
    summary: 'Elevated AQI levels in winter transitions trigger bronchial hyperreactivity and dry allergic cough in predisposed individuals.',
    keyAdvice: 'Use HEPA air purifiers indoors, wear N95 masks during heavy traffic commutes, keep rescue bronchodilator inhalers handy.',
    affectedRegions: ['Delhi NCR', 'Kanpur', 'Lucknow', 'Mumbai Metropolitan Region']
  },
  {
    title: '👁️ Viral Conjunctivitis ("Pink Eye") Hygiene Protocol',
    category: 'Ophthalmic Infection',
    severity: 'Low',
    statusBadge: 'Precautionary',
    badgeColor: 'positive',
    summary: 'Adenoviral eye infections transmitted via surface contacts and hand-eye rubbing. Highly contagious but self-limiting.',
    keyAdvice: 'Frequent handwashing with soap, avoid sharing eye drops or towels, use lubricating artificial tear drops and cool compresses.',
    affectedRegions: ['Nationwide Urban Pockets']
  }
];

export const LAB_TESTS_CATALOG = [
  {
    code: 'CBC',
    name: 'Complete Blood Count (CBC) with ESR',
    category: 'Hematology',
    fastingRequired: 'No',
    sampleType: 'Whole Blood (EDTA)',
    priceINR: 350,
    parameters: [
      { name: 'Hemoglobin', normalRange: '13.0 - 17.0 g/dL (M) / 12.0 - 15.5 g/dL (F)', unit: 'g/dL' },
      { name: 'Total Leukocyte Count (TLC)', normalRange: '4,000 - 11,000 /µL', unit: '/µL' },
      { name: 'Platelet Count', normalRange: '150,000 - 450,000 /µL', unit: '/µL' },
      { name: 'Packed Cell Volume (PCV)', normalRange: '40 - 50%', unit: '%' },
      { name: 'ESR (Erythrocyte Sedimentation)', normalRange: '0 - 15 mm/hr', unit: 'mm/hr' }
    ]
  },
  {
    code: 'LIPID',
    name: 'Lipid Profile Complete (Cholesterol Panel)',
    category: 'Cardiovascular / Metabolic',
    fastingRequired: 'Yes (10-12 hours overnight)',
    sampleType: 'Serum (Gold Top)',
    priceINR: 650,
    parameters: [
      { name: 'Total Cholesterol', normalRange: '< 200 mg/dL (Desirable)', unit: 'mg/dL' },
      { name: 'HDL "Good" Cholesterol', normalRange: '> 40 mg/dL (M) / > 50 mg/dL (F)', unit: 'mg/dL' },
      { name: 'LDL "Bad" Cholesterol', normalRange: '< 100 mg/dL (Optimal)', unit: 'mg/dL' },
      { name: 'Triglycerides', normalRange: '< 150 mg/dL (Normal)', unit: 'mg/dL' },
      { name: 'VLDL Cholesterol', normalRange: '5 - 30 mg/dL', unit: 'mg/dL' },
      { name: 'Total/HDL Ratio', normalRange: '< 4.5', unit: 'Ratio' }
    ]
  },
  {
    code: 'HBA1C',
    name: 'HbA1c (Glycosylated Hemoglobin) & Avg Blood Glucose',
    category: 'Diabetology',
    fastingRequired: 'No (Any time of day)',
    sampleType: 'Whole Blood (EDTA)',
    priceINR: 500,
    parameters: [
      { name: 'HbA1c', normalRange: '< 5.7% (Normal) | 5.7-6.4% (Pre-diabetic) | >=6.5% (Diabetic)', unit: '%' },
      { name: 'Estimated Average Glucose (eAG)', normalRange: '90 - 120 mg/dL', unit: 'mg/dL' }
    ]
  },
  {
    code: 'LFT',
    name: 'Liver Function Test (LFT) Comprehensive',
    category: 'Hepatology',
    fastingRequired: 'Preferred (8 hours)',
    sampleType: 'Serum',
    priceINR: 700,
    parameters: [
      { name: 'SGPT / ALT', normalRange: '7 - 56 U/L', unit: 'U/L' },
      { name: 'SGOT / AST', normalRange: '10 - 40 U/L', unit: 'U/L' },
      { name: 'Alkaline Phosphatase (ALP)', normalRange: '44 - 147 U/L', unit: 'U/L' },
      { name: 'Total Bilirubin', normalRange: '0.2 - 1.2 mg/dL', unit: 'mg/dL' },
      { name: 'Direct Bilirubin', normalRange: '0.0 - 0.3 mg/dL', unit: 'mg/dL' },
      { name: 'Total Protein', normalRange: '6.0 - 8.3 g/dL', unit: 'g/dL' },
      { name: 'Serum Albumin', normalRange: '3.5 - 5.0 g/dL', unit: 'g/dL' }
    ]
  },
  {
    code: 'KFT',
    name: 'Kidney Function Test (KFT) / Renal Panel with Electrolytes',
    category: 'Nephrology',
    fastingRequired: 'No',
    sampleType: 'Serum',
    priceINR: 750,
    parameters: [
      { name: 'Serum Creatinine', normalRange: '0.7 - 1.3 mg/dL (M) / 0.6 - 1.1 mg/dL (F)', unit: 'mg/dL' },
      { name: 'Blood Urea Nitrogen (BUN)', normalRange: '7 - 20 mg/dL', unit: 'mg/dL' },
      { name: 'Uric Acid', normalRange: '3.5 - 7.2 mg/dL', unit: 'mg/dL' },
      { name: 'Serum Sodium (Na+)', normalRange: '135 - 145 mEq/L', unit: 'mEq/L' },
      { name: 'Serum Potassium (K+)', normalRange: '3.5 - 5.1 mEq/L', unit: 'mEq/L' },
      { name: 'Serum Chloride (Cl-)', normalRange: '96 - 106 mEq/L', unit: 'mEq/L' }
    ]
  },
  {
    code: 'THYROID',
    name: 'Thyroid Profile Total (T3, T4, TSH)',
    category: 'Endocrinology',
    fastingRequired: 'Yes (Morning fasting before thyroid pills)',
    sampleType: 'Serum',
    priceINR: 550,
    parameters: [
      { name: 'TSH (Ultrasensitive)', normalRange: '0.45 - 4.50 µIU/mL (Optimal: 1.0 - 2.5)', unit: 'µIU/mL' },
      { name: 'Total T3', normalRange: '0.8 - 2.0 ng/mL', unit: 'ng/mL' },
      { name: 'Total T4', normalRange: '5.1 - 14.1 µg/dL', unit: 'µg/dL' }
    ]
  },
  {
    code: 'VIT_D_B12',
    name: 'Vitamin D3 (25-OH) & Vitamin B12 Combo',
    category: 'Nutritional / Neurological',
    fastingRequired: 'No',
    sampleType: 'Serum',
    priceINR: 1200,
    parameters: [
      { name: 'Vitamin D3 (25-Hydroxy)', normalRange: '30 - 100 ng/mL (Deficient < 20 ng/mL)', unit: 'ng/mL' },
      { name: 'Vitamin B12 (Cobalamin)', normalRange: '200 - 900 pg/mL (Optimal > 400 pg/mL)', unit: 'pg/mL' }
    ]
  }
];
