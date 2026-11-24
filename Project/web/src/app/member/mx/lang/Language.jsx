"use client";
// The MHO website's language switcher, brought into the member area header (frontend-1 src/components/Language.jsx):
// the glyph-orb button, the full-screen picker with a title that rotates through every language, search, regions,
// a colour and a sound for each language, the colour wave that washes over the screen on a change, and the pill
// that shows machine translation progress.
import React from "react";
import { createPortal } from "react-dom";
import { BY_CODE, LANGUAGES } from "./languages";
import { SOUND_NAMES } from "./soundPrefs";
import { Icon } from "../kit";
import { useMx } from "../data";
import { SECTION_LANGS } from "./bridge";
import "./lang.css";

/** Header button: the language's glyph in a spinning colour orb, its own name, a caret. */
export function LanguageButton({ compact = false }) {
  const { langMeta: meta, openPicker } = useMx();
  return (
    <button type="button" className={`mxl-btn ${compact ? "is-compact" : ""}`} onClick={openPicker} aria-haspopup="dialog" aria-label={`${meta.glyph} ${meta.native}: change language (${meta.name})`}>
      <span className="mxlb-orb" aria-hidden="true"><span className="mxlb-glyph notranslate" translate="no">{meta.glyph}</span></span>
      <span className="mxlb-txt notranslate" translate="no">{meta.native}</span>
      <Icon name="chev" size={14} className="mxlb-caret" />
    </button>
  );
}

function RotatingTitle() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % LANGUAGES.length), 1700);
    return () => clearInterval(t);
  }, []);
  const l = LANGUAGES[i];
  return (
    <span className="mxl-rot notranslate" translate="no" aria-hidden="true">
      <span key={l.code} dir={l.dir || "ltr"} lang={l.code} style={{ "--c": l.grade[0] }}>{l.choose}</span>
    </span>
  );
}

const Tile = React.memo(function Tile({ l, active, onPick, featured = false }) {
  return (
    <li>
      <button type="button" className={`mxl-tile ${active ? "is-on" : ""} ${featured ? "is-featured" : ""}`} style={{ "--t1": l.grade[0], "--t2": l.grade[1], "--t3": l.grade[2] }}
        onClick={(e) => onPick(l.code, { x: e.clientX, y: e.clientY })} aria-pressed={active} lang={l.code} title={SOUND_NAMES[l.sound]}>
        <span className="mxlt-orb notranslate" translate="no" aria-hidden="true"><b>{l.glyph}</b></span>
        <span className="mxlt-txt">
          <b className="notranslate" translate="no" dir={l.dir || "ltr"}>{l.native}</b>
          <small className="notranslate" translate="no" lang="en">{l.name}{SECTION_LANGS.has(l.code) ? " · questionnaires too" : ""}</small>
        </span>
        <span className="mxlt-sound" aria-hidden="true"><i /><i /><i /><i /></span>
        {active && <Icon name="check" size={16} stroke={3} className="mxlt-check" />}
      </button>
    </li>
  );
});

const ALIASES = {
  en: "english inglés anglais englisch 英语 英語 inggris", "zh-CN": "chinese mandarin simplified putonghua china 中文 汉语 普通话 简体", "zh-TW": "chinese traditional taiwan hong kong cantonese 中文 繁体 繁體",
  ja: "japanese nihongo japan にほんご 日本", ko: "korean hangul korea 한글", hi: "hindi hindustani india bharat हिंदी", bn: "bengali bangla bangladesh kolkata", ta: "tamil chennai", te: "telugu andhra telangana hyderabad",
  mr: "marathi maharashtra mumbai pune", gu: "gujarati gujarat ahmedabad", pa: "punjabi panjabi gurmukhi punjab", kn: "kannada karnataka bengaluru bangalore", ml: "malayalam kerala", ur: "urdu pakistan",
  ar: "arabic arabi saudi uae egypt gulf عربي", fa: "persian farsi iran dari", he: "hebrew ivrit israel", tr: "turkish turkce turkey türkiye", es: "spanish espanol español castellano spain mexico",
  pt: "portuguese portugues brazil brasil portugal", fr: "french francais français france canada", it: "italian italiano italy", de: "german deutsch germany austria swiss", nl: "dutch nederlands netherlands flemish belgium",
  ru: "russian russkiy russia", uk: "ukrainian ukraine", pl: "polish polski poland", sv: "swedish svenska sweden", nb: "norwegian norsk norway", da: "danish dansk denmark", fi: "finnish suomi finland",
  el: "greek ellinika greece cyprus", cs: "czech cesky čeština czechia", hu: "hungarian magyar hungary", ro: "romanian romana română romania moldova", id: "indonesian bahasa indonesia", ms: "malay melayu malaysia",
  th: "thai thailand", vi: "vietnamese tieng viet vietnam", fil: "filipino tagalog philippines", sw: "swahili kiswahili kenya tanzania",
};
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const HAY = Object.fromEntries(LANGUAGES.map((l) => [l.code, fold(`${l.native} ${l.name} ${l.code} ${ALIASES[l.code] || ""}`)]));

/** Full-screen picker. Opens from the header button; picking a language plays its sound and sends the colour wave. */
export function LanguagePicker() {
  const { lang, setLang, picker, closePicker, sound, toggleSound } = useMx();
  const [q, setQ] = React.useState("");
  const dq = React.useDeferredValue(q);
  const search = React.useRef(null);
  const panel = React.useRef(null);

  React.useEffect(() => {
    if (!picker) return undefined;
    setQ("");
    const prev = document.activeElement;
    document.documentElement.classList.add("mxl-open");
    const t = setTimeout(() => (window.matchMedia("(pointer: fine)").matches ? search.current : panel.current)?.focus(), 60);
    const onKey = (e) => {
      if (e.key === "Escape") closePicker();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll("button, input, [href]");
        if (!f.length) return;
        const first = f[0]; const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.documentElement.classList.remove("mxl-open"); document.removeEventListener("keydown", onKey); prev?.focus?.(); };
  }, [picker, closePicker]);

  const groups = React.useMemo(() => {
    const terms = fold(dq.trim()).split(/\s+/).filter(Boolean);
    const list = LANGUAGES.filter((l) => terms.every((t) => HAY[l.code].includes(t)));
    const by = {};
    for (const l of list) (by[l.region] ||= []).push(l);
    return Object.entries(by);
  }, [dq]);

  const pick = React.useCallback((code, origin) => { setLang(code, { origin }); setTimeout(closePicker, 380); }, [setLang, closePicker]);
  if (!picker || typeof document === "undefined") return null;

  return createPortal(
    <div className="mxl mxl-root" role="dialog" aria-modal="true" aria-labelledby="mxl-title" translate="no">
      <div className="mxl-backdrop" onClick={closePicker} />
      <div className="mxl-panel" ref={panel} tabIndex={-1}>
        <div className="mxl-aurora" aria-hidden="true"><i /><i /><i /></div>
        <header className="mxl-head">
          <div>
            <p className="mxl-kicker"><Icon name="globe" size={14} /> {LANGUAGES.length} languages</p>
            <h2 id="mxl-title" className="mxl-title"><span className="sr-only">Choose your language</span><RotatingTitle /></h2>
            <p className="mxl-sub">Every language has its own colour and sound.</p>
          </div>
          <div className="mxl-tools">
            <button type="button" className={`mxl-sound ${sound ? "on" : ""}`} onClick={toggleSound} aria-pressed={sound}>
              <span className="mxlps-ic" aria-hidden="true"><i /><i /><i /></span>{sound ? "Sound on" : "Sound off"}
            </button>
            <button type="button" className="mxl-close" onClick={closePicker} aria-label="Close"><Icon name="x" size={20} /></button>
          </div>
        </header>
        <label className="mxl-search">
          <Icon name="search" size={18} />
          <input ref={search} type="text" inputMode="search" enterKeyHint="go" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
            value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search languages" aria-label="Search languages" aria-controls="mxl-results"
            onKeyDown={(e) => { if (e.key === "Enter" && groups[0]) { e.preventDefault(); const r = search.current.getBoundingClientRect(); pick(groups[0][1][0].code, { x: r.left + 40, y: r.top + r.height / 2 }); } }} />
          {q && <button type="button" className="mxl-clear" onClick={() => { setQ(""); search.current?.focus(); }} aria-label="Clear search"><Icon name="x" size={16} /></button>}
        </label>
        <p className="mxl-lp-note">Menus, headings and the member pages switch at once. Questionnaires follow in the 12 languages marked “questionnaires too”.</p>
        <div className="mxl-scroll" id="mxl-results" aria-live="polite">
          {groups.map(([region, list]) => (
            <section key={region} className="mxl-group">
              <h3>{region}</h3>
              <ul className="mxl-grid">{list.map((l) => <Tile key={l.code} l={l} active={lang === l.code} onPick={pick} featured={false} />)}</ul>
            </section>
          ))}
          {!groups.length && <p className="mxl-empty">No language matches “{dq}”.</p>}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** Small pill while text is being machine-translated, or a button when the browser needs a click first. */
export function TranslateStatus() {
  const { lang, txStatus: status, translateRest } = useMx();
  const [hide, setHide] = React.useState(false);
  React.useEffect(() => setHide(false), [lang]);
  React.useEffect(() => {
    if (!status.pending || status.hasProvider || status.needsClick) return undefined;
    const t = setTimeout(() => setHide(true), 7000);
    return () => clearTimeout(t);
  }, [status.pending, status.hasProvider, status.needsClick, lang]);
  if (lang === "en" || typeof document === "undefined") return null;
  let body = null;
  if (status.waiting > 0) body = <div className="mxl-tx-pill" role="status"><span className="mxl-tx-spin" aria-hidden="true" /> Translating the page… <b translate="no">{status.waiting}</b></div>;
  else if (status.needsClick && status.pending > 0) body = <div className="mxl-tx-pill is-action" role="status"><button type="button" onClick={translateRest}><Icon name="globe" size={15} /> Translate everything on this page</button></div>;
  else if (status.pending > 0 && !status.hasProvider && !hide) body = (
    <div className="mxl-tx-pill is-info" role="status">Menus and key sections are translated. Some longer text is still in English.
      <button type="button" onClick={() => setHide(true)} aria-label="Dismiss"><Icon name="x" size={14} /></button></div>
  );
  return body ? createPortal(<div className="mxl-root" translate="no">{body}</div>, document.body) : null;
}

/** The colour wave from the click point, with the language's glyph in the middle (same as the website). */
export function gradeWave(meta, origin) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = document.createElement("div");
  el.className = "mxl-wave mxl-root";
  el.setAttribute("aria-hidden", "true");
  el.setAttribute("translate", "no");
  el.style.setProperty("--x", `${origin?.x ?? window.innerWidth / 2}px`);
  el.style.setProperty("--y", `${origin?.y ?? 80}px`);
  el.style.setProperty("--w1", meta.grade[0]); el.style.setProperty("--w2", meta.grade[1]); el.style.setProperty("--w3", meta.grade[2]);
  el.innerHTML = `<i></i><i></i><i></i><b>${meta.glyph}</b>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

export { BY_CODE };
