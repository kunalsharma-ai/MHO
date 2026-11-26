import { PHONE } from './phone-meta.js';
import build from './builder.js';
import { editProfileDocs, preloadFor } from './questions-2026.js';

let queue = Promise.resolve();
const host = () => window.MHO_HOST || {};
const MAIN = 'caregiver.json';
const LAZY_GEO = new Set(['state', 'city', 'ethnicity', 'rural', 'personal-income', 'household-income']);

function headers() {
  let token = null;
  try { token = localStorage.getItem('token'); } catch {}
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export async function call(method, path, body) {
  const res = await fetch(path, { method, headers: headers(), body: body === undefined ? undefined : JSON.stringify(body), credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === 'error') throw new Error(`${path}: ${data.message || `HTTP ${res.status}`}`);
  return data;
}

const byId = (list) => [...list].sort((a, b) => (a._id < b._id ? -1 : a._id > b._id ? 1 : 0));
const clean = (s) => String(s ?? '').replace(/Â | /g, ' ').replace(/\s+/g, ' ').trim();
const same = (a, b) => String(a ?? '').replace(/\s+/g, ' ').trim().toLowerCase() === b;

async function pool(items, limit, task) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await task(items[i]);
    }
  }));
  return out;
}

const questionOf = async (name) => {
  const resp = await call('POST', '/api/v1/question', { name });
  return Array.isArray(resp.data) && resp.data.length === 1 ? resp.data[0] : null;
};
const optionsOf = async (name) => (await call('GET', `/api/v1/option/${encodeURIComponent(name)}`)).data || [];
const optionsFor = async (name, parentValue) => (await call('POST', `/api/v1/option/${encodeURIComponent(name)}`, { parentValue })).data || [];

const namesOf = (doc) => [...new Set((doc.pages || []).flatMap((page) => page.slice(1)))];

async function collect(doc, extra) {
  const seen = new Set();
  const questions = [];
  let queue = [...namesOf(doc), ...extra];
  while (queue.length) {
    queue = [...new Set(queue)].filter((n) => n && !seen.has(n));
    queue.forEach((n) => seen.add(n));
    const found = (await pool(queue, 12, questionOf)).filter(Boolean);
    questions.push(...found);
    queue = found.map((q) => q.parent);
  }
  const options = (await pool([...seen].filter((n) => !LAZY_GEO.has(n)), 12, optionsOf)).flat();
  return { questions, options };
}

let docs = [];
let rawFound = {};
const docOf = (source) => docs.find((x) => same(x.category, 'care giver') && same(x.name, source));

let skeletonPromise = null;

function skeleton() {
  if (!skeletonPromise) {
    skeletonPromise = (async () => {
      docs = editProfileDocs((await call('POST', '/api/v1/profile', { category: host().category })).data);
      const names = [...new Set(docs.flatMap(namesOf))];
      const placeholders = names.map((name) => ({ name, label: name, _id: name }));
      const out = JSON.parse(build({ PROFILES: byId(docs), QUESTIONS: placeholders, OPTIONS: [] })[MAIN]);
      out.pending = {};
      out.backend = {};
      out.points = {};
      for (const p of out.profiles) {
        if (!p.source) continue;
        p.questions = namesOf(docOf(p.source));
        out.points[p.id] = Number(docOf(p.source)?.points) || 50;
        out.pending[p.id] = true;
        out.backend[p.id] = Math.max(0, Number(docOf(p.source)?.status) || 0);
      }
      return out;
    })().catch((error) => {
      console.error('Profile section data could not be loaded:', error.message);
      skeletonPromise = null;
      throw error;
    });
  }
  return skeletonPromise;
}

const jobFiles = {};
const detailCache = new Map();

function detail(profile) {
  if (!detailCache.has(profile.id)) {
    detailCache.set(profile.id, (async () => {
      const doc = docOf(profile.source);
      if (!doc) throw new Error(`Profile not found: ${profile.source}`);
      const extra = ['country', 'department', 'hw', 'do-exercise', 'do-sport-participation'];
      // profiles whose answers this one reads (a question asked once, elsewhere) are built with it, then left out of the result
      const also = preloadFor(doc.name).map(docOf).filter((d) => d && d !== doc);
      const { questions, options } = await collect(doc, [...extra, ...also.flatMap(namesOf)]);
      const files = build({ PROFILES: [doc, ...also], QUESTIONS: byId(questions), OPTIONS: byId(options) });
      const out = JSON.parse(files[MAIN]);
      for (const [key, body] of Object.entries(files)) if (key.startsWith('jobs/')) jobFiles[key] = body;
      return { profile: out.profiles.find((p) => p.id === profile.id), questions: out.questions };
    })().catch((error) => {
      console.error('Profile could not be loaded:', error.message);
      detailCache.delete(profile.id);
      throw error;
    }));
  }
  return detailCache.get(profile.id);
}

const geoCache = new Map();

function geoFor(cc) {
  if (!geoCache.has(cc)) {
    geoCache.set(cc, (async () => {
      const [stateO, ethO, ruralO] = (await Promise.all(['state', 'ethnicity', 'rural'].map((q) => optionsFor(q, cc)))).map(byId);
      const G = { state: [], ethnicity: [], rural: [], pincome: {}, hincome: {} };
      for (const o of stateO) G.state.push([clean(o.label), clean(o.value)]);
      for (const o of ethO) G.ethnicity.push([clean(o.label), clean(o.value)]);
      for (const o of ruralO) G.rural.push([clean(o.label), clean(o.value)]);
      const ruralValues = G.rural.map((r) => r[1]);
      if (ruralValues.length) {
        for (const [question, key] of [['personal-income', 'pincome'], ['household-income', 'hincome']]) {
          for (const o of byId(await optionsFor(question, ruralValues))) {
            for (const rv of o.parentValue) {
              if (rv.split('-')[0] !== cc) continue;
              (G[key][rv] ??= []).push([clean(o.label), clean(o.value)]);
            }
          }
        }
      }
      G.state.sort((a, b) => a[0].localeCompare(b[0]));
      for (const key of ['pincome', 'hincome']) for (const rv in G[key]) G[key][rv].sort((a, b) => a[1].localeCompare(b[1]));
      return G;
    })().catch((error) => { geoCache.delete(cc); throw error; }));
  }
  return geoCache.get(cc);
}

const cityCache = new Map();

function cities(cc) {
  if (!cityCache.has(cc)) {
    cityCache.set(cc, (async () => {
      const states = (await geoFor(cc)).state.map((s) => s[1]);
      if (!states.length) return {};
      const resp = await call('POST', '/api/v1/option/city', { parentValue: states });
      const out = {};
      for (const o of resp.data) for (const sv of o.parentValue || []) if (sv.split('-')[0] === cc) (out[sv] ??= []).push(clean(o.label));
      for (const sv of Object.keys(out)) out[sv] = [...new Set(out[sv])].sort((a, b) => a.localeCompare(b));
      return out;
    })().catch((error) => { cityCache.delete(cc); throw error; }));
  }
  return cityCache.get(cc);
}

/** Name of the database profile with this slug (the member area links to profiles by their database slug). */
export function sourceOfSlug(slug) {
  const w = String(slug ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
  const d = docs.find((x) => same(x.slug, w) || same(x.name, w));
  return d ? clean(d.name).toLowerCase() : null;
}

export async function sectionFile(path) {
  if (path === MAIN) return skeleton();
  const city = /^geo\/cities\/([A-Za-z]+)\.json$/.exec(path);
  if (city) return cities(city[1]);
  const geo = /^geo\/([A-Za-z]+)\.json$/.exec(path);
  if (geo) return geoFor(geo[1]);
  if (jobFiles[path] !== undefined) return JSON.parse(jobFiles[path]);
  throw new Error(`Not found: ${path}`);
}

const failed = (error) => window.dispatchEvent(new CustomEvent('mho:save-failed', { detail: { message: error.message } }));

function payload(name, ans) {
  if (ans.s) return { [name]: null };
  const out = { [name]: ans.v === '__other__' ? ans.o : ans.v };
  if (ans.o) out[`${name}_specify`] = ans.o;
  return out;
}

export function saveAnswer(name, ans) {
  const body = payload(name, ans);
  Object.assign(rawFound, body);
  queue = queue.then(() => call('PATCH', '/api/v1/me/profile', body)).catch(failed);
  return queue;
}

export const flush = () => queue;

export async function complete(slug, points) {
  await queue;
  try {
    await host().complete?.(slug, points);
  } catch (error) {
    failed(error);
  }
}

const blank = (x) => x === undefined || x === null || x === '' || (Array.isArray(x) && x.every((i) => i === '' || i == null));

function toAnswer(name, q, resp) {
  if (!(name in resp)) return null;
  const raw = resp[name];
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return null;
  if (blank(raw)) return q.optional ? { v: q.type === 'choice' && q.multi ? [] : '', s: 1 } : null;
  const list = [].concat(raw).map(String).map((v) => q.alias?.[v] ?? v);
  const specify = resp[`${name}_specify`] ? String(resp[`${name}_specify`]) : '';
  if (q.type === 'choice') {
    if (q.multi) return { v: list, ...(specify ? { o: specify } : {}) };
    if (specify && list[0] === specify) return { v: '__other__', o: specify };
    return { v: list[0], ...(specify ? { o: specify } : {}) };
  }
  let v = list[0];
  if (q.type === 'date') v = v.slice(0, 10);
  const ans = { v };
  if (q.rule === 'phone') {
    const digits = v.replace(/[^\d+]/g, '');
    if (digits.startsWith('+')) {
      const hit = Object.entries(PHONE)
        .filter(([, m]) => digits.slice(1).startsWith(m.dial))
        .sort((a, c) => c[1].dial.length - a[1].dial.length)[0];
      if (hit) ans.cc = hit[0];
    }
  }
  return ans;
}

const guess = (name, resp) => {
  if (!(name in resp)) return null;
  const raw = resp[name];
  if (blank(raw) || (raw && typeof raw === 'object' && !Array.isArray(raw))) return null;
  const list = [].concat(raw).map(String);
  const specify = resp[`${name}_specify`] ? String(resp[`${name}_specify`]) : '';
  if (Array.isArray(raw)) return { v: list, ...(specify ? { o: specify } : {}) };
  if (specify && list[0] === specify) return { v: '__other__', o: specify };
  return { v: list[0], ...(specify ? { o: specify } : {}) };
};

// The member area reports finished profiles by this package's card ids AND by the database slug / name of every section
// the server counts as complete and has credited (web ProfileSection.jsx progress()). Keep them under this package's ids.
const normKey = (v) => String(v ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
function ownIds(map, cards) {
  const byKey = new Map(Object.entries(map || {}).map(([k, v]) => [normKey(k), v]));
  const out = {};
  for (const { id, aliases } of cards) {
    const hit = [id, ...aliases].filter(Boolean).map(normKey).find((k) => byKey.has(k));
    if (hit !== undefined) out[id] = byKey.get(hit);
  }
  return out;
}
const cardsOf = (survey) => survey.profiles.map((p) => {
  const d = docs.find((x) => same(x.name, normKey(p.source)) || same(x.slug, normKey(p.source)));
  return { id: p.id, aliases: [p.source, d?.slug, d?.name] };
});

export async function hydrate(survey, store) {
  const names = [...new Set([...Object.keys(survey.questions), ...docs.flatMap(namesOf)])];
  const keys = names.flatMap((n) => [n, `${n}_specify`]);
  const [me, state] = await Promise.all([
    call('POST', '/api/v1/me', { questions: keys }),
    host().progress ? host().progress() : { completed: {} },
  ]);
  rawFound = { ...(me.data || {}) };
  const answers = {};
  for (const n of names) {
    const a = guess(n, rawFound);
    if (a) answers[n] = a;
  }
  const cards = cardsOf(survey);
  const completed = ownIds(state.completed, cards);
  store.set({ answers, meta: { completed, started: { ...completed } }, gemSeen: { ...completed } });  return ownIds(state.points, cards);
}

export async function ensureProfile(survey, id, store) {
  if (!survey.pending?.[id]) return survey;
  const profile = survey.profiles.find((p) => p.id === id);
  const loaded = await detail(profile);
  const patch = {};
  for (const n of loaded.profile.questions) {
    const a = toAnswer(n, loaded.questions[n], rawFound);
    if (a) patch[n] = a;
  }
  store.set((s) => {
    const answers = { ...s.answers };
    for (const n of loaded.profile.questions) {
      if (n in patch) answers[n] = patch[n];
      else delete answers[n];
    }
    return { answers };
  });
  const pending = { ...survey.pending };
  delete pending[id];
  return {
    ...survey,
    profiles: survey.profiles.map((p) => (p.id === id ? loaded.profile : p)),
    questions: { ...survey.questions, ...loaded.questions },
    pending,
  };
}
