#!/usr/bin/env node
/**
 * build-data.mjs
 * ------------------------------------------------------------
 * Converts the raw MyHealthOpinions export (raw/*.json) into small,
 * fast, lazy-loadable JSON files used by the caregiver website.
 *
 *   node scripts/build-data.mjs
 *
 * Output (all in public/data):
 *   caregiver.json            profiles + questions + non-geo options
 *   geo/{CC}.json             states, ethnicity, area type, incomes for one country
 *   geo/cities/{CC}.json      cities for one country grouped by state code
 *   content-strings.en.json   every translatable string (hand to translators)
 *   data-report.json          problems found in the raw data + how they were fixed
 *
 * Only the CAREGIVER category is exported. Healthcare-professional and
 * patient data are ignored on purpose.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const EMOJI_ALT = {
  '🎓': ['🏫', '📘', '🧑‍🏫', '🏅'], '👩‍🎓': ['🧑‍🎓', '📗'], '📜': ['🪪', '🏷️', '📃'], '❤️‍🔥': ['💖', '💝'], '✏️': ['📝', '🖊️'], '🍲': ['🥘', '🍛', '🥣'],
  '👍': ['👌', '🙌'], '📅': ['🗓️', '📆', '⏰'], '👑': ['🤝', '💬', '🗳️', '👀'], '🧑‍💻': ['💻', '🏠'], '🧼': ['🧴', '🫧'], '🏡': ['🏘️', '🏠', '🛖'],
  '🩺': ['🩻', '💉', '🌡️'], '🤝': ['🫱', '🫶', '🤗'], '🧑‍⚕️': ['👩‍⚕️', '👨‍⚕️'], '🛁': ['🚿', '🪥', '🧴'], '👕': ['👖', '🧦'], '❌': ['🚫', '⛔'],
  '📊': ['📈', '📉', '🧮'], '🤲': ['🫴', '🫶', '🤗', '💪'], '🏢': ['🏬', '🏣', '🏛️', '🏗️', '🏨'], '🦯': ['🦽', '🚶'], '🩹': ['🧷', '💉'], '🧠': ['💭', '🧩'],
  '💊': ['💉', '🧪'], '🗓️': ['📆', '⏰', '🕰️', '🔁'], '♿': ['🦽', '🦼', '🦯', '🧩', '🫂'], '🧓': ['👴', '👵'], '🏘️': ['🏡', '🏙️', '🏞️'],
  '🔗': ['🧷', '📎', '🪢'], '💬': ['🗨️', '💭', '📣'], '👔': ['💼', '📋', '🧑‍💼', '🎯', '⚙️', '🧭'], '🗂️': ['📋', '🗃️'], '🏥': ['🩺', '🏨'],
  '🕘': ['🕙', '🕚'], '🕐': ['🕑', '🕒'], '🏠': ['🏡', '🛋️', '🛏️', '🪑'], '🌱': ['🌿', '🪴', '🌳'], '🏛️': ['🏦', '⚖️'], '🏦': ['🏛️', '💳'],
  '💰': ['💳', '🪙', '💵'], '🤔': ['🧐', '💭'], '🧾': ['📄', '📑'], '🛡️': ['🔒', '☂️'], '🥦': ['🥕', '🍎', '🥬'], '👨‍👩‍👧‍👦': ['👪', '🧑‍🤝‍🧑'],
  '🏬': ['🛍️', '🏪', '🏢', '🧺'], '🛒': ['🧺', '🛍️'], '🌐': ['💻', '📲', '🖥️', '🔎', '🛍️', '📦'], '🥃': ['🍷', '🍺', '🍸', '🍹'], '🚬': ['🟫', '💨', '🔥', '🪈'],
  '🧑': ['🧑‍🍳', '👩', '👨'], '🥣': ['🥫', '🍞', '🧃'], '🧘': ['🤸', '🏊', '🚴'], '🏋️': ['💪', '🤸'], '⌚': ['📟', '🎧'], '⏱️': ['⏲️', '⌛', '🕰️'],
  '🇮🇳': [], '📱': ['📲', '☎️', '📵'],
};
const EMOJI_ALT_ANY = ['✨', '🔹', '🔸', '⭐', '🌟', '💫', '🔷', '🔶'];
import { optionEmoji } from './option-emoji.mjs';
import { editProfileDocs, DROP_2026, DUPLICATE_OF, patchOptions, patchFlags } from '../src/lib/questions-2026.js';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'raw');
const OUT = path.join(ROOT, 'public', 'data');

const read = (f) => JSON.parse(fs.readFileSync(path.join(RAW, f), 'utf8'));
const PROFILES = editProfileDocs(read('myhealthopinions.CareGiver.Profile.json'));
const QUESTIONS = read('myhealthopinions.CareGiver.Question.json');
const OPTIONS = read('myhealthopinions.Option.json');

const report = { fixedParents: [], unmatchedParentValues: [], droppedQuestions: [], labelFixes: [], notes: [] };
const clean = (s) => String(s ?? '').replace(/Â | /g, ' ').replace(/\s+/g, ' ').trim();
const norm = (s) => clean(s).toLowerCase();

/* ------------------------------------------------------------------ */
/* 1. Profile catalogue (order, look & feel, completion animation)     */
/* ------------------------------------------------------------------ */
// source = profile "name" in CareGiver.Profile.json
const PROFILE_META = [
  // chapter = 'you' → About You PROFILE (completed first) · 'health' → SURVEY (unlocks one at a time after every profile)
  // palette = [deep, bright, light tint]  pattern = card texture  scene = illustration file  celebration = completion animation
  { id: 'care-role', chapter: 'you', source: 'screener', title: 'Your Caregiving Role', emoji: '🤝', icon: 'care-role.svg', palette: ['#D7263D', '#FF8A3D', '#FFE0B8'], pattern: 'hearts', flavor: 'Rose Ember', celebration: 'hearts', blurb: 'Tell us how you care for others' },
  { id: 'basic', chapter: 'you', source: 'basic profile', title: 'Basic Profile', emoji: '🪪', icon: 'basic.svg', palette: ['#0F6E8F', '#2BB3C0', '#C9F3EE'], pattern: 'dots', flavor: 'Ocean Teal', celebration: 'confetti', blurb: 'Who you are and where you live' },
  { id: 'education', chapter: 'you', source: 'educational profile', title: 'Education & Care Skills', emoji: '🎓', icon: 'education.svg', palette: ['#5B2A86', '#9B5DE5', '#EBD9FF'], pattern: 'grid', flavor: 'Royal Plum', celebration: 'caps', blurb: 'Your studies, skills and the care you give' },
  { id: 'professional', chapter: 'you', source: 'professional profile', title: 'Professional Profile', emoji: '💼', icon: 'professional.svg', palette: ['#08776A', '#2EC4A6', '#CDF7EA'], pattern: 'plus', flavor: 'Clinic Mint', celebration: 'fireworks', blurb: 'Your work, role and experience' },
  { id: 'health', chapter: 'health', source: 'personal health profile', title: 'Personal Health', emoji: '❤️‍🩹', icon: 'health.svg', palette: ['#D62839', '#FF6B7D', '#FFD9DE'], pattern: 'ecg', flavor: 'Coral Pulse', celebration: 'pulse', blurb: 'A quick check-in on your own wellbeing' },
  { id: 'insurance', chapter: 'health', source: 'health insurance profile', title: 'Health Insurance', emoji: '🛡️', icon: 'insurance.svg', palette: ['#1D3FA8', '#4C7DFF', '#D6E3FF'], pattern: 'hex', flavor: 'Sapphire Shield', celebration: 'shield', blurb: 'Your cover and the cover you manage' },
  { id: 'food', chapter: 'health', source: 'food and lifestyle', title: 'Food & Lifestyle', emoji: '🥗', icon: 'food.svg', palette: ['#2F7D32', '#8CC63F', '#EAF8C4'], pattern: 'leaves', flavor: 'Garden Fresh', celebration: 'fruit', blurb: 'What you eat, drink and buy' },
  { id: 'fitness', chapter: 'health', source: 'sports and physical fitness', title: 'Sports & Fitness', emoji: '🏃', icon: 'fitness.svg', palette: ['#E0520C', '#FFA62B', '#FFE7C2'], pattern: 'stripes', flavor: 'Sunrise Energy', celebration: 'medals', blurb: 'How you move and stay active' },
  { id: 'tech', chapter: 'you', source: 'technology and survey participation', title: 'Technology & Digital Health', emoji: '📱', icon: 'tech.svg', palette: ['#5A12D6', '#D600B0', '#F2D4FF'], pattern: 'circuit', flavor: 'Neon Violet', celebration: 'pixels', blurb: 'Devices, apps and digital health' },
  { id: 'survey', chapter: 'you', source: 'survey participation and reward preferences profile', title: 'Survey & Reward Preferences', emoji: '🎁', icon: 'survey.svg', palette: ['#B5175A', '#FF5C8A', '#FFD6E5'], pattern: 'confetti', flavor: 'Gift Magenta', celebration: 'balloons', blurb: 'How you like to take part and be rewarded' },
  { id: 'social', chapter: 'you', source: 'social media and reward reclaim', title: 'Social Media & Payouts', emoji: '💳', icon: 'social.svg', palette: ['#00695C', '#12B5CB', '#CBF3F2'], pattern: 'rings', flavor: 'Jade Wallet', celebration: 'coins', blurb: 'Where to reach you and how to pay you' },
  { id: 'additional', chapter: 'health', source: null, title: 'Additional Details', emoji: '✨', icon: 'additional.svg', palette: ['#26287A', '#7C4DFF', '#FFC9F2'], pattern: 'stars', flavor: 'Galaxy Indigo', celebration: 'rocket', blurb: 'Help us understand you even better' },
];

/* ------------------------------------------------------------------ */
/* 2. Fixes for the raw question bank                                  */
/* ------------------------------------------------------------------ */
const MISSING_QUESTION_DEFS = {
  department: { label: 'Which department do you work in?', parent: 'employment-sector' },
  hw: { label: 'Which household responsibilities do you mainly manage?', parent: 'empstat-homeuser', multi: true },
};
const PARENT_FIXES = { 'sport-category': 'cg-sport-participation' };
const DROP = new Set(['freelancer', 'orgspend', 'other-specify']); // other-specify is replaced by the inline "Please specify" box on every "Other" option
const LABEL_FIXES = {
  'employment-industry': 'Please select your industry',
  orgoverseas: 'How many branches does your organization have abroad?',
  'health-service': 'Which digital health services are you currently using?',
  'health-management-app': 'Which types of mobile apps do you use to manage your health or condition?',
  'online-food-grocery-lifestyle-purchase-platforms': 'Which online platforms do you use to purchase food, groceries, or lifestyle products?',
  'pension-homeuser': 'Are you currently receiving a pension?',
  'cg-alcohol-category': 'Which types of alcoholic drinks do you usually consume? (Select all that apply)',
  'survey-participation-frequency': 'How often do you participate in surveys?',
  'survey-participation-time-duration': 'How much time are you comfortable spending on a survey?',
  'willingness-survey-participation': 'Are you willing to participate in future market research studies?',
  'survey-type-interested-in': 'What types of study would you be open to joining?',
  'survey-participation-motivation': 'What motivates you to participate in surveys?',
  'survey-participation-timeslot': 'What is your preferred time of day to participate in surveys?',
  'survey-mode': 'How do you prefer to participate in surveys?',
  'recontact-consent': 'Do you agree to be re-contacted for future studies?',
  'mode-of-payment': 'What type of rewards do you prefer?',
  'payment-method': 'How would you like to receive payments?',
  'share-consent': 'Are you comfortable sharing your health-related experiences for research purposes (confidentially)?',
  'video-survey-participation-consent': 'Are you comfortable participating in online video interviews or discussions (via Zoom, Teams etc.)?',
  'experience-caregiver': 'Approximately how much experience do you have in your current designation?',
  'health-insurance-services-used-past-12-months': 'Which health insurance services have you used in the past 12 months?',
  'additional-certification': 'Have you completed any additional certifications?',
  rural: 'What type of area do you currently live in?',
  'cg-jobrole': 'What is your job title?',
};
// Options removed because they are clearly data-entry mistakes
const OPTION_DROPS = { 'health-service': ['Survey Participation & Rewards Preferences'] };
const OPTION_LABEL_FIXES = { 'Fertilizerrs & Pesticides': 'Fertilizers & Pesticides', 'Horticulture Sector': 'Horticulture Sector', 'Risk & Risk & Security Department': 'Risk & Security Department (Agriculture/Industry)' };
// parentValue spellings that do not exist in the parent question -> canonical parent value
const PARENT_VALUE_ALIASES = {
  'temporary-or-seasonal': 'temporary-seasonal employed',
  govt: 'govt. and defense',
};

/* text (open-ended) questions: type + validation rule + visibility rule */
const TEXT_QUESTIONS = {
  fullname: { type: 'text', rule: 'fullname', autocomplete: 'name' },
  dob: { type: 'date', rule: 'dob', autocomplete: 'bday' },
  mail: { type: 'email', rule: 'email', autocomplete: 'email' },
  zipcode: { type: 'text', rule: 'zip', autocomplete: 'postal-code', when: { q: 'country', any: true } },
  website: { type: 'url', rule: 'url', optional: true, autocomplete: 'url' },
  'cg-jobrole': { type: 'text', rule: 'jobtitle', when: { q: 'department', any: true }, autocomplete: 'organization-title' },
  'cg-allergy-details': { type: 'text', rule: 'specify', when: { q: 'food-allergies', in: ['yes'] } },
  'social-media-x': { type: 'text', rule: 'x', optional: true, prefix: '@' },
  'social-media-youtube': { type: 'text', rule: 'youtube', optional: true },
  'social-media-linkedin': { type: 'text', rule: 'linkedin', optional: true },
  'social-media-facebook': { type: 'text', rule: 'facebook', optional: true },
  'social-media-instagram': { type: 'text', rule: 'instagram', optional: true, prefix: '@' },
  'payment-method-bank-name': { type: 'text', rule: 'bankname', when: { q: 'payment-method', in: ['wire-transfer'] } },
  'payment-method-bank-ifsc': { type: 'text', rule: 'bankcode', when: { q: 'payment-method', in: ['wire-transfer'] }, upper: true },
  'payment-method-bank-account': { type: 'text', rule: 'account', when: { q: 'payment-method', in: ['wire-transfer'] }, inputmode: 'numeric', confirm: true },
  'payment-method-upi': { type: 'text', rule: 'upi', when: { q: 'payment-method', in: ['upi'] } },
  'payment-method-paypal': { type: 'email', rule: 'email', when: { q: 'payment-method', in: ['paypal'] } },
  'payment-method-amazon': { type: 'text', rule: 'amazon', when: { q: 'payment-method', in: ['amazon-gift-card'] } },
};

const GEO = { state: 'state', city: 'city', ethnicity: 'ethnicity', rural: 'rural', 'personal-income': 'pincome', 'household-income': 'hincome' };
const SHARED = new Set(['caregiver-support', 'caregiving-situation']);

const SINGLE_WHICH = new Set(['caregiving-situation', 'care-recipient-category', 'cg-describe', 'cg-describe-professional', 'current-position', 'managed-care-setting', 'supervised-coordinated-facility-type', 'primary-supported-population']);
const MULTI_EXTRA = new Set(['additional-certification', 'management-leadership-compliance-certifications', 'survey-participation-category', 'survey-type-interested-in', 'survey-participation-motivation', 'primary-childcare-responsibilities', 'patient-activities-assisted', 'support-type-provided', 'type-of-support-provided', 'patient-type-of-support-provided', 'type-of-home-care-provided', 'type-of-care-coordinated', 'hw']);
const EXCLUSIVE = new Set(['none', 'none of these', 'none of the above', 'i do not purchase these products online', 'no special diet', 'prefer not to say', 'not applicable']);
const isOther = (label) => /^others?(\b|$)/i.test(clean(label));

/* emoji per question – first matching keyword wins */
const EMOJI_RULES = [
  [/^fullname$/, '🙋'], [/^dob$/, '🎂'], [/^mail$/, '📧'], [/^gender$/, '🧑‍🤝‍🧑'], [/^country$/, '🌍'], [/^ethnicity$/, '🧬'], [/^state$/, '🗺️'], [/^city$/, '🏙️'], [/^zipcode$/, '📮'], [/^rural$/, '🏡'],
  [/income/, '💰'], [/^website$/, '🌐'], [/relationship-status/, '💍'], [/^children$/, '👶'], [/caregiver-support/, '🤝'], [/caregiving-situation/, '🧭'],
  [/education|qualification|certification|degree|diploma|doctorate/, '🎓'], [/licen[sc]e/, '📜'], [/medication/, '💊'], [/decision/, '⚖️'], [/relationship-to-person/, '👪'],
  [/agegroup|age-group/, '🎂'], [/childcare/, '🧸'], [/disability/, '♿'], [/older-adult|elder/, '🧓'], [/residential|facility|location|setting|residence|environment|work-setting/, '🏥'],
  [/experience|duration|years/, '⏳'], [/client|patient|resident|recipient/, '🧑‍⚕️'], [/staff|supervis|position|role|job|employment|employer|emp-status|empstat|department|industry|sector|orgsize|orgoverseas|orgdecision|jobseeker/, '💼'],
  [/pension/, '🏦'], [/^hw$/, '🏠'], [/insurance|claim/, '🛡️'], [/grocery|food|meal|diet/, '🥗'], [/allerg/, '🤧'], [/beverage|drink/, '🧃'], [/alcohol/, '🍷'], [/tobacco|nicotine|smoke/, '🚭'],
  [/suppliment|supplement|wellness/, '💪'], [/hot-drinks/, '☕'], [/sleep/, '😴'], [/vaccine/, '💉'], [/checkup/, '🩺'], [/sport|exercise|physical|fitness/, '🏃'], [/device|app|technolog|digital|health-service/, '📱'],
  [/survey|study|research|recontact|share-consent/, '📋'], [/video/, '🎥'], [/payment|reward|upi|paypal|amazon|bank|account|ifsc/, '💳'], [/social-media-x/, '𝕏'], [/youtube/, '▶️'], [/linkedin/, '💼'], [/facebook/, '👍'], [/instagram/, '📸'],
  [/support|care|assist|task|activit|service|responsib/, '🫶'],
];
const emojiFor = (name) => (EMOJI_RULES.find(([re]) => re.test(name)) || [, '💬'])[1];

/* ------------------------------------------------------------------ */
/* 3. Additional Details profile (custom, validated, not in raw data)  */
/* ------------------------------------------------------------------ */
const opt = (labels) => labels.map((l) => [l, l.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')]);
const ADDITIONAL = {
  'ad-preferred-name': { label: 'What should we call you? (preferred first name or nickname)', type: 'text', rule: 'nickname', emoji: '😊', autocomplete: 'nickname' },
  'ad-mobile': { label: 'Your mobile number (with country code)', type: 'tel', rule: 'phone', emoji: '📞', autocomplete: 'tel', placeholder: '+91 98765 43210' },
  'ad-alt-email': { label: 'Alternative email address (optional)', type: 'email', rule: 'altemail', optional: true, emoji: '✉️' },
  'ad-languages': { label: 'Which languages do you speak fluently?', multi: true, emoji: '🗣️', options: opt(['English', 'Chinese (Mandarin)', 'Hindi', 'Spanish', 'Arabic', 'French', 'Bengali', 'Portuguese', 'Russian', 'Japanese', 'German', 'Korean', 'Italian', 'Turkish', 'Vietnamese', 'Tamil', 'Telugu', 'Marathi', 'Urdu', 'Indonesian / Malay', 'Other']) },
  'ad-survey-language': { label: 'In which language would you prefer to take surveys?', emoji: '🌐', options: opt(['English', 'Chinese', 'Spanish', 'Hindi', 'Arabic', 'French', 'German', 'Portuguese', 'Japanese', 'Korean', 'Russian', 'Italian', 'Other']) },
  'ad-occupation': { label: 'What is your current occupation or job title?', type: 'text', rule: 'jobtitle', emoji: '🧑‍💼', autocomplete: 'organization-title' },
  'ad-household-size': { label: 'How many people live in your household (including you)?', type: 'number', rule: 'household', emoji: '🏠', min: 1, max: 30 },
  'ad-caregiving-years': { label: 'For how many years have you been a caregiver in total?', type: 'number', rule: 'caregivingYears', emoji: '⏳', min: 0, max: 80 },
  'ad-caregiving-hours': { label: 'On average, how many hours per week do you spend caregiving?', type: 'number', rule: 'hoursWeek', emoji: '⏰', min: 0, max: 168 },
  'ad-living-arrangement': { label: 'How close do you live to the person you care for?', emoji: '📍', options: opt(['We live together', 'Less than 30 minutes away', '30–60 minutes away', 'More than 1 hour away', 'In a different country', 'It varies / several people', 'Prefer not to say']) },
  'ad-conditions': { label: 'Which health conditions does the person you care for live with? (Select all that apply)', multi: true, emoji: '🩺', options: opt(["Dementia / Alzheimer's", 'Diabetes', 'Cancer', 'Heart disease', 'Stroke', "Parkinson's disease", 'Arthritis / joint problems', 'COPD / breathing problems', 'Kidney disease', 'Mental health condition', 'Autism spectrum', 'Physical disability', 'Intellectual / developmental disability', 'Recovery after surgery or injury', 'Frailty / old age', 'Other', 'Prefer not to say']) },
  'ad-challenges': { label: 'What are your biggest caregiving challenges? (Select all that apply)', multi: true, emoji: '🧗', options: opt(['Finding enough time', 'Financial pressure', 'Emotional stress', 'Physical strain', 'Navigating the healthcare system', 'Insurance and paperwork', 'Balancing work and care', 'No time for myself / no respite', 'Feeling isolated', 'Getting reliable information', 'Other', 'None']) },
  'ad-support-services': { label: 'Which support services have you used in the last 12 months? (Select all that apply)', multi: true, emoji: '🧩', options: opt(['Respite care', 'Adult day care', 'Home health agency', 'Caregiver support group', 'Counselling / therapy', 'Telehealth / online doctor', 'Meal delivery', 'Transport services', 'Medical equipment rental', 'Other', 'None']) },
  'ad-info-sources': { label: 'Where do you look for caregiving and health information? (Select all that apply)', multi: true, emoji: '🔎', options: opt(['Doctors / nurses', 'Pharmacist', 'Search engines', 'YouTube / video', 'Social media groups', 'Health apps', 'Patient associations / charities', 'Friends and family', 'Books / magazines', 'AI assistants', 'Other']) },
  'ad-smartphone': { label: 'Which smartphone do you mainly use?', emoji: '📲', options: opt(['Android', 'iPhone (iOS)', 'Both', 'Other', 'I do not use a smartphone']) },
  'ad-social-platforms': { label: 'Which social platforms do you use at least weekly? (Select all that apply)', multi: true, emoji: '💬', options: opt(['WhatsApp', 'Facebook', 'Instagram', 'YouTube', 'X (Twitter)', 'LinkedIn', 'TikTok', 'WeChat', 'Telegram', 'Snapchat', 'Reddit', 'Other', 'None']) },
  'ad-hobbies': { label: 'What do you enjoy doing in your free time? (Select all that apply)', multi: true, emoji: '🎨', options: opt(['Reading', 'Cooking / baking', 'Gardening', 'Music', 'Travel', 'Gaming', 'Arts & crafts', 'Movies / TV series', 'Fitness / sports', 'Volunteering', 'Spiritual / religious activities', 'Spending time with family', 'Other']) },
  'ad-how-heard': { label: 'How did you hear about MyHealthOpinions?', emoji: '📣', options: opt(['Search engine', 'Social media', 'Friend or family', 'Email invitation', 'Healthcare provider', 'Online advertisement', 'Caregiver community / association', 'Other']) },
  'ad-about': { label: 'Tell us a little about yourself and your caregiving journey', type: 'textarea', rule: 'about', emoji: '📝', min: 30, max: 600, placeholder: 'For example: who you care for, a typical day, what helps you most…' },
  'ad-wish': { label: 'If one product or service could make caregiving easier for you, what would it be? (optional)', type: 'textarea', rule: 'wish', optional: true, emoji: '💡', max: 400 },
};

/* ------------------------------------------------------------------ */
/* 4. Build                                                            */
/* ------------------------------------------------------------------ */
const qByName = new Map(QUESTIONS.map((q) => [q.name, q]));
const optsByQ = new Map();
for (const o of OPTIONS) {
  if (!optsByQ.has(o.question)) optsByQ.set(o.question, []);
  optsByQ.get(o.question).push(o);
}

const profiles = [];
const usedNames = [];
for (const meta of PROFILE_META) {
  let names = [];
  if (meta.source) {
    const p = PROFILES.find((x) => x.category === 'care giver' && x.name === meta.source);
    if (!p) throw new Error('Profile not found: ' + meta.source);
    for (const page of p.pages) names.push(...page.slice(1));
  } else names = Object.keys(ADDITIONAL);
  names = names.filter((n) => {
    if (DROP.has(n)) { report.droppedQuestions.push({ profile: meta.id, question: n }); return false; }
    if (DROP_2026.has(n)) { report.droppedQuestions.push({ profile: meta.id, question: n, duplicateOf: DUPLICATE_OF[n] }); return false; }
    return true;
  });
  names = [...new Set(names)];
  for (const n of names) if (!usedNames.includes(n)) usedNames.push(n);
  const { source, ...rest } = meta;
  profiles.push({ ...rest, questions: names });
}

const questions = {};
const contentStrings = new Set();
const parentOf = (n) => PARENT_FIXES[n] ?? MISSING_QUESTION_DEFS[n]?.parent ?? (qByName.get(n)?.parent || '');

for (const name of usedNames) {
  if (ADDITIONAL[name]) {
    const a = ADDITIONAL[name];
    const q = { label: a.label, emoji: a.emoji };
    if (a.options) {
      q.type = 'choice';
      if (a.multi) q.multi = 1;
      q.options = a.options.map(([l, v]) => {
        contentStrings.add(l);
        const o = [l, v];
        return o;
      });
      decorateChoice(q, name);
    } else Object.assign(q, pick(a, ['type', 'rule', 'optional', 'min', 'max', 'placeholder', 'autocomplete']));
    contentStrings.add(a.label);
    if (a.placeholder) contentStrings.add(a.placeholder);
    questions[name] = q;
    continue;
  }
  const raw = qByName.get(name);
  const def = MISSING_QUESTION_DEFS[name];
  let label = LABEL_FIXES[name] ?? clean(raw?.label ?? def?.label ?? name);
  if (LABEL_FIXES[name] && raw) report.labelFixes.push({ question: name, from: clean(raw.label), to: label });
  if (!raw && def) report.notes.push(`Question "${name}" is used in a profile but missing from the question bank – label added: "${label}"`);
  const parent = parentOf(name);
  if (PARENT_FIXES[name]) report.fixedParents.push({ question: name, declared: raw?.parent, used: parent });
  const q = { label, emoji: emojiFor(name) };
  if (parent) q.parent = parent;
  if (SHARED.has(name)) q.shared = 1;
  contentStrings.add(label);

  if (TEXT_QUESTIONS[name]) {
    Object.assign(q, TEXT_QUESTIONS[name]);
    patchOptions(q, name);
    delete q.parent;
    questions[name] = q;
    continue;
  }
  if (name === 'country') {
    q.type = 'choice';
    q.options = optsByQ.get('country').map((o) => [clean(o.label), clean(o.value)]).sort((a, b) => a[0].localeCompare(b[0]));
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
  const rawOpts = (optsByQ.get(name) || []).filter((o) => !(OPTION_DROPS[name] || []).includes(clean(o.label)));
  if (!rawOpts.length) { report.notes.push(`Question "${name}" has no options and no text definition – skipped`); continue; }
  q.type = 'choice';
  const isMulti = /select all/i.test(label) || MULTI_EXTRA.has(name) || MISSING_QUESTION_DEFS[name]?.multi || (/^which\b/i.test(label) && !SINGLE_WHICH.has(name));
  if (isMulti) q.multi = 1;

  // canonical parent values
  const parentOpts = parent ? optsByQ.get(parent) || [] : [];
  const parentLookup = new Map();
  for (const po of parentOpts) {
    parentLookup.set(norm(po.value), clean(po.value));
    parentLookup.set(norm(po.label), clean(po.value));
  }
  const seen = new Set();
  q.options = [];
  for (const o of rawOpts) {
    const lab = OPTION_LABEL_FIXES[clean(o.label)] ?? clean(o.label);
    const val = clean(o.value);
    if (seen.has(val)) continue;
    seen.add(val);
    const entry = [lab, val];
    if (o.parentValue && o.parentValue.length) {
      const pv = [];
      for (const t of o.parentValue) {
        const k = norm(t);
        const hit = parentLookup.get(k) ?? parentLookup.get(PARENT_VALUE_ALIASES[k] ?? '');
        if (hit !== undefined) pv.push(hit);
        else report.unmatchedParentValues.push({ question: name, option: lab, parent, value: t });
      }
      entry.push([...new Set(pv)]);
    }
    q.options.push(entry);
    if (!LONG_LIST(name)) contentStrings.add(lab);
  }
  patchOptions(q, name);
  decorateChoice(q, name);
  patchFlags(q, name);
  questions[name] = q;
}

function LONG_LIST(n) { return ['education-diploma', 'education-ug', 'education-pg', 'education-doctorate', 'education-associate-degree', 'employment-sector', 'department'].includes(n); }
function pick(o, keys) { const r = {}; for (const k of keys) if (o[k] !== undefined) r[k] = o[k]; return r; }
function decorateChoice(q, name) {
  if (name && !LONG_LIST(name)) {
    q.oe = q.options.map((o) => optionEmoji(name, o[0]) || q.emoji || '💬');
    // several plain number ranges in one question → give each its own keycap so no two tiles look alike
    const KEY = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    if (q.oe.filter((e) => e === '🔢').length > 1) { let k = 0; q.oe = q.oe.map((e) => (e === '🔢' ? KEY[Math.min(k++, 9)] : e)); }
    // same for repeated duration icons: grow from seedling to tree as time increases
    const GROW = ['🌱', '🌿', '🪴', '🌳', '🌲', '🏔️'];
    if (q.oe.filter((e) => e === '⏳').length > 1) { let k = 0; q.oe = q.oe.map((e) => (e === '⏳' ? GROW[Math.min(k++, 5)] : e)); }
    // last pass: any emoji still repeated inside one question gets a close sibling, so every option tile is unique
    // (flags are exempt – two languages from the same country rightly share a flag)
    const used = new Set();
    q.oe = q.oe.map((e) => {
      if (!used.has(e) || /^[\u{1F1E6}-\u{1F1FF}]/u.test(e)) { used.add(e); return e; }
      const alt = (EMOJI_ALT[e] || []).concat(EMOJI_ALT_ANY).find((a) => !used.has(a) && !q.oe.includes(a)) || e;
      used.add(alt); return alt;
    });
  }
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

/* content strings: profile titles/blurbs */
for (const p of profiles) { contentStrings.add(p.title); contentStrings.add(p.blurb); }

/* ------------------------------------------------------------------ */
/* 5. Geo split per country                                            */
/* ------------------------------------------------------------------ */
fs.rmSync(path.join(OUT, 'geo'), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'geo', 'cities'), { recursive: true });
const countries = new Set(questions.country.options.map((o) => o[1]));
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
  fs.writeFileSync(path.join(OUT, 'geo', cc + '.json'), s);
  const c = cities[cc] || {};
  for (const sv in c) c[sv] = [...new Set(c[sv])].sort((a, b) => a.localeCompare(b));
  const cs = JSON.stringify(c);
  cityBytes += cs.length;
  fs.writeFileSync(path.join(OUT, 'geo', 'cities', cc + '.json'), cs);
}
for (const s of ['Urban', 'Rural']) contentStrings.add(s);

/* ------------------------------------------------------------------ */
/* 6. Write                                                            */
/* ------------------------------------------------------------------ */
const out = { version: new Date().toISOString().slice(0, 10), profiles, questions };
fs.writeFileSync(path.join(OUT, 'caregiver.json'), JSON.stringify(out));
fs.writeFileSync(path.join(OUT, 'content-strings.en.json'), JSON.stringify([...contentStrings].sort(), null, 1));
fs.writeFileSync(path.join(OUT, 'data-report.json'), JSON.stringify(report, null, 2));

const qCount = Object.keys(questions).length;
console.log(`✔ caregiver.json  ${(JSON.stringify(out).length / 1024).toFixed(1)} KB  · ${profiles.length} profiles · ${qCount} questions`);
console.log(`✔ geo/*.json      ${(geoBytes / 1024).toFixed(1)} KB total for ${countries.size} countries`);
console.log(`✔ geo/cities/*    ${(cityBytes / 1024).toFixed(1)} KB total`);
console.log(`✔ ${contentStrings.size} translatable strings · report: ${report.unmatchedParentValues.length} unmatched parent values, ${report.notes.length} notes`);
