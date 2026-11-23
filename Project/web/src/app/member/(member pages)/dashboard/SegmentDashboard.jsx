"use client";
// Top of the member dashboard, one design per panel (HCP, caregiver, patient). Every number and list here comes
// from GET /api/v1/me/dashboard (the member's own records: profile answers, survey responses, consent record).
// Nothing is made up: when the API has no data for a block, the block says so instead of showing an example.
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import s from "./segment.module.css";

const LOOK = {
  hcp: {
    label: "Healthcare professional panel",
    short: "HCP",
    line: "Studies matched to your specialty and practice.",
    nav: [
      ["Surveys for you", "/member/surveys?source=internal", "surveys"],
      ["Professional profile", "/member/profiles", "profile"],
      ["Rewards", "/member/rewards", "rewards"],
      ["Refer a colleague", "/member/referrals", "refer"],
      ["Help & support", "/member/support", "help"],
    ],
  },
  caregiver: {
    label: "Caregiver panel",
    short: "Caregiver",
    line: "Short surveys about caring, at a pace that suits you.",
    nav: [
      ["Surveys for you", "/member/surveys?source=internal", "surveys"],
      ["Caring profile", "/member/profiles", "profile"],
      ["Rewards", "/member/rewards", "rewards"],
      ["Invite another carer", "/member/referrals", "refer"],
      ["Help & support", "/member/support", "help"],
    ],
  },
  patient: {
    label: "Patient panel",
    short: "Patient",
    line: "Share your experience to help improve care.",
    nav: [
      ["Surveys for you", "/member/surveys?source=internal", "surveys"],
      ["Health profile", "/member/profiles", "profile"],
      ["Rewards", "/member/rewards", "rewards"],
      ["Invite a friend", "/member/referrals", "refer"],
      ["Help & support", "/member/support", "help"],
    ],
  },
};

const SHOWN = 7; // profile sections listed before "Show all"
const fmt = (n) => Number(n || 0).toLocaleString();
const day = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "");
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};
const STATUS = { "in-progress": "In progress", completed: "Completed", "not-qualified": "Not qualified", "quota-full": "Quota full" };

function Glyph({ name }) {
  const p = {
    surveys: "M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 5h6M9 13h6M9 17h3",
    profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0",
    rewards: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z",
    refer: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm10-3v6m3-3h-6",
    help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-2.5-13a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14m0 3h.01",
    check: "M20 6 9 17l-5-5",
    clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10 2 2 4-4",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
    star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1z",
  }[name];
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p} />
    </svg>
  );
}

/** Compact illustrated hero art, drawn in SVG so it stays sharp and light. Decorative only. */
function HeroArt({ segment }) {
  if (segment === "hcp")
    return (
      <svg className={s.art} viewBox="0 0 220 160" aria-hidden="true">
        <defs>
          <linearGradient id="h1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#1d4ed8" /></linearGradient>
          <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity=".08" /></linearGradient>
        </defs>
        <rect className={s.floatA} x="24" y="34" width="120" height="96" rx="18" fill="url(#h2)" stroke="#fff" strokeOpacity=".5" />
        <path d="M40 92h18l8-20 12 36 9-24 7 8h34" fill="none" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <g className={s.floatB}>
          <rect x="132" y="18" width="64" height="64" rx="18" fill="url(#h1)" />
          <path d="M164 34v32M148 50h32" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
        </g>
        <circle className={s.floatC} cx="178" cy="122" r="18" fill="#22d3ee" opacity=".85" />
        <circle cx="178" cy="122" r="7" fill="#fff" />
      </svg>
    );
  if (segment === "caregiver")
    return (
      <svg className={s.art} viewBox="0 0 220 160" aria-hidden="true">
        <defs>
          <linearGradient id="c1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6ee7b7" /><stop offset="1" stopColor="#0f766e" /></linearGradient>
          <linearGradient id="c2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fdba9e" /><stop offset="1" stopColor="#f97362" /></linearGradient>
        </defs>
        <path className={s.floatA} d="M40 92 110 38l70 54v50a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8z" fill="url(#c1)" />
        <rect x="94" y="104" width="32" height="46" rx="6" fill="#ecfdf5" opacity=".9" />
        <path className={s.floatB} d="M110 92c-9-12-30-6-26 10 3 11 26 24 26 24s23-13 26-24c4-16-17-22-26-10z" fill="url(#c2)" />
        <circle className={s.floatC} cx="186" cy="40" r="14" fill="#fde68a" />
        <circle cx="30" cy="48" r="8" fill="#a7f3d0" />
      </svg>
    );
  return (
    <svg className={s.art} viewBox="0 0 220 160" aria-hidden="true">
      <defs>
        <linearGradient id="p1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c4b5fd" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
        <linearGradient id="p2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#99f6e4" /><stop offset="1" stopColor="#2dd4bf" /></linearGradient>
      </defs>
      <circle className={s.floatA} cx="96" cy="84" r="58" fill="url(#p1)" opacity=".95" />
      <path className={s.floatB} d="M96 112c-14-14-38-22-32-44 4-14 22-16 32-4 10-12 28-10 32 4 6 22-18 30-32 44z" fill="#f5f3ff" />
      <path d="M58 84h16l8-12 10 22 8-14 6 4h20" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <g className={s.floatC}>
        <path d="M176 26c-24 4-34 26-28 48 22-2 36-22 28-48z" fill="url(#p2)" />
        <path d="M150 72c6-14 14-26 24-36" stroke="#0f766e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Ring({ value }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg className={s.ring} viewBox="0 0 84 84" role="img" aria-label={`Profile ${value}% complete`}>
      <circle cx="42" cy="42" r={r} className={s.ringBg} />
      <circle cx="42" cy="42" r={r} className={s.ringFg} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      <text x="42" y="47" textAnchor="middle">{value}%</text>
    </svg>
  );
}

/** The single most useful next action, from the member's real state. */
function nextStep(d) {
  if (d.journey?.consent?.status && d.journey.consent.status !== "valid")
    return { title: "Sign the updated panel consent", text: "The consent form for your panel has a new version. You need to review it before taking more surveys.", href: d.journey.nextUrl || "/", cta: "Review consent", external: true };
  const resume = d.surveys.inProgress.find((x) => x.resumable);
  if (resume) return { title: `Finish “${resume.name}”`, text: "You started this survey and it is still open.", href: `/survey?name=${encodeURIComponent(resume.slug)}`, cta: "Resume survey" };
  const left = d.profile.next ? Math.max(0, (d.profile.next.total || 0) - (d.profile.next.answered || 0)) : 0;
  if (d.profile.next) return { title: `Complete your ${d.profile.next.name}`, text: `${left} question${left === 1 ? "" : "s"} left in this section. A fuller profile matches you with more studies.`, href: "/member/profiles", cta: "Continue profile" };
  if (d.surveys.available.length) return { title: "A survey is ready for you", text: `${d.surveys.available.length} survey${d.surveys.available.length === 1 ? " matches" : "s match"} your profile right now.`, href: "/member/surveys?source=internal", cta: "See surveys" };
  return { title: "You’re all caught up", text: "Your profile is complete and there are no open surveys for you right now. We’ll email you when one matches.", href: "/member/settings", cta: "Email settings" };
}

export default function SegmentDashboard({ member }) {
  const [d, setD] = React.useState(null);
  const [error, setError] = React.useState("");
  const [allSections, setAllSections] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    api
      .get(`/api/v1/me/dashboard`)
      .then((resp) => {
        if (!live) return;
        if (resp?.status === "success" && resp.data) setD(resp.data);
        else setError(resp?.message || "We could not load your dashboard.");
      })
      .catch(() => live && setError("We could not load your dashboard."));
    return () => {
      live = false;
    };
  }, []);

  if (error)
    return (
      <section className={s.wrap} data-seg="neutral">
        <div className={s.notice} role="alert">{error} The sections below still show your surveys and points.</div>
      </section>
    );
  if (!d)
    return (
      <section className={s.wrap} data-seg="neutral" aria-busy="true">
        <div className={`${s.hero} ${s.skeleton}`} />
      </section>
    );

  const seg = LOOK[d.segment] ? d.segment : "patient";
  const look = LOOK[seg];
  const step = nextStep(d);
  const c = d.surveys.counts;
  const first = d.member.firstName || member?.name?.first || "";

  return (
    <section className={s.wrap} data-seg={seg} aria-label={`${look.label} dashboard`}>
      <header className={s.hero}>
        <div className={s.heroText}>
          <span className={s.badge}>{look.label}</span>
          <h1>
            {greeting()}
            {first ? <>, <span>{first}</span></> : null}
          </h1>
          <p>{look.line}</p>
          <dl className={s.meta}>
            <div><dt>Member ID</dt><dd>{d.member.memberId}</dd></div>
            {d.member.joinedAt && <div><dt>Member since</dt><dd>{day(d.member.joinedAt)}</dd></div>}
            {d.member.qualityScore != null && <div><dt>Quality score</dt><dd>{fmt(d.member.qualityScore)}</dd></div>}
          </dl>
        </div>
        <HeroArt segment={seg} />
      </header>

      <nav className={s.nav} aria-label={`${look.short} shortcuts`}>
        {look.nav.map(([label, href, icon]) => (
          <Link key={href + label} href={href} className={s.navItem}>
            <Glyph name={icon} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className={s.grid}>
        <article className={`${s.card} ${s.next}`}>
          <p className={s.kicker}>Your next step</p>
          <h2>{step.title}</h2>
          <p>{step.text}</p>
          {step.external ? (
            <a className={s.cta} href={step.href}>{step.cta} <Glyph name="arrow" /></a>
          ) : (
            <Link className={s.cta} href={step.href}>{step.cta} <Glyph name="arrow" /></Link>
          )}
        </article>

        <article className={`${s.card} ${s.stats}`} aria-label="Survey activity">
          <Stat label="Available now" value={c.available} icon="surveys" />
          <Stat label="In progress" value={c.inProgress} icon="clock" />
          <Stat label="Completed" value={c.completed} icon="check" />
          <Stat label="Points from surveys" value={d.surveys.pointsEarned} icon="star" />
        </article>

        <article className={`${s.card} ${s.profile}`}>
          <div className={s.cardHead}>
            <h2>Profile</h2>
            <Link href="/member/profiles">Open</Link>
          </div>
          {d.profile.sections.length ? (
            <div className={s.profileBody}>
              <Ring value={d.profile.overall} />
              <ul className={s.sections} id="mho-profile-sections">
                {(allSections ? d.profile.sections : d.profile.sections.slice(0, SHOWN)).map((x) => (
                  <li key={x.slug || x.name}>
                    <span>{x.name}</span>
                    <span className={s.bar} aria-hidden="true"><i style={{ width: `${x.percent}%` }} /></span>
                    <em>{x.status === "complete" ? "Done" : `${x.answered}/${x.total}`}</em>
                  </li>
                ))}
              </ul>
              {d.profile.sections.length > SHOWN && (
                <button type="button" className={s.more} aria-expanded={allSections} aria-controls="mho-profile-sections" onClick={() => setAllSections((v) => !v)}>
                  {allSections ? "Show fewer" : `Show all ${d.profile.sections.length} sections`}
                </button>
              )}
            </div>
          ) : (
            <p className={s.empty}>No profile sections are set up for your panel yet.</p>
          )}
        </article>

        <article className={`${s.card} ${s.surveys}`}>
          <div className={s.cardHead}>
            <h2>Surveys for you</h2>
            <Link href="/member/surveys?source=internal">All surveys</Link>
          </div>
          {d.surveys.available.length ? (
            <ul className={s.list}>
              {d.surveys.available.slice(0, 4).map((x) => (
                <li key={x.slug}>
                  <div>
                    <strong>{x.name}</strong>
                    <span>
                      {x.minutes ? `${x.minutes} min · ` : ""}
                      {fmt(x.points)} points
                    </span>
                  </div>
                  <Link href={`/survey?name=${encodeURIComponent(x.slug)}`} className={s.mini}>Start</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.empty}>No surveys match your profile right now. Completing your profile can unlock more.</p>
          )}
        </article>

        {d.highlights?.length > 0 && (
          <article className={`${s.card} ${s.highlights}`}>
            <div className={s.cardHead}><h2>From your profile</h2></div>
            <dl>
              {d.highlights.map((h) => (
                <div key={h.question}>
                  <dt>{h.label}</dt>
                  <dd>{h.value || <span className={s.muted}>Not answered yet</span>}</dd>
                </div>
              ))}
            </dl>
          </article>
        )}

        <article className={`${s.card} ${s.updates}`}>
          <div className={s.cardHead}><h2>Updates</h2></div>
          {d.notifications.length ? (
            <ul className={s.feed}>
              {d.notifications.map((n, i) => (
                <li key={n.kind + i} data-level={n.level}>
                  <Glyph name={n.level === "done" ? "shield" : "bell"} />
                  <span>{n.text}{n.at ? ` ${day(n.at)}.` : ""}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.empty}>Nothing new.</p>
          )}
        </article>

        <article className={`${s.card} ${s.consent}`}>
          <div className={s.cardHead}><h2>Consent</h2></div>
          {d.consent.action === "accept" ? (
            <dl>
              <div><dt>Status</dt><dd className={d.consent.version === d.consent.current ? s.ok : s.warn}>{d.consent.version === d.consent.current ? "Signed, current version" : "Signed an older version"}</dd></div>
              <div><dt>Version</dt><dd>{d.consent.version}</dd></div>
              <div><dt>Signed</dt><dd>{day(d.consent.at)}</dd></div>
              <div><dt>Reference</dt><dd className={s.mono}>{d.consent.consentId}</dd></div>
            </dl>
          ) : (
            <p className={s.empty}>No consent on record for version {d.consent.current}.</p>
          )}
          <p className={s.small}>To change your optional choices or withdraw, contact support from Help &amp; support.</p>
        </article>

        <article className={`${s.card} ${s.history}`}>
          <div className={s.cardHead}><h2>Recent activity</h2></div>
          {d.surveys.history.length ? (
            <ul className={s.list}>
              {d.surveys.history.slice(0, 5).map((h, i) => (
                <li key={(h.slug || "") + i}>
                  <div>
                    <strong>{h.name}</strong>
                    <span>{day(h.endedAt || h.startedAt)}</span>
                  </div>
                  <em className={s.pill} data-st={h.status}>{STATUS[h.status] || h.status}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.empty}>You haven’t taken a survey yet.</p>
          )}
        </article>
      </div>
    </section>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className={s.stat}>
      <span className={s.statIc}><Glyph name={icon} /></span>
      <strong>{fmt(value)}</strong>
      <span>{label}</span>
    </div>
  );
}
