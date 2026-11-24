/**
 * Survey engine – pure functions, no React.
 *
 * Answer shape:  answers[questionName] = { v: string | string[], o?: string, s?: 1 }
 *   v = selected option value(s) or typed text
 *   o = text typed in the "Please specify" box of an "Other" option
 *   s = 1 when an optional question was skipped
 *
 * A question is shown only when it is applicable:
 *   • choice questions: at least one option survives the parent-value filter
 *   • text questions:   their `when` rule matches
 * Parent chains are respected (a hidden parent hides its children).
 */
import { validate } from './validate.js';

const low = (s) => String(s ?? '').trim().toLowerCase();
export const asArray = (v) => (Array.isArray(v) ? v : v == null || v === '' ? [] : [v]);

export function createContext(data, answers, geo) {
  return { data, answers, geo, memo: new Map(), optMemo: new Map() };
}

/** Options for a choice question → { status: 'ok'|'pending'|'none', list, need } */
export function resolveOptions(ctx, name) {
  if (ctx.optMemo.has(name)) return ctx.optMemo.get(name);
  const r = computeOptions(ctx, name);
  ctx.optMemo.set(name, r);
  return r;
}

function computeOptions(ctx, name) {
  const q = ctx.data.questions[name];
  const A = ctx.answers;
  if (q.geo) {
    const cc = visible(ctx, 'country') && A.country?.v;
    if (!cc) return { status: 'none' };
    const g = ctx.geo.geo[cc];
    if (!g) return { status: 'pending', need: { kind: 'geo', cc } };
    let raw;
    if (q.geo === 'state' || q.geo === 'ethnicity' || q.geo === 'rural') raw = g[q.geo];
    else if (q.geo === 'pincome' || q.geo === 'hincome') {
      const rv = visible(ctx, 'rural') && A.rural?.v;
      raw = rv ? g[q.geo][rv] : null;
    } else if (q.geo === 'city') {
      const sv = visible(ctx, 'state') && A.state?.v;
      if (!sv) return { status: 'none' };
      const c = ctx.geo.cities[cc];
      if (!c) return { status: 'pending', need: { kind: 'cities', cc } };
      raw = (c[sv] || []).map((l) => [l, l]);
      if (!raw.length) return { status: 'none' };
      raw = [...raw, ['Other', '__other__']];
    }
    if (!raw || !raw.length) return { status: 'none' };
    const list = raw.map(([l, v], i) => ({ l, v, i, other: v === '__other__' || /^others?(\b|$)/i.test(l) }));
    return { status: 'ok', list };
  }
  if (!q.options) return { status: 'none' };
  const otherSet = new Set(q.other || []);
  const exclSet = new Set(q.exclusive || []);
  let parentVals = null;
  const list = [];
  q.options.forEach((o, i) => {
    const [l, v, pv] = o;
    if (pv) {
      if (parentVals === null) parentVals = q.parent && visible(ctx, q.parent) ? asArray(A[q.parent]?.v) : [];
      if (!pv.some((x) => parentVals.includes(x))) return;
    }
    list.push({ l, v, i, other: otherSet.has(i), excl: exclSet.has(i) });
  });
  return list.length ? { status: 'ok', list } : { status: 'none' };
}

/** Is question applicable for this respondent right now? */
export function visible(ctx, name) {
  if (ctx.memo.has(name)) return ctx.memo.get(name);
  ctx.memo.set(name, false); // cycle guard
  const q = ctx.data.questions[name];
  let res = false;
  if (!q) res = false;
  else if (q.type !== 'choice') {
    if (!q.when) res = true;
    else {
      const p = q.when.q;
      if (visible(ctx, p)) {
        const vals = asArray(ctx.answers[p]?.v).map(low);
        res = q.when.any ? vals.length > 0 : vals.some((x) => q.when.in.includes(x));
      }
    }
  } else {
    const r = resolveOptions(ctx, name);
    res = r.status !== 'none';
  }
  ctx.memo.set(name, res);
  return res;
}

/** Validates an answer. Returns null or [errKey, params] */
export function answerError(ctx, name, ans) {
  const q = ctx.data.questions[name];
  if (ans?.s && q.optional) return null; // optional question the member chose to skip
  if (!ans) return ['required'];
  if (q.type === 'choice') {
    const vals = asArray(ans.v);
    if (!vals.length) return ['pick'];
    if (q.multi && q.max && vals.length > q.max) return ['maxPick', { n: q.max }];
    const r = resolveOptions(ctx, name);
    if (r.status === 'pending') return null; // cannot verify yet – trust stored answer
    if (r.status !== 'ok') return ['pick'];
    const byV = new Map(r.list.map((o) => [o.v, o]));
    for (const v of vals) if (!byV.has(v)) return ['pick'];
    if (vals.some((v) => byV.get(v).other)) return validate('specify', ans.o || '');
    return null;
  }
  if (ans.s && q.optional) return null;
  return validate(q.rule || 'required', ans.v, { answers: ctx.answers, country: ctx.answers.country?.v });
}

export const isDone = (ctx, name) => !answerError(ctx, name, ctx.answers[name]);

/** Ordered list of applicable questions for a profile */
export function sequence(ctx, profile) {
  return profile.questions.filter((n) => visible(ctx, n));
}

/** First question in `seq` after index `from` that still needs an answer */
export function nextOpen(ctx, seq, from = -1) {
  for (let i = from + 1; i < seq.length; i++) if (!isDone(ctx, seq[i])) return i;
  return -1;
}

/** Status for dashboard */
export function profileStatus(ctx, profile, meta) {
  const seq = sequence(ctx, profile);
  let done = 0;
  let own = 0; // answered questions that are not shared screener questions
  for (const n of seq) {
    if (isDone(ctx, n)) {
      done++;
      if (!ctx.data.questions[n].shared) own++;
    }
  }
  const total = seq.length;
  const complete = total > 0 && done === total;
  const finished = !!meta?.completed?.[profile.id];
  let status = 'todo';
  if (complete && finished) status = 'done';
  else if (own > 0 || (finished && !complete)) status = 'progress';
  return { status, done, total, pct: total ? Math.round((done / total) * 100) : 0, needsAttention: finished && !complete };
}

/** Remove answers of questions that are no longer applicable anywhere */
export function prune(ctx) {
  const out = {};
  for (const k of Object.keys(ctx.answers)) if (ctx.data.questions[k] && visible(ctx, k)) out[k] = ctx.answers[k];
  return out;
}

/** Flat export using the ORIGINAL question names (for your backend). */
export function exportAnswers(ctx, names) {
  const out = {};
  for (const n of names) {
    const a = ctx.answers[n];
    if (!a || !visible(ctx, n)) continue;
    const q = ctx.data.questions[n];
    if (a.s) { out[n] = null; continue; }
    let v = a.v;
    if (q.geo === 'city' && v === '__other__') v = a.o;
    out[n] = v;
    if (a.parts) for (const k of Object.keys(a.parts)) out[n + '__' + k] = a.parts[k] || null; // fullname__first / __middle / __last
    if (a.cc) out[n + '__country'] = a.cc; // phone: ISO country of the calling code
    if (a.o) {
      out[n + '__other'] = a.o;
      if (n === 'professional-qualification') out['other-specify'] = a.o; // legacy field
    }
  }
  return out;
}

/** Status of a profile whose questions are not loaded yet: the percentage comes from the profile list of the API */
function backendStatus(profile, meta, pct = 0) {
  const total = profile.questions.length;
  if (meta?.completed?.[profile.id]) return { status: 'done', done: total, total, pct: 100, needsAttention: false };
  return { status: pct > 0 ? 'progress' : 'todo', done: Math.round((total * pct) / 100), total, pct, needsAttention: false };
}

/** Status of every profile + the recommended next profile */
export function allStatuses(data, answers, meta, geo) {
  const ctx = createContext(data, answers, geo);
  const map = {};
  for (const p of data.profiles) map[p.id] = data.pending?.[p.id] ? backendStatus(p, meta, data.backend?.[p.id]) : profileStatus(ctx, p, meta);
  const order = data.profiles.map((p) => p.id);
  const next =
    order.find((id) => map[id].status === 'progress') ||
    order.find((id) => map[id].status === 'todo') ||
    null;
  const doneCount = order.filter((id) => map[id].status === 'done').length;
  return { map, next, doneCount, total: order.length };
}
