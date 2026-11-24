"use client";
// Pieces shared by several member pages: the page head, the panel's rewards vault, profile cards and survey tiles.
import React from "react";
import Scene3D from "./Scene3D";
import Link from "next/link";
import { useMx } from "./data";
import { Icon, Meter, useCountUp, cap } from "./kit";
import { sectionArt, artByName } from "./art";
import { metaOf } from "./catalog";

const TITLE_KEY = { "My Profile": "profile", Surveys: "surveys", Rewards: "rewards", Referrals: "referrals", Notifications: "notifications", "My Account": "account", "Help & Support": "help" };

export function PageHead({ icon, title: en, lead, facts = [], art, children }) {
  const { t, panel } = useMx();
  const title = TITLE_KEY[en] ? t(TITLE_KEY[en]) : en;
  const flat = art ? <div className="art" aria-hidden="true"><img src={art} alt="" width="160" height="160" /></div> : null;
  return (
    <section className="mx-head mx-rise" aria-labelledby="mx-page-title">
      <div>
        <nav className="mx-crumb" aria-label="Breadcrumb"><Link href="/member/dashboard">{t("dashboard")}</Link><Icon name="chev" size={13} /><span aria-current="page">{title}</span></nav>
        <h1 id="mx-page-title"><span className="ic"><Icon name={icon} size={26} /></span>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {facts.length > 0 && (
          <div className="mx-facts">
            {facts.map(([k, v]) => <div className="mx-fact" key={k}><small>{k}</small><b>{v}</b></div>)}
          </div>
        )}
        {children}
      </div>
      <div className="art art3d"><span className="halo" aria-hidden="true" /><Scene3D panel={panel} compact label="Animated 3D emblem of your panel" fallback={flat} /></div>
    </section>
  );
}

export const sectionTitle = (s) => cap(String(s?.name || s?.slug || "").replace(/\bprofile$/i, "").trim() || s?.name || "");
export const sectionHref = (s) => `/member/profiles?open=${encodeURIComponent(s.slug)}`;
const statusLabel = { complete: "Complete", "in-progress": "In progress", "not-started": "New" };

/** One card per profile section, from the member's real answers (answered / total). */
export function ProfileCards({ sections, limit }) {
  const { panel, P } = useMx();
  const list = limit ? sections.slice(0, limit) : sections;
  const tilt = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height) - 0.5) * -6}deg`);
    el.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width) - 0.5) * 8}deg`);
  };
  const untilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  return (
    <div className="mx-pcards">
      {list.map((s, i) => {
        const idx = sections.indexOf(s);
        const meta = metaOf(panel, s);
        const [p1, p2] = meta?.p || P.palettes[idx % P.palettes.length];
        const pct = s.total ? s.answered / s.total : 0;
        const done = s.status === "complete";
        const img = (meta?.id && artByName(panel, meta.id)) || sectionArt(panel, s.slug, s.name);
        const title = meta?.title || sectionTitle(s);
        const label = done ? "Review" : s.answered ? "Continue" : "Start";
        const num = `${panel === "hcp" ? "P" : "Profile"}-${String(idx + 1).padStart(2, "0")}`;
        const metaRow = <span className="meta"><span>{s.answered} of {s.total} answered</span><b>{Math.round(pct * 100)}%</b></span>;
        const body = panel === "caregiver" ? (
          <>
            <div className="txt">
              <div className="top"><span className="tagl">{num}</span><span className="st">{statusLabel[s.status] || "New"}</span></div>
              <span className="fl">{meta?.flavor || "About you"}</span>
              <h3>{title}</h3>{meta?.blurb && <p className="blurb">{meta.blurb}</p>}
              {metaRow}
              <Meter value={pct} label={`${title} progress`} />
              <span className="go">{label} <Icon name="arrow" size={14} /></span>
            </div>
            <div className="stamp" aria-hidden="true"><img src={img} alt="" width="120" height="120" />{done && <span className="pm">DONE<br />✓</span>}</div>
          </>
        ) : (
          <>
            <div className="top"><span className="tagl">{num}</span><span className="st">{statusLabel[s.status] || "New"}</span></div>
            <div className="pic" aria-hidden="true"><img src={img} alt="" width="100" height="100" /></div>
            <span className="fl">{meta?.flavor || "About you"}</span>
            <h3>{title}</h3>{meta?.blurb && <p className="blurb">{meta.blurb}</p>}
            {metaRow}
            <Meter value={pct} label={`${title} progress`} />
            <span className="go">{label} <Icon name="arrow" size={14} /></span>
          </>
        );
        return (
          <Link key={s.slug} href={sectionHref(s)} className={`mx-pcard${done ? " done" : ""}`} style={{ "--p1": p1, "--p2": p2, "--i": i }} onPointerMove={tilt} onPointerLeave={untilt}
            aria-label={`${title}: ${s.answered} of ${s.total} answered. ${label}`}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}

/** Surveys the API lists as available to this member (name, points, minutes). Start goes to the real survey runner. */
export function SurveyTiles({ list, resume }) {
  return (
    <div className="mx-surveys">
      {list.map((s, i) => (
        <article className="mx-stile" key={s.slug} style={{ "--i": i }}>
          <span className="mx-eyebrow" style={{ color: "inherit", opacity: .85 }}>{resume ? "In progress" : s.source === "external" ? "Partner survey" : "Research survey"}</span>
          <h3>{s.name}</h3>
          {s.summary && <p>{s.summary}</p>}
          <div className="row">
            {Number(s.points) > 0 && <span className="mx-chip gold"><Icon name="coin" size={13} />{Number(s.points).toLocaleString()} pts</span>}
            {Number(s.minutes) > 0 && <span className="mx-chip teal"><Icon name="clock" size={13} />~{s.minutes} min</span>}
          </div>
          <a className="mx-btn sm" href={`/survey?name=${encodeURIComponent(s.slug)}`}>{resume ? "Continue" : "Start survey"} <Icon name="arrow" size={14} /></a>
          <span className="orb" aria-hidden="true"><Icon name={resume ? "clock" : "surveys"} size={24} /></span>
        </article>
      ))}
    </div>
  );
}

// ---- vault art per panel ----------------------------------------------------------------------------------------------
function Genome({ sections }) {
  const n = Math.max(sections.length, 1), W = 1000, H = 150;
  const x = (i) => 50 + (i * (W - 100)) / Math.max(n - 1, 1);
  const wave = (ph) => Array.from({ length: 101 }, (_, k) => { const t = k / 100; return `${k ? "L" : "M"}${(50 + t * (W - 100)).toFixed(1)} ${(H / 2 + Math.sin(t * Math.PI * 4 + ph) * 38).toFixed(1)}`; }).join(" ");
  return (
    <svg className="mx-dna" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`${sections.filter((s) => s.status === "complete").length} of ${sections.length} profiles complete`}>
      <defs><linearGradient id="mxDnaA" x1="0" x2="1"><stop offset="0" stopColor="#2EE6C5" /><stop offset="1" stopColor="#22C3F5" /></linearGradient><linearGradient id="mxDnaB" x1="0" x2="1"><stop offset="0" stopColor="#8B7CFF" /><stop offset="1" stopColor="#FF5A78" /></linearGradient></defs>
      <path className="strand" d={wave(0)} stroke="url(#mxDnaA)" />
      <path className="strand" d={wave(Math.PI)} stroke="url(#mxDnaB)" style={{ animationDelay: ".3s" }} />
      {sections.map((s, i) => {
        const t = (x(i) - 50) / (W - 100), y1 = H / 2 + Math.sin(t * Math.PI * 4) * 38, y2 = H / 2 + Math.sin(t * Math.PI * 4 + Math.PI) * 38;
        const on = s.status === "complete", mid = s.status === "in-progress";
        return (
          <g key={s.slug}>
            <line x1={x(i)} x2={x(i)} y1={y1} y2={y2} stroke="rgba(160,190,255,.25)" strokeWidth="2" />
            <circle className="node" cx={x(i)} cy={H / 2} r={on ? 13 : 10} fill={on ? "#2EE6C5" : mid ? "#FFB020" : "#1E2A60"} stroke={on ? "#fff" : "rgba(160,190,255,.5)"} strokeWidth="2" />
            <text x={x(i)} y={H - 6} textAnchor="middle">{String(i + 1).padStart(2, "0")}</text>
          </g>
        );
      })}
    </svg>
  );
}
function Circle({ sections, surveys }) {
  const beads = [...sections.map((s) => s.status), ...Array.from({ length: Math.max(0, surveys) }, () => "complete")];
  const n = Math.max(beads.length, 1);
  return (
    <svg className="mx-beads" viewBox="0 0 400 230" role="img" aria-label={`${beads.filter((b) => b === "complete").length} of ${n} beads lit`}>
      <defs><radialGradient id="mxBead" cx=".35" cy=".3"><stop offset="0" stopColor="#FFF0C4" /><stop offset=".55" stopColor="#FF7A59" /><stop offset="1" stopColor="#9B1E4E" /></radialGradient></defs>
      <g className="ring">
        <circle cx="200" cy="115" r="88" fill="none" stroke="rgba(255,214,230,.25)" strokeWidth="2" strokeDasharray="4 7" />
        {beads.map((b, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={200 + Math.cos(a) * 88} cy={115 + Math.sin(a) * 88} r={b === "complete" ? 13 : 10} fill={b === "complete" ? "url(#mxBead)" : b === "in-progress" ? "#B06AB3" : "rgba(255,233,220,.14)"} stroke="rgba(255,240,230,.5)" strokeWidth="1.5" />;
        })}
      </g>
      <path d="M200 150C200 150 160 126 160 100 160 86 170 76 182 76c8 0 14 4 18 10 4-6 10-10 18-10 12 0 22 10 22 24 0 26-40 50-40 50z" fill="url(#mxBead)" stroke="#FFE3D6" strokeWidth="2" />
    </svg>
  );
}
function Pulse({ sections }) {
  const n = Math.max(sections.length, 1), W = 1000;
  let d = "M0 60";
  for (let i = 0; i < n; i += 1) {
    const x0 = (i * W) / n, w = W / n, on = sections[i]?.status === "complete", mid = sections[i]?.status === "in-progress";
    const h = on ? 46 : mid ? 26 : 8;
    d += ` L${x0 + w * .3} 60 L${x0 + w * .4} ${60 - h} L${x0 + w * .5} ${60 + h * .6} L${x0 + w * .6} 60 L${x0 + w} 60`;
  }
  return (
    <svg className="mx-ecg" viewBox={`0 0 ${W} 120`} preserveAspectRatio="none" role="img" aria-label={`${sections.filter((s) => s.status === "complete").length} of ${sections.length} profiles complete`}>
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={i * 100} x2={i * 100} y1="0" y2="120" stroke="rgba(255,255,255,.05)" />)}
      <path className="line" d={d} />
    </svg>
  );
}

export function Vault({ compact }) {
  const { panel, P, d, balance, member } = useMx();
  const sections = d?.profile?.sections || [];
  const done = sections.filter((s) => s.status === "complete").length;
  const pts = useCountUp(balance.points);
  const qs = Number(member?.qualityScore) || 0;
  const surveysDone = d?.surveys?.counts?.completed || 0;
  const left = balance.threshold ? Math.max(0, balance.threshold - balance.points) : 0;
  const next = d?.profile?.next;
  return (
    <section className="mx-vault mx-rise" aria-labelledby="mx-vault-h" style={{ "--i": 2 }}>
      <span className="mx-eyebrow">Your rewards</span>
      <h2 id="mx-vault-h" style={{ marginTop: 6 }}>{P.vault}</h2>
      {!compact && <p className="sub">{P.vaultSub}</p>}
      <div className="mx-vtiles">
        <div className="mx-vtile"><small>Reward points</small><b><span className="mx-coin"><Icon name="coin" size={15} /></span>{pts.toLocaleString()}</b><span>{balance.rate ? `Worth about $${(balance.points * balance.rate).toFixed(2)}` : "Points balance"}</span></div>
        <div className="mx-vtile"><small>Quality score</small><b><span className="mx-qs"><Icon name="heart" size={14} /></span>{qs}</b><span>Shown on your member record</span></div>
        <div className="mx-vtile"><small>{panel === "hcp" ? "Genome sequenced" : panel === "caregiver" ? "Beads lit" : "Profiles complete"}</small><b>{done}<span style={{ fontSize: 15, color: "var(--v-muted)" }}> / {sections.length || "—"}</span></b><Meter value={sections.length ? done / sections.length : 0} label="Profiles complete" /></div>
        <div className="mx-vtile"><small>{left > 0 ? "Left to redeem" : "Surveys completed"}</small><b>{left > 0 ? left.toLocaleString() : surveysDone}</b><span>{left > 0 ? `${balance.threshold.toLocaleString()} points unlock a payout request` : "Completed research surveys"}</span></div>
      </div>
      {!compact && sections.length > 0 && (
        <div className="mx-vart" aria-hidden={false}>
          {panel === "hcp" && <Genome sections={sections} />}
          {panel === "caregiver" && <Circle sections={sections} surveys={surveysDone} />}
          {panel === "patient" && <Pulse sections={sections} />}
        </div>
      )}
      {next && (
        <Link className="mx-vnext" href={sectionHref(next)}>
          <span><small>{panel === "hcp" ? "Sequence your next gene" : panel === "caregiver" ? "Light your next bead" : "Next step"}</small>{sectionTitle(next)} · {next.answered} of {next.total} answered</span>
          <Icon name="arrow" />
        </Link>
      )}
    </section>
  );
}
