// Messages: one inbox for everything the member receives.
//   notifications   /api/v1/me/dashboard notifications (profile, consent, survey reminders)
//   new surveys     surveys open to the member (/api/v1/me/dashboard surveys.available), newest launch first
//   notices         announcements the MHO team publishes (/api/v1/alerts)
//   tickets         the member's support tickets and their status (/api/v1/support), replies in the conversation
// Read / unread is remembered in this browser, the same way the header bell remembers what was seen.
import React from "react";
import { noteHref } from "./data";

const SEEN = "mho.member.seenMsgs";
const readSeen = () => { try { return new Set(JSON.parse(localStorage.getItem(SEEN) || "[]")); } catch { return new Set(); } };
const writeSeen = (set) => { try { localStorage.setItem(SEEN, JSON.stringify([...set].slice(-400))); } catch { /* storage blocked */ } };

const at = (v) => { const t = v ? new Date(v).getTime() : NaN; return Number.isNaN(t) ? 0 : t; };
const TICKET_STATE = { new: "Received", open: "Open", "in-progress": "In progress", inprogress: "In progress", pending: "Waiting for you", resolved: "Resolved", closed: "Closed" };
export const ticketState = (s) => TICKET_STATE[String(s || "new").toLowerCase()] || String(s || "Received").replace(/^\w/, (c) => c.toUpperCase());

/** Every message for the member, newest first. */
export function buildInbox({ d, notes = [], tickets = [] }) {
  const list = [];
  for (const n of notes) {
    if (n.kind === "announcement") {
      list.push({ key: `a|${n.id}|${n.at || ""}`, kind: "notice", title: n.text, body: n.body || "", at: at(n.at), href: n.link || null, level: "info" });
    } else {
      list.push({ key: `n|${n.kind || ""}|${n.text}|${n.at || ""}`, kind: "notification", title: n.text, body: "", at: at(n.at), href: noteHref(n), level: n.level || "info" });
    }
  }
  for (const s of d?.surveys?.available || []) {
    list.push({
      key: `s|${s.slug}`, kind: "survey", title: `New survey for you: ${s.name}`,
      body: [s.points ? `${Number(s.points).toLocaleString()} points` : "", s.minutes ? `about ${s.minutes} min` : "", s.summary || ""].filter(Boolean).join(" · "),
      at: at(s.launchedAt), href: `/survey?name=${encodeURIComponent(s.slug)}`, level: "action", survey: s,
    });
  }
  for (const t of tickets) {
    const last = (t.updateTimeline || []).map((u) => at(u.updatedAt)).reduce((a, b) => Math.max(a, b), 0);
    const when = Math.max(at(t.updatedAt), at(t.createdAt), last);
    list.push({ key: `t|${t._id}|${t.status || ""}|${when}`, kind: "ticket", title: `${t.ticketNo ? `Ticket ${t.ticketNo}: ` : ""}${t.subject || "Support ticket"}`, body: ticketState(t.status), at: when, href: null, level: /resolved|closed/i.test(t.status || "") ? "done" : "info", ticket: t });
  }
  return list.sort((a, b) => b.at - a.at);
}

/** Read state of messages in this browser: [seen set, markRead(keys), markAllRead()]. */
export function useSeen() {
  const [seen, setSeen] = React.useState(() => new Set());
  React.useEffect(() => {
    setSeen(readSeen());
    const on = (e) => { if (!e.key || e.key === SEEN) setSeen(readSeen()); };
    window.addEventListener("storage", on);
    window.addEventListener("mx-seen", on);
    return () => { window.removeEventListener("storage", on); window.removeEventListener("mx-seen", on); };
  }, []);
  const mark = React.useCallback((keys) => {
    const all = readSeen(); let changed = false;
    for (const k of [].concat(keys)) if (!all.has(k)) { all.add(k); changed = true; }
    if (changed) { writeSeen(all); setSeen(new Set(all)); window.dispatchEvent(new Event("mx-seen")); }
  }, []);
  const unmark = React.useCallback((key) => {
    const all = readSeen(); if (!all.delete(key)) return;
    writeSeen(all); setSeen(new Set(all)); window.dispatchEvent(new Event("mx-seen"));
  }, []);
  return [seen, mark, unmark];
}
