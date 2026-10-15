// Member reviews: submitted through the "Rate your experience" form and shown live in the testimonials.
// - The submitter sees their own review immediately (stored in this browser).
// - With a backend at API.reviews (GET returns approved reviews, POST stores new ones), every visitor
//   sees approved reviews. Moderate before publishing: reviews are user-generated content.
import { useEffect, useState } from 'react';
import { API, PREVIEW_FORMS } from '../config/site.js';
import { postJSON, store } from './helpers.js';

const KEY = 'mho-reviews';
const EVT = 'mho-review-added';

const clean = (s, max) => String(s || '').replace(/[<>]/g, '').trim().slice(0, max);

export async function submitReview(input) {
  const review = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    firstName: clean(input.firstName, 40),
    lastName: clean(input.lastName, 40),
    email: clean(input.email, 120),
    phone: clean(input.phone, 24),
    company: clean(input.company, 80),
    designation: clean(input.designation, 80),
    country: input.country,
    countryName: clean(input.countryName, 60),
    role: input.role,
    rating: Math.max(1, Math.min(5, Number(input.rating) || 5)),
    text: clean(input.text, 600),
    createdAt: new Date().toISOString(),
  };
  const res = await postJSON(API.reviews, review);
  if (!res.ok) return { ok: false, message: res.data?.message || 'We could not send your review right now. Please try again.' };
  // Public shape (never expose email/phone in the UI)
  const pub = { id: review.id, name: `${review.firstName} ${review.lastName ? review.lastName[0] + '.' : ''}`.trim(), company: review.company, designation: review.designation, cc: review.country, country: review.countryName, roleType: review.role, rating: review.rating, quote: review.text, createdAt: review.createdAt, fresh: true };
  const list = store.get(KEY, []);
  store.set(KEY, [pub, ...list].slice(0, 20));
  window.dispatchEvent(new CustomEvent(EVT, { detail: pub }));
  return { ok: true, review: pub, preview: res.preview };
}

/** Live list of member-submitted reviews (local + approved remote). */
export function useMemberReviews() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const local = store.get(KEY, []);
    setList(local);
    let cancelled = false;
    if (!PREVIEW_FORMS && API.reviews) {
      fetch(API.reviews, { headers: { Accept: 'application/json' } })
        .then((r) => (r.ok ? r.json() : []))
        .then((remote) => {
          if (cancelled || !Array.isArray(remote)) return;
          const ids = new Set(local.map((x) => x.id));
          setList([...local, ...remote.filter((x) => !ids.has(x.id))]);
        })
        .catch(() => {});
    }
    const onAdd = (e) => setList((prev) => [e.detail, ...prev.filter((x) => x.id !== e.detail.id)]);
    const onStorage = (e) => e.key === KEY && setList(store.get(KEY, []));
    window.addEventListener(EVT, onAdd);
    window.addEventListener('storage', onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener(EVT, onAdd);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  return list;
}
