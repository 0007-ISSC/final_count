export interface PracticeHistoryItem {
  year: number | string;
  hospital: string;
  role: string;
  department?: string;
  location?: string;
  achievements?: string;
}

export interface PatientReview {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  consultationType?: string;
  helpfulCount?: number;
}

export interface ConsultationDurationPricing {
  durationMinutes: number; // e.g. 15, 30, 45, 60
  fee: number;
  tierLabel: string;
  description?: string;
}

export interface Doctor {
  id: number;
  name: string;
  gender: 'male' | 'female';
  specialty: string;
  subSpecialty?: string;
  degrees: string;
  qualifications: string;
  registrationNumber: string;
  experienceYears: number;
  hospital: string;
  city: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  consultationFeeINR: number;
  priceTier: 'budget' | 'standard' | 'premium' | 'executive';
  rating: number;
  reviewCount: number;
  totalPatients: number;
  languages: string[];
  modes: ('video' | 'in_clinic' | 'audio' | 'chat')[];
  availableNow: boolean;
  nextSlot: string;
  nextAvailableSlot: string;
  avatarUrl: string;
  bio: string;
  insuranceAccepted: string[];
  specialtiesCovered: string[];
  clinicalInterests?: string[];
  practiceHistory: PracticeHistoryItem[];
  certifications: string[];
  patientReviews: PatientReview[];
  consultationDurationPricing: ConsultationDurationPricing[];
}

export const DOCTORS_DATABASE: Doctor[] = [
  // 1. CARDIOLOGY - New Delhi / Gurugram
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    gender: 'male',
    specialty: 'Cardiologist',
    subSpecialty: 'Interventional Cardiology & Hypertension',
    degrees: 'MBBS, MD, DM (Cardiology), FACC',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    registrationNumber: 'MCI-38291',
    experienceYears: 19,
    hospital: 'Medanta - The Medicity & AIIMS Affiliate',
    city: 'New Delhi / Gurugram',
    state: 'Delhi NCR',
    address: 'Sector 38, Gurugram, Delhi NCR 122001',
    lat: 28.4395,
    lng: 77.0428,
    consultationFeeINR: 1200,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 528,
    totalPatients: 4200,
    languages: ['English', 'Hindi', 'Punjabi'],
    modes: ['video', 'in_clinic', 'audio', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 10:30 AM',
    nextAvailableSlot: 'Today, 10:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Consultant Interventional Cardiologist with 19+ years experience in complex angioplasty, hypertension management, preventive cardiology, coronary artery disease, and lipid disorders.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Max Bupa / Niva Bupa', 'Care Health', 'Ayushman Bharat'],
    specialtiesCovered: ['Angina', 'Hypertension', 'Lipidemia', 'Heart Failure', 'ECG Analysis'],
    clinicalInterests: ['Coronary Stenting', 'Atherosclerosis Regression', 'Telemetry Monitoring', 'Hypertension Protocols'],
    practiceHistory: [
      { year: '2018 - Present', hospital: 'Medanta - The Medicity, Gurugram', role: 'Director & Head of Clinical Cardiology', department: 'Cardiology Sciences', achievements: 'Led over 3,200 successful coronary angioplasties and radial interventions.' },
      { year: '2012 - 2018', hospital: 'AIIMS (All India Institute of Medical Sciences), New Delhi', role: 'Associate Professor & Senior Consultant', department: 'Department of Cardiology', achievements: 'Authored landmark clinical study on early-onset CAD in Indian population.' },
      { year: '2007 - 2012', hospital: 'Fortis Escorts Heart Institute, Okhla', role: 'Consultant Interventional Cardiologist', department: 'Interventional Cardiology', achievements: 'Pioneered transradial coronary catheterization protocols.' }
    ],
    certifications: [
      'Fellow of American College of Cardiology (FACC)',
      'Board Certified in DM Interventional Cardiology (MCI / NBE)',
      'Fellow of European Society of Cardiology (FESC)',
      'Advanced Cardiac Life Support (ACLS) Lead Instructor'
    ],
    patientReviews: [
      { id: 101, reviewer: 'Amitabh S.', rating: 5, comment: 'Dr. Sharma precisely tuned my BP medication regimen after 3 failed attempts at other clinics. Explained the mechanism thoroughly and with extreme calmness.', date: '2026-08-18', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 42 },
      { id: 102, reviewer: 'Meenakshi K.', rating: 5, comment: 'Superb bedside manner. Helped my father recover post angioplasty with clear lifestyle and dietary instructions.', date: '2026-08-04', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 29 },
      { id: 103, reviewer: 'Devendra V.', rating: 4.8, comment: 'Very thorough assessment. Reviewed previous ECG and echo reports meticulously.', date: '2026-07-22', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 15 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 750, tierLabel: '15-Min Quick Follow-up / Rx Refill', description: 'Brief review of BP logs, lab reports, and medication refill authorizations.' },
      { durationMinutes: 30, fee: 1200, tierLabel: '30-Min Standard Clinical Consultation', description: 'Comprehensive assessment of cardiovascular symptoms, ECG analysis, and tailored treatment plans.' },
      { durationMinutes: 45, fee: 1650, tierLabel: '45-Min In-Depth & Second Opinion', description: 'Detailed review of angiograms, complex hypertension management, and lifestyle medicine regimen.' },
      { durationMinutes: 60, fee: 2200, tierLabel: '60-Min Executive Cardio Assessment', description: 'Complete family risk profiling, multi-parameter lipid evaluation, and personalized preventive longevity plan.' }
    ]
  },
  // 2. DERMATOLOGY - Bengaluru
  {
    id: 2,
    name: 'Dr. Priya Nair',
    gender: 'female',
    specialty: 'Dermatologist',
    subSpecialty: 'Clinical Dermatology & Trichology',
    degrees: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    qualifications: 'MBBS, MD (DVL), Fellow in Aesthetic Dermatology',
    registrationNumber: 'KMC-59218',
    experienceYears: 13,
    hospital: 'Manipal Hospital, HAL Old Airport Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
    lat: 12.9584,
    lng: 77.6489,
    consultationFeeINR: 900,
    priceTier: 'standard',
    rating: 4.8,
    reviewCount: 412,
    totalPatients: 3600,
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 11:00 AM',
    nextAvailableSlot: 'Today, 11:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in acne therapeutics, hormonal dermatoses, eczema, psoriasis management, advanced aesthetic trichology, and skin allergy panels.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'Medi Assist'],
    specialtiesCovered: ['Acne Vulgaris', 'Psoriasis', 'Alopecia', 'Atopic Dermatitis', 'Fungal Infections'],
    clinicalInterests: ['Hormonal Acne', 'Hair Loss Trichoscopy', 'Biologic Therapies for Psoriasis', 'Skin Barrier Restoration'],
    practiceHistory: [
      { year: '2019 - Present', hospital: 'Manipal Hospital, HAL Old Airport Road', role: 'Lead Consultant Dermatologist', department: 'Dermatology & Trichology', achievements: 'Managed over 4,500 clinical cases of refractory adult acne and alopecia areata.' },
      { year: '2014 - 2019', hospital: 'St. John’s Medical College Hospital, Bengaluru', role: 'Assistant Professor & Consultant', department: 'DVL Department', achievements: 'Conducted specialized pediatric dermatology clinics.' },
      { year: '2012 - 2014', hospital: 'Apollo Hospitals, Bannerghatta Road', role: 'Senior Resident Dermatologist', department: 'Clinical Dermatology', achievements: 'Trained in dermoscopy and laser skin rejuvenation.' }
    ],
    certifications: [
      'Certified Member of Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)',
      'Fellowship in Advanced Dermato-Trichology (Singapore)',
      'International Society of Dermatology (ISD) Fellow',
      'Certified in Medical Chemical Peels & Phototherapy'
    ],
    patientReviews: [
      { id: 201, reviewer: 'Sneha R.', rating: 5, comment: 'Dr. Priya healed my persistent cystic acne in 3 months with a structured routine. She did not over-prescribe unnecessary cosmetics.', date: '2026-08-15', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 31 },
      { id: 202, reviewer: 'Karthik N.', rating: 4.8, comment: 'Outstanding diagnosis on my scalp dermatitis. Immediate relief after following her shampoo and topical regimen.', date: '2026-07-29', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 18 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 550, tierLabel: '15-Min Quick Skin/Hair Check', description: 'Rapid evaluation of acute rash, insect bite, or topical prescription renewal.' },
      { durationMinutes: 30, fee: 900, tierLabel: '30-Min Standard Dermatology Consult', description: 'Thorough skin examination, acne grading, hair loss mapping, and customized treatment plan.' },
      { durationMinutes: 45, fee: 1250, tierLabel: '45-Min Comprehensive Dermato-Trichology', description: 'In-depth analysis of autoimmune dermatoses, chronic eczema, scalp biopsy review, and systemic therapy.' }
    ]
  },
  // 3. NEUROLOGY - Chennai
  {
    id: 3,
    name: 'Dr. Arvind Swaminathan',
    gender: 'male',
    specialty: 'Neurologist',
    subSpecialty: 'Stroke Neurology & Epilepsy Management',
    degrees: 'MBBS, MD, DM (Neurology), FINR',
    qualifications: 'MBBS, MD (Medicine), DM (Neurology), FINR (Zurich)',
    registrationNumber: 'TMC-44910',
    experienceYears: 21,
    hospital: 'Apollo Hospitals, Greams Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '21 Greams Lane, Thousand Lights West, Chennai, Tamil Nadu 600006',
    lat: 13.0604,
    lng: 80.2508,
    consultationFeeINR: 1500,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 680,
    totalPatients: 5100,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: false,
    nextSlot: 'Today, 02:30 PM',
    nextAvailableSlot: 'Today, 02:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Neurologist specializing in acute stroke intervention, complex migraine therapeutics, peripheral neuropathy, Parkinson’s disease, and cognitive neuro-rehabilitation.',
    insuranceAccepted: ['Star Health', 'Apollo Munich / HDFC', 'ICICI Lombard', 'United India', 'New India Assurance'],
    specialtiesCovered: ['Migraine', 'Stroke Rehab', 'Epilepsy', 'Neuropathy', 'Tremors'],
    clinicalInterests: ['Botox for Chronic Migraine', 'Comprehensive Stroke Care', 'Parkinsonian Gait Disorders', 'Electromyography (EMG)'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Apollo Hospitals, Greams Road, Chennai', role: 'Senior Director of Neurology & Stroke Unit', department: 'Neurosciences', achievements: 'Established rapid-thrombolysis 24/7 stroke code across Tamil Nadu.' },
      { year: '2010 - 2016', hospital: 'Madras Medical College & Government General Hospital', role: 'Professor of Neurology', department: 'Neurology Department', achievements: 'Trained over 40 DM Neurology residents and published on refractory epilepsy.' },
      { year: '2004 - 2010', hospital: 'University Hospital Zurich (USZ), Switzerland', role: 'Clinical Fellow in Interventional Neuroradiology', department: 'Neuro-Interventions', achievements: 'Fellowship in endovascular stroke recanalization.' }
    ],
    certifications: [
      'Fellow in Interventional Neuroradiology (FINR, Zurich)',
      'Indian Academy of Neurology (IAN) Life Member',
      'American Academy of Neurology (AAN) International Fellow',
      'Certified Clinical Neurophysiologist (EEG / EMG / NCV)'
    ],
    patientReviews: [
      { id: 301, reviewer: 'Rangarajan V.', rating: 5, comment: 'Dr. Swaminathan identified my atypical cluster headaches and prescribed a preventive course that gave me my life back after 2 years of agony.', date: '2026-08-12', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 38 },
      { id: 302, reviewer: 'Lakshmi P.', rating: 5, comment: 'Remarkable patience with elderly patients. Managed my mother’s Parkinson tremors expertly.', date: '2026-07-19', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 24 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 900, tierLabel: '15-Min Neuro Medication Review', description: 'Follow-up for stable epilepsy, migraine maintenance, or lab/serum level check.' },
      { durationMinutes: 30, fee: 1500, tierLabel: '30-Min Comprehensive Neurological Consult', description: 'Full cranial nerve and motor evaluation, MRI/CT review, and diagnostic strategy.' },
      { durationMinutes: 45, fee: 2100, tierLabel: '45-Min Complex Stroke / Movement Disorder Review', description: 'In-depth neuro-rehabilitation planning, Parkinson progression mapping, or second opinion on neuro-surgery.' }
    ]
  },
  // 4. PSYCHIATRY & MENTAL HEALTH - Kolkata
  {
    id: 4,
    name: 'Dr. Ananya Mukherjee',
    gender: 'female',
    specialty: 'Psychiatrist',
    subSpecialty: 'Neuropsychiatry & Psychotherapy',
    degrees: 'MBBS, MD (Psychiatry), MRCPsych (UK)',
    qualifications: 'MBBS, MD (Psychiatry), MRCPsych (Royal College of Psychiatrists, London)',
    registrationNumber: 'WBMC-61029',
    experienceYears: 15,
    hospital: 'Fortis Hospital Anandapur',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '730, Anandapur, EM Bypass Road, Kolkata, West Bengal 700107',
    lat: 22.5186,
    lng: 88.4014,
    consultationFeeINR: 1100,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 495,
    totalPatients: 3800,
    languages: ['English', 'Bengali', 'Hindi'],
    modes: ['video', 'audio', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 11:30 AM',
    nextAvailableSlot: 'Today, 11:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Compassionate Consultant Psychiatrist with deep focus on anxiety spectrum, depression, adult ADHD, trauma reframing, sleep architecture restoration, and psychosomatic wellness.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'Aditya Birla Health'],
    specialtiesCovered: ['Anxiety Disorders', 'Clinical Depression', 'Insomnia', 'Adult ADHD', 'Panic Attacks'],
    clinicalInterests: ['Cognitive Behavioral Therapy (CBT)', 'Pharmacogenomics in Psychiatry', 'Sleep Architecture', 'Adult Neurodivergence'],
    practiceHistory: [
      { year: '2018 - Present', hospital: 'Fortis Hospital Anandapur, Kolkata', role: 'Senior Consultant Psychiatrist & Psychotherapist', department: 'Mental Health and Behavioral Sciences', achievements: 'Formulated the hospital comprehensive corporate mental health and crisis intervention framework.' },
      { year: '2014 - 2018', hospital: 'South London and Maudsley NHS Foundation Trust, UK', role: 'Specialist Registrar in Adult Psychiatry', department: 'Adult Mood & Anxiety Services', achievements: 'Conducted clinical trials on non-sedating anxiolytics and mindfulness protocols.' },
      { year: '2010 - 2014', hospital: 'NRS Medical College, Kolkata', role: 'Senior Resident & Registrar', department: 'Department of Psychiatry', achievements: 'Recipient of Gold Medal in MD Psychiatry.' }
    ],
    certifications: [
      'Member of Royal College of Psychiatrists, London (MRCPsych)',
      'Indian Psychiatric Society (IPS) National Executive Member',
      'Certified in CBT for Anxiety & Depression (Beck Institute, USA)',
      'Certified in Dialectical Behavior Therapy (DBT)'
    ],
    patientReviews: [
      { id: 401, reviewer: 'Debashis G.', rating: 5, comment: 'Dr. Mukherjee changed my perspective on mental health. Her warm, non-judgmental approach and sensible dosage allowed me to overcome debilitating panic attacks.', date: '2026-08-16', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 45 },
      { id: 402, reviewer: 'Pooja B.', rating: 5, comment: 'Gave me practical tools for ADHD executive dysfunction alongside safe medication. Absolutely brilliant clinician.', date: '2026-07-28', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 33 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 20, fee: 750, tierLabel: '20-Min Psych Medication Refill & Check', description: 'For existing patients reviewing drug tolerability, sleep cycles, and routine prescription updates.' },
      { durationMinutes: 40, fee: 1100, tierLabel: '40-Min Standard Psychiatric & Psychotherapy Session', description: 'Comprehensive mental wellness assessment, diagnostic evaluation, and psychotherapy framework.' },
      { durationMinutes: 60, fee: 1600, tierLabel: '60-Min In-Depth Diagnostic & Adult ADHD Workup', description: 'Full psychiatric history, psychometric scoring, comorbid trauma review, and tailored holistic roadmap.' }
    ]
  },
  // 5. ORTHOPEDICS - Mumbai
  {
    id: 5,
    name: 'Dr. Rohan Kulkarni',
    gender: 'male',
    specialty: 'Orthopedic',
    subSpecialty: 'Robotic Joint Reconstruction & Sports Injury',
    degrees: 'MBBS, MS (Orthopaedics), MCh (Ortho, UK)',
    qualifications: 'MBBS, MS (Ortho), MCh (Ortho, UK), Fellowship in Arthroscopy (Germany)',
    registrationNumber: 'MMC-72901',
    experienceYears: 17,
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Rao Saheb, Achutrao Patwardhan Marg, Andheri West, Mumbai, Maharashtra 400053',
    lat: 19.1314,
    lng: 72.8258,
    consultationFeeINR: 1400,
    priceTier: 'premium',
    rating: 4.8,
    reviewCount: 590,
    totalPatients: 4900,
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 01:00 PM',
    nextAvailableSlot: 'Today, 01:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in arthroscopy, knee and hip replacement, sports ligament tears (ACL/PCL), cervical and lumbar spine ergonomics, and osteoarthritis therapies.',
    insuranceAccepted: ['Star Health', 'ICICI Lombard', 'HDFC ERGO', 'Max Bupa', 'Bajaj Allianz'],
    specialtiesCovered: ['Knee Pain', 'Arthritis', 'ACL Tears', 'Slipped Disc', 'Frozen Shoulder'],
    clinicalInterests: ['Robotic Knee Arthroplasty', 'Biologic Cartilage Repair', 'Sports Rehabilitation', 'Spine Ergonomics'],
    practiceHistory: [
      { year: '2017 - Present', hospital: 'Kokilaben Dhirubhai Ambani Hospital, Mumbai', role: 'Head of Sports Medicine & Robotic Arthroplasty', department: 'Centre for Bone & Joint', achievements: 'Completed over 1,800 robotic-assisted total knee replacements with 99.2% success rate.' },
      { year: '2012 - 2017', hospital: 'KEM Hospital & Seth GS Medical College, Mumbai', role: 'Associate Professor in Orthopedics', department: 'Orthopedic Surgery', achievements: 'Chief of Knee & Shoulder Arthroscopy Unit.' },
      { year: '2009 - 2012', hospital: 'Heidelberg University Orthopedic Clinic, Germany', role: 'International Fellow in Joint Preservation', department: 'Reconstructive Surgery', achievements: 'Trained under world leaders in minimally invasive ligament reconstruction.' }
    ],
    certifications: [
      'Master of Orthopedic Surgery (MCh, UK)',
      'Fellow of International Society of Arthroscopy, Knee Surgery and Orthopaedic Sports Medicine (ISAKOS)',
      'Indian Orthopaedic Association (IOA) Life Fellow',
      'Certified Robotic Joint Surgery Specialist (Mako / NAVIO)'
    ],
    patientReviews: [
      { id: 501, reviewer: 'Vikram S.', rating: 5, comment: 'Recovered from my football ACL tear in record time. Dr. Kulkarni surgical precision and post-op physio roadmap were second to none.', date: '2026-08-09', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 27 },
      { id: 502, reviewer: 'Anjali M.', rating: 4.8, comment: 'Very reassuring guidance for my mother osteoarthritis. Recommended conservative PRP therapy before jumping into surgery.', date: '2026-07-21', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 19 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 800, tierLabel: '15-Min Ortho Follow-up & X-Ray Review', description: 'Review of healing progress, post-op physiotherapy compliance, and medication refills.' },
      { durationMinutes: 30, fee: 1400, tierLabel: '30-Min Standard Orthopedic & Joint Consult', description: 'Comprehensive physical examination of joints, spine alignment, MRI review, and conservative care protocol.' },
      { durationMinutes: 45, fee: 1950, tierLabel: '45-Min Robotic Surgery & Joint Replacement Plan', description: 'Detailed surgical evaluation, implant selection, personalized 3D bone modeling, and rehabilitation trajectory.' }
    ]
  },
  // 6. GENERAL PHYSICIAN & DIABETOLOGY - Hyderabad (Budget Friendly)
  {
    id: 6,
    name: 'Dr. Sunita Reddy',
    gender: 'female',
    specialty: 'General Physician',
    subSpecialty: 'Internal Medicine & Diabetology',
    degrees: 'MBBS, DNB (Internal Medicine), C.Diab',
    qualifications: 'MBBS, DNB (General Medicine), Post Graduate Diploma in Diabetology (Boston Univ)',
    registrationNumber: 'APMC-88342',
    experienceYears: 16,
    hospital: 'Yashoda Hospitals, Somajiguda',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Raj Bhavan Road, Somajiguda, Hyderabad, Telangana 500082',
    lat: 17.4265,
    lng: 78.4554,
    consultationFeeINR: 450,
    priceTier: 'budget',
    rating: 4.9,
    reviewCount: 720,
    totalPatients: 6800,
    languages: ['English', 'Telugu', 'Hindi', 'Urdu'],
    modes: ['video', 'in_clinic', 'audio', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 10:45 AM',
    nextAvailableSlot: 'Today, 10:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Affordable, community-focused primary care clinician dedicated to chronic disease management, Type 2 diabetes reversal protocols, thyroid health, and viral fever screenings.',
    insuranceAccepted: ['Star Health', 'Ayushman Bharat', 'Aarogyasri', 'United India', 'Care Health'],
    specialtiesCovered: ['Diabetes Control', 'Thyroid Imbalance', 'Fever & Infection', 'Hypertension', 'Preventive Health'],
    clinicalInterests: ['Type 2 Diabetes Reversal', 'Preventive Lipidology', 'Thyroid Optimization', 'Geriatric Chronic Care'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Yashoda Hospitals, Somajiguda, Hyderabad', role: 'Senior Consultant Physician & Diabetologist', department: 'Internal Medicine', achievements: 'Managed over 8,000 diabetic patients with customized HbA1c reduction pathways.' },
      { year: '2011 - 2016', hospital: 'Gandhi Hospital & Medical College, Secunderabad', role: 'Associate Professor of General Medicine', department: 'Medicine', achievements: 'Headed primary care fever outbreak monitoring units.' },
      { year: '2008 - 2011', hospital: 'Apollo Health City, Jubilee Hills', role: 'Registrar in Internal Medicine', department: 'Emergency & General Medicine', achievements: 'Managed critical metabolic ketoacidosis emergencies.' }
    ],
    certifications: [
      'Post Graduate Diploma in Diabetology (PGDD, Boston University School of Medicine)',
      'Association of Physicians of India (API) Member',
      'Research Society for the Study of Diabetes in India (RSSDI) Fellow',
      'Certificate in Evidence-Based Diabetes Management (CCEBDM)'
    ],
    patientReviews: [
      { id: 601, reviewer: 'Srinivas R.', rating: 5, comment: 'Dr. Sunita is God-sent for our family. Brought my HbA1c down from 9.4 to 6.2 without unnecessary expensive medications.', date: '2026-08-17', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 52 },
      { id: 602, reviewer: 'Farzana B.', rating: 5, comment: 'Extremely caring, listens to every symptom, and charges very reasonably. Highly recommended for diabetes.', date: '2026-08-01', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 39 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 300, tierLabel: '15-Min Quick Teleconsult / Sugar Report Review', description: 'Fasting/PP blood sugar check, diet adjustments, and prescription refill.' },
      { durationMinutes: 30, fee: 450, tierLabel: '30-Min Standard General Physician Consult', description: 'Full clinical examination, chronic illness diagnosis, lab investigation roadmap, and medication adjustments.' },
      { durationMinutes: 45, fee: 650, tierLabel: '45-Min Comprehensive Diabetes Reversal & Metabolic Plan', description: 'Complete nutritional lifestyle design, insulin tapering protocol, thyroid balance, and cardiovascular risk reduction.' }
    ]
  },
  // 7. GASTROENTEROLOGY - Pune
  {
    id: 7,
    name: 'Dr. Vikramaditya Joshi',
    gender: 'male',
    specialty: 'Gastroenterologist',
    subSpecialty: 'Hepatology & Therapeutic Endoscopy',
    degrees: 'MBBS, MD (Medicine), DM (Gastroenterology)',
    qualifications: 'MBBS, MD, DM (Gastroenterology, PGI Chandigarh), Fellowship in Advanced GI',
    registrationNumber: 'MMC-91043',
    experienceYears: 18,
    hospital: 'Ruby Hall Clinic, Sassoon Road',
    city: 'Pune',
    state: 'Maharashtra',
    address: '40, Sassoon Road, Sangamvadi, Pune, Maharashtra 411001',
    lat: 18.5312,
    lng: 73.8769,
    consultationFeeINR: 1000,
    priceTier: 'standard',
    rating: 4.8,
    reviewCount: 460,
    totalPatients: 3900,
    languages: ['English', 'Marathi', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 03:15 PM',
    nextAvailableSlot: 'Today, 03:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Expert in digestive disorders, chronic acid reflux (GERD), IBS/IBD protocols, fatty liver disease regression, endoscopic interventions, and gut microbiome optimization.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'ICICI Lombard'],
    specialtiesCovered: ['GERD / Acidity', 'Fatty Liver', 'IBS / Bloating', 'Ulcerative Colitis', 'Constipation'],
    clinicalInterests: ['Gut Microbiome Therapy', 'Non-Alcoholic Fatty Liver (NAFLD)', 'Therapeutic Endoscopy', 'Celiac Disease'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Ruby Hall Clinic, Pune', role: 'Director of Gastroenterology & Hepatology', department: 'Digestive Health', achievements: 'Conducted over 6,000 endoscopic procedures and instituted NAFLD reversal protocols.' },
      { year: '2011 - 2016', hospital: 'Deenanath Mangeshkar Hospital, Pune', role: 'Senior Consultant Gastroenterologist', department: 'GI Sciences', achievements: 'Specialized in chronic inflammatory bowel disease (IBD).' },
      { year: '2006 - 2011', hospital: 'PGIMER, Chandigarh', role: 'Registrar & DM Fellow', department: 'Department of Gastroenterology', achievements: 'Published research on mucosal healing in Ulcerative Colitis.' }
    ],
    certifications: [
      'Board Certified in DM Gastroenterology (PGIMER Chandigarh)',
      'Indian Society of Gastroenterology (ISG) Member',
      'American Gastroenterological Association (AGA) International Fellow',
      'Certified in Diagnostic & Interventional Endoscopy'
    ],
    patientReviews: [
      { id: 701, reviewer: 'Nitin P.', rating: 5, comment: 'Cured my severe GERD that was giving me nighttime coughing and chest burn for years. Clear dietary regimen and sensible PPI tapering.', date: '2026-08-11', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 28 },
      { id: 702, reviewer: 'Sujata T.', rating: 4.8, comment: 'Dr. Joshi is exceptional with fatty liver management. His dietary guidelines helped reverse my Grade 2 fatty liver to normal in 6 months.', date: '2026-07-24', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 21 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 600, tierLabel: '15-Min Acidity / GI Follow-up', description: 'Review of ultrasound or LFT reports, medication adjustment, and symptom check.' },
      { durationMinutes: 30, fee: 1000, tierLabel: '30-Min Standard Gastroenterology Consult', description: 'Detailed diagnostic assessment for IBS, GERD, chronic bloating, and fatty liver disease.' },
      { durationMinutes: 45, fee: 1450, tierLabel: '45-Min Comprehensive IBD & Hepatology Review', description: 'Endoscopy report review, biologics planning for Crohn’s / Colitis, and liver fibroscan evaluation.' }
    ]
  },
  // 8. PULMONOLOGY & CHEST MEDICINE - New Delhi
  {
    id: 8,
    name: 'Dr. Amit Bansal',
    gender: 'male',
    specialty: 'Pulmonologist',
    subSpecialty: 'Allergy, Asthma & Sleep Medicine',
    degrees: 'MBBS, MD (Pulmonary Medicine), FCCP (USA)',
    qualifications: 'MBBS, MD (Chest Medicine), Fellow American College of Chest Physicians',
    registrationNumber: 'DMC-67123',
    experienceYears: 15,
    hospital: 'Max Super Speciality Hospital, Saket',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
    lat: 28.5283,
    lng: 77.2115,
    consultationFeeINR: 1300,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 540,
    totalPatients: 4600,
    languages: ['English', 'Hindi', 'Punjabi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 12:00 PM',
    nextAvailableSlot: 'Today, 12:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated pulmonologist treating persistent allergic cough, bronchial asthma, COPD, chronic bronchitis, post-viral respiratory recovery, and obstructive sleep apnea.',
    insuranceAccepted: ['Star Health', 'Max Bupa / Niva Bupa', 'HDFC ERGO', 'ICICI Lombard', 'Care Health'],
    specialtiesCovered: ['Asthma Inhaler Therapy', 'Chronic Cough', 'Bronchitis', 'Sleep Apnea (CPAP)', 'Allergic Rhinitis'],
    clinicalInterests: ['Severe Asthma Biologics', 'Sleep Polysomnography', 'Pollution-Induced Bronchitis', 'Post-COVID Fibrosis'],
    practiceHistory: [
      { year: '2018 - Present', hospital: 'Max Super Speciality Hospital, Saket', role: 'Senior Consultant Pulmonology & Sleep Medicine', department: 'Institute of Respiratory Medicine', achievements: 'Heads the Northern India Severe Asthma and CPAP Clinic.' },
      { year: '2013 - 2018', hospital: 'VMMC & Safdarjung Hospital, New Delhi', role: 'Associate Professor', department: 'Pulmonary Medicine', achievements: 'Conducted epidemiological research on Delhi air quality respiratory impact.' },
      { year: '2009 - 2013', hospital: 'Vallabhbhai Patel Chest Institute (VPCI), Delhi', role: 'Senior Resident Pulmonologist', department: 'Chest Medicine', achievements: 'Trained in bronchoscopy and spirometry interpretations.' }
    ],
    certifications: [
      'Fellow of American College of Chest Physicians (FCCP)',
      'National College of Chest Physicians (NCCP, India) Fellow',
      'European Respiratory Society (ERS) Member',
      'Certified Sleep Apnea & Polysomnography Specialist'
    ],
    patientReviews: [
      { id: 801, reviewer: 'Harpreet S.', rating: 5, comment: 'Dr. Bansal corrected my inhaler technique and eliminated my chronic wheezing in Delhi winter. Amazing doctor.', date: '2026-08-14', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 36 },
      { id: 802, reviewer: 'Ritu K.', rating: 5, comment: 'Prescribed a sleep study that detected severe obstructive sleep apnea. CPAP therapy has transformed my daytime energy.', date: '2026-07-30', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 22 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 750, tierLabel: '15-Min Inhaler / Cough Follow-up', description: 'Spirometry review, inhaler dose adjustment, and acute allergy flare-up guidance.' },
      { durationMinutes: 30, fee: 1300, tierLabel: '30-Min Comprehensive Pulmonology Consult', description: 'Detailed chest evaluation, asthma control grading, chest X-Ray/CT review, and allergy management.' },
      { durationMinutes: 45, fee: 1800, tierLabel: '45-Min Sleep Apnea & Severe COPD Assessment', description: 'Polysomnography titration, CPAP device calibration, and advanced biologics roadmap.' }
    ]
  },
  // 9. GYNECOLOGY & OBSTETRICS - Hyderabad
  {
    id: 9,
    name: 'Dr. Shalini Verma',
    gender: 'female',
    specialty: 'Gynecologist',
    subSpecialty: 'Reproductive Endocrinology & High-Risk Obstetrics',
    degrees: 'MBBS, MS (Obstetrics & Gynaecology), DNB, FICOG',
    qualifications: 'MBBS, MS (OBG), DNB, Fellowship in Reproductive Medicine (Germany)',
    registrationNumber: 'APMC-90412',
    experienceYears: 17,
    hospital: 'Apollo Cradle & Children’s Hospital, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Plot No 44, Road No 10, Jubilee Hills, Hyderabad, Telangana 500033',
    lat: 17.4320,
    lng: 78.4080,
    consultationFeeINR: 1100,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 630,
    totalPatients: 5300,
    languages: ['English', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 02:00 PM',
    nextAvailableSlot: 'Today, 02:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in PCOS/PCOD metabolic reversal, adolescent menstrual irregularities, hormonal imbalance, fertility planning, painless delivery, and holistic menopause care.',
    insuranceAccepted: ['Star Health', 'Apollo Munich / HDFC', 'Bajaj Allianz', 'ICICI Lombard', 'Reliance General'],
    specialtiesCovered: ['PCOS Management', 'Irregular Periods', 'Fertility Workup', 'Pelvic Pain', 'Antenatal Care'],
    clinicalInterests: ['PCOS Insulin Resistance Reversal', 'Endometriosis Pain Management', 'Preconception Optimization', 'Hormone Replacement Therapy (HRT)'],
    practiceHistory: [
      { year: '2017 - Present', hospital: 'Apollo Cradle & Children’s Hospital, Jubilee Hills', role: 'Senior Consultant Gynecologist & Fertility Specialist', department: 'Women’s Health', achievements: 'Delivered over 2,400 healthy infants and established the Apollo PCOS Reversal Clinic.' },
      { year: '2012 - 2017', hospital: 'Fernandez Hospital, Hyderguda', role: 'Consultant Obstetrician', department: 'High-Risk Pregnancy Unit', achievements: 'Specialized in natural birth protocols and gestational diabetes management.' },
      { year: '2007 - 2012', hospital: 'Osmania Medical College, Hyderabad', role: 'Assistant Professor of OBG', department: 'Obstetrics & Gynecology', achievements: 'Recipient of University Gold Medal in MS Obstetrics.' }
    ],
    certifications: [
      'Fellow of Indian College of Obstetricians and Gynaecologists (FICOG)',
      'Federation of Obstetric and Gynaecological Societies of India (FOGSI) Member',
      'Fellowship in Reproductive Medicine & Infertility (Heidelberg, Germany)',
      'Certified in Gynecological Ultrasonography (ISUOG)'
    ],
    patientReviews: [
      { id: 901, reviewer: 'Kavitha M.', rating: 5, comment: 'Dr. Shalini reversed my PCOS symptoms in 5 months. My cycles became regular for the first time in 4 years. She is truly wonderful!', date: '2026-08-16', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 48 },
      { id: 902, reviewer: 'Deepika S.', rating: 5, comment: 'Supported me through a high-risk pregnancy with unmatched competence, calm confidence, and warmth.', date: '2026-07-25', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 34 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 650, tierLabel: '15-Min Quick Cycle & Scan Review', description: 'Review of pelvic ultrasound, hormonal blood work, or emergency contraceptive guidance.' },
      { durationMinutes: 30, fee: 1100, tierLabel: '30-Min Standard Gynecological Consultation', description: 'Comprehensive menstrual analysis, PCOS evaluation, contraceptive counseling, and tailored prescription.' },
      { durationMinutes: 45, fee: 1550, tierLabel: '45-Min In-Depth Fertility & PCOS Reversal Protocol', description: 'Complete reproductive hormone profiling, ovulation tracking roadmap, and holistic lifestyle plan.' }
    ]
  },
  // 10. GENERAL PHYSICIAN - Bengaluru (Affordable Community Doctor)
  {
    id: 10,
    name: 'Dr. Deepak Narang',
    gender: 'male',
    specialty: 'General Physician',
    subSpecialty: 'Family Medicine & Preventive Geriatrics',
    degrees: 'MBBS, MD (Internal Medicine)',
    qualifications: 'MBBS, MD (General Medicine), PG Diploma in Geriatric Medicine (IGNOU)',
    registrationNumber: 'KMC-84192',
    experienceYears: 14,
    hospital: 'Narayana Health City, Bommasandra',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bengaluru, Karnataka 560099',
    lat: 12.8080,
    lng: 77.6974,
    consultationFeeINR: 350,
    priceTier: 'budget',
    rating: 4.8,
    reviewCount: 510,
    totalPatients: 5900,
    languages: ['English', 'Kannada', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 11:15 AM',
    nextAvailableSlot: 'Today, 11:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Family physician with deep focus on comprehensive health checkups, geriatric wellness, seasonal infections, hypertension control, and lifestyle medicine.',
    insuranceAccepted: ['Ayushman Bharat', 'Star Health', 'United India', 'New India Assurance', 'Care Health'],
    specialtiesCovered: ['General Checkup', 'Geriatric Health', 'Viral Illness', 'BP & Sugar Screening', 'Fatigue / Weakness'],
    clinicalInterests: ['Preventive Health Screenings', 'Senior Care Polypharmacy Reduction', 'Seasonal Viral Management'],
    practiceHistory: [
      { year: '2017 - Present', hospital: 'Narayana Health City, Bommasandra', role: 'Consultant in Family Medicine', department: 'Internal Medicine', achievements: 'Conducted over 15,000 preventive primary health examinations.' },
      { year: '2012 - 2017', hospital: 'St. Martha’s Hospital, Bengaluru', role: 'Junior Consultant Physician', department: 'Outpatient Medicine', achievements: 'Managed community immunization and health outreach.' }
    ],
    certifications: [
      'Post Graduate Diploma in Geriatric Medicine (PGDGM)',
      'Indian Medical Association (IMA) Life Member',
      'Certified in Primary Care Hypertension Management'
    ],
    patientReviews: [
      { id: 1001, reviewer: 'Girish K.', rating: 5, comment: 'Dr. Narang is very thorough, courteous, and gives genuine advice without piling up unnecessary tests. Great experience!', date: '2026-08-10', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 25 },
      { id: 1002, reviewer: 'Mallikarjun B.', rating: 4.8, comment: 'Extremely polite with elderly parents. Simplified their medications efficiently.', date: '2026-07-18', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 16 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 250, tierLabel: '15-Min Quick Teleconsult', description: 'Brief symptom screening, fever guidance, or blood pressure check.' },
      { durationMinutes: 30, fee: 350, tierLabel: '30-Min Standard Family Medicine Consult', description: 'Complete general body checkup, lab test review, and customized prescription.' },
      { durationMinutes: 45, fee: 500, tierLabel: '45-Min Comprehensive Senior / Geriatric Review', description: 'Full polypharmacy assessment, chronic symptom analysis, and preventive health roadmap.' }
    ]
  },
  // 11. PEDIATRICS & CHILD HEALTH - Mumbai
  {
    id: 11,
    name: 'Dr. Meera Iyer',
    gender: 'female',
    specialty: 'Pediatrician',
    subSpecialty: 'Neonatology & Pediatric Allergy',
    degrees: 'MBBS, MD (Pediatrics), DCH, FIAP',
    qualifications: 'MBBS, MD (Pediatrics, KEM Mumbai), Fellowship in Pediatric Intensive Care',
    registrationNumber: 'MMC-65489',
    experienceYears: 16,
    hospital: 'Surya Children’s Hospital, Santacruz West',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '101, SV Road, Santacruz West, Mumbai, Maharashtra 400054',
    lat: 19.0833,
    lng: 72.8367,
    consultationFeeINR: 800,
    priceTier: 'standard',
    rating: 4.9,
    reviewCount: 480,
    totalPatients: 4100,
    languages: ['English', 'Hindi', 'Marathi', 'Tamil'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 03:00 PM',
    nextAvailableSlot: 'Today, 03:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Pediatrician with special expertise in childhood immunization, pediatric wheezing, food allergies, growth & developmental milestones, and infant colic.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Max Bupa'],
    specialtiesCovered: ['Vaccinations', 'Infant Nutrition', 'Childhood Asthma', 'Fever in Children', 'Development Milestones'],
    clinicalInterests: ['Pediatric Asthma Inhaler Protocols', 'Neonatal Growth Tracking', 'Childhood Allergy Elimination'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Surya Children’s Hospital, Santacruz West', role: 'Head of Pediatric Outpatient & Allergy Care', department: 'Pediatrics', achievements: 'Established infant lactation and allergy guidance clinics.' },
      { year: '2010 - 2016', hospital: 'KEM Hospital, Mumbai', role: 'Associate Professor of Pediatrics', department: 'Pediatrics & PICU', achievements: 'Managed high-acuity pediatric emergency wards.' }
    ],
    certifications: [
      'Fellow of Indian Academy of Pediatrics (FIAP)',
      'Pediatric Advanced Life Support (PALS) Certified Instructor',
      'Diploma in Child Health (DCH, Mumbai)'
    ],
    patientReviews: [
      { id: 1101, reviewer: 'Neha T.', rating: 5, comment: 'Dr. Meera handled my 8-month-old fever and wheezing with incredible tenderness and precision. She is our go-to pediatrician.', date: '2026-08-13', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 30 },
      { id: 1102, reviewer: 'Rohit J.', rating: 5, comment: 'Extremely calm and informative regarding vaccination schedules and food allergies.', date: '2026-07-26', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 19 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 500, tierLabel: '15-Min Pediatric Quick Consult / Vaccine Check', description: 'Vaccine schedule check, mild cold/cough guidance, or growth chart update.' },
      { durationMinutes: 30, fee: 800, tierLabel: '30-Min Standard Pediatric Consultation', description: 'Comprehensive child examination, fever evaluation, developmental milestones, and safe pediatric dosing.' },
      { durationMinutes: 45, fee: 1150, tierLabel: '45-Min In-Depth Pediatric Allergy & Asthma Workup', description: 'Detailed wheezing assessment, food allergy elimination plan, and nebulizer guidance.' }
    ]
  },
  // 12. ENDOCRINOLOGY & METABOLIC MEDICINE - New Delhi (Executive Super-Specialist)
  {
    id: 12,
    name: 'Dr. Harshvardhan Singhania',
    gender: 'male',
    specialty: 'Endocrinologist',
    subSpecialty: 'Thyroid Disorders, Pituitary & Advanced Diabetes',
    degrees: 'MBBS, MD, DM (Endocrinology, AIIMS)',
    qualifications: 'MBBS, MD (Medicine), DM (Endocrinology, AIIMS New Delhi), FACE (USA)',
    registrationNumber: 'DMC-51294',
    experienceYears: 24,
    hospital: 'Indraprastha Apollo Hospitals, Sarita Vihar',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi 110076',
    lat: 28.5372,
    lng: 77.2882,
    consultationFeeINR: 2500,
    priceTier: 'executive',
    rating: 5.0,
    reviewCount: 890,
    totalPatients: 7400,
    languages: ['English', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Tomorrow, 10:00 AM',
    nextAvailableSlot: 'Tomorrow, 10:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Chief Endocrinologist and former AIIMS faculty. Pioneer in complex pituitary, adrenal, refractory thyroid nodule management, continuous glucose monitoring (CGM), and metabolic hormone optimization.',
    insuranceAccepted: ['All Major Corporate Policies', 'Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Cigna TTK'],
    specialtiesCovered: ['Refractory Hypothyroidism', 'Hyperthyroidism', 'CGM & Insulin Pumps', 'Adrenal Tumors', 'Osteoporosis'],
    clinicalInterests: ['Hashimoto Thyroiditis', 'Continuous Glucose Monitoring (CGM)', 'Pituitary Adenomas', 'Metabolic Longevity Medicine'],
    practiceHistory: [
      { year: '2014 - Present', hospital: 'Indraprastha Apollo Hospitals, New Delhi', role: 'Chairman & Chief of Endocrinology', department: 'Institute of Endocrinology & Diabetes', achievements: 'Pioneered closed-loop insulin pump therapy and automated CGM management.' },
      { year: '2002 - 2014', hospital: 'AIIMS (All India Institute of Medical Sciences), New Delhi', role: 'Professor & Head of Clinical Endocrinology', department: 'Department of Endocrinology & Metabolism', achievements: 'Published over 80 peer-reviewed papers on Indian endocrine disorders.' }
    ],
    certifications: [
      'Fellow of American Association of Clinical Endocrinologists (FACE)',
      'Endocrine Society (USA) Active International Fellow',
      'Endocrine Society of India (ESI) Past President',
      'Board Certified in DM Endocrinology (AIIMS New Delhi)'
    ],
    patientReviews: [
      { id: 1201, reviewer: 'Sanjay M.', rating: 5, comment: 'Dr. Singhania solved my refractory thyroid problem when 5 other doctors failed. World-class expertise and crystal-clear clinical explanation.', date: '2026-08-15', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 61 },
      { id: 1202, reviewer: 'Geeta D.', rating: 5, comment: 'The finest endocrinologist in the country. Setup my CGM and insulin pump with extreme precision.', date: '2026-07-29', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 47 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 20, fee: 1600, tierLabel: '20-Min Executive Thyroid / CGM Review', description: 'Rapid analysis of Continuous Glucose Monitor graphs, thyroid panel, and dosage adjustments.' },
      { durationMinutes: 40, fee: 2500, tierLabel: '40-Min Executive Super-Specialist Consultation', description: 'Comprehensive neuroendocrine and metabolic evaluation, pituitary/adrenal review, and personalized therapy.' },
      { durationMinutes: 60, fee: 3500, tierLabel: '60-Min In-Depth Second Opinion & Longevity Protocol', description: 'Full hormonal axis workup, insulin pump programming, and multi-disciplinary longevity roadmap.' }
    ]
  },
  // 13. OPHTHALMOLOGY & EYE SURGEON - Chennai (Affordable)
  {
    id: 13,
    name: 'Dr. Karthik Balakrishnan',
    gender: 'male',
    specialty: 'Ophthalmologist',
    subSpecialty: 'Cataract, Refractive LASIK & Diabetic Retinopathy',
    degrees: 'MBBS, MS (Ophthalmology), DNB, FICO (UK)',
    qualifications: 'MBBS, MS (Ophth), Fellow Sankara Nethralaya, FICO (UK)',
    registrationNumber: 'TMC-78120',
    experienceYears: 16,
    hospital: 'Sankara Nethralaya Main Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '18, College Road, Nungambakkam, Chennai, Tamil Nadu 600006',
    lat: 13.0645,
    lng: 80.2456,
    consultationFeeINR: 500,
    priceTier: 'standard',
    rating: 4.9,
    reviewCount: 620,
    totalPatients: 5800,
    languages: ['English', 'Tamil', 'Malayalam', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 04:00 PM',
    nextAvailableSlot: 'Today, 04:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Distinguished eye surgeon specializing in blade-free LASIK, micro-incision cataract surgery, diabetic retinal screenings, digital eye strain / dry eyes, and glaucoma screening.',
    insuranceAccepted: ['Star Health', 'United India', 'New India Assurance', 'Oriental Insurance', 'National Insurance'],
    specialtiesCovered: ['Dry Eye Syndrome', 'Diabetic Retinopathy', 'Glaucoma', 'LASIK Consultation', 'Cataract Review'],
    clinicalInterests: ['Blade-Free Contoura LASIK', 'Diabetic Maculopathy Screening', 'Digital Eye Strain Therapeutics'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Sankara Nethralaya Main Campus, Chennai', role: 'Senior Consultant Cataract & Refractive Surgeon', department: 'Cornea & Refractive Services', achievements: 'Performed over 5,000 successful laser refractive procedures.' },
      { year: '2010 - 2016', hospital: 'Aravind Eye Hospital, Madurai', role: 'Consultant Ophthalmologist', department: 'Cataract & Retina Unit', achievements: 'Conducted high-volume community eye surgery camps.' }
    ],
    certifications: [
      'Fellow of the International Council of Ophthalmology (FICO, London)',
      'All India Ophthalmological Society (AIOS) Fellow',
      'Cornea & Refractive Surgery Fellowship (Sankara Nethralaya)'
    ],
    patientReviews: [
      { id: 1301, reviewer: 'Bala M.', rating: 5, comment: 'Dr. Karthik gave me 20/20 vision after painless Contoura LASIK. Excellent pre-op explanation and post-op care.', date: '2026-08-12', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 33 },
      { id: 1302, reviewer: 'Priya K.', rating: 4.9, comment: 'Accurately treated my severe screen dry eyes with an effective tear-film therapy.', date: '2026-07-23', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 18 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 350, tierLabel: '15-Min Quick Eye Strain / Eye Drop Review', description: 'Guidance for digital eye strain, lubricating drops, or routine prescription verification.' },
      { durationMinutes: 30, fee: 500, tierLabel: '30-Min Standard Ophthalmology Consult', description: 'Comprehensive vision evaluation, retinal screening, glaucoma pressure check, and LASIK candidacy.' },
      { durationMinutes: 45, fee: 750, tierLabel: '45-Min In-Depth Diabetic Retinopathy / Cataract Workup', description: 'OCT scan review, fundus examination, and intraocular lens (IOL) customization plan.' }
    ]
  },
  // 14. ENT (OTORHINOLARYNGOLOGY) - Pune
  {
    id: 14,
    name: 'Dr. Sneha Deshmukh',
    gender: 'female',
    specialty: 'ENT Specialist',
    subSpecialty: 'Sinus Surgery, Tinnitus & Vertigo Balance',
    degrees: 'MBBS, MS (ENT), DNB (Otolaryngology)',
    qualifications: 'MBBS, MS (ENT, BJ Medical College), Fellowship in Rhinology & Endoscopic Sinus',
    registrationNumber: 'MMC-83145',
    experienceYears: 14,
    hospital: 'Jehangir Hospital, Bund Garden Road',
    city: 'Pune',
    state: 'Maharashtra',
    address: '32, Sassoon Rd, Central Railway Station, Pune, Maharashtra 411001',
    lat: 18.5284,
    lng: 73.8743,
    consultationFeeINR: 700,
    priceTier: 'standard',
    rating: 4.8,
    reviewCount: 390,
    totalPatients: 3400,
    languages: ['English', 'Marathi', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 01:30 PM',
    nextAvailableSlot: 'Today, 01:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Experienced ENT clinician specializing in chronic sinusitis, nasal polyps, deviated septum (DNS), allergic rhinitis, middle ear infections, hearing evaluation, and vertigo management.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'Care Health'],
    specialtiesCovered: ['Sinusitis', 'Deviated Septum', 'Tinnitus / Ringing Ear', 'Vertigo / Dizziness', 'Tonsillitis'],
    clinicalInterests: ['Endoscopic Sinus Surgery (FESS)', 'Vestibular Rehab for Vertigo', 'Allergic Rhinitis Immunotherapy'],
    practiceHistory: [
      { year: '2018 - Present', hospital: 'Jehangir Hospital, Pune', role: 'Senior Consultant ENT Surgeon', department: 'Otorhinolaryngology', achievements: 'Heads the specialized Vertigo & Vestibular Balance Laboratory.' },
      { year: '2012 - 2018', hospital: 'BJ Medical College & Sassoon General Hospital, Pune', role: 'Assistant Professor in ENT', department: 'ENT Surgery', achievements: 'Conducted advanced rhinology research.' }
    ],
    certifications: [
      'Association of Otolaryngologists of India (AOI) Fellow',
      'Allergy & Rhinology Specialty Certification',
      'Vestibular Rehabilitation Specialist (BPPV Epley Certified)'
    ],
    patientReviews: [
      { id: 1401, reviewer: 'Prasad J.', rating: 5, comment: 'Dr. Deshmukh cured my debilitating BPPV vertigo with a single Epley maneuver in her clinic. Could not be more grateful!', date: '2026-08-14', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 26 },
      { id: 1402, reviewer: 'Anjali V.', rating: 4.8, comment: 'Very practical advice on chronic sinusitis without rushing into surgery.', date: '2026-07-27', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 14 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 450, tierLabel: '15-Min Quick Ear/Throat Follow-up', description: 'Review of ear drop or nasal spray response and acute symptom monitoring.' },
      { durationMinutes: 30, fee: 700, tierLabel: '30-Min Standard ENT Consultation', description: 'Complete otoscopy, nasal examination, allergy review, and prescription.' },
      { durationMinutes: 45, fee: 1000, tierLabel: '45-Min Vertigo & Sinus Evaluation', description: 'Comprehensive vestibular balance workup, CT scan review, and sinus treatment protocol.' }
    ]
  },
  // 15. NEPHROLOGY & KIDNEY CARE - Ahmedabad
  {
    id: 15,
    name: 'Dr. Bhavesh Patel',
    gender: 'male',
    specialty: 'Nephrologist',
    subSpecialty: 'Renal Failure, Dialysis & Kidney Stone Prevention',
    degrees: 'MBBS, MD (Medicine), DM (Nephrology)',
    qualifications: 'MBBS, MD, DM (Nephrology, IKDRC Ahmedabad), MNAMS',
    registrationNumber: 'GMC-42901',
    experienceYears: 18,
    hospital: 'Zydus Hospitals, Thaltej',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'Zydus Hospitals Road, SG Highway, Thaltej, Ahmedabad, Gujarat 380054',
    lat: 23.0569,
    lng: 72.5085,
    consultationFeeINR: 950,
    priceTier: 'standard',
    rating: 4.9,
    reviewCount: 430,
    totalPatients: 3700,
    languages: ['English', 'Gujarati', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 02:45 PM',
    nextAvailableSlot: 'Today, 02:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Consultant Nephrologist dedicated to early detection of chronic kidney disease (CKD), diabetic nephropathy slowing, kidney stone metabolic evaluation, and electrolyte disorders.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'United India', 'New India Assurance'],
    specialtiesCovered: ['CKD Screening', 'Proteinuria', 'Recurrent Kidney Stones', 'High Creatinine', 'Glomerulonephritis'],
    clinicalInterests: ['Diabetic Kidney Disease Delay', 'Metabolic Kidney Stone Prevention', 'Peritoneal & Hemodialysis'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Zydus Hospitals, Ahmedabad', role: 'Director of Nephrology & Dialysis', department: 'Institute of Kidney Sciences', achievements: 'Maintains zero-infection protocol across dialysis stations.' },
      { year: '2008 - 2016', hospital: 'IKDRC-ITS (Institute of Kidney Diseases and Research Centre), Ahmedabad', role: 'Associate Professor in Nephrology', department: 'Nephrology & Renal Transplant', achievements: 'Managed over 400 renal transplants and post-op care.' }
    ],
    certifications: [
      'Indian Society of Nephrology (ISN) National Executive Member',
      'International Society of Nephrology (ISN) Fellow',
      'Member of National Academy of Medical Sciences (MNAMS)'
    ],
    patientReviews: [
      { id: 1501, reviewer: 'Hasmukh S.', rating: 5, comment: 'Stabilized my elevated serum creatinine levels with tailored dietary guidelines and renoprotective medication.', date: '2026-08-11', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 29 },
      { id: 1502, reviewer: 'Bhavna P.', rating: 4.9, comment: 'Identified the metabolic cause of my recurrent kidney stones and stopped new formations completely.', date: '2026-07-20', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 19 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 550, tierLabel: '15-Min Creatinine / eGFR Follow-up', description: 'Review of renal function tests, electrolyte balance, and medication refill.' },
      { durationMinutes: 30, fee: 950, tierLabel: '30-Min Standard Nephrology Consultation', description: 'Complete kidney health analysis, proteinuria assessment, ultrasound review, and dietary planning.' },
      { durationMinutes: 45, fee: 1350, tierLabel: '45-Min In-Depth CKD & Transplant Evaluation', description: 'Advanced renal failure management, dialysis planning, or pre-transplant workup.' }
    ]
  },
  // 16. ONCOLOGY & CANCER CARE - Hyderabad (Executive Specialist)
  {
    id: 16,
    name: 'Dr. N. Raghuram',
    gender: 'male',
    specialty: 'Oncologist',
    subSpecialty: 'Medical Oncology & Targeted Immunotherapy',
    degrees: 'MBBS, MD, DM (Medical Oncology, Tata Memorial)',
    qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology, Tata Memorial Hospital Mumbai), ESMO Certified',
    registrationNumber: 'TSMC-31940',
    experienceYears: 22,
    hospital: 'Basavatarakam Indo-American Cancer Hospital',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 10, Banjara Hills, Hyderabad, Telangana 500034',
    lat: 17.4215,
    lng: 78.4312,
    consultationFeeINR: 2000,
    priceTier: 'executive',
    rating: 5.0,
    reviewCount: 710,
    totalPatients: 6100,
    languages: ['English', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Tomorrow, 11:00 AM',
    nextAvailableSlot: 'Tomorrow, 11:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Distinguished Medical Oncologist with 22+ years experience. Expert in molecular oncology, genetic cancer risk assessments, targeted chemotherapies, and personalized immunotherapy protocols.',
    insuranceAccepted: ['All Major Cashless Providers', 'Star Health', 'ICICI Lombard', 'HDFC ERGO', 'Religare'],
    specialtiesCovered: ['Second Opinion', 'Breast Cancer Care', 'Lung Cancer Protocols', 'Immunotherapy Guidance', 'Cancer Screening'],
    clinicalInterests: ['Next-Gen Sequencing (NGS) Oncology', 'Immune Checkpoint Inhibitors', 'Personalized Chemotherapy'],
    practiceHistory: [
      { year: '2015 - Present', hospital: 'Basavatarakam Indo-American Cancer Hospital, Hyderabad', role: 'Director of Medical Oncology & Clinical Research', department: 'Department of Oncology', achievements: 'Headed major international phase-3 clinical trials in immunotherapy.' },
      { year: '2004 - 2015', hospital: 'Tata Memorial Centre, Mumbai', role: 'Professor of Medical Oncology', department: 'Medical Oncology', achievements: 'Pioneered precision molecular targeted therapy in India.' }
    ],
    certifications: [
      'European Society for Medical Oncology (ESMO) Certified',
      'American Society of Clinical Oncology (ASCO) Active Member',
      'Indian Society of Medical & Paediatric Oncology (ISMPO) Executive Fellow'
    ],
    patientReviews: [
      { id: 1601, reviewer: 'Venkat K.', rating: 5, comment: 'Dr. Raghuram gave us hope and a precise targeted therapy protocol that sent my father lymphoma into full remission. Words cannot express our gratitude.', date: '2026-08-16', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 54 },
      { id: 1602, reviewer: 'Swaroopa R.', rating: 5, comment: 'Extremely compassionate, listens to every detail, and explains complex biopsy reports in plain language.', date: '2026-07-28', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 41 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 20, fee: 1300, tierLabel: '20-Min Chemo / Lab Teleconsult Follow-up', description: 'Review of CBC, PET scan summary, side-effect management, and supportive prescriptions.' },
      { durationMinutes: 40, fee: 2000, tierLabel: '40-Min Executive Oncology Consultation', description: 'Comprehensive biopsy and NGS genomic review, staging analysis, and targeted treatment plan.' },
      { durationMinutes: 60, fee: 2800, tierLabel: '60-Min In-Depth Second Opinion & Immunotherapy Protocol', description: 'Multi-disciplinary tumor board review, second opinion on surgical/chemo options, and clinical trial matching.' }
    ]
  },
  // 17. RHEUMATOLOGY & ARTHRITIS - Jaipur
  {
    id: 17,
    name: 'Dr. Pooja Mathur',
    gender: 'female',
    specialty: 'Rheumatologist',
    subSpecialty: 'Autoimmune Diseases, Lupus & Rheumatoid Arthritis',
    degrees: 'MBBS, MD (Medicine), DM (Clinical Immunology & Rheumatology)',
    qualifications: 'MBBS, MD (Internal Medicine), DM (Rheumatology, SGPGI Lucknow)',
    registrationNumber: 'RMC-55912',
    experienceYears: 14,
    hospital: 'Fortis Escorts Hospital, Malviya Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Jawaharlal Nehru Marg, Malviya Nagar, Jaipur, Rajasthan 302017',
    lat: 26.8529,
    lng: 75.8052,
    consultationFeeINR: 850,
    priceTier: 'standard',
    rating: 4.9,
    reviewCount: 350,
    totalPatients: 2900,
    languages: ['English', 'Hindi', 'Rajasthani'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 05:00 PM',
    nextAvailableSlot: 'Today, 05:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in rheumatoid arthritis, systemic lupus erythematosus (SLE), ankylosing spondylitis, fibromyalgia, gout management, and biological therapy infusions.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Care Health', 'Bajaj Allianz'],
    specialtiesCovered: ['Rheumatoid Arthritis', 'Lupus (SLE)', 'Ankylosing Spondylitis', 'Gout / Uric Acid', 'Fibromyalgia'],
    clinicalInterests: ['Biologic DMARDs', 'Lupus Nephritis Remission', 'Ankylosing Spondylitis Mobility'],
    practiceHistory: [
      { year: '2019 - Present', hospital: 'Fortis Escorts Hospital, Jaipur', role: 'Head of Clinical Immunology & Rheumatology', department: 'Rheumatology', achievements: 'Managed over 3,000 cases of autoimmune joint disease.' },
      { year: '2012 - 2019', hospital: 'SMS Medical College, Jaipur', role: 'Assistant Professor of Medicine', department: 'Clinical Immunology', achievements: 'Established the early arthritis detection clinic.' }
    ],
    certifications: [
      'Indian Rheumatology Association (IRA) Fellow',
      'Asia Pacific League of Associations for Rheumatology (APLAR) Member',
      'Certified in Musculoskeletal Ultrasound in Rheumatology (EULAR)'
    ],
    patientReviews: [
      { id: 1701, reviewer: 'Sunil G.', rating: 5, comment: 'Dr. Pooja rescued my joints from severe rheumatoid morning stiffness with a tailored DMARD regimen.', date: '2026-08-10', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 22 },
      { id: 1702, reviewer: 'Manju S.', rating: 4.9, comment: 'Exceptional doctor for Lupus (SLE). Very meticulous in checking ANA and complement titers.', date: '2026-07-22', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 17 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 500, tierLabel: '15-Min Uric Acid / Joint Follow-up', description: 'Review of ESR/CRP inflammatory markers, gout flare medication, or refill.' },
      { durationMinutes: 30, fee: 850, tierLabel: '30-Min Standard Rheumatology Consultation', description: 'Comprehensive joint exam, autoantibody interpretation, and personalized DMARD therapy.' },
      { durationMinutes: 45, fee: 1200, tierLabel: '45-Min In-Depth Autoimmune & Biologics Review', description: 'Advanced SLE/Ankylosing Spondylitis evaluation, biologic infusion roadmap, and organ involvement monitoring.' }
    ]
  },
  // 18. GENERAL PHYSICIAN & AYURVEDA INTEGRATIVE - Kochi (Budget Community)
  {
    id: 18,
    name: 'Dr. Mathew Varghese',
    gender: 'male',
    specialty: 'General Physician',
    subSpecialty: 'Lifestyle Medicine & Chronic Disease Prevention',
    degrees: 'MBBS, MRCGP (INT), Dip. Lifestyle Medicine',
    qualifications: 'MBBS (GMC Trivandrum), MRCGP (International), Certified in Lifestyle Medicine',
    registrationNumber: 'TCMC-39182',
    experienceYears: 15,
    hospital: 'Aster Medcity, Cheranalloor',
    city: 'Kochi',
    state: 'Kerala',
    address: 'Kuttisahib Road, Near Kothad Bridge, South Chittoor, Kochi, Kerala 682027',
    lat: 10.0528,
    lng: 76.2731,
    consultationFeeINR: 400,
    priceTier: 'budget',
    rating: 4.9,
    reviewCount: 520,
    totalPatients: 4700,
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 10:00 AM',
    nextAvailableSlot: 'Today, 10:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Holistic family practitioner emphasizing heart-healthy nutrition, preventive lipid screening, stress mitigation, post-fever recovery, and metabolic health.',
    insuranceAccepted: ['Star Health', 'United India', 'New India Assurance', 'Care Health', 'Max Bupa'],
    specialtiesCovered: ['Preventive Health', 'Post-Viral Fatigue', 'Metabolic Syndrome', 'Routine Checkup', 'Hypertension'],
    clinicalInterests: ['Mediterranean & Kerala Diet Synergy', 'Cardiometabolic Prevention', 'Stress & Sleep Optimization'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Aster Medcity, Kochi', role: 'Senior Family Physician & Lifestyle Clinician', department: 'General Medicine', achievements: 'Conducted community lifestyle medicine workshops across Kerala.' },
      { year: '2011 - 2016', hospital: 'Lakeshore Hospital, Kochi', role: 'Consultant Physician', department: 'Internal Medicine', achievements: 'Focused on preventive primary care and infectious disease management.' }
    ],
    certifications: [
      'Member of Royal College of General Practitioners (MRCGP International)',
      'Diploma in Lifestyle Medicine (International Board of Lifestyle Medicine)',
      'IMA Kerala State Faculty'
    ],
    patientReviews: [
      { id: 1801, reviewer: 'Thomas P.', rating: 5, comment: 'Dr. Mathew approach to medicine is refreshing. He focused on sustainable diet and exercise adjustments while keeping medication minimal.', date: '2026-08-15', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 31 },
      { id: 1802, reviewer: 'Annamma K.', rating: 5, comment: 'Caring, soft-spoken, and very knowledgeable. Solved my post-viral weakness effectively.', date: '2026-07-29', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 20 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 250, tierLabel: '15-Min Quick Follow-up / Routine Refill', description: 'Review of BP/sugar readings, symptom check, and prescription extension.' },
      { durationMinutes: 30, fee: 400, tierLabel: '30-Min Standard General Physician Consult', description: 'Comprehensive medical assessment, physical examination, and holistic lifestyle plan.' },
      { durationMinutes: 45, fee: 600, tierLabel: '45-Min Complete Lifestyle & Metabolic Health Plan', description: 'Full dietary audit, cardio-metabolic risk analysis, sleep hygiene, and preventive longevity roadmap.' }
    ]
  },
  // 19. UROLOGY & ANDROLOGY - Lucknow
  {
    id: 19,
    name: 'Dr. Alok Srivastava',
    gender: 'male',
    specialty: 'Urologist',
    subSpecialty: 'Endourology, Laser Kidney Stones & Prostate Health',
    degrees: 'MBBS, MS (Surgery), MCh (Urology)',
    qualifications: 'MBBS, MS (General Surgery, KGMU), MCh (Urology, SGPGI Lucknow)',
    registrationNumber: 'UPMC-48209',
    experienceYears: 17,
    hospital: 'Medanta Hospital, Golf City, Amar Shaheed Path',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Sector B, Pocket 1, Amar Shaheed Path, Golf City, Lucknow, UP 226030',
    lat: 26.7824,
    lng: 80.9928,
    consultationFeeINR: 1000,
    priceTier: 'standard',
    rating: 4.8,
    reviewCount: 410,
    totalPatients: 3500,
    languages: ['English', 'Hindi', 'Urdu'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 12:30 PM',
    nextAvailableSlot: 'Today, 12:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Urologist with expertise in laser kidney stone removal (RIRS/PCNL), benign prostatic hyperplasia (BPH / enlarged prostate), urinary tract infections, and male health.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Care Health', 'Ayushman Bharat'],
    specialtiesCovered: ['Kidney Stones', 'Enlarged Prostate (BPH)', 'Urinary Incontinence', 'UTI Management', 'Men’s Health'],
    clinicalInterests: ['Holmium Laser Enucleation of Prostate (HoLEP)', 'Retrograde Intrarenal Surgery (RIRS)', 'Overactive Bladder'],
    practiceHistory: [
      { year: '2019 - Present', hospital: 'Medanta Hospital, Lucknow', role: 'Director of Urology & Renal Transplantation', department: 'Institute of Urology', achievements: 'Pioneered laser stone fragmentation and HoLEP in Uttar Pradesh.' },
      { year: '2012 - 2019', hospital: 'King George’s Medical University (KGMU), Lucknow', role: 'Associate Professor of Urology', department: 'Department of Urology', achievements: 'Authored surgical manuals on minimally invasive endourology.' }
    ],
    certifications: [
      'Urological Society of India (USI) National Member',
      'American Urological Association (AUA) International Fellow',
      'Certified in Advanced Laser Endourology'
    ],
    patientReviews: [
      { id: 1901, reviewer: 'Rameshwar T.', rating: 5, comment: 'Dr. Srivastava removed a 14mm kidney stone using laser with zero cuts and same-day discharge. Excellent surgeon.', date: '2026-08-11', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 27 },
      { id: 1902, reviewer: 'Mohd A.', rating: 4.8, comment: 'Great diagnosis for prostate issues. Explained all medication options clearly.', date: '2026-07-26', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 16 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 600, tierLabel: '15-Min Post-Procedure / UTI Follow-up', description: 'Review of urine culture, ultrasound KUB report, and antibiotic/maintenance dosage.' },
      { durationMinutes: 30, fee: 1000, tierLabel: '30-Min Standard Urological Consultation', description: 'Thorough evaluation of kidney stones, prostate symptoms (IPSS), and treatment roadmap.' },
      { durationMinutes: 45, fee: 1450, tierLabel: '45-Min In-Depth Laser Surgery & Prostate Workup', description: 'Detailed surgical planning for laser RIRS/HoLEP, uroflowmetry review, and recovery protocols.' }
    ]
  },
  // 20. CARDIOLOGY - Mumbai (Executive Super-Specialist)
  {
    id: 20,
    name: 'Dr. Farhan Merchant',
    gender: 'male',
    specialty: 'Cardiologist',
    subSpecialty: 'Heart Failure, TAVR & Preventive Cardiology',
    degrees: 'MBBS, MD, DM (Cardiology, KEM), FESC (Europe)',
    qualifications: 'MBBS, MD, DM (Cardiology), Fellow European Society of Cardiology',
    registrationNumber: 'MMC-58901',
    experienceYears: 23,
    hospital: 'Lilavati Hospital & Research Centre, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'A-791, Bandra Reclamation Rd, Bandra West, Mumbai, Maharashtra 400050',
    lat: 19.0514,
    lng: 72.8290,
    consultationFeeINR: 2200,
    priceTier: 'executive',
    rating: 5.0,
    reviewCount: 940,
    totalPatients: 8100,
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: false,
    nextSlot: 'Tomorrow, 02:00 PM',
    nextAvailableSlot: 'Tomorrow, 02:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Renowned Chief of Cardiology at Lilavati Hospital. Pioneer in non-surgical valve replacement (TAVR), complex coronary interventions, heart failure pacing, and executive cardiovascular screenings.',
    insuranceAccepted: ['All Cashless Insurers', 'Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Max Bupa', 'Bupa Global'],
    specialtiesCovered: ['Second Opinion', 'Heart Valve Disease', 'TAVR', 'Severe Heart Failure', 'Coronary Stenting'],
    clinicalInterests: ['Transcatheter Aortic Valve Replacement (TAVR)', 'Refractory Angina', 'Advanced Cardiac Imaging (Cardiac MRI)'],
    practiceHistory: [
      { year: '2012 - Present', hospital: 'Lilavati Hospital & Research Centre, Mumbai', role: 'Chairman & Director of Interventional Cardiology', department: 'Centre for Cardiovascular Sciences', achievements: 'Conducted over 12,000 successful coronary and structural heart procedures.' },
      { year: '2003 - 2012', hospital: 'KEM Hospital & Seth GS Medical College, Mumbai', role: 'Professor of Cardiology', department: 'Cardiology Department', achievements: 'Trained a generation of leading interventional cardiologists across India.' }
    ],
    certifications: [
      'Fellow of European Society of Cardiology (FESC)',
      'American College of Cardiology (FACC) Fellow',
      'Cardiological Society of India (CSI) National President Awardee',
      'Certified TAVR / Structural Heart Specialist'
    ],
    patientReviews: [
      { id: 2001, reviewer: 'Zubin M.', rating: 5, comment: 'Dr. Merchant performed a successful TAVR procedure for my 82-year-old father. His clinical prowess and composure are unmatched.', date: '2026-08-17', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 68 },
      { id: 2002, reviewer: 'Parul D.', rating: 5, comment: 'Best cardiologist in Mumbai hands down. Clear second opinion that prevented an unnecessary bypass surgery.', date: '2026-07-31', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 52 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 20, fee: 1500, tierLabel: '20-Min Executive Heart Follow-up', description: 'Review of Echo, ECG, Angiography CD summary, and medication titration.' },
      { durationMinutes: 40, fee: 2200, tierLabel: '40-Min Executive Cardiology Consultation', description: 'Comprehensive heart failure assessment, valve disease staging, and interventional planning.' },
      { durationMinutes: 60, fee: 3200, tierLabel: '60-Min In-Depth Second Opinion & TAVR Evaluation', description: 'Complete angiography review, surgical risk stratification, and multi-specialty structural roadmap.' }
    ]
  },
  // 21. DERMATOLOGY - New Delhi / Gurugram
  {
    id: 21,
    name: 'Dr. Radhika Sen',
    gender: 'female',
    specialty: 'Dermatologist',
    subSpecialty: 'Pediatric Dermatology & Laser Skin Therapeutics',
    degrees: 'MBBS, MD (Dermatology), DNB, FAM',
    qualifications: 'MBBS, MD (Dermatology, AIIMS New Delhi), Fellow in Cutaneous Lasers',
    registrationNumber: 'DMC-74198',
    experienceYears: 16,
    hospital: 'Fortis Memorial Research Institute (FMRI), Gurugram',
    city: 'New Delhi / Gurugram',
    state: 'Delhi NCR',
    address: 'Sector 44, Opposite HUDA City Centre, Gurugram, Haryana 122002',
    lat: 28.4595,
    lng: 77.0726,
    consultationFeeINR: 1100,
    priceTier: 'premium',
    rating: 4.9,
    reviewCount: 470,
    totalPatients: 3900,
    languages: ['English', 'Hindi', 'Bengali'],
    modes: ['video', 'in_clinic', 'chat'],
    availableNow: true,
    nextSlot: 'Today, 01:15 PM',
    nextAvailableSlot: 'Today, 01:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in difficult eczema, pediatric atopic dermatitis, melasma, rosacea, laser scar revision, and hair restoration therapies.',
    insuranceAccepted: ['Star Health', 'Max Bupa', 'HDFC ERGO', 'ICICI Lombard'],
    specialtiesCovered: ['Melasma / Pigmentation', 'Atopic Eczema', 'Rosacea', 'Hair Thinning', 'Skin Biopsies'],
    clinicalInterests: ['Pediatric Atopic Dermatitis', 'Melasma Depigmentation Protocols', 'Fractional CO2 Laser Therapy'],
    practiceHistory: [
      { year: '2017 - Present', hospital: 'Fortis Memorial Research Institute (FMRI), Gurugram', role: 'Senior Consultant Dermatologist', department: 'Dermatology & Aesthetic Sciences', achievements: 'Headed advanced cutaneous laser therapeutics.' },
      { year: '2010 - 2017', hospital: 'AIIMS, New Delhi', role: 'Assistant Professor in Dermatology', department: 'Department of Dermatology & Venereology', achievements: 'Conducted national research on resistant melasma.' }
    ],
    certifications: [
      'Indian Association of Dermatologists, Venereologists and Leprologists (IADVL) Fellow',
      'Fellowship in Aesthetic Medicine (FAM, Germany)',
      'Certified Pediatric Dermatologist (ISPD)'
    ],
    patientReviews: [
      { id: 2101, reviewer: 'Tanya S.', rating: 5, comment: 'Dr. Radhika solved my 5-year melasma struggle with a gentle, scientific skin barrier recovery plan. No harsh peeling!', date: '2026-08-13', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 32 },
      { id: 2102, reviewer: 'Aarav G.', rating: 5, comment: 'Excellent diagnosis on my child eczema. Skin cleared in two weeks.', date: '2026-07-25', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 21 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 650, tierLabel: '15-Min Quick Skin Rash & Rx Refill', description: 'Review of topical medication progress and minor skin reaction guidance.' },
      { durationMinutes: 30, fee: 1100, tierLabel: '30-Min Standard Dermatology Consult', description: 'Comprehensive full-face dermoscopy, melasma/acne grading, and customized treatment protocol.' },
      { durationMinutes: 45, fee: 1550, tierLabel: '45-Min In-Depth Laser & Pediatric Atopic Workup', description: 'Detailed laser scar consultation, allergy patch testing review, and barrier restoration roadmap.' }
    ]
  },
  // 22. GYNECOLOGY - Chandigarh
  {
    id: 22,
    name: 'Dr. Gurpreet Kaur',
    gender: 'female',
    specialty: 'Gynecologist',
    subSpecialty: 'Minimally Invasive Laparoscopy & Infertility',
    degrees: 'MBBS, MS (Obstetrics & Gynaecology), DNB, FICS',
    qualifications: 'MBBS, MS (OBG, PGI Chandigarh), Fellowship in Gynecologic Endoscopy',
    registrationNumber: 'PMC-38910',
    experienceYears: 17,
    hospital: 'Max Super Speciality Hospital, Mohali / Chandigarh',
    city: 'Chandigarh',
    state: 'Punjab / Chandigarh',
    address: 'Near Civil Hospital, Phase 6, Mohali, Punjab 160055',
    lat: 30.7188,
    lng: 76.7118,
    consultationFeeINR: 900,
    priceTier: 'standard',
    rating: 4.9,
    reviewCount: 510,
    totalPatients: 4300,
    languages: ['English', 'Punjabi', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:45 AM',
    nextAvailableSlot: 'Today, 11:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Gynecologist focused on PCOS hormonal balance, uterine fibroids, laparoscopic cystectomy, endometriosis management, and gentle natural birth protocols.',
    insuranceAccepted: ['Star Health', 'HDFC ERGO', 'Bajaj Allianz', 'United India', 'New India Assurance'],
    specialtiesCovered: ['PCOS & Ovulation', 'Uterine Fibroids', 'Endometriosis', 'Infertility Evaluation', 'Menstrual Irregularities'],
    clinicalInterests: ['Laparoscopic Myomectomy', 'PCOS Metabolic Management', 'Natural Delivery Protocols'],
    practiceHistory: [
      { year: '2016 - Present', hospital: 'Max Super Speciality Hospital, Mohali', role: 'Senior Consultant Gynecologist & Laparoscopic Surgeon', department: 'Obstetrics & Gynaecology', achievements: 'Performed over 1,500 laparoscopic fibroid removals and natural deliveries.' },
      { year: '2009 - 2016', hospital: 'PGIMER, Chandigarh', role: 'Assistant Professor in OBG', department: 'Department of Obstetrics & Gynaecology', achievements: 'Conducted clinical trials on fertility optimization in PCOS.' }
    ],
    certifications: [
      'Fellow of International College of Surgeons (FICS)',
      'Indian Association of Gynaecological Endoscopists (IAGE) Member',
      'FOGSI Certified Laparoscopic Surgeon'
    ],
    patientReviews: [
      { id: 2201, reviewer: 'Simran K.', rating: 5, comment: 'Dr. Gurpreet is an angel. She successfully removed my uterine fibroid through laparoscopy with minimal recovery time.', date: '2026-08-14', verified: true, consultationType: 'In-Clinic Hospital Visit', helpfulCount: 35 },
      { id: 2202, reviewer: 'Jaspreet B.', rating: 5, comment: 'Very reassuring guidance throughout my pregnancy. Highly professional and warm.', date: '2026-07-28', verified: true, consultationType: 'Video Teleconsult', helpfulCount: 23 }
    ],
    consultationDurationPricing: [
      { durationMinutes: 15, fee: 550, tierLabel: '15-Min Quick Antenatal / Scan Review', description: 'Review of fetal growth scan, blood reports, or prescription renewal.' },
      { durationMinutes: 30, fee: 900, tierLabel: '30-Min Standard Gynecological Consult', description: 'Comprehensive consultation for PCOS, fibroids, irregular cycles, and pelvic health.' },
      { durationMinutes: 45, fee: 1300, tierLabel: '45-Min Laparoscopy & Infertility Workup', description: 'Detailed surgical evaluation for fibroids/endometriosis, HSG review, and fertility planning.' }
    ]
  }
];

export function getCitiesList(): string[] {
  return [
    'All Cities',
    'New Delhi / Gurugram',
    'Bengaluru',
    'Mumbai',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Kochi',
    'Lucknow',
    'Chandigarh'
  ];
}

export function getSpecialtiesList(): string[] {
  return [
    'All Specialties',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Psychiatrist',
    'Orthopedic',
    'Pulmonologist',
    'Gynecologist',
    'Gastroenterologist',
    'Pediatrician',
    'Endocrinologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Nephrologist',
    'Oncologist',
    'Rheumatologist',
    'Urologist'
  ];
}
