/**
 * 2026 question review (Latest New 2026 Caregiving Questions document).
 *
 * Every change here is applied on top of the live question bank, inside this package only.
 * Nothing in the database is changed or deleted, and members' saved answers stay where they are.
 *
 *   PROFILE_EDITS   questions placed on, moved between or removed from a profile
 *   DROP_2026       questions no longer asked because another question already asks the same thing
 *   PATCHES         option, single/multi, required, limit and "please specify" changes per question
 */

const PNS = ['Prefer not to say', 'Prefer not to say'];
const OTHER = ['Other (please specify)', 'Other'];

export const PROFILE_EDITS = {
  // the allergy details box moves with the allergy question that is kept (Personal Health)
  'personal health profile': { after: { 'cg-food-allergy': ['cg-allergy-details'] } },
  'food and lifestyle': { remove: ['cg-allergy-details'] },
  // existing bank questions that the 2026 document asks
  'professional profile': { after: { 'primary-work-location': ['direct-patient-care-proportion'] } },
  'survey participation and reward preferences profile': { after: { 'video-survey-participation-consent': ['video-platforms', 'video-based-research'] } },
};

// question → the question that already asks the same thing (kept)
export const DUPLICATE_OF = {
  'food-allergies': 'cg-food-allergy', // Food & Lifestyle vs Personal Health, same wording
  'ad-occupation': 'cg-jobrole', // Professional Profile → "What is your job title?"
  'ad-mobile': 'account:phone', // mobile number is already on the account (sign-up, My Account)
  'ad-alt-email': 'account:alternate-email', // My Account → Alternate contact
};
export const DROP_2026 = new Set(Object.keys(DUPLICATE_OF));

export const PATCHES = {
  'cg-allergy-details': { when: { q: 'cg-food-allergy', in: ['yes'] } },
  'caregiving-situation': { add: [PNS] },
  'relationship-to-person': { add: [PNS], multi: true },
  'care-recipient-category': { add: [PNS], multi: true },
  'cg-describe': { add: [PNS] },
  'unpaid-healthcare-activities': { optional: true },
  'primary-care-recipient': { add: [['Other', 'Other']] },
  'employer-type': { add: [['Other', 'Other']] },
  // the export gave "Yes" the value "No", so only one of the two options could be shown
  'direct-patient-care-proportion': { icons: { '75%+': '🌕' } },
  'paid-disability-support': { replace: [['Yes', 'Yes'], ['No', 'No']] },
  'caregiving-staff-supervised-managed': { replace: [['None', 'None'], ['1–5', '1-5'], ['6–10', '6-10'], ['11–25', '11-25'], ['26–50', '26-50'], ['More than 50', 'More than 50']] },
  'management-leadership-compliance-certifications': { add: [OTHER], before: 'None' },
  'health-management-app': { add: [OTHER] },
  'survey-participation-category': { add: [OTHER] },
  'survey-participation-motivation': { add: [OTHER] },
  'licensed-clinical-role': { relabel: { Yes: 'Yes – please specify licence type, registration number and validity' }, specify: ['Yes'] },
  'practicing-licensed': { relabel: { 'Yes active license': 'Yes, active licence – please specify licence type or certification state, registration number and validity' }, specify: ['Yes active license'] },
  'health-insurance-services-used-past-12-months': { add: [['None', 'None']] },
  'tobacco-nicotine-purchase-frequency': { add: [['Monthly', 'Monthly']], before: 'Less often' },
  education: {
    // "High school" and "Diploma or GED" become one option; it keeps the "diploma" value so the diploma follow-up still works
    replace: [['Less than high school', 'basic'], ['High school diploma or GED', 'diploma'], ['Some college, no degree', 'college-dropout'], ['Associate degree (AA, AS)', 'associate degree'], ['Bachelor’s degree (BA, BS)', 'bachelors degree'], ['Master’s degree (MA, MS, MBA, etc.)', 'masters degree'], ['Professional degree (MD, JD, DDS, etc.)', 'professional degree'], ['Doctorate degree (PhD, EdD, etc.)', 'doctorate degree'], OTHER],
    alias: { 'high-school': 'diploma' },
  },
  'empstat-homeuser': { add: [['Student', 'Student']], before: 'Homemaker' },
  'relationship-status': {
    replace: [['Single', 'single'], ['Married', 'married'], ['Living with partner', 'living in'], ['Divorced', 'divorced'], ['Widowed', 'widowed'], ['Separated', 'separated'], ['Prefer not to say', 'skip']],
    icons: { 'living in': '💑', widowed: '🕊️', separated: '↔️' },
  },
  children: { parentValues: ['married', 'separated', 'divorced', 'widowed', 'living in', 'skip'] },
  'video-platforms': { relabel: { Other: 'Other (please specify)' }, icons: { 'Microsoft Teams': '💼', 'Google Meet': '📹', Skype: '☎️', 'WhatsApp Video': '📱' } },
  'video-based-research': { label: 'Are you open to taking part in video-based research that may require any of these? (Select all that apply)', multi: true, optional: true, icons: { 'Sharing your opinions on camera (e.g., interviews)': '🗣️', 'Participating in a group video discussion': '👥' } },
};

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

/** Label, single/multi and option changes, run on [label, value, parentValues?] entries before emojis are chosen. */
export function patchOptions(q, name) {
  const p = PATCHES[name];
  if (!p) return;
  if (p.label) q.label = p.label;
  if (p.multi) q.multi = 1;
  if (p.when) q.when = p.when;
  if (!q.options) return;
  const pv = q.options.find((o) => o[2])?.[2];
  const withPv = (l, v) => (pv ? [l, v, [...pv]] : [l, v]);
  if (p.replace) q.options = p.replace.map(([l, v]) => withPv(l, v));
  for (const [l, v] of p.add || []) {
    if (q.options.some((o) => o[1] === v)) continue;
    const at = p.before ? q.options.findIndex((o) => o[0] === p.before) : -1;
    if (at >= 0) q.options.splice(at, 0, withPv(l, v));
    else q.options.push(withPv(l, v));
  }
  if (p.relabel) q.options = q.options.map((o) => (p.relabel[o[1]] ? [p.relabel[o[1]], ...o.slice(1)] : o));
  if (p.parentValues) q.options = q.options.map((o) => [o[0], o[1], [...p.parentValues]]);
}

/** Flags that must be set after the "Other"/exclusive indexes are worked out. */
export function patchFlags(q, name) {
  const p = PATCHES[name];
  if (!p || !q.options) return;
  if (p.max) q.max = p.max;
  if (p.optional) q.optional = true;
  if (p.icons && q.oe) q.oe = q.options.map((o, i) => p.icons[o[1]] || q.oe[i]);
  if (p.alias) q.alias = p.alias;
  if (p.specify) {
    const idx = q.options.map((o, i) => (p.specify.includes(o[1]) ? i : -1)).filter((i) => i >= 0);
    q.other = [...new Set([...(q.other || []), ...idx])].sort((a, b) => a - b);
  }
}
