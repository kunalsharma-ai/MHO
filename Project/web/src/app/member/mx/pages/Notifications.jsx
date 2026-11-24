"use client";
// Notifications: only real events. They come from the member's own record (/api/v1/me/dashboard: available surveys,
// the next profile to finish, consent status) and from announcements the MHO team publishes (/api/v1/alerts).
import React from "react";
import Link from "next/link";
import { useMx, noteHref } from "../data";
import { PageHead } from "../parts";
import { Icon, Empty, fmtDate } from "../kit";
import { sectionArt, pageArt } from "../art";

const GROUPS = [
  ["action", "Needs your attention", "warn"],
  ["info", "Updates", "info"],
  ["done", "Done", "ok"],
];
const iconOf = { surveys: "surveys", profile: "profile", consent: "shield", "consent-ok": "shield", announcement: "bell" };

export default function Notifications() {
  const { notes, dash, alerts, panel, reload } = useMx();
  const loading = dash.loading || alerts.loading;
  const groupOf = (n) => (n.level === "action" || n.level === "warning" ? "action" : n.level === "done" ? "done" : "info");
  return (
    <>
      <PageHead icon="bell" title="Notifications" art={pageArt(panel, "notifications")}
        lead="Updates about your surveys, profile and consent, and announcements from the My Health Opinions team."
        facts={loading ? [] : [["Need attention", notes.filter((n) => groupOf(n) === "action").length], ["Total", notes.length]]}>
        <div className="mx-row" style={{ marginTop: 16 }}>
          <button type="button" className="mx-btn sm ghost" onClick={reload}><Icon name="spark" size={16} />Check for updates</button>
          <Link className="mx-btn sm ghost" href="/member/myaccount?tab=notifications"><Icon name="settings" size={16} />How we contact you</Link>
        </div>
      </PageHead>
      {loading ? <div className="mx-card"><div className="mx-skel" style={{ minHeight: 200 }} /></div> : notes.length === 0 ? (
        <div className="mx-card"><Empty icon="bell" title="You are all caught up">When a survey opens for you, a profile needs finishing or our terms change, it will show here.</Empty></div>
      ) : GROUPS.map(([g, title, tone]) => {
        const list = notes.filter((n) => groupOf(n) === g);
        if (!list.length) return null;
        return (
          <section key={g} className="mx-card" aria-labelledby={`mx-n-${g}`}>
            <div className="mx-sec-h"><h2 id={`mx-n-${g}`}>{title}</h2><span className={`mx-chip ${tone}`}>{list.length}</span></div>
            <ul className="mx-list">
              {list.map((n, i) => {
                const href = noteHref(n);
                const ext = href && /^https?:/.test(href);
                return (
                  <li key={n.id} className="mx-item" style={{ "--i": i }}>
                    <span className={`ic ${tone}`}><Icon name={iconOf[n.kind] || "bell"} size={18} /></span>
                    <span className="tx"><b>{n.text}</b>{n.body && n.body !== n.text && <span>{String(n.body).replace(/<[^>]+>/g, " ").slice(0, 220)}</span>}{n.at && <span>{fmtDate(n.at)}</span>}</span>
                    {href ? (ext ? <a className="mx-btn sm" href={href} target="_blank" rel="noopener noreferrer">Open</a> : <Link className="mx-btn sm" href={href}>{g === "action" ? "Do it now" : "Open"}</Link>) : <span />}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
