import { asset } from '../lib/asset.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.js';
import { useStore } from '../lib/store.js';
import { sound } from '../lib/sound.js';
import { rewardOf, totals, levelOf, usd } from '../lib/rewards.js';
import { kindOf, profileIdList } from '../lib/access.js';
import Counter from './Counter.jsx';

const isProfilesComplete = (meta) => profileIdList().every((id) => meta?.completed?.[id]);

/**
 * Completion celebrations – a DIFFERENT animation for each of the 25 patient chapters.
 * One lightweight <canvas> particle system (stops by itself after ~4 s) plus a CSS
 * entrance for the card that also differs per chapter (class .cel-<name>).
 *
 * Preset modes: burst · confetti · rain · toss · rise · ring · pixels · fireworks · ecg · rocket ·
 * sun · molecules · ripple · pills · crosses · bubbles · comets · lanterns · petals · sparkles · dna · target · stamp
 */
const PRESETS = {
  confetti: { mode: 'confetti', n: 170 },
  sunburst: { mode: 'sun', emoji: ['☀️', '🌤️', '✨'] },
  molecules: { mode: 'molecules', n: 26 },
  ripple: { mode: 'ripple' },
  heartbeat: { mode: 'ecg', emoji: ['💓', '💗', '❤️‍🩹'], n: 30 },
  butterflies: { emoji: ['🦋', '🦋', '🌸', '✨'], mode: 'rise', n: 30, size: [26, 46], flutter: true },
  pills: { mode: 'pills', n: 70 },
  crosses: { mode: 'crosses', n: 90 },
  bubbles: { mode: 'bubbles', n: 70 },
  comets: { mode: 'comets', n: 14 },
  lanterns: { mode: 'lanterns', n: 28 },
  shield: { emoji: ['🛡️', '✨', '💠', '🔷'], mode: 'ring', n: 60, size: [14, 30] },
  petals: { mode: 'petals', n: 90 },
  fruit: { emoji: ['🍎', '🥑', '🍇', '🥕', '🍋', '🍓', '🥦', '🍊'], mode: 'rain', n: 60, size: [24, 40], bounce: true },
  stars: { emoji: ['⭐', '🌟', '✨', '💫'], mode: 'burst', n: 80, grav: 0.03, speed: 14, size: [14, 34], twinkle: true },
  sparkles: { mode: 'sparkles', n: 120 },
  pixels: { mode: 'pixels', n: 160 },
  caps: { emoji: ['🎓', '🎓', '📜', '⭐', '📚'], mode: 'toss', n: 46, size: [26, 46] },
  fireworks: { mode: 'fireworks' },
  dna: { mode: 'dna' },
  target: { mode: 'target', emoji: ['🎯'] },
  stamp: { mode: 'stamp' },
  balloons: { emoji: ['🎈', '🎈', '🎈', '🎉', '🎁'], mode: 'rise', n: 34, size: [30, 54] },
  coins: { emoji: ['🪙', '💰', '💎'], mode: 'rain', n: 70, size: [20, 36], spin: true },
  rocket: { mode: 'rocket', emoji: ['⭐', '✨'] },
};

const rnd = (a, b) => a + Math.random() * (b - a);
const pickOne = (a) => a[(Math.random() * a.length) | 0];

function sprite(emoji, cache) {
  if (cache.has(emoji)) return cache.get(emoji);
  const c = document.createElement('canvas');
  c.width = c.height = 72;
  const x = c.getContext('2d');
  x.font = '56px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(emoji, 36, 40);
  cache.set(emoji, c);
  return c;
}

function run(canvas, kind, colors) {
  const P = PRESETS[kind] || PRESETS.confetti;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const g = canvas.getContext('2d');
  g.scale(dpr, dpr);
  const cache = new Map();
  const parts = [];
  const fx = []; // custom per-frame effects: (g, elapsed) => boolean (true = keep)
  const cx = W / 2, cy = H * 0.42;
  const add = (p) => parts.push({ rot: 0, vr: rnd(-0.1, 0.1), life: 1, decay: rnd(0.004, 0.008), ...p });
  const confetti = (n, x = cx, y = cy, sp = 12) => {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2), s = rnd(3, sp);
      add({ t: 'rect', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6, w: rnd(6, 12), h: rnd(3, 7), c: pickOne(colors), grav: 0.28, drag: 0.985, decay: rnd(0.004, 0.007) });
    }
  };
  const emo = (e, p) => add({ t: 'emo', img: sprite(e, cache), ...p });

  switch (P.mode) {
    case 'burst':
      for (let i = 0; i < P.n; i++) {
        const a = rnd(0, Math.PI * 2), s = rnd(2, P.speed);
        emo(pickOne(P.emoji), { x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, size: rnd(...P.size), grav: P.grav, drag: 0.975, tw: P.twinkle });
      }
      break;
    case 'confetti':
      confetti(P.n);
      setTimeout(() => confetti(60, W * 0.15, H * 0.7, 14), 250);
      setTimeout(() => confetti(60, W * 0.85, H * 0.7, 14), 450);
      break;
    case 'rain':
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(0, W), y: rnd(-H * 0.9, -20), vx: rnd(-0.6, 0.6), vy: rnd(1, 4), size: rnd(...P.size), grav: 0.18, drag: 0.995, bounce: P.bounce, spin: P.spin, decay: 0.0035 });
      break;
    case 'toss':
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(W * 0.15, W * 0.85), y: H + 30, vx: rnd(-3, 3), vy: rnd(-17, -11), size: rnd(...P.size), grav: 0.32, drag: 0.995, vr: rnd(-0.18, 0.18), decay: 0.0035 });
      setTimeout(() => confetti(70, W / 2, H * 0.25, 12), 500);
      break;
    case 'rise':
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(0, W), y: H + rnd(10, H * 0.6), vx: 0, vy: rnd(-3.2, -1.6), size: rnd(...P.size), grav: -0.01, drag: 1, sway: rnd(0.5, 1.6), ph: rnd(0, 6), flap: P.flutter, decay: 0.0028 });
      if (!P.flutter) confetti(50);
      break;
    case 'ring':
      for (let i = 0; i < P.n; i++) {
        const a = (i / P.n) * Math.PI * 2;
        emo(pickOne(P.emoji), { x: cx, y: cy, vx: Math.cos(a) * 6, vy: Math.sin(a) * 6, size: rnd(...P.size), grav: 0, drag: 0.96, decay: 0.009 });
      }
      setTimeout(() => confetti(80), 300);
      break;
    case 'pixels':
      for (let i = 0; i < P.n; i++) {
        const a = rnd(0, Math.PI * 2), s = rnd(4, 16);
        add({ t: 'px', x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, w: 8, c: pickOne(['#ff004d', '#00e436', '#29adff', '#ffec27', '#ff77a8', '#ffa300', '#7e2553', '#ffffff']), grav: 0.12, drag: 0.97, vr: 0 });
      }
      break;
    case 'fireworks': {
      const burst = (x, y) => {
        const c = pickOne(colors);
        for (let i = 0; i < 70; i++) {
          const a = (i / 70) * Math.PI * 2, s = rnd(2.5, 6);
          add({ t: 'dot', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 2.4, c, grav: 0.06, drag: 0.97, decay: 0.012 });
        }
      };
      [[0.3, 0.3, 0], [0.7, 0.25, 350], [0.5, 0.18, 700], [0.2, 0.45, 1000], [0.8, 0.45, 1250]].forEach(([x, y, d]) => setTimeout(() => burst(W * x, H * y), d));
      break;
    }
    case 'ecg':
      fx.push((g2, el) => {
        const ex = Math.min(W, (el / 1400) * W);
        g2.strokeStyle = colors[0]; g2.lineWidth = 4; g2.lineJoin = 'round'; g2.shadowColor = colors[0]; g2.shadowBlur = 12;
        g2.beginPath();
        for (let x = 0; x <= ex; x += 4) {
          const ph = (x % 220) / 220;
          let y = cy;
          if (ph > 0.4 && ph < 0.46) y -= (ph - 0.4) * 1800;
          else if (ph >= 0.46 && ph < 0.52) y += -108 + (ph - 0.46) * 3600;
          else if (ph >= 0.52 && ph < 0.56) y += 108 - (ph - 0.52) * 2700;
          x === 0 ? g2.moveTo(x, y) : g2.lineTo(x, y);
        }
        g2.stroke(); g2.shadowBlur = 0;
        return el < 4200;
      });
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(0, W), y: H + rnd(0, 200), vx: rnd(-0.5, 0.5), vy: rnd(-3, -1.5), size: rnd(18, 34), grav: -0.01, drag: 1, decay: 0.004 });
      break;
    case 'rocket': {
      const r = { img: sprite('🚀', cache) };
      fx.push((g2, el) => {
        const k = Math.min(1, el / 1600);
        r.x = -60 + k * (W + 120);
        r.y = H + 40 - k * (H + 120) * (0.6 + 0.4 * k);
        for (let i = 0; i < 3; i++) add({ t: 'dot', x: r.x + rnd(-6, 6), y: r.y + 30 + rnd(-6, 6), vx: rnd(-1, 1), vy: rnd(0.5, 2), r: rnd(3, 7), c: pickOne(['#ffd166', '#ff8c42', '#fff', '#aaa']), grav: 0, drag: 0.96, decay: 0.03 });
        if (k < 1) { g2.save(); g2.translate(r.x, r.y); g2.rotate(-0.15); g2.drawImage(r.img, -28, -28, 56, 56); g2.restore(); }
        if (k >= 1 && !r.done) { r.done = true; confetti(120, W * 0.85, H * 0.15, 14); }
        return k < 1;
      });
      break;
    }
    /* ---------------- new patient modes ---------------- */
    case 'sun': // a rising sun with turning rays, then warm sparkles
      fx.push((g2, el) => {
        const k = Math.min(1, el / 1200), y = H + 120 - k * (H * 0.86 + 120);
        g2.save(); g2.translate(cx, y); g2.rotate(el / 1600);
        g2.globalAlpha = 0.35;
        for (let i = 0; i < 16; i++) { g2.rotate(Math.PI / 8); g2.fillStyle = i % 2 ? '#FFC23A' : '#FFE08A'; g2.beginPath(); g2.moveTo(0, -70); g2.lineTo(14, -230); g2.lineTo(-14, -230); g2.fill(); }
        g2.restore(); g2.globalAlpha = 1;
        const gr = g2.createRadialGradient(cx - 16, y - 16, 6, cx, y, 70);
        gr.addColorStop(0, '#FFF7D6'); gr.addColorStop(0.6, '#FFC23A'); gr.addColorStop(1, '#F2611B');
        g2.fillStyle = gr; g2.beginPath(); g2.arc(cx, y, 66, 0, Math.PI * 2); g2.fill();
        if (k >= 1 && !fx.sunDone) { fx.sunDone = true; for (let i = 0; i < 60; i++) { const a = rnd(0, 6.28), s = rnd(2, 9); emo(pickOne(P.emoji), { x: cx, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, size: rnd(14, 28), grav: 0.05, drag: 0.97 }); } }
        return el < 4200;
      });
      break;
    case 'molecules': { // linked atoms drifting outwards
      const atoms = [];
      for (let i = 0; i < P.n; i++) { const a = rnd(0, 6.28), s = rnd(0.6, 3.2); atoms.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: rnd(5, 11), c: pickOne(colors) }); }
      fx.push((g2, el) => {
        const fade = Math.max(0, 1 - el / 4200);
        g2.globalAlpha = fade;
        for (const a of atoms) { a.x += a.vx; a.y += a.vy; a.vx *= 0.992; a.vy *= 0.992; }
        g2.strokeStyle = 'rgba(255,255,255,.75)'; g2.lineWidth = 2;
        for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
          const d = Math.hypot(atoms[i].x - atoms[j].x, atoms[i].y - atoms[j].y);
          if (d < 110) { g2.beginPath(); g2.moveTo(atoms[i].x, atoms[i].y); g2.lineTo(atoms[j].x, atoms[j].y); g2.stroke(); }
        }
        for (const a of atoms) {
          const gr = g2.createRadialGradient(a.x - a.r / 3, a.y - a.r / 3, 1, a.x, a.y, a.r);
          gr.addColorStop(0, '#fff'); gr.addColorStop(1, a.c);
          g2.fillStyle = gr; g2.beginPath(); g2.arc(a.x, a.y, a.r, 0, 6.28); g2.fill();
        }
        g2.globalAlpha = 1;
        return el < 4200;
      });
      break;
    }
    case 'ripple': // expanding rings like a calm pulse, plus drops
      fx.push((g2, el) => {
        for (let i = 0; i < 6; i++) {
          const t = el / 1000 - i * 0.35;
          if (t < 0 || t > 2.2) continue;
          const r = t * Math.max(W, H) * 0.32;
          g2.strokeStyle = colors[i % 3]; g2.globalAlpha = Math.max(0, 1 - t / 2.2); g2.lineWidth = 6 - t * 2;
          g2.beginPath(); g2.arc(cx, cy, r, 0, 6.28); g2.stroke();
        }
        g2.globalAlpha = 1;
        return el < 3200;
      });
      setTimeout(() => confetti(60), 600);
      break;
    case 'pills': // two-tone capsules tumbling and bouncing
      for (let i = 0; i < P.n; i++) add({ t: 'pill', x: rnd(0, W), y: rnd(-H, -20), vx: rnd(-1, 1), vy: rnd(1, 4), grav: 0.2, drag: 0.995, bounce: true, vr: rnd(-0.12, 0.12), rot: rnd(0, 6), c: pickOne(colors), len: rnd(22, 36), decay: 0.0032 });
      break;
    case 'crosses': // medical plus signs bursting from the centre
      for (let i = 0; i < P.n; i++) { const a = rnd(0, 6.28), s = rnd(3, 13); add({ t: 'cross', x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, s: rnd(5, 12), c: pickOne(colors), grav: 0.14, drag: 0.975, vr: rnd(-0.1, 0.1) }); }
      break;
    case 'bubbles': // shiny bubbles rising and popping
      for (let i = 0; i < P.n; i++) add({ t: 'bubble', x: rnd(0, W), y: H + rnd(10, H * 0.5), vx: 0, vy: rnd(-3.6, -1.4), r: rnd(6, 22), c: pickOne(colors), grav: -0.005, drag: 1, sway: rnd(0.4, 1.2), ph: rnd(0, 6), decay: rnd(0.003, 0.006) });
      break;
    case 'comets': // glowing streaks shooting across the sky
      for (let i = 0; i < P.n; i++) setTimeout(() => add({ t: 'comet', x: rnd(-100, W * 0.5), y: rnd(-60, H * 0.4), vx: rnd(8, 14), vy: rnd(3, 7), c: pickOne(colors), r: rnd(3, 5), grav: 0, drag: 1, decay: 0.012 }), i * 160);
      break;
    case 'lanterns': // warm lanterns floating up with flicker
      for (let i = 0; i < P.n; i++) add({ t: 'lantern', x: rnd(W * 0.05, W * 0.95), y: H + rnd(10, H * 0.5), vx: 0, vy: rnd(-2.2, -1), s: rnd(12, 22), grav: 0, drag: 1, sway: rnd(0.3, 0.9), ph: rnd(0, 6), decay: 0.0025 });
      break;
    case 'petals': // soft petals swirling down
      for (let i = 0; i < P.n; i++) add({ t: 'petal', x: rnd(-20, W), y: rnd(-H * 0.8, -10), vx: rnd(0.5, 2), vy: rnd(1, 2.6), s: rnd(6, 12), c: pickOne(['#FFB7C5', '#FF8FAB', '#FFE0E9', colors[1], '#FDE68A']), grav: 0.02, drag: 0.995, sway: rnd(0.8, 2), ph: rnd(0, 6), vr: rnd(-0.08, 0.08), decay: 0.003 });
      break;
    case 'sparkles': // four-point stars popping up everywhere
      for (let i = 0; i < P.n; i++) setTimeout(() => add({ t: 'star4', x: rnd(0, W), y: rnd(0, H), vx: 0, vy: 0, s: rnd(4, 12), c: pickOne(['#fff', '#FFE08A', colors[0], colors[1]]), grav: 0, drag: 1, decay: rnd(0.012, 0.02), grow: true }), i * 22);
      break;
    case 'dna': { // a double helix sweeping across the screen
      fx.push((g2, el) => {
        const head = Math.min(W + 40, (el / 1500) * (W + 40));
        g2.lineWidth = 2;
        for (let x = 0; x < head; x += 14) {
          const ph = x / 46 + el / 300;
          const y1 = cy + Math.sin(ph) * 60, y2 = cy - Math.sin(ph) * 60;
          const front = Math.cos(ph) > 0;
          g2.globalAlpha = Math.max(0, 1 - (el - 2600) / 1400);
          g2.strokeStyle = 'rgba(255,255,255,.6)'; g2.beginPath(); g2.moveTo(x, y1); g2.lineTo(x, y2); g2.stroke();
          g2.fillStyle = front ? colors[0] : colors[1]; g2.beginPath(); g2.arc(x, y1, front ? 7 : 4.5, 0, 6.28); g2.fill();
          g2.fillStyle = front ? colors[2] : colors[3]; g2.beginPath(); g2.arc(x, y2, front ? 4.5 : 7, 0, 6.28); g2.fill();
        }
        g2.globalAlpha = 1;
        return el < 4000;
      });
      setTimeout(() => confetti(70, W * 0.9, cy, 10), 1500);
      break;
    }
    case 'target': { // rings close in on the bullseye, then a dart hits
      const img = sprite('🎯', cache);
      fx.push((g2, el) => {
        const k = Math.min(1, el / 900);
        for (let i = 4; i >= 1; i--) {
          g2.fillStyle = i % 2 ? colors[0] : '#fff'; g2.globalAlpha = 0.85 * Math.max(0, 1 - (el - 2800) / 1200);
          g2.beginPath(); g2.arc(cx, cy, i * 26 * (2.4 - 1.4 * k), 0, 6.28); g2.fill();
        }
        g2.globalAlpha = 1;
        if (k >= 1 && !fx.hit) { fx.hit = true; confetti(110, cx, cy, 13); emo('🎯', { x: cx, y: cy, vx: 0, vy: 0, size: 60, grav: 0, drag: 1, decay: 0.006 }); }
        if (k < 1) g2.drawImage(img, cx - 30 + (1 - k) * W * 0.4, cy - 30 - (1 - k) * H * 0.3, 60, 60);
        return el < 4000;
      });
      break;
    }
    case 'stamp': { // a passport-style "verified" stamp slams down with ink splats
      fx.push((g2, el) => {
        const k = Math.min(1, el / 380);
        const s = 2.6 - 1.6 * k;
        const fade = Math.max(0, 1 - (el - 2400) / 1500);
        g2.save(); g2.translate(cx, cy); g2.rotate(-0.22); g2.scale(s, s); g2.globalAlpha = (0.25 + 0.75 * k) * fade;
        g2.strokeStyle = colors[0]; g2.lineWidth = 6; g2.beginPath(); g2.arc(0, 0, 62, 0, 6.28); g2.stroke();
        g2.lineWidth = 2; g2.setLineDash([5, 5]); g2.beginPath(); g2.arc(0, 0, 52, 0, 6.28); g2.stroke(); g2.setLineDash([]);
        g2.lineWidth = 9; g2.lineCap = 'round'; g2.lineJoin = 'round'; g2.beginPath(); g2.moveTo(-24, 2); g2.lineTo(-6, 20); g2.lineTo(28, -18); g2.stroke();
        g2.restore(); g2.globalAlpha = 1;
        if (k >= 1 && !fx.slam) { fx.slam = true; for (let i = 0; i < 40; i++) { const a = rnd(0, 6.28), sp = rnd(2, 8); add({ t: 'dot', x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: rnd(2, 5), c: colors[0], grav: 0.1, drag: 0.94, decay: 0.012 }); } setTimeout(() => confetti(80), 200); }
        return el < 4000;
      });
      break;
    }
  }

  let raf = 0;
  const t0 = performance.now();
  const frame = (now) => {
    const el = now - t0;
    g.clearRect(0, 0, W, H);
    for (let i = fx.length - 1; i >= 0; i--) if (!fx[i](g, el)) fx.splice(i, 1);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vx *= p.drag ?? 1;
      p.vy = p.vy * (p.drag ?? 1) + (p.grav ?? 0);
      p.x += p.vx + (p.sway ? Math.sin(el / 400 + p.ph) * p.sway : 0);
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      if (p.bounce && p.y > H - 30 && p.vy > 0) { p.y = H - 30; p.vy *= -0.55; }
      if (p.life <= 0 || p.y > H + 80 || p.y < -H) { parts.splice(i, 1); continue; }
      g.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6)) * (p.tw ? 0.6 + 0.4 * Math.sin(el / 80 + i) : 1);
      if (p.t === 'emo') {
        const s = p.size;
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
        if (p.spin) g.scale(Math.cos(el / 120 + i), 1);
        if (p.flap) g.scale(0.55 + 0.45 * Math.abs(Math.sin(el / 90 + i)), 1);
        g.drawImage(p.img, -s / 2, -s / 2, s, s);
        g.restore();
      } else if (p.t === 'rect') {
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot * 3);
        g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(el / 150 + i)));
        g.restore();
      } else if (p.t === 'px') {
        g.fillStyle = p.c; g.fillRect(Math.round(p.x / 8) * 8, Math.round(p.y / 8) * 8, p.w, p.w);
      } else if (p.t === 'pill') {
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
        const L = p.len, R = 7;
        g.fillStyle = p.c; g.beginPath(); g.arc(-L / 2 + R, 0, R, Math.PI / 2, Math.PI * 1.5); g.lineTo(0, -R); g.lineTo(0, R); g.fill();
        g.fillStyle = '#fff'; g.beginPath(); g.arc(L / 2 - R, 0, R, -Math.PI / 2, Math.PI / 2); g.lineTo(0, R); g.lineTo(0, -R); g.fill();
        g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(-L / 2 + R, -R + 2, L - 2 * R, 2.5);
        g.restore();
      } else if (p.t === 'cross') {
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.fillStyle = p.c;
        g.fillRect(-p.s / 3, -p.s, (p.s * 2) / 3, p.s * 2); g.fillRect(-p.s, -p.s / 3, p.s * 2, (p.s * 2) / 3);
        g.restore();
      } else if (p.t === 'bubble') {
        if (p.life < 0.12 && !p.popped) { p.popped = true; for (let k = 0; k < 6; k++) add({ t: 'dot', x: p.x, y: p.y, vx: Math.cos(k) * 2, vy: Math.sin(k) * 2, r: 1.6, c: '#fff', grav: 0, drag: 0.9, decay: 0.05 }); }
        const gr = g.createRadialGradient(p.x - p.r / 3, p.y - p.r / 3, 1, p.x, p.y, p.r);
        gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(0.5, 'rgba(255,255,255,.12)'); gr.addColorStop(1, p.c);
        g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.28); g.fill();
        g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.2; g.stroke();
      } else if (p.t === 'comet') {
        const tl = 70;
        const gr = g.createLinearGradient(p.x - p.vx * tl / 10, p.y - p.vy * tl / 10, p.x, p.y);
        gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, p.c);
        g.strokeStyle = gr; g.lineWidth = p.r * 1.6; g.lineCap = 'round';
        g.beginPath(); g.moveTo(p.x - p.vx * tl / 10, p.y - p.vy * tl / 10); g.lineTo(p.x, p.y); g.stroke();
        g.fillStyle = '#fff'; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.28); g.fill();
      } else if (p.t === 'lantern') {
        const fl = 0.75 + 0.25 * Math.sin(el / 70 + i * 3);
        const gr = g.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.s * 2.2);
        gr.addColorStop(0, `rgba(255,214,102,${0.55 * fl})`); gr.addColorStop(1, 'rgba(255,214,102,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, p.s * 2.2, 0, 6.28); g.fill();
        g.fillStyle = '#FF8C42'; g.beginPath(); g.ellipse(p.x, p.y, p.s * 0.7, p.s, 0, 0, 6.28); g.fill();
        g.fillStyle = `rgba(255,236,170,${fl})`; g.beginPath(); g.ellipse(p.x, p.y + p.s * 0.2, p.s * 0.35, p.s * 0.5, 0, 0, 6.28); g.fill();
      } else if (p.t === 'petal') {
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot + Math.sin(el / 300 + i)); g.scale(1, 0.55 + 0.45 * Math.sin(el / 200 + i));
        g.fillStyle = p.c; g.beginPath(); g.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 6.28); g.fill();
        g.restore();
      } else if (p.t === 'star4') {
        const k = p.grow ? Math.sin(Math.min(1, 1 - p.life) * Math.PI) : 1, s = p.s * (0.4 + k);
        g.fillStyle = p.c; g.beginPath();
        g.moveTo(p.x, p.y - s * 2); g.lineTo(p.x + s * 0.45, p.y - s * 0.45); g.lineTo(p.x + s * 2, p.y); g.lineTo(p.x + s * 0.45, p.y + s * 0.45);
        g.lineTo(p.x, p.y + s * 2); g.lineTo(p.x - s * 0.45, p.y + s * 0.45); g.lineTo(p.x - s * 2, p.y); g.lineTo(p.x - s * 0.45, p.y - s * 0.45); g.fill();
      } else {
        g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, Math.PI * 2); g.fill();
      }
    }
    g.globalAlpha = 1;
    if (el < 5600 && (parts.length || fx.length || el < 1800)) raf = requestAnimationFrame(frame);
    else g.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/**
 * Reward panel on the completion card ("vitals readout"): a mini monitor where the heartbeat line spikes,
 * then "+50 Reward Points" and "+1 Quality Score" spin in on odometer reels, the new balance and level
 * appear, and — when this completion finishes the About You profiles — an "unlocked" banner for the surveys.
 * When an already completed item is finished again after editing, nothing is added (said clearly).
 */
function RewardBurst({ profile, firstTime }) {
  const { t, nf, lang } = useI18n();
  const meta = useStore((s) => s.meta);
  const r = rewardOf(profile.id);
  const now = totals(meta);
  const before = { pts: now.pts - (firstTime ? r.pts : 0), qs: now.qs - (firstTime ? r.qs : 0) };
  const [step, setStep] = useState(firstTime ? 0 : 3);
  const lvBefore = levelOf(before.qs), lvNow = levelOf(now.qs);
  const leveled = firstTime && lvNow.index > lvBefore.index;
  const unlocked = firstTime && kindOf(profile.id) === 'profile' && isProfilesComplete(meta);
  useEffect(() => {
    if (!firstTime) return undefined;
    const ids = [setTimeout(() => { setStep(1); sound.points(); }, 650), setTimeout(() => { setStep(2); sound.quality(); }, 1150), setTimeout(() => { setStep(3); if (leveled) sound.levelUp(); }, 1700)];
    return () => ids.forEach(clearTimeout);
  }, [firstTime, leveled]);
  return (
    <div className={'rburst' + (firstTime ? '' : ' kept') + ' s' + step} style={{ '--c1': lvNow.c[0], '--c2': lvNow.c[1] }}>
      <div className="rb-mon" aria-hidden="true">
        <svg viewBox="0 0 300 50" preserveAspectRatio="none"><path d="M0 25 H80 L90 25 L96 30 L104 4 L112 44 L118 25 H170 L178 25 L184 30 L192 2 L200 46 L206 25 H300" /></svg>
      </div>
      {firstTime ? (
        <div className="rb-row">
          <div className={'rb-cell pts' + (step >= 1 ? ' on' : '')}>
            <span className="rb-ic emo" aria-hidden="true">🪙</span>
            <Counter value={step >= 1 ? r.pts : 0} format={(n) => '+' + nf.format(n)} className="rb-num" label={'+' + nf.format(r.pts) + ' ' + t('rw.points')} />
            <small>{t('rw.points')}</small>
          </div>
          <div className={'rb-cell qs' + (step >= 2 ? ' on' : '')}>
            <span className="rb-ic emo" aria-hidden="true">💠</span>
            <Counter value={step >= 2 ? r.qs : 0} format={(n) => '+' + nf.format(n)} className="rb-num" label={'+' + nf.format(r.qs) + ' ' + t('rw.quality')} />
            <small>{t('rw.quality')}</small>
          </div>
        </div>
      ) : (
        <p className="rb-kept"><span className="emo" aria-hidden="true">✅</span> {t('cel.kept', { pts: nf.format(r.pts), qs: nf.format(r.qs) })}</p>
      )}
      <p className={'rb-total' + (step >= 3 ? ' on' : '')}>
        {t('cel.total', { pts: nf.format(now.pts), usd: usd(now.pts, lang), qs: nf.format(now.qs) })}
        <span className="rb-lv" style={{ '--c1': lvNow.c[0], '--c2': lvNow.c[1] }}><span className="emo" aria-hidden="true">{lvNow.emoji}</span> {t('lv.' + lvNow.key)}{lvNow.rank ? ' ' + lvNow.rank : ''}</span>
      </p>
      {leveled && step >= 3 && <p className="rb-up" role="status"><span className="emo" aria-hidden="true">🎉</span> {t('rw.levelUp', { level: t('lv.' + lvNow.key) })}</p>}
      {unlocked && step >= 3 && <p className="rb-unlock" role="status"><span className="emo" aria-hidden="true">🔓</span> {t('cel.unlocked')}</p>}
    </div>
  );
}

export default function Celebration({ profile, next, firstTime = true, onReview, onNext, onHome }) {
  const { t, tc, lang } = useI18n();
  const ref = useRef(null);
  const btnRef = useRef(null);
  const { date: fmtDate } = useI18n();
  const date = fmtDate(new Date());

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;
    const css = getComputedStyle(document.documentElement);
    const colors = [profile.palette[0], profile.palette[1], css.getPropertyValue('--l1').trim() || '#14B8C4', css.getPropertyValue('--l2').trim() || '#8B5CF6', css.getPropertyValue('--l3').trim() || '#F2611B', '#ffffff', '#FFC23A'];
    return run(ref.current, profile.celebration, colors);
  }, [profile]);

  return (
    <div className={'celebrate pat-' + (profile.pattern || 'dots') + ' cel-' + profile.celebration} role="status" aria-live="polite">
      <canvas ref={ref} className="cel-canvas" aria-hidden="true" />
      <div className="cel-card">
        <div className="cel-top">
          <i className="cel-halo" aria-hidden="true" />
          <i className="cel-orbit" aria-hidden="true" />
          <div className="cel-badge">
            <img src={asset('images/profiles/' + profile.icon)} width="180" height="180" alt={tc(profile.title) + ' completion badge'} />
          </div>
          <span className="cel-seal" aria-hidden="true"><b>✓</b><small>{date}</small></span>
        </div>
        <span className="cel-ribbon"><span className="emo" aria-hidden="true">{profile.emoji}</span> {t('card.completed')} · {tc(profile.flavor)}</span>
        <h3 className="cel-title">{t('cel.title', { profile: tc(profile.title) })}</h3>
        <p className="cel-sub">{next ? t('cel.sub') : t('cel.all')}</p>
        <RewardBurst profile={profile} firstTime={firstTime} />
        <div className="cel-actions">
          {next && (
            <button ref={btnRef} className="btn primary big" type="button" onClick={onNext} style={{ '--p1': next.palette[0], '--p2': next.palette[1] }}>
              <span className="emo" aria-hidden="true">{next.emoji}</span> {t('cel.next', { profile: tc(next.title) })} <span className="arrow" aria-hidden="true">→</span>
            </button>
          )}
          <div className="cel-row">
            <button ref={next ? undefined : btnRef} className="btn" type="button" onClick={onReview}><span className="emo" aria-hidden="true">✏️</span> {t('cel.review')}</button>
            <button className="btn ghost" type="button" onClick={onHome}><span className="emo" aria-hidden="true">🏠</span> {t('cel.home')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
