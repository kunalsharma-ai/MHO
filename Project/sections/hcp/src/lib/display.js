import { QUESTIONS, resolveOptions, PROFILE_BY_SLUG, otherKey } from './engine.js';
import { formatIncomeLabel } from './geo.js';

const regionNames = {};
function regionName(code, lang) {
  try {
    if (!regionNames[lang]) regionNames[lang] = new Intl.DisplayNames([lang], { type: 'region' });
    return regionNames[lang].of(code);
  } catch { return null; }
}

/** Label shown for an option (translated, country names localised, income formatted in local currency). */
export function optionLabel(q, name, opt, i18n, get) {
  if (!opt) return '';
  if (q.type === 'country' && i18n.lang !== 'en') return regionName(opt.v, i18n.lang) || opt.l;
  if (name === 'personal-income' || name === 'household-income') {
    return formatIncomeLabel(opt.l, get('country'), i18n.lang);
  }
  return i18n.o(opt.l);
}

/** Human-readable answer text for review/summary screens. */
export function answerText(slug, name, get, i18n) {
  const q = QUESTIONS[name];
  const v = get(name);
  if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) return null;
  if (typeof v === 'object' && v.__masked) return v.__masked;
  if (q.sensitive && typeof v === 'string') return `••••${v.slice(-4)}`;
  const other = get(otherKey(name));
  if (q.options || q.source) {
    const r = resolveOptions(q, get, PROFILE_BY_SLUG[slug].questions);
    const opts = r.options || q.options || [];
    const one = (x) => {
      const o = opts.find((k) => k.v === x);
      const base = o ? optionLabel(q, name, o, i18n, get) : String(x);
      return o?.other && other ? `${base}: ${other}` : base;
    };
    return Array.isArray(v) ? v.map(one).join(', ') : one(v);
  }
  if (q.type === 'tel') return `+${v.dial} ${v.num}`;
  if (q.type === 'file') return `📎 ${v.name}`;
  if (q.type === 'date') {
    try { return new Intl.DateTimeFormat(i18n.lang, { dateStyle: 'medium' }).format(new Date(v)); } catch { return v; }
  }
  if (q.type === 'range') return `${v}${q.unit || ''}`;
  if (q.type === 'number' && q.unit) return `${v} ${q.unit}`;
  return String(v);
}
