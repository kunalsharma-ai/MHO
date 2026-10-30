// Turns the filled-in sign-up form into backend answers: { '<Question name>': '<Option value>' | ['<Option value>', …] }.
//
// The backend keeps every answer as { question, answer: [option values] } and the welcome survey reads those same rows, so what is
// saved here shows up already filled in there. The answers wait in this browser (localStorage, max 7 days) after sign-up and are
// saved to the account with PATCH /api/v1/me/answer at the first log-in, then removed — see utils/pendingAnswers.js.
//
// There is no translation table: the form is built from the backend's own questions (hcpForm.js ← dbForm.generated.js ←
// scripts/sync-form-from-db.mjs), so every option the person can pick has a backend value, and that value is stored.
// The backend does not validate answers sent to that route, so scripts/check-form-vs-db.mjs proves — against the backend's real
// question bank — that nothing wrong can be sent. Run it after every change here and whenever the backend's questions change.
//
// Healthcare professionals (hcpForm.js), patients and caregivers (profileForm.js) are all built from the backend's questions.
// Free text (licence number, employer, phone, e-mail, address, city, zip) is never stored in the browser.
import { DB_FORM, ROLES, LEVEL_QUESTIONS } from './hcpForm.js';
import { PROFILE_STEPS, isMulti, optionsForParentValues } from './profileForm.js';

const Q = DB_FORM.questions;

/** [form field, backend question, parent question (when the backend only offers the option under a parent answer)] */
export const FLAT_FIELDS = [
  ['industry', 'works_in_healthcare'],
  ['clinician', 'clinician', 'works_in_healthcare'],
  ['marital', 'relationship-status'],
  ['children', 'children', 'relationship-status'],
  ['eduLevel', 'doc-education'],
  ['employment', 'doc-employment-status'],
  ['sector', 'sector', 'doc-employment-status'],
  ['facility', 'facility-type'],
  ['beds', 'facility-size'],
  ['setting', 'practice-location'],
  ['teaching', 'teaching-hospital'],
  ['years', 'experience'],
  ['patients', 'patients-per-week'],
  ['trials', 'clinical-trials'],
  ['trialsCount', 'doc-clinical-trials-count', 'clinical-trials'],
  ['purchases', 'doc-decision-making-purchase'],
  ['formulary', 'doc-drug-formulary-procurement'],
  ['devices', 'doc-equipments-purchase'],
  ['policy', 'doc-healthpolicy-guidelines'],
  ['ehr', 'electronic-health-record-usage'],
  ['telemed', 'telemedicine'],
  ['digitalInit', 'health-initiatives'],
  ['onlineOk', 'online-surveys'],
  ['mode', 'participating-research'],
  ['frequency', 'research-participation'],
  ['time', 'survey-participation-timeslot'],
  ['recontact', 'recontact-consent'],
  ['focus', 'focus-groups'],
];
/** every form field this module reads (checked against the Join form by scripts/check-form-vs-db.mjs) */
export const FORM_FIELDS = [...FLAT_FIELDS.map((f) => f[0]), 'eduQual', 'eduLicence', 'primaryRole', 'spec', 'job', 'labEnv', 'dbq'];

const text = (v) => (v === undefined || v === null ? '' : String(v).trim());
const normKey = (s) => String(s ?? '').toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^a-z0-9]+/g, ' ').trim();

/** patients and caregivers: form.dbq holds the chosen labels per backend question; a question is stored only under its stored parent answer */
function buildProfileAnswers(form) {
  const answers = form.dbq && typeof form.dbq === 'object' ? form.dbq : {};
  const out = {};
  for (const step of PROFILE_STEPS[form.role] || []) {
    for (const name of step.questions) {
      const parent = Q[name].parent;
      const offered = optionsForParentValues(name, parent ? out[parent] : undefined);
      const values = [].concat(answers[name] ?? [])
        .map((label) => offered.find((o) => o[0] === text(label))?.[1])
        .filter((v) => v !== undefined);
      if (values.length) out[name] = isMulti(name) ? [...new Set(values)] : values[0];
    }
  }
  return out;
}

export function buildSignupAnswers(form) {
  if (!form) return {};
  if (form.role === 'patient' || form.role === 'caregiver') return buildProfileAnswers(form);
  if (form.role !== 'hcp') return {};
  const out = {};

  // an option is stored only if the backend has it, and — when the backend offers it only under a parent answer — only under that answer
  const put = (question, label, parentQuestion) => {
    const option = Q[question]?.options.find((o) => o[0] === text(label));
    if (!option) return;
    if (Q[question].parent) { // the backend offers a child question's options only under its parent's answer (option with no parent value: never)
      const parent = out[parentQuestion || Q[question].parent];
      if (!option[2]?.length || parent === undefined || ![].concat(parent).some((p) => option[2].includes(p))) return;
    }
    out[question] = option[1];
  };

  for (const [field, question, parent] of FLAT_FIELDS) put(question, form[field], parent);

  // education: the qualification and licence questions that belong to the chosen level ("Others" has a free-text qualification: not stored)
  const level = LEVEL_QUESTIONS[normKey(form.eduLevel)];
  if (level && out['doc-education'] !== undefined) {
    put(level[0], form.eduQual, 'doc-education');
    put(level[1], form.eduLicence, 'doc-education');
  }

  // role → specialization → job level, as the backend relates them (a job is stored only under the specialization / role it belongs to)
  const role = ROLES.find((r) => r.id === form.primaryRole);
  if (role) {
    out['doc-expertise'] = role.db.value;
    const jobs = role.db.specs ? role.db.specs[text(form.spec)] : role.db;
    if (role.db.specs && jobs) out['doc-specialization'] = jobs.value;
    if (jobs) for (const [question, byLabel] of Object.entries(jobs.jobs || {})) if (byLabel[text(form.job)] !== undefined) out[question] = byLabel[text(form.job)];
    if (role.env) {
      const chosen = (Array.isArray(form.labEnv) ? form.labEnv : []).map((l) => Q.workenvironment.options.find((o) => o[0] === text(l))?.[1]).filter((v) => v !== undefined);
      if (chosen.length) out.workenvironment = [...new Set(chosen)];
    }
  }
  return out;
}
