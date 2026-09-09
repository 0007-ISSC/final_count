export interface JanAushadhiMedicine {
  id: string;
  genericName: string;
  saltComposition: string;
  strength: string;
  dosageForm: string;
  category: string;
  popularBrands: string[];
  brandedAvgPriceINR: number;
  janAushadhiPriceINR: number;
  savingsPercent: number;
  savingsAmountINR: number;
  indications: string;
  cdscoStandards: string;
  pmbjpCode: string;
  inStock: boolean;
  packSize: string;
}

export interface JanAushadhiKendra {
  id: string;
  kendraCode: string;
  name: string;
  operatorName: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  operatingHours: string;
  isOpenNow: boolean;
  wheelchairAccessible: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
  inStockHighlights: string[];
}

export const JAN_AUSHADHI_MEDICINES: JanAushadhiMedicine[] = [
  {
    id: 'ja-pcm-650',
    genericName: 'Paracetamol IP 650mg',
    saltComposition: 'Paracetamol 650 mg',
    strength: '650 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Pain & Fever',
    popularBrands: ['Dolo 650', 'Crocin 650', 'Calpol 650', 'Pacimol 650'],
    brandedAvgPriceINR: 34,
    janAushadhiPriceINR: 8.5,
    savingsPercent: 75,
    savingsAmountINR: 25.5,
    indications: 'High-grade fever, tension headache, body aches, viral fever malaise',
    cdscoStandards: 'IP / CDSCO Bioequivalent · NABL Batch 2026 Tested',
    pmbjpCode: 'PMBJP-00104',
    inStock: true
  },
  {
    id: 'ja-telma-40',
    genericName: 'Telmisartan IP 40mg',
    saltComposition: 'Telmisartan 40 mg',
    strength: '40 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Hypertension & Heart',
    popularBrands: ['Telma 40', 'Telmikind 40', 'Telsartan 40', 'Arbitel 40'],
    brandedAvgPriceINR: 98,
    janAushadhiPriceINR: 14,
    savingsPercent: 86,
    savingsAmountINR: 84,
    indications: 'Essential hypertension, cardiovascular event risk reduction in chronic vascular disease',
    cdscoStandards: 'CDSCO Bioequivalence Cleared · 100% Active Pharmacological Purity',
    pmbjpCode: 'PMBJP-00219',
    inStock: true
  },
  {
    id: 'ja-augmentin-625',
    genericName: 'Amoxicillin & Potassium Clavulanate IP 625mg',
    saltComposition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    strength: '625 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Antibiotics',
    popularBrands: ['Augmentin 625 Duo', 'Clavam 625', 'Moxikind-CV 625'],
    brandedAvgPriceINR: 210,
    janAushadhiPriceINR: 55,
    savingsPercent: 74,
    savingsAmountINR: 155,
    indications: 'Bacterial sinusitis, community acquired pneumonia, UTI, skin and soft tissue cellulitis',
    cdscoStandards: 'WHO-GMP Compliant Formulation · Moisture-Barrier Strip Packaging',
    pmbjpCode: 'PMBJP-00341',
    inStock: true
  },
  {
    id: 'ja-metformin-500-sr',
    genericName: 'Metformin Hydrochloride SR 500mg',
    saltComposition: 'Metformin Sustained Release 500 mg',
    strength: '500 mg',
    dosageForm: 'SR Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Diabetes Care',
    popularBrands: ['Glycomet 500 SR', 'Okamet 500 SR', 'Formin 500 SR', 'Cetapin 500'],
    brandedAvgPriceINR: 46,
    janAushadhiPriceINR: 8,
    savingsPercent: 83,
    savingsAmountINR: 38,
    indications: 'Type 2 Diabetes Mellitus monotherapy and combination glycemic control',
    cdscoStandards: 'Controlled Dissolution Profile Matched to Innovator Brand',
    pmbjpCode: 'PMBJP-00405',
    inStock: true
  },
  {
    id: 'ja-pantop-40',
    genericName: 'Pantoprazole Gastro-Resistant 40mg',
    saltComposition: 'Pantoprazole Sodium 40 mg',
    strength: '40 mg',
    dosageForm: 'Enteric Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Gastrointestinal & Acidity',
    popularBrands: ['Pan 40', 'Pantocid 40', 'Pantodac 40', 'Penta 40'],
    brandedAvgPriceINR: 145,
    janAushadhiPriceINR: 22,
    savingsPercent: 85,
    savingsAmountINR: 123,
    indications: 'Gastroesophageal reflux disease (GERD), peptic ulcer disease, hyperacidity',
    cdscoStandards: 'Enteric Acid-Resistant Polymer Coating · NABL Passed',
    pmbjpCode: 'PMBJP-00512',
    inStock: true
  },
  {
    id: 'ja-atorva-20',
    genericName: 'Atorvastatin IP 20mg',
    saltComposition: 'Atorvastatin Calcium 20 mg',
    strength: '20 mg',
    dosageForm: 'Film Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Lipid-Lowering & Heart',
    popularBrands: ['Atorva 20', 'Lipitor 20', 'Storvas 20', 'Tonact 20'],
    brandedAvgPriceINR: 245,
    janAushadhiPriceINR: 28,
    savingsPercent: 89,
    savingsAmountINR: 217,
    indications: 'Hypercholesterolemia, dyslipidemia, atherosclerosis prevention',
    cdscoStandards: 'Bioequivalent Hepatic HMG-CoA Reductase Inhibitor',
    pmbjpCode: 'PMBJP-00628',
    inStock: true
  },
  {
    id: 'ja-montair-lc',
    genericName: 'Montelukast (10mg) + Levocetirizine (5mg)',
    saltComposition: 'Montelukast Sodium 10mg + Levocetirizine HCl 5mg',
    strength: '15 mg Combined',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Respiratory & Allergy',
    popularBrands: ['Montair-LC', 'Telekast-L', 'Montek-LC', 'Levocet-M'],
    brandedAvgPriceINR: 165,
    janAushadhiPriceINR: 38,
    savingsPercent: 77,
    savingsAmountINR: 127,
    indications: 'Allergic rhinitis, seasonal allergies, bronchial asthma maintenance, chronic urticaria',
    cdscoStandards: 'CDSCO Validated Dual-Action Dual-Release Matrix',
    pmbjpCode: 'PMBJP-00714',
    inStock: true
  },
  {
    id: 'ja-amlodipine-5',
    genericName: 'Amlodipine Besylate IP 5mg',
    saltComposition: 'Amlodipine 5 mg',
    strength: '5 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Hypertension & Heart',
    popularBrands: ['Amlong 5', 'Stamlo 5', 'Amlopin 5', 'Norvasc 5'],
    brandedAvgPriceINR: 52,
    janAushadhiPriceINR: 6.5,
    savingsPercent: 88,
    savingsAmountINR: 45.5,
    indications: 'Systemic arterial hypertension, chronic stable angina pectoris, vasospastic angina',
    cdscoStandards: 'Calcium Channel Blocker Formulation Verified by Pharmacopoeia',
    pmbjpCode: 'PMBJP-00201',
    inStock: true
  },
  {
    id: 'ja-rosuvastatin-10',
    genericName: 'Rosuvastatin IP 10mg',
    saltComposition: 'Rosuvastatin Calcium 10 mg',
    strength: '10 mg',
    dosageForm: 'Film Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Lipid-Lowering & Heart',
    popularBrands: ['Rozucor 10', 'Rosuvas 10', 'Crestor 10', 'Novastat 10'],
    brandedAvgPriceINR: 220,
    janAushadhiPriceINR: 32,
    savingsPercent: 85,
    savingsAmountINR: 188,
    indications: 'Primary hypercholesterolemia, mixed dyslipidemia, cardiovascular risk reduction',
    cdscoStandards: 'Non-CYP3A4 Dependent Statin Standard · NABL Audited',
    pmbjpCode: 'PMBJP-00632',
    inStock: true
  },
  {
    id: 'ja-azithromycin-500',
    genericName: 'Azithromycin Dihydrate IP 500mg',
    saltComposition: 'Azithromycin 500 mg',
    strength: '500 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 3 Tablets',
    category: 'Antibiotics',
    popularBrands: ['Azithral 500', 'Azee 500', 'Zithromax 500', 'Azimax 500'],
    brandedAvgPriceINR: 125,
    janAushadhiPriceINR: 35,
    savingsPercent: 72,
    savingsAmountINR: 90,
    indications: 'Upper respiratory tract infections, tonsillitis, atypical pneumonia, genital chlamydia',
    cdscoStandards: 'Macrolide Bioequivalence Benchmarked Against Reference Standard',
    pmbjpCode: 'PMBJP-00318',
    inStock: true
  },
  {
    id: 'ja-glimepiride-2',
    genericName: 'Glimepiride IP 2mg',
    saltComposition: 'Glimepiride 2 mg',
    strength: '2 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Diabetes Care',
    popularBrands: ['Amaryl 2', 'Glimestar 2', 'Zoryl 2', 'Euglim 2'],
    brandedAvgPriceINR: 88,
    janAushadhiPriceINR: 11,
    savingsPercent: 88,
    savingsAmountINR: 77,
    indications: 'Second-generation sulfonylurea for glycemic regulation in Type 2 Diabetes',
    cdscoStandards: 'Pancreatic Beta-Cell Insulin Secretagogue Quality Cleared',
    pmbjpCode: 'PMBJP-00412',
    inStock: true
  },
  {
    id: 'ja-omeprazole-20',
    genericName: 'Omeprazole Gastro-Resistant Capsules 20mg',
    saltComposition: 'Omeprazole 20 mg Pellets',
    strength: '20 mg',
    dosageForm: 'Enteric Pellets Capsules',
    packSize: 'Strip of 15 Capsules',
    category: 'Gastrointestinal & Acidity',
    popularBrands: ['Omez 20', 'Omecip 20', 'Ocid 20', 'Prilosec 20'],
    brandedAvgPriceINR: 85,
    janAushadhiPriceINR: 16,
    savingsPercent: 81,
    savingsAmountINR: 69,
    indications: 'Dyspepsia, active duodenal ulcer, reflux esophagitis, Zollinger-Ellison syndrome',
    cdscoStandards: 'Pelletized Micro-Encapsulation Quality Tested',
    pmbjpCode: 'PMBJP-00508',
    inStock: true
  },
  {
    id: 'ja-cetirizine-10',
    genericName: 'Cetirizine Hydrochloride IP 10mg',
    saltComposition: 'Cetirizine HCl 10 mg',
    strength: '10 mg',
    dosageForm: 'Film Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Respiratory & Allergy',
    popularBrands: ['Cetzine', 'Alerid', 'Okacet', 'Zyrtec'],
    brandedAvgPriceINR: 32,
    janAushadhiPriceINR: 5.5,
    savingsPercent: 83,
    savingsAmountINR: 26.5,
    indications: 'Allergic rhinitis, seasonal rhinorrhea, itching, chronic idiopathic urticaria',
    cdscoStandards: 'Selective Peripheral H1 Antihistamine Formulation',
    pmbjpCode: 'PMBJP-00702',
    inStock: true
  },
  {
    id: 'ja-clopidogrel-75',
    genericName: 'Clopidogrel Bisulfate IP 75mg',
    saltComposition: 'Clopidogrel 75 mg',
    strength: '75 mg',
    dosageForm: 'Film Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Hypertension & Heart',
    popularBrands: ['Plavix 75', 'Deplatt 75', 'Clopilet 75', 'Ceruvit 75'],
    brandedAvgPriceINR: 175,
    janAushadhiPriceINR: 26,
    savingsPercent: 85,
    savingsAmountINR: 149,
    indications: 'Atherothrombotic event prevention following myocardial infarction or ischemic stroke',
    cdscoStandards: 'P2Y12 Antiplatelet Aggregation Reference Formulation',
    pmbjpCode: 'PMBJP-00244',
    inStock: true
  },
  {
    id: 'ja-vit-d3-60k',
    genericName: 'Cholecalciferol (Vitamin D3) 60,000 IU',
    saltComposition: 'Vitamin D3 60,000 International Units',
    strength: '60,000 IU',
    dosageForm: 'Softgel Capsules / Chewable',
    packSize: 'Strip of 4 Capsules',
    category: 'Vitamins & Supplements',
    popularBrands: ['Calcirol 60K', 'D-Rise 60K', 'Uprise-D3 60K', 'Depura 60K'],
    brandedAvgPriceINR: 140,
    janAushadhiPriceINR: 28,
    savingsPercent: 80,
    savingsAmountINR: 112,
    indications: 'Hypovitaminosis D, osteoporosis prophylaxis, osteomalacia, calcium absorption',
    cdscoStandards: 'Pure Crystallized Cholecalciferol softgel encapsulation',
    pmbjpCode: 'PMBJP-00809',
    inStock: true
  },
  {
    id: 'ja-calcium-vit-d',
    genericName: 'Calcium Carbonate (500mg) + Vitamin D3 (250 IU)',
    saltComposition: 'Elemental Calcium 500mg + Vitamin D3 250 IU',
    strength: '500 mg + 250 IU',
    dosageForm: 'Tablets',
    packSize: 'Strip of 15 Tablets',
    category: 'Vitamins & Supplements',
    popularBrands: ['Shelcal 500', 'Cipcal 500', 'Calcimax 500', 'Supracal'],
    brandedAvgPriceINR: 115,
    janAushadhiPriceINR: 24,
    savingsPercent: 79,
    savingsAmountINR: 91,
    indications: 'Bone mineral density support, post-menopausal bone loss prevention, pregnancy calcium supplement',
    cdscoStandards: 'Oyster Shell Purified Bioavailable Calcium Matrix',
    pmbjpCode: 'PMBJP-00812',
    inStock: true
  },
  {
    id: 'ja-levothyroxine-50',
    genericName: 'Thyroxine Sodium IP 50mcg',
    saltComposition: 'Thyroxine Sodium 50 mcg',
    strength: '50 mcg',
    dosageForm: 'Tablets',
    packSize: 'Bottle of 100 Tablets',
    category: 'Thyroid Care',
    popularBrands: ['Thyronorm 50', 'Eltroxin 50', 'Thyrox 50'],
    brandedAvgPriceINR: 185,
    janAushadhiPriceINR: 45,
    savingsPercent: 76,
    savingsAmountINR: 140,
    indications: 'Primary, secondary, or tertiary hypothyroidism, post-thyroidectomy replacement',
    cdscoStandards: 'Strict USP Dissolution & Uniformity of Dosage Standards',
    pmbjpCode: 'PMBJP-00905',
    inStock: true
  },
  {
    id: 'ja-diclofenac-50',
    genericName: 'Diclofenac Sodium Gastro-Resistant 50mg',
    saltComposition: 'Diclofenac Sodium 50 mg',
    strength: '50 mg',
    dosageForm: 'Enteric Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Pain & Fever',
    popularBrands: ['Voveran 50', 'Dynapar 50', 'Diclogesic 50'],
    brandedAvgPriceINR: 48,
    janAushadhiPriceINR: 9,
    savingsPercent: 81,
    savingsAmountINR: 39,
    indications: 'Rheumatoid arthritis, osteoarthritis, acute gout flare, musculoskeletal trauma inflammation',
    cdscoStandards: 'Non-Steroidal Anti-Inflammatory Drug Standard Bioequivalence',
    pmbjpCode: 'PMBJP-00122',
    inStock: true
  },
  {
    id: 'ja-cipro-500',
    genericName: 'Ciprofloxacin Hydrochloride IP 500mg',
    saltComposition: 'Ciprofloxacin 500 mg',
    strength: '500 mg',
    dosageForm: 'Film Coated Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Antibiotics',
    popularBrands: ['Ciplox 500', 'Cifran 500', 'Ciprobid 500'],
    brandedAvgPriceINR: 85,
    janAushadhiPriceINR: 21,
    savingsPercent: 75,
    savingsAmountINR: 64,
    indications: 'Complicated urinary tract infections, infectious diarrhea, bone and joint bacterial infections',
    cdscoStandards: 'Broad-Spectrum Fluoroquinolone Standard Monograph',
    pmbjpCode: 'PMBJP-00330',
    inStock: true
  },
  {
    id: 'ja-losartan-50',
    genericName: 'Losartan Potassium IP 50mg',
    saltComposition: 'Losartan Potassium 50 mg',
    strength: '50 mg',
    dosageForm: 'Tablets',
    packSize: 'Strip of 10 Tablets',
    category: 'Hypertension & Heart',
    popularBrands: ['Losar 50', 'Repace 50', 'Cosart 50', 'Cozaar 50'],
    brandedAvgPriceINR: 78,
    janAushadhiPriceINR: 12.5,
    savingsPercent: 84,
    savingsAmountINR: 65.5,
    indications: 'Hypertension, renal protection in Type 2 Diabetic nephropathy with proteinuria',
    cdscoStandards: 'Angiotensin II Receptor Antagonist NABL Certified',
    pmbjpCode: 'PMBJP-00215',
    inStock: true
  }
];

export const JAN_AUSHADHI_KENDRA_STORES: JanAushadhiKendra[] = [
  // DELHI NCR
  {
    id: 'kendra-del-01',
    kendraCode: 'PMBJP-DL-1042',
    name: 'PM Jan Aushadhi Kendra - AIIMS South Campus',
    operatorName: 'HealthCare Public Trust (Dr. S. K. Verma, Pharmacist)',
    address: 'Shop No. 4, Gate 2 Commercial Complex, AIIMS Campus, Sri Aurobindo Marg',
    landmark: 'Opposite Metro Gate 2, Ansari Nagar',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110029',
    phone: '+91-11-2659-4321',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days Open)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 28.5672, lng: 77.2100 },
    inStockHighlights: ['Paracetamol 650', 'Metformin 500 SR', 'Telmisartan 40', 'Amoxy-Clav 625', 'Pantoprazole 40', 'Atorvastatin 20', 'Vitamin D3']
  },
  {
    id: 'kendra-del-02',
    kendraCode: 'PMBJP-DL-1008',
    name: 'PM Jan Aushadhi Kendra - Connaught Place / Gol Market',
    operatorName: 'Seva Medicos (Rajeshwar Dayal, D.Pharm)',
    address: 'Shop 12, Municipal Market Complex, Shaheed Bhagat Singh Marg, Near Gol Market',
    landmark: 'Near Shivaji Stadium Metro',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110001',
    phone: '+91-11-2336-8840',
    operatingHours: '8:30 AM - 9:30 PM (Mon - Sat)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 28.6315, lng: 77.2167 },
    inStockHighlights: ['Telmisartan 40', 'Atorvastatin 20', 'Montelukast-LC', 'Thyroxine 50', 'Metformin 500 SR', 'Shelcal Calcium Equiv']
  },
  {
    id: 'kendra-del-03',
    kendraCode: 'PMBJP-DL-1092',
    name: 'PM Jan Aushadhi Kendra - Laxmi Nagar / Vikas Marg',
    operatorName: 'Jan Kalyan Pharmacy (Anil Gupta)',
    address: 'A-44, Main Vikas Marg, Opp Metro Pillar 38, Laxmi Nagar',
    landmark: 'Near Nirman Vihar Metro',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110092',
    phone: '+91-11-2244-1920',
    operatingHours: '9:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: false,
    coordinates: { lat: 28.6304, lng: 77.2777 },
    inStockHighlights: ['Amoxy-Clav 625', 'Azithromycin 500', 'Cetirizine 10', 'Paracetamol 650', 'Pantoprazole 40']
  },
  {
    id: 'kendra-del-04',
    kendraCode: 'PMBJP-UP-2018',
    name: 'PM Jan Aushadhi Kendra - Noida Sector 18',
    operatorName: 'Arogya Generic Chemist (Meena Sharma)',
    address: 'Basement Shop 8, Ocean Plaza, Pocket B, Sector 18',
    landmark: 'Behind Wave Cinema Mall',
    city: 'Noida',
    state: 'Uttar Pradesh / NCR',
    pincode: '201301',
    phone: '+91-120-421-9988',
    operatingHours: '9:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 28.5708, lng: 77.3260 },
    inStockHighlights: ['Metformin 500 SR', 'Glimepiride 2', 'Rosuvastatin 10', 'Clopidogrel 75', 'Amlodipine 5']
  },
  {
    id: 'kendra-del-05',
    kendraCode: 'PMBJP-HR-1201',
    name: 'PM Jan Aushadhi Kendra - Gurugram Sector 14',
    operatorName: 'Gurugram Jan Seva Pharmacy',
    address: 'SCO 24, Main Commercial Belt, Old Railway Road, Sector 14',
    landmark: 'Near ITI Chowk',
    city: 'Gurugram',
    state: 'Haryana / NCR',
    pincode: '122001',
    phone: '+91-124-232-1102',
    operatingHours: '8:30 AM - 9:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 28.4732, lng: 77.0396 },
    inStockHighlights: ['Paracetamol 650', 'Telmisartan 40', 'Pantoprazole 40', 'Shelcal Generic', 'Vitamin D3 60K']
  },

  // BENGALURU
  {
    id: 'kendra-blr-01',
    kendraCode: 'PMBJP-KA-5602',
    name: 'PM Jan Aushadhi Kendra - Victoria Hospital Complex',
    operatorName: 'Bangalore Medical Trust (G. Venkatesh, B.Pharm)',
    address: 'BMCRI Outpatient Plaza, Fort Road, Kalasipalya',
    landmark: 'Near KR Market Metro Station',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560002',
    phone: '+91-80-2670-1120',
    operatingHours: '8:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 12.9629, lng: 77.5753 },
    inStockHighlights: ['All Cardiovascular Generic Salts', 'Insulin & Oral Diabetics', 'Amoxy-Clav 625', 'Atorvastatin 20']
  },
  {
    id: 'kendra-blr-02',
    kendraCode: 'PMBJP-KA-5611',
    name: 'PM Jan Aushadhi Kendra - Jayanagar 4th Block',
    operatorName: 'Kannada Seva Generic Dispensary',
    address: 'Shop 15, Ground Floor, BDA Complex, 4th Block Jayanagar',
    landmark: 'Opposite Jayanagar Post Office',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560011',
    phone: '+91-80-2244-5509',
    operatingHours: '9:00 AM - 9:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 12.9299, lng: 77.5838 },
    inStockHighlights: ['Metformin 500 SR', 'Telmisartan 40', 'Rosuvastatin 10', 'Thyroxine 50', 'Vitamin D3 60K']
  },
  {
    id: 'kendra-blr-03',
    kendraCode: 'PMBJP-KA-5695',
    name: 'PM Jan Aushadhi Kendra - Koramangala 5th Block',
    operatorName: 'Metro Health Jan Aushadhi',
    address: 'No. 88, 1st Cross, 5th Block, Jyoti Nivas College Road',
    landmark: 'Near Empire Suites Junction',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560095',
    phone: '+91-80-4155-2231',
    operatingHours: '8:30 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    inStockHighlights: ['Montair-LC Equivalent', 'Augmentin Equivalent', 'Dolo 650 Equivalent', 'Pan 40 Equivalent']
  },
  {
    id: 'kendra-blr-04',
    kendraCode: 'PMBJP-KA-5638',
    name: 'PM Jan Aushadhi Kendra - Indiranagar 100ft Road',
    operatorName: 'East Bengaluru Arogya Kendra',
    address: '14, 100 Feet Road, HAL 2nd Stage, Indiranagar',
    landmark: 'Near Domlur Flyover / Metro',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91-80-2520-8811',
    operatingHours: '9:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 12.9719, lng: 77.6412 },
    inStockHighlights: ['Atorvastatin 20', 'Clopidogrel 75', 'Pantoprazole 40', 'Calcium + Vit D', 'Paracetamol 650']
  },

  // MUMBAI & MMR
  {
    id: 'kendra-mum-01',
    kendraCode: 'PMBJP-MH-4012',
    name: 'PM Jan Aushadhi Kendra - KEM Hospital Parel',
    operatorName: 'Brihanmumbai Arogya Seva Trust',
    address: 'Shop 2, Gate 4 Civic Dispensary, Acharya Donde Marg, Parel',
    landmark: 'Opposite KEM OPD Gate',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400012',
    phone: '+91-22-2413-6055',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 19.0024, lng: 72.8427 },
    inStockHighlights: ['Complete Emergency Critical Generics', 'Telmisartan 40', 'Metformin SR', 'Amoxy-Clav 625', 'Atorvastatin 20']
  },
  {
    id: 'kendra-mum-02',
    kendraCode: 'PMBJP-MH-4050',
    name: 'PM Jan Aushadhi Kendra - Bandra West Hill Road',
    operatorName: 'Bandra Seva Chemist (N. K. Merchant)',
    address: 'Shop 6, Hill Road Shopping Center, Next to St. Joseph School, Bandra West',
    landmark: 'Near Bandra Police Station',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91-22-2642-1980',
    operatingHours: '9:00 AM - 9:30 PM (Mon - Sat)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 19.0596, lng: 72.8295 },
    inStockHighlights: ['Thyronorm Generic', 'Shelcal Generic', 'Rozucor Generic', 'Pan 40 Generic', 'Dolo Generic']
  },
  {
    id: 'kendra-mum-03',
    kendraCode: 'PMBJP-MH-4069',
    name: 'PM Jan Aushadhi Kendra - Andheri East Station Road',
    operatorName: 'Suburban Arogya Kendra (Deepak Joshi)',
    address: 'G-11, Station Commercial Arcade, Old Nagardas Road, Andheri East',
    landmark: 'Near Andheri Metro Station Skywalk',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400069',
    phone: '+91-22-2838-4422',
    operatingHours: '8:30 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: false,
    coordinates: { lat: 19.1197, lng: 72.8464 },
    inStockHighlights: ['Metformin 500 SR', 'Amlodipine 5', 'Montair-LC', 'Azithromycin 500', 'Paracetamol 650']
  },

  // HYDERABAD
  {
    id: 'kendra-hyd-01',
    kendraCode: 'PMBJP-TG-5012',
    name: 'PM Jan Aushadhi Kendra - Osmania Hospital Campus',
    operatorName: 'Telangana Jan Swasthya Kendra (K. Srinivas Rao)',
    address: 'Plot 3, Government Hospital Outgate, Afzal Gunj',
    landmark: 'Opposite High Court Bus Terminal',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500012',
    phone: '+91-40-2460-2210',
    operatingHours: '8:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 17.3784, lng: 78.4735 },
    inStockHighlights: ['Telmisartan 40', 'Metformin 500 SR', 'Amoxy-Clav 625', 'Pantoprazole 40', 'Glimepiride 2']
  },
  {
    id: 'kendra-hyd-02',
    kendraCode: 'PMBJP-TG-5034',
    name: 'PM Jan Aushadhi Kendra - Banjara Hills Road No 10',
    operatorName: 'Deccan Care Generic Pharmacy',
    address: 'Door 8-2-601, Road No 10, Banjara Hills',
    landmark: 'Near City Center Mall',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    phone: '+91-40-2335-7799',
    operatingHours: '9:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 17.4168, lng: 78.4382 },
    inStockHighlights: ['Atorvastatin 20', 'Rosuvastatin 10', 'Thyroxine 50', 'Vitamin D3 60K', 'Losartan 50']
  },

  // CHENNAI
  {
    id: 'kendra-chn-01',
    kendraCode: 'PMBJP-TN-6003',
    name: 'PM Jan Aushadhi Kendra - Rajiv Gandhi Govt Hospital',
    operatorName: 'Makkal Marunthagam Trust (S. Subramaniam)',
    address: 'Shop 1, EVR Periyar Salai, Park Town',
    landmark: 'Opposite Chennai Central Railway Station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600003',
    phone: '+91-44-2530-5501',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 13.0805, lng: 80.2777 },
    inStockHighlights: ['Paracetamol 650', 'Metformin 500', 'Telmisartan 40', 'Amoxy-Clav 625', 'Atorvastatin 20']
  },
  {
    id: 'kendra-chn-02',
    kendraCode: 'PMBJP-TN-6017',
    name: 'PM Jan Aushadhi Kendra - T Nagar / Panagal Park',
    operatorName: 'South Chennai Jan Aushadhi Chemist',
    address: '42, Prakasam Road, Near Panagal Park, T Nagar',
    landmark: 'Behind Bus Terminus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    phone: '+91-44-2434-3320',
    operatingHours: '9:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 13.0418, lng: 80.2341 },
    inStockHighlights: ['Pantoprazole 40', 'Montair-LC', 'Thyronorm Generic', 'Shelcal Generic', 'Cetirizine 10']
  },

  // KOLKATA
  {
    id: 'kendra-kol-01',
    kendraCode: 'PMBJP-WB-7073',
    name: 'PM Jan Aushadhi Kendra - Medical College Kolkata',
    operatorName: 'Bangla Jan Aushadhi Bhander',
    address: '88, College Street, Medical College Campus Gate 1',
    landmark: 'Near Central Metro Station',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700073',
    phone: '+91-33-2257-1905',
    operatingHours: '8:00 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    inStockHighlights: ['Paracetamol 650', 'Augmentin Generic', 'Glycomet Generic', 'Telma Generic', 'Pan 40 Generic']
  },
  {
    id: 'kendra-kol-02',
    kendraCode: 'PMBJP-WB-7064',
    name: 'PM Jan Aushadhi Kendra - Salt Lake Sector 1',
    operatorName: 'Bidhannagar Jan Swasthya (P. K. Ghosh)',
    address: 'Block BD-22, Ground Floor, Sector 1, Salt Lake City',
    landmark: 'Near City Centre 1 Metro',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700064',
    phone: '+91-33-2334-1120',
    operatingHours: '9:00 AM - 9:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 22.5867, lng: 88.4178 },
    inStockHighlights: ['Atorvastatin 20', 'Rosuvastatin 10', 'Montair-LC', 'Vitamin D3 60K', 'Calcium Supplements']
  },

  // PUNE
  {
    id: 'kendra-pun-01',
    kendraCode: 'PMBJP-MH-4101',
    name: 'PM Jan Aushadhi Kendra - Sassoon General Hospital',
    operatorName: 'Pune Seva Arogya Kendra',
    address: 'Opposite Pune Railway Station South Gate, Station Road',
    landmark: 'Near Sassoon OPD Wing',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    phone: '+91-20-2612-4411',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 18.5284, lng: 73.8743 },
    inStockHighlights: ['Metformin 500 SR', 'Telmisartan 40', 'Amoxy-Clav 625', 'Atorvastatin 20', 'Diclofenac 50']
  },

  // AHMEDABAD
  {
    id: 'kendra-ahm-01',
    kendraCode: 'PMBJP-GJ-3816',
    name: 'PM Jan Aushadhi Kendra - Civil Hospital Asarwa',
    operatorName: 'Gujarat Jan Aushadhi Samiti',
    address: 'Shop 3, Medico Complex, Asarwa',
    landmark: 'Opposite Civil Hospital Trauma Centre',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380016',
    phone: '+91-79-2268-3011',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 23.0531, lng: 72.6033 },
    inStockHighlights: ['All Cardiac Generics', 'Diabetes Complete Range', 'Antibiotics', 'Gastroenterology']
  },

  // JAIPUR
  {
    id: 'kendra-jpr-01',
    kendraCode: 'PMBJP-RJ-3004',
    name: 'PM Jan Aushadhi Kendra - SMS Hospital Campus',
    operatorName: 'Jaipur Jan Seva Pharmacy',
    address: 'Shop 5, Tonk Road, Opposite SMS Medical College Gate',
    landmark: 'Near Rambagh Circle',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302004',
    phone: '+91-141-256-4488',
    operatingHours: '8:30 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 26.8970, lng: 75.8160 },
    inStockHighlights: ['Telmisartan 40', 'Metformin 500', 'Amoxy-Clav 625', 'Pantoprazole 40', 'Paracetamol 650']
  },

  // LUCKNOW
  {
    id: 'kendra-lko-01',
    kendraCode: 'PMBJP-UP-2203',
    name: 'PM Jan Aushadhi Kendra - KGMU Chowk',
    operatorName: 'Awadh Jan Kalyan Pharmacy',
    address: 'Shop 8, Shah Mina Road, Chowk',
    landmark: 'Opposite King George Medical University OPD',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226003',
    phone: '+91-522-225-8819',
    operatingHours: '8:30 AM - 9:30 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 26.8683, lng: 80.9137 },
    inStockHighlights: ['Paracetamol 650', 'Amoxy-Clav 625', 'Pantoprazole 40', 'Atorvastatin 20', 'Montair-LC']
  },

  // CHANDIGARH
  {
    id: 'kendra-chd-01',
    kendraCode: 'PMBJP-CH-1612',
    name: 'PM Jan Aushadhi Kendra - PGIMER Sector 12',
    operatorName: 'Chandigarh Arogya Sewa Trust',
    address: 'Kalyan Kiosk 2, Ground Floor, Nehru Hospital PGI, Sector 12',
    landmark: 'Near New OPD Block PGI',
    city: 'Chandigarh',
    state: 'Chandigarh UT',
    pincode: '160012',
    phone: '+91-172-274-9901',
    operatingHours: '8:00 AM - 10:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 30.7634, lng: 76.7770 },
    inStockHighlights: ['Complete Chronic & Acute Care Generic Medicines', 'Surgical Disposables', 'Nutrition Drinks']
  },

  // KOCHI
  {
    id: 'kendra-koc-01',
    kendraCode: 'PMBJP-KL-6811',
    name: 'PM Jan Aushadhi Kendra - Ernakulam General Hospital',
    operatorName: 'Kerala Swasthya Generic Outlets (Dr. P. Mathew)',
    address: 'Hospital Road, Opp Out-Patient Wing, Ernakulam South',
    landmark: 'Near Subhash Bose Park',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682011',
    phone: '+91-484-236-0922',
    operatingHours: '8:30 AM - 9:00 PM (All 7 Days)',
    isOpenNow: true,
    wheelchairAccessible: true,
    coordinates: { lat: 9.9723, lng: 76.2783 },
    inStockHighlights: ['Metformin 500 SR', 'Telmisartan 40', 'Atorvastatin 20', 'Montair-LC', 'Azithromycin 500']
  }
];

// Helper: Calculate Haversine distance in km
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Filter Jan Aushadhi generic medicines by query & category
 */
export function searchJanAushadhiMedicines(query?: string, category?: string): JanAushadhiMedicine[] {
  let list = [...JAN_AUSHADHI_MEDICINES];
  const q = (query || '').toLowerCase().trim();
  const cat = (category || 'all').toLowerCase().trim();

  if (cat && cat !== 'all') {
    list = list.filter(m => m.category.toLowerCase().includes(cat));
  }

  if (q) {
    list = list.filter(m => {
      return (
        m.genericName.toLowerCase().includes(q) ||
        m.saltComposition.toLowerCase().includes(q) ||
        m.popularBrands.some(b => b.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q) ||
        m.indications.toLowerCase().includes(q) ||
        m.pmbjpCode.toLowerCase().includes(q)
      );
    });
  }

  return list;
}

/**
 * Search Jan Aushadhi Kendras by query, pincode, or coordinates
 */
export function searchJanAushadhiStores(params: {
  query?: string;
  pincode?: string;
  city?: string;
  lat?: number;
  lng?: number;
}): JanAushadhiKendra[] {
  let stores = [...JAN_AUSHADHI_KENDRA_STORES];
  const q = (params.query || '').toLowerCase().trim();
  const pin = (params.pincode || '').trim();
  const city = (params.city || '').toLowerCase().trim();

  // If user provided coordinates, calculate distance for all stores
  if (typeof params.lat === 'number' && typeof params.lng === 'number' && !isNaN(params.lat) && !isNaN(params.lng)) {
    stores = stores.map(s => ({
      ...s,
      distanceKm: calculateDistanceKm(params.lat!, params.lng!, s.coordinates.lat, s.coordinates.lng)
    })).sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
  }

  if (pin) {
    // Exact or prefix pincode match
    const pinMatches = stores.filter(s => s.pincode.startsWith(pin) || pin.startsWith(s.pincode.substring(0, 3)));
    if (pinMatches.length > 0) return pinMatches;
  }

  if (city && city !== 'all') {
    stores = stores.filter(s => s.city.toLowerCase().includes(city) || s.state.toLowerCase().includes(city));
  }

  if (q) {
    stores = stores.filter(s => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.kendraCode.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.landmark.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.pincode.includes(q) ||
        s.inStockHighlights.some(h => h.toLowerCase().includes(q))
      );
    });
  }

  return stores;
}
