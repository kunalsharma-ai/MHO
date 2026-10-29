import { ApiError } from './httpApi.js';

const ENDPOINT = '/api/v1/auth/delete';
const CODES = { deactivate_30: 30, deactivate_60: 60, deactivate_90: 90, hold: -1, delete: 'Delete' };
const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 30;

function headers() {
  let token = '';
  try { token = localStorage.getItem('token') || ''; } catch {}
  return { 'Content-Type': 'application/json', Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

async function send(url, method, body) {
  let res;
  try {
    res = await fetch(url, { method, credentials: 'same-origin', headers: headers(), body: body === undefined ? undefined : JSON.stringify(body) });
  } catch {
    throw new ApiError('We could not reach the server. Check your connection and try again.');
  }
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  return { ok: res.ok && data?.status !== 'error', status: res.status, data };
}

async function signOut() {
  try { await send('/api/v1/me', 'DELETE'); } catch { /* the session is cleared below anyway */ }
  try { localStorage.clear(); } catch { /* ignore */ }
}

export function createMemberApi({ memberId = '', memberMail = '', onSignedOut } = {}) {
  let password = '';
  let attempts = 0;

  return {
    mode: 'http',
    getAccountStatus: async () => ({ status: 'active' }),
    getCurrentRequest: async () => null,
    async verifyPassword(value) {
      const { ok, status } = await send('/api/v1/user/login', 'POST', { mail: memberMail, password: value });
      if (ok) {
        attempts = 0;
        password = value;
        return { ok: true, token: 'verified' };
      }
      if (status !== 401 && status !== 400) throw new ApiError('We could not verify your password. Please try again.');
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS) {
        attempts = 0;
        return { ok: false, error: 'too_many_attempts', retryAfter: LOCK_SECONDS };
      }
      return { ok: false, attemptsRemaining: MAX_ATTEMPTS - attempts };
    },
    async createRequest(action) {
      const code = CODES[action];
      if (code === undefined) throw new ApiError('This action is not available.');
      const { ok, status, data } = await send(ENDPOINT, 'POST', { id: memberId, action: code, password });
      if (!ok) {
        const message = data?.message || 'Something went wrong. Please try again.';
        throw /password/i.test(message)
          ? new ApiError(message, { status: 401, code: 'verification_expired' })
          : new ApiError(message, { status, code: data?.error || 'server_error', data });
      }
      password = '';
      const created = data?.data || {};
      await signOut();
      onSignedOut?.();
      return { id: created.requestId || created.id || '', action, status: 'submitted', submittedAt: new Date().toISOString(), history: [], signedOut: true };
    },
    cancelRequest: async () => { throw new ApiError('A request cannot be cancelled from here.'); },
  };
}
