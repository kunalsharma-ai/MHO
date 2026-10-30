"use client";
// Completing a profile makes the API pay its points (Reward Balance) and raise the Quality Score, both stored in the database.
// The screens that already show those numbers (sidebar, dashboard, My Account) read them when they open; this counter tells them
// to read them AGAIN right after a profile was completed, so they change without a reload.
//   bumpRewards()      - call it after a profile was saved (profile page)
//   useRewardsTick()   - add the returned number to the dependencies of the effect that loads /api/v1/me/points
import { useSyncExternalStore } from "react";
import { api } from "@/util";

let tick = 0;
const listeners = new Set();
const subscribe = (fn) => (listeners.add(fn), () => listeners.delete(fn));

export function bumpRewards() {
  tick += 1;
  listeners.forEach((fn) => fn());
}
export const useRewardsTick = () => useSyncExternalStore(subscribe, () => tick, () => 0);

// ---- Rewards in the database (API: /api/v1/rewards, model Rewards { user, category, points, remarks }) --------------------------------
// - a completed profile is paid with PUT /api/v1/rewards { category: "profile", points, remarks: "... [profile:<slug>]" } - once per profile
//   (the remarks tag is how an already paid profile is recognised, so nothing is ever paid twice)
// - Reward Balance = the sum of the points of this member's rewards (GET /api/v1/rewards)
// - the points of a profile are the ones set in the admin (Profile.points, 50 each)
const PROFILE_REWARD_CATEGORY = "profile";
const tagOf = (slug) => `[profile:${slug}]`;
const idOf = (v) => String(v?._id ?? v ?? "");
export const profileCategoryOf = (user) => user?.category || "b2c"; // the category the Profiles page asks the profile list with

/** the member's rewards as a list, or null when the API cannot be read (then nothing is paid and the balance falls back) */
async function readRewards(user) {
  try {
    const resp = await api.get("/api/v1/rewards");
    if (!resp || resp.status === "error") return null;
    const d = resp.data;
    const list = Array.isArray(d) ? d : Array.isArray(d?.rewards) ? d.rewards : Array.isArray(d?.data) ? d.data : Array.isArray(d?.items) ? d.items : null;
    if (!list) return null;
    const me = idOf(user?._id);
    return list.filter((r) => r && (!me || !r.user || idOf(r.user) === me)); // a reward without a user field is taken as the member's own
  } catch (e) {
    return null;
  }
}

let creditChain = Promise.resolve(); // one payment run at a time, so two screens never pay the same profile together
const TAG_RE = /\[profile:([^\]]+)\]/;

/** slugs of the profiles that already have a reward in the database, with the points paid for each (null when the rewards cannot be read) */
export async function readPaidProfiles(user) {
  const mine = await readRewards(user);
  if (!mine) return null;
  const paid = {};
  for (const r of mine) {
    const m = TAG_RE.exec(String(r.remarks || ""));
    if (m) paid[m[1]] = (paid[m[1]] || 0) + (Number(r.points) || 0);
  }
  return paid;
}

/**
 * Pays every item { slug, name, points } that has no reward yet (once per slug, found by the [profile:<slug>] tag in the remarks).
 * Resolves to the number of rewards paid now.
 */
function payOnce(user, items) {
  const run = async () => {
    if (!user?._id || !Array.isArray(items) || !items.length) return 0;
    const mine = await readRewards(user);
    if (!mine) return 0; // cannot check what was paid: pay nothing rather than twice
    const remarks = mine.map((r) => String(r.remarks || ""));
    let paid = 0;
    for (const p of items) {
      if (!p?.slug || remarks.some((t) => t.includes(tagOf(p.slug)))) continue;
      try {
        const resp = await api.put("/api/v1/rewards", {
          user: user._id,
          category: PROFILE_REWARD_CATEGORY,
          points: Number(p.points) || 50,
          remarks: `Profile completed: ${p.name || p.slug} ${tagOf(p.slug)}`,
        });
        if (resp?.status === "error") break;
        paid += 1;
      } catch (e) {
        break;
      }
    }
    return paid;
  };
  creditChain = creditChain.then(run, run);
  return creditChain;
}

/**
 * Pays every completed profile (status >= 100) that has no reward yet. profiles = the list from POST /api/v1/profile.
 * Resolves to the number of profiles paid now.
 */
export function creditProfileRewards(user, profiles) {
  if (!Array.isArray(profiles)) return Promise.resolve(0);
  return payOnce(user, profiles.filter((p) => p?.slug && Number(p.status) >= 100));
}

/** Pays the profile cards completed as a survey ({ slug, name, points } = the survey the member saw, with its points). Once per card. */
export const creditCardRewards = (user, cards) => payOnce(user, cards);

// ---- Quality Score: +1 for every item (a completed profile, a completed survey), once per item ---------------------------------------------
// The items already counted are kept in the database as the answer "quality-credited" (PATCH /api/v1/me/answer), so nothing is counted
// twice (not on another device, not after a reload). The new score is written with PUT /api/v1/me. keys: "basic", "survey:<slug>", ...
let qualityChain = Promise.resolve();
export function creditQualityScore(user, keys, perKey = 1) {
  const run = async () => {
    const want = [...new Set((keys || []).filter(Boolean))];
    if (!user?._id || !want.length) return 0;
    try {
      const me = await api.post("/api/v1/me", { questions: ["quality-credited"] }).then((r) => r?.data);
      if (!me) return 0;
      const counted = [].concat(me["quality-credited"] ?? []).filter(Boolean);
      const add = want.filter((k) => !counted.includes(k));
      if (!add.length) return 0;
      const score = Math.min(200, (Number(me.qualityScore) || 0) + add.length * perKey);
      const saved = await api.put("/api/v1/me", { qualityScore: score });
      if (saved?.status === "error") return 0;
      await api.patch("/api/v1/me/answer", { "quality-credited": [...counted, ...add] });
      return add.length;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };
  qualityChain = qualityChain.then(run, run);
  return qualityChain;
}

/**
 * Same shape as api.get("/api/v1/me/points"), so the screens only swap the call.
 * user = the member (useMember()). Balance = the sum of the member's rewards. If the rewards cannot be read, the points of the
 * completed profiles are counted from the profile list instead (so the balance never stays at 0 for a finished profile).
 */
export async function fetchRewardBalance(user) {
  // the member is not loaded yet: show 0 for now, the screens ask again as soon as the member is there
  if (!user?._id) return { status: "success", message: "", data: { totalPoints: 0, redeemPoints: 0, threshold: 15000, conversionRate: 0.001 } };
  const rewards = await readRewards(user);
  let base = null; // /me/points does not exist on every backend (404): only used for threshold / conversion rate when it answers
  try { base = await api.get("/api/v1/me/points"); } catch (e) { base = null; }
  const baseOk = base && base.status !== "error" && base.data;
  const threshold = Number(baseOk && base.data.threshold) || 15000;
  const conversionRate = Number(baseOk && base.data.conversionRate) || 0.001;
  if (rewards) {
    const totalPoints = rewards.reduce((n, r) => n + (Number(r.points) || 0), 0);
    return { status: "success", message: "", data: { totalPoints, redeemPoints: 0, threshold, conversionRate } };
  }
  try {
    const list = await api.post("/api/v1/profile", { category: profileCategoryOf(user) }).then((r) => r?.data);
    const totalPoints = (Array.isArray(list) ? list : []).filter((p) => Number(p?.status) >= 100).reduce((n, p) => n + (Number(p?.points) || 50), 0);
    if (totalPoints) return { status: "success", message: "", data: { totalPoints, redeemPoints: 0, threshold, conversionRate } };
  } catch (e) { /* fall through */ }
  return base || { status: "error", message: "", data: null };
}
