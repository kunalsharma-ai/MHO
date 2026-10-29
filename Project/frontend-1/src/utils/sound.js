// Tiny "pop" sound synthesised with the Web Audio API — no audio file to download.
// Browsers only allow sound after the visitor interacts with the page, so the "welcome" pop on opening the
// website plays on the visitor's first tap / click / key press (once per visit). The chat pop plays every time
// the chat is opened. Visitors can mute both from the chat header (remembered on this device).
import { session, store } from './storage.js';

let ctx = null;
const getCtx = () => {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
};

export const soundOn = () => store.get('mfr_sound', 'on') !== 'off';
export const setSound = (on) => store.set('mfr_sound', on ? 'on' : 'off');

// A soft, bubbly pop: quick pitch drop + a tiny sparkle overtone.
export function pop({ volume = 0.22, pitch = 1 } = {}) {
  if (!soundOn()) return;
  try {
    const c = getCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume();
    const t = c.currentTime + 0.01;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    g.connect(c.destination);
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(620 * pitch, t);
    o.frequency.exponentialRampToValueAtTime(1180 * pitch, t + 0.05);
    o.frequency.exponentialRampToValueAtTime(240 * pitch, t + 0.17);
    o.connect(g);
    o.start(t);
    o.stop(t + 0.2);
    const s = c.createOscillator();
    const sg = c.createGain();
    s.type = 'triangle';
    s.frequency.setValueAtTime(2100 * pitch, t + 0.04);
    sg.gain.setValueAtTime(0.0001, t + 0.04);
    sg.gain.exponentialRampToValueAtTime(volume * 0.25, t + 0.05);
    sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    s.connect(sg).connect(c.destination);
    s.start(t + 0.04);
    s.stop(t + 0.13);
  } catch {
    /* audio unavailable — stay silent */
  }
}

// Welcome pop when someone opens the website: once per visit, on the first interaction.
export function welcomePop() {
  if (typeof window === 'undefined' || session.get('mfr_welcome_pop')) return () => {};
  const evs = ['pointerdown', 'keydown', 'touchstart'];
  const fire = () => {
    evs.forEach((e) => window.removeEventListener(e, fire, true));
    if (session.get('mfr_welcome_pop')) return;
    session.set('mfr_welcome_pop', 1);
    pop({ volume: 0.18, pitch: 1.1 });
  };
  evs.forEach((e) => window.addEventListener(e, fire, { capture: true, passive: true }));
  return () => evs.forEach((e) => window.removeEventListener(e, fire, true));
}
