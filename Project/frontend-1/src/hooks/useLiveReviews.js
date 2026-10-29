import { useEffect, useState } from 'react';
import { REVIEW_EVENT, mergeReviews, normalizeReview, ownReviews } from '../utils/reviews.js';
import { TESTIMONIALS } from '../data/community.js';
import { DEMO_MODE } from '../data/site.js';

const FEED = import.meta.env.VITE_REVIEWS_FEED_URL || '/api/reviews';
const FALLBACK = '/data/reviews.json';
const POLL_MS = 30000;
const BASE = TESTIMONIALS.map(normalizeReview).filter(Boolean);

async function fetchFeed(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error('feed');
  const j = await res.json();
  const arr = Array.isArray(j) ? j : Array.isArray(j.reviews) ? j.reviews : [];
  return arr.map(normalizeReview).filter(Boolean);
}

// Live testimonials: polls the reviews feed every 30 s while the page is visible, merges new published reviews
// on top of the supplied testimonials, and instantly shows the visitor's own just-submitted review.
export default function useLiveReviews() {
  const [live, setLive] = useState([]);
  const [own, setOwn] = useState([]);
  const [status, setStatus] = useState('static'); // static | live
  useEffect(() => {
    setOwn(ownReviews());
    let alive = true;
    let url = FEED;
    const load = async () => {
      if (document.hidden) return;
      try {
        const list = await fetchFeed(url);
        if (!alive) return;
        setLive(list);
        setStatus(url === FALLBACK || DEMO_MODE ? 'static' : 'live');
      } catch {
        if (url !== FALLBACK) { url = FALLBACK; load(); }
      }
    };
    load();
    const t = setInterval(load, POLL_MS);
    const onNew = () => { setOwn(ownReviews()); setTimeout(load, 1500); };
    const onVis = () => { if (!document.hidden) load(); };
    window.addEventListener(REVIEW_EVENT, onNew);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      alive = false;
      clearInterval(t);
      window.removeEventListener(REVIEW_EVENT, onNew);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return { reviews: mergeReviews(live, own, BASE), status };
}
