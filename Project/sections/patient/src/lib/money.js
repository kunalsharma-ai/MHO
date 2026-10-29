/**
 * Income & money answers in the patient's own currency (ported from MyFrequentRewards v4.1).
 * The brackets in the data are bare numbers per country ("Up to 712800", "712801-1350001", "3898806 and above").
 * For DISPLAY only they become ₹7,12,800 (India), $40,000 (US), ¥10,000,000 (Japan)…, with a rising money icon
 * (🪙 → 💵 → 💰 → 💎 → 👑) and a note "Amounts in Indian rupee (₹ · INR)" with the country's flag.
 * Stored values never change, so the backend receives exactly the same data as before.
 */
export const CURRENCY = { US: 'USD', CA: 'CAD', MX: 'MXN', BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', CR: 'CRC', DO: 'DOP', GB: 'GBP', IE: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', IS: 'ISK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN', BA: 'BAM', AL: 'ALL', RS: 'RSD', UA: 'UAH', RU: 'RUB', BY: 'BYN', TR: 'TRY', IL: 'ILS', SA: 'SAR', AE: 'AED', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR', JO: 'JOD', LB: 'LBP', EG: 'EGP', MA: 'MAD', DZ: 'DZD', TN: 'TND', LY: 'LYD', NG: 'NGN', GH: 'GHS', KE: 'KES', UG: 'UGX', TZ: 'TZS', ET: 'ETB', ZA: 'ZAR', ZW: 'USD', AO: 'AOA', CM: 'XAF', MU: 'MUR', IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR', AF: 'AFN', CN: 'CNY', HK: 'HKD', TW: 'TWD', JP: 'JPY', KR: 'KRW', SG: 'SGD', MY: 'MYR', ID: 'IDR', TH: 'THB', VN: 'VND', PH: 'PHP', AU: 'AUD', NZ: 'NZD', IR: 'IRR', IQ: 'IQD', KZ: 'KZT', UZ: 'UZS', MN: 'MNT', KH: 'KHR', MM: 'MMK', LA: 'LAK' };

const fmts = new Map();
function formatter(tag, cc, cur) {
  const key = tag + cc + cur;
  if (!fmts.has(key)) {
    let f = null;
    for (const loc of [`${tag.split('-')[0]}-${cc}`, tag, 'en']) {
      try { f = new Intl.NumberFormat(loc, { style: 'currency', currency: cur, maximumFractionDigits: 0, minimumFractionDigits: 0 }); break; } catch {}
    }
    fmts.set(key, f);
  }
  return fmts.get(key);
}

/** { code, symbol, name, label } for a country, in the current language */
export function currencyOf(cc, tag = 'en') {
  const code = CURRENCY[cc];
  if (!code) return null;
  const f = formatter(tag, cc, code);
  let symbol = code, name = code;
  try { symbol = (f.formatToParts(0).find((p) => p.type === 'currency') || {}).value || code; } catch {}
  try { name = new Intl.DisplayNames([tag], { type: 'currency' }).of(code) || code; } catch {}
  return { code, symbol, name, label: symbol && symbol !== code ? `${name} (${symbol} · ${code})` : `${name} (${code})` };
}

const RE_UP = /^\s*(?:up ?to|under|below|less than)\s*([\d,.]+)\s*$/i;
const RE_RANGE = /^\s*([\d,.]+)\s*[-–]\s*([\d,.]+)\s*$/;
const RE_ABOVE = /^\s*([\d,.]+)\s*(?:and above|\+|or more|and over)\s*$/i;
const num = (s) => +String(s).replace(/[^\d.]/g, '');

/** is this option label a money bracket? */
export const isMoney = (label) => RE_UP.test(label) || RE_RANGE.test(label) || RE_ABOVE.test(label);

/** formatted label in the country's currency, or null when the label is not a bracket */
export function moneyLabel(label, cc, tag, t) {
  const code = CURRENCY[cc];
  const f = code ? formatter(tag, cc, code) : (() => { try { return new Intl.NumberFormat(tag); } catch { return new Intl.NumberFormat('en'); } })();
  const m = (v) => f.format(v);
  let x;
  if ((x = RE_UP.exec(label))) return t('cur.upto', { a: m(num(x[1])) });
  if ((x = RE_RANGE.exec(label))) return `${m(num(x[1]))} – ${m(num(x[2]))}`;
  if ((x = RE_ABOVE.exec(label))) return t('cur.above', { a: m(num(x[1])) });
  return null;
}
const TIERS = ['🪙', '💵', '💰', '💎', '👑'];
/** rising money icon for the k-th of n brackets (sorted low → high) */
export const moneyIcon = (k, n, cc) => {
  const i = Math.min(4, Math.floor((k / Math.max(1, n)) * 5));
  if (i === 1) return CURRENCY[cc] === 'EUR' ? '💶' : CURRENCY[cc] === 'GBP' ? '💷' : CURRENCY[cc] === 'JPY' || CURRENCY[cc] === 'CNY' ? '💴' : '💵';
  return TIERS[i];
};
/** money questions in this bank */
export const isMoneyQuestion = (name, q) => q.geo === 'pincome' || q.geo === 'hincome' || name === 'organization-revenue';
