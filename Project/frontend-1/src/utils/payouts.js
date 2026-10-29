// Country-aware payout rules.
// • India: UPI, PayPal, Wire Transfer, Amazon Gift Card
// • Everywhere else: PayPal, Wire Transfer, Amazon Gift Card (UPI is an India-only payment system)
import { COUNTRIES } from '../data/countries.js';

export const METHODS_INDIA = ['UPI', 'PayPal', 'Wire Transfer', 'Amazon Gift Card'];
export const METHODS_GLOBAL = ['PayPal', 'Wire Transfer', 'Amazon Gift Card'];
export const METHOD_ICON = { UPI: 'upi', PayPal: 'paypal', 'Wire Transfer': 'bank', 'Amazon Gift Card': 'gift' };

const ALIASES = { uk: 'GB', 'united kingdom': 'GB', england: 'GB', usa: 'US', us: 'US', 'united states': 'US', uae: 'AE', 'south korea': 'KR', korea: 'KR', vietnam: 'VN', russia: 'RU' };
const BY_NAME = Object.fromEntries(COUNTRIES.map((c) => [c.name.toLowerCase(), c.iso]));

// "Pune, India" / "India" / "IN" → "IN"
export function isoFromPlace(place = '', iso = '') {
  if (/^[A-Za-z]{2}$/.test(iso)) return iso.toUpperCase();
  const country = String(place).split(',').pop().trim().toLowerCase();
  return ALIASES[country] || BY_NAME[country] || (/^[a-z]{2}$/.test(country) ? country.toUpperCase() : '');
}
export const methodsFor = (iso) => (iso === 'IN' ? METHODS_INDIA : METHODS_GLOBAL);
export const normalizeMethod = (m = '') => {
  const t = m.toLowerCase();
  if (t.includes('upi')) return 'UPI';
  if (t.includes('paypal')) return 'PayPal';
  if (t.includes('wire') || t.includes('bank')) return 'Wire Transfer';
  if (t.includes('amazon') || t.includes('gift')) return 'Amazon Gift Card';
  return m;
};

// Drops any activity item whose payout method isn't offered in that member's country
// (e.g. a UPI payout outside India, or a rupee amount outside India) so notifications are always accurate.
export function sanitizeActivity(items = []) {
  return items
    .map((it) => {
      const iso = isoFromPlace(it.place, it.iso);
      return { ...it, iso, method: normalizeMethod(it.method) };
    })
    .filter((it) => it.iso && methodsFor(it.iso).includes(it.method) && !(it.iso !== 'IN' && /₹|INR|rs\.?\s/i.test(it.amount || '')));
}
