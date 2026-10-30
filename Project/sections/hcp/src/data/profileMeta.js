// Visual identity of every profile: emoji, gradient, completion animation ("fx"), illustration and flavour name.
// Change colours/emoji here — the rest of the app picks them up automatically.
// Visual identity of every profile (v3.0 "Clinical Genome").
//   emoji   card / rung badge          a,b,c   the profile's own 3-colour palette (gradient a→b, accent c)
//   deep    the dark base its card / question flow sits on (never white)
//   pattern the animated background texture of its card + question flow (lib/patterns.js)
//   fx      its own completion show (components/fx.js) and fanfare (lib/sound.js)
//   gene    short "gene code" printed on its DNA rung (purely decorative)
// Add a profile to the question bank and give it a line here — every other part of the UI picks it up.
// Unknown slugs get a generated identity (metaOf), so a 12th or a 120th profile never breaks the page.
export const PROFILE_META = {
  basic:                   { emoji: '🫀', fx: 'ecg',      pattern: 'ecg',      a: '#FF4D6D', b: '#FF9E7A', c: '#FFD6A5', deep: '#3A0A1C', flavor: 'Vital Pulse',          gene: 'VTL', mins: 3 },
  'professional-category': { emoji: '🏥', fx: 'cross',    pattern: 'grid',     a: '#2F6BFF', b: '#38C8FF', c: '#B8F1FF', deep: '#071A45', flavor: 'Hospital Grid',        gene: 'HSP', mins: 2 },
  professional:            { emoji: '🩺', fx: 'helix',    pattern: 'rings',    a: '#8B3DFF', b: '#D88BFF', c: '#F3D1FF', deep: '#200A45', flavor: 'Specialty Spectrum',   gene: 'SPC', mins: 2 },
  educational:             { emoji: '🎓', fx: 'caps',     pattern: 'laurel',   a: '#F5A400', b: '#FFD84D', c: '#FFF1B8', deep: '#2E1C00', flavor: 'Graduation Gold',      gene: 'EDU', mins: 2 },
  experience:              { emoji: '🏅', fx: 'medal',    pattern: 'chevron',  a: '#FF6A13', b: '#FFB36B', c: '#FFE0C2', deep: '#3A1404', flavor: 'Clinical Mastery',     gene: 'EXP', mins: 2 },
  'professional-address':  { emoji: '📍', fx: 'pin',      pattern: 'contour',  a: '#00B39B', b: '#5FF0D6', c: '#C8FFF4', deep: '#012E2A', flavor: 'Practice Map',         gene: 'MAP', mins: 3 },
  documents:               { emoji: '🛡️', fx: 'stamp',    pattern: 'hex',      a: '#10B76F', b: '#8EF0B9', c: '#D9FFE9', deep: '#03301B', flavor: 'Verified Credentials', gene: 'DOC', mins: 2 },
  'social-media':          { emoji: '💰', fx: 'coins',    pattern: 'coins',    a: '#E0A100', b: '#FFE45C', c: '#7CF0B0', deep: '#2B2300', flavor: 'Rewards & Social',     gene: 'PAY', mins: 2 },
  technical:               { emoji: '💻', fx: 'pixels',   pattern: 'circuit',  a: '#0AA5C8', b: '#6FF0FF', c: '#C5FBFF', deep: '#02283A', flavor: 'Digital Health',       gene: 'DGT', mins: 2 },
  'survey-participation':  { emoji: '💬', fx: 'bubbles',  pattern: 'bubbles',  a: '#E8267D', b: '#FF9CD0', c: '#FFD9EC', deep: '#3A0623', flavor: 'Voice of Medicine',    gene: 'VOX', mins: 3 },
  'additional-details':    { emoji: '🧬', fx: 'molecule', pattern: 'molecule', a: '#5B4BFF', b: '#22D3EE', c: '#C9C4FF', deep: '#100B3D', flavor: 'Molecular Deep-Dive',  gene: 'MOL', mins: 4 },
};

/** identity for any slug — generated from a hash for profiles added later without a line above */
const FX = ['ecg', 'cross', 'helix', 'caps', 'medal', 'pin', 'stamp', 'coins', 'pixels', 'bubbles', 'molecule'];
const PAT = ['ecg', 'grid', 'rings', 'laurel', 'chevron', 'contour', 'hex', 'coins', 'circuit', 'bubbles', 'molecule'];
const EMO = ['🩻', '💉', '🧪', '🔬', '🫁', '🧠', '🦷', '👁️', '🦴', '🩹', '💊', '🩸', '🧫', '⚕️'];
const hsl = (h, s, l) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('');
};
const cache = {};
export function metaOf(slug) {
  if (PROFILE_META[slug]) return PROFILE_META[slug];
  if (cache[slug]) return cache[slug];
  let h = 0; for (const ch of String(slug)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const hue = h % 360;
  cache[slug] = {
    emoji: EMO[h % EMO.length], fx: FX[h % FX.length], pattern: PAT[(h >> 3) % PAT.length],
    a: hsl(hue, 85, 56), b: hsl((hue + 35) % 360, 90, 68), c: hsl((hue + 35) % 360, 95, 88), deep: hsl(hue, 70, 12),
    flavor: '', gene: String(slug).replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase() || 'GEN', mins: 3,
  };
  return cache[slug];
}

export const profileImage = (slug) => `images/profiles/${slug}.svg`;

// One emoji per question (shown big and animated above the question).
export const QUESTION_EMOJI = {
  fullname: '🪪', mail: '📧', gender: '🧑‍⚕️', dob: '🎂', country: '🌍', ethnicity: '🧬', state: '🗺️', city: '🏙️',
  zipcode: '📮', rural: '🏡', 'personal-income': '💵', 'household-income': '🏠', 'relationship-status': '💍',
  children: '👨‍👩‍👧', website: '🌐',
  'doc-employment-status': '💼', sector: '🏛️', 'facility-type': '🏥', 'facility-size': '🛏️',
  'practice-location': '🧭', 'teaching-hospital': '👩‍🏫',
  'doc-expertise': '⚕️', 'doc-specialization': '🔬', 'doc-joblevel': '📶', 'healthcare-management-job-role': '🧑‍💼',
  'doc-education': '🎓', 'doc-education-diploma': '📜', 'doc-education-diploma-certified': '✅',
  'doc-education-bachelors': '🎓', 'doc-education-bachelors-registered': '🏅', 'doc-education-masters': '🎖️',
  'doc-education-master-recognition': '🏆', 'doc-education-doctorate': '👨‍🔬', 'doc-education-doctorate-registered': '🌐',
  'doc-education-others': '✍️', 'doc-education-others-registered': '📋',
  experience: '⏳', 'patients-per-week': '🧑‍🤝‍🧑', 'clinical-trials': '🧪', 'doc-clinical-trials-count': '🔢',
  'survey-participation-frequency': '📅', 'doc-decision-making-purchase': '🛒', 'doc-drug-formulary-procurement': '💊',
  'doc-equipments-purchase': '🩻', 'doc-healthpolicy-guidelines': '📘',
  phone: '📱', 'practice-city': '🏙️', 'practice-locality': '🛣️', zip_code_of_practice: '📮', 'employer-address': '🏢',
  'name-of-employer': '🏨', 'email-id': '📨', linkedin: '🔗',
  'electronic-health-record-usage': '🗂️', telemedicine: '📹', 'health-initiatives': '📲', 'online-surveys': '🖱️',
  'participating-research': '🤝', 'research-participation': '🔁', 'survey-participation-timeslot': '⏰',
  'recontact-consent': '📞', 'focus-groups': '👥',
  'survey-participation-history': '📝', 'survey-participation-category': '🗳️', 'other-survey-panel': '🧾',
  'survey-mode': '📡', 'survey-participation-time-duration': '⏱️', 'willingness-survey-participation': '🙋',
  'survey-type-interested-in': '🎯', 'share-consent': '🤲', 'survey-participation-motivation': '🚀',
  'video-survey-participation-consent': '🎥', 'video-platforms': '💻', 'video-based-research': '🎬',
  clinician: '👩‍⚕️', 'medical-certification-no': '🔖', 'issueing-authority': '🏛️', 'year-of-issueing': '📆',
  'certification-no': '📎',
  'social-media-x': '✖️', 'social-media-youtube': '▶️', 'social-media-linkedin': '💼', 'social-media-instagram': '📸',
  'social-media-facebook': '👍', 'payment-method': '💳', 'payment-method-bank-name': '🏦', 'payment-method-bank-ifsc': '🔤',
  'payment-method-bank-account': '🔐', 'payment-method-upi': '⚡', 'payment-method-paypal': '🅿️', 'payment-method-amazon': '🎁',
  'add-languages-spoken': '🗣️', 'add-registration-country': '🌐', 'add-graduation-year': '🎓', 'add-years-current-role': '📈',
  'add-hours-per-week': '⏲️', 'add-patient-care-share': '🩹', 'add-consult-duration': '⌛', 'add-patient-age-groups': '👶',
  'add-therapy-areas': '🎯', 'add-conditions-treated': '📋', 'add-prescriber': '💊', 'add-prescriptions-week': '🧾',
  'add-hospital-affiliations': '🏥', 'add-rep-interactions': '🤝', 'add-kol-roles': '🎤', 'add-publications': '📚',
  'add-conferences-year': '🎟️', 'add-cme-hours': '🧠', 'add-society-memberships': '🏛️', 'add-info-sources': '📰',
  'add-ai-usage': '🤖', 'add-devices': '📱', 'add-best-days': '🗓️', 'add-clinical-focus': '🔭',
};

// Small emoji hints for common option labels (purely decorative).
export const OPTION_EMOJI = {
  Yes: '✅', No: '❌', Male: '👨', Female: '👩', Other: '✳️', Others: '✳️',
  Morning: '🌅', Afternoon: '☀️', Evening: '🌙', Weekly: '📅', Monthly: '🗓️', Quarterly: '📆', Rarely: '🐢',
  Online: '💻', Telephone: '☎️', 'face-to-face': '🤝', Hospital: '🏥', 'Private Clinic': '🩺', 'Nursing Home': '🛏️',
  Pharmacy: '💊', Laboratory: '🧪', 'Community Health Center': '🏘️', Urban: '🏙️', Rural: '🌾', 'Semi-Urban': '🏘️',
  Public: '🏛️', Private: '🏢', Both: '🔀', Diploma: '📜', 'Bachelor’s': '🎓', 'Master’s': '🎖️', Doctorate: '👨‍🔬',
  'Healthcare Management': '🧑‍💼', 'Medical Doctors & Physicians': '🩺', Surgeons: '🔪', 'Dental Professionals': '🦷',
  'Nursing & Midwifery': '👩‍⚕️', 'Pharmacy Professionals': '💊', 'Laboratory & Diagnostic Professionals': '🔬',
  'Allied Health Professionals': '🦾', 'Health IT & Admin Professionals': '🖥️', 'Support Staff (Ancillary)': '🧰',
  'Amazon Gift Card': '🎁', Paypal: '🅿️', 'Unified Payment Interface (UPI)': '⚡', 'Wire Transfer': '🏦',
  Zoom: '🎦', 'Microsoft Teams': '🟣', 'Google Meet': '🟢', Skype: '🔵', 'WhatsApp Video': '💚',
  Married: '💍', 'Single, never married': '🙂', 'Prefer not to answer': '🤐', Daily: '⚡', Occasionally: '🌤️',
};
