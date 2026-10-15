const L = (s) => [...new Set(s.split('\n').map((x) => x.trim()).filter(Boolean))];
const YN = ['Yes', 'No'];

export const SCREENER = {
  industry: { q: 'Do you work in the healthcare industry?', options: YN },
  clinician: { q: 'Are you a clinician?', options: YN },
  rejectMessage: 'Thank you for your interest. You don’t meet our healthcare recruitment criteria, so we can’t create a professional account for you.',
};

export const DEMO = {
  gender: { q: 'What is your gender?', options: ['Male', 'Female', 'Other'] },
  age: { q: 'What is your age group?', options: ['21-29', '30-39', '40-49', '50-59', '60+'] },
  marital: { q: 'What is your marital status?', options: ['Single', 'Married', 'Divorced', 'Widow/Widower'] },
  children: { q: 'Number of children below 18 living in your household?', options: ['0', '1-3', '4-6', '7+'] },
  personalIncome: { q: 'What is your approximate annual personal income (before tax)?', options: ['Less than $10,000', '$10,000 – $24,999', '$25,000 – $49,999', '$50,000 – $99,999', '$100,000+', 'Prefer not to answer'] },
  familyIncome: { q: 'What is your approximate total family annual income (before tax)?', options: ['Less than $25,000', '$25,000 – $49,999', '$50,000 – $99,999', '$100,000 – $199,999', '$200,000+', 'Prefer not to answer'] },
};

/** Age group from an ISO date of birth (the questionnaire asks for an age band; we already have the DOB). */
export function ageGroupFrom(dob) {
  if (!dob) return '';
  const d = new Date(dob);
  if (Number.isNaN(+d)) return '';
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a -= 1;
  if (a < 21) return 'Under 21';
  if (a < 30) return '21-29';
  if (a < 40) return '30-39';
  if (a < 50) return '40-49';
  if (a < 60) return '50-59';
  return '60+';
}

export const EDUCATION = {
  q: 'What is your highest level of education?',
  levels: ['Diploma', 'Bachelor’s', 'Master’s', 'Doctorate', 'Others'],
  branches: {
    Diploma: {
      q2: 'What type of diploma have you completed?',
      o2: ['Nursing diploma (GNM/ANM)', 'Paramedical diploma (Lab technician, Radiology, Physiotherapy, etc.)', 'Pharmacy diploma (D.Pharm)', 'Other healthcare-related diploma'],
      q3: 'Are you certified/licensed to practice in your field?',
      o3: ['Yes', 'No', 'Currently under process'],
    },
    'Bachelor’s': {
      q2: 'What is your bachelor’s qualification?',
      o2: ['MBBS (Medicine)', 'BDS (Dentistry)', 'B.Sc Nursing', 'B.Pharm (Pharmacy)', 'BPT (Physiotherapy)', 'Other (please specify)'],
      q3: 'Do you hold a professional registration/licensure?',
      o3: ['Yes, with national medical/dental/nursing/pharmacy council', 'Yes, with state medical/dental/nursing/pharmacy council', 'No', 'Under process'],
    },
    'Master’s': {
      q2: 'What is your master’s qualification?',
      o2: ['MD/MS (Postgraduate Medicine/Surgery)', 'MDS (Dentistry)', 'M.Sc Nursing', 'M.Pharm (Pharmacy)', 'MPT (Physiotherapy)', 'Other healthcare master’s degree'],
      q3: 'Do you have a specialist certification/board recognition?',
      o3: ['Yes (e.g., Cardiologist, Oncologist, Orthopedic Surgeon, etc.)', 'No', 'Currently pursuing'],
    },
    Doctorate: {
      q2: 'What is your doctoral qualification?',
      o2: ['DM/MCh (Super-specialty Medicine/Surgery)', 'PhD (Healthcare/Medical Science)', 'Other (please specify)'],
      q3: 'Do you have certification/registration with a professional council or board?',
      o3: ['Yes, National Medical Council or equivalent', 'Yes, International Medical Board (e.g., USMLE, MRCP, FRCS)', 'No', 'Under process'],
    },
    Others: {
      q2: 'Please specify your qualification.',
      o2: null, // free text
      q3: 'Are you certified/licensed to practice in your field?',
      o3: ['Yes', 'No', 'Currently under process'],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Medical doctors & physicians: specialization → job level            */
/* ------------------------------------------------------------------ */
const DOCTOR_JOBS = {
  'General Practitioner (GP) / Family Physician': L(`General Practitioner (GP)
Family Medicine Physician
Primary Care Physician
House Officer (Intern)
Resident Doctor
Medical Officer
Attending Physician
Consultant Physician
Senior Consultant
Chief Medical Officer (CMO)
Medical Superintendent
Medical Director`),
  'Internal Medicine Specialist': L(`Internal Medicine Physician (Internist)
Cardiologist
Endocrinologist
Gastroenterologist
Nephrologist
Rheumatologist
Haematologist
Infectious Disease Specialist
Geriatrician
Hospitalist
Diabetologist
HIV/AIDS Specialist`),
  'Paediatrics & Neonatology': L(`Paediatrician
Neonatologist
Paediatric Neurologist
Paediatric Cardiologist
Paediatric Endocrinologist
Paediatric Intensivist`),
  Cardiology: L(`Cardiologist
Interventional Cardiologist
Non-Invasive Cardiologist
Paediatric Cardiologist
Electrophysiologist
Cardiothoracic Surgeon
Cardiology Resident
Fellow in Cardiology
Cardiac Intensivist
Preventive Cardiologist`),
  Pulmonology: L(`Pulmonologist (Chest Physician)
Critical Care / Intensive Care Specialist
Sleep Medicine Specialist
Respiratory Medicine Consultant
Pulmonology Fellow / Trainee
Thoracic Surgeon`),
  Neurology: L(`Neurologist
Neurophysiologist
Paediatric Neurologist
Neurocritical Care Specialist
Stroke Specialist
Clinical Neurophysiologist
Neuro-oncologist
Movement Disorder Specialist
Epileptologist
Neuro-rehabilitation Specialist
Neurology Resident / Fellow`),
  Endocrinology: L(`Endocrinologist
Diabetologist
Paediatric Endocrinologist
Reproductive Endocrinologist
Thyroid Specialist
Metabolic Specialist
Obesity Medicine Physician
Endocrinology Resident / Fellow
Consultant Endocrinologist`),
  Gastroenterology: L(`Gastroenterologist
Hepatologist
Paediatric Gastroenterologist
Interventional Gastroenterologist
GI Oncologist
GI Motility Specialist
Pancreatologist
Colorectal Specialist (MD)
Gastroenterology Resident / Fellow
Consultant Gastroenterologist`),
  Oncology: L(`Medical Oncologist
Radiation Oncologist
Surgical Oncologist
Haematologist-Oncologist
Paediatric Oncologist
Gynaecologic Oncologist
Neuro-Oncologist
Thoracic Oncologist
Breast Oncologist
Urologic Oncologist
Gastrointestinal (GI) Oncologist
Palliative Care Oncologist
Oncology Resident / Fellow
Consultant Oncologist`),
  Nephrology: L(`Nephrologist
Paediatric Nephrologist
Transplant Nephrologist
Hypertension Specialist
Critical Care Nephrologist
Onco Nephrologist
Cardio Nephrologist
Consultant Nephrologist
Nephrology Fellow / Resident`),
  Orthopaedic: L(`Orthopaedic Surgeon
Trauma Orthopaedic Surgeon
Paediatric Orthopaedic Surgeon
Spine Surgeon (Orthopaedic Spine)
Joint Replacement Surgeon
Sports Medicine Orthopaedist
Hand & Upper Limb Surgeon
Foot & Ankle Surgeon
Orthopaedic Oncologist
Shoulder & Elbow Specialist
Orthopaedic Consultant
Orthopaedic Resident / Fellow`),
  Rheumatology: L(`Rheumatologist
Paediatric Rheumatologist
Rheumatology Fellow / Trainee
Immunologist (Clinical)
Consultant Rheumatologist`),
  'Psychology & Mental Health': L(`Clinical Psychologist
Counselling Psychologist
Child Psychologist
Forensic Psychologist
Neuropsychologist
Health Psychologist
Rehabilitation Psychologist
Addiction Counsellor / Psychologist
School Psychologist
Psychiatrist
Psychiatric Nurse
Mental Health Counsellor / Therapist
Behavioural Therapist
Marriage and Family Therapist (MFT)
Art / Music Therapist
Psychological Researcher
Psychometrician
Neurodiagnostic Technician
Mental Health Program Coordinator
Clinical Research Coordinator – Psychiatry/Psychology
Quality Assurance Officer – Mental Health Services`),
  Dermatology: L(`Dermatologist
Cosmetic Dermatologist
Dermatopathologist
Paediatric Dermatologist
Trichologist (Medical)
Allergist (Dermatology Focus)
Dermatology Resident / Fellow
Consultant Dermatologist`),
  Ophthalmology: L(`Ophthalmologist
General Ophthalmologist
Paediatric Ophthalmologist
Neuro-Ophthalmologist
Retina Specialist / Vitreoretinal Surgeon
Cornea Specialist
Glaucoma Specialist
Oculoplastic Surgeon
Refractive Surgeon / LASIK Specialist
Ophthalmology Resident / Fellow
Consultant Ophthalmologist`),
  'ENT Specialist': L(`ENT Specialist / Otolaryngologist
ENT Surgeon
Paediatric ENT Specialist
Otologist / Neurotologist
Rhinologist
Laryngologist
Head & Neck Oncologic Surgeon
Skull Base Surgeon
Facial Plastic & Reconstructive Surgeon
ENT Resident / Fellow
Consultant ENT Surgeon
Audiologist
Speech-Language Pathologist
Hearing Aid Specialist / Fitter
ENT Nurse
Vestibular Therapist
Swallow Therapist / Dysphagia Specialist`),
  Radiology: L(`Radiologist
Diagnostic Radiologist
Interventional Radiologist
Neuroradiologist
Musculoskeletal Radiologist
Paediatric Radiologist
Cardiothoracic Radiologist
Breast Imaging Specialist
Nuclear Medicine Physician
Radiology Resident / Fellow
Consultant Radiologist`),
  Anaesthesiology: L(`Anaesthesiologist
Cardiac Anaesthesiologist
Neuro-Anaesthesiologist
Paediatric Anaesthesiologist
Critical Care Anaesthesiologist / Intensivist
Pain Management Specialist
Obstetric Anaesthesiologist
Transplant Anaesthesiologist
Consultant Anaesthesiologist
Resident / Fellow in Anaesthesiology`),
  'Emergency Medicine': L(`Emergency Medicine Physician
Emergency Room (ER) Doctor
Trauma Surgeon
Critical Care / ICU Physician
Paediatric Emergency Physician
Toxicologist (Emergency Focus)
Disaster Medicine Specialist
Emergency Medicine Resident / Fellow
Consultant Emergency Physician`),
  Pathology: L(`Pathologist
Anatomical Pathologist
Clinical Pathologist
Hematopathologist
Cytopathologist
Molecular Pathologist
Forensic Pathologist
Neuropathologist
Dermatopathologist
Paediatric Pathologist
Pathology Resident / Fellow
Consultant Pathologist`),
  Geriatrician: L(`Geriatrician
Consultant Geriatrician
Geriatric Psychiatrist
Palliative Care Geriatrician
Geriatric Cardiologist
Geriatric Oncologist
Geriatric Emergency Medicine Physician
Geriatric Rehabilitation Specialist
Geriatric Fellow / Resident`),
  'Infectious Diseases': L(`Infectious Disease Specialist (ID Physician)
Tropical Medicine Specialist
HIV/AIDS Specialist
Travel Medicine Physician
Paediatric Infectious Disease Specialist
Hospital Epidemiologist
Transplant Infectious Disease Specialist
Infectious Disease Consultant
Infectious Disease Fellow / Resident`),
  Haematology: L(`Haematologist
Paediatric Haematologist
Haemato-Oncologist
Transfusion Medicine Specialist
Bone Marrow Transplant Physician
Thrombosis and Haemostasis Specialist
Sickle Cell Disease Specialist
Consultant Haematologist
Haematology Fellow / Resident`),
  'Sports Medicine': L(`Sports Medicine Physician
Orthopaedic Sports Surgeon
Team Physician
Primary Care Sports Physician
Physiatrist – Sports Rehabilitation
Paediatric Sports Medicine Specialist
Exercise Medicine Specialist
Concussion Specialist / Neuro-Sports Physician
Fellow / Resident – Sports Medicine`),
  'Palliative Care': L(`Palliative Care Physician
Consultant – Palliative Medicine
Hospice Physician
Oncologist with Palliative Focus
Geriatrician – Palliative Integration
Palliative Care Fellow / Resident
Emergency Physician – Palliative Focus
Primary Care Physician – Palliative Training`),
  'Occupational Health': L(`Occupational Medicine Physician / Occupational Health Doctor
Industrial Physician
Environmental Health Physician
Corporate Health Physician
Occupational Health Consultant
Medical Review Officer (MRO)
Occupational Health Resident / Fellow`),
  Histopathology: L(`Histopathologist / Anatomic Pathologist
Dermatopathologist
Neuropathologist
Forensic Pathologist
Molecular Pathologist
Histopathology Consultant
Histopathology Fellow / Resident`),
  Cytopathology: L(`Cytopathologist
Anatomic Pathologist with Cytopathology Focus
Cytopathology Consultant
Cytopathology Fellow / Resident`),
  'Molecular Diagnostics': L(`Molecular Pathologist
Clinical Geneticist
Molecular Diagnostic Consultant
Molecular Diagnostics Fellow / Resident`),
  Microbiology: L(`Clinical Microbiologist
Infectious Disease Physician
Medical Microbiology Consultant
Microbiology Fellow / Resident`),
  'Clinical Chemistry': L(`Clinical Biochemist / Chemical Pathologist
Clinical Chemistry Consultant
Clinical Chemistry Fellow / Resident
Toxicologist`),
  'Forensic Pathology': L(`Forensic Pathologist
Forensic Medical Examiner
Forensic Pathology Consultant
Forensic Pathology Fellow / Resident
Forensic Toxicologist
Forensic Odontologist
Forensic Anthropologist`),
  Immunopathology: L(`Immunopathologist
Clinical Immunologist
Allergist/Immunologist (MD/DO)
Immunopathology Consultant
Immunopathology Fellow / Resident`),
};

/* ------------------------------------------------------------------ */
/* Nursing & midwifery: specialization → job level                      */
/* ------------------------------------------------------------------ */
const NURSE_JOBS = {
  'General Practitioner (GP) / Family Nurse': L(`Primary Care Nurse
General Practice Nurse (GP Nurse)
Family Practice Nurse
Community Health Nurse
Outpatient Nurse
Triage Nurse (Primary Care)
Health Promotion Nurse
Care Coordinator / Case Manager Nurse
Family Nurse Practitioner (FNP)
Primary Care Nurse Practitioner (NP)
Advanced Practice Registered Nurse (APRN) – Family Medicine
Nurse Prescriber (UK/EU/ANZ regions)
Practice Nurse Manager
Clinical Nurse Assistant (CNA) – GP Setting
Licensed Practical Nurse (LPN) / Enrolled Nurse (EN)
Medical Assistant (Nursing Background)`),
  'Internal Medicine Nurse': L(`Internal Medicine Staff Nurse
Medical-Surgical (Med-Surg) Nurse
Chronic Disease Nurse Specialist
Telemetry Nurse
Inpatient Internal Medicine Nurse
Outpatient/Internal Medicine Clinic Nurse
Case Management Nurse (Internal Medicine)
Clinical Nurse Specialist (CNS) – Internal Medicine
Nurse Educator (Internal Medicine)
Adult Nurse Practitioner (ANP)
Acute Care Nurse Practitioner (ACNP)
Clinical Nurse Specialist (CNS) – Adult Health/Internal Medicine`),
  'Paediatrics & Neonatology Nurse': L(`Paediatric Staff Nurse
Paediatric Intensive Care Unit (PICU) Nurse
Paediatric Surgery Nurse
School Nurse
Paediatric Outpatient Nurse
Paediatric Allergy/Immunology Nurse
Neonatal Intensive Care Unit (NICU) Nurse
Neonatal Transport Nurse
Neonatal Nurse Practitioner (NNP)
Postnatal Ward Nurse
Paediatric Nurse Practitioner (PNP)
Clinical Nurse Specialist (CNS) – Paediatrics/Neonatology
Paediatric Diabetes Nurse Specialist
Paediatric Respiratory Nurse`),
  'Surgical Nurse': L(`Perioperative Nurse / Operating Room (OR) Nurse
Scrub Nurse
Circulating Nurse
Preoperative Nurse
Post-Anaesthesia Care Unit (PACU) Nurse / Recovery Room Nurse
Surgical ICU Nurse
Day Surgery / Ambulatory Care Nurse
Specialty Surgical Nurse
Clinical Nurse Specialist (CNS) – Perioperative Nursing
Nurse Practitioner (NP) – Surgical
Surgical Nurse Educator`),
  'Cardiology Nurse': L(`Cardiac Care Nurse
Coronary Care Unit (CCU) Nurse
Telemetry Nurse (Cardiac)
Cardiac Cath Lab Nurse
Electrophysiology Nurse
Heart Failure Nurse Specialist
Cardiac Rehabilitation Nurse
Paediatric Cardiology Nurse
Cardiac Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Cardiology
Cardiac Nurse Educator`),
  'Pulmonology Nurse': L(`Pulmonary Nurse
Respiratory Care Nurse
Critical Care/ICU Nurse (Pulmonary)
Sleep Clinic Nurse
Pulmonary Function Test (PFT) Nurse
Bronchoscopy Nurse
Pulmonary Rehabilitation Nurse
Pulmonary Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Pulmonology
Respiratory Nurse Educator`),
  'Neurology Nurse': L(`Neurology Staff Nurse
Neuro ICU Nurse
Epilepsy Nurse Specialist
Stroke Nurse Specialist
Multiple Sclerosis (MS) Nurse
Neurosurgery Nurse
Neuro Rehabilitation Nurse
Neurology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Neurology
Neuro Nurse Educator`),
  'Endocrinology Nurse': L(`Endocrinology Nurse
Diabetes Nurse Specialist
Hormone Replacement Therapy (HRT) Nurse
Outpatient Endocrinology Nurse
Inpatient Endocrinology Nurse
Endocrine Oncology Nurse
Endocrinology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Endocrinology
Diabetes Educator Nurse`),
  'Gastroenterology Nurse': L(`Gastroenterology Nurse
Endoscopy Nurse
Hepatology Nurse
Inflammatory Bowel Disease (IBD) Nurse Specialist
Gastrointestinal Oncology Nurse
Outpatient Gastroenterology Nurse
Gastroenterology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Gastroenterology
Endoscopy Nurse Educator`),
  'Oncology Nurse': L(`Oncology Staff Nurse
Chemotherapy Nurse
Radiation Oncology Nurse
Bone Marrow Transplant (BMT) Nurse
Paediatric Oncology Nurse
Oncology Clinical Trials Nurse
Hospice and Palliative Care Nurse
Oncology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Oncology
Oncology Nurse Educator`),
  'Nephrology Nurse': L(`Nephrology Nurse
Dialysis Nurse (Renal Nurse)
Home Dialysis Nurse
Transplant Nurse – Nephrology
CKD Nurse Educator
Paediatric Nephrology Nurse
Nephrology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Nephrology
Renal Nurse Educator`),
  'Orthopaedic Nursing': L(`Orthopaedic Staff Nurse
Orthopaedic Surgical Nurse
Orthopaedic Trauma Nurse
Orthopaedic Rehabilitation Nurse
Paediatric Orthopaedic Nurse
Spine Nurse
Casting/Fracture Clinic Nurse
Orthopaedic Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Orthopaedics
Orthopaedic Nurse Educator`),
  'Rheumatology Nurse': L(`Rheumatology Nurse
Autoimmune Disease Nurse
Infusion Nurse – Rheumatology
Lupus Nurse Specialist
Arthritis Nurse Educator
Paediatric Rheumatology Nurse
Rheumatology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Rheumatology
Biologic Therapy Nurse Specialist`),
  'Psychology & Mental Health Nurse': L(`Mental Health Nurse (Psychiatric Nurse)
Community Mental Health Nurse
Child and Adolescent Mental Health Nurse
Forensic Mental Health Nurse
Addiction Nurse Specialist
Psychiatric Intensive Care Nurse
Crisis Intervention Nurse
Psychiatric Liaison Nurse
Mental Health Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Mental Health
Psychiatric Nurse Educator`),
  'Dermatology Nurse': L(`Dermatology Nurse
Wound Care Nurse
Dermatology Nurse Practitioner (NP)
Cosmetic Dermatology Nurse
Phototherapy Nurse
Skin Cancer Nurse Specialist
Paediatric Dermatology Nurse
Clinical Nurse Specialist (CNS) – Dermatology
Dermatology Nurse Educator`),
  'Ophthalmology Nurse': L(`Ophthalmology Nurse
Eye Surgery Nurse
Glaucoma Nurse Specialist
Retina Nurse Specialist
Low Vision Nurse
Paediatric Ophthalmology Nurse
Ophthalmic Diagnostic Nurse
Ophthalmology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Ophthalmology
Ophthalmology Nurse Educator`),
  'ENT Specialist Nurse': L(`ENT Nurse
Audiology Nurse
Head and Neck Surgery Nurse
ENT Outpatient Nurse
Sleep Apnoea Nurse Specialist
Paediatric ENT Nurse
Tinnitus Nurse Specialist
ENT Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – ENT
ENT Nurse Educator`),
  'Radiology Nurse': L(`Radiology Nurse
Interventional Radiology Nurse
Radiology Procedure Nurse
Nuclear Medicine Nurse
MRI Nurse Specialist
Radiology Nurse Educator
Radiology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Radiology`),
  'Anaesthesiology Nurse': L(`Anaesthesia Nurse (Perioperative Nurse)
Post-Anaesthesia Care Unit (PACU) Nurse
Critical Care Nurse (with anaesthesia focus)
Regional Anaesthesia Nurse
Sedation Nurse
Anaesthesia Nurse Educator
Nurse Anaesthetist (CRNA – Certified Registered Nurse Anaesthetist)
Clinical Nurse Specialist (CNS) – Anaesthesia`),
  'Emergency Medicine Nurse': L(`Emergency Nurse
Trauma Nurse
Triage Nurse
Paediatric Emergency Nurse
Critical Care Transport Nurse
Emergency Nurse Practitioner (ENP)
Disaster/Emergency Preparedness Nurse
Clinical Nurse Specialist (CNS) – Emergency`),
  'Pathology Nurse': L(`Pathology Nurse
Phlebotomy Nurse
Histology/Histopathology Nurse
Molecular Diagnostics Nurse
Specimen Transport Nurse
Clinical Nurse Specialist (CNS) – Pathology
Pathology Nurse Educator`),
  'Geriatrician Nurse': L(`Geriatric Nurse
Elder Care Nurse
Dementia Care Nurse
Palliative Care Nurse (Geriatrics)
Rehabilitation Nurse (Geriatrics)
Geriatric Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Geriatrics
Geriatric Nurse Educator`),
  'Infectious Diseases Nurse': L(`Infectious Diseases Nurse
Infection Control Nurse
HIV/AIDS Nurse Specialist
Tuberculosis (TB) Nurse
Travel Health Nurse
Public Health Nurse (Infectious Diseases)
Infectious Diseases Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Infectious Diseases
Infectious Diseases Nurse Educator`),
  'Sports Medicine Nurse': L(`Sports Medicine Nurse
Athletic Trainer Nurse
Rehabilitation Nurse (Sports Medicine)
Orthopaedic Sports Nurse
Exercise Physiologist Nurse
Concussion Nurse Specialist
Sports Nutrition Nurse
Sports Medicine Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Sports Medicine`),
  'Palliative Care Nurse': L(`Palliative Care Nurse
Hospice Nurse
Pain Management Nurse
Paediatric Palliative Care Nurse
Home Care Palliative Nurse
Bereavement Nurse Specialist
Palliative Care Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Palliative Care
Palliative Care Nurse Educator`),
  'Occupational Health Nurse': L(`Occupational Health Nurse
Workplace Safety Nurse
Industrial Health Nurse
Case Management Nurse (Occupational Health)
Employee Wellness Nurse
Ergonomics Nurse Specialist
Environmental Health Nurse
Occupational Health Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Occupational Health
Occupational Health Nurse Educator`),
  'Histopathology Nurse': L(`Histopathology Nurse
Histology Nurse
Anatomical Pathology Nurse
Tissue Bank Nurse
Pathology Nurse Specialist
Surgical Tissue Recovery Nurse
Biomedical Science Support Nurse (Histology Focus)
Advanced Nurse Practitioner (Histopathology)
Clinical Nurse Specialist – Pathology Services
Research Nurse – Histopathology
Quality Control Nurse – Histology Lab
Senior Pathology Nurse Coordinator
Consultant Nurse – Cellular Pathology
Molecular Pathology Nurse Specialist
Operating Room Nurse (Histopathology Specimen Handling)
Oncology Nurse (with Histopathology Liaison Duties)
Post-Mortem Nurse (PME/Autopsy Suite Nurse)
Tissue Procurement Nurse
Intraoperative Frozen Section Nurse`),
  'Haematology Nurse': L(`Haematology Nurse
Coagulation Nurse Specialist
Leukaemia Nurse Specialist
Haematology Day Care Nurse
Haematology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) – Haematology
Haematology Nurse Educator
Haematology Staff Nurse
Registered Nurse – Haematology Unit
Haematology Clinic Nurse
Inpatient Haematology Nurse
Outpatient Haematology Nurse
Haematology Nurse Specialist
Advanced Nurse Practitioner – Haematology
Nurse Consultant – Haematology
Bone Marrow Transplant Nurse
Sickle Cell Nurse Specialist
Haemophilia Nurse Specialist
Apheresis Nurse
Stem Cell Transplant Coordinator Nurse
Research Nurse – Haematology/Oncology
Clinical Trials Nurse – Haematology
Palliative Care Nurse – Haematology Patients
Blood Disorder Case Manager Nurse
Oncology Haematology Nurse
Medical Oncology and Haematology Nurse
Paediatric Haematology Nurse
Infusion Nurse – Haematology
Transfusion Nurse`),
  'Cytopathology Nurse': L(`Cytopathology Nurse
Cytology Nurse
Pathology Nurse – Cytology
Cytopathology Support Nurse
Specimen Collection Nurse – Cytology
Pap Smear Nurse
Fine Needle Aspiration (FNA) Nurse
EUS-FNA Procedure Nurse (Endoscopic Ultrasound-Guided Fine Needle Aspiration)
Clinical Nurse Specialist – Cytopathology
Cytopathology Procedure Coordinator Nurse
Advanced Nurse Practitioner – Cytopathology
FNA Clinic Nurse Coordinator
Cervical Screening Nurse Specialist
Liquid-Based Cytology Nurse
Rapid On-Site Evaluation (ROSE) Nurse Assistant
Oncology Nurse with Cytopathology Duties
Diagnostic Nurse – Cytology
Colposcopy Clinic Nurse
Women’s Health Nurse – Cytology Focus
Endoscopy Nurse – Cytology Specimen Handling
Research Nurse – Cytopathology
Nurse Educator – Cytology/Screening
Clinical Trials Nurse – Cytology Diagnostics`),
  'Molecular Diagnostics Nurse': L(`Molecular Diagnostics Nurse
Genomics Nurse
Precision Medicine Nurse
Genetic Testing Nurse
Genomic Screening Nurse
Molecular Oncology Nurse
Biomarker Testing Nurse
Molecular Pathology Nurse
Clinical Nurse Specialist – Molecular Diagnostics
Advanced Nurse Practitioner – Genomic Medicine
Genetic Nurse Counsellor (in some countries, requires additional licensure)
Molecular Testing Coordinator Nurse
Cancer Genomics Nurse Specialist
Next-Generation Sequencing (NGS) Nurse Advisor
Pharmacogenomics Nurse Specialist
Clinical Research Nurse – Molecular Studies
Molecular Clinical Trials Nurse
Lab Liaison Nurse – Molecular Testing
Bioinformatics Nurse Liaison
Molecular Data Interpretation Nurse Assistant`),
  'Microbiology Nurse': L(`Microbiology Nurse
Infection Prevention Nurse
Clinical Nurse – Microbiology Unit
Isolation Ward Nurse
Antimicrobial Stewardship Nurse
Outbreak Response Nurse
Pathology Nurse – Microbiology
Microbiology Specimen Collection Nurse
Clinical Laboratory Liaison Nurse
Specimen Transport & Handling Nurse (Microbiology Focus)
Lab Support Nurse – Microbial Testing
Public Health Nurse – Infectious Disease Surveillance
Disease Surveillance Nurse
Epidemiology Nurse
Field Infection Control Nurse
Community Health Nurse – Infectious Disease Focus
Clinical Research Nurse – Microbiology/Infectious Diseases
Microbial Genomics Nurse Specialist
Vaccine Research Nurse
Biosecurity Nurse
Antibiotic Resistance Nurse Advocate
ICU Nurse (Infection Management Focus)
Operating Room Nurse (Aseptic Technique & Infection Control)
Transplant Nurse (Infection Risk Monitoring)
Paediatric Infectious Disease Nurse
TB Control Program Nurse
HIV/AIDS Nurse
COVID-19 Response Nurse`),
  'Clinical Chemistry Nurse': L(`Clinical Chemistry Nurse
Clinical Laboratory Nurse
Specimen Collection Nurse
Diagnostic Services Nurse
Lab Liaison Nurse
Clinical Nurse – Biochemistry Department
Pre-Analytical Services Nurse
Outpatient Laboratory Nurse
Point-of-Care Testing (POCT) Nurse
Metabolic Screening Nurse
Electrolyte Monitoring Nurse
Therapeutic Drug Monitoring (TDM) Nurse
Clinical Nurse Specialist – Laboratory Medicine
Biochemistry Nurse Consultant
Endocrinology Nurse (Biochemistry Link)
Toxicology Nurse
Cardiac Biomarker Nurse
Renal Function Monitoring Nurse
Metabolic Disorder Nurse Specialist
Clinical Research Nurse – Biochemistry Focus
Lab Data Quality Assurance Nurse
Medical Laboratory Liaison Nurse
Public Health Nurse – Screening Programs
Clinical Trials Nurse – Lab Diagnostics`),
  'Forensic Pathology Nurse': L(`Forensic Nurse
Forensic Pathology Nurse
Forensic Nurse Examiner (FNE)
Sexual Assault Nurse Examiner (SANE)
Forensic Clinical Nurse Specialist
Nurse Death Investigator
Medico-Legal Nurse Consultant
Forensic Autopsy Nurse
Trauma/ER Forensic Nurse
Forensic Nurse Investigator
Nurse Coroner Assistant
Medicolegal Death Investigator (with nursing background)
Crime Scene Nurse Consultant
Nurse Forensic Case Manager
Forensic Evidence Collection Nurse
Forensic Nursing Educator
Clinical Instructor in Forensic Nursing
Forensic Research Nurse
Academic Lecturer in Forensic Pathology Nursing
Program Coordinator – Forensic Nursing
Forensic Nursing Program Director
Chief Forensic Nurse Examiner
Forensic Nursing Coordinator (Hospital/Community)
Supervisor – Forensic Nurse Services
Director of Forensic & Medico-Legal Services`),
  'Immunopathology Nurse': L(`Immunopathology Nurse
Clinical Immunology Nurse
Autoimmune Disorders Nurse Specialist
Transplant Immunology Nurse (focus on graft rejection, immunosuppression)
Allergy & Immunology Nurse
Rheumatology/Immunology Nurse Specialist
Oncology Immunotherapy Nurse (checkpoint inhibitors, CAR-T, etc.)
Infectious Disease & Immunology Nurse
Immunopathology Lab Nurse (liaison between patients and lab teams)
Clinical Trials Nurse – Immunopathology
Nurse Coordinator – Immunology Diagnostics
Immunology Research Nurse
Nurse Scientist – Immunopathology
Immunology Nursing Educator
Research Nurse in Immunopathology/Immunotherapy
Clinical Instructor – Immunology/Pathology Nursing
Program Coordinator – Immunopathology Nursing
Immunology/Pathology Nurse Manager
Director of Clinical Immunology Nursing
Advanced Practice Nurse (APN) – Immunopathology`),
};

/* ------------------------------------------------------------------ */
/* Pharmacy: key area → specialization + job level                      */
/* ------------------------------------------------------------------ */
const PHARMACY_AREAS = {
  'Clinical & Patient-Centred Specializations': {
    specs: L(`Clinical Pharmacy
Cardiology Pharmacy
Oncology Pharmacy
Infectious Diseases Pharmacy
Critical Care Pharmacy
Geriatric Pharmacy
Paediatric Pharmacy
Psychiatric Pharmacy
Ambulatory Care Pharmacy
Emergency Medicine Pharmacy
Nephrology Pharmacy
Internal Medicine Pharmacy
Pain Management and Palliative Care Pharmacy`),
    jobs: L(`Clinical Pharmacist
Clinical Pharmacy Specialist
Clinical Staff Pharmacist
Clinical Pharmacist Practitioner (CPP)
Clinical Pharmacy Consultant
Senior Clinical Pharmacist
Advanced Clinical Pharmacist
Lead Clinical Pharmacist
Cardiology Clinical Pharmacist
Oncology Clinical Pharmacist
Infectious Disease Clinical Pharmacist
Critical Care Clinical Pharmacist
Geriatric Clinical Pharmacist
Paediatric Clinical Pharmacist
Psychiatric Clinical Pharmacist
Emergency Medicine Clinical Pharmacist
Nephrology Clinical Pharmacist
Anticoagulation Clinical Pharmacist
Endocrinology Clinical Pharmacist
HIV/AIDS Clinical Pharmacist
Transplant Clinical Pharmacist
Haematology Clinical Pharmacist
Pain Management Clinical Pharmacist
Palliative Care Clinical Pharmacist`),
  },
  'Laboratory & Diagnostic Specializations': {
    specs: L(`Pharmacogenomics and Precision Medicine
Pharmacokinetics and Pharmacodynamics
Nuclear Pharmacy
Compounding Pharmacy
Clinical Toxicology
Therapeutic Drug Monitoring (TDM)`),
    jobs: L(`Pathologist
Clinical Pathologist
Anatomical Pathologist
Laboratory Director
Laboratory Manager
Laboratory Supervisor
Medical Laboratory Scientist
Medical Laboratory Technologist
Medical Technologist
Clinical Laboratory Scientist
Laboratory Technician
Laboratory Assistant
Biomedical Scientist
Microbiologist
Clinical Microbiologist
Molecular Biologist
Molecular Diagnostics Specialist
Geneticist
Genetic Counselor
Cytotechnologist
Histotechnologist
Hematologist
Blood Bank Technologist
Transfusion Specialist
Immunologist
Clinical Chemist
Biochemist
Clinical Biochemist
Phlebotomist
Quality Manager
Quality Assurance Manager
Laboratory Operations Manager
Laboratory Administrator
Laboratory IT Manager
LIS Administrator
Diagnostic Product Manager
Laboratory Procurement Manager
Diagnostic Sales Manager
Business Development Manager`),
  },
  // ADDED — the source document lists this key area without specializations or job levels.
  'Hospital & Institutional Pharmacy Specialties': {
    specs: L(`Hospital (Inpatient) Pharmacy
Sterile Compounding / IV Admixture
Oncology Infusion Pharmacy
Medication Safety
Antimicrobial Stewardship
Long-Term Care / Nursing Home Pharmacy
Correctional & Institutional Pharmacy`),
    jobs: L(`Hospital Pharmacist
Inpatient Staff Pharmacist
IV / Sterile Compounding Pharmacist
Oncology Infusion Pharmacist
Medication Safety Pharmacist
Antimicrobial Stewardship Pharmacist
Night / Overnight Hospital Pharmacist
Clinical Coordinator – Hospital Pharmacy
Hospital Pharmacy Supervisor
Long-Term Care Pharmacist
Institutional Pharmacist
Hospital Pharmacy Technician`),
  },
  'Research, Industry, and Development': {
    specs: L(`Pharmaceutical Research and Development
Regulatory Affairs Pharmacy
Pharmacovigilance
Clinical Trials Pharmacist
Medical Science Liaison (MSL)
Drug Information Specialist
Formulation Scientist
Biopharmaceuticals & Biotechnology Pharmacy
Pharmaceutical Manufacturing Pharmacist`),
    jobs: L(`Pharmaceutical Scientist
Research Pharmacist
Clinical Research Pharmacist
Drug Development Scientist
Formulation Scientist
Medicinal Chemist
Pharmacologist
Toxicologist
Pharmaceutical Research Associate
Biopharmaceutical Scientist
Pharmaceutical Microbiologist
Pharmacokinetics Scientist
Bioanalytical Scientist
Pharmacogenomics Scientist
Clinical Trials Pharmacist
Clinical Research Coordinator
Regulatory Affairs Specialist
Regulatory Affairs Manager
Quality Assurance (QA) Specialist
Quality Control (QC) Analyst
Pharmacovigilance Specialist
Drug Safety Officer
Medical Science Liaison (MSL)
Clinical Data Manager
Biostatistician
Pharmaceutical Manufacturing Pharmacist
Process Development Scientist
Production Supervisor – Pharmaceutical Manufacturing
Validation Specialist
Quality Control Pharmacist
Sterile Products Manufacturing Specialist
Medical Affairs Pharmacist
Pharmaceutical Sales Specialist
Pharmaceutical Marketing Manager
Health Economics and Outcomes Research (HEOR) Specialist
Pharmacy Business Development Manager
Pharmaceutical Policy Analyst`),
  },
  'Retail & Community Pharmacy Specializations': {
    specs: L(`Community Pharmacy
Retail Pharmacy Management
Medication Therapy Management (MTM)
Travel Health Pharmacist
Immunization Pharmacist
Wellness & Lifestyle Pharmacist`),
    jobs: L(`Community Pharmacist
Retail Pharmacist
Dispensing Pharmacist
Staff Pharmacist
Licensed Pharmacist
Registered Pharmacist (RPh)
Supervising Pharmacist
Relief Pharmacist
Pharmacy Intern
Pharmacist in Charge (PIC)
Medication Therapy Management (MTM) Pharmacist
Immunization Pharmacist
Consulting Pharmacist
Travel Health Pharmacist
Wellness Pharmacist
Chronic Disease Management Pharmacist
Point-of-Care Testing (POCT) Pharmacist
Retail Pharmacy Supervisor
District Pharmacy Manager
Pharmacy Director – Retail Chain
Pharmacy Franchise Owner
Independent Pharmacy Owner
Pharmacy Technician
Senior Pharmacy Technician
Certified Pharmacy Technician (CPhT)
Pharmacy Assistant
Pharmacy Clerk
Pharmacy Aide
Pharmacy Cashier
Inventory Control Pharmacist
Controlled Substances Pharmacist
Compliance Pharmacist – Retail Setting
Pharmacy Buyer / Procurement Specialist
Supply Chain Pharmacist – Community Pharmacy
Tele Pharmacy Pharmacist
e-Prescription Processing Pharmacist
Digital Health Pharmacist (Retail Platform)
Virtual MTM Pharmacist
Mobile Clinic Pharmacist`),
  },
  'Administrative, Educational & Legal Fields': {
    specs: L(`Pharmacy Administration
Health Informatics Pharmacist
Managed Care Pharmacy
Pharmacoeconomics
Academic/Teaching Pharmacy
Pharmacy Law and Ethics
Public Health Pharmacy
Policy and Advocacy Pharmacist
Military Pharmacy`),
    jobs: L(`Pharmacy Educator
Clinical Pharmacy Educator
Academic Pharmacist
Professor of Pharmacy
Assistant Professor – Pharmacy Practice
Associate Professor – Pharmaceutical Sciences
Lecturer – Pharmacology / Pharmacy
Adjunct Faculty – Pharmacy
Pharmacy Residency Program Director
Preceptor – Pharmacy Students/Interns
Continuing Education (CE) Program Coordinator
Pharmacy Curriculum Developer
Pharmacy Skills Lab Coordinator
Simulation Lab Instructor (Pharmacy)
Graduate Program Coordinator – Pharmacy
Regulatory Affairs Pharmacist
Compliance Pharmacist
Pharmacy Inspector / Compliance Officer
Pharmacy Law and Ethics Instructor
Drug Enforcement Officer (Pharmacy Background)
Licensing and Accreditation Officer – Pharmacy Board
Policy Advisor – Pharmacy Practice
Pharmacy Law Consultant
Legal and Regulatory Policy Analyst (Pharmaceutical Sector)
Medicines Legislation Advisor
Pharmaceutical Compliance Manager
Clinical Governance Pharmacist
Good Manufacturing Practice (GMP) Compliance Pharmacist
Pharmacovigilance Compliance Specialist
Health Authority Liaison Pharmacist
Pharmacy Policy Analyst
Health Policy Pharmacist
Pharmaceutical Affairs Officer
Public Health Pharmacist – Policy Division
Advocacy Manager – Pharmacy Association
Pharmacy Practice Standards Officer
Drug Policy Coordinator
Legislative Liaison – Pharmacy
Professional Affairs Pharmacist`),
  },
  'Global Health and Niche Services': {
    specs: L(`Veterinary Pharmacy
Space/Remote Location Pharmacy
Home Healthcare Pharmacy
Tele Pharmacy
Disaster Relief or Humanitarian Pharmacist
Alternative and Integrative Medicine Pharmacy`),
    jobs: L(`Global Health Pharmacist
International Public Health Pharmacist
Essential Medicines Pharmacist
Humanitarian Aid Pharmacist
NGO Pharmacist (Non-Governmental Organization)
Field Pharmacist – International Relief Missions
Global Access Program Manager (Pharmacy)
Pharmaceutical Supply Chain Pharmacist (Global Health)
Medicines Without Borders Pharmacist (e.g. MSF)
Global Regulatory Affairs Specialist (Pharma Sector)
Infectious Disease Pharmacist – Global Programs
Health Systems Strengthening Pharmacist (Global Health)
Global Health Policy Advisor – Pharmacy Sector
Disaster Relief Pharmacist
Emergency Response Pharmacist (e.g. pandemic, refugee camps)
Mobile Pharmacy Services Coordinator
Remote Area Pharmacist
Tele Pharmacy Services Pharmacist (Rural/Global)
Military Pharmacist / Combat Medic Pharmacist
Humanitarian Logistics Pharmacist
Veterinary Pharmacist
Animal Health Product Specialist
Livestock Medicines Pharmacist (Agricultural Support)
Space Pharmacist / Aerospace Pharmacist
Expeditionary Pharmacist (e.g. Antarctica, marine research missions)
Offshore Pharmacist (Oil rigs, ships)
Correctional Facility Pharmacist
Occupational Health Pharmacist (Remote Industries)
Integrative Medicine Pharmacist
Functional Medicine Pharmacist
Nutraceuticals Specialist Pharmacist
Wellness and Lifestyle Medicine Pharmacist
Herbal Medicine Consultant (Pharmacy Background)
Cannabis Pharmacist / Medical Marijuana Dispensary Pharmacist
Homeopathic Pharmacist (Region-specific)
Rare Diseases Pharmacist
Orphan Drug Access Pharmacist
Palliative Care Pharmacist (Community or Global Settings)
Prison/Correctional Health Pharmacist
Transgender Health Pharmacist
Sexual & Reproductive Health Pharmacist
Travel Medicine Pharmacist
Clinical Ethnopharmacologist
Faith-Based Health Missions Pharmacist`),
  },
  'Leadership & Administration': {
    specs: L(`Executive & Senior Leadership Roles
Mid-Level Leadership & Management
Program & Service Line Leadership
Administrative & Strategic
Leadership in Public Health, Policy & Education`),
    jobs: L(`Chief Pharmacy Officer (CPO)
Director of Pharmacy Services
Vice President of Pharmacy Operations
Executive Director – Pharmaceutical Services
Senior Director – Clinical Pharmacy Programs
Pharmacy Service Line Administrator
Pharmacy Manager
Pharmacy Operations Manager
Clinical Pharmacy Manager
Inpatient Pharmacy Manager
Outpatient Pharmacy Manager
Retail Pharmacy Manager
Specialty Pharmacy Manager
Medication Safety Manager
Pharmacy Business Manager
Formulary Manager
Pharmacy Purchasing Manager
Pharmacy Inventory Manager
District Pharmacy Manager (Retail Chains)
Hospital Pharmacy Supervisor
Pharmacy Compliance Manager
Pharmacy Program Director
Clinical Services Coordinator – Pharmacy
Medication Therapy Management (MTM) Program Manager
Pharmacy Residency Program Director (RPD)
Antimicrobial Stewardship Program Coordinator
Pharmacy Informatics Manager
Pharmacogenomics Program Lead
Tele Pharmacy Program Manager
Pharmacy Administrator
Strategic Initiatives Lead – Pharmacy Services
Pharmacy Compliance Officer
Regulatory Affairs Manager – Pharmacy Division
Pharmacy Quality Improvement Officer
Pharmacy Accreditation Coordinator
Clinical Governance Lead – Pharmacy
Pharmacy Analytics Manager
Health System Pharmacy Coordinator
Pharmacy Policy Director
Public Health Pharmacy Leader
Pharmacy Affairs Director – Government/Regulatory Body
Pharmacy Association Executive
Dean – College of Pharmacy
Associate Dean for Academic Affairs
Academic Program Director – Pharmacy Education`),
  },
};

/* ------------------------------------------------------------------ */
/* Laboratory & diagnostic professionals                               */
/* ------------------------------------------------------------------ */
const LAB = {
  specs: L(`Clinical Chemistry
Haematology
Immunology / Serology
Microbiology
Parasitology
Urinalysis
Toxicology
Blood Banking / Transfusion Medicine
Histopathology
Cytopathology
Molecular Diagnostics
Cytogenetics
Genetic Testing / Genomics
Pharmacogenomics
Next-Generation Sequencing (NGS)
Flow Cytometry
Point-of-Care Testing (POCT)
Clinical Informatics / Laboratory Informatics
Allergy & Immunochemistry
Autoimmune Diagnostics
Oncology Diagnostics
Neurological Diagnostics
Forensic Laboratory Science
Environmental & Public Health Microbiology
Biobanking / Specimen Repository Management
Veterinary Diagnostics
Reproductive and Fertility Diagnostics
Occupational Health & Industrial Diagnostics
Clinical Trial Laboratory Science`),
  jobs: L(`Medical Laboratory Technician
Medical Laboratory Technologist (MLT/MLS)
Clinical Laboratory Scientist (CLS)
Medical Laboratory Scientist (MLS)
Laboratory Technician
Laboratory Technologist
Clinical Laboratory Technician
Clinical Laboratory Assistant
Specimen Processing Technician
Lab Aide / Lab Assistant
Phlebotomist
Clinical Chemistry Technologist
Clinical Biochemist
Clinical Chemistry Analyst
Haematology Technologist
Haematology Specialist
Flow Cytometry Technologist
Microbiology Technologist
Clinical Microbiologist
Medical Bacteriologist
Mycology/Parasitology Technician
Immunology Technologist
Serology Technician
Histology Technician / Technologist
Histopathology Assistant
Tissue Processing Technician
Cytotechnologist
Cytology Technician
Blood Bank Technologist
Immunohematology Technologist
Transfusion Medicine Specialist
Molecular Diagnostics Technologist
Molecular Biology Scientist (Clinical)
Cytogenetic Technologist
Genomics Technologist
Pharmacogenomics Analyst
DNA Analyst (Forensic/Clinical)
Toxicology Technologist
Drug Testing Technician
Urinalysis Technician
Clinical Fluids Technologist
Pathologist (MD)
Hematopathologist
Cytopathologist
Clinical Chemist (PhD/MD)
Forensic Pathologist
Pathology Assistant (PA)
Laboratory Information Systems (LIS) Analyst
Lab Data Manager
Quality Assurance Officer – Lab
Quality Control Technologist
Regulatory Compliance Specialist – Laboratory
Laboratory Safety Officer
Laboratory Supervisor
Senior Medical Technologist
Lead Technologist (by department)
Section Head – Laboratory Department
Laboratory Operations Manager
Laboratory Services Manager
Laboratory Director / Chief of Laboratory Services
Technical Director – Clinical Laboratory
Clinical Research Laboratory Technician
Public Health Laboratory Scientist
Epidemiology Lab Technician
Environmental Laboratory Analyst
Biobank Technician / Specimen Repository Manager
Infectious Disease Surveillance Scientist
Forensic Laboratory Scientist
Veterinary Diagnostic Technician
Reproductive Biology Laboratory Technologist
Laboratory Assistant
Pathology Assistant
Blood Bank Technologist / Transfusion Medicine Specialist
Radiologic Technologist
Radiographer
X-ray Technician
MRI Technologist
CT (Computed Tomography) Technologist
Ultrasound Technologist / Sonographer
Diagnostic Medical Sonographer
Echocardiography Technologist
Nuclear Medicine Technologist
PET Scan Technologist
Mammography Technologist
Interventional Radiology Technologist
Radiology Assistant
Imaging Informatics Specialist
Medical Imaging Supervisor / Manager
Electrocardiogram (ECG/EKG) Technician
Cardiac Sonographer / Echocardiography Technician
Cardiovascular Technologist
Cardiac Catheterization Technologist
Holter Monitor Technician
Pulmonary Function Technologist
Respiratory Therapist (Diagnostics Role)
Stress Test Technician
Pathologist (MD or DO)
Neuropathologist
Dermatopathologist
Autopsy Technician
Digital Pathology Specialist
Genetic Technologist
Clinical Geneticist (MD/PhD)
Molecular Biology Technologist
Next-Generation Sequencing (NGS) Technologist
DNA Analyst (Forensics or Medical)
Biobank Technician / Coordinator
Diagnostic Services Manager
Clinical Laboratory Manager
Radiology Department Manager
Quality Assurance Specialist – Diagnostics
Regulatory Affairs Officer – Diagnostics
PACS Administrator (Imaging Systems)
Diagnostic Data Analyst
Compliance Officer – Diagnostic Services
Diagnostic Informatics Specialist
Point-of-Care Testing (POCT) Coordinator
Clinical Trial Laboratory Technician
Public Health Diagnostic Scientist
Occupational Health Testing Technician
Environmental Diagnostics Technician
Veterinary Diagnostics Technologist
Mobile Imaging Technician`),
  env: L(`Clinical laboratories (hospitals, diagnostics centers)
Research labs
Public health organizations (e.g. CDC, WHO)
Blood banks
Biotechnology and pharmaceutical companies
Forensic and law enforcement labs
Academic and teaching institutions`),
};

/* ------------------------------------------------------------------ */
/* Allied health, Health IT & admin, Support staff                     */
/* ------------------------------------------------------------------ */
const ALLIED_JOBS = {
  'Diagnostic & Laboratory Specialties': L(`Medical Laboratory Scientist / Technologist
Medical Laboratory Technician
Radiologic Technologist / Radiographer
CT Technologist
Histotechnologist / Histotechnician
Pathologist Assistant
Electroneurodiagnostic (END) Technologist
Clinical Laboratory Technologists / Medical Laboratory Scientists
Radiologic Technologists & Technicians
Other technicians & technologists (cardiovascular technologists, nuclear medicine technologists, etc.)`),
  'Therapeutic & Clinical Specialties': L(`Physiotherapist / Physical Therapist
Occupational Therapist
Respiratory Therapist
Speech-Language Pathologist
Speech and Language Therapist
Audiologist
Recreational Therapist
Orthotist / Prosthetist
Radiation Therapist
Art Therapist
Music Therapist
Drama Therapist
Massage Therapist
Dietitian
Operating Department Practitioner (ODP)
Orthoptist
Osteopath
Paramedic
Podiatrist / Chiropodist
Radiographer (Diagnostic & Therapeutic)
Dental Hygienist / Dental Assistant
Emergency Medical Technician / Paramedic`),
  'Pharmaceutical & Nutrition Specialties': L(`Pharmacist
Pharmacy Technician
Dietitian / Clinical Nutritionist
Nutritionist
Dietetic Technician`),
  'Emergency & Prehospital Care': L(`Paramedic
Emergency Medical Technician (EMT)
Critical Care Transport Specialist
Flight Paramedic`),
  'Behavioural & Mental Health Specialties': L(`Clinical Psychologist
Behavioural Therapist
Mental Health Counsellor
Substance Abuse Counsellor
Psychiatric Technician
Social Worker`),
  'Supportive & Direct Care Roles': L(`Physician Assistant / Associate
Anesthesia Technologist
Surgical Technologist / Operating Department Practitioner (ODP)
Clinical Support Worker
Healthcare Assistant / Nursing Assistant
Community Health Worker
Case Manager`),
  'Specialized & Emerging Roles': L(`Genetic Counsellor
Perfusionist
Medical Physicist
Biomedical Scientist
Clinical Exercise Physiologist
Kinesiologist
Telehealth Specialist
Rehabilitation Engineer`),
};

const IT_ADMIN_JOBS = {
  'Health Information Technology': L(`Health Information Technician
Medical Coder / Clinical Coder
Release of Information Specialist
DRG Analyst (Diagnosis-Related Group Analyst)
Health Privacy & Security Officer / Information Security Specialist
EHR / EMR Specialist / EHR/EMR Manager
Systems Analyst (Health IT Systems)
Application Analyst / EHR Application Analyst
IT Support Technician (Health IT support)
Database Administrator (in health settings)
Analytics Consultant (Healthcare / Health IT)
Health IT Director / Director of Health Information Technology
Clinical Informatics Specialist / Clinical Informaticist
EHR/EMR Support Analyst
Data Integration Specialist
Health IT Project Manager
Health IT Security Officer
Enterprise Health Architect
Health Services Administrator / Health Information Manager
Information Management Specialist
Knowledge Management Specialist
IT Auditor (for health-IT systems)
Transcriptionist
Clinical Documentation Improvement (CDI) Specialist
Health Data Analyst
Health Informatics Consultant
Health Informatics Specialist
Medical Secretary / Health Unit Coordinator`),
  'Healthcare Administration': L(`Accreditation Coordinator
Administrative Assistant – Healthcare
Administrative Officer
Admissions Coordinator
Case Management Supervisor
Hospital Administrator
Medical Superintendent
Healthcare Operations Manager
Quality Assurance (QA) Manager
Healthcare Project Manager
Claims / Revenue Cycle Manager
HR Manager – Healthcare
Compliance Officer – Healthcare
Public Health Administrator
Medical Director – Insurance
District Health Officer (DHO)
State Health Mission Director
Program Manager – National Health Mission (NHM)
Public Health Specialist – WHO/MoHFW/NGOs
Release of Information (ROI) Specialist
Health Information Clerk
Health Information Manager (HIM)
Coding Manager
Revenue Cycle Analyst
Compliance & Privacy Officer
Front Office Executive – Hospital/Clinic
Health Program Coordinator
Health Services Manager
Health Unit Coordinator
Healthcare Administrator / Manager
Healthcare Customer Service Executive
Medical and Health Services Manager
Medical Office Manager
Nursing Home Administrator
Operations Manager – Healthcare
Outpatient Services Manager
Patient Care Coordinator
Practice Administrator
Practice Manager
Quality Improvement Manager
Research Program Administrator – Healthcare
Research Program Coordinator
Rehabilitation Services Manager
Revenue Cycle Manager
Risk & Safety Manager
Scheduling Coordinator
Support Services Manager
Unit Manager (ICU, ER, OT, etc.)
Utilization Review Manager`),
};

const SUPPORT_JOBS = {
  'Clerical & Front Office': L(`Front Office Executive
Receptionist – Hospital/Clinic
Administrative Clerk
Ward Administrative Clerk
Patient Registration Clerk
Admissions Clerk / Admissions Coordinator
Health Unit Clerk
Medical Office Assistant
Medical Secretary`),
  'Medical Records & Information': L(`Medical Records Clerk
Data Entry Operator – Hospital
Coding Specialist (ICD / CPT)
Medical Transcriptionist
Medical Records Supervisor`),
  'Billing & Finance': L(`Medical Billing Manager
Medical Billing Specialist
Insurance Verification Specialist
Accounts Assistant – Healthcare
Patient Accounts Clerk
Billing Clerk`),
  'Logistics & Facility': L(`Transport Coordinator (Patient / Sample Transfer)
Inventory Clerk – Hospital Stores
Supply Chain Assistant – Healthcare
Facilities Assistant
Laundry Services Coordinator
Housekeeping Supervisor`),
  'Patient Services': L(`Patient Services Manager
Patient Services Associate
Patient Care Coordinator (supportive)
Help Desk Executive – Hospital
Patient Relations Representative`),
  'General Ancillary Support': L(`File Clerk
Records Assistant
Office Boy / Peon (Hospital Admin)
Messenger / Runner (Hospital Docs & Records)
Switchboard Operator / Call Center Executive – Healthcare
Admissions Clerk / Coordinator
Patient Care Coordinator (non-clinical)
Transport Coordinator (Patients / Samples)`),
  'Ambulance Support Services': L(`Ambulance Nurse
Critical Care Paramedic (CCP)
Advanced Care Paramedic (ACP)
Basic Life Support (BLS) Provider
Advanced Life Support (ALS) Provider
Ambulance Driver / Emergency Vehicle Operator
Ambulance Attendant (First-Aid Certified)
Patient Transporter (Non-Emergency Transfers)
Stretcher Bearer
Transport Coordinator – Ambulance Services
Ambulance Operations Supervisor
Emergency Medical Services (EMS) Coordinator
Ambulance Services Manager
Director of Emergency Medical Services (EMS Director)
Dispatch Coordinator / Dispatcher (Ambulance Control Room)
Operations Supervisor – Ambulance Services
Transport Coordinator – Ambulance Fleet
Dispatch Coordinator / Dispatcher Supervisor
Rescue & Disaster Response Specialist
Emergency Medical Technician – Paramedic (EMT-P)
Emergency Medical Technician – Advanced (EMT-A)
Emergency Medical Technician – Basic (EMT-B)
Helper / Cleaner – Ambulance Maintenance
Emergency Dispatcher (Control Room)
Call Taker / Emergency Response Operator
Radio Operator – Ambulance Services
GIS/Tracking Specialist (Ambulance Location Monitoring)`),
};

/* ------------------------------------------------------------------ */
/* Primary roles                                                        */
/* kind: 'jobs'      → job level only
         'spec-jobs' → specialization decides the job-level list
         'area'      → key area → specialization list + job-level list
         'lab'       → specialization + job level + work environment          */
/* ------------------------------------------------------------------ */
export const ROLES = [
  { id: 'management', label: 'Healthcare Management', icon: 'briefcase', color: '#7c3aed', kind: 'jobs', jobs: L(`Chief Compliance Officer (CCO)
Chief Financial Officer (CFO)
Chief Human Resources Officer (CHRO)
Chief Information Officer (CIO)
Chief Nursing Officer (CNO)
Chief Patient Experience Officer
Chief Quality Officer (CQO)
Chief Technology Officer (CTO)
Chief Medical Officer (CMO)
Chief Information Officer (CIO) in health organizations
Chief Medical Informatics Officer (CMIO)
Chief Executive Officer (CEO) – Hospital
Chief Operating Officer (COO)
Chief Privacy Officer
Vice President – Clinical Services
Vice President – Healthcare Operations
Vice President – Patient Services
Dean of Healthcare Administration
Department Manager (Radiology, Pathology, etc.)
Director of Clinical Operations
Director of Community Health Programs
Director of Facility Management
Director of Finance – Healthcare
Director of Health Information Management (HIM)
Director of Hospital Administration
Director of Patient Care Services
Director of Quality & Compliance
Director of Risk Management
Director of Support Services
Medical Director – Insurance
District Health Officer (DHO)
State Health Mission Director`) },
  { id: 'doctors', label: 'Medical Doctors & Physicians', icon: 'stethoscope', color: '#2457f5', kind: 'spec-jobs', specLabel: 'Please select your specialization', specs: DOCTOR_JOBS },
  { id: 'surgeons', label: 'Surgeons', icon: 'scalpel', color: '#0ea5e9', kind: 'jobs', jobs: L(`General Surgeon
Cardiothoracic Surgeon
Neurosurgeon
Orthopaedic Surgeon
Plastic & Reconstructive Surgeon
Paediatric Surgeon
Vascular Surgeon
Colorectal Surgeon / Proctologist
Urologic Surgeon
Ophthalmic Surgeon
ENT Surgeon / Otolaryngologist
Gynaecologic Surgeon
Obstetric Surgeon
Oral & Maxillofacial Surgeon
Hepatobiliary Surgeon
Endocrine Surgeon
Surgical Oncologist
Transplant Surgeon
Trauma Surgeon
Bariatric Surgeon
Thoracic Surgeon
Hand Surgeon
Spinal Surgeon
Laparoscopic Surgeon
Robotic Surgeon
Chief Surgeon
Consultant Surgeon
Attending Surgeon
Resident Surgeon / Surgical Resident
Fellow (Surgical Subspecialty)
Surgical Registrar
Assistant Surgeon
Locum Surgeon`) },
  { id: 'dental', label: 'Dental Professionals', icon: 'tooth', color: '#06b6d4', kind: 'jobs', jobs: L(`General Dentist (BDS/DDS/DMD)
Orthodontist
Periodontist
Endodontist
Prosthodontist
Oral & Maxillofacial Surgeon
Paediatric Dentist / Pedodontist
Oral Medicine Specialist
Oral Radiologist
Public Health Dentist / Community Dentist
Forensic Odontologist
Implantologist`) },
  { id: 'nursing', label: 'Nursing & Midwifery', icon: 'nurse', color: '#ec4899', kind: 'spec-jobs', specLabel: 'Please select your specialization', specs: NURSE_JOBS },
  { id: 'pharmacy', label: 'Pharmacy Professionals', icon: 'pill', color: '#10b981', kind: 'area', areaLabel: 'What is your key area of pharmacy?', areas: PHARMACY_AREAS },
  { id: 'lab', label: 'Laboratory & Diagnostic Professionals', icon: 'microscope', color: '#f59e0b', kind: 'lab', ...LAB },
  { id: 'allied', label: 'Allied Health Professionals', icon: 'pulse', color: '#ef4444', kind: 'spec-jobs', specLabel: 'Please select your specialization', specs: ALLIED_JOBS },
  { id: 'itadmin', label: 'Health IT & Admin Professionals', icon: 'monitor', color: '#6366f1', kind: 'spec-jobs', specLabel: 'Please select your specialization', specs: IT_ADMIN_JOBS },
  { id: 'support', label: 'Support Staff (Ancillary)', icon: 'users', color: '#64748b', kind: 'spec-jobs', specLabel: 'Please select your specialization', specs: SUPPORT_JOBS },
];

export const roleById = (id) => ROLES.find((r) => r.id === id);

/** Number of distinct job titles per primary role (used by the professionals page). */
export function jobCount(role) {
  const set = new Set();
  if (role.kind === 'jobs') role.jobs.forEach((j) => set.add(j));
  if (role.kind === 'spec-jobs') Object.values(role.specs).forEach((js) => js.forEach((j) => set.add(j)));
  if (role.kind === 'area') Object.values(role.areas).forEach((a) => a.jobs.forEach((j) => set.add(j)));
  if (role.kind === 'lab') role.jobs.forEach((j) => set.add(j));
  return set.size;
}

/** Every job title with its primary role (for search). */
export function allJobs() {
  const out = [];
  const seen = new Set();
  const add = (j, role, group) => { const k = role.id + j; if (!seen.has(k)) { seen.add(k); out.push({ t: j, role: role.id, roleLabel: role.label, group }); } };
  ROLES.forEach((r) => {
    if (r.kind === 'jobs') r.jobs.forEach((j) => add(j, r, ''));
    if (r.kind === 'spec-jobs') Object.entries(r.specs).forEach(([s, js]) => js.forEach((j) => add(j, r, s)));
    if (r.kind === 'area') Object.entries(r.areas).forEach(([s, a]) => a.jobs.forEach((j) => add(j, r, s)));
    if (r.kind === 'lab') r.jobs.forEach((j) => add(j, r, ''));
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Common sections after the role                                       */
/* ------------------------------------------------------------------ */
export const PRACTICE = {
  employment: { q: 'What is your employment status?', options: ['Full-time', 'Part-time', 'Locum', 'Retired but practicing', 'Retired but not practicing'] },
  sector: { q: 'Do you work in the public or private sector?', options: ['Public', 'Private', 'Both'] },
  facility: { q: 'In what type of facility do you primarily work?', options: ['Hospital', 'Private Clinic', 'Nursing Home', 'Pharmacy', 'Laboratory', 'Community Health Center', 'Other'] },
  beds: { q: 'What is the size of your facility (number of beds)?', options: ['1–20', '21–50', '51–100', '101–500', '500+'] },
  setting: { q: 'Is your practice in an urban, semi-urban or rural setting?', options: ['Urban', 'Semi-Urban', 'Rural'] },
  teaching: { q: 'Do you work in a teaching/academic hospital?', options: YN },
};

export const EXPERIENCE = {
  years: { q: 'How many years have you been practicing in your profession?', options: ['0–2 years', '3–5 years', '6–10 years', '11–20 years', '20+ years'] },
  patients: { q: 'How many patients do you typically see per week?', options: ['0–10', '11–25', '26–50', '51–100', '100+'] },
  trials: { q: 'Do you have experience participating in clinical trials?', options: YN },
  trialsCount: { q: 'How many clinical trials have you been involved in over the past 2 years?', options: ['0 - 49', '50 - 99', '100 - 149', '150 - 200', 'More than 200'] },
};

export const INFLUENCE = [
  { key: 'purchases', q: 'Are you a decision-maker for purchases in your practice/facility?' },
  { key: 'formulary', q: 'Are you part of a drug formulary or procurement committee?' },
  { key: 'devices', q: 'Do you have influence over medical device/equipment purchasing decisions?' },
  { key: 'policy', q: 'Are you involved in health policy or guideline development?' },
];

export const DIGITAL = [
  { key: 'ehr', q: 'Do you use Electronic Health Records (EHR/EMR) in your practice?' },
  { key: 'telemed', q: 'Do you use telemedicine for patient consultations?' },
  { key: 'digitalInit', q: 'Are you involved in digital health initiatives?' },
  { key: 'onlineOk', q: 'Are you comfortable participating in online surveys?' },
];

export const AVAILABILITY = {
  mode: { q: 'Do you prefer participating via online, telephone, or face-to-face research?', options: ['Online', 'Telephone', 'Face-to-Face'] },
  frequency: { q: 'How often are you willing to participate in research?', options: ['Weekly', 'Monthly', 'Quarterly', 'Rarely'] },
  time: { q: 'What is your preferred time of day to participate?', options: ['Morning', 'Afternoon', 'Evening'] },
  recontact: { q: 'Do you agree to be re-contacted for future studies?', options: YN },
  focus: { q: 'Would you participate in focus groups in addition to surveys?', options: YN },
};

export const CERTIFICATION = {
  consent: 'I consent to my certification number being used only for verification purposes and stored securely in compliance with GDPR/HIPAA/local data privacy laws.',
};

/** Shows only the last 4 characters (what the panel team sees). */
export const maskLicence = (v = '') => (v.length <= 4 ? v : '•'.repeat(Math.min(v.length - 4, 8)) + v.slice(-4));
