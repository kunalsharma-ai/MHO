"use client";
// Messages: one inbox for notifications, new surveys, notices from the MHO team and support tickets (with their
// replies). Sources are listed in ../messages.js. Replying to a ticket uses the same call as the ticket page
// (PUT /api/v1/support/:id/reply) and only shows as sent once the server confirms it.
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import { useMx, initials } from "../data";
import { Icon, Empty, useToast, apiOk, apiMessage, fmtDate } from "../kit";
import { PageHead } from "../parts";
import { buildInbox, useSeen, ticketState } from "../messages";

const KINDS = {
  survey: ["New survey", "surveys", "k-survey"],
  notice: ["Notice", "megaphone", "k-notice"],
  ticket: ["Support ticket", "ticket", "k-ticket"],
  notification: ["Notification", "bell", "k-note"],
};
const FILTERS = [["all", "All", "inbox"], ["unread", "Unread", "spark"], ["survey", "New surveys", "surveys"], ["notice", "Notices", "megaphone"], ["ticket", "Tickets", "ticket"], ["notification", "Account", "bell"]];

const when = (t) => {
  if (!t) return "";
  const d = Date.now() - t;
  if (d < 6e4) return "just now";
  if (d < 36e5) return `${Math.round(d / 6e4)} min ago`;
  if (d < 864e5) return `${Math.round(d / 36e5)} h ago`;
  if (d < 7 * 864e5) return `${Math.round(d / 864e5)} d ago`;
  return fmtDate(t);
};

function Thread({ msg }) {
  const { member, reload } = useMx();
  const push = useToast();
  const t = msg.ticket;
  const [replies, setReplies] = React.useState(null);
  const [text, setText] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const load = React.useCallback(async () => {
    try {
      const r = await api.get(`/api/v1/support/${t._id}/reply`);
      setReplies(Array.isArray(r?.data) ? [...r.data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : []);
    } catch (e) { setReplies([]); }
  }, [t._id]);
  React.useEffect(() => { setReplies(null); load(); }, [load]);
  const mine = (r) => {
    const by = r?.created?.By;
    if (by && typeof by === "object" && by._id && member?._id) return String(by._id) === String(member._id);
    const nm = (by && by.fullName) || "";
    return nm && nm === (member?.fullName || [member?.name?.first, member?.name?.last].filter(Boolean).join(" "));
  };
  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    try {
      // the ticket keeps its status: a member reply never closes or reopens it
      const r = await api.put(`/api/v1/support/${t._id}/reply`, { message: text.trim(), attachments: [], status: t.status });
      if (!apiOk(r)) throw new Error(apiMessage(r, "Your reply could not be sent."));
      setText("");
      await load();
      reload();
      push("Reply sent to the support team.");
    } catch (err) { push(err.message || "Your reply could not be sent. Please try again.", "bad"); }
    setBusy(false);
  };
  const closed = /resolved|closed/i.test(t.status || "");
  return (
    <div className="mx-thread">
      <div className="mx-tstate">
        {["Received", "In progress", "Resolved"].map((s, i) => {
          const cur = closed ? 2 : /progress|open|pending/i.test(t.status || "") ? 1 : 0;
          return <span key={s} className={i <= cur ? "on" : ""}><i>{i < cur || closed ? <Icon name="check" size={12} stroke={3} /> : i + 1}</i>{s}</span>;
        })}
      </div>
      <ol className="mx-bubbles">
        <li className="me"><span className="who">{initials(member)}</span><div><b>You</b><small>{fmtDate(t.createdAt)}</small><p>{t.description}</p></div></li>
        {replies === null ? <li className="mx-skel" style={{ minHeight: 60 }} /> : replies.map((r, i) => (
          <li key={r._id || i} className={mine(r) ? "me" : "team"} style={{ "--i": i }}>
            <span className="who">{mine(r) ? initials(member) : <Icon name="help" size={16} />}</span>
            <div><b>{mine(r) ? "You" : r?.created?.By?.fullName || "MHO Support"}</b><small>{fmtDate(r.createdAt)}</small><p>{r.message}</p></div>
          </li>
        ))}
        {replies && !replies.length && <li className="note"><Icon name="clock" size={15} />Our team will answer here. You also get an email when they reply.</li>}
      </ol>
      <form className="mx-compose" onSubmit={send}>
        <label className="sr" htmlFor={`mx-reply-${t._id}`}>Your reply</label>
        <textarea id={`mx-reply-${t._id}`} className="mx-input" rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={closed ? "This ticket is resolved. Write here if you still need help." : "Write a reply…"} maxLength={4000} />
        <button type="submit" className="mx-btn" disabled={busy || !text.trim()}><Icon name="send" size={16} />{busy ? "Sending…" : "Send"}</button>
      </form>
      <p className="mx-muted small">Please do not share medical details in a ticket. Describe the problem and our team will ask for anything else they need.</p>
    </div>
  );
}

function Reader({ msg, onBack }) {
  if (!msg) return <div className="mx-reader empty"><Empty icon="inbox" title="Pick a message">Notifications, new surveys, notices and your support tickets all arrive here.</Empty></div>;
  const [label, icon, cls] = KINDS[msg.kind];
  const s = msg.survey;
  return (
    <article className={`mx-reader ${cls}`} aria-labelledby="mx-msg-h">
      <button type="button" className="mx-btn sm ghost mx-back" onClick={onBack}><Icon name="arrow" size={14} style={{ transform: "scaleX(-1)" }} />All messages</button>
      <header>
        <span className="kic"><Icon name={icon} size={22} /></span>
        <div><span className="mx-eyebrow">{label}</span><h2 id="mx-msg-h">{msg.title}</h2><small className="mx-muted">{msg.at ? `${fmtDate(msg.at)} · ${when(msg.at)}` : ""}</small></div>
      </header>
      {msg.kind === "survey" && s && (
        <div className="mx-rbody">
          <div className="mx-row">{s.points ? <span className="mx-chip gold"><Icon name="coin" size={13} />{Number(s.points).toLocaleString()} points</span> : null}{s.minutes ? <span className="mx-chip"><Icon name="clock" size={13} />about {s.minutes} min</span> : null}</div>
          {s.summary && <p>{s.summary}</p>}
          <p className="mx-muted">This survey matches your profile answers. Take your time and answer honestly; careful answers keep your quality score high.</p>
          <a className="mx-btn" href={msg.href}>Take this survey <Icon name="arrow" size={16} /></a>
        </div>
      )}
      {msg.kind === "notice" && (
        <div className="mx-rbody">{msg.body && <p>{msg.body}</p>}{msg.href && <a className="mx-btn ghost" href={msg.href} target="_blank" rel="noopener noreferrer">Read more <Icon name="external" size={15} /></a>}</div>
      )}
      {msg.kind === "notification" && (
        <div className="mx-rbody">{msg.href ? <Link className="mx-btn" href={msg.href}>Take me there <Icon name="arrow" size={16} /></Link> : <p className="mx-muted">Nothing to do here. This is for your information.</p>}</div>
      )}
      {msg.kind === "ticket" && <Thread msg={msg} />}
    </article>
  );
}

export default function Messages() {
  const { d, notes, tickets, dash } = useMx();
  const [seen, mark, unmark] = useSeen();
  const [filter, setFilter] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [openKey, setOpenKey] = React.useState(null);
  const inbox = React.useMemo(() => buildInbox({ d, notes, tickets: tickets.list }), [d, notes, tickets.list]);
  const unread = inbox.filter((m) => !seen.has(m.key));
  const shown = inbox.filter((m) => (filter === "all" || (filter === "unread" ? !seen.has(m.key) : m.kind === filter)) && (!q.trim() || `${m.title} ${m.body}`.toLowerCase().includes(q.trim().toLowerCase())));
  const open = inbox.find((m) => m.key === openKey) || null;
  const pick = (m) => { setOpenKey(m.key); mark(m.key); };
  const count = (k) => (k === "all" ? inbox.length : k === "unread" ? unread.length : inbox.filter((m) => m.kind === k).length);
  const loading = dash.loading || !tickets.ready;

  return (
    <>
      <PageHead icon="inbox" title="Messages" lead="Everything we send you in one place: notifications, new surveys, notices from the MHO team and your support tickets with every reply."
        facts={[["Unread", unread.length], ["New surveys", count("survey")], ["Open tickets", tickets.list.filter((x) => !/resolved|closed/i.test(x.status || "")).length]]} />
      <section className={`mx-inbox${open ? " reading" : ""}`} aria-label="Messages">
        <div className="mx-ilist">
          <div className="mx-itools">
            <label className="mx-isearch"><Icon name="search" size={16} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages" aria-label="Search messages" /></label>
            <button type="button" className="mx-btn sm ghost" onClick={() => mark(inbox.map((m) => m.key))} disabled={!unread.length}><Icon name="check" size={14} />Mark all read</button>
          </div>
          <div className="mx-ifilters" role="tablist" aria-label="Filter messages">
            {FILTERS.map(([k, l, ic]) => (
              <button key={k} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}><Icon name={ic} size={14} />{l}<span>{count(k)}</span></button>
            ))}
          </div>
          {loading && !inbox.length ? <div className="mx-skel" style={{ minHeight: 240 }} /> : !shown.length ? (
            <Empty icon={filter === "unread" ? "check" : "inbox"} title={filter === "unread" ? "You're all caught up" : "No messages here yet"}>
              {filter === "ticket" ? "Questions about rewards or surveys? Open a ticket and the conversation will show here." : "New surveys, notices and replies from our team arrive here."}
            </Empty>
          ) : (
            <ul className="mx-imsgs">
              {shown.map((m, i) => {
                const [label, icon, cls] = KINDS[m.kind];
                const isNew = !seen.has(m.key);
                return (
                  <li key={m.key} style={{ "--i": Math.min(i, 12) }}>
                    <button type="button" className={`mx-imsg ${cls}${isNew ? " new" : ""}${openKey === m.key ? " on" : ""}`} onClick={() => pick(m)} aria-current={openKey === m.key || undefined}>
                      <span className="kic"><Icon name={icon} size={18} /></span>
                      <span className="tx"><small>{label}{m.kind === "ticket" ? ` · ${ticketState(m.ticket.status)}` : ""}</small><b>{m.title}</b>{m.body && m.kind !== "ticket" && <span>{m.body}</span>}</span>
                      <span className="meta"><small>{when(m.at)}</small>{isNew && <i className="dot" aria-label="Unread" />}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mx-inew"><Link className="mx-btn sm" href="/member/support?tab=new"><Icon name="plus" size={14} />New support ticket</Link>{open && !seen.has(open.key) ? null : open ? <button type="button" className="mx-btn sm link" onClick={() => unmark(open.key)}>Mark as unread</button> : null}</div>
        </div>
        <Reader msg={open} onBack={() => setOpenKey(null)} />
      </section>
    </>
  );
}
