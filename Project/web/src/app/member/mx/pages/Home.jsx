"use client";
// Dashboard home: welcome, profile completion, the panel's rewards vault, surveys, activity and shortcuts.
// Every number comes from /api/v1/me/dashboard or the reward balance; when there is nothing yet, the page says so.
import React from "react";
import Link from "next/link";
import { useMx, firstName, noteHref } from "../data";
import { Icon, Meter, Empty, fmtDate } from "../kit";
import { Vault, ProfileCards, SurveyTiles, sectionHref, sectionTitle } from "../parts";
import { SCENES, sectionArt } from "../art";

const greet = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };

function HeroArt() {
  const { panel, d } = useMx();
  const sections = d?.profile?.sections || [];
  if (panel === "caregiver") {
    return (
      <div className="mx-scenes art-col" aria-hidden="true">
        <span className="mx-scene" style={{ left: "2%", top: "4%", "--rot": "-6deg", "--w": "44%" }}><img src={SCENES.hug} alt="" width="300" height="220" /></span>
        <span className="mx-scene" style={{ right: "2%", top: "0%", "--rot": "5deg", "--w": "40%", "--d": "-2s" }}><img src={SCENES.meal} alt="" width="300" height="220" /></span>
        <span className="mx-scene" style={{ left: "26%", bottom: "0%", "--rot": "-2deg", "--w": "42%", "--d": "-4s" }}><img src={SCENES.walk} alt="" width="300" height="220" /></span>
      </div>
    );
  }
  if (panel === "patient") {
    return (
      <div className="mx-pulseorb art-col" aria-hidden="true">
        <span className="glass" />
        <svg viewBox="0 0 300 120"><defs><linearGradient id="mxEcgG" x1="0" x2="1"><stop offset="0" stopColor="#14B8C4" /><stop offset=".5" stopColor="#3B82F6" /><stop offset="1" stopColor="#E1192F" /></linearGradient></defs>
          <path className="ecg" d="M0 70h70l14-30 16 60 18-80 16 70 12-20h154" fill="none" stroke="url(#mxEcgG)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    );
  }
  const sats = sections.slice(0, 6);
  return (
    <div className="mx-orbit art-col" aria-hidden="true">
      <span className="ring r2" /><span className="ring r1" />
      <span className="core"><span className="mx-cross" /></span>
      {sats.map((s, i) => {
        const a = (i / sats.length) * Math.PI * 2 - Math.PI / 2;
        return <span key={s.slug} className="sat" style={{ left: `calc(50% + ${Math.cos(a) * 41}% - 25px)`, top: `calc(50% + ${Math.sin(a) * 41}% - 25px)`, "--d": `${-i}s` }}><img src={sectionArt("hcp", s.slug, s.name)} alt="" width="40" height="40" /></span>;
      })}
    </div>
  );
}

function Hero() {
  const { member, d, P, panel } = useMx();
  const name = firstName(member, d);
  const prof = d?.profile;
  const sections = prof?.sections || [];
  const done = sections.filter((s) => s.status === "complete").length;
  const next = prof?.next;
  const counts = d?.surveys?.counts || {};
  return (
    <section className="mx-hero mx-rise" aria-labelledby="mx-hello">
      <div>
        <span className="mx-hello" data-tour="greeting"><i><Icon name={P.icon} size={13} /></i>{greet()}{name ? `, ${name}` : ""}</span>
        <h1 id="mx-hello">{P.hello(name || "there")}</h1>
        <p className="lead">{P.lead}</p>
        {panel === "patient" && sections.length > 0 && (
          <div className="mx-progress2">
            <div><span>Profiles</span><Meter value={done / sections.length} label="Profiles complete" /><span>{done}/{sections.length}</span></div>
            <div><span>Surveys</span><Meter value={(counts.completed || 0) / Math.max(1, (counts.completed || 0) + (counts.available || 0))} label="Surveys completed" /><span>{counts.completed || 0}/{(counts.completed || 0) + (counts.available || 0)}</span></div>
          </div>
        )}
        <div className="acts">
          {next ? (
            <Link className="mx-btn" href={sectionHref(next)}><Icon name="profile" size={18} />{next.answered ? `Continue: ${sectionTitle(next)}` : `Start: ${sectionTitle(next)}`}<Icon name="arrow" size={16} /></Link>
          ) : sections.length ? (
            <Link className="mx-btn" href="/member/surveys"><Icon name="surveys" size={18} />See my surveys<Icon name="arrow" size={16} /></Link>
          ) : (
            <Link className="mx-btn" href="/member/profiles"><Icon name="profile" size={18} />Open my profile<Icon name="arrow" size={16} /></Link>
          )}
          {(counts.available || 0) > 0 && <Link className="mx-btn ghost" href="/member/surveys">{counts.available} survey{counts.available === 1 ? "" : "s"} waiting</Link>}
        </div>
        {panel === "caregiver" && next && <p className="note"><Icon name="heart" size={16} />A few warm questions about you and the care you give is all it takes.</p>}
      </div>
      <HeroArt />
    </section>
  );
}

function Completion() {
  const { d, P, dash } = useMx();
  const sections = d?.profile?.sections || [];
  const [filter, setFilter] = React.useState("all");
  const [more, setMore] = React.useState(false);
  if (dash.loading) return <div className="mx-card"><div className="mx-skel" style={{ minHeight: 260 }} /></div>;
  const todo = sections.filter((s) => s.status !== "complete");
  const shown = filter === "todo" ? todo : filter === "done" ? sections.filter((s) => s.status === "complete") : sections;
  return (
    <section aria-labelledby="mx-prof-h" className="mx-rise" style={{ "--i": 3 }}>
      <div className="mx-sec-h">
        <div><span className="mx-eyebrow">Your profiles</span><h2 id="mx-prof-h" style={{ marginTop: 6 }}>{P.profilesTitle}</h2>
          <p>{sections.length ? `${todo.length} to go. Pick any, in any order. Your answers save as you go.` : "Your profile sections appear here once they are set up for your panel."}</p></div>
        {sections.length > 0 && (
          <div className="mx-filters" role="group" aria-label="Filter profiles">
            {[["all", "All", sections.length], ["todo", "To do", todo.length], ["done", "Completed", sections.length - todo.length]].map(([k, l, c]) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}<span>{c}</span></button>
            ))}
          </div>
        )}
      </div>
      {shown.length ? (<>
        <ProfileCards sections={more ? shown : shown.slice(0, 8)} />
        {shown.length > 8 && <div style={{ textAlign: "center", marginTop: 16 }}><button type="button" className="mx-btn ghost" aria-expanded={more} onClick={() => setMore(!more)}>{more ? "Show fewer" : `Show all ${shown.length} profiles`}</button></div>}
      </>) : (
        <Empty icon={filter === "done" ? "star" : "check"} title={filter === "done" ? "No completed profiles yet" : sections.length ? "Every profile is complete" : "No profile sections yet"}>
          {filter === "done" ? "Finish a profile and it will show here with a full meter." : sections.length ? "Thank you. Keep an eye on Surveys for studies that match you." : "Open My Profile to see the questions for your panel."}
        </Empty>
      )}
    </section>
  );
}

function Surveys() {
  const { d, dash } = useMx();
  const s = d?.surveys;
  return (
    <section className="mx-card mx-rise" aria-labelledby="mx-sv-h" style={{ "--i": 4 }} data-tour="surveys">
      <div className="mx-sec-h">
        <div><span className="mx-eyebrow">Surveys</span><h2 id="mx-sv-h" style={{ marginTop: 6 }}>Ready for you</h2>
          <p>{s ? `${s.counts?.available || 0} available · ${s.counts?.inProgress || 0} in progress · ${s.counts?.completed || 0} completed` : ""}</p></div>
        <Link className="mx-btn sm ghost" href="/member/surveys">All surveys <Icon name="arrow" size={14} /></Link>
      </div>
      {dash.loading ? <div className="mx-skel" style={{ minHeight: 160 }} /> : (
        <>
          {s?.inProgress?.length > 0 && <div style={{ marginBottom: 14 }}><SurveyTiles list={s.inProgress.slice(0, 2)} resume /></div>}
          {s?.available?.length ? <SurveyTiles list={s.available.slice(0, 4)} /> : (
            <Empty icon="surveys" title="No surveys open for you right now">New studies are matched to your profile answers. Completing more profiles widens the studies you can be invited to.</Empty>
          )}
        </>
      )}
    </section>
  );
}

const tone = { action: "warn", info: "info", done: "ok", warning: "bad" };
const iconOf = { surveys: "surveys", profile: "profile", consent: "shield", "consent-ok": "shield", announcement: "bell" };
function Activity() {
  const { notes, d, dash } = useMx();
  const hist = (d?.surveys?.history || []).slice(0, 4);
  const label = { completed: "Completed", "not-qualified": "Did not qualify", "quota-full": "Quota full", "in-progress": "In progress" };
  return (
    <section className="mx-card mx-rise" aria-labelledby="mx-act-h" style={{ "--i": 5 }} data-tour="survey-history">
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Activity</span><h2 id="mx-act-h" style={{ marginTop: 6 }}>Updates for you</h2></div>
        <Link className="mx-btn sm ghost" href="/member/notifications">See all</Link></div>
      {dash.loading ? <div className="mx-skel" /> : notes.length + hist.length === 0 ? (
        <Empty icon="bell" title="Nothing new yet">Updates about your surveys, profile and consent will appear here.</Empty>
      ) : (
        <ul className="mx-list">
          {notes.slice(0, 4).map((n, i) => {
            const href = noteHref(n);
            return (
              <li className="mx-item" key={n.id} style={{ "--i": i }}>
                <span className={`ic ${tone[n.level] || "info"}`}><Icon name={iconOf[n.kind] || "bell"} size={18} /></span>
                <span className="tx"><b>{n.text}</b>{n.at && <span>{fmtDate(n.at)}</span>}</span>
                {href ? <Link className="mx-btn sm ghost" href={href} aria-label={`Open: ${n.text}`}><Icon name="arrow" size={14} /></Link> : <span />}
              </li>
            );
          })}
          {hist.map((h, i) => (
            <li className="mx-item" key={`${h.slug}-${i}`} style={{ "--i": i + 4 }}>
              <span className={`ic ${h.status === "completed" ? "ok" : h.status === "in-progress" ? "info" : "bad"}`}><Icon name="surveys" size={18} /></span>
              <span className="tx"><b>{h.name}</b><span>{label[h.status] || h.status} · {fmtDate(h.endedAt || h.startedAt)}{h.points ? ` · ${h.points} pts` : ""}</span></span>
              {h.resumable ? <a className="mx-btn sm" href={`/survey?name=${encodeURIComponent(h.slug)}`}>Continue</a> : <span />}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Shortcuts() {
  const { d } = useMx();
  const c = d?.consent;
  const items = [
    ["My Profile", "Answer and edit your profiles", "/member/profiles", "profile", "#2EE6C5", "#0F7EA8"],
    ["Rewards", "Points and history", "/member/rewards", "gift", "#FFD15C", "#F2611B"],
    ["Refer a friend", "Share your invite link", "/member/referrals", "share", "#FF8FA8", "#C2185B"],
    ["Payment details", "How you get paid", "/member/myaccount?tab=payment", "card", "#A78BFA", "#5B4BFF"],
    ["Privacy & consent", c?.version ? `Signed ${c.version}` : "Your consent record", "/member/myaccount?tab=privacy", "shield", "#34D399", "#047857"],
    ["Help & Support", "FAQs and tickets", "/member/support", "help", "#60A5FA", "#1D4ED8"],
  ];
  return (
    <section aria-labelledby="mx-sc-h" className="mx-rise" style={{ "--i": 6 }}>
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Shortcuts</span><h2 id="mx-sc-h" style={{ marginTop: 6 }}>Jump back in</h2></div></div>
      <div className="mx-shortcuts">
        {items.map(([t, s, href, ic, a, b]) => (
          <Link key={t} href={href} className="mx-short" style={{ "--a": a, "--b": b }}>
            <span className="ic"><Icon name={ic} size={20} /></span><b>{t}</b><span>{s}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { dash } = useMx();
  return (
    <>
      <Hero />
      {dash.error && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />We could not load your dashboard just now. Your data is safe; please refresh the page in a moment.</div>}
      <div data-tour="stats"><Vault /></div>
      <Completion />
      <div className="mx-split">
        <Surveys />
        <Activity />
      </div>
      <Shortcuts />
    </>
  );
}
