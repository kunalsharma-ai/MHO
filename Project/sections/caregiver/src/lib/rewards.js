
import { store } from './store.js';

const cfg = () => (typeof window !== 'undefined' && window.MHO_CONFIG && window.MHO_CONFIG.rewards) || {};
export const rules = () => {
  const c = cfg();
  return {
    pointsPerProfile: c.pointsPerProfile ?? 50,
    qualityPerProfile: c.qualityPerProfile ?? 1,
    pointsPerSurvey: c.pointsPerSurvey ?? 50,
    qualityPerSurvey: c.qualityPerSurvey ?? 1,
    pointsPerUsd: c.pointsPerUsd ?? 1000,
  };
};

export const POINTS_PER_PROFILE = 50;
export const QUALITY_PER_PROFILE = 1;

/** chapters whose items are PROFILES (must be completed first); every other chapter holds SURVEYS */
export const PROFILE_CHAPTERS = ['you'];
export const isProfileChapter = (chapter) => PROFILE_CHAPTERS.includes(chapter);

export const ITEMS = [
  { id: 'care-role', chapter: 'you', title: 'Your Caregiving Role', emoji: '🤝', palette: ['#D7263D', '#FF8A3D', '#FFE0B8'] },
  { id: 'basic', chapter: 'you', title: 'Basic Profile', emoji: '🪪', palette: ['#0F6E8F', '#2BB3C0', '#C9F3EE'] },
  { id: 'education', chapter: 'you', title: 'Education & Care Skills', emoji: '🎓', palette: ['#5B2A86', '#9B5DE5', '#EBD9FF'] },
  { id: 'professional', chapter: 'you', title: 'Professional Profile', emoji: '💼', palette: ['#08776A', '#2EC4A6', '#CDF7EA'] },
  { id: 'health', chapter: 'health', title: 'Personal Health', emoji: '❤️‍🩹', palette: ['#D62839', '#FF6B7D', '#FFD9DE'] },
  { id: 'insurance', chapter: 'health', title: 'Health Insurance', emoji: '🛡️', palette: ['#1D3FA8', '#4C7DFF', '#D6E3FF'] },
  { id: 'food', chapter: 'health', title: 'Food & Lifestyle', emoji: '🥗', palette: ['#2F7D32', '#8CC63F', '#EAF8C4'] },
  { id: 'fitness', chapter: 'health', title: 'Sports & Fitness', emoji: '🏃', palette: ['#E0520C', '#FFA62B', '#FFE7C2'] },
  { id: 'tech', chapter: 'health', title: 'Technology & Digital Health', emoji: '📱', palette: ['#5A12D6', '#D600B0', '#F2D4FF'] },
  { id: 'survey', chapter: 'you', title: 'Survey & Reward Preferences', emoji: '🎁', palette: ['#B5175A', '#FF5C8A', '#FFD6E5'] },
  { id: 'social', chapter: 'you', title: 'Social Media & Payouts', emoji: '💳', palette: ['#00695C', '#12B5CB', '#CBF3F2'] },
  { id: 'additional', chapter: 'health', title: 'Additional Details', emoji: '✨', palette: ['#26287A', '#7C4DFF', '#FFC9F2'] },
];
/** older name used by tests / e-mail scripts */
export const STAMPS = ITEMS;

/** The list to use: live profiles from the data when loaded, otherwise the mirror above. */
export const itemsOf = (survey) => (survey?.profiles?.length ? survey.profiles : ITEMS);
const CHAPTER_OF = Object.fromEntries(ITEMS.map((i) => [i.id, i.chapter]));
let liveChapters = null;
export function registerItems(profiles) {
  if (profiles?.length) liveChapters = Object.fromEntries(profiles.map((p) => [p.id, p.chapter]));
}
const chapterOf = (id) => (liveChapters && liveChapters[id]) || CHAPTER_OF[id];
export const isProfileId = (id) => isProfileChapter(chapterOf(id));

let itemPoints = {};
let paidPoints = {};
/** points set on each profile in the database, and what was really paid for the completed ones */
export function setPoints(items, paid) {
  itemPoints = items || {};
  paidPoints = paid || {};
}
/** reward for one item */
export function rewardOf(id) {
  const r = rules();
  const base = isProfileId(id) ? { pts: r.pointsPerProfile, qs: r.qualityPerProfile } : { pts: r.pointsPerSurvey, qs: r.qualityPerSurvey };
  const pts = paidPoints[id] ?? itemPoints[id];
  return pts === undefined ? base : { ...base, pts: Number(pts) };
}

const knownIds = () => (liveChapters ? Object.keys(liveChapters) : ITEMS.map((i) => i.id));
export const completedIds = (meta) => knownIds().filter((id) => meta?.completed?.[id]);

/** totals of a set of ids */
export function sumOf(ids) {
  return ids.reduce((a, id) => { const r = rewardOf(id); a.pts += r.pts; a.qs += r.qs; return a; }, { pts: 0, qs: 0 });
}
/** everything earned */
export const totalsOf = (meta) => sumOf(completedIds(meta));
/** what the header shows: only items whose reward has been delivered by the animation */
export const seenTotalsOf = (meta, seen = {}) => sumOf(completedIds(meta).filter((id) => seen[id]));
/** completed items whose reward has not been delivered (animated) yet */
export const pendingRewards = (meta, seen = {}) => completedIds(meta).filter((id) => !seen[id]);
/** maximum that can be earned with the current list */
export const maxOf = (items) => sumOf(items.map((i) => i.id));

/**
 * Quality Score levels ("vitality levels"). Open-ended, so the ladder keeps working at 10, 100 or 200 items.
 * key → i18n "lvl.<key>"; c = colour of the level.
 */
export const LEVELS = [
  { min: 0, key: 'newcomer', emoji: '🌱', c: '#C9A27E' },
  { min: 1, key: 'helper', emoji: '🤲', c: '#FF8A65' },
  { min: 3, key: 'supporter', emoji: '🫶', c: '#F06292' },
  { min: 5, key: 'companion', emoji: '🌷', c: '#E040A0' },
  { min: 8, key: 'guardian', emoji: '🛡️', c: '#9C6ADE' },
  { min: 12, key: 'champion', emoji: '🏵️', c: '#5C8DFF' },
  { min: 18, key: 'hero', emoji: '🦸', c: '#26C6B5' },
  { min: 30, key: 'beacon', emoji: '🕯️', c: '#FFC24B' },
  { min: 50, key: 'angel', emoji: '😇', c: '#FFE08A' },
  { min: 80, key: 'luminary', emoji: '🌟', c: '#FFF3B0' },
];
export const levelIndex = (qs) => LEVELS.reduce((k, l, i) => (qs >= l.min ? i : k), 0);
export const levelOf = (qs) => LEVELS[levelIndex(qs)];
export const nextLevelOf = (qs) => LEVELS[levelIndex(qs) + 1] || null;
/** 0..1 progress from the current level to the next */
export function levelProgress(qs) {
  const a = levelOf(qs), b = nextLevelOf(qs);
  if (!b) return 1;
  return Math.max(0, Math.min(1, (qs - a.min) / (b.min - a.min)));
}

/** cash milestones: every whole dollar */
export const nextCashOf = (pts) => (Math.floor(pts / rules().pointsPerUsd) + 1) * rules().pointsPerUsd;

export function usd(pts, lang = 'en') {
  const v = pts / rules().pointsPerUsd;
  try {
    return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);
  } catch {
    return '$' + v.toFixed(2);
  }
}

export function markRewardSeen(ids) {
  const list = Array.isArray(ids) ? ids : [ids];
  if (!list.length) return;
  store.set((s) => ({ gemSeen: { ...(s.gemSeen || {}), ...Object.fromEntries(list.map((id) => [id, Date.now()])) } }));
}
/** older name */
export const markStampSeen = markRewardSeen;
export const markGemSeen = markRewardSeen;
/** older names used by the v1.3 tests / e-mail scripts */
export const TREASURE = ITEMS;
export const TREASURE_IDS = ITEMS.map((i) => i.id);
