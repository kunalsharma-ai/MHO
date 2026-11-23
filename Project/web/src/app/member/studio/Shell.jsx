"use client";
// Header and sidebar of the member area, styled per panel (HCP, caregiver, patient). Shows the member's quality score
// and reward balance, and lets the member pick a language, light or dark mode and a colour pattern. The same links,
// tour anchors (data-tour) and logout as the previous header and sidebar.
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMember } from "@/Context";
import { useRewardsTick, fetchRewardBalance } from "@/hooks/useRewardsRefresh";
import MemberNotification from "../components/MemberNotification";
import OnboardingTour from "../components/OnboardingTour";
import Icon from "./Icon";
import { LANGS } from "./i18n";
import { LOGO, LOGO_MARK } from "./art";
import PageHero from "./PageHero";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import baseTheme from "@/theme/theme.js";
import { StudioProvider, useStudio, PALETTES, SIGNATURE, segFromCategory, BalanceCtx, PANEL_ICON, greetingKey } from "./StudioContext";
export { BalanceCtx, PANEL_ICON, greetingKey };
import "./studio.css";

const NAV = [
  ["dashboard", "/member/dashboard", "dashboard", "nav-dashboard"],
  ["account", "/member/myaccount", "user", "nav-myaccount"],
  ["profiles", "/member/profiles", "profile", "nav-profiles"],
  ["surveys", "/member/surveys", "surveys", "nav-surveys"],
  ["rewards", "/member/rewards", "gift", "nav-rewards"],
  ["referrals", "/member/referrals", "share", "nav-referrals"],
  ["settings", "/member/settings", "settings", "nav-settings"],
  ["help", "/member/support", "help", "nav-support"],
];
const initials = (m) => `${m?.name?.first?.[0] || ""}${m?.name?.last?.[0] || ""}`.toUpperCase() || "M";

function useBalance(member) {
  const tick = useRewardsTick();
  const [b, setB] = React.useState({ points: 0, threshold: 15000, rate: 0.001, ready: false });
  React.useEffect(() => {
    let live = true;
    fetchRewardBalance(member)
      .then((r) => { if (live && r?.data) setB({ points: Number(r.data.totalPoints) || 0, threshold: Number(r.data.threshold) || 15000, rate: Number(r.data.conversionRate) || 0.001, ready: true }); })
      .catch(() => {});
    return () => { live = false; };
  }, [member?._id, tick]); // eslint-disable-line react-hooks/exhaustive-deps
  return b;
}

function usePopover() {
  const [open, setOpen] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!ref.current?.contains(e.target)) setOpen(null); };
    const esc = (e) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  return [open, setOpen, ref];
}

function Logo() {
  return (
    <Link href="/member/dashboard" className="ms-logo" aria-label="My Health Opinions, dashboard">
      <img className="full" src={LOGO} alt="My Health Opinions" width="396" height="110" />
      <img className="mark" src={LOGO_MARK} alt="My Health Opinions" width="104" height="106" />
    </Link>
  );
}

function QualityGauge({ value, total }) {
  const { t } = useStudio();
  const pct = total > 0 ? Math.max(0, Math.min(1, value / total)) : value > 0 ? 1 : 0; // no total on record: show the score alone
  const r = 15, c = 2 * Math.PI * r;
  return (
    <Link href="/member/myaccount" className="ms-gauge" title={`${t("quality")}: ${value}${total > 0 ? `/${total}` : ""}`}>
      <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true">
        <defs><linearGradient id="ms-g" x1="0" x2="1"><stop offset="0" stopColor="var(--c1)" /><stop offset="1" stopColor="var(--c2)" /></linearGradient></defs>
        <circle className="trk" cx="19" cy="19" r={r} fill="none" strokeWidth="5" />
        <circle className="val" cx="19" cy="19" r={r} fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 19 19)" />
        <foreignObject x="9" y="9" width="20" height="20"><div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--c1)" }}><Icon name="star" size={13} /></div></foreignObject>
      </svg>
      <span className="tx"><b>{value}{total > 0 && <span className="ms-muted" style={{ fontSize: 12 }}>/{total}</span>}</b><small>{t("quality")}</small></span>
    </Link>
  );
}

function Prefs() {
  const { t, lang, mode, palette, segment, set } = useStudio();
  const [open, setOpen, ref] = usePopover();
  const pickLang = (code) => {
    set({ lang: code });
    setOpen(null);
    // The site-wide translator reads "mho.lang" when the page loads, so reload to translate the rest of the page too.
    if (typeof document !== "undefined" && document.getElementById("mho-translate-script")) setTimeout(() => window.location.reload(), 150);
  };
  const cur = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div className="ms-hq" ref={ref}>
      <div className="ms-pop">
        <button type="button" className="ms-icbtn" aria-haspopup="menu" aria-expanded={open === "lang"} aria-label={t("language")} onClick={() => setOpen(open === "lang" ? null : "lang")}>
          <Icon name="globe" /><span className="glyph">{cur.code.slice(0, 2).toUpperCase()}</span>
        </button>
        {open === "lang" && (
          <div className="ms-menu" role="menu">
            <h4>{t("language")}</h4>
            {LANGS.map((l) => (
              <button key={l.code} type="button" role="menuitemradio" aria-checked={l.code === lang} onClick={() => pickLang(l.code)} lang={l.code}>
                <span className="ms-tag" style={{ minWidth: 34, justifyContent: "center" }}>{l.glyph}</span>{l.native}
                {l.code === lang && <span className="tick"><Icon name="check" size={16} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="ms-pop">
        <button type="button" className="ms-icbtn" aria-haspopup="menu" aria-expanded={open === "look"} aria-label={`${t("theme")}, ${t("palette")}`} onClick={() => setOpen(open === "look" ? null : "look")}>
          <Icon name={mode === "dark" ? "moon" : "palette"} />
        </button>
        {open === "look" && (
          <div className="ms-menu" role="menu" style={{ minWidth: 280 }}>
            <h4>{t("theme")}</h4>
            <div className="ms-modes">
              {["light", "dark"].map((m) => (
                <button key={m} type="button" role="menuitemradio" aria-checked={mode === m} onClick={() => set({ mode: m })}>
                  <Icon name={m === "dark" ? "moon" : "sun"} size={18} />{t(m)}
                </button>
              ))}
            </div>
            <h4>{t("palette")}</h4>
            <div className="ms-swatches">
              {PALETTES.map((p) => {
                const [a, b] = p.swatch || SIGNATURE[segment] || SIGNATURE.patient;
                return (
                  <button key={p.id} type="button" role="menuitemradio" aria-checked={palette === p.id} onClick={() => set({ palette: p.id })}>
                    <span className="ms-sw" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} />{p.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AccountMenu({ member }) {
  const { t } = useStudio();
  const [open, setOpen, ref] = usePopover();
  const logout = async () => { setOpen(null); try { await member?.Logout?.(); } catch (e) { /* the member context reports it */ } };
  return (
    <div className="ms-pop" ref={ref}>
      <button type="button" className="ms-avatar" aria-haspopup="menu" aria-expanded={Boolean(open)} onClick={() => setOpen(open ? null : "me")}>
        <span className="face">{member?.profilePicture ? <img src={member.profilePicture} alt="" /> : initials(member)}</span>
        <span className="nm">{member?.name?.first || ""}</span>
      </button>
      {open && (
        <div className="ms-menu" role="menu">
          <div className="who"><b>{[member?.name?.first, member?.name?.last].filter(Boolean).join(" ")}</b><span>{member?.email || ""}</span></div>
          <Link href="/member/myaccount" role="menuitem" onClick={() => setOpen(null)}><Icon name="user" size={18} />{t("account")}</Link>
          <Link href="/member/settings" role="menuitem" onClick={() => setOpen(null)}><Icon name="settings" size={18} />{t("settings")}</Link>
          <Link href="/member/support" role="menuitem" onClick={() => setOpen(null)}><Icon name="help" size={18} />{t("help")}</Link>
          <button type="button" role="menuitem" onClick={logout} style={{ color: "var(--bad)" }}><Icon name="logout" size={18} />{t("logout")}</button>
        </div>
      )}
    </div>
  );
}

function Header({ member }) {
  const { t, segment } = useStudio();
  const bal = React.useContext(BalanceCtx);
  return (
    <header className="ms-head">
      <Logo />
      <span className="ms-panelchip"><i><Icon name={PANEL_ICON[segment]} size={14} /></i>{t(`${segment}Panel`)}</span>
      <span className="ms-head-sp" />
      <QualityGauge value={Number(member?.qualityScore) || 0} total={Number(member?.qualityScoreTotal) || 0} />
      <Link href="/member/rewards" className="ms-pts" aria-label={`${t("points")}: ${bal.points.toLocaleString()}`}>
        <span className="ms-coin"><Icon name="coin" size={18} /></span>
        <span className="tx"><small>{t("points")}</small><b>{bal.points.toLocaleString()}</b></span>
      </Link>
      <Prefs />
      <span className="ms-bell"><MemberNotification /></span>
      <AccountMenu member={member} />
    </header>
  );
}

function Wallet() {
  const { t } = useStudio();
  const bal = React.useContext(BalanceCtx);
  const ref = React.useRef(null);
  const p = bal.threshold ? Math.min(1, bal.points / bal.threshold) : 0;
  const left = Math.max(0, bal.threshold - bal.points);
  const tilt = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--wx", `${(((e.clientY - r.top) / r.height) - 0.5) * -12}deg`);
    ref.current.style.setProperty("--wy", `${(((e.clientX - r.left) / r.width) - 0.5) * 14}deg`);
  };
  const reset = () => { ref.current.style.setProperty("--wx", "0deg"); ref.current.style.setProperty("--wy", "0deg"); };
  return (
    <div className="ms-wallet" ref={ref} onPointerMove={tilt} onPointerLeave={reset}>
      <small>{t("balance")}</small>
      <b>{bal.points.toLocaleString()} <span style={{ fontSize: 14, opacity: 0.85 }}>{t("points").toLowerCase()}</span></b>
      <p>{t("worth")} ${(bal.points * bal.rate).toFixed(2)}</p>
      <div className="bar"><i style={{ "--p": p }} /></div>
      <p>{left > 0 ? `${left.toLocaleString()} ${t("toRedeem")}` : t("redeem")}</p>
      <Link href="/member/rewards" className="go">{left > 0 ? t("rewards") : t("redeem")} <Icon name="arrow" size={14} /></Link>
    </div>
  );
}

function Sidebar({ member }) {
  const { t } = useStudio();
  const path = usePathname() || "";
  return (
    <aside className="ms-side">
      <nav className="ms-nav" aria-label="Member">
        {NAV.map(([k, href, ic, tour], i) => {
          const on = path === href || path.startsWith(`${href}/`);
          return (
            <Link key={href} href={href} data-tour={tour} aria-current={on ? "page" : undefined} style={{ "--i": i }} title={t(k)}>
              <span className="ic"><Icon name={ic} size={19} /></span><span className="lbl">{t(k)}</span>
            </Link>
          );
        })}
      </nav>
      <span style={{ flex: 1 }} />
      <Wallet />
      <div className="ms-me">
        <span className="face">{initials(member)}</span>
        <span className="tx"><b>{[member?.name?.first, member?.name?.last].filter(Boolean).join(" ")}</b><span>{t("memberId")}: {member?.respondentID || String(member?._id || "").slice(-8).toUpperCase() || "—"}</span></span>
      </div>
    </aside>
  );
}

/** MUI theme of the member pages, recoloured with the chosen panel look or colour pattern. */
function useMuiTheme(segment, palette) {
  return React.useMemo(() => {
    const [a, b] = PALETTES.find((p) => p.id === palette)?.swatch || SIGNATURE[segment] || SIGNATURE.patient;
    return createTheme(baseTheme, { palette: { primary: { main: a, contrastText: "#fff" }, secondary: { main: b, contrastText: "#fff" } } });
  }, [segment, palette]);
}

function Frame({ member, children }) {
  const { segment, palette, mode, dir, t } = useStudio();
  const balance = useBalance(member);
  const muiTheme = useMuiTheme(segment, palette);
  const path = usePathname() || "";
  const isDash = /^\/member\/?(dashboard)?\/?$/.test(path);
  return (
    <BalanceCtx.Provider value={balance}>
      <div className="ms-root" data-seg={segment} data-palette={palette} data-mode={mode} dir={dir}>
        <div className="ms-ambient" aria-hidden="true" />
        <OnboardingTour member={member} greeting={t(greetingKey())} userName={member?.name?.first} />
        <Header member={member} />
        <div className="ms-body">
          <Sidebar member={member} />
          <main className="ms-main">
            {isDash ? children : (
              <div className="ms-dash">
                <PageHero path={path} member={member} />
                <ThemeProvider theme={muiTheme}><div className="ms-page">{children}</div></ThemeProvider>
              </div>
            )}
          </main>
        </div>
      </div>
    </BalanceCtx.Provider>
  );
}

export default function Shell({ children }) {
  const member = useMember();
  return (
    <StudioProvider segment={segFromCategory(member?.category)}>
      <Frame member={member}>{children}</Frame>
    </StudioProvider>
  );
}
