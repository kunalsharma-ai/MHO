"use client";
// Building blocks of the member area: icons, buttons, meters, rings, empty states, fields, tabs, toasts and a modal.
// Toasts only ever report what the API answered (see notify()), never an assumed success.
import React from "react";

const P = {
  home: "M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0",
  profile: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9zM9 12h6M9 16h4",
  surveys: "M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 5h6M9 13h6M9 17h3",
  gift: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-2-1.2L14.5 3h-4l-.4 2.6a7.6 7.6 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 2 1.2l.4 2.6h4l.4-2.6a7.6 7.6 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z",
  help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-2.5-13a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14m0 3h.01",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2",
  coin: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-15v10m3-8.5c-.7-.9-1.8-1.5-3-1.5-1.9 0-3 1-3 2.3 0 3.2 6 1.8 6 4.9 0 1.3-1.3 2.3-3 2.3-1.3 0-2.5-.6-3.2-1.6",
  heart: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10 2 2 4-4",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  chev: "m9 6 6 6-6 6",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 1 1 8 0v4",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  menu: "M3 6h18M3 12h18M3 18h18",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeoff: "M3 3l18 18M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.7 17.7 0 0 1-3 3.9M6.5 6.6C3.8 8.3 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.8-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2",
  card: "M2 6h20v12H2zM2 10h20M6 15h4",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1z",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8",
  pulse: "M3 12h4l3-8 4 16 3-8h4",
  dna: "M2 15c6.7-6 13.3 0 20-6M2 9c6.7 6 13.3 0 20 6M5 10.5v3M9 9.2v5.6M15 9.2v5.6M19 10.5v3",
  hands: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16m4 4 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L14.8 13.6M2 15l6 6",
  stetho: "M6 3v5a5 5 0 0 0 10 0V3M11 13v3a5 5 0 0 0 10 0v-2m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  upload: "M12 16V4m-5 5 5-5 5 5M4 20h16",
  link: "M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1m2 5a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  ticket: "M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3zM13 6v12",
  filter: "M3 5h18l-7 8v6l-4-2v-4z",
  calendar: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-15v2m0 16v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  alert: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  bank: "M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 21h20M12 3l9 5H3z",
  external: "M14 3h7v7M10 14 21 3M19 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6",
};

export function Icon({ name, size = 20, stroke = 2, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={P[name] || P.spark} />
    </svg>
  );
}

export const Meter = ({ value = 0, label }) => (
  <div className="mx-meter" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
    <i style={{ "--p": Math.max(0, Math.min(1, value)) }} />
  </div>
);

export function Ring({ value = 0, size = 92, stroke = 9, children, track = "rgba(127,127,160,.2)", color = "url(#mxRingGrad)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => { const t = requestAnimationFrame(() => setShown(Math.max(0, Math.min(1, value)))); return () => cancelAnimationFrame(t); }, [value]);
  return (
    <div className="mx-ring" style={{ "--s": `${size}px` }}>
      <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs><linearGradient id="mxRingGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2EE6C5" /><stop offset=".5" stopColor="#22C3F5" /><stop offset="1" stopColor="#8B7CFF" /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle className="fg" cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - shown)} />
      </svg>
      <div className="t">{children}</div>
    </div>
  );
}

export function Empty({ icon = "spark", title, children, action }) {
  return (
    <div className="mx-empty">
      <span className="ico"><Icon name={icon} size={28} /></span>
      <b>{title}</b>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function Field({ label, hint, error, children, id }) {
  return (
    <label className="mx-field" htmlFor={id}>
      <span>{label}</span>
      {children}
      {error ? <small className="err" role="alert">{error}</small> : hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function Password({ id, value, onChange, autoComplete = "current-password", invalid }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="mx-pass">
      <input id={id} className="mx-input" type={show ? "text" : "password"} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={invalid || undefined} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}><Icon name={show ? "eyeoff" : "eye"} size={18} /></button>
    </div>
  );
}

/** Accessible tab strip: arrow keys move between tabs. */
export function Tabs({ tabs, value, onChange, label }) {
  const refs = React.useRef([]);
  const key = (e, i) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const n = (i + d + tabs.length) % tabs.length;
    onChange(tabs[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className="mx-tabs" role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button key={t.id} ref={(el) => (refs.current[i] = el)} role="tab" type="button" id={`tab-${t.id}`} aria-selected={value === t.id} aria-controls={`panel-${t.id}`} tabIndex={value === t.id ? 0 : -1} onClick={() => onChange(t.id)} onKeyDown={(e) => key(e, i)}>
          {t.icon && <Icon name={t.icon} size={17} />}{t.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, labelledBy, children }) {
  React.useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="mx-modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div>{children}</div>
    </div>
  );
}

// ---- toasts ---------------------------------------------------------------------------------------------------------
const ToastCtx = React.createContext(() => {});
export function Toasts({ children }) {
  const [list, setList] = React.useState([]);
  const push = React.useCallback((text, tone = "ok") => {
    const id = Math.random().toString(36).slice(2);
    setList((l) => [...l.slice(-2), { id, text, tone }]);
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 5200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="mx-toasts" aria-live="polite">
        {list.map((t) => (
          <div key={t.id} className={`mx-toast ${t.tone}`} role={t.tone === "bad" ? "alert" : "status"}>
            <span className="ic"><Icon name={t.tone === "bad" ? "alert" : "check"} size={16} /></span>
            <p>{t.text}</p>
            <button type="button" aria-label="Dismiss" onClick={() => setList((l) => l.filter((x) => x.id !== t.id))}><Icon name="x" size={16} /></button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => React.useContext(ToastCtx);

/** The message an API answer carries, for both success and failure shapes used by the backend. */
export function apiMessage(resp, fallback = "") {
  if (!resp) return fallback;
  return resp.message || resp.data?.message || resp.error || (Array.isArray(resp.errors) && (resp.errors[0]?.msg || resp.errors[0]?.message || resp.errors[0])) || fallback;
}
export const apiOk = (resp) => resp?.status === "success";

/** Counts up to `to` once visible (instant with reduced motion). */
export function useCountUp(to, ms = 1100) {
  const [v, setV] = React.useState(0);
  const shown = React.useRef(0);
  React.useEffect(() => {
    const target = Number(to) || 0;
    const from = shown.current; // a later change counts on from the number already shown
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !target || from === target) { shown.current = target; setV(target); return undefined; }
    let raf = 0;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      const x = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
      shown.current = x;
      setV(x);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

export const fmtDate = (d) => {
  if (!d) return "—";
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? "—" : x.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
export const cap = (s) => String(s || "").replace(/^./, (c) => c.toUpperCase());
