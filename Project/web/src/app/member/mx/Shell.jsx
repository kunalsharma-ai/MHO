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
import { LANGS, langOf } from "./i18n";
import { Icon, Toasts, useCountUp } from "./kit";
import { LOGO } from "./art";
import "./theme.css";
import "./header.css";
import "./fx.css";

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
          <Link href="/member/notifications" role="menuitem" onClick={close}><Icon name="bell" size={18} />{t("notifications")}</Link>
          <Link href="/member/support" role="menuitem" onClick={close}><Icon name="help" size={18} />{t("help")}</Link>
          <div className="mx-menu-prefs"><ModeSwitch /><ThemePicker inline /><LangPicker inline /></div>
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

function LangPicker({ inline }) {
  const { lang, setLang, t } = useMx();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const cur = langOf(lang);
  const list = (
    <div className="mx-langs" role="listbox" aria-label={t("language")}>
      {LANGS.map((l) => (
        <button key={l.code} type="button" role="option" aria-selected={lang === l.code} lang={l.code} className={lang === l.code ? "on" : undefined} onClick={() => { setLang(l.code); close(); }}>
          <span className="fl" aria-hidden="true">{l.flag}</span><span className="nm">{l.native}</span>{lang === l.code && <Icon name="check" size={14} />}
        </button>
      ))}
    </div>
  );
  if (inline) return <div className="mx-pref"><span className="lb">{t("language")}</span>{list}</div>;
  return (
    <div ref={ref} className="mx-pop-wrap">
      <button type="button" className="mx-iconbtn mx-langbtn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} aria-label={`${t("language")}: ${cur.native}`} title={t("language")}>
        <span className="fl" aria-hidden="true">{cur.flag}</span><span className="cd">{cur.code.toUpperCase()}</span>
      </button>
      {open && <div className="mx-menu mx-langpop"><div className="hd"><b>{t("language")}</b></div>{list}</div>}
    </div>
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
      <PointsPill />
      <QualityPill />
      <span className="mx-top-prefs"><ModeSwitch /><ThemePicker /><LangPicker /></span>
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
  const counts = { "/member/surveys": d?.surveys?.counts?.available || 0, "/member/notifications": notes.filter((n) => n.level === "action").length };
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

function Frame({ children }) {
  const { member, d, panel, mode, palette, lang } = useMx();
  const [navOpen, setNavOpen] = React.useState(false);
  const path = usePathname();
  React.useEffect(() => setNavOpen(false), [path]);
  const muiTheme = React.useMemo(() => {
    const t = THEMES.find((x) => x.id === palette);
    const [a, b] = t?.sw || MUI_COLORS[panel];
    return createTheme(baseTheme, { palette: { primary: { main: a, contrastText: "#fff" }, secondary: { main: b, contrastText: "#fff" } } });
  }, [panel, palette]);
  return (
    <div className="mx" data-panel={panel} data-mode={mode} data-palette={palette} lang={lang} data-nav={navOpen ? "open" : undefined} style={themeVars(palette, panel)}>
      <div className="mx-bg" aria-hidden="true">
        <span className="mx-amb"><i /><i /><i /></span>
        {panel === "hcp" && (<>
          <span className="mx-float mx-cross" style={{ left: "3%", top: "38%", "--d": "-2s" }} />
          <span className="mx-float mx-capsule" style={{ right: "4%", top: "22%", "--r0": "30deg", "--r1": "50deg" }} />
          <span className="mx-float mx-cross" style={{ right: "8%", bottom: "8%", transform: "scale(.7)", "--d": "-5s" }} />
        </>)}
        {panel === "caregiver" && (<>
          <span className="mx-float mx-heart3d" style={{ left: "2%", top: "44%" }} />
          <span className="mx-float mx-heart3d" style={{ right: "3%", top: "62%", "--d": "-4s", transform: "scale(.7)" }} />
        </>)}
        {panel === "patient" && (<>
          <span className="mx-float mx-orb" style={{ right: "5%", top: "30%" }} />
          <span className="mx-float mx-orb" style={{ left: "20%", bottom: "6%", "--d": "-3s", transform: "scale(.6)" }} />
        </>)}
      </div>
      <OnboardingTour member={member} greeting="Welcome" userName={firstName(member, d)} />
      <Top onMenu={() => setNavOpen(true)} />
      <div className="mx-frame">
        <Nav onNavigate={() => setNavOpen(false)} />
        <div className="mx-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />
        <main className="mx-main" id="main">
          <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
        </main>
      </div>
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
