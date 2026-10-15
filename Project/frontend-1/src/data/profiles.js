// Audience profiles MyHealthOpinions can recruit and research with.
// Sources: "MHO Latest All Professionals Questions" (healthcare taxonomy), the regional B2C profile
// workbooks (consumer attributes) and Frequent Research's B2B profiling. Lists describe the breadth
// of profiles we can serve — not a promise that a study is open for every profile at any time.

export const HCP_GROUPS = [
  {
    id: 'physicians',
    title: 'Medical Doctors & Physicians',
    icon: 'stethoscope',
    items: [
      'General Practitioners & Family Physicians', 'Internal Medicine', 'Paediatrics & Neonatology', 'Cardiology', 'Pulmonology',
      'Neurology', 'Endocrinology & Diabetology', 'Gastroenterology & Hepatology', 'Medical, Radiation & Surgical Oncology',
      'Nephrology', 'Rheumatology', 'Psychiatry & Psychology', 'Dermatology', 'Ophthalmology', 'ENT / Otolaryngology', 'Radiology',
      'Anaesthesiology & Pain Medicine', 'Emergency Medicine', 'Pathology & Histopathology', 'Geriatrics', 'Infectious Diseases',
      'Haematology', 'Sports Medicine', 'Palliative Care', 'Occupational Health', 'Cytopathology', 'Molecular Diagnostics',
      'Microbiology', 'Clinical Chemistry', 'Forensic Pathology', 'Immunopathology', 'Obstetrics & Gynaecology', 'Urology',
    ],
  },
  {
    id: 'surgeons',
    title: 'Surgeons',
    icon: 'scalpel',
    items: [
      'General Surgeons', 'Cardiothoracic Surgeons', 'Neurosurgeons', 'Orthopaedic Surgeons', 'Plastic & Reconstructive Surgeons',
      'Paediatric Surgeons', 'Vascular Surgeons', 'Colorectal Surgeons', 'Urologic Surgeons', 'Ophthalmic Surgeons',
      'Gynaecologic Surgeons', 'Oral & Maxillofacial Surgeons', 'Hepatobiliary Surgeons', 'Endocrine Surgeons', 'Transplant Surgeons',
      'Trauma Surgeons', 'Bariatric Surgeons', 'Spinal Surgeons', 'Laparoscopic & Robotic Surgeons', 'Surgical Residents & Fellows',
    ],
  },
  {
    id: 'nursing',
    title: 'Nursing & Midwifery',
    icon: 'nurse',
    items: [
      'Registered & Staff Nurses', 'Nurse Practitioners (FNP, ACNP, PNP)', 'Advanced Practice Registered Nurses', 'Clinical Nurse Specialists',
      'ICU & Critical Care Nurses', 'Emergency & Trauma Nurses', 'Oncology & Chemotherapy Nurses', 'Cardiac & Cath Lab Nurses',
      'Dialysis & Renal Nurses', 'Paediatric & NICU Nurses', 'Mental Health Nurses', 'Perioperative & Scrub Nurses',
      'Community & Public Health Nurses', 'Diabetes Nurse Educators', 'Infection Control Nurses', 'Midwives', 'Nurse Anaesthetists (CRNA)',
      'Licensed Practical / Enrolled Nurses', 'Nursing Assistants', 'Forensic & SANE Nurses', 'Nurse Managers & Chief Nursing Officers',
    ],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Professionals',
    icon: 'pill',
    items: [
      'Clinical Pharmacists', 'Hospital Pharmacists', 'Community & Retail Pharmacists', 'Oncology Pharmacists', 'Infectious Disease Pharmacists',
      'Pharmacists in Charge', 'Pharmacy Technicians', 'Regulatory Affairs Pharmacists', 'Pharmacovigilance Specialists',
      'Medical Science Liaisons', 'Formulation & R&D Scientists', 'Pharmacy Owners', 'Chief Pharmacy Officers', 'Academic Pharmacists',
    ],
  },
  {
    id: 'dental',
    title: 'Dental Professionals',
    icon: 'tooth',
    items: ['General Dentists', 'Orthodontists', 'Periodontists', 'Endodontists', 'Prosthodontists', 'Paediatric Dentists', 'Implantologists', 'Oral Radiologists', 'Dental Hygienists'],
  },
  {
    id: 'lab',
    title: 'Laboratory & Diagnostics',
    icon: 'microscope',
    items: [
      'Medical Laboratory Scientists', 'Lab Technicians & Technologists', 'Phlebotomists', 'Histotechnologists', 'Cytotechnologists',
      'Blood Bank Technologists', 'Molecular & Genomics Technologists', 'Radiographers & X-ray Technicians', 'MRI & CT Technologists',
      'Sonographers', 'Nuclear Medicine Technologists', 'Echocardiography Technicians', 'Laboratory Directors & Managers',
    ],
  },
  {
    id: 'allied',
    title: 'Allied Health Professionals',
    icon: 'hands',
    items: [
      'Physiotherapists', 'Occupational Therapists', 'Speech-Language Pathologists', 'Audiologists', 'Respiratory Therapists',
      'Dietitians & Nutritionists', 'Paramedics & EMTs', 'Clinical Psychologists & Counsellors', 'Physician Assistants',
      'Orthotists & Prosthetists', 'Podiatrists', 'Genetic Counsellors', 'Perfusionists', 'Medical Physicists', 'Art & Music Therapists',
    ],
  },
  {
    id: 'management',
    title: 'Healthcare Management & Leadership',
    icon: 'briefcase',
    items: [
      'Hospital CEOs & COOs', 'Chief Medical Officers', 'Chief Nursing Officers', 'CFOs & Finance Directors', 'CIOs & CMIOs',
      'Chief Quality & Compliance Officers', 'Medical Superintendents', 'Directors of Clinical Operations', 'Department Managers',
      'Practice Managers', 'Procurement & Purchasing Heads', 'Public Health Officers', 'Formulary Committee Members',
    ],
  },
  {
    id: 'healthit',
    title: 'Health IT & Administration',
    icon: 'monitor',
    items: [
      'Clinical Informatics Specialists', 'EHR / EMR Analysts', 'Medical Coders', 'Health Data Analysts', 'Health IT Directors',
      'Revenue Cycle Managers', 'Health Information Managers', 'Compliance & Privacy Officers', 'Medical Billing Specialists',
    ],
  },
  {
    id: 'support',
    title: 'Support & Ancillary Staff',
    icon: 'ambulance',
    items: [
      'Front Office & Reception', 'Medical Records Staff', 'Patient Services Associates', 'Ambulance & EMS Teams', 'Dispatch Coordinators',
      'Housekeeping Supervisors', 'Central Sterile Supply Staff', 'Dietary & Kitchen Teams', 'Hospital Logistics & Stores', 'Security & Maintenance Teams',
    ],
  },
];

export const PATIENT_AREAS = [
  { area: 'Heart & circulation', items: ['Hypertension', 'Heart failure', 'Coronary artery disease', 'Atrial fibrillation', 'High cholesterol', 'Stroke survivors', 'Cardiac rehab'] },
  { area: 'Metabolic & hormones', items: ['Type 1 diabetes', 'Type 2 diabetes', 'Obesity & weight management', 'Thyroid disorders', 'PCOS', 'Menopause'] },
  { area: 'Cancer care', items: ['Breast cancer', 'Lung cancer', 'Prostate cancer', 'Colorectal cancer', 'Blood cancers', 'Skin cancer', 'Cancer survivors'] },
  { area: 'Lungs & breathing', items: ['Asthma', 'COPD', 'Sleep apnoea', 'Long COVID', 'Allergic rhinitis'] },
  { area: 'Brain & mind', items: ['Migraine', 'Epilepsy', 'Multiple sclerosis', "Parkinson's", "Alzheimer's & dementia", 'Depression', 'Anxiety', 'ADHD', 'Insomnia'] },
  { area: 'Bones, joints & pain', items: ['Rheumatoid arthritis', 'Osteoarthritis', 'Osteoporosis', 'Chronic back pain', 'Fibromyalgia', 'Gout'] },
  { area: 'Digestive health', items: ["Crohn's disease", 'Ulcerative colitis', 'IBS', 'GERD', 'Fatty liver', 'Hepatitis'] },
  { area: 'Skin, hair & nails', items: ['Psoriasis', 'Atopic dermatitis / eczema', 'Acne', 'Vitiligo', 'Alopecia', 'Rosacea'] },
  { area: 'Kidney & urology', items: ['Chronic kidney disease', 'Dialysis patients', 'Kidney stones', 'Overactive bladder', 'BPH'] },
  { area: 'Eyes, ears, nose & throat', items: ['Glaucoma', 'Cataract', 'Macular degeneration', 'Dry eye', 'Hearing loss', 'Tinnitus'] },
  { area: 'Immunity & infection', items: ['Lupus', 'HIV', 'Food & drug allergies', 'Vaccination attitudes', 'Recurring infections'] },
  { area: "Women's & family health", items: ['Pregnancy & new parents', 'Fertility & IVF', 'Endometriosis', 'Contraception', 'Paediatric patients (via parents)'] },
  { area: 'Rare & specialty', items: ['Sickle cell disease', 'Haemophilia', 'Cystic fibrosis', 'Transplant recipients', 'Rare genetic conditions'] },
  { area: 'Wellbeing & lifestyle', items: ['Smokers & quitters', 'Fitness & nutrition', 'Telehealth users', 'Medical device users', 'Health insurance holders'] },
];

export const CAREGIVER_PROFILES = [
  'Adult children caring for ageing parents', 'Spouses & partners as carers', 'Parents of children with chronic conditions',
  'Dementia & Alzheimer’s caregivers', 'Cancer caregivers', 'Special-needs & disability caregivers', 'Mental health support carers',
  'Long-distance caregivers', 'Home care support workers', 'Aged care support workers', 'Home health aides', 'Hospice & palliative carers',
  'Post-surgery recovery helpers', 'Stroke & rehab caregivers', 'Diabetes care partners', 'Family medication managers',
];

export const CONSUMER_GROUPS = [
  { title: 'Demographics', icon: 'users', items: ['Gender', 'Age 18–65+', 'Education levels', 'Occupation & employment', 'Marital status', 'Household income', 'Personal income', 'Ethnicity', 'State / province / region', 'Home ownership & housing type'] },
  { title: 'Parents & household', icon: 'home', items: ['Expecting & new parents', 'Parents of infants', 'Parents of teens', 'Single parents', 'Household decision makers', 'Primary grocery shoppers', 'Household budget managers'] },
  { title: 'Health consumers', icon: 'heart', items: ['Chronic condition patients', 'People with disabilities', 'Mental wellness seekers', 'Senior healthcare consumers', "Women's & men's health", 'Telehealth users', 'Medical device users', 'Health insurance holders'] },
  { title: 'Technology', icon: 'phone', items: ['Smartphone, Android & iPhone users', 'Laptop & tablet users', 'Smart TV & smart home owners', 'Wearable users', 'AI tool users', 'Console & PC gamers'] },
  { title: 'Money & banking', icon: 'wallet', items: ['Credit & debit card users', 'Digital wallet users', 'Online banking users', 'Investors & traders', 'Crypto users', 'Loan & insurance holders'] },
  { title: 'Automotive', icon: 'car', items: ['Car & motorcycle owners', 'EV & hybrid owners', 'Luxury vehicle owners', 'Ride-share drivers', 'Fleet & commercial drivers', 'Car insurance holders'] },
  { title: 'Shopping & food', icon: 'bag', items: ['Online & omnichannel shoppers', 'Grocery shoppers', 'Fashion & electronics buyers', 'Luxury consumers', 'Packaged & fresh food buyers', 'Organic & plant-based eaters', 'Food delivery users'] },
  { title: 'Lifestyle & media', icon: 'sparkle', items: ['Travellers (business, family, solo)', 'Fitness & yoga fans', 'Pet owners', 'Beauty & personal care buyers', 'Streaming subscribers', 'Podcast listeners', 'Content creators'] },
];

export const BUSINESS = {
  titles: [
    'CEOs & Founders', 'CFOs & Finance Directors', 'CTOs & CIOs', 'CISOs & Security Leads', 'CMOs & Marketing Heads', 'CHROs & HR Directors',
    'COOs & Operations Heads', 'IT Decision Makers (ITDMs)', 'Business Decision Makers (BDMs)', 'Procurement & Purchasing Managers',
    'Sales Directors', 'Product Managers', 'Software Developers & Architects', 'Data & Analytics Leaders', 'Legal & Compliance Officers',
    'Small Business Owners', 'Engineers & Plant Managers', 'Teachers & Academics', 'Consultants & Freelancers', 'Government Officials',
  ],
  departments: [
    'Finance & Accounting', 'Information Technology', 'Human Resources', 'Marketing & Communications', 'Sales & Business Development',
    'Operations & Supply Chain', 'Procurement', 'Research & Development', 'Legal & Compliance', 'Customer Service', 'Engineering',
    'Quality Assurance', 'Medical Affairs', 'Regulatory Affairs', 'Administration & Facilities', 'Data & Analytics',
  ],
  industries: [
    'Healthcare & Hospitals', 'Pharmaceuticals', 'Biotechnology', 'Medical Devices', 'Health Insurance', 'Banking & Financial Services',
    'IT & Software', 'Telecommunications', 'Manufacturing', 'Automotive', 'Retail & E-commerce', 'FMCG / Consumer Goods',
    'Energy & Utilities', 'Construction & Real Estate', 'Logistics & Transport', 'Hospitality & Travel', 'Education', 'Government & Public Sector',
    'Media & Entertainment', 'Agriculture', 'Professional Services', 'Non-profit & NGOs',
  ],
};
