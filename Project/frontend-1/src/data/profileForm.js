// The patient and caregiver sign-up questions, as the backend has them.
//
// Which backend questions each step asks is decided in scripts/sync-form-from-db.mjs (PROFILES); wording, options and the
// parent → child rules come from the backend's own question bank (dbForm.generated.js). A question is asked only when its
// parent question was answered with one of the values the backend lists for it, e.g. "Which best describes your caregiving
// situation?" only after "Are you providing care? → Yes". The answers are kept per backend question name: single choice =
// the option label, multiple choice = a list of labels (the backend values are looked up here, see dbMap.js).
import { DB_FORM } from './dbForm.generated.js';

const Q = DB_FORM.questions;

export const PROFILE_STEPS = Object.fromEntries(
  Object.entries(DB_FORM.profiles).map(([role, steps]) => [role, Object.entries(steps).map(([id, questions]) => ({ id, questions }))]),
);
export const isMulti = (name) => /multi|checkbox/i.test(Q[name].type);
const valueOfLabel = (name, label) => Q[name].options.find((o) => o[0] === label)?.[1];

/**
 * Options of a question when its parent has these BACKEND values ([] = the question is not asked).
 * Same rule as the backend's survey (web-1 asks POST /api/v1/option/<question> { parentValue }): a child question offers only the
 * options that list the parent's value; an option with no parent value is never offered under a parent, and a question with no
 * option to offer is not shown.
 */
export function optionsForParentValues(name, parentValues) {
  const q = Q[name];
  if (!q.parent) return q.options;
  const values = [].concat(parentValues ?? []).filter((v) => v !== undefined && v !== '');
  if (!values.length) return [];
  return q.options.filter((o) => o[2]?.length && o[2].some((p) => values.includes(p)));
}
/** options of a question given the answers (labels) chosen so far */
export function optionsFor(name, answers = {}) {
  const parent = Q[name].parent;
  if (!parent) return Q[name].options;
  const labels = [].concat(answers[parent] ?? []);
  return optionsForParentValues(name, labels.map((l) => valueOfLabel(parent, l)).filter((v) => v !== undefined));
}

/** the questions of one step that are asked now, with the options that apply */
export function visibleQuestions(role, stepId, answers = {}) {
  const step = PROFILE_STEPS[role]?.find((s) => s.id === stepId);
  if (!step) return [];
  return step.questions
    .map((name) => ({ name, label: Q[name].label, multi: isMulti(name), options: optionsFor(name, answers).map((o) => o[0]) }))
    .filter((q) => q.options.length > 0);
}

/** removes answers whose question is no longer asked or whose option is no longer offered (after the person changed a parent answer) */
export function pruneAnswers(role, answers) {
  const names = (PROFILE_STEPS[role] || []).flatMap((s) => s.questions);
  const current = { ...answers };
  for (let round = 0; round <= names.length; round++) {
    let changed = false;
    for (const name of names) {
      if (!(name in current)) continue;
      const offered = optionsFor(name, current).map((o) => o[0]);
      const value = current[name];
      const kept = Array.isArray(value) ? value.filter((x) => offered.includes(x)) : offered.includes(value) ? value : '';
      const empty = Array.isArray(kept) ? kept.length === 0 : !kept;
      if (empty) { delete current[name]; changed = true; }
      else if (Array.isArray(kept) && kept.length !== value.length) { current[name] = kept; changed = true; }
    }
    if (!changed) break;
  }
  return current;
}
export const isFilled = (v) => (Array.isArray(v) ? v.length > 0 : !!v);
