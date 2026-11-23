"use client";
// Hero 3D scenes, built with CSS 3D transforms (no image files, sharp at any screen density).
// Each panel has its own centrepiece and orbiting tiles; the stage follows the pointer a little,
// pauses when off screen and stands still when the visitor prefers reduced motion.
import React from "react";
import Icon from "./Icon";

const ORBIT = {
  hcp: ["stethoscope", "microscope", "dna", "chart", "pill", "shield"],
  caregiver: ["heart", "calendar", "pill", "hands", "home", "chat"],
  patient: ["heart", "pulse", "leaf", "chat", "shield", "target"],
};

function Helix() {
  return (
    <div className="ms-helix" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className="ms-rung" style={{ "--i": i }}>
          <i className="a" /><b /><i className="b" />
        </div>
      ))}
    </div>
  );
}

function House() {
  return (
    <div className="ms-house" aria-hidden="true">
      <div className="ms-cube">
        <span className="f front"><em className="door" /><em className="win" /></span>
        <span className="f back" />
        <span className="f left"><em className="win" /></span>
        <span className="f right"><em className="win" /></span>
        <span className="roof r1" />
        <span className="roof r2" />
      </div>
      <div className="ms-heart3d"><Icon name="heart" size={46} stroke={0} /></div>
    </div>
  );
}

function Orb() {
  return (
    <div className="ms-orbwrap" aria-hidden="true">
      <span className="ms-ring r1" /><span className="ms-ring r2" /><span className="ms-ring r3" />
      <div className="ms-orb">
        <svg viewBox="0 0 120 60" className="ms-ecg"><path d="M0 30h30l8-18 10 36 9-26 6 8h57" /></svg>
      </div>
    </div>
  );
}

export default function Scene({ segment = "patient", percent = 0 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`); el.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`); });
    };
    const leave = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([en]) => el.classList.toggle("is-paused", !en.isIntersecting)) : null;
    io?.observe(el);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { io?.disconnect(); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  const tiles = ORBIT[segment] || ORBIT.patient;
  return (
    <div className={`ms-stage seg-${segment}`} ref={ref} aria-hidden="true">
      <div className="ms-glow" />
      <div className="ms-world">
        {segment === "hcp" ? <Helix /> : segment === "caregiver" ? <House /> : <Orb />}
        <div className="ms-orbit">
          {tiles.map((n, i) => (
            <span key={n + i} className="ms-tile" style={{ "--k": i, "--n": tiles.length }}>
              <span className="ms-tile-in"><Icon name={n} size={22} /></span>
            </span>
          ))}
        </div>
      </div>
      <div className="ms-dots">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--d": i }} />)}</div>
      <div className="ms-badge3d"><b>{percent}%</b><span>profile</span></div>
    </div>
  );
}
