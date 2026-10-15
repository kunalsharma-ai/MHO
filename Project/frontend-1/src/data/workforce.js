// The healthcare workforce we recruit, floor by floor (home page "hospital lift" section).
// Counts are the distinct job titles in the professional profiling questionnaire (src/data/hcpProfile.js)
// — re-run the count if that file changes. `core` lists the original 25 professional categories from the
// old website so every one of them still appears. Caregivers have their own "house" next to the hospital.
export const FLOORS = [
  { id: 'management', floor: 10, label: 'Leadership & management', icon: 'briefcase', color: '#7c3aed', titles: 32,
    core: ['Top Level Management', 'Personnel Department', 'Purchasing Department'],
    roles: ['Hospital CEO', 'Chief Medical Officer', 'Chief Nursing Officer', 'Director of Clinical Operations', 'Director of Quality & Compliance', 'District Health Officer', 'VP – Patient Services'] },
  { id: 'doctors', floor: 9, label: 'Doctors & physicians', icon: 'stethoscope', color: '#2457f5', titles: 281, extra: '33 specialties',
    core: ['Medical Specialist', 'Clinical Specialist'],
    roles: ['General Practitioners', 'Cardiologists', 'Oncologists', 'Neurologists', 'Endocrinologists', 'Paediatricians', 'Psychiatrists', 'Dermatologists', 'Radiologists', 'Anaesthesiologists', 'Emergency physicians', 'Pathologists'] },
  { id: 'surgeons', floor: 8, label: 'Surgeons & operation theatre', icon: 'scalpel', color: '#0ea5e9', titles: 33,
    core: ['Operation Theatre Complex', 'Central Sterile Supply Department'],
    roles: ['General surgeons', 'Cardiothoracic surgeons', 'Neurosurgeons', 'Orthopaedic surgeons', 'Robotic & laparoscopic surgeons', 'Transplant surgeons', 'Surgical residents'] },
  { id: 'nursing', floor: 7, label: 'Nursing & midwifery', icon: 'nurse', color: '#ec4899', titles: 443, extra: '34 specialties',
    core: ['Nursing Specialist', 'Nurse Practitioner', 'Licensed Practical Nurse', 'Nursing Assistant'],
    roles: ['ICU & critical care nurses', 'Oncology nurses', 'Midwives', 'Dialysis nurses', 'Diabetes nurse specialists', 'Theatre & scrub nurses', 'Community nurses'] },
  { id: 'pharmacy', floor: 6, label: 'Pharmacy', icon: 'pill', color: '#10b981', titles: 278, extra: '8 key areas',
    core: ['Pharmacy Department'],
    roles: ['Clinical pharmacists', 'Hospital pharmacists', 'Community pharmacists', 'Oncology pharmacists', 'Regulatory & pharmacovigilance', 'Medical science liaisons', 'Pharmacy technicians'] },
  { id: 'lab', floor: 5, label: 'Laboratory & diagnostics', icon: 'microscope', color: '#f59e0b', titles: 123,
    core: ['Radiology Department', 'Blood Circulation', 'Technical Specialist'],
    roles: ['Medical lab scientists', 'Radiographers & MRI technologists', 'Sonographers', 'Phlebotomists', 'Blood bank technologists', 'Genomics & NGS technologists', 'Lab directors'] },
  { id: 'allied', floor: 4, label: 'Allied health & rehabilitation', icon: 'pulse', color: '#ef4444', titles: 61,
    core: ['Therapist', 'Physical Medicine & Rehabilitation', 'Paramedical Specialist', 'Dietary Specialist'],
    roles: ['Physiotherapists', 'Occupational therapists', 'Speech & language therapists', 'Dietitians', 'Respiratory therapists', 'Paramedics', 'Psychologists & counsellors'] },
  { id: 'dental', floor: 3, label: 'Dental care', icon: 'tooth', color: '#06b6d4', titles: 12,
    core: [],
    roles: ['General dentists', 'Orthodontists', 'Periodontists', 'Endodontists', 'Oral & maxillofacial surgeons', 'Paediatric dentists', 'Implantologists'] },
  { id: 'itadmin', floor: 2, label: 'Health IT, admin & records', icon: 'monitor', color: '#6366f1', titles: 77,
    core: ['Medical Record Department', 'Non-Medical Specialist'],
    roles: ['EHR / EMR specialists', 'Clinical coders', 'Health data analysts', 'Hospital administrators', 'Practice managers', 'Revenue cycle managers', 'Health IT directors'] },
  { id: 'support', floor: 1, label: 'Support, facilities & ambulance', icon: 'ambulance', color: '#64748b', titles: 66,
    core: ['Maintenance Department', 'Security Department', 'Non Professional Services', 'Support Specialist'],
    roles: ['Front office & reception', 'Patient services', 'Medical billing', 'Hospital stores & logistics', 'Housekeeping supervisors', 'Ambulance & EMS teams', 'Dispatchers'] },
];

export const CAREGIVER_HOUSE = {
  id: 'caregivers', label: 'Caregivers at home', icon: 'hands', color: '#ff7a1a',
  roles: ['Family caregivers', 'Adult children caring for parents', 'Spouses & partners', 'Parents of children with health needs', 'Dementia caregivers', 'Cancer caregivers', 'Disability support carers', 'Long-distance caregivers', 'Home care aides', 'Live-in carers', 'Hospice & respite volunteers', 'Foster & kinship carers', 'Young adult carers', 'Mental health caregivers'],
};

export const TOTAL_TITLES = FLOORS.reduce((n, f) => n + f.titles, 0);
