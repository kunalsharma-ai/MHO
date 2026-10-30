/**
 * Income answers in the respondent's own currency (display only — stored values never change).
 * The income brackets in the data are bare numbers per country ("Up to 712800", "712801-1350001",
 * "3898806 and above"). They are shown in that country's currency and number style:
 *   India  → ₹7,12,800 · ₹7,12,801 – ₹13,50,001 · ₹38,98,806 and above
 *   US     → $40,000 – $80,001        Japan → ¥4,000,000 …
 * with a "Amounts in Indian rupee (₹ · INR)" note and the country flag next to the question.
 */
import { CURRENCY } from './phone-meta.js';

const fmts = new Map();
function formatter(lang, cc, cur) {
  const key = lang + cc + cur;
  if (!fmts.has(key)) {
    let f = null;
    const l = lang === 'zh' ? 'zh-CN' : lang;
    for (const loc of [`${l}-${cc}`, l, 'en']) {
      try { f = new Intl.NumberFormat(loc, { style: 'currency', currency: cur, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0, minimumFractionDigits: 0 }); break; } catch { /* next */ }
    }
    fmts.set(key, f);
  }
  return fmts.get(key);
}

/** label for one bracket, or null when it is not a bracket */
export function moneyLabel(raw, cc, lang, t) {
  const cur = CURRENCY[cc];
  if (!cur) return null;
  const f = formatter(lang, cc, cur);
  if (!f) return null;
  const s = String(raw).trim();
  let m = /^Up to (\d+)$/i.exec(s);
  if (m) return t('fmt.upTo', { n: f.format(+m[1]) });
  m = /^(\d+) and above$/i.exec(s);
  if (m) return t('fmt.andAbove', { n: f.format(+m[1]) });
  m = /^(\d+)\s*[-–]\s*(\d+)$/.exec(s);
  if (m) return f.format(+m[1]) + ' – ' + f.format(+m[2]);
  return null;
}

/** "Indian rupee (₹ · INR)" */
export function currencyName(cc, lang) {
  const cur = CURRENCY[cc];
  if (!cur) return null;
  let nm = cur, sym = cur;
  try { nm = new Intl.DisplayNames([lang === 'zh' ? 'zh-CN' : lang], { type: 'currency' }).of(cur) || cur; } catch { /* keep code */ }
  try { sym = (formatter(lang, cc, cur).formatToParts(0).find((p) => p.type === 'currency') || {}).value || cur; } catch { /* keep */ }
  return { name: nm, sym, code: cur, label: sym && sym !== cur ? `${nm} (${sym} · ${cur})` : `${nm} (${cur})` };
}

/** rising money icons for brackets, low → high */
export const MONEY_ICONS = ['🪙', '💵', '💰', '💳', '💎', '🏦', '👑'];
