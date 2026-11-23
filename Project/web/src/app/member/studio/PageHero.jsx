"use client";
// Banner at the top of every member page except the dashboard: page title, one line on what the page is for,
// a few facts from the member's own record, and the panel's illustrated banner (brand art from the repo) shown as a
// floating 3D card with the panel's 3D discs around it. Settings and My Account also get the look-and-language card.
import React from "react";
import Link from "next/link";
import Icon from "./Icon";
import { art } from "./art";
import { useStudio, PALETTES, SIGNATURE, BalanceCtx } from "./StudioContext";
import { LANGS } from "./i18n";

const PAGES = {
  myaccount: { key: "account", icon: "user", hero: "hero-member-approved", discs: ["disc-badge", "disc-userplus", "disc-shield"], text: "Your personal details, contact information and member record." },
  profiles: { key: "profiles", icon: "profile", hero: "hero-newuser", discs: ["disc-sign", "disc-badge", "disc-welcome"], text: "Answer your profile sections so we can match you with the studies that fit you." },
  surveys: { key: "surveys", icon: "surveys", hero: "hero-newsurvey", discs: ["disc-survey", "disc-chat", "disc-mail"], text: "Surveys matched to your profile, and everything you have taken so far." },
  rewards: { key: "rewards", icon: "gift", hero: "hero-birthday", discs: ["disc-badge", "disc-survey", "disc-ticket"], text: "Your points, what they are worth and your rewards history." },
  referrals: { key: "referrals", icon: "share", hero: "hero-invite", discs: ["disc-invite", "disc-userplus", "disc-mail"], text: "Invite people you know to join the panel." },
  settings: { key: "settings", icon: "settings", hero: "hero-consent-signed", discs: ["disc-key", "disc-shield", "disc-mail"], text: "Password, survey notifications, terms, and how the member area looks." },
  support: { key: "help", icon: "help", hero: "hero-ticket-created-user", discs: ["disc-ticket", "disc-chat", "disc-mail"], text: "Open a support ticket and follow the replies to it." },
};

function LookCard() {
  const { t, lang, mode, palette, segment, set } = useStudio();
  const pickLang = (code) => {
    set({ lang: code });
    if (typeof document !== "undefined" && document.getElementById("mho-translate-script")) setTimeout(() => window.location.reload(), 150);
  };
  return (
    <section className="ms-card ms-look" aria-labelledby="ms-look">
      <h2 className="ms-h2" id="ms-look"><span className="ic"><Icon name="palette" /></span>{t("theme")} · {t("palette")} · {t("language")}</h2>
      <div className="ms-look-grid">
        <div>
          <h3>{t("theme")}</h3>
          <div className="ms-seg" role="radiogroup" aria-label={t("theme")}>
            {["light", "dark"].map((m) => (
              <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => set({ mode: m })}><Icon name={m === "dark" ? "moon" : "sun"} size={17} />{t(m)}</button>
            ))}
          </div>
        </div>
        <div>
          <h3>{t("palette")}</h3>
          <div className="ms-look-sw" role="radiogroup" aria-label={t("palette")}>
            {PALETTES.map((p) => {
              const [a, b] = p.swatch || SIGNATURE[segment] || SIGNATURE.patient;
              return (
                <button key={p.id} type="button" role="radio" aria-checked={palette === p.id} onClick={() => set({ palette: p.id })} title={p.label}>
                  <span className="ms-sw" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} /><span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h3>{t("language")}</h3>
          <select className="ms-select" value={lang} onChange={(e) => pickLang(e.target.value)} aria-label={t("language")}>
            {LANGS.map((l) => <option key={l.code} value={l.code} lang={l.code}>{l.native}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
}

export default function PageHero({ path, member }) {
  const { t, segment } = useStudio();
  const bal = React.useContext(BalanceCtx);
  const slug = (path.split("/")[2] || "").toLowerCase();
  const pg = PAGES[slug];
  const ref = React.useRef(null);
  if (!pg) return null;
  const q = Number(member?.qualityScore) || 0, qt = Number(member?.qualityScoreTotal) || 0;
  const facts = {
    myaccount: [[t("memberId"), member?.respondentID || String(member?._id || "").slice(-8).toUpperCase()], [t("quality"), qt > 0 ? `${q}/${qt}` : q]],
    rewards: [[t("balance"), `${bal.points.toLocaleString()} ${t("points").toLowerCase()}`], [t("worthNow"), `$${(bal.points * bal.rate).toFixed(2)}`], [t("leftToRedeem"), Math.max(0, bal.threshold - bal.points).toLocaleString()]],
    surveys: [[t("quality"), qt > 0 ? `${q}/${qt}` : q], [t("points"), bal.points.toLocaleString()]],
  }[slug] || [];
  const tilt = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height) - 0.5) * -10}deg`);
    el.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width) - 0.5) * 16}deg`);
  };
  const reset = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  return (
    <>
      <section className="ms-hero ms-phero" aria-label={t(pg.key)} onPointerMove={tilt} onPointerLeave={reset}>
        <div>
          <nav className="ms-crumb" aria-label="Breadcrumb"><Link href="/member/dashboard">{t("dashboard")}</Link><Icon name="arrow" size={13} /><span>{t(pg.key)}</span></nav>
          <h1 className="ms-ph-title"><span className="ms-ph-ic"><Icon name={pg.icon} size={26} /></span>{t(pg.key)}</h1>
          <p className="lead">{pg.text}</p>
          {facts.length > 0 && (
            <div className="ms-facts">
              {facts.map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}
            </div>
          )}
        </div>
        <div className="ms-ph-stage" ref={ref} aria-hidden="true">
          <div className="ms-ph-world">
            <img className="ms-ph-art" src={art(segment, pg.hero)} alt="" width="960" height="448" decoding="async" />
            {pg.discs.map((d, i) => <img key={d} className={`ms-ph-disc d${i}`} src={art(segment, d)} alt="" width="80" height="80" decoding="async" />)}
          </div>
        </div>
      </section>
      {(slug === "settings" || slug === "myaccount") && <LookCard />}
    </>
  );
}
