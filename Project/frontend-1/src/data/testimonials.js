// Member testimonials supplied by the MyHealthOpinions team.
// Before launch, confirm each quote is authentic and that the person consented to publication
// (the source document notes the patient entries must only be published with informed consent).
export const AUDIENCES = [
  { id: 'doctors', label: 'Doctors & specialists', color: '#2457f5' },
  { id: 'nurses', label: 'Nurses', color: '#5b3df5' },
  { id: 'allied', label: 'Allied health', color: '#8a4dff' },
  { id: 'caregivers', label: 'Caregivers', color: '#ff6a2c' },
  { id: 'patients', label: 'Patients', color: '#00a88a' },
];

const T = (name, country, cc, role, rating, quote, audience) => ({ name, country, cc, role, rating, quote, audience });

export const TESTIMONIALS = [
  T('Dr. Arjun Malhotra', 'India', 'in', 'General Physician', 5, 'My Health Opinion offers an interesting opportunity for healthcare professionals to share their clinical perspectives. I value the idea of contributing to research that explores healthcare practices and patient needs.', 'doctors'),
  T('Dr. Emily Carter', 'United States', 'us', 'Cardiologist', 4, 'A dedicated healthcare research panel can provide a useful way to share professional opinions beyond everyday clinical responsibilities. Clear study requirements and transparent incentives are important.', 'doctors'),
  T('Dr. Oliver Bennett', 'United Kingdom', 'gb', 'General Surgeon', 5, 'I am interested in research that captures the perspectives of medical practitioners. My Health Opinion has a relevant concept for connecting healthcare expertise with research initiatives.', 'doctors'),
  T('Dr. Chiamaka Okafor', 'Nigeria', 'ng', 'Pediatrician', 4, 'Healthcare research benefits from diverse clinical perspectives. I would be interested in participating in relevant studies focused on child health, clinical experiences, and patient care.', 'doctors'),
  T('Dr. Gabriel Oliveira', 'Brazil', 'br', 'Dermatologist', 5, 'The opportunity to contribute specialist opinions to healthcare research is appealing. I appreciate the concept of a panel that recognizes the perspectives of professionals across medical specialties.', 'doctors'),
  T('Dr. Olivia Mitchell', 'Australia', 'au', 'Psychiatrist', 4, 'Research that considers mental health services and patient experiences is important. A healthcare panel can create opportunities for professionals to contribute informed perspectives on these topics.', 'doctors'),
  T('Priya Nair', 'India', 'in', 'Registered Nurse', 5, 'Nurses have firsthand experience with patient care and everyday hospital challenges. I like the idea of sharing these perspectives through a dedicated healthcare research platform.', 'nurses'),
  T('Miguel Reyes', 'Philippines', 'ph', 'Emergency Department Nurse', 4, 'A panel designed for healthcare workers could make it easier to contribute views on clinical workflows and patient needs. Flexible participation is especially relevant to professionals working shifts.', 'nurses'),
  T('Wanjiku Mwangi', 'Kenya', 'ke', 'Community Health Nurse', 5, 'Community healthcare offers important insights into access, prevention, and patient education. I find the concept of contributing those experiences to research worthwhile.', 'nurses'),
  T('Lukas Schneider', 'Germany', 'de', 'Intensive Care Unit Nurse', 4, 'I am interested in research concerning patient safety, clinical equipment, and care delivery. Transparent participation criteria and a straightforward survey process would make the experience more convenient.', 'nurses'),
  T('Naledi Mokoena', 'South Africa', 'za', 'Oncology Nurse', 5, 'The perspectives of nurses working in specialized departments can add value to healthcare research. I would welcome opportunities to share insights about patient support and treatment experiences.', 'nurses'),
  T('Sophie Tremblay', 'Canada', 'ca', 'Physiotherapist', 5, 'Rehabilitation professionals have a distinct perspective on recovery and functional outcomes. A healthcare research panel is an interesting way to contribute knowledge from this area of practice.', 'allied'),
  T('Kenji Tanaka', 'Japan', 'jp', 'Clinical Pharmacist', 4, 'I am interested in research concerning medication management, pharmaceutical services, and healthcare technology. Opportunities relevant to my specialty would be particularly valuable.', 'allied'),
  T('Camille Laurent', 'France', 'fr', 'Clinical Psychologist', 5, 'I appreciate research initiatives that explore mental wellbeing and patient experiences. Including different professional disciplines can help researchers understand healthcare from multiple perspectives.', 'allied'),
  T('Alejandro García', 'Mexico', 'mx', 'Medical Laboratory Scientist', 4, 'Laboratory professionals contribute to important diagnostic processes, even when they have limited direct patient interaction. Research that recognizes these roles is particularly relevant to me.', 'allied'),
  T('Femke de Jong', 'Netherlands', 'nl', 'Registered Dietitian', 5, 'Nutrition research can benefit from professional perspectives on dietary behaviour and patient education. I would be interested in relevant surveys that respect my time and expertise.', 'allied'),
  T('Daniel Lim', 'Singapore', 'sg', 'Diagnostic Radiographer', 4, 'A dedicated panel can help researchers hear from professionals across diagnostic services. I would value studies focused on imaging equipment, workflow efficiency, and patient experience.', 'allied'),
  T('Akosua Mensah', 'Ghana', 'gh', 'Occupational Therapist', 5, 'Occupational therapy brings a valuable perspective to rehabilitation and independent living. I like the idea of contributing professional insights to research that considers different care needs.', 'allied'),
  T('Sunita Verma', 'India', 'in', 'Family Caregiver', 5, 'Family caregivers understand the practical challenges of supporting a loved one. A platform that invites caregiver perspectives can help bring everyday care experiences into healthcare research.', 'caregivers'),
  T("Sean O'Connor", 'Ireland', 'ie', 'Home Care Support Worker', 4, 'People working in home care see how healthcare needs continue outside clinical settings. I would welcome relevant studies that consider the realities of daily support and care coordination.', 'caregivers'),
  T('Grace Thompson', 'Australia', 'au', 'Aged Care Support Worker', 5, 'Aged care requires patience, communication, and an understanding of individual needs. Research that includes care support workers can capture practical insights from day-to-day experience.', 'caregivers'),
  T('Roberto Silva', 'Brazil', 'br', 'Family Care Support', 4, 'Supporting a family member involves understanding care routines, communication, and access to services. I appreciate the concept of giving family supporters a voice in healthcare research.', 'caregivers'),
  T('Angela Bautista', 'Philippines', 'ph', 'Home Health Aide', 5, 'Home-based support brings different challenges from hospital care. Research opportunities that include home health workers could help represent these experiences more effectively.', 'caregivers'),
  T('Hannah Wilson', 'United Kingdom', 'gb', 'Patient Panel Member', 5, 'Patients should have opportunities to share their experiences and preferences. I find the concept of a healthcare panel that considers patient perspectives important.', 'patients'),
  T('Michael Johnson', 'United States', 'us', 'Patient Advocate', 4, 'Patient feedback can help researchers better understand how healthcare services are experienced. I would value clear information about survey participation, privacy, and reward eligibility.', 'patients'),
  T('Lerato Dlamini', 'South Africa', 'za', 'Patient Community Participant', 5, 'Giving people an opportunity to express their views about healthcare can be valuable. I appreciate platforms that aim to include a range of experiences rather than focusing on a single perspective.', 'patients'),
  T('David Chen', 'Canada', 'ca', 'Patient Research Participant', 4, 'Healthcare research should consider how people navigate services and communicate with providers. A straightforward participation process and transparent privacy information would be important to me.', 'patients'),
  T('Aisha Bello', 'Nigeria', 'ng', 'Patient and Family Support Participant', 5, 'Patients and families can offer perspectives that complement clinical expertise. I like the idea of research that listens to people who interact with healthcare services directly.', 'patients'),
  T('Keiko Sato', 'Japan', 'jp', 'Patient Experience Contributor', 4, 'I am interested in opportunities to provide feedback on healthcare communication and service accessibility. It is important that research participation is explained clearly and handled respectfully.', 'patients'),
  T('Mariam Al-Mansoori', 'United Arab Emirates', 'ae', 'Patient Community Member', 5, 'Healthcare research benefits when patient voices are included alongside those of medical professionals. A panel that values different viewpoints has the potential to support more patient-centred research.', 'patients'),
];

// Score summary of the published reviews above (used by the About menu and the Ratings & Reviews page).
// Computed from the data, never typed in by hand.
const n = TESTIMONIALS.length;
const sum = TESTIMONIALS.reduce((a, t) => a + t.rating, 0);
export const RATING = {
  count: n,
  average: n ? Math.round((sum / n) * 10) / 10 : 0,
  exact: n ? sum / n : 0,
  dist: [5, 4, 3, 2, 1].map((s) => ({ stars: s, n: TESTIMONIALS.filter((t) => t.rating === s).length })),
  countries: [...new Set(TESTIMONIALS.map((t) => t.country))].length,
};
