"use client";
// Completion celebrations: a confetti burst plus a trophy card when the whole profile is complete, and a stamp
// toast when a profile section has just been completed. Each celebration plays once per member and section
// (remembered in localStorage), and is skipped for visitors who prefer reduced motion (the card still shows).
import React from "react";
import Icon from "./Icon";
import { useStudio } from "./StudioContext";

export function confetti(colors) {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.className = "ms-confetti";
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  document.body.appendChild(c);
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  const parts = Array.from({ length: 150 }, (_, i) => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.42,
    vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 15 - 5, r: Math.random() * 6 + 4,
    a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3, col: colors[i % colors.length], sq: Math.random() > 0.5,
  }));
  const t0 = performance.now();
  const frame = (now) => {
    const t = now - t0;
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.38; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.col; g.globalAlpha = Math.max(0, 1 - t / 2800);
      if (p.sq) g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); else { g.beginPath(); g.arc(0, 0, p.r / 2.4, 0, 7); g.fill(); }
      g.restore();
    }
    if (t < 2800) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}

const seenKey = (id) => `mho.celebrated.${id || "me"}`;
const readSeen = (id) => { try { return JSON.parse(localStorage.getItem(seenKey(id)) || "{}"); } catch { return {}; } };
const writeSeen = (id, v) => { try { localStorage.setItem(seenKey(id), JSON.stringify(v)); } catch { /* ignore */ } };

/** Watches the profile and fires the right celebration once. Returns [state, play, close]. */
export function useCelebrations(memberId, profile, colors) {
  const [state, setState] = React.useState(null); // null | { kind: 'profile' } | { kind: 'section', name }
  React.useEffect(() => {
    if (!profile?.sections?.length) return;
    const seen = readSeen(memberId);
    const done = profile.sections.filter((s) => s.status === "complete").map((s) => s.slug || s.name);
    if (!seen.baseline) { writeSeen(memberId, { baseline: true, sections: done, profile: profile.overall >= 100 }); if (profile.overall < 100) return; }
    if (profile.overall >= 100 && !seen.profile) {
      writeSeen(memberId, { ...seen, baseline: true, sections: done, profile: true });
      setState({ kind: "profile" }); confetti(colors); return;
    }
    const fresh = done.filter((s) => !(seen.sections || []).includes(s));
    if (fresh.length) {
      writeSeen(memberId, { ...seen, baseline: true, sections: done });
      const sec = profile.sections.find((s) => (s.slug || s.name) === fresh[0]);
      setState({ kind: "section", name: sec?.name || fresh[0] }); confetti(colors.slice(0, 3));
    }
  }, [memberId, profile, colors]);
  const play = React.useCallback(() => { setState({ kind: "profile" }); confetti(colors); }, [colors]);
  const close = React.useCallback(() => setState(null), []);
  return [state, play, close];
}

export function CelebrationCard({ state, onClose }) {
  const { t } = useStudio();
  const btn = React.useRef(null);
  React.useEffect(() => { if (state) btn.current?.focus(); }, [state]);
  React.useEffect(() => {
    if (!state || state.kind !== "section") return undefined;
    const id = setTimeout(onClose, 5000);
    return () => clearTimeout(id);
  }, [state, onClose]);
  if (!state) return null;
  if (state.kind === "section")
    return (
      <div className="ms-stamp" role="status">
        <span className="ms-stamp-ic"><Icon name="check" size={22} stroke={3} /></span>
        <div><b>{t("sectionDone")}</b><span>{state.name}</span></div>
        <button type="button" onClick={onClose} aria-label={t("close")}><Icon name="x" size={16} /></button>
      </div>
    );
  return (
    <div className="ms-modal" role="dialog" aria-modal="true" aria-labelledby="ms-done-title" onKeyDown={(e) => e.key === "Escape" && onClose()}>
      <div className="ms-modal-card">
        <div className="ms-trophy" aria-hidden="true">
          <span className="ms-trophy-rays" />
          <span className="ms-trophy-cup"><Icon name="trophy" size={64} stroke={1.6} /></span>
          {Array.from({ length: 8 }, (_, i) => <i key={i} style={{ "--s": i }} className="ms-spark" />)}
        </div>
        <h2 id="ms-done-title">{t("profileComplete")}</h2>
        <p>{t("profileCompleteText")}</p>
        <button ref={btn} type="button" className="ms-btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  );
}
