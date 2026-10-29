// Completion effects — a different animation for every profile, all on one lightweight 2D canvas.
// Each effect runs ~3s and then stops completely (no lingering CPU cost).

const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

export function runFx(canvas, type, colors) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const W = canvas.clientWidth; const H = canvas.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cx = W / 2; const cy = H * 0.36;
  const P = [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = reduce ? 600 : 3200;
  const add = (o) => P.push({ life: 1, rot: 0, vr: 0, g: 0, drag: 1, size: 10, alpha: 1, ...o });

  const confetti = (n, spread = 1, y = cy) => {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2); const s = rnd(4, 11) * spread;
      add({ kind: 'rect', x: cx, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4, g: 0.22, drag: 0.985, size: rnd(5, 10), color: pick(colors), vr: rnd(-0.3, 0.3), decay: rnd(0.006, 0.012) });
    }
  };
  const emojiBurst = (chars, n, opts = {}) => {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2); const s = rnd(3, 9);
      add({ kind: 'emoji', ch: pick(chars), x: opts.x ?? cx, y: opts.y ?? cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (opts.up ?? 3), g: opts.g ?? 0.15, drag: 0.985, size: rnd(18, 34), vr: rnd(-0.08, 0.08), decay: rnd(0.005, 0.01) });
    }
  };

  const setups = {
    ecg() {
      add({ kind: 'ecg', x: 0, y: cy, decay: 0.004, color: colors[0] });
      setTimeout(() => emojiBurst(['❤️', '🫀', '💗'], 26), 650);
      setTimeout(() => confetti(60), 700);
    },
    cross() {
      for (let i = 0; i < 46; i++) {
        const a = (i / 46) * Math.PI * 2; const s = rnd(4, 10);
        add({ kind: 'plus', x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, drag: 0.97, size: rnd(8, 18), color: pick(colors), vr: rnd(-0.2, 0.2), decay: 0.008 });
      }
      add({ kind: 'ring', x: cx, y: cy, r: 10, vrad: 7, color: colors[0], decay: 0.02 });
    },
    helix() {
      for (let i = 0; i < 90; i++) {
        add({ kind: 'helix', t0: i * 0.11, x: cx, y: H + i * 9, vy: -5.2, color: i % 2 ? colors[0] : colors[1], size: 5, decay: 0.0035, phase: i % 2 ? 0 : Math.PI });
      }
      setTimeout(() => confetti(50, 0.8), 900);
    },
    caps() {
      for (let i = 0; i < 14; i++) add({ kind: 'emoji', ch: '🎓', x: rnd(W * 0.2, W * 0.8), y: H + 30, vx: rnd(-2, 2), vy: rnd(-17, -12), g: 0.32, size: rnd(30, 46), vr: rnd(-0.15, 0.15), decay: 0.006 });
      setTimeout(() => confetti(90, 1.1, H * 0.25), 500);
    },
    medal() {
      add({ kind: 'rays', x: cx, y: cy, color: colors[1], decay: 0.006, rot: 0, vr: 0.01 });
      setTimeout(() => emojiBurst(['⭐', '🌟', '✨', '🏅'], 30, { up: 2 }), 250);
    },
    pin() {
      add({ kind: 'emoji', ch: '📍', x: cx, y: -40, vx: 0, vy: 0, g: 0.9, size: 64, bounceY: cy + 10, decay: 0.004 });
      [0, 300, 600, 900].forEach((d) => setTimeout(() => add({ kind: 'ring', x: cx, y: cy + 40, r: 6, vrad: 4.2, color: colors[0], decay: 0.012, flat: true }), 400 + d));
      setTimeout(() => confetti(40, 0.8, cy + 30), 450);
    },
    pixels() {
      const s = 12; const cols = 14; const rows = 8;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        add({ kind: 'pixel', x: rnd(0, W), y: rnd(0, H), tx: cx - (cols * s) / 2 + c * s, ty: cy - (rows * s) / 2 + r * s, size: s - 2, color: pick(colors), decay: 0.0045, delay: rnd(0, 20) });
      }
    },
    bubbles() {
      for (let i = 0; i < 34; i++) add({ kind: 'emoji', ch: pick(['💬', '🗨️', '💭', '✅', '🗳️']), x: rnd(0, W), y: H + rnd(0, 200), vx: 0, vy: rnd(-4.5, -2.2), wob: rnd(0, 6), size: rnd(22, 40), decay: 0.0045 });
      for (let i = 0; i < 40; i++) add({ kind: 'bubble', x: rnd(0, W), y: H + rnd(0, 300), vy: rnd(-3.5, -1.5), size: rnd(4, 14), color: pick(colors), decay: 0.004, wob: rnd(0, 6) });
    },
    stamp() {
      add({ kind: 'ring', x: cx, y: cy, r: 30, vrad: 12, color: colors[0], decay: 0.03, width: 8 });
      setTimeout(() => add({ kind: 'ring', x: cx, y: cy, r: 30, vrad: 9, color: colors[1], decay: 0.025, width: 5 }), 120);
      setTimeout(() => emojiBurst(['✔️', '🛡️', '✅'], 18, { up: 1 }), 150);
      confetti(50, 1);
    },
    coins() {
      for (let i = 0; i < 46; i++) add({ kind: 'emoji', ch: pick(['🪙', '🪙', '💰', '💵']), x: rnd(0, W), y: rnd(-H, -20), vx: rnd(-1, 1), vy: rnd(2, 6), g: 0.25, size: rnd(22, 38), vr: rnd(-0.2, 0.2), bounceY: H - 20, decay: 0.004 });
    },
    molecule() {
      for (let i = 0; i < 9; i++) add({ kind: 'atom', a: (i / 9) * Math.PI * 2, rad: rnd(60, 150), speed: rnd(0.02, 0.04) * (i % 2 ? 1 : -1), size: rnd(7, 14), color: colors[i % colors.length], decay: 0.0042 });
      setTimeout(() => emojiBurst(['🧬', '⚛️', '🔬', '💊'], 20, { up: 2 }), 400);
    },
  };
  (setups[type] || setups.cross)();

  const start = performance.now();
  let raf = 0;
  const frame = (now) => {
    const el = now - start;
    ctx.clearRect(0, 0, W, H);
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      if (p.delay && p.delay-- > 0) continue;
      p.life -= p.decay || 0.01;
      if (p.life <= 0) { P.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.6));
      switch (p.kind) {
        case 'rect':
        case 'plus':
        case 'emoji': {
          p.vy += p.g; p.vx *= p.drag; p.vy *= p.drag; p.x += p.vx + (p.wob ? Math.sin(el / 300 + p.wob) * 0.8 : 0); p.y += p.vy; p.rot += p.vr;
          if (p.bounceY && p.y > p.bounceY) { p.y = p.bounceY; p.vy *= -0.45; p.vx *= 0.7; }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          if (p.kind === 'rect') { ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); }
          else if (p.kind === 'plus') { ctx.fillStyle = p.color; const s = p.size; ctx.fillRect(-s / 2, -s / 6, s, s / 3); ctx.fillRect(-s / 6, -s / 2, s / 3, s); }
          else { ctx.font = `${p.size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.ch, 0, 0); }
          ctx.restore();
          break;
        }
        case 'bubble':
          p.y += p.vy; p.x += Math.sin(el / 400 + p.wob) * 0.6;
          ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.283); ctx.stroke();
          break;
        case 'ring':
          p.r += p.vrad; p.vrad *= 0.97;
          ctx.strokeStyle = p.color; ctx.lineWidth = p.width || 3; ctx.beginPath();
          if (p.flat) ctx.ellipse(p.x, p.y, p.r, p.r * 0.32, 0, 0, 6.283); else ctx.arc(p.x, p.y, p.r, 0, 6.283);
          ctx.stroke();
          break;
        case 'ecg': {
          const prog = Math.min(1, el / 900);
          ctx.strokeStyle = p.color; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.shadowColor = p.color; ctx.shadowBlur = 14;
          ctx.beginPath();
          const pts = [[0, 0], [0.32, 0], [0.36, -10], [0.4, 0], [0.45, 0], [0.48, -90], [0.52, 70], [0.55, -30], [0.58, 0], [0.7, 0], [0.73, -14], [0.76, 0], [1, 0]];
          let started = false;
          for (const [fx, fy] of pts) { if (fx > prog) break; const X = fx * W; const Y = p.y + fy; if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y); }
          ctx.stroke(); ctx.shadowBlur = 0;
          break;
        }
        case 'helix': {
          p.y += p.vy;
          const x = p.x + Math.sin(p.y / 38 + p.phase) * 70;
          const depth = (Math.cos(p.y / 38 + p.phase) + 1) / 2;
          ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(x, p.y, p.size * (0.6 + depth * 0.7), 0, 6.283); ctx.fill();
          if (p.phase === 0) { ctx.strokeStyle = colors[2]; ctx.lineWidth = 1.5; ctx.globalAlpha *= 0.5; ctx.beginPath(); ctx.moveTo(x, p.y); ctx.lineTo(p.x - Math.sin(p.y / 38) * 70, p.y); ctx.stroke(); }
          break;
        }
        case 'rays': {
          p.rot += p.vr;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          for (let k = 0; k < 16; k++) { ctx.rotate(Math.PI / 8); ctx.fillStyle = k % 2 ? colors[0] : colors[1]; ctx.globalAlpha = p.life * 0.25; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-24, -Math.max(W, H)); ctx.lineTo(24, -Math.max(W, H)); ctx.fill(); }
          ctx.restore();
          break;
        }
        case 'pixel': {
          const k = Math.min(1, el / 1100);
          const e = 1 - (1 - k) ** 3;
          const scatter = el > 2000 ? (el - 2000) / 6 : 0;
          const x = p.x + (p.tx - p.x) * e + (scatter ? (p.tx - cx) * scatter / 60 : 0);
          const y = p.y + (p.ty - p.y) * e + (scatter ? (p.ty - cy) * scatter / 60 : 0);
          ctx.fillStyle = p.color; ctx.fillRect(x, y, p.size, p.size);
          break;
        }
        case 'atom': {
          p.a += p.speed;
          const x = cx + Math.cos(p.a) * p.rad; const y = cy + Math.sin(p.a) * p.rad * 0.55;
          ctx.strokeStyle = p.color; ctx.lineWidth = 2; ctx.globalAlpha *= 0.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          ctx.globalAlpha = Math.min(1, p.life * 1.6); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(x, y, p.size, 0, 6.283); ctx.fill();
          break;
        }
        default: break;
      }
    }
    ctx.globalAlpha = 1;
    if (el < DUR && P.length) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
