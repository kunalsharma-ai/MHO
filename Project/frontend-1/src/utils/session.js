// Who is logged in? Same idea as web-1's Context/member.js, GET /api/v1/me answers with the person (name, profilePicture,
// navbar links) or an error when the login is missing/expired.
// Same as web-1: ask the server, always. web-1's MemberProvider calls GET /api/v1/me on every page for everybody and treats an
// error as "guest". The login itself is the "authorization" cookie ("Bearer <jwt>") — it is not set by any code in web-1 or
// the back-end zips, so it comes from the server side / proxy, which also decides what to do with it. The browser sends the
// cookie with every same-origin request; when this script can read the cookie (or a localStorage "token") it also adds it
// as an Authorization header, which is what the back-end's isAuthenticated reads.
import { useEffect, useState } from 'react';
import { API, PREVIEW_ACCOUNT } from '../config/site.js';
import { auth } from './helpers.js';

const COOKIE = 'authorization';

function readCookie(name) {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  } catch {
    return '';
  }
}

// "Authorization" header value from whatever login this browser has ('' = nothing).
function bearer() {
  const t = auth.getToken();
  if (t) return `Bearer ${t}`;
  const c = readCookie(COOKIE).trim();
  if (!c) return '';
  return /^bearer\s/i.test(c) ? c : `Bearer ${c}`;
}

let cache = null; // { at, user }
const listeners = new Set();

export function clearSession() {
  cache = null;
  listeners.forEach((fn) => fn());
}

export async function getSession() {
  if (PREVIEW_ACCOUNT) return null;
  if (cache && Date.now() - cache.at < 60000) return cache.user;
  const authz = bearer(); // '' when the cookie cannot be read by JavaScript (HttpOnly): the cookie is still sent by the browser
  let user = null;
  try {
    const res = await fetch(API.me, { method: 'GET', headers: { Accept: 'application/json', ...(authz ? { Authorization: authz } : {}) }, credentials: 'same-origin' });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.status === 'success') user = data.data || {};
  } catch {
    /* offline: treat as guest for now */
  }
  cache = { at: Date.now(), user };
  return user;
}

/** Current member or null. Starts as null (guest) so the prerendered HTML and the first client render match. */
export function useSession() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let live = true;
    const run = () => getSession().then((u) => live && setUser(u));
    run();
    listeners.add(run);
    const onShow = (e) => { if (e.persisted) { cache = null; run(); } }; // Back button restoring a cached page
    window.addEventListener('pageshow', onShow);
    return () => { live = false; listeners.delete(run); window.removeEventListener('pageshow', onShow); };
  }, []);
  return user;
}

/** Log-in / sign-up / create-password pages: someone who is already logged in goes straight to the dashboard. */
export function useGuestOnly() {
  useEffect(() => {
    let live = true;
    const check = () => getSession().then((u) => { if (live && u) window.location.replace('/member/dashboard'); });
    check();
    const onShow = (e) => { if (e.persisted) { cache = null; check(); } };
    window.addEventListener('pageshow', onShow);
    return () => { live = false; window.removeEventListener('pageshow', onShow); };
  }, []);
}

/** Like web-1's Logout(): tell the API (DELETE /api/v1/me, answer ignored), forget the token and the login cookie, go home. */
export async function logout() {
  const authz = bearer();
  try {
    await fetch(API.me, { method: 'DELETE', headers: { Accept: 'application/json', ...(authz ? { Authorization: authz } : {}) }, credentials: 'same-origin' });
  } catch {
    /* ignore, like web-1 */
  }
  auth.clearToken();
  try { document.cookie = `${COOKIE}=; Max-Age=0; path=/`; } catch { /* ignore */ }
  clearSession();
  window.location.replace('/');
}
