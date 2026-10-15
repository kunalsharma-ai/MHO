const D = (s) => s.split('|');

export const THERAPY_AREAS = [
  { id: 'heart', area: 'Heart & circulation', icon: 'heart', color: '#ef2d56', items: D('Hypertension|Coronary artery disease|Heart failure|Atrial fibrillation|High cholesterol|Heart attack recovery|Stroke|Peripheral artery disease|Deep vein thrombosis|Congenital heart disease|Cardiomyopathy|Varicose veins') },
  { id: 'cancer', area: 'Cancer', icon: 'ribbon', color: '#a855f7', items: D('Breast cancer|Lung cancer|Prostate cancer|Colorectal cancer|Blood cancers (leukaemia, lymphoma, myeloma)|Skin cancer & melanoma|Ovarian & cervical cancer|Head & neck cancer|Pancreatic cancer|Liver cancer|Kidney & bladder cancer|Brain tumours|Childhood cancers|Cancer survivorship') },
  { id: 'brain', area: 'Brain & nerves', icon: 'brain', color: '#6366f1', items: D('Migraine & headache|Epilepsy|Alzheimer’s & dementia|Parkinson’s disease|Multiple sclerosis|Neuropathy|Motor neurone disease (ALS)|Traumatic brain injury|Spinal cord injury|Restless legs|Cerebral palsy') },
  { id: 'mind', area: 'Mental health', icon: 'smile', color: '#ec4899', items: D('Depression|Anxiety disorders|Bipolar disorder|Schizophrenia|PTSD|OCD|ADHD|Autism spectrum|Eating disorders|Insomnia & sleep problems|Substance use recovery|Postnatal depression') },
  { id: 'lungs', area: 'Lungs & breathing', icon: 'lungs', color: '#0ea5e9', items: D('Asthma|COPD|Sleep apnoea|Pulmonary fibrosis|Bronchiectasis|Cystic fibrosis|Tuberculosis|Pulmonary hypertension|Long COVID|Chronic cough|Allergic rhinitis') },
  { id: 'metabolic', area: 'Diabetes, hormones & weight', icon: 'drop', color: '#f59e0b', items: D('Type 1 diabetes|Type 2 diabetes|Prediabetes|Obesity|Thyroid disorders|PCOS|Osteoporosis|Gout|Growth hormone disorders|Adrenal disorders|Metabolic syndrome') },
  { id: 'gut', area: 'Digestive & liver', icon: 'stomach', color: '#f97316', items: D('Acid reflux (GERD)|Irritable bowel syndrome (IBS)|Crohn’s disease|Ulcerative colitis|Coeliac disease|Fatty liver disease|Hepatitis B & C|Cirrhosis|Gallstones|Chronic constipation|Pancreatitis') },
  { id: 'kidney', area: 'Kidney & urology', icon: 'kidney', color: '#14b8a6', items: D('Chronic kidney disease|Dialysis|Kidney transplant|Kidney stones|Urinary tract infections|Overactive bladder|Incontinence|Enlarged prostate (BPH)|Erectile dysfunction') },
  { id: 'bones', area: 'Bones, joints & muscles', icon: 'bone', color: '#84cc16', items: D('Osteoarthritis|Rheumatoid arthritis|Back & neck pain|Psoriatic arthritis|Ankylosing spondylitis|Fibromyalgia|Lupus|Joint replacement|Sports injuries|Muscular dystrophy|Scoliosis') },
  { id: 'skin', area: 'Skin, hair & nails', icon: 'sparkle', color: '#fb7185', items: D('Psoriasis|Atopic dermatitis (eczema)|Acne|Rosacea|Vitiligo|Hair loss (alopecia)|Hidradenitis suppurativa|Chronic urticaria (hives)|Fungal nail infection|Chronic wounds & ulcers') },
  { id: 'senses', area: 'Eyes, ears, nose & throat', icon: 'eye', color: '#3b82f6', items: D('Glaucoma|Cataract|Macular degeneration|Diabetic retinopathy|Dry eye|Hearing loss|Tinnitus|Chronic sinusitis|Vertigo|Voice & swallowing disorders') },
  { id: 'immune', area: 'Immunity, allergy & infection', icon: 'shieldCheck', color: '#10b981', items: D('Food allergies|Severe allergies (anaphylaxis)|HIV|Hepatitis|Shingles|Influenza & RSV|Recurrent infections|Primary immunodeficiency|Vaccination experiences|Sepsis recovery') },
  { id: 'blood', area: 'Blood disorders', icon: 'drop', color: '#dc2626', items: D('Anaemia|Sickle cell disease|Thalassaemia|Haemophilia|Blood clotting disorders|Iron overload|Myelodysplastic syndromes|Low platelets (ITP)') },
  { id: 'women', area: 'Women’s & reproductive health', icon: 'venus', color: '#d946ef', items: D('Menopause|Endometriosis|Fertility & IVF|Pregnancy|Contraception|Heavy periods|Uterine fibroids|Pelvic floor disorders|Breastfeeding') },
  { id: 'men', area: 'Men’s health', icon: 'mars', color: '#0891b2', items: D('Low testosterone|Prostate health|Male infertility|Hair loss|Men’s mental health') },
  { id: 'kids', area: 'Children & newborns', icon: 'baby', color: '#22c55e', items: D('Childhood asthma|Food allergy in children|Type 1 diabetes in children|ADHD in children|Autism in children|Premature birth|Childhood vaccines|Paediatric epilepsy|Developmental delays') },
  { id: 'rare', area: 'Rare & genetic conditions', icon: 'dna', color: '#8b5cf6', items: D('Spinal muscular atrophy (SMA)|Huntington’s disease|Duchenne muscular dystrophy|Fabry disease|Gaucher disease|Pompe disease|Haemophilia|Rare cancers|Marfan syndrome|Down syndrome|Phenylketonuria (PKU)') },
  { id: 'pain', area: 'Pain, surgery & recovery', icon: 'bandage', color: '#64748b', items: D('Chronic pain|Post-surgery recovery|Bariatric surgery|Palliative care|Rehabilitation after injury|Amputation & prosthetics|Burns') },
  { id: 'oral', area: 'Dental & oral health', icon: 'tooth', color: '#06b6d4', items: D('Gum disease|Tooth sensitivity|Dental implants|Orthodontics|Dry mouth|Oral ulcers') },
  { id: 'lifestyle', area: 'Healthy living & prevention', icon: 'apple', color: '#16a34a', items: D('Nutrition & diet|Fitness & activity|Smoking cessation|Weight management|Sleep habits|Health screening|Supplements & vitamins|Healthy ageing') },
];

export const CONDITION_COUNT = THERAPY_AREAS.reduce((n, a) => n + a.items.length, 0);

/* ---------- Caregiver profile (added from our side — not in the professionals document) ---------- */
export const CAREGIVER_TYPES = [
  { t: 'Family caregiver', d: 'Unpaid care for a relative at home', icon: 'home' },
  { t: 'Adult child caring for a parent', d: 'Looking after an ageing mum or dad', icon: 'users' },
  { t: 'Spouse or partner caregiver', d: 'Caring for the person you live with', icon: 'heart' },
  { t: 'Parent of a child with health needs', d: 'Chronic, rare or complex childhood conditions', icon: 'baby' },
  { t: 'Long-distance caregiver', d: 'Coordinating care from another city or country', icon: 'plane' },
  { t: 'Young adult carer (18–25)', d: 'Studying or working while caring', icon: 'student' },
  { t: 'Dementia caregiver', d: 'Supporting someone with memory loss', icon: 'brain' },
  { t: 'Disability support carer', d: 'Physical, sensory or learning disability', icon: 'wheelchair' },
  { t: 'Cancer caregiver', d: 'Through treatment, recovery or palliative care', icon: 'ribbon' },
  { t: 'Mental health caregiver', d: 'Supporting a loved one’s mental wellbeing', icon: 'smile' },
  { t: 'Professional home care aide', d: 'Personal support worker or home health aide', icon: 'hands' },
  { t: 'Live-in carer / domestic helper', d: 'Day-to-day care in the client’s home', icon: 'bed' },
  { t: 'Hospice & respite volunteer', d: 'Giving families a break or end-of-life support', icon: 'sun' },
  { t: 'Foster or kinship carer', d: 'Raising a child in your family’s care', icon: 'home' },
];

export const CAREGIVER_Q = {
  type: { q: 'Which best describes your caring role?', options: CAREGIVER_TYPES.map((x) => x.t) },
  relation: { q: 'Who do you care for?', options: ['Parent', 'Spouse / partner', 'Child (under 18)', 'Adult son or daughter', 'Sibling', 'Grandparent', 'Other relative', 'Friend / neighbour', 'A client (paid care)'] },
  age: { q: 'Age of the person you care for', options: ['0–17', '18–44', '45–64', '65–79', '80+'] },
  hours: { q: 'Hours of care per week', options: ['Under 5', '5–20', '21–40', 'More than 40 / live-in'] },
  years: { q: 'How long have you been caring?', options: ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years'] },
  living: { q: 'Where does the person you care for live?', options: ['With me', 'Nearby', 'In another city or country', 'In a care home / facility'] },
  paid: { q: 'Is your caring paid or unpaid?', options: ['Unpaid (family / friend)', 'Paid', 'Both'] },
  tasks: { q: 'What do you help with? (choose all that apply)', options: ['Medicines', 'Appointments & transport', 'Personal care', 'Meals & nutrition', 'Money & insurance', 'Emotional support', 'Medical devices / equipment', 'Talking to doctors'], multi: true },
  decision: { q: 'Your role in care decisions', options: ['Main decision-maker', 'Shared with others', 'Supporting role'] },
};

export const CAREGIVER_JOURNEY = [
  { t: 'Tell us about your caring role', d: 'Who you care for, the main condition and how much time it takes.', icon: 'hands' },
  { t: 'Get short, flexible invitations', d: 'Studies on support services, medicines, devices and daily life as a carer.', icon: 'bell' },
  { t: 'Answer when it suits you', d: 'Most surveys take 8–15 minutes and can be paused.', icon: 'clock' },
  { t: 'Pick your reward', d: 'Cash, gift cards, shopping or grocery vouchers.', icon: 'gift' },
];

/* ---------- Patient profile (added from our side) ---------- */
export const PATIENT_TYPES = [
  { t: 'Living with a long-term condition', d: 'Diabetes, asthma, arthritis, heart disease and more', icon: 'pulse' },
  { t: 'Newly diagnosed', d: 'Diagnosed in the last 12 months', icon: 'sparkle' },
  { t: 'Cancer patient or survivor', d: 'In treatment, remission or survivorship', icon: 'ribbon' },
  { t: 'Rare disease patient', d: 'Conditions affecting few people', icon: 'dna' },
  { t: 'Mental health lived experience', d: 'Depression, anxiety, bipolar, PTSD…', icon: 'smile' },
  { t: 'Recovering after surgery or a hospital stay', d: 'Rehabilitation and recovery journeys', icon: 'bandage' },
  { t: 'Living with a disability', d: 'Physical, sensory or neurological', icon: 'wheelchair' },
  { t: 'Pregnant or a new parent', d: 'Pregnancy, birth and the first year', icon: 'baby' },
  { t: 'Older adult managing several conditions', d: 'Multiple medicines and specialists', icon: 'users' },
  { t: 'Using a medical device or app', d: 'CGM, inhaler, BP monitor, CPAP, health apps', icon: 'phone' },
  { t: 'Health-conscious consumer', d: 'No diagnosis — prevention, fitness and wellness', icon: 'apple' },
];

export const PATIENT_Q = {
  type: { q: 'Which best describes you?', options: PATIENT_TYPES.map((x) => x.t) },
  since: { q: 'When were you diagnosed? (main condition)', options: ['Less than 6 months ago', '6–12 months ago', '1–3 years ago', '3–10 years ago', 'More than 10 years ago', 'No diagnosis'] },
  treatment: { q: 'Current treatment (choose all that apply)', options: ['Tablets / oral medicine', 'Injections or biologics', 'Insulin', 'Inhalers', 'Infusion or chemotherapy', 'Radiotherapy', 'Surgery', 'Physiotherapy / rehab', 'Medical device or monitor', 'Health app', 'Traditional / alternative medicine', 'No treatment right now'], multi: true },
  care: { q: 'Where do you mostly get care?', options: ['GP / primary care', 'Specialist clinic', 'Hospital', 'Telehealth', 'Pharmacy'] },
  cover: { q: 'How is your care mostly paid for?', options: ['Public / government scheme', 'Private insurance', 'Employer cover', 'Out of pocket', 'Prefer not to say'] },
  formats: { q: 'Happy to take part in (choose all that apply)', options: ['Online surveys', 'Phone interviews', 'Video interviews', 'Online focus groups', 'Diary studies'], multi: true },
};

export const PATIENT_JOURNEY = [
  { t: 'Share your health areas', d: 'Optional and confidential. It only decides which studies reach you.', icon: 'lock' },
  { t: 'Receive matched surveys', d: 'About living with your condition, treatments and services.', icon: 'bell' },
  { t: 'Answer from your phone', d: 'No clinics, tests or medicines. Skip any question you like.', icon: 'phone' },
  { t: 'Collect your reward', d: 'Gift cards, shopping or grocery vouchers, or cash by PayPal, bank, wire or UPI.', icon: 'gift' },
];
