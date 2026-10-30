import { resolveOptions, asArray } from './engine.js';

/** Human-readable answer text for the review screen */
export function formatAnswer(ctx, name, ans, i18n) {
  const q = ctx.data.questions[name];
  if (!ans) return null;
  if (ans.s) return i18n.t('rev.skipped');
  if (q.type !== 'choice') return String(ans.v);
  const r = resolveOptions(ctx, name);
  const byV = new Map((r.list || []).map((o) => [o.v, o]));
  return asArray(ans.v)
    .map((v) => {
      const o = byV.get(v);
      if (!o) return v;
      const label = q.country ? i18n.country(v, o.l) : q.geo === 'city' || q.geo === 'state' || q.geo === 'ethnicity' ? o.l : i18n.tc(o.l);
      return o.other && ans.o ? `${label}: ${ans.o}` : label;
    })
    .join(', ');
}

