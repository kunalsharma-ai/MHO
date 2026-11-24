"use client";
// One centrepiece per panel, so the three dashboards do not share a layout:
//   HCP        Research console: monospace read-outs and a section matrix, like a clinical monitor
//   Caregiver  Circle of care: one bead per profile around the member, like a handmade bracelet
//   Patient    Journey path: a winding road with one stop per profile
// Every value comes from the dashboard API (d.profile, d.surveys) and the member record. Nothing is invented.
import React from "react";
import Link from "next/link";
import { useMx } from "../data";
import { Icon, useCountUp } from "../kit";
import { sectionTitle, sectionHref } from "../parts";
import { sectionArt } from "../art";

const pctOf = (s) => (s.total ? s.answered / s.total : s.status === "complete" ? 1 : 0);
const useSections = () => {
  const { d } = useMx();
  const secs = d?.profile?.sections || [];
  const done = secs.filter((s) => s.status === "complete").length;
  const next = secs.find((s) => s.status !== "complete") || null;
  return { secs, done, next, overall: d?.profile?.overall ?? 0 };
};

/* ---------------------------------------------------------------- HCP: research console */
export function ResearchConsole() {
  const { d, member } = useMx();
  const { secs, done, next, overall } = useSections();
  const counts = d?.surveys?.counts || {};
  const o = useCountUp(overall);
  if (!secs.length) return null;
  const reads = [
    ["PROFILE", `${o}%`, "of all profile questions"],
    ["SECTIONS", `${done}/${secs.length}`, "profiles complete"],
    ["STUDIES", String(counts.completed ?? 0), "surveys completed"],
    ["OPEN", String(counts.available ?? 0), "surveys for you now"],
    ["QS", String(Number(member?.qualityScore) || 0), "quality score"],
  ];
  return (
    <section className="mx-sig mx-console" aria-labelledby="mx-con-h">
      <header>
        <span className="dot" aria-hidden="true" />
        <h2 id="mx-con-h">Research console</h2>
        <small>{next ? <>Next: <Link href={sectionHref(next)}>{sectionTitle(next)}</Link></> : "Every profile is complete"}</small>
      </header>
      <div className="ecg" aria-hidden="true"><svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 20 H60 L70 8 L80 32 L90 20 H150 L158 4 L168 36 L176 20 H260 L268 12 L276 28 L284 20 H400" /></svg><svg viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 20 H60 L70 8 L80 32 L90 20 H150 L158 4 L168 36 L176 20 H260 L268 12 L276 28 L284 20 H400" /></svg></div>
      <dl className="reads">
        {reads.map(([k, v, h], i) => (
          <div key={k} style={{ "--i": i }}><dt>{k}</dt><dd>{v}</dd><small>{h}</small></div>
        ))}
      </dl>
      <ol className="matrix" aria-label="Profile sections">
        {secs.map((s, i) => (
          <li key={s.slug} style={{ "--i": i, "--p": pctOf(s) }} className={s.status === "complete" ? "ok" : s.answered ? "part" : ""}>
            <Link href={sectionHref(s)} title={`${sectionTitle(s)}: ${s.answered}/${s.total}`}>
              <span className="code">S{String(i + 1).padStart(2, "0")}</span>
              <span className="nm">{sectionTitle(s)}</span>
              <span className="bar" aria-hidden="true"><i /></span>
              <span className="val">{s.status === "complete" ? "DONE" : `${s.answered}/${s.total}`}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- Caregiver: circle of care */
export function CircleOfCare() {
  const { panel, member, d } = useMx();
  const { secs, done, next } = useSections();
  if (!secs.length) return null;
  const n = secs.length;
  const R = 41;
  const at = (i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return [50 + R * Math.cos(a), 50 + R * Math.sin(a)]; };
  const name = member?.name?.first || d?.member?.firstName || "You";
  return (
    <section className="mx-sig mx-circle" aria-labelledby="mx-cc-h">
      <div className="ring">
        <svg viewBox="0 0 100 100" role="img" aria-label={`${done} of ${n} profiles complete`}>
          <circle className="thread" cx="50" cy="50" r={R} />
          {secs.map((s, i) => {
            const [x, y] = at(i);
            return (
              <g key={s.slug} className={`bead ${s.status === "complete" ? "ok" : s.answered ? "part" : ""}`} style={{ "--i": i }} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}>
                <circle r="6.2" className="b" />
                {s.status !== "complete" && s.answered > 0 && <circle r="6.2" className="arc" pathLength="1" style={{ strokeDasharray: `${pctOf(s).toFixed(3)} 1` }} />}
                {s.status === "complete" && <path d="M-2.6 0 L-0.6 2 L2.8 -1.8" className="tick" />}
              </g>
            );
          })}
        </svg>
        <div className="mid"><b>{done}</b><small>of {n}</small><em>{name}</em></div>
      </div>
      <div className="txt">
        <span className="mx-eyebrow">Your circle of care</span>
        <h2 id="mx-cc-h">{done === n ? "Every bead is in place" : `${n - done} bead${n - done === 1 ? "" : "s"} left to thread`}</h2>
        <p>Each bead is one part of your profile. A full circle helps us invite you to the studies that fit your care story.</p>
        <ul>
          {secs.map((s, i) => (
            <li key={s.slug} style={{ "--i": i }} className={s.status === "complete" ? "ok" : ""}>
              <Link href={sectionHref(s)}><img src={sectionArt(panel, s.slug, s.name)} alt="" width="28" height="28" /><span>{sectionTitle(s)}</span><small>{s.status === "complete" ? "Done" : s.answered ? `${Math.round(pctOf(s) * 100)}%` : "Start"}</small></Link>
            </li>
          ))}
        </ul>
        {next && <Link className="mx-btn" href={sectionHref(next)}>Continue with {sectionTitle(next)} <Icon name="arrow" size={15} /></Link>}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Patient: journey path */
export function JourneyPath() {
  const { panel } = useMx();
  const { secs, done, next } = useSections();
  const track = React.useRef(null);
  React.useEffect(() => {
    // bring the next stop into view on narrow screens
    const el = track.current?.querySelector(".stop.now");
    if (el && track.current.scrollWidth > track.current.clientWidth) track.current.scrollLeft = Math.max(0, el.offsetLeft - track.current.clientWidth / 2 + el.clientWidth / 2);
  }, [secs.length, next?.slug]);
  if (!secs.length) return null;
  const W = 120; // px per stop
  const width = secs.length * W;
  const y = (i) => (i % 2 ? 78 : 34);
  const d = secs.map((_, i) => {
    const x = i * W + W / 2;
    if (!i) return `M ${x} ${y(i)}`;
    const px = (i - 1) * W + W / 2;
    return `C ${px + W / 2} ${y(i - 1)}, ${x - W / 2} ${y(i)}, ${x} ${y(i)}`;
  }).join(" ");
  const doneIdx = secs.findIndex((s) => s.status !== "complete");
  const upto = doneIdx < 0 ? secs.length : doneIdx;
  return (
    <section className="mx-sig mx-journey" aria-labelledby="mx-jp-h">
      <div className="hd">
        <div><span className="mx-eyebrow">Your health journey</span><h2 id="mx-jp-h">{done === secs.length ? "You reached the end of the path" : `Stop ${upto + 1} of ${secs.length}`}</h2></div>
        <span className="pill"><Icon name="check" size={14} stroke={3} /> {done} complete</span>
      </div>
      <div className="track" ref={track}>
        <div className="road" style={{ width }}>
          <svg viewBox={`0 0 ${width} 112`} width={width} height="112" aria-hidden="true">
            <path d={d} className="base" />
            <path d={d} className="walked" pathLength="1" style={{ strokeDasharray: `${(secs.length > 1 ? Math.max(0, upto - 0.5) / (secs.length - 1) : 1).toFixed(3)} 1` }} />
          </svg>
          {secs.map((s, i) => (
            <Link key={s.slug} href={sectionHref(s)} className={`stop ${s.status === "complete" ? "ok" : ""} ${next && s.slug === next.slug ? "now" : ""}`} style={{ left: i * W + W / 2, top: y(i), "--i": i }} aria-label={`${sectionTitle(s)}: ${s.status === "complete" ? "complete" : `${s.answered} of ${s.total} answered`}`}>
              <span className="pin"><img src={sectionArt(panel, s.slug, s.name)} alt="" width="30" height="30" />{s.status === "complete" && <i><Icon name="check" size={10} stroke={3.5} /></i>}</span>
              <small>{sectionTitle(s)}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
