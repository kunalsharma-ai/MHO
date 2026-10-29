import { API_BASE, DEMO_MODE } from '../data/site.js';

// Thin fetch wrapper for the backend. The backend is NOT part of this repository.
// In DEMO_MODE (preview builds only) a successful response is simulated so the UI can be reviewed.
//
// The existing API answers { status: 'success' | 'error', message, data } and sends every failure
// as HTTP 404, whatever the real cause, so the message text is what matters, not the status code.

export class ApiError extends Error {
  constructor(message, { status = 0, fields = {} } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

// Turns raw backend / Mongoose messages into something a member can read.
//   "Error creating item: User validation failed: gender: Gender is required, mail: Email is required"
//   → "Gender is required. Email is required."
export function friendlyMessage(raw = '') {
  const msg = String(raw || '').trim();
  if (!msg) return 'Something went wrong. Please try again.';
  if (/E11000|duplicate key/i.test(msg)) {
    return 'This email is already registered. Log in, or use “Forgot password” if you never finished creating your password.';
  }
  const validation = /validation failed:\s*(.+)$/i.exec(msg);
  if (validation) {
    const parts = validation[1]
      .split(/,\s(?=[\w.]+:\s)/)
      .map((p) => p.replace(/^[\w.]+:\s*/, '').replace(/[.\s]+$/, ''))
      .filter(Boolean);
    if (parts.length) return `${parts.join('. ')}.`;
  }
  return msg.replace(/^Error (?:creating|reading|updating|deleting|listing|finding) items?:\s*/i, '');
}

async function request(method, endpoint, payload) {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true };
  }
  let res;
  try {
    res = await fetch(API_BASE + endpoint, {
      method,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: payload === undefined ? undefined : JSON.stringify(payload),
    });
  } catch {
    throw new ApiError('We couldn’t reach the server. Check your connection and try again.');
  }
  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }
  // Unknown paths reach the backend's catch-all, which replies 200 with "Fallback route: … is not available".
  // Treat that as a failure instead of a silent success.
  if (/^Fallback route:/i.test(data.message || '')) {
    throw new ApiError('This service is not available right now. Please try again later.', { status: res.status });
  }
  if (!res.ok || data.status === 'error') {
    throw new ApiError(friendlyMessage(data.message), { status: res.status, fields: data.errors || {} });
  }
  return { ok: true, ...data };
}

export const getData = (endpoint) => request('GET', endpoint);
export const postJSON = (endpoint, payload) => request('POST', endpoint, payload);
export const putJSON = (endpoint, payload) => request('PUT', endpoint, payload);
export const patchJSON = (endpoint, payload) => request('PATCH', endpoint, payload);

export async function getJSON(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Feed unavailable');
  return res.json();
}
