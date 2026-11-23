// Reward history rows, ported from the previous Rewards page (same sources and rules), plus the profile rewards that
// the balance is made of (/api/v1/rewards, category "profile"), which the previous table did not list.
//   surveys   POST /api/v1/response {status: {$nin: ["invited"]}, dateRange}: points only when status is "complete"
//   socials   GET  /api/v1/follow-social/verify: only the member's own, only once an admin approved or rewarded it (50 pts)
//   referrals GET  /api/v1/me/referrals: only friends whose email is verified (100 pts). The previous page used
//             POST /api/v1/user, which is admin only: for a member it answered 401 and signed them out.
//   profiles  GET  /api/v1/rewards: rows the API paid for completed profiles
import { api } from "@/util";

export const SOCIAL_POINTS = 50;
export const REFERRAL_POINTS = 100;
const SOCIAL_APPROVED_STATUS = ["approved", "rewarded"];

export const asTime = (v) => {
  if (!v) return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
};
export const inRange = (date, dateRange) => {
  if (!Array.isArray(dateRange) || dateRange.length !== 2 || !dateRange[0] || !dateRange[1]) return true;
  const t = asTime(date);
  if (t === null) return true;
  const from = new Date(`${dateRange[0]}T00:00:00`).getTime();
  const to = new Date(`${dateRange[1]}T23:59:59.999`).getTime();
  return t >= from && t <= to;
};
const socialAction = (platform = "") => ({ facebook: "like", youtube: "subscription" })[String(platform).toLowerCase()] ?? "follow";
const tagName = (remarks) => (/\[profile:([^\]]+)\]/.exec(String(remarks || "")) || [])[1];

export function buildRewardRows({ responses = [], socials = [], referred = [], profiles = [], dateRange = [] }) {
  const rows = [];
  responses.forEach((r, i) => {
    const start = asTime(r?.timeline?.start);
    const end = asTime(r?.updatedAt);
    rows.push({
      id: `survey-${r?._id ?? i}`, type: "Survey", source: r?.source, slug: r?.survey?.slug,
      activity: r?.survey?.name ?? "Survey", date: r?.timeline?.start ?? r?.createdAt ?? null,
      loiMs: start !== null && end !== null && end >= start ? end - start : null,
      status: r?.status, points: r?.status === "complete" ? Number(r?.points) || 0 : 0,
    });
  });
  socials.forEach((s, i) => {
    if (!SOCIAL_APPROVED_STATUS.includes(String(s?.status).toLowerCase())) return;
    const date = s?.rewardedAt ?? s?.verifiedAt ?? s?.updatedAt ?? s?.createdAt ?? null;
    if (!inRange(date, dateRange)) return;
    const platform = s?.platform ?? s?.name ?? "social";
    rows.push({ id: `social-${s?._id ?? platform ?? i}`, type: "Social", activity: `${platform} ${socialAction(platform)} (verified by admin)`, date, loiMs: null, status: "approved", points: SOCIAL_POINTS });
  });
  referred.forEach((u, i) => {
    if (!u?.verified) return;
    if (!inRange(u?.joinedAt, dateRange)) return;
    rows.push({ id: `referral-${i}-${u?.joinedAt}`, type: "Referral", activity: `${u?.name || u?.email || "A friend"} joined via your referral`, date: u?.joinedAt ?? null, loiMs: null, status: "approved", points: REFERRAL_POINTS });
  });
  profiles.forEach((p, i) => {
    if (!inRange(p?.createdAt, dateRange)) return;
    const name = tagName(p?.remarks);
    rows.push({ id: `profile-${p?._id ?? i}`, type: "Profile", activity: name ? `Completed profile: ${name.replace(/-/g, " ")}` : p?.remarks || "Profile reward", date: p?.createdAt ?? null, loiMs: null, status: "credited", points: Number(p?.points) || 0 });
  });
  return rows.sort((a, b) => (asTime(b.date) ?? 0) - (asTime(a.date) ?? 0));
}

export async function loadRewardRows(userId, dateRange) {
  const filters = { status: { $nin: ["invited"] }, ...(dateRange?.length === 2 && dateRange[0] && dateRange[1] ? { dateRange } : {}) };
  const results = await Promise.allSettled([
    api.post("/api/v1/response", filters),
    api.get("/api/v1/follow-social/verify"),
    api.get("/api/v1/me/referrals"),
    api.get("/api/v1/rewards"),
  ]);
  const list = (i) => {
    if (results[i].status !== "fulfilled") return [];
    const d = results[i].value?.data;
    return Array.isArray(d) ? d : Array.isArray(d?.rewards) ? d.rewards : [];
  };
  const failed = results.slice(0, 1).every((r) => r.status !== "fulfilled" || r.value?.status === "error");
  const myId = String(userId);
  const socials = list(1).filter((s) => String(s?.created?.By?._id ?? s?.created?.By) === myId);
  const profiles = list(3).filter((r) => String(r?.category || "").toLowerCase() === "profile" && (!r.user || String(r.user?._id ?? r.user) === myId));
  return { rows: buildRewardRows({ responses: list(0), socials, referred: list(2), profiles, dateRange }), failed };
}

export const fmtLoi = (ms) => {
  if (ms === null || ms === undefined) return "—";
  const m = Math.round(ms / 60000);
  return m < 1 ? "< 1 min" : `${m} min`;
};
