import { useEffect, useState } from 'react';
import { API, PREVIEW_ACCOUNT } from '../config/site.js';
import { apiRequest, auth, store } from './helpers.js';
import { ALL_COUNTRIES, countryByCode } from '../data/countries.js';

const KEY = 'mho-reviews';
const EVT = 'mho-review-added';
const POLL_MS = 30000;

const clean = (s, max) => String(s || '').replace(/[<>]/g, '').trim().slice(0, max);

export const isKid = (u) => Boolean(u?.isMinor) || /minor/i.test(String(u?.category || ''));

export const roleOf = (u) => {
  const c = String(u?.category || '').toLowerCase();
  if (/health|hcp|professional/.test(c)) return 'hcp';
  if (/care/.test(c)) return 'caregiver';
  if (/patient/.test(c)) return 'patient';
  return '';
};

export const reviewedKey = (u) => (u?._id ? `mho-reviewed-${u._id}` : 'mho-reviewed');

export const publicName = (first, last) => {
  const f = clean(first, 40);
  const l = clean(last, 40);
  return l ? `${f} ${l.slice(0, 1).toUpperCase()}.` : f;
};

const findCountry = (value) => {
  const v = String(value || '').trim().toLowerCase();
  if (!v) return null;
  return countryByCode(v) || ALL_COUNTRIES.find((c) => c.name.toLowerCase() === v) || null;
};

export const countryOf = (u) => {
  const list = Array.isArray(u?.address) ? u.address : [];
  const home = list.find((a) => a?.tag === 'home') || list[0];
  return findCountry(home?.country) || findCountry(u?.country);
};

// PUT /api/v1/testimonial with the member's login. The server takes name, country and member type from the
// account, so only the rating and the words are sent.
export async function submitReview({ rating, message }, member) {
  const rate = Math.max(1, Math.min(5, Number(rating) || 0));
  const text = clean(message, 600);
  const res = await apiRequest('PUT', API.testimonial, { rate, message: text });
  if (!res.ok) {
    const msg = String(res.data?.message || '');
    const usable = msg && !/^Fallback route:/i.test(msg) && msg.length < 160;
    return { ok: false, message: usable ? msg : 'We could not send your review right now. Please try again.' };
  }
  const d = res.data?.data && typeof res.data.data === 'object' && !Array.isArray(res.data.data) ? res.data.data : {};
  const c = countryOf(member);
  const pub = {
    id: String(d._id || d.id || `${Date.now()}`),
    name: publicName(member?.name?.first || member?.firstname, member?.name?.last || member?.lastname),
    company: '',
    designation: '',
    cc: c?.code || '',
    country: c?.name || '',
    roleType: roleOf(member),
    rating: rate,
    quote: text,
    createdAt: new Date().toISOString(),
    fresh: true,
  };
  store.set(KEY, [pub, ...store.get(KEY, [])].slice(0, 5));
  window.dispatchEvent(new CustomEvent(EVT, { detail: pub }));
  return { ok: true, review: pub, preview: res.preview };
}

function fromApi(r) {
  if (!r || typeof r !== 'object') return null;
  if (r.status && !/^(approved|published|live)$/i.test(String(r.status))) return null;
  const u = r.reviewer || r.user || r.member || {};
  const nm = u.name || {};
  let name = r.name || r.fullName || '';
  if (!name) name = publicName(r.firstName || nm.first || u.firstName, r.lastName || nm.last || u.lastName);
  else if (/\s/.test(String(name).trim())) {
    const [f, ...rest] = String(name).trim().split(/\s+/);
    name = publicName(f, rest.join(' '));
  }
  const c = [r.iso, r.countryCode, r.country, r.countryName, u.country, u.address?.[0]?.country].map(findCountry).find(Boolean) || null;
  const text = clean(r.text ?? r.message, 600);
  const rating = Number(r.rating ?? r.rate);
  if (!name || text.length < 10) return null;
  return {
    id: String(r.id || r._id || `${name}-${text.slice(0, 24)}`),
    name,
    company: clean(r.company || u.company, 60),
    designation: clean(r.designation || r.jobrole || u.jobrole, 60),
    cc: c?.code || '',
    country: c?.name || '',
    roleType: roleOf({ category: r.category || u.category }),
    rating: rating >= 1 && rating <= 5 ? Math.round(rating) : 5,
    quote: text,
    createdAt: r.createdAt || r.updatedAt || null,
  };
}

async function fetchFeed() {
  const token = auth.getToken();
  const res = await fetch(API.testimonial, { headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, cache: 'no-store', credentials: 'same-origin' });
  if (!res.ok) throw new Error('feed');
  const j = await res.json();
  if (j && /^Fallback route:/i.test(j.message || '')) throw new Error('feed');
  const list = Array.isArray(j) ? j : Array.isArray(j.reviews) ? j.reviews : Array.isArray(j.data) ? j.data : [];
  return list.map(fromApi).filter(Boolean);
}

const keyOf = (r) => `${r.name.toLowerCase()}|${String(r.quote || '').slice(0, 40).toLowerCase()}`;

/** Live list of member reviews: the approved ones from the server, plus this member's own until it is live. */
export function useMemberReviews() {
  const [live, setLive] = useState([]);
  const [own, setOwn] = useState([]);
  useEffect(() => {
    setOwn(store.get(KEY, []));
    if (PREVIEW_ACCOUNT || !API.testimonial) return undefined;
    let alive = true;
    const load = async () => {
      if (document.hidden) return;
      try {
        const list = await fetchFeed();
        if (alive) setLive(list);
      } catch { /* the feed is not available: only the member's own review is shown */ }
    };
    load();
    const timer = setInterval(load, POLL_MS);
    const onAdd = () => { setOwn(store.get(KEY, [])); setTimeout(load, 1500); };
    const onVisible = () => { if (!document.hidden) load(); };
    window.addEventListener(EVT, onAdd);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener(EVT, onAdd);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);
  const liveKeys = new Set(live.map(keyOf));
  return [...own.filter((r) => !liveKeys.has(keyOf(r))), ...live];
}
