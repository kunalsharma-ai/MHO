// In-browser mock of the account API, used for the preview and local development.
// It behaves like the real server (delays, rate limiting, one open request at a time)
// and adds `dev` helpers that simulate what the Support Team does.

import { ACTIONS, FLOW, KEY_BY_API, TERMINAL, CANCELLABLE } from '../config/actions.js';
import { makeRequestId, safeStorage, wait } from '../lib/format.js';

export const DEMO_PASSWORD = 'Health@2026';
const KEY = 'mho-account-actions-mock-v2';
const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 30;

const fresh = () => ({ account: { status: 'active', days: 0 }, request: null, attempts: 0, lockUntil: 0, tokens: [] });

export function createMockApi({ latency = 1 } = {}) {
  let db = { ...fresh(), ...safeStorage.get(KEY, {}) };
  const save = () => safeStorage.set(KEY, db);
  const delay = (ms) => wait(ms * latency);
  const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));

  const applyCompletion = (req) => {
    const res = ACTIONS[KEY_BY_API[req.action]].result;
    db.account = { status: res.status, days: res.days || 0 };
  };

  const pushStatus = (status) => {
    const r = db.request; if (!r) return;
    r.status = status;
    r.history.push({ status, at: new Date().toISOString() });
    if (status === 'completed') applyCompletion(r);
  };

  return {
    mode: 'mock',
    async getAccountStatus() { await delay(250); return clone(db.account); },
    async getCurrentRequest() { await delay(250); return clone(db.request); },

    async verifyPassword(password) {
      await delay(700);
      const now = Date.now();
      if (db.lockUntil > now) return { ok: false, error: 'too_many_attempts', retryAfter: Math.ceil((db.lockUntil - now) / 1000) };
      if (password === DEMO_PASSWORD) {
        db.attempts = 0;
        const token = `vt_${Math.random().toString(36).slice(2)}`;
        db.tokens = [{ token, exp: now + 5 * 60 * 1000 }];
        save();
        return { ok: true, token };
      }
      db.attempts += 1;
      if (db.attempts >= MAX_ATTEMPTS) {
        db.attempts = 0; db.lockUntil = now + LOCK_SECONDS * 1000; save();
        return { ok: false, error: 'too_many_attempts', retryAfter: LOCK_SECONDS };
      }
      save();
      return { ok: false, error: 'incorrect_password', attemptsRemaining: MAX_ATTEMPTS - db.attempts };
    },

    async createRequest(action, verificationToken) {
      await delay(1500);
      const t = db.tokens.find((x) => x.token === verificationToken);
      if (!t || t.exp < Date.now()) {
        const e = new Error('Your password confirmation has expired. Please enter your password again.');
        e.status = 401; e.code = 'verification_expired'; throw e;
      }
      if (db.request && !TERMINAL.includes(db.request.status)) {
        const e = new Error('You already have a request in progress.');
        e.status = 409; e.code = 'request_open'; throw e;
      }
      db.tokens = [];
      const now = new Date().toISOString();
      db.request = { id: makeRequestId(), action, status: 'submitted', submittedAt: now, history: [{ status: 'submitted', at: now }] };
      save();
      return clone(db.request);
    },

    async cancelRequest(id) {
      await delay(500);
      if (!db.request || db.request.id !== id || !CANCELLABLE.includes(db.request.status)) {
        const e = new Error('This request can no longer be cancelled.'); e.status = 409; e.code = 'not_cancellable'; throw e;
      }
      pushStatus('cancelled'); save();
      return clone(db.request);
    },

    // ---- Support Team simulation (preview only) ----
    dev: {
      password: DEMO_PASSWORD,
      setAccountStatus(status) { db.account = { status, days: 0 }; save(); return clone(db.account); },
      advance() {
        const r = db.request; if (!r) return null;
        const i = FLOW.indexOf(r.status);
        if (i < 0 || i >= FLOW.length - 1) return clone(r);
        pushStatus(FLOW[i + 1]); save();
        return clone(r);
      },
      markUnable() { if (db.request && !TERMINAL.includes(db.request.status)) { pushStatus('unable_to_process'); save(); } return clone(db.request); },
      snapshot() { return { account: clone(db.account), request: clone(db.request) }; },
      reset() { db = fresh(); save(); return { account: clone(db.account), request: null }; },
    },
  };
}
