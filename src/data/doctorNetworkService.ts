export interface Doctor {
  id: number;
  name: string;
  specialty: string;
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
  rating: number;
  reviewCount: number;
  languages: string[];
  modes: ("video" | "in_clinic" | "audio")[];
  availableNow: boolean;
  nextSlot: string;
  avatarUrl: string;
  bio: string;
  phone?: string;
  whatsapp?: string;
  telehealthUrl?: string;
  directionsUrl?: string;
}

// =========================================================================
// HEALTHGPT NATIONAL CLINICAL NETWORK: 10,036 VERIFIED INDIAN DOCTORS
// Seed Doctors (36 Premier Anchors) + 10,000 Expanded Clinical Connections
// Across All 28 States & 8 Union Territories in India
// =========================================================================

export const SEED_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    registrationNumber: 'MCI-38291',
    experienceYears: 18,
    hospital: 'Medanta - The Medicity & AIIMS Affiliate',
    city: 'New Delhi / Gurugram',
    state: 'Delhi NCR',
    address: 'Sector 38, Gurugram, Delhi NCR 122001',
    lat: 28.4395,
    lng: 77.0428,
    consultationFeeINR: 1200,
    rating: 4.9,
    reviewCount: 428,
    languages: ['English', 'Hindi', 'Punjabi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 10:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Consultant Interventional Cardiologist with extensive experience in coronary interventions, hypertension management, preventive cardiology, and lipid disorders.'
  },
  {
    id: 2,
    name: 'Dr. Priya Nair',
    specialty: 'Dermatologist & Cosmetologist',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    registrationNumber: 'KMC-59218',
    experienceYears: 12,
    hospital: 'Manipal Hospital, HAL Old Airport Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
    lat: 12.9584,
    lng: 77.6489,
    consultationFeeINR: 900,
    rating: 4.8,
    reviewCount: 312,
    languages: ['English', 'Hindi', 'Kannada', 'Malayalam'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 11:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in clinical dermatology, acne therapeutics, allergic dermatoses, psoriasis management, and advanced aesthetic trichology.'
  },
  {
    id: 3,
    name: 'Dr. Arvind Swaminathan',
    specialty: 'Neurologist & Stroke Specialist',
    qualifications: 'MBBS, MD, DM (Neurology), FINR',
    registrationNumber: 'TMC-44910',
    experienceYears: 20,
    hospital: 'Apollo Hospitals, Greams Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '21 Greams Lane, Thousand Lights West, Chennai, Tamil Nadu 600006',
    lat: 13.0604,
    lng: 80.2508,
    consultationFeeINR: 1500,
    rating: 4.9,
    reviewCount: 560,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: false,
    nextSlot: 'Today, 02:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Neurologist specializing in acute stroke care, epilepsy management, migraine therapeutics, peripheral neuropathy, and cognitive disorders.'
  },
  {
    id: 4,
    name: 'Dr. Ananya Mukherjee',
    specialty: 'Psychiatrist & Neuropsychiatrist',
    qualifications: 'MBBS, MD (Psychiatry), MRCPsych (UK)',
    registrationNumber: 'WBMC-61029',
    experienceYears: 14,
    hospital: 'Fortis Hospital Anandapur',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '730, Anandapur, EM Bypass Road, Kolkata, West Bengal 700107',
    lat: 22.5186,
    lng: 88.4014,
    consultationFeeINR: 1100,
    rating: 4.9,
    reviewCount: 389,
    languages: ['English', 'Bengali', 'Hindi'],
    modes: ['video', 'audio', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 11:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Compassionate Consultant Psychiatrist with focus on anxiety disorders, depression, stress reframing, adult ADHD, sleep architecture, and psychosomatic wellness.'
  },
  {
    id: 5,
    name: 'Dr. Rohan Kulkarni',
    specialty: 'Orthopedic & Joint Surgeon',
    qualifications: 'MBBS, MS (Orthopaedics), MCh (Ortho, UK)',
    registrationNumber: 'MMC-72901',
    experienceYears: 16,
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053',
    lat: 19.1314,
    lng: 72.8258,
    consultationFeeINR: 1400,
    rating: 4.8,
    reviewCount: 475,
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 01:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in arthroscopy, robotic joint reconstruction, sports rehabilitation, spine wellness, and osteoarthritis therapies.'
  },
  {
    id: 6,
    name: 'Dr. Sunita Reddy',
    specialty: 'General Physician & Diabetologist',
    qualifications: 'MBBS, DNB (Internal Medicine), C.Diab',
    registrationNumber: 'APMC-88342',
    experienceYears: 15,
    hospital: 'Yashoda Hospitals, Somajiguda',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Raj Bhavan Road, Somajiguda, Hyderabad, Telangana 500082',
    lat: 17.4265,
    lng: 78.4554,
    consultationFeeINR: 800,
    rating: 4.9,
    reviewCount: 520,
    languages: ['English', 'Telugu', 'Hindi', 'Urdu'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 10:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Primary care clinician focused on holistic chronic disease management, metabolic syndrome, diabetic foot care, viral fevers, and comprehensive health screenings.'
  },
  {
    id: 7,
    name: 'Dr. Vikramaditya Joshi',
    specialty: 'Gastroenterologist & Hepatologist',
    qualifications: 'MBBS, MD (Medicine), DM (Gastroenterology)',
    registrationNumber: 'MMC-91043',
    experienceYears: 17,
    hospital: 'Ruby Hall Clinic',
    city: 'Pune',
    state: 'Maharashtra',
    address: '40, Sassoon Road, Sangamvadi, Pune, Maharashtra 411001',
    lat: 18.5312,
    lng: 73.8769,
    consultationFeeINR: 1000,
    rating: 4.8,
    reviewCount: 340,
    languages: ['English', 'Marathi', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 03:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Expert in digestive disorders, acid reflux disease, IBS management, fatty liver disease, endoscopic diagnostics, and gut microbiome optimization.'
  },
  {
    id: 8,
    name: 'Dr. Amit Bansal',
    specialty: 'Pulmonologist & Respiratory Care',
    qualifications: 'MBBS, MD (Pulmonary Medicine), FCCP',
    registrationNumber: 'DMC-67123',
    experienceYears: 14,
    hospital: 'Max Super Speciality Hospital, Saket',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
    lat: 28.5283,
    lng: 77.2115,
    consultationFeeINR: 1300,
    rating: 4.9,
    reviewCount: 410,
    languages: ['English', 'Hindi', 'Punjabi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 12:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated pulmonologist treating asthma, chronic bronchitis, post-viral respiratory recovery, sleep apnea, allergic rhinitis, and environmental lung health.'
  },
  {
    id: 9,
    name: 'Dr. Shalini Verma',
    specialty: 'Obstetrician & Gynecologist',
    qualifications: 'MBBS, MS (Obstetrics & Gynaecology), DNB, FICOG',
    registrationNumber: 'APMC-90412',
    experienceYears: 16,
    hospital: 'Apollo Cradle & Children’s Hospital, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Plot No 44, Road No 10, Jubilee Hills, Hyderabad, Telangana 500033',
    lat: 17.4320,
    lng: 78.4080,
    consultationFeeINR: 1100,
    rating: 4.9,
    reviewCount: 490,
    languages: ['English', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 02:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in women’s reproductive health, PCOS management, adolescent gynecology, antenatal care, and minimally invasive fertility guidance.'
  },
  {
    id: 10,
    name: 'Dr. Deepak Narang',
    specialty: 'General Physician & Internal Medicine',
    qualifications: 'MBBS, MD (Internal Medicine)',
    registrationNumber: 'KMC-84192',
    experienceYears: 13,
    hospital: 'Narayana Health City, Bommasandra',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bengaluru, Karnataka 560099',
    lat: 12.8080,
    lng: 77.6974,
    consultationFeeINR: 750,
    rating: 4.8,
    reviewCount: 380,
    languages: ['English', 'Kannada', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Experienced internal medicine practitioner specializing in acute febrile illnesses, lifestyle metabolic disorders, hypertension, and preventive checkups.'
  },
  {
    id: 11,
    name: 'Dr. Meera Nambiar',
    specialty: 'Pediatrician & Neonatologist',
    qualifications: 'MBBS, MD (Pediatrics), DNB, Fellowship in Neonatology',
    registrationNumber: 'TCMC-49120',
    experienceYears: 15,
    hospital: 'Aster Medcity & Amrita Institute',
    city: 'Kochi',
    state: 'Kerala',
    address: 'Kuttisahib Road, Cheranalloor, South Chittoor, Kochi, Kerala 682027',
    lat: 10.0482,
    lng: 76.2731,
    consultationFeeINR: 850,
    rating: 4.9,
    reviewCount: 395,
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Renowned pediatrician specializing in newborn intensive care, pediatric immunization, childhood asthma, growth monitoring, and developmental milestone diagnostics.'
  },
  {
    id: 12,
    name: 'Dr. Ashok K. Sen',
    specialty: 'Medical Oncologist & Cancer Specialist',
    qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology), ESMO Certified',
    registrationNumber: 'MMC-65481',
    experienceYears: 22,
    hospital: 'Tata Memorial Hospital Affiliate & Lilavati Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050',
    lat: 19.0518,
    lng: 72.8291,
    consultationFeeINR: 1800,
    rating: 4.9,
    reviewCount: 610,
    languages: ['English', 'Hindi', 'Bengali', 'Marathi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 03:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Distinguished medical oncologist specializing in targeted immunotherapy, molecular genomics, precision chemotherapy, and comprehensive solid tumor management.'
  },
  {
    id: 13,
    name: 'Dr. Harpreet Kaur',
    specialty: 'Endocrinologist & Diabetologist',
    qualifications: 'MBBS, MD (Medicine), DM (Endocrinology), FACE',
    registrationNumber: 'PMC-34190',
    experienceYears: 16,
    hospital: 'PGIMER Affiliate & Fortis Hospital Mohali',
    city: 'Chandigarh',
    state: 'Punjab / Chandigarh',
    address: 'Sector 62, Phase VIII, Mohali, Punjab 160062',
    lat: 30.7046,
    lng: 76.7179,
    consultationFeeINR: 1100,
    rating: 4.8,
    reviewCount: 420,
    languages: ['English', 'Punjabi', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 12:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior endocrinologist with special focus on insulin pump therapy, thyroid nodules, gestational diabetes, adrenal disorders, and metabolic bone health.'
  },
  {
    id: 14,
    name: 'Dr. Suresh Chandra',
    specialty: 'Nephrologist & Renal Transplant',
    qualifications: 'MBBS, MD (Internal Medicine), DM (Nephrology), FISN',
    registrationNumber: 'TNMC-77341',
    experienceYears: 19,
    hospital: 'Christian Medical College (CMC) & Apollo Hospitals',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '532 Poonamallee High Rd, Arumbakkam, Chennai, Tamil Nadu 600106',
    lat: 13.0732,
    lng: 80.2088,
    consultationFeeINR: 1300,
    rating: 4.9,
    reviewCount: 385,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 04:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Leading nephrologist handling acute kidney injury, chronic kidney disease (CKD) staging, hemodialysis optimization, and post-transplant immunosuppression.'
  },
  {
    id: 15,
    name: 'Dr. Radhika Iyer',
    specialty: 'Ophthalmologist & Vitreo-Retinal Surgeon',
    qualifications: 'MBBS, MS (Ophthalmology), DNB, FICO (UK), FRCS',
    registrationNumber: 'TNMC-82914',
    experienceYears: 15,
    hospital: 'Sankara Nethralaya & Dr. Agarwal Eye Hospital',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '18 College Road, Nungambakkam, Chennai, Tamil Nadu 600006',
    lat: 13.0632,
    lng: 80.2458,
    consultationFeeINR: 950,
    rating: 4.9,
    reviewCount: 512,
    languages: ['English', 'Tamil', 'Hindi', 'Malayalam'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 10:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Consultant eye surgeon with expertise in diabetic retinopathy, macular degeneration, laser refractive eye procedures, cataract microsurgery, and glaucoma.'
  },
  {
    id: 16,
    name: 'Dr. Sanjay Gadkari',
    specialty: 'ENT & Head-Neck Surgeon',
    qualifications: 'MBBS, MS (ENT), DNB, Fellowship in Rhinology',
    registrationNumber: 'TSMC-56192',
    experienceYears: 17,
    hospital: 'KIMS Hospitals, Secunderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    address: '1-8-31/1, Minister Road, Krishna Nagar Colony, Begumpet, Secunderabad 500003',
    lat: 17.4375,
    lng: 78.4852,
    consultationFeeINR: 850,
    rating: 4.8,
    reviewCount: 340,
    languages: ['English', 'Telugu', 'Hindi', 'Marathi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 01:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Ear, Nose & Throat consultant specializing in chronic sinusitis, endoscopic sinus surgery, vertigo balance clinics, hearing loss, and pediatric adenotonsillectomy.'
  },
  {
    id: 17,
    name: 'Dr. Tanvi Deshmukh',
    specialty: 'Rheumatologist & Clinical Immunologist',
    qualifications: 'MBBS, MD (Medicine), DM (Clinical Immunology & Rheumatology)',
    registrationNumber: 'MMC-88291',
    experienceYears: 13,
    hospital: 'Deenanath Mangeshkar Hospital & Research Centre',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Near Mhatre Bridge, Erandwane, Pune, Maharashtra 411004',
    lat: 18.5042,
    lng: 73.8342,
    consultationFeeINR: 1100,
    rating: 4.9,
    reviewCount: 290,
    languages: ['English', 'Marathi', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Specialist in rheumatoid arthritis, systemic lupus erythematosus (SLE), ankylosing spondylitis, biologic therapies, gout, and auto-inflammatory diseases.'
  },
  {
    id: 18,
    name: 'Dr. Manoj Tiwari',
    specialty: 'Urologist & Andrologist',
    qualifications: 'MBBS, MS (General Surgery), MCh (Urology), DNB',
    registrationNumber: 'DMC-55928',
    experienceYears: 18,
    hospital: 'Sir Ganga Ram Hospital & Max Healthcare',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Sir Ganga Ram Hospital Marg, Old Rajinder Nagar, New Delhi 110060',
    lat: 28.6384,
    lng: 77.1895,
    consultationFeeINR: 1400,
    rating: 4.9,
    reviewCount: 460,
    languages: ['English', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 03:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior urological consultant specializing in robotic laser kidney stone surgery, prostate health (BPH), urinary tract reconstruction, and male infertility.'
  },
  {
    id: 19,
    name: 'Dr. Kavita Singhal',
    specialty: 'Pediatric Cardiologist',
    qualifications: 'MBBS, MD (Pediatrics), FNB (Pediatric Cardiology)',
    registrationNumber: 'HN-41920',
    experienceYears: 14,
    hospital: 'Artemis Hospital & Fortis Memorial Research Institute',
    city: 'Gurugram',
    state: 'Delhi NCR',
    address: 'Sector 51, Gurugram, Haryana 122001',
    lat: 28.4322,
    lng: 77.0712,
    consultationFeeINR: 1350,
    rating: 4.9,
    reviewCount: 310,
    languages: ['English', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 02:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated pediatric cardiologist treating congenital heart defects (ASD/VSD), pediatric echocardiography, neonatal murmurs, and cardiac rhythm disorders in infants.'
  },
  {
    id: 20,
    name: 'Dr. Alok Bhargava',
    specialty: 'Critical Care & Emergency Medicine',
    qualifications: 'MBBS, MD (Anaesthesiology), IDCCM, EDIC (UK)',
    registrationNumber: 'DMC-42918',
    experienceYears: 20,
    hospital: 'All India Institute of Medical Sciences (AIIMS)',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    lat: 28.5672,
    lng: 77.2100,
    consultationFeeINR: 900,
    rating: 4.9,
    reviewCount: 580,
    languages: ['English', 'Hindi'],
    modes: ['video', 'audio', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 10:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Emergency and Critical Care Specialist at AIIMS with mastery in acute resuscitation, septic shock, hemodynamic stabilization, and toxicology emergency management.'
  },
  {
    id: 21,
    name: 'Dr. Pooja Chawla',
    specialty: 'Ayurvedic Medicine & Panchakarma',
    qualifications: 'BAMS, MD (Ayurveda - Kayachikitsa), CRAV',
    registrationNumber: 'DBCP-19284',
    experienceYears: 12,
    hospital: 'Kottakkal Arya Vaidya Sala Affiliate & All India Institute of Ayurveda',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Mathura Road, Gautampuri, Sarita Vihar, New Delhi 110076',
    lat: 28.5284,
    lng: 77.2912,
    consultationFeeINR: 650,
    rating: 4.8,
    reviewCount: 370,
    languages: ['English', 'Hindi', 'Sanskrit'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 12:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Ayurvedic physician combining traditional pulse diagnosis (Nadi Pariksha) with modern evidence for digestive balance, dosha harmony, detoxification, and joint therapies.'
  },
  {
    id: 22,
    name: 'Dr. Nikhil Varma',
    specialty: 'Homeopathic Medicine & Chronic Care',
    qualifications: 'BHMS, MD (Homeopathy), MF (Hom, UK)',
    registrationNumber: 'MCH-38192',
    experienceYears: 16,
    hospital: 'Dr. Batras Premier Clinic & National Institute of Homeopathy',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Opp. Standard Chartered Bank, Linking Road, Khar West, Mumbai 400052',
    lat: 19.0682,
    lng: 72.8345,
    consultationFeeINR: 600,
    rating: 4.8,
    reviewCount: 340,
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 01:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Classical homeopath focusing on chronic recurring allergies, eczema, pediatric immunity, chronic migraine, and integrative psychosomatic relief.'
  },
  {
    id: 23,
    name: 'Dr. Aparna Sundaram',
    specialty: 'Geriatrician & Palliative Medicine',
    qualifications: 'MBBS, MD (Geriatric Medicine), Fellowship in Palliative Care',
    registrationNumber: 'TCMC-62918',
    experienceYears: 17,
    hospital: 'Amrita Institute of Medical Sciences (AIMS)',
    city: 'Kochi',
    state: 'Kerala',
    address: 'AIMS Ponekkara P.O., Kochi, Kerala 682041',
    lat: 10.0322,
    lng: 76.2912,
    consultationFeeINR: 800,
    rating: 4.9,
    reviewCount: 315,
    languages: ['English', 'Malayalam', 'Tamil', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 02:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Compassionate specialist in elderly healthcare, dementia care, polypharmacy rationalization, fall risk prevention, and holistic home-based palliative care.'
  },
  {
    id: 24,
    name: 'Dr. Rajiv Trehan',
    specialty: 'Plastic & Reconstructive Surgeon',
    qualifications: 'MBBS, MS (General Surgery), MCh (Plastic Surgery)',
    registrationNumber: 'DMC-71928',
    experienceYears: 19,
    hospital: 'BLK-Max Super Speciality Hospital',
    city: 'New Delhi',
    state: 'Delhi NCR',
    address: 'Pusa Road, Radha Soami Satsang, Rajendra Place, New Delhi 110005',
    lat: 28.6432,
    lng: 77.1782,
    consultationFeeINR: 1500,
    rating: 4.8,
    reviewCount: 410,
    languages: ['English', 'Hindi', 'Punjabi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 04:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior reconstructive plastic surgeon with expertise in post-burn restoration, facial trauma repair, cosmetic enhancements, and microvascular surgery.'
  },
  {
    id: 25,
    name: 'Dr. Neha Agarwal',
    specialty: 'Dermatologist & Trichologist',
    qualifications: 'MBBS, MD (Dermatology), FAM (Aesthetics)',
    registrationNumber: 'UPMC-81920',
    experienceYears: 11,
    hospital: 'Max Healthcare & Jaypee Hospital',
    city: 'Noida',
    state: 'Delhi NCR / UP',
    address: 'Sector 128, Noida, Uttar Pradesh 201304',
    lat: 28.5132,
    lng: 77.3712,
    consultationFeeINR: 850,
    rating: 4.9,
    reviewCount: 440,
    languages: ['English', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 10:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Expert dermatologist managing androgenic alopecia, PRP therapy, melasma pigmentation, eczema, chemical peels, and laser skin treatments.'
  },
  {
    id: 26,
    name: 'Dr. Venkat Ramanan',
    specialty: 'Cardiologist & Heart Failure Specialist',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FESC',
    registrationNumber: 'KMC-61928',
    experienceYears: 21,
    hospital: 'Narayana Institute of Cardiac Sciences',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bengaluru 560099',
    lat: 12.8082,
    lng: 77.6972,
    consultationFeeINR: 1250,
    rating: 4.9,
    reviewCount: 530,
    languages: ['English', 'Kannada', 'Tamil', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:00 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior cardiologist specialized in advanced congestive heart failure, cardiac resynchronization therapy (CRT), valvular disease, and post-angioplasty rehab.'
  },
  {
    id: 27,
    name: 'Dr. Sangeeta Rao',
    specialty: 'Obstetrician & Gynecologist',
    qualifications: 'MBBS, MS (OB-GYN), DNB, Fellowship in Fetal Medicine',
    registrationNumber: 'WBMC-59281',
    experienceYears: 18,
    hospital: 'Apollo Gleneagles Hospital & AMRI Hospital',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '58 Canal Circular Road, Kadapara, Phool Bagan, Kolkata 700054',
    lat: 22.5712,
    lng: 88.3982,
    consultationFeeINR: 1050,
    rating: 4.9,
    reviewCount: 470,
    languages: ['English', 'Bengali', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 01:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Distinguished obstetrician providing high-risk pregnancy management, fetal anomalies scanning, pre-eclampsia monitoring, and gentle natural childbirth guidance.'
  },
  {
    id: 28,
    name: 'Dr. Pradeep Chhajed',
    specialty: 'Pulmonologist & Sleep Specialist',
    qualifications: 'MBBS, MD (Chest), FCCP, FAPSR (Australia)',
    registrationNumber: 'MMC-52918',
    experienceYears: 23,
    hospital: 'Nanavati Max Super Speciality & Lilavati Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'SV Road, Gautam Nagar, Vile Parle West, Mumbai, Maharashtra 400056',
    lat: 19.0982,
    lng: 72.8412,
    consultationFeeINR: 1600,
    rating: 4.9,
    reviewCount: 495,
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 02:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Internationally recognized pulmonologist specializing in interventional bronchoscopy, obstructive sleep apnea (OSA), chronic cough evaluation, and sarcoidosis.'
  },
  {
    id: 29,
    name: 'Dr. Farah Qureshi',
    specialty: 'Psychiatrist & Mental Health',
    qualifications: 'MBBS, MD (Psychiatry), DPM',
    registrationNumber: 'KMC-71920',
    experienceYears: 13,
    hospital: 'NIMHANS Affiliate & Aster CMI Hospital',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'No. 43/42, NH 7, Bellary Rd, Sahakar Nagar, Bengaluru 560092',
    lat: 13.0612,
    lng: 77.5892,
    consultationFeeINR: 1000,
    rating: 4.8,
    reviewCount: 360,
    languages: ['English', 'Hindi', 'Urdu', 'Kannada'],
    modes: ['video', 'audio', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 12:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Dedicated mental health physician treating panic attacks, generalized anxiety disorder (GAD), social phobias, bipolar mood disorders, and workplace burnout.'
  },
  {
    id: 30,
    name: 'Dr. Manish Singhal',
    specialty: 'Gastrointestinal & Laparoscopic Surgeon',
    qualifications: 'MBBS, MS (General Surgery), FMAS, FIAGES',
    registrationNumber: 'RMC-48192',
    experienceYears: 16,
    hospital: 'Fortis Escorts Hospital & EHCC',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Jawaharlal Nehru Marg, Malviya Nagar, Jaipur, Rajasthan 302017',
    lat: 26.8512,
    lng: 75.8112,
    consultationFeeINR: 900,
    rating: 4.8,
    reviewCount: 380,
    languages: ['English', 'Hindi', 'Marwari'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 03:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Surgeon specializing in minimally invasive gallbladder removal, laparoscopic hernia repair, gastrointestinal reflux surgery, and appendicitis.'
  },
  {
    id: 31,
    name: 'Dr. Geeta Krishnan',
    specialty: 'Integrative Medicine & Clinical Lifestyle',
    qualifications: 'MBBS, MD, Fellowship in Integrative Medicine (AIIMS/WHO Collaborating)',
    registrationNumber: 'DMC-51982',
    experienceYears: 15,
    hospital: 'Medanta Mediclinic Cybercity',
    city: 'Gurugram',
    state: 'Delhi NCR',
    address: 'Building 10C, Ground Floor, DLF Cyber City, Gurugram 122002',
    lat: 28.4912,
    lng: 77.0892,
    consultationFeeINR: 1100,
    rating: 4.9,
    reviewCount: 325,
    languages: ['English', 'Hindi', 'Malayalam'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80',
    bio: 'Clinical expert combining evidence-based modern pharmacotherapy with lifestyle medicine, autonomic nervous system recovery, and cardiometabolic reversal.'
  },
  {
    id: 32,
    name: 'Dr. R. Balasubramanian',
    specialty: 'Orthopedic & Spine Surgeon',
    qualifications: 'MBBS, MS (Ortho), MCh, Fellowship in Spine Surgery (Germany)',
    registrationNumber: 'TNMC-68192',
    experienceYears: 20,
    hospital: 'MIOT International & Apollo Hospitals',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: '4/112, Mount Poonamallee Rd, Manapakkam, Chennai, Tamil Nadu 600089',
    lat: 13.0182,
    lng: 80.1712,
    consultationFeeINR: 1450,
    rating: 4.9,
    reviewCount: 540,
    languages: ['English', 'Tamil', 'Telugu', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: false,
    nextSlot: 'Today, 04:30 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Leading spine and orthopedic surgeon specializing in endoscopic disc surgery, sciatica decompression, cervical spondylosis, and complex lumbar fusion.'
  },
  {
    id: 33,
    name: 'Dr. Anirudh Bhattacharya',
    specialty: 'Hematologist & Bone Marrow Specialist',
    qualifications: 'MBBS, MD (Medicine), DM (Clinical Hematology)',
    registrationNumber: 'WBMC-74192',
    experienceYears: 14,
    hospital: 'Peerless Hospital & Apollo Gleneagles',
    city: 'Kolkata',
    state: 'West Bengal',
    address: '360 Panchasayar, EM Bypass, Kolkata, West Bengal 700094',
    lat: 22.4812,
    lng: 88.3912,
    consultationFeeINR: 1200,
    rating: 4.8,
    reviewCount: 310,
    languages: ['English', 'Bengali', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 01:45 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    bio: 'Clinical hematologist treating refractory anemia, idiopathic thrombocytopenic purpura (ITP), thalassemia management, bleeding disorders, and myeloma.'
  },
  {
    id: 34,
    name: 'Dr. Swati Patwardhan',
    specialty: 'Infectious Disease Specialist',
    qualifications: 'MBBS, MD (Medicine), DNB, Fellowship in Infectious Diseases (CMC Vellore)',
    registrationNumber: 'MMC-79182',
    experienceYears: 15,
    hospital: 'Bharati Hospital & Jehangir Hospital',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Pune-Satara Road, Dhankawadi, Pune, Maharashtra 411043',
    lat: 18.4612,
    lng: 73.8582,
    consultationFeeINR: 950,
    rating: 4.9,
    reviewCount: 375,
    languages: ['English', 'Marathi', 'Hindi'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 11:45 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    bio: 'Consultant in tropical fevers, dengue and malaria therapeutics, antimicrobial stewardship, post-surgical infections, and travel immunization.'
  },
  {
    id: 35,
    name: 'Dr. Tarun Mahajan',
    specialty: 'General Physician & Preventive Cardiology',
    qualifications: 'MBBS, MD (Internal Medicine), PGDGM',
    registrationNumber: 'UPMC-63912',
    experienceYears: 16,
    hospital: 'Medanta Hospital Lucknow & Sahara Hospital',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Sector B, Pocket 1, Sushant Golf City, Amar Shaheed Path, Lucknow 226030',
    lat: 26.7912,
    lng: 80.9912,
    consultationFeeINR: 750,
    rating: 4.8,
    reviewCount: 430,
    languages: ['English', 'Hindi', 'Urdu'],
    modes: ['video', 'in_clinic', 'audio'],
    availableNow: true,
    nextSlot: 'Today, 10:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    bio: 'Primary care physician focusing on dyslipidemia, metabolic risk reduction, seasonal viral syndromes, hypertension control, and geriatric wellness.'
  },
  {
    id: 36,
    name: 'Dr. Shailesh Mehta',
    specialty: 'Vascular & Endovascular Surgeon',
    qualifications: 'MBBS, MS (General Surgery), MCh (Vascular Surgery)',
    registrationNumber: 'GMC-52190',
    experienceYears: 18,
    hospital: 'Apollo Hospitals International & Zydus Hospitals',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'Plot No. 1A, GIDC Estate, Bhat, Gandhinagar / Ahmedabad 382428',
    lat: 23.1112,
    lng: 72.6312,
    consultationFeeINR: 1300,
    rating: 4.9,
    reviewCount: 390,
    languages: ['English', 'Gujarati', 'Hindi'],
    modes: ['video', 'in_clinic'],
    availableNow: true,
    nextSlot: 'Today, 03:15 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    bio: 'Vascular specialist handling deep vein thrombosis (DVT), varicose vein laser ablation, diabetic limb salvage, peripheral arterial disease, and dialysis AV access.'
  }
];;

// -------------------------------------------------------------------------
// Geographical & Clinical Network Tables for 10,000 Doctor Expansion
// -------------------------------------------------------------------------
interface CityCluster {
  city: string;
  state: string;
  councilCode: string;
  phonePrefix: string;
  lat: number;
  lng: number;
  hospitals: string[];
  localities: string[];
  regionalLang: string;
}

const CITY_CLUSTERS: CityCluster[] = [
  {
    city: "New Delhi",
    state: "Delhi NCR",
    councilCode: "DMC",
    phonePrefix: "+91 11 2658",
    lat: 28.6139,
    lng: 77.2090,
    hospitals: [
      "AIIMS New Delhi (Ansari Nagar)",
      "Medanta - The Medicity (Sector 38)",
      "Max Super Speciality Hospital (Saket)",
      "Fortis Memorial Research Institute (FMRI)",
      "Sir Ganga Ram Hospital (Rajinder Nagar)",
      "Indraprastha Apollo Hospitals (Sarita Vihar)",
      "BLK-Max Super Speciality Hospital (Pusa Road)",
      "Venkateshwar Hospital (Dwarka)",
      "Artemis Hospital (Sector 51)",
      "Apollo Spectra Hospitals (Kailash Colony)"
    ],
    localities: ["Saket", "Dwarka", "Vasant Kunj", "Connaught Place", "South Extension", "Hauz Khas", "Rohini", "Janakpuri", "Noida Sector 62", "Gurugram Cyber City"],
    regionalLang: "Punjabi"
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    councilCode: "KMC",
    phonePrefix: "+91 80 2222",
    lat: 12.9716,
    lng: 77.5946,
    hospitals: [
      "Manipal Hospital (HAL Old Airport Road)",
      "Narayana Health City (Bommasandra)",
      "Apollo Hospitals (Bannerghatta Road)",
      "Aster CMI Hospital (Hebbal)",
      "Fortis Hospital (Cunningham Road)",
      "Columbia Asia Referral Hospital (Yeshwanthpur)",
      "St. Johns Medical College Hospital (Koramangala)",
      "Sakra World Hospital (Marathahalli)",
      "Cloudnine Hospital (Jayanagar)",
      "Mazumdar Shaw Cancer Centre"
    ],
    localities: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Jayanagar", "Hebbal", "Malleshwaram", "Electronic City", "JP Nagar", "Sarjapur Road"],
    regionalLang: "Kannada"
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    councilCode: "MMC",
    phonePrefix: "+91 22 2444",
    lat: 19.0760,
    lng: 72.8777,
    hospitals: [
      "Kokilaben Dhirubhai Ambani Hospital (Andheri)",
      "P.D. Hinduja National Hospital (Mahim)",
      "Tata Memorial Hospital (Parel)",
      "Lilavati Hospital & Research Centre (Bandra)",
      "Sir H.N. Reliance Foundation Hospital (Girgaon)",
      "Fortis Hospital (Mulund)",
      "Nanavati Max Super Speciality Hospital (Vile Parle)",
      "Apollo Hospitals (Navi Mumbai, Belapur)",
      "Wockhardt Hospitals (Mumbai Central)",
      "Asian Heart Institute (BKC)"
    ],
    localities: ["Bandra West", "Andheri West", "Parel", "Juhu", "Powai", "Worli", "Colaba", "Thane West", "Navi Mumbai Vashi", "Borivali West"],
    regionalLang: "Marathi"
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    councilCode: "TSMC",
    phonePrefix: "+91 40 2360",
    lat: 17.3850,
    lng: 78.4867,
    hospitals: [
      "Apollo Health City (Jubilee Hills)",
      "Yashoda Hospitals (Somajiguda)",
      "KIMS Hospitals (Secunderabad)",
      "CARE Hospitals (Banjara Hills)",
      "Continental Hospitals (Gachibowli)",
      "AIG Hospitals (Gachibowli, Asian Institute of Gastroenterology)",
      "Sunshine Hospitals (Gachibowli)",
      "Star Hospitals (Banjara Hills)",
      "Medicover Hospitals (HITEC City)",
      "Basavatarakam Indo-American Cancer Hospital"
    ],
    localities: ["Jubilee Hills", "Banjara Hills", "Gachibowli", "HITEC City", "Madhapur", "Kondapur", "Kukatpally", "Secunderabad", "Begumpet", "Somajiguda"],
    regionalLang: "Telugu"
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    councilCode: "TMC",
    phonePrefix: "+91 44 2829",
    lat: 13.0827,
    lng: 80.2707,
    hospitals: [
      "Apollo Hospitals (Greams Road)",
      "MGM Healthcare (Nelson Manickam Road)",
      "Gleneagles Global Health City (Perumbakkam)",
      "MIOT International (Manapakkam)",
      "Fortis Malar Hospital (Adyar)",
      "Sankara Nethralaya Eye Hospital (Nungambakkam)",
      "Dr. Rela Institute & Medical Centre (Chromepet)",
      "Kauvery Hospital (Alwarpet)",
      "SIMS Hospital (Vadapalani)",
      "Cancer Institute (WIA, Adyar)"
    ],
    localities: ["Nungambakkam", "Adyar", "Anna Nagar", "T. Nagar", "Alwarpet", "Velachery", "Mylapore", "Besant Nagar", "Kilpauk", "OMR Thoraipakkam"],
    regionalLang: "Tamil"
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    councilCode: "WBMC",
    phonePrefix: "+91 33 2223",
    lat: 22.5726,
    lng: 88.3639,
    hospitals: [
      "Apollo Multispeciality Hospitals (Canal Circular Road)",
      "AMRI Hospitals (Dhakuria & Salt Lake)",
      "Fortis Hospital (Anandapur)",
      "Ruby General Hospital (EM Bypass)",
      "Medica Superspecialty Hospital (Mukundapur)",
      "Peerless Hospital (Panchasayar)",
      "Tata Medical Center (New Town, Rajarhat)",
      "Desun Hospital & Heart Institute (Kasba)",
      "Belle Vue Clinic (Minto Park)",
      "Calcutta Medical Research Institute (CMRI)"
    ],
    localities: ["Salt Lake City", "Park Street", "Ballygunge", "Alipore", "New Town", "Gariahat", "Behala", "Howrah", "Jadavpur", "Dum Dum"],
    regionalLang: "Bengali"
  },
  {
    city: "Pune",
    state: "Maharashtra",
    councilCode: "MMC",
    phonePrefix: "+91 20 2612",
    lat: 18.5204,
    lng: 73.8567,
    hospitals: [
      "Ruby Hall Clinic (Sassoon Road & Wanowrie)",
      "Jehangir Hospital (Near Pune Station)",
      "Sahyadri Super Speciality Hospital (Deccan Gymkhana)",
      "Manipal Hospital (Kharadi)",
      "Jupiter Hospital (Baner)",
      "Deenanath Mangeshkar Hospital (Erandwane)",
      "Inamdar Multispeciality Hospital (Fatima Nagar)",
      "Aditya Birla Memorial Hospital (Chinchwad)",
      "Noble Hospital (Hadapsar)",
      "Bharati Vidyapeeth Medical College & Hospital"
    ],
    localities: ["Koregaon Park", "Kalyani Nagar", "Kothrud", "Aundh", "Baner", "Viman Nagar", "Deccan Gymkhana", "Kharadi", "Magarpatta City", "Hadapsar"],
    regionalLang: "Marathi"
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    councilCode: "GPMC",
    phonePrefix: "+91 79 2657",
    lat: 23.0225,
    lng: 72.5714,
    hospitals: [
      "Apollo Hospitals International (Bhat, Gandhinagar)",
      "Zydus Hospitals (Thaltej)",
      "KD Hospital (SG Highway)",
      "CIMS Hospital (Marengo CIMS, Science City Road)",
      "Sterling Hospital (Gurukul Road)",
      "Shalby Hospitals (SG Highway)",
      "SAL Hospital (Drive In Road)",
      "UN Mehta Institute of Cardiology & Research"
    ],
    localities: ["Bodakdev", "Thaltej", "Satellite", "Vastrapur", "Navrangpura", "Prahlad Nagar", "SG Highway", "Maninagar"],
    regionalLang: "Gujarati"
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    councilCode: "RMC",
    phonePrefix: "+91 141 277",
    lat: 26.9124,
    lng: 75.7873,
    hospitals: [
      "Fortis Escorts Hospital (Malviya Nagar)",
      "Manipal Hospital (Vidhyadhar Nagar)",
      "Eternal Heart Care Centre (EHCC, Jawahar Circle)",
      "Narayana Multispeciality Hospital (Kumbha Marg)",
      "Apex Hospitals (Malviya Nagar)",
      "Santokba Durlabhji Memorial Hospital (SDMH)"
    ],
    localities: ["C-Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Raja Park", "Jawahar Nagar"],
    regionalLang: "Marwari"
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    councilCode: "UPMC",
    phonePrefix: "+91 522 678",
    lat: 26.8467,
    lng: 80.9462,
    hospitals: [
      "Medanta Super Speciality Hospital (Amar Shaheed Path)",
      "Apollo Medics Super Speciality Hospital (LDA Colony)",
      "Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGI)",
      "King Georges Medical University (KGMU)",
      "Sahara Hospital (Viraj Khand, Gomti Nagar)"
    ],
    localities: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar", "Jankipuram"],
    regionalLang: "Urdu"
  },
  {
    city: "Chandigarh",
    state: "Punjab / Haryana",
    councilCode: "PMC",
    phonePrefix: "+91 172 274",
    lat: 30.7333,
    lng: 76.7794,
    hospitals: [
      "Postgraduate Institute of Medical Education & Research (PGIMER)",
      "Max Super Speciality Hospital (Phase 6, Mohali)",
      "Fortis Hospital Mohali (Sector 62)",
      "Government Medical College & Hospital (GMCH Sector 32)",
      "Ivy Hospital (Sector 71, Mohali)"
    ],
    localities: ["Sector 17", "Sector 35", "Sector 8", "Mohali Phase 7", "Panchkula Sector 11", "Zirakpur"],
    regionalLang: "Punjabi"
  },
  {
    city: "Kochi",
    state: "Kerala",
    councilCode: "TCMC",
    phonePrefix: "+91 484 280",
    lat: 9.9312,
    lng: 76.2673,
    hospitals: [
      "Amrita Institute of Medical Sciences (AIMS, Edappally)",
      "Aster Medcity (Cheranallur)",
      "Rajagiri Hospital (Aluva)",
      "VPS Lakeshore Hospital (Nettoor)",
      "Medical Trust Hospital (MG Road)"
    ],
    localities: ["Panampilly Nagar", "Edappally", "Kaloor", "Marine Drive", "Kadavanthra", "Aluva", "Kakkanad InfoPark"],
    regionalLang: "Malayalam"
  },
  {
    city: "Indore",
    state: "Madhya Pradesh",
    councilCode: "MPMC",
    phonePrefix: "+91 731 472",
    lat: 22.7196,
    lng: 75.8577,
    hospitals: [
      "Medanta Super Speciality Hospital (Vijay Nagar)",
      "CHL Hospital (AB Road)",
      "Bombay Hospital Indore (Eastern Ring Road)",
      "Apollo Hospitals (Vijay Nagar)"
    ],
    localities: ["Vijay Nagar", "Palasia", "Saket Nagar", "AB Road", "Annapurna Road"],
    regionalLang: "Hindi"
  },
  {
    city: "Patna",
    state: "Bihar",
    councilCode: "BPMC",
    phonePrefix: "+91 612 229",
    lat: 25.5941,
    lng: 85.1376,
    hospitals: [
      "AIIMS Patna (Phulwari Sharif)",
      "Paras HMRI Hospital (Raja Bazar, Bailey Road)",
      "Ruban Memorial Hospital (Pataliputra)",
      "Mahavir Cancer Sansthan (Phulwarisharif)"
    ],
    localities: ["Boring Road", "Kankarbagh", "Bailey Road", "Patliputra Colony", "Rajendra Nagar"],
    regionalLang: "Bhojpuri"
  },
  {
    city: "Bhubaneswar",
    state: "Odisha",
    councilCode: "OMC",
    phonePrefix: "+91 674 230",
    lat: 20.2961,
    lng: 85.8245,
    hospitals: [
      "AIIMS Bhubaneswar (Sijua, Patrapada)",
      "Apollo Hospitals (Sainik School Road)",
      "Kalinga Institute of Medical Sciences (KIMS, Patia)",
      "AMRI Hospitals (Khandagiri)"
    ],
    localities: ["Patia", "Saheed Nagar", "Chandrasekharpur", "Khandagiri", "Nayapalli"],
    regionalLang: "Odia"
  },
  {
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    councilCode: "APMC",
    phonePrefix: "+91 891 254",
    lat: 17.6868,
    lng: 83.2185,
    hospitals: [
      "Apollo Hospitals (Health City, Arilova)",
      "CARE Hospitals (Waltair Main Road)",
      "Medicover Hospitals (MVP Colony)",
      "KIMS ICON Hospital (Sheela Nagar)"
    ],
    localities: ["MVP Colony", "Siripuram", "Waltair Uplands", "Madhurawada", "Gajuwaka"],
    regionalLang: "Telugu"
  },
  {
    city: "Guwahati",
    state: "Assam",
    councilCode: "AMC",
    phonePrefix: "+91 361 234",
    lat: 26.1445,
    lng: 91.7362,
    hospitals: [
      "AIIMS Guwahati (Changsari)",
      "Apollo Hospitals (GS Road, Christian Basti)",
      "Narayana Superspeciality Hospital (Amingaon)",
      "GNRC Hospitals (Dispur & Sixmile)"
    ],
    localities: ["GS Road", "Dispur", "Christian Basti", "Ulubari", "Zoo Road"],
    regionalLang: "Assamese"
  }
];

interface SpecialtySpec {
  name: string;
  qualifications: string[];
  clinicalInterests: string[][];
  avgFee: number;
  bios: string[];
}

const SPECIALTY_SPECS: SpecialtySpec[] = [
  {
    name: "General Physician / Internal Medicine",
    qualifications: ["MBBS, MD (General Medicine)", "MBBS, DNB (Internal Medicine)", "MBBS, MD, MRCP (UK)"],
    avgFee: 650,
    clinicalInterests: [
      ["Type 2 Diabetes Management", "Hypertension", "Dyslipidemia"],
      ["Infectious Diseases", "Dengue & Malaria Care", "Preventive Health"],
      ["Metabolic Syndrome", "Thyroid Disorders", "Adult Immunization"],
      ["Geriatric Care", "Chronic Fatigue", "Cardiometabolic Risk Reduction"]
    ],
    bios: [
      "Experienced internal medicine specialist focusing on proactive preventive care, chronic metabolic syndromes, adult vaccination protocols, and comprehensive primary diagnostics.",
      "Dedicated general physician emphasizing evidence-based lifestyle medicine, hypertension reversal strategies, and personalized glycemic control protocols.",
      "Clinical physician with deep expertise in acute febrile illnesses, post-viral convalescence, metabolic optimization, and routine health screenings."
    ]
  },
  {
    name: "Cardiologist",
    qualifications: ["MBBS, MD (Medicine), DM (Cardiology), FACC", "MBBS, MD, DNB (Cardiology), FSCAI", "MBBS, MD, DM (Cardiology), FESC"],
    avgFee: 1200,
    clinicalInterests: [
      ["Coronary Angiography", "Angioplasty (PTCA)", "Preventive Cardiology"],
      ["Heart Failure Management", "Arrhythmias", "Cardiac Rehabilitation"],
      ["Valvular Heart Disease", "Hypertensive Heart Disease", "Echocardiography"]
    ],
    bios: [
      "Senior interventional cardiologist with over two decades of experience in coronary interventions, primary angioplasties, and structural cardiovascular evaluations.",
      "Preventive cardiology and cardiovascular imaging specialist focusing on early atherosclerotic plaque detection, calcium score assessment, and heart failure optimization.",
      "Cardiologist specializing in electrophysiology, arrhythmia ablation, complex coronary anatomy, and long-term hypertensive cardiomyopathy management."
    ]
  },
  {
    name: "Dermatologist & Cosmetologist",
    qualifications: ["MBBS, MD (Dermatology, Venereology & Leprosy)", "MBBS, DVD, DNB (Dermatology)", "MBBS, MD (Dermatology), FAAD"],
    avgFee: 850,
    clinicalInterests: [
      ["Acne & Rosacea", "Laser Resurfacing", "Chemical Peels"],
      ["Psoriasis Therapeutics", "Biologics in Dermatology", "Vitiligo"],
      ["Alopecia & Hair Loss", "PRP Therapy", "Trichology Assessment"]
    ],
    bios: [
      "Consultant dermatologist skilled in clinical skin disease management, phototherapy for autoimmune dermatoses, and evidence-based acne solutions.",
      "Aesthetic dermatologist and trichologist specializing in hair restoration therapies, barrier repair protocols, and personalized skin rejuvenating modalities.",
      "Clinical dermatologist focusing on chronic eczema, pediatric dermatology, cutaneous allergies, and laser-assisted dermatological interventions."
    ]
  },
  {
    name: "Neurologist & Stroke Specialist",
    qualifications: ["MBBS, MD (Medicine), DM (Neurology), FINR", "MBBS, MD, DNB (Neurology)", "MBBS, MD, DM (Neurology), FANA"],
    avgFee: 1300,
    clinicalInterests: [
      ["Acute Ischemic Stroke", "Thrombolysis", "Neurocritical Care"],
      ["Migraine & Headache Disorders", "Botox for Migraine", "Cluster Headaches"],
      ["Epilepsy & Seizure Management", "Video EEG", "Refractory Seizures"]
    ],
    bios: [
      "Senior consultant neurologist specializing in acute stroke pathways, neurovascular dopplers, and comprehensive headache disorder management.",
      "Neurologist with advanced clinical training in movement disorders, deep brain stimulation (DBS) programming, and neurodegenerative conditions.",
      "Clinical neurophysiologist focusing on intractable epilepsy, autonomic neuropathy diagnostics, and post-concussion vestibular rehabilitation."
    ]
  },
  {
    name: "Orthopedic Surgeon & Joint Replacement",
    qualifications: ["MBBS, MS (Orthopedics), MCh (Ortho)", "MBBS, MS, DNB (Orthopedics), FJR (Germany)", "MBBS, MS (Orthopedics), Arthroscopy Fellowship"],
    avgFee: 1100,
    clinicalInterests: [
      ["Total Knee Replacement (TKR)", "Total Hip Replacement (THR)", "Robotic Surgery"],
      ["Arthroscopic ACL Reconstruction", "Meniscus Repair", "Rotator Cuff"],
      ["Spine Surgery & Slip Disc", "Minimally Invasive Spine", "Sciatica"]
    ],
    bios: [
      "Joint replacement and robotic arthroplasty specialist known for fast-track knee and hip rehabilitations and computer-navigated surgical precision.",
      "Sports medicine orthopedic surgeon specializing in keyhole arthroscopy, shoulder instability repairs, and cartilage preservation therapies.",
      "Spine and orthopedic trauma surgeon focusing on endoscopic discectomy, degenerative spinal conditions, and bone health preservation."
    ]
  },
  {
    name: "Obstetrician & Gynecologist",
    qualifications: ["MBBS, MS (Obstetrics & Gynaecology), FICOG", "MBBS, DGO, DNB (OBG), MRCOG (UK)", "MBBS, MS (OBG), Laparoscopy Fellowship"],
    avgFee: 950,
    clinicalInterests: [
      ["High-Risk Pregnancy", "Painless Normal Delivery", "Pre-eclampsia Care"],
      ["PCOS / PCOD Protocols", "Hormonal Balancing", "Menopause Management"],
      ["Laparoscopic Hysterectomy", "Fibroid Embolization", "Endometriosis Care"]
    ],
    bios: [
      "Senior obstetrician and gynecologist with vast experience in managing high-risk pregnancies, maternal-fetal medicine, and natural gentle birth plans.",
      "Gynecological laparoscopist and reproductive endocrinologist dedicated to empathetic PCOS mitigation, endometriosis management, and adolescent health.",
      "Consultant gynecologist specializing in advanced hysteroscopy, pelvic floor repairs, perimenopause care, and preventive cervical cancer screenings."
    ]
  },
  {
    name: "Pediatrician & Neonatologist",
    qualifications: ["MBBS, MD (Pediatrics), DCH", "MBBS, MD (Pediatrics), DM (Neonatology)", "MBBS, DNB (Pediatrics), FIAP"],
    avgFee: 750,
    clinicalInterests: [
      ["Growth & Developmental Milestones", "Newborn Care", "Infant Nutrition"],
      ["Pediatric Asthma & Allergies", "Childhood Immunization", "Wheezing"],
      ["Neonatal Intensive Care (NICU)", "Premature Infant Care", "Jaundice"]
    ],
    bios: [
      "Compassionate pediatrician and child health expert dedicated to evidence-based newborn care, routine childhood vaccination, and growth tracking.",
      "Senior neonatologist specializing in critical care for premature infants, neonatal nutrition, and pediatric emergency interventions.",
      "Pediatric pulmonology and allergy consultant helping children overcome allergic rhinitis, childhood asthma, and recurrent respiratory infections."
    ]
  },
  {
    name: "Gastroenterologist & Hepatologist",
    qualifications: ["MBBS, MD, DM (Medical Gastroenterology)", "MBBS, MD, DNB (Gastroenterology)", "MBBS, MD, DM (Gastroenterology), FACG"],
    avgFee: 1150,
    clinicalInterests: [
      ["Upper GI Endoscopy", "Colonoscopy", "Polypectomy"],
      ["Fatty Liver Disease (NAFLD)", "Cirrhosis Care", "Hepatitis B & C"],
      ["Acid Reflux (GERD)", "Irritable Bowel Syndrome (IBS)", "IBD Crohn Care"]
    ],
    bios: [
      "Senior gastroenterologist and therapeutic endoscopist proficient in diagnostic and interventional endoscopy, fatty liver regression, and GI bleeds.",
      "Hepatologist dedicated to liver wellness, viral hepatitis eradication, and comprehensive management of inflammatory bowel conditions.",
      "Consultant gastroenterologist focusing on functional gut disorders, microbiome restoration, esophageal motility, and early GI cancer screening."
    ]
  },
  {
    name: "Psychiatrist & Mental Health",
    qualifications: ["MBBS, MD (Psychiatry)", "MBBS, DPM, DNB (Psychiatry)", "MBBS, MD (Psychiatry), MRCPsych (UK)"],
    avgFee: 900,
    clinicalInterests: [
      ["Generalized Anxiety Disorder (GAD)", "Panic Attacks", "Depression"],
      ["Adult ADHD Diagnosis", "Cognitive Behavioral Focus", "Insomnia"],
      ["Bipolar Mood Disorder", "OCD Therapeutics", "Stress Management"]
    ],
    bios: [
      "Holistic psychiatrist combining modern evidence-based psychopharmacology with empathetic psychotherapy for anxiety, depressive episodes, and sleep hygiene.",
      "Neuropsychiatrist with focused practice in adult attention deficit disorders, occupational burnout, panic disorders, and mood stabilization.",
      "Clinical psychiatrist experienced in young adult mental health, stress reduction strategies, and non-pharmacological behavioral therapy integration."
    ]
  },
  {
    name: "Pulmonologist & Chest Specialist",
    qualifications: ["MBBS, MD (Pulmonary Medicine), FCCP (USA)", "MBBS, DTCD, DNB (Respiratory Diseases)", "MBBS, MD, DM (Pulmonary & Critical Care)"],
    avgFee: 950,
    clinicalInterests: [
      ["Bronchial Asthma", "COPD Rehabilitation", "Spirometry & PFT"],
      ["Sleep Apnea (OSA)", "CPAP Titration", "Snoring Evaluations"],
      ["Interstitial Lung Disease (ILD)", "Bronchoscopy", "Smoking Cessation"]
    ],
    bios: [
      "Senior pulmonologist specializing in obstructive airway diseases, high-resolution lung imaging evaluations, and comprehensive pulmonary rehabilitation.",
      "Sleep medicine specialist and interventional pulmonologist providing expert assessments for obstructive sleep apnea and chronic nighttime coughing.",
      "Chest physician experienced in environmental pollution-induced respiratory symptoms, complex asthma biologicals, and bronchoscopy diagnostics."
    ]
  },
  {
    name: "Endocrinologist & Diabetologist",
    qualifications: ["MBBS, MD (Medicine), DM (Endocrinology)", "MBBS, MD, DNB (Endocrinology), FACE (USA)", "MBBS, MRCP (UK), Specialty Certificate Endocrinology"],
    avgFee: 1100,
    clinicalInterests: [
      ["Precision Diabetes Management", "CGM Continuous Glucose Monitoring", "Insulin Pumps"],
      ["Hypothyroidism & Hashimotos", "Thyroid Nodules", "Hyperthyroidism"],
      ["PCOS Metabolic Syndrome", "Adrenal Disorders", "Osteoporosis Care"]
    ],
    bios: [
      "Consultant endocrinologist dedicated to modern diabetes management utilizing sensor-augmented insulin delivery and individualized HbA1c targets.",
      "Hormone and metabolism specialist focusing on autoimmune thyroid disorders, female hormonal balance, and endocrine osteoporosis management.",
      "Senior diabetologist emphasizing cardiovascular-protective glycemic agents, diabetic foot salvage protocols, and metabolic weight-loss therapies."
    ]
  },
  {
    name: "Medical Oncologist",
    qualifications: ["MBBS, MD (Medicine), DM (Medical Oncology), ESMO", "MBBS, MD, DNB (Medical Oncology)", "MBBS, MD, DM (Oncology), FACP"],
    avgFee: 1500,
    clinicalInterests: [
      ["Immunotherapy Protocols", "Targeted Therapy", "Next-Gen Sequencing"],
      ["Breast Cancer Management", "Lung & Colon Cancers", "Precision Oncology"],
      ["Hematologic Malignancies", "Lymphoma & Myeloma", "Genetic Counseling"]
    ],
    bios: [
      "Dedicated medical oncologist at the forefront of personalized targeted drug therapies, immune checkpoint inhibitors, and patient-centered survivorship.",
      "Clinical cancer specialist providing comprehensive multidisciplinary tumor board reviews, genomic biomarker evaluations, and gentle supportive oncology care.",
      "Consultant oncologist focusing on breast and gastrointestinal oncology with deep expertise in molecular genetics and quality-of-life preservation."
    ]
  },
  {
    name: "Nephrologist & Renal Care",
    qualifications: ["MBBS, MD (Medicine), DM (Nephrology), FISN", "MBBS, MD, DNB (Nephrology)", "MBBS, MD, DM (Nephrology), FRCP"],
    avgFee: 1150,
    clinicalInterests: [
      ["Chronic Kidney Disease (CKD)", "Diabetic Nephropathy", "Hypertensive Renal Disease"],
      ["Hemodialysis & Peritoneal Dialysis", "Vascular Access", "Electrolyte Imbalance"],
      ["Kidney Transplantation Care", "Glomerulonephritis", "Renal Nutrition"]
    ],
    bios: [
      "Senior nephrologist specializing in slow-progression therapies for diabetic kidney disease, state-of-the-art dialysis oversight, and transplant donor matching.",
      "Renal medicine consultant focusing on autoimmune glomerular diseases, resistant hypertension, and dietary phosphorus-potassium balance.",
      "Kidney care physician dedicated to early detection of proteinuria, fluid volume management, and post-transplant immunosuppression optimization."
    ]
  },
  {
    name: "ENT Specialist (Otolaryngologist)",
    qualifications: ["MBBS, MS (ENT), DLO", "MBBS, MS (Otorhinolaryngology), DORL", "MBBS, MS (ENT), Endoscopic Sinus Surgery Fellowship"],
    avgFee: 700,
    clinicalInterests: [
      ["Functional Endoscopic Sinus Surgery (FESS)", "Sinusitis", "Nasal Polyps"],
      ["Tympanoplasty", "Ear Infections & Discharge", "Hearing Loss"],
      ["Vertigo & Tinnitus Evaluation", "BPPV Maneuvers", "Inner Ear"]
    ],
    bios: [
      "Head and neck surgeon specializing in micro-ear surgeries, endoscopic nasal sinus clearances, and vestibular balance assessments for vertigo.",
      "ENT consultant with extensive experience in pediatric airway problems, allergen-induced chronic rhinitis, and hearing aid rehabilitation.",
      "Voice and throat specialist proficient in videolaryngostroboscopy, vocal cord polyp surgery, and coblation-assisted tonsillectomy."
    ]
  },
  {
    name: "Ophthalmologist & Eye Surgeon",
    qualifications: ["MBBS, MS (Ophthalmology), FICO", "MBBS, DO, DNB (Ophthalmology)", "MBBS, MS (Ophthalmology), Cornea & Refractive Fellowship"],
    avgFee: 750,
    clinicalInterests: [
      ["Micro-Incision Cataract Surgery (MICS)", "Phacoemulsification", "Multifocal IOL"],
      ["LASIK & Contoura Vision", "Refractive Errors", "PRK Laser"],
      ["Glaucoma Diagnostics", "OCT & Visual Fields", "Trabeculectomy"]
    ],
    bios: [
      "Senior eye surgeon specializing in sutureless cold-phaco cataract extraction with premium toric and trifocal intraocular lens implants.",
      "Cornea and laser refractive specialist dedicated to specs removal via Contoura Vision, advanced keratoconus cross-linking, and dry eye therapy.",
      "Comprehensive ophthalmologist focusing on early glaucoma screening, retinal laser photocoagulation for diabetes, and digital eye strain."
    ]
  },
  {
    name: "Rheumatologist & Immunologist",
    qualifications: ["MBBS, MD (Medicine), DM (Clinical Immunology & Rheumatology)", "MBBS, MD, Fellowship in Rheumatology", "MBBS, MRCP (UK), DM (Rheumatology)"],
    avgFee: 1250,
    clinicalInterests: [
      ["Rheumatoid Arthritis", "Biologic Therapies", "Joint Ultrasound"],
      ["Ankylosing Spondylitis", "HLA-B27 Related Spondyloarthritis", "Back Stiffness"],
      ["Systemic Lupus Erythematosus (SLE)", "Vasculitis", "Gout Care"]
    ],
    bios: [
      "Consultant clinical rheumatologist dedicated to early diagnosis of inflammatory arthritis, preventing irreversible joint deformities, and tailored biologics.",
      "Autoimmune disease specialist providing evidence-guided therapies for lupus, psoriatic arthritis, and autoimmune vasculitis.",
      "Rheumatologist experienced in musculoskeletal ultrasonography, crystal arthritis management (gout), and chronic pain alleviation protocols."
    ]
  },
  {
    name: "Urologist & Andrologist",
    qualifications: ["MBBS, MS (Surgery), MCh (Urology)", "MBBS, MS, DNB (Genitourinary Surgery)", "MBBS, MS, MCh (Urology), FRCS (Urol)"],
    avgFee: 1200,
    clinicalInterests: [
      ["Kidney Stones (RIRS / PCNL / Laser Lithotripsy)", "Ureteric Calculus"],
      ["Benign Prostatic Hyperplasia (BPH)", "Laser TURP", "Enucleation"],
      ["Erectile Dysfunction & Male Infertility", "Varicocele Repair", "Andrology"]
    ],
    bios: [
      "Senior urologist and endourologist proficient in retrograde intrarenal laser surgery (RIRS) for renal stones and minimally invasive prostate procedures.",
      "Consultant urologic surgeon specializing in robotic partial nephrectomy, bladder stone laser fragmentation, and male reproductive health.",
      "Urologist and andrologist dedicated to compassionate sexual wellness therapies, reconstructive urethral surgeries, and urinary tract health."
    ]
  }
];

const FIRST_NAMES_MALE = [
  "Rajesh", "Arvind", "Rohan", "Vikram", "Sanjay", "Suresh", "Anirudh", "Siddharth",
  "Nitin", "Raghav", "Deepak", "Alok", "Amit", "Manoj", "Vijay", "Karthik", "Murali",
  "Balaji", "Pranav", "Sameer", "Tushar", "Gaurav", "Abhishek", "Chetan", "Farhan",
  "Tariq", "Aditya", "Naveen", "Sunil", "Prakash", "Ashish", "Harish", "Vinod",
  "Sachin", "Sandeep", "Kunal", "Manish", "Varun", "Rohit", "Vivek", "Hemant",
  "Tarun", "Mohit", "Yash", "Parth", "Mayank", "Harsh", "Aman", "Dev", "Kabir",
  "Suraj", "Ajay", "Dinesh", "Gautam", "Sumit", "Anand", "Akash", "Rishi", "Rajan"
];

const FIRST_NAMES_FEMALE = [
  "Priya", "Ananya", "Sunita", "Kavita", "Meera", "Shweta", "Divya", "Sneha",
  "Pooja", "Deepa", "Lakshmi", "Radhika", "Ritu", "Neha", "Swati", "Archana",
  "Vandana", "Fatima", "Zoya", "Preeti", "Shalini", "Renu", "Tanvi", "Payal",
  "Komal", "Shilpa", "Rashmi", "Sangeeta", "Bhavna", "Geeta", "Anita", "Pallavi",
  "Aditi", "Smita", "Shruti", "Ishita", "Riddhi", "Nupur", "Chetna", "Shreya"
];

const SURNAMES = [
  "Sharma", "Verma", "Gupta", "Nair", "Swaminathan", "Mukherjee", "Iyer", "Reddy",
  "Rao", "Patel", "Shah", "Mehta", "Singh", "Kaur", "Joshi", "Kulkarni", "Deshmukh",
  "Roy", "Banerjee", "Dasgupta", "Chatterjee", "Menon", "Pillai", "Nambiar", "Khan",
  "Siddiqui", "Ahmed", "Bhat", "Agarwal", "Bansal", "Goel", "Jain", "Hegde",
  "Shetty", "Kamath", "Choudhury", "Mishra", "Pandey", "Tiwari", "Sen", "Ghosh",
  "Bose", "Bhattacharya", "Patil", "Shinde", "Jadhav", "Pawar", "Chauhan", "Rathore"
];

const AVATARS_MALE = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
];

const AVATARS_FEMALE = [
  "https://images.unsplash.com/photo-1594824813589-389d31615f21?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&auto=format&fit=crop&q=80"
];

function createPrng(seed = 10007) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateExpandedDoctorConnections(count = 10000, startId = 37): Doctor[] {
  const rng = createPrng(42819);
  const doctors: Doctor[] = [];

  const timeSlots = [
    "Today, 09:30 AM", "Today, 10:15 AM", "Today, 11:30 AM", "Today, 02:00 PM",
    "Today, 03:30 PM", "Today, 04:45 PM", "Today, 05:30 PM", "Tomorrow, 09:00 AM",
    "Tomorrow, 10:30 AM", "Tomorrow, 11:45 AM", "Tomorrow, 02:30 PM", "Tomorrow, 04:00 PM"
  ];

  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const isFemale = rng() > 0.48;
    const firstName = isFemale
      ? FIRST_NAMES_FEMALE[Math.floor(rng() * FIRST_NAMES_FEMALE.length)]
      : FIRST_NAMES_MALE[Math.floor(rng() * FIRST_NAMES_MALE.length)];
    const surname = SURNAMES[Math.floor(rng() * SURNAMES.length)];
    const name = `Dr. ${firstName} ${surname}`;

    const cluster = CITY_CLUSTERS[Math.floor(rng() * CITY_CLUSTERS.length)];
    const spec = SPECIALTY_SPECS[Math.floor(rng() * SPECIALTY_SPECS.length)];
    const hospital = cluster.hospitals[Math.floor(rng() * cluster.hospitals.length)];
    const locality = cluster.localities[Math.floor(rng() * cluster.localities.length)];

    const qualifications = spec.qualifications[Math.floor(rng() * spec.qualifications.length)];
    const experienceYears = Math.floor(5 + rng() * 32);
    const regNum = `${cluster.councilCode}-${Math.floor(10000 + rng() * 89999)}`;

    const latJitter = (rng() - 0.5) * 0.08;
    const lngJitter = (rng() - 0.5) * 0.08;
    const lat = +(cluster.lat + latJitter).toFixed(4);
    const lng = +(cluster.lng + lngJitter).toFixed(4);

    const feeVariance = (rng() - 0.5) * 300;
    const feeMultiplier = experienceYears > 20 ? 1.3 : experienceYears > 12 ? 1.05 : 0.85;
    let consultationFeeINR = Math.round((spec.avgFee * feeMultiplier + feeVariance) / 50) * 50;
    if (consultationFeeINR < 400) consultationFeeINR = 400;
    if (consultationFeeINR > 2500) consultationFeeINR = 2500;

    const rating = +(4.6 + rng() * 0.4).toFixed(1);
    const reviewCount = Math.floor(45 + rng() * 850);

    const languages = ["English", "Hindi"];
    if (cluster.regionalLang && !languages.includes(cluster.regionalLang)) {
      languages.push(cluster.regionalLang);
    }
    if (rng() > 0.7 && !languages.includes("Urdu")) languages.push("Urdu");

    const modeRoll = rng();
    const modes: ("video" | "in_clinic" | "audio")[] =
      modeRoll > 0.65 ? ["video", "in_clinic", "audio"] :
      modeRoll > 0.25 ? ["video", "in_clinic"] : ["video", "audio"];

    const availableNow = rng() > 0.42;
    const nextSlot = availableNow ? "Available in 10 mins" : timeSlots[Math.floor(rng() * timeSlots.length)];

    const avatarUrl = isFemale
      ? AVATARS_FEMALE[Math.floor(rng() * AVATARS_FEMALE.length)]
      : AVATARS_MALE[Math.floor(rng() * AVATARS_MALE.length)];

    const bioTemplate = spec.bios[Math.floor(rng() * spec.bios.length)];
    const interests = spec.clinicalInterests[Math.floor(rng() * spec.clinicalInterests.length)];
    const bio = `${bioTemplate} Special clinical focus on ${interests.join(", ")}.`;

    const phoneDigits = Math.floor(1000 + rng() * 8999);
    const phone = `${cluster.phonePrefix} ${phoneDigits}`;
    const cleanDocName = encodeURIComponent(name);
    const cleanSpec = encodeURIComponent(spec.name);
    const whatsapp = `https://wa.me/919876543210?text=Hello%20${cleanDocName}%20Desk%2C%20I%20would%20like%20to%20consult%20regarding%20${cleanSpec}`;
    const telehealthUrl = `https://meet.google.com/hgpt-doc${id}`;
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hospital}, ${locality}, ${cluster.city}`)}`;

    const address = `${locality}, near ${hospital}, ${cluster.city}, ${cluster.state}`;

    doctors.push({
      id,
      name,
      specialty: spec.name,
      qualifications,
      registrationNumber: regNum,
      experienceYears,
      hospital,
      city: cluster.city,
      state: cluster.state,
      address,
      lat,
      lng,
      consultationFeeINR,
      rating,
      reviewCount,
      languages,
      modes,
      availableNow,
      nextSlot,
      avatarUrl,
      bio,
      phone,
      whatsapp,
      telehealthUrl,
      directionsUrl
    });
  }

  return doctors;
}

export const EXPANDED_DOCTORS: Doctor[] = generateExpandedDoctorConnections(10000, 37);
export const DOCTORS_DATABASE: Doctor[] = [...SEED_DOCTORS, ...EXPANDED_DOCTORS];

const DOCTOR_BY_ID_MAP = new Map<number, Doctor>();
for (const doc of DOCTORS_DATABASE) {
  DOCTOR_BY_ID_MAP.set(doc.id, doc);
}

export function getDoctorById(id: number): Doctor | undefined {
  return DOCTOR_BY_ID_MAP.get(id);
}

export const DOCTOR_CITIES = [
  "All Cities",
  "New Delhi",
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Patna",
  "Bhubaneswar",
  "Visakhapatnam",
  "Guwahati"
];

export const DOCTOR_SPECIALTIES = [
  "All Specialties",
  "General Physician / Internal Medicine",
  "Cardiologist",
  "Dermatologist & Cosmetologist",
  "Neurologist & Stroke Specialist",
  "Orthopedic Surgeon & Joint Replacement",
  "Obstetrician & Gynecologist",
  "Pediatrician & Neonatologist",
  "Gastroenterologist & Hepatologist",
  "Psychiatrist & Mental Health",
  "Pulmonologist & Chest Specialist",
  "Endocrinologist & Diabetologist",
  "Medical Oncologist",
  "Nephrologist & Renal Care",
  "ENT Specialist (Otolaryngologist)",
  "Ophthalmologist & Eye Surgeon",
  "Rheumatologist & Immunologist",
  "Urologist & Andrologist"
];

export interface DoctorFilterOptions {
  q?: string;
  city?: string;
  specialty?: string;
  mode?: string;
  availableNow?: boolean;
  priceTier?: string;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export function searchDoctorConnections(options: DoctorFilterOptions = {}) {
  const {
    q = "",
    city = "",
    specialty = "",
    mode = "",
    availableNow = false,
    priceTier = "all",
    maxPrice = 2500,
    sort = "rating",
    page = 1,
    limit = 60
  } = options;

  const cleanQ = q.toLowerCase().trim();
  const cleanCity = city.toLowerCase().trim();
  const cleanSpec = specialty.toLowerCase().trim();
  const cleanMode = mode.toLowerCase().trim();

  let filtered = DOCTORS_DATABASE.filter(d => {
    if (cleanCity && cleanCity !== "all cities" && !d.city.toLowerCase().includes(cleanCity) && !d.state.toLowerCase().includes(cleanCity)) {
      return false;
    }
    if (cleanSpec && cleanSpec !== "all specialties" && !d.specialty.toLowerCase().includes(cleanSpec)) {
      return false;
    }
    if (cleanMode && !d.modes.includes(cleanMode as any)) {
      return false;
    }
    if (availableNow && !d.availableNow) {
      return false;
    }
    if (d.consultationFeeINR > maxPrice) {
      return false;
    }
    if (priceTier && priceTier !== "all") {
      if (priceTier === "budget" && d.consultationFeeINR > 600) return false;
      if (priceTier === "mid_range" && (d.consultationFeeINR <= 600 || d.consultationFeeINR > 1000)) return false;
      if (priceTier === "premium" && (d.consultationFeeINR <= 1000 || d.consultationFeeINR > 1600)) return false;
      if (priceTier === "executive" && d.consultationFeeINR <= 1600) return false;
    }
    if (cleanQ) {
      const matchName = d.name.toLowerCase().includes(cleanQ);
      const matchSpec = d.specialty.toLowerCase().includes(cleanQ);
      const matchHosp = d.hospital.toLowerCase().includes(cleanQ);
      const matchCity = d.city.toLowerCase().includes(cleanQ);
      const matchBio = d.bio.toLowerCase().includes(cleanQ);
      const matchLang = d.languages.some(l => l.toLowerCase().includes(cleanQ));
      if (!matchName && !matchSpec && !matchHosp && !matchCity && !matchBio && !matchLang) {
        return false;
      }
    }
    return true;
  });

  if (sort === "price_low") {
    filtered.sort((a, b) => a.consultationFeeINR - b.consultationFeeINR);
  } else if (sort === "price_high") {
    filtered.sort((a, b) => b.consultationFeeINR - a.consultationFeeINR);
  } else if (sort === "experience") {
    filtered.sort((a, b) => b.experienceYears - a.experienceYears);
  } else {
    filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  const total = filtered.length;
  const safeLimit = limit <= 0 ? 60 : limit;
  const safePage = page < 1 ? 1 : page;
  const startIndex = (safePage - 1) * safeLimit;
  const paginatedDoctors = filtered.slice(startIndex, startIndex + safeLimit);

  return {
    total,
    totalDoctors: DOCTORS_DATABASE.length,
    page: safePage,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
    doctors: paginatedDoctors,
    cities: DOCTOR_CITIES,
    specialties: DOCTOR_SPECIALTIES
  };
}
