// Tiny synthesized sound engine (Web Audio API) — zero audio files, zero network.
// Each language has its own timbre + scale; each profile completion has its own fanfare.
import { LANG_BY_CODE } from '../i18n/languages.js';

let ctx = null;
let master = null;
let enabled = true;
let lang = LANG_BY_CODE.en;

function ac() {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.32;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}

export const sound = {
  setEnabled(v) { enabled = v; if (!v && ctx) ctx.suspend?.(); },
  isEnabled: () => enabled,
  setLanguage(code) { lang = LANG_BY_CODE[code] || LANG_BY_CODE.en; },
};

const hz = (root, semis) => root * 2 ** (semis / 12);

/** One voice. style controls envelope + colour so each language feels different. */
function voice(freq, t, dur, opts = {}) {
  const c = ctx;
  const style = opts.style || lang.sound.style;
  const wave = opts.wave || lang.sound.wave;
  const vol = opts.vol ?? 0.5;
  const g = c.createGain();
  const o = c.createOscillator();
  o.type = wave;
  o.frequency.setValueAtTime(freq, t);
  let node = o;

  // per-style colour
  if (style === 'sitar' || style === 'oud') {
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = freq * 2.2; bp.Q.value = 4;
    o.frequency.setValueAtTime(freq * 1.03, t);
    o.frequency.exponentialRampToValueAtTime(freq, t + 0.08); // meend / slide
    node.connect(bp); node = bp;
  } else if (style === 'neon') {
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.Q.value = 9;
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(5200, t + dur * 0.7);
    node.connect(lp); node = lp;
  } else if (style === 'accordion') {
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2200;
    const lfo = c.createOscillator(); const lg = c.createGain();
    lfo.frequency.value = 6; lg.gain.value = freq * 0.012;
    lfo.connect(lg).connect(o.frequency); lfo.start(t); lfo.stop(t + dur + 0.1);
    node.connect(lp); node = lp;
  } else if (style === 'gong') {
    const o2 = c.createOscillator(); const g2 = c.createGain();
    o2.type = 'sine'; o2.frequency.value = freq * 2.76; g2.gain.value = 0.25;
    o2.connect(g2).connect(g); o2.start(t); o2.stop(t + dur + 0.2);
  } else if (style === 'balalaika' || style === 'mandolin') {
    const trem = c.createGain(); const lfo = c.createOscillator(); const lg = c.createGain();
    lfo.frequency.value = style === 'mandolin' ? 14 : 11; lg.gain.value = 0.45;
    lfo.connect(lg).connect(trem.gain); lfo.start(t); lfo.stop(t + dur + 0.1);
    node.connect(trem); node = trem;
  }
  node.connect(g).connect(master);

  const pluck = ['sitar', 'guitar', 'koto', 'oud', 'marimba', 'glock'].includes(style);
  const atk = pluck ? 0.004 : style === 'gong' ? 0.01 : 0.02;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur * (style === 'gong' ? 1.8 : 1));
  o.start(t);
  o.stop(t + dur * (style === 'gong' ? 1.9 : 1.1) + 0.05);
}

let lastAt = 0;
function play(fn) {
  const c = ac();
  if (!c) return;
  lastAt = performance.now();
  try { fn(c.currentTime + 0.01); } catch { /* never let audio break the UI */ }
}

/** Soft click for ANY clickable element — skipped if a richer sound just played for the same click. */
export function ambientClick() {
  if (performance.now() - lastAt < 90) return;
  sfx('click');
}

let clickIdx = 0;
export function sfx(kind = 'click') {
  play((t) => {
    const { root, scale } = lang.sound;
    switch (kind) {
      case 'click': {
        clickIdx = (clickIdx + 1) % scale.length;
        voice(hz(root * 2, scale[clickIdx]), t, 0.09, { vol: 0.22 });
        break;
      }
      case 'select':
        voice(hz(root, scale[2 % scale.length]), t, 0.12, { vol: 0.35 });
        voice(hz(root, scale[scale.length - 1]), t + 0.05, 0.16, { vol: 0.3 });
        break;
      case 'deselect':
        voice(hz(root, scale[1]), t, 0.1, { vol: 0.2 });
        break;
      case 'next':
        voice(hz(root, scale[0]), t, 0.1, { vol: 0.3 });
        voice(hz(root, scale[3 % scale.length]), t + 0.06, 0.14, { vol: 0.3 });
        break;
      case 'back':
        voice(hz(root, scale[3 % scale.length]), t, 0.1, { vol: 0.25 });
        voice(hz(root, scale[0]), t + 0.06, 0.12, { vol: 0.25 });
        break;
      case 'error':
        voice(180, t, 0.12, { wave: 'square', style: 'plain', vol: 0.18 });
        voice(150, t + 0.11, 0.16, { wave: 'square', style: 'plain', vol: 0.18 });
        break;
      case 'toggle':
        voice(hz(root * 2, scale[4 % scale.length]), t, 0.08, { vol: 0.2 });
        break;
      case 'coin':
        voice(1318.5, t, 0.08, { wave: 'square', style: 'plain', vol: 0.16 });
        voice(1760, t + 0.07, 0.22, { wave: 'square', style: 'plain', vol: 0.16 });
        break;
      default:
        voice(hz(root, scale[0]), t, 0.1, { vol: 0.2 });
    }
  });
}

/** Signature chime for each language — played when the language is chosen. */
export function languageChime(code) {
  const L = LANG_BY_CODE[code] || LANG_BY_CODE.en;
  const prev = lang;
  lang = L;
  play((t) => {
    const { root, scale, style } = L.sound;
    const pattern = {
      arp: [0, 1, 2, 3, 4], gong: [0, 4, 2, 5], sitar: [0, 1, 2, 3, 2, 5], guitar: [0, 1, 2, 3, 4, 5],
      accordion: [0, 1, 2, 3, 4], glock: [0, 1, 2, 3, 4], koto: [0, 2, 3, 5, 4], oud: [0, 1, 2, 3, 4, 6],
      marimba: [0, 2, 1, 3, 4, 5], balalaika: [0, 2, 3, 5], neon: [0, 2, 3, 5], mandolin: [0, 1, 2, 3, 4],
    }[style] || [0, 1, 2, 3];
    const step = style === 'marimba' ? 0.085 : style === 'gong' ? 0.16 : style === 'accordion' ? 0.12 : 0.1;
    pattern.forEach((idx, i) => {
      const swing = style === 'marimba' && i % 2 ? 0.03 : 0;
      voice(hz(root, scale[idx % scale.length]), t + i * step + swing, style === 'gong' ? 0.9 : 0.32, { vol: 0.42 });
    });
    if (style === 'accordion' || style === 'mandolin' || style === 'arp') {
      [0, 2, 4].forEach((idx) => voice(hz(root, scale[idx % scale.length]), t + pattern.length * step, 0.6, { vol: 0.18 }));
    }
  });
  lang = L || prev;
}

/** Completion fanfares — one per profile animation type. */
export function fanfare(type) {
  play((t) => {
    const { root, scale } = lang.sound;
    const n = (i) => hz(root, scale[i % scale.length] + (i >= scale.length ? 12 : 0));
    const seqs = {
      ecg: () => { [0, 0.18].forEach((d) => voice(880, t + d, 0.08, { wave: 'sine', style: 'plain', vol: 0.3 })); [0, 2, 4, 7].forEach((i, k) => voice(n(i), t + 0.4 + k * 0.09, 0.4)); },
      cross: () => [0, 2, 4, 2, 7].forEach((i, k) => voice(n(i), t + k * 0.08, 0.35)),
      helix: () => [0, 3, 1, 4, 2, 5, 7].forEach((i, k) => voice(n(i), t + k * 0.06, 0.3)),
      caps: () => { [0, 2, 4].forEach((i) => voice(n(i), t, 0.6, { vol: 0.3 })); [4, 7].forEach((i, k) => voice(n(i), t + 0.3 + k * 0.12, 0.5)); },
      medal: () => [0, 4, 7, 9].forEach((i, k) => voice(n(i), t + k * 0.11, 0.5)),
      pin: () => { voice(n(7), t, 0.12); voice(n(0), t + 0.14, 0.5, { vol: 0.5 }); voice(n(4), t + 0.3, 0.6); },
      pixels: () => [0, 4, 2, 6, 4, 8, 7].forEach((i, k) => voice(n(i), t + k * 0.05, 0.12, { wave: 'square', vol: 0.18 })),
      bubbles: () => [5, 3, 6, 4, 7].forEach((i, k) => voice(n(i), t + k * 0.07, 0.15, { wave: 'sine', vol: 0.3 })),
      stamp: () => { voice(90, t, 0.25, { wave: 'sine', style: 'plain', vol: 0.7 }); [0, 4, 7].forEach((i, k) => voice(n(i), t + 0.25 + k * 0.1, 0.45)); },
      coins: () => [0, 1, 2, 3, 4, 5].forEach((k) => voice(1318.5 + k * 120, t + k * 0.07, 0.15, { wave: 'square', style: 'plain', vol: 0.12 })),
      molecule: () => [0, 7, 4, 9, 2, 11].forEach((i, k) => voice(n(i), t + k * 0.09, 0.45, { wave: 'sine' })),
    };
    (seqs[type] || seqs.cross)();
  });
}

/* ------------------------------------------------------------------ v2.0 clinical sound set
 * All synthesized, all in the current language's instrument + scale where it is melodic.
 *   tap(i)        answer options, calendar cells, small toggles
 *   profileOpen(seed) opening a profile — every profile has its own motif + instrument
 *   fly()         a reward token takes off
 *   coin()        the points token lands in the wallet
 *   quality()     the Quality Score token lands
 *   wipe()        language change scan beam
 */
const STYLES = ['glock', 'marimba', 'koto', 'arp', 'guitar', 'gong', 'mandolin', 'neon'];
const rootOf = () => lang.sound.root;
const note = (i) => hz(rootOf(), lang.sound.scale[((i % lang.sound.scale.length) + lang.sound.scale.length) % lang.sound.scale.length] + (i >= lang.sound.scale.length ? 12 : 0));

export function tap(i = 0) {
  play((t) => voice(note(2 + (i % 5)) * 2, t, 0.08, { vol: 0.2 }));
}
export function profileOpen(seed = 0) {
  play((t) => {
    const style = STYLES[seed % STYLES.length];
    // 12 motifs × 8 instruments → every profile (up to 96) opens with its own little signature
    const m = [[0, 2, 4], [0, 3, 5], [4, 2, 5], [0, 4, 7], [2, 4, 1], [5, 4, 7], [0, 1, 4], [3, 5, 7], [7, 4, 0], [1, 3, 6], [6, 4, 2, 7], [0, 5, 3, 7]][seed % 12];
    m.forEach((k, j) => voice(note(k), t + j * 0.075, 0.28, { style, vol: 0.32 }));
  });
}
export function fly() {
  play((t) => {
    const c = ctx; const o = c.createOscillator(); const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(320, t);
    o.frequency.exponentialRampToValueAtTime(1500, t + 0.32);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.4);
  });
}
export function coin() {
  play((t) => {
    voice(1318.5, t, 0.07, { wave: 'square', style: 'plain', vol: 0.12 });
    voice(1760, t + 0.06, 0.2, { wave: 'square', style: 'plain', vol: 0.12 });
    voice(2637, t + 0.12, 0.28, { wave: 'sine', style: 'glock', vol: 0.16 });
  });
}
export function quality() {
  play((t) => {
    [0, 4, 7].forEach((k, j) => voice(note(k) * 2, t + j * 0.05, 0.6, { wave: 'sine', style: 'gong', vol: 0.18 }));
    voice(note(9) * 2, t + 0.22, 0.5, { wave: 'triangle', style: 'glock', vol: 0.16 });
  });
}
export function wipe() {
  play((t) => {
    const c = ctx; const o = c.createOscillator(); const g = c.createGain(); const f = c.createBiquadFilter();
    o.type = 'sawtooth'; f.type = 'bandpass'; f.Q.value = 6;
    o.frequency.setValueAtTime(110, t);
    f.frequency.setValueAtTime(400, t);
    f.frequency.exponentialRampToValueAtTime(3200, t + 0.7);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
    o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + 0.85);
  });
}
export function toggleSound(on) {
  play((t) => {
    voice(on ? note(2) * 2 : note(4) * 2, t, 0.08, { vol: 0.2 });
    voice(on ? note(4) * 2 : note(2) * 2, t + 0.06, 0.1, { vol: 0.2 });
  });
}
/** unlock audio on the first gesture (iOS needs a sound started inside a user gesture) */
export function unlockAudio() { ac(); }

/* ------------------------------------------------------------------ v3.0 Clinical Genome
 *   bond()       a gene's bond forms on the helix (rising "zip" + bright ping)
 *   milestone()  a genome milestone (25 / 50 / 75 / 100 %) is reached
 */
export function bond() {
  play((t) => {
    for (let k = 0; k < 6; k++) voice(note(k) * 2, t + k * 0.04, 0.09, { wave: 'triangle', style: 'plain', vol: 0.12 });
    voice(note(7) * 2, t + 0.28, 0.5, { wave: 'sine', style: 'glock', vol: 0.2 });
  });
}
export function milestone() {
  play((t) => {
    [0, 4, 7, 12].forEach((k, j) => voice(note(k), t + j * 0.1, 0.5, { vol: 0.3 }));
    [7, 12, 16].forEach((k) => voice(note(k), t + 0.45, 1.1, { wave: 'sine', style: 'gong', vol: 0.14 }));
  });
}
