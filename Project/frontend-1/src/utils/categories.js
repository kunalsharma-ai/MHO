import { CATEGORY_API, MEMBER_CATEGORIES } from '../data/site.js';
import { getData } from './api.js';

// Member categories come from the backend (GET /api/v1/category) instead of being hard-coded. The category a member
// is created with decides which kind of surveys they see (Survey.category / auto-invites).
//   consumer     → the category named like "b2c" / "consumer"
//   professional → the category named like "b2b" / "business" / "professional"
// If the list can't be loaded, the VITE_CATEGORY_* values (defaults b2c / b2b) are used.
const CONSUMER = /b2c|consumer|customer/i;
const PROFESSIONAL = /b2b|business|professional/i;

export function pickCategories(list, fallback = MEMBER_CATEGORIES) {
  const names = (Array.isArray(list) ? list : []).map((c) => (typeof c === 'string' ? c : c && c.name)).filter(Boolean);
  return {
    consumer: names.find((n) => CONSUMER.test(n)) || fallback.consumer,
    professional: names.find((n) => PROFESSIONAL.test(n)) || fallback.professional,
  };
}

// Which form to show for a member whose backend category is `category`.
export function memberTypeOf(category, cats = MEMBER_CATEGORIES) {
  const c = String(category || '').toLowerCase();
  if (!c) return 'consumer';
  if (c === String(cats.professional).toLowerCase() || PROFESSIONAL.test(c)) return 'professional';
  return 'consumer';
}

let pending = null; // kept in memory only
export function loadMemberCategories() {
  if (!pending) {
    pending = getData(CATEGORY_API)
      .then((res) => pickCategories(res.data))
      .catch(() => {
        pending = null; // try again next time
        return MEMBER_CATEGORIES;
      });
  }
  return pending;
}

// Forget the loaded list (used by the tests).
export function resetMemberCategories() {
  pending = null;
}
