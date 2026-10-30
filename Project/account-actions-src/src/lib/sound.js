// MyHealthOpinions sound kit: Web Audio synthesis, no audio files.
// Character: soft heartbeat thumps, gentle monitor beeps, kalimba plucks, breath and ocean washes.
// Distinct from MFR (chimes) and T2O (marimba). Starts after the first gesture; never throws.

let ctx = null, master = null, enabled = true, lastAt = 0, lastName = '';

function ensure() {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      master = ctx.createGain(); master.gain.value = 0.24;
      master.connect(comp); comp.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  } catch { return null; }
}

function env(node, t, a, d, g) { node.gain.setValueAtTime(0.0001, t); node.gain.linearRampToValueAtTime(g, t + a); node.gain.exponentialRampToValueAtTime(0.0001, t + d); }
function osc(f, t, d, { type = 'sine', g = 0.3, to = null, a = 0.005, lp = null } = {}) {
  const o = ctx.createOscillator(), gn = ctx.createGain(); let n = o;
  o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
  if (lp) { const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); n = fl; }
  n.connect(gn); gn.connect(master); env(gn, t, a, d, g); o.start(t); o.stop(t + d + 0.05);
}
/** Kalimba: fundamental + inharmonic partials with a fast decay */
function kalimba(f, t, g = 0.22, d = 0.9) {
  osc(f, t, d, { g });
  osc(f * 3.01, t, d * 0.35, { g: g * 0.22 });
  osc(f * 5.6, t, d * 0.15, { g: g * 0.08 });
}
/** Heartbeat thump: pitched-down sine through a lowpass */
const thump = (t, g = 0.5, f = 70) => osc(f * 1.8, t, 0.18, { g, to: f, lp: 300 });
const lubdub = (t, g = 0.5) => { thump(t, g); thump(t + 0.16, g * 0.75, 62); };
const beep = (t, f = 880, g = 0.12, d = 0.08) => osc(f, t, d, { g, a: 0.003 });
function wash(t, d, { g = 0.12, from = 300, to = 1600, q = 0.6, type = 'lowpass' } = {}) {
  const len = Math.max(1, Math.floor(ctx.sampleRate * d)), b = ctx.createBuffer(1, len, ctx.sampleRate), ch = b.getChannelData(0);
  for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / len);
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), gn = ctx.createGain();
  s.buffer = b; fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(from, t); fl.frequency.exponentialRampToValueAtTime(to, t + d * 0.6);
  gn.gain.value = g; s.connect(fl); fl.connect(gn); gn.connect(master); s.start(t);
}
const N = { C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, C5: 523, D5: 587, E5: 659, G5: 784, A5: 880, C6: 1047, D6: 1175, E6: 1319 };

const PATCHES = {
  tap: (t) => thump(t, 0.18, 90),
  tick: (t) => beep(t, 988, 0.1, 0.06),
  tab: (t) => kalimba(N.E5, t, 0.16, 0.6),
  toggle: (t) => { kalimba(N.C5, t, 0.14, 0.5); kalimba(N.G5, t + 0.07, 0.13, 0.5); },
  check: (t) => { beep(t, 1175, 0.08, 0.05); kalimba(N.A5, t + 0.03, 0.12, 0.5); },
  open: (t) => wash(t, 0.45, { g: 0.1, from: 300, to: 2400 }),
  close: (t) => wash(t, 0.35, { g: 0.08, from: 2000, to: 300 }),
  next: (t) => { lubdub(t, 0.32); kalimba(N.G5, t + 0.1, 0.15, 0.6); },
  back: (t) => { kalimba(N.G5, t, 0.14, 0.5); kalimba(N.D5, t + 0.08, 0.14, 0.5); },
  ok: (t) => { beep(t, 880, 0.12); beep(t + 0.12, 1320, 0.12); },
  error: (t) => { osc(220, t, 0.14, { type: 'square', g: 0.08, lp: 900 }); osc(196, t + 0.16, 0.2, { type: 'square', g: 0.08, lp: 800 }); },
  copy: (t) => kalimba(N.E6, t, 0.12, 0.5),
  themeLight: (t) => { wash(t, 0.6, { g: 0.08, from: 400, to: 4000 }); [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => kalimba(f, t + 0.1 + i * 0.06, 0.11, 0.6)); },
  themeDark: (t) => { wash(t, 0.6, { g: 0.08, from: 3000, to: 300 }); [N.C6, N.G5, N.E5, N.C5].forEach((f, i) => kalimba(f, t + 0.1 + i * 0.07, 0.11, 0.7)); },
  // option signatures
  'sel-d30': (t) => { [N.E5, N.G5, N.C6].forEach((f, i) => kalimba(f, t + i * 0.07, 0.17)); wash(t, 0.4, { g: 0.04, from: 1200, to: 4000 }); },
  'done-d30': (t) => { [N.C5, N.D5, N.E5, N.G5, N.A5, N.C6, N.E6].forEach((f, i) => kalimba(f, t + i * 0.08, 0.16)); wash(t, 1.2, { g: 0.05, from: 600, to: 3000 }); },
  'sel-d60': (t) => [N.F4, N.A4, N.C5].forEach((f) => osc(f, t, 1.2, { type: 'triangle', g: 0.06, a: 0.3, lp: 1400 })),
  'done-d60': (t) => { [N.F4, N.A4, N.C5, N.E5].forEach((f) => osc(f, t, 2, { type: 'triangle', g: 0.06, a: 0.4, lp: 1600 })); [N.C6, N.A5, N.E6].forEach((f, i) => kalimba(f, t + 0.6 + i * 0.22, 0.09)); },
  'sel-d90': (t) => { osc(N.G4, t, 1, { g: 0.16 }); osc(N.G4 * 2, t, 0.6, { g: 0.06 }); },
  'done-d90': (t) => [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => { osc(f, t + i * 0.14, 1.2, { g: 0.12 }); osc(f * 2, t + i * 0.14, 0.6, { g: 0.04 }); }),
  'sel-hold': (t) => wash(t, 1.1, { g: 0.12, from: 200, to: 1200 }),
  'done-hold': (t) => { wash(t, 1.4, { g: 0.12, from: 200, to: 1400 }); wash(t + 1, 1.4, { g: 0.08, from: 1400, to: 200 }); [N.E5, N.C5, N.A4].forEach((f, i) => kalimba(f, t + 0.4 + i * 0.25, 0.1, 1.2)); },
  'sel-del': (t) => { thump(t, 0.32, 65); thump(t + 0.3, 0.24, 55); },
  'done-del': (t) => { [N.E5, N.C5, N.A4, N.F4].forEach((f, i) => kalimba(f, t + i * 0.18, 0.12, 1.1)); wash(t + 0.4, 1.2, { g: 0.04, from: 800, to: 200 }); },
  'sel-react': (t) => { lubdub(t, 0.42); lubdub(t + 0.6, 0.42); },
  'done-react': (t) => { lubdub(t, 0.4); lubdub(t + 0.5, 0.45); lubdub(t + 0.9, 0.5); [N.C5, N.E5, N.G5, N.C6, N.E6].forEach((f, i) => kalimba(f, t + 1.2 + i * 0.07, 0.15)); beep(t + 1.6, 1320, 0.08, 0.12); },
};

export const sound = {
  get enabled() { return enabled; },
  setEnabled(v) { enabled = !!v; },
  unlock() { ensure(); },
  play(name = 'tick') {
    const now = performance.now();
    if (name === lastName && now - lastAt < 60) return;
    lastAt = now; lastName = name;
    const c = ensure(); if (!c) return;
    try { (PATCHES[name] || PATCHES.tick)(c.currentTime + 0.005); } catch { /* ignore */ }
  },
  names: Object.keys(PATCHES),
};
