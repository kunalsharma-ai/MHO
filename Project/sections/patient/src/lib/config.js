/**
 * Runtime configuration.
 *   1. window.MHO_CONFIG (public/config.js, editable on the server without a rebuild)
 *   2. options passed to mountMHOPatient(el, options) / <MHOPatientSection {...options} />
 * Later sources win. Read it with cfg(); never cache the result at module load.
 */
const DEFAULTS = {
  apiBase: '',
  submitPath: '/patient/profiles/{profile}',
  progressPath: '/patient/progress',
  headers: {},
  credentials: 'omit',
  assetBase: '',            // where images/, fonts/ live (e.g. 'https://cdn.example.com/mho/'); '' = same folder as the page
  dataBase: 'data/',        // where patient.json, geo/, i18n/ live (relative to assetBase when not absolute)
  translateEndpoint: '',    // optional: POST { source, target, q: [] } → { translations: [] } for the auto-translated languages
  useBrowserTranslator: true,
  user: { firstName: '', email: '', id: '' },
  view: 'all',              // 'all' | 'profiles' | 'surveys'
  theme: 'auto',            // 'auto' | 'light' | 'dark'
  sound: true,              // default sound state for first-time visitors
  showHero: true,
  unlock: 'sequential',     // surveys after About You: 'sequential' (one at a time) | 'all'
  rewards: { pointsPerProfile: 50, pointsPerSurvey: 50, qualityPerProfile: 1, qualityPerSurvey: 1, pointsPerUsd: 1000 },
  storageKey: 'mho.patient.v1',
  disableSW: true,
};

let mountOpts = {};
export function setMountOptions(o) { mountOpts = o || {}; }

const deepMerge = (a, b) => {
  const out = { ...a };
  for (const k of Object.keys(b || {})) {
    const v = b[k];
    out[k] = v && typeof v === 'object' && !Array.isArray(v) && a[k] && typeof a[k] === 'object' ? deepMerge(a[k], v) : v;
  }
  return out;
};

export function cfg() {
  const w = typeof window !== 'undefined' ? window.MHO_CONFIG || {} : {};
  return deepMerge(deepMerge(DEFAULTS, w), mountOpts);
}
