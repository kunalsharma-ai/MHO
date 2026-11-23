"use client";
// Member dashboard, one look per panel (HCP, caregiver, patient), same layout as before: greeting, stat cards,
// surveys, activity; plus profile journey, rewards and quality, updates, consent and account.
// Every number and list comes from the member's own records:
//   GET /api/v1/me/dashboard   profile sections, matched surveys, history, consent, updates
//   GET /api/v1/me/statistics  surveys taken / completed / not qualified, points, rewards claimed
//   GET /api/v1/me/survey      counts for "Your surveys" and "Daily surveys"
//   reward balance             fetchRewardBalance (shared with the header through BalanceCtx)
// When a block has no data it says so; nothing is filled in with examples.
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import Icon from "./Icon";
import Scene from "./Scene";
import { useStudio, useCountUp, PALETTES, SIGNATURE, BalanceCtx, PANEL_ICON, greetingKey } from "./StudioContext";
import { art } from "./art";
import { useCelebrations, CelebrationCard } from "./Celebrate";

const SHOWN = 6; // profile sections listed before "Show all"
const fmt = (n) => Number(n || 0).toLocaleString();
const day = (d) => (d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "");
const ST = { "in-progress": "inProgress", completed: "completed", "not-qualified": "disqualified", "quota-full": "disqualified" };
const PROFILE_NAME = { hcp: "Professional profile", caregiver: "Caring profile", patient: "Health profile" };

async function get(url) {
  try { const r = await api.get(url); return r && r.status !== "error" ? r.data ?? null : null; } catch { return null; }
}

/** Adds .is-in to every .ms-reveal block inside the dashboard once it scrolls into view. */
function useReveal(ready) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const els = ref.current ? [...ref.current.querySelectorAll(".ms-reveal")] : [];
    if (typeof IntersectionObserver === "undefined") { els.forEach((e) => e.classList.add("is-in")); return undefined; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ready]);
  return ref;
}

function Ring({ pct, size = 46, stroke, children, className = "ring" }) {
  const r = (size - (stroke || 8)) / 2, c = 2 * Math.PI * r;
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { const id = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(id); }, []);
  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle className="t" cx={size / 2} cy={size / 2} r={r} />
      <circle className="v" cx={size / 2} cy={size / 2} r={r} strokeDasharray={c} strokeDashoffset={on ? c * (1 - Math.max(0, Math.min(100, pct)) / 100) : c} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">{children}</text>
    </svg>
  );
}

function Stat({ label, value, img, tone, note, i }) {
  const [v, ref] = useCountUp(value);
  const tilt = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty("--tx", `${(((e.clientY - r.top) / r.height) - 0.5) * -10}deg`);
    el.style.setProperty("--ty", `${(((e.clientX - r.left) / r.width) - 0.5) * 12}deg`);
  };
  const reset = (e) => { e.currentTarget.style.setProperty("--tx", "0deg"); e.currentTarget.style.setProperty("--ty", "0deg"); };
  return (
    <div className="ms-stat ms-reveal" ref={ref} style={{ "--tone": tone, "--i": i }} onPointerMove={tilt} onPointerLeave={reset}>
      <span className="ic3d"><img src={img} alt="" width="64" height="64" decoding="async" /></span>
      {note && <em>{note}</em>}
      <b>{fmt(v)}</b>
      <span>{label}</span>
    </div>
  );
}

function nextStep(d, t) {
  const c = d.journey?.consent;
  if (c?.status && c.status !== "valid")
    return { title: "Review the updated panel consent", text: "The consent form for your panel has a new version. Please review it before taking more surveys.", href: d.journey.nextUrl || "/", cta: t("review"), pct: 0, external: true };
  const resume = (d.surveys?.inProgress || []).find((x) => x.resumable);
  if (resume) return { title: resume.name, text: "You started this survey and it is still open.", href: `/survey?name=${encodeURIComponent(resume.slug)}`, cta: t("resume"), pct: d.profile?.overall || 0 };
  const n = d.profile?.next;
  if (n) { const left = Math.max(0, (n.total || 0) - (n.answered || 0)); return { title: n.name, text: `${left} ${t("leftToGo")}`, href: "/member/profiles", cta: t("continue"), pct: n.percent || 0 }; }
  if (d.surveys?.available?.length) return { title: t("surveysForYou"), text: `${d.surveys.available.length} · ${t("matched")}`, href: "/member/surveys?source=internal", cta: t("viewSurveys"), pct: 100 };
  return { title: t("profileComplete"), text: t("nextDone"), href: "/member/surveys", cta: t("allSurveys"), pct: 100 };
}

function Hero({ d, member }) {
  const { t, segment } = useStudio();
  const step = nextStep(d, t);
  const first = d.member?.firstName || member?.name?.first || "";
  const Cta = step.external ? "a" : Link;
  return (
    <section className="ms-hero" data-tour="greeting" aria-label={t(`${segment}Panel`)}>
      <img className="ms-hero-bg" src={art(segment, "hero-welcome")} alt="" aria-hidden="true" decoding="async" />
      <div>
        <span className="ms-hero-tag"><i><Icon name={PANEL_ICON[segment]} size={15} /></i>{t(`${segment}Panel`)}</span>
        <h1>{t(greetingKey())} <span className="wave" aria-hidden="true">👋</span>{first && <span>{first}</span>}</h1>
        <p className="lead">{t(`${segment}Line`)}</p>
        <div className="ms-next">
          <Ring pct={step.pct} size={62} stroke={7}>{`${step.pct}%`}</Ring>
          <div style={{ minWidth: 0 }}>
            <small>{t("nextStep")}</small>
            <b>{step.title}</b>
            <span>{step.text}</span>
          </div>
          <Cta className="ms-btn sm" href={step.href}>{step.cta} <Icon name="arrow" size={15} /></Cta>
        </div>
        <div className="ms-hero-cta">
          <Link className="ms-btn ghost sm" href="/member/profiles"><Icon name="profile" size={16} />{t("viewProfile")}</Link>
          <Link className="ms-btn ghost sm" href="/member/surveys"><Icon name="surveys" size={16} />{t("viewSurveys")}</Link>
        </div>
      </div>
      <Scene segment={segment} percent={d.profile?.overall || 0} />
    </section>
  );
}

function Stats({ stats, rate }) {
  const { t, segment } = useStudio();
  const im = (n) => art(segment, `icon-${n}`);
  const s = stats || {};
  const usd = (Number(s.points || 0) * rate).toFixed(2);
  return (
    <section className="ms-stats" data-tour="stats" aria-label={t("participated")}>
      <Stat i={0} label={t("participated")} value={s.total} img={im("doc")} tone="#3b82f6" />
      <Stat i={1} label={t("completed")} value={s.complete} img={im("check")} tone="#12b76a" />
      <Stat i={2} label={t("disqualified")} value={s.disqualified} img={im("cross")} tone="#f04438" />
      <Stat i={3} label={t("earned")} value={s.points} img={im("coin")} tone="#f59e0b" note={`$${usd}`} />
      <Stat i={4} label={t("claimed")} value={Math.round(Number(s.claimed || 0) / 100)} img={im("gift")} tone="#8b5cf6" note="USD" />
    </section>
  );
}

function Journey({ d, onPlay }) {
  const { t, segment } = useStudio();
  const [all, setAll] = React.useState(false);
  const p = d.profile || {};
  const secs = p.sections || [];
  const done = secs.filter((s) => s.status === "complete").length;
  const shown = all ? secs : secs.slice(0, SHOWN);
  return (
    <article className="ms-card ms-reveal" aria-labelledby="ms-journey">
      <h2 className="ms-h2" id="ms-journey"><span className="ic"><Icon name="target" /></span>{t("profileJourney")}<span className="sp" />
        <Link className="ms-link" href="/member/profiles" aria-label={PROFILE_NAME[segment]}><span className="lbl">{PROFILE_NAME[segment]}</span> <Icon name="arrow" size={14} /></Link>
      </h2>
      {!p.configured && !secs.length ? <p className="ms-empty">Your panel’s profile sections are not set up yet.</p> : (
        <>
          <div className="ms-overall">
            <div><b>{p.overall || 0}%</b><small>{t("overall")} · {done}/{secs.length} {t("sectionsDone")}</small></div>
            <div className="track"><i style={{ "--p": (p.overall || 0) / 100 }} /></div>
            {p.overall >= 100 && <button type="button" className="ms-btn sm" onClick={onPlay}><Icon name="trophy" size={16} />{t("celebrate")}</button>}
          </div>
          <div className="ms-secs">
            {shown.map((s, i) => (
              <Link key={s.slug || s.name} href="/member/profiles" className="ms-sec" data-st={s.status} style={{ "--i": i }}>
                <Ring pct={s.percent || 0} size={46} stroke={5}>{`${s.percent || 0}%`}</Ring>
                <span style={{ minWidth: 0 }}>
                  <b>{s.name}</b>
                  <span>{s.answered}/{s.total} {t("questions")} · {t(s.status === "complete" ? "done" : s.status === "in-progress" ? "inProgress" : "notStarted")}</span>
                </span>
                {s.status === "complete" && <span className="stamp" aria-hidden="true"><Icon name="check" size={15} stroke={3} /></span>}
              </Link>
            ))}
          </div>
          {secs.length > SHOWN && <button type="button" className="ms-more" aria-expanded={all} onClick={() => setAll(!all)}>{all ? t("showFewer") : `${t("showAll")} (${secs.length})`}</button>}
        </>
      )}
    </article>
  );
}

function Highlights({ d }) {
  const { t } = useStudio();
  const h = (d.highlights || []).slice(0, 5);
  return (
    <article className="ms-card ms-reveal" style={{ "--i": 1 }} aria-labelledby="ms-hl">
      <h2 className="ms-h2" id="ms-hl"><span className="ic"><Icon name="user" /></span>{t("fromProfile")}</h2>
      <p className="ms-muted" style={{ margin: "-8px 0 14px", fontSize: 13.5 }}>{t("answersFromProfile")}</p>
      {h.length ? (
        <dl className="ms-highlights">
          {h.map((x) => <div key={x.question}><dt>{x.label}</dt><dd>{x.value || <span className="ms-muted" style={{ fontWeight: 500 }}>{t("notAnswered")}</span>}</dd></div>)}
        </dl>
      ) : <p className="ms-empty">{t("notAnswered")}</p>}
    </article>
  );
}

function Surveys({ d, counts }) {
  const { t, segment } = useStudio();
  const list = d.surveys?.available || [];
  const src = [
    ["internal", t("yourSurvey"), t("internalText"), counts?.internal],
    ["external", t("dailySurvey"), t("externalText"), counts?.external],
  ];
  const chip = (base, filter, label, n, tone) => (
    <Link href={`/member/surveys?source=${base}${filter ? `&filter=${encodeURIComponent(filter)}` : ""}`} style={{ "--tone": tone }}>
      <b>{fmt(n)}</b><span>{label}</span>
    </Link>
  );
  return (
    <article className="ms-card ms-reveal" data-tour="surveys" aria-labelledby="ms-sv">
      <h2 className="ms-h2" id="ms-sv"><span className="ic"><Icon name="surveys" /></span>{t("surveysForYou")}<span className="sp" />
        <Link className="ms-link" href="/member/surveys" aria-label={t("allSurveys")}><span className="lbl">{t("allSurveys")}</span> <Icon name="arrow" size={14} /></Link>
      </h2>
      <div className="ms-srcs">
        {src.map(([k, name, text, c]) => (
          <div className="ms-src" key={k}>
            <span className="orbit-deco" aria-hidden="true" />
            <h3><Icon name={k === "internal" ? "target" : "bolt"} size={18} />{name}</h3>
            <p>{text}</p>
            <div className="ms-chips">
              {chip(k, null, t("allNew"), c?.all ?? 0, "#3b82f6")}
              {chip(k, "High Reward Surveys", t("highReward"), c?.highRewards ?? 0, "#a855f7")}
              {chip(k, "Short Surveys", t("short"), c?.short ?? 0, "#10b981")}
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ margin: "0 0 10px", fontSize: 15 }}>{t("matched")}</h3>
      {list.length ? (
        <ul className="ms-list">
          {list.slice(0, 5).map((x) => (
            <li key={x.slug} className="ms-survey">
              <span className="ic img"><img src={art(segment, "disc-survey")} alt="" width="48" height="48" loading="lazy" /></span>
              <span className="tx">
                <b>{x.name}</b>
                <span className="meta">
                  {x.points ? <span className="ms-tag pts"><Icon name="coin" size={12} />{fmt(x.points)} {t("ptsShort")}</span> : null}
                  {x.minutes ? <span className="ms-tag"><Icon name="clock" size={12} />{x.minutes} {t("minutes")}</span> : null}
                </span>
              </span>
              <Link className="ms-btn sm" href={`/survey?name=${encodeURIComponent(x.slug)}`}>{t("start")}</Link>
            </li>
          ))}
        </ul>
      ) : <p className="ms-empty">{t("noSurveys")}</p>}
    </article>
  );
}

function RewardsQuality({ member }) {
  const { t, segment } = useStudio();
  const bal = React.useContext(BalanceCtx);
  const q = Number(member?.qualityScore) || 0, qt = Number(member?.qualityScoreTotal) || 0;
  const qp = qt > 0 ? Math.min(100, Math.round((q / qt) * 100)) : q > 0 ? 100 : 0;
  const p = bal.threshold ? Math.min(1, bal.points / bal.threshold) : 0;
  const left = Math.max(0, bal.threshold - bal.points);
  const [pts, ref] = useCountUp(bal.points);
  const r = 40, c = Math.PI * r;
  return (
    <article className="ms-card ms-reveal ms-rq" style={{ "--i": 1 }} aria-labelledby="ms-rq">
      <h2 className="ms-h2" id="ms-rq" style={{ margin: 0 }}><span className="ic"><Icon name="trophy" /></span>{t("qualityTitle")}</h2>
      <div className="ms-purse" ref={ref}>
        <span className="coins" aria-hidden="true">{[0, 1, 2].map((i) => <img key={i} style={{ "--c": i }} src={art(segment, "icon-coin")} alt="" width="40" height="40" />)}</span>
        <small>{t("balance")}</small>
        <b>{fmt(pts)} {t("points").toLowerCase()}</b>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{t("worthNow")}: ${(bal.points * bal.rate).toFixed(2)}</span>
        <div className="ms-bar" style={{ background: "rgba(255,255,255,.55)" }}><i style={{ "--p": p }} /></div>
        <span style={{ fontSize: 12.5 }}>{left > 0 ? `${fmt(left)} ${t("toRedeem")}` : t("readyRedeem")}</span>
      </div>
      <div className="ms-meter">
        <svg width="110" height="66" viewBox="0 0 110 66" aria-hidden="true">
          <defs><linearGradient id="ms-g2" x1="0" x2="1"><stop offset="0" stopColor="var(--c1)" /><stop offset="1" stopColor="var(--c2)" /></linearGradient></defs>
          <path className="t" d="M15 58a40 40 0 0 1 80 0" fill="none" strokeWidth="11" strokeLinecap="round" />
          <path className="v" d="M15 58a40 40 0 0 1 80 0" fill="none" strokeWidth="11" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - qp / 100)} />
          <text x="55" y="54" textAnchor="middle" fontSize="18">{q}</text>
        </svg>
        <div>
          <h3>{t("quality")}: {q}{qt > 0 ? `/${qt}` : ""}</h3>
          <p>{t("qualityText")}</p>
        </div>
      </div>
      <div className="ms-acts">
        <Link className="ms-btn sm" href="/member/rewards"><Icon name="gift" size={15} />{t("rewards")}</Link>
        <Link className="ms-btn ghost sm" href="/member/referrals"><Icon name="share" size={15} />{t("referrals")}</Link>
      </div>
    </article>
  );
}

function Activity({ d }) {
  const { t } = useStudio();
  const h = (d.surveys?.history || []).slice(0, 6);
  return (
    <article className="ms-card ms-reveal" data-tour="survey-history" aria-labelledby="ms-ac">
      <h2 className="ms-h2" id="ms-ac"><span className="ic"><Icon name="chart" /></span>{t("activity")}<span className="sp" />
        <Link className="ms-link" href="/member/surveys" aria-label={t("allSurveys")}><span className="lbl">{t("allSurveys")}</span> <Icon name="arrow" size={14} /></Link>
      </h2>
      {h.length ? (
        <div style={{ overflowX: "auto" }}>
          <table className="ms-table">
            <thead><tr><th>{t("survey")}</th><th>{t("status")}</th><th>{t("date")}</th><th style={{ textAlign: "end" }}>{t("points")}</th></tr></thead>
            <tbody>
              {h.map((x, i) => (
                <tr key={(x.slug || "") + i}>
                  <td style={{ fontWeight: 700 }}>{x.name}</td>
                  <td><span className="ms-st" data-st={x.status}>{t(ST[x.status] || "inProgress")}</span></td>
                  <td className="ms-muted">{day(x.endedAt || x.startedAt)}</td>
                  <td style={{ textAlign: "end", fontWeight: 700 }}>{fmt(x.points)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="ms-empty">{t("noActivity")}</p>}
    </article>
  );
}

function Updates({ d }) {
  const { t, segment } = useStudio();
  const n = d.notifications || [];
  const href = (x) => (x.action === "surveys" ? "/member/surveys" : x.action === "profile" ? "/member/profiles" : x.action === "consent" ? d.journey?.nextUrl || "/" : null);
  return (
    <article className="ms-card ms-reveal" style={{ "--i": 1 }} aria-labelledby="ms-up">
      <h2 className="ms-h2" id="ms-up"><span className="ic"><Icon name="bell" /></span>{t("updates")}</h2>
      {n.length ? (
        <ul className="ms-feed">
          {n.slice(0, 4).map((x, i) => (
            <li key={x.kind + i} data-lv={x.level}>
              <span className="dot img"><img src={art(segment, `icon-${x.level === "done" ? "check" : x.kind === "surveys" ? "doc" : x.kind === "profile" ? "user" : "bell"}`)} alt="" width="34" height="34" loading="lazy" /></span>
              <span>{x.text}{href(x) && <> <Link href={href(x)}>{t("open")}</Link></>}</span>
            </li>
          ))}
        </ul>
      ) : <p className="ms-empty">—</p>}
    </article>
  );
}

function ConsentAccount({ d, member }) {
  const { t, segment } = useStudio();
  const c = d.consent;
  const old = c && c.current && c.version !== c.current;
  return (
    <article className="ms-card ms-reveal" style={{ "--i": 2 }} aria-labelledby="ms-acc">
      <h2 className="ms-h2" id="ms-acc"><span className="ic"><Icon name="settings" /></span>{t("accountTitle")}</h2>
      {c ? (
        <div className="ms-consent" data-old={old ? "1" : undefined}>
          <span className="sh img"><img src={art(segment, "disc-shield")} alt="" width="52" height="52" loading="lazy" /></span>
          <div style={{ minWidth: 0 }}>
            <b style={{ display: "block" }}>{t("consent")}: {old ? t("olderVersion") : t("signed")}</b>
            <span className="ms-muted" style={{ fontSize: 12.5 }}>{t("version")} {c.version} · {day(c.at)}</span>
          </div>
        </div>
      ) : <p className="ms-empty" style={{ marginBottom: 12 }}>{t("consentNone")}</p>}
      <dl className="ms-kv">
        <div><dt>{t("memberId")}</dt><dd>{d.member?.memberId}</dd></div>
        {d.member?.joinedAt && <div><dt>{t("since")}</dt><dd>{day(d.member.joinedAt)}</dd></div>}
        {member?.email && <div><dt>{t("email")}</dt><dd>{member.email}</dd></div>}
        {d.member?.country && <div><dt>{t("country")}</dt><dd style={{ textTransform: "uppercase" }}>{d.member.country}</dd></div>}
      </dl>
      <div className="ms-acts">
        <Link className="ms-btn sm" href="/member/myaccount"><Icon name="user" size={15} />{t("account")}</Link>
        <Link className="ms-btn ghost sm" href="/member/settings"><Icon name="settings" size={15} />{t("settings")}</Link>
      </div>
    </article>
  );
}

export default function Dashboard({ member }) {
  const { t, segment, palette } = useStudio();
  const bal = React.useContext(BalanceCtx);
  const [d, setD] = React.useState(null);
  const [err, setErr] = React.useState(false);
  const [stats, setStats] = React.useState(null);
  const [counts, setCounts] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    get("/api/v1/me/dashboard").then((x) => { if (!live) return; if (x) setD(x); else setErr(true); });
    get("/api/v1/me/statistics").then((x) => live && setStats(x));
    get("/api/v1/me/survey").then((x) => live && setCounts(x));
    return () => { live = false; };
  }, [member?._id]); // eslint-disable-line react-hooks/exhaustive-deps
  const colors = React.useMemo(() => {
    const [a, b] = PALETTES.find((p) => p.id === palette)?.swatch || SIGNATURE[segment] || SIGNATURE.patient;
    return [a, b, "#fbbf24", "#ffffff", "#f472b6", "#34d399"];
  }, [palette, segment]);
  const [cele, play, close] = useCelebrations(d?.member?.memberId, d?.profile, colors);
  const ref = useReveal(Boolean(d));

  if (err) return <div className="ms-dash"><p className="ms-empty" role="alert">We could not load your dashboard. Please refresh the page.</p></div>;
  if (!d) return <div className="ms-dash" aria-busy="true"><div className="ms-hero" style={{ opacity: 0.5 }} /></div>;
  return (
    <div className="ms-dash" ref={ref}>
      <Hero d={d} member={member} />
      <Stats stats={stats || { total: d.surveys?.counts?.participated, complete: d.surveys?.counts?.completed, disqualified: d.surveys?.counts?.notQualified, points: d.surveys?.pointsEarned, claimed: 0 }} rate={bal.rate} />
      <div className="ms-two">
        <Journey d={d} onPlay={play} />
        <Highlights d={d} />
      </div>
      <div className="ms-two">
        <Surveys d={d} counts={counts} />
        <RewardsQuality member={member} />
      </div>
      <div className="ms-three">
        <Activity d={d} />
        <Updates d={d} />
        <ConsentAccount d={d} member={member} />
      </div>
      <CelebrationCard state={cele} onClose={close} />
      <span className="ms-sr" aria-live="polite">{cele?.kind === "profile" ? t("profileComplete") : ""}</span>
    </div>
  );
}
