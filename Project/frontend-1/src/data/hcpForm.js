// The healthcare-professional sign-up questions, as the backend has them.
//
// Wording, options and the role → specialization → job-level tree come from dbForm.generated.js, which is generated from the
// backend's own question bank (scripts/sync-form-from-db.mjs), so what the person picks IS what the backend stores — see dbMap.js.
// What stays here is only what the backend does not have: icons, colours, the income bands and small UI rules.
// (src/data/hcpProfile.js keeps the older marketing data used by the Audience page and the chat assistant.)
import { DB_FORM } from './dbForm.generated.js';
import * as Old from './hcpProfile.js';

export { ageGroupFrom, maskLicence } from './hcpProfile.js';
export { DB_FORM };

const Q = DB_FORM.questions;
const norm = (s) => String(s ?? '').toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^a-z0-9]+/g, ' ').trim();
const labelsOf = (name) => Q[name].options.map((o) => o[0]);
const ask = (name) => ({ q: Q[name].label, options: labelsOf(name) });

export const SCREENER = {
  industry: ask('works_in_healthcare'),
  clinician: ask('clinician'),
  rejectMessage: Old.SCREENER.rejectMessage,
};

/** The backend only asks "children" under some marital statuses (not for "Single, never married"). */
const maritalValue = (label) => Q['relationship-status'].options.find((o) => o[0] === label)?.[1];
const childrenParents = new Set(Q.children.options.flatMap((o) => o[2] || []));
export const DEMO = {
  gender: Old.DEMO.gender,
  marital: ask('relationship-status'),
  children: { ...ask('children'), askedFor: (maritalLabel) => !!maritalLabel && childrenParents.has(maritalValue(maritalLabel)) },
  // income bands: the backend keeps them per country in local currency, so these stay as before (they are not stored)
  personalIncome: Old.DEMO.personalIncome,
  familyIncome: Old.DEMO.familyIncome,
};

// highest level → qualification question + licence / registration question of that level
export const LEVEL_QUESTIONS = {
  diploma: ['doc-education-diploma', 'doc-education-diploma-certified'],
  'bachelor s': ['doc-education-bachelors', 'doc-education-bachelors-registered'],
  'master s': ['doc-education-masters', 'doc-education-master-recognition'],
  doctorate: ['doc-education-doctorate', 'doc-education-doctorate-registered'],
  others: ['doc-education-others', 'doc-education-others-registered'],
};
export const EDUCATION = (() => {
  const levels = labelsOf('doc-education');
  const branches = {};
  for (const level of levels) {
    const [qualQ, licenceQ] = LEVEL_QUESTIONS[norm(level)] || [];
    if (!qualQ) continue;
    const qual = Q[qualQ];
    const licence = Q[licenceQ];
    branches[level] = { q2: qual.label, o2: qual.options.length ? qual.options.map((o) => o[0]) : null, q3: licence.label, o3: licence.options.map((o) => o[0]) };
  }
  return { q: Q['doc-education'].label, levels, branches };
})();

export const PRACTICE = {
  employment: ask('doc-employment-status'),
  sector: ask('sector'),
  facility: ask('facility-type'),
  beds: ask('facility-size'),
  setting: ask('practice-location'),
  teaching: ask('teaching-hospital'),
};
export const EXPERIENCE = {
  years: ask('experience'),
  patients: ask('patients-per-week'),
  trials: ask('clinical-trials'),
  trialsCount: ask('doc-clinical-trials-count'),
};
export const INFLUENCE = [
  { key: 'purchases', q: Q['doc-decision-making-purchase'].label },
  { key: 'formulary', q: Q['doc-drug-formulary-procurement'].label },
  { key: 'devices', q: Q['doc-equipments-purchase'].label },
  { key: 'policy', q: Q['doc-healthpolicy-guidelines'].label },
];
export const DIGITAL = [
  { key: 'ehr', q: Q['electronic-health-record-usage'].label },
  { key: 'telemed', q: Q.telemedicine.label },
  { key: 'digitalInit', q: Q['health-initiatives'].label },
  { key: 'onlineOk', q: Q['online-surveys'].label },
];
export const AVAILABILITY = {
  mode: ask('participating-research'),
  frequency: ask('research-participation'),
  time: ask('survey-participation-timeslot'),
  recontact: ask('recontact-consent'),
  focus: ask('focus-groups'),
};
export const CERTIFICATION = Old.CERTIFICATION;

/* ---------- roles: id / icon / colour of the old form + the backend's specializations and job levels ---------- */
const slug = (s) => norm(s).replace(/ /g, '-');
export const ROLES = DB_FORM.roles.map((r) => {
  const old = Old.ROLES.find((x) => norm(x.label) === norm(r.label));
  const base = { id: old?.id || slug(r.label), label: r.label, icon: old?.icon || 'briefcase', color: old?.color || '#2457f5', kind: r.kind };
  const dbJobs = (lists) => Object.fromEntries(Object.entries(lists).map(([q, list]) => [q, Object.fromEntries(list.map(([l, v]) => [l, v]))]));
  if (r.kind === 'spec-jobs') {
    return {
      ...base,
      specLabel: old?.specLabel || 'Please select your specialization',
      specs: Object.fromEntries(r.specs.map((s) => [s.label, s.jobs['doc-joblevel'].map(([l]) => l)])),
      ...(old?.kind === 'lab' ? { env: labelsOf('workenvironment') } : {}),
      db: { value: r.value, specs: Object.fromEntries(r.specs.map((s) => [s.label, { value: s.value, jobs: dbJobs(s.jobs) }])) },
    };
  }
  const lists = Object.values(r.jobs);
  const shownJobs = [...new Set(lists.flat().map(([l]) => l))];
  const first = lists[0].map(([l]) => l);
  return { ...base, jobs: first.length === shownJobs.length ? first : shownJobs, db: { value: r.value, jobs: dbJobs(r.jobs) } };
});
export const roleById = (id) => ROLES.find((r) => r.id === id);
