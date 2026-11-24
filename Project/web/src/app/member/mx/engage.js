// Engagement figures for the dashboard and header: activity streak, activity calendar, levels, badges and quests.
// Everything is worked out from the member's own records (rewards history, dashboard, balance, referrals). Nothing is
// stored, and nothing here changes how points are earned: levels and badges only show progress.
const DAY = 864e5;
const t0 = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x.getTime(); };
/** Monday of the week of a date, as a timestamp. */
export const weekOf = (d) => { const x = new Date(t0(d)); const wd = (x.getDay() + 6) % 7; return x.getTime() - wd * DAY; };

/** Dates of the member's activity: every reward-history row with a date (survey taken, profile credited, friend joined, social follow). */
const datesOf = (rows = []) => rows.map((r) => (r.date ? new Date(r.date) : null)).filter((d) => d && !Number.isNaN(d.getTime()));

/**
 * Weekly streak: how many weeks in a row, up to this week, had at least one activity. A week without activity yet
 * does not break the streak until it is over, so this week counts as "keep it going".
 */
export function streakOf(rows = [], now = Date.now()) {
  const dates = datesOf(rows);
  const weeks = new Set(dates.map((d) => weekOf(d)));
  const thisWeek = weekOf(now);
  const activeNow = weeks.has(thisWeek);
  let w = activeNow ? thisWeek : thisWeek - 7 * DAY;
  let current = 0;
  while (weeks.has(w)) { current += 1; w -= 7 * DAY; }
  // best run ever
  const sorted = [...weeks].sort((a, b) => a - b);
  let best = 0; let run = 0; let prev = null;
  for (const x of sorted) { run = prev !== null && Math.round((x - prev) / (7 * DAY)) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = x; }
  // this week, Monday to Sunday
  const days = Array.from({ length: 7 }, (_, i) => {
    const start = thisWeek + i * DAY;
    return { start, count: dates.filter((d) => d.getTime() >= start && d.getTime() < start + DAY).length, today: start === t0(now), future: start > t0(now) };
  });
  return { current, best, activeNow, week: days, total: dates.length };
}

/** Activity calendar: the last `weeks` weeks, Monday to Sunday, with the number of activities on each day. */
export function calendarOf(rows = [], weeks = 16, now = Date.now()) {
  const dates = datesOf(rows).map((d) => t0(d));
  const counts = new Map();
  for (const d of dates) counts.set(d, (counts.get(d) || 0) + 1);
  const start = weekOf(now) - (weeks - 1) * 7 * DAY;
  return Array.from({ length: weeks }, (_, w) => Array.from({ length: 7 }, (_, i) => {
    const day = start + (w * 7 + i) * DAY;
    return { day, count: counts.get(day) || 0, future: day > t0(now) };
  }));
}

/** This month's figures from the rewards history. */
export function monthOf(rows = [], now = Date.now()) {
  const m = new Date(now); const from = new Date(m.getFullYear(), m.getMonth(), 1).getTime();
  const mine = rows.filter((r) => r.date && new Date(r.date).getTime() >= from);
  return {
    activities: mine.length,
    points: mine.reduce((a, r) => a + (Number(r.points) || 0), 0),
    surveys: mine.filter((r) => r.type === "Survey").length,
    completed: mine.filter((r) => r.type === "Survey" && r.status === "complete").length,
  };
}

// Levels: bands of points earned so far. Each panel names them in its own words.
const BANDS = [0, 250, 750, 1500, 3000, 6000, 10000, 15000];
const LEVEL_NAMES = {
  hcp: ["Intern", "Resident", "Registrar", "Specialist", "Consultant", "Senior Consultant", "Professor", "Luminary"],
  caregiver: ["Helper", "Supporter", "Companion", "Guardian", "Anchor", "Pillar of Care", "Heart of Care", "Care Legend"],
  patient: ["Starter", "Explorer", "Contributor", "Advocate", "Champion", "Voice of Health", "Pioneer", "Legend"],
};
export function levelOf(panel, earned = 0) {
  const names = LEVEL_NAMES[panel] || LEVEL_NAMES.patient;
  let i = 0;
  while (i + 1 < BANDS.length && earned >= BANDS[i + 1]) i += 1;
  const from = BANDS[i]; const to = BANDS[i + 1] ?? null;
  return { n: i + 1, name: names[i], next: to !== null ? names[i + 1] : null, from, to, p: to ? (earned - from) / (to - from) : 1, left: to ? to - earned : 0, all: names.map((nm, k) => ({ name: nm, at: BANDS[k] })) };
}
/** Points earned so far, from the rewards history (falls back to the balance when the history is empty). */
export const earnedOf = (rows = [], balance = 0) => Math.max(balance, rows.reduce((a, r) => a + (Number(r.points) || 0), 0));

const BADGE_WORDS = {
  hcp: { firstProfile: "First gene", allProfiles: "Full genome", firstSurvey: "First study", fiveSurveys: "Five studies", tenSurveys: "Research regular" },
  caregiver: { firstProfile: "First bead", allProfiles: "Circle complete", firstSurvey: "First story shared", fiveSurveys: "Five stories", tenSurveys: "Trusted voice" },
  patient: { firstProfile: "First pulse", allProfiles: "Full health story", firstSurvey: "First survey", fiveSurveys: "Five surveys", tenSurveys: "Survey regular" },
};
/** Badges, each earned from a real figure. `p` is progress toward it (0 to 1). */
export function badgesOf({ panel, d, balance, rows = [], joined = 0, streak }) {
  const W = BADGE_WORDS[panel] || BADGE_WORDS.patient;
  const secs = d?.profile?.sections || [];
  const doneP = secs.filter((s) => s.status === "complete").length;
  const c = d?.surveys?.counts || {};
  const doneS = c.completed || 0;
  const tookPart = (c.completed || 0) + (c.inProgress || 0) + (c.notQualified || 0);
  const socials = rows.filter((r) => r.type === "Social").length;
  const t = balance?.threshold || 0;
  const pts = balance?.points || 0;
  const q = (cur, goal) => ({ cur: Math.min(cur, goal), goal, p: goal ? Math.min(1, cur / goal) : 0 });
  const list = [
    { id: "p1", name: W.firstProfile, icon: "profile", tone: "violet", ...q(doneP, 1), how: "Complete one profile" },
    { id: "p50", name: "Halfway there", icon: "target", tone: "teal", ...q(doneP, Math.max(1, Math.ceil(secs.length / 2))), how: "Complete half of your profiles" },
    { id: "pAll", name: W.allProfiles, icon: "crown", tone: "gold", ...q(doneP, Math.max(1, secs.length)), how: "Complete every profile" },
    { id: "s1", name: W.firstSurvey, icon: "surveys", tone: "coral", ...q(doneS, 1), how: "Complete a survey" },
    { id: "s5", name: W.fiveSurveys, icon: "star", tone: "amber", ...q(doneS, 5), how: "Complete 5 surveys" },
    { id: "s10", name: W.tenSurveys, icon: "trophy", tone: "gold", ...q(doneS, 10), how: "Complete 10 surveys" },
    { id: "tp3", name: "Curious mind", icon: "rocket", tone: "sky", ...q(tookPart, 3), how: "Take part in 3 surveys" },
    { id: "f1", name: "Good company", icon: "share", tone: "pink", ...q(joined, 1), how: "A friend joins with your link" },
    { id: "so1", name: "Social star", icon: "megaphone", tone: "violet", ...q(socials, 1), how: "Follow MHO and get it approved" },
    { id: "st3", name: "On a roll", icon: "flame", tone: "coral", ...q(streak?.best || 0, 3), how: "Be active 3 weeks in a row" },
    { id: "k1", name: "1,000 points", icon: "coin", tone: "amber", ...q(pts, 1000), how: "Reach 1,000 points" },
    { id: "pay", name: "Payout ready", icon: "gift", tone: "teal", ...q(pts, t || 1), how: t ? `Reach ${t.toLocaleString()} points` : "Reach the payout level" },
  ];
  return list.map((b) => ({ ...b, got: b.p >= 1 && (b.id !== "pay" || t > 0) }));
}
