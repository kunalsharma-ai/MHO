// Question engine: visibility rules, option filtering (parent → child), lazy option sources and progress.
import { loadJSON } from './loader.js';
import { validate, isOtherSelected } from './validation.js';

export const PROFILES = [];
export const QUESTIONS = {};
export const PROFILE_BY_SLUG = {};
export const PENDING = {};
export const BACKEND = {};

export function mergeProfile(slug, profile, questions) {
  Object.assign(QUESTIONS, questions);
  Object.assign(PROFILE_BY_SLUG[slug], profile);
  delete PENDING[slug];
  estCache.clear();
}

export function setData(data) {
  PROFILES.splice(0, PROFILES.length, ...data.profiles);
  for (const k of Object.keys(QUESTIONS)) delete QUESTIONS[k];
  Object.assign(QUESTIONS, data.questions);
  for (const k of Object.keys(PROFILE_BY_SLUG)) delete PROFILE_BY_SLUG[k];
  for (const p of PROFILES) PROFILE_BY_SLUG[p.slug] = p;
}

export const otherKey = (name) => `${name}::other`;

/* ------------------------------------------------------------------ lazy sources */
const lazy = { states: null, ethnicity: null, income: null, joblevel: null, cities: {} };
const listeners = new Set();
const notify = () => listeners.forEach((fn) => fn());
export const subscribeLazy = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

const SOURCE_FILE = { states: 'data/states.json', ethnicity: 'data/ethnicity.json', income: 'data/income.json', joblevel: 'data/joblevel.json' };

export function ensureSource(source, country) {
  const root = source.split('.')[0];
  if (root === 'cities') {
    if (!country || lazy.cities[country] !== undefined) return;
    lazy.cities[country] = 'loading';
    loadJSON(`data/cities/${country}.json`)
      .then((d) => { lazy.cities[country] = d; notify(); })
      .catch(() => { lazy.cities[country] = 'missing'; notify(); });
    return;
  }
  if (lazy[root] !== null) return;
  lazy[root] = 'loading';
  loadJSON(SOURCE_FILE[root])
    .then((d) => { lazy[root] = d; notify(); })
    .catch(() => { lazy[root] = 'missing'; notify(); });
}

/** Preload every lazy source a profile can need (called when a profile opens). */
export function preloadProfile(slug, get) {
  for (const name of PROFILE_BY_SLUG[slug]?.questions || []) {
    const q = QUESTIONS[name];
    if (q?.source) ensureSource(q.source, get('country'));
  }
}

let noFetch = false; // true while estimateCount simulates answers — never download lists for a simulation
function lazyList(q, get) {
  const parentVal = get(q.parent);
  if (parentVal === undefined || parentVal === '' || parentVal === null) return { status: 'hidden' };
  const [root, sub] = q.source.split('.');
  if (root === 'cities') {
    const cc = get('country');
    const file = lazy.cities[cc];
    if (file === undefined || file === 'loading') { if (!noFetch) ensureSource('cities', cc); return { status: 'loading' }; }
    if (file === 'missing') return { status: 'free', options: [] };
    const list = file[parentVal] || [];
    return list.length ? { status: 'ok', options: list.map((c) => ({ l: c, v: c })) } : { status: 'free', options: [] };
  }
  const src = lazy[root];
  if (src === null || src === 'loading') { if (!noFetch) ensureSource(root); return { status: 'loading' }; }
  if (src === 'missing') return { status: 'free', options: [] };
  const table = sub ? src[sub] : src;
  const rows = table?.[parentVal] || [];
  if (!rows.length) return { status: 'hidden' };
  if (root === 'states') return { status: 'ok', options: rows.map(([v, l]) => ({ l, v })) };
  if (root === 'joblevel') return { status: 'ok', options: rows.map((l) => ({ l, v: l })) };
  return { status: 'ok', options: rows.map(([l, v]) => ({ l, v })) };
}

/* ------------------------------------------------------------------ options + visibility */
export function resolveOptions(q, get, profileQs) {
  if (q.source) return lazyList(q, get);
  if (!q.options) return { status: 'ok', options: [] };
  if (!q.parent || q.externalParent) return { status: 'ok', options: q.options };
  const pv = get(q.parent);
  const sameProfile = profileQs.includes(q.parent);
  if (pv === undefined || pv === null || pv === '' || (Array.isArray(pv) && !pv.length)) {
    if (sameProfile) return { status: 'hidden' };
    // parent lives in another profile and is still unanswered → show every option once
    const seen = new Set();
    return { status: 'ok', options: q.options.filter((o) => (seen.has(o.v) ? false : seen.add(o.v))) };
  }
  const pvs = Array.isArray(pv) ? pv : [pv];
  const filtered = q.options.filter((o) => !o.p || o.p.some((x) => pvs.includes(x)));
  return filtered.length ? { status: 'ok', options: filtered } : { status: 'hidden' };
}

function conditionMet(when, get) {
  if (!when) return true;
  const v = get(when.q);
  if (when.answered) return v !== undefined && v !== null && v !== '';
  const vals = Array.isArray(v) ? v : [v];
  return when.in.some((x) => vals.includes(x));
}

/** Ordered list of visible question names for a profile with the current answers. */
export function visibleQuestions(slug, get) {
  const qs = PROFILE_BY_SLUG[slug]?.questions || [];
  const out = [];
  for (const name of qs) {
    const q = QUESTIONS[name];
    if (!q) continue;
    if (!conditionMet(q.when, get)) continue;
    if (q.parent && !q.externalParent && qs.includes(q.parent) && !out.includes(q.parent)) continue; // parent hidden
    if (q.options || q.source) {
      const r = resolveOptions(q, get, qs);
      if (r.status === 'hidden') continue;
    } else if (q.parent && !q.externalParent && qs.includes(q.parent)) {
      const pv = get(q.parent);
      if (pv === undefined || pv === '' || pv === null) continue;
    }
    out.push(name);
  }
  return out;
}

/** Answer lookup: current profile first, then any other profile (shared facts like country). */
export function makeGetter(answers, slug, draft) {
  return (name) => {
    if (draft && name in draft) return draft[name];
    if (answers[slug] && name in answers[slug]) return answers[slug][name];
    for (const s of Object.keys(answers)) if (answers[s] && name in answers[s]) return answers[s][name];
    return undefined;
  };
}

export function questionValid(name, get) {
  const q = QUESTIONS[name];
  const value = get(name);
  return !validate(q, value, { get, otherText: get(otherKey(name)) });
}

export function profileProgress(slug, answers) {
  if (PENDING[slug]) {
    const total = PROFILE_BY_SLUG[slug]?.questions.length || 0;
    const pct = BACKEND[slug] || 0;
    return { answered: Math.round((total * pct) / 100), total, pct };
  }
  const get = makeGetter(answers, slug);
  const own = (n) => answers[slug]?.[n];
  const vis = visibleQuestions(slug, get);
  if (!vis.length) return { answered: 0, total: 0, pct: 0 };
  const answered = vis.filter((n) => {
    const v = own(n);
    return v !== undefined && v !== '' && !(Array.isArray(v) && !v.length);
  }).length;
  return { answered, total: vis.length, pct: Math.round((answered / vis.length) * 100) };
}

export { isOtherSelected };

/** Typical number of questions a respondent will see (simulates a "yes"-leaning path for unanswered items). */
const NEG = /^(no|none|other|others|prefer not)/i;
const estCache = new Map();
export function estimateCount(slug, answers) {
  if (PENDING[slug]) return PROFILE_BY_SLUG[slug]?.questions.length || 0;
  let key = '';
  try { key = slug + '|' + JSON.stringify(answers); } catch { /* circular / huge — skip cache */ }
  if (key && estCache.has(key)) return estCache.get(key);
  noFetch = true;
  let n;
  try { n = estimateCountRaw(slug, answers); } finally { noFetch = false; }
  if (key) { if (estCache.size > 200) estCache.clear(); estCache.set(key, n); }
  return n;
}
function estimateCountRaw(slug, answers) {
  const sim = { ...(answers[slug] || {}) };
  const base = makeGetter(answers, slug);
  const get = (n) => (n in sim ? sim[n] : base(n));
  let vis = [];
  for (let guard = 0; guard < 40; guard++) {
    vis = visibleQuestions(slug, get);
    const next = vis.find((n) => get(n) === undefined);
    if (!next) break;
    const q = QUESTIONS[next];
    const r = (q.options || q.source) ? resolveOptions(q, get, PROFILE_BY_SLUG[slug].questions) : null;
    const opts = r?.options || [];
    const pick = opts.find((o) => !NEG.test(o.l)) || opts[0];
    sim[next] = pick ? (q.type === 'multi' ? [pick.v] : pick.v) : '__sim__';
  }
  return vis.length;
}
