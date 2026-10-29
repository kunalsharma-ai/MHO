import { API_BASE, DEMO_MODE, USER_API } from '../data/site.js';
import { ApiError, friendlyMessage } from './api.js';


export async function loginMember({ mail, password, remember }) {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true };
  }
  let res;
  try {
    res = await fetch(`${API_BASE}${USER_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      redirect: 'manual',
      body: JSON.stringify({ mail, password, ...(remember ? { remember } : {}) }),
    });
  } catch {
    throw new ApiError('We couldn’t reach the server. Check your connection and try again.');
  }
  if (res.type === 'opaqueredirect') return { ok: true };
  let data = {};
  try { data = await res.json(); } catch { /* non-JSON body */ }
  if (res.ok && data.status !== 'error') return { ok: true, ...data };
  throw new ApiError(friendlyMessage(data.message), { status: res.status });
}