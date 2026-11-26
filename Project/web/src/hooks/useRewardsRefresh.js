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

// ---- Points live in the server's Reward ledger (backend app/lib/points.js) ---------------------------------------------------------------
// The server credits every completed survey, every profile section it counts as complete (50 points unless the admin set others) and
// every verified referral, once each. The browser never sends an amount: it asks the server to sync, then reads the balance.
//   GET  /api/v1/me/points       sync + { totalPoints, approvedPoints, pendingPoints, redeemPoints, bySource, threshold, conversionRate, history }
//   POST /api/v1/me/points/sync  sync now (after a profile or survey was finished) and answer the same, plus { added }
// The section packages also remember which of THEIR profile cards were already celebrated, kept as the answer "profile-rewarded"
// (a list of "<card id>=<points>", answers are lists of text), so a finished card does not celebrate twice (not on another device, not
// after a reload).
const REWARDED_KEY = "profile-rewarded";
export const profileCategoryOf = (user) => user?.category || "b2c";

const asMap = (v) =>
  Object.fromEntries([].concat(v ?? []).filter(Boolean).map((x) => {
    const [k, n] = String(x).split("=");
    return [k, Number(n) || 50];
  }));
const asList = (map) => Object.entries(map).map(([k, n]) => `${k}=${Number(n) || 50}`);

/** The package card ids that were already rewarded, with their points ({} when none; null when the account cannot be read). */
export async function readPaidProfiles(user) {
  if (!user?._id) return null;
  try {
    const me = await api.post("/api/v1/me", { questions: [REWARDED_KEY] }).then((r) => r?.data);
    return me ? asMap(me[REWARDED_KEY]) : null;
  } catch (e) {
    return null;
  }
}

let syncChain = Promise.resolve(); // one sync at a time
/** Ask the server to credit everything earned so far. Resolves to the points answer (data of GET /api/v1/me/points) or null. */
export function syncRewards(user) {
  const run = async () => {
    if (!user?._id) return null;
    try {
      const r = await api.post("/api/v1/me/points/sync", {});
      return r && r.status !== "error" ? r.data : null;
    } catch (e) {
      return null;
    }
  };
  syncChain = syncChain.then(run, run);
  return syncChain;
}

/**
 * A section package finished profile cards ({ slug, name, points } each). The server checks the answers and credits the profile;
 * the cards are remembered as celebrated. Resolves to the number of new credits.
 */
export async function creditCardRewards(user, cards) {
  if (!user?._id || !Array.isArray(cards) || !cards.length) return 0;
  const synced = await syncRewards(user);
  try {
    const paid = (await readPaidProfiles(user)) || {};
    const fresh = cards.filter((c) => c?.slug && !(c.slug in paid));
    if (fresh.length) await api.patch("/api/v1/me/answer", { [REWARDED_KEY]: asList({ ...paid, ...Object.fromEntries(fresh.map((c) => [c.slug, Number(c.points) || 50])) }) });
  } catch (e) {
    console.log(e);
  }
  return Number(synced?.added) || 0;
}

/** Older callers: a list of profiles from POST /api/v1/profile. The server decides what is complete. */
export async function creditProfileRewards(user) {
  const synced = await syncRewards(user);
  return Number(synced?.added) || 0;
}

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
 * The member's points: GET /api/v1/me/points (the server syncs its ledger first). user = the member (useMember()).
 * Answers { status, data: { totalPoints, approvedPoints, pendingPoints, redeemPoints, bySource, threshold, conversionRate, history } }.
 */
export async function fetchRewardBalance(user) {
  // the member is not loaded yet: show 0 for now, the screens ask again as soon as the member is there
  if (!user?._id) return { status: "success", message: "", data: { totalPoints: 0, redeemPoints: 0, pendingPoints: 0, threshold: 0, conversionRate: 0, history: [] } };
  const r = await api.get("/api/v1/me/points");
  if (!r || r.status === "error" || !r.data) return { status: "error", message: r?.message || "", data: null };
  return r;
}
