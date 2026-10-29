/**
 * Rewards — "Health Pulse".
 *
 *   • every completed PROFILE (About You)  = 50 Reward Points + 1 Quality Score
 *   • every completed SURVEY (health, research, additional) = 50 Reward Points + 1 Quality Score
 *   • awarded once per item — editing answers later never adds more
 *   • 1,000 points = 1 USD
 * All numbers are configurable in config.rewards (see public/config.js). The browser only DISPLAYS rewards;
 * your backend must calculate payouts from the completions it receives (POST submitPath).
 *
 * Levels are driven by the Quality Score and continue forever (Legend II, III, …), so the system keeps
 * working when the bank grows from 25 to 100+ profiles and surveys.
 */
import { cfg } from './config.js';
import { kindOf } from './access.js';

export function rules() {
  const r = cfg().rewards || {};
  return {
    profilePts: r.pointsPerProfile ?? 50,
    surveyPts: r.pointsPerSurvey ?? 50,
    profileQs: r.qualityPerProfile ?? 1,
    surveyQs: r.qualityPerSurvey ?? 1,
    perUsd: r.pointsPerUsd ?? 1000,
  };
}
let itemPoints = {};
let paidPoints = {};
/** points set on each profile in the database, and what was really paid for the completed ones */
export function setPoints(items, paid) {
  itemPoints = items || {};
  paidPoints = paid || {};
}
/** reward for one item: { pts, qs } */
export function rewardOf(id) {
  const R = rules();
  const base = kindOf(id) === 'profile' ? { pts: R.profilePts, qs: R.profileQs } : { pts: R.surveyPts, qs: R.surveyQs };
  const pts = paidPoints[id] ?? itemPoints[id];
  return pts === undefined ? base : { ...base, pts: Number(pts) };
}

const ids = (meta, only) => Object.keys(meta?.completed || {}).filter((id) => meta.completed[id] && (!only || only[id]));
/** totals for completed items (optionally only the delivered ones) */
export function totals(meta, delivered) {
  let pts = 0, qs = 0, n = 0;
  for (const id of ids(meta, delivered)) { const r = rewardOf(id); pts += r.pts; qs += r.qs; n++; }
  return { pts, qs, n };
}
/** completed items whose reward animation has not played yet */
export const pendingDelivery = (meta, delivered = {}) => ids(meta).filter((id) => !delivered[id]);
export const completedIds = (meta) => ids(meta);

/* ---------------- levels (by Quality Score) ---------------- */
export const LEVELS = [
  { key: 'newcomer', emoji: '🌱', at: 0, c: ['#10B981', '#6EE7B7'] },
  { key: 'explorer', emoji: '🧭', at: 1, c: ['#0EA5E9', '#7DD3FC'] },
  { key: 'contributor', emoji: '💧', at: 3, c: ['#2563EB', '#93C5FD'] },
  { key: 'insider', emoji: '💚', at: 6, c: ['#059669', '#A7F3D0'] },
  { key: 'advocate', emoji: '🩺', at: 10, c: ['#7C3AED', '#C4B5FD'] },
  { key: 'champion', emoji: '🧬', at: 15, c: ['#DB2777', '#F9A8D4'] },
  { key: 'pioneer', emoji: '🚀', at: 21, c: ['#EA580C', '#FDBA74'] },
  { key: 'luminary', emoji: '🌟', at: 28, c: ['#CA8A04', '#FDE68A'] },
  { key: 'legend', emoji: '👑', at: 36, c: ['#B91C1C', '#FCA5A5'] },
];
const ROMAN = ['', '', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
/** level for a quality score: { index, key, emoji, at, next, rank, c } (endless: Legend II at 46, III at 57 …) */
export function levelOf(qs) {
  let i = 0;
  for (let k = 0; k < LEVELS.length; k++) if (qs >= LEVELS[k].at) i = k;
  if (i < LEVELS.length - 1) return { index: i, ...LEVELS[i], rank: '', next: LEVELS[i + 1].at };
  // beyond Legend: every further step needs 10, 11, 12 … more
  let at = LEVELS[LEVELS.length - 1].at, step = 10, r = 1;
  while (qs >= at + step) { at += step; step++; r++; }
  return { index: LEVELS.length - 1 + (r - 1), ...LEVELS[LEVELS.length - 1], at, rank: ROMAN[r] || String(r), next: at + step };
}

export function usd(pts, lang = 'en') {
  const v = pts / rules().perUsd;
  try {
    return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);
  } catch {
    return '$' + v.toFixed(2);
  }
}
/** next whole-dollar milestone above pts */
export const nextCash = (pts) => { const p = rules().perUsd; return (Math.floor(pts / p) + 1) * p; };
