"use client";
// One place that loads the member's own record for every member page:
//   /api/v1/me/dashboard   profile sections, surveys (available / in progress / history), consent, notifications
//   fetchRewardBalance     reward points, redeem threshold and conversion rate (same call the old pages used)
//   /api/v1/alerts         announcements published by the MHO team
// Nothing here is invented: when a call fails the page shows an honest empty or error state.
import React from "react";
import { api } from "@/util";
import { useMember } from "@/Context";
import { useRewardsTick, fetchRewardBalance } from "@/hooks/useRewardsRefresh";

export const segOf = (category) => {
  const v = String(category || "").toLowerCase();
  if (/health|professional|doctor|clinic/.test(v)) return "hcp";
  if (/care/.test(v)) return "caregiver";
  return "patient";
};

// Wording and motifs of each panel, taken from the supplied panel designs.
export const PANELS = {
  hcp: {
    label: "Healthcare Professionals", short: "HCP panel", icon: "stetho",
    hello: (n) => <>Welcome back, <em>{n}</em></>,
    lead: "Your clinical expertise moves healthcare research forward. Keep your professional profile current so we can match you with the studies that need your specialty.",
    vault: "Your Clinical Genome", vaultSub: "Every profile you complete sequences one gene of your professional genome and makes you eligible for more specialist studies.",
    profilesTitle: "Complete your professional profiles", cta: "Continue my profile",
    palettes: [["#C2185B", "#6A0D2B"], ["#1E88E5", "#0D2F6E"], ["#8E24AA", "#3B0E5C"], ["#F9A825", "#7A4A00"], ["#00897B", "#063F3A"], ["#D81B60", "#5C0A33"], ["#3949AB", "#141B5C"], ["#43A047", "#14451A"], ["#6D4C41", "#2E1A12"], ["#0097A7", "#053A42"], ["#5E35B1", "#20104F"]],
    flavors: ["Vital pulse", "Hospital grid", "Specialty spectrum", "Graduation gold", "Clinical mastery", "Practice map", "Verified credentials", "Digital health", "Voice of medicine", "Rewards & social", "Molecular deep-dive"],
  },
  caregiver: {
    label: "Caregivers", short: "Caregiver panel", icon: "hands",
    hello: (n) => <>Welcome, <em>{n}</em></>,
    lead: "Your care makes a difference. A few warm questions about you and the care you give help us bring you the studies where your experience matters.",
    vault: "Circle of Care", vaultSub: "Every profile and survey you complete adds a glowing bead to your circle. Watch it fill as you share your caregiving story.",
    profilesTitle: "Your About You profiles", cta: "Continue my profile",
    palettes: [["#E8457C", "#9B1E4E"], ["#1C8FB0", "#0E3F5F"], ["#8E4FB8", "#4A1F6A"], ["#2BAE8C", "#0F5A4A"], ["#F2611B", "#9B2E0C"], ["#C9672F", "#6E2F10"], ["#B06AB3", "#5C2A60"], ["#E0A21C", "#7A4E00"], ["#3E7CB1", "#173D66"], ["#D7141F", "#7A0A12"], ["#5C8A3A", "#2C4A18"]],
    flavors: ["Rose ember", "Ocean teal", "Royal plum", "Clinic mint", "Warm hearth", "Copper kettle", "Lavender tea", "Honey gold", "Evening sky", "Ruby care", "Garden fresh"],
  },
  patient: {
    label: "Patients", short: "Patient panel", icon: "heart",
    hello: (n) => <>Welcome, {n}! <span className="g">Let&apos;s build your health story together.</span></>,
    lead: "Short profiles about you and your health help us invite you to studies that truly fit your experience. Answer at your own pace; your answers save as you go.",
    vault: "Health Pulse", vaultSub: "Every profile and survey you complete raises your Quality Score and moves you up the levels, which brings more study invitations.",
    profilesTitle: "Your About You profiles", cta: "Continue my profile",
    palettes: [["#38BDF8", "#0F7EA8"], ["#A78BFA", "#6D28D9"], ["#818CF8", "#4338CA"], ["#2DD4BF", "#0F766E"], ["#F472B6", "#BE185D"], ["#34D399", "#047857"], ["#FBBF24", "#B45309"], ["#60A5FA", "#1D4ED8"], ["#F87171", "#B91C1C"], ["#C084FC", "#7E22CE"], ["#22D3EE", "#0E7490"], ["#FB923C", "#C2410C"]],
    flavors: ["Sky lagoon", "Neon violet", "Lilac scholar", "Graphite teal", "Gift magenta", "Jade wallet", "Amber gold", "Electric blue", "Orchid bloom", "Lab violet", "Clinic mint", "Sunrise energy"],
  },
};

export const NAV = [
  ["Dashboard", "/member/dashboard", "home", "nav-dashboard"],
  ["My Profile", "/member/profiles", "profile", "nav-profiles"],
  ["Surveys", "/member/surveys", "surveys", "nav-surveys"],
  ["Rewards", "/member/rewards", "gift", "nav-rewards"],
  ["Referrals", "/member/referrals", "share", "nav-referrals"],
  ["Notifications", "/member/notifications", "bell", "nav-notifications"],
  ["My Account", "/member/myaccount", "user", "nav-myaccount"],
  ["Help & Support", "/member/support", "help", "nav-support"],
];

const Ctx = React.createContext(null);
const read = (k, fb) => { try { return localStorage.getItem(k) ?? fb; } catch { return fb; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } };

export function MxProvider({ children }) {
  const member = useMember();
  const tick = useRewardsTick();
  const panel = segOf(member?.category);
  const [dash, setDash] = React.useState({ loading: true, data: null, error: false });
  const [balance, setBalance] = React.useState({ points: 0, threshold: 0, rate: 0, ready: false });
  const [alerts, setAlerts] = React.useState({ loading: true, list: [] });
  const [mode, setModeState] = React.useState("light");
  const [n, setN] = React.useState(0);

  React.useEffect(() => { const m = read("mho.member.mode", "light"); setModeState(m === "dark" ? "dark" : "light"); }, []);
  const setMode = React.useCallback((m) => { setModeState(m); write("mho.member.mode", m); }, []);

  React.useEffect(() => {
    if (!member?._id) return undefined;
    let live = true;
    api.get("/api/v1/me/dashboard")
      .then((r) => live && setDash({ loading: false, data: r?.status === "success" ? r.data : null, error: r?.status !== "success" }))
      .catch(() => live && setDash({ loading: false, data: null, error: true }));
    return () => { live = false; };
  }, [member?._id, n, tick]);

  React.useEffect(() => {
    if (!member?._id) return undefined;
    let live = true;
    fetchRewardBalance(member)
      .then((r) => { if (live && r?.data) setBalance({ points: Number(r.data.totalPoints) || 0, threshold: Number(r.data.threshold) || 0, rate: Number(r.data.conversionRate) || 0, ready: true }); })
      .catch(() => live && setBalance((b) => ({ ...b, ready: true })));
    return () => { live = false; };
  }, [member?._id, tick, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!member?._id) return undefined;
    let live = true;
    api.get("/api/v1/alerts")
      .then((r) => live && setAlerts({ loading: false, list: Array.isArray(r?.data) ? r.data : [] }))
      .catch(() => live && setAlerts({ loading: false, list: [] }));
    return () => { live = false; };
  }, [member?._id, n]);

  const reload = React.useCallback(() => setN((x) => x + 1), []);
  const value = React.useMemo(() => {
    const d = dash.data;
    const notes = [
      ...((d?.notifications || []).map((x, i) => ({ id: `d${i}`, kind: x.kind, level: x.level, text: x.text, at: x.at, action: x.action, section: x.section }))),
      ...alerts.list.map((a, i) => ({ id: `a${a._id || i}`, kind: "announcement", level: "info", text: a.title || a.subject || a.message || a.text || "Announcement", body: a.description || a.content || a.message, at: a.createdAt, link: a.link || a.url })),
    ];
    return { member, panel, P: PANELS[panel], dash, d, balance, alerts, notes, reload, mode, setMode };
  }, [member, panel, dash, balance, alerts, reload, mode, setMode]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useMx = () => React.useContext(Ctx);

/** Where a dashboard notification leads. */
export const noteHref = (n) => n.link || (n.action === "surveys" ? "/member/surveys" : n.action === "profile" ? `/member/profiles${n.section ? `?open=${encodeURIComponent(n.section)}` : ""}` : n.action === "consent" ? "/member/myaccount?tab=privacy" : null);

export const fullName = (m) => [m?.name?.first, m?.name?.last].filter(Boolean).join(" ") || m?.fullName || "";
export const firstName = (m, d) => m?.name?.first || d?.member?.firstName || m?.firstname || "";
export const initials = (m) => `${m?.name?.first?.[0] || ""}${m?.name?.last?.[0] || ""}`.toUpperCase() || "M";
export const memberId = (m, d) => d?.member?.memberId || m?.respondentID || String(m?._id || "").slice(-8).toUpperCase();

/**
 * Account answers that GET /api/v1/me does not return (payment details, social accounts and similar), read with
 * POST /api/v1/me {questions}. Returns [answers, refresh, ready]; refresh() reads them again after a save.
 */
export function useAnswers(keys) {
  const k = keys.join("|");
  const [state, setState] = React.useState({ ready: false, data: {} });
  const refresh = React.useCallback(async () => {
    try {
      const r = await api.post("/api/v1/me", { questions: k.split("|") });
      const data = r?.data && typeof r.data === "object" ? Object.fromEntries(k.split("|").map((q) => [q, r.data[q]])) : {};
      setState({ ready: true, data });
      return data;
    } catch (e) { setState((s) => ({ ...s, ready: true })); return null; }
  }, [k]);
  React.useEffect(() => { refresh(); }, [refresh]);
  return [state.data, refresh, state.ready];
}
