/**
 * A unique, meaningful emoji for every answer option.
 *
 *   1. hand-picked emoji for the exact option label (EXACT, plus per-question overrides in BY_QUESTION)
 *   2. sequences for ordered scales (counts, durations, years, frequencies) so each step looks different
 *   3. keyword rules for the very long lists (159 specialities, 32 management roles …) — src/lib/keywordEmoji.js
 *   4. a large pool of distinct clinical / general emoji as the last resort
 * Inside one question no emoji is used twice (duplicates move on to the next free emoji).
 */
import { keywordEmoji } from './keywordEmoji.js';

const EXACT = {
  Yes: '✅', No: '❌', Male: '👨‍⚕️', Female: '👩‍⚕️', Other: '✳️', Others: '✳️', Both: '🔀',
  'Prefer not to answer': '🤐', 'Currently under process': '⏳', 'Under process': '⏳', 'Currently pursuing': '📖',
  Urban: '🏙️', Rural: '🌾', 'Semi-Urban': '🏘️', Public: '🏛️', Private: '🏢',
  'Single, never married': '🧍', Married: '💍', 'Separated, divorced or widowed': '🕊️', 'Domestic partnership/living with someone': '🏡',
  Hospital: '🏥', 'Private Clinic': '🩺', 'Nursing Home': '🛏️', Pharmacy: '💊', Laboratory: '🧪', 'Community Health Center': '🏘️',
  'Healthcare Management': '📊', 'Medical Doctors & Physicians': '🧑‍⚕️', Surgeons: '🔪', 'Dental Professionals': '🦷', 'Nursing & Midwifery': '🤱',
  'Pharmacy Professionals': '💊', 'Laboratory & Diagnostic Professionals': '🔬', 'Allied Health Professionals': '🦾', 'Health IT & Admin Professionals': '💻',
  'Support Staff (Ancillary)': '🧰',
  Diploma: '📜', 'Bachelor’s': '🎓', 'Master’s': '🎖️', Doctorate: '👨‍🔬',
  'Nursing diploma (GNM/ANM)': '👩‍⚕️', 'Paramedical diploma (Lab technician, Radiology, Physiotherapy, etc.)': '🚑', 'Pharmacy diploma (D.Pharm)': '💊', 'Other healthcare-related diploma': '📄',
  'MBBS (Medicine)': '🩺', 'BDS (Dentistry)': '🦷', 'B.Sc Nursing': '👩‍⚕️', 'B.Pharm (Pharmacy)': '💊', 'BPT (Physiotherapy)': '🦴',
  'MD/MS (Postgraduate Medicine/Surgery)': '⚕️', 'MDS (Dentistry)': '😁', 'M.Sc Nursing': '🧑‍⚕️', 'M.Pharm (Pharmacy)': '⚗️', 'MPT (Physiotherapy)': '🏃', 'Other Healthcare Master Degree': '🎓',
  'DM/MCh (Super-specialty Medicine/Surgery)': '🏆', 'PhD (Healthcare/Medical Science)': '🔬',
  'Yes, with national medical/dental/nursing/pharmacy council': '🏛️', 'Yes, with state medical/dental/nursing/pharmacy council': '🗺️',
  'Yes, National Medical Council or equivalent': '🏛️', 'Yes, International Medical Board (e.g., USMLE, MRCP, FRCS)': '🌐',
  Weekly: '📅', 'Bi-Weekly': '🗓️', Monthly: '📆', Quarterly: '🧭', Rarely: '🐢', 'As available': '🕊️', Daily: '☀️', Occasionally: '🌤️',
  "Never, but I'm interested": '🤔', 'Never, not interested': '🚫',
  Online: '💻', Telephone: '☎️', 'face-to-face': '🤝', Morning: '🌅', Afternoon: '☀️', Evening: '🌙',
  'Healthcare / Patient-related': '🩺', 'Consumer / Product feedback': '🛍️', 'Online opinion polls': '📊', 'In-person / Telephone interviews': '🎙️',
  'Online (via link or email)': '📧', 'Mobile app': '📱', 'Telephone / CATI': '☎️', 'In-person interview': '🤝',
  'Online surveys': '🖥️', 'Telephonic interviews': '📞', 'Focus group discussions': '👥', 'Product trials / concept tests': '🧪', 'Diary or long-term tracking studies': '📔',
  'Sharing my opinion': '💬', 'Helping improve healthcare / products': '❤️‍🩹', 'Receiving rewards or incentives': '🎁', 'Learning new information': '💡',
  Zoom: '🎥', 'Microsoft Teams': '👔', 'Google Meet': '📹', Skype: '☁️', 'WhatsApp Video': '💚',
  'Sharing your opinions on camera (e.g., interviews)': '🎙️', 'Demonstrating product use on video': '🎬', 'Participating in a group video discussion': '👨‍👩‍👧‍👦',
  'Amazon Gift Card': '🎁', Paypal: '🅿️', 'Unified Payment Interface (UPI)': '⚡', 'Wire Transfer': '🏦',
  English: '🇬🇧', Hindi: '🇮🇳', 'Mandarin Chinese': '🇨🇳', Spanish: '🇪🇸', French: '🇫🇷', Arabic: '🇸🇦', Portuguese: '🇵🇹', Russian: '🇷🇺',
  German: '🇩🇪', Japanese: '🇯🇵', Korean: '🇰🇷', Italian: '🇮🇹', Bengali: '🇧🇩', Tamil: '🛕', Telugu: '🪷', Urdu: '🇵🇰',
  'Newborns & infants (0–1)': '👶', 'Children (2–12)': '🧒', 'Adolescents (13–17)': '🧑‍🎓', 'Adults (18–64)': '🧑', 'Older adults (65+)': '👴', "I don't see patients": '🗂️',
  Oncology: '🎗️', 'Cardiology & Vascular': '🫀', 'Diabetes & Endocrinology': '🩸', Respiratory: '🫁', Neurology: '🧠', 'Mental Health': '🧘',
  'Infectious Diseases': '🦠', 'Immunology & Rheumatology': '🛡️', Haematology: '🩸', Nephrology: '🫘', 'Gastroenterology & Hepatology': '🫃',
  Dermatology: '🧴', Ophthalmology: '👁️', "Women's Health": '♀️', Paediatrics: '🧸', 'Rare Diseases': '🦓', Vaccines: '💉', 'Pain & Anaesthesia': '😴',
  'Yes, independently': '✍️', 'Yes, under supervision / protocol': '📋', None: '⭕', 'None of these': '⭕',
  'Conference speaker': '🎤', 'Advisory board member': '🧑‍💼', 'Clinical trial investigator': '🧪', 'Guideline author / committee member': '📘',
  'Medical educator / trainer': '👨‍🏫', 'Journal reviewer / editor': '📰',
  'Medical journals': '📚', 'Medical conferences': '🎟️', 'Clinical guidelines': '📘', 'Online medical portals': '🌐', 'Pharma / medtech representatives': '💼',
  'Peer discussions': '🗣️', 'Professional social networks': '🔗', 'Webinars & e-learning': '🎓',
  'Android smartphone': '🤖', iPhone: '📱', Tablet: '📲', 'Laptop / Desktop': '💻', 'Smartwatch / Wearable': '⌚',
  Monday: '🌑', Tuesday: '🌒', Wednesday: '🌓', Thursday: '🌔', Friday: '🌕', Saturday: '🎉', Sunday: '🛋️',
  'Full-Time Healthcare Professional / Employee': '🏥', 'Private Practice / Self-Employed Healthcare Professional': '🩺', 'Government / Public-Sector Healthcare Professional': '🏛️',
  'Contract / Temporary Healthcare Professional': '📝', 'Healthcare Consultant / Independent Practitioner': '🧑‍💼', 'Healthcare Academic / Teaching Professional': '👩‍🏫',
  'Healthcare Research / Clinical Research Professional': '🔬', 'Healthcare Administrator / Management Professional': '📊', 'Healthcare Professional in NGO / Public Health Organisation': '🌍',
  'Healthcare Professional in Pharma / MedTech / HealthTech': '💊', 'Healthcare Professional in Training / Residency / Internship': '🎓',
};

/* ordered scales: the n-th option of these questions gets the n-th emoji */
const SEQ = {
  count: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
  size: ['🏠', '🏤', '🏢', '🏥', '🏙️', '🌆'],
  grow: ['🌱', '🌿', '🪴', '🌳', '🏔️', '⭐'],
  clock: ['⚡', '🕐', '🕑', '🕒', '🕓', '🕕'],
  people: ['🧍', '👥', '👨‍👩‍👦', '🏟️', '🌍', '🌐'],
  bars: ['▫️', '🔹', '🔷', '💠', '🌀', '🌟'],
  money: ['🪙', '💵', '💶', '💷', '💰', '💎', '🏦', '👑', '🏆'],
};
const BY_QUESTION = {
  'personal-income': 'money', 'household-income': 'money',
  children: 'count', 'facility-size': 'size', experience: 'grow', 'add-years-current-role': 'grow', 'patients-per-week': 'people',
  'doc-clinical-trials-count': 'bars', 'survey-participation-time-duration': 'clock', 'add-consult-duration': 'clock',
  'add-prescriptions-week': 'bars', 'add-rep-interactions': 'people', 'add-publications': 'bars', 'add-conferences-year': 'count',
};

const POOL_LIST = ['🩺', '💊', '🧬', '🔬', '🧪', '🩻', '🫀', '🧠', '🦷', '🦴', '👁️', '🫁', '🩸', '💉', '🩹', '🌡️', '🧫', '🦠', '⚕️', '🏥', '🚑', '📋', '🗂️', '📊', '📈', '🧾',
  '🧑‍⚕️', '👩‍⚕️', '👨‍⚕️', '🛏️', '🧘', '🏃', '🍎', '🥗', '💡', '🔭', '⚗️', '🧲', '🛰️', '📡', '💻', '📱', '⌚', '🎧', '🎓', '📚', '📘', '📗', '📙', '📕', '✍️', '🗣️', '💬',
  '🤝', '🧩', '🎯', '🏆', '🥇', '🎖️', '🏅', '⭐', '🌟', '✨', '🔷', '🔶', '🟢', '🟣', '🟠', '🔵', '🌀', '🌈', '🌊', '🌿', '🌸', '🌻', '🍀', '🌍', '🧭', '⏱️', '⏳', '📆',
  '🗓️', '🔔', '🔑', '🛡️', '⚙️', '🧰', '🔧', '🪄', '🎗️', '🧸', '🎁', '🧑‍🔬', '🧑‍🏫', '🧑‍💼', '🏛️', '🏢', '🏠', '🚀', '✈️', '⚓', '🎨', '🎵', '📰', '🔒', '🔓', '📌', '📍',
  '🧷', '🪪', '💼', '🖥️', '🖨️', '📷', '🎥', '🎙️', '📞', '☎️', '📧', '📨', '🌐', '🔗', '🧮', '📐', '📏', '🗃️', '🗄️', '🧯', '🪥', '🧴', '🧼', '🫧', '🦺', '🥼', '🧤', '😷',
  '🤒', '🤕', '🦽', '🦯', '🩼', '🫶', '🙌', '👏', '💪', '🦾', '🦿', '🧏', '👂', '👃', '👅', '🫦', '🍏', '🥕', '🥦', '🍇', '🍊', '🍋', '🍉', '🍓', '🥝', '🍒', '🥥', '🌰',
  '🫘', '🧄', '🧅', '🌶️', '🌽', '🥔', '🍄', '🌵', '🌴', '🌲', '🌳', '🌾', '🌺', '🌼', '🌷', '🪷', '🪻', '🍁', '🍂', '🌙', '☀️', '⛅', '❄️', '🔥', '💧', '⚡', '☄️', '🪐', '🌠'];

/* healthcare-specific keywords (specialities, organs, roles) — every match is a candidate, in this order */
const MED = [
  [/cardi|heart|vascular|electrophysiolog/i, ['🫀', '💓', '❤️‍🩹', '💗']], [/neuro|brain|stroke|epilep|movement disorder/i, ['🧠', '⚡', '🌀']], [/onco|cancer|tumou?r/i, ['🎗️', '🎀']],
  [/nephro|kidney|renal/i, ['🫘', '💧']], [/pulmo|respir|lung|thorac/i, ['🫁', '🌬️']], [/sleep/i, '😴'], [/gastro|\bgi\b|hepat|colorect|pancrea|motility/i, ['🫃', '🍽️', '🌡️']],
  [/derma|skin|tricho/i, ['🧴', '🧖', '💆']], [/cosmetic|aesthetic/i, '💅'], [/ophthalm|retina|cornea|glaucoma|\beye|lasik|refractive|vision/i, ['👁️', '👓', '🔦', '🎯']],
  [/\bent\b|otolog|neurotolog|rhino|laryng|skull base|head & neck/i, '👂'], [/hearing|audiolog|vestibular/i, '🦻'], [/speech|swallow|dysphag/i, '🗣️'],
  [/radiol|imaging|x-?ray|mammo|breast imaging/i, ['🩻', '📡', '🖥️']], [/nuclear/i, '☢️'], [/anaesth|anesth/i, '💉'], [/pain/i, '🩹'],
  [/emergency|\ber\b|trauma|disaster/i, '🚑'], [/critical care|icu|intensiv/i, '🏥'], [/histo|cyto|patholog/i, ['🔬', '🧫', '🧪']], [/molecular|genetic|genom/i, '🧬'],
  [/microbio|infect|hiv|tropical|virolog/i, ['🦠', '🧫', '😷']], [/travel/i, '🧳'], [/haemat|hemat|blood|transfusion|thromb|sickle/i, ['🩸', '💉', '🅰️']],
  [/thyroid|endocrin/i, '🦋'], [/diabet|metabolic/i, '🍬'], [/obesity|weight/i, '⚖️'], [/reproduct|fertil|obstet|gynae|women/i, '🤰'],
  [/rheumat|immun|allerg/i, '🛡️'], [/spine|orthop|joint|bone|hand & upper|foot & ankle|shoulder/i, ['🦴', '🦿', '🦾', '🩼']], [/sport|exercise|concussion/i, '🏅'],
  [/rehab|physiatr/i, '🦽'], [/palliat|hospice/i, '🕊️'], [/geriat|elderly|older/i, '👴'], [/psychiatr/i, '🧠'], [/psycholog|psychometric/i, ['💭', '🧩', '🗨️']],
  [/counsel|therapist|mental health/i, '🧘'], [/addiction|substance/i, '🚭'], [/forensic/i, '🕵️'], [/school/i, '🏫'],
  [/occupational|corporate health|environmental health|medical review/i, '👷'], [/biochem|chemistry|chemical/i, '⚗️'],
  [/internal medicine|internist|hospitalist|general practitioner|family medicine|primary care/i, '🩺'],
  [/paediatric|pediatric|neonat|child/i, '🧒'], [/surgeon|surgical/i, '🥼'], [/nurse|nursing/i, '👩‍⚕️'],
  [/resident|fellow|trainee|intern\b|house officer|student/i, '🎓'], [/senior|consultant/i, '🏅'],
  [/chief|director|superintendent|head of|vice president|\bdean\b|ceo|coo|cfo|officer/i, '💼'],
  [/coordinator|program/i, '📋'], [/quality|assurance|compliance/i, '✅'], [/research|investigat|scientist/i, '🔬'], [/technician|technolog/i, '🧰'],
  [/physician|doctor|medical officer|attending/i, '👨‍⚕️'], [/specialist/i, '⚕️'],
];
const GENERIC_MED = ['🩺', '⚕️', '🥼', '📋', '🏥', '🔬', '🧪', '💊', '🧑‍⚕️', '📈', '🗂️', '🧾', '🔖', '📌', '🧭', '🎯', '✨'];
const medCandidates = (label) => MED.filter(([re]) => re.test(label)).flatMap(([, e]) => (Array.isArray(e) ? e : [e]));

const cache = new Map();

/** emoji list for the option list of one question (same order as `options`) */
export function emojiFor(name, options) {
  const key = name + '|' + options.map((o) => o.v).join('|');
  if (cache.has(key)) return cache.get(key);
  const used = new Set();
  const seq = SEQ[BY_QUESTION[name]];
  const take = (e) => { if (e && !used.has(e)) { used.add(e); return e; } return null; };
  const out = options.map((o, i) => {
    const label = String(o.l || '');
    const first = take(seq && !/^(None|I don't see patients|Other)/i.test(label) ? seq[Math.min(i, seq.length - 1)] : null) || take(EXACT[label]);
    if (first) return first;
    for (const e of medCandidates(label)) { const got = take(e); if (got) return got; }
    return take(keywordEmoji(label, null)) || null;
  });
  let g = 0;
  for (let i = 0; i < out.length; i++) {
    if (out[i]) continue;
    while (g < GENERIC_MED.length && used.has(GENERIC_MED[g])) g++;
    if (g < GENERIC_MED.length) { out[i] = GENERIC_MED[g]; used.add(out[i]); g++; }
  }
  let p = 0;
  for (let i = 0; i < out.length; i++) {
    if (out[i]) continue;
    while (p < POOL_LIST.length && used.has(POOL_LIST[p])) p++;
    out[i] = POOL_LIST[p] || '•';
    used.add(out[i]);
    p++;
  }
  cache.set(key, out);
  return out;
}
