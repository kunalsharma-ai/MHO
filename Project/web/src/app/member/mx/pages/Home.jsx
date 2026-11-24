"use client";
// Dashboard home: a short welcome, then the member's progress as a game: activity streak, level, payout vault,
// quality score, badges, an activity calendar, next steps, latest messages, invites and survey alerts.
// Profiles and surveys have their own pages (My Profile, Surveys); the dashboard does not list them.
// Every number comes from the member's records (dashboard API, rewards balance and history, referrals, answers).
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import { useMx, firstName, useAnswers } from "../data";
import { Icon, useCountUp, fmtDate } from "../kit";
import { InstantAlerts, PayoutDial, QualityGauge, InviteCard } from "./HomeParts";
import { levelOf, earnedOf, badgesOf, calendarOf, monthOf } from "../engage";
import { buildInbox, useSeen } from "../messages";
import Scene3D from "../Scene3D";
import { sectionArt } from "../art";
import { ResearchConsole, CircleOfCare, JourneyPath } from "./Signature";

const greet = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const TAGLINE = {
  hcp: "Your clinical voice shapes better care. Here is how your research journey is going.",
  caregiver: "Your care experience matters. Here is everything you have built with us so far.",
  patient: "Your health story helps others. Here is your progress at a glance.",
};
const HERO_LABEL = { hcp: "A turning 3D DNA helix with a medical cross", caregiver: "A beating 3D heart in a ring of glowing beads", patient: "A glass orb with a glowing heartbeat line" };

function Hero() {
  const { member, d, panel, balance, activity, streak } = useMx();
  const name = firstName(member, d);
  const earned = earnedOf(activity.rows, balance.points);
  const lv = levelOf(panel, earned);
  const pts = useCountUp(balance.points);
  return (
    <section className="mx-wel mx-rise" aria-labelledby="mx-hello">
      <div className="txt">
        <span className="mx-hello" data-tour="greeting"><i><Icon name="spark" size={12} /></i>{greet()}</span>
        <h1 id="mx-hello">Welcome back, <em>{name || "there"}</em></h1>
        <p className="lead">{TAGLINE[panel]}</p>
        <div className="lvl" aria-label={`Level ${lv.n}, ${lv.name}`}>
          <span className="badge"><b>{lv.n}</b><small>LEVEL</small></span>
          <span className="lt"><b>{lv.name}</b><span className="xp" aria-hidden="true"><i style={{ "--p": lv.p }} /></span>
            <small>{lv.next ? `${lv.left.toLocaleString()} points to ${lv.next}` : "Top level reached"}</small></span>
        </div>
      </div>
      <div className="kpis" role="list" aria-label="Your numbers">
        <Link role="listitem" href="/member/rewards" className="kpi k-coin"><span className="ic"><Icon name="coin" size={18} /></span><b>{pts.toLocaleString()}</b><small>points</small></Link>
        <Link role="listitem" href="#mx-quality" className="kpi k-q"><span className="ic"><Icon name="heart" size={18} /></span><b>{Number(member?.qualityScore) || 0}</b><small>quality</small></Link>
        <Link role="listitem" href="#mx-streak" className="kpi k-fire"><span className="ic"><Icon name="flame" size={18} /></span><b>{streak.current}</b><small>week streak</small></Link>
      </div>
      <div className="emb" aria-hidden="false"><span className="halo" aria-hidden="true" /><Scene3D panel={panel} compact label={HERO_LABEL[panel]} fallback={<img className="flat" src={sectionArt(panel, "basic", "basic")} alt="" width="120" height="120" />} /></div>
    </section>
  );
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
function StreakCard() {
  const { streak, activity } = useMx();
  const n = useCountUp(streak.current);
  const msg = !activity.ready ? "" : streak.activeNow ? "You're active this week. Keep the flame going next week too." : streak.current ? "Do one thing this week, a survey, a profile or an invite, to keep your streak." : "Take part in anything this week to light your first flame.";
  return (
    <section id="mx-streak" className="mx-card mx-streakc mx-rise" aria-labelledby="mx-st-h" style={{ "--i": 1 }}>
      <span className="mx-eyebrow">Activity streak</span>
      <div className="flame" aria-hidden="true"><i /><i /><i /><Icon name="flame" size={44} /></div>
      <h2 id="mx-st-h"><b>{n}</b> week{streak.current === 1 ? "" : "s"} in a row</h2>
      <p className="note">{msg}</p>
      <ol className="wk" aria-label="This week">
        {streak.week.map((x, i) => <li key={x.start} className={`${x.count ? "on" : ""}${x.today ? " today" : ""}${x.future ? " fut" : ""}`} title={new Date(x.start).toDateString()}><i>{x.count ? <Icon name="check" size={12} stroke={3.5} /> : null}</i><span>{DAYS[i]}</span></li>)}
      </ol>
      <div className="best"><Icon name="trophy" size={15} />Best run: <b>{streak.best} week{streak.best === 1 ? "" : "s"}</b></div>
    </section>
  );
}

function LevelCard() {
  const { panel, balance, activity } = useMx();
  const earned = earnedOf(activity.rows, balance.points);
  const lv = levelOf(panel, earned);
  return (
    <section className="mx-card mx-levelc mx-rise" aria-labelledby="mx-lv-h" style={{ "--i": 2 }}>
      <span className="mx-eyebrow">Your level</span>
      <h2 id="mx-lv-h"><span>Level {lv.n}</span> {lv.name}</h2>
      <ol className="ladder">
        {lv.all.map((l, i) => (
          <li key={l.name} className={i + 1 < lv.n ? "done" : i + 1 === lv.n ? "now" : ""} style={{ "--i": i }}>
            <i>{i + 1 < lv.n ? <Icon name="check" size={12} stroke={3} /> : i + 1}</i><span>{l.name}</span><small>{l.at.toLocaleString()}</small>
          </li>
        ))}
      </ol>
      <div className="xp"><span style={{ "--p": lv.p }} /></div>
      <p className="note">{lv.next ? <>{earned.toLocaleString()} points earned · <b>{lv.left.toLocaleString()}</b> more to reach {lv.next}</> : <>{earned.toLocaleString()} points earned · top level</>}</p>
      <p className="fine">Levels show how much you have taken part. They do not change the points a survey pays.</p>
    </section>
  );
}

const TONES = { violet: ["#8A4DFF", "#4B3CC9"], teal: ["#14C9B5", "#0E8F86"], gold: ["#FFC233", "#E08A00"], coral: ["#FF6A2C", "#EF2D56"], amber: ["#FFB020", "#FF6A2C"], sky: ["#38BDF8", "#2F6BFF"], pink: ["#FF5E9E", "#C9184A"] };
function Badges() {
  const { panel, d, balance, activity, streak } = useMx();
  const [joined, setJoined] = React.useState(0);
  React.useEffect(() => { api.get("/api/v1/me/referrals").then((r) => setJoined((Array.isArray(r?.data) ? r.data : []).filter((u) => u.verified).length)).catch(() => {}); }, []);
  const list = badgesOf({ panel, d, balance, rows: activity.rows, joined, streak });
  const got = list.filter((b) => b.got).length;
  return (
    <section className="mx-card mx-badges mx-rise" aria-labelledby="mx-bd-h" style={{ "--i": 3 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Badges</span><h2 id="mx-bd-h" style={{ marginTop: 6 }}>{got} of {list.length} badges earned</h2><p>Each badge comes from something you really did. Locked badges show what to do next.</p></div>
        <div className="mx-bdmeter" aria-hidden="true"><i style={{ "--p": got / list.length }} /></div></div>
      <ul>
        {list.map((b, i) => {
          const [a, c] = TONES[b.tone] || TONES.violet;
          return (
            <li key={b.id} className={b.got ? "got" : ""} style={{ "--i": i, "--a": a, "--b": c, "--p": b.p }}>
              <span className="medal"><span className="rim" /><span className="face"><Icon name={b.got ? b.icon : "lock"} size={b.got ? 24 : 18} /></span>{b.got && <span className="shine" aria-hidden="true" />}</span>
              <b>{b.name}</b>
              <small>{b.got ? "Earned" : `${b.cur.toLocaleString()} / ${b.goal.toLocaleString()}`}</small>
              <span className="how" role="note">{b.how}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Calendar() {
  const { activity } = useMx();
  const weeks = calendarOf(activity.rows, 18);
  const m = monthOf(activity.rows);
  const max = Math.max(1, ...weeks.flat().map((x) => x.count));
  const months = weeks.map((w) => new Date(w[0].day)).map((dt, i, a) => (i === 0 || dt.getMonth() !== a[i - 1].getMonth() ? dt.toLocaleDateString(undefined, { month: "short" }) : ""));
  return (
    <section className="mx-card mx-cal mx-rise" aria-labelledby="mx-cal-h" style={{ "--i": 4 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Activity</span><h2 id="mx-cal-h" style={{ marginTop: 6 }}>Your last 18 weeks</h2></div>
        <Link className="mx-btn sm ghost" href="/member/rewards">Full history <Icon name="arrow" size={14} /></Link></div>
      <div className="cal-wrap">
        <div className="cal" role="img" aria-label={`${activity.rows.length} activities in your history`}>
          <div className="mo" aria-hidden="true">{months.map((x, i) => <span key={i}>{x}</span>)}</div>
          <div className="grid">
            {weeks.map((w, i) => (
              <div key={i} className="col" style={{ "--i": i }}>
                {w.map((x) => <i key={x.day} className={x.future ? "fut" : ""} style={{ "--v": x.count / max }} data-n={x.count || undefined} title={`${new Date(x.day).toDateString()}: ${x.count} activit${x.count === 1 ? "y" : "ies"}`} />)}
              </div>
            ))}
          </div>
          <div className="key" aria-hidden="true"><span>Less</span><i style={{ "--v": 0 }} /><i style={{ "--v": .34 }} /><i style={{ "--v": .67 }} /><i style={{ "--v": 1 }} /><span>More</span></div>
        </div>
        <div className="month">
          <small>This month</small>
          <div><b>{m.activities}</b><span>activities</span></div>
          <div><b>{m.completed}</b><span>surveys completed</span></div>
          <div><b>+{m.points.toLocaleString()}</b><span>points earned</span></div>
        </div>
      </div>
    </section>
  );
}

/** Next steps: actions that move the member forward, each checked against their own records. */
function Quests() {
  const { streak, activity, d } = useMx();
  const [ans, , ready] = useAnswers(["communication-methods", "payment-method-primary", "payment-method"]);
  const [inv, setInv] = React.useState(null);
  React.useEffect(() => { api.get("/api/v1/me/invite").then((r) => setInv(Array.isArray(r?.data) ? r.data.length : 0)).catch(() => setInv(0)); }, []);
  const alerts = [].concat(ans["communication-methods"] || []).length > 0;
  const pay = Boolean(ans["payment-method-primary"] || ans["payment-method"]);
  const social = activity.rows.some((r) => r.type === "Social");
  const consentOk = !d?.notifications?.some((n) => n.action === "consent");
  const list = [
    ["flame", "Keep your streak alive", streak.activeNow ? "Done for this week" : "Do one activity this week", streak.activeNow, "/member/surveys"],
    ["bell", "Turn on survey alerts", alerts ? "You will hear first" : "WhatsApp, email or SMS", alerts, "/member/myaccount?tab=notifications"],
    ["card", "Choose how you get paid", pay ? "Payout method saved" : "PayPal, UPI, bank and more", pay, "/member/myaccount?tab=payment"],
    ["share", "Invite a friend", inv ? `${inv} invitation${inv === 1 ? "" : "s"} sent` : "100 points when they verify", Boolean(inv), "/member/referrals"],
    ["megaphone", "Follow MHO on social media", social ? "Approved, thank you" : "50 points once approved", social, "/member/referrals#follow"],
    ["shield", "Privacy and consent up to date", consentOk ? "All signed" : "Please review your consent", consentOk, "/member/myaccount?tab=privacy"],
  ];
  const done = list.filter((x) => x[3]).length;
  return (
    <section className="mx-card mx-quests mx-rise" aria-labelledby="mx-qs-h" style={{ "--i": 5 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Next steps</span><h2 id="mx-qs-h" style={{ marginTop: 6 }}>{done} of {list.length} done</h2></div>
        <span className="qring" style={{ "--p": done / list.length }} aria-hidden="true"><b>{Math.round((done / list.length) * 100)}%</b></span></div>
      <ul>
        {list.map(([ic, label, sub, ok, href], i) => (
          <li key={label} className={ok ? "ok" : ""} style={{ "--i": i }}>
            <Link href={href}>
              <span className="ic"><Icon name={ok ? "check" : ic} size={17} stroke={ok ? 3 : 2} /></span>
              <span className="tx"><b>{label}</b><span>{!ready && (ic === "bell" || ic === "card") ? "Checking…" : sub}</span></span>
              {!ok && <Icon name="arrow" size={15} />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LatestMessages() {
  const { d, notes, tickets } = useMx();
  const [seen] = useSeen();
  const list = buildInbox({ d, notes, tickets: tickets.list }).slice(0, 4);
  const unread = buildInbox({ d, notes, tickets: tickets.list }).filter((m) => !seen.has(m.key)).length;
  const IC = { survey: "surveys", notice: "megaphone", ticket: "ticket", notification: "bell" };
  return (
    <section className="mx-card mx-latest mx-rise" aria-labelledby="mx-lm-h" style={{ "--i": 6 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Messages</span><h2 id="mx-lm-h" style={{ marginTop: 6 }}>{unread ? `${unread} unread` : "All read"}</h2></div>
        <Link className="mx-btn sm ghost" href="/member/messages">Open inbox <Icon name="arrow" size={14} /></Link></div>
      {!list.length ? <p className="mx-muted">New surveys, notices and replies from our team will arrive here.</p> : (
        <ul>
          {list.map((m, i) => (
            <li key={m.key} className={`k-${m.kind}${seen.has(m.key) ? "" : " new"}`} style={{ "--i": i }}>
              <Link href="/member/messages"><span className="ic"><Icon name={IC[m.kind]} size={16} /></span><span className="tx"><b>{m.title}</b><small>{m.at ? fmtDate(m.at) : ""}</small></span>{!seen.has(m.key) && <i className="dot" aria-label="Unread" />}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* Each panel gets its own centrepiece and its own arrangement of the same real cards (see panels.css). */
const SIGNATURE = { hcp: ResearchConsole, caregiver: CircleOfCare, patient: JourneyPath };
const ORDER = {
  hcp: ["quality", "level", "vault", "cal", "quests", "badges", "msgs", "invite", "streak"],
  caregiver: ["quests", "streak", "level", "vault", "badges", "cal", "quality", "msgs", "invite"],
  patient: ["streak", "quality", "level", "vault", "badges", "quests", "cal", "invite", "msgs"],
};
const CARDS = {
  streak: StreakCard, level: LevelCard, vault: PayoutDial, quality: QualityGauge, badges: Badges,
  cal: Calendar, quests: Quests, msgs: LatestMessages, invite: InviteCard,
};

export default function Home() {
  const { dash, panel } = useMx();
  const Sig = SIGNATURE[panel] || JourneyPath;
  const order = ORDER[panel] || ORDER.patient;
  return (
    <>
      <Hero />
      {dash.error && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />We could not load your dashboard just now. Your data is safe; please refresh the page in a moment.</div>}
      <Sig />
      <div className={`mx-dash d-${panel}`} data-tour="stats">
        {order.map((k, i) => {
          const C = CARDS[k];
          return <div key={k} className={`ga ga-${k}`} id={k === "quality" ? "mx-quality" : undefined} style={{ "--n": i }}><C /></div>;
        })}
      </div>
      <InstantAlerts />
    </>
  );
}
