import { resolveOptions, asArray } from './engine.js';
import { isMoneyQuestion, moneyLabel } from './money.js';

/** Human-readable answer text for the review screen */
export function formatAnswer(ctx, name, ans, i18n) {
  const q = ctx.data.questions[name];
  if (!ans) return null;
  if (ans.s) return i18n.t('rev.skipped');
  if (q.type === 'date' && /^\d{4}-\d{2}-\d{2}$/.test(ans.v)) {
    const [y, m, d] = ans.v.split('-').map(Number);
    return i18n.date(new Date(y, m - 1, d), { day: 'numeric', month: 'long', year: 'numeric' });
  }
  if (q.type !== 'choice') return String(ans.v);
  const r = resolveOptions(ctx, name);
  const byV = new Map((r.list || []).map((o) => [o.v, o]));
  const money = isMoneyQuestion(name, q);
  const cc = ctx.answers.country?.v;
  return asArray(ans.v)
    .map((v) => {
      const o = byV.get(v);
      if (!o) return v;
      const ml = money && moneyLabel(o.l, cc, i18n.tag, i18n.t);
      const label = ml || (q.country ? i18n.country(v, o.l) : q.geo === 'city' || q.geo === 'state' || q.geo === 'ethnicity' ? o.l : i18n.tc(o.l));
      return o.other && ans.o ? `${label}: ${ans.o}` : label;
    })
    .join(', ');
}
