import { useEffect, useState } from 'react';
import { DEMO_MODE } from '../data/site.js';
import { getJSON } from '../utils/api.js';
import { sanitizeActivity } from '../utils/payouts.js';

// Loads the reward-activity feed.
// Production: VITE_ACTIVITY_FEED_URL must return REAL, consented, privacy-safe events, e.g.
// [{ "name": "Priya K.", "place": "Pune, India", "role": "HR Manager", "segment": "business",
//    "amount": "₹450", "method": "UPI", "ago": "4 min ago" }]
// No feed configured → returns [] and every activity component hides itself.
const FEED = import.meta.env.VITE_ACTIVITY_FEED_URL;

let cache = null;

export default function useActivityFeed() {
  const [items, setItems] = useState(cache || []);
  useEffect(() => {
    if (cache) return;
    let alive = true;
    (async () => {
      try {
        let data = [];
        if (import.meta.env.VITE_DEMO_MODE === 'true') {
          // statically replaced by Vite → this branch (and the preview file) is removed from production bundles
          const m = await import('../data/activityPreview.js');
          data = m.previewActivity();
        } else if (FEED) {
          data = await getJSON(FEED);
        }
        // Country-aware payouts: UPI only for members in India (items breaking that rule are never shown).
        cache = sanitizeActivity(Array.isArray(data) ? data : []);
        if (alive) setItems(cache);
      } catch {
        if (alive) setItems([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  return { items, isPreview: DEMO_MODE };
}

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
