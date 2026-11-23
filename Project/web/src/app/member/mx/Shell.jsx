"use client";
// Member area frame: panel top bar, navigation (sidebar on desktop, drawer on tablet and phone) and the page.
// The look follows the member's panel (HCP / caregiver / patient), taken from the supplied panel designs.
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import baseTheme from "@/theme/theme.js";
import OnboardingTour from "../components/OnboardingTour";
import { MxProvider, useMx, NAV, initials, fullName, firstName, memberId } from "./data";
import { Icon, Toasts, useCountUp } from "./kit";
import { LOGO } from "./art";
import "./theme.css";

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
  const { member, mode, setMode } = useMx();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const ref = useAway(open, close);
  const logout = async () => { close(); try { await member?.Logout?.(); } catch (e) { /* the member context reports it */ } };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" className="mx-me" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} aria-label="Account menu">
        <span className="mx-face">{member?.profilePicture ? <img src={member.profilePicture} alt="" /> : initials(member)}</span>
        <span className="nm">{member?.name?.first || ""}</span>
      </button>
      {open && (
        <div className="mx-menu" role="menu">
          <div className="who"><b>{fullName(member)}</b><span>{member?.mail || member?.email || ""}</span></div>
          <Link href="/member/myaccount" role="menuitem" onClick={close}><Icon name="user" size={18} />My Account</Link>
          <Link href="/member/notifications" role="menuitem" onClick={close}><Icon name="bell" size={18} />Notifications</Link>
          <Link href="/member/support" role="menuitem" onClick={close}><Icon name="help" size={18} />Help & Support</Link>
          <button type="button" role="menuitem" onClick={() => setMode(mode === "dark" ? "light" : "dark")}><Icon name={mode === "dark" ? "sun" : "moon"} size={18} />{mode === "dark" ? "Light mode" : "Dark mode"}</button>
          <button type="button" role="menuitem" onClick={logout} style={{ color: "var(--err)" }}><Icon name="logout" size={18} />Sign out</button>
        </div>
      )}
    </div>
  );
}

function Top({ onMenu }) {
  const { member, P, balance, notes } = useMx();
  const pts = useCountUp(balance.points);
  const qs = Number(member?.qualityScore) || 0;
  const unread = notes.filter((n) => n.level === "action" || n.kind === "announcement").length;
  return (
    <header className="mx-top">
      <button type="button" className="mx-iconbtn mx-burger" onClick={onMenu} aria-label="Open menu"><Icon name="menu" /></button>
      <Link href="/member/dashboard" className="mx-brand" aria-label="My Health Opinions, dashboard">
        <span className="logo"><img src={LOGO} alt="My Health Opinions" width="114" height="32" /></span>
        <span className="tag"><b>Member area</b><small>{P.label}</small></span>
      </Link>
      <span className="sp" />
      <Link href="/member/rewards" className="mx-pill" aria-label={`Reward points: ${balance.points.toLocaleString()}`}>
        <span className="mx-coin"><Icon name="coin" size={16} /></span>
        <span className="v"><small>Points</small>{pts.toLocaleString()}</span>
      </Link>
      <Link href="/member/myaccount" className="mx-pill qs" aria-label={`Quality score: ${qs}`}>
        <span className="mx-qs"><Icon name="heart" size={15} /></span>
        <span className="v"><small>Quality</small>{qs}</span>
      </Link>
      <Link href="/member/notifications" className="mx-iconbtn" aria-label={`Notifications${unread ? `, ${unread} need attention` : ""}`}>
        <Icon name="bell" />
        {unread > 0 && <span className="dot">{unread}</span>}
      </Link>
      <Me />
    </header>
  );
}

function Nav({ onNavigate }) {
  const { member, d, balance, notes } = useMx();
  const path = usePathname() || "";
  const total = d?.profile?.sections?.length || 0;
  const done = (d?.profile?.sections || []).filter((s) => s.status === "complete").length;
  const counts = { "/member/surveys": d?.surveys?.counts?.available || 0, "/member/notifications": notes.filter((n) => n.level === "action").length };
  return (
    <nav className="mx-nav" aria-label="Member pages">
      <Link href="/member/dashboard" className="mx-navbrand" aria-label="My Health Opinions, dashboard" tabIndex={-1}><img src={LOGO} alt="" width="114" height="32" /></Link>
      <span className="cap">Menu</span>
      {NAV.map(([label, href, icon, tour], i) => {
        const on = path === href || path.startsWith(`${href}/`) || (href === "/member/myaccount" && path.startsWith("/member/settings"));
        return (
          <Link key={href} href={href} data-tour={tour} aria-current={on ? "page" : undefined} style={{ "--i": i }} onClick={onNavigate}>
            <span className="ic"><Icon name={icon} size={18} /></span>{label}
            {counts[href] > 0 && <span className="n" aria-label={`${counts[href]} new`}>{counts[href]}</span>}
          </Link>
        );
      })}
      <span className="grow" />
      <div className="mx-navcard">
        <small>Member ID</small>
        <b style={{ fontSize: 16 }}>{memberId(member, d) || "—"}</b>
        {total > 0 && (<>
          <small style={{ marginTop: 6 }}>Profiles complete</small>
          <b>{done}<span style={{ fontSize: 14, opacity: .7 }}> / {total}</span></b>
          <div className="mx-meter"><i style={{ "--p": total ? done / total : 0 }} /></div>
        </>)}
        {balance.ready && <span style={{ fontSize: 12.5, color: "var(--v-muted)" }}>{balance.points.toLocaleString()} points</span>}
        <Link href="/member/profiles" onClick={onNavigate}>Go to my profile <Icon name="arrow" size={14} /></Link>
      </div>
    </nav>
  );
}

function Frame({ children }) {
  const { member, d, panel, mode } = useMx();
  const [navOpen, setNavOpen] = React.useState(false);
  const path = usePathname();
  React.useEffect(() => setNavOpen(false), [path]);
  const muiTheme = React.useMemo(() => {
    const [a, b] = MUI_COLORS[panel];
    return createTheme(baseTheme, { palette: { primary: { main: a, contrastText: "#fff" }, secondary: { main: b, contrastText: "#fff" } } });
  }, [panel]);
  return (
    <div className="mx" data-panel={panel} data-mode={mode} data-nav={navOpen ? "open" : undefined}>
      <div className="mx-bg" aria-hidden="true">
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
