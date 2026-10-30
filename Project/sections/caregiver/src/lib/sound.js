/**
 * Tiny Web-Audio synthesiser – zero audio files, zero network requests.
 * Every language has its own instrument + scale (see languages.js), so a
 * tap in Japanese sounds like a koto, in Spanish like a flamenco guitar, etc.
 *
 * Public API
 *   sound.setLang(code)  sound.setMuted(bool)  sound.isMuted()
 *   sound.tap(i)         – option selected (i = option index → pitch)
 *   sound.next() / back() / error() / toggle(on)
 *   sound.signature(code) – language signature melody
 *   sound.celebrate()     – completion fanfare in the current language
 */
import { LANG_BY_CODE } from './languages.js';

let ctx = null;
let master = null;
let muted = false;
let lang = 'en';
const cache = new Map();

function ac() {
  if (ctx) return ctx;
  const C = window.AudioContext || window.webkitAudioContext;
  if (!C) return null;
  ctx = new C({ latencyHint: 'interactive' });
  master = ctx.createGain();
  master.gain.value = 0.55;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 4;
  master.connect(comp).connect(ctx.destination);
  return ctx;
}
let lastPlay = 0;
function ready() {
  if (muted) return null;
  const c = ac();
  if (!c) return null;
  if (c.state === 'suspended') c.resume().catch(() => {});
  lastPlay = performance.now();
  return c;
}
const hz = (root, semi) => root * Math.pow(2, semi / 12);

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


/* ---------- v2.0 helpers: noise sweep + soft thump ---------- */
let noiseBuf = null;
function noise(c) {
  if (noiseBuf) return noiseBuf;
  noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}
function sweep(c, t, dur, f0, f1, gain = 0.18, q = 1.4) {
  const src = c.createBufferSource(); src.buffer = noise(c);
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q;
  bp.frequency.setValueAtTime(f0, t); bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(master); src.start(t); src.stop(t + dur + 0.05);
}
function thump(c, t, f = 62, gain = 0.5) {
  const o = c.createOscillator(); const g = c.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(f * 1.8, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.08);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.25);
}

const spec = () => (LANG_BY_CODE[lang] || LANG_BY_CODE.en).sound;

export const sound = {
  setLang(code) { lang = code; },
  setMuted(m) { muted = !!m; if (m && ctx) ctx.suspend().catch(() => {}); },
  isMuted: () => muted,
  /** call from first user gesture so iOS allows audio */
  unlock() { const c = ready(); if (c) { const b = c.createBuffer(1, 1, 22050); const s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); } },
  tap(i = 0) {
    const c = ready(); if (!c) return;
    const s = spec();
    note(c, c.currentTime + 0.005, s, s.scale[Math.abs(i) % s.scale.length], 0.75);
  },
  next() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.005;
    note(c, t, s, s.scale[2], 0.5);
    note(c, t + 0.07, s, s.scale[4] ?? 7, 0.6);
  },
  back() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.005;
    note(c, t, s, s.scale[3] ?? 5, 0.45);
    note(c, t + 0.07, s, s.scale[0], 0.45);
  },
  error() {
    const c = ready(); if (!c) return;
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
    const t = c.currentTime + 0.005;
    bell(c, t, on ? 880 : 660, 'marimba', 0.6);
    bell(c, t + 0.06, on ? 1320 : 440, 'marimba', 0.5);
  },
  /** Signature melody of a language (played when it is chosen) */
  signature(code) {
    const c = ready(); if (!c) return;
    const s = (LANG_BY_CODE[code] || LANG_BY_CODE.en).sound;
    let t = c.currentTime + 0.02;
    if (s.drone) drone(c, t, s.root, s.motif.length * s.tempo + 1.2);
    s.motif.forEach((step, k) => {
      const swing = s.swing && k % 2 ? s.tempo * 0.35 : 0;
      note(c, t + swing, s, s.scale[step % s.scale.length] + (step >= s.scale.length ? 12 : 0), 0.85);
      t += s.tempo;
    });
  },
  /** Completion fanfare: arpeggio up the language scale + final chord */
  celebrate() {
    const c = ready(); if (!c) return;
    const s = spec();
    let t = c.currentTime + 0.02;
    const steps = [0, 2, 4, 5, 7].map((i) => s.scale[i % s.scale.length]);
    steps.forEach((semi) => { note(c, t, s, semi, 0.8); t += 0.075; });
    [0, 4, 7].forEach((i) => note(c, t + 0.05, s, s.scale[i % s.scale.length] + 12, 0.55));
    bell(c, t + 0.12, hz(s.root, 24), 'chime', 0.5);
  },
  /** Care Points reward: the gift box bursts open – chime shimmer + glissando up the language scale */
  reward() {
    const c = ready(); if (!c) return;
    const s = spec();
    let t = c.currentTime + 0.02;
    [2.4, 3.1, 2.7, 3.6].forEach((m, k) => bell(c, t + k * 0.05, s.root * m, 'chime', 0.28));
    t += 0.22;
    for (let k = 0; k < 8; k++) { note(c, t, s, s.scale[k % s.scale.length] + (k >= s.scale.length ? 12 : 0), 0.55); t += 0.05; }
    bell(c, t + 0.05, hz(s.root, 19), 'glockenspiel', 0.5);
  },
  /** soft crystal set sound (kept from v1.3) */
  gem() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.01;
    // a rising four-note sparkle on the current language's instrument and scale
    [0, 2, 4, 0].forEach((i, k) => note(c, t + k * 0.07, s, s.scale[i % s.scale.length] + (k === 3 ? 12 : 0), 0.5));
  },
  /** a reward token takes off: a quick rising run on the language instrument */
  fly() {
    const c = ready(); if (!c) return;
    const s = spec(); let t = c.currentTime + 0.01;
    [0, 1, 2, 3, 4, 5].forEach((i) => { note(c, t, s, s.scale[i % s.scale.length] + 12, 0.28); t += 0.06; });
  },
  /** a token lands (kept from v1.3) */
  land() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.01;
    // two bright notes in the language's scale + a soft sparkle
    note(c, t, s, s.scale[4 % s.scale.length] + 12, 0.5);
    note(c, t + 0.09, s, s.scale[0] + 24, 0.45);
    bell(c, t + 0.12, hz(s.root, 31), 'chime', 0.25);
  },
  /** odometer reel click */
  /* ------------------------------------------------------------------ v2.0 dashboard sounds */
  /** soft UI click – played for every click that has no sound of its own (see installClickSound) */
  click() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.002;
    bell(c, t, 1318.5, 'marimba', 0.3);
    sweep(c, t, 0.03, 5200, 3200, 0.04, 6);
  },
  /** each profile / survey has its own 3-note motif (seed = its position) on a rotating instrument */
  profile(seed = 0) {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.01;
    const sc = s.scale, n = sc.length;
    const steps = [seed % n, (seed * 3 + 2) % n, (seed * 5 + 4) % n];
    const inst = ['chime', 'marimba', 'glockenspiel'][seed % 3];
    steps.forEach((k, i) => bell(c, t + i * 0.07, hz(s.root, sc[k] + (i === 2 ? 12 : 0)), inst, 0.55 - i * 0.08));
  },
  /** locked survey: a padlock rattle + two low "nope" knocks, then a hopeful sparkle */
  locked() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    for (let k = 0; k < 4; k++) sweep(c, t + k * 0.045, 0.04, 3400 - k * 300, 1800, 0.09, 7);
    thump(c, t + 0.2, 90, 0.35);
    thump(c, t + 0.32, 80, 0.3);
    const s = spec();
    [0, 2, 4].forEach((i, k) => note(c, t + 0.5 + k * 0.08, s, s.scale[i % s.scale.length] + 12, 0.32));
  },
  /** a survey unlocks: shackle click + rising shimmer */
  unlocked() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    sweep(c, t, 0.05, 6000, 2600, 0.12, 8);
    thump(c, t + 0.03, 160, 0.3);
    const s = spec();
    [0, 2, 4, 7].forEach((i, k) => bell(c, t + 0.12 + k * 0.06, hz(s.root, s.scale[i % s.scale.length] + 12), 'glockenspiel', 0.45));
  },
  /** heartbeat "lub-dub" – a bead blooming in the Circle of Care */
  heartbeat() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.01;
    thump(c, t, 58, 0.6);
    thump(c, t + 0.16, 52, 0.42);
    bell(c, t + 0.02, 988, 'chime', 0.22);
  },
  /** +50 heart-coin lands in the Care Wallet: chime + glockenspiel ping */
  coin() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.005;
    const s = spec();
    note(c, t, s, s.scale[4 % s.scale.length] + 12, 0.5);
    bell(c, t + 0.06, 1567.98, 'chime', 0.4);
    bell(c, t + 0.12, 2093, 'glockenspiel', 0.3);
  },
  /** +1 quality score lands: warm rising bell + heart thump */
  quality() {
    const c = ready(); if (!c) return;
    const s = spec(); const t = c.currentTime + 0.005;
    thump(c, t, 70, 0.35);
    note(c, t + 0.04, s, s.scale[2 % s.scale.length] + 12, 0.5);
    bell(c, t + 0.1, hz(s.root, 28), 'chime', 0.4);
  },
  /** level up on the quality ladder */
  levelUp() {
    const c = ready(); if (!c) return;
    const s = spec(); let t = c.currentTime + 0.02;
    [0, 2, 4, 5, 7, 9].forEach((i) => { note(c, t, s, s.scale[i % s.scale.length] + 12, 0.55); t += 0.06; });
    [0, 4, 7].forEach((i) => bell(c, t + 0.05, hz(s.root, s.scale[i % s.scale.length] + 24), 'chime', 0.35));
  },
  /** completion fanfare with a per-item flavour (seed) */
  celebrateSeed(seed = 0) {
    const c = ready(); if (!c) return;
    const s = spec(); let t = c.currentTime + 0.02;
    const shapes = [[0, 2, 4, 5, 7], [0, 4, 7, 9, 12], [7, 5, 4, 2, 0, 4, 7], [0, 2, 0, 4, 2, 7], [4, 2, 4, 7, 9], [0, 7, 4, 9, 7, 12]];
    const shape = shapes[seed % shapes.length];
    const inst = ['chime', 'glockenspiel', 'marimba'][seed % 3];
    shape.forEach((i) => { note(c, t, s, s.scale[i % s.scale.length] + (i >= s.scale.length ? 12 : 0), 0.75); t += 0.072; });
    [0, 4, 7].forEach((i) => bell(c, t + 0.04, hz(s.root, s.scale[i % s.scale.length] + 12), inst, 0.45));
    bell(c, t + 0.14, hz(s.root, 24 + (seed % 5)), 'chime', 0.45);
  },
  /** language chosen: MyFrequentRewards-style "wipe" whoosh + the language signature */
  wipe() {
    const c = ready(); if (!c) return;
    const t = c.currentTime + 0.005;
    sweep(c, t, 0.55, 300, 5200, 0.16, 1.1);
  },
  tick() {
    const c = ready(); if (!c) return;
    bell(c, c.currentTime + 0.005, 2400, 'marimba', 0.12);
  },
};

/**
 * Every click gets a sound: a document listener plays a soft click for any button, link, option or
 * card that did not already play its own sound for this click (checked with the time of the last sound).
 */
export function installClickSound(root = typeof document !== 'undefined' ? document : null) {
  if (!root || root.__mhoClick) return () => {};
  root.__mhoClick = true;
  const onClick = (e) => {
    const el = e.target && e.target.closest && e.target.closest('button, a[href], [role="button"], [role="option"], [role="tab"], input[type="checkbox"], input[type="radio"], label, summary, select');
    if (!el || el.disabled) return;
    if (performance.now() - lastPlay < 90) return; // something already made a sound for this click
    sound.click();
  };
  const onFirst = () => sound.unlock();
  root.addEventListener('click', onClick);
  root.addEventListener('pointerdown', onFirst, { once: true, passive: true });
  return () => { root.removeEventListener('click', onClick); root.__mhoClick = false; };
}
