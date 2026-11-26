import { QUESTIONS, PROFILE_BY_SLUG, PENDING, BACKEND, setData, mergeProfile } from './engine.js';
import { setPoints } from './rewards.js';
import build, { ORDER } from './builder.js';

let queue = Promise.resolve();
const host = () => window.MHO_HOST || {};

function headers(extra = {}) {
  let token = null;
  try { token = localStorage.getItem('token'); } catch {}
  return { ...extra, ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export async function call(method, path, body) {
  const res = await fetch(path, {
    method,
    headers: headers({ 'Content-Type': 'application/json' }),
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === 'error') throw new Error(`${path}: ${data.message || `HTTP ${res.status}`}`);
  return data;
}


const byId = (list) => [...list].sort((a, b) => (a._id < b._id ? -1 : a._id > b._id ? 1 : 0));
const clean = (s) => String(s ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
const LAZY_SOURCES = new Set(['state', 'city', 'practice-city', 'ethnicity', 'personal-income', 'household-income', 'doc-joblevel']);
const FILE_OPTIONS = {
  'states.json': ['state'],
  'income.json': ['personal-income', 'household-income'],
  'ethnicity.json': ['ethnicity'],
  'joblevel.json': ['doc-joblevel'],
};

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
  const options = (await pool([...seen].filter((n) => !LAZY_SOURCES.has(n)), 12, optionsOf)).flat();
  return { questions, options };
}

let docs = [];
let allNames = [];
let dynamicNames = [];
let rawFound = {};
const docOf = (slug) => docs.find((x) => x.slug === slug);

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

const emptyBuild = (OPTIONS) => build({ PROFILES: [], QUESTIONS: [], OPTIONS: byId(OPTIONS) });
const sourceCache = new Map();

function sourceFile(path) {
  if (!sourceCache.has(path)) {
    sourceCache.set(path, (async () => {
      const names = ['country', ...FILE_OPTIONS[path]];
      const options = (await pool(names, 4, optionsOf)).flat();
      return JSON.parse(emptyBuild(options)[path]);
    })().catch((error) => { sourceCache.delete(path); throw error; }));
  }
  return sourceCache.get(path);
}

const cityCache = new Map();

function cities(cc) {
  if (!cityCache.has(cc)) {
    cityCache.set(cc, (async () => {
      const states = (await sourceFile('states.json'))[cc] || [];
      const codes = new Set(states.map((s) => s[0]));
      if (!codes.size) return {};
      const resp = await call('POST', '/api/v1/option/city', { parentValue: [...codes] });
      const out = {};
      for (const o of resp.data) for (const sv of o.parentValue || []) if (codes.has(sv)) (out[sv] ??= []).push(clean(o.label));
      for (const sv of Object.keys(out)) out[sv] = [...new Set(out[sv])].sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0));
      return out;
    })().catch((error) => { cityCache.delete(cc); throw error; }));
  }
  return cityCache.get(cc);
}

export async function sectionFile(path) {
  const city = /^cities\/([A-Za-z]+)\.json$/.exec(path);
  if (city) return cities(city[1]);
  if (FILE_OPTIONS[path]) return sourceFile(path);
  throw new Error(`Not found: ${path}`);
}

const detailCache = new Map();

function detail(slug) {
  if (!detailCache.has(slug)) {
    detailCache.set(slug, (async () => {
      const doc = docOf(slug);
      if (!doc) throw new Error(`Profile not found: ${slug}`);
      const { questions, options } = await collect(doc, ['country']);
      const out = JSON.parse(build({ PROFILES: [doc], QUESTIONS: byId(questions), OPTIONS: byId(options), ALL_NAMES: allNames, DYNAMIC: dynamicNames })['hcp.generated.json']);
      return { profile: out.profiles.find((p) => p.slug === slug), questions: out.questions };
    })().catch((error) => {
      console.error('Profile could not be loaded:', error.message);
      detailCache.delete(slug);
      throw error;
    }));
  }
  return detailCache.get(slug);
}

const failed = (error) => window.dispatchEvent(new CustomEvent('mho:save-failed', { detail: { message: error.message } }));

function payload(values) {
  const out = {};
  for (const [key, value] of Object.entries(values)) {
    if (key.endsWith('::parts')) continue;
    if (value && typeof value === 'object' && !Array.isArray(value)) continue;
    const name = key.endsWith('::other') ? `${key.slice(0, -7)}_specify` : key;
    out[name] = Array.isArray(value) ? value.map(String) : String(value);
  }
  return out;
}

export function saveValues(values) {
  const body = payload(values);
  if (!Object.keys(body).length) return queue;
  Object.assign(rawFound, body);
  queue = queue.then(() => call('PATCH', '/api/v1/me/profile', body)).catch(failed);
  return queue;
}

export async function complete(slug, points, quality) {
  await queue;
  try {
    await host().complete?.(slug, points, quality);
  } catch (error) {
    failed(error);
  }
}

export async function upload(file, name) {
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch('/api/v1/upload/pdf', { method: 'POST', headers: headers(), body: form, credentials: 'same-origin' });
    const data = await res.json();
    if (!res.ok || !data.file?.url) throw new Error(data.message || `HTTP ${res.status}`);
    await saveValues({ [name]: data.file.url });
  } catch (error) {
    failed(error);
  }
}

const blank = (x) => x === undefined || x === null || x === '' || (Array.isArray(x) && x.every((i) => i === '' || i == null));
const MIME = { pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

function toValue(q, raw) {
  const list = [].concat(raw).map(String);
  if (q.type === 'multi') return list;
  const v = list[0];
  if (q.type === 'date') return v.slice(0, 10);
  if (q.type === 'file') {
    const ext = v.split('?')[0].split('.').pop().toLowerCase();
    return { name: decodeURIComponent(v.split('?')[0].split('/').pop()), size: 0, type: MIME[ext] || 'application/pdf', url: v };
  }
  return v;
}


const guess = (raw) => (Array.isArray(raw) ? raw.map(String) : String(raw));

function valuesOf(profile, questions) {
  const own = {};
  for (const name of profile.questions) {
    const q = questions[name];
    const raw = rawFound[name];
    if (!q || !(name in rawFound) || blank(raw) || (raw && typeof raw === 'object' && !Array.isArray(raw))) continue;
    own[name] = toValue(q, raw);
    if (rawFound[`${name}_specify`]) own[`${name}::other`] = String(rawFound[`${name}_specify`]);
    if (name === 'fullname') {
      const words = String(own[name]).trim().split(/\s+/);
      own['fullname::parts'] = { first: words[0] || '', middle: words.length > 2 ? words.slice(1, -1).join(' ') : '', last: words.length > 1 ? words[words.length - 1] : '' };
    }
  }
  return own;
}

export async function boot() {
  // The database keeps older copies of some HCP profiles (same name, slug = the name). Show each profile once, the copy
  // with a known slug first, as the server's completion count does (backend lib/profileStatus.js). Without this the
  // section listed 19 cards for 10 profiles and asked the same questions twice.
  const raw = (await call('POST', '/api/v1/profile', { category: host().category })).data || [];
  const keep = new Map();
  for (const d of raw) {
    const k = normKey(d.name || d.slug);
    const cur = keep.get(k);
    if (!cur || (!ORDER.includes(cur.slug) && ORDER.includes(d.slug))) keep.set(k, d);
  }
  docs = raw.filter((d) => keep.get(normKey(d.name || d.slug)) === d);
  allNames = [...new Set(docs.flatMap(namesOf))];
  const orderNames = new Set(docs.filter((d) => ORDER.includes(d.slug)).flatMap(namesOf));
  dynamicNames = allNames.filter((n) => !orderNames.has(n));
  const skeleton = JSON.parse(build({ PROFILES: byId(docs), QUESTIONS: [], OPTIONS: [] })['hcp.generated.json']);
  setData(skeleton);
  for (const p of skeleton.profiles) {
    const doc = docOf(p.slug);
    if (!doc) continue;
    PENDING[p.slug] = true;
    BACKEND[p.slug] = Math.max(0, Number(doc.status) || 0);
  }
  const [me, state] = await Promise.all([
    call('POST', '/api/v1/me', { questions: allNames.flatMap((n) => [n, `${n}_specify`]) }),
    host().progress ? host().progress() : { completed: {} },
  ]);
  rawFound = { ...(me.data || {}) };
  const answers = {};
  for (const p of skeleton.profiles) {
    const own = {};
    for (const name of p.questions) {
      const raw = rawFound[name];
      if (!(name in rawFound) || blank(raw) || (raw && typeof raw === 'object' && !Array.isArray(raw))) continue;
      own[name] = guess(raw);
      if (rawFound[`${name}_specify`]) own[`${name}::other`] = String(rawFound[`${name}_specify`]);
    }
    if (Object.keys(own).length) answers[p.slug] = own;
  }
  const itemPoints = {};
  const itemQuality = {};
  for (const p of skeleton.profiles) {
    const doc = docOf(p.slug);
    const pts = Number(doc?.points);
    if (pts > 0) itemPoints[p.slug] = pts;
    const qs = Number(doc?.qualityScore ?? doc?.quality ?? doc?.qs);
    if (qs > 0) itemQuality[p.slug] = qs;
  }
  const cards = skeleton.profiles.map((p) => ({ id: p.slug, aliases: [docOf(p.slug)?.name] }));
  setPoints(itemPoints, ownIds(state.points, cards), itemQuality);
  return { answers, completed: ownIds(state.completed, cards) };
}

export async function ensureProfile(slug) {
  if (!PENDING[slug]) return null;
  const loaded = await detail(slug);
  mergeProfile(slug, loaded.profile, loaded.questions);
  return valuesOf(PROFILE_BY_SLUG[slug], QUESTIONS);
}
