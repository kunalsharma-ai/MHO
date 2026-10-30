import {
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/data/hcpProfile.js
init_define_import_meta_env();
var L = (s) => [...new Set(s.split("\n").map((x) => x.trim()).filter(Boolean))];
var YN = ["Yes", "No"];
var SCREENER = {
  industry: { q: "Do you work in the healthcare industry?", options: YN },
  clinician: { q: "Are you a clinician?", options: YN },
  rejectMessage: "Thank you for your interest. You don\u2019t meet our healthcare recruitment criteria, so we can\u2019t create a professional account for you."
};
var DEMO = {
  gender: { q: "What is your gender?", options: ["Male", "Female", "Other"] },
  age: { q: "What is your age group?", options: ["21-29", "30-39", "40-49", "50-59", "60+"] },
  marital: { q: "What is your marital status?", options: ["Single", "Married", "Divorced", "Widow/Widower"] },
  children: { q: "Number of children below 18 living in your household?", options: ["0", "1-3", "4-6", "7+"] },
  personalIncome: { q: "What is your approximate annual personal income (before tax)?", options: ["Less than $10,000", "$10,000 \u2013 $24,999", "$25,000 \u2013 $49,999", "$50,000 \u2013 $99,999", "$100,000+", "Prefer not to answer"] },
  familyIncome: { q: "What is your approximate total family annual income (before tax)?", options: ["Less than $25,000", "$25,000 \u2013 $49,999", "$50,000 \u2013 $99,999", "$100,000 \u2013 $199,999", "$200,000+", "Prefer not to answer"] }
};
function ageGroupFrom(dob) {
  if (!dob) return "";
  const d = new Date(dob);
  if (Number.isNaN(+d)) return "";
  const now = /* @__PURE__ */ new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a -= 1;
  if (a < 21) return "Under 21";
  if (a < 30) return "21-29";
  if (a < 40) return "30-39";
  if (a < 50) return "40-49";
  if (a < 60) return "50-59";
  return "60+";
}
var EDUCATION = {
  q: "What is your highest level of education?",
  levels: ["Diploma", "Bachelor\u2019s", "Master\u2019s", "Doctorate", "Others"],
  branches: {
    Diploma: {
      q2: "What type of diploma have you completed?",
      o2: ["Nursing diploma (GNM/ANM)", "Paramedical diploma (Lab technician, Radiology, Physiotherapy, etc.)", "Pharmacy diploma (D.Pharm)", "Other healthcare-related diploma"],
      q3: "Are you certified/licensed to practice in your field?",
      o3: ["Yes", "No", "Currently under process"]
    },
    "Bachelor\u2019s": {
      q2: "What is your bachelor\u2019s qualification?",
      o2: ["MBBS (Medicine)", "BDS (Dentistry)", "B.Sc Nursing", "B.Pharm (Pharmacy)", "BPT (Physiotherapy)", "Other (please specify)"],
      q3: "Do you hold a professional registration/licensure?",
      o3: ["Yes, with national medical/dental/nursing/pharmacy council", "Yes, with state medical/dental/nursing/pharmacy council", "No", "Under process"]
    },
    "Master\u2019s": {
      q2: "What is your master\u2019s qualification?",
      o2: ["MD/MS (Postgraduate Medicine/Surgery)", "MDS (Dentistry)", "M.Sc Nursing", "M.Pharm (Pharmacy)", "MPT (Physiotherapy)", "Other healthcare master\u2019s degree"],
      q3: "Do you have a specialist certification/board recognition?",
      o3: ["Yes (e.g., Cardiologist, Oncologist, Orthopedic Surgeon, etc.)", "No", "Currently pursuing"]
    },
    Doctorate: {
      q2: "What is your doctoral qualification?",
      o2: ["DM/MCh (Super-specialty Medicine/Surgery)", "PhD (Healthcare/Medical Science)", "Other (please specify)"],
      q3: "Do you have certification/registration with a professional council or board?",
      o3: ["Yes, National Medical Council or equivalent", "Yes, International Medical Board (e.g., USMLE, MRCP, FRCS)", "No", "Under process"]
    },
    Others: {
      q2: "Please specify your qualification.",
      o2: null,
      // free text
      q3: "Are you certified/licensed to practice in your field?",
      o3: ["Yes", "No", "Currently under process"]
    }
  }
};
var DOCTOR_JOBS = {
  "General Practitioner (GP) / Family Physician": L(`General Practitioner (GP)
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
  "Internal Medicine Specialist": L(`Internal Medicine Physician (Internist)
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
  "Paediatrics & Neonatology": L(`Paediatrician
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
  "Psychology & Mental Health": L(`Clinical Psychologist
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
Clinical Research Coordinator \u2013 Psychiatry/Psychology
Quality Assurance Officer \u2013 Mental Health Services`),
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
  "ENT Specialist": L(`ENT Specialist / Otolaryngologist
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
  "Emergency Medicine": L(`Emergency Medicine Physician
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
  "Infectious Diseases": L(`Infectious Disease Specialist (ID Physician)
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
  "Sports Medicine": L(`Sports Medicine Physician
Orthopaedic Sports Surgeon
Team Physician
Primary Care Sports Physician
Physiatrist \u2013 Sports Rehabilitation
Paediatric Sports Medicine Specialist
Exercise Medicine Specialist
Concussion Specialist / Neuro-Sports Physician
Fellow / Resident \u2013 Sports Medicine`),
  "Palliative Care": L(`Palliative Care Physician
Consultant \u2013 Palliative Medicine
Hospice Physician
Oncologist with Palliative Focus
Geriatrician \u2013 Palliative Integration
Palliative Care Fellow / Resident
Emergency Physician \u2013 Palliative Focus
Primary Care Physician \u2013 Palliative Training`),
  "Occupational Health": L(`Occupational Medicine Physician / Occupational Health Doctor
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
  "Molecular Diagnostics": L(`Molecular Pathologist
Clinical Geneticist
Molecular Diagnostic Consultant
Molecular Diagnostics Fellow / Resident`),
  Microbiology: L(`Clinical Microbiologist
Infectious Disease Physician
Medical Microbiology Consultant
Microbiology Fellow / Resident`),
  "Clinical Chemistry": L(`Clinical Biochemist / Chemical Pathologist
Clinical Chemistry Consultant
Clinical Chemistry Fellow / Resident
Toxicologist`),
  "Forensic Pathology": L(`Forensic Pathologist
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
Immunopathology Fellow / Resident`)
};
var NURSE_JOBS = {
  "General Practitioner (GP) / Family Nurse": L(`Primary Care Nurse
General Practice Nurse (GP Nurse)
Family Practice Nurse
Community Health Nurse
Outpatient Nurse
Triage Nurse (Primary Care)
Health Promotion Nurse
Care Coordinator / Case Manager Nurse
Family Nurse Practitioner (FNP)
Primary Care Nurse Practitioner (NP)
Advanced Practice Registered Nurse (APRN) \u2013 Family Medicine
Nurse Prescriber (UK/EU/ANZ regions)
Practice Nurse Manager
Clinical Nurse Assistant (CNA) \u2013 GP Setting
Licensed Practical Nurse (LPN) / Enrolled Nurse (EN)
Medical Assistant (Nursing Background)`),
  "Internal Medicine Nurse": L(`Internal Medicine Staff Nurse
Medical-Surgical (Med-Surg) Nurse
Chronic Disease Nurse Specialist
Telemetry Nurse
Inpatient Internal Medicine Nurse
Outpatient/Internal Medicine Clinic Nurse
Case Management Nurse (Internal Medicine)
Clinical Nurse Specialist (CNS) \u2013 Internal Medicine
Nurse Educator (Internal Medicine)
Adult Nurse Practitioner (ANP)
Acute Care Nurse Practitioner (ACNP)
Clinical Nurse Specialist (CNS) \u2013 Adult Health/Internal Medicine`),
  "Paediatrics & Neonatology Nurse": L(`Paediatric Staff Nurse
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
Clinical Nurse Specialist (CNS) \u2013 Paediatrics/Neonatology
Paediatric Diabetes Nurse Specialist
Paediatric Respiratory Nurse`),
  "Surgical Nurse": L(`Perioperative Nurse / Operating Room (OR) Nurse
Scrub Nurse
Circulating Nurse
Preoperative Nurse
Post-Anaesthesia Care Unit (PACU) Nurse / Recovery Room Nurse
Surgical ICU Nurse
Day Surgery / Ambulatory Care Nurse
Specialty Surgical Nurse
Clinical Nurse Specialist (CNS) \u2013 Perioperative Nursing
Nurse Practitioner (NP) \u2013 Surgical
Surgical Nurse Educator`),
  "Cardiology Nurse": L(`Cardiac Care Nurse
Coronary Care Unit (CCU) Nurse
Telemetry Nurse (Cardiac)
Cardiac Cath Lab Nurse
Electrophysiology Nurse
Heart Failure Nurse Specialist
Cardiac Rehabilitation Nurse
Paediatric Cardiology Nurse
Cardiac Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Cardiology
Cardiac Nurse Educator`),
  "Pulmonology Nurse": L(`Pulmonary Nurse
Respiratory Care Nurse
Critical Care/ICU Nurse (Pulmonary)
Sleep Clinic Nurse
Pulmonary Function Test (PFT) Nurse
Bronchoscopy Nurse
Pulmonary Rehabilitation Nurse
Pulmonary Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Pulmonology
Respiratory Nurse Educator`),
  "Neurology Nurse": L(`Neurology Staff Nurse
Neuro ICU Nurse
Epilepsy Nurse Specialist
Stroke Nurse Specialist
Multiple Sclerosis (MS) Nurse
Neurosurgery Nurse
Neuro Rehabilitation Nurse
Neurology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Neurology
Neuro Nurse Educator`),
  "Endocrinology Nurse": L(`Endocrinology Nurse
Diabetes Nurse Specialist
Hormone Replacement Therapy (HRT) Nurse
Outpatient Endocrinology Nurse
Inpatient Endocrinology Nurse
Endocrine Oncology Nurse
Endocrinology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Endocrinology
Diabetes Educator Nurse`),
  "Gastroenterology Nurse": L(`Gastroenterology Nurse
Endoscopy Nurse
Hepatology Nurse
Inflammatory Bowel Disease (IBD) Nurse Specialist
Gastrointestinal Oncology Nurse
Outpatient Gastroenterology Nurse
Gastroenterology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Gastroenterology
Endoscopy Nurse Educator`),
  "Oncology Nurse": L(`Oncology Staff Nurse
Chemotherapy Nurse
Radiation Oncology Nurse
Bone Marrow Transplant (BMT) Nurse
Paediatric Oncology Nurse
Oncology Clinical Trials Nurse
Hospice and Palliative Care Nurse
Oncology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Oncology
Oncology Nurse Educator`),
  "Nephrology Nurse": L(`Nephrology Nurse
Dialysis Nurse (Renal Nurse)
Home Dialysis Nurse
Transplant Nurse \u2013 Nephrology
CKD Nurse Educator
Paediatric Nephrology Nurse
Nephrology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Nephrology
Renal Nurse Educator`),
  "Orthopaedic Nursing": L(`Orthopaedic Staff Nurse
Orthopaedic Surgical Nurse
Orthopaedic Trauma Nurse
Orthopaedic Rehabilitation Nurse
Paediatric Orthopaedic Nurse
Spine Nurse
Casting/Fracture Clinic Nurse
Orthopaedic Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Orthopaedics
Orthopaedic Nurse Educator`),
  "Rheumatology Nurse": L(`Rheumatology Nurse
Autoimmune Disease Nurse
Infusion Nurse \u2013 Rheumatology
Lupus Nurse Specialist
Arthritis Nurse Educator
Paediatric Rheumatology Nurse
Rheumatology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Rheumatology
Biologic Therapy Nurse Specialist`),
  "Psychology & Mental Health Nurse": L(`Mental Health Nurse (Psychiatric Nurse)
Community Mental Health Nurse
Child and Adolescent Mental Health Nurse
Forensic Mental Health Nurse
Addiction Nurse Specialist
Psychiatric Intensive Care Nurse
Crisis Intervention Nurse
Psychiatric Liaison Nurse
Mental Health Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Mental Health
Psychiatric Nurse Educator`),
  "Dermatology Nurse": L(`Dermatology Nurse
Wound Care Nurse
Dermatology Nurse Practitioner (NP)
Cosmetic Dermatology Nurse
Phototherapy Nurse
Skin Cancer Nurse Specialist
Paediatric Dermatology Nurse
Clinical Nurse Specialist (CNS) \u2013 Dermatology
Dermatology Nurse Educator`),
  "Ophthalmology Nurse": L(`Ophthalmology Nurse
Eye Surgery Nurse
Glaucoma Nurse Specialist
Retina Nurse Specialist
Low Vision Nurse
Paediatric Ophthalmology Nurse
Ophthalmic Diagnostic Nurse
Ophthalmology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Ophthalmology
Ophthalmology Nurse Educator`),
  "ENT Specialist Nurse": L(`ENT Nurse
Audiology Nurse
Head and Neck Surgery Nurse
ENT Outpatient Nurse
Sleep Apnoea Nurse Specialist
Paediatric ENT Nurse
Tinnitus Nurse Specialist
ENT Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 ENT
ENT Nurse Educator`),
  "Radiology Nurse": L(`Radiology Nurse
Interventional Radiology Nurse
Radiology Procedure Nurse
Nuclear Medicine Nurse
MRI Nurse Specialist
Radiology Nurse Educator
Radiology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Radiology`),
  "Anaesthesiology Nurse": L(`Anaesthesia Nurse (Perioperative Nurse)
Post-Anaesthesia Care Unit (PACU) Nurse
Critical Care Nurse (with anaesthesia focus)
Regional Anaesthesia Nurse
Sedation Nurse
Anaesthesia Nurse Educator
Nurse Anaesthetist (CRNA \u2013 Certified Registered Nurse Anaesthetist)
Clinical Nurse Specialist (CNS) \u2013 Anaesthesia`),
  "Emergency Medicine Nurse": L(`Emergency Nurse
Trauma Nurse
Triage Nurse
Paediatric Emergency Nurse
Critical Care Transport Nurse
Emergency Nurse Practitioner (ENP)
Disaster/Emergency Preparedness Nurse
Clinical Nurse Specialist (CNS) \u2013 Emergency`),
  "Pathology Nurse": L(`Pathology Nurse
Phlebotomy Nurse
Histology/Histopathology Nurse
Molecular Diagnostics Nurse
Specimen Transport Nurse
Clinical Nurse Specialist (CNS) \u2013 Pathology
Pathology Nurse Educator`),
  "Geriatrician Nurse": L(`Geriatric Nurse
Elder Care Nurse
Dementia Care Nurse
Palliative Care Nurse (Geriatrics)
Rehabilitation Nurse (Geriatrics)
Geriatric Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Geriatrics
Geriatric Nurse Educator`),
  "Infectious Diseases Nurse": L(`Infectious Diseases Nurse
Infection Control Nurse
HIV/AIDS Nurse Specialist
Tuberculosis (TB) Nurse
Travel Health Nurse
Public Health Nurse (Infectious Diseases)
Infectious Diseases Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Infectious Diseases
Infectious Diseases Nurse Educator`),
  "Sports Medicine Nurse": L(`Sports Medicine Nurse
Athletic Trainer Nurse
Rehabilitation Nurse (Sports Medicine)
Orthopaedic Sports Nurse
Exercise Physiologist Nurse
Concussion Nurse Specialist
Sports Nutrition Nurse
Sports Medicine Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Sports Medicine`),
  "Palliative Care Nurse": L(`Palliative Care Nurse
Hospice Nurse
Pain Management Nurse
Paediatric Palliative Care Nurse
Home Care Palliative Nurse
Bereavement Nurse Specialist
Palliative Care Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Palliative Care
Palliative Care Nurse Educator`),
  "Occupational Health Nurse": L(`Occupational Health Nurse
Workplace Safety Nurse
Industrial Health Nurse
Case Management Nurse (Occupational Health)
Employee Wellness Nurse
Ergonomics Nurse Specialist
Environmental Health Nurse
Occupational Health Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Occupational Health
Occupational Health Nurse Educator`),
  "Histopathology Nurse": L(`Histopathology Nurse
Histology Nurse
Anatomical Pathology Nurse
Tissue Bank Nurse
Pathology Nurse Specialist
Surgical Tissue Recovery Nurse
Biomedical Science Support Nurse (Histology Focus)
Advanced Nurse Practitioner (Histopathology)
Clinical Nurse Specialist \u2013 Pathology Services
Research Nurse \u2013 Histopathology
Quality Control Nurse \u2013 Histology Lab
Senior Pathology Nurse Coordinator
Consultant Nurse \u2013 Cellular Pathology
Molecular Pathology Nurse Specialist
Operating Room Nurse (Histopathology Specimen Handling)
Oncology Nurse (with Histopathology Liaison Duties)
Post-Mortem Nurse (PME/Autopsy Suite Nurse)
Tissue Procurement Nurse
Intraoperative Frozen Section Nurse`),
  "Haematology Nurse": L(`Haematology Nurse
Coagulation Nurse Specialist
Leukaemia Nurse Specialist
Haematology Day Care Nurse
Haematology Nurse Practitioner (NP)
Clinical Nurse Specialist (CNS) \u2013 Haematology
Haematology Nurse Educator
Haematology Staff Nurse
Registered Nurse \u2013 Haematology Unit
Haematology Clinic Nurse
Inpatient Haematology Nurse
Outpatient Haematology Nurse
Haematology Nurse Specialist
Advanced Nurse Practitioner \u2013 Haematology
Nurse Consultant \u2013 Haematology
Bone Marrow Transplant Nurse
Sickle Cell Nurse Specialist
Haemophilia Nurse Specialist
Apheresis Nurse
Stem Cell Transplant Coordinator Nurse
Research Nurse \u2013 Haematology/Oncology
Clinical Trials Nurse \u2013 Haematology
Palliative Care Nurse \u2013 Haematology Patients
Blood Disorder Case Manager Nurse
Oncology Haematology Nurse
Medical Oncology and Haematology Nurse
Paediatric Haematology Nurse
Infusion Nurse \u2013 Haematology
Transfusion Nurse`),
  "Cytopathology Nurse": L(`Cytopathology Nurse
Cytology Nurse
Pathology Nurse \u2013 Cytology
Cytopathology Support Nurse
Specimen Collection Nurse \u2013 Cytology
Pap Smear Nurse
Fine Needle Aspiration (FNA) Nurse
EUS-FNA Procedure Nurse (Endoscopic Ultrasound-Guided Fine Needle Aspiration)
Clinical Nurse Specialist \u2013 Cytopathology
Cytopathology Procedure Coordinator Nurse
Advanced Nurse Practitioner \u2013 Cytopathology
FNA Clinic Nurse Coordinator
Cervical Screening Nurse Specialist
Liquid-Based Cytology Nurse
Rapid On-Site Evaluation (ROSE) Nurse Assistant
Oncology Nurse with Cytopathology Duties
Diagnostic Nurse \u2013 Cytology
Colposcopy Clinic Nurse
Women\u2019s Health Nurse \u2013 Cytology Focus
Endoscopy Nurse \u2013 Cytology Specimen Handling
Research Nurse \u2013 Cytopathology
Nurse Educator \u2013 Cytology/Screening
Clinical Trials Nurse \u2013 Cytology Diagnostics`),
  "Molecular Diagnostics Nurse": L(`Molecular Diagnostics Nurse
Genomics Nurse
Precision Medicine Nurse
Genetic Testing Nurse
Genomic Screening Nurse
Molecular Oncology Nurse
Biomarker Testing Nurse
Molecular Pathology Nurse
Clinical Nurse Specialist \u2013 Molecular Diagnostics
Advanced Nurse Practitioner \u2013 Genomic Medicine
Genetic Nurse Counsellor (in some countries, requires additional licensure)
Molecular Testing Coordinator Nurse
Cancer Genomics Nurse Specialist
Next-Generation Sequencing (NGS) Nurse Advisor
Pharmacogenomics Nurse Specialist
Clinical Research Nurse \u2013 Molecular Studies
Molecular Clinical Trials Nurse
Lab Liaison Nurse \u2013 Molecular Testing
Bioinformatics Nurse Liaison
Molecular Data Interpretation Nurse Assistant`),
  "Microbiology Nurse": L(`Microbiology Nurse
Infection Prevention Nurse
Clinical Nurse \u2013 Microbiology Unit
Isolation Ward Nurse
Antimicrobial Stewardship Nurse
Outbreak Response Nurse
Pathology Nurse \u2013 Microbiology
Microbiology Specimen Collection Nurse
Clinical Laboratory Liaison Nurse
Specimen Transport & Handling Nurse (Microbiology Focus)
Lab Support Nurse \u2013 Microbial Testing
Public Health Nurse \u2013 Infectious Disease Surveillance
Disease Surveillance Nurse
Epidemiology Nurse
Field Infection Control Nurse
Community Health Nurse \u2013 Infectious Disease Focus
Clinical Research Nurse \u2013 Microbiology/Infectious Diseases
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
  "Clinical Chemistry Nurse": L(`Clinical Chemistry Nurse
Clinical Laboratory Nurse
Specimen Collection Nurse
Diagnostic Services Nurse
Lab Liaison Nurse
Clinical Nurse \u2013 Biochemistry Department
Pre-Analytical Services Nurse
Outpatient Laboratory Nurse
Point-of-Care Testing (POCT) Nurse
Metabolic Screening Nurse
Electrolyte Monitoring Nurse
Therapeutic Drug Monitoring (TDM) Nurse
Clinical Nurse Specialist \u2013 Laboratory Medicine
Biochemistry Nurse Consultant
Endocrinology Nurse (Biochemistry Link)
Toxicology Nurse
Cardiac Biomarker Nurse
Renal Function Monitoring Nurse
Metabolic Disorder Nurse Specialist
Clinical Research Nurse \u2013 Biochemistry Focus
Lab Data Quality Assurance Nurse
Medical Laboratory Liaison Nurse
Public Health Nurse \u2013 Screening Programs
Clinical Trials Nurse \u2013 Lab Diagnostics`),
  "Forensic Pathology Nurse": L(`Forensic Nurse
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
Program Coordinator \u2013 Forensic Nursing
Forensic Nursing Program Director
Chief Forensic Nurse Examiner
Forensic Nursing Coordinator (Hospital/Community)
Supervisor \u2013 Forensic Nurse Services
Director of Forensic & Medico-Legal Services`),
  "Immunopathology Nurse": L(`Immunopathology Nurse
Clinical Immunology Nurse
Autoimmune Disorders Nurse Specialist
Transplant Immunology Nurse (focus on graft rejection, immunosuppression)
Allergy & Immunology Nurse
Rheumatology/Immunology Nurse Specialist
Oncology Immunotherapy Nurse (checkpoint inhibitors, CAR-T, etc.)
Infectious Disease & Immunology Nurse
Immunopathology Lab Nurse (liaison between patients and lab teams)
Clinical Trials Nurse \u2013 Immunopathology
Nurse Coordinator \u2013 Immunology Diagnostics
Immunology Research Nurse
Nurse Scientist \u2013 Immunopathology
Immunology Nursing Educator
Research Nurse in Immunopathology/Immunotherapy
Clinical Instructor \u2013 Immunology/Pathology Nursing
Program Coordinator \u2013 Immunopathology Nursing
Immunology/Pathology Nurse Manager
Director of Clinical Immunology Nursing
Advanced Practice Nurse (APN) \u2013 Immunopathology`)
};
var PHARMACY_AREAS = {
  "Clinical & Patient-Centred Specializations": {
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
Palliative Care Clinical Pharmacist`)
  },
  "Laboratory & Diagnostic Specializations": {
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
Business Development Manager`)
  },
  // ADDED — the source document lists this key area without specializations or job levels.
  "Hospital & Institutional Pharmacy Specialties": {
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
Clinical Coordinator \u2013 Hospital Pharmacy
Hospital Pharmacy Supervisor
Long-Term Care Pharmacist
Institutional Pharmacist
Hospital Pharmacy Technician`)
  },
  "Research, Industry, and Development": {
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
Production Supervisor \u2013 Pharmaceutical Manufacturing
Validation Specialist
Quality Control Pharmacist
Sterile Products Manufacturing Specialist
Medical Affairs Pharmacist
Pharmaceutical Sales Specialist
Pharmaceutical Marketing Manager
Health Economics and Outcomes Research (HEOR) Specialist
Pharmacy Business Development Manager
Pharmaceutical Policy Analyst`)
  },
  "Retail & Community Pharmacy Specializations": {
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
Pharmacy Director \u2013 Retail Chain
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
Compliance Pharmacist \u2013 Retail Setting
Pharmacy Buyer / Procurement Specialist
Supply Chain Pharmacist \u2013 Community Pharmacy
Tele Pharmacy Pharmacist
e-Prescription Processing Pharmacist
Digital Health Pharmacist (Retail Platform)
Virtual MTM Pharmacist
Mobile Clinic Pharmacist`)
  },
  "Administrative, Educational & Legal Fields": {
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
Assistant Professor \u2013 Pharmacy Practice
Associate Professor \u2013 Pharmaceutical Sciences
Lecturer \u2013 Pharmacology / Pharmacy
Adjunct Faculty \u2013 Pharmacy
Pharmacy Residency Program Director
Preceptor \u2013 Pharmacy Students/Interns
Continuing Education (CE) Program Coordinator
Pharmacy Curriculum Developer
Pharmacy Skills Lab Coordinator
Simulation Lab Instructor (Pharmacy)
Graduate Program Coordinator \u2013 Pharmacy
Regulatory Affairs Pharmacist
Compliance Pharmacist
Pharmacy Inspector / Compliance Officer
Pharmacy Law and Ethics Instructor
Drug Enforcement Officer (Pharmacy Background)
Licensing and Accreditation Officer \u2013 Pharmacy Board
Policy Advisor \u2013 Pharmacy Practice
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
Public Health Pharmacist \u2013 Policy Division
Advocacy Manager \u2013 Pharmacy Association
Pharmacy Practice Standards Officer
Drug Policy Coordinator
Legislative Liaison \u2013 Pharmacy
Professional Affairs Pharmacist`)
  },
  "Global Health and Niche Services": {
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
Field Pharmacist \u2013 International Relief Missions
Global Access Program Manager (Pharmacy)
Pharmaceutical Supply Chain Pharmacist (Global Health)
Medicines Without Borders Pharmacist (e.g. MSF)
Global Regulatory Affairs Specialist (Pharma Sector)
Infectious Disease Pharmacist \u2013 Global Programs
Health Systems Strengthening Pharmacist (Global Health)
Global Health Policy Advisor \u2013 Pharmacy Sector
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
Faith-Based Health Missions Pharmacist`)
  },
  "Leadership & Administration": {
    specs: L(`Executive & Senior Leadership Roles
Mid-Level Leadership & Management
Program & Service Line Leadership
Administrative & Strategic
Leadership in Public Health, Policy & Education`),
    jobs: L(`Chief Pharmacy Officer (CPO)
Director of Pharmacy Services
Vice President of Pharmacy Operations
Executive Director \u2013 Pharmaceutical Services
Senior Director \u2013 Clinical Pharmacy Programs
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
Clinical Services Coordinator \u2013 Pharmacy
Medication Therapy Management (MTM) Program Manager
Pharmacy Residency Program Director (RPD)
Antimicrobial Stewardship Program Coordinator
Pharmacy Informatics Manager
Pharmacogenomics Program Lead
Tele Pharmacy Program Manager
Pharmacy Administrator
Strategic Initiatives Lead \u2013 Pharmacy Services
Pharmacy Compliance Officer
Regulatory Affairs Manager \u2013 Pharmacy Division
Pharmacy Quality Improvement Officer
Pharmacy Accreditation Coordinator
Clinical Governance Lead \u2013 Pharmacy
Pharmacy Analytics Manager
Health System Pharmacy Coordinator
Pharmacy Policy Director
Public Health Pharmacy Leader
Pharmacy Affairs Director \u2013 Government/Regulatory Body
Pharmacy Association Executive
Dean \u2013 College of Pharmacy
Associate Dean for Academic Affairs
Academic Program Director \u2013 Pharmacy Education`)
  }
};
var LAB = {
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
Quality Assurance Officer \u2013 Lab
Quality Control Technologist
Regulatory Compliance Specialist \u2013 Laboratory
Laboratory Safety Officer
Laboratory Supervisor
Senior Medical Technologist
Lead Technologist (by department)
Section Head \u2013 Laboratory Department
Laboratory Operations Manager
Laboratory Services Manager
Laboratory Director / Chief of Laboratory Services
Technical Director \u2013 Clinical Laboratory
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
Quality Assurance Specialist \u2013 Diagnostics
Regulatory Affairs Officer \u2013 Diagnostics
PACS Administrator (Imaging Systems)
Diagnostic Data Analyst
Compliance Officer \u2013 Diagnostic Services
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
Academic and teaching institutions`)
};
var ALLIED_JOBS = {
  "Diagnostic & Laboratory Specialties": L(`Medical Laboratory Scientist / Technologist
Medical Laboratory Technician
Radiologic Technologist / Radiographer
CT Technologist
Histotechnologist / Histotechnician
Pathologist Assistant
Electroneurodiagnostic (END) Technologist
Clinical Laboratory Technologists / Medical Laboratory Scientists
Radiologic Technologists & Technicians
Other technicians & technologists (cardiovascular technologists, nuclear medicine technologists, etc.)`),
  "Therapeutic & Clinical Specialties": L(`Physiotherapist / Physical Therapist
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
  "Pharmaceutical & Nutrition Specialties": L(`Pharmacist
Pharmacy Technician
Dietitian / Clinical Nutritionist
Nutritionist
Dietetic Technician`),
  "Emergency & Prehospital Care": L(`Paramedic
Emergency Medical Technician (EMT)
Critical Care Transport Specialist
Flight Paramedic`),
  "Behavioural & Mental Health Specialties": L(`Clinical Psychologist
Behavioural Therapist
Mental Health Counsellor
Substance Abuse Counsellor
Psychiatric Technician
Social Worker`),
  "Supportive & Direct Care Roles": L(`Physician Assistant / Associate
Anesthesia Technologist
Surgical Technologist / Operating Department Practitioner (ODP)
Clinical Support Worker
Healthcare Assistant / Nursing Assistant
Community Health Worker
Case Manager`),
  "Specialized & Emerging Roles": L(`Genetic Counsellor
Perfusionist
Medical Physicist
Biomedical Scientist
Clinical Exercise Physiologist
Kinesiologist
Telehealth Specialist
Rehabilitation Engineer`)
};
var IT_ADMIN_JOBS = {
  "Health Information Technology": L(`Health Information Technician
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
  "Healthcare Administration": L(`Accreditation Coordinator
Administrative Assistant \u2013 Healthcare
Administrative Officer
Admissions Coordinator
Case Management Supervisor
Hospital Administrator
Medical Superintendent
Healthcare Operations Manager
Quality Assurance (QA) Manager
Healthcare Project Manager
Claims / Revenue Cycle Manager
HR Manager \u2013 Healthcare
Compliance Officer \u2013 Healthcare
Public Health Administrator
Medical Director \u2013 Insurance
District Health Officer (DHO)
State Health Mission Director
Program Manager \u2013 National Health Mission (NHM)
Public Health Specialist \u2013 WHO/MoHFW/NGOs
Release of Information (ROI) Specialist
Health Information Clerk
Health Information Manager (HIM)
Coding Manager
Revenue Cycle Analyst
Compliance & Privacy Officer
Front Office Executive \u2013 Hospital/Clinic
Health Program Coordinator
Health Services Manager
Health Unit Coordinator
Healthcare Administrator / Manager
Healthcare Customer Service Executive
Medical and Health Services Manager
Medical Office Manager
Nursing Home Administrator
Operations Manager \u2013 Healthcare
Outpatient Services Manager
Patient Care Coordinator
Practice Administrator
Practice Manager
Quality Improvement Manager
Research Program Administrator \u2013 Healthcare
Research Program Coordinator
Rehabilitation Services Manager
Revenue Cycle Manager
Risk & Safety Manager
Scheduling Coordinator
Support Services Manager
Unit Manager (ICU, ER, OT, etc.)
Utilization Review Manager`)
};
var SUPPORT_JOBS = {
  "Clerical & Front Office": L(`Front Office Executive
Receptionist \u2013 Hospital/Clinic
Administrative Clerk
Ward Administrative Clerk
Patient Registration Clerk
Admissions Clerk / Admissions Coordinator
Health Unit Clerk
Medical Office Assistant
Medical Secretary`),
  "Medical Records & Information": L(`Medical Records Clerk
Data Entry Operator \u2013 Hospital
Coding Specialist (ICD / CPT)
Medical Transcriptionist
Medical Records Supervisor`),
  "Billing & Finance": L(`Medical Billing Manager
Medical Billing Specialist
Insurance Verification Specialist
Accounts Assistant \u2013 Healthcare
Patient Accounts Clerk
Billing Clerk`),
  "Logistics & Facility": L(`Transport Coordinator (Patient / Sample Transfer)
Inventory Clerk \u2013 Hospital Stores
Supply Chain Assistant \u2013 Healthcare
Facilities Assistant
Laundry Services Coordinator
Housekeeping Supervisor`),
  "Patient Services": L(`Patient Services Manager
Patient Services Associate
Patient Care Coordinator (supportive)
Help Desk Executive \u2013 Hospital
Patient Relations Representative`),
  "General Ancillary Support": L(`File Clerk
Records Assistant
Office Boy / Peon (Hospital Admin)
Messenger / Runner (Hospital Docs & Records)
Switchboard Operator / Call Center Executive \u2013 Healthcare
Admissions Clerk / Coordinator
Patient Care Coordinator (non-clinical)
Transport Coordinator (Patients / Samples)`),
  "Ambulance Support Services": L(`Ambulance Nurse
Critical Care Paramedic (CCP)
Advanced Care Paramedic (ACP)
Basic Life Support (BLS) Provider
Advanced Life Support (ALS) Provider
Ambulance Driver / Emergency Vehicle Operator
Ambulance Attendant (First-Aid Certified)
Patient Transporter (Non-Emergency Transfers)
Stretcher Bearer
Transport Coordinator \u2013 Ambulance Services
Ambulance Operations Supervisor
Emergency Medical Services (EMS) Coordinator
Ambulance Services Manager
Director of Emergency Medical Services (EMS Director)
Dispatch Coordinator / Dispatcher (Ambulance Control Room)
Operations Supervisor \u2013 Ambulance Services
Transport Coordinator \u2013 Ambulance Fleet
Dispatch Coordinator / Dispatcher Supervisor
Rescue & Disaster Response Specialist
Emergency Medical Technician \u2013 Paramedic (EMT-P)
Emergency Medical Technician \u2013 Advanced (EMT-A)
Emergency Medical Technician \u2013 Basic (EMT-B)
Helper / Cleaner \u2013 Ambulance Maintenance
Emergency Dispatcher (Control Room)
Call Taker / Emergency Response Operator
Radio Operator \u2013 Ambulance Services
GIS/Tracking Specialist (Ambulance Location Monitoring)`)
};
var ROLES = [
  { id: "management", label: "Healthcare Management", icon: "briefcase", color: "#7c3aed", kind: "jobs", jobs: L(`Chief Compliance Officer (CCO)
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
Chief Executive Officer (CEO) \u2013 Hospital
Chief Operating Officer (COO)
Chief Privacy Officer
Vice President \u2013 Clinical Services
Vice President \u2013 Healthcare Operations
Vice President \u2013 Patient Services
Dean of Healthcare Administration
Department Manager (Radiology, Pathology, etc.)
Director of Clinical Operations
Director of Community Health Programs
Director of Facility Management
Director of Finance \u2013 Healthcare
Director of Health Information Management (HIM)
Director of Hospital Administration
Director of Patient Care Services
Director of Quality & Compliance
Director of Risk Management
Director of Support Services
Medical Director \u2013 Insurance
District Health Officer (DHO)
State Health Mission Director`) },
  { id: "doctors", label: "Medical Doctors & Physicians", icon: "stethoscope", color: "#2457f5", kind: "spec-jobs", specLabel: "Please select your specialization", specs: DOCTOR_JOBS },
  { id: "surgeons", label: "Surgeons", icon: "scalpel", color: "#0ea5e9", kind: "jobs", jobs: L(`General Surgeon
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
  { id: "dental", label: "Dental Professionals", icon: "tooth", color: "#06b6d4", kind: "jobs", jobs: L(`General Dentist (BDS/DDS/DMD)
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
  { id: "nursing", label: "Nursing & Midwifery", icon: "nurse", color: "#ec4899", kind: "spec-jobs", specLabel: "Please select your specialization", specs: NURSE_JOBS },
  { id: "pharmacy", label: "Pharmacy Professionals", icon: "pill", color: "#10b981", kind: "area", areaLabel: "What is your key area of pharmacy?", areas: PHARMACY_AREAS },
  { id: "lab", label: "Laboratory & Diagnostic Professionals", icon: "microscope", color: "#f59e0b", kind: "lab", ...LAB },
  { id: "allied", label: "Allied Health Professionals", icon: "pulse", color: "#ef4444", kind: "spec-jobs", specLabel: "Please select your specialization", specs: ALLIED_JOBS },
  { id: "itadmin", label: "Health IT & Admin Professionals", icon: "monitor", color: "#6366f1", kind: "spec-jobs", specLabel: "Please select your specialization", specs: IT_ADMIN_JOBS },
  { id: "support", label: "Support Staff (Ancillary)", icon: "users", color: "#64748b", kind: "spec-jobs", specLabel: "Please select your specialization", specs: SUPPORT_JOBS }
];
var roleById = (id) => ROLES.find((r) => r.id === id);
function jobCount(role) {
  const set = /* @__PURE__ */ new Set();
  if (role.kind === "jobs") role.jobs.forEach((j) => set.add(j));
  if (role.kind === "spec-jobs") Object.values(role.specs).forEach((js) => js.forEach((j) => set.add(j)));
  if (role.kind === "area") Object.values(role.areas).forEach((a) => a.jobs.forEach((j) => set.add(j)));
  if (role.kind === "lab") role.jobs.forEach((j) => set.add(j));
  return set.size;
}
function allJobs() {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (j, role, group) => {
    const k = role.id + j;
    if (!seen.has(k)) {
      seen.add(k);
      out.push({ t: j, role: role.id, roleLabel: role.label, group });
    }
  };
  ROLES.forEach((r) => {
    if (r.kind === "jobs") r.jobs.forEach((j) => add(j, r, ""));
    if (r.kind === "spec-jobs") Object.entries(r.specs).forEach(([s, js]) => js.forEach((j) => add(j, r, s)));
    if (r.kind === "area") Object.entries(r.areas).forEach(([s, a]) => a.jobs.forEach((j) => add(j, r, s)));
    if (r.kind === "lab") r.jobs.forEach((j) => add(j, r, ""));
  });
  return out;
}
var PRACTICE = {
  employment: { q: "What is your employment status?", options: ["Full-time", "Part-time", "Locum", "Retired but practicing", "Retired but not practicing"] },
  sector: { q: "Do you work in the public or private sector?", options: ["Public", "Private", "Both"] },
  facility: { q: "In what type of facility do you primarily work?", options: ["Hospital", "Private Clinic", "Nursing Home", "Pharmacy", "Laboratory", "Community Health Center", "Other"] },
  beds: { q: "What is the size of your facility (number of beds)?", options: ["1\u201320", "21\u201350", "51\u2013100", "101\u2013500", "500+"] },
  setting: { q: "Is your practice in an urban, semi-urban or rural setting?", options: ["Urban", "Semi-Urban", "Rural"] },
  teaching: { q: "Do you work in a teaching/academic hospital?", options: YN }
};
var EXPERIENCE = {
  years: { q: "How many years have you been practicing in your profession?", options: ["0\u20132 years", "3\u20135 years", "6\u201310 years", "11\u201320 years", "20+ years"] },
  patients: { q: "How many patients do you typically see per week?", options: ["0\u201310", "11\u201325", "26\u201350", "51\u2013100", "100+"] },
  trials: { q: "Do you have experience participating in clinical trials?", options: YN },
  trialsCount: { q: "How many clinical trials have you been involved in over the past 2 years?", options: ["0 - 49", "50 - 99", "100 - 149", "150 - 200", "More than 200"] }
};
var INFLUENCE = [
  { key: "purchases", q: "Are you a decision-maker for purchases in your practice/facility?" },
  { key: "formulary", q: "Are you part of a drug formulary or procurement committee?" },
  { key: "devices", q: "Do you have influence over medical device/equipment purchasing decisions?" },
  { key: "policy", q: "Are you involved in health policy or guideline development?" }
];
var DIGITAL = [
  { key: "ehr", q: "Do you use Electronic Health Records (EHR/EMR) in your practice?" },
  { key: "telemed", q: "Do you use telemedicine for patient consultations?" },
  { key: "digitalInit", q: "Are you involved in digital health initiatives?" },
  { key: "onlineOk", q: "Are you comfortable participating in online surveys?" }
];
var AVAILABILITY = {
  mode: { q: "Do you prefer participating via online, telephone, or face-to-face research?", options: ["Online", "Telephone", "Face-to-Face"] },
  frequency: { q: "How often are you willing to participate in research?", options: ["Weekly", "Monthly", "Quarterly", "Rarely"] },
  time: { q: "What is your preferred time of day to participate?", options: ["Morning", "Afternoon", "Evening"] },
  recontact: { q: "Do you agree to be re-contacted for future studies?", options: YN },
  focus: { q: "Would you participate in focus groups in addition to surveys?", options: YN }
};
var CERTIFICATION = {
  consent: "I consent to my certification number being used only for verification purposes and stored securely in compliance with GDPR/HIPAA/local data privacy laws."
};
var maskLicence = (v = "") => v.length <= 4 ? v : "\u2022".repeat(Math.min(v.length - 4, 8)) + v.slice(-4);

export {
  SCREENER,
  DEMO,
  ageGroupFrom,
  EDUCATION,
  ROLES,
  roleById,
  jobCount,
  allJobs,
  PRACTICE,
  EXPERIENCE,
  INFLUENCE,
  DIGITAL,
  AVAILABILITY,
  CERTIFICATION,
  maskLicence
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2RhdGEvaGNwUHJvZmlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gSGVhbHRoY2FyZSBwcm9mZXNzaW9uYWwgcHJvZmlsaW5nIHF1ZXN0aW9ubmFpcmUgXHUyMDE0IHRyYW5zY3JpYmVkIGZyb21cbi8vIFwiTUhPIExBdGVzdCBBbGwgUHJvZmVzc2lvbmFscyBRdWVzdGlvbnNcIiAocHJvamVjdCBkb2N1bWVudCkuIExpc3RzIGFyZSBkZS1kdXBsaWNhdGVkIGF1dG9tYXRpY2FsbHkuXG4vLyBTdHJ1Y3R1cmU6XG4vLyAgIFNDUkVFTkVSICBcdTIxOTIgXCJEbyB5b3Ugd29yayBpbiB0aGUgaGVhbHRoY2FyZSBpbmR1c3RyeT9cIiAoTm8gZW5kcyB0aGUgc2lnbi11cCkgKyBcIkFyZSB5b3UgYSBjbGluaWNpYW4/XCJcbi8vICAgREVNTyAgICAgIFx1MjE5MiBnZW5kZXIsIGFnZSBncm91cCAoZGVyaXZlZCBmcm9tIGRhdGUgb2YgYmlydGgpLCBtYXJpdGFsIHN0YXR1cywgY2hpbGRyZW4sIGluY29tZXNcbi8vICAgRURVQ0FUSU9OIFx1MjE5MiBoaWdoZXN0IGxldmVsIFx1MjE5MiBxdWFsaWZpY2F0aW9uIChRMikgKyBsaWNlbmNlL2JvYXJkIHF1ZXN0aW9uIChRMylcbi8vICAgUk9MRVMgICAgIFx1MjE5MiBwcmltYXJ5IHJvbGUgb2YgZXhwZXJ0aXNlIFx1MjE5MiBzcGVjaWFsaXphdGlvbiAvIGtleSBhcmVhIFx1MjE5MiBqb2IgbGV2ZWwgKGJyYW5jaGluZylcbi8vICAgUFJBQ1RJQ0UsIEVYUEVSSUVOQ0UsIElORkxVRU5DRSwgRElHSVRBTCwgQVZBSUxBQklMSVRZLCBDRVJUSUZJQ0FUSU9OIFx1MjE5MiBjb21tb24gc2VjdGlvbnNcbi8vIFdoZXJlIHRoZSBzb3VyY2UgZG9jdW1lbnQgaGFkIG5vIGxpc3QgKFBoYXJtYWN5IFx1MjAzQSBIb3NwaXRhbCAmIEluc3RpdHV0aW9uYWwpIHdlIGFkZGVkIGEgc2hvcnQgbGlzdCxcbi8vIG1hcmtlZCBBRERFRCBiZWxvdywgc28gdGhlIGJyYW5jaCBuZXZlciBkZWFkLWVuZHMuIFJldmlldyBiZWZvcmUgbGF1bmNoLlxuXG5jb25zdCBMID0gKHMpID0+IFsuLi5uZXcgU2V0KHMuc3BsaXQoJ1xcbicpLm1hcCgoeCkgPT4geC50cmltKCkpLmZpbHRlcihCb29sZWFuKSldO1xuY29uc3QgWU4gPSBbJ1llcycsICdObyddO1xuXG5leHBvcnQgY29uc3QgU0NSRUVORVIgPSB7XG4gIGluZHVzdHJ5OiB7IHE6ICdEbyB5b3Ugd29yayBpbiB0aGUgaGVhbHRoY2FyZSBpbmR1c3RyeT8nLCBvcHRpb25zOiBZTiB9LFxuICBjbGluaWNpYW46IHsgcTogJ0FyZSB5b3UgYSBjbGluaWNpYW4/Jywgb3B0aW9uczogWU4gfSxcbiAgcmVqZWN0TWVzc2FnZTogJ1RoYW5rIHlvdSBmb3IgeW91ciBpbnRlcmVzdC4gWW91IGRvblx1MjAxOXQgbWVldCBvdXIgaGVhbHRoY2FyZSByZWNydWl0bWVudCBjcml0ZXJpYSwgc28gd2UgY2FuXHUyMDE5dCBjcmVhdGUgYSBwcm9mZXNzaW9uYWwgYWNjb3VudCBmb3IgeW91LicsXG59O1xuXG5leHBvcnQgY29uc3QgREVNTyA9IHtcbiAgZ2VuZGVyOiB7IHE6ICdXaGF0IGlzIHlvdXIgZ2VuZGVyPycsIG9wdGlvbnM6IFsnTWFsZScsICdGZW1hbGUnLCAnT3RoZXInXSB9LFxuICBhZ2U6IHsgcTogJ1doYXQgaXMgeW91ciBhZ2UgZ3JvdXA/Jywgb3B0aW9uczogWycyMS0yOScsICczMC0zOScsICc0MC00OScsICc1MC01OScsICc2MCsnXSB9LFxuICBtYXJpdGFsOiB7IHE6ICdXaGF0IGlzIHlvdXIgbWFyaXRhbCBzdGF0dXM/Jywgb3B0aW9uczogWydTaW5nbGUnLCAnTWFycmllZCcsICdEaXZvcmNlZCcsICdXaWRvdy9XaWRvd2VyJ10gfSxcbiAgY2hpbGRyZW46IHsgcTogJ051bWJlciBvZiBjaGlsZHJlbiBiZWxvdyAxOCBsaXZpbmcgaW4geW91ciBob3VzZWhvbGQ/Jywgb3B0aW9uczogWycwJywgJzEtMycsICc0LTYnLCAnNysnXSB9LFxuICBwZXJzb25hbEluY29tZTogeyBxOiAnV2hhdCBpcyB5b3VyIGFwcHJveGltYXRlIGFubnVhbCBwZXJzb25hbCBpbmNvbWUgKGJlZm9yZSB0YXgpPycsIG9wdGlvbnM6IFsnTGVzcyB0aGFuICQxMCwwMDAnLCAnJDEwLDAwMCBcdTIwMTMgJDI0LDk5OScsICckMjUsMDAwIFx1MjAxMyAkNDksOTk5JywgJyQ1MCwwMDAgXHUyMDEzICQ5OSw5OTknLCAnJDEwMCwwMDArJywgJ1ByZWZlciBub3QgdG8gYW5zd2VyJ10gfSxcbiAgZmFtaWx5SW5jb21lOiB7IHE6ICdXaGF0IGlzIHlvdXIgYXBwcm94aW1hdGUgdG90YWwgZmFtaWx5IGFubnVhbCBpbmNvbWUgKGJlZm9yZSB0YXgpPycsIG9wdGlvbnM6IFsnTGVzcyB0aGFuICQyNSwwMDAnLCAnJDI1LDAwMCBcdTIwMTMgJDQ5LDk5OScsICckNTAsMDAwIFx1MjAxMyAkOTksOTk5JywgJyQxMDAsMDAwIFx1MjAxMyAkMTk5LDk5OScsICckMjAwLDAwMCsnLCAnUHJlZmVyIG5vdCB0byBhbnN3ZXInXSB9LFxufTtcblxuLyoqIEFnZSBncm91cCBmcm9tIGFuIElTTyBkYXRlIG9mIGJpcnRoICh0aGUgcXVlc3Rpb25uYWlyZSBhc2tzIGZvciBhbiBhZ2UgYmFuZDsgd2UgYWxyZWFkeSBoYXZlIHRoZSBET0IpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFnZUdyb3VwRnJvbShkb2IpIHtcbiAgaWYgKCFkb2IpIHJldHVybiAnJztcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRvYik7XG4gIGlmIChOdW1iZXIuaXNOYU4oK2QpKSByZXR1cm4gJyc7XG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGxldCBhID0gbm93LmdldEZ1bGxZZWFyKCkgLSBkLmdldEZ1bGxZZWFyKCk7XG4gIGlmIChub3cgPCBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSkpIGEgLT0gMTtcbiAgaWYgKGEgPCAyMSkgcmV0dXJuICdVbmRlciAyMSc7XG4gIGlmIChhIDwgMzApIHJldHVybiAnMjEtMjknO1xuICBpZiAoYSA8IDQwKSByZXR1cm4gJzMwLTM5JztcbiAgaWYgKGEgPCA1MCkgcmV0dXJuICc0MC00OSc7XG4gIGlmIChhIDwgNjApIHJldHVybiAnNTAtNTknO1xuICByZXR1cm4gJzYwKyc7XG59XG5cbmV4cG9ydCBjb25zdCBFRFVDQVRJT04gPSB7XG4gIHE6ICdXaGF0IGlzIHlvdXIgaGlnaGVzdCBsZXZlbCBvZiBlZHVjYXRpb24/JyxcbiAgbGV2ZWxzOiBbJ0RpcGxvbWEnLCAnQmFjaGVsb3JcdTIwMTlzJywgJ01hc3Rlclx1MjAxOXMnLCAnRG9jdG9yYXRlJywgJ090aGVycyddLFxuICBicmFuY2hlczoge1xuICAgIERpcGxvbWE6IHtcbiAgICAgIHEyOiAnV2hhdCB0eXBlIG9mIGRpcGxvbWEgaGF2ZSB5b3UgY29tcGxldGVkPycsXG4gICAgICBvMjogWydOdXJzaW5nIGRpcGxvbWEgKEdOTS9BTk0pJywgJ1BhcmFtZWRpY2FsIGRpcGxvbWEgKExhYiB0ZWNobmljaWFuLCBSYWRpb2xvZ3ksIFBoeXNpb3RoZXJhcHksIGV0Yy4pJywgJ1BoYXJtYWN5IGRpcGxvbWEgKEQuUGhhcm0pJywgJ090aGVyIGhlYWx0aGNhcmUtcmVsYXRlZCBkaXBsb21hJ10sXG4gICAgICBxMzogJ0FyZSB5b3UgY2VydGlmaWVkL2xpY2Vuc2VkIHRvIHByYWN0aWNlIGluIHlvdXIgZmllbGQ/JyxcbiAgICAgIG8zOiBbJ1llcycsICdObycsICdDdXJyZW50bHkgdW5kZXIgcHJvY2VzcyddLFxuICAgIH0sXG4gICAgJ0JhY2hlbG9yXHUyMDE5cyc6IHtcbiAgICAgIHEyOiAnV2hhdCBpcyB5b3VyIGJhY2hlbG9yXHUyMDE5cyBxdWFsaWZpY2F0aW9uPycsXG4gICAgICBvMjogWydNQkJTIChNZWRpY2luZSknLCAnQkRTIChEZW50aXN0cnkpJywgJ0IuU2MgTnVyc2luZycsICdCLlBoYXJtIChQaGFybWFjeSknLCAnQlBUIChQaHlzaW90aGVyYXB5KScsICdPdGhlciAocGxlYXNlIHNwZWNpZnkpJ10sXG4gICAgICBxMzogJ0RvIHlvdSBob2xkIGEgcHJvZmVzc2lvbmFsIHJlZ2lzdHJhdGlvbi9saWNlbnN1cmU/JyxcbiAgICAgIG8zOiBbJ1llcywgd2l0aCBuYXRpb25hbCBtZWRpY2FsL2RlbnRhbC9udXJzaW5nL3BoYXJtYWN5IGNvdW5jaWwnLCAnWWVzLCB3aXRoIHN0YXRlIG1lZGljYWwvZGVudGFsL251cnNpbmcvcGhhcm1hY3kgY291bmNpbCcsICdObycsICdVbmRlciBwcm9jZXNzJ10sXG4gICAgfSxcbiAgICAnTWFzdGVyXHUyMDE5cyc6IHtcbiAgICAgIHEyOiAnV2hhdCBpcyB5b3VyIG1hc3Rlclx1MjAxOXMgcXVhbGlmaWNhdGlvbj8nLFxuICAgICAgbzI6IFsnTUQvTVMgKFBvc3RncmFkdWF0ZSBNZWRpY2luZS9TdXJnZXJ5KScsICdNRFMgKERlbnRpc3RyeSknLCAnTS5TYyBOdXJzaW5nJywgJ00uUGhhcm0gKFBoYXJtYWN5KScsICdNUFQgKFBoeXNpb3RoZXJhcHkpJywgJ090aGVyIGhlYWx0aGNhcmUgbWFzdGVyXHUyMDE5cyBkZWdyZWUnXSxcbiAgICAgIHEzOiAnRG8geW91IGhhdmUgYSBzcGVjaWFsaXN0IGNlcnRpZmljYXRpb24vYm9hcmQgcmVjb2duaXRpb24/JyxcbiAgICAgIG8zOiBbJ1llcyAoZS5nLiwgQ2FyZGlvbG9naXN0LCBPbmNvbG9naXN0LCBPcnRob3BlZGljIFN1cmdlb24sIGV0Yy4pJywgJ05vJywgJ0N1cnJlbnRseSBwdXJzdWluZyddLFxuICAgIH0sXG4gICAgRG9jdG9yYXRlOiB7XG4gICAgICBxMjogJ1doYXQgaXMgeW91ciBkb2N0b3JhbCBxdWFsaWZpY2F0aW9uPycsXG4gICAgICBvMjogWydETS9NQ2ggKFN1cGVyLXNwZWNpYWx0eSBNZWRpY2luZS9TdXJnZXJ5KScsICdQaEQgKEhlYWx0aGNhcmUvTWVkaWNhbCBTY2llbmNlKScsICdPdGhlciAocGxlYXNlIHNwZWNpZnkpJ10sXG4gICAgICBxMzogJ0RvIHlvdSBoYXZlIGNlcnRpZmljYXRpb24vcmVnaXN0cmF0aW9uIHdpdGggYSBwcm9mZXNzaW9uYWwgY291bmNpbCBvciBib2FyZD8nLFxuICAgICAgbzM6IFsnWWVzLCBOYXRpb25hbCBNZWRpY2FsIENvdW5jaWwgb3IgZXF1aXZhbGVudCcsICdZZXMsIEludGVybmF0aW9uYWwgTWVkaWNhbCBCb2FyZCAoZS5nLiwgVVNNTEUsIE1SQ1AsIEZSQ1MpJywgJ05vJywgJ1VuZGVyIHByb2Nlc3MnXSxcbiAgICB9LFxuICAgIE90aGVyczoge1xuICAgICAgcTI6ICdQbGVhc2Ugc3BlY2lmeSB5b3VyIHF1YWxpZmljYXRpb24uJyxcbiAgICAgIG8yOiBudWxsLCAvLyBmcmVlIHRleHRcbiAgICAgIHEzOiAnQXJlIHlvdSBjZXJ0aWZpZWQvbGljZW5zZWQgdG8gcHJhY3RpY2UgaW4geW91ciBmaWVsZD8nLFxuICAgICAgbzM6IFsnWWVzJywgJ05vJywgJ0N1cnJlbnRseSB1bmRlciBwcm9jZXNzJ10sXG4gICAgfSxcbiAgfSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTWVkaWNhbCBkb2N0b3JzICYgcGh5c2ljaWFuczogc3BlY2lhbGl6YXRpb24gXHUyMTkyIGpvYiBsZXZlbCAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmNvbnN0IERPQ1RPUl9KT0JTID0ge1xuICAnR2VuZXJhbCBQcmFjdGl0aW9uZXIgKEdQKSAvIEZhbWlseSBQaHlzaWNpYW4nOiBMKGBHZW5lcmFsIFByYWN0aXRpb25lciAoR1ApXG5GYW1pbHkgTWVkaWNpbmUgUGh5c2ljaWFuXG5QcmltYXJ5IENhcmUgUGh5c2ljaWFuXG5Ib3VzZSBPZmZpY2VyIChJbnRlcm4pXG5SZXNpZGVudCBEb2N0b3Jcbk1lZGljYWwgT2ZmaWNlclxuQXR0ZW5kaW5nIFBoeXNpY2lhblxuQ29uc3VsdGFudCBQaHlzaWNpYW5cblNlbmlvciBDb25zdWx0YW50XG5DaGllZiBNZWRpY2FsIE9mZmljZXIgKENNTylcbk1lZGljYWwgU3VwZXJpbnRlbmRlbnRcbk1lZGljYWwgRGlyZWN0b3JgKSxcbiAgJ0ludGVybmFsIE1lZGljaW5lIFNwZWNpYWxpc3QnOiBMKGBJbnRlcm5hbCBNZWRpY2luZSBQaHlzaWNpYW4gKEludGVybmlzdClcbkNhcmRpb2xvZ2lzdFxuRW5kb2NyaW5vbG9naXN0XG5HYXN0cm9lbnRlcm9sb2dpc3Rcbk5lcGhyb2xvZ2lzdFxuUmhldW1hdG9sb2dpc3RcbkhhZW1hdG9sb2dpc3RcbkluZmVjdGlvdXMgRGlzZWFzZSBTcGVjaWFsaXN0XG5HZXJpYXRyaWNpYW5cbkhvc3BpdGFsaXN0XG5EaWFiZXRvbG9naXN0XG5ISVYvQUlEUyBTcGVjaWFsaXN0YCksXG4gICdQYWVkaWF0cmljcyAmIE5lb25hdG9sb2d5JzogTChgUGFlZGlhdHJpY2lhblxuTmVvbmF0b2xvZ2lzdFxuUGFlZGlhdHJpYyBOZXVyb2xvZ2lzdFxuUGFlZGlhdHJpYyBDYXJkaW9sb2dpc3RcblBhZWRpYXRyaWMgRW5kb2NyaW5vbG9naXN0XG5QYWVkaWF0cmljIEludGVuc2l2aXN0YCksXG4gIENhcmRpb2xvZ3k6IEwoYENhcmRpb2xvZ2lzdFxuSW50ZXJ2ZW50aW9uYWwgQ2FyZGlvbG9naXN0XG5Ob24tSW52YXNpdmUgQ2FyZGlvbG9naXN0XG5QYWVkaWF0cmljIENhcmRpb2xvZ2lzdFxuRWxlY3Ryb3BoeXNpb2xvZ2lzdFxuQ2FyZGlvdGhvcmFjaWMgU3VyZ2VvblxuQ2FyZGlvbG9neSBSZXNpZGVudFxuRmVsbG93IGluIENhcmRpb2xvZ3lcbkNhcmRpYWMgSW50ZW5zaXZpc3RcblByZXZlbnRpdmUgQ2FyZGlvbG9naXN0YCksXG4gIFB1bG1vbm9sb2d5OiBMKGBQdWxtb25vbG9naXN0IChDaGVzdCBQaHlzaWNpYW4pXG5Dcml0aWNhbCBDYXJlIC8gSW50ZW5zaXZlIENhcmUgU3BlY2lhbGlzdFxuU2xlZXAgTWVkaWNpbmUgU3BlY2lhbGlzdFxuUmVzcGlyYXRvcnkgTWVkaWNpbmUgQ29uc3VsdGFudFxuUHVsbW9ub2xvZ3kgRmVsbG93IC8gVHJhaW5lZVxuVGhvcmFjaWMgU3VyZ2VvbmApLFxuICBOZXVyb2xvZ3k6IEwoYE5ldXJvbG9naXN0XG5OZXVyb3BoeXNpb2xvZ2lzdFxuUGFlZGlhdHJpYyBOZXVyb2xvZ2lzdFxuTmV1cm9jcml0aWNhbCBDYXJlIFNwZWNpYWxpc3RcblN0cm9rZSBTcGVjaWFsaXN0XG5DbGluaWNhbCBOZXVyb3BoeXNpb2xvZ2lzdFxuTmV1cm8tb25jb2xvZ2lzdFxuTW92ZW1lbnQgRGlzb3JkZXIgU3BlY2lhbGlzdFxuRXBpbGVwdG9sb2dpc3Rcbk5ldXJvLXJlaGFiaWxpdGF0aW9uIFNwZWNpYWxpc3Rcbk5ldXJvbG9neSBSZXNpZGVudCAvIEZlbGxvd2ApLFxuICBFbmRvY3Jpbm9sb2d5OiBMKGBFbmRvY3Jpbm9sb2dpc3RcbkRpYWJldG9sb2dpc3RcblBhZWRpYXRyaWMgRW5kb2NyaW5vbG9naXN0XG5SZXByb2R1Y3RpdmUgRW5kb2NyaW5vbG9naXN0XG5UaHlyb2lkIFNwZWNpYWxpc3Rcbk1ldGFib2xpYyBTcGVjaWFsaXN0XG5PYmVzaXR5IE1lZGljaW5lIFBoeXNpY2lhblxuRW5kb2NyaW5vbG9neSBSZXNpZGVudCAvIEZlbGxvd1xuQ29uc3VsdGFudCBFbmRvY3Jpbm9sb2dpc3RgKSxcbiAgR2FzdHJvZW50ZXJvbG9neTogTChgR2FzdHJvZW50ZXJvbG9naXN0XG5IZXBhdG9sb2dpc3RcblBhZWRpYXRyaWMgR2FzdHJvZW50ZXJvbG9naXN0XG5JbnRlcnZlbnRpb25hbCBHYXN0cm9lbnRlcm9sb2dpc3RcbkdJIE9uY29sb2dpc3RcbkdJIE1vdGlsaXR5IFNwZWNpYWxpc3RcblBhbmNyZWF0b2xvZ2lzdFxuQ29sb3JlY3RhbCBTcGVjaWFsaXN0IChNRClcbkdhc3Ryb2VudGVyb2xvZ3kgUmVzaWRlbnQgLyBGZWxsb3dcbkNvbnN1bHRhbnQgR2FzdHJvZW50ZXJvbG9naXN0YCksXG4gIE9uY29sb2d5OiBMKGBNZWRpY2FsIE9uY29sb2dpc3RcblJhZGlhdGlvbiBPbmNvbG9naXN0XG5TdXJnaWNhbCBPbmNvbG9naXN0XG5IYWVtYXRvbG9naXN0LU9uY29sb2dpc3RcblBhZWRpYXRyaWMgT25jb2xvZ2lzdFxuR3luYWVjb2xvZ2ljIE9uY29sb2dpc3Rcbk5ldXJvLU9uY29sb2dpc3RcblRob3JhY2ljIE9uY29sb2dpc3RcbkJyZWFzdCBPbmNvbG9naXN0XG5Vcm9sb2dpYyBPbmNvbG9naXN0XG5HYXN0cm9pbnRlc3RpbmFsIChHSSkgT25jb2xvZ2lzdFxuUGFsbGlhdGl2ZSBDYXJlIE9uY29sb2dpc3Rcbk9uY29sb2d5IFJlc2lkZW50IC8gRmVsbG93XG5Db25zdWx0YW50IE9uY29sb2dpc3RgKSxcbiAgTmVwaHJvbG9neTogTChgTmVwaHJvbG9naXN0XG5QYWVkaWF0cmljIE5lcGhyb2xvZ2lzdFxuVHJhbnNwbGFudCBOZXBocm9sb2dpc3Rcbkh5cGVydGVuc2lvbiBTcGVjaWFsaXN0XG5Dcml0aWNhbCBDYXJlIE5lcGhyb2xvZ2lzdFxuT25jbyBOZXBocm9sb2dpc3RcbkNhcmRpbyBOZXBocm9sb2dpc3RcbkNvbnN1bHRhbnQgTmVwaHJvbG9naXN0XG5OZXBocm9sb2d5IEZlbGxvdyAvIFJlc2lkZW50YCksXG4gIE9ydGhvcGFlZGljOiBMKGBPcnRob3BhZWRpYyBTdXJnZW9uXG5UcmF1bWEgT3J0aG9wYWVkaWMgU3VyZ2VvblxuUGFlZGlhdHJpYyBPcnRob3BhZWRpYyBTdXJnZW9uXG5TcGluZSBTdXJnZW9uIChPcnRob3BhZWRpYyBTcGluZSlcbkpvaW50IFJlcGxhY2VtZW50IFN1cmdlb25cblNwb3J0cyBNZWRpY2luZSBPcnRob3BhZWRpc3RcbkhhbmQgJiBVcHBlciBMaW1iIFN1cmdlb25cbkZvb3QgJiBBbmtsZSBTdXJnZW9uXG5PcnRob3BhZWRpYyBPbmNvbG9naXN0XG5TaG91bGRlciAmIEVsYm93IFNwZWNpYWxpc3Rcbk9ydGhvcGFlZGljIENvbnN1bHRhbnRcbk9ydGhvcGFlZGljIFJlc2lkZW50IC8gRmVsbG93YCksXG4gIFJoZXVtYXRvbG9neTogTChgUmhldW1hdG9sb2dpc3RcblBhZWRpYXRyaWMgUmhldW1hdG9sb2dpc3RcblJoZXVtYXRvbG9neSBGZWxsb3cgLyBUcmFpbmVlXG5JbW11bm9sb2dpc3QgKENsaW5pY2FsKVxuQ29uc3VsdGFudCBSaGV1bWF0b2xvZ2lzdGApLFxuICAnUHN5Y2hvbG9neSAmIE1lbnRhbCBIZWFsdGgnOiBMKGBDbGluaWNhbCBQc3ljaG9sb2dpc3RcbkNvdW5zZWxsaW5nIFBzeWNob2xvZ2lzdFxuQ2hpbGQgUHN5Y2hvbG9naXN0XG5Gb3JlbnNpYyBQc3ljaG9sb2dpc3Rcbk5ldXJvcHN5Y2hvbG9naXN0XG5IZWFsdGggUHN5Y2hvbG9naXN0XG5SZWhhYmlsaXRhdGlvbiBQc3ljaG9sb2dpc3RcbkFkZGljdGlvbiBDb3Vuc2VsbG9yIC8gUHN5Y2hvbG9naXN0XG5TY2hvb2wgUHN5Y2hvbG9naXN0XG5Qc3ljaGlhdHJpc3RcblBzeWNoaWF0cmljIE51cnNlXG5NZW50YWwgSGVhbHRoIENvdW5zZWxsb3IgLyBUaGVyYXBpc3RcbkJlaGF2aW91cmFsIFRoZXJhcGlzdFxuTWFycmlhZ2UgYW5kIEZhbWlseSBUaGVyYXBpc3QgKE1GVClcbkFydCAvIE11c2ljIFRoZXJhcGlzdFxuUHN5Y2hvbG9naWNhbCBSZXNlYXJjaGVyXG5Qc3ljaG9tZXRyaWNpYW5cbk5ldXJvZGlhZ25vc3RpYyBUZWNobmljaWFuXG5NZW50YWwgSGVhbHRoIFByb2dyYW0gQ29vcmRpbmF0b3JcbkNsaW5pY2FsIFJlc2VhcmNoIENvb3JkaW5hdG9yIFx1MjAxMyBQc3ljaGlhdHJ5L1BzeWNob2xvZ3lcblF1YWxpdHkgQXNzdXJhbmNlIE9mZmljZXIgXHUyMDEzIE1lbnRhbCBIZWFsdGggU2VydmljZXNgKSxcbiAgRGVybWF0b2xvZ3k6IEwoYERlcm1hdG9sb2dpc3RcbkNvc21ldGljIERlcm1hdG9sb2dpc3RcbkRlcm1hdG9wYXRob2xvZ2lzdFxuUGFlZGlhdHJpYyBEZXJtYXRvbG9naXN0XG5UcmljaG9sb2dpc3QgKE1lZGljYWwpXG5BbGxlcmdpc3QgKERlcm1hdG9sb2d5IEZvY3VzKVxuRGVybWF0b2xvZ3kgUmVzaWRlbnQgLyBGZWxsb3dcbkNvbnN1bHRhbnQgRGVybWF0b2xvZ2lzdGApLFxuICBPcGh0aGFsbW9sb2d5OiBMKGBPcGh0aGFsbW9sb2dpc3RcbkdlbmVyYWwgT3BodGhhbG1vbG9naXN0XG5QYWVkaWF0cmljIE9waHRoYWxtb2xvZ2lzdFxuTmV1cm8tT3BodGhhbG1vbG9naXN0XG5SZXRpbmEgU3BlY2lhbGlzdCAvIFZpdHJlb3JldGluYWwgU3VyZ2VvblxuQ29ybmVhIFNwZWNpYWxpc3RcbkdsYXVjb21hIFNwZWNpYWxpc3Rcbk9jdWxvcGxhc3RpYyBTdXJnZW9uXG5SZWZyYWN0aXZlIFN1cmdlb24gLyBMQVNJSyBTcGVjaWFsaXN0XG5PcGh0aGFsbW9sb2d5IFJlc2lkZW50IC8gRmVsbG93XG5Db25zdWx0YW50IE9waHRoYWxtb2xvZ2lzdGApLFxuICAnRU5UIFNwZWNpYWxpc3QnOiBMKGBFTlQgU3BlY2lhbGlzdCAvIE90b2xhcnluZ29sb2dpc3RcbkVOVCBTdXJnZW9uXG5QYWVkaWF0cmljIEVOVCBTcGVjaWFsaXN0XG5PdG9sb2dpc3QgLyBOZXVyb3RvbG9naXN0XG5SaGlub2xvZ2lzdFxuTGFyeW5nb2xvZ2lzdFxuSGVhZCAmIE5lY2sgT25jb2xvZ2ljIFN1cmdlb25cblNrdWxsIEJhc2UgU3VyZ2VvblxuRmFjaWFsIFBsYXN0aWMgJiBSZWNvbnN0cnVjdGl2ZSBTdXJnZW9uXG5FTlQgUmVzaWRlbnQgLyBGZWxsb3dcbkNvbnN1bHRhbnQgRU5UIFN1cmdlb25cbkF1ZGlvbG9naXN0XG5TcGVlY2gtTGFuZ3VhZ2UgUGF0aG9sb2dpc3RcbkhlYXJpbmcgQWlkIFNwZWNpYWxpc3QgLyBGaXR0ZXJcbkVOVCBOdXJzZVxuVmVzdGlidWxhciBUaGVyYXBpc3RcblN3YWxsb3cgVGhlcmFwaXN0IC8gRHlzcGhhZ2lhIFNwZWNpYWxpc3RgKSxcbiAgUmFkaW9sb2d5OiBMKGBSYWRpb2xvZ2lzdFxuRGlhZ25vc3RpYyBSYWRpb2xvZ2lzdFxuSW50ZXJ2ZW50aW9uYWwgUmFkaW9sb2dpc3Rcbk5ldXJvcmFkaW9sb2dpc3Rcbk11c2N1bG9za2VsZXRhbCBSYWRpb2xvZ2lzdFxuUGFlZGlhdHJpYyBSYWRpb2xvZ2lzdFxuQ2FyZGlvdGhvcmFjaWMgUmFkaW9sb2dpc3RcbkJyZWFzdCBJbWFnaW5nIFNwZWNpYWxpc3Rcbk51Y2xlYXIgTWVkaWNpbmUgUGh5c2ljaWFuXG5SYWRpb2xvZ3kgUmVzaWRlbnQgLyBGZWxsb3dcbkNvbnN1bHRhbnQgUmFkaW9sb2dpc3RgKSxcbiAgQW5hZXN0aGVzaW9sb2d5OiBMKGBBbmFlc3RoZXNpb2xvZ2lzdFxuQ2FyZGlhYyBBbmFlc3RoZXNpb2xvZ2lzdFxuTmV1cm8tQW5hZXN0aGVzaW9sb2dpc3RcblBhZWRpYXRyaWMgQW5hZXN0aGVzaW9sb2dpc3RcbkNyaXRpY2FsIENhcmUgQW5hZXN0aGVzaW9sb2dpc3QgLyBJbnRlbnNpdmlzdFxuUGFpbiBNYW5hZ2VtZW50IFNwZWNpYWxpc3Rcbk9ic3RldHJpYyBBbmFlc3RoZXNpb2xvZ2lzdFxuVHJhbnNwbGFudCBBbmFlc3RoZXNpb2xvZ2lzdFxuQ29uc3VsdGFudCBBbmFlc3RoZXNpb2xvZ2lzdFxuUmVzaWRlbnQgLyBGZWxsb3cgaW4gQW5hZXN0aGVzaW9sb2d5YCksXG4gICdFbWVyZ2VuY3kgTWVkaWNpbmUnOiBMKGBFbWVyZ2VuY3kgTWVkaWNpbmUgUGh5c2ljaWFuXG5FbWVyZ2VuY3kgUm9vbSAoRVIpIERvY3RvclxuVHJhdW1hIFN1cmdlb25cbkNyaXRpY2FsIENhcmUgLyBJQ1UgUGh5c2ljaWFuXG5QYWVkaWF0cmljIEVtZXJnZW5jeSBQaHlzaWNpYW5cblRveGljb2xvZ2lzdCAoRW1lcmdlbmN5IEZvY3VzKVxuRGlzYXN0ZXIgTWVkaWNpbmUgU3BlY2lhbGlzdFxuRW1lcmdlbmN5IE1lZGljaW5lIFJlc2lkZW50IC8gRmVsbG93XG5Db25zdWx0YW50IEVtZXJnZW5jeSBQaHlzaWNpYW5gKSxcbiAgUGF0aG9sb2d5OiBMKGBQYXRob2xvZ2lzdFxuQW5hdG9taWNhbCBQYXRob2xvZ2lzdFxuQ2xpbmljYWwgUGF0aG9sb2dpc3RcbkhlbWF0b3BhdGhvbG9naXN0XG5DeXRvcGF0aG9sb2dpc3Rcbk1vbGVjdWxhciBQYXRob2xvZ2lzdFxuRm9yZW5zaWMgUGF0aG9sb2dpc3Rcbk5ldXJvcGF0aG9sb2dpc3RcbkRlcm1hdG9wYXRob2xvZ2lzdFxuUGFlZGlhdHJpYyBQYXRob2xvZ2lzdFxuUGF0aG9sb2d5IFJlc2lkZW50IC8gRmVsbG93XG5Db25zdWx0YW50IFBhdGhvbG9naXN0YCksXG4gIEdlcmlhdHJpY2lhbjogTChgR2VyaWF0cmljaWFuXG5Db25zdWx0YW50IEdlcmlhdHJpY2lhblxuR2VyaWF0cmljIFBzeWNoaWF0cmlzdFxuUGFsbGlhdGl2ZSBDYXJlIEdlcmlhdHJpY2lhblxuR2VyaWF0cmljIENhcmRpb2xvZ2lzdFxuR2VyaWF0cmljIE9uY29sb2dpc3RcbkdlcmlhdHJpYyBFbWVyZ2VuY3kgTWVkaWNpbmUgUGh5c2ljaWFuXG5HZXJpYXRyaWMgUmVoYWJpbGl0YXRpb24gU3BlY2lhbGlzdFxuR2VyaWF0cmljIEZlbGxvdyAvIFJlc2lkZW50YCksXG4gICdJbmZlY3Rpb3VzIERpc2Vhc2VzJzogTChgSW5mZWN0aW91cyBEaXNlYXNlIFNwZWNpYWxpc3QgKElEIFBoeXNpY2lhbilcblRyb3BpY2FsIE1lZGljaW5lIFNwZWNpYWxpc3RcbkhJVi9BSURTIFNwZWNpYWxpc3RcblRyYXZlbCBNZWRpY2luZSBQaHlzaWNpYW5cblBhZWRpYXRyaWMgSW5mZWN0aW91cyBEaXNlYXNlIFNwZWNpYWxpc3Rcbkhvc3BpdGFsIEVwaWRlbWlvbG9naXN0XG5UcmFuc3BsYW50IEluZmVjdGlvdXMgRGlzZWFzZSBTcGVjaWFsaXN0XG5JbmZlY3Rpb3VzIERpc2Vhc2UgQ29uc3VsdGFudFxuSW5mZWN0aW91cyBEaXNlYXNlIEZlbGxvdyAvIFJlc2lkZW50YCksXG4gIEhhZW1hdG9sb2d5OiBMKGBIYWVtYXRvbG9naXN0XG5QYWVkaWF0cmljIEhhZW1hdG9sb2dpc3RcbkhhZW1hdG8tT25jb2xvZ2lzdFxuVHJhbnNmdXNpb24gTWVkaWNpbmUgU3BlY2lhbGlzdFxuQm9uZSBNYXJyb3cgVHJhbnNwbGFudCBQaHlzaWNpYW5cblRocm9tYm9zaXMgYW5kIEhhZW1vc3Rhc2lzIFNwZWNpYWxpc3RcblNpY2tsZSBDZWxsIERpc2Vhc2UgU3BlY2lhbGlzdFxuQ29uc3VsdGFudCBIYWVtYXRvbG9naXN0XG5IYWVtYXRvbG9neSBGZWxsb3cgLyBSZXNpZGVudGApLFxuICAnU3BvcnRzIE1lZGljaW5lJzogTChgU3BvcnRzIE1lZGljaW5lIFBoeXNpY2lhblxuT3J0aG9wYWVkaWMgU3BvcnRzIFN1cmdlb25cblRlYW0gUGh5c2ljaWFuXG5QcmltYXJ5IENhcmUgU3BvcnRzIFBoeXNpY2lhblxuUGh5c2lhdHJpc3QgXHUyMDEzIFNwb3J0cyBSZWhhYmlsaXRhdGlvblxuUGFlZGlhdHJpYyBTcG9ydHMgTWVkaWNpbmUgU3BlY2lhbGlzdFxuRXhlcmNpc2UgTWVkaWNpbmUgU3BlY2lhbGlzdFxuQ29uY3Vzc2lvbiBTcGVjaWFsaXN0IC8gTmV1cm8tU3BvcnRzIFBoeXNpY2lhblxuRmVsbG93IC8gUmVzaWRlbnQgXHUyMDEzIFNwb3J0cyBNZWRpY2luZWApLFxuICAnUGFsbGlhdGl2ZSBDYXJlJzogTChgUGFsbGlhdGl2ZSBDYXJlIFBoeXNpY2lhblxuQ29uc3VsdGFudCBcdTIwMTMgUGFsbGlhdGl2ZSBNZWRpY2luZVxuSG9zcGljZSBQaHlzaWNpYW5cbk9uY29sb2dpc3Qgd2l0aCBQYWxsaWF0aXZlIEZvY3VzXG5HZXJpYXRyaWNpYW4gXHUyMDEzIFBhbGxpYXRpdmUgSW50ZWdyYXRpb25cblBhbGxpYXRpdmUgQ2FyZSBGZWxsb3cgLyBSZXNpZGVudFxuRW1lcmdlbmN5IFBoeXNpY2lhbiBcdTIwMTMgUGFsbGlhdGl2ZSBGb2N1c1xuUHJpbWFyeSBDYXJlIFBoeXNpY2lhbiBcdTIwMTMgUGFsbGlhdGl2ZSBUcmFpbmluZ2ApLFxuICAnT2NjdXBhdGlvbmFsIEhlYWx0aCc6IEwoYE9jY3VwYXRpb25hbCBNZWRpY2luZSBQaHlzaWNpYW4gLyBPY2N1cGF0aW9uYWwgSGVhbHRoIERvY3RvclxuSW5kdXN0cmlhbCBQaHlzaWNpYW5cbkVudmlyb25tZW50YWwgSGVhbHRoIFBoeXNpY2lhblxuQ29ycG9yYXRlIEhlYWx0aCBQaHlzaWNpYW5cbk9jY3VwYXRpb25hbCBIZWFsdGggQ29uc3VsdGFudFxuTWVkaWNhbCBSZXZpZXcgT2ZmaWNlciAoTVJPKVxuT2NjdXBhdGlvbmFsIEhlYWx0aCBSZXNpZGVudCAvIEZlbGxvd2ApLFxuICBIaXN0b3BhdGhvbG9neTogTChgSGlzdG9wYXRob2xvZ2lzdCAvIEFuYXRvbWljIFBhdGhvbG9naXN0XG5EZXJtYXRvcGF0aG9sb2dpc3Rcbk5ldXJvcGF0aG9sb2dpc3RcbkZvcmVuc2ljIFBhdGhvbG9naXN0XG5Nb2xlY3VsYXIgUGF0aG9sb2dpc3Rcbkhpc3RvcGF0aG9sb2d5IENvbnN1bHRhbnRcbkhpc3RvcGF0aG9sb2d5IEZlbGxvdyAvIFJlc2lkZW50YCksXG4gIEN5dG9wYXRob2xvZ3k6IEwoYEN5dG9wYXRob2xvZ2lzdFxuQW5hdG9taWMgUGF0aG9sb2dpc3Qgd2l0aCBDeXRvcGF0aG9sb2d5IEZvY3VzXG5DeXRvcGF0aG9sb2d5IENvbnN1bHRhbnRcbkN5dG9wYXRob2xvZ3kgRmVsbG93IC8gUmVzaWRlbnRgKSxcbiAgJ01vbGVjdWxhciBEaWFnbm9zdGljcyc6IEwoYE1vbGVjdWxhciBQYXRob2xvZ2lzdFxuQ2xpbmljYWwgR2VuZXRpY2lzdFxuTW9sZWN1bGFyIERpYWdub3N0aWMgQ29uc3VsdGFudFxuTW9sZWN1bGFyIERpYWdub3N0aWNzIEZlbGxvdyAvIFJlc2lkZW50YCksXG4gIE1pY3JvYmlvbG9neTogTChgQ2xpbmljYWwgTWljcm9iaW9sb2dpc3RcbkluZmVjdGlvdXMgRGlzZWFzZSBQaHlzaWNpYW5cbk1lZGljYWwgTWljcm9iaW9sb2d5IENvbnN1bHRhbnRcbk1pY3JvYmlvbG9neSBGZWxsb3cgLyBSZXNpZGVudGApLFxuICAnQ2xpbmljYWwgQ2hlbWlzdHJ5JzogTChgQ2xpbmljYWwgQmlvY2hlbWlzdCAvIENoZW1pY2FsIFBhdGhvbG9naXN0XG5DbGluaWNhbCBDaGVtaXN0cnkgQ29uc3VsdGFudFxuQ2xpbmljYWwgQ2hlbWlzdHJ5IEZlbGxvdyAvIFJlc2lkZW50XG5Ub3hpY29sb2dpc3RgKSxcbiAgJ0ZvcmVuc2ljIFBhdGhvbG9neSc6IEwoYEZvcmVuc2ljIFBhdGhvbG9naXN0XG5Gb3JlbnNpYyBNZWRpY2FsIEV4YW1pbmVyXG5Gb3JlbnNpYyBQYXRob2xvZ3kgQ29uc3VsdGFudFxuRm9yZW5zaWMgUGF0aG9sb2d5IEZlbGxvdyAvIFJlc2lkZW50XG5Gb3JlbnNpYyBUb3hpY29sb2dpc3RcbkZvcmVuc2ljIE9kb250b2xvZ2lzdFxuRm9yZW5zaWMgQW50aHJvcG9sb2dpc3RgKSxcbiAgSW1tdW5vcGF0aG9sb2d5OiBMKGBJbW11bm9wYXRob2xvZ2lzdFxuQ2xpbmljYWwgSW1tdW5vbG9naXN0XG5BbGxlcmdpc3QvSW1tdW5vbG9naXN0IChNRC9ETylcbkltbXVub3BhdGhvbG9neSBDb25zdWx0YW50XG5JbW11bm9wYXRob2xvZ3kgRmVsbG93IC8gUmVzaWRlbnRgKSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTnVyc2luZyAmIG1pZHdpZmVyeTogc3BlY2lhbGl6YXRpb24gXHUyMTkyIGpvYiBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5jb25zdCBOVVJTRV9KT0JTID0ge1xuICAnR2VuZXJhbCBQcmFjdGl0aW9uZXIgKEdQKSAvIEZhbWlseSBOdXJzZSc6IEwoYFByaW1hcnkgQ2FyZSBOdXJzZVxuR2VuZXJhbCBQcmFjdGljZSBOdXJzZSAoR1AgTnVyc2UpXG5GYW1pbHkgUHJhY3RpY2UgTnVyc2VcbkNvbW11bml0eSBIZWFsdGggTnVyc2Vcbk91dHBhdGllbnQgTnVyc2VcblRyaWFnZSBOdXJzZSAoUHJpbWFyeSBDYXJlKVxuSGVhbHRoIFByb21vdGlvbiBOdXJzZVxuQ2FyZSBDb29yZGluYXRvciAvIENhc2UgTWFuYWdlciBOdXJzZVxuRmFtaWx5IE51cnNlIFByYWN0aXRpb25lciAoRk5QKVxuUHJpbWFyeSBDYXJlIE51cnNlIFByYWN0aXRpb25lciAoTlApXG5BZHZhbmNlZCBQcmFjdGljZSBSZWdpc3RlcmVkIE51cnNlIChBUFJOKSBcdTIwMTMgRmFtaWx5IE1lZGljaW5lXG5OdXJzZSBQcmVzY3JpYmVyIChVSy9FVS9BTlogcmVnaW9ucylcblByYWN0aWNlIE51cnNlIE1hbmFnZXJcbkNsaW5pY2FsIE51cnNlIEFzc2lzdGFudCAoQ05BKSBcdTIwMTMgR1AgU2V0dGluZ1xuTGljZW5zZWQgUHJhY3RpY2FsIE51cnNlIChMUE4pIC8gRW5yb2xsZWQgTnVyc2UgKEVOKVxuTWVkaWNhbCBBc3Npc3RhbnQgKE51cnNpbmcgQmFja2dyb3VuZClgKSxcbiAgJ0ludGVybmFsIE1lZGljaW5lIE51cnNlJzogTChgSW50ZXJuYWwgTWVkaWNpbmUgU3RhZmYgTnVyc2Vcbk1lZGljYWwtU3VyZ2ljYWwgKE1lZC1TdXJnKSBOdXJzZVxuQ2hyb25pYyBEaXNlYXNlIE51cnNlIFNwZWNpYWxpc3RcblRlbGVtZXRyeSBOdXJzZVxuSW5wYXRpZW50IEludGVybmFsIE1lZGljaW5lIE51cnNlXG5PdXRwYXRpZW50L0ludGVybmFsIE1lZGljaW5lIENsaW5pYyBOdXJzZVxuQ2FzZSBNYW5hZ2VtZW50IE51cnNlIChJbnRlcm5hbCBNZWRpY2luZSlcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEludGVybmFsIE1lZGljaW5lXG5OdXJzZSBFZHVjYXRvciAoSW50ZXJuYWwgTWVkaWNpbmUpXG5BZHVsdCBOdXJzZSBQcmFjdGl0aW9uZXIgKEFOUClcbkFjdXRlIENhcmUgTnVyc2UgUHJhY3RpdGlvbmVyIChBQ05QKVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgQWR1bHQgSGVhbHRoL0ludGVybmFsIE1lZGljaW5lYCksXG4gICdQYWVkaWF0cmljcyAmIE5lb25hdG9sb2d5IE51cnNlJzogTChgUGFlZGlhdHJpYyBTdGFmZiBOdXJzZVxuUGFlZGlhdHJpYyBJbnRlbnNpdmUgQ2FyZSBVbml0IChQSUNVKSBOdXJzZVxuUGFlZGlhdHJpYyBTdXJnZXJ5IE51cnNlXG5TY2hvb2wgTnVyc2VcblBhZWRpYXRyaWMgT3V0cGF0aWVudCBOdXJzZVxuUGFlZGlhdHJpYyBBbGxlcmd5L0ltbXVub2xvZ3kgTnVyc2Vcbk5lb25hdGFsIEludGVuc2l2ZSBDYXJlIFVuaXQgKE5JQ1UpIE51cnNlXG5OZW9uYXRhbCBUcmFuc3BvcnQgTnVyc2Vcbk5lb25hdGFsIE51cnNlIFByYWN0aXRpb25lciAoTk5QKVxuUG9zdG5hdGFsIFdhcmQgTnVyc2VcblBhZWRpYXRyaWMgTnVyc2UgUHJhY3RpdGlvbmVyIChQTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBQYWVkaWF0cmljcy9OZW9uYXRvbG9neVxuUGFlZGlhdHJpYyBEaWFiZXRlcyBOdXJzZSBTcGVjaWFsaXN0XG5QYWVkaWF0cmljIFJlc3BpcmF0b3J5IE51cnNlYCksXG4gICdTdXJnaWNhbCBOdXJzZSc6IEwoYFBlcmlvcGVyYXRpdmUgTnVyc2UgLyBPcGVyYXRpbmcgUm9vbSAoT1IpIE51cnNlXG5TY3J1YiBOdXJzZVxuQ2lyY3VsYXRpbmcgTnVyc2VcblByZW9wZXJhdGl2ZSBOdXJzZVxuUG9zdC1BbmFlc3RoZXNpYSBDYXJlIFVuaXQgKFBBQ1UpIE51cnNlIC8gUmVjb3ZlcnkgUm9vbSBOdXJzZVxuU3VyZ2ljYWwgSUNVIE51cnNlXG5EYXkgU3VyZ2VyeSAvIEFtYnVsYXRvcnkgQ2FyZSBOdXJzZVxuU3BlY2lhbHR5IFN1cmdpY2FsIE51cnNlXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBQZXJpb3BlcmF0aXZlIE51cnNpbmdcbk51cnNlIFByYWN0aXRpb25lciAoTlApIFx1MjAxMyBTdXJnaWNhbFxuU3VyZ2ljYWwgTnVyc2UgRWR1Y2F0b3JgKSxcbiAgJ0NhcmRpb2xvZ3kgTnVyc2UnOiBMKGBDYXJkaWFjIENhcmUgTnVyc2VcbkNvcm9uYXJ5IENhcmUgVW5pdCAoQ0NVKSBOdXJzZVxuVGVsZW1ldHJ5IE51cnNlIChDYXJkaWFjKVxuQ2FyZGlhYyBDYXRoIExhYiBOdXJzZVxuRWxlY3Ryb3BoeXNpb2xvZ3kgTnVyc2VcbkhlYXJ0IEZhaWx1cmUgTnVyc2UgU3BlY2lhbGlzdFxuQ2FyZGlhYyBSZWhhYmlsaXRhdGlvbiBOdXJzZVxuUGFlZGlhdHJpYyBDYXJkaW9sb2d5IE51cnNlXG5DYXJkaWFjIE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBDYXJkaW9sb2d5XG5DYXJkaWFjIE51cnNlIEVkdWNhdG9yYCksXG4gICdQdWxtb25vbG9neSBOdXJzZSc6IEwoYFB1bG1vbmFyeSBOdXJzZVxuUmVzcGlyYXRvcnkgQ2FyZSBOdXJzZVxuQ3JpdGljYWwgQ2FyZS9JQ1UgTnVyc2UgKFB1bG1vbmFyeSlcblNsZWVwIENsaW5pYyBOdXJzZVxuUHVsbW9uYXJ5IEZ1bmN0aW9uIFRlc3QgKFBGVCkgTnVyc2VcbkJyb25jaG9zY29weSBOdXJzZVxuUHVsbW9uYXJ5IFJlaGFiaWxpdGF0aW9uIE51cnNlXG5QdWxtb25hcnkgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIFB1bG1vbm9sb2d5XG5SZXNwaXJhdG9yeSBOdXJzZSBFZHVjYXRvcmApLFxuICAnTmV1cm9sb2d5IE51cnNlJzogTChgTmV1cm9sb2d5IFN0YWZmIE51cnNlXG5OZXVybyBJQ1UgTnVyc2VcbkVwaWxlcHN5IE51cnNlIFNwZWNpYWxpc3RcblN0cm9rZSBOdXJzZSBTcGVjaWFsaXN0XG5NdWx0aXBsZSBTY2xlcm9zaXMgKE1TKSBOdXJzZVxuTmV1cm9zdXJnZXJ5IE51cnNlXG5OZXVybyBSZWhhYmlsaXRhdGlvbiBOdXJzZVxuTmV1cm9sb2d5IE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBOZXVyb2xvZ3lcbk5ldXJvIE51cnNlIEVkdWNhdG9yYCksXG4gICdFbmRvY3Jpbm9sb2d5IE51cnNlJzogTChgRW5kb2NyaW5vbG9neSBOdXJzZVxuRGlhYmV0ZXMgTnVyc2UgU3BlY2lhbGlzdFxuSG9ybW9uZSBSZXBsYWNlbWVudCBUaGVyYXB5IChIUlQpIE51cnNlXG5PdXRwYXRpZW50IEVuZG9jcmlub2xvZ3kgTnVyc2VcbklucGF0aWVudCBFbmRvY3Jpbm9sb2d5IE51cnNlXG5FbmRvY3JpbmUgT25jb2xvZ3kgTnVyc2VcbkVuZG9jcmlub2xvZ3kgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEVuZG9jcmlub2xvZ3lcbkRpYWJldGVzIEVkdWNhdG9yIE51cnNlYCksXG4gICdHYXN0cm9lbnRlcm9sb2d5IE51cnNlJzogTChgR2FzdHJvZW50ZXJvbG9neSBOdXJzZVxuRW5kb3Njb3B5IE51cnNlXG5IZXBhdG9sb2d5IE51cnNlXG5JbmZsYW1tYXRvcnkgQm93ZWwgRGlzZWFzZSAoSUJEKSBOdXJzZSBTcGVjaWFsaXN0XG5HYXN0cm9pbnRlc3RpbmFsIE9uY29sb2d5IE51cnNlXG5PdXRwYXRpZW50IEdhc3Ryb2VudGVyb2xvZ3kgTnVyc2Vcbkdhc3Ryb2VudGVyb2xvZ3kgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEdhc3Ryb2VudGVyb2xvZ3lcbkVuZG9zY29weSBOdXJzZSBFZHVjYXRvcmApLFxuICAnT25jb2xvZ3kgTnVyc2UnOiBMKGBPbmNvbG9neSBTdGFmZiBOdXJzZVxuQ2hlbW90aGVyYXB5IE51cnNlXG5SYWRpYXRpb24gT25jb2xvZ3kgTnVyc2VcbkJvbmUgTWFycm93IFRyYW5zcGxhbnQgKEJNVCkgTnVyc2VcblBhZWRpYXRyaWMgT25jb2xvZ3kgTnVyc2Vcbk9uY29sb2d5IENsaW5pY2FsIFRyaWFscyBOdXJzZVxuSG9zcGljZSBhbmQgUGFsbGlhdGl2ZSBDYXJlIE51cnNlXG5PbmNvbG9neSBOdXJzZSBQcmFjdGl0aW9uZXIgKE5QKVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgT25jb2xvZ3lcbk9uY29sb2d5IE51cnNlIEVkdWNhdG9yYCksXG4gICdOZXBocm9sb2d5IE51cnNlJzogTChgTmVwaHJvbG9neSBOdXJzZVxuRGlhbHlzaXMgTnVyc2UgKFJlbmFsIE51cnNlKVxuSG9tZSBEaWFseXNpcyBOdXJzZVxuVHJhbnNwbGFudCBOdXJzZSBcdTIwMTMgTmVwaHJvbG9neVxuQ0tEIE51cnNlIEVkdWNhdG9yXG5QYWVkaWF0cmljIE5lcGhyb2xvZ3kgTnVyc2Vcbk5lcGhyb2xvZ3kgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIE5lcGhyb2xvZ3lcblJlbmFsIE51cnNlIEVkdWNhdG9yYCksXG4gICdPcnRob3BhZWRpYyBOdXJzaW5nJzogTChgT3J0aG9wYWVkaWMgU3RhZmYgTnVyc2Vcbk9ydGhvcGFlZGljIFN1cmdpY2FsIE51cnNlXG5PcnRob3BhZWRpYyBUcmF1bWEgTnVyc2Vcbk9ydGhvcGFlZGljIFJlaGFiaWxpdGF0aW9uIE51cnNlXG5QYWVkaWF0cmljIE9ydGhvcGFlZGljIE51cnNlXG5TcGluZSBOdXJzZVxuQ2FzdGluZy9GcmFjdHVyZSBDbGluaWMgTnVyc2Vcbk9ydGhvcGFlZGljIE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBPcnRob3BhZWRpY3Ncbk9ydGhvcGFlZGljIE51cnNlIEVkdWNhdG9yYCksXG4gICdSaGV1bWF0b2xvZ3kgTnVyc2UnOiBMKGBSaGV1bWF0b2xvZ3kgTnVyc2VcbkF1dG9pbW11bmUgRGlzZWFzZSBOdXJzZVxuSW5mdXNpb24gTnVyc2UgXHUyMDEzIFJoZXVtYXRvbG9neVxuTHVwdXMgTnVyc2UgU3BlY2lhbGlzdFxuQXJ0aHJpdGlzIE51cnNlIEVkdWNhdG9yXG5QYWVkaWF0cmljIFJoZXVtYXRvbG9neSBOdXJzZVxuUmhldW1hdG9sb2d5IE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBSaGV1bWF0b2xvZ3lcbkJpb2xvZ2ljIFRoZXJhcHkgTnVyc2UgU3BlY2lhbGlzdGApLFxuICAnUHN5Y2hvbG9neSAmIE1lbnRhbCBIZWFsdGggTnVyc2UnOiBMKGBNZW50YWwgSGVhbHRoIE51cnNlIChQc3ljaGlhdHJpYyBOdXJzZSlcbkNvbW11bml0eSBNZW50YWwgSGVhbHRoIE51cnNlXG5DaGlsZCBhbmQgQWRvbGVzY2VudCBNZW50YWwgSGVhbHRoIE51cnNlXG5Gb3JlbnNpYyBNZW50YWwgSGVhbHRoIE51cnNlXG5BZGRpY3Rpb24gTnVyc2UgU3BlY2lhbGlzdFxuUHN5Y2hpYXRyaWMgSW50ZW5zaXZlIENhcmUgTnVyc2VcbkNyaXNpcyBJbnRlcnZlbnRpb24gTnVyc2VcblBzeWNoaWF0cmljIExpYWlzb24gTnVyc2Vcbk1lbnRhbCBIZWFsdGggTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIE1lbnRhbCBIZWFsdGhcblBzeWNoaWF0cmljIE51cnNlIEVkdWNhdG9yYCksXG4gICdEZXJtYXRvbG9neSBOdXJzZSc6IEwoYERlcm1hdG9sb2d5IE51cnNlXG5Xb3VuZCBDYXJlIE51cnNlXG5EZXJtYXRvbG9neSBOdXJzZSBQcmFjdGl0aW9uZXIgKE5QKVxuQ29zbWV0aWMgRGVybWF0b2xvZ3kgTnVyc2VcblBob3RvdGhlcmFweSBOdXJzZVxuU2tpbiBDYW5jZXIgTnVyc2UgU3BlY2lhbGlzdFxuUGFlZGlhdHJpYyBEZXJtYXRvbG9neSBOdXJzZVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgRGVybWF0b2xvZ3lcbkRlcm1hdG9sb2d5IE51cnNlIEVkdWNhdG9yYCksXG4gICdPcGh0aGFsbW9sb2d5IE51cnNlJzogTChgT3BodGhhbG1vbG9neSBOdXJzZVxuRXllIFN1cmdlcnkgTnVyc2VcbkdsYXVjb21hIE51cnNlIFNwZWNpYWxpc3RcblJldGluYSBOdXJzZSBTcGVjaWFsaXN0XG5Mb3cgVmlzaW9uIE51cnNlXG5QYWVkaWF0cmljIE9waHRoYWxtb2xvZ3kgTnVyc2Vcbk9waHRoYWxtaWMgRGlhZ25vc3RpYyBOdXJzZVxuT3BodGhhbG1vbG9neSBOdXJzZSBQcmFjdGl0aW9uZXIgKE5QKVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgT3BodGhhbG1vbG9neVxuT3BodGhhbG1vbG9neSBOdXJzZSBFZHVjYXRvcmApLFxuICAnRU5UIFNwZWNpYWxpc3QgTnVyc2UnOiBMKGBFTlQgTnVyc2VcbkF1ZGlvbG9neSBOdXJzZVxuSGVhZCBhbmQgTmVjayBTdXJnZXJ5IE51cnNlXG5FTlQgT3V0cGF0aWVudCBOdXJzZVxuU2xlZXAgQXBub2VhIE51cnNlIFNwZWNpYWxpc3RcblBhZWRpYXRyaWMgRU5UIE51cnNlXG5UaW5uaXR1cyBOdXJzZSBTcGVjaWFsaXN0XG5FTlQgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEVOVFxuRU5UIE51cnNlIEVkdWNhdG9yYCksXG4gICdSYWRpb2xvZ3kgTnVyc2UnOiBMKGBSYWRpb2xvZ3kgTnVyc2VcbkludGVydmVudGlvbmFsIFJhZGlvbG9neSBOdXJzZVxuUmFkaW9sb2d5IFByb2NlZHVyZSBOdXJzZVxuTnVjbGVhciBNZWRpY2luZSBOdXJzZVxuTVJJIE51cnNlIFNwZWNpYWxpc3RcblJhZGlvbG9neSBOdXJzZSBFZHVjYXRvclxuUmFkaW9sb2d5IE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBSYWRpb2xvZ3lgKSxcbiAgJ0FuYWVzdGhlc2lvbG9neSBOdXJzZSc6IEwoYEFuYWVzdGhlc2lhIE51cnNlIChQZXJpb3BlcmF0aXZlIE51cnNlKVxuUG9zdC1BbmFlc3RoZXNpYSBDYXJlIFVuaXQgKFBBQ1UpIE51cnNlXG5Dcml0aWNhbCBDYXJlIE51cnNlICh3aXRoIGFuYWVzdGhlc2lhIGZvY3VzKVxuUmVnaW9uYWwgQW5hZXN0aGVzaWEgTnVyc2VcblNlZGF0aW9uIE51cnNlXG5BbmFlc3RoZXNpYSBOdXJzZSBFZHVjYXRvclxuTnVyc2UgQW5hZXN0aGV0aXN0IChDUk5BIFx1MjAxMyBDZXJ0aWZpZWQgUmVnaXN0ZXJlZCBOdXJzZSBBbmFlc3RoZXRpc3QpXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBBbmFlc3RoZXNpYWApLFxuICAnRW1lcmdlbmN5IE1lZGljaW5lIE51cnNlJzogTChgRW1lcmdlbmN5IE51cnNlXG5UcmF1bWEgTnVyc2VcblRyaWFnZSBOdXJzZVxuUGFlZGlhdHJpYyBFbWVyZ2VuY3kgTnVyc2VcbkNyaXRpY2FsIENhcmUgVHJhbnNwb3J0IE51cnNlXG5FbWVyZ2VuY3kgTnVyc2UgUHJhY3RpdGlvbmVyIChFTlApXG5EaXNhc3Rlci9FbWVyZ2VuY3kgUHJlcGFyZWRuZXNzIE51cnNlXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBFbWVyZ2VuY3lgKSxcbiAgJ1BhdGhvbG9neSBOdXJzZSc6IEwoYFBhdGhvbG9neSBOdXJzZVxuUGhsZWJvdG9teSBOdXJzZVxuSGlzdG9sb2d5L0hpc3RvcGF0aG9sb2d5IE51cnNlXG5Nb2xlY3VsYXIgRGlhZ25vc3RpY3MgTnVyc2VcblNwZWNpbWVuIFRyYW5zcG9ydCBOdXJzZVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgUGF0aG9sb2d5XG5QYXRob2xvZ3kgTnVyc2UgRWR1Y2F0b3JgKSxcbiAgJ0dlcmlhdHJpY2lhbiBOdXJzZSc6IEwoYEdlcmlhdHJpYyBOdXJzZVxuRWxkZXIgQ2FyZSBOdXJzZVxuRGVtZW50aWEgQ2FyZSBOdXJzZVxuUGFsbGlhdGl2ZSBDYXJlIE51cnNlIChHZXJpYXRyaWNzKVxuUmVoYWJpbGl0YXRpb24gTnVyc2UgKEdlcmlhdHJpY3MpXG5HZXJpYXRyaWMgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEdlcmlhdHJpY3NcbkdlcmlhdHJpYyBOdXJzZSBFZHVjYXRvcmApLFxuICAnSW5mZWN0aW91cyBEaXNlYXNlcyBOdXJzZSc6IEwoYEluZmVjdGlvdXMgRGlzZWFzZXMgTnVyc2VcbkluZmVjdGlvbiBDb250cm9sIE51cnNlXG5ISVYvQUlEUyBOdXJzZSBTcGVjaWFsaXN0XG5UdWJlcmN1bG9zaXMgKFRCKSBOdXJzZVxuVHJhdmVsIEhlYWx0aCBOdXJzZVxuUHVibGljIEhlYWx0aCBOdXJzZSAoSW5mZWN0aW91cyBEaXNlYXNlcylcbkluZmVjdGlvdXMgRGlzZWFzZXMgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIEluZmVjdGlvdXMgRGlzZWFzZXNcbkluZmVjdGlvdXMgRGlzZWFzZXMgTnVyc2UgRWR1Y2F0b3JgKSxcbiAgJ1Nwb3J0cyBNZWRpY2luZSBOdXJzZSc6IEwoYFNwb3J0cyBNZWRpY2luZSBOdXJzZVxuQXRobGV0aWMgVHJhaW5lciBOdXJzZVxuUmVoYWJpbGl0YXRpb24gTnVyc2UgKFNwb3J0cyBNZWRpY2luZSlcbk9ydGhvcGFlZGljIFNwb3J0cyBOdXJzZVxuRXhlcmNpc2UgUGh5c2lvbG9naXN0IE51cnNlXG5Db25jdXNzaW9uIE51cnNlIFNwZWNpYWxpc3RcblNwb3J0cyBOdXRyaXRpb24gTnVyc2VcblNwb3J0cyBNZWRpY2luZSBOdXJzZSBQcmFjdGl0aW9uZXIgKE5QKVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCAoQ05TKSBcdTIwMTMgU3BvcnRzIE1lZGljaW5lYCksXG4gICdQYWxsaWF0aXZlIENhcmUgTnVyc2UnOiBMKGBQYWxsaWF0aXZlIENhcmUgTnVyc2Vcbkhvc3BpY2UgTnVyc2VcblBhaW4gTWFuYWdlbWVudCBOdXJzZVxuUGFlZGlhdHJpYyBQYWxsaWF0aXZlIENhcmUgTnVyc2VcbkhvbWUgQ2FyZSBQYWxsaWF0aXZlIE51cnNlXG5CZXJlYXZlbWVudCBOdXJzZSBTcGVjaWFsaXN0XG5QYWxsaWF0aXZlIENhcmUgTnVyc2UgUHJhY3RpdGlvbmVyIChOUClcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgKENOUykgXHUyMDEzIFBhbGxpYXRpdmUgQ2FyZVxuUGFsbGlhdGl2ZSBDYXJlIE51cnNlIEVkdWNhdG9yYCksXG4gICdPY2N1cGF0aW9uYWwgSGVhbHRoIE51cnNlJzogTChgT2NjdXBhdGlvbmFsIEhlYWx0aCBOdXJzZVxuV29ya3BsYWNlIFNhZmV0eSBOdXJzZVxuSW5kdXN0cmlhbCBIZWFsdGggTnVyc2VcbkNhc2UgTWFuYWdlbWVudCBOdXJzZSAoT2NjdXBhdGlvbmFsIEhlYWx0aClcbkVtcGxveWVlIFdlbGxuZXNzIE51cnNlXG5Fcmdvbm9taWNzIE51cnNlIFNwZWNpYWxpc3RcbkVudmlyb25tZW50YWwgSGVhbHRoIE51cnNlXG5PY2N1cGF0aW9uYWwgSGVhbHRoIE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBPY2N1cGF0aW9uYWwgSGVhbHRoXG5PY2N1cGF0aW9uYWwgSGVhbHRoIE51cnNlIEVkdWNhdG9yYCksXG4gICdIaXN0b3BhdGhvbG9neSBOdXJzZSc6IEwoYEhpc3RvcGF0aG9sb2d5IE51cnNlXG5IaXN0b2xvZ3kgTnVyc2VcbkFuYXRvbWljYWwgUGF0aG9sb2d5IE51cnNlXG5UaXNzdWUgQmFuayBOdXJzZVxuUGF0aG9sb2d5IE51cnNlIFNwZWNpYWxpc3RcblN1cmdpY2FsIFRpc3N1ZSBSZWNvdmVyeSBOdXJzZVxuQmlvbWVkaWNhbCBTY2llbmNlIFN1cHBvcnQgTnVyc2UgKEhpc3RvbG9neSBGb2N1cylcbkFkdmFuY2VkIE51cnNlIFByYWN0aXRpb25lciAoSGlzdG9wYXRob2xvZ3kpXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IFx1MjAxMyBQYXRob2xvZ3kgU2VydmljZXNcblJlc2VhcmNoIE51cnNlIFx1MjAxMyBIaXN0b3BhdGhvbG9neVxuUXVhbGl0eSBDb250cm9sIE51cnNlIFx1MjAxMyBIaXN0b2xvZ3kgTGFiXG5TZW5pb3IgUGF0aG9sb2d5IE51cnNlIENvb3JkaW5hdG9yXG5Db25zdWx0YW50IE51cnNlIFx1MjAxMyBDZWxsdWxhciBQYXRob2xvZ3lcbk1vbGVjdWxhciBQYXRob2xvZ3kgTnVyc2UgU3BlY2lhbGlzdFxuT3BlcmF0aW5nIFJvb20gTnVyc2UgKEhpc3RvcGF0aG9sb2d5IFNwZWNpbWVuIEhhbmRsaW5nKVxuT25jb2xvZ3kgTnVyc2UgKHdpdGggSGlzdG9wYXRob2xvZ3kgTGlhaXNvbiBEdXRpZXMpXG5Qb3N0LU1vcnRlbSBOdXJzZSAoUE1FL0F1dG9wc3kgU3VpdGUgTnVyc2UpXG5UaXNzdWUgUHJvY3VyZW1lbnQgTnVyc2VcbkludHJhb3BlcmF0aXZlIEZyb3plbiBTZWN0aW9uIE51cnNlYCksXG4gICdIYWVtYXRvbG9neSBOdXJzZSc6IEwoYEhhZW1hdG9sb2d5IE51cnNlXG5Db2FndWxhdGlvbiBOdXJzZSBTcGVjaWFsaXN0XG5MZXVrYWVtaWEgTnVyc2UgU3BlY2lhbGlzdFxuSGFlbWF0b2xvZ3kgRGF5IENhcmUgTnVyc2VcbkhhZW1hdG9sb2d5IE51cnNlIFByYWN0aXRpb25lciAoTlApXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IChDTlMpIFx1MjAxMyBIYWVtYXRvbG9neVxuSGFlbWF0b2xvZ3kgTnVyc2UgRWR1Y2F0b3JcbkhhZW1hdG9sb2d5IFN0YWZmIE51cnNlXG5SZWdpc3RlcmVkIE51cnNlIFx1MjAxMyBIYWVtYXRvbG9neSBVbml0XG5IYWVtYXRvbG9neSBDbGluaWMgTnVyc2VcbklucGF0aWVudCBIYWVtYXRvbG9neSBOdXJzZVxuT3V0cGF0aWVudCBIYWVtYXRvbG9neSBOdXJzZVxuSGFlbWF0b2xvZ3kgTnVyc2UgU3BlY2lhbGlzdFxuQWR2YW5jZWQgTnVyc2UgUHJhY3RpdGlvbmVyIFx1MjAxMyBIYWVtYXRvbG9neVxuTnVyc2UgQ29uc3VsdGFudCBcdTIwMTMgSGFlbWF0b2xvZ3lcbkJvbmUgTWFycm93IFRyYW5zcGxhbnQgTnVyc2VcblNpY2tsZSBDZWxsIE51cnNlIFNwZWNpYWxpc3RcbkhhZW1vcGhpbGlhIE51cnNlIFNwZWNpYWxpc3RcbkFwaGVyZXNpcyBOdXJzZVxuU3RlbSBDZWxsIFRyYW5zcGxhbnQgQ29vcmRpbmF0b3IgTnVyc2VcblJlc2VhcmNoIE51cnNlIFx1MjAxMyBIYWVtYXRvbG9neS9PbmNvbG9neVxuQ2xpbmljYWwgVHJpYWxzIE51cnNlIFx1MjAxMyBIYWVtYXRvbG9neVxuUGFsbGlhdGl2ZSBDYXJlIE51cnNlIFx1MjAxMyBIYWVtYXRvbG9neSBQYXRpZW50c1xuQmxvb2QgRGlzb3JkZXIgQ2FzZSBNYW5hZ2VyIE51cnNlXG5PbmNvbG9neSBIYWVtYXRvbG9neSBOdXJzZVxuTWVkaWNhbCBPbmNvbG9neSBhbmQgSGFlbWF0b2xvZ3kgTnVyc2VcblBhZWRpYXRyaWMgSGFlbWF0b2xvZ3kgTnVyc2VcbkluZnVzaW9uIE51cnNlIFx1MjAxMyBIYWVtYXRvbG9neVxuVHJhbnNmdXNpb24gTnVyc2VgKSxcbiAgJ0N5dG9wYXRob2xvZ3kgTnVyc2UnOiBMKGBDeXRvcGF0aG9sb2d5IE51cnNlXG5DeXRvbG9neSBOdXJzZVxuUGF0aG9sb2d5IE51cnNlIFx1MjAxMyBDeXRvbG9neVxuQ3l0b3BhdGhvbG9neSBTdXBwb3J0IE51cnNlXG5TcGVjaW1lbiBDb2xsZWN0aW9uIE51cnNlIFx1MjAxMyBDeXRvbG9neVxuUGFwIFNtZWFyIE51cnNlXG5GaW5lIE5lZWRsZSBBc3BpcmF0aW9uIChGTkEpIE51cnNlXG5FVVMtRk5BIFByb2NlZHVyZSBOdXJzZSAoRW5kb3Njb3BpYyBVbHRyYXNvdW5kLUd1aWRlZCBGaW5lIE5lZWRsZSBBc3BpcmF0aW9uKVxuQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdCBcdTIwMTMgQ3l0b3BhdGhvbG9neVxuQ3l0b3BhdGhvbG9neSBQcm9jZWR1cmUgQ29vcmRpbmF0b3IgTnVyc2VcbkFkdmFuY2VkIE51cnNlIFByYWN0aXRpb25lciBcdTIwMTMgQ3l0b3BhdGhvbG9neVxuRk5BIENsaW5pYyBOdXJzZSBDb29yZGluYXRvclxuQ2VydmljYWwgU2NyZWVuaW5nIE51cnNlIFNwZWNpYWxpc3RcbkxpcXVpZC1CYXNlZCBDeXRvbG9neSBOdXJzZVxuUmFwaWQgT24tU2l0ZSBFdmFsdWF0aW9uIChST1NFKSBOdXJzZSBBc3Npc3RhbnRcbk9uY29sb2d5IE51cnNlIHdpdGggQ3l0b3BhdGhvbG9neSBEdXRpZXNcbkRpYWdub3N0aWMgTnVyc2UgXHUyMDEzIEN5dG9sb2d5XG5Db2xwb3Njb3B5IENsaW5pYyBOdXJzZVxuV29tZW5cdTIwMTlzIEhlYWx0aCBOdXJzZSBcdTIwMTMgQ3l0b2xvZ3kgRm9jdXNcbkVuZG9zY29weSBOdXJzZSBcdTIwMTMgQ3l0b2xvZ3kgU3BlY2ltZW4gSGFuZGxpbmdcblJlc2VhcmNoIE51cnNlIFx1MjAxMyBDeXRvcGF0aG9sb2d5XG5OdXJzZSBFZHVjYXRvciBcdTIwMTMgQ3l0b2xvZ3kvU2NyZWVuaW5nXG5DbGluaWNhbCBUcmlhbHMgTnVyc2UgXHUyMDEzIEN5dG9sb2d5IERpYWdub3N0aWNzYCksXG4gICdNb2xlY3VsYXIgRGlhZ25vc3RpY3MgTnVyc2UnOiBMKGBNb2xlY3VsYXIgRGlhZ25vc3RpY3MgTnVyc2Vcbkdlbm9taWNzIE51cnNlXG5QcmVjaXNpb24gTWVkaWNpbmUgTnVyc2VcbkdlbmV0aWMgVGVzdGluZyBOdXJzZVxuR2Vub21pYyBTY3JlZW5pbmcgTnVyc2Vcbk1vbGVjdWxhciBPbmNvbG9neSBOdXJzZVxuQmlvbWFya2VyIFRlc3RpbmcgTnVyc2Vcbk1vbGVjdWxhciBQYXRob2xvZ3kgTnVyc2VcbkNsaW5pY2FsIE51cnNlIFNwZWNpYWxpc3QgXHUyMDEzIE1vbGVjdWxhciBEaWFnbm9zdGljc1xuQWR2YW5jZWQgTnVyc2UgUHJhY3RpdGlvbmVyIFx1MjAxMyBHZW5vbWljIE1lZGljaW5lXG5HZW5ldGljIE51cnNlIENvdW5zZWxsb3IgKGluIHNvbWUgY291bnRyaWVzLCByZXF1aXJlcyBhZGRpdGlvbmFsIGxpY2Vuc3VyZSlcbk1vbGVjdWxhciBUZXN0aW5nIENvb3JkaW5hdG9yIE51cnNlXG5DYW5jZXIgR2Vub21pY3MgTnVyc2UgU3BlY2lhbGlzdFxuTmV4dC1HZW5lcmF0aW9uIFNlcXVlbmNpbmcgKE5HUykgTnVyc2UgQWR2aXNvclxuUGhhcm1hY29nZW5vbWljcyBOdXJzZSBTcGVjaWFsaXN0XG5DbGluaWNhbCBSZXNlYXJjaCBOdXJzZSBcdTIwMTMgTW9sZWN1bGFyIFN0dWRpZXNcbk1vbGVjdWxhciBDbGluaWNhbCBUcmlhbHMgTnVyc2VcbkxhYiBMaWFpc29uIE51cnNlIFx1MjAxMyBNb2xlY3VsYXIgVGVzdGluZ1xuQmlvaW5mb3JtYXRpY3MgTnVyc2UgTGlhaXNvblxuTW9sZWN1bGFyIERhdGEgSW50ZXJwcmV0YXRpb24gTnVyc2UgQXNzaXN0YW50YCksXG4gICdNaWNyb2Jpb2xvZ3kgTnVyc2UnOiBMKGBNaWNyb2Jpb2xvZ3kgTnVyc2VcbkluZmVjdGlvbiBQcmV2ZW50aW9uIE51cnNlXG5DbGluaWNhbCBOdXJzZSBcdTIwMTMgTWljcm9iaW9sb2d5IFVuaXRcbklzb2xhdGlvbiBXYXJkIE51cnNlXG5BbnRpbWljcm9iaWFsIFN0ZXdhcmRzaGlwIE51cnNlXG5PdXRicmVhayBSZXNwb25zZSBOdXJzZVxuUGF0aG9sb2d5IE51cnNlIFx1MjAxMyBNaWNyb2Jpb2xvZ3lcbk1pY3JvYmlvbG9neSBTcGVjaW1lbiBDb2xsZWN0aW9uIE51cnNlXG5DbGluaWNhbCBMYWJvcmF0b3J5IExpYWlzb24gTnVyc2VcblNwZWNpbWVuIFRyYW5zcG9ydCAmIEhhbmRsaW5nIE51cnNlIChNaWNyb2Jpb2xvZ3kgRm9jdXMpXG5MYWIgU3VwcG9ydCBOdXJzZSBcdTIwMTMgTWljcm9iaWFsIFRlc3RpbmdcblB1YmxpYyBIZWFsdGggTnVyc2UgXHUyMDEzIEluZmVjdGlvdXMgRGlzZWFzZSBTdXJ2ZWlsbGFuY2VcbkRpc2Vhc2UgU3VydmVpbGxhbmNlIE51cnNlXG5FcGlkZW1pb2xvZ3kgTnVyc2VcbkZpZWxkIEluZmVjdGlvbiBDb250cm9sIE51cnNlXG5Db21tdW5pdHkgSGVhbHRoIE51cnNlIFx1MjAxMyBJbmZlY3Rpb3VzIERpc2Vhc2UgRm9jdXNcbkNsaW5pY2FsIFJlc2VhcmNoIE51cnNlIFx1MjAxMyBNaWNyb2Jpb2xvZ3kvSW5mZWN0aW91cyBEaXNlYXNlc1xuTWljcm9iaWFsIEdlbm9taWNzIE51cnNlIFNwZWNpYWxpc3RcblZhY2NpbmUgUmVzZWFyY2ggTnVyc2VcbkJpb3NlY3VyaXR5IE51cnNlXG5BbnRpYmlvdGljIFJlc2lzdGFuY2UgTnVyc2UgQWR2b2NhdGVcbklDVSBOdXJzZSAoSW5mZWN0aW9uIE1hbmFnZW1lbnQgRm9jdXMpXG5PcGVyYXRpbmcgUm9vbSBOdXJzZSAoQXNlcHRpYyBUZWNobmlxdWUgJiBJbmZlY3Rpb24gQ29udHJvbClcblRyYW5zcGxhbnQgTnVyc2UgKEluZmVjdGlvbiBSaXNrIE1vbml0b3JpbmcpXG5QYWVkaWF0cmljIEluZmVjdGlvdXMgRGlzZWFzZSBOdXJzZVxuVEIgQ29udHJvbCBQcm9ncmFtIE51cnNlXG5ISVYvQUlEUyBOdXJzZVxuQ09WSUQtMTkgUmVzcG9uc2UgTnVyc2VgKSxcbiAgJ0NsaW5pY2FsIENoZW1pc3RyeSBOdXJzZSc6IEwoYENsaW5pY2FsIENoZW1pc3RyeSBOdXJzZVxuQ2xpbmljYWwgTGFib3JhdG9yeSBOdXJzZVxuU3BlY2ltZW4gQ29sbGVjdGlvbiBOdXJzZVxuRGlhZ25vc3RpYyBTZXJ2aWNlcyBOdXJzZVxuTGFiIExpYWlzb24gTnVyc2VcbkNsaW5pY2FsIE51cnNlIFx1MjAxMyBCaW9jaGVtaXN0cnkgRGVwYXJ0bWVudFxuUHJlLUFuYWx5dGljYWwgU2VydmljZXMgTnVyc2Vcbk91dHBhdGllbnQgTGFib3JhdG9yeSBOdXJzZVxuUG9pbnQtb2YtQ2FyZSBUZXN0aW5nIChQT0NUKSBOdXJzZVxuTWV0YWJvbGljIFNjcmVlbmluZyBOdXJzZVxuRWxlY3Ryb2x5dGUgTW9uaXRvcmluZyBOdXJzZVxuVGhlcmFwZXV0aWMgRHJ1ZyBNb25pdG9yaW5nIChURE0pIE51cnNlXG5DbGluaWNhbCBOdXJzZSBTcGVjaWFsaXN0IFx1MjAxMyBMYWJvcmF0b3J5IE1lZGljaW5lXG5CaW9jaGVtaXN0cnkgTnVyc2UgQ29uc3VsdGFudFxuRW5kb2NyaW5vbG9neSBOdXJzZSAoQmlvY2hlbWlzdHJ5IExpbmspXG5Ub3hpY29sb2d5IE51cnNlXG5DYXJkaWFjIEJpb21hcmtlciBOdXJzZVxuUmVuYWwgRnVuY3Rpb24gTW9uaXRvcmluZyBOdXJzZVxuTWV0YWJvbGljIERpc29yZGVyIE51cnNlIFNwZWNpYWxpc3RcbkNsaW5pY2FsIFJlc2VhcmNoIE51cnNlIFx1MjAxMyBCaW9jaGVtaXN0cnkgRm9jdXNcbkxhYiBEYXRhIFF1YWxpdHkgQXNzdXJhbmNlIE51cnNlXG5NZWRpY2FsIExhYm9yYXRvcnkgTGlhaXNvbiBOdXJzZVxuUHVibGljIEhlYWx0aCBOdXJzZSBcdTIwMTMgU2NyZWVuaW5nIFByb2dyYW1zXG5DbGluaWNhbCBUcmlhbHMgTnVyc2UgXHUyMDEzIExhYiBEaWFnbm9zdGljc2ApLFxuICAnRm9yZW5zaWMgUGF0aG9sb2d5IE51cnNlJzogTChgRm9yZW5zaWMgTnVyc2VcbkZvcmVuc2ljIFBhdGhvbG9neSBOdXJzZVxuRm9yZW5zaWMgTnVyc2UgRXhhbWluZXIgKEZORSlcblNleHVhbCBBc3NhdWx0IE51cnNlIEV4YW1pbmVyIChTQU5FKVxuRm9yZW5zaWMgQ2xpbmljYWwgTnVyc2UgU3BlY2lhbGlzdFxuTnVyc2UgRGVhdGggSW52ZXN0aWdhdG9yXG5NZWRpY28tTGVnYWwgTnVyc2UgQ29uc3VsdGFudFxuRm9yZW5zaWMgQXV0b3BzeSBOdXJzZVxuVHJhdW1hL0VSIEZvcmVuc2ljIE51cnNlXG5Gb3JlbnNpYyBOdXJzZSBJbnZlc3RpZ2F0b3Jcbk51cnNlIENvcm9uZXIgQXNzaXN0YW50XG5NZWRpY29sZWdhbCBEZWF0aCBJbnZlc3RpZ2F0b3IgKHdpdGggbnVyc2luZyBiYWNrZ3JvdW5kKVxuQ3JpbWUgU2NlbmUgTnVyc2UgQ29uc3VsdGFudFxuTnVyc2UgRm9yZW5zaWMgQ2FzZSBNYW5hZ2VyXG5Gb3JlbnNpYyBFdmlkZW5jZSBDb2xsZWN0aW9uIE51cnNlXG5Gb3JlbnNpYyBOdXJzaW5nIEVkdWNhdG9yXG5DbGluaWNhbCBJbnN0cnVjdG9yIGluIEZvcmVuc2ljIE51cnNpbmdcbkZvcmVuc2ljIFJlc2VhcmNoIE51cnNlXG5BY2FkZW1pYyBMZWN0dXJlciBpbiBGb3JlbnNpYyBQYXRob2xvZ3kgTnVyc2luZ1xuUHJvZ3JhbSBDb29yZGluYXRvciBcdTIwMTMgRm9yZW5zaWMgTnVyc2luZ1xuRm9yZW5zaWMgTnVyc2luZyBQcm9ncmFtIERpcmVjdG9yXG5DaGllZiBGb3JlbnNpYyBOdXJzZSBFeGFtaW5lclxuRm9yZW5zaWMgTnVyc2luZyBDb29yZGluYXRvciAoSG9zcGl0YWwvQ29tbXVuaXR5KVxuU3VwZXJ2aXNvciBcdTIwMTMgRm9yZW5zaWMgTnVyc2UgU2VydmljZXNcbkRpcmVjdG9yIG9mIEZvcmVuc2ljICYgTWVkaWNvLUxlZ2FsIFNlcnZpY2VzYCksXG4gICdJbW11bm9wYXRob2xvZ3kgTnVyc2UnOiBMKGBJbW11bm9wYXRob2xvZ3kgTnVyc2VcbkNsaW5pY2FsIEltbXVub2xvZ3kgTnVyc2VcbkF1dG9pbW11bmUgRGlzb3JkZXJzIE51cnNlIFNwZWNpYWxpc3RcblRyYW5zcGxhbnQgSW1tdW5vbG9neSBOdXJzZSAoZm9jdXMgb24gZ3JhZnQgcmVqZWN0aW9uLCBpbW11bm9zdXBwcmVzc2lvbilcbkFsbGVyZ3kgJiBJbW11bm9sb2d5IE51cnNlXG5SaGV1bWF0b2xvZ3kvSW1tdW5vbG9neSBOdXJzZSBTcGVjaWFsaXN0XG5PbmNvbG9neSBJbW11bm90aGVyYXB5IE51cnNlIChjaGVja3BvaW50IGluaGliaXRvcnMsIENBUi1ULCBldGMuKVxuSW5mZWN0aW91cyBEaXNlYXNlICYgSW1tdW5vbG9neSBOdXJzZVxuSW1tdW5vcGF0aG9sb2d5IExhYiBOdXJzZSAobGlhaXNvbiBiZXR3ZWVuIHBhdGllbnRzIGFuZCBsYWIgdGVhbXMpXG5DbGluaWNhbCBUcmlhbHMgTnVyc2UgXHUyMDEzIEltbXVub3BhdGhvbG9neVxuTnVyc2UgQ29vcmRpbmF0b3IgXHUyMDEzIEltbXVub2xvZ3kgRGlhZ25vc3RpY3NcbkltbXVub2xvZ3kgUmVzZWFyY2ggTnVyc2Vcbk51cnNlIFNjaWVudGlzdCBcdTIwMTMgSW1tdW5vcGF0aG9sb2d5XG5JbW11bm9sb2d5IE51cnNpbmcgRWR1Y2F0b3JcblJlc2VhcmNoIE51cnNlIGluIEltbXVub3BhdGhvbG9neS9JbW11bm90aGVyYXB5XG5DbGluaWNhbCBJbnN0cnVjdG9yIFx1MjAxMyBJbW11bm9sb2d5L1BhdGhvbG9neSBOdXJzaW5nXG5Qcm9ncmFtIENvb3JkaW5hdG9yIFx1MjAxMyBJbW11bm9wYXRob2xvZ3kgTnVyc2luZ1xuSW1tdW5vbG9neS9QYXRob2xvZ3kgTnVyc2UgTWFuYWdlclxuRGlyZWN0b3Igb2YgQ2xpbmljYWwgSW1tdW5vbG9neSBOdXJzaW5nXG5BZHZhbmNlZCBQcmFjdGljZSBOdXJzZSAoQVBOKSBcdTIwMTMgSW1tdW5vcGF0aG9sb2d5YCksXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIFBoYXJtYWN5OiBrZXkgYXJlYSBcdTIxOTIgc3BlY2lhbGl6YXRpb24gKyBqb2IgbGV2ZWwgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgUEhBUk1BQ1lfQVJFQVMgPSB7XG4gICdDbGluaWNhbCAmIFBhdGllbnQtQ2VudHJlZCBTcGVjaWFsaXphdGlvbnMnOiB7XG4gICAgc3BlY3M6IEwoYENsaW5pY2FsIFBoYXJtYWN5XG5DYXJkaW9sb2d5IFBoYXJtYWN5XG5PbmNvbG9neSBQaGFybWFjeVxuSW5mZWN0aW91cyBEaXNlYXNlcyBQaGFybWFjeVxuQ3JpdGljYWwgQ2FyZSBQaGFybWFjeVxuR2VyaWF0cmljIFBoYXJtYWN5XG5QYWVkaWF0cmljIFBoYXJtYWN5XG5Qc3ljaGlhdHJpYyBQaGFybWFjeVxuQW1idWxhdG9yeSBDYXJlIFBoYXJtYWN5XG5FbWVyZ2VuY3kgTWVkaWNpbmUgUGhhcm1hY3lcbk5lcGhyb2xvZ3kgUGhhcm1hY3lcbkludGVybmFsIE1lZGljaW5lIFBoYXJtYWN5XG5QYWluIE1hbmFnZW1lbnQgYW5kIFBhbGxpYXRpdmUgQ2FyZSBQaGFybWFjeWApLFxuICAgIGpvYnM6IEwoYENsaW5pY2FsIFBoYXJtYWNpc3RcbkNsaW5pY2FsIFBoYXJtYWN5IFNwZWNpYWxpc3RcbkNsaW5pY2FsIFN0YWZmIFBoYXJtYWNpc3RcbkNsaW5pY2FsIFBoYXJtYWNpc3QgUHJhY3RpdGlvbmVyIChDUFApXG5DbGluaWNhbCBQaGFybWFjeSBDb25zdWx0YW50XG5TZW5pb3IgQ2xpbmljYWwgUGhhcm1hY2lzdFxuQWR2YW5jZWQgQ2xpbmljYWwgUGhhcm1hY2lzdFxuTGVhZCBDbGluaWNhbCBQaGFybWFjaXN0XG5DYXJkaW9sb2d5IENsaW5pY2FsIFBoYXJtYWNpc3Rcbk9uY29sb2d5IENsaW5pY2FsIFBoYXJtYWNpc3RcbkluZmVjdGlvdXMgRGlzZWFzZSBDbGluaWNhbCBQaGFybWFjaXN0XG5Dcml0aWNhbCBDYXJlIENsaW5pY2FsIFBoYXJtYWNpc3RcbkdlcmlhdHJpYyBDbGluaWNhbCBQaGFybWFjaXN0XG5QYWVkaWF0cmljIENsaW5pY2FsIFBoYXJtYWNpc3RcblBzeWNoaWF0cmljIENsaW5pY2FsIFBoYXJtYWNpc3RcbkVtZXJnZW5jeSBNZWRpY2luZSBDbGluaWNhbCBQaGFybWFjaXN0XG5OZXBocm9sb2d5IENsaW5pY2FsIFBoYXJtYWNpc3RcbkFudGljb2FndWxhdGlvbiBDbGluaWNhbCBQaGFybWFjaXN0XG5FbmRvY3Jpbm9sb2d5IENsaW5pY2FsIFBoYXJtYWNpc3RcbkhJVi9BSURTIENsaW5pY2FsIFBoYXJtYWNpc3RcblRyYW5zcGxhbnQgQ2xpbmljYWwgUGhhcm1hY2lzdFxuSGFlbWF0b2xvZ3kgQ2xpbmljYWwgUGhhcm1hY2lzdFxuUGFpbiBNYW5hZ2VtZW50IENsaW5pY2FsIFBoYXJtYWNpc3RcblBhbGxpYXRpdmUgQ2FyZSBDbGluaWNhbCBQaGFybWFjaXN0YCksXG4gIH0sXG4gICdMYWJvcmF0b3J5ICYgRGlhZ25vc3RpYyBTcGVjaWFsaXphdGlvbnMnOiB7XG4gICAgc3BlY3M6IEwoYFBoYXJtYWNvZ2Vub21pY3MgYW5kIFByZWNpc2lvbiBNZWRpY2luZVxuUGhhcm1hY29raW5ldGljcyBhbmQgUGhhcm1hY29keW5hbWljc1xuTnVjbGVhciBQaGFybWFjeVxuQ29tcG91bmRpbmcgUGhhcm1hY3lcbkNsaW5pY2FsIFRveGljb2xvZ3lcblRoZXJhcGV1dGljIERydWcgTW9uaXRvcmluZyAoVERNKWApLFxuICAgIGpvYnM6IEwoYFBhdGhvbG9naXN0XG5DbGluaWNhbCBQYXRob2xvZ2lzdFxuQW5hdG9taWNhbCBQYXRob2xvZ2lzdFxuTGFib3JhdG9yeSBEaXJlY3RvclxuTGFib3JhdG9yeSBNYW5hZ2VyXG5MYWJvcmF0b3J5IFN1cGVydmlzb3Jcbk1lZGljYWwgTGFib3JhdG9yeSBTY2llbnRpc3Rcbk1lZGljYWwgTGFib3JhdG9yeSBUZWNobm9sb2dpc3Rcbk1lZGljYWwgVGVjaG5vbG9naXN0XG5DbGluaWNhbCBMYWJvcmF0b3J5IFNjaWVudGlzdFxuTGFib3JhdG9yeSBUZWNobmljaWFuXG5MYWJvcmF0b3J5IEFzc2lzdGFudFxuQmlvbWVkaWNhbCBTY2llbnRpc3Rcbk1pY3JvYmlvbG9naXN0XG5DbGluaWNhbCBNaWNyb2Jpb2xvZ2lzdFxuTW9sZWN1bGFyIEJpb2xvZ2lzdFxuTW9sZWN1bGFyIERpYWdub3N0aWNzIFNwZWNpYWxpc3RcbkdlbmV0aWNpc3RcbkdlbmV0aWMgQ291bnNlbG9yXG5DeXRvdGVjaG5vbG9naXN0XG5IaXN0b3RlY2hub2xvZ2lzdFxuSGVtYXRvbG9naXN0XG5CbG9vZCBCYW5rIFRlY2hub2xvZ2lzdFxuVHJhbnNmdXNpb24gU3BlY2lhbGlzdFxuSW1tdW5vbG9naXN0XG5DbGluaWNhbCBDaGVtaXN0XG5CaW9jaGVtaXN0XG5DbGluaWNhbCBCaW9jaGVtaXN0XG5QaGxlYm90b21pc3RcblF1YWxpdHkgTWFuYWdlclxuUXVhbGl0eSBBc3N1cmFuY2UgTWFuYWdlclxuTGFib3JhdG9yeSBPcGVyYXRpb25zIE1hbmFnZXJcbkxhYm9yYXRvcnkgQWRtaW5pc3RyYXRvclxuTGFib3JhdG9yeSBJVCBNYW5hZ2VyXG5MSVMgQWRtaW5pc3RyYXRvclxuRGlhZ25vc3RpYyBQcm9kdWN0IE1hbmFnZXJcbkxhYm9yYXRvcnkgUHJvY3VyZW1lbnQgTWFuYWdlclxuRGlhZ25vc3RpYyBTYWxlcyBNYW5hZ2VyXG5CdXNpbmVzcyBEZXZlbG9wbWVudCBNYW5hZ2VyYCksXG4gIH0sXG4gIC8vIEFEREVEIFx1MjAxNCB0aGUgc291cmNlIGRvY3VtZW50IGxpc3RzIHRoaXMga2V5IGFyZWEgd2l0aG91dCBzcGVjaWFsaXphdGlvbnMgb3Igam9iIGxldmVscy5cbiAgJ0hvc3BpdGFsICYgSW5zdGl0dXRpb25hbCBQaGFybWFjeSBTcGVjaWFsdGllcyc6IHtcbiAgICBzcGVjczogTChgSG9zcGl0YWwgKElucGF0aWVudCkgUGhhcm1hY3lcblN0ZXJpbGUgQ29tcG91bmRpbmcgLyBJViBBZG1peHR1cmVcbk9uY29sb2d5IEluZnVzaW9uIFBoYXJtYWN5XG5NZWRpY2F0aW9uIFNhZmV0eVxuQW50aW1pY3JvYmlhbCBTdGV3YXJkc2hpcFxuTG9uZy1UZXJtIENhcmUgLyBOdXJzaW5nIEhvbWUgUGhhcm1hY3lcbkNvcnJlY3Rpb25hbCAmIEluc3RpdHV0aW9uYWwgUGhhcm1hY3lgKSxcbiAgICBqb2JzOiBMKGBIb3NwaXRhbCBQaGFybWFjaXN0XG5JbnBhdGllbnQgU3RhZmYgUGhhcm1hY2lzdFxuSVYgLyBTdGVyaWxlIENvbXBvdW5kaW5nIFBoYXJtYWNpc3Rcbk9uY29sb2d5IEluZnVzaW9uIFBoYXJtYWNpc3Rcbk1lZGljYXRpb24gU2FmZXR5IFBoYXJtYWNpc3RcbkFudGltaWNyb2JpYWwgU3Rld2FyZHNoaXAgUGhhcm1hY2lzdFxuTmlnaHQgLyBPdmVybmlnaHQgSG9zcGl0YWwgUGhhcm1hY2lzdFxuQ2xpbmljYWwgQ29vcmRpbmF0b3IgXHUyMDEzIEhvc3BpdGFsIFBoYXJtYWN5XG5Ib3NwaXRhbCBQaGFybWFjeSBTdXBlcnZpc29yXG5Mb25nLVRlcm0gQ2FyZSBQaGFybWFjaXN0XG5JbnN0aXR1dGlvbmFsIFBoYXJtYWNpc3Rcbkhvc3BpdGFsIFBoYXJtYWN5IFRlY2huaWNpYW5gKSxcbiAgfSxcbiAgJ1Jlc2VhcmNoLCBJbmR1c3RyeSwgYW5kIERldmVsb3BtZW50Jzoge1xuICAgIHNwZWNzOiBMKGBQaGFybWFjZXV0aWNhbCBSZXNlYXJjaCBhbmQgRGV2ZWxvcG1lbnRcblJlZ3VsYXRvcnkgQWZmYWlycyBQaGFybWFjeVxuUGhhcm1hY292aWdpbGFuY2VcbkNsaW5pY2FsIFRyaWFscyBQaGFybWFjaXN0XG5NZWRpY2FsIFNjaWVuY2UgTGlhaXNvbiAoTVNMKVxuRHJ1ZyBJbmZvcm1hdGlvbiBTcGVjaWFsaXN0XG5Gb3JtdWxhdGlvbiBTY2llbnRpc3RcbkJpb3BoYXJtYWNldXRpY2FscyAmIEJpb3RlY2hub2xvZ3kgUGhhcm1hY3lcblBoYXJtYWNldXRpY2FsIE1hbnVmYWN0dXJpbmcgUGhhcm1hY2lzdGApLFxuICAgIGpvYnM6IEwoYFBoYXJtYWNldXRpY2FsIFNjaWVudGlzdFxuUmVzZWFyY2ggUGhhcm1hY2lzdFxuQ2xpbmljYWwgUmVzZWFyY2ggUGhhcm1hY2lzdFxuRHJ1ZyBEZXZlbG9wbWVudCBTY2llbnRpc3RcbkZvcm11bGF0aW9uIFNjaWVudGlzdFxuTWVkaWNpbmFsIENoZW1pc3RcblBoYXJtYWNvbG9naXN0XG5Ub3hpY29sb2dpc3RcblBoYXJtYWNldXRpY2FsIFJlc2VhcmNoIEFzc29jaWF0ZVxuQmlvcGhhcm1hY2V1dGljYWwgU2NpZW50aXN0XG5QaGFybWFjZXV0aWNhbCBNaWNyb2Jpb2xvZ2lzdFxuUGhhcm1hY29raW5ldGljcyBTY2llbnRpc3RcbkJpb2FuYWx5dGljYWwgU2NpZW50aXN0XG5QaGFybWFjb2dlbm9taWNzIFNjaWVudGlzdFxuQ2xpbmljYWwgVHJpYWxzIFBoYXJtYWNpc3RcbkNsaW5pY2FsIFJlc2VhcmNoIENvb3JkaW5hdG9yXG5SZWd1bGF0b3J5IEFmZmFpcnMgU3BlY2lhbGlzdFxuUmVndWxhdG9yeSBBZmZhaXJzIE1hbmFnZXJcblF1YWxpdHkgQXNzdXJhbmNlIChRQSkgU3BlY2lhbGlzdFxuUXVhbGl0eSBDb250cm9sIChRQykgQW5hbHlzdFxuUGhhcm1hY292aWdpbGFuY2UgU3BlY2lhbGlzdFxuRHJ1ZyBTYWZldHkgT2ZmaWNlclxuTWVkaWNhbCBTY2llbmNlIExpYWlzb24gKE1TTClcbkNsaW5pY2FsIERhdGEgTWFuYWdlclxuQmlvc3RhdGlzdGljaWFuXG5QaGFybWFjZXV0aWNhbCBNYW51ZmFjdHVyaW5nIFBoYXJtYWNpc3RcblByb2Nlc3MgRGV2ZWxvcG1lbnQgU2NpZW50aXN0XG5Qcm9kdWN0aW9uIFN1cGVydmlzb3IgXHUyMDEzIFBoYXJtYWNldXRpY2FsIE1hbnVmYWN0dXJpbmdcblZhbGlkYXRpb24gU3BlY2lhbGlzdFxuUXVhbGl0eSBDb250cm9sIFBoYXJtYWNpc3RcblN0ZXJpbGUgUHJvZHVjdHMgTWFudWZhY3R1cmluZyBTcGVjaWFsaXN0XG5NZWRpY2FsIEFmZmFpcnMgUGhhcm1hY2lzdFxuUGhhcm1hY2V1dGljYWwgU2FsZXMgU3BlY2lhbGlzdFxuUGhhcm1hY2V1dGljYWwgTWFya2V0aW5nIE1hbmFnZXJcbkhlYWx0aCBFY29ub21pY3MgYW5kIE91dGNvbWVzIFJlc2VhcmNoIChIRU9SKSBTcGVjaWFsaXN0XG5QaGFybWFjeSBCdXNpbmVzcyBEZXZlbG9wbWVudCBNYW5hZ2VyXG5QaGFybWFjZXV0aWNhbCBQb2xpY3kgQW5hbHlzdGApLFxuICB9LFxuICAnUmV0YWlsICYgQ29tbXVuaXR5IFBoYXJtYWN5IFNwZWNpYWxpemF0aW9ucyc6IHtcbiAgICBzcGVjczogTChgQ29tbXVuaXR5IFBoYXJtYWN5XG5SZXRhaWwgUGhhcm1hY3kgTWFuYWdlbWVudFxuTWVkaWNhdGlvbiBUaGVyYXB5IE1hbmFnZW1lbnQgKE1UTSlcblRyYXZlbCBIZWFsdGggUGhhcm1hY2lzdFxuSW1tdW5pemF0aW9uIFBoYXJtYWNpc3RcbldlbGxuZXNzICYgTGlmZXN0eWxlIFBoYXJtYWNpc3RgKSxcbiAgICBqb2JzOiBMKGBDb21tdW5pdHkgUGhhcm1hY2lzdFxuUmV0YWlsIFBoYXJtYWNpc3RcbkRpc3BlbnNpbmcgUGhhcm1hY2lzdFxuU3RhZmYgUGhhcm1hY2lzdFxuTGljZW5zZWQgUGhhcm1hY2lzdFxuUmVnaXN0ZXJlZCBQaGFybWFjaXN0IChSUGgpXG5TdXBlcnZpc2luZyBQaGFybWFjaXN0XG5SZWxpZWYgUGhhcm1hY2lzdFxuUGhhcm1hY3kgSW50ZXJuXG5QaGFybWFjaXN0IGluIENoYXJnZSAoUElDKVxuTWVkaWNhdGlvbiBUaGVyYXB5IE1hbmFnZW1lbnQgKE1UTSkgUGhhcm1hY2lzdFxuSW1tdW5pemF0aW9uIFBoYXJtYWNpc3RcbkNvbnN1bHRpbmcgUGhhcm1hY2lzdFxuVHJhdmVsIEhlYWx0aCBQaGFybWFjaXN0XG5XZWxsbmVzcyBQaGFybWFjaXN0XG5DaHJvbmljIERpc2Vhc2UgTWFuYWdlbWVudCBQaGFybWFjaXN0XG5Qb2ludC1vZi1DYXJlIFRlc3RpbmcgKFBPQ1QpIFBoYXJtYWNpc3RcblJldGFpbCBQaGFybWFjeSBTdXBlcnZpc29yXG5EaXN0cmljdCBQaGFybWFjeSBNYW5hZ2VyXG5QaGFybWFjeSBEaXJlY3RvciBcdTIwMTMgUmV0YWlsIENoYWluXG5QaGFybWFjeSBGcmFuY2hpc2UgT3duZXJcbkluZGVwZW5kZW50IFBoYXJtYWN5IE93bmVyXG5QaGFybWFjeSBUZWNobmljaWFuXG5TZW5pb3IgUGhhcm1hY3kgVGVjaG5pY2lhblxuQ2VydGlmaWVkIFBoYXJtYWN5IFRlY2huaWNpYW4gKENQaFQpXG5QaGFybWFjeSBBc3Npc3RhbnRcblBoYXJtYWN5IENsZXJrXG5QaGFybWFjeSBBaWRlXG5QaGFybWFjeSBDYXNoaWVyXG5JbnZlbnRvcnkgQ29udHJvbCBQaGFybWFjaXN0XG5Db250cm9sbGVkIFN1YnN0YW5jZXMgUGhhcm1hY2lzdFxuQ29tcGxpYW5jZSBQaGFybWFjaXN0IFx1MjAxMyBSZXRhaWwgU2V0dGluZ1xuUGhhcm1hY3kgQnV5ZXIgLyBQcm9jdXJlbWVudCBTcGVjaWFsaXN0XG5TdXBwbHkgQ2hhaW4gUGhhcm1hY2lzdCBcdTIwMTMgQ29tbXVuaXR5IFBoYXJtYWN5XG5UZWxlIFBoYXJtYWN5IFBoYXJtYWNpc3RcbmUtUHJlc2NyaXB0aW9uIFByb2Nlc3NpbmcgUGhhcm1hY2lzdFxuRGlnaXRhbCBIZWFsdGggUGhhcm1hY2lzdCAoUmV0YWlsIFBsYXRmb3JtKVxuVmlydHVhbCBNVE0gUGhhcm1hY2lzdFxuTW9iaWxlIENsaW5pYyBQaGFybWFjaXN0YCksXG4gIH0sXG4gICdBZG1pbmlzdHJhdGl2ZSwgRWR1Y2F0aW9uYWwgJiBMZWdhbCBGaWVsZHMnOiB7XG4gICAgc3BlY3M6IEwoYFBoYXJtYWN5IEFkbWluaXN0cmF0aW9uXG5IZWFsdGggSW5mb3JtYXRpY3MgUGhhcm1hY2lzdFxuTWFuYWdlZCBDYXJlIFBoYXJtYWN5XG5QaGFybWFjb2Vjb25vbWljc1xuQWNhZGVtaWMvVGVhY2hpbmcgUGhhcm1hY3lcblBoYXJtYWN5IExhdyBhbmQgRXRoaWNzXG5QdWJsaWMgSGVhbHRoIFBoYXJtYWN5XG5Qb2xpY3kgYW5kIEFkdm9jYWN5IFBoYXJtYWNpc3Rcbk1pbGl0YXJ5IFBoYXJtYWN5YCksXG4gICAgam9iczogTChgUGhhcm1hY3kgRWR1Y2F0b3JcbkNsaW5pY2FsIFBoYXJtYWN5IEVkdWNhdG9yXG5BY2FkZW1pYyBQaGFybWFjaXN0XG5Qcm9mZXNzb3Igb2YgUGhhcm1hY3lcbkFzc2lzdGFudCBQcm9mZXNzb3IgXHUyMDEzIFBoYXJtYWN5IFByYWN0aWNlXG5Bc3NvY2lhdGUgUHJvZmVzc29yIFx1MjAxMyBQaGFybWFjZXV0aWNhbCBTY2llbmNlc1xuTGVjdHVyZXIgXHUyMDEzIFBoYXJtYWNvbG9neSAvIFBoYXJtYWN5XG5BZGp1bmN0IEZhY3VsdHkgXHUyMDEzIFBoYXJtYWN5XG5QaGFybWFjeSBSZXNpZGVuY3kgUHJvZ3JhbSBEaXJlY3RvclxuUHJlY2VwdG9yIFx1MjAxMyBQaGFybWFjeSBTdHVkZW50cy9JbnRlcm5zXG5Db250aW51aW5nIEVkdWNhdGlvbiAoQ0UpIFByb2dyYW0gQ29vcmRpbmF0b3JcblBoYXJtYWN5IEN1cnJpY3VsdW0gRGV2ZWxvcGVyXG5QaGFybWFjeSBTa2lsbHMgTGFiIENvb3JkaW5hdG9yXG5TaW11bGF0aW9uIExhYiBJbnN0cnVjdG9yIChQaGFybWFjeSlcbkdyYWR1YXRlIFByb2dyYW0gQ29vcmRpbmF0b3IgXHUyMDEzIFBoYXJtYWN5XG5SZWd1bGF0b3J5IEFmZmFpcnMgUGhhcm1hY2lzdFxuQ29tcGxpYW5jZSBQaGFybWFjaXN0XG5QaGFybWFjeSBJbnNwZWN0b3IgLyBDb21wbGlhbmNlIE9mZmljZXJcblBoYXJtYWN5IExhdyBhbmQgRXRoaWNzIEluc3RydWN0b3JcbkRydWcgRW5mb3JjZW1lbnQgT2ZmaWNlciAoUGhhcm1hY3kgQmFja2dyb3VuZClcbkxpY2Vuc2luZyBhbmQgQWNjcmVkaXRhdGlvbiBPZmZpY2VyIFx1MjAxMyBQaGFybWFjeSBCb2FyZFxuUG9saWN5IEFkdmlzb3IgXHUyMDEzIFBoYXJtYWN5IFByYWN0aWNlXG5QaGFybWFjeSBMYXcgQ29uc3VsdGFudFxuTGVnYWwgYW5kIFJlZ3VsYXRvcnkgUG9saWN5IEFuYWx5c3QgKFBoYXJtYWNldXRpY2FsIFNlY3Rvcilcbk1lZGljaW5lcyBMZWdpc2xhdGlvbiBBZHZpc29yXG5QaGFybWFjZXV0aWNhbCBDb21wbGlhbmNlIE1hbmFnZXJcbkNsaW5pY2FsIEdvdmVybmFuY2UgUGhhcm1hY2lzdFxuR29vZCBNYW51ZmFjdHVyaW5nIFByYWN0aWNlIChHTVApIENvbXBsaWFuY2UgUGhhcm1hY2lzdFxuUGhhcm1hY292aWdpbGFuY2UgQ29tcGxpYW5jZSBTcGVjaWFsaXN0XG5IZWFsdGggQXV0aG9yaXR5IExpYWlzb24gUGhhcm1hY2lzdFxuUGhhcm1hY3kgUG9saWN5IEFuYWx5c3RcbkhlYWx0aCBQb2xpY3kgUGhhcm1hY2lzdFxuUGhhcm1hY2V1dGljYWwgQWZmYWlycyBPZmZpY2VyXG5QdWJsaWMgSGVhbHRoIFBoYXJtYWNpc3QgXHUyMDEzIFBvbGljeSBEaXZpc2lvblxuQWR2b2NhY3kgTWFuYWdlciBcdTIwMTMgUGhhcm1hY3kgQXNzb2NpYXRpb25cblBoYXJtYWN5IFByYWN0aWNlIFN0YW5kYXJkcyBPZmZpY2VyXG5EcnVnIFBvbGljeSBDb29yZGluYXRvclxuTGVnaXNsYXRpdmUgTGlhaXNvbiBcdTIwMTMgUGhhcm1hY3lcblByb2Zlc3Npb25hbCBBZmZhaXJzIFBoYXJtYWNpc3RgKSxcbiAgfSxcbiAgJ0dsb2JhbCBIZWFsdGggYW5kIE5pY2hlIFNlcnZpY2VzJzoge1xuICAgIHNwZWNzOiBMKGBWZXRlcmluYXJ5IFBoYXJtYWN5XG5TcGFjZS9SZW1vdGUgTG9jYXRpb24gUGhhcm1hY3lcbkhvbWUgSGVhbHRoY2FyZSBQaGFybWFjeVxuVGVsZSBQaGFybWFjeVxuRGlzYXN0ZXIgUmVsaWVmIG9yIEh1bWFuaXRhcmlhbiBQaGFybWFjaXN0XG5BbHRlcm5hdGl2ZSBhbmQgSW50ZWdyYXRpdmUgTWVkaWNpbmUgUGhhcm1hY3lgKSxcbiAgICBqb2JzOiBMKGBHbG9iYWwgSGVhbHRoIFBoYXJtYWNpc3RcbkludGVybmF0aW9uYWwgUHVibGljIEhlYWx0aCBQaGFybWFjaXN0XG5Fc3NlbnRpYWwgTWVkaWNpbmVzIFBoYXJtYWNpc3Rcbkh1bWFuaXRhcmlhbiBBaWQgUGhhcm1hY2lzdFxuTkdPIFBoYXJtYWNpc3QgKE5vbi1Hb3Zlcm5tZW50YWwgT3JnYW5pemF0aW9uKVxuRmllbGQgUGhhcm1hY2lzdCBcdTIwMTMgSW50ZXJuYXRpb25hbCBSZWxpZWYgTWlzc2lvbnNcbkdsb2JhbCBBY2Nlc3MgUHJvZ3JhbSBNYW5hZ2VyIChQaGFybWFjeSlcblBoYXJtYWNldXRpY2FsIFN1cHBseSBDaGFpbiBQaGFybWFjaXN0IChHbG9iYWwgSGVhbHRoKVxuTWVkaWNpbmVzIFdpdGhvdXQgQm9yZGVycyBQaGFybWFjaXN0IChlLmcuIE1TRilcbkdsb2JhbCBSZWd1bGF0b3J5IEFmZmFpcnMgU3BlY2lhbGlzdCAoUGhhcm1hIFNlY3RvcilcbkluZmVjdGlvdXMgRGlzZWFzZSBQaGFybWFjaXN0IFx1MjAxMyBHbG9iYWwgUHJvZ3JhbXNcbkhlYWx0aCBTeXN0ZW1zIFN0cmVuZ3RoZW5pbmcgUGhhcm1hY2lzdCAoR2xvYmFsIEhlYWx0aClcbkdsb2JhbCBIZWFsdGggUG9saWN5IEFkdmlzb3IgXHUyMDEzIFBoYXJtYWN5IFNlY3RvclxuRGlzYXN0ZXIgUmVsaWVmIFBoYXJtYWNpc3RcbkVtZXJnZW5jeSBSZXNwb25zZSBQaGFybWFjaXN0IChlLmcuIHBhbmRlbWljLCByZWZ1Z2VlIGNhbXBzKVxuTW9iaWxlIFBoYXJtYWN5IFNlcnZpY2VzIENvb3JkaW5hdG9yXG5SZW1vdGUgQXJlYSBQaGFybWFjaXN0XG5UZWxlIFBoYXJtYWN5IFNlcnZpY2VzIFBoYXJtYWNpc3QgKFJ1cmFsL0dsb2JhbClcbk1pbGl0YXJ5IFBoYXJtYWNpc3QgLyBDb21iYXQgTWVkaWMgUGhhcm1hY2lzdFxuSHVtYW5pdGFyaWFuIExvZ2lzdGljcyBQaGFybWFjaXN0XG5WZXRlcmluYXJ5IFBoYXJtYWNpc3RcbkFuaW1hbCBIZWFsdGggUHJvZHVjdCBTcGVjaWFsaXN0XG5MaXZlc3RvY2sgTWVkaWNpbmVzIFBoYXJtYWNpc3QgKEFncmljdWx0dXJhbCBTdXBwb3J0KVxuU3BhY2UgUGhhcm1hY2lzdCAvIEFlcm9zcGFjZSBQaGFybWFjaXN0XG5FeHBlZGl0aW9uYXJ5IFBoYXJtYWNpc3QgKGUuZy4gQW50YXJjdGljYSwgbWFyaW5lIHJlc2VhcmNoIG1pc3Npb25zKVxuT2Zmc2hvcmUgUGhhcm1hY2lzdCAoT2lsIHJpZ3MsIHNoaXBzKVxuQ29ycmVjdGlvbmFsIEZhY2lsaXR5IFBoYXJtYWNpc3Rcbk9jY3VwYXRpb25hbCBIZWFsdGggUGhhcm1hY2lzdCAoUmVtb3RlIEluZHVzdHJpZXMpXG5JbnRlZ3JhdGl2ZSBNZWRpY2luZSBQaGFybWFjaXN0XG5GdW5jdGlvbmFsIE1lZGljaW5lIFBoYXJtYWNpc3Rcbk51dHJhY2V1dGljYWxzIFNwZWNpYWxpc3QgUGhhcm1hY2lzdFxuV2VsbG5lc3MgYW5kIExpZmVzdHlsZSBNZWRpY2luZSBQaGFybWFjaXN0XG5IZXJiYWwgTWVkaWNpbmUgQ29uc3VsdGFudCAoUGhhcm1hY3kgQmFja2dyb3VuZClcbkNhbm5hYmlzIFBoYXJtYWNpc3QgLyBNZWRpY2FsIE1hcmlqdWFuYSBEaXNwZW5zYXJ5IFBoYXJtYWNpc3RcbkhvbWVvcGF0aGljIFBoYXJtYWNpc3QgKFJlZ2lvbi1zcGVjaWZpYylcblJhcmUgRGlzZWFzZXMgUGhhcm1hY2lzdFxuT3JwaGFuIERydWcgQWNjZXNzIFBoYXJtYWNpc3RcblBhbGxpYXRpdmUgQ2FyZSBQaGFybWFjaXN0IChDb21tdW5pdHkgb3IgR2xvYmFsIFNldHRpbmdzKVxuUHJpc29uL0NvcnJlY3Rpb25hbCBIZWFsdGggUGhhcm1hY2lzdFxuVHJhbnNnZW5kZXIgSGVhbHRoIFBoYXJtYWNpc3RcblNleHVhbCAmIFJlcHJvZHVjdGl2ZSBIZWFsdGggUGhhcm1hY2lzdFxuVHJhdmVsIE1lZGljaW5lIFBoYXJtYWNpc3RcbkNsaW5pY2FsIEV0aG5vcGhhcm1hY29sb2dpc3RcbkZhaXRoLUJhc2VkIEhlYWx0aCBNaXNzaW9ucyBQaGFybWFjaXN0YCksXG4gIH0sXG4gICdMZWFkZXJzaGlwICYgQWRtaW5pc3RyYXRpb24nOiB7XG4gICAgc3BlY3M6IEwoYEV4ZWN1dGl2ZSAmIFNlbmlvciBMZWFkZXJzaGlwIFJvbGVzXG5NaWQtTGV2ZWwgTGVhZGVyc2hpcCAmIE1hbmFnZW1lbnRcblByb2dyYW0gJiBTZXJ2aWNlIExpbmUgTGVhZGVyc2hpcFxuQWRtaW5pc3RyYXRpdmUgJiBTdHJhdGVnaWNcbkxlYWRlcnNoaXAgaW4gUHVibGljIEhlYWx0aCwgUG9saWN5ICYgRWR1Y2F0aW9uYCksXG4gICAgam9iczogTChgQ2hpZWYgUGhhcm1hY3kgT2ZmaWNlciAoQ1BPKVxuRGlyZWN0b3Igb2YgUGhhcm1hY3kgU2VydmljZXNcblZpY2UgUHJlc2lkZW50IG9mIFBoYXJtYWN5IE9wZXJhdGlvbnNcbkV4ZWN1dGl2ZSBEaXJlY3RvciBcdTIwMTMgUGhhcm1hY2V1dGljYWwgU2VydmljZXNcblNlbmlvciBEaXJlY3RvciBcdTIwMTMgQ2xpbmljYWwgUGhhcm1hY3kgUHJvZ3JhbXNcblBoYXJtYWN5IFNlcnZpY2UgTGluZSBBZG1pbmlzdHJhdG9yXG5QaGFybWFjeSBNYW5hZ2VyXG5QaGFybWFjeSBPcGVyYXRpb25zIE1hbmFnZXJcbkNsaW5pY2FsIFBoYXJtYWN5IE1hbmFnZXJcbklucGF0aWVudCBQaGFybWFjeSBNYW5hZ2VyXG5PdXRwYXRpZW50IFBoYXJtYWN5IE1hbmFnZXJcblJldGFpbCBQaGFybWFjeSBNYW5hZ2VyXG5TcGVjaWFsdHkgUGhhcm1hY3kgTWFuYWdlclxuTWVkaWNhdGlvbiBTYWZldHkgTWFuYWdlclxuUGhhcm1hY3kgQnVzaW5lc3MgTWFuYWdlclxuRm9ybXVsYXJ5IE1hbmFnZXJcblBoYXJtYWN5IFB1cmNoYXNpbmcgTWFuYWdlclxuUGhhcm1hY3kgSW52ZW50b3J5IE1hbmFnZXJcbkRpc3RyaWN0IFBoYXJtYWN5IE1hbmFnZXIgKFJldGFpbCBDaGFpbnMpXG5Ib3NwaXRhbCBQaGFybWFjeSBTdXBlcnZpc29yXG5QaGFybWFjeSBDb21wbGlhbmNlIE1hbmFnZXJcblBoYXJtYWN5IFByb2dyYW0gRGlyZWN0b3JcbkNsaW5pY2FsIFNlcnZpY2VzIENvb3JkaW5hdG9yIFx1MjAxMyBQaGFybWFjeVxuTWVkaWNhdGlvbiBUaGVyYXB5IE1hbmFnZW1lbnQgKE1UTSkgUHJvZ3JhbSBNYW5hZ2VyXG5QaGFybWFjeSBSZXNpZGVuY3kgUHJvZ3JhbSBEaXJlY3RvciAoUlBEKVxuQW50aW1pY3JvYmlhbCBTdGV3YXJkc2hpcCBQcm9ncmFtIENvb3JkaW5hdG9yXG5QaGFybWFjeSBJbmZvcm1hdGljcyBNYW5hZ2VyXG5QaGFybWFjb2dlbm9taWNzIFByb2dyYW0gTGVhZFxuVGVsZSBQaGFybWFjeSBQcm9ncmFtIE1hbmFnZXJcblBoYXJtYWN5IEFkbWluaXN0cmF0b3JcblN0cmF0ZWdpYyBJbml0aWF0aXZlcyBMZWFkIFx1MjAxMyBQaGFybWFjeSBTZXJ2aWNlc1xuUGhhcm1hY3kgQ29tcGxpYW5jZSBPZmZpY2VyXG5SZWd1bGF0b3J5IEFmZmFpcnMgTWFuYWdlciBcdTIwMTMgUGhhcm1hY3kgRGl2aXNpb25cblBoYXJtYWN5IFF1YWxpdHkgSW1wcm92ZW1lbnQgT2ZmaWNlclxuUGhhcm1hY3kgQWNjcmVkaXRhdGlvbiBDb29yZGluYXRvclxuQ2xpbmljYWwgR292ZXJuYW5jZSBMZWFkIFx1MjAxMyBQaGFybWFjeVxuUGhhcm1hY3kgQW5hbHl0aWNzIE1hbmFnZXJcbkhlYWx0aCBTeXN0ZW0gUGhhcm1hY3kgQ29vcmRpbmF0b3JcblBoYXJtYWN5IFBvbGljeSBEaXJlY3RvclxuUHVibGljIEhlYWx0aCBQaGFybWFjeSBMZWFkZXJcblBoYXJtYWN5IEFmZmFpcnMgRGlyZWN0b3IgXHUyMDEzIEdvdmVybm1lbnQvUmVndWxhdG9yeSBCb2R5XG5QaGFybWFjeSBBc3NvY2lhdGlvbiBFeGVjdXRpdmVcbkRlYW4gXHUyMDEzIENvbGxlZ2Ugb2YgUGhhcm1hY3lcbkFzc29jaWF0ZSBEZWFuIGZvciBBY2FkZW1pYyBBZmZhaXJzXG5BY2FkZW1pYyBQcm9ncmFtIERpcmVjdG9yIFx1MjAxMyBQaGFybWFjeSBFZHVjYXRpb25gKSxcbiAgfSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogTGFib3JhdG9yeSAmIGRpYWdub3N0aWMgcHJvZmVzc2lvbmFscyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5jb25zdCBMQUIgPSB7XG4gIHNwZWNzOiBMKGBDbGluaWNhbCBDaGVtaXN0cnlcbkhhZW1hdG9sb2d5XG5JbW11bm9sb2d5IC8gU2Vyb2xvZ3lcbk1pY3JvYmlvbG9neVxuUGFyYXNpdG9sb2d5XG5VcmluYWx5c2lzXG5Ub3hpY29sb2d5XG5CbG9vZCBCYW5raW5nIC8gVHJhbnNmdXNpb24gTWVkaWNpbmVcbkhpc3RvcGF0aG9sb2d5XG5DeXRvcGF0aG9sb2d5XG5Nb2xlY3VsYXIgRGlhZ25vc3RpY3NcbkN5dG9nZW5ldGljc1xuR2VuZXRpYyBUZXN0aW5nIC8gR2Vub21pY3NcblBoYXJtYWNvZ2Vub21pY3Ncbk5leHQtR2VuZXJhdGlvbiBTZXF1ZW5jaW5nIChOR1MpXG5GbG93IEN5dG9tZXRyeVxuUG9pbnQtb2YtQ2FyZSBUZXN0aW5nIChQT0NUKVxuQ2xpbmljYWwgSW5mb3JtYXRpY3MgLyBMYWJvcmF0b3J5IEluZm9ybWF0aWNzXG5BbGxlcmd5ICYgSW1tdW5vY2hlbWlzdHJ5XG5BdXRvaW1tdW5lIERpYWdub3N0aWNzXG5PbmNvbG9neSBEaWFnbm9zdGljc1xuTmV1cm9sb2dpY2FsIERpYWdub3N0aWNzXG5Gb3JlbnNpYyBMYWJvcmF0b3J5IFNjaWVuY2VcbkVudmlyb25tZW50YWwgJiBQdWJsaWMgSGVhbHRoIE1pY3JvYmlvbG9neVxuQmlvYmFua2luZyAvIFNwZWNpbWVuIFJlcG9zaXRvcnkgTWFuYWdlbWVudFxuVmV0ZXJpbmFyeSBEaWFnbm9zdGljc1xuUmVwcm9kdWN0aXZlIGFuZCBGZXJ0aWxpdHkgRGlhZ25vc3RpY3Ncbk9jY3VwYXRpb25hbCBIZWFsdGggJiBJbmR1c3RyaWFsIERpYWdub3N0aWNzXG5DbGluaWNhbCBUcmlhbCBMYWJvcmF0b3J5IFNjaWVuY2VgKSxcbiAgam9iczogTChgTWVkaWNhbCBMYWJvcmF0b3J5IFRlY2huaWNpYW5cbk1lZGljYWwgTGFib3JhdG9yeSBUZWNobm9sb2dpc3QgKE1MVC9NTFMpXG5DbGluaWNhbCBMYWJvcmF0b3J5IFNjaWVudGlzdCAoQ0xTKVxuTWVkaWNhbCBMYWJvcmF0b3J5IFNjaWVudGlzdCAoTUxTKVxuTGFib3JhdG9yeSBUZWNobmljaWFuXG5MYWJvcmF0b3J5IFRlY2hub2xvZ2lzdFxuQ2xpbmljYWwgTGFib3JhdG9yeSBUZWNobmljaWFuXG5DbGluaWNhbCBMYWJvcmF0b3J5IEFzc2lzdGFudFxuU3BlY2ltZW4gUHJvY2Vzc2luZyBUZWNobmljaWFuXG5MYWIgQWlkZSAvIExhYiBBc3Npc3RhbnRcblBobGVib3RvbWlzdFxuQ2xpbmljYWwgQ2hlbWlzdHJ5IFRlY2hub2xvZ2lzdFxuQ2xpbmljYWwgQmlvY2hlbWlzdFxuQ2xpbmljYWwgQ2hlbWlzdHJ5IEFuYWx5c3RcbkhhZW1hdG9sb2d5IFRlY2hub2xvZ2lzdFxuSGFlbWF0b2xvZ3kgU3BlY2lhbGlzdFxuRmxvdyBDeXRvbWV0cnkgVGVjaG5vbG9naXN0XG5NaWNyb2Jpb2xvZ3kgVGVjaG5vbG9naXN0XG5DbGluaWNhbCBNaWNyb2Jpb2xvZ2lzdFxuTWVkaWNhbCBCYWN0ZXJpb2xvZ2lzdFxuTXljb2xvZ3kvUGFyYXNpdG9sb2d5IFRlY2huaWNpYW5cbkltbXVub2xvZ3kgVGVjaG5vbG9naXN0XG5TZXJvbG9neSBUZWNobmljaWFuXG5IaXN0b2xvZ3kgVGVjaG5pY2lhbiAvIFRlY2hub2xvZ2lzdFxuSGlzdG9wYXRob2xvZ3kgQXNzaXN0YW50XG5UaXNzdWUgUHJvY2Vzc2luZyBUZWNobmljaWFuXG5DeXRvdGVjaG5vbG9naXN0XG5DeXRvbG9neSBUZWNobmljaWFuXG5CbG9vZCBCYW5rIFRlY2hub2xvZ2lzdFxuSW1tdW5vaGVtYXRvbG9neSBUZWNobm9sb2dpc3RcblRyYW5zZnVzaW9uIE1lZGljaW5lIFNwZWNpYWxpc3Rcbk1vbGVjdWxhciBEaWFnbm9zdGljcyBUZWNobm9sb2dpc3Rcbk1vbGVjdWxhciBCaW9sb2d5IFNjaWVudGlzdCAoQ2xpbmljYWwpXG5DeXRvZ2VuZXRpYyBUZWNobm9sb2dpc3Rcbkdlbm9taWNzIFRlY2hub2xvZ2lzdFxuUGhhcm1hY29nZW5vbWljcyBBbmFseXN0XG5ETkEgQW5hbHlzdCAoRm9yZW5zaWMvQ2xpbmljYWwpXG5Ub3hpY29sb2d5IFRlY2hub2xvZ2lzdFxuRHJ1ZyBUZXN0aW5nIFRlY2huaWNpYW5cblVyaW5hbHlzaXMgVGVjaG5pY2lhblxuQ2xpbmljYWwgRmx1aWRzIFRlY2hub2xvZ2lzdFxuUGF0aG9sb2dpc3QgKE1EKVxuSGVtYXRvcGF0aG9sb2dpc3RcbkN5dG9wYXRob2xvZ2lzdFxuQ2xpbmljYWwgQ2hlbWlzdCAoUGhEL01EKVxuRm9yZW5zaWMgUGF0aG9sb2dpc3RcblBhdGhvbG9neSBBc3Npc3RhbnQgKFBBKVxuTGFib3JhdG9yeSBJbmZvcm1hdGlvbiBTeXN0ZW1zIChMSVMpIEFuYWx5c3RcbkxhYiBEYXRhIE1hbmFnZXJcblF1YWxpdHkgQXNzdXJhbmNlIE9mZmljZXIgXHUyMDEzIExhYlxuUXVhbGl0eSBDb250cm9sIFRlY2hub2xvZ2lzdFxuUmVndWxhdG9yeSBDb21wbGlhbmNlIFNwZWNpYWxpc3QgXHUyMDEzIExhYm9yYXRvcnlcbkxhYm9yYXRvcnkgU2FmZXR5IE9mZmljZXJcbkxhYm9yYXRvcnkgU3VwZXJ2aXNvclxuU2VuaW9yIE1lZGljYWwgVGVjaG5vbG9naXN0XG5MZWFkIFRlY2hub2xvZ2lzdCAoYnkgZGVwYXJ0bWVudClcblNlY3Rpb24gSGVhZCBcdTIwMTMgTGFib3JhdG9yeSBEZXBhcnRtZW50XG5MYWJvcmF0b3J5IE9wZXJhdGlvbnMgTWFuYWdlclxuTGFib3JhdG9yeSBTZXJ2aWNlcyBNYW5hZ2VyXG5MYWJvcmF0b3J5IERpcmVjdG9yIC8gQ2hpZWYgb2YgTGFib3JhdG9yeSBTZXJ2aWNlc1xuVGVjaG5pY2FsIERpcmVjdG9yIFx1MjAxMyBDbGluaWNhbCBMYWJvcmF0b3J5XG5DbGluaWNhbCBSZXNlYXJjaCBMYWJvcmF0b3J5IFRlY2huaWNpYW5cblB1YmxpYyBIZWFsdGggTGFib3JhdG9yeSBTY2llbnRpc3RcbkVwaWRlbWlvbG9neSBMYWIgVGVjaG5pY2lhblxuRW52aXJvbm1lbnRhbCBMYWJvcmF0b3J5IEFuYWx5c3RcbkJpb2JhbmsgVGVjaG5pY2lhbiAvIFNwZWNpbWVuIFJlcG9zaXRvcnkgTWFuYWdlclxuSW5mZWN0aW91cyBEaXNlYXNlIFN1cnZlaWxsYW5jZSBTY2llbnRpc3RcbkZvcmVuc2ljIExhYm9yYXRvcnkgU2NpZW50aXN0XG5WZXRlcmluYXJ5IERpYWdub3N0aWMgVGVjaG5pY2lhblxuUmVwcm9kdWN0aXZlIEJpb2xvZ3kgTGFib3JhdG9yeSBUZWNobm9sb2dpc3RcbkxhYm9yYXRvcnkgQXNzaXN0YW50XG5QYXRob2xvZ3kgQXNzaXN0YW50XG5CbG9vZCBCYW5rIFRlY2hub2xvZ2lzdCAvIFRyYW5zZnVzaW9uIE1lZGljaW5lIFNwZWNpYWxpc3RcblJhZGlvbG9naWMgVGVjaG5vbG9naXN0XG5SYWRpb2dyYXBoZXJcblgtcmF5IFRlY2huaWNpYW5cbk1SSSBUZWNobm9sb2dpc3RcbkNUIChDb21wdXRlZCBUb21vZ3JhcGh5KSBUZWNobm9sb2dpc3RcblVsdHJhc291bmQgVGVjaG5vbG9naXN0IC8gU29ub2dyYXBoZXJcbkRpYWdub3N0aWMgTWVkaWNhbCBTb25vZ3JhcGhlclxuRWNob2NhcmRpb2dyYXBoeSBUZWNobm9sb2dpc3Rcbk51Y2xlYXIgTWVkaWNpbmUgVGVjaG5vbG9naXN0XG5QRVQgU2NhbiBUZWNobm9sb2dpc3Rcbk1hbW1vZ3JhcGh5IFRlY2hub2xvZ2lzdFxuSW50ZXJ2ZW50aW9uYWwgUmFkaW9sb2d5IFRlY2hub2xvZ2lzdFxuUmFkaW9sb2d5IEFzc2lzdGFudFxuSW1hZ2luZyBJbmZvcm1hdGljcyBTcGVjaWFsaXN0XG5NZWRpY2FsIEltYWdpbmcgU3VwZXJ2aXNvciAvIE1hbmFnZXJcbkVsZWN0cm9jYXJkaW9ncmFtIChFQ0cvRUtHKSBUZWNobmljaWFuXG5DYXJkaWFjIFNvbm9ncmFwaGVyIC8gRWNob2NhcmRpb2dyYXBoeSBUZWNobmljaWFuXG5DYXJkaW92YXNjdWxhciBUZWNobm9sb2dpc3RcbkNhcmRpYWMgQ2F0aGV0ZXJpemF0aW9uIFRlY2hub2xvZ2lzdFxuSG9sdGVyIE1vbml0b3IgVGVjaG5pY2lhblxuUHVsbW9uYXJ5IEZ1bmN0aW9uIFRlY2hub2xvZ2lzdFxuUmVzcGlyYXRvcnkgVGhlcmFwaXN0IChEaWFnbm9zdGljcyBSb2xlKVxuU3RyZXNzIFRlc3QgVGVjaG5pY2lhblxuUGF0aG9sb2dpc3QgKE1EIG9yIERPKVxuTmV1cm9wYXRob2xvZ2lzdFxuRGVybWF0b3BhdGhvbG9naXN0XG5BdXRvcHN5IFRlY2huaWNpYW5cbkRpZ2l0YWwgUGF0aG9sb2d5IFNwZWNpYWxpc3RcbkdlbmV0aWMgVGVjaG5vbG9naXN0XG5DbGluaWNhbCBHZW5ldGljaXN0IChNRC9QaEQpXG5Nb2xlY3VsYXIgQmlvbG9neSBUZWNobm9sb2dpc3Rcbk5leHQtR2VuZXJhdGlvbiBTZXF1ZW5jaW5nIChOR1MpIFRlY2hub2xvZ2lzdFxuRE5BIEFuYWx5c3QgKEZvcmVuc2ljcyBvciBNZWRpY2FsKVxuQmlvYmFuayBUZWNobmljaWFuIC8gQ29vcmRpbmF0b3JcbkRpYWdub3N0aWMgU2VydmljZXMgTWFuYWdlclxuQ2xpbmljYWwgTGFib3JhdG9yeSBNYW5hZ2VyXG5SYWRpb2xvZ3kgRGVwYXJ0bWVudCBNYW5hZ2VyXG5RdWFsaXR5IEFzc3VyYW5jZSBTcGVjaWFsaXN0IFx1MjAxMyBEaWFnbm9zdGljc1xuUmVndWxhdG9yeSBBZmZhaXJzIE9mZmljZXIgXHUyMDEzIERpYWdub3N0aWNzXG5QQUNTIEFkbWluaXN0cmF0b3IgKEltYWdpbmcgU3lzdGVtcylcbkRpYWdub3N0aWMgRGF0YSBBbmFseXN0XG5Db21wbGlhbmNlIE9mZmljZXIgXHUyMDEzIERpYWdub3N0aWMgU2VydmljZXNcbkRpYWdub3N0aWMgSW5mb3JtYXRpY3MgU3BlY2lhbGlzdFxuUG9pbnQtb2YtQ2FyZSBUZXN0aW5nIChQT0NUKSBDb29yZGluYXRvclxuQ2xpbmljYWwgVHJpYWwgTGFib3JhdG9yeSBUZWNobmljaWFuXG5QdWJsaWMgSGVhbHRoIERpYWdub3N0aWMgU2NpZW50aXN0XG5PY2N1cGF0aW9uYWwgSGVhbHRoIFRlc3RpbmcgVGVjaG5pY2lhblxuRW52aXJvbm1lbnRhbCBEaWFnbm9zdGljcyBUZWNobmljaWFuXG5WZXRlcmluYXJ5IERpYWdub3N0aWNzIFRlY2hub2xvZ2lzdFxuTW9iaWxlIEltYWdpbmcgVGVjaG5pY2lhbmApLFxuICBlbnY6IEwoYENsaW5pY2FsIGxhYm9yYXRvcmllcyAoaG9zcGl0YWxzLCBkaWFnbm9zdGljcyBjZW50ZXJzKVxuUmVzZWFyY2ggbGFic1xuUHVibGljIGhlYWx0aCBvcmdhbml6YXRpb25zIChlLmcuIENEQywgV0hPKVxuQmxvb2QgYmFua3NcbkJpb3RlY2hub2xvZ3kgYW5kIHBoYXJtYWNldXRpY2FsIGNvbXBhbmllc1xuRm9yZW5zaWMgYW5kIGxhdyBlbmZvcmNlbWVudCBsYWJzXG5BY2FkZW1pYyBhbmQgdGVhY2hpbmcgaW5zdGl0dXRpb25zYCksXG59O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIEFsbGllZCBoZWFsdGgsIEhlYWx0aCBJVCAmIGFkbWluLCBTdXBwb3J0IHN0YWZmICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgQUxMSUVEX0pPQlMgPSB7XG4gICdEaWFnbm9zdGljICYgTGFib3JhdG9yeSBTcGVjaWFsdGllcyc6IEwoYE1lZGljYWwgTGFib3JhdG9yeSBTY2llbnRpc3QgLyBUZWNobm9sb2dpc3Rcbk1lZGljYWwgTGFib3JhdG9yeSBUZWNobmljaWFuXG5SYWRpb2xvZ2ljIFRlY2hub2xvZ2lzdCAvIFJhZGlvZ3JhcGhlclxuQ1QgVGVjaG5vbG9naXN0XG5IaXN0b3RlY2hub2xvZ2lzdCAvIEhpc3RvdGVjaG5pY2lhblxuUGF0aG9sb2dpc3QgQXNzaXN0YW50XG5FbGVjdHJvbmV1cm9kaWFnbm9zdGljIChFTkQpIFRlY2hub2xvZ2lzdFxuQ2xpbmljYWwgTGFib3JhdG9yeSBUZWNobm9sb2dpc3RzIC8gTWVkaWNhbCBMYWJvcmF0b3J5IFNjaWVudGlzdHNcblJhZGlvbG9naWMgVGVjaG5vbG9naXN0cyAmIFRlY2huaWNpYW5zXG5PdGhlciB0ZWNobmljaWFucyAmIHRlY2hub2xvZ2lzdHMgKGNhcmRpb3Zhc2N1bGFyIHRlY2hub2xvZ2lzdHMsIG51Y2xlYXIgbWVkaWNpbmUgdGVjaG5vbG9naXN0cywgZXRjLilgKSxcbiAgJ1RoZXJhcGV1dGljICYgQ2xpbmljYWwgU3BlY2lhbHRpZXMnOiBMKGBQaHlzaW90aGVyYXBpc3QgLyBQaHlzaWNhbCBUaGVyYXBpc3Rcbk9jY3VwYXRpb25hbCBUaGVyYXBpc3RcblJlc3BpcmF0b3J5IFRoZXJhcGlzdFxuU3BlZWNoLUxhbmd1YWdlIFBhdGhvbG9naXN0XG5TcGVlY2ggYW5kIExhbmd1YWdlIFRoZXJhcGlzdFxuQXVkaW9sb2dpc3RcblJlY3JlYXRpb25hbCBUaGVyYXBpc3Rcbk9ydGhvdGlzdCAvIFByb3N0aGV0aXN0XG5SYWRpYXRpb24gVGhlcmFwaXN0XG5BcnQgVGhlcmFwaXN0XG5NdXNpYyBUaGVyYXBpc3RcbkRyYW1hIFRoZXJhcGlzdFxuTWFzc2FnZSBUaGVyYXBpc3RcbkRpZXRpdGlhblxuT3BlcmF0aW5nIERlcGFydG1lbnQgUHJhY3RpdGlvbmVyIChPRFApXG5PcnRob3B0aXN0XG5Pc3Rlb3BhdGhcblBhcmFtZWRpY1xuUG9kaWF0cmlzdCAvIENoaXJvcG9kaXN0XG5SYWRpb2dyYXBoZXIgKERpYWdub3N0aWMgJiBUaGVyYXBldXRpYylcbkRlbnRhbCBIeWdpZW5pc3QgLyBEZW50YWwgQXNzaXN0YW50XG5FbWVyZ2VuY3kgTWVkaWNhbCBUZWNobmljaWFuIC8gUGFyYW1lZGljYCksXG4gICdQaGFybWFjZXV0aWNhbCAmIE51dHJpdGlvbiBTcGVjaWFsdGllcyc6IEwoYFBoYXJtYWNpc3RcblBoYXJtYWN5IFRlY2huaWNpYW5cbkRpZXRpdGlhbiAvIENsaW5pY2FsIE51dHJpdGlvbmlzdFxuTnV0cml0aW9uaXN0XG5EaWV0ZXRpYyBUZWNobmljaWFuYCksXG4gICdFbWVyZ2VuY3kgJiBQcmVob3NwaXRhbCBDYXJlJzogTChgUGFyYW1lZGljXG5FbWVyZ2VuY3kgTWVkaWNhbCBUZWNobmljaWFuIChFTVQpXG5Dcml0aWNhbCBDYXJlIFRyYW5zcG9ydCBTcGVjaWFsaXN0XG5GbGlnaHQgUGFyYW1lZGljYCksXG4gICdCZWhhdmlvdXJhbCAmIE1lbnRhbCBIZWFsdGggU3BlY2lhbHRpZXMnOiBMKGBDbGluaWNhbCBQc3ljaG9sb2dpc3RcbkJlaGF2aW91cmFsIFRoZXJhcGlzdFxuTWVudGFsIEhlYWx0aCBDb3Vuc2VsbG9yXG5TdWJzdGFuY2UgQWJ1c2UgQ291bnNlbGxvclxuUHN5Y2hpYXRyaWMgVGVjaG5pY2lhblxuU29jaWFsIFdvcmtlcmApLFxuICAnU3VwcG9ydGl2ZSAmIERpcmVjdCBDYXJlIFJvbGVzJzogTChgUGh5c2ljaWFuIEFzc2lzdGFudCAvIEFzc29jaWF0ZVxuQW5lc3RoZXNpYSBUZWNobm9sb2dpc3RcblN1cmdpY2FsIFRlY2hub2xvZ2lzdCAvIE9wZXJhdGluZyBEZXBhcnRtZW50IFByYWN0aXRpb25lciAoT0RQKVxuQ2xpbmljYWwgU3VwcG9ydCBXb3JrZXJcbkhlYWx0aGNhcmUgQXNzaXN0YW50IC8gTnVyc2luZyBBc3Npc3RhbnRcbkNvbW11bml0eSBIZWFsdGggV29ya2VyXG5DYXNlIE1hbmFnZXJgKSxcbiAgJ1NwZWNpYWxpemVkICYgRW1lcmdpbmcgUm9sZXMnOiBMKGBHZW5ldGljIENvdW5zZWxsb3JcblBlcmZ1c2lvbmlzdFxuTWVkaWNhbCBQaHlzaWNpc3RcbkJpb21lZGljYWwgU2NpZW50aXN0XG5DbGluaWNhbCBFeGVyY2lzZSBQaHlzaW9sb2dpc3RcbktpbmVzaW9sb2dpc3RcblRlbGVoZWFsdGggU3BlY2lhbGlzdFxuUmVoYWJpbGl0YXRpb24gRW5naW5lZXJgKSxcbn07XG5cbmNvbnN0IElUX0FETUlOX0pPQlMgPSB7XG4gICdIZWFsdGggSW5mb3JtYXRpb24gVGVjaG5vbG9neSc6IEwoYEhlYWx0aCBJbmZvcm1hdGlvbiBUZWNobmljaWFuXG5NZWRpY2FsIENvZGVyIC8gQ2xpbmljYWwgQ29kZXJcblJlbGVhc2Ugb2YgSW5mb3JtYXRpb24gU3BlY2lhbGlzdFxuRFJHIEFuYWx5c3QgKERpYWdub3Npcy1SZWxhdGVkIEdyb3VwIEFuYWx5c3QpXG5IZWFsdGggUHJpdmFjeSAmIFNlY3VyaXR5IE9mZmljZXIgLyBJbmZvcm1hdGlvbiBTZWN1cml0eSBTcGVjaWFsaXN0XG5FSFIgLyBFTVIgU3BlY2lhbGlzdCAvIEVIUi9FTVIgTWFuYWdlclxuU3lzdGVtcyBBbmFseXN0IChIZWFsdGggSVQgU3lzdGVtcylcbkFwcGxpY2F0aW9uIEFuYWx5c3QgLyBFSFIgQXBwbGljYXRpb24gQW5hbHlzdFxuSVQgU3VwcG9ydCBUZWNobmljaWFuIChIZWFsdGggSVQgc3VwcG9ydClcbkRhdGFiYXNlIEFkbWluaXN0cmF0b3IgKGluIGhlYWx0aCBzZXR0aW5ncylcbkFuYWx5dGljcyBDb25zdWx0YW50IChIZWFsdGhjYXJlIC8gSGVhbHRoIElUKVxuSGVhbHRoIElUIERpcmVjdG9yIC8gRGlyZWN0b3Igb2YgSGVhbHRoIEluZm9ybWF0aW9uIFRlY2hub2xvZ3lcbkNsaW5pY2FsIEluZm9ybWF0aWNzIFNwZWNpYWxpc3QgLyBDbGluaWNhbCBJbmZvcm1hdGljaXN0XG5FSFIvRU1SIFN1cHBvcnQgQW5hbHlzdFxuRGF0YSBJbnRlZ3JhdGlvbiBTcGVjaWFsaXN0XG5IZWFsdGggSVQgUHJvamVjdCBNYW5hZ2VyXG5IZWFsdGggSVQgU2VjdXJpdHkgT2ZmaWNlclxuRW50ZXJwcmlzZSBIZWFsdGggQXJjaGl0ZWN0XG5IZWFsdGggU2VydmljZXMgQWRtaW5pc3RyYXRvciAvIEhlYWx0aCBJbmZvcm1hdGlvbiBNYW5hZ2VyXG5JbmZvcm1hdGlvbiBNYW5hZ2VtZW50IFNwZWNpYWxpc3Rcbktub3dsZWRnZSBNYW5hZ2VtZW50IFNwZWNpYWxpc3RcbklUIEF1ZGl0b3IgKGZvciBoZWFsdGgtSVQgc3lzdGVtcylcblRyYW5zY3JpcHRpb25pc3RcbkNsaW5pY2FsIERvY3VtZW50YXRpb24gSW1wcm92ZW1lbnQgKENESSkgU3BlY2lhbGlzdFxuSGVhbHRoIERhdGEgQW5hbHlzdFxuSGVhbHRoIEluZm9ybWF0aWNzIENvbnN1bHRhbnRcbkhlYWx0aCBJbmZvcm1hdGljcyBTcGVjaWFsaXN0XG5NZWRpY2FsIFNlY3JldGFyeSAvIEhlYWx0aCBVbml0IENvb3JkaW5hdG9yYCksXG4gICdIZWFsdGhjYXJlIEFkbWluaXN0cmF0aW9uJzogTChgQWNjcmVkaXRhdGlvbiBDb29yZGluYXRvclxuQWRtaW5pc3RyYXRpdmUgQXNzaXN0YW50IFx1MjAxMyBIZWFsdGhjYXJlXG5BZG1pbmlzdHJhdGl2ZSBPZmZpY2VyXG5BZG1pc3Npb25zIENvb3JkaW5hdG9yXG5DYXNlIE1hbmFnZW1lbnQgU3VwZXJ2aXNvclxuSG9zcGl0YWwgQWRtaW5pc3RyYXRvclxuTWVkaWNhbCBTdXBlcmludGVuZGVudFxuSGVhbHRoY2FyZSBPcGVyYXRpb25zIE1hbmFnZXJcblF1YWxpdHkgQXNzdXJhbmNlIChRQSkgTWFuYWdlclxuSGVhbHRoY2FyZSBQcm9qZWN0IE1hbmFnZXJcbkNsYWltcyAvIFJldmVudWUgQ3ljbGUgTWFuYWdlclxuSFIgTWFuYWdlciBcdTIwMTMgSGVhbHRoY2FyZVxuQ29tcGxpYW5jZSBPZmZpY2VyIFx1MjAxMyBIZWFsdGhjYXJlXG5QdWJsaWMgSGVhbHRoIEFkbWluaXN0cmF0b3Jcbk1lZGljYWwgRGlyZWN0b3IgXHUyMDEzIEluc3VyYW5jZVxuRGlzdHJpY3QgSGVhbHRoIE9mZmljZXIgKERITylcblN0YXRlIEhlYWx0aCBNaXNzaW9uIERpcmVjdG9yXG5Qcm9ncmFtIE1hbmFnZXIgXHUyMDEzIE5hdGlvbmFsIEhlYWx0aCBNaXNzaW9uIChOSE0pXG5QdWJsaWMgSGVhbHRoIFNwZWNpYWxpc3QgXHUyMDEzIFdITy9Nb0hGVy9OR09zXG5SZWxlYXNlIG9mIEluZm9ybWF0aW9uIChST0kpIFNwZWNpYWxpc3RcbkhlYWx0aCBJbmZvcm1hdGlvbiBDbGVya1xuSGVhbHRoIEluZm9ybWF0aW9uIE1hbmFnZXIgKEhJTSlcbkNvZGluZyBNYW5hZ2VyXG5SZXZlbnVlIEN5Y2xlIEFuYWx5c3RcbkNvbXBsaWFuY2UgJiBQcml2YWN5IE9mZmljZXJcbkZyb250IE9mZmljZSBFeGVjdXRpdmUgXHUyMDEzIEhvc3BpdGFsL0NsaW5pY1xuSGVhbHRoIFByb2dyYW0gQ29vcmRpbmF0b3JcbkhlYWx0aCBTZXJ2aWNlcyBNYW5hZ2VyXG5IZWFsdGggVW5pdCBDb29yZGluYXRvclxuSGVhbHRoY2FyZSBBZG1pbmlzdHJhdG9yIC8gTWFuYWdlclxuSGVhbHRoY2FyZSBDdXN0b21lciBTZXJ2aWNlIEV4ZWN1dGl2ZVxuTWVkaWNhbCBhbmQgSGVhbHRoIFNlcnZpY2VzIE1hbmFnZXJcbk1lZGljYWwgT2ZmaWNlIE1hbmFnZXJcbk51cnNpbmcgSG9tZSBBZG1pbmlzdHJhdG9yXG5PcGVyYXRpb25zIE1hbmFnZXIgXHUyMDEzIEhlYWx0aGNhcmVcbk91dHBhdGllbnQgU2VydmljZXMgTWFuYWdlclxuUGF0aWVudCBDYXJlIENvb3JkaW5hdG9yXG5QcmFjdGljZSBBZG1pbmlzdHJhdG9yXG5QcmFjdGljZSBNYW5hZ2VyXG5RdWFsaXR5IEltcHJvdmVtZW50IE1hbmFnZXJcblJlc2VhcmNoIFByb2dyYW0gQWRtaW5pc3RyYXRvciBcdTIwMTMgSGVhbHRoY2FyZVxuUmVzZWFyY2ggUHJvZ3JhbSBDb29yZGluYXRvclxuUmVoYWJpbGl0YXRpb24gU2VydmljZXMgTWFuYWdlclxuUmV2ZW51ZSBDeWNsZSBNYW5hZ2VyXG5SaXNrICYgU2FmZXR5IE1hbmFnZXJcblNjaGVkdWxpbmcgQ29vcmRpbmF0b3JcblN1cHBvcnQgU2VydmljZXMgTWFuYWdlclxuVW5pdCBNYW5hZ2VyIChJQ1UsIEVSLCBPVCwgZXRjLilcblV0aWxpemF0aW9uIFJldmlldyBNYW5hZ2VyYCksXG59O1xuXG5jb25zdCBTVVBQT1JUX0pPQlMgPSB7XG4gICdDbGVyaWNhbCAmIEZyb250IE9mZmljZSc6IEwoYEZyb250IE9mZmljZSBFeGVjdXRpdmVcblJlY2VwdGlvbmlzdCBcdTIwMTMgSG9zcGl0YWwvQ2xpbmljXG5BZG1pbmlzdHJhdGl2ZSBDbGVya1xuV2FyZCBBZG1pbmlzdHJhdGl2ZSBDbGVya1xuUGF0aWVudCBSZWdpc3RyYXRpb24gQ2xlcmtcbkFkbWlzc2lvbnMgQ2xlcmsgLyBBZG1pc3Npb25zIENvb3JkaW5hdG9yXG5IZWFsdGggVW5pdCBDbGVya1xuTWVkaWNhbCBPZmZpY2UgQXNzaXN0YW50XG5NZWRpY2FsIFNlY3JldGFyeWApLFxuICAnTWVkaWNhbCBSZWNvcmRzICYgSW5mb3JtYXRpb24nOiBMKGBNZWRpY2FsIFJlY29yZHMgQ2xlcmtcbkRhdGEgRW50cnkgT3BlcmF0b3IgXHUyMDEzIEhvc3BpdGFsXG5Db2RpbmcgU3BlY2lhbGlzdCAoSUNEIC8gQ1BUKVxuTWVkaWNhbCBUcmFuc2NyaXB0aW9uaXN0XG5NZWRpY2FsIFJlY29yZHMgU3VwZXJ2aXNvcmApLFxuICAnQmlsbGluZyAmIEZpbmFuY2UnOiBMKGBNZWRpY2FsIEJpbGxpbmcgTWFuYWdlclxuTWVkaWNhbCBCaWxsaW5nIFNwZWNpYWxpc3Rcbkluc3VyYW5jZSBWZXJpZmljYXRpb24gU3BlY2lhbGlzdFxuQWNjb3VudHMgQXNzaXN0YW50IFx1MjAxMyBIZWFsdGhjYXJlXG5QYXRpZW50IEFjY291bnRzIENsZXJrXG5CaWxsaW5nIENsZXJrYCksXG4gICdMb2dpc3RpY3MgJiBGYWNpbGl0eSc6IEwoYFRyYW5zcG9ydCBDb29yZGluYXRvciAoUGF0aWVudCAvIFNhbXBsZSBUcmFuc2ZlcilcbkludmVudG9yeSBDbGVyayBcdTIwMTMgSG9zcGl0YWwgU3RvcmVzXG5TdXBwbHkgQ2hhaW4gQXNzaXN0YW50IFx1MjAxMyBIZWFsdGhjYXJlXG5GYWNpbGl0aWVzIEFzc2lzdGFudFxuTGF1bmRyeSBTZXJ2aWNlcyBDb29yZGluYXRvclxuSG91c2VrZWVwaW5nIFN1cGVydmlzb3JgKSxcbiAgJ1BhdGllbnQgU2VydmljZXMnOiBMKGBQYXRpZW50IFNlcnZpY2VzIE1hbmFnZXJcblBhdGllbnQgU2VydmljZXMgQXNzb2NpYXRlXG5QYXRpZW50IENhcmUgQ29vcmRpbmF0b3IgKHN1cHBvcnRpdmUpXG5IZWxwIERlc2sgRXhlY3V0aXZlIFx1MjAxMyBIb3NwaXRhbFxuUGF0aWVudCBSZWxhdGlvbnMgUmVwcmVzZW50YXRpdmVgKSxcbiAgJ0dlbmVyYWwgQW5jaWxsYXJ5IFN1cHBvcnQnOiBMKGBGaWxlIENsZXJrXG5SZWNvcmRzIEFzc2lzdGFudFxuT2ZmaWNlIEJveSAvIFBlb24gKEhvc3BpdGFsIEFkbWluKVxuTWVzc2VuZ2VyIC8gUnVubmVyIChIb3NwaXRhbCBEb2NzICYgUmVjb3JkcylcblN3aXRjaGJvYXJkIE9wZXJhdG9yIC8gQ2FsbCBDZW50ZXIgRXhlY3V0aXZlIFx1MjAxMyBIZWFsdGhjYXJlXG5BZG1pc3Npb25zIENsZXJrIC8gQ29vcmRpbmF0b3JcblBhdGllbnQgQ2FyZSBDb29yZGluYXRvciAobm9uLWNsaW5pY2FsKVxuVHJhbnNwb3J0IENvb3JkaW5hdG9yIChQYXRpZW50cyAvIFNhbXBsZXMpYCksXG4gICdBbWJ1bGFuY2UgU3VwcG9ydCBTZXJ2aWNlcyc6IEwoYEFtYnVsYW5jZSBOdXJzZVxuQ3JpdGljYWwgQ2FyZSBQYXJhbWVkaWMgKENDUClcbkFkdmFuY2VkIENhcmUgUGFyYW1lZGljIChBQ1ApXG5CYXNpYyBMaWZlIFN1cHBvcnQgKEJMUykgUHJvdmlkZXJcbkFkdmFuY2VkIExpZmUgU3VwcG9ydCAoQUxTKSBQcm92aWRlclxuQW1idWxhbmNlIERyaXZlciAvIEVtZXJnZW5jeSBWZWhpY2xlIE9wZXJhdG9yXG5BbWJ1bGFuY2UgQXR0ZW5kYW50IChGaXJzdC1BaWQgQ2VydGlmaWVkKVxuUGF0aWVudCBUcmFuc3BvcnRlciAoTm9uLUVtZXJnZW5jeSBUcmFuc2ZlcnMpXG5TdHJldGNoZXIgQmVhcmVyXG5UcmFuc3BvcnQgQ29vcmRpbmF0b3IgXHUyMDEzIEFtYnVsYW5jZSBTZXJ2aWNlc1xuQW1idWxhbmNlIE9wZXJhdGlvbnMgU3VwZXJ2aXNvclxuRW1lcmdlbmN5IE1lZGljYWwgU2VydmljZXMgKEVNUykgQ29vcmRpbmF0b3JcbkFtYnVsYW5jZSBTZXJ2aWNlcyBNYW5hZ2VyXG5EaXJlY3RvciBvZiBFbWVyZ2VuY3kgTWVkaWNhbCBTZXJ2aWNlcyAoRU1TIERpcmVjdG9yKVxuRGlzcGF0Y2ggQ29vcmRpbmF0b3IgLyBEaXNwYXRjaGVyIChBbWJ1bGFuY2UgQ29udHJvbCBSb29tKVxuT3BlcmF0aW9ucyBTdXBlcnZpc29yIFx1MjAxMyBBbWJ1bGFuY2UgU2VydmljZXNcblRyYW5zcG9ydCBDb29yZGluYXRvciBcdTIwMTMgQW1idWxhbmNlIEZsZWV0XG5EaXNwYXRjaCBDb29yZGluYXRvciAvIERpc3BhdGNoZXIgU3VwZXJ2aXNvclxuUmVzY3VlICYgRGlzYXN0ZXIgUmVzcG9uc2UgU3BlY2lhbGlzdFxuRW1lcmdlbmN5IE1lZGljYWwgVGVjaG5pY2lhbiBcdTIwMTMgUGFyYW1lZGljIChFTVQtUClcbkVtZXJnZW5jeSBNZWRpY2FsIFRlY2huaWNpYW4gXHUyMDEzIEFkdmFuY2VkIChFTVQtQSlcbkVtZXJnZW5jeSBNZWRpY2FsIFRlY2huaWNpYW4gXHUyMDEzIEJhc2ljIChFTVQtQilcbkhlbHBlciAvIENsZWFuZXIgXHUyMDEzIEFtYnVsYW5jZSBNYWludGVuYW5jZVxuRW1lcmdlbmN5IERpc3BhdGNoZXIgKENvbnRyb2wgUm9vbSlcbkNhbGwgVGFrZXIgLyBFbWVyZ2VuY3kgUmVzcG9uc2UgT3BlcmF0b3JcblJhZGlvIE9wZXJhdG9yIFx1MjAxMyBBbWJ1bGFuY2UgU2VydmljZXNcbkdJUy9UcmFja2luZyBTcGVjaWFsaXN0IChBbWJ1bGFuY2UgTG9jYXRpb24gTW9uaXRvcmluZylgKSxcbn07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLyogUHJpbWFyeSByb2xlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qIGtpbmQ6ICdqb2JzJyAgICAgIFx1MjE5MiBqb2IgbGV2ZWwgb25seVxuICAgICAgICAgJ3NwZWMtam9icycgXHUyMTkyIHNwZWNpYWxpemF0aW9uIGRlY2lkZXMgdGhlIGpvYi1sZXZlbCBsaXN0XG4gICAgICAgICAnYXJlYScgICAgICBcdTIxOTIga2V5IGFyZWEgXHUyMTkyIHNwZWNpYWxpemF0aW9uIGxpc3QgKyBqb2ItbGV2ZWwgbGlzdFxuICAgICAgICAgJ2xhYicgICAgICAgXHUyMTkyIHNwZWNpYWxpemF0aW9uICsgam9iIGxldmVsICsgd29yayBlbnZpcm9ubWVudCAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5leHBvcnQgY29uc3QgUk9MRVMgPSBbXG4gIHsgaWQ6ICdtYW5hZ2VtZW50JywgbGFiZWw6ICdIZWFsdGhjYXJlIE1hbmFnZW1lbnQnLCBpY29uOiAnYnJpZWZjYXNlJywgY29sb3I6ICcjN2MzYWVkJywga2luZDogJ2pvYnMnLCBqb2JzOiBMKGBDaGllZiBDb21wbGlhbmNlIE9mZmljZXIgKENDTylcbkNoaWVmIEZpbmFuY2lhbCBPZmZpY2VyIChDRk8pXG5DaGllZiBIdW1hbiBSZXNvdXJjZXMgT2ZmaWNlciAoQ0hSTylcbkNoaWVmIEluZm9ybWF0aW9uIE9mZmljZXIgKENJTylcbkNoaWVmIE51cnNpbmcgT2ZmaWNlciAoQ05PKVxuQ2hpZWYgUGF0aWVudCBFeHBlcmllbmNlIE9mZmljZXJcbkNoaWVmIFF1YWxpdHkgT2ZmaWNlciAoQ1FPKVxuQ2hpZWYgVGVjaG5vbG9neSBPZmZpY2VyIChDVE8pXG5DaGllZiBNZWRpY2FsIE9mZmljZXIgKENNTylcbkNoaWVmIEluZm9ybWF0aW9uIE9mZmljZXIgKENJTykgaW4gaGVhbHRoIG9yZ2FuaXphdGlvbnNcbkNoaWVmIE1lZGljYWwgSW5mb3JtYXRpY3MgT2ZmaWNlciAoQ01JTylcbkNoaWVmIEV4ZWN1dGl2ZSBPZmZpY2VyIChDRU8pIFx1MjAxMyBIb3NwaXRhbFxuQ2hpZWYgT3BlcmF0aW5nIE9mZmljZXIgKENPTylcbkNoaWVmIFByaXZhY3kgT2ZmaWNlclxuVmljZSBQcmVzaWRlbnQgXHUyMDEzIENsaW5pY2FsIFNlcnZpY2VzXG5WaWNlIFByZXNpZGVudCBcdTIwMTMgSGVhbHRoY2FyZSBPcGVyYXRpb25zXG5WaWNlIFByZXNpZGVudCBcdTIwMTMgUGF0aWVudCBTZXJ2aWNlc1xuRGVhbiBvZiBIZWFsdGhjYXJlIEFkbWluaXN0cmF0aW9uXG5EZXBhcnRtZW50IE1hbmFnZXIgKFJhZGlvbG9neSwgUGF0aG9sb2d5LCBldGMuKVxuRGlyZWN0b3Igb2YgQ2xpbmljYWwgT3BlcmF0aW9uc1xuRGlyZWN0b3Igb2YgQ29tbXVuaXR5IEhlYWx0aCBQcm9ncmFtc1xuRGlyZWN0b3Igb2YgRmFjaWxpdHkgTWFuYWdlbWVudFxuRGlyZWN0b3Igb2YgRmluYW5jZSBcdTIwMTMgSGVhbHRoY2FyZVxuRGlyZWN0b3Igb2YgSGVhbHRoIEluZm9ybWF0aW9uIE1hbmFnZW1lbnQgKEhJTSlcbkRpcmVjdG9yIG9mIEhvc3BpdGFsIEFkbWluaXN0cmF0aW9uXG5EaXJlY3RvciBvZiBQYXRpZW50IENhcmUgU2VydmljZXNcbkRpcmVjdG9yIG9mIFF1YWxpdHkgJiBDb21wbGlhbmNlXG5EaXJlY3RvciBvZiBSaXNrIE1hbmFnZW1lbnRcbkRpcmVjdG9yIG9mIFN1cHBvcnQgU2VydmljZXNcbk1lZGljYWwgRGlyZWN0b3IgXHUyMDEzIEluc3VyYW5jZVxuRGlzdHJpY3QgSGVhbHRoIE9mZmljZXIgKERITylcblN0YXRlIEhlYWx0aCBNaXNzaW9uIERpcmVjdG9yYCkgfSxcbiAgeyBpZDogJ2RvY3RvcnMnLCBsYWJlbDogJ01lZGljYWwgRG9jdG9ycyAmIFBoeXNpY2lhbnMnLCBpY29uOiAnc3RldGhvc2NvcGUnLCBjb2xvcjogJyMyNDU3ZjUnLCBraW5kOiAnc3BlYy1qb2JzJywgc3BlY0xhYmVsOiAnUGxlYXNlIHNlbGVjdCB5b3VyIHNwZWNpYWxpemF0aW9uJywgc3BlY3M6IERPQ1RPUl9KT0JTIH0sXG4gIHsgaWQ6ICdzdXJnZW9ucycsIGxhYmVsOiAnU3VyZ2VvbnMnLCBpY29uOiAnc2NhbHBlbCcsIGNvbG9yOiAnIzBlYTVlOScsIGtpbmQ6ICdqb2JzJywgam9iczogTChgR2VuZXJhbCBTdXJnZW9uXG5DYXJkaW90aG9yYWNpYyBTdXJnZW9uXG5OZXVyb3N1cmdlb25cbk9ydGhvcGFlZGljIFN1cmdlb25cblBsYXN0aWMgJiBSZWNvbnN0cnVjdGl2ZSBTdXJnZW9uXG5QYWVkaWF0cmljIFN1cmdlb25cblZhc2N1bGFyIFN1cmdlb25cbkNvbG9yZWN0YWwgU3VyZ2VvbiAvIFByb2N0b2xvZ2lzdFxuVXJvbG9naWMgU3VyZ2VvblxuT3BodGhhbG1pYyBTdXJnZW9uXG5FTlQgU3VyZ2VvbiAvIE90b2xhcnluZ29sb2dpc3Rcbkd5bmFlY29sb2dpYyBTdXJnZW9uXG5PYnN0ZXRyaWMgU3VyZ2VvblxuT3JhbCAmIE1heGlsbG9mYWNpYWwgU3VyZ2VvblxuSGVwYXRvYmlsaWFyeSBTdXJnZW9uXG5FbmRvY3JpbmUgU3VyZ2VvblxuU3VyZ2ljYWwgT25jb2xvZ2lzdFxuVHJhbnNwbGFudCBTdXJnZW9uXG5UcmF1bWEgU3VyZ2VvblxuQmFyaWF0cmljIFN1cmdlb25cblRob3JhY2ljIFN1cmdlb25cbkhhbmQgU3VyZ2VvblxuU3BpbmFsIFN1cmdlb25cbkxhcGFyb3Njb3BpYyBTdXJnZW9uXG5Sb2JvdGljIFN1cmdlb25cbkNoaWVmIFN1cmdlb25cbkNvbnN1bHRhbnQgU3VyZ2VvblxuQXR0ZW5kaW5nIFN1cmdlb25cblJlc2lkZW50IFN1cmdlb24gLyBTdXJnaWNhbCBSZXNpZGVudFxuRmVsbG93IChTdXJnaWNhbCBTdWJzcGVjaWFsdHkpXG5TdXJnaWNhbCBSZWdpc3RyYXJcbkFzc2lzdGFudCBTdXJnZW9uXG5Mb2N1bSBTdXJnZW9uYCkgfSxcbiAgeyBpZDogJ2RlbnRhbCcsIGxhYmVsOiAnRGVudGFsIFByb2Zlc3Npb25hbHMnLCBpY29uOiAndG9vdGgnLCBjb2xvcjogJyMwNmI2ZDQnLCBraW5kOiAnam9icycsIGpvYnM6IEwoYEdlbmVyYWwgRGVudGlzdCAoQkRTL0REUy9ETUQpXG5PcnRob2RvbnRpc3RcblBlcmlvZG9udGlzdFxuRW5kb2RvbnRpc3RcblByb3N0aG9kb250aXN0XG5PcmFsICYgTWF4aWxsb2ZhY2lhbCBTdXJnZW9uXG5QYWVkaWF0cmljIERlbnRpc3QgLyBQZWRvZG9udGlzdFxuT3JhbCBNZWRpY2luZSBTcGVjaWFsaXN0XG5PcmFsIFJhZGlvbG9naXN0XG5QdWJsaWMgSGVhbHRoIERlbnRpc3QgLyBDb21tdW5pdHkgRGVudGlzdFxuRm9yZW5zaWMgT2RvbnRvbG9naXN0XG5JbXBsYW50b2xvZ2lzdGApIH0sXG4gIHsgaWQ6ICdudXJzaW5nJywgbGFiZWw6ICdOdXJzaW5nICYgTWlkd2lmZXJ5JywgaWNvbjogJ251cnNlJywgY29sb3I6ICcjZWM0ODk5Jywga2luZDogJ3NwZWMtam9icycsIHNwZWNMYWJlbDogJ1BsZWFzZSBzZWxlY3QgeW91ciBzcGVjaWFsaXphdGlvbicsIHNwZWNzOiBOVVJTRV9KT0JTIH0sXG4gIHsgaWQ6ICdwaGFybWFjeScsIGxhYmVsOiAnUGhhcm1hY3kgUHJvZmVzc2lvbmFscycsIGljb246ICdwaWxsJywgY29sb3I6ICcjMTBiOTgxJywga2luZDogJ2FyZWEnLCBhcmVhTGFiZWw6ICdXaGF0IGlzIHlvdXIga2V5IGFyZWEgb2YgcGhhcm1hY3k/JywgYXJlYXM6IFBIQVJNQUNZX0FSRUFTIH0sXG4gIHsgaWQ6ICdsYWInLCBsYWJlbDogJ0xhYm9yYXRvcnkgJiBEaWFnbm9zdGljIFByb2Zlc3Npb25hbHMnLCBpY29uOiAnbWljcm9zY29wZScsIGNvbG9yOiAnI2Y1OWUwYicsIGtpbmQ6ICdsYWInLCAuLi5MQUIgfSxcbiAgeyBpZDogJ2FsbGllZCcsIGxhYmVsOiAnQWxsaWVkIEhlYWx0aCBQcm9mZXNzaW9uYWxzJywgaWNvbjogJ3B1bHNlJywgY29sb3I6ICcjZWY0NDQ0Jywga2luZDogJ3NwZWMtam9icycsIHNwZWNMYWJlbDogJ1BsZWFzZSBzZWxlY3QgeW91ciBzcGVjaWFsaXphdGlvbicsIHNwZWNzOiBBTExJRURfSk9CUyB9LFxuICB7IGlkOiAnaXRhZG1pbicsIGxhYmVsOiAnSGVhbHRoIElUICYgQWRtaW4gUHJvZmVzc2lvbmFscycsIGljb246ICdtb25pdG9yJywgY29sb3I6ICcjNjM2NmYxJywga2luZDogJ3NwZWMtam9icycsIHNwZWNMYWJlbDogJ1BsZWFzZSBzZWxlY3QgeW91ciBzcGVjaWFsaXphdGlvbicsIHNwZWNzOiBJVF9BRE1JTl9KT0JTIH0sXG4gIHsgaWQ6ICdzdXBwb3J0JywgbGFiZWw6ICdTdXBwb3J0IFN0YWZmIChBbmNpbGxhcnkpJywgaWNvbjogJ3VzZXJzJywgY29sb3I6ICcjNjQ3NDhiJywga2luZDogJ3NwZWMtam9icycsIHNwZWNMYWJlbDogJ1BsZWFzZSBzZWxlY3QgeW91ciBzcGVjaWFsaXphdGlvbicsIHNwZWNzOiBTVVBQT1JUX0pPQlMgfSxcbl07XG5cbmV4cG9ydCBjb25zdCByb2xlQnlJZCA9IChpZCkgPT4gUk9MRVMuZmluZCgocikgPT4gci5pZCA9PT0gaWQpO1xuXG4vKiogTnVtYmVyIG9mIGRpc3RpbmN0IGpvYiB0aXRsZXMgcGVyIHByaW1hcnkgcm9sZSAodXNlZCBieSB0aGUgcHJvZmVzc2lvbmFscyBwYWdlKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2JDb3VudChyb2xlKSB7XG4gIGNvbnN0IHNldCA9IG5ldyBTZXQoKTtcbiAgaWYgKHJvbGUua2luZCA9PT0gJ2pvYnMnKSByb2xlLmpvYnMuZm9yRWFjaCgoaikgPT4gc2V0LmFkZChqKSk7XG4gIGlmIChyb2xlLmtpbmQgPT09ICdzcGVjLWpvYnMnKSBPYmplY3QudmFsdWVzKHJvbGUuc3BlY3MpLmZvckVhY2goKGpzKSA9PiBqcy5mb3JFYWNoKChqKSA9PiBzZXQuYWRkKGopKSk7XG4gIGlmIChyb2xlLmtpbmQgPT09ICdhcmVhJykgT2JqZWN0LnZhbHVlcyhyb2xlLmFyZWFzKS5mb3JFYWNoKChhKSA9PiBhLmpvYnMuZm9yRWFjaCgoaikgPT4gc2V0LmFkZChqKSkpO1xuICBpZiAocm9sZS5raW5kID09PSAnbGFiJykgcm9sZS5qb2JzLmZvckVhY2goKGopID0+IHNldC5hZGQoaikpO1xuICByZXR1cm4gc2V0LnNpemU7XG59XG5cbi8qKiBFdmVyeSBqb2IgdGl0bGUgd2l0aCBpdHMgcHJpbWFyeSByb2xlIChmb3Igc2VhcmNoKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbGxKb2JzKCkge1xuICBjb25zdCBvdXQgPSBbXTtcbiAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoKTtcbiAgY29uc3QgYWRkID0gKGosIHJvbGUsIGdyb3VwKSA9PiB7IGNvbnN0IGsgPSByb2xlLmlkICsgajsgaWYgKCFzZWVuLmhhcyhrKSkgeyBzZWVuLmFkZChrKTsgb3V0LnB1c2goeyB0OiBqLCByb2xlOiByb2xlLmlkLCByb2xlTGFiZWw6IHJvbGUubGFiZWwsIGdyb3VwIH0pOyB9IH07XG4gIFJPTEVTLmZvckVhY2goKHIpID0+IHtcbiAgICBpZiAoci5raW5kID09PSAnam9icycpIHIuam9icy5mb3JFYWNoKChqKSA9PiBhZGQoaiwgciwgJycpKTtcbiAgICBpZiAoci5raW5kID09PSAnc3BlYy1qb2JzJykgT2JqZWN0LmVudHJpZXMoci5zcGVjcykuZm9yRWFjaCgoW3MsIGpzXSkgPT4ganMuZm9yRWFjaCgoaikgPT4gYWRkKGosIHIsIHMpKSk7XG4gICAgaWYgKHIua2luZCA9PT0gJ2FyZWEnKSBPYmplY3QuZW50cmllcyhyLmFyZWFzKS5mb3JFYWNoKChbcywgYV0pID0+IGEuam9icy5mb3JFYWNoKChqKSA9PiBhZGQoaiwgciwgcykpKTtcbiAgICBpZiAoci5raW5kID09PSAnbGFiJykgci5qb2JzLmZvckVhY2goKGopID0+IGFkZChqLCByLCAnJykpO1xuICB9KTtcbiAgcmV0dXJuIG91dDtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBDb21tb24gc2VjdGlvbnMgYWZ0ZXIgdGhlIHJvbGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5leHBvcnQgY29uc3QgUFJBQ1RJQ0UgPSB7XG4gIGVtcGxveW1lbnQ6IHsgcTogJ1doYXQgaXMgeW91ciBlbXBsb3ltZW50IHN0YXR1cz8nLCBvcHRpb25zOiBbJ0Z1bGwtdGltZScsICdQYXJ0LXRpbWUnLCAnTG9jdW0nLCAnUmV0aXJlZCBidXQgcHJhY3RpY2luZycsICdSZXRpcmVkIGJ1dCBub3QgcHJhY3RpY2luZyddIH0sXG4gIHNlY3RvcjogeyBxOiAnRG8geW91IHdvcmsgaW4gdGhlIHB1YmxpYyBvciBwcml2YXRlIHNlY3Rvcj8nLCBvcHRpb25zOiBbJ1B1YmxpYycsICdQcml2YXRlJywgJ0JvdGgnXSB9LFxuICBmYWNpbGl0eTogeyBxOiAnSW4gd2hhdCB0eXBlIG9mIGZhY2lsaXR5IGRvIHlvdSBwcmltYXJpbHkgd29yaz8nLCBvcHRpb25zOiBbJ0hvc3BpdGFsJywgJ1ByaXZhdGUgQ2xpbmljJywgJ051cnNpbmcgSG9tZScsICdQaGFybWFjeScsICdMYWJvcmF0b3J5JywgJ0NvbW11bml0eSBIZWFsdGggQ2VudGVyJywgJ090aGVyJ10gfSxcbiAgYmVkczogeyBxOiAnV2hhdCBpcyB0aGUgc2l6ZSBvZiB5b3VyIGZhY2lsaXR5IChudW1iZXIgb2YgYmVkcyk/Jywgb3B0aW9uczogWycxXHUyMDEzMjAnLCAnMjFcdTIwMTM1MCcsICc1MVx1MjAxMzEwMCcsICcxMDFcdTIwMTM1MDAnLCAnNTAwKyddIH0sXG4gIHNldHRpbmc6IHsgcTogJ0lzIHlvdXIgcHJhY3RpY2UgaW4gYW4gdXJiYW4sIHNlbWktdXJiYW4gb3IgcnVyYWwgc2V0dGluZz8nLCBvcHRpb25zOiBbJ1VyYmFuJywgJ1NlbWktVXJiYW4nLCAnUnVyYWwnXSB9LFxuICB0ZWFjaGluZzogeyBxOiAnRG8geW91IHdvcmsgaW4gYSB0ZWFjaGluZy9hY2FkZW1pYyBob3NwaXRhbD8nLCBvcHRpb25zOiBZTiB9LFxufTtcblxuZXhwb3J0IGNvbnN0IEVYUEVSSUVOQ0UgPSB7XG4gIHllYXJzOiB7IHE6ICdIb3cgbWFueSB5ZWFycyBoYXZlIHlvdSBiZWVuIHByYWN0aWNpbmcgaW4geW91ciBwcm9mZXNzaW9uPycsIG9wdGlvbnM6IFsnMFx1MjAxMzIgeWVhcnMnLCAnM1x1MjAxMzUgeWVhcnMnLCAnNlx1MjAxMzEwIHllYXJzJywgJzExXHUyMDEzMjAgeWVhcnMnLCAnMjArIHllYXJzJ10gfSxcbiAgcGF0aWVudHM6IHsgcTogJ0hvdyBtYW55IHBhdGllbnRzIGRvIHlvdSB0eXBpY2FsbHkgc2VlIHBlciB3ZWVrPycsIG9wdGlvbnM6IFsnMFx1MjAxMzEwJywgJzExXHUyMDEzMjUnLCAnMjZcdTIwMTM1MCcsICc1MVx1MjAxMzEwMCcsICcxMDArJ10gfSxcbiAgdHJpYWxzOiB7IHE6ICdEbyB5b3UgaGF2ZSBleHBlcmllbmNlIHBhcnRpY2lwYXRpbmcgaW4gY2xpbmljYWwgdHJpYWxzPycsIG9wdGlvbnM6IFlOIH0sXG4gIHRyaWFsc0NvdW50OiB7IHE6ICdIb3cgbWFueSBjbGluaWNhbCB0cmlhbHMgaGF2ZSB5b3UgYmVlbiBpbnZvbHZlZCBpbiBvdmVyIHRoZSBwYXN0IDIgeWVhcnM/Jywgb3B0aW9uczogWycwIC0gNDknLCAnNTAgLSA5OScsICcxMDAgLSAxNDknLCAnMTUwIC0gMjAwJywgJ01vcmUgdGhhbiAyMDAnXSB9LFxufTtcblxuZXhwb3J0IGNvbnN0IElORkxVRU5DRSA9IFtcbiAgeyBrZXk6ICdwdXJjaGFzZXMnLCBxOiAnQXJlIHlvdSBhIGRlY2lzaW9uLW1ha2VyIGZvciBwdXJjaGFzZXMgaW4geW91ciBwcmFjdGljZS9mYWNpbGl0eT8nIH0sXG4gIHsga2V5OiAnZm9ybXVsYXJ5JywgcTogJ0FyZSB5b3UgcGFydCBvZiBhIGRydWcgZm9ybXVsYXJ5IG9yIHByb2N1cmVtZW50IGNvbW1pdHRlZT8nIH0sXG4gIHsga2V5OiAnZGV2aWNlcycsIHE6ICdEbyB5b3UgaGF2ZSBpbmZsdWVuY2Ugb3ZlciBtZWRpY2FsIGRldmljZS9lcXVpcG1lbnQgcHVyY2hhc2luZyBkZWNpc2lvbnM/JyB9LFxuICB7IGtleTogJ3BvbGljeScsIHE6ICdBcmUgeW91IGludm9sdmVkIGluIGhlYWx0aCBwb2xpY3kgb3IgZ3VpZGVsaW5lIGRldmVsb3BtZW50PycgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBESUdJVEFMID0gW1xuICB7IGtleTogJ2VocicsIHE6ICdEbyB5b3UgdXNlIEVsZWN0cm9uaWMgSGVhbHRoIFJlY29yZHMgKEVIUi9FTVIpIGluIHlvdXIgcHJhY3RpY2U/JyB9LFxuICB7IGtleTogJ3RlbGVtZWQnLCBxOiAnRG8geW91IHVzZSB0ZWxlbWVkaWNpbmUgZm9yIHBhdGllbnQgY29uc3VsdGF0aW9ucz8nIH0sXG4gIHsga2V5OiAnZGlnaXRhbEluaXQnLCBxOiAnQXJlIHlvdSBpbnZvbHZlZCBpbiBkaWdpdGFsIGhlYWx0aCBpbml0aWF0aXZlcz8nIH0sXG4gIHsga2V5OiAnb25saW5lT2snLCBxOiAnQXJlIHlvdSBjb21mb3J0YWJsZSBwYXJ0aWNpcGF0aW5nIGluIG9ubGluZSBzdXJ2ZXlzPycgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBBVkFJTEFCSUxJVFkgPSB7XG4gIG1vZGU6IHsgcTogJ0RvIHlvdSBwcmVmZXIgcGFydGljaXBhdGluZyB2aWEgb25saW5lLCB0ZWxlcGhvbmUsIG9yIGZhY2UtdG8tZmFjZSByZXNlYXJjaD8nLCBvcHRpb25zOiBbJ09ubGluZScsICdUZWxlcGhvbmUnLCAnRmFjZS10by1GYWNlJ10gfSxcbiAgZnJlcXVlbmN5OiB7IHE6ICdIb3cgb2Z0ZW4gYXJlIHlvdSB3aWxsaW5nIHRvIHBhcnRpY2lwYXRlIGluIHJlc2VhcmNoPycsIG9wdGlvbnM6IFsnV2Vla2x5JywgJ01vbnRobHknLCAnUXVhcnRlcmx5JywgJ1JhcmVseSddIH0sXG4gIHRpbWU6IHsgcTogJ1doYXQgaXMgeW91ciBwcmVmZXJyZWQgdGltZSBvZiBkYXkgdG8gcGFydGljaXBhdGU/Jywgb3B0aW9uczogWydNb3JuaW5nJywgJ0FmdGVybm9vbicsICdFdmVuaW5nJ10gfSxcbiAgcmVjb250YWN0OiB7IHE6ICdEbyB5b3UgYWdyZWUgdG8gYmUgcmUtY29udGFjdGVkIGZvciBmdXR1cmUgc3R1ZGllcz8nLCBvcHRpb25zOiBZTiB9LFxuICBmb2N1czogeyBxOiAnV291bGQgeW91IHBhcnRpY2lwYXRlIGluIGZvY3VzIGdyb3VwcyBpbiBhZGRpdGlvbiB0byBzdXJ2ZXlzPycsIG9wdGlvbnM6IFlOIH0sXG59O1xuXG5leHBvcnQgY29uc3QgQ0VSVElGSUNBVElPTiA9IHtcbiAgY29uc2VudDogJ0kgY29uc2VudCB0byBteSBjZXJ0aWZpY2F0aW9uIG51bWJlciBiZWluZyB1c2VkIG9ubHkgZm9yIHZlcmlmaWNhdGlvbiBwdXJwb3NlcyBhbmQgc3RvcmVkIHNlY3VyZWx5IGluIGNvbXBsaWFuY2Ugd2l0aCBHRFBSL0hJUEFBL2xvY2FsIGRhdGEgcHJpdmFjeSBsYXdzLicsXG59O1xuXG4vKiogU2hvd3Mgb25seSB0aGUgbGFzdCA0IGNoYXJhY3RlcnMgKHdoYXQgdGhlIHBhbmVsIHRlYW0gc2VlcykuICovXG5leHBvcnQgY29uc3QgbWFza0xpY2VuY2UgPSAodiA9ICcnKSA9PiAodi5sZW5ndGggPD0gNCA/IHYgOiAnXHUyMDIyJy5yZXBlYXQoTWF0aC5taW4odi5sZW5ndGggLSA0LCA4KSkgKyB2LnNsaWNlKC00KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7OztBQUFBO0FBV0EsSUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQ2hGLElBQU0sS0FBSyxDQUFDLE9BQU8sSUFBSTtBQUVoQixJQUFNLFdBQVc7QUFBQSxFQUN0QixVQUFVLEVBQUUsR0FBRywyQ0FBMkMsU0FBUyxHQUFHO0FBQUEsRUFDdEUsV0FBVyxFQUFFLEdBQUcsd0JBQXdCLFNBQVMsR0FBRztBQUFBLEVBQ3BELGVBQWU7QUFDakI7QUFFTyxJQUFNLE9BQU87QUFBQSxFQUNsQixRQUFRLEVBQUUsR0FBRyx3QkFBd0IsU0FBUyxDQUFDLFFBQVEsVUFBVSxPQUFPLEVBQUU7QUFBQSxFQUMxRSxLQUFLLEVBQUUsR0FBRywyQkFBMkIsU0FBUyxDQUFDLFNBQVMsU0FBUyxTQUFTLFNBQVMsS0FBSyxFQUFFO0FBQUEsRUFDMUYsU0FBUyxFQUFFLEdBQUcsZ0NBQWdDLFNBQVMsQ0FBQyxV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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvREE0Q21DO0FBQUEsRUFDN0M7QUFDRjtBQUtBLElBQU0sTUFBTTtBQUFBLEVBQ1YsT0FBTyxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0NBNEJ1QjtBQUFBLEVBQ2hDLE1BQU0sRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBMEhnQjtBQUFBLEVBQ3hCLEtBQUssRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FNMEI7QUFDbkM7QUFLQSxJQUFNLGNBQWM7QUFBQSxFQUNsQix1Q0FBdUMsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1R0FTNEQ7QUFBQSxFQUNyRyxzQ0FBc0MsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FxQkQ7QUFBQSxFQUN2QywwQ0FBMEMsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUkxQjtBQUFBLEVBQ2xCLGdDQUFnQyxFQUFFO0FBQUE7QUFBQTtBQUFBLGlCQUduQjtBQUFBLEVBQ2YsMkNBQTJDLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBS2pDO0FBQUEsRUFDWixrQ0FBa0MsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQU16QjtBQUFBLEVBQ1gsZ0NBQWdDLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFPWjtBQUN4QjtBQUVBLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEIsaUNBQWlDLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNENBMkJPO0FBQUEsRUFDMUMsNkJBQTZCLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBZ0ROO0FBQzNCO0FBRUEsSUFBTSxlQUFlO0FBQUEsRUFDbkIsMkJBQTJCLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQVFiO0FBQUEsRUFDaEIsaUNBQWlDLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFJVjtBQUFBLEVBQ3pCLHFCQUFxQixFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUtYO0FBQUEsRUFDWix3QkFBd0IsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBS0o7QUFBQSxFQUN0QixvQkFBb0IsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUlTO0FBQUEsRUFDL0IsNkJBQTZCLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQ0FPVTtBQUFBLEVBQ3pDLDhCQUE4QixFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3REEwQnNCO0FBQ3hEO0FBU08sSUFBTSxRQUFRO0FBQUEsRUFDbkIsRUFBRSxJQUFJLGNBQWMsT0FBTyx5QkFBeUIsTUFBTSxhQUFhLE9BQU8sV0FBVyxNQUFNLFFBQVEsTUFBTSxFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEJBK0JuRixFQUFFO0FBQUEsRUFDOUIsRUFBRSxJQUFJLFdBQVcsT0FBTyxnQ0FBZ0MsTUFBTSxlQUFlLE9BQU8sV0FBVyxNQUFNLGFBQWEsV0FBVyxxQ0FBcUMsT0FBTyxZQUFZO0FBQUEsRUFDckwsRUFBRSxJQUFJLFlBQVksT0FBTyxZQUFZLE1BQU0sV0FBVyxPQUFPLFdBQVcsTUFBTSxRQUFRLE1BQU0sRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FnQ2xGLEVBQUU7QUFBQSxFQUNkLEVBQUUsSUFBSSxVQUFVLE9BQU8sd0JBQXdCLE1BQU0sU0FBUyxPQUFPLFdBQVcsTUFBTSxRQUFRLE1BQU0sRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFXekYsRUFBRTtBQUFBLEVBQ2YsRUFBRSxJQUFJLFdBQVcsT0FBTyx1QkFBdUIsTUFBTSxTQUFTLE9BQU8sV0FBVyxNQUFNLGFBQWEsV0FBVyxxQ0FBcUMsT0FBTyxXQUFXO0FBQUEsRUFDckssRUFBRSxJQUFJLFlBQVksT0FBTywwQkFBMEIsTUFBTSxRQUFRLE9BQU8sV0FBVyxNQUFNLFFBQVEsV0FBVyxzQ0FBc0MsT0FBTyxlQUFlO0FBQUEsRUFDeEssRUFBRSxJQUFJLE9BQU8sT0FBTyx5Q0FBeUMsTUFBTSxjQUFjLE9BQU8sV0FBVyxNQUFNLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDdkgsRUFBRSxJQUFJLFVBQVUsT0FBTywrQkFBK0IsTUFBTSxTQUFTLE9BQU8sV0FBVyxNQUFNLGFBQWEsV0FBVyxxQ0FBcUMsT0FBTyxZQUFZO0FBQUEsRUFDN0ssRUFBRSxJQUFJLFdBQVcsT0FBTyxtQ0FBbUMsTUFBTSxXQUFXLE9BQU8sV0FBVyxNQUFNLGFBQWEsV0FBVyxxQ0FBcUMsT0FBTyxjQUFjO0FBQUEsRUFDdEwsRUFBRSxJQUFJLFdBQVcsT0FBTyw2QkFBNkIsTUFBTSxTQUFTLE9BQU8sV0FBVyxNQUFNLGFBQWEsV0FBVyxxQ0FBcUMsT0FBTyxhQUFhO0FBQy9LO0FBRU8sSUFBTSxXQUFXLENBQUMsT0FBTyxNQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBR3RELFNBQVMsU0FBUyxNQUFNO0FBQzdCLFFBQU0sTUFBTSxvQkFBSSxJQUFJO0FBQ3BCLE1BQUksS0FBSyxTQUFTLE9BQVEsTUFBSyxLQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUM7QUFDN0QsTUFBSSxLQUFLLFNBQVMsWUFBYSxRQUFPLE9BQU8sS0FBSyxLQUFLLEVBQUUsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEcsTUFBSSxLQUFLLFNBQVMsT0FBUSxRQUFPLE9BQU8sS0FBSyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNwRyxNQUFJLEtBQUssU0FBUyxNQUFPLE1BQUssS0FBSyxRQUFRLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQzVELFNBQU8sSUFBSTtBQUNiO0FBR08sU0FBUyxVQUFVO0FBQ3hCLFFBQU0sTUFBTSxDQUFDO0FBQ2IsUUFBTSxPQUFPLG9CQUFJLElBQUk7QUFDckIsUUFBTSxNQUFNLENBQUMsR0FBRyxNQUFNLFVBQVU7QUFBRSxVQUFNLElBQUksS0FBSyxLQUFLO0FBQUcsUUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUc7QUFBRSxXQUFLLElBQUksQ0FBQztBQUFHLFVBQUksS0FBSyxFQUFFLEdBQUcsR0FBRyxNQUFNLEtBQUssSUFBSSxXQUFXLEtBQUssT0FBTyxNQUFNLENBQUM7QUFBQSxJQUFHO0FBQUEsRUFBRTtBQUM3SixRQUFNLFFBQVEsQ0FBQyxNQUFNO0FBQ25CLFFBQUksRUFBRSxTQUFTLE9BQVEsR0FBRSxLQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUMxRCxRQUFJLEVBQUUsU0FBUyxZQUFhLFFBQU8sUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3hHLFFBQUksRUFBRSxTQUFTLE9BQVEsUUFBTyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RyxRQUFJLEVBQUUsU0FBUyxNQUFPLEdBQUUsS0FBSyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFBQSxFQUMzRCxDQUFDO0FBQ0QsU0FBTztBQUNUO0FBS08sSUFBTSxXQUFXO0FBQUEsRUFDdEIsWUFBWSxFQUFFLEdBQUcsbUNBQW1DLFNBQVMsQ0FBQyxhQUFhLGFBQWEsU0FBUywwQkFBMEIsNEJBQTRCLEVBQUU7QUFBQSxFQUN6SixRQUFRLEVBQUUsR0FBRyxnREFBZ0QsU0FBUyxDQUFDLFVBQVUsV0FBVyxNQUFNLEVBQUU7QUFBQSxFQUNwRyxVQUFVLEVBQUUsR0FBRyxtREFBbUQsU0FBUyxDQUFDLFlBQVksa0JBQWtCLGdCQUFnQixZQUFZLGNBQWMsMkJBQTJCLE9BQU8sRUFBRTtBQUFBLEVBQ3hMLE1BQU0sRUFBRSxHQUFHLHVEQUF1RCxTQUFTLENBQUMsYUFBUSxjQUFTLGVBQVUsZ0JBQVcsTUFBTSxFQUFFO0FBQUEsRUFDMUgsU0FBUyxFQUFFLEdBQUcsOERBQThELFNBQVMsQ0FBQyxTQUFTLGNBQWMsT0FBTyxFQUFFO0FBQUEsRUFDdEgsVUFBVSxFQUFFLEdBQUcsZ0RBQWdELFNBQVMsR0FBRztBQUM3RTtBQUVPLElBQU0sYUFBYTtBQUFBLEVBQ3hCLE9BQU8sRUFBRSxHQUFHLCtEQUErRCxTQUFTLENBQUMsa0JBQWEsa0JBQWEsbUJBQWMsb0JBQWUsV0FBVyxFQUFFO0FBQUEsRUFDekosVUFBVSxFQUFFLEdBQUcsb0RBQW9ELFNBQVMsQ0FBQyxhQUFRLGNBQVMsY0FBUyxlQUFVLE1BQU0sRUFBRTtBQUFBLEVBQ3pILFFBQVEsRUFBRSxHQUFHLDREQUE0RCxTQUFTLEdBQUc7QUFBQSxFQUNyRixhQUFhLEVBQUUsR0FBRyw2RUFBNkUsU0FBUyxDQUFDLFVBQVUsV0FBVyxhQUFhLGFBQWEsZUFBZSxFQUFFO0FBQzNLO0FBRU8sSUFBTSxZQUFZO0FBQUEsRUFDdkIsRUFBRSxLQUFLLGFBQWEsR0FBRyxvRUFBb0U7QUFBQSxFQUMzRixFQUFFLEtBQUssYUFBYSxHQUFHLDZEQUE2RDtBQUFBLEVBQ3BGLEVBQUUsS0FBSyxXQUFXLEdBQUcsNEVBQTRFO0FBQUEsRUFDakcsRUFBRSxLQUFLLFVBQVUsR0FBRyw4REFBOEQ7QUFDcEY7QUFFTyxJQUFNLFVBQVU7QUFBQSxFQUNyQixFQUFFLEtBQUssT0FBTyxHQUFHLG1FQUFtRTtBQUFBLEVBQ3BGLEVBQUUsS0FBSyxXQUFXLEdBQUcscURBQXFEO0FBQUEsRUFDMUUsRUFBRSxLQUFLLGVBQWUsR0FBRyxrREFBa0Q7QUFBQSxFQUMzRSxFQUFFLEtBQUssWUFBWSxHQUFHLHVEQUF1RDtBQUMvRTtBQUVPLElBQU0sZUFBZTtBQUFBLEVBQzFCLE1BQU0sRUFBRSxHQUFHLGdGQUFnRixTQUFTLENBQUMsVUFBVSxhQUFhLGNBQWMsRUFBRTtBQUFBLEVBQzVJLFdBQVcsRUFBRSxHQUFHLHlEQUF5RCxTQUFTLENBQUMsVUFBVSxXQUFXLGFBQWEsUUFBUSxFQUFFO0FBQUEsRUFDL0gsTUFBTSxFQUFFLEdBQUcsc0RBQXNELFNBQVMsQ0FBQyxXQUFXLGFBQWEsU0FBUyxFQUFFO0FBQUEsRUFDOUcsV0FBVyxFQUFFLEdBQUcsdURBQXVELFNBQVMsR0FBRztBQUFBLEVBQ25GLE9BQU8sRUFBRSxHQUFHLGlFQUFpRSxTQUFTLEdBQUc7QUFDM0Y7QUFFTyxJQUFNLGdCQUFnQjtBQUFBLEVBQzNCLFNBQVM7QUFDWDtBQUdPLElBQU0sY0FBYyxDQUFDLElBQUksT0FBUSxFQUFFLFVBQVUsSUFBSSxJQUFJLFNBQUksT0FBTyxLQUFLLElBQUksRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
