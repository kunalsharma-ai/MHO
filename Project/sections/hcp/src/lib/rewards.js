/**
 * HCP rewards — v3.0 "Clinical Genome"
 *
 *   • every completed PROFILE = 70 Reward Points + 5 Quality Score points
 *   • awarded ONCE per profile — editing, revisiting or re-submitting a completed profile never adds more
 *     (the store only records the first completion, and the API call sends 0 for edits)
 *   • the Quality Score is an accumulated number of points (5, 10, 15 …), never converted to a percentage
 *   • nothing is locked: every profile can be opened in any order
 *
 * Change the numbers WITHOUT a rebuild in public/config.js (stand-alone) or the `config` mount option (embed):
 *   window.MHO_CONFIG = { rewards: { pointsPerProfile: 70, qualityPerProfile: 5 }, order: ['basic', …] }
 *
 * Totals are always computed from the real list of completed profiles — no hard-coded totals anywhere.
 * The profile list comes from the question bank, so 11, 50 or 150 profiles all work (docs/REWARDS_AND_QUALITY_SCORE.md).
 */
import { PROFILES } from './engine.js';

const cfg = () => (typeof window !== 'undefined' && window.MHO_CONFIG) || {};

export function rules() {
  const c = cfg().rewards || {};
  return {
    pointsPerProfile: Number.isFinite(c.pointsPerProfile) ? c.pointsPerProfile : 70,
    qualityPerProfile: Number.isFinite(c.qualityPerProfile) ? c.qualityPerProfile : 5,
  };
}

/** default display order: identity → practice → credentials → payout → digital → research → deep-dive */
export const DEFAULT_ORDER = [
  'basic', 'professional-category', 'professional', 'educational', 'experience', 'professional-address',
  'documents', 'social-media', 'technical', 'survey-participation', 'additional-details',
];
const all = () => PROFILES.map((p) => p.slug);

/** every profile, in display order (config `order` first, then the default order, then anything new in the bank) */
export function orderedSlugs() {
  const want = Array.isArray(cfg().order) ? cfg().order : DEFAULT_ORDER;
  const out = want.filter((s) => all().includes(s));
  for (const s of all()) if (!out.includes(s)) out.push(s);
  return out;
}
export const profileSlugs = orderedSlugs;

/** short code printed on cards / rungs: P-01, P-02 … P-120 */
export function codeOf(slug) {
  const i = orderedSlugs().indexOf(slug);
  return `P-${String(i + 1).padStart(2, '0')}`;
}

let itemPoints = {};
let paidPoints = {};
let itemQuality = {};
/** points and quality score set on each profile in the database, and what was really paid for the completed ones */
export function setPoints(items, paid, quality) {
  itemPoints = items || {};
  paidPoints = paid || {};
  itemQuality = quality || {};
}

export function rewardOf(slug) {
  const r = rules();
  const pts = paidPoints[slug] ?? itemPoints[slug];
  return { pts: pts === undefined ? r.pointsPerProfile : Number(pts), qs: itemQuality[slug] ?? r.qualityPerProfile };
}
export const sumOf = (slugs) => slugs.reduce((a, s) => { const r = rewardOf(s); a.pts += r.pts; a.qs += r.qs; return a; }, { pts: 0, qs: 0 });
export const completedSlugs = (completed) => orderedSlugs().filter((s) => completed?.[s]);
export const totalsOf = (completed) => sumOf(completedSlugs(completed));
/** what the header shows: only rewards already delivered by the animation (so the numbers move when the token lands) */
export const seenTotalsOf = (completed, seen = {}) => sumOf(completedSlugs(completed).filter((s) => seen[s]));
export const pendingRewards = (completed, seen = {}) => completedSlugs(completed).filter((s) => !seen[s]);
export const maxOf = () => sumOf(orderedSlugs());

/** progress summary used by the hero, the genome and the cards */
export function progressOf(completed = {}) {
  const items = orderedSlugs();
  const done = items.filter((s) => completed[s]);
  const todo = items.filter((s) => !completed[s]);
  const max = sumOf(items);
  const got = sumOf(done);
  return {
    items,
    done: done.length,
    total: items.length,
    todo,
    next: todo[0] || null,
    allDone: !todo.length,
    pct: items.length ? done.length / items.length : 0,
    left: { pts: max.pts - got.pts, qs: max.qs - got.qs },
  };
}

/**
 * Genome milestones — at 25 / 50 / 75 / 100 % of all profiles. Percent-based, so they work for any number of profiles.
 * key → i18n "ms_<key>"
 */
export const MILESTONES = [
  { at: 0.25, key: 'sample', emoji: '🧫' },
  { at: 0.5, key: 'sequence', emoji: '🔬' },
  { at: 0.75, key: 'map', emoji: '🧬' },
  { at: 1, key: 'genome', emoji: '🏆' },
];
/** number of profiles needed to reach a milestone */
export const milestoneCount = (m, total) => Math.max(1, Math.ceil(m.at * total - 1e-9));
export function nextMilestone(done, total) {
  return MILESTONES.find((m) => done < milestoneCount(m, total)) || null;
}

/**
 * Chromosome map: profiles grouped into chromosomes of `size` bands — 11 profiles = 1 chromosome,
 * 120 profiles = 10 chromosomes. The map never needs a redesign as profiles are added.
 */
export function chromosomes(items, size = 12) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
