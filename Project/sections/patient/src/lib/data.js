/**
 * Data loading with caching. Files live in /public/data and are fetched lazily.
 * When the single-file preview is used, window.__MHO_INLINE__ provides everything inline.
 */
const inline = () => (typeof window !== 'undefined' && window.__MHO_INLINE__) || null;
import { cfg } from './config.js';
import { sectionFile } from './bridge.js';
const base = () => {
  const c = cfg();
  const d = c.dataBase || 'data/';
  if (/^(https?:)?\/\//.test(d) || d.startsWith('/')) return d;
  return (c.assetBase ? c.assetBase.replace(/\/?$/, '/') : '') + d;
};
const cache = new Map();

const LIVE = /^(patient\.json|geo\/|jobs\/)/;

function getJSON(path) {
  if (cache.has(path)) return cache.get(path);
  const request = LIVE.test(path)
    ? sectionFile(path)
    : fetch(new URL(base() + path, document.baseURI), { credentials: 'same-origin' }).then((r) => {
      if (!r.ok) throw new Error(r.status + ' ' + path);
      return r.json();
    });
  const p = request
    .catch((e) => {
      cache.delete(path); // allow retry
      throw e;
    });
  cache.set(path, p);
  return p;
}

export function loadSurvey() {
  const i = inline();
  if (i?.patient) return Promise.resolve(i.patient);
  return getJSON('patient.json');
}

export const geoStore = { geo: {}, cities: {}, jobs: {} };
const geoListeners = new Set();
export const onGeo = (fn) => (geoListeners.add(fn), () => geoListeners.delete(fn));

export async function ensureGeo(kind, cc) {
  const bucket = kind === 'cities' ? geoStore.cities : kind === 'jobs' ? geoStore.jobs : geoStore.geo;
  if (bucket[cc]) return bucket[cc];
  const i = inline();
  let d = i?.[kind]?.[cc];
  if (!d) d = await getJSON(kind === 'cities' ? `geo/cities/${cc}.json` : kind === 'jobs' ? `jobs/${cc}.json` : `geo/${cc}.json`);
  bucket[cc] = d;
  geoStore.geo = { ...geoStore.geo };
  geoStore.cities = { ...geoStore.cities };
  geoStore.jobs = { ...geoStore.jobs };
  geoListeners.forEach((f) => f());
  return d;
}

/** list of state codes that have a flag image (public/data/state-flags.json) */
let stateFlags = null;
export function loadStateFlags() {
  if (stateFlags) return stateFlags;
  const i = inline();
  stateFlags = (i?.stateFlags ? Promise.resolve(i.stateFlags) : getJSON('state-flags.json')).then((a) => new Set(a)).catch(() => new Set());
  return stateFlags;
}

export async function loadContent(lang) {
  if (lang === 'en') return {};
  const i = inline();
  if (i?.i18n?.[lang]) return i.i18n[lang];
  try {
    return await getJSON(`i18n/${lang}.json`);
  } catch {
    return {};
  }
}

/** UI dictionary of a fully translated language (data/ui/<lang>.json) */
export function loadUIJson(lang) {
  const i = inline();
  if (i?.ui?.[lang]) return Promise.resolve(i.ui[lang]);
  return getJSON(`ui/${lang}.json`);
}
