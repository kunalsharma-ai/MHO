/**
 * 2026 question review (Patients 2026 document).
 *
 * Every change here is applied on top of the live question bank, inside this package only.
 * Nothing in the database is changed or deleted, and members' saved answers stay where they are.
 *
 *   PROFILE_EDITS   questions placed on, moved between or removed from a profile
 *   DROP_2026       questions no longer asked because another question already asks the same thing
 *   PATCHES         option, single/multi, limit and "please specify" changes per question
 */

const PNS = ['Prefer not to say', 'Prefer not to say'];
const YES_MR = ['Yes, within the last 6 months', 'Yes, 6-12 months ago', 'Yes, 1-2 years ago', 'Yes, more than 2 years ago'];

// Each profile is matched by its name in the database. "after" places questions right after another one;
// "remove" takes them off that profile (used together with "after" on another profile to move a question).
export const PROFILE_EDITS = {
  // existing bank questions that the 2026 document asks in About You. Age is asked again on purpose:
  // the chosen band must agree with the date of birth, a simple check that a real person is answering.
  'basic profile': { after: { 'relationship-status': ['patient-age', 'patient-living-arrangement', 'patient-care-support'] } },
  // the drink and tobacco follow-ups now follow the 2026 questions they depend on
  'food and lifestyle profile': { remove: ['alcohol-category', 'smoke-category'] },
  'lifestyle and behaviour': { after: { 'smoking-tobacco-nicotine': ['smoke-category'], 'consume-alcohlic-beverages': ['alcohol-category'] } },
  // the survey history follow-ups now follow the 2026 question "Have you participated in market research?" (document Q62)
  'survey participation and reward preferences profile': { remove: ['survey-participation-frequency', 'survey-participation-category', 'other-survey-panel'] },
  'clinical research and market research experience': { after: { 'participate-market-research': ['survey-participation-frequency', 'survey-participation-category', 'other-survey-panel'] } },
  // "How would you rate your overall health?" is asked once, in General Health
  'personal health profile': { remove: ['health-status'] },
};

// profiles whose questions are loaded with another profile, so a follow-up there can read an answer given here:
// the condition follow-ups in Personal Health open from the conditions picked in Medical Conditions (document Q12)
export const PRELOAD = {
  'personal health profile': ['medical condition profile'],
};

// "Have you been diagnosed with any of these chronic conditions?" (Personal Health) asked the same thing as
// "Which of the following conditions have you ever been diagnosed with?" (Medical Conditions, document Q12).
// It is no longer asked; its follow-ups now open from the document question. Old value → document values.
export const REPARENT = {
  from: 'chronic-conditions',
  to: 'disease-types',
  values: {
    Diabetes: ['Diabetes'],
    Hypertension: ['High blood pressure/hypertension'],
    'High Cholesterol': ['High cholesterol'],
    Asthma: ['Asthma'],
    Arthritis: ['Arthritis'],
    'Heart Disease': ['Heart disease'],
    'Depression or Anxiety': ['Depression', 'Anxiety'],
    Obesity: ['Obesity'],
    Cancer: ['Cancer'],
    'Thyroid disorder': ['Thyroid condition'],
    'Sleep Apnea': ['Sleep apnea'],
    'Skin Disorder': ['Skin condition'],
    'Gastric / Digestive / Urinary': ['Digestive/Gastrointestinal condition', 'Kidney disease', 'Liver disease'],
    'Neurologic / Nervous': ['Neurological condition', 'Migraine', 'Epilepsy', 'Multiple sclerosis', "Parkinson's disease", "Alzheimer's/dementia", 'Stroke'],
    'Vision / Hearing Impairments': ['Eye/vision condition', 'Hearing condition'],
    'Autoimmune / Blood': ['Autoimmune condition'],
    'Dental Disorder': ['Dental/oral health condition'],
    'Bone and Musculoskeletal / Cervical Disorders': ['Musculoskeletal condition', 'Osteoporosis'],
    'Male / Female Health': ["Women's health condition", "Men's health condition", 'Sexual/reproductive health condition'],
    HIV: ['HIV/AIDS'],
  },
};

// question → the question that already asks the same thing (kept)
export const DUPLICATE_OF = {
  alcohol: 'consume-alcohlic-beverages', // Food, Drink & Fitness vs Lifestyle & Habits (document Q52)
  smoke: 'smoking-tobacco-nicotine', // Food, Drink & Fitness vs Lifestyle & Habits (document Q51)
  'sleep-duration': 'hours-sleep', // Food, Drink & Fitness vs Lifestyle & Habits (document Q53)
  'health-insurance': 'health-insurance-currenlty', // Personal Health vs Insurance & Costs (document Q45)
  'health-insurance-type': 'health-insurance-currenlty', // the insurance type is part of the Q45 answer options
  'ad-mobile': 'account:phone', // mobile number is already on the account (sign-up, My Account)
  'ad-alt-email': 'account:alternate-email', // My Account → Alternate contact
  'ad-diagnosis-year': 'first-diagnosed-timing', // Medical Conditions → "Approximately when were you first diagnosed?"
  'survey-participation-history': 'participate-market-research', // document Q62, which also gives how recently
  'willingness-survey-participation': 'participating-future-healthcare-market', // document Q64
  'survey-type-interested-in': 'types-of-research-consider-participating', // document Q65
  'survey-mode': 'types-of-research-consider-participating', // online / phone / in person are options of Q65
  'survey-participation-time-duration': 'spending-time-on-research', // document Q66
  'recontact-consent': 'contacted-for-research-opportunities', // document Q75
  'mode-of-payment': 'payment-method', // Survey Participation & Reward Preferences
  'use-fitness-mobile-app': 'health-medical-apps', // document Q40
  'health-management-app': 'types-of-health-apps', // document Q41
  'chronic-conditions': 'disease-types', // document Q12, see REPARENT
  'receiving-treatment': 'receiving-treatment-primary-condition', // the document asks it twice (Q73 and Q25); Q25 is kept
};
export const DROP_2026 = new Set(Object.keys(DUPLICATE_OF));

export const PATCHES = {
  'patient-age': { check: 'ageBand', icons: { 'Under 18': '🧒', '18-24': '🧑', '25-34': '🧑‍💼', '35-44': '🧔', '45-54': '👩', '55-64': '👩‍🦳', '65-74': '🧓', '75+': '👴' } },
  gender: {
    replace: [['Male', 'Male'], ['Female', 'Female'], ['Non-binary', 'Non-binary'], ['Prefer to self-describe', 'Other'], PNS],
    icons: { Other: '✍️' },
    specify: ['Other'], // "Prefer to self-describe" keeps the value of the old "Other" option and opens a text box
  },
  'relationship-status': {
    replace: [['Single', 'single'], ['Married', 'married'], ['Living with partner', 'living in'], ['Divorced', 'divorced'], ['Widowed', 'widowed'], ['Separated', 'separated'], ['Prefer not to say', 'skip']],
    icons: { 'living in': '💑', widowed: '🕊️', separated: '↔️' },
  },
  // "Number of children" was shown for married / separated / living with partner / prefer not to say; divorced and widowed are the old "separated" group
  children: { parentValues: ['married', 'separated', 'divorced', 'widowed', 'living in', 'skip'] },
  'patient-health-condition': { add: [PNS] },
  'condition-diagnsis-by-healthcareprofessional': { add: [PNS] },
  'delayed-healthcare-cost': { add: [PNS] },
  'types-of-documentation': { add: [PNS] },
  'descrive-typical-diet': {
    replace: [['Balanced/healthy', 'balanced-healthy'], ['Mostly healthy', 'mostly-healthy'], ['Mixed', 'mixed'], ['Mostly unhealthy', 'mostly-unhealthy'], ['Special therapeutic diet', 'special-therapeutic-diet'], ['Other', 'other']],
    icons: { 'balanced-healthy': '🥗', 'mostly-healthy': '🍎', mixed: '🍱', 'mostly-unhealthy': '🍟', 'special-therapeutic-diet': '🩺' },
  },
  'factors-choosing-treatment': { max: 3 },
  'smoke-category': { parent: 'smoking-tobacco-nicotine', parentValues: ['Daily', 'Occasionally'] },
  'survey-participation-frequency': { parent: 'participate-market-research', parentValues: YES_MR },
  'survey-participation-category': { parent: 'participate-market-research', parentValues: YES_MR },
  'other-survey-panel': { parent: 'participate-market-research', parentValues: YES_MR },
  'alcohol-category': { parent: 'consume-alcohlic-beverages', parentValues: ['Daily', 'Several times a week', 'Weekly', 'Occasionally'] },
};

const keyOf = (name) => String(name ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
/** Names of the profile documents to load together with this one. */
export function preloadFor(name) {
  return [...(PRELOAD[keyOf(name)] || []), ...(PRELOAD['*'] || [])].filter((n) => n !== keyOf(name));
}

/** Moves the follow-ups of a dropped question onto the question that is kept (REPARENT), on the built questions. */
export function remapParents(questions) {
  const map = (list) => [...new Set(list.flatMap((v) => REPARENT.values[v] || []))];
  for (const q of Object.values(questions)) {
    if (q.parent === REPARENT.from) {
      q.parent = REPARENT.to;
      if (q.options) q.options = q.options.map((o) => (o[2] ? [o[0], o[1], map(o[2])] : o));
    }
    if (q.when?.q === REPARENT.from) {
      const byLow = Object.fromEntries(Object.entries(REPARENT.values).map(([k, v]) => [k.toLowerCase(), v]));
      q.when = { ...q.when, q: REPARENT.to, in: [...new Set((q.when.in || []).flatMap((v) => byLow[String(v).toLowerCase()] || []))] };
    }
  }
}

/** Applies PROFILE_EDITS and DROP_2026 to the profile documents from the database (returns copies). */
export function editProfileDocs(docs) {
  return (docs || []).map((doc) => {
    const key = String(doc?.name ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    const edit = PROFILE_EDITS[key] || {};
    if (!doc?.pages) return doc;
    const remove = new Set([...(edit.remove || []), ...DROP_2026]);
    const placed = new Set(Object.values(edit.after || {}).flat());
    const pages = doc.pages.map((page) => {
      const out = [page[0]];
      for (const n of page.slice(1)) {
        if (remove.has(n) || placed.has(n)) continue;
        out.push(n);
        for (const add of edit.after?.[n] || []) out.push(add);
      }
      return out;
    });
    return { ...doc, pages };
  });
}

/** Option changes, run on [label, value, parentValues?] entries before emojis are chosen. */
export function patchOptions(q, name) {
  const p = PATCHES[name];
  if (!p || !q.options) return;
  const pv = q.options.find((o) => o[2])?.[2];
  const withPv = (l, v) => (pv ? [l, v, [...pv]] : [l, v]);
  if (p.replace) q.options = p.replace.map(([l, v]) => withPv(l, v));
  for (const [l, v] of p.add || []) if (!q.options.some((o) => o[1] === v)) q.options.push(withPv(l, v));
  if (p.parent) q.parent = p.parent;
  if (p.parentValues) q.options = q.options.map((o) => [o[0], o[1], [...p.parentValues]]);
}

/** Flags that must be set after the "Other"/exclusive indexes are worked out. */
export function patchFlags(q, name) {
  const p = PATCHES[name];
  if (!p || !q.options) return;
  if (p.max) q.max = p.max;
  if (p.check) q.check = p.check;
  if (p.optional) q.optional = true;
  if (p.icons && q.oe) q.oe = q.options.map((o, i) => p.icons[o[1]] || q.oe[i]);
  if (p.specify) {
    const idx = q.options.map((o, i) => (p.specify.includes(o[1]) ? i : -1)).filter((i) => i >= 0);
    q.other = [...new Set([...(q.other || []), ...idx])].sort((a, b) => a - b);
  }
}
