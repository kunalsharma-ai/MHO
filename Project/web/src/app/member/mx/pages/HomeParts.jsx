"use client";
// Dashboard sections added in the second redesign pass, inspired by the Turn2Opinion member dashboard:
// journey steps, instant alerts, survey opportunities, the payout dial, quality gauge, invite card, milestones and
// recent activity. Every number comes from the member's own records (dashboard API, rewards, invites, referrals,
// contact preferences); milestones are derived from those numbers, never stored or invented.
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import { useMx, useAnswers } from "../data";
import { Icon, Empty, fmtDate, useToast, apiOk, apiMessage } from "../kit";
import { sectionHref, sectionTitle } from "../parts";

const n = (v) => Number(v) || 0;

/** Five steps from profile to impact, each with the member's real figure. */
export function Journey() {
  const { d, balance, member } = useMx();
  const prof = d?.profile;
  const c = d?.surveys?.counts || {};
  const steps = [
    ["profile", "Complete your profile", prof ? `${prof.overall || 0}%` : "—", prof?.state === "complete", "/member/profiles"],
    ["surveys", "Take part", `${c.available || 0} open`, false, "/member/surveys"],
    ["coin", "Earn points", `${balance.points.toLocaleString()} points`, false, "/member/rewards"],
    ["heart", "Keep quality high", `Score ${n(member?.qualityScore)}`, false, "/member/myaccount"],
    ["pulse", "See your impact", `${c.completed || 0} completed`, false, "/member/surveys?tab=history"],
  ];
  const current = prof?.state === "complete" ? 1 : 0;
  return (
    <nav className="mx-journey mx-rise" aria-label="Your journey" style={{ "--i": 1 }}>
      <ol>
        {steps.map(([ic, label, value, done, href], i) => (
          <li key={label} data-state={done ? "done" : i === current ? "now" : "next"} style={{ "--i": i }}>
            <Link href={href}>
              <span className="dot">{done ? <Icon name="check" size={18} /> : <Icon name={ic} size={18} />}</span>
              <b>{label}</b><span>{value}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const CHANNELS = [["whatsapp", "WhatsApp", "A message when a well-matched survey opens", "chat"], ["email", "Email", "An email with the survey link and reward", "mail"], ["sms", "SMS", "A short text message", "phone"]];
/** Survey alerts: the same "communication-methods" answer as My Account > Notifications, saved on each switch. */
export function InstantAlerts() {
  const [ans, refresh, ready] = useAnswers(["communication-methods"]);
  const push = useToast();
  const [busy, setBusy] = React.useState("");
  const on = [].concat(ans["communication-methods"] || []).map(String);
  const flip = async (k) => {
    const next = on.includes(k) ? on.filter((x) => x !== k) : [...on, k];
    setBusy(k);
    try {
      const r = await api.patch("/api/v1/me/answer", { "communication-methods": next });
      if (!apiOk(r)) throw new Error(apiMessage(r, "Could not save."));
      await refresh();
      push(`${CHANNELS.find((c) => c[0] === k)[1]} alerts ${next.includes(k) ? "on" : "off"}.`);
    } catch (e) { push(e.message || "Could not save your choice. Please try again.", "bad"); }
    setBusy("");
  };
  return (
    <section className="mx-card mx-alerts mx-rise" aria-labelledby="mx-al-h" style={{ "--i": 2 }}>
      <div className="head">
        <span className="badge"><Icon name="bell" size={22} /></span>
        <div><span className="mx-eyebrow">Instant alerts</span><h2 id="mx-al-h">Hear first when a survey that suits you opens</h2></div>
        <Link className="mx-btn sm ghost" href="/member/myaccount?tab=notifications">All contact options</Link>
      </div>
      <div className="rows">
        {CHANNELS.map(([k, label, sub, ic]) => (
          <div className="row" key={k}>
            <span className="ic"><Icon name={ic} size={18} /></span>
            <span className="tx"><b>{label}</b><span>{sub}</span></span>
            <button type="button" role="switch" aria-checked={on.includes(k)} aria-label={`${label} alerts`} className="mx-switch" disabled={!ready || busy === k} onClick={() => flip(k)}><i /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Opportunities: the best-paid open survey as a feature, the rest as a list, with quick filters. */
export function Opportunities() {
  const { d, dash } = useMx();
  const s = d?.surveys;
  const [f, setF] = React.useState("all");
  const all = [...(s?.available || [])];
  const list = f === "short" ? all.filter((x) => n(x.minutes) && n(x.minutes) <= 10) : f === "top" ? [...all].sort((a, b) => n(b.points) - n(a.points)) : all;
  const feature = [...list].sort((a, b) => n(b.points) - n(a.points))[0];
  const rest = list.filter((x) => x !== feature);
  const resume = (s?.inProgress || []).filter((x) => x.resumable);
  return (
    <section className="mx-card mx-opps mx-rise" aria-labelledby="mx-op-h" style={{ "--i": 4 }} data-tour="surveys">
      <div className="mx-sec-h">
        <div><span className="mx-eyebrow">Opportunities</span><h2 id="mx-op-h" style={{ marginTop: 6 }}>Surveys waiting for you</h2>
          <p>{s ? `${all.length} open for you. See the time and reward before you start.` : ""}</p></div>
        <Link className="mx-btn sm ghost" href="/member/surveys">Open all surveys <Icon name="arrow" size={14} /></Link>
      </div>
      {all.length > 0 && (
        <div className="mx-filters" role="group" aria-label="Filter surveys" style={{ marginBottom: 14 }}>
          {[["all", "All"], ["short", "10 min or less"], ["top", "Top reward"]].map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
        </div>
      )}
      {dash.loading ? <div className="mx-skel" style={{ minHeight: 200 }} /> : !all.length && !resume.length ? (
        <Empty icon="surveys" title="No surveys open for you right now">New studies are matched to your profile answers. Completing more profiles widens the studies you can be invited to.</Empty>
      ) : (
        <div className="grid">
          {resume.map((r) => (
            <a key={`r-${r.slug}`} className="mx-feature resume" href={`/survey?name=${encodeURIComponent(r.slug)}`}>
              <span className="mx-eyebrow">In progress</span><b>{r.name}</b><span className="meta">Started {fmtDate(r.startedAt)}</span><span className="mx-btn sm">Continue <Icon name="arrow" size={14} /></span>
            </a>
          ))}
          {feature ? (
            <div className="mx-feature">
              <span className="orb" aria-hidden="true"><Icon name="surveys" size={30} /></span>
              <span className="mx-eyebrow">Best reward for you</span>
              <b>{feature.name}</b>
              {feature.summary && <span className="sum">{feature.summary}</span>}
              <span className="meta"><span className="mx-chip gold"><Icon name="coin" size={13} />{n(feature.points)} points</span>{feature.minutes ? <span className="mx-chip"><Icon name="clock" size={13} />{feature.minutes} min</span> : null}</span>
              <a className="mx-btn" href={`/survey?name=${encodeURIComponent(feature.slug)}`}>Take this survey <Icon name="arrow" size={16} /></a>
            </div>
          ) : <Empty icon="filter" title="No surveys match this filter">Try another filter to see the rest.</Empty>}
          {rest.length > 0 && (
            <ul className="mx-oplist">
              {rest.slice(0, 4).map((x, i) => (
                <li key={x.slug} style={{ "--i": i }}>
                  <a href={`/survey?name=${encodeURIComponent(x.slug)}`}>
                    <span className="ic"><Icon name="surveys" size={18} /></span>
                    <span className="tx"><b>{x.name}</b><span><Icon name="coin" size={13} />{n(x.points)} points{x.minutes ? <> · <Icon name="clock" size={13} />{x.minutes} min</> : null}</span></span>
                    <Icon name="arrow" size={16} />
                  </a>
                </li>
              ))}
              {rest.length > 4 && <li className="more"><Link href="/member/surveys">{rest.length - 4} more in Surveys</Link></li>}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

/** Payout dial: how far the balance is from the payout level. */
export function PayoutDial() {
  const { balance } = useMx();
  const t = balance.threshold || 0;
  // a payout uses approved points; survey points count once the research team has checked them
  const ok = Math.max(0, balance.approved);
  const p = t ? Math.min(1, ok / t) : 0;
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  return (
    <section className="mx-dialcard mx-rise" aria-labelledby="mx-dial-h" style={{ "--i": 5 }}>
      <span className="mx-eyebrow">Rewards vault</span>
      <h2 id="mx-dial-h" className="sr">Rewards vault</h2>
      <div className="dial" style={{ "--p": p }} role="img" aria-label={`${balance.points.toLocaleString()} points, ${Math.round(p * 100)}% of the payout level`}>
        <svg viewBox="0 0 200 200" aria-hidden="true">
          {ticks.map((i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={100 + Math.cos(a) * 86} y1={100 + Math.sin(a) * 86} x2={100 + Math.cos(a) * 94} y2={100 + Math.sin(a) * 94} />; })}
          <circle className="track" cx="100" cy="100" r="74" />
          <circle className="fill" cx="100" cy="100" r="74" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
        </svg>
        <span className="face"><b>{balance.points.toLocaleString()}</b><small>points</small></span>
      </div>
      <p className="note">{!t ? "The payout level could not be read right now." : p >= 1 ? "You can request a payout." : `${(t - ok).toLocaleString()} approved points to unlock your payout`}</p>
      {balance.pending > 0 && <p className="note" style={{ marginTop: -4, opacity: .8 }}>{balance.pending.toLocaleString()} points awaiting approval</p>}
      <Link className="mx-btn sm" href="/member/rewards">{p >= 1 ? "Request a payout" : "View rewards"}</Link>
    </section>
  );
}

/** Quality score on a half-circle gauge (scores run 0 to 200). */
export function QualityGauge() {
  const { member } = useMx();
  const q = n(member?.qualityScore);
  const p = Math.min(1, q / 200);
  const a = Math.PI * (1 - p);
  return (
    <section className="mx-card mx-gauge mx-rise" aria-labelledby="mx-q-h" style={{ "--i": 6 }}>
      <span className="mx-eyebrow">Quality score</span>
      <h2 id="mx-q-h" className="sr">Quality score</h2>
      <svg viewBox="0 0 220 130" role="img" aria-label={`Quality score ${q} of 200`}>
        <defs><linearGradient id="mxGauge" x1="0" x2="1"><stop offset="0" stopColor="#FF7A8A" /><stop offset=".5" stopColor="#FFC65C" /><stop offset="1" stopColor="#22C3A5" /></linearGradient></defs>
        <path d="M20 115 A90 90 0 0 1 200 115" className="track" />
        <path d="M20 115 A90 90 0 0 1 200 115" className="fill" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
        <line className="needle" x1="110" y1="115" x2={110 + Math.cos(a) * 70} y2={115 - Math.sin(a) * 70} />
        <circle cx="110" cy="115" r="7" className="hub" />
      </svg>
      <b className="big">{q}</b>
      <p className="note">Careful, honest answers keep this score up. It rises with every completed profile and survey.</p>
    </section>
  );
}

/** Invite & earn: real counts from your invites and the friends who joined with your link. */
export function InviteCard() {
  const [c, setC] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    Promise.allSettled([api.get("/api/v1/me/invite"), api.get("/api/v1/me/referrals")]).then(([a, b]) => {
      const list = (r) => (r.status === "fulfilled" && Array.isArray(r.value?.data) ? r.value.data : []);
      if (live) setC({ invited: list(a).length, joined: list(b).filter((u) => u.verified).length });
    });
    return () => { live = false; };
  }, []);
  const dots = Array.from({ length: 5 }, (_, i) => i < (c?.joined || 0));
  return (
    <section className="mx-card mx-invite mx-rise" aria-labelledby="mx-inv-h" style={{ "--i": 7 }}>
      <span className="mx-eyebrow">Invite & earn</span>
      <div className="orbit" aria-hidden="true">
        <span className="you">You</span>
        {dots.map((on, i) => <i key={i} className={on ? "on" : ""} style={{ "--a": `${i * 72 - 90}deg` }} />)}
      </div>
      <h2 id="mx-inv-h">{c ? `${c.joined} friend${c.joined === 1 ? "" : "s"} joined` : "Invite friends"}</h2>
      <p className="note">{c ? `${c.invited} invitation${c.invited === 1 ? "" : "s"} sent · 100 points for each friend who verifies their email` : "Loading…"}</p>
      <Link className="mx-btn sm ghost" href="/member/referrals">Invite a friend</Link>
    </section>
  );
}

/** Milestones worked out from the member's own figures. */
export function Milestones() {
  const { d, balance } = useMx();
  const [joined, setJoined] = React.useState(0);
  React.useEffect(() => { api.get("/api/v1/me/referrals").then((r) => setJoined((Array.isArray(r?.data) ? r.data : []).filter((u) => u.verified).length)).catch(() => {}); }, []);
  const secs = d?.profile?.sections || [];
  const doneP = secs.filter((s) => s.status === "complete").length;
  const doneS = d?.surveys?.counts?.completed || 0;
  const t = balance.threshold || 0;
  const list = [
    ["First profile", "profile", doneP >= 1, `${Math.min(doneP, 1)} of 1`],
    ["All profiles", "check", secs.length > 0 && doneP === secs.length, `${doneP} of ${secs.length}`],
    ["First survey", "surveys", doneS >= 1, `${Math.min(doneS, 1)} of 1`],
    ["5 surveys", "star", doneS >= 5, `${Math.min(doneS, 5)} of 5`],
    ["First friend", "share", joined >= 1, `${Math.min(joined, 1)} of 1`],
    ["Payout ready", "gift", t > 0 && balance.approved >= t, t ? `${Math.min(100, Math.round((Math.max(0, balance.approved) / t) * 100))}%` : "—"],
  ];
  const earned = list.filter((m) => m[2]).length;
  return (
    <section className="mx-card mx-miles mx-rise" aria-labelledby="mx-ms-h" style={{ "--i": 8 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">{earned} of {list.length} earned</span><h2 id="mx-ms-h" style={{ marginTop: 6 }}>Milestones</h2><p>Earned from your real activity. Locked ones show what comes next.</p></div></div>
      <ul>
        {list.map(([label, ic, got, prog], i) => (
          <li key={label} data-got={got || undefined} style={{ "--i": i }}>
            <span className="medal">{got ? <Icon name={ic} size={22} /> : <Icon name="lock" size={18} />}</span>
            <b>{label}</b><span>{got ? "Earned" : prog}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const ACT = { Survey: "surveys", Profile: "profile", Referral: "share", Social: "star" };
const ST = { complete: ["ok", "check", "Completed"], terminate: ["bad", "x", "Screened out"], overquota: ["warn", "clock", "Quota full"], dropout: ["info", "clock", "Not finished"], approved: ["ok", "check", "Approved"], credited: ["ok", "check", "Credited"], pending: ["warn", "clock", "Awaiting approval"], rejected: ["bad", "x", "Not approved"], paid: ["info", "gift", "Paid out"] };
/** Recent activity: the newest entries of the rewards history. */
export function RecentActivity() {
  const { activity } = useMx();
  // the same history the member area loads with the balance (data.jsx), newest first
  const rows = activity.ready ? activity.rows.slice(0, 5) : null;
  return (
    <section className="mx-card mx-recent mx-rise" aria-labelledby="mx-ra-h" style={{ "--i": 9 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Your impact</span><h2 id="mx-ra-h" style={{ marginTop: 6 }}>Recent activity</h2></div>
        <Link className="mx-btn sm ghost" href="/member/rewards">All activity</Link></div>
      {!rows ? <div className="mx-skel" style={{ minHeight: 120 }} /> : !rows.length ? (
        <Empty icon="pulse" title="No activity yet">Completed profiles and surveys will show here with the points they earned.</Empty>
      ) : (
        <ol>
          {rows.map((r, i) => {
            const [tone, ic, label] = ST[r.approval || r.status] || ["info", ACT[r.type] || "spark", r.status || ""];
            return (
              <li key={r.id} style={{ "--i": i }} className={tone}>
                <span className="ic"><Icon name={ic} size={16} /></span>
                <small>{r.date ? fmtDate(r.date) : ""}</small>
                <b>{r.activity}</b>
                <span>{r.points > 0 ? `+${r.points.toLocaleString()} points${r.approval === "pending" ? " · awaiting approval" : ""}` : r.points < 0 ? `${r.points.toLocaleString()} points paid out` : label}</span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

/** The next profile to answer, as a compact road under the hero. */
export function NextProfile() {
  const { d } = useMx();
  const next = d?.profile?.next;
  if (!next) return null;
  return (
    <Link className="mx-nextprof mx-rise" href={sectionHref(next)} style={{ "--i": 3 }}>
      <span className="ic"><Icon name="profile" size={20} /></span>
      <span className="tx"><small>Next profile</small><b>{sectionTitle(next)}</b><span>{next.answered} of {next.total} questions answered</span></span>
      <span className="bar" aria-hidden="true"><i style={{ "--p": next.total ? next.answered / next.total : 0 }} /></span>
      <span className="mx-btn sm">{next.answered ? "Continue" : "Start"} <Icon name="arrow" size={14} /></span>
    </Link>
  );
}
