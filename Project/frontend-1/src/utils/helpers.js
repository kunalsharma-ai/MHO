// Validation, storage, sound, API and analytics helpers (browser-safe; all guarded for SSR).
import { API, PREVIEW_FORMS, PREVIEW_ACCOUNT, ANALYTICS, MIN_AGE } from '../config/site.js';
import { phoneLengthFor } from '../data/countries.js';
import { isSoundEnabled } from '../i18n/soundPrefs.js';

/* ---------------- validation ---------------- */
export const RX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  name: /^[\p{L}][\p{L}\s'.-]{0,48}$/u,
  digits: /^\d+$/,
};

export function validateEmail(v) {
  if (!v.trim()) return 'Please enter your email address.';
  if (!RX.email.test(v.trim())) return 'That email address does not look right.';
  return '';
}

export function validateName(v, label = 'name', required = true) {
  if (!v.trim()) return required ? `Please enter your ${label}.` : '';
  if (!RX.name.test(v.trim())) return `Use letters only for your ${label} (2–50 characters).`;
  if (v.trim().length < 2) return `Your ${label} needs at least 2 letters.`;
  return '';
}

export function validatePhone(number, countryCode, required = true) {
  const n = (number || '').replace(/[\s()-]/g, '');
  if (!n) return required ? 'Please enter your phone number.' : '';
  if (!RX.digits.test(n)) return 'Use digits only (no country code).';
  const [min, max] = phoneLengthFor(countryCode);
  if (n.length < min || n.length > max) return min === max ? `Enter a ${min}-digit number.` : `Enter ${min}–${max} digits.`;
  return '';
}

export function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

/**
 * Password policy = web-1's (util/checkPasswordStrength.js: at least 4 of 5 — 8+ characters, capital, small, number, symbol), plus a
 * hard minimum of 8 characters (web-1 counts the length as one of the five, so a 4-character "Ab1!" would pass there).
 * The backend does not check passwords at all (it only compares the two fields and hashes), so this is the only rule that protects
 * the account.
 */
export function validatePassword(pw) {
  if (!pw) return 'Please create a password.';
  if (pw.length < 8) return 'Use at least 8 characters.';
  const kinds = [/[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(pw)).length;
  if (kinds < 3) return 'Use at least three of these: capital letters, small letters, numbers, symbols (e.g. ! @ #).';
  return '';
}

export function ageFrom(dob) {
  if (!dob) return null;
  const [y, m, d] = dob.split('-').map(Number);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
  return age;
}

export function validateDob(dob) {
  if (!dob) return 'Please select your full date of birth.';
  const age = ageFrom(dob);
  if (age === null || Number.isNaN(age)) return 'Please select a valid date.';
  if (age < MIN_AGE) return `You must be at least ${MIN_AGE} years old to join.`;
  if (age > 110) return 'Please check the year of birth.';
  return '';
}

/* ---------------- storage ---------------- */
export const store = {
  get(key, fallback = null) {
    try {
      const v = window.localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — ignore */
    }
  },
};
export const session = {
  get(key, fallback = null) {
    try {
      const v = window.sessionStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

/* ---------------- sound: short synthesized "pop" (no audio file) ---------------- */
let ctx;
export function pop(volume = 0.18) {
  if (typeof window === 'undefined') return;
  if (!isSoundEnabled()) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(1180, t + 0.06);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  } catch {
    /* audio not available */
  }
}

/* ---------------- API ---------------- */
/**
 * POST JSON to a backend endpoint. In dev / single-file preview (PREVIEW_FORMS) no request is sent:
 * a short delay simulates success so the UI can be reviewed without a backend.
 */
export async function postJSON(url, body) {
  if (PREVIEW_FORMS) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, preview: true, data: {} };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
    let data = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON body */
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: err?.message } };
  }
}

/**
 * POST multipart/form-data (used when the sign-up includes an optional verification document).
 * The JSON payload travels in the "data" field; files keep their own field names.
 */
export async function postForm(url, payload, files = {}) {
  if (PREVIEW_FORMS) {
    await new Promise((r) => setTimeout(r, 1100));
    return { ok: true, preview: true, data: {} };
  }
  const fd = new FormData();
  fd.append('data', JSON.stringify(payload));
  Object.entries(files).forEach(([k, f]) => f && fd.append(k, f, f.name));
  try {
    const res = await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { Accept: 'application/json' }, body: fd });
    let data = {};
    try { data = await res.json(); } catch { /* non-JSON body */ }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: err?.message } };
  }
}

/* ---------------- backend account API (same contract as web-1) ---------------- */
// The login token is kept in localStorage under "token": that is the key web-1 and the member area read
// (Authorization: Bearer <token>). The backend also checks the token's origin against the Host header,
// so this site and the API must be served from the same domain.
const TOKEN_KEY = 'token';
export const auth = {
  getToken() {
    try { return window.localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
  },
  setToken(token) {
    try { window.localStorage.setItem(TOKEN_KEY, token); return true; } catch { return false; }
  },
  clearToken() {
    try { window.localStorage.removeItem(TOKEN_KEY); } catch { /* storage blocked */ }
  },
};

/**
 * Call the backend with any HTTP method. The backend answers { status: 'success' | 'error', message, data, token? }
 * and uses HTTP 404 for most errors (not 401/400), so success is decided by the body's `status`, not only res.ok.
 * Returns { ok, status, data } like postJSON. Always a real request, unless VITE_PREVIEW_FORMS=true (then nothing is sent).
 */
export async function apiRequest(method, url, body) {
  if (PREVIEW_ACCOUNT) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, preview: true, status: 200, data: { status: 'success', message: '', data: {} } };
  }
  const token = auth.getToken();
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(url, { method, headers, credentials: 'same-origin', body: body === undefined ? undefined : JSON.stringify(body) });
    let data = {};
    try { data = await res.json(); } catch { /* non-JSON body */ }
    const ok = res.ok && data.status === 'success';
    // A rejected / expired token must not be kept (same rule as web-1's api client).
    if (!ok && token && (res.status === 401 || /invalid token|token expired|jwt (malformed|expired)/i.test(data.message || ''))) auth.clearToken();
    return { ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { message: err?.message } };
  }
}

/**
 * Visitor's country from the IP address — the same call web-1's sign-up makes (GET /api/v1/get-country → { country: 'IN' }).
 * Returns a lower-case ISO-2 code ('in') or '' when it cannot be detected (offline, endpoint missing, simulated forms).
 */
export async function detectCountry() {
  if (PREVIEW_ACCOUNT) return '';
  try {
    const res = await fetch(API.country, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
    if (!res.ok) return '';
    const data = await res.json();
    const code = String(data?.country || data?.data?.country || '').trim().toLowerCase();
    return /^[a-z]{2}$/.test(code) ? code : '';
  } catch {
    return '';
  }
}

/**
 * Social log-in providers, same call as web-1: POST /api/v1/auth/socials → { data: [{ name, authUrl }] }.
 * Returns [] when social sign-on is not enabled / not reachable, so no buttons are shown. Only https links are accepted.
 */
export async function loadProviders() {
  if (PREVIEW_ACCOUNT) return [];
  const res = await apiRequest('POST', API.socials, {});
  const list = res.ok && Array.isArray(res.data?.data) ? res.data.data : [];
  return list
    .filter((p) => p && p.name && typeof p.authUrl === 'string' && /^https:\/\//i.test(p.authUrl.trim()))
    .map((p) => ({ name: String(p.name), authUrl: p.authUrl.trim() }));
}

/**
 * Where the backend sends people after a social log-in: "/?signup=1&name=…&email=…" (new person) or "/?verifyemail=<mail>"
 * (e-mail not confirmed yet). Returns the matching page of this site ('/join/…'), or '' for any other address.
 */
export function socialReturnTarget(search) {
  let q;
  try { q = new URLSearchParams(search || ''); } catch { return ''; }
  const verify = (q.get('verifyemail') || '').trim();
  if (verify) return `/join/?verifyemail=${encodeURIComponent(verify)}`;
  if (q.has('signup')) {
    const out = new URLSearchParams();
    ['name', 'email', 'ref'].forEach((k) => { const v = (q.get(k) || '').trim(); if (v) out.set(k, v); });
    const s = out.toString();
    return `/join/${s ? `?${s}` : ''}`;
  }
  return '';
}

/**
 * Same three e-mail checks as web-1's sign-up, in the same order:
 *   1. format   2. POST /api/v1/validator/email { email } → { valid }   3. POST /api/v1/user/check { mail } → { data: count }
 * Returns a message to show under the field, or '' when the e-mail is fine. If one of the two lookups cannot be reached the
 * check is skipped (never blocks the person): the backend still rejects bad domains and duplicates when the account is created.
 */
const EMAIL_FORMAT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
async function postRaw(url, body) {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, credentials: 'same-origin', body: JSON.stringify(body) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
export async function checkEmail(email) {
  const mail = String(email || '').trim().toLowerCase();
  if (!EMAIL_FORMAT.test(mail)) return 'That email address does not look right.';
  if (PREVIEW_ACCOUNT) return '';
  const domain = await postRaw(API.emailValidate, { email: mail });
  if (domain && Object.prototype.hasOwnProperty.call(domain, 'valid') && !domain.valid) return 'This email address could not be verified. Please check it for typing mistakes.';
  const exists = await postRaw(API.emailExists, { mail });
  const count = exists && exists.status === 'success' ? Number(exists.data) : NaN;
  if (Number.isFinite(count) && count > 0) return 'This email is already registered. Please log in instead.';
  return '';
}

/** Date of birth as an ISO 8601 string, e.g. "1996-01-15" → "1996-01-15T00:00:00.000Z" (the calendar day never shifts with the time zone). */
export function dobToISO(dob) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob || '');
  if (!m) return '';
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

/* Forgot-password: at most 5 reset e-mails per browser per day. Same cookie name and format as web-1. */
const RESET_COOKIE = 'forgotPasswordRequests';
const RESET_MAX_PER_DAY = 5;
function readResetCount() {
  try {
    const m = document.cookie.match(new RegExp('(^| )' + RESET_COOKIE + '=([^;]+)'));
    return m ? Number(JSON.parse(decodeURIComponent(m[2])).count) || 0 : 0;
  } catch { return 0; }
}
export const resetLimit = {
  canSend: () => readResetCount() < RESET_MAX_PER_DAY,
  record() {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${RESET_COOKIE}=${encodeURIComponent(JSON.stringify({ count: readResetCount() + 1 }))}; expires=${expires}; path=/; SameSite=Lax`;
  },
};

export const endpoints = API;

/* ---------------- analytics (GA4, consent-gated) ---------------- */
let fbLoaded = false;
function loadFacebookPixel() {
  if (fbLoaded || !ANALYTICS.fbPixel || typeof document === 'undefined') return;
  fbLoaded = true;
  // Meta's standard base code, written out (no inline <script> in the page).
  const fbq = function fbq() {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = window.fbq || fbq;
  window.fbq('init', ANALYTICS.fbPixel);
  window.fbq('track', 'PageView');
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
}

let gaLoaded = false;
export function loadAnalytics() {
  loadFacebookPixel();
  if (gaLoaded || !ANALYTICS.ga4 || typeof document === 'undefined') return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', ANALYTICS.ga4, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS.ga4)}`;
  document.head.appendChild(s);
}

/** Fire a GA4 event if analytics consent was given. Never pass personal or health data here. */
export function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
  // Meta Pixel counts client-side page changes too (its first PageView is sent when it loads).
  if (event === 'page_view' && typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', 'PageView');
}

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};