/**
 * Web-Audio synthesiser – zero audio files, zero network requests.
 *
 *  • Every language has its own instrument + scale (lib/languages.js): a tap in Japanese sounds like a koto,
 *    in Spanish like a flamenco guitar … The 80 auto-translated languages get a generated voice.
 *  • Choosing a language plays its signature melody (MyFrequentRewards signature system, ported).
 *  • Every one of the 25 profiles / surveys has its own SOUND THEME (instrument, scale and motif) that plays
 *    when it opens and when it is completed (PROFILE_SOUNDS below).
 *  • Every click in the section makes a soft sound (sound.click(), wired globally in App.jsx).
 *  • Rewards: sound.drop() pipette drop into a well · sound.points() coins · sound.quality() rising sparkle ·
 *    sound.levelUp() fanfare · sound.fly() token flight · sound.chime() lands in the header ·
 *    sound.lock() / sound.unlock() / sound.locked() for surveys.
 */
import { LANG_BY_CODE } from './languages.js';

let ctx = null;
let master = null;
let send = null;
let muted = false;
let lang = 'en';
const cache = new Map();

function ac() {
  if (ctx) return ctx;
  const C = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!C) return null;
  ctx = new C({ latencyHint: 'interactive' });
  master = ctx.createGain();
  master.gain.value = 0.5;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 4;
  master.connect(comp).connect(ctx.destination);
  // a light "room": feedback delay through a low-pass (used by the signature instruments)
  send = ctx.createGain();
  send.gain.value = 0.2;
  const d = ctx.createDelay(1); d.delayTime.value = 0.19;
  const fb = ctx.createGain(); fb.gain.value = 0.3;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
  send.connect(d).connect(lp).connect(fb).connect(d);
  lp.connect(master);
  return ctx;
}
/* browsers only allow audio after a user gesture: never create the AudioContext before one */
let gestured = false;
if (typeof window !== 'undefined') {
  const g = () => { gestured = true; };
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => addEventListener(e, g, { capture: true, once: true, passive: true }));
}
function ready() {
  if (muted || !gestured) return null;
  const c = ac();
  if (!c) return null;
  if (c.state === 'suspended') c.resume().catch(() => {});
  return c;
}
const hz = (root, semi) => root * Math.pow(2, semi / 12);
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

/* ---------- Karplus–Strong plucked string (cached buffers) ---------- */
const PLUCK = {
  guzheng: { decay: 0.996, bright: 0.65, dur: 1.4 },
  guitar: { decay: 0.994, bright: 0.5, dur: 1.1 },
  oud: { decay: 0.992, bright: 0.35, dur: 1.0 },
  koto: { decay: 0.995, bright: 0.8, dur: 1.3 },
  gayageum: { decay: 0.995, bright: 0.55, dur: 1.4 },
  sitar: { decay: 0.997, bright: 0.9, dur: 1.6, buzz: true },
  mandolin: { decay: 0.99, bright: 0.85, dur: 0.6 },
  balalaika: { decay: 0.989, bright: 0.7, dur: 0.55 },
};
function ksBuffer(c, freq, p) {
  const key = `${freq.toFixed(1)}|${p.decay}|${p.bright}|${p.buzz ? 1 : 0}`;
  if (cache.has(key)) return cache.get(key);
  const sr = c.sampleRate;
  const len = Math.floor(sr * p.dur);
  const buf = c.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  const N = Math.max(2, Math.round(sr / freq));
  let last = 0;
  for (let i = 0; i < N; i++) {
    const n = Math.random() * 2 - 1;
    last = last + p.bright * (n - last); // low-pass the excitation for darker tone
    d[i] = last;
  }
  for (let i = N; i < len; i++) d[i] = p.decay * 0.5 * (d[i - N] + d[i - N + 1]);
  if (p.buzz) for (let i = 0; i < len; i++) d[i] = Math.tanh(d[i] * 2.4) * 0.6; // jawari-like buzz (outside the feedback loop)
  cache.set(key, buf);
  return buf;
}

function pluck(c, t, freq, inst, opts = {}) {
  const p = PLUCK[inst];
  const src = c.createBufferSource();
  src.buffer = ksBuffer(c, freq, p);
  const g = c.createGain();
  g.gain.value = opts.gain ?? 0.9;
  if (opts.vibrato) {
    const lfo = c.createOscillator();
    const lg = c.createGain();
    lfo.frequency.value = 5.5;
    lg.gain.value = 0.012;
    lfo.connect(lg).connect(src.playbackRate);
    lfo.start(t + 0.12);
    lfo.stop(t + p.dur);
  }
  src.connect(g).connect(master);
  src.start(t);
}

/* ---------- Mallets & bells (additive synthesis) ---------- */
const BELL = {
  chime: { partials: [1, 2.76, 5.4], decays: [1.2, 0.6, 0.3], gains: [0.5, 0.18, 0.08], wave: 'sine' },
  glockenspiel: { partials: [1, 2.0, 3.0, 4.07], decays: [1.4, 0.8, 0.4, 0.25], gains: [0.45, 0.1, 0.12, 0.05], wave: 'sine' },
  marimba: { partials: [1, 4.0, 9.9], decays: [0.45, 0.12, 0.05], gains: [0.6, 0.12, 0.04], wave: 'sine' },
};
function bell(c, t, freq, inst, gain = 1) {
  const b = BELL[inst];
  b.partials.forEach((m, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = b.wave;
    o.frequency.value = freq * m;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(b.gains[i] * gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + b.decays[i]);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + b.decays[i] + 0.05);
  });
}

/* ---------- Reed (accordion) ---------- */
function reed(c, t, freq, dur = 0.28, gain = 0.22) {
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 2400;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.03);
  g.gain.setValueAtTime(gain, t + dur * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  [-6, 0, 7].forEach((cents) => {
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    o.detune.value = cents;
    o.connect(f);
    o.start(t);
    o.stop(t + dur + 0.02);
  });
  f.connect(g).connect(master);
}

function drone(c, t, freq, dur) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'triangle';
  o.frequency.value = freq / 2;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.08, t + 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/* ---------- note dispatcher ---------- */
function note(c, t, s, semi, gain = 0.9) {
  const f = hz(s.root, semi);
  if (PLUCK[s.inst]) {
    if (s.tremolo) {
      for (let k = 0; k < 4; k++) pluck(c, t + k * 0.045, f, s.inst, { gain: gain * (1 - k * 0.18) });
    } else pluck(c, t, f, s.inst, { gain, vibrato: s.vibrato });
    if (s.strum) pluck(c, t + 0.018, hz(s.root, semi + 7), s.inst, { gain: gain * 0.45 });
  } else if (BELL[s.inst]) bell(c, t, f, s.inst, gain);
  else reed(c, t, f, 0.26, 0.2 * gain);
}


/* ---------- reward helpers ---------- */
let noiseBuf = null;
function noise(c) {
  if (noiseBuf) return noiseBuf;
  noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}
/** band-passed noise burst whose centre frequency sweeps from f0 to f1 */
function sweep(c, t, dur, f0, f1, gain = 0.18, q = 1.4) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass'; bp.Q.value = q;
  bp.frequency.setValueAtTime(f0, t);
  bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(master);
  src.start(t); src.stop(t + dur + 0.05);
}
/** soft low "thump" (stamp pressed onto the card) */
function thump(c, t, f = 62, gain = 0.5) {
  const o = c.createOscillator(); const g = c.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(f * 1.8, t);
  o.frequency.exponentialRampToValueAtTime(f, t + 0.08);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.25);
}


/* ---------- signature instruments (from MyFrequentRewards) ---------- */
function env(g, t, a, peak, decay, sustain = 0.0001) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(Math.max(sustain, 0.0001), t + a + decay);
}
function osc(type, f, t, stop, dest, detune = 0) {
  const o = ctx.createOscillator();
  o.type = type; o.frequency.setValueAtTime(f, t); o.detune.value = detune;
  o.connect(dest); o.start(t); o.stop(stop);
  return o;
}
function voice(peak, t, a, decay, wet = true) {
  const g = ctx.createGain();
  env(g, t, a, peak, decay);
  g.connect(master);
  if (wet) g.connect(send);
  return g;
}
const INST = {
  bell(f, t, v) { const g = voice(0.32 * v, t, 0.005, 2.2); [[1, 1], [2.76, 0.45], [5.4, 0.2], [8.93, 0.08]].forEach(([m, a]) => { const gg = ctx.createGain(); gg.gain.value = a; gg.connect(g); osc('sine', f * m, t, t + 2.4, gg); }); },
  gamelan(f, t, v) { const g = voice(0.3 * v, t, 0.004, 1.8); osc('sine', f, t, t + 2, g); osc('sine', f * 1.006, t, t + 2, g); const h = ctx.createGain(); h.gain.value = 0.3; h.connect(g); osc('sine', f * 3.01, t, t + 1, h); },
  glock(f, t, v) { const g = voice(0.24 * v, t, 0.002, 0.9); osc('sine', f * 2, t, t + 1, g); const h = ctx.createGain(); h.gain.value = 0.25; h.connect(g); osc('sine', f * 5.6, t, t + 0.4, h); },
  marimba(f, t, v) { const g = voice(0.34 * v, t, 0.003, 0.5); osc('sine', f, t, t + 0.6, g); const h = ctx.createGain(); env(h, t, 0.002, 0.3, 0.08); h.connect(g); osc('sine', f * 4, t, t + 0.2, h); },
  kalimba(f, t, v) { const g = voice(0.3 * v, t, 0.002, 0.9); osc('triangle', f, t, t + 1, g); const h = ctx.createGain(); env(h, t, 0.001, 0.4, 0.06); h.connect(g); osc('sine', f * 5.95, t, t + 0.15, h); },
  steel(f, t, v) { const g = voice(0.28 * v, t, 0.004, 0.8); [[1, 1], [2, 0.5], [3, 0.22], [4.2, 0.1]].forEach(([m, a]) => { const gg = ctx.createGain(); gg.gain.value = a; gg.connect(g); osc('sine', f * m, t, t + 0.9, gg); }); },
  pluck(f, t, v, o = {}) {
    const g = voice(0.26 * v, t, 0.003, o.decay || 0.7);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2;
    lp.frequency.setValueAtTime(f * 9, t); lp.frequency.exponentialRampToValueAtTime(f * 1.4, t + 0.35); lp.connect(g);
    const s = osc(o.wave || 'sawtooth', f, t, t + (o.decay || 0.7) + 0.1, lp);
    if (o.bend) { s.frequency.setValueAtTime(f * 0.97, t); s.frequency.exponentialRampToValueAtTime(f, t + 0.06); }
  },
  sitar(f, t, v) { INST.pluck(f, t, v, { decay: 1.1, bend: true }); const g = voice(0.05 * v, t, 0.01, 0.8); const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 6; bp.Q.value = 6; bp.connect(g); osc('sawtooth', f, t, t + 0.9, bp, 8); },
  harp(f, t, v) { INST.pluck(f, t, v, { wave: 'triangle', decay: 1.2 }); },
  flute(f, t, v, o = {}) {
    const d = o.len || 0.42;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22 * v, t + 0.06);
    g.gain.setValueAtTime(0.2 * v, t + d * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.25);
    g.connect(master); g.connect(send);
    const s = osc(o.wave || 'sine', f, t, t + d + 0.3, g);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 5.4;
    const lg = ctx.createGain(); lg.gain.value = f * 0.006; lfo.connect(lg).connect(s.frequency); lfo.start(t); lfo.stop(t + d + 0.3);
    if (o.glide) { s.frequency.setValueAtTime(f * 0.94, t); s.frequency.exponentialRampToValueAtTime(f, t + 0.12); }
  },
  reed(f, t, v) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.14 * v, t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = f * 4; lp.connect(g); g.connect(master); g.connect(send);
    const s = osc('square', f, t, t + 0.65, lp); const lfo = ctx.createOscillator(); lfo.frequency.value = 6; const lg = ctx.createGain(); lg.gain.value = f * 0.008; lfo.connect(lg).connect(s.frequency); lfo.start(t); lfo.stop(t + 0.65);
  },
  accordion(f, t, v) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.11 * v, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200; lp.connect(g); g.connect(master); g.connect(send);
    osc('square', f, t, t + 0.6, lp, -7); osc('sawtooth', f, t, t + 0.6, lp, 7);
  },
  brass(f, t, v) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16 * v, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(f * 1.5, t); lp.frequency.exponentialRampToValueAtTime(f * 6, t + 0.08); lp.frequency.exponentialRampToValueAtTime(f * 2.5, t + 0.5);
    lp.connect(g); g.connect(master); g.connect(send);
    osc('sawtooth', f, t, t + 0.75, lp); osc('sawtooth', f, t, t + 0.75, lp, 9);
  },
  piano(f, t, v) { const g = voice(0.3 * v, t, 0.003, 1.3); osc('triangle', f, t, t + 1.4, g); const h = ctx.createGain(); env(h, t, 0.002, 0.35, 0.3); h.connect(g); osc('sine', f * 2, t, t + 0.5, h); },
  chip(f, t, v) { const g = voice(0.09 * v, t, 0.002, 0.18, false); osc('square', f, t, t + 0.22, g); },
  pad(f, t, v) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07 * v, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400; lp.connect(g); g.connect(master); g.connect(send);
    osc('sawtooth', f, t, t + 1.7, lp, -10); osc('sawtooth', f, t, t + 1.7, lp, 10);
  },
  heart(f, t, v) { thump(ctx, t, 58, 0.55 * v); thump(ctx, t + 0.16, 52, 0.4 * v); },
};
const S = {
  maj: [0, 2, 4, 5, 7, 9, 11], min: [0, 2, 3, 5, 7, 8, 10], penta: [0, 2, 4, 7, 9], minPenta: [0, 3, 5, 7, 10],
  in: [0, 1, 5, 7, 8], yaman: [0, 2, 4, 6, 7, 9, 11], bhairav: [0, 1, 4, 5, 7, 8, 11], hijaz: [0, 1, 4, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10], harm: [0, 2, 3, 5, 7, 8, 11], lyd: [0, 2, 4, 6, 7, 9, 11], mixo: [0, 2, 4, 5, 7, 9, 10],
  phryg: [0, 1, 3, 5, 7, 8, 10], pelog: [0, 1, 3, 7, 8], slendro: [0, 2, 5, 7, 9], whole: [0, 2, 4, 6, 8, 10],
};
const deg = (scale, root, d) => { const n = scale.length, o = Math.floor(d / n), i = ((d % n) + n) % n; return midi(root + scale[i] + 12 * o); };
/* language signatures: inst, scale, root (MIDI), degrees, step (s), options */
const SIGNATURES = {
  en: ['harp', 'maj', 72, [0, 2, 4, 7], 0.09, { chord: [0, 2, 4] }],
  zh: ['pluck', 'penta', 69, [5, 4, 3, 2, 1, 2, 4], 0.065, { tail: 'bell' }],
  'zh-TW': ['flute', 'penta', 74, [0, 2, 1, 3, 4], 0.14, { glide: true }],
  hi: ['sitar', 'yaman', 62, [0, 2, 3, 4, 6, 7], 0.11, { drone: true }],
  es: ['pluck', 'phryg', 64, [4, 3, 2, 1, 0], 0.085, { strum: true }],
  ar: ['flute', 'hijaz', 62, [0, 1, 2, 3, 4, 3, 2], 0.12, { glide: true, wave: 'triangle' }],
  bn: ['flute', 'penta', 67, [0, 1, 2, 4, 3, 2], 0.13, {}],
  pt: ['marimba', 'mixo', 67, [0, 2, 4, 5, 4, 7], 0.1, { swing: true }],
  ru: ['bell', 'min', 57, [7, 4, 2, 0], 0.18, { chord: [0, 2, 4] }],
  ja: ['pluck', 'in', 69, [0, 1, 2, 4, 3], 0.11, { wave: 'triangle' }],
  fr: ['accordion', 'maj', 69, [0, 2, 4, 2, 7, 4], 0.11, { swing: true }],
  de: ['brass', 'maj', 60, [0, 2, 4, 7], 0.12, { chord: [0, 2, 4] }],
  ko: ['glock', 'penta', 76, [0, 2, 4, 3, 5], 0.08, {}],
  it: ['pluck', 'maj', 72, [0, 2, 4, 7], 0.12, { tremolo: true, wave: 'triangle' }],
  tr: ['pluck', 'hijaz', 64, [0, 1, 2, 1, 0, 4], 0.09, { bend: true }],
  vi: ['flute', 'penta', 69, [0, 2, 1, 3, 2], 0.14, { glide: true }],
  ur: ['accordion', 'yaman', 60, [0, 2, 4, 5, 4], 0.13, { drone: true }],
  id: ['gamelan', 'pelog', 67, [0, 1, 2, 4, 3, 2], 0.11, {}],
  th: ['marimba', 'penta', 72, [0, 1, 2, 3, 4, 3, 4], 0.07, {}],
  fa: ['pluck', 'harm', 64, [0, 2, 3, 1, 0, 4], 0.075, { tremolo: true, wave: 'triangle' }],
  pl: ['piano', 'harm', 64, [0, 2, 4, 3, 7], 0.13, {}],
  uk: ['pluck', 'min', 62, [0, 2, 4, 3, 4, 7], 0.1, { wave: 'triangle' }],
  nl: ['bell', 'maj', 72, [0, 1, 2, 4], 0.14, {}],
  ms: ['steel', 'slendro', 69, [0, 1, 2, 3, 2], 0.1, {}],
  fil: ['harp', 'maj', 67, [0, 2, 4, 5, 7], 0.09, { chord: [0, 2, 4] }],
  sw: ['kalimba', 'penta', 67, [0, 2, 1, 3, 2, 4], 0.1, {}],
  he: ['reed', 'hijaz', 62, [0, 1, 2, 3, 4], 0.12, {}],
  ta: ['sitar', 'maj', 62, [0, 2, 4, 6, 4], 0.12, { drone: true }],
  te: ['flute', 'yaman', 67, [4, 3, 2, 1, 0], 0.12, { glide: true }],
  mr: ['sitar', 'bhairav', 60, [0, 1, 2, 3, 4], 0.12, { drone: true }],
  gu: ['steel', 'maj', 67, [0, 0, 2, 4, 4, 7], 0.09, { swing: true }],
  kn: ['pluck', 'penta', 64, [0, 1, 2, 3, 4, 3], 0.1, { wave: 'triangle', bend: true }],
  ml: ['glock', 'minPenta', 69, [0, 1, 2, 4], 0.11, { drone: true }],
  pa: ['pluck', 'mixo', 76, [0, 0, 4, 0, 5, 4], 0.075, { wave: 'square', decay: 0.3 }],
};
const INST_KEYS = ['bell', 'glock', 'marimba', 'kalimba', 'steel', 'harp', 'flute', 'pluck', 'piano', 'gamelan'];
const hashOf = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
function signatureFor(code) {
  if (SIGNATURES[code]) return SIGNATURES[code];
  const h = hashOf(code), keys = Object.keys(S);
  const len = 4 + ((h >> 12) % 3);
  return [INST_KEYS[h % INST_KEYS.length], keys[(h >> 4) % keys.length], 62 + ((h >> 8) % 12), Array.from({ length: len }, (_, i) => ((h >> (i * 3)) % 5) + (i > len / 2 ? 1 : 0)), 0.1, {}];
}
function playMotif([inst, scName, root, degs, step, o]) {
  const c = ready(); if (!c) return;
  const scale = S[scName], f0 = INST[inst];
  const t = c.currentTime + 0.02;
  if (o.drone) INST.pad(midi(root - 12), t, 1.2);
  degs.forEach((d, i) => {
    const f = deg(scale, root, d);
    const tt = t + i * step + (o.swing && i % 2 ? step * 0.3 : 0);
    if (o.tremolo) [0, 1, 2].forEach((k) => f0(f, tt + k * step * 0.28, 0.6, o));
    else if (o.strum) { f0(f, tt, 1, o); f0(f * 1.5, tt + 0.012, 0.5, o); }
    else f0(f, tt, 1, o);
  });
  const end = t + degs.length * step;
  if (o.chord) o.chord.forEach((d, i) => f0(deg(scale, root, d), end + i * 0.015, 0.7, o));
  if (o.tail) INST[o.tail](deg(scale, root, 7), end + 0.05, 0.8);
}

/* ---------- a unique sound theme for every profile / survey ---------- */
export const PROFILE_SOUNDS = {
  basic: ['harp', 'maj', 67, [0, 2, 4, 7, 9], 0.08, { chord: [0, 2, 4] }],
  digital: ['chip', 'penta', 76, [0, 2, 4, 5, 7, 9, 10], 0.055, {}],
  education: ['bell', 'maj', 72, [4, 2, 0, 4, 7], 0.13, {}],
  work: ['brass', 'mixo', 60, [0, 4, 7, 4, 9], 0.1, { chord: [0, 2, 4] }],
  survey: ['kalimba', 'penta', 70, [0, 2, 4, 3, 5, 7], 0.08, {}],
  social: ['steel', 'maj', 74, [0, 4, 2, 5, 7], 0.08, {}],
  'general-health': ['flute', 'lyd', 69, [0, 2, 4, 6, 7], 0.12, { glide: true }],
  conditions: ['glock', 'dorian', 72, [0, 2, 3, 5, 7, 9], 0.08, {}],
  symptoms: ['marimba', 'min', 64, [7, 5, 4, 2, 4, 7], 0.08, { drone: true }],
  'personal-health': ['heart', 'maj', 60, [0], 0.3, { tail: 'piano' }],
  treatment: ['harp', 'lyd', 65, [0, 2, 4, 6, 8, 9], 0.08, {}],
  medication: ['marimba', 'penta', 74, [0, 4, 2, 5, 3, 6], 0.065, { swing: true }],
  providers: ['piano', 'maj', 67, [0, 2, 4, 7, 4, 9], 0.1, {}],
  diagnostics: ['gamelan', 'whole', 72, [0, 1, 2, 3, 4], 0.09, {}],
  devices: ['chip', 'lyd', 72, [0, 4, 2, 6, 4, 7], 0.06, {}],
  hospital: ['bell', 'penta', 64, [0, 2, 4], 0.22, { chord: [0, 2, 4] }],
  insurance: ['brass', 'maj', 58, [0, 2, 4, 7], 0.12, {}],
  lifestyle: ['flute', 'penta', 67, [0, 1, 2, 4, 3], 0.16, { drone: true }],
  food: ['marimba', 'mixo', 69, [0, 2, 4, 2, 5, 4, 7], 0.07, { swing: true }],
  decisions: ['piano', 'harm', 64, [0, 2, 4, 3, 7], 0.12, {}],
  info: ['glock', 'lyd', 76, [0, 4, 6, 7, 11], 0.07, {}],
  research: ['gamelan', 'pelog', 67, [0, 1, 2, 4, 3, 2], 0.1, {}],
  eligibility: ['kalimba', 'maj', 69, [7, 4, 2, 0, 7], 0.08, {}],
  verification: ['bell', 'maj', 60, [0, 4], 0.2, { tail: 'glock' }],
  additional: ['steel', 'lyd', 67, [0, 2, 4, 6, 7, 9, 11, 14], 0.06, {}],
};
const profileSound = (id) => PROFILE_SOUNDS[id] || signatureFor('p:' + id);

/* generated tap voice for the auto-translated languages */
const TAP_INSTS = ['chime', 'glockenspiel', 'marimba', 'koto', 'guitar', 'mandolin', 'gayageum', 'guzheng'];
const SCALES = [[0, 2, 4, 7, 9, 12, 14, 16], [0, 2, 3, 5, 7, 8, 10, 12], [0, 2, 4, 5, 7, 9, 11, 12], [0, 3, 5, 7, 10, 12, 15, 17]];

const specCache = new Map();
const spec = () => {
  const l = LANG_BY_CODE[lang] || LANG_BY_CODE.en;
  if (l.sound) return l.sound;
  if (!specCache.has(lang)) {
    const h = hashOf(lang);
    specCache.set(lang, { inst: TAP_INSTS[h % TAP_INSTS.length], root: 330 + (h % 9) * 22, scale: SCALES[(h >> 3) % SCALES.length], motif: [0, 2, 4, 5, 7], tempo: 0.09 });
  }
  return specCache.get(lang);
};

let lastClick = 0;
export const sound = {
  setLang(code) { lang = code; },
  setMuted(m) { muted = !!m; if (m && ctx) ctx.suspend().catch(() => {}); },
  isMuted: () => muted,
  /** call from the first user gesture so iOS allows audio */
  unlock() { const c = ready(); if (c) { const b = c.createBuffer(1, 1, 22050); const s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); } },
  /** generic soft click for any button / link in the section (skipped if a richer sound just played) */
  click(kind = 'press') {
    const c = ready(); if (!c) return;
    if (c.currentTime - lastClick < 0.06) return;
    lastClick = c.currentTime;
    const s = spec(); const t = c.currentTime + 0.003;
    note(c, t, s, s.scale[kind === 'soft' ? 2 : 4] + 12, kind === 'soft' ? 0.28 : 0.38);
  },
  mark() { if (ctx) lastClick = ctx.currentTime; },
  tap(i = 0) {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const s = spec();
    note(c, c.currentTime + 0.005, s, s.scale[Math.abs(i) % s.scale.length], 0.75);
  },
  next() {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const s = spec(); const t = c.currentTime + 0.005;
    note(c, t, s, s.scale[2], 0.5);
    note(c, t + 0.07, s, s.scale[4] ?? 7, 0.6);
  },
  back() {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const s = spec(); const t = c.currentTime + 0.005;
    note(c, t, s, s.scale[3] ?? 5, 0.45);
    note(c, t + 0.07, s, s.scale[0], 0.45);
  },
  error() {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const t = c.currentTime + 0.005;
    [0, 0.09].forEach((d) => {
      const o = c.createOscillator(); const g = c.createGain();
      o.type = 'square'; o.frequency.value = 180;
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.06, t + d + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.08);
      o.connect(g).connect(master); o.start(t + d); o.stop(t + d + 0.1);
    });
  },
  toggle(on) {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const t = c.currentTime + 0.005;
    bell(c, t, on ? 880 : 660, 'marimba', 0.6);
    bell(c, t + 0.06, on ? 1320 : 440, 'marimba', 0.5);
  },
  /** language signature melody (played when a language is chosen) */
  signature(code) { if (ready()) { lastClick = ctx.currentTime; playMotif(signatureFor(code)); } },
  /** a profile / survey opens: the first notes of its own theme */
  open(id) { if (!ready()) return; lastClick = ctx.currentTime; const m = profileSound(id); playMotif([m[0], m[1], m[2], m[3].slice(0, 3), m[4], {}]); },
  /** completion: the profile's full theme + a language-scale fanfare */
  celebrate(id) {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    if (id) playMotif(profileSound(id));
    const s = spec();
    let t = c.currentTime + (id ? 0.55 : 0.02);
    [0, 2, 4, 5, 7].map((i) => s.scale[i % s.scale.length]).forEach((semi) => { note(c, t, s, semi, 0.55); t += 0.07; });
    bell(c, t + 0.1, hz(s.root, 24), 'chime', 0.45);
  },
  /** pipette drop into a well: a "bloop" */
  drop() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(320, t); o.frequency.exponentialRampToValueAtTime(1150, t + 0.12);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.22);
    sweep(c, t + 0.1, 0.18, 1800, 600, 0.06, 3);
  },
  /** +points: coin shimmer */
  points() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    INST.steel(midi(88), t, 0.7); INST.steel(midi(95), t + 0.07, 0.6); INST.glock(midi(91), t + 0.13, 0.5);
  },
  /** +quality score: rising sparkle */
  quality() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    [79, 83, 86, 91, 95].forEach((m, i) => INST.glock(midi(m), t + i * 0.045, 0.4));
  },
  levelUp() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.02;
    [60, 64, 67, 72].forEach((m, i) => INST.brass(midi(m), t + i * 0.1, 0.7));
    [72, 76, 79].forEach((m) => INST.brass(midi(m), t + 0.45, 0.6));
    [84, 88, 91, 96].forEach((m, i) => INST.glock(midi(m), t + 0.58 + i * 0.07, 0.4));
  },
  /** the reward token flies to the header */
  fly() {
    const c = ready(); if (!c) return;
    const s = spec(); let t = c.currentTime + 0.01;
    [0, 1, 2, 3, 4].forEach((i) => { note(c, t, s, s.scale[i % s.scale.length] + 12, 0.25); t += 0.06; });
    sweep(c, c.currentTime, 0.5, 600, 3200, 0.06, 1.2);
  },
  /** lands in the header counter */
  chime() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.005;
    note(c, t, s, s.scale[4 % s.scale.length] + 12, 0.5);
    note(c, t + 0.08, s, s.scale[0] + 24, 0.45);
    bell(c, t + 0.12, hz(s.root, 31), 'chime', 0.32);
  },
  /** a heartbeat on the monitor */
  beat() { const c = ready(); if (!c) return; thump(c, c.currentTime + 0.01, 70, 0.35); thump(c, c.currentTime + 0.17, 60, 0.25); },
  /** clicked a locked survey: a soft padlock rattle + low note */
  locked() {
    const c = ready(); if (!c) return;
    lastClick = c.currentTime;
    const t = c.currentTime + 0.01;
    [0, 0.07, 0.14].forEach((d) => sweep(c, t + d, 0.05, 4200, 2600, 0.08, 6));
    INST.marimba(midi(50), t + 0.05, 0.6); INST.marimba(midi(53), t + 0.18, 0.4);
  },
  /** a survey unlocks: latch click + bright chord */
  unlocked() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    thump(c, t, 180, 0.25); sweep(c, t, 0.06, 5000, 2500, 0.1, 5);
    [72, 76, 79, 84].forEach((m, i) => INST.bell(midi(m), t + 0.12 + i * 0.06, 0.35));
  },
  /** split-flap / counter tick */
  flap() {
    const c = ready(); if (!c) return;
    sweep(c, c.currentTime + 0.002, 0.035, 3800, 2400, 0.06, 5);
  },
  /** dialog / sheet opens */
  whoosh() { const c = ready(); if (!c) return; lastClick = c.currentTime; sweep(c, c.currentTime + 0.005, 0.28, 500, 2400, 0.08, 1.2); },
};
