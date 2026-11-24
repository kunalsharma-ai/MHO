"use client";
// Member area frame: panel top bar, navigation (sidebar on desktop, drawer on tablet and phone) and the page.
// The look follows the member's panel (HCP / caregiver / patient), taken from the supplied panel designs.
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import baseTheme from "@/theme/theme.js";
import OnboardingTour from "../components/OnboardingTour";
import { MxProvider, useMx, NAV, THEMES, themeVars, noteHref, initials, fullName, firstName, memberId } from "./data";
import { Icon, Toasts, useCountUp } from "./kit";
import { LOGO, sectionArt } from "./art";
import { sectionHref, sectionTitle } from "./parts";
import { LanguageButton, LanguagePicker, TranslateStatus } from "./lang/Language";
import { buildInbox, useSeen } from "./messages";
import "./theme.css";
import { useLite } from "./perf";
import "./header.css";
import "./fx.css";
import "./prism.css";
import "./story.css";
import "./panels.css";

const MUI_COLORS = { hcp: ["#5B4BFF", "#FF5A78"], caregiver: ["#9B1E4E", "#F2611B"], patient: ["#0F7EA8", "#F2611B"] };

function useAway(open, close) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!ref.current?.contains(e.target)) close(); };
    const esc = (e) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open, close]);
  return ref;
}

function Me() {
  const { member, t } = useMx();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const logout = async () => { close(); try { await member?.Logout?.(); } catch (e) { /* the member context reports it */ } };
  return (
    <div ref={ref} className="mx-pop-wrap">
      <button type="button" className="mx-me" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} aria-label="Account menu">
        <span className="mx-face">{member?.profilePicture ? <img src={member.profilePicture} alt="" /> : initials(member)}</span>
        <span className="nm">{member?.name?.first || ""}</span>
        <Icon name="chev" size={14} />
      </button>
      {open && (
        <div className="mx-menu" role="menu">
          <div className="who"><b>{fullName(member)}</b><span>{member?.mail || member?.email || ""}</span></div>
          <Link href="/member/myaccount" role="menuitem" onClick={close}><Icon name="user" size={18} />{t("account")}</Link>
          <Link href="/member/messages" role="menuitem" onClick={close}><Icon name="inbox" size={18} />{t("messages")}</Link>
          <Link href="/member/notifications" role="menuitem" onClick={close}><Icon name="bell" size={18} />{t("notifications")}</Link>
          <Link href="/member/support" role="menuitem" onClick={close}><Icon name="help" size={18} />{t("help")}</Link>
          <div className="mx-menu-prefs"><div className="mx-row"><ModeSwitch /><LanguageButton compact /></div><ThemePicker inline /></div>
          <button type="button" role="menuitem" onClick={logout} style={{ color: "var(--err)" }}><Icon name="logout" size={18} />{t("signOut")}</button>
        </div>
      )}
    </div>
  );
}

/** Points: the coin spins in, the number counts up, and a "+N" rises from the pill whenever the balance grows. */
function PointsPill() {
  const { balance, t } = useMx();
  const pts = useCountUp(balance.points);
  const prev = React.useRef(null);
  const [gain, setGain] = React.useState(null);
  React.useEffect(() => {
    if (!balance.ready) return undefined;
    const before = prev.current;
    prev.current = balance.points;
    if (before == null || balance.points <= before) return undefined;
    setGain({ n: balance.points - before, k: Date.now() });
    const id = setTimeout(() => setGain(null), 2400);
    return () => clearTimeout(id);
  }, [balance.points, balance.ready]);
  return (
    <Link href="/member/rewards" className={`mx-pill mx-pts${gain ? " up" : ""}`} aria-label={`${t("points")}: ${balance.points.toLocaleString()}`}>
      <span className="mx-coin3d" aria-hidden="true"><span className="f"><Icon name="coin" size={15} /></span><span className="b" /></span>
      <span className="v"><small>{t("points")}</small><b>{pts.toLocaleString()}</b></span>
      {gain && <span key={gain.k} className="mx-gain" aria-live="polite">+{gain.n.toLocaleString()}</span>}
      <span className="mx-shine" aria-hidden="true" />
    </Link>
  );
}

/** Quality score: a heart that beats in a glowing ring, with the score counting up. */
function QualityPill() {
  const { member, t } = useMx();
  const qs = Number(member?.qualityScore) || 0;
  const v = useCountUp(qs);
  const prev = React.useRef(null);
  const [up, setUp] = React.useState(false);
  React.useEffect(() => {
    const before = prev.current; prev.current = qs;
    if (before == null || qs <= before) return undefined;
    setUp(true); const id = setTimeout(() => setUp(false), 2000); return () => clearTimeout(id);
  }, [qs]);
  return (
    <Link href="/member/rewards" className={`mx-pill mx-qpill${up ? " up" : ""}`} aria-label={`${t("quality")}: ${qs}`}>
      <span className="mx-qring" aria-hidden="true"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" /></svg><Icon name="heart" size={14} /></span>
      <span className="v"><small>{t("quality")}</small><b>{v}</b></span>
    </Link>
  );
}

const noteKey = (n) => `${n.kind || ""}|${n.text || ""}|${n.at || ""}`;
const readSeen = () => { try { return new Set(JSON.parse(localStorage.getItem("mho.member.seenNotes") || "[]")); } catch { return new Set(); } };

/** Bell: rings when something new arrives; the panel lists the latest notifications and links to each one. */
function Bell() {
  const { notes, t } = useMx();
  const [open, setOpen] = React.useState(false);
  const [seen, setSeen] = React.useState(() => new Set());
  React.useEffect(() => setSeen(readSeen()), []);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const fresh = notes.filter((n) => !seen.has(noteKey(n)));
  const toggle = () => {
    const next = !open; setOpen(next);
    if (next && fresh.length) {
      // "new" means not yet seen in this browser; the Notifications page keeps every item
      const all = new Set([...seen, ...notes.map(noteKey)]);
      setSeen(all);
      try { localStorage.setItem("mho.member.seenNotes", JSON.stringify([...all].slice(-200))); } catch { /* storage blocked */ }
    }
  };
  const list = notes.slice(0, 6);
  return (
    <div ref={ref} className="mx-pop-wrap">
      <button type="button" className={`mx-iconbtn mx-bell${fresh.length ? " ring" : ""}`} aria-haspopup="dialog" aria-expanded={open} onClick={toggle}
        aria-label={`${t("notifications")}${fresh.length ? `, ${fresh.length} ${t("newCount")}` : ""}`}>
        <span className="bi"><Icon name="bell" /></span>
        {fresh.length > 0 && <span className="dot">{fresh.length}</span>}
        {fresh.length > 0 && <span className="mx-ripple" aria-hidden="true" />}
      </button>
      {open && (
        <div className="mx-menu mx-notepop" role="dialog" aria-label={t("notifications")}>
          <div className="hd"><b>{t("notifications")}</b>{fresh.length > 0 && <span className="mx-chip">{fresh.length} {t("newCount")}</span>}</div>
          {list.length === 0 ? <p className="empty"><span aria-hidden="true">🔔</span>{t("caughtUp")}</p> : (
            <ul>
              {list.map((n, i) => {
                const href = noteHref(n);
                const body = (<><span className={`ic ${n.level || "info"}`}><Icon name={n.kind === "announcement" ? "spark" : n.action === "surveys" ? "surveys" : n.action === "consent" ? "shield" : n.action === "profile" ? "profile" : "bell"} size={16} /></span>
                  <span className="tx"><b>{n.text}</b>{n.at && <small>{new Date(n.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</small>}</span>
                  {fresh.some((f) => noteKey(f) === noteKey(n)) && <span className="new" aria-label="new" />}</>);
                return <li key={n.id || i} style={{ "--i": i }}>{href ? <Link href={href} onClick={close}>{body}</Link> : <div>{body}</div>}</li>;
              })}
            </ul>
          )}
          <Link className="all" href="/member/notifications" onClick={close}>{t("viewAll")} <Icon name="arrow" size={14} /></Link>
        </div>
      )}
    </div>
  );
}

function ModeSwitch() {
  const { mode, setMode, t } = useMx();
  const dark = mode === "dark";
  return (
    <button type="button" className={`mx-mode${dark ? " on" : ""}`} role="switch" aria-checked={dark} onClick={() => setMode(dark ? "light" : "dark")}
      aria-label={`${t("dark")} mode`} title={dark ? t("light") : t("dark")}>
      <span className="trk"><span className="knob"><Icon name={dark ? "moon" : "sun"} size={14} /></span><i className="st s1" /><i className="st s2" /><i className="st s3" /></span>
    </button>
  );
}

function ThemePicker({ inline }) {
  const { palette, setPalette, panel, t } = useMx();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const cur = THEMES.find((x) => x.id === palette) || THEMES[0];
  const grid = (
    <div className="mx-swatches" role="radiogroup" aria-label={t("theme")}>
      {THEMES.map((th) => (
        <button key={th.id} type="button" role="radio" aria-checked={palette === th.id} title={th.name} onClick={() => { setPalette(th.id); close(); }}
          className={palette === th.id ? "on" : undefined} style={th.sw ? { "--a": th.sw[0], "--b": th.sw[1] } : undefined} data-panel-sw={th.sw ? undefined : panel}>
          <span className="sw" /><span className="nm">{th.name}</span>
        </button>
      ))}
    </div>
  );
  if (inline) return <div className="mx-pref"><span className="lb">{t("theme")}</span>{grid}</div>;
  return (
    <div ref={ref} className="mx-pop-wrap">
      <button type="button" className="mx-iconbtn mx-palbtn" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)} aria-label={`${t("theme")}: ${cur.name}`} title={t("theme")}>
        <span className="pal" style={cur.sw ? { "--a": cur.sw[0], "--b": cur.sw[1] } : undefined} data-panel-sw={cur.sw ? undefined : panel} />
      </button>
      {open && <div className="mx-menu mx-palpop" role="dialog" aria-label={t("theme")}><div className="hd"><b>{t("theme")}</b></div>{grid}</div>}
    </div>
  );
}

/** One ring segment per profile: full when complete, faint when started. */
const arc = (i, n) => {
  const gap = n > 1 ? Math.min(14, 120 / n) : 0; const seg = 360 / n;
  const a0 = ((i * seg + gap / 2 - 90) * Math.PI) / 180; const a1 = (((i + 1) * seg - gap / 2 - 90) * Math.PI) / 180;
  const r = 15; const p = (a) => `${(18 + r * Math.cos(a)).toFixed(2)} ${(18 + r * Math.sin(a)).toFixed(2)}`;
  return `M ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}`;
};
/** Completed profiles, as a segmented ring; the panel lists every profile with its progress. */
function ProfileStack() {
  const { d, panel, t } = useMx();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const secs = d?.profile?.sections || [];
  if (!secs.length) return null;
  const done = secs.filter((s) => s.status === "complete");
  const pct = Math.round((done.length / secs.length) * 100);
  return (
    <div ref={ref} className="mx-pop-wrap">
      <button type="button" className={`mx-pill mx-pstack${done.length ? "" : " none"}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}
        aria-label={`${t("profilesComplete")}: ${done.length} of ${secs.length}`}>
        <span className="segs" aria-hidden="true">
          <svg viewBox="0 0 36 36" width="34" height="34">{secs.map((s, i) => <path key={s.slug} d={arc(i, secs.length)} className={s.status === "complete" ? "ok" : s.answered ? "part" : ""} style={{ "--i": i }} />)}</svg>
          <img src={sectionArt(panel, (done[done.length - 1] || secs[0]).slug, (done[done.length - 1] || secs[0]).name)} alt="" width="18" height="18" />
        </span>
        <span className="v"><small>{t("profile")}</small><b>{done.length}<em>/{secs.length}</em></b></span>
      </button>
      {open && (
        <div className="mx-menu mx-profpop" role="dialog" aria-label={t("profile")}>
          <div className="hd"><b>{t("profilesComplete")}</b><span className="mx-chip info">{pct}%</span></div>
          <div className="bar" aria-hidden="true"><i style={{ "--p": done.length / secs.length }} /></div>
          <ul>
            {secs.map((s, i) => {
              const p = s.total ? s.answered / s.total : (s.status === "complete" ? 1 : 0);
              return (
                <li key={s.slug} style={{ "--i": i }}>
                  <Link href={sectionHref(s)} onClick={close} className={s.status === "complete" ? "ok" : ""}>
                    <span className="em"><img src={sectionArt(panel, s.slug, s.name)} alt="" width="34" height="34" />{s.status === "complete" && <i className="tick"><Icon name="check" size={11} stroke={3.5} /></i>}</span>
                    <span className="tx"><b>{sectionTitle(s)}</b><span className="m"><i style={{ "--p": p }} /></span></span>
                    <small>{s.status === "complete" ? "Done" : s.answered ? `${s.answered}/${s.total}` : "Start"}</small>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link className="all" href="/member/profiles" onClick={close}>{t("goProfile")} <Icon name="arrow" size={14} /></Link>
        </div>
      )}
    </div>
  );
}

/** Weekly activity streak: a flame that grows with the run of active weeks. */
function StreakPill() {
  const { streak, activity } = useMx();
  if (!activity.ready) return null;
  const n = streak.current;
  return (
    <Link href="/member/dashboard#mx-streak" className={`mx-pill mx-streak${streak.activeNow ? " hot" : ""}`} aria-label={`Activity streak: ${n} week${n === 1 ? "" : "s"}`} title="Weeks in a row with activity">
      <span className="fl" aria-hidden="true"><Icon name="flame" size={17} /><i /></span>
      <span className="v"><small>Streak</small><b>{n}<em>wk</em></b></span>
    </Link>
  );
}

function Top({ onMenu }) {
  const { P, t, panel } = useMx();
  return (
    <header className="mx-top">
      <button type="button" className="mx-iconbtn mx-burger" onClick={onMenu} aria-label={t("menu")}><Icon name="menu" /></button>
      <Link href="/member/dashboard" className="mx-brand" aria-label="My Health Opinions, dashboard">
        <span className="logo"><img src={LOGO} alt="My Health Opinions" width="114" height="32" /></span>
        <span className="tag"><b>{t("memberArea")}</b><small>{t(panel)}</small></span>
      </Link>
      <span className="sp" />
      <span className="mx-top-stats"><ProfileStack /><PointsPill /><QualityPill /><StreakPill /></span>
      <span className="mx-top-prefs"><ModeSwitch /><ThemePicker /><LanguageButton /></span>
      <Bell />
      <Me />
      <span className="mx-top-glow" aria-hidden="true" />
    </header>
  );
}

function Nav({ onNavigate }) {
  const { member, d, balance, notes, t } = useMx();
  const path = usePathname() || "";
  const total = d?.profile?.sections?.length || 0;
  const done = (d?.profile?.sections || []).filter((s) => s.status === "complete").length;
  const { tickets } = useMx();
  const [seen] = useSeen();
  const unread = buildInbox({ d, notes, tickets: tickets.list }).filter((m) => !seen.has(m.key)).length;
  const counts = { "/member/surveys": d?.surveys?.counts?.available || 0, "/member/messages": unread, "/member/notifications": notes.filter((n) => n.level === "action").length };
  return (
    <nav className="mx-nav" aria-label="Member pages">
      <Link href="/member/dashboard" className="mx-navbrand" aria-label="My Health Opinions, dashboard" tabIndex={-1}><img src={LOGO} alt="" width="114" height="32" /></Link>
      <span className="cap">{t("menu")}</span>
      {NAV.map(([label, href, icon, tour, key], i) => {
        const on = path === href || path.startsWith(`${href}/`) || (href === "/member/myaccount" && path.startsWith("/member/settings"));
        return (
          <Link key={href} href={href} data-tour={tour} aria-current={on ? "page" : undefined} style={{ "--i": i }} onClick={onNavigate}>
            <span className="ic"><Icon name={icon} size={18} /></span><span className="lbl">{t(key) || label}</span>
            {counts[href] > 0 && <span className="n" aria-label={`${counts[href]} new`}>{counts[href]}</span>}
          </Link>
        );
      })}
      <span className="grow" />
      <div className="mx-navcard">
        <small>{t("memberId")}</small>
        <b style={{ fontSize: 16 }}>{memberId(member, d) || "—"}</b>
        {total > 0 && (<>
          <small style={{ marginTop: 6 }}>{t("profilesComplete")}</small>
          <b>{done}<span style={{ fontSize: 14, opacity: .7 }}> / {total}</span></b>
          <div className="mx-meter"><i style={{ "--p": total ? done / total : 0 }} /></div>
        </>)}
        {balance.ready && <span style={{ fontSize: 12.5, color: "var(--v-muted)" }}>{balance.points.toLocaleString()} {t("points").toLowerCase()}</span>}
        <Link href="/member/profiles" onClick={onNavigate}>{t("goProfile")} <Icon name="arrow" size={14} /></Link>
      </div>
    </nav>
  );
}

/**
 * Safety net for page scroll. The profile sections lock the page while a questionnaire is open; if the member
 * leaves with the Back button or a menu link, the lock must not stay behind. After each page change, when no
 * dialog is open any more, any leftover lock is removed.
 */
function useScrollGuard(path) {
  React.useEffect(() => {
    const free = () => {
      if (document.querySelector('[aria-modal="true"]')) return;
      const html = document.documentElement;
      html.classList.remove("lock", "hcp-lock", "mxl-open");
      if (html.style.overflow === "hidden") html.style.overflow = "";
      if (document.body.style.overflow === "hidden") document.body.style.overflow = "";
    };
    const id = setTimeout(free, 350);
    window.addEventListener("popstate", free);
    return () => { clearTimeout(id); window.removeEventListener("popstate", free); };
  }, [path]);
}

function Frame({ children }) {
  const { member, d, panel, mode, palette, lang, langMeta } = useMx();
  const lite = useLite();
  const [navOpen, setNavOpen] = React.useState(false);
  const path = usePathname();
  React.useEffect(() => setNavOpen(false), [path]);
  useScrollGuard(path);
  const muiTheme = React.useMemo(() => {
    const t = THEMES.find((x) => x.id === palette);
    const [a, b] = t?.sw || MUI_COLORS[panel];
    return createTheme(baseTheme, { palette: { primary: { main: a, contrastText: "#fff" }, secondary: { main: b, contrastText: "#fff" } } });
  }, [panel, palette]);
  return (
    <div className="mx" data-page={(path || "").split("/")[2] || "dashboard"} data-lite={lite ? "" : undefined} data-panel={panel} data-mode={mode} data-palette={palette} lang={lang} dir={langMeta.dir || "ltr"} data-nav={navOpen ? "open" : undefined} style={themeVars(palette, panel)}>
      <div className="mx-bg" aria-hidden="true"><span className="mx-amb"><i /><i /><i /></span></div>
      <OnboardingTour member={member} greeting="Welcome" userName={firstName(member, d)} />
      <Top onMenu={() => setNavOpen(true)} />
      <div className="mx-frame">
        <Nav onNavigate={() => setNavOpen(false)} />
        <div className="mx-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />
        <main className="mx-main" id="main">
          <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
        </main>
      </div>
      <LanguagePicker />
      <TranslateStatus />
    </div>
  );
}

export default function Shell({ children }) {
  return (
    <MxProvider>
      <Toasts>
        <Frame>{children}</Frame>
      </Toasts>
    </MxProvider>
  );
}
