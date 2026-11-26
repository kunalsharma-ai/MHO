// Reward history rows. The balance is the server's Reward ledger (GET /api/v1/me/points, backend lib/points.js), so the
// rows that carry points come from that same ledger and always add up to the balance in the header:
//   surveys   POST /api/v1/response {status: {$nin: ["invited"]}, dateRange}: every attempt with its length; a completed
//             one shows the points of its ledger credit and whether an admin approved it yet
//   profiles  ledger rows the server credited for completed profile sections
//   referrals ledger rows for friends who joined with the member's link and verified their email
//   payouts   ledger rows paid out (negative)
//   socials   GET  /api/v1/follow-social/verify: only the member's own, once an admin approved or rewarded it (50 pts)
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
const LEDGER_TYPE = { profile: "Profile", referral: "Referral", payout: "Payout", other: "Reward" };

export function buildRewardRows({ responses = [], socials = [], ledger = [], dateRange = [] }) {
  const rows = [];
  const credit = Object.fromEntries(ledger.filter((l) => l.kind === "survey" && l.reference).map((l) => [String(l.reference), l]));
  responses.forEach((r, i) => {
    const start = asTime(r?.timeline?.start);
    const end = asTime(r?.updatedAt);
    const c = credit[String(r?._id)];
    const done = r?.status === "complete";
    rows.push({
      id: `survey-${r?._id ?? i}`, type: "Survey", source: r?.source, slug: r?.survey?.slug,
      activity: r?.survey?.name ?? "Survey", date: r?.timeline?.start ?? r?.createdAt ?? null,
      loiMs: start !== null && end !== null && end >= start ? end - start : null,
      status: r?.status,
      // a completed survey's credit: "pending" until the research team approves it, then "approved" (or "rejected")
      approval: done ? (c?.status === "Approved" ? "approved" : c?.status === "Rejected" ? "rejected" : "pending") : null,
      points: done ? (c ? (c.status === "Rejected" ? 0 : c.points) : Number(r?.points) || 0) : 0,
    });
  });
  socials.forEach((s, i) => {
    if (!SOCIAL_APPROVED_STATUS.includes(String(s?.status).toLowerCase())) return;
    const date = s?.rewardedAt ?? s?.verifiedAt ?? s?.updatedAt ?? s?.createdAt ?? null;
    if (!inRange(date, dateRange)) return;
    const platform = s?.platform ?? s?.name ?? "social";
    rows.push({ id: `social-${s?._id ?? platform ?? i}`, type: "Social", activity: `${platform} ${socialAction(platform)} (verified by admin)`, date, loiMs: null, status: "approved", points: SOCIAL_POINTS });
  });
  ledger.forEach((l, i) => {
    if (l.kind === "survey" || !inRange(l.createdAt, dateRange)) return;
    rows.push({
      id: `${l.kind}-${l._id ?? i}`, type: LEDGER_TYPE[l.kind] || "Reward", activity: l.activity || "Reward", date: l.createdAt ?? null, loiMs: null,
      status: l.status === "Approved" ? (l.points < 0 ? "paid" : "credited") : String(l.status || "").toLowerCase(), points: l.status === "Rejected" ? 0 : l.points,
    });
  });
  return rows.sort((a, b) => (asTime(b.date) ?? 0) - (asTime(a.date) ?? 0));
}

/** ledger = the history of GET /api/v1/me/points when the caller already has it (the member area does), else it is read here */
export async function loadRewardRows(userId, dateRange, ledger) {
  const filters = { status: { $nin: ["invited"] }, ...(dateRange?.length === 2 && dateRange[0] && dateRange[1] ? { dateRange } : {}) };
  const results = await Promise.allSettled([
    api.post("/api/v1/response", filters),
    api.get("/api/v1/follow-social/verify"),
    Array.isArray(ledger) ? Promise.resolve({ data: { history: ledger } }) : api.get("/api/v1/me/points"),
  ]);
  const list = (i) => {
    if (results[i].status !== "fulfilled") return [];
    const d = results[i].value?.data;
    return Array.isArray(d) ? d : Array.isArray(d?.rewards) ? d.rewards : [];
  };
  const failed = results.slice(0, 1).every((r) => r.status !== "fulfilled" || r.value?.status === "error");
  const myId = String(userId);
  const socials = list(1).filter((s) => String(s?.created?.By?._id ?? s?.created?.By) === myId);
  const history = results[2].status === "fulfilled" ? results[2].value?.data?.history : null;
  return { rows: buildRewardRows({ responses: list(0), socials, ledger: Array.isArray(history) ? history : [], dateRange }), failed };
}

export const fmtLoi = (ms) => {
  if (ms === null || ms === undefined) return "—";
  const m = Math.round(ms / 60000);
  return m < 1 ? "< 1 min" : `${m} min`;
};
