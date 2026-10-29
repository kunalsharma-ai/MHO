// MyHealthOpinions completion animations, one per option. The canvas sits BEHIND the wizard
// card / page content, so nothing ever covers text. Auto-stops after ≤ 4.2 s.
//   d30 mint leaves rising · d60 lavender bokeh · d90 coral heart burst · hold ocean waves
//   del drifting dust · react heartbeat trace sweeping across with sparks
import { PALETTES } from '../config/actions.js';

export function runFx(canvas, k, origin) {
  if (!canvas) return () => {};
  const c = canvas.getContext('2d');
  if (!c) return () => {};
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = (canvas.width = Math.round(window.innerWidth * dpr));
  const H = (canvas.height = Math.round(window.innerHeight * dpr));
  const ox = (origin?.x ?? window.innerWidth / 2) * dpr, oy = (origin?.y ?? window.innerHeight / 2) * dpr;
  const P = PALETTES[k];
  const cols = [P.c1, P.c2, P.c3];
  const R = Math.random, pick = (a) => a[(R() * a.length) | 0];
  const small = window.innerWidth < 640;
  const n = (v) => Math.round(small ? v * 0.55 : v);
  const it = [];
  const heart = (x, y, s) => { c.beginPath(); c.moveTo(x, y + s * 0.3); c.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3); c.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s); c.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3); c.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3); c.fill(); };

  if (k === 'd30') for (let i = 0; i < n(60); i++) it.push({ x: R() * W, y: H + R() * H * 0.4, vy: -(1.6 + R() * 2.6) * dpr, s: (6 + R() * 10) * dpr, rot: R() * 6, vr: (R() - 0.5) * 0.05, sw: R() * 6, c: pick(cols), plus: R() < 0.25 });
  if (k === 'd60') for (let i = 0; i < n(46); i++) it.push({ x: R() * W, y: H * (0.3 + R() * 0.9), vy: -(0.5 + R() * 1.2) * dpr, r: (8 + R() * 34) * dpr, c: pick(cols), a: 0, ph: R() * 6 });
  if (k === 'd90') for (let i = 0; i < n(90); i++) { const a = R() * Math.PI * 2, v = (4 + R() * 9) * dpr; it.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3 * dpr, g: 0.2 * dpr, s: (8 + R() * 12) * dpr, c: pick([...cols, '#fff']), life: 1, dec: 0.006 + R() * 0.006 }); }
  if (k === 'hold') for (let i = 0; i < 5; i++) it.push({ amp: (14 + i * 6) * dpr, len: (180 + i * 40) * dpr, sp: 1.4 + i * 0.3, base: H * (0.62 + i * 0.07), c: cols[i % 3] });
  if (k === 'del') for (let i = 0; i < n(220); i++) it.push({ x: ox + (R() - 0.5) * 360 * dpr, y: oy + (R() - 0.5) * 260 * dpr, vx: (1 + R() * 3) * dpr, vy: -(R() * 0.8) * dpr, s: (1.5 + R() * 2.5) * dpr, c: pick([P.c1, P.c2, '#94A3B8', '#64748B']), life: 1, dec: 0.004 + R() * 0.005, delay: R() * 900 });
  if (k === 'react') it.push({ trace: true });

  const t0 = performance.now();
  let raf = 0, stopped = false;
  function frame(now) {
    if (stopped) return;
    const el = now - t0, t = el / 1000;
    const fade = Math.max(0, Math.min(1, (4200 - el) / 900));
    c.clearRect(0, 0, W, H);
    let alive = el < 900;

    if (k === 'd30') for (const p of it) {
      p.y += p.vy; p.x += Math.sin(t * 2 + p.sw) * 0.9 * dpr; p.rot += p.vr; if (p.y > -40) alive = true;
      c.globalAlpha = 0.85 * fade; c.fillStyle = p.c; c.save(); c.translate(p.x, p.y); c.rotate(p.rot);
      if (p.plus) { c.fillRect(-p.s / 2, -p.s / 6, p.s, p.s / 3); c.fillRect(-p.s / 6, -p.s / 2, p.s / 3, p.s); }
      else { c.beginPath(); c.ellipse(0, 0, p.s, p.s * 0.45, 0, 0, 6.283); c.fill(); c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = dpr; c.beginPath(); c.moveTo(-p.s, 0); c.lineTo(p.s, 0); c.stroke(); }
      c.restore();
    }
    if (k === 'd60') for (const b of it) {
      b.y += b.vy; b.a = Math.min(1, b.a + 0.03); alive = true;
      const g = c.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r); g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.globalAlpha = b.a * 0.55 * fade * (0.7 + 0.3 * Math.sin(t * 3 + b.ph)); c.fillStyle = g; c.beginPath(); c.arc(b.x, b.y, b.r, 0, 6.283); c.fill();
    }
    if (k === 'd90') for (const p of it) {
      if (p.life <= 0) continue; alive = true; p.life -= p.dec; p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99;
      c.globalAlpha = Math.max(0, p.life) * fade; c.fillStyle = p.c; heart(p.x, p.y, p.s);
    }
    if (k === 'hold') {
      alive = true; const rise = Math.min(1, el / 1200) * (el < 3000 ? 1 : Math.max(0, 1 - (el - 3000) / 1200));
      it.forEach((w, i) => {
        c.globalAlpha = 0.28 * fade; c.fillStyle = w.c; c.beginPath(); c.moveTo(0, H);
        for (let x = 0; x <= W; x += 12 * dpr) c.lineTo(x, w.base + (1 - rise) * H * 0.4 + Math.sin(x / w.len + t * w.sp + i) * w.amp);
        c.lineTo(W, H); c.closePath(); c.fill();
      });
    }
    if (k === 'del') for (const p of it) {
      if (el < p.delay) { alive = true; continue; } if (p.life <= 0) continue; alive = true;
      p.life -= p.dec; p.x += p.vx; p.y += p.vy + Math.sin(t * 3 + p.x) * 0.3 * dpr;
      c.globalAlpha = Math.max(0, p.life) * fade; c.fillStyle = p.c; c.fillRect(p.x, p.y, p.s, p.s);
    }
    if (k === 'react') {
      alive = el < 3600; const head = Math.min(1, el / 1800) * W; const mid = oy;
      c.globalAlpha = fade; c.lineWidth = 4 * dpr; c.lineJoin = 'round'; c.strokeStyle = P.c1; c.shadowColor = P.c2; c.shadowBlur = 18 * dpr;
      c.beginPath(); c.moveTo(0, mid);
      const beat = 240 * dpr;
      for (let x = 0; x <= head; x += 4 * dpr) {
        const ph = (x % beat) / beat;
        let y = mid;
        if (ph > 0.40 && ph < 0.45) y = mid - (ph - 0.40) * 20 * 40 * dpr;
        else if (ph >= 0.45 && ph < 0.5) y = mid - 40 * dpr + (ph - 0.45) * 20 * 110 * dpr;
        else if (ph >= 0.5 && ph < 0.55) y = mid + 70 * dpr - (ph - 0.5) * 20 * 70 * dpr;
        c.lineTo(x, y);
      }
      c.stroke(); c.shadowBlur = 0;
      c.fillStyle = '#fff'; c.beginPath(); c.arc(head, mid, 6 * dpr, 0, 6.283); c.fill();
    }
    c.globalAlpha = 1;
    if (alive && el < 4200) raf = requestAnimationFrame(frame); else c.clearRect(0, 0, W, H);
  }
  raf = requestAnimationFrame(frame);
  return () => { stopped = true; cancelAnimationFrame(raf); c.clearRect(0, 0, W, H); };
}
