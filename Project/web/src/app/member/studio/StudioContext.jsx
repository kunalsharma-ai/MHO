"use client";
// Look-and-feel of the member area: panel (HCP / caregiver / patient), colour pattern, light or dark, language.
// The choices are per-browser conveniences, kept in localStorage ("mho.studio"; language in "mho.lang", the same key
// the public site and the member translator use).
import React from "react";
import { LANGS, translator } from "./i18n";

export const PALETTES = [
  { id: "signature", label: "Signature" },
  { id: "aurora", label: "Aurora", swatch: ["#6366f1", "#ec4899"] },
  { id: "ocean", label: "Ocean", swatch: ["#0284c7", "#14b8a6"] },
  { id: "sunset", label: "Sunset", swatch: ["#f97316", "#e11d48"] },
  { id: "forest", label: "Forest", swatch: ["#15803d", "#84cc16"] },
  { id: "royal", label: "Royal", swatch: ["#7e22ce", "#f59e0b"] },
];
export const SIGNATURE = { hcp: ["#1d4ed8", "#06b6d4"], caregiver: ["#0f766e", "#f97362"], patient: ["#7c3aed", "#2dd4bf"] };

const segFromCategory = (c) => {
  const v = String(c || "").toLowerCase();
  if (/health|professional|doctor|clinic/.test(v)) return "hcp";
  if (/care/.test(v)) return "caregiver";
  return "patient";
};
export { segFromCategory };

const Ctx = React.createContext(null);
const read = (k, fb) => { try { return localStorage.getItem(k) ?? fb; } catch { return fb; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } };

export function StudioProvider({ segment = "patient", children }) {
  const [prefs, setPrefs] = React.useState({ palette: "signature", mode: "light", lang: "en" });
  React.useEffect(() => {
    let saved = {};
    try { saved = JSON.parse(read("mho.studio", "{}")) || {}; } catch { saved = {}; }
    const lang = read("mho.lang", "en");
    setPrefs((p) => ({ ...p, ...saved, lang: lang || "en" }));
  }, []);
  const set = React.useCallback((patch) => {
    setPrefs((p) => {
      const next = { ...p, ...patch };
      write("mho.studio", JSON.stringify({ palette: next.palette, mode: next.mode }));
      if (patch.lang) write("mho.lang", patch.lang);
      return next;
    });
  }, []);
  const lang = LANGS.find((l) => l.code === prefs.lang) || LANGS[0];
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-ms-mode", prefs.mode);
    root.lang = lang.code;
    root.dir = lang.dir || "ltr";
  }, [prefs.mode, lang]);
  const value = React.useMemo(() => ({ segment, ...prefs, set, t: translator(prefs.lang), dir: lang.dir || "ltr" }), [segment, prefs, set, lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStudio = () => React.useContext(Ctx) || { segment: "patient", palette: "signature", mode: "light", lang: "en", set: () => {}, t: translator("en"), dir: "ltr" };

/** Counts up to `to` once the element is on screen (instantly when reduced motion is on). */
export function useCountUp(to, ms = 1200) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const target = Number(to) || 0;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current || typeof IntersectionObserver === "undefined") { setV(target); return undefined; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / ms);
        setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);
  return [v, ref];
}
