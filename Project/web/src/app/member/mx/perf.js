// Lite mode for slower computers and phones. Turned on when the device says it is low on memory or saving data,
// when the member prefers reduced motion, or when the first two seconds of the page draw slowly (under ~30 frames
// a second). In lite mode the 3D scenes show their flat art and looping decorations stop after one run; every
// feature works the same. The result is remembered for the browser session.
import React from "react";

const KEY = "mho.member.lite";
const quick = () => {
  if (typeof window === "undefined") return false;
  const n = window.navigator || {};
  return Boolean((n.deviceMemory && n.deviceMemory <= 4) || n.connection?.saveData || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
};
let state = null; // shared by every caller: true, false or null (still measuring)
const subs = new Set();
const set = (v) => { state = v; try { sessionStorage.setItem(KEY, v ? "1" : "0"); } catch { /* storage blocked */ } subs.forEach((f) => f(v)); };

function measure() {
  if (state !== null || typeof window === "undefined") return;
  try { const s = sessionStorage.getItem(KEY); if (s === "1" || s === "0") { state = s === "1"; return; } } catch { /* storage blocked */ }
  if (quick()) { set(true); return; }
  let n = 0; let slow = 0; let last = 0;
  const end = performance.now() + 2000;
  const f = (now) => {
    if (last) { n += 1; if (now - last > 34) slow += 1; }
    last = now;
    if (now < end) requestAnimationFrame(f);
    else set(n > 0 && slow / n > 0.4);
  };
  setTimeout(() => requestAnimationFrame(f), 600); // skip the first paint, which is always slow
}

/** true when the page should run light: no WebGL scenes and no looping decorations. */
export function useLite() {
  const [v, setV] = React.useState(state);
  React.useEffect(() => { measure(); setV(state); subs.add(setV); return () => { subs.delete(setV); }; }, []);
  return v === true;
}
/** For code outside React (the 3D scenes): turn lite mode on after the fact. */
export const goLite = () => { if (state !== true) set(true); };
export const isLite = () => state === true;
