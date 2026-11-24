
import { optionEmoji, applySequence, QUESTION_EMOJI } from './emoji.js';
import { DROP_2026, DUPLICATE_OF, patchOptions, patchFlags } from './questions-2026.js';

export default function build({ PROFILES, QUESTIONS, OPTIONS }) {
const files = {};



const report = { fixedParents: [], unmatchedParentValues: [], droppedQuestions: [], labelFixes: [], optionFixes: [], notes: [] };
const clean = (s) => String(s ?? '').replace(/Â | /g, ' ').replace(/\s+/g, ' ').trim();
const norm = (s) => clean(s).toLowerCase();
const slug = (l) => l.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');


const PROFILE_META = [
  { id: 'basic', source: 'basic profile', chapter: 'you', title: 'About You', emoji: '🪪', palette: ['#0B6E99', '#38BDF8', '#D8F3FF'], pattern: 'dots', flavor: 'Sky Lagoon', celebration: 'confetti', blurb: 'Who you are and where you live' },
  { id: 'general-health', source: 'general health profile', chapter: 'you', title: 'General Health', emoji: '🌤️', palette: ['#C2410C', '#FBBF24', '#FFEDD5'], pattern: 'rays', flavor: 'Morning Sun', celebration: 'sunburst', blurb: 'How you feel and how long you have lived with your condition' },
  { id: 'conditions', source: 'medical condition profile', chapter: 'you', title: 'Medical Conditions', emoji: '🩺', palette: ['#1E40AF', '#60A5FA', '#DBEAFE'], pattern: 'cells', flavor: 'Ocean Indigo', celebration: 'molecules', blurb: 'Conditions you have been diagnosed with' },
  { id: 'symptoms', source: 'symptoms and severity', chapter: 'you', title: 'Symptoms & Severity', emoji: '🌡️', palette: ['#B91C1C', '#F97316', '#FFE4D6'], pattern: 'waves', flavor: 'Ember Glow', celebration: 'ripple', blurb: 'How your condition affects daily life' },
  { id: 'personal-health', source: 'personal health profile', chapter: 'health', title: 'Personal Health', emoji: '❤️‍🩹', palette: ['#BE123C', '#FB7185', '#FFE4E6'], pattern: 'ecg', flavor: 'Coral Pulse', celebration: 'heartbeat', blurb: 'Chronic conditions in a little more detail' },
  { id: 'treatment', source: 'treatment profile', chapter: 'health', title: 'Treatment', emoji: '💉', palette: ['#86198F', '#E879F9', '#FAE8FF'], pattern: 'capsules', flavor: 'Orchid Bloom', celebration: 'butterflies', blurb: 'The treatments you use and how well they work for you' },
  { id: 'medication', source: 'medication and pharmacy behaviour', chapter: 'health', title: 'Medication & Pharmacy', emoji: '💊', palette: ['#C2410C', '#F43F5E', '#FFE4E6'], pattern: 'pills', flavor: 'Pill Pop', celebration: 'pills', blurb: 'Where you get your medicines and how you manage them' },
  { id: 'providers', source: 'healthcare provider profile', chapter: 'health', title: 'Healthcare Providers', emoji: '👩‍⚕️', palette: ['#047857', '#34D399', '#D1FAE5'], pattern: 'cross', flavor: 'Clinic Mint', celebration: 'crosses', blurb: 'Who looks after your health, and where' },
  { id: 'diagnostics', source: 'diagnostic testing', chapter: 'health', title: 'Diagnostic Testing', emoji: '🔬', palette: ['#155E75', '#22D3EE', '#CFFAFE'], pattern: 'hex', flavor: 'Lab Cyan', celebration: 'bubbles', blurb: 'Tests and monitoring for your condition' },
  { id: 'devices', source: 'medical devices and digital health', chapter: 'health', title: 'Medical Devices & Apps', emoji: '⌚', palette: ['#1E3A8A', '#84CC16', '#ECFCCB'], pattern: 'circuit', flavor: 'Midnight Lime', celebration: 'comets', blurb: 'Monitors, wearables and health apps' },
  { id: 'hospital', source: 'hospital and healthcare utilisation', chapter: 'health', title: 'Hospital Visits', emoji: '🏥', palette: ['#9F1239', '#FDA4AF', '#FFF1F2'], pattern: 'grid', flavor: 'Rose Quartz', celebration: 'lanterns', blurb: 'Hospital and doctor visits in the past year' },
  { id: 'insurance', source: 'health insurance and healthcare payment', chapter: 'health', title: 'Insurance & Costs', emoji: '🛡️', palette: ['#1D4ED8', '#818CF8', '#E0E7FF'], pattern: 'shield', flavor: 'Sapphire Shield', celebration: 'shield', blurb: 'Health cover and paying for care' },
  { id: 'lifestyle', source: 'lifestyle and behaviour', chapter: 'health', title: 'Lifestyle & Habits', emoji: '🧘', palette: ['#0F766E', '#FACC15', '#FEF9C3'], pattern: 'leaves', flavor: 'Lotus Lime', celebration: 'petals', blurb: 'Activity, diet, sleep and everyday habits' },
  { id: 'food', source: 'food and lifestyle profile', chapter: 'health', title: 'Food, Drink & Fitness', emoji: '🥗', palette: ['#15803D', '#A3E635', '#ECFCCB'], pattern: 'fruit', flavor: 'Garden Fresh', celebration: 'fruit', blurb: 'What you eat and drink, and how you stay active' },
  { id: 'decisions', source: 'patient experience and treatment decisions', chapter: 'health', title: 'Treatment Decisions', emoji: '⚖️', palette: ['#A16207', '#F59E0B', '#FEF3C7'], pattern: 'diamonds', flavor: 'Amber Gold', celebration: 'stars', blurb: 'How you choose treatments and how confident you feel' },
  { id: 'info', source: 'health information and online behaviour', chapter: 'health', title: 'Health Information', emoji: '🔎', palette: ['#0369A1', '#06B6D4', '#E0F2FE'], pattern: 'rings', flavor: 'Electric Blue', celebration: 'sparkles', blurb: 'Where you look for health information' },
  { id: 'digital', source: 'technology and digital health profile', chapter: 'health', title: 'Technology & Digital Health', emoji: '📱', palette: ['#6D28D9', '#D946EF', '#F5D0FE'], pattern: 'pixels', flavor: 'Neon Violet', celebration: 'pixels', blurb: 'Devices and digital health services you use' },
  { id: 'education', source: 'educational profile', chapter: 'you', title: 'Education', emoji: '🎓', palette: ['#4C1D95', '#A78BFA', '#EDE9FE'], pattern: 'grid', flavor: 'Lilac Scholar', celebration: 'caps', blurb: 'Your highest qualification' },
  { id: 'work', source: 'professional profile', chapter: 'you', title: 'Work & Profession', emoji: '💼', palette: ['#334155', '#14B8A6', '#CCFBF1'], pattern: 'plus', flavor: 'Graphite Teal', celebration: 'fireworks', blurb: 'Your job, industry and organization' },
  { id: 'research', source: 'clinical research and market research experience', chapter: 'research', title: 'Research Experience', emoji: '🧪', palette: ['#5B21B6', '#8B5CF6', '#EDE9FE'], pattern: 'molecule', flavor: 'Lab Violet', celebration: 'dna', blurb: 'Market research and clinical trials you have joined' },
  { id: 'eligibility', source: 'patient recruitment eligibility', chapter: 'research', title: 'Study Eligibility', emoji: '🎯', palette: ['#065F46', '#10B981', '#D1FAE5'], pattern: 'target', flavor: 'Emerald Target', celebration: 'target', blurb: 'Help us match you with the right studies' },
  { id: 'verification', source: 'documentation and verification', chapter: 'research', title: 'Verification', emoji: '📄', palette: ['#3730A3', '#6366F1', '#E0E7FF'], pattern: 'lines', flavor: 'Ink Indigo', celebration: 'stamp', blurb: 'How you could confirm a diagnosis if a study needs it' },
  { id: 'survey', source: 'survey participation and reward preferences profile', chapter: 'health', title: 'Survey Preferences', emoji: '🎁', palette: ['#BE185D', '#F472B6', '#FCE7F3'], pattern: 'confetti', flavor: 'Gift Magenta', celebration: 'balloons', blurb: 'How you like to take part and be rewarded' },
  { id: 'social', source: 'social media and reward reclaim', chapter: 'health', title: 'Social Media & Payouts', emoji: '💳', palette: ['#00695C', '#12B5CB', '#CBF3F2'], pattern: 'coins', flavor: 'Jade Wallet', celebration: 'coins', blurb: 'Where to reach you and how to pay you' },
  { id: 'additional', source: null, chapter: 'extra', title: 'Additional Details', emoji: '✨', palette: ['#26287A', '#7C4DFF', '#FFC9F2'], pattern: 'stars', flavor: 'Galaxy Indigo', celebration: 'rocket', blurb: 'Help us understand you and your health even better' },
];
for (const m of PROFILE_META) m.icon = m.id + '.svg';
// chapters are shown in this order: About you → Your health story → Research & studies → Additional Details
const CHAPTER_ORDER = ['you', 'health', 'research', 'extra'];
PROFILE_META.sort((a, b) => CHAPTER_ORDER.indexOf(a.chapter) - CHAPTER_ORDER.indexOf(b.chapter));


const PARENT_FIXES = {
  exercises: 'do-exercise', // options filter on "Yes" but no parent was declared
  'obesity-treatment-category': 'obesity-mesures', // declared parent "obesity-severity" has no "Yes" answer
  'anidra-treatment-category': 'anidra-treatment-status', // typo "anidra-tratment-status"
  'organization-revenue': 'country', // declared "country_of_practice" does not exist; options are filtered by country code
  'employment-jobrole': 'department', // no parent declared; options are filtered by department
};

const GATES = {
  'organization-revenue': [{ q: 'employment-status', in: ['fulltime', 'parttime', 'Self-fulltime', 'Self-parttime', 'Temporary-or-seasonal', 'Government-employee'] }],
  'lense-type': [{ q: 'vision-condition-treatment-category', in: ['Glasses / Contact Lenses'] }],
  'lense-brand': [{ q: 'vision-condition-treatment-category', in: ['Glasses / Contact Lenses'] }, { q: 'lense-type', notIn: ['glasses-only'] }],
  'hearing-device': [{ q: 'vision-condition-treatment-category', in: ['Hearing Aids / Cochlear Implants'] }],
  'hearing-device-brand': [{ q: 'vision-condition-treatment-category', in: ['Hearing Aids / Cochlear Implants'] }],
  'hiv-test-result': [{ q: 'hiv-test', in: ['Yes'] }],
};
const DROP = new Set(['other-specify']);
const LABEL_FIXES = {
  // the two asthma labels were swapped in the export (options did not match the question)
  'asthma-diagnosis': 'Are you currently taking any medication for asthma?',
  'asthma-severity': 'How would you describe the severity of your asthma?',
  'anidra-category': 'Which type of sleep apnea have you been diagnosed with?',
  'anidra-age': 'How long have you had sleep apnea?',
  'anidra-severity': 'How severe is your sleep apnea?',
  'anidra-treatment-status': 'Are you currently undergoing treatment for sleep apnea?',
  'vision-condition-treatment-category': 'Which treatments or aids do you use for your vision or hearing impairment?',
  'hearing-device': 'Which hearing device do you use?',
  'hiv-age': 'When were you diagnosed with HIV?',
  'obesity-age': 'How long ago were you diagnosed with obesity?',
  'cholesterol-type': 'Which type of cholesterol problem were you diagnosed with?',
  'cancer-category': 'What type of cancer have you been diagnosed with? (Select all that apply)',
  'neuro-sevirity': 'How severe is your neurological condition?',
  'neuro-condition': 'Which neurological condition do you have?',
  'stomach-condition': 'Which digestive, kidney or urinary condition do you have?',
  'blood-condition': 'Which autoimmune or blood condition do you have?',
  'spine-condition': 'Which bone, muscle or spine condition do you have?',
  'sex-condition': 'Which men’s or women’s health condition do you have?',
  'skin-condition': 'Which skin condition do you have?',
  'doctor-visit-category': 'Which type of doctor do you visit most often?',
  'health-insurance-type': 'What type of health insurance do you have?',
  'covid-vaccine': 'Are you up to date with your vaccinations (e.g. flu, COVID-19)?',
  'chronic-conditions': 'Have you been diagnosed with any of these chronic conditions? (Select all that apply)',
  'employment-status': 'What is your current employment status?',
  'jobseeker-patient': 'Are you currently looking for a job?',
  'availing-pension': 'Are you currently receiving a pension?',
  industry: 'Which industry do you work in?',
  'patient-sector': 'Which sector do you work in?',
  department: 'Which department do you work in?',
  'employment-jobrole': 'What is your job title?',
  'organization-revenue': 'What is your organization’s approximate annual revenue (in local currency)?',
  'patient-orgoverseas': 'How many branches does your organization have abroad?',
  'patient-orgsize': 'How many people does your organization employ (all branches)?',
  hw: 'Which roles do you play in running your home?',
  'experience-patient': 'Approximately how much experience do you have in your current role?',
  'orgdecision-patient': 'Which statement best describes your involvement in decision-making at your organization?',
  'freelancer-patient': 'Which best describes your freelance work?',
  'survey-participation-frequency': 'How often do you participate in surveys?',
  'survey-participation-category': 'What types of survey have you taken part in before?',
  'survey-mode': 'How do you prefer to participate in surveys?',
  'survey-participation-time-duration': 'How much time are you comfortable spending on a survey?',
  'willingness-survey-participation': 'Are you willing to participate in future market research studies?',
  'survey-type-interested-in': 'What types of study would you be open to joining?',
  'share-consent': 'Are you comfortable sharing your health experiences for research purposes (confidentially)?',
  'survey-participation-motivation': 'What motivates you to participate in surveys?',
  'video-survey-participation-consent': 'Are you comfortable taking part in online video interviews or discussions (e.g. Zoom, Teams)?',
  'mode-of-payment': 'What type of rewards do you prefer?',
  'survey-participation-timeslot': 'What is your preferred time of day to take surveys?',
  'recontact-consent': 'Do you agree to be re-contacted for future studies?',
  'payment-method': 'How would you like to receive payments?',
  'use-fitness-mobile-app': 'Do you use any apps or wearables to track your health (e.g. Fitbit, Apple Health, MyFitnessPal)?',
  'health-management-app': 'Which types of mobile apps do you use to manage your health or condition?',
  'health-service': 'Which digital health services are you currently using?',
  'use-devices': 'Which of these devices do you own and use regularly?',
  'diagnosed-condition': 'Who or what first diagnosed your main condition?',
  'condition-diagnsis-by-healthcareprofessional': 'Has your primary condition been formally diagnosed by a healthcare professional?',
  'experience-symptoms-releted-to-primary-condition': 'How often do you currently have symptoms related to your primary condition?',
  'diagnostic-test-releted-to-primary-condition': 'Have you had any diagnostic tests related to your primary condition?',
  'descrive-typical-diet': 'How would you describe your typical diet?',
  'consume-alcohlic-beverages': 'How often do you drink alcohol?',
  'health-insurance-currenlty': 'Do you currently have health insurance?',
  'types-of-test-received': 'Which types of tests have you had?',
  'disease-types': 'Which of these conditions have you ever been diagnosed with? (Select all that apply)',
  'primary-health-condition': 'Which condition is currently your main (primary) health condition?',
  rural: 'What type of area do you currently live in?',
  'sport-category': 'Which sports or activities do you do most often?',
  'smoke-category': 'Which tobacco product do you use most often?',
  suppliment: 'Do you consume any of these for health or energy?',
};

/* options: replaced, added, split, relabelled or dropped */
const O = (labels) => labels.map((l) => [l, slug(l)]);
const OPTION_REPLACE = {
  // the export repeated the "physically active" answers here
  'descrive-typical-diet': O(['Very healthy and balanced', 'Mostly healthy', 'Average / mixed', 'Mostly unhealthy', 'Very unhealthy']),
  // the export has no options for this question
  'hiv-treatment': O(['Every month or more often', 'Every 2–3 months', 'Every 4–6 months', 'Once a year', 'Less than once a year', 'Only when I have symptoms']).map((o) => [...o, ['HIV']]),
  'hours-sleep': [['Less than 4 hours', 'Less than 4'], ['4–5 hours', '4-5'], ['6 hours', '6'], ['7–8 hours', '7-8'], ['9–10 hours', '9-10'], ['More than 10 hours', 'More than 10']],
  // "Select from conditions selected above" is replaced by the respondent's own answers (see FROM)
  'primary-health-condition': [['Other', 'Other'], ['None', 'None']],
};
const OPTION_ADD_FIRST = {
  'hearing-device': [['Hearing aid', 'Hearing Aid']], // only "Cochlear Implant" and "Both" were in the export
};
const OPTION_ADD_LAST = {
  'lense-type': [['I wear glasses only (no contact lenses)', 'glasses-only']],
};
const OPTION_SPLIT = {
  'doctor-visit-category': {
    'Nurse practitioner or physician assistant Alternative medicine practitioner (Ayurvedic, Homeopathic, etc.)': [
      ['Nurse practitioner or physician assistant', 'nurse-practitioner'],
      ['Alternative medicine practitioner (Ayurvedic, Homeopathic, etc.)', 'alternative-medicine'],
    ],
  },
};
const OPTION_DROPS = {
  'health-service': ['Survey Participation & Rewards Preferences'],
  'cholesterol-treatment': ['No'], // duplicate of "None"
};
const OPTION_RELABEL = {
  'experience-patient': { '1': 'Up to 1 year' },
  'patient-orgoverseas': { 'None of the Above': 'None (no branches abroad)' },
  'patient-orgsize': { '1': '1 (just me)' },
  'no-health-problem': { None: 'None' },
};
const OPTION_ORDER = {
  'experience-patient': ['Recently Joined', '1', '2-3 years', '4-5 years', '6-7 years', '8-9 years', '10-15 years', 'More than 15 years'],
};
const OPTION_LABEL_FIXES = { 'Fertilizerrs & Pesticides': 'Fertilizers & Pesticides', 'Horticulture Sector': 'Horticulture Sector', 'Risk & Risk & Security Department': 'Risk & Security Department' };
const PARENT_VALUE_ALIASES = { 'risk-security-department': 'risk-risk-security-department' };
// options built from another question's answers
const FROM = { 'primary-health-condition': 'disease-types' };

/* open-ended questions: type + validation rule + visibility rule */
const TEXT_QUESTIONS = {
  fullname: { type: 'text', rule: 'fullname', autocomplete: 'name' },
  dob: { type: 'date', rule: 'dob', autocomplete: 'bday' },
  mail: { type: 'email', rule: 'email', autocomplete: 'email' },
  zipcode: { type: 'text', rule: 'zip', autocomplete: 'postal-code', when: { q: 'country', any: true } },
  website: { type: 'url', rule: 'url', optional: true, autocomplete: 'url' },
  'food-allergy': { label: 'Please list your food allergies or intolerances', type: 'text', rule: 'specify', when: { q: 'have-food-allergy', in: ['yes'] }, placeholder: 'e.g. peanuts, lactose, gluten' },
  bmi: { label: 'What is your current BMI? (optional, if you know it)', type: 'number', rule: 'bmi', optional: true, when: { q: 'chronic-conditions', in: ['obesity'] }, placeholder: 'e.g. 31.5' },
  'social-media-x': { type: 'text', rule: 'x', optional: true, prefix: '@' },
  'social-media-youtube': { type: 'text', rule: 'youtube', optional: true },
  'social-media-linkedin': { type: 'text', rule: 'linkedin', optional: true },
  'social-media-facebook': { type: 'text', rule: 'facebook', optional: true },
  'social-media-instagram': { type: 'text', rule: 'instagram', optional: true, prefix: '@' },
  'payment-method-bank-name': { type: 'text', rule: 'bankname', when: { q: 'payment-method', in: ['wire transfer'] } },
  'payment-method-bank-ifsc': { type: 'text', rule: 'bankcode', when: { q: 'payment-method', in: ['wire transfer'] }, upper: true },
  'payment-method-bank-account': { type: 'text', rule: 'account', when: { q: 'payment-method', in: ['wire transfer'] }, inputmode: 'numeric', confirm: true },
  'payment-method-upi': { type: 'text', rule: 'upi', when: { q: 'payment-method', in: ['upi'] } },
  'payment-method-paypal': { type: 'email', rule: 'email', when: { q: 'payment-method', in: ['paypal'] } },
  'payment-method-amazon': { type: 'text', rule: 'amazon', when: { q: 'payment-method', in: ['amazon gift card'] } },
};

const GEO = { state: 'state', city: 'city', ethnicity: 'ethnicity', rural: 'rural', 'personal-income': 'pincome', 'household-income': 'hincome' };
const SHARED = new Set(['health-status']); // asked once, counts in General Health and Personal Health
const LONG_LIST = new Set(['education-diploma', 'education-ug', 'education-pg', 'education-doctorate', 'education-associate-degree', 'patient-sector', 'department', 'freelancer-patient']);

const MULTI = new Set([
  'hot-drinks', 'cold-drinks', 'alcohol-category', 'suppliment', 'exercises', 'sport-category', 'diet-plan', 'chronic-conditions', 'comorbidities', 'cholesterol-treatment',
  'asthma-diagnosis', 'asthma-triggers', 'arthritis-affected-joints', 'heart-disease-type', 'depression-symptom', 'depression-treatment-category', 'obesity-treatment-category',
  'cancer-category', 'cancer-treatment-category', 'thiroid-treatment-category', 'anidra-treatment-category', 'skin-condition', 'skin-condition-treatment-category',
  'stomach-condition', 'stomach-condition-treatment-category', 'neuro-condition', 'neuro-treatment-category', 'vision-condition', 'vision-condition-treatment-category',
  'blood-condition', 'blood-condition-treatment-category', 'dental-condition', 'dental-condition-treatment-category', 'spine-condition', 'spine-condition-treatment-category',
  'sex-condition', 'sex-condition-treatment-category', 'hw', 'survey-participation-category', 'survey-type-interested-in', 'survey-participation-motivation', 'use-devices',
  'health-management-app', 'health-service', 'disease-types', 'professional-list', 'place-receive-care', 'types-of-treatment-currently-using', 'switched-medication',
  'types-of-test-received', 'device-type', 'types-of-health-apps', 'visiting-hospital', 'factors-choosing-treatment', 'looking-health-information',
  'types-of-research-consider-participating', 'types-of-documentation', 'types-of-studies',
]);
const EXCLUSIVE = new Set(['none', 'none of these', 'none of the above', 'no', "don't know", 'not applicable', 'prefer not to say', 'no current symptoms', 'skip']);
const ALT_ANY = ['✨', '🔹', '🔸', '⭐', '🌟', '💫', '🔷', '🔶', '🟢', '🟣', '🟠', '🔵'];
const BY_VALUE_Q = new Set(['organization-revenue']);
const isOther = (label) => /^others?(\b|$)/i.test(clean(label));


const ADDITIONAL = {
  'ad-preferred-name': { label: 'What should we call you? (preferred first name or nickname)', type: 'text', rule: 'nickname', emoji: '😊', autocomplete: 'nickname' },
  'ad-mobile': { label: 'Your mobile number (with country code)', type: 'tel', rule: 'phone', emoji: '📞', autocomplete: 'tel', placeholder: '+91 98765 43210' },
  'ad-alt-email': { label: 'Alternative email address (optional)', type: 'email', rule: 'altemail', optional: true, emoji: '✉️' },
  'ad-languages': { label: 'Which languages do you speak fluently?', multi: true, emoji: '🗣️', options: O(['English', 'Chinese (Mandarin)', 'Hindi', 'Spanish', 'Arabic', 'French', 'Bengali', 'Portuguese', 'Russian', 'Japanese', 'German', 'Korean', 'Italian', 'Turkish', 'Vietnamese', 'Tamil', 'Telugu', 'Marathi', 'Urdu', 'Indonesian / Malay', 'Other']) },
  'ad-survey-language': { label: 'In which language would you prefer to take surveys?', emoji: '🌐', options: O(['English', 'Chinese', 'Spanish', 'Hindi', 'Arabic', 'French', 'German', 'Portuguese', 'Japanese', 'Korean', 'Russian', 'Italian', 'Other']) },
  'ad-height': { label: 'What is your height in centimetres? (optional)', type: 'number', rule: 'height', optional: true, emoji: '📏', placeholder: 'e.g. 168' },
  'ad-weight': { label: 'What is your weight in kilograms? (optional)', type: 'number', rule: 'weight', optional: true, emoji: '⚖️', placeholder: 'e.g. 72' },
  'ad-blood-group': { label: 'What is your blood group?', emoji: '🩸', options: O(['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−', "I don't know"]) },
  'ad-diagnosis-year': { label: 'In which year was your main health condition first diagnosed? (optional)', type: 'number', rule: 'diagnosisYear', optional: true, emoji: '📅', placeholder: 'e.g. 2019' },
  'ad-family-history': { label: 'Do any of these conditions run in your close family? (Select all that apply)', multi: true, emoji: '🧬', options: O(['Diabetes', 'Heart disease', 'High blood pressure', 'Cancer', 'Stroke', 'Asthma / allergies', 'Mental health conditions', "Alzheimer's / dementia", 'Thyroid disorders', 'Kidney disease', 'Other', 'None', 'Prefer not to say']) },
  'ad-drug-allergies': { label: 'Are you allergic to any medicines? (Select all that apply)', multi: true, emoji: '🚨', options: O(['Penicillin / antibiotics', 'Sulfa drugs', 'Aspirin / NSAIDs', 'Anaesthetics', 'Contrast dye', 'Latex', 'Other', 'None', 'Not sure']) },
  'ad-support-person': { label: 'Does anyone help you manage your health?', emoji: '🤝', options: O(['No, I manage on my own', 'Spouse or partner', 'Parent', 'Son or daughter', 'Other family member', 'Friend or neighbour', 'Paid caregiver / nurse', 'Prefer not to say']) },
  'ad-mobility': { label: 'Do you use any mobility aid?', emoji: '🦽', options: O(['No', 'Walking stick / cane', 'Walker / rollator', 'Wheelchair', 'Mobility scooter', 'Prosthesis', 'Other']) },
  'ad-medicine-spend': { label: 'Roughly how much of your own money do you spend on medicines each month?', emoji: '💸', options: O(['Nothing (fully covered)', 'A small amount', 'A moderate amount', 'A large amount', 'Prefer not to say']) },
  'ad-household-size': { label: 'How many people live in your household (including you)?', type: 'number', rule: 'household', emoji: '🏠', min: 1, max: 30 },
  'ad-smartphone': { label: 'Which smartphone do you mainly use?', emoji: '📲', options: O(['Android', 'iPhone (iOS)', 'Both', 'Other', 'I do not use a smartphone']) },
  'ad-social-platforms': { label: 'Which social platforms do you use at least weekly? (Select all that apply)', multi: true, emoji: '💬', options: O(['WhatsApp', 'Facebook', 'Instagram', 'YouTube', 'X (Twitter)', 'LinkedIn', 'TikTok', 'WeChat', 'Telegram', 'Snapchat', 'Reddit', 'Other', 'None']) },
  'ad-hobbies': { label: 'What do you enjoy doing in your free time? (Select all that apply)', multi: true, emoji: '🎨', options: O(['Reading', 'Cooking / baking', 'Gardening', 'Music', 'Travel', 'Gaming', 'Arts & crafts', 'Movies / TV series', 'Fitness / sports', 'Volunteering', 'Spiritual / religious activities', 'Spending time with family', 'Other']) },
  'ad-how-heard': { label: 'How did you hear about MyHealthOpinions?', emoji: '📣', options: O(['Search engine', 'Social media', 'Friend or family', 'Email invitation', 'Doctor or pharmacist', 'Online advertisement', 'Patient community / association', 'Other']) },
  'ad-about': { label: 'Tell us a little about yourself and your health journey', type: 'textarea', rule: 'about', emoji: '📝', min: 30, max: 600, placeholder: 'For example: what you live with, what a typical day looks like, what helps you most…' },
  'ad-wish': { label: 'If one product or service could make living with your condition easier, what would it be? (optional)', type: 'textarea', rule: 'wish', optional: true, emoji: '💡', max: 400 },
};
for (const k of ['ad-blood-group', 'ad-family-history', 'ad-drug-allergies', 'ad-mobility']) ADDITIONAL[k].options.forEach((o) => { if (o[0] === "I don't know") o[1] = 'dont-know'; });


const qByName = new Map(QUESTIONS.map((q) => [q.name, q]));
const optsByQ = new Map();
for (const o of OPTIONS) {
  if (!optsByQ.has(o.question)) optsByQ.set(o.question, []);
  optsByQ.get(o.question).push(o);
}

const profiles = [];
const usedNames = [];
const dynamicNames = new Set();
const knownSources = PROFILE_META.map((m) => m.source).filter(Boolean);
const knownIds = new Set(PROFILE_META.map((m) => m.id));
const DYNAMIC_PALETTES = [
  ['#0B6E99', '#38BDF8', '#D8F3FF'], ['#C2410C', '#FBBF24', '#FFEDD5'], ['#1E40AF', '#60A5FA', '#DBEAFE'],
  ['#B91C1C', '#F97316', '#FFE4D6'], ['#047857', '#34D399', '#D1FAE5'], ['#6D28D9', '#A78BFA', '#EDE9FE'],
];
const sameText = (a, b) => String(a ?? '').replace(/\s+/g, ' ').trim().toLowerCase() === String(b ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
const dynamicMeta = PROFILES
  .filter((x) => sameText(x.category, 'patient') && (x.pages || []).some((pg) => pg.length > 1) && !knownSources.some((s) => sameText(x.name, s)) && !/^not[\s-]*in[\s-]*use/i.test(String(x.name).trim()))
  .map((doc, i) => {
    const base = String(doc.slug || doc.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `profile-${i + 1}`;
    let id = base;
    for (let n = 2; knownIds.has(id); n++) id = `${base}-${n}`;
    knownIds.add(id);
    const title = String(doc.name).replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id, source: doc.name, chapter: 'you', title, emoji: '\u{1F4CB}', icon: 'additional.svg',
      palette: DYNAMIC_PALETTES[i % DYNAMIC_PALETTES.length], pattern: 'dots', flavor: 'New Profile',
      celebration: 'confetti', blurb: 'Tell us a little more about you', dynamic: true,
    };
  });
const dynamicText = (raw) => {
  const kind = String(raw?.type || '');
  const out = /email/i.test(kind) ? { type: 'email', rule: 'email' }
    : /phone/i.test(kind) ? { type: 'text', rule: 'phone' }
    : /zip/i.test(kind) ? { type: 'text', rule: 'zip' }
    : { type: 'text', rule: 'specify' };
  if (raw?.isRequired === false) out.optional = true;
  return out;
};
const dynamicMulti = (name, raw) => dynamicNames.has(name) && /checkbox|select-multiple|multiselect/i.test(String(raw?.type || ''));
for (const meta of [...PROFILE_META, ...dynamicMeta]) {
  let names = [];
  if (meta.source) {
    const p = PROFILES.find((x) => x.category === 'patient' && x.name === meta.source);
    if (!p) continue;
    for (const page of p.pages) names.push(...page.slice(1));
  } else names = Object.keys(ADDITIONAL);
  names = names.filter((n) => {
    if (DROP.has(n)) { report.droppedQuestions.push({ profile: meta.id, question: n }); return false; }
    if (DROP_2026.has(n)) { report.droppedQuestions.push({ profile: meta.id, question: n, duplicateOf: DUPLICATE_OF[n] }); return false; }
    return true;
  });
  names = [...new Set(names)];
  if (meta.dynamic) for (const n of names) if (!usedNames.includes(n)) dynamicNames.add(n);
  for (const n of names) if (!usedNames.includes(n)) usedNames.push(n);
  const { source, dynamic, ...rest } = meta;
  profiles.push({ ...rest, source, questions: names });
}

const questions = {};
const contentStrings = new Set();
const parentOf = (n) => PARENT_FIXES[n] ?? (qByName.get(n)?.parent || '');

for (const name of usedNames) {
  if (ADDITIONAL[name]) {
    const a = ADDITIONAL[name];
    const q = { label: a.label, emoji: a.emoji };
    if (a.options) {
      q.type = 'choice';
      if (a.multi) q.multi = 1;
      q.options = a.options.map(([l, v]) => { contentStrings.add(l); return [l, v]; });
      decorateChoice(q, name);
    } else Object.assign(q, pick(a, ['type', 'rule', 'optional', 'min', 'max', 'placeholder', 'autocomplete']));
    contentStrings.add(a.label);
    if (a.placeholder) contentStrings.add(a.placeholder);
    questions[name] = q;
    continue;
  }
  const raw = qByName.get(name);
  const tq = TEXT_QUESTIONS[name];
  let label = LABEL_FIXES[name] ?? tq?.label ?? clean(raw?.label ?? name);
  if ((LABEL_FIXES[name] || tq?.label) && raw && clean(raw.label) !== label) report.labelFixes.push({ question: name, from: clean(raw.label), to: label });
  if (!raw) report.notes.push(`Question "${name}" is used in a profile but missing from the question bank – defined here: "${label}"`);
  const parent = parentOf(name);
  if (PARENT_FIXES[name]) report.fixedParents.push({ question: name, declared: raw?.parent || '(none)', used: parent });
  const q = { label, emoji: QUESTION_EMOJI(name, label) };
  if (parent) q.parent = parent;
  if (SHARED.has(name)) q.shared = 1;
  if (GATES[name]) q.gate = GATES[name];
  contentStrings.add(label);

  if (tq) {
    const { label: _l, ...rest } = tq;
    Object.assign(q, rest);
    delete q.parent;
    if (tq.placeholder) contentStrings.add(tq.placeholder);
    questions[name] = q;
    continue;
  }
  if (name === 'country') {
    q.type = 'choice';
    q.options = (optsByQ.get('country') || []).map((o) => [clean(o.label), clean(o.value)]).sort((a, b) => a[0].localeCompare(b[0]));
    q.country = 1;
    questions[name] = q;
    continue;
  }
  if (GEO[name]) {
    q.type = 'choice';
    q.geo = GEO[name];
    if (name === 'city') q.allowOther = 1;
    questions[name] = q;
    continue;
  }
  if (name === 'employment-jobrole') {
    // 8,500 job titles → lazy file data/jobs.json, searchable, with "Other"
    q.type = 'choice';
    q.jobs = 1;
    questions[name] = q;
    continue;
  }

  let rawOpts = (optsByQ.get(name) || []).filter((o) => !(OPTION_DROPS[name] || []).includes(clean(o.label)));
  if (OPTION_DROPS[name]) report.optionFixes.push({ question: name, dropped: OPTION_DROPS[name] });
  if (OPTION_REPLACE[name]) {
    report.optionFixes.push({ question: name, replaced: rawOpts.map((o) => clean(o.label)), with: OPTION_REPLACE[name].map((o) => o[0]) });
    rawOpts = OPTION_REPLACE[name].map(([label, value, pv]) => ({ label, value, parentValue: pv }));
  }
  if (!rawOpts.length) {
    if (dynamicNames.has(name)) { Object.assign(q, dynamicText(raw)); delete q.parent; questions[name] = q; continue; }
    report.notes.push(`Question "${name}" has no options and no text definition – skipped`);
    continue;
  }
  q.type = 'choice';
  if (MULTI.has(name) || dynamicMulti(name, raw)) q.multi = 1;
  if (FROM[name]) q.from = FROM[name];

  // canonical parent values (accept both value and label spellings)
  const parentOpts = parent ? optsByQ.get(parent) || [] : [];
  const parentLookup = new Map();
  for (const po of parentOpts) {
    parentLookup.set(norm(po.value), clean(po.value));
    parentLookup.set(norm(po.label), clean(po.value));
  }
  if (parent === 'country') for (const c of (optsByQ.get('country') || [])) parentLookup.set(norm(c.value), clean(c.value));
  const resolvePV = (list, lab) => {
    if (!list || !list.length) return null;
    const pv = [];
    for (const t of list) {
      const k = norm(t);
      const hit = parentLookup.get(k) ?? parentLookup.get(PARENT_VALUE_ALIASES[k] ?? '');
      if (hit !== undefined) pv.push(hit);
      else if (parent !== 'country') report.unmatchedParentValues.push({ question: name, option: lab, parent, value: t });
    }
    return [...new Set(pv)];
  };

  const seen = new Set();
  let entries = [];
  const push = (lab, val, pvRaw) => {
    const pv = resolvePV(pvRaw, lab);
    const key = val + '|' + (pv ? pv.join(',') : '');
    if (seen.has(key)) return;
    seen.add(key);
    const e = [lab, val];
    if (pv) e.push(pv);
    entries.push(e);
  };
  for (const [l, v] of OPTION_ADD_FIRST[name] || []) push(l, v, rawOpts[0]?.parentValue);
  for (const o of rawOpts) {
    let lab = OPTION_LABEL_FIXES[clean(o.label)] ?? clean(o.label);
    const val = clean(o.value);
    const split = OPTION_SPLIT[name]?.[lab];
    if (split) { for (const [l, v] of split) push(l, v, o.parentValue); report.optionFixes.push({ question: name, split: lab, into: split.map((s) => s[0]) }); continue; }
    if (name === 'organization-revenue') lab = lab.replace(/^(\d+) - (\d+)$/, '$1-$2').replace(/^Above (\d+)$/, '$1 and above');
    push(lab, val, o.parentValue);
  }
  for (const [l, v] of OPTION_ADD_LAST[name] || []) push(l, v, rawOpts[0]?.parentValue);
  if (OPTION_ADD_FIRST[name] || OPTION_ADD_LAST[name]) report.optionFixes.push({ question: name, added: [...(OPTION_ADD_FIRST[name] || []), ...(OPTION_ADD_LAST[name] || [])].map((o) => o[0]) });
  if (OPTION_ORDER[name]) {
    const ord = OPTION_ORDER[name];
    entries.sort((a, b) => ord.indexOf(a[0]) - ord.indexOf(b[0]));
  }
  if (OPTION_RELABEL[name]) entries = entries.map((e) => (OPTION_RELABEL[name][e[0]] ? [OPTION_RELABEL[name][e[0]], ...e.slice(1)] : e));
  q.options = entries;
  for (const e of entries) if (!LONG_LIST.has(name) && /\p{L}/u.test(e[0])) contentStrings.add(e[0]);
  patchOptions(q, name);
  decorateChoice(q, name);
  patchFlags(q, name);
  questions[name] = q;
}

function pick(o, keys) { const r = {}; for (const k of keys) if (o[k] !== undefined) r[k] = o[k]; return r; }
function decorateChoice(q, name) {
  if (!LONG_LIST.has(name)) {
    q.oe = applySequence(name, q.options.length) || q.options.map((o) => optionEmoji(name, o[0], o[1]) || q.emoji || '💬');
    // durations ("Less than 6 months" … "More than 10 years") grow from a seedling to a mountain
    const DUR = /(\bmonths?\b|\byears?\b)/i;
    const durIdx = q.options.map((o, i) => (DUR.test(o[0]) && !/^yes/i.test(o[0]) ? i : -1)).filter((i) => i >= 0);
    if (durIdx.length >= 3 && !applySequence(name, q.options.length)) {
      const GROW = ['🌱', '🌿', '🪴', '🌳', '🌲', '🏔️', '🗻', '🌌'];
      durIdx.forEach((i, k) => { q.oe[i] = GROW[Math.min(k, GROW.length - 1)]; });
    }
    // every option tile in one question gets its own picture (flags may repeat; revenue bands differ per country)
    if (BY_VALUE_Q.has(name)) return finishChoice(q);
    const used = new Set();
    q.oe = q.oe.map((e) => {
      if (!used.has(e) || /^[\u{1F1E6}-\u{1F1FF}]/u.test(e)) { used.add(e); return e; }
      const alt = ALT_ANY.find((a) => !used.has(a) && !q.oe.includes(a)) || e;
      report.notes.push(`emoji repeated in "${name}" → ${alt}`);
      used.add(alt);
      return alt;
    });
  }
  finishChoice(q);
}
function finishChoice(q) {
  const other = [], excl = [];
  q.options.forEach((o, i) => {
    if (isOther(o[0])) other.push(i);
    if (q.multi && EXCLUSIVE.has(norm(o[0]))) excl.push(i);
  });
  if (other.length) q.other = other;
  if (excl.length) q.exclusive = excl;
}

/* Profiles: drop questions that ended up undefined */
for (const p of profiles) p.questions = p.questions.filter((n) => questions[n]);
for (const p of profiles) { contentStrings.add(p.title); contentStrings.add(p.blurb); contentStrings.add(p.flavor); }


const countries = new Set((questions.country?.options || []).map((o) => o[1]));
const geo = {};
const G = (cc) => (geo[cc] ??= { state: [], ethnicity: [], rural: [], pincome: {}, hincome: {} });
for (const o of optsByQ.get('state') || []) for (const cc of o.parentValue) if (countries.has(cc)) G(cc).state.push([clean(o.label), clean(o.value)]);
for (const o of optsByQ.get('ethnicity') || []) for (const cc of o.parentValue) if (countries.has(cc)) G(cc).ethnicity.push([clean(o.label), clean(o.value)]);
for (const o of optsByQ.get('rural') || []) for (const cc of o.parentValue) if (countries.has(cc)) G(cc).rural.push([clean(o.label), clean(o.value)]);
for (const [qn, key] of [['personal-income', 'pincome'], ['household-income', 'hincome']]) {
  for (const o of optsByQ.get(qn) || []) for (const rv of o.parentValue) {
    const cc = rv.split('-')[0];
    if (!countries.has(cc)) continue;
    (G(cc)[key][rv] ??= []).push([clean(o.label), clean(o.value)]);
  }
}
const cities = {};
for (const o of optsByQ.get('city') || []) {
  for (const sv of o.parentValue) {
    const cc = sv.split('-')[0];
    if (!countries.has(cc)) continue;
    ((cities[cc] ??= {})[sv] ??= []).push(clean(o.label));
  }
}
let geoBytes = 0, cityBytes = 0;
for (const cc of countries) {
  const g = G(cc);
  g.state.sort((a, b) => a[0].localeCompare(b[0]));
  for (const k of ['pincome', 'hincome']) for (const rv in g[k]) g[k][rv].sort((a, b) => a[1].localeCompare(b[1]));
  const s = JSON.stringify(g);
  geoBytes += s.length;
  files['geo/' + cc + '.json'] = s;
  const c = cities[cc] || {};
  for (const sv in c) c[sv] = [...new Set(c[sv])].sort((a, b) => a.localeCompare(b));
  const cs = JSON.stringify(c);
  cityBytes += cs.length;
  files['geo/cities/' + cc + '.json'] = cs;
}
for (const s of ['Urban', 'Rural']) contentStrings.add(s);

const deptValues = new Set((questions.department?.options || []).map((o) => o[1]));
const jobs = {};
for (const o of optsByQ.get('employment-jobrole') || []) {
  for (const t of o.parentValue || []) {
    const raw = clean(t);
    const d = deptValues.has(raw) ? raw : PARENT_VALUE_ALIASES[norm(t)] ?? raw;
    if (!deptValues.has(d)) continue;
    (jobs[d] ??= new Map()).set(clean(o.value), clean(o.label));
  }
}
let jobCount = 0, jobBytes = 0;
for (const d of Object.keys(jobs).sort()) {
  const list = [...jobs[d]].map(([v, l]) => [l, v]).sort((a, b) => a[0].localeCompare(b[0]));
  jobCount += list.length;
  const js = JSON.stringify(list);
  jobBytes += js.length;
  files['jobs/' + d + '.json'] = js;
}
// departments with no job titles in the export: the job-title question is simply not shown
if (questions['employment-jobrole']) questions['employment-jobrole'].depts = Object.keys(jobs).sort();
const missingDepts = [...deptValues].filter((d) => !jobs[d]);
if (missingDepts.length) report.notes.push(`Departments without job titles (the job-title question is skipped for them): ${missingDepts.join(', ')}`);


const out = { version: new Date().toISOString().slice(0, 10), profiles, questions };
files['patient.json'] = JSON.stringify(out);

const qCount = Object.keys(questions).length;
return files;
}
