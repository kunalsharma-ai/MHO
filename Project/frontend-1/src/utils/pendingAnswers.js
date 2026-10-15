import { API } from '../config/site.js';
import { apiRequest, auth } from './helpers.js';

export const PENDING_KEY = 'mho_pending_answers';
export const PENDING_DAYS = 7;
const MAX_RECORDS = 5;
const norm = (email) => String(email || '').trim().toLowerCase();

function readAll() {
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === 'object' && !Array.isArray(obj) ? obj : {};
  } catch {
    return {};
  }
}

function writeAll(records) {
  try {
    if (!Object.keys(records).length) window.localStorage.removeItem(PENDING_KEY);
    else window.localStorage.setItem(PENDING_KEY, JSON.stringify(records));
    return true;
  } catch {
    return false; // storage blocked / full
  }
}

/** Drops expired or damaged records and keeps only the newest few. */
function prune(records, now = Date.now()) {
  const kept = Object.entries(records)
    .filter(([email, r]) => email && r && typeof r === 'object' && r.answers && typeof r.answers === 'object' && Number(r.expiresAt) > now && Object.keys(r.answers).length)
    .sort((a, b) => Number(b[1].savedAt) - Number(a[1].savedAt))
    .slice(0, MAX_RECORDS);
  return Object.fromEntries(kept);
}

/** Keep the answers of a new account until its owner logs in. Returns false when the browser refuses to store them. */
export function savePendingAnswers(email, answers, now = Date.now()) {
  const who = norm(email);
  if (!who || !answers || typeof answers !== 'object' || !Object.keys(answers).length) return false;
  const records = prune(readAll(), now);
  records[who] = { savedAt: now, expiresAt: now + PENDING_DAYS * 24 * 60 * 60 * 1000, answers };
  return writeAll(prune(records, now));
}

export function hasPendingAnswers(now = Date.now()) {
  const all = readAll();
  const kept = prune(all, now);
  if (Object.keys(kept).length !== Object.keys(all).length) writeAll(kept); // tidy expired ones
  return Object.keys(kept).length > 0;
}

/** E-mail inside a login token (JWT payload, read only to know whose token it is — the server still verifies it). */
export function emailFromToken(token) {
  try {
    const part = String(token || '').split('.')[1];
    if (!part) return '';
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const json = decodeURIComponent(Array.from(bin, (c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
    const claims = JSON.parse(json);
    return norm(claims.email || claims.mail);
  } catch {
    return '';
  }
}

const isEmpty = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

let running = null;
/**
 * Saves the waiting answers if somebody is logged in (token or login cookie) as the account they belong to.
 * Resolves to { status }: 'none' | 'waiting' (nobody logged in yet) | 'other-account' | 'kept' (a call failed, will retry) | 'saved'.
 * Never throws.
 */
export function syncPendingAnswers({ email = '' } = {}) {
  if (!running) running = run(email).catch(() => ({ status: 'kept' })).finally(() => { running = null; });
  return running;
}

async function run(typedEmail) {
  if (!hasPendingAnswers()) return { status: 'none' };
  const records = prune(readAll());

  // whose answers are they? token claim → the e-mail typed at log-in → (otherwise) ask the server who is logged in
  let who = emailFromToken(auth.getToken()) || norm(typedEmail);
  if (!who) {
    const probe = await apiRequest('POST', API.me, { questions: [] });
    if (!probe.ok) return { status: probe.status === 401 || probe.status === 403 ? 'waiting' : 'kept' }; // not logged in (yet)
    who = norm(probe.data?.data?.mail);
    if (!who) return { status: 'other-account' };
  }
  const record = records[who];
  if (!record) return { status: 'other-account' };

  const names = Object.keys(record.answers);
  // what the account already has — never overwrite it (also proves somebody is logged in)
  const current = await apiRequest('POST', API.me, { questions: names });
  if (!current.ok) return { status: current.status === 401 || current.status === 403 ? 'waiting' : 'kept', reason: 'could-not-read-account' };
  const account = current.data?.data && typeof current.data.data === 'object' ? current.data.data : {};
  const loggedInAs = norm(account.mail);
  if (loggedInAs && loggedInAs !== who) return { status: 'other-account' }; // somebody else is logged in on this browser
  const missing = Object.fromEntries(names.filter((q) => isEmpty(account[q])).map((q) => [q, record.answers[q]]));

  if (Object.keys(missing).length) {
    const saved = await apiRequest('PATCH', API.meAnswer, missing);
    if (!saved.ok) return { status: 'kept', reason: 'save-failed' };
  }
  delete records[who];
  writeAll(records); // only now, after the backend confirmed
  return { status: 'saved', saved: Object.keys(missing).length, alreadyThere: names.length - Object.keys(missing).length };
}

const PROBE_KEY = 'mho_pending_probe';
/** For page loads: tries at most once a minute (a visitor who has not logged in yet would otherwise ask the server on every page). */
export function syncPendingAnswersSoon() {
  if (!hasPendingAnswers()) return Promise.resolve({ status: 'none' });
  try {
    const last = Number(window.sessionStorage.getItem(PROBE_KEY)) || 0;
    if (Date.now() - last < 60 * 1000) return Promise.resolve({ status: 'throttled' });
    window.sessionStorage.setItem(PROBE_KEY, String(Date.now()));
  } catch { /* storage blocked: just try */ }
  return syncPendingAnswers();
}