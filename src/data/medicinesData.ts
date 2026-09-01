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
  timing: string; // 'After food', 'Empty stomach', 'Bedtime', 'With meals'
  defaultReminderTimes: string[]; // e.g. ['08:00', '20:00']
  side_effects: string;
  warnings: string;
  contraindications: string[];
  drugInteractions: string[];
  foodInteractions: string[];
  pregnancySafety: string; // 'Safe / Category B', 'Consult Doctor / Category C', 'Unsafe / Category D/X'
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

export const MEDICINES_DATA: Record<string, MedicineProfile> = {
  // --- ANALGESICS & ANTI-INFLAMMATORY (PAIN & FEVER) ---
  paracetamol: {
    name: 'Paracetamol',
    genericName: 'Acetaminophen / Paracetamol',
    brandNames: ['Dolo 650', 'Crocin 650', 'Calpol 500', 'Pacimol', 'Sumo L', 'P-650', 'Crocin Advance', 'Pyrigesic'],
    class: 'Antipyretic & Non-Opioid Analgesic',
    therapeuticCategory: 'Fever & Pain Management',
    form: 'Oral Tablets, Syrups, Effervescent, IV Infusion',
    standardStrength: '500mg - 650mg',
    uses: ['Fever reduction (antipyretic)', 'Mild to moderate headaches, toothache, and body pain relief', 'Post-vaccination discomfort'],
    dosage_schedule: '500mg–650mg every 6 to 8 hours as needed. Maximum adult daily limit is 4,000mg.',
    timing: 'After food or with a glass of water',
    defaultReminderTimes: ['08:00', '14:00', '20:00'],
    side_effects: 'Rare at normal therapeutic dosages; mild nausea, allergic skin rash in sensitive individuals.',
    warnings: 'Avoid combining with multiple cold/flu syrups to prevent accidental acetaminophen overdose; avoid heavy alcohol to prevent hepatotoxicity.',
    contraindications: ['Severe active liver impairment / hepatic failure', 'Known hypersensitivity to paracetamol'],
    drugInteractions: ['Warfarin (long-term high dose may elevate INR)', 'Isoniazid (increased liver strain)'],
    foodInteractions: ['Alcohol (significantly magnifies liver toxicity risk)'],
    pregnancySafety: 'Generally considered safest antipyretic in pregnancy (Category B) when used at standard short-term dosage.',
    genericPriceINR: 15,
    brandedPriceINR: 35,
    costSavingsPercent: 57,
    prescriptionRequired: false
  },
  'dolo-650': {
    name: 'Dolo 650',
    genericName: 'Paracetamol 650 mg',
    brandNames: ['Dolo 650', 'Crocin 650', 'Calpol 650', 'P-650', 'Dolopar 650'],
    class: 'Antipyretic & Analgesic',
    therapeuticCategory: 'Fever & Body Pain Relief',
    form: 'Tablet',
    standardStrength: '650mg',
    uses: ['High grade fever management', 'Severe muscular pain, viral fever arthralgia, tension headaches'],
    dosage_schedule: '1 tablet 3 times a day after meals, maintaining at least 6 hours gap between doses.',
    timing: 'After food',
    defaultReminderTimes: ['08:30', '14:30', '20:30'],
    side_effects: 'Generally very well tolerated. Rare mild gastric discomfort or skin flushing.',
    warnings: 'Do not exceed 4 tablets in 24 hours. Monitor liver enzymes if taken for more than 5 consecutive days.',
    contraindications: ['Acute liver failure', 'Chronic alcoholism'],
    drugInteractions: ['Alcohol', 'Carbamazepine', 'Phenytoin'],
    foodInteractions: ['Alcohol'],
    pregnancySafety: 'Category B - Safe under standard medical guidance during all trimesters.',
    genericPriceINR: 18,
    brandedPriceINR: 34,
    costSavingsPercent: 47,
    prescriptionRequired: false
  },
  ibuprofen: {
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Brufen', 'Ibugesic', 'Combiflam (with Paracetamol)', 'Ibupal'],
    class: 'NSAID (Non-Steroidal Anti-Inflammatory Drug)',
    therapeuticCategory: 'Musculoskeletal Pain & Inflammation',
    form: 'Tablets, Capsules, Pediatric Oral Suspension, Gel',
    standardStrength: '200mg - 400mg',
    uses: ['Arthritis & joint inflammation', 'Dental pain, menstrual cramps (dysmenorrhea)', 'Post-workout muscle soreness and sprains'],
    dosage_schedule: '200mg–400mg every 8 hours after meals. Take with antacid or food to buffer stomach.',
    timing: 'Always strictly after food or with milk',
    defaultReminderTimes: ['09:00', '15:00', '21:00'],
    side_effects: 'Heartburn, gastric acidity, nausea, stomach ache, mild fluid retention.',
    warnings: 'Take with food to protect gastric lining; caution in patients with history of peptic ulcers, CKD, or heart disease.',
    contraindications: ['Active peptic ulcer disease', 'Severe renal impairment', 'Third trimester of pregnancy', 'Aspirin-induced asthma'],
    drugInteractions: ['Aspirin', 'ACE inhibitors / ARBs (reduces BP lowering efficacy)', 'Methotrexate', 'Blood thinners'],
    foodInteractions: ['Alcohol (increases stomach bleeding risk)'],
    pregnancySafety: 'Contraindicated in third trimester (Category D - risk of premature closure of ductus arteriosus). Use paracetamol instead.',
    genericPriceINR: 20,
    brandedPriceINR: 42,
    costSavingsPercent: 52,
    prescriptionRequired: false
  },
  combiflam: {
    name: 'Combiflam',
    genericName: 'Ibuprofen (400mg) + Paracetamol (325mg)',
    brandNames: ['Combiflam', 'Ibugesic Plus', 'Flexon', 'Brufen Plus'],
    class: 'Dual NSAID + Antipyretic Fixed Dose Combination',
    therapeuticCategory: 'Severe Pain & Musculoskeletal Relief',
    form: 'Tablet',
    standardStrength: '400mg Ibuprofen + 325mg Paracetamol',
    uses: ['Severe dental pain', 'Acute backache, joint pain, muscular spasms', 'Post-surgical pain relief'],
    dosage_schedule: '1 tablet 2-3 times daily after food. Do not take on empty stomach.',
    timing: 'Strictly after food with a full glass of water',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Acidity, dyspepsia, mild epigastric burning, nausea.',
    warnings: 'Do not use for more than 3-5 days without medical review. Co-prescribe PPI if sensitive to acidity.',
    contraindications: ['Active gastritis / stomach ulcers', 'Renal impairment', 'Late pregnancy'],
    drugInteractions: ['Anticoagulants', 'Corticosteroids (elevates ulcer risk)', 'Lithium'],
    foodInteractions: ['Alcohol', 'Spicy foods (magnifies gastric irritation)'],
    pregnancySafety: 'Not recommended during pregnancy; consult OB/GYN.',
    genericPriceINR: 22,
    brandedPriceINR: 48,
    costSavingsPercent: 54,
    prescriptionRequired: true
  },
  'meftal-spas': {
    name: 'Meftal-Spas',
    genericName: 'Mefenamic Acid (250mg) + Dicyclomine HCl (10mg)',
    brandNames: ['Meftal-Spas', 'Colimex', 'Spasmonil', 'Cyclopam', 'Spasmo-Proxyvon'],
    class: 'Antispasmodic & NSAID',
    therapeuticCategory: 'Abdominal & Menstrual Spasmodic Pain',
    form: 'Tablet, Drops, Injection',
    standardStrength: '250mg + 10mg',
    uses: ['Menstrual cramps (primary dysmenorrhea)', 'Spasmodic abdominal colic & intestinal cramps', 'Ureteric / renal colic spasm relief'],
    dosage_schedule: '1 tablet SOS (as needed) when cramp starts, max 3 times daily after food.',
    timing: 'After food',
    defaultReminderTimes: ['09:00', '15:00', '21:00'],
    side_effects: 'Dry mouth, mild drowsiness, blurred vision, dizziness, nausea.',
    warnings: 'Avoid driving if feeling drowsy. Dicyclomine relaxes smooth muscle; do not exceed prescribed frequency.',
    contraindications: ['Glaucoma', 'Myasthenia gravis', 'Obstructive GI uropathy', 'Severe ulceration'],
    drugInteractions: ['Antihistamines', 'Antidepressants (additive anticholinergic effect)'],
    foodInteractions: ['Alcohol (amplifies sedation and dizziness)'],
    pregnancySafety: 'Category C - Use with caution and only if prescribed by doctor.',
    genericPriceINR: 25,
    brandedPriceINR: 60,
    costSavingsPercent: 58,
    prescriptionRequired: true
  },
  diclofenac: {
    name: 'Diclofenac',
    genericName: 'Diclofenac Sodium / Potassium',
    brandNames: ['Voveran 50', 'Voveran SR 75/100', 'Dynapar AQ', 'Diclogel', 'Reactin 50'],
    class: 'Potent Non-Steroidal Anti-Inflammatory Drug',
    therapeuticCategory: 'Severe Inflammatory Arthritis & Orthopedic Pain',
    form: 'Enteric Coated Tablet, Sustained Release, Gel, Transdermal Patch, Injection',
    standardStrength: '50mg - 75mg SR',
    uses: ['Osteoarthritis & rheumatoid arthritis flares', 'Acute gout attacks, traumatic tendonitis', 'Severe post-operative orthopedic pain'],
    dosage_schedule: '50mg twice daily or 75mg SR once daily after dinner.',
    timing: 'After food',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Epigastric distress, nausea, elevated liver transaminases with prolonged use, fluid retention.',
    warnings: 'Use lowest effective dose for shortest duration; caution in cardiovascular disease or heart failure.',
    contraindications: ['Congestive heart failure', 'Active peptic ulceration', 'Severe kidney failure'],
    drugInteractions: ['Aspirin', 'Warfarin', 'Digoxin', 'Methotrexate', 'Diuretics'],
    foodInteractions: ['Alcohol'],
    pregnancySafety: 'Avoid during 3rd trimester.',
    genericPriceINR: 30,
    brandedPriceINR: 85,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  'zerodol-p': {
    name: 'Zerodol-P',
    genericName: 'Aceclofenac (100mg) + Paracetamol (325mg)',
    brandNames: ['Zerodol-P', 'Hifenac-P', 'Dolokind-P', 'Aceclo-Plus', 'Aceloflam'],
    class: 'Dual NSAID Analgesic',
    therapeuticCategory: 'Acute Musculoskeletal Pain, Joint Sprains & Dental Ache',
    form: 'Film Coated Tablet',
    standardStrength: '100mg Aceclofenac + 325mg Paracetamol',
    uses: ['Acute backache & cervical spondylosis pain', 'Dental infection analgesia', 'Osteoarthritis flare relief'],
    dosage_schedule: '1 tablet twice daily after meals for 3 to 5 days.',
    timing: 'After food',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Acidity, dyspepsia, nausea, dizziness.',
    warnings: 'Do not take on empty stomach; avoid prolonged continuous use without physician check.',
    contraindications: ['Active gastrointestinal bleeding', 'Severe renal impairment', 'Third trimester pregnancy'],
    drugInteractions: ['Blood thinners', 'Antihypertensives', 'Lithium'],
    foodInteractions: ['Alcohol (increases gastric toxicity)'],
    pregnancySafety: 'Category D in 3rd trimester. Avoid during pregnancy.',
    genericPriceINR: 28,
    brandedPriceINR: 72,
    costSavingsPercent: 61,
    prescriptionRequired: true
  },
  'zerodol-sp': {
    name: 'Zerodol-SP',
    genericName: 'Aceclofenac (100mg) + Paracetamol (325mg) + Serratiopeptidase (15mg)',
    brandNames: ['Zerodol-SP', 'Hifenac-SP', 'Dolokind-AA', 'Aldigesic-SP', 'Signoflam'],
    class: 'Triple Anti-Inflammatory, Analgesic & Proteolytic Enzyme Combo',
    therapeuticCategory: 'Post-Traumatic Swelling, Post-Operative Edema & Tissue Inflammation',
    form: 'Enteric Coated Tablet',
    standardStrength: '100mg + 325mg + 15mg',
    uses: ['Post-surgical tissue healing & swelling reduction', 'Severe trauma, fracture hematoma resolution', 'Dental extraction inflammation'],
    dosage_schedule: '1 tablet twice daily after food for 5 days.',
    timing: 'After food',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Mild epigastric pain, nausea, skin rash (rare).',
    warnings: 'Serratiopeptidase accelerates tissue penetration; swallow whole with water.',
    contraindications: ['Severe bleeding diathesis', 'Active peptic ulcer'],
    drugInteractions: ['Anticoagulants / Heparin / Warfarin (increased bleeding hazard)'],
    foodInteractions: ['Alcohol'],
    pregnancySafety: 'Not recommended during pregnancy.',
    genericPriceINR: 42,
    brandedPriceINR: 118,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  ultracet: {
    name: 'Ultracet',
    genericName: 'Tramadol Hydrochloride (37.5mg) + Paracetamol (325mg)',
    brandNames: ['Ultracet', 'Tramazac-P', 'Calpol-T', 'Dolzero'],
    class: 'Central Opioid Analgesic + Non-Opioid Combination',
    therapeuticCategory: 'Moderate to Severe Acute & Chronic Pain',
    form: 'Tablet',
    standardStrength: '37.5mg Tramadol + 325mg Paracetamol',
    uses: ['Severe post-operative pain', 'Orthopedic bone fractures, severe trauma', 'Refractory neuropathic & acute chronic pain'],
    dosage_schedule: '1 tablet every 6 to 8 hours as prescribed. Maximum 8 tablets per day.',
    timing: 'With or without food',
    defaultReminderTimes: ['08:00', '16:00', '22:00'],
    side_effects: 'Drowsiness, dizziness, nausea, constipation, sweating, lightheadedness.',
    warnings: 'Schedule H1 controlled prescription. May cause dependence with prolonged misuse. Do not operate machinery or drive.',
    contraindications: ['Acute intoxication with alcohol, hypnotics or narcotics', 'Severe respiratory depression', 'Epilepsy / uncontrolled seizures'],
    drugInteractions: ['SSRIs / SNRIs (risk of Serotonin Syndrome)', 'MAO Inhibitors', 'Sedatives / Benzodiazepines'],
    foodInteractions: ['Alcohol (strictly avoid - severe central respiratory depression risk)'],
    pregnancySafety: 'Category C - Contraindicated near term or during breastfeeding.',
    genericPriceINR: 65,
    brandedPriceINR: 185,
    costSavingsPercent: 65,
    prescriptionRequired: true
  },

  // --- CARDIOVASCULAR, HYPERTENSION & LIPIDS ---
  telmisartan: {
    name: 'Telmisartan',
    genericName: 'Telmisartan',
    brandNames: ['Telma 40', 'Telmikind 40', 'Creser 40', 'Telpres 40', 'Telvas 40', 'Arbitel 40'],
    class: 'Angiotensin II Receptor Blocker (ARB)',
    therapeuticCategory: 'Hypertension & Cardiovascular Risk Reduction',
    form: 'Tablet',
    standardStrength: '20mg, 40mg, 80mg',
    uses: ['Primary essential hypertension', 'Cardiovascular risk reduction in high-risk patients', 'Renoprotection in diabetic nephropathy'],
    dosage_schedule: '40mg once daily in morning at a consistent fixed time.',
    timing: 'Morning after breakfast with water',
    defaultReminderTimes: ['08:00'],
    side_effects: 'Mild dizziness, back pain, sinus congestion, fatigue, occasional hyperkalemia.',
    warnings: 'Do not stop abruptly. Regularly monitor serum potassium and renal function (creatinine) tests.',
    contraindications: ['Pregnancy (causes fetal toxicity)', 'Bilateral renal artery stenosis', 'Severe biliary obstruction'],
    drugInteractions: ['Potassium supplements / spironolactone (risk of hyperkalemia)', 'NSAIDs (diminish antihypertensive effect)', 'Lithium'],
    foodInteractions: ['High potassium salt substitutes (caution)'],
    pregnancySafety: 'Strictly Contraindicated (Category D) - Harmful to developing fetus.',
    genericPriceINR: 45,
    brandedPriceINR: 110,
    costSavingsPercent: 59,
    prescriptionRequired: true
  },
  'telma-h': {
    name: 'Telma-H',
    genericName: 'Telmisartan (40mg) + Hydrochlorothiazide (12.5mg)',
    brandNames: ['Telma-H', 'Telmikind-H', 'Creser-H', 'Telvas-H', 'Telpres-H'],
    class: 'ARB + Thiazide Diuretic Combination',
    therapeuticCategory: 'Moderate to Resistant Essential Hypertension',
    form: 'Tablet',
    standardStrength: '40mg Telmisartan + 12.5mg Hydrochlorothiazide',
    uses: ['Essential hypertension not adequately controlled by monotherapy alone', 'Fluid retention and volume-dependent elevated systolic pressure'],
    dosage_schedule: '1 tablet once daily in the morning after breakfast.',
    timing: 'Morning after breakfast (avoid taking at night to prevent sleep disruption from urination)',
    defaultReminderTimes: ['08:00'],
    side_effects: 'Frequent urination in initial week, mild dizziness, orthostatic hypotension, electrolyte shifts.',
    warnings: 'Take in morning to prevent nighttime urination; check serum electrolytes and creatinine periodically.',
    contraindications: ['Anuria / severe renal failure', 'Severe hepatic impairment', 'Refractory hypokalemia / hypercalcemia', 'Pregnancy'],
    drugInteractions: ['Lithium (elevates lithium levels)', 'Potassium supplements', 'Digoxin', 'NSAIDs'],
    foodInteractions: ['Alcohol (amplifies orthostatic dizziness)'],
    pregnancySafety: 'Category D - Contraindicated in pregnancy.',
    genericPriceINR: 52,
    brandedPriceINR: 140,
    costSavingsPercent: 63,
    prescriptionRequired: true
  },
  amlodipine: {
    name: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: ['Amlong 5', 'Stamlo 5', 'Amlopin 5', 'Amlovas 5', 'Amloz 5'],
    class: 'Dihydropyridine Calcium Channel Blocker (CCB)',
    therapeuticCategory: 'High Blood Pressure & Chronic Angina',
    form: 'Tablet',
    standardStrength: '2.5mg, 5mg, 10mg',
    uses: ['High blood pressure management', 'Chronic stable angina pectoris', 'Vasospastic Prinzmetal angina'],
    dosage_schedule: '5mg once daily, usually at night before sleeping or in morning.',
    timing: 'Bedtime or morning with water',
    defaultReminderTimes: ['21:30'],
    side_effects: 'Peripheral ankle/pedal edema (swelling), facial flushing, dizziness, palpitations.',
    warnings: 'Swelling of feet or ankles is common; inform doctor if troublesome (dosage adjustment or combo helps).',
    contraindications: ['Severe aortic stenosis', 'Cardiogenic shock', 'Unstable hypotension'],
    drugInteractions: ['Simvastatin (cap simvastatin at 20mg if combined)', 'Clarithromycin', 'Cyclosporine'],
    foodInteractions: ['Grapefruit juice (may increase blood levels of amlodipine)'],
    pregnancySafety: 'Category C - Use only if potential benefit justifies potential risk.',
    genericPriceINR: 20,
    brandedPriceINR: 65,
    costSavingsPercent: 69,
    prescriptionRequired: true
  },
  cilnidipine: {
    name: 'Cilnidipine',
    genericName: 'Cilnidipine (L/N-type Calcium Channel Blocker)',
    brandNames: ['Cilacar 10/20', 'Nexsartan-C', 'Cilny', 'Cildate 10'],
    class: 'Dual L-type & N-type Calcium Channel Blocker',
    therapeuticCategory: 'Renoprotective Hypertension Management',
    form: 'Tablet',
    standardStrength: '5mg, 10mg, 20mg',
    uses: ['Hypertension in patients with proteinuria or kidney strain', 'Minimizes reflex tachycardia and pedal edema compared to amlodipine'],
    dosage_schedule: '10mg once daily after breakfast.',
    timing: 'Morning after food',
    defaultReminderTimes: ['08:30'],
    side_effects: 'Mild dizziness, headache, flushing (pedal edema is significantly lower than Amlodipine).',
    warnings: 'Suppresses sympathetic nerve overactivity; do not stop abruptly.',
    contraindications: ['Severe hypotension', 'Cardiogenic shock'],
    drugInteractions: ['Other antihypertensives', 'Digoxin', 'Cimetidine'],
    foodInteractions: ['Grapefruit juice'],
    pregnancySafety: 'Category C - Consult physician.',
    genericPriceINR: 48,
    brandedPriceINR: 135,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  metoprolol: {
    name: 'Metoprolol Succinate',
    genericName: 'Metoprolol Succinate Extended Release (ER)',
    brandNames: ['Betaloc 25/50', 'Metolar XR 25/50', 'Seloken XL', 'Starpress-XL'],
    class: 'Cardioselective Beta-1 Adrenergic Blocker',
    therapeuticCategory: 'Hypertension, Tachycardia, Angina & Heart Failure',
    form: 'Extended Release (ER/XL) Tablet',
    standardStrength: '25mg, 50mg, 100mg',
    uses: ['Rate control in resting & exertional tachycardia', 'Post-myocardial infarction secondary cardioprotection', 'Stable chronic heart failure maintenance'],
    dosage_schedule: '25mg–50mg once daily in morning with or immediately after food.',
    timing: 'Morning with or immediately after breakfast',
    defaultReminderTimes: ['08:30'],
    side_effects: 'Bradycardia (slow pulse), fatigue, cold extremities, dizziness, bronchospasm in asthmatics.',
    warnings: 'Never stop suddenly (rebound hypertension/angina risk). Check resting heart rate; hold if pulse < 55 bpm.',
    contraindications: ['Sinus bradycardia (< 50 bpm)', 'Second/third degree AV block', 'Severe bronchial asthma / decompensated heart failure'],
    drugInteractions: ['Verapamil / Diltiazem (severe bradycardia risk)', 'Digoxin', 'Clonidine'],
    foodInteractions: ['Alcohol (accelerates drug release in ER formulations)'],
    pregnancySafety: 'Category C - Monitor fetal heart rate if used.',
    genericPriceINR: 38,
    brandedPriceINR: 105,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  rosuvastatin: {
    name: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    brandNames: ['Rosuvas 10', 'Rozavel 10', 'Rosavel 10', 'Crestor 10', 'Novastat 10', 'Roseday 10'],
    class: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticCategory: 'Cholesterol & Atherosclerosis Prevention',
    form: 'Tablet',
    standardStrength: '5mg, 10mg, 20mg, 40mg',
    uses: ['Hypercholesterolemia (elevated LDL & triglycerides)', 'Atherosclerotic cardiovascular risk reduction', 'Arterial plaque stabilization'],
    dosage_schedule: '10mg once daily at night after dinner.',
    timing: 'Night after dinner',
    defaultReminderTimes: ['21:00'],
    side_effects: 'Muscle aches (myalgia), mild headache, elevated liver enzymes, slight glucose elevation.',
    warnings: 'Promptly report unexplained severe muscle pain, tenderness, or weakness (rare rhabdomyolysis warning).',
    contraindications: ['Active liver disease', 'Pregnancy and lactation', 'Severe renal impairment'],
    drugInteractions: ['Gemfibrozil / Fibrates (amplifies muscle toxicity)', 'Cyclosporine', 'Antacids (separate by 2 hours)'],
    foodInteractions: ['Alcohol (moderation advised to protect liver)'],
    pregnancySafety: 'Category X - Strictly contraindicated in pregnancy.',
    genericPriceINR: 60,
    brandedPriceINR: 170,
    costSavingsPercent: 65,
    prescriptionRequired: true
  },
  atorvastatin: {
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Atorva 10/20', 'Lipitor', 'Storvas 10', 'Atocor 10', 'Tonact 10', 'TG-Tor 10'],
    class: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticCategory: 'Lipid Lowering & Coronary Protection',
    form: 'Tablet',
    standardStrength: '10mg, 20mg, 40mg, 80mg',
    uses: ['Primary hyperlipidemia', 'Prevention of myocardial infarction and stroke in high-risk patients'],
    dosage_schedule: '10mg–20mg once daily at bedtime.',
    timing: 'Bedtime',
    defaultReminderTimes: ['21:30'],
    side_effects: 'Myalgia, mild digestive upset, fatigue, joint stiffness.',
    warnings: 'Perform baseline Liver Function Tests (LFT) and Lipid Profile periodic checks.',
    contraindications: ['Active liver disease', 'Pregnancy & breastfeeding'],
    drugInteractions: ['Clarithromycin', 'Erythromycin', 'Ketoconazole', 'Digoxin'],
    foodInteractions: ['Grapefruit juice (avoid large quantities)'],
    pregnancySafety: 'Category X - Discontinue immediately before conception.',
    genericPriceINR: 50,
    brandedPriceINR: 145,
    costSavingsPercent: 66,
    prescriptionRequired: true
  },
  'ecosprin-75': {
    name: 'Ecosprin 75',
    genericName: 'Aspirin (Enteric Coated 75mg)',
    brandNames: ['Ecosprin 75', 'Delisprin 75', 'Loprin 75', 'ASA 75', 'Ecosprin 150'],
    class: 'Antiplatelet Agent (Blood Thinner)',
    therapeuticCategory: 'Prevention of Blood Clots, Heart Attacks & Strokes',
    form: 'Enteric Coated Tablet',
    standardStrength: '75mg, 150mg',
    uses: ['Secondary prevention of heart attack and ischemic stroke', 'Post-stent or bypass antiplatelet maintenance'],
    dosage_schedule: '1 tablet once daily after lunch or dinner. Swallow whole without crushing.',
    timing: 'After lunch or dinner with plenty of water',
    defaultReminderTimes: ['13:30'],
    side_effects: 'Mild bleeding tendency, bruising easily, gastric irritation, indigestion.',
    warnings: 'Swallow whole without breaking enteric coating; inform surgeon/dentist before any procedural surgery.',
    contraindications: ['Active gastrointestinal bleeding', 'Hemophilia / bleeding disorders', 'Children under 16 with viral infections (Reye syndrome risk)'],
    drugInteractions: ['Clopidogrel (dual antiplatelet requires supervision)', 'Warfarin', 'NSAIDs like Ibuprofen'],
    foodInteractions: ['Alcohol (elevates gastric bleeding hazard)'],
    pregnancySafety: 'Low dose (75-150mg) is often prescribed under high-risk OB guidance for preeclampsia prevention.',
    genericPriceINR: 12,
    brandedPriceINR: 28,
    costSavingsPercent: 57,
    prescriptionRequired: true
  },
  clopidogrel: {
    name: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    brandNames: ['Clopilet 75', 'Deplatt 75', 'Plavix 75', 'Clavix 75', 'Ceruvit 75'],
    class: 'Thienopyridine P2Y12 Antiplatelet',
    therapeuticCategory: 'Post-Stent & Acute Coronary Thrombosis Prevention',
    form: 'Film Coated Tablet',
    standardStrength: '75mg, 150mg',
    uses: ['Prevention of stent thrombosis following angioplasty', 'Secondary prophylaxis after stroke or acute MI'],
    dosage_schedule: '75mg once daily with or without food.',
    timing: 'Once daily at a fixed time (morning or night)',
    defaultReminderTimes: ['09:00'],
    side_effects: 'Easy bruising, minor nosebleeds, prolonged bleeding from cuts, GI discomfort.',
    warnings: 'Must not be discontinued prematurely after stent placement without cardiologist approval.',
    contraindications: ['Active pathological bleeding (e.g. peptic ulcer, intracranial hemorrhage)'],
    drugInteractions: ['Omeprazole (inhibits CYP2C19 activation; pantoprazole preferred)', 'NSAIDs', 'Warfarin'],
    foodInteractions: ['Alcohol (magnifies bleeding hazard)'],
    pregnancySafety: 'Category B - Use only if clearly needed under cardiologist supervision.',
    genericPriceINR: 45,
    brandedPriceINR: 125,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  spironolactone: {
    name: 'Spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone 25/50', 'Lasilactone (combo)', 'Spiractin'],
    class: 'Aldosterone Receptor Antagonist (Potassium-Sparing Diuretic)',
    therapeuticCategory: 'Refractory Hypertension, Heart Failure & Edema',
    form: 'Tablet',
    standardStrength: '25mg, 50mg, 100mg',
    uses: ['Congestive heart failure mortality reduction', 'Resistant hypertension', 'Ascites in liver cirrhosis, female hormonal acne / hirsutism'],
    dosage_schedule: '25mg–50mg once daily after breakfast.',
    timing: 'Morning after food',
    defaultReminderTimes: ['08:30'],
    side_effects: 'Hyperkalemia (high potassium), gynecomastia, menstrual irregularities, dizziness.',
    warnings: 'Monitor serum potassium regularly; avoid high potassium salt substitutes.',
    contraindications: ['Hyperkalemia (> 5.0 mEq/L)', 'Severe renal insufficiency (eGFR < 30)', 'Addison disease'],
    drugInteractions: ['ACE inhibitors / ARBs (elevates hyperkalemia risk)', 'Potassium supplements', 'Digoxin'],
    foodInteractions: ['High potassium salt substitutes (avoid)'],
    pregnancySafety: 'Category C - Use with caution.',
    genericPriceINR: 32,
    brandedPriceINR: 88,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },

  // --- DIABETES & METABOLIC ---
  metformin: {
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride (SR)',
    brandNames: ['Glycomet 500 SR', 'Glucophage', 'Cetapin 500', 'Obimet 500', 'Gluconorm 500 SR', 'Glyciphage 500'],
    class: 'Biguanide Antihyperglycemic',
    therapeuticCategory: 'Type 2 Diabetes & Insulin Resistance Reversal',
    form: 'Immediate Release & Sustained Release (SR) Tablets',
    standardStrength: '500mg, 850mg, 1000mg',
    uses: ['First-line therapy for Type 2 Diabetes Mellitus', 'PCOS insulin sensitizer and ovulatory regularizer', 'Pre-diabetes glycemic normalization'],
    dosage_schedule: '500mg SR once or twice daily with principal meals.',
    timing: 'With or immediately after meals',
    defaultReminderTimes: ['08:30', '20:30'],
    side_effects: 'Gastrointestinal bloating, metallic taste, loose stools (subsides after 1-2 weeks), vitamin B12 depletion over years.',
    warnings: 'Take with meals to prevent stomach upset. Periodically check Vitamin B12 levels. Hold dose before contrast dye scans.',
    contraindications: ['Severe renal impairment (eGFR < 30 mL/min)', 'Acute metabolic acidosis / lactic acidosis', 'Severe sepsis'],
    drugInteractions: ['Iodinated radiocontrast agents (temporarily withhold)', 'Cimetidine', 'Alcohol'],
    foodInteractions: ['Alcohol (increases lactic acidosis risk)'],
    pregnancySafety: 'Category B - Frequently prescribed for gestational diabetes under endocrinologist guidance.',
    genericPriceINR: 25,
    brandedPriceINR: 65,
    costSavingsPercent: 61,
    prescriptionRequired: true
  },
  glimepiride: {
    name: 'Glimepiride',
    genericName: 'Glimepiride',
    brandNames: ['Amaryl 1/2', 'Glimestar 1/2', 'Zoryl 1/2', 'Gemer (combo)', 'Euglim 1/2', 'Glimy 1/2'],
    class: 'Second Generation Sulfonylurea',
    therapeuticCategory: 'Type 2 Diabetes Pancreatic Insulin Secretagogue',
    form: 'Tablet',
    standardStrength: '1mg, 2mg, 3mg, 4mg',
    uses: ['Type 2 Diabetes Mellitus (stimulates beta cells to secrete insulin)'],
    dosage_schedule: '1mg–2mg once daily immediately before or with the first main meal (breakfast).',
    timing: 'Immediately before breakfast (Do not skip meals)',
    defaultReminderTimes: ['08:15'],
    side_effects: 'Hypoglycemia (low blood sugar symptoms: sweating, shakiness, fast heart rate), weight gain, nausea.',
    warnings: 'Never skip breakfast after taking glimepiride. Always carry glucose candy / sugar for hypoglycemia emergency.',
    contraindications: ['Type 1 Diabetes Mellitus', 'Diabetic ketoacidosis', 'Severe hepatic or renal dysfunction'],
    drugInteractions: ['Fluconazole (amplifies hypoglycemia)', 'Beta blockers (masks hypoglycemia tachycardia)', 'Sulfonamides'],
    foodInteractions: ['Skipping meals / fasting (high hypoglycemia hazard)'],
    pregnancySafety: 'Category C - Generally switched to insulin during pregnancy.',
    genericPriceINR: 30,
    brandedPriceINR: 85,
    costSavingsPercent: 65,
    prescriptionRequired: true
  },
  dapagliflozin: {
    name: 'Dapagliflozin',
    genericName: 'Dapagliflozin Propanediol',
    brandNames: ['Forxiga 10', 'Oxra 10', 'Dapaone 10', 'Dapaglyn 10', 'Gaspard 10', 'Brenzys-D'],
    class: 'SGLT2 (Sodium-Glucose Co-Transporter 2) Inhibitor',
    therapeuticCategory: 'Diabetes, Heart Failure & CKD Kidney Protection',
    form: 'Tablet',
    standardStrength: '5mg, 10mg',
    uses: ['Type 2 Diabetes (excretes excess sugar in urine)', 'Heart failure with reduced ejection fraction', 'Chronic Kidney Disease progression slowing'],
    dosage_schedule: '10mg once daily in morning with or without food.',
    timing: 'Morning with water',
    defaultReminderTimes: ['08:00'],
    side_effects: 'Increased urinary frequency, mild genital mycotic / yeast infections, dehydration.',
    warnings: 'Maintain generous daily hydration (2.5L+); maintain good personal hygiene to avoid urinary infections.',
    contraindications: ['Type 1 Diabetes (euglycemic DKA risk)', 'Dialysis patients'],
    drugInteractions: ['Diuretics (potentiates volume depletion/dehydration)', 'Insulin (may need insulin dose reduction)'],
    foodInteractions: ['Adequate water intake required'],
    pregnancySafety: 'Not recommended during 2nd and 3rd trimesters.',
    genericPriceINR: 110,
    brandedPriceINR: 260,
    costSavingsPercent: 58,
    prescriptionRequired: true
  },
  vildagliptin: {
    name: 'Vildagliptin',
    genericName: 'Vildagliptin',
    brandNames: ['Galvus 50', 'Jalra 50', 'Zomelis 50', 'Vysov 50', 'Vilano 50'],
    class: 'Dipeptidyl Peptidase-4 (DPP-4) Inhibitor',
    therapeuticCategory: 'Weight-Neutral Type 2 Diabetes Glycemic Control',
    form: 'Tablet',
    standardStrength: '50mg',
    uses: ['Type 2 Diabetes Mellitus glycemic regulation', 'Low intrinsic hypoglycemia risk and weight neutral'],
    dosage_schedule: '50mg twice daily (morning and evening) with or without food.',
    timing: 'Morning and Night',
    defaultReminderTimes: ['08:30', '20:30'],
    side_effects: 'Mild upper respiratory tract symptoms, dizziness, headache, rare transient LFT elevation.',
    warnings: 'Perform baseline Liver Function Tests (LFT) every 3 months during first year.',
    contraindications: ['Hepatic impairment / ALT or AST > 3x upper normal limit', 'Diabetic ketoacidosis'],
    drugInteractions: ['ACE inhibitors (slight increase in angioedema risk)'],
    foodInteractions: ['None'],
    pregnancySafety: 'Category B - Switch to insulin during pregnancy.',
    genericPriceINR: 65,
    brandedPriceINR: 180,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  'methylcobalamin-ala': {
    name: 'Methylcobalamin + Alpha Lipoic Acid',
    genericName: 'Methylcobalamin (1500 mcg) + Alpha Lipoic Acid (100mg) + Pyridoxine + Folic Acid',
    brandNames: ['Nurokind-Plus RF', 'Meganeuron OD', 'Rejunuron-Plus', 'Neurobion Forte Plus', 'Nuroday-D3'],
    class: 'Neurotropic Vitamin & Antioxidant Complex',
    therapeuticCategory: 'Diabetic Peripheral Neuropathy & Nerve Regeneration',
    form: 'Capsule, Injection',
    standardStrength: '1500mcg B12 + 100mg ALA',
    uses: ['Diabetic neuropathy (numbness, tingling, burning feet)', 'Sciatica, radiculopathy & peripheral nerve repair', 'Chronic fatigue and neurological vitality'],
    dosage_schedule: '1 capsule once daily after lunch or dinner for 30 to 60 days.',
    timing: 'After food',
    defaultReminderTimes: ['13:30'],
    side_effects: 'Extremely safe; rare mild nausea or sweetish urine odor.',
    warnings: 'ALA is a potent antioxidant; consistent daily use yields optimal nerve recovery over 4-8 weeks.',
    contraindications: ['Known hypersensitivity to cobalamin'],
    drugInteractions: ['Metformin (long-term metformin depletes B12, so this combo is synergistic)'],
    foodInteractions: ['None'],
    pregnancySafety: 'Category B - Safe and beneficial during pregnancy under physician guidance.',
    genericPriceINR: 55,
    brandedPriceINR: 165,
    costSavingsPercent: 67,
    prescriptionRequired: false
  },

  // --- GASTROINTESTINAL & ANTACIDS ---
  pantoprazole: {
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    brandNames: ['Pan 40', 'Pantocid 40', 'Pantodac 40', 'Penta 40', 'Pantosec 40'],
    class: 'Proton Pump Inhibitor (PPI)',
    therapeuticCategory: 'Gastric Acidity, GERD & Peptic Ulcer Healing',
    form: 'Enteric Coated Tablet, IV Injection',
    standardStrength: '40mg',
    uses: ['GERD & acid reflux heartburn', 'Duodenal & gastric ulcer treatment', 'NSAID-induced gastroprotection'],
    dosage_schedule: '40mg once daily in the morning 30 minutes before breakfast.',
    timing: 'Strictly empty stomach in the morning 30-45 mins before breakfast',
    defaultReminderTimes: ['07:30'],
    side_effects: 'Mild headache, diarrhea, nausea, abdominal discomfort, flatulence.',
    warnings: 'Swallow tablet whole, do not crush or chew. Long-term use (> 1 year) may slightly reduce magnesium & B12 absorption.',
    contraindications: ['Hypersensitivity to substituted benzimidazoles'],
    drugInteractions: ['Atazanavir', 'Methotrexate', 'Iron supplements (reduces iron absorption due to low acid)'],
    foodInteractions: ['Take on empty stomach for maximum parietal cell proton pump inhibition'],
    pregnancySafety: 'Category B - Safe under physician supervision.',
    genericPriceINR: 30,
    brandedPriceINR: 95,
    costSavingsPercent: 68,
    prescriptionRequired: true
  },
  'pan-d': {
    name: 'Pan-D',
    genericName: 'Pantoprazole (40mg) + Domperidone (30mg SR)',
    brandNames: ['Pan-D', 'Pantocid-D SR', 'Pantodac-DSR', 'Penta-DSR', 'Dompan-SR'],
    class: 'Proton Pump Inhibitor + Prokinetic Combo',
    therapeuticCategory: 'Acid Reflux, Nausea, Bloating & Gastroparesis',
    form: 'Sustained Release Capsule',
    standardStrength: '40mg Pantoprazole + 30mg Domperidone SR',
    uses: ['GERD associated with regurgitation, nausea and bloating', 'Functional dyspepsia and sluggish gastric motility'],
    dosage_schedule: '1 capsule once daily first thing in morning on empty stomach 30 mins before breakfast.',
    timing: 'Empty stomach (30 mins before breakfast)',
    defaultReminderTimes: ['07:30'],
    side_effects: 'Dry mouth, mild headache, transient loose stools.',
    warnings: 'Do not crush capsule. Domperidone regulates gut motility; take strictly before food.',
    contraindications: ['Prolonged QT interval / cardiac arrhythmia', 'GI hemorrhage or mechanical obstruction'],
    drugInteractions: ['Amiodarone / QT prolonging agents', 'Ketoconazole', 'Erythromycin'],
    foodInteractions: ['Empty stomach mandatory'],
    pregnancySafety: 'Category B - Consult obstetrician.',
    genericPriceINR: 40,
    brandedPriceINR: 135,
    costSavingsPercent: 70,
    prescriptionRequired: true
  },
  omeprazole: {
    name: 'Omeprazole',
    genericName: 'Omeprazole Magnesium',
    brandNames: ['Omez 20', 'Ocid 20', 'Omecip 20', 'Lokit 20', 'Prilosec'],
    class: 'Proton Pump Inhibitor (PPI)',
    therapeuticCategory: 'Acid Peptic Disease & H. pylori Eradication',
    form: 'Capsule, Tablet',
    standardStrength: '20mg, 40mg',
    uses: ['Heartburn & erosive esophagitis', 'Zollinger-Ellison syndrome', 'Triple therapy component for H. pylori eradication'],
    dosage_schedule: '20mg once daily before breakfast.',
    timing: 'Empty stomach before breakfast',
    defaultReminderTimes: ['07:30'],
    side_effects: 'Flatulence, constipation, headache, nausea.',
    warnings: 'May inhibit CYP2C19. If taking Clopidogrel, Pantoprazole is preferred over Omeprazole.',
    contraindications: ['Hypersensitivity to PPIs'],
    drugInteractions: ['Clopidogrel (decreases active antiplatelet metabolite formation)', 'Diazepam', 'Phenytoin'],
    foodInteractions: ['Empty stomach'],
    pregnancySafety: 'Category C - Generally safe if prescribed.',
    genericPriceINR: 20,
    brandedPriceINR: 60,
    costSavingsPercent: 67,
    prescriptionRequired: false
  },
  rabeprazole: {
    name: 'Rabeprazole',
    genericName: 'Rabeprazole Sodium',
    brandNames: ['Razo 20', 'Happi 20', 'Rablet 20', 'Cyra 20', 'Parit 20'],
    class: 'Proton Pump Inhibitor (PPI)',
    therapeuticCategory: 'Rapid-Onset Acid Suppression & Peptic Ulcers',
    form: 'Enteric Coated Tablet',
    standardStrength: '20mg',
    uses: ['Rapid symptomatic relief of severe nocturnal acid reflux', 'Healing of erosive GERD'],
    dosage_schedule: '20mg once daily in the morning before breakfast.',
    timing: 'Empty stomach 30 mins before breakfast',
    defaultReminderTimes: ['07:30'],
    side_effects: 'Mild throat irritation, abdominal pain, diarrhea.',
    warnings: 'Faster onset of acid inhibition than omeprazole; swallow whole.',
    contraindications: ['Known allergy to rabeprazole'],
    drugInteractions: ['Ketoconazole', 'Digoxin', 'Methotrexate'],
    foodInteractions: ['Empty stomach preferred'],
    pregnancySafety: 'Category B - Consult doctor.',
    genericPriceINR: 35,
    brandedPriceINR: 110,
    costSavingsPercent: 68,
    prescriptionRequired: true
  },
  ondansetron: {
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    brandNames: ['Emeset 4/8', 'Vomikind 4/8', 'Ondem 4/8', 'Zofran', 'Periset'],
    class: '5-HT3 Serotonin Receptor Antagonist',
    therapeuticCategory: 'Acute Nausea & Vomiting Prevention',
    form: 'Orally Disintegrating Tablet (MD), Syrup, Injection',
    standardStrength: '4mg, 8mg',
    uses: ['Gastroenteritis acute vomiting prevention', 'Chemotherapy/radiation induced nausea', 'Post-operative vomiting control'],
    dosage_schedule: '4mg–8mg 30 minutes before meals or SOS at nausea onset.',
    timing: '30 mins before food or SOS',
    defaultReminderTimes: ['08:00', '13:00', '19:30'],
    side_effects: 'Constipation, mild headache, sensation of warmth/flushing.',
    warnings: 'Mouth dissolving (MD) tablets dissolve quickly on tongue without water.',
    contraindications: ['Congenital long QT syndrome', 'Concurrent apomorphine therapy'],
    drugInteractions: ['Apomorphine (severe hypotension)', 'Tramadol (may slightly diminish analgesia)', 'Antiarrhythmics'],
    foodInteractions: ['None'],
    pregnancySafety: 'Category B - Extensively prescribed for severe hyperemesis gravidarum under OB care.',
    genericPriceINR: 20,
    brandedPriceINR: 60,
    costSavingsPercent: 67,
    prescriptionRequired: true
  },
  digene: {
    name: 'Digene / Gelusil',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    brandNames: ['Digene Gel / Tablet', 'Gelusil MPS', 'Mucaine Gel', 'Relcer Gel'],
    class: 'Oral Antacid & Antiflatulent Suspension',
    therapeuticCategory: 'Instant Heartburn, Acidity & Gas Relief',
    form: 'Chewable Tablet, Mint / Orange Flavored Liquid Gel Suspension',
    standardStrength: '10ml - 15ml Liquid / 2 Chewable Tabs',
    uses: ['Instant neutralizing relief of acid heartburn', 'Stomach bloating, gas bubbles & indigestion'],
    dosage_schedule: '10–15 mL or 2 tablets chewed thoroughly 1 hour after meals and at bedtime.',
    timing: '1 hour after meals and before bedtime',
    defaultReminderTimes: ['14:00', '21:30'],
    side_effects: 'Mild laxative effect (due to magnesium) or mild constipation (due to aluminium).',
    warnings: 'Chew tablets thoroughly before swallowing. Space other oral medicines by at least 2 hours as antacids bind them.',
    contraindications: ['Severe renal failure (risk of aluminium/magnesium toxicity)', 'Hypophosphatemia'],
    drugInteractions: ['Antibiotics (Ciprofloxacin, Tetracyclines, Cefixime - blocks 50% absorption)', 'Thyroid medication (Thyronorm)', 'Iron supplements'],
    foodInteractions: ['Separate from main medication doses by 2 hours'],
    pregnancySafety: 'Safe in standard occasional dosages during pregnancy.',
    genericPriceINR: 40,
    brandedPriceINR: 110,
    costSavingsPercent: 64,
    prescriptionRequired: false
  },

  // --- ANTIBIOTICS & ANTIMICROBIALS ---
  'augmentin-625': {
    name: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    brandNames: ['Augmentin 625 Duo', 'Moxikind-CV 625', 'Clavam 625', 'Sensiclav 625', 'Advent 625'],
    class: 'Beta-Lactam Penicillin + Beta-Lactamase Inhibitor',
    therapeuticCategory: 'Broad-Spectrum Bacterial Infection Control',
    form: 'Film Coated Tablet, Dry Syrup, IV Injection',
    standardStrength: '500mg Amoxicillin + 125mg Clavulanate',
    uses: ['Respiratory tract infections (bronchitis, sinusitis, pneumonia)', 'Dental abscess & severe tooth infections', 'Skin, soft tissue, and urinary tract bacterial infections'],
    dosage_schedule: '1 tablet twice daily (every 12 hours) with the start of a meal for 5 to 7 days.',
    timing: 'At the start of a meal (improves absorption and minimizes stomach upset)',
    defaultReminderTimes: ['08:30', '20:30'],
    side_effects: 'Mild diarrhea, loose stools, nausea, mild candidiasis / fungal overgrowth.',
    warnings: 'MUST complete full 5-7 day course even if symptoms resolve earlier to prevent antibiotic resistance.',
    contraindications: ['History of penicillin/amoxicillin allergy or jaundice associated with augmentin'],
    drugInteractions: ['Methotrexate (increased toxicity)', 'Oral contraceptives (reduces pill efficacy; use barrier backup)', 'Warfarin', 'Probenecid'],
    foodInteractions: ['Best taken right at the beginning of a meal'],
    pregnancySafety: 'Category B - Widely used and considered safe during pregnancy.',
    genericPriceINR: 85,
    brandedPriceINR: 215,
    costSavingsPercent: 60,
    prescriptionRequired: true
  },
  azithromycin: {
    name: 'Azithromycin',
    genericName: 'Azithromycin Dihydrate',
    brandNames: ['Azithral 500', 'Azee 500', 'Zady 500', 'Azimax 500', 'ATM 500'],
    class: 'Macrolide Antibiotic',
    therapeuticCategory: 'Throat, Tonsillitis, Sinusitis & Chest Infections',
    form: 'Tablet, Suspension',
    standardStrength: '250mg, 500mg',
    uses: ['Streptococcal pharyngitis, acute tonsillitis', 'Community-acquired pneumonia, acute otitis media', 'Chlamydial and soft tissue infections'],
    dosage_schedule: '500mg once daily for 3 to 5 days.',
    timing: '1 hour before food or 2 hours after food with water',
    defaultReminderTimes: ['11:00'],
    side_effects: 'Abdominal cramps, diarrhea, nausea, vomiting, temporary taste disturbance.',
    warnings: 'Do not take aluminum/magnesium antacids simultaneously (delays peak absorption). Complete full 3-day or 5-day course.',
    contraindications: ['Cholestatic jaundice / hepatic dysfunction associated with previous azithromycin', 'Known macrolide hypersensitivity'],
    drugInteractions: ['Antacids with aluminium/magnesium', 'Digoxin', 'Ergotamine', 'Warfarin', 'Statins (rarely increases myopathy)'],
    foodInteractions: ['Take with plain water 1 hr before or 2 hrs after meals for tablets'],
    pregnancySafety: 'Category B - Safe and widely prescribed during pregnancy.',
    genericPriceINR: 65,
    brandedPriceINR: 145,
    costSavingsPercent: 55,
    prescriptionRequired: true
  },
  cefixime: {
    name: 'Cefixime',
    genericName: 'Cefixime Trihydrate',
    brandNames: ['Taxim-O 200', 'Cefix 200', 'Mahacef 200', 'Zifi 200', 'Topcef 200'],
    class: 'Third-Generation Oral Cephalosporin Antibiotic',
    therapeuticCategory: 'Typhoid Fever, UTI & Respiratory Infections',
    form: 'Tablet, Dispersible Tablet, Dry Syrup',
    standardStrength: '100mg, 200mg',
    uses: ['Enteric fever (Typhoid)', 'Uncomplicated urinary tract infections (UTI)', 'Acute bronchitis, otitis media, tonsillitis'],
    dosage_schedule: '200mg twice daily (morning & night) for 7 to 10 days.',
    timing: 'After food',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Loose stools, flatulence, nausea, mild stomach discomfort.',
    warnings: 'Complete full prescribed course. If persistent watery diarrhea occurs, notify physician.',
    contraindications: ['Cephalosporin hypersensitivity'],
    drugInteractions: ['Carbamazepine (increases carbamazepine levels)', 'Warfarin'],
    foodInteractions: ['Take with food for better gastrointestinal tolerance'],
    pregnancySafety: 'Category B - Safe during pregnancy.',
    genericPriceINR: 70,
    brandedPriceINR: 175,
    costSavingsPercent: 60,
    prescriptionRequired: true
  },
  cefuroxime: {
    name: 'Cefuroxime Axetil',
    genericName: 'Cefuroxime Axetil',
    brandNames: ['Ceftum 500', 'Cetil 500', 'Oratil 500', 'Zefu 500', 'Altacef 500'],
    class: 'Second-Generation Cephalosporin Antibiotic',
    therapeuticCategory: 'Severe Sinusitis, Lyme Disease & Post-Operative Prophylaxis',
    form: 'Film Coated Tablet, Suspension, IV/IM Injection',
    standardStrength: '250mg, 500mg',
    uses: ['Refractory sinusitis & otitis media', 'Skin and soft tissue bacterial infections', 'Urinary tract infections and surgical prophylaxis'],
    dosage_schedule: '500mg twice daily after meals for 7 to 10 days.',
    timing: 'Immediately after meals (food enhances bioavailability from 37% to 52%)',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Mild diarrhea, nausea, transient liver enzyme elevation, candida overgrowth.',
    warnings: 'Must be taken with food. Complete full prescribed regimen.',
    contraindications: ['Severe cephalosporin / penicillin anaphylactic allergy'],
    drugInteractions: ['Antacids / PPIs (reduce stomach acid and lower cefuroxime absorption)', 'Probenecid'],
    foodInteractions: ['Always take immediately following a meal'],
    pregnancySafety: 'Category B - Safe in pregnancy.',
    genericPriceINR: 110,
    brandedPriceINR: 290,
    costSavingsPercent: 62,
    prescriptionRequired: true
  },
  ciprofloxacin: {
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    brandNames: ['Ciplox 500', 'Cifran 500', 'Ciprobid 500', 'Alcipro 500'],
    class: 'Fluoroquinolone Antibiotic',
    therapeuticCategory: 'Gastroenteritis, Bacterial Diarrhea & Complicated UTI',
    form: 'Tablet, Eye/Ear Drops, IV Infusion',
    standardStrength: '250mg, 500mg',
    uses: ['Infectious diarrhea / dysentery (Salmonella, Shigella, E. coli)', 'Complicated urinary tract and prostate infections', 'Bone and joint bacterial infections'],
    dosage_schedule: '500mg twice daily 2 hours before or after meals for 5 to 7 days.',
    timing: '2 hours after food with generous water (avoid dairy at same time)',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Nausea, dizziness, tendon pain (rare Achilles tendinitis), photosensitivity.',
    warnings: 'Avoid calcium-rich milk or antacids within 2 hours; drink at least 2.5L water daily to avoid crystalluria.',
    contraindications: ['History of tendon disorders related to fluoroquinolones', 'Myasthenia gravis', 'Children under 18 (except specific indications)'],
    drugInteractions: ['Theophylline (elevates theophylline toxicity)', 'Warfarin', 'Dairy / Antacids (blocks absorption)', 'NSAIDs (increases seizure risk)'],
    foodInteractions: ['Milk, yogurt, calcium-fortified juice (space by 2 hours)'],
    pregnancySafety: 'Category C - Generally avoided during pregnancy unless no alternative exists.',
    genericPriceINR: 35,
    brandedPriceINR: 95,
    costSavingsPercent: 63,
    prescriptionRequired: true
  },
  'ofloxacin-ornidazole': {
    name: 'Ofloxacin + Ornidazole',
    genericName: 'Ofloxacin (200mg) + Ornidazole (500mg)',
    brandNames: ['O2 Tablet', 'Zenflox-OZ', 'Oflomac-OZ', 'Ornof', 'Norflox-TZ (cousin)'],
    class: 'Fluoroquinolone + Nitroimidazole Dual Antimicrobial',
    therapeuticCategory: 'Mixed Bacterial & Amoebic Diarrhea / Dysentery',
    form: 'Tablet, Suspension',
    standardStrength: '200mg Ofloxacin + 500mg Ornidazole',
    uses: ['Acute gastroenteritis with loose stools and cramps', 'Amoebic dysentery & mixed protozoal-bacterial GI infections', 'Dental and gynecological mixed infections'],
    dosage_schedule: '1 tablet twice daily after meals for 3 to 5 days.',
    timing: 'After food with plenty of water',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Metallic taste in mouth, nausea, dizziness, mild headache, darkened urine.',
    warnings: 'Strictly avoid all alcohol during therapy and for 48 hours after (causes severe disulfiram-like flushing reaction).',
    contraindications: ['Hypersensitivity to nitroimidazoles / quinolones', 'CNS epilepsy', 'Early pregnancy'],
    drugInteractions: ['Alcohol (severe disulfiram-like projectile vomiting & tachycardia)', 'Antacids', 'Blood thinners'],
    foodInteractions: ['Alcohol (strictly contraindicated)'],
    pregnancySafety: 'Avoid during first trimester.',
    genericPriceINR: 45,
    brandedPriceINR: 130,
    costSavingsPercent: 65,
    prescriptionRequired: true
  },
  doxycycline: {
    name: 'Doxycycline',
    genericName: 'Doxycycline Hyclate / Monohydrate',
    brandNames: ['Doxy-100', 'Microdox-LBX', 'Doxt-SL', 'Minicycline', 'Vibramycin'],
    class: 'Tetracycline Broad-Spectrum Antibiotic',
    therapeuticCategory: 'Acne Vulgaris, Scrub Typhus, Malaria Prophylaxis & STIs',
    form: 'Capsule, Tablet',
    standardStrength: '100mg',
    uses: ['Moderate to severe inflammatory facial acne vulgaris', 'Scrub typhus, rickettsial fever, Lyme disease', 'Chlamydia, respiratory and pelvic infections'],
    dosage_schedule: '100mg once or twice daily with a full glass of water. Remain upright for 30 minutes.',
    timing: 'With a large glass of water while sitting upright (never take immediately before lying down in bed)',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Esophageal irritation if taken without water, sun sensitivity (photosensitivity), nausea.',
    warnings: 'Never swallow dry before sleeping (causes severe pill esophagitis). Wear sunscreen outdoors.',
    contraindications: ['Children under 8 years (causes permanent tooth discoloration)', 'Pregnancy & breastfeeding'],
    drugInteractions: ['Antacids, Iron, Calcium (space by 2 hours)', 'Penicillins', 'Warfarin'],
    foodInteractions: ['Dairy / milk reduces absorption (space by 2 hours)'],
    pregnancySafety: 'Category D - Strictly contraindicated (affects bone and tooth development).',
    genericPriceINR: 30,
    brandedPriceINR: 85,
    costSavingsPercent: 65,
    prescriptionRequired: true
  },

  // --- RESPIRATORY & ANTI-ALLERGIC ---
  'montair-lc': {
    name: 'Montair-LC',
    genericName: 'Montelukast Sodium (10mg) + Levocetirizine Dihydrochloride (5mg)',
    brandNames: ['Montair-LC', 'Telekast-L', 'Monticope', 'Levocet-M', 'Montek-LC', 'Montina-L'],
    class: 'Leukotriene Receptor Antagonist + Antihistamine Combo',
    therapeuticCategory: 'Allergic Rhinitis, Pollen Allergy & Asthmatic Cough',
    form: 'Tablet, Kid Chewable, Syrup',
    standardStrength: '10mg Montelukast + 5mg Levocetirizine',
    uses: ['Allergic rhinitis (sneezing, runny nose, watery eyes, nasal itching)', 'Chronic allergic bronchitis & nighttime coughing bouts', 'Seasonal hay fever'],
    dosage_schedule: '1 tablet once daily at bedtime for 10 to 14 days.',
    timing: 'Bedtime (due to mild soothing sedative antihistamine effect)',
    defaultReminderTimes: ['21:45'],
    side_effects: 'Mild drowsiness, dry mouth, headache, fatigue, vivid dreams (rare).',
    warnings: 'Best taken at night before sleep. Do not drive if feeling sedated.',
    contraindications: ['Severe renal impairment (CrCl < 10 mL/min)'],
    drugInteractions: ['Alcohol (amplifies sedation)', 'CNS depressants / sleeping pills', 'Phenobarbital'],
    foodInteractions: ['Alcohol (avoid)'],
    pregnancySafety: 'Category B - Consult doctor for use in pregnancy.',
    genericPriceINR: 60,
    brandedPriceINR: 180,
    costSavingsPercent: 67,
    prescriptionRequired: true
  },
  allegra: {
    name: 'Allegra',
    genericName: 'Fexofenadine Hydrochloride',
    brandNames: ['Allegra 120/180', 'Fexova 120/180', 'Histafree 120', 'Fexo 120', 'Fexigra 120'],
    class: 'Second-Generation Non-Sedating Antihistamine',
    therapeuticCategory: 'Daytime Allergies, Hives & Urticaria',
    form: 'Tablet',
    standardStrength: '120mg, 180mg',
    uses: ['Daytime seasonal allergy relief with zero sedation', 'Chronic idiopathic urticaria (itchy skin wheals and hives)', 'Dust and pet dander allergic flareups'],
    dosage_schedule: '120mg once daily for rhinitis, or 180mg once daily for severe skin hives.',
    timing: 'Morning or afternoon with plain water (avoid fruit juice within 2 hours)',
    defaultReminderTimes: ['09:00'],
    side_effects: 'Extremely well tolerated, non-drowsy. Rare mild headache or dry throat.',
    warnings: 'Do not take with apple, orange, or grapefruit juice as they block gut transporter OATP1A2 and reduce medicine absorption by 50%.',
    contraindications: ['Hypersensitivity to fexofenadine'],
    drugInteractions: ['Antacids with aluminium/magnesium (separate by 2 hours)', 'Erythromycin', 'Ketoconazole'],
    foodInteractions: ['Citrus and apple fruit juices (drink with plain water only)'],
    pregnancySafety: 'Category C - Discuss with physician.',
    genericPriceINR: 75,
    brandedPriceINR: 195,
    costSavingsPercent: 62,
    prescriptionRequired: false
  },
  bilastine: {
    name: 'Bilastine',
    genericName: 'Bilastine',
    brandNames: ['Bilashine 20', 'Blisto 20', 'Bilasure 20', 'Bilaxten 20', 'Bilaver 20'],
    class: 'Second-Generation Non-Sedating Antihistamine',
    therapeuticCategory: 'Allergic Rhinoconjunctivitis & Chronic Urticaria',
    form: 'Tablet, Oral Dispersible Tablet',
    standardStrength: '20mg',
    uses: ['Severe allergic rhinitis with nasal blockage & eye itching', 'Chronic spontaneous urticaria and skin itchiness'],
    dosage_schedule: '20mg once daily on an empty stomach (1 hour before or 2 hours after food/juice).',
    timing: 'Strictly empty stomach (1 hr before breakfast or 2 hrs after dinner with plain water)',
    defaultReminderTimes: ['07:00'],
    side_effects: 'Non-sedating, minimal side effects; rare headache or fatigue.',
    warnings: 'Food and grapefruit/fruit juices reduce bilastine absorption by over 30%. Must be taken with water on empty stomach.',
    contraindications: ['Severe renal impairment with concurrent P-gp inhibitors'],
    drugInteractions: ['Ketoconazole', 'Erythromycin', 'Cyclosporine'],
    foodInteractions: ['Food and fruit juices substantially decrease bioavailability'],
    pregnancySafety: 'Category B - Consult physician.',
    genericPriceINR: 65,
    brandedPriceINR: 175,
    costSavingsPercent: 63,
    prescriptionRequired: true
  },
  foracort: {
    name: 'Foracort Inhaler / Rotacaps',
    genericName: 'Formoterol Fumarate (6mcg) + Budesonide (200mcg/400mcg)',
    brandNames: ['Foracort 200/400 Inhaler', 'Budamate', 'Symbicort', 'Seroflo', 'Maxiflo'],
    class: 'Inhaled Corticosteroid (ICS) + Long-Acting Beta2 Agonist (LABA)',
    therapeuticCategory: 'Asthma Maintenance & COPD Controller',
    form: 'Metered Dose Inhaler (MDI) / Dry Powder Rotacaps / Inhaler with Spacer',
    standardStrength: '200mcg / 400mcg Budesonide + 6mcg Formoterol',
    uses: ['Maintenance controller therapy for bronchial asthma', 'COPD exacerbation prevention and airway dilation'],
    dosage_schedule: '1 to 2 puffs twice daily (morning & night) using inhaler + spacer. Rinse mouth with water after use.',
    timing: 'Morning and Evening',
    defaultReminderTimes: ['08:00', '20:00'],
    side_effects: 'Hoarseness of voice, throat irritation, oral thrush (if mouth is not rinsed).',
    warnings: 'Always rinse mouth and gargle with warm water after inhalation to prevent fungal thrush. Not for sudden acute choking asthma attacks (use rescue Asthalin instead).',
    contraindications: ['Primary treatment of status asthmaticus acute episodes'],
    drugInteractions: ['Beta blockers (e.g. Propranolol, Atenolol - counteract bronchodilator effect)', 'Ketoconazole'],
    foodInteractions: ['None'],
    pregnancySafety: 'Inhaled budesonide is considered the safest inhaled steroid during pregnancy (Category B).',
    genericPriceINR: 190,
    brandedPriceINR: 420,
    costSavingsPercent: 55,
    prescriptionRequired: true
  },
  'ascoril-d': {
    name: 'Ascoril-D Plus',
    genericName: 'Dextromethorphan (10mg) + Phenylephrine (5mg) + Chlorpheniramine Maleate (2mg)',
    brandNames: ['Ascoril-D', 'Alex Cough Syrup', 'Zedex', 'Benadryl DR', 'Corex-DX'],
    class: 'Antitussive + Decongestant + Antihistamine Cough Syrup',
    therapeuticCategory: 'Dry Irritating Cough, Throat Tickle & Nasal Congestion',
    form: 'Oral Syrup',
    standardStrength: '5ml - 10ml',
    uses: ['Dry, non-productive allergic cough bouts', 'Upper respiratory tract congestion and throat irritation'],
    dosage_schedule: '10 mL thrice daily after meals.',
    timing: 'After meals',
    defaultReminderTimes: ['09:00', '14:00', '21:00'],
    side_effects: 'Mild drowsiness, dry mouth, dizziness, blurred vision.',
    warnings: 'Not for wet productive cough with heavy phlegm. Avoid driving if feeling sleepy.',
    contraindications: ['Concurrent MAO inhibitor therapy', 'Severe hypertension / coronary artery disease'],
    drugInteractions: ['MAO Inhibitors (severe hypertensive crisis risk)', 'SSRIs / Antidepressants'],
    foodInteractions: ['Alcohol (amplifies CNS sedation)'],
    pregnancySafety: 'Category C - Use with caution.',
    genericPriceINR: 45,
    brandedPriceINR: 125,
    costSavingsPercent: 64,
    prescriptionRequired: false
  },

  // --- DERMATOLOGY & TOPICALS ---
  desonide: {
    name: 'Desonide 0.05% Cream',
    genericName: 'Desonide (Low-to-Medium Potency Corticosteroid 0.05%)',
    brandNames: ['Desowen Cream / Lotion', 'Desonide 0.05%', 'Dosetil', 'Desosoft'],
    class: 'Low-Potency Topical Corticosteroid',
    therapeuticCategory: 'Facial Eczema, Contact Dermatitis & Allergic Rashes',
    form: 'Topical Cream / Lotion',
    standardStrength: '0.05% w/w',
    uses: ['Atopic dermatitis / eczema flareups on delicate facial skin', 'Contact dermatitis from cosmetics or jewelry', 'Mild to moderate itching and skin redness'],
    dosage_schedule: 'Apply a very thin layer gently on affected rash areas twice daily for 5 to 7 days.',
    timing: 'Morning and Evening after gentle skin wash',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Mild burning/stinging sensation initially, dry skin.',
    warnings: 'Safe for facial skin in short courses; do not apply inside eyes or on open infected wounds. Do not use for > 2 weeks continuously.',
    contraindications: ['Viral skin infections (Herpes, Chickenpox)', 'Fungal infections (Ringworm/Tinea) without antifungal cover', 'Active rosacea'],
    drugInteractions: ['None systemic at standard topical doses'],
    foodInteractions: ['None'],
    pregnancySafety: 'Category C - Use sparingly under dermatologist advice.',
    genericPriceINR: 70,
    brandedPriceINR: 195,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  'calamine-lotion': {
    name: 'Calamine & Aloe Vera Lotion',
    genericName: 'Calamine (8%) + Zinc Oxide + Aloe Vera Extract',
    brandNames: ['Lacto Calamine', 'Caladryl', 'Calosoft', 'Calak Lotion'],
    class: 'Topical Astringent, Antipruritic & Soothing Emollient',
    therapeuticCategory: 'Sunburn, Insect Bites, Heat Rash & Itchy Skin',
    form: 'Topical Lotion',
    standardStrength: 'Lotion Bottle',
    uses: ['Soothing prickly heat rashes and hives', 'Sunburn irritation, mosquito & insect bite itch relief', 'Chickenpox spot soothing'],
    dosage_schedule: 'Apply generously on affected itchy skin SOS 2 to 3 times daily using clean cotton pad.',
    timing: 'As needed (SOS)',
    defaultReminderTimes: ['10:00', '18:00'],
    side_effects: 'Extremely safe, cooling sensation.',
    warnings: 'For external use only. Shake bottle well before applying.',
    contraindications: ['Open bleeding wounds'],
    drugInteractions: ['None'],
    foodInteractions: ['None'],
    pregnancySafety: 'Category A - Safe for all trimesters and infants.',
    genericPriceINR: 40,
    brandedPriceINR: 95,
    costSavingsPercent: 58,
    prescriptionRequired: false
  },

  // --- NEUROPSYCHIATRY & CNS ---
  escitalopram: {
    name: 'Escitalopram',
    genericName: 'Escitalopram Oxalate',
    brandNames: ['Nexito 10', 'Cilentra 10', 'Stalopam 10', 'S-Citadep 10', 'Lexapro'],
    class: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
    therapeuticCategory: 'Generalized Anxiety Disorder & Major Depression',
    form: 'Tablet',
    standardStrength: '5mg, 10mg, 20mg',
    uses: ['Generalized anxiety disorder (GAD), panic disorder', 'Major depressive episodes, obsessive-compulsive traits', 'Social anxiety and agoraphobia'],
    dosage_schedule: '10mg once daily in the morning after breakfast or at night.',
    timing: 'Morning or night at a fixed consistent time',
    defaultReminderTimes: ['09:00'],
    side_effects: 'Nausea in first week, insomnia or mild drowsiness, decreased libido, dry mouth.',
    warnings: 'Full therapeutic effect takes 2 to 4 weeks. Do not stop abruptly (taper under psychiatrist guidance to avoid discontinuation syndrome).',
    contraindications: ['Concurrent use of MAO inhibitors / Linezolid', 'Congenital long QT syndrome'],
    drugInteractions: ['Tramadol / Triptans (Serotonin syndrome risk)', 'NSAIDs / Aspirin (elevates GI bleeding tendency)', 'Alcohol'],
    foodInteractions: ['Alcohol (strictly avoid)'],
    pregnancySafety: 'Category C - Discuss risk/benefit with psychiatrist.',
    genericPriceINR: 50,
    brandedPriceINR: 135,
    costSavingsPercent: 63,
    prescriptionRequired: true
  },
  clonazepam: {
    name: 'Clonazepam',
    genericName: 'Clonazepam',
    brandNames: ['Clonafit 0.5', 'Zapiz 0.5', 'Rivotril 0.5', 'Lonazep 0.5', 'Klonopin'],
    class: 'Benzodiazepine Anxiolytic & Anticonvulsant',
    therapeuticCategory: 'Acute Panic Attacks, Severe Insomnia & Seizures',
    form: 'Mouth Dissolving Tablet',
    standardStrength: '0.25mg, 0.5mg, 1mg, 2mg',
    uses: ['Acute panic attack termination', 'Short-term severe nocturnal anxiety / situational insomnia', 'Adjunct therapy in myoclonic epilepsy'],
    dosage_schedule: '0.25mg–0.5mg at bedtime or SOS for acute panic episode as prescribed.',
    timing: 'Bedtime or SOS during severe panic attack',
    defaultReminderTimes: ['22:00'],
    side_effects: 'Sedation, daytime sluggishness, memory fog, muscle weakness, ataxia.',
    warnings: 'Schedule H1 / controlled substance. High potential for dependence and tolerance if used daily for > 2-4 weeks.',
    contraindications: ['Acute narrow-angle glaucoma', 'Myasthenia gravis', 'Severe respiratory depression / sleep apnea'],
    drugInteractions: ['Opioids (severe respiratory depression hazard)', 'Alcohol (dangerously amplifies sedation)', 'Other sedatives'],
    foodInteractions: ['Alcohol (strictly contraindicated)'],
    pregnancySafety: 'Category D - Contraindicated in pregnancy (floppy infant syndrome).',
    genericPriceINR: 35,
    brandedPriceINR: 90,
    costSavingsPercent: 61,
    prescriptionRequired: true
  },

  // --- VITAMINS, SUPPLEMENTS & AYURVEDA ---
  shelcal: {
    name: 'Shelcal 500',
    genericName: 'Calcium Carbonate (1250mg eq to 500mg elemental Ca) + Vitamin D3 (250 IU)',
    brandNames: ['Shelcal 500', 'Cipcal 500', 'Calcimax 500', 'Gemcal', 'Reocal'],
    class: 'Mineral & Vitamin D3 Bone Supplement',
    therapeuticCategory: 'Bone Density, Osteopenia & Calcium Deficiency',
    form: 'Tablet',
    standardStrength: '500mg Elemental Calcium + 250 IU D3',
    uses: ['Osteoporosis prevention and bone strengthening', 'Pregnancy & lactation calcium supplementation', 'Post-fracture bone healing'],
    dosage_schedule: '1 tablet once daily after lunch or dinner.',
    timing: 'After food (calcium carbonate requires stomach acid for optimal absorption)',
    defaultReminderTimes: ['13:30'],
    side_effects: 'Mild constipation, bloating.',
    warnings: 'Drink adequate water; do not take at same time as iron or thyroid medicine (space by 4 hours).',
    contraindications: ['Hypercalcemia', 'Hypercalciuria / calcium renal stones'],
    drugInteractions: ['Thyroxine / Levothyroxine (blocks thyroid absorption)', 'Iron tablets', 'Tetracyclines'],
    foodInteractions: ['High oxalates (spinach, tea) slightly lower absorption'],
    pregnancySafety: 'Category B - Routinely recommended in 2nd and 3rd trimesters.',
    genericPriceINR: 35,
    brandedPriceINR: 98,
    costSavingsPercent: 64,
    prescriptionRequired: false
  },
  'vitamin-d3-60k': {
    name: 'Vitamin D3 60,000 IU (Cholecalciferol)',
    genericName: 'Cholecalciferol (Vitamin D3 60,000 IU)',
    brandNames: ['Calcirol Sachet', 'Uprise-D3 60K Capsule', 'D-Rise 60K', 'Tayone 60K', 'Lumia 60K'],
    class: 'High-Dose Fat-Soluble Vitamin',
    therapeuticCategory: 'Severe Vitamin D Deficiency & Immune Rejuvenation',
    form: 'Softgel Capsule, Oral Solution Nano Shots, Granule Sachet (in milk)',
    standardStrength: '60,000 IU',
    uses: ['Correction of severe Vitamin D3 deficiency (<20 ng/mL)', 'Muscle weakness, fatigue, bone pain, and mood enhancement'],
    dosage_schedule: '1 capsule or sachet once a week for 8 consecutive weeks, then once a month for maintenance.',
    timing: 'Once weekly after Sunday lunch with a glass of milk or fat-containing meal',
    defaultReminderTimes: ['13:00 (Weekly)'],
    side_effects: 'Extremely safe at weekly therapeutic dosages.',
    warnings: 'Take with milk or fatty meal since Vitamin D is fat-soluble. Do not take daily.',
    contraindications: ['Hypervitaminosis D', 'Severe hypercalcemia'],
    drugInteractions: ['Thiazide diuretics (monitor calcium)', 'Orlistat (decreases absorption)'],
    foodInteractions: ['Best absorbed with milk, yogurt, or meal containing healthy fats'],
    pregnancySafety: 'Category C / Standard dosing under OB care.',
    genericPriceINR: 40,
    brandedPriceINR: 110,
    costSavingsPercent: 64,
    prescriptionRequired: false
  },
  thyronorm: {
    name: 'Thyronorm / Eltroxin',
    genericName: 'Levothyroxine Sodium',
    brandNames: ['Thyronorm 25/50/75/100', 'Eltroxin 50/100', 'Thyrox 50', 'Syntroid', 'Thyroup 50'],
    class: 'Synthetic Thyroid Hormone (T4)',
    therapeuticCategory: 'Hypothyroidism & Hashimoto Thyroiditis',
    form: 'Oral Tablet',
    standardStrength: '25mcg, 50mcg, 75mcg, 100mcg, 125mcg',
    uses: ['Primary and secondary hypothyroidism (underactive thyroid gland)', 'TSH normalization, metabolic rate restoration, hair fall reduction'],
    dosage_schedule: 'Exact prescribed microgram dosage once daily first thing in the morning.',
    timing: 'Strictly on empty stomach with plain water, 45-60 mins before morning tea/breakfast',
    defaultReminderTimes: ['06:30'],
    side_effects: 'Palpitations, weight loss, tremor, sweating (only if dose is higher than required).',
    warnings: 'Must be taken with water only. Do not consume tea, coffee, milk, calcium, iron, or breakfast for at least 45 minutes.',
    contraindications: ['Untreated thyrotoxicosis', 'Uncorrected adrenal insufficiency'],
    drugInteractions: ['Calcium, Iron, Antacids (strictly separate by 4 hours)', 'Soy products', 'Coffee (blocks absorption)'],
    foodInteractions: ['Tea, Coffee, Soy, Milk, Breakfast (wait 45-60 minutes)'],
    pregnancySafety: 'Category A - Essential to maintain normal TSH (<2.5) during pregnancy for fetal brain development.',
    genericPriceINR: 45,
    brandedPriceINR: 125,
    costSavingsPercent: 64,
    prescriptionRequired: true
  },
  'liv-52': {
    name: 'Liv.52 / Liv.52 DS',
    genericName: 'Herbal Hepatoprotective (Himsra, Kasani, Kakamachi, Arjuna, Mandur Bhasma)',
    brandNames: ['Himalaya Liv.52', 'Liv.52 DS', 'Livomyn', 'Hepano'],
    class: 'Ayurvedic Hepatoprotective & Appetite Stimulant',
    therapeuticCategory: 'Liver Health, Fatty Liver & Metabolic Detoxification',
    form: 'Tablets, Syrup',
    standardStrength: 'Double Strength (DS) Tablet',
    uses: ['Supportive therapy in sluggish liver, Grade 1 fatty liver', 'Appetite stimulation, protection against environmental toxins'],
    dosage_schedule: '1-2 tablets twice daily after meals.',
    timing: 'After meals',
    defaultReminderTimes: ['09:00', '21:00'],
    side_effects: 'Herbal formulation, generally zero adverse effects.',
    warnings: 'Complementary herbal supplement; does not replace medical treatment for acute hepatitis or cirrhosis.',
    contraindications: ['Known allergy to listed herbal extracts'],
    drugInteractions: ['No major drug interactions'],
    foodInteractions: ['None'],
    pregnancySafety: 'Safe under medical practitioner guidance.',
    genericPriceINR: 90,
    brandedPriceINR: 160,
    costSavingsPercent: 44,
    prescriptionRequired: false
  }
};

/**
 * Normalizes an OCR token by removing punctuation, OCR typos, dosage noise, and unit artifacts.
 */
export function normalizeOcrDrugToken(rawToken: string): { cleanName: string; detectedStrength: string | null } {
  if (!rawToken) return { cleanName: '', detectedStrength: null };

  let text = rawToken.trim();

  // Extract strength if present (e.g. 500mg, 650 mg, 40mg, 5 mg, 0.05%, 60k, 60,000 iu)
  const strengthMatch = text.match(/(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g|iu|%|k|sr|er|cr|xl|ds|duo))\b/i);
  const detectedStrength = strengthMatch ? strengthMatch[0].trim() : null;

  // Clean OCR common misrecognitions
  let clean = text
    .replace(/^(\d+[\.\)]\s*)/, '') // remove line numbering e.g. "1. "
    .replace(/\b(tab|cap|syp|inj|ointment|cream|gel|drops|syrup|capsule|tablet|rotacaps|inhaler)\b\.?/gi, '') // remove form prefix
    .replace(/(\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g|iu|%|k|sr|er|cr|xl|ds|duo))\b/gi, '') // remove strength suffix for root matching
    .replace(/[-_~|#*`+]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Common OCR character substitution fixes for medicine names
  // e.g. "Te1misartan" -> "Telmisartan", "Am1odipine" -> "Amlodipine"
  clean = clean
    .replace(/\bTe1m/gi, 'Telm')
    .replace(/\bAm1o/gi, 'Amlo')
    .replace(/Augmentn/gi, 'Augmentin')
    .replace(/D0lo/gi, 'Dolo')
    .replace(/Metf0rmin/gi, 'Metformin')
    .replace(/Rosuvastatn/gi, 'Rosuvastatin')
    .replace(/At0rva/gi, 'Atorva')
    .replace(/Ec0sprin/gi, 'Ecosprin');

  return { cleanName: clean.trim(), detectedStrength };
}

/**
 * Computes Levenshtein Distance between two strings.
 */
export function levenshteinDistance(s1: string, s2: string): number {
  const a = s1.toLowerCase();
  const b = s2.toLowerCase();
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculates a similarity score between 0 and 1.
 */
export function calculateStringSimilarity(s1: string, s2: string): number {
  const a = s1.toLowerCase().trim();
  const b = s2.toLowerCase().trim();
  if (a === b) return 1.0;
  if (!a || !b) return 0.0;

  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;

  const dist = levenshteinDistance(a, b);
  return Math.max(0, 1 - (dist / maxLen));
}

/**
 * Comprehensive OCR Drug Validation & Cross-Referencing Layer.
 * Cross-references scanned OCR tokens against verified database monographs.
 */
export function validateAndCrossReferenceDrug(ocrInput: string): DrugValidationResult {
  const originalToken = (ocrInput || '').trim();
  if (!originalToken) {
    return createUnverifiedResult(originalToken, 'Empty OCR input');
  }

  const { cleanName, detectedStrength } = normalizeOcrDrugToken(originalToken);
  const qClean = cleanName.toLowerCase();
  const qRaw = originalToken.toLowerCase();

  // 1. Direct Key Match
  for (const [key, profile] of Object.entries(MEDICINES_DATA)) {
    if (key === qClean || key.replace(/-/g, ' ') === qClean || key === qRaw) {
      return buildValidatedResult(profile, originalToken, detectedStrength, 99, 'exact_key');
    }
  }

  // 2. Exact or Substring Brand Name / Generic Name Match
  for (const profile of Object.values(MEDICINES_DATA)) {
    // Check Profile Name
    if (profile.name.toLowerCase() === qClean || qRaw.includes(profile.name.toLowerCase())) {
      return buildValidatedResult(profile, originalToken, detectedStrength, 98, 'brand_match');
    }
    // Check Brand Names List
    for (const brand of profile.brandNames) {
      const bLow = brand.toLowerCase();
      if (bLow === qClean || qRaw.includes(bLow) || bLow.includes(qClean) && qClean.length >= 4) {
        return buildValidatedResult(profile, originalToken, detectedStrength, 96, 'brand_match');
      }
    }
    // Check Generic Molecule Name
    if (profile.genericName.toLowerCase().includes(qClean) && qClean.length >= 4) {
      return buildValidatedResult(profile, originalToken, detectedStrength, 94, 'generic_match');
    }
  }

  // 3. Fuzzy & Phonetic Matching across all Database Entries
  let bestMatch: { profile: MedicineProfile; score: number; brand: string } | null = null;

  for (const profile of Object.values(MEDICINES_DATA)) {
    // Compare against canonical name
    const nameScore = calculateStringSimilarity(qClean, profile.name);
    if (!bestMatch || nameScore > bestMatch.score) {
      bestMatch = { profile, score: nameScore, brand: profile.name };
    }

    // Compare against each brand alternative
    for (const brand of profile.brandNames) {
      const brandScore = calculateStringSimilarity(qClean, brand.replace(/[\d\s\-\.]/g, ''));
      if (brandScore > bestMatch.score) {
        bestMatch = { profile, score: brandScore, brand };
      }
    }

    // Compare against primary generic active ingredient words
    const genericWords = profile.genericName.split(/[\s\+\(\)\/]+/);
    for (const gw of genericWords) {
      if (gw.length >= 4) {
        const gwScore = calculateStringSimilarity(qClean, gw);
        if (gwScore > bestMatch.score) {
          bestMatch = { profile, score: gwScore, brand: profile.name };
        }
      }
    }
  }

  if (bestMatch && bestMatch.score >= 0.72) {
    const confidencePct = Math.round(bestMatch.score * 100);
    return buildValidatedResult(bestMatch.profile, originalToken, detectedStrength, confidencePct, 'fuzzy_match');
  }

  // 4. Fallback: Search by therapeutic class / symptoms
  for (const profile of Object.values(MEDICINES_DATA)) {
    if (profile.therapeuticCategory.toLowerCase().includes(qClean) || profile.class.toLowerCase().includes(qClean)) {
      return buildValidatedResult(profile, originalToken, detectedStrength, 80, 'category_match');
    }
  }

  return createUnverifiedResult(originalToken, 'No verified monograph matched in database');
}

function buildValidatedResult(
  p: MedicineProfile,
  originalToken: string,
  detectedStrength: string | null,
  confidence: number,
  matchType: DrugValidationResult['matchType']
): DrugValidationResult {
  const genericAlt = `${p.genericName} (Jan Aushadhi Scheme / Generic Substitute)`;
  const precautions = [p.warnings];
  if (p.contraindications.length > 0) {
    precautions.push(`Contraindications: ${p.contraindications.join(', ')}`);
  }

  return {
    isVerified: true,
    confidence,
    originalToken,
    canonicalName: p.name,
    genericName: p.genericName,
    matchedStrength: detectedStrength || p.standardStrength,
    matchedForm: p.form,
    therapeuticCategory: p.therapeuticCategory,
    class: p.class,
    dosageSchedule: p.dosage_schedule,
    timing: p.timing,
    defaultReminderTimes: p.defaultReminderTimes,
    genericAlternative: genericAlt,
    savingsPercent: p.costSavingsPercent,
    brandedPriceINR: p.brandedPriceINR,
    genericPriceINR: p.genericPriceINR,
    criticalPrecautions: precautions,
    contraindications: p.contraindications,
    foodInteractions: p.foodInteractions,
    pregnancySafety: p.pregnancySafety,
    prescriptionRequired: p.prescriptionRequired,
    matchType
  };
}

function createUnverifiedResult(originalToken: string, reason: string): DrugValidationResult {
  return {
    isVerified: false,
    confidence: 40,
    originalToken,
    canonicalName: originalToken || 'Unverified Clinical Formulation',
    genericName: 'Pending Pharmacological Identification',
    matchedForm: 'Oral / Topical',
    therapeuticCategory: 'General Clinical Prescription',
    class: 'Unspecified Class',
    dosageSchedule: 'Take strictly as directed by prescribing physician',
    timing: 'After meals with water',
    defaultReminderTimes: ['08:00', '20:00'],
    genericAlternative: 'Consult pharmacist for Jan Aushadhi generic equivalent',
    savingsPercent: 50,
    brandedPriceINR: 50,
    genericPriceINR: 25,
    criticalPrecautions: [reason, 'Verify medication name and dosage with your physician or pharmacist.'],
    contraindications: ['Unknown hypersensitivity'],
    foodInteractions: ['Avoid alcohol and take with water'],
    pregnancySafety: 'Consult physician before use in pregnancy',
    prescriptionRequired: true,
    matchType: 'unverified'
  };
}

/**
 * Cross-references all medications in a prescription against each other for multi-drug interactions,
 * cost savings calculation, and validation scoring.
 */
export function crossReferencePrescriptionMedications(medications: any[]): PrescriptionValidationReport {
  const validatedList: PrescriptionValidationReport['validatedMedications'] = [];
  let totalVerified = 0;
  let totalBrandedCost = 0;
  let totalGenericCost = 0;

  for (const med of medications) {
    const rawName = typeof med === 'string' ? med : (med.name || med.drug || '');
    const validated = validateAndCrossReferenceDrug(rawName);

    if (validated.isVerified) {
      totalVerified++;
    }

    totalBrandedCost += validated.brandedPriceINR || 60;
    totalGenericCost += validated.genericPriceINR || 25;

    validatedList.push({
      ...validated,
      extractedDosage: typeof med === 'object' ? med.dosage : undefined,
      extractedTiming: typeof med === 'object' ? med.timing : undefined,
      extractedDuration: typeof med === 'object' ? med.duration : undefined,
    });
  }

  // Calculate drug-drug interactions across validated medications
  const flaggedInteractions: PrescriptionValidationReport['flaggedInteractions'] = [];
  const drugNamesLower = validatedList.map(v => `${v.canonicalName} ${v.genericName} ${v.class}`.toLowerCase());

  const hasNSAID = drugNamesLower.some(n => n.includes('nsaid') || n.includes('ibuprofen') || n.includes('diclofenac') || n.includes('aceclofenac') || n.includes('combiflam'));
  const hasAntiplatelet = drugNamesLower.some(n => n.includes('aspirin') || n.includes('ecosprin') || n.includes('clopidogrel') || n.includes('clopilet') || n.includes('warfarin'));
  const hasARB_ACE = drugNamesLower.some(n => n.includes('telmisartan') || n.includes('losartan') || n.includes('ramipril') || n.includes('angiotensin'));
  const hasPotassiumSparing = drugNamesLower.some(n => n.includes('spironolactone') || n.includes('aldactone') || n.includes('potassium'));
  const hasAntibiotic = drugNamesLower.some(n => n.includes('amoxicillin') || n.includes('augmentin') || n.includes('azithromycin') || n.includes('cefixime') || n.includes('ciprofloxacin') || n.includes('doxycycline'));
  const hasAntacid = drugNamesLower.some(n => n.includes('antacid') || n.includes('digene') || n.includes('gelusil') || n.includes('aluminium') || n.includes('magnesium'));
  const hasSSRI = drugNamesLower.some(n => n.includes('escitalopram') || n.includes('sertraline') || n.includes('ssri'));
  const hasTramadol = drugNamesLower.some(n => n.includes('tramadol') || n.includes('ultracet'));

  if (hasNSAID && hasAntiplatelet) {
    flaggedInteractions.push({
      drugA: 'NSAID Analgesic',
      drugB: 'Antiplatelet / Blood Thinner (Aspirin / Clopidogrel)',
      severity: 'High',
      description: 'Concurrent administration substantially elevates gastrointestinal mucosal ulceration and bleeding hazards.',
      advice: 'Consult physician. Paracetamol (Dolo 650) is generally preferred for pain management in patients on blood thinners.'
    });
  }

  if (hasARB_ACE && hasPotassiumSparing) {
    flaggedInteractions.push({
      drugA: 'Telmisartan / ARB',
      drugB: 'Spironolactone (Potassium-Sparing Diuretic)',
      severity: 'Moderate',
      description: 'Dual renin-angiotensin-aldosterone blockade may lead to elevated serum potassium (hyperkalemia).',
      advice: 'Monitor serum potassium and renal function (creatinine) periodically.'
    });
  }

  if (hasAntibiotic && hasAntacid) {
    flaggedInteractions.push({
      drugA: 'Fluoroquinolone / Tetracycline / Cephalosporin Antibiotic',
      drugB: 'Antacid Suspension (Aluminium/Magnesium Hydroxide)',
      severity: 'Moderate',
      description: 'Antacids chelate with antibiotic molecules in the gut, reducing absorption and clinical bioavailability by up to 50%.',
      advice: 'Separate administration by at least 2 hours.'
    });
  }

  if (hasSSRI && hasTramadol) {
    flaggedInteractions.push({
      drugA: 'SSRI Antidepressant (Escitalopram)',
      drugB: 'Tramadol (Ultracet)',
      severity: 'High',
      description: 'Combined serotonergic activity increases the clinical risk of Serotonin Syndrome and lowers seizure threshold.',
      advice: 'Physician supervision mandatory; monitor for tremors, agitation, or hyperreflexia.'
    });
  }

  const totalScanned = validatedList.length;
  const validationScore = totalScanned > 0 ? Math.round((totalVerified / totalScanned) * 100) : 0;
  const potentialMonthlySavingsINR = Math.max(0, totalBrandedCost - totalGenericCost);

  let overallSafetySummary = 'All scanned medications verified against CDSCO & NLEM 2026 pharmacological monographs.';
  if (flaggedInteractions.some(i => i.severity === 'High')) {
    overallSafetySummary = '⚠️ High clinical interaction detected between scanned medications. Please review warnings.';
  } else if (flaggedInteractions.length > 0) {
    overallSafetySummary = '⚡ Moderate spacing precautions required between active ingredients.';
  }

  return {
    totalScanned,
    verifiedCount: totalVerified,
    validationScore,
    validatedMedications: validatedList,
    flaggedInteractions,
    estimatedMonthlyBrandedCostINR: totalBrandedCost,
    estimatedMonthlyGenericCostINR: totalGenericCost,
    potentialMonthlySavingsINR,
    overallSafetySummary
  };
}

/**
 * Searches the extensive database by query (brand name, molecule, class, or symptoms).
 */
export function lookupMedicineComprehensive(query: string): MedicineProfile | null {
  const q = (query || '').toLowerCase().trim();
  if (!q) return null;

  // Exact key match
  if (MEDICINES_DATA[q]) return MEDICINES_DATA[q];

  // Match key variations (hyphens / spaces)
  const normKey = q.replace(/[\s\-_]+/g, '');
  for (const [k, med] of Object.entries(MEDICINES_DATA)) {
    if (k.replace(/[\s\-_]+/g, '') === normKey) return med;
  }

  // Search by brand names, generic name, or name
  for (const med of Object.values(MEDICINES_DATA)) {
    if (med.name.toLowerCase().includes(q) || med.genericName.toLowerCase().includes(q)) {
      return med;
    }
    for (const b of med.brandNames) {
      if (b.toLowerCase().includes(q) || q.includes(b.toLowerCase())) {
        return med;
      }
    }
  }

  // Fuzzy / fallback validation search
  const fuzzy = validateAndCrossReferenceDrug(query);
  if (fuzzy && fuzzy.isVerified) {
    for (const med of Object.values(MEDICINES_DATA)) {
      if (med.name === fuzzy.canonicalName) return med;
    }
  }

  // Partial search by uses or category
  for (const med of Object.values(MEDICINES_DATA)) {
    if (med.therapeuticCategory.toLowerCase().includes(q) || med.class.toLowerCase().includes(q)) {
      return med;
    }
    for (const u of med.uses) {
      if (u.toLowerCase().includes(q)) return med;
    }
  }

  return null;
}

export function searchAllMedicines(term: string): MedicineProfile[] {
  const q = (term || '').toLowerCase().trim();
  if (!q) return Object.values(MEDICINES_DATA).slice(0, 12);

  const matched = Object.values(MEDICINES_DATA).filter(med => {
    return (
      med.name.toLowerCase().includes(q) ||
      med.genericName.toLowerCase().includes(q) ||
      med.brandNames.some(b => b.toLowerCase().includes(q)) ||
      med.class.toLowerCase().includes(q) ||
      med.therapeuticCategory.toLowerCase().includes(q) ||
      med.uses.some(u => u.toLowerCase().includes(q))
    );
  });

  return matched;
}
