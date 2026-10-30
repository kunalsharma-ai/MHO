// Build-time environment, provided by Vite (import.meta.env). See .env.example.
//   • Variables must start with VITE_ to reach the browser. (Older PUBLIC_ names are still accepted —
//     vite.config.js lists both prefixes — so existing .env files keep working.)
//   • Everything here is compiled into the public JavaScript: never put secrets in VITE_/PUBLIC_ variables.
// Outside Vite (e.g. plain Node scripts importing data files) import.meta.env is undefined, so we fall
// back to an empty object and the defaults below.
const ENV = import.meta.env || {};

/** Read a public variable by its short name: env('SITE_URL') → VITE_SITE_URL, else PUBLIC_SITE_URL, else fallback. */
export function env(name, fallback = '') {
  const v = ENV[`VITE_${name}`] ?? ENV[`PUBLIC_${name}`];
  return v === undefined || v === '' ? fallback : v;
}

/** 'history' (real URLs, production) or 'hash' (single-file preview opened from disk: #/about-us/). */
export const ROUTER_MODE = env('ROUTER_MODE') === 'hash' ? 'hash' : 'history';

/** true during `npm run dev`. */
export const IS_DEV = Boolean(ENV.DEV);

/** Forms simulate success instead of calling the backend: dev server and the single-file preview only. */
export const PREVIEW_FORMS = IS_DEV || env('PREVIEW_FORMS') === 'true';

/**
 * Account flows (sign-up, log in, forgot / create password) talk to the REAL backend, also in `npm run dev`
 * (point /api at it with DEV_API_PROXY, see .env.example). They only simulate success when you ask for it
 * explicitly with VITE_PREVIEW_FORMS=true. (Contact, live chat, reviews and reward pop-ups keep using PREVIEW_FORMS.)
 */
export const PREVIEW_ACCOUNT = env('PREVIEW_FORMS') === 'true';
