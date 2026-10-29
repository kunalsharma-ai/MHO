import { OPTION_API } from '../data/site.js';
import { getData } from './api.js';

// The choices for a profile question ("Your world"), straight from the backend: GET /api/v1/option/<question name>.
// Each option has a `label` to show and a `value` that is saved as the answer. `parentValue` lists the option values
// of the parent question this option belongs to (e.g. job roles of one industry); empty = always available.
export function normalizeOptions(list) {
  const seen = new Set();
  return (Array.isArray(list) ? list : [])
    .map((o) => ({
      value: String((o && o.value) ?? '').trim(),
      label: String((o && (o.label || o.value)) ?? '').trim(),
      parentValue: Array.isArray(o && o.parentValue) ? o.parentValue.map(String) : [],
    }))
    .filter((o) => o.value && o.label && !seen.has(o.value) && seen.add(o.value));
}

const cache = new Map(); // in memory only
export function loadOptions(question) {
  if (!cache.has(question)) {
    cache.set(
      question,
      getData(`${OPTION_API}/${encodeURIComponent(question)}`)
        .then((res) => normalizeOptions(res.data))
        .catch(() => {
          cache.delete(question); // try again next time; the form falls back to its built-in choices
          return [];
        }),
    );
  }
  return cache.get(question);
}

export function resetOptions() {
  cache.clear();
}

// Options that apply for the chosen parent value (an option with no parentValue always applies).
export const optionsFor = (options, parent) => options.filter((o) => !o.parentValue.length || (parent && o.parentValue.includes(parent)));
export const isDependent = (options) => options.some((o) => o.parentValue.length);
