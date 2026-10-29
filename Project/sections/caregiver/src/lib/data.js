/**
 * Data loading with caching. Files live in /public/data and are fetched lazily.
 * When the single-file preview is used, window.__MHO_INLINE__ provides everything inline.
 */
import { sectionFile } from './bridge.js';
const inline = () => (typeof window !== 'undefined' && window.__MHO_INLINE__) || null;
const base = () => (window.MHO_CONFIG && window.MHO_CONFIG.dataBase) || 'data/';
const cache = new Map();
const LIVE = /^(caregiver\.json|geo\/)/;

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
  if (i?.caregiver) return Promise.resolve(i.caregiver);
  return getJSON('caregiver.json');
}

export const geoStore = { geo: {}, cities: {} };
const geoListeners = new Set();
export const onGeo = (fn) => (geoListeners.add(fn), () => geoListeners.delete(fn));

export async function ensureGeo(kind, cc) {
  const bucket = kind === 'cities' ? geoStore.cities : geoStore.geo;
  if (bucket[cc]) return bucket[cc];
  const i = inline();
  let d = i?.[kind]?.[cc];
  if (!d) d = await getJSON(kind === 'cities' ? `geo/cities/${cc}.json` : `geo/${cc}.json`);
  bucket[cc] = d;
  geoStore.geo = { ...geoStore.geo };
  geoStore.cities = { ...geoStore.cities };
  geoListeners.forEach((f) => f());
  return d;
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
