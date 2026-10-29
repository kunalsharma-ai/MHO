import { asset } from '../lib/asset.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../lib/store.js';
import { sound } from '../lib/sound.js';
import { totalsOf, rewardOf, levelOf, usd } from '../lib/rewards.js';
import { hostEl } from '../lib/host.js';
import { AnimatedLogo } from './Brand.jsx';
import RollNumber from './RollNumber.jsx';
import { useI18n } from '../lib/i18n.js';

/**
 * Completion celebrations – a different animation for every profile.
 * One lightweight <canvas> particle system (≤ ~180 particles, stops by itself
 * after ~3.5 s) + a CSS-animated badge whose entrance also differs per profile.
 */
const PRESETS = {
  hearts: { emoji: ['❤️', '💖', '💗', '💛', '🧡'], mode: 'burst', n: 70, grav: -0.02, speed: 13, size: [18, 38] },
  confetti: { mode: 'confetti', n: 170 },
  stars: { emoji: ['⭐', '🌟', '✨', '💫'], mode: 'burst', n: 80, grav: 0.03, speed: 14, size: [14, 34], twinkle: true },
  caps: { emoji: ['🎓', '🎓', '📜', '⭐', '📚'], mode: 'toss', n: 46, size: [26, 46] },
  fireworks: { mode: 'fireworks' },
  pulse: { mode: 'ecg', emoji: ['💓', '💗'], n: 30 },
  shield: { emoji: ['✨', '💠', '🔷'], mode: 'ring', n: 60, size: [12, 26] },
  fruit: { emoji: ['🍎', '🥑', '🍇', '🥕', '🍋', '🍓', '🥦', '🍊'], mode: 'rain', n: 60, size: [24, 40], bounce: true },
  medals: { emoji: ['🏅', '🥇', '🏆', '🎖️'], mode: 'rain', n: 36, size: [26, 46], bounce: true, confetti: 60 },
  pixels: { mode: 'pixels', n: 160 },
  balloons: { emoji: ['🎈', '🎈', '🎈', '🎉'], mode: 'rise', n: 34, size: [30, 54] },
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
      if (P.confetti) confetti(P.confetti);
      break;
    case 'toss':
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(W * 0.15, W * 0.85), y: H + 30, vx: rnd(-3, 3), vy: rnd(-17, -11), size: rnd(...P.size), grav: 0.32, drag: 0.995, vr: rnd(-0.18, 0.18), decay: 0.0035 });
      setTimeout(() => confetti(70, W / 2, H * 0.25, 12), 500);
      break;
    case 'rise':
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(0, W), y: H + rnd(10, H * 0.6), vx: 0, vy: rnd(-3.2, -1.6), size: rnd(...P.size), grav: -0.01, drag: 1, sway: rnd(0.5, 1.5), ph: rnd(0, 6), decay: 0.0028 });
      confetti(50);
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
          add({ t: 'dot', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 2.4, c, grav: 0.06, drag: 0.97, decay: 0.012, trail: true });
        }
      };
      [[0.3, 0.3, 0], [0.7, 0.25, 350], [0.5, 0.18, 700], [0.2, 0.45, 1000], [0.8, 0.45, 1250]].forEach(([x, y, d]) => setTimeout(() => burst(W * x, H * y), d));
      break;
    }
    case 'ecg':
      parts.ecg = { x: 0 };
      for (let i = 0; i < P.n; i++) emo(pickOne(P.emoji), { x: rnd(0, W), y: H + rnd(0, 200), vx: rnd(-0.5, 0.5), vy: rnd(-3, -1.5), size: rnd(18, 34), grav: -0.01, drag: 1, decay: 0.004 });
      break;
    case 'rocket':
      parts.rocket = { x: -60, y: H + 40, img: sprite('🚀', cache) };
      break;
  }

  let raf = 0;
  const t0 = performance.now();
  const frame = (now) => {
    const el = now - t0;
    g.clearRect(0, 0, W, H);
    if (parts.ecg) {
      const e = parts.ecg;
      e.x = Math.min(W, (el / 1400) * W);
      g.strokeStyle = colors[0];
      g.lineWidth = 4;
      g.lineJoin = 'round';
      g.shadowColor = colors[0];
      g.shadowBlur = 12;
      g.beginPath();
      for (let x = 0; x <= e.x; x += 4) {
        const ph = (x % 220) / 220;
        let y = cy;
        if (ph > 0.4 && ph < 0.46) y -= (ph - 0.4) * 1800;
        else if (ph >= 0.46 && ph < 0.52) y += -108 + (ph - 0.46) * 3600;
        else if (ph >= 0.52 && ph < 0.56) y += 108 - (ph - 0.52) * 2700;
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
      g.shadowBlur = 0;
    }
    if (parts.rocket) {
      const r = parts.rocket;
      const k = Math.min(1, el / 1600);
      r.x = -60 + k * (W + 120);
      r.y = H + 40 - k * (H + 120) * (0.6 + 0.4 * k);
      for (let i = 0; i < 3; i++) add({ t: 'dot', x: r.x + rnd(-6, 6), y: r.y + 30 + rnd(-6, 6), vx: rnd(-1, 1), vy: rnd(0.5, 2), r: rnd(3, 7), c: pickOne(['#ffd166', '#ff8c42', '#fff', '#aaa']), grav: 0, drag: 0.96, decay: 0.03 });
      if (k < 1) { g.save(); g.translate(r.x, r.y); g.rotate(-0.15); g.drawImage(r.img, -28, -28, 56, 56); g.restore(); }
      if (k >= 1 && !r.done) { r.done = true; confetti(120, W * 0.85, H * 0.15, 14); }
    }
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
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.rot);
        if (p.spin) g.scale(Math.cos(el / 120 + i), 1);
        g.drawImage(p.img, -s / 2, -s / 2, s, s);
        g.restore();
      } else if (p.t === 'rect') {
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.rot * 3);
        g.fillStyle = p.c;
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(el / 150 + i)));
        g.restore();
      } else if (p.t === 'px') {
        g.fillStyle = p.c;
        g.fillRect(Math.round(p.x / 8) * 8, Math.round(p.y / 8) * 8, p.w, p.w);
      } else {
        g.fillStyle = p.c;
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.globalAlpha = 1;
    if (el < 5200 && (parts.length || el < 1800)) raf = requestAnimationFrame(frame);
    else g.clearRect(0, 0, W, H);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/**
 * Reward on the completion card — the "care locket": a heart locket in the profile's colours swings open
 * (its two halves part like doors), a golden heart-coin "+50 Care Points" and a rosette star "+1 Quality Score"
 * rise out of it on a puff of petals and count up, followed by the new totals and care level.
 * If a completed profile is finished again after editing, the locket is already open and the copy says the
 * reward was counted the first time (rewards are given once).
 */
function LocketReward({ profile, firstTime }) {
  const { t, nf, lang } = useI18n();
  const metaS = useStore((s) => s.meta);
  const tot = useMemo(() => totalsOf(metaS), [metaS]);
  const rw = rewardOf(profile.id);
  const [on, setOn] = useState(!firstTime);
  useEffect(() => {
    if (!firstTime) return undefined;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const a = setTimeout(() => { setOn(true); sound.heartbeat(); }, reduce ? 0 : 850);
    const b = setTimeout(() => sound.coin(), reduce ? 0 : 1300);
    const c = setTimeout(() => sound.quality(), reduce ? 0 : 1650);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, [firstTime]);
  const L = levelOf(tot.qs);
  return (
    <div className={'locket' + (firstTime ? '' : ' kept') + (on ? ' on' : '')} style={{ '--s1': profile.palette[0], '--s2': profile.palette[1] }}>
      <div className="lk-stage" aria-hidden="true">
        <i className="lk-glow" />
        <span className="lk-chain" />
        <span className="lk-half l"><svg viewBox="0 0 50 90"><path d="M50 88C22 70 2 54 2 30 2 14 14 2 28 2c10 0 18 6 22 14z" /></svg></span>
        <span className="lk-half r"><svg viewBox="0 0 50 90"><path d="M0 88c28-18 48-34 48-58C48 14 36 2 22 2 12 2 4 8 0 16z" /></svg></span>
        <span className="lk-coin"><b>♥</b></span>
        <span className="lk-star"><b>★</b></span>
        <span className="lk-petals"><i /><i /><i /><i /><i /><i /><i /><i /></span>
      </div>
      <div className="lk-chips">
        <span className="lk-chip lk-pts"><span className="lk-ic" aria-hidden="true">♥</span>
          <b className="num">+<RollNumber value={on ? rw.pts : 0} format={(n) => nf.format(n)} /></b><small>{t('rw.points')}</small></span>
        <span className="lk-chip lk-qs"><span className="lk-ic" aria-hidden="true">★</span>
          <b className="num">+<RollNumber value={on ? rw.qs : 0} format={(n) => nf.format(n)} /></b><small>{t('cel.qs')}</small></span>
      </div>
      <p className="lk-note">
        {firstTime
          ? t('cel.vrTotal', { pts: nf.format(tot.pts), usd: usd(tot.pts, lang), qs: nf.format(tot.qs), level: t('lvl.' + L.key) })
          : t('cel.vrKept')}
      </p>
    </div>
  );
}

export default function Celebration({ profile, next, firstTime = true, unlock, unlockItem, name, onReview, onNext, onHome }) {
  const { t, tc } = useI18n();
  const ref = useRef(null);
  const btnRef = useRef(null);
  useEffect(() => {
    if (!unlock) return undefined;
    const id = setTimeout(() => sound.unlocked(), 2100);
    return () => clearTimeout(id);
  }, [unlock]);

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;
    const css = getComputedStyle(hostEl());
    const colors = [profile.palette[0], profile.palette[1], css.getPropertyValue('--l1').trim() || '#ff4d6d', css.getPropertyValue('--l2').trim() || '#7b5cff', css.getPropertyValue('--l3').trim() || '#00c2c7', '#ffffff', '#ffd166'];
    return run(ref.current, profile.celebration, colors);
  }, [profile]);

  return (
    <div className={'celebrate pat-' + (profile.pattern || 'dots') + ' cel-' + profile.celebration} role="status" aria-live="polite">
      <canvas ref={ref} className="cel-canvas" aria-hidden="true" />
      <div className="cel-card">
        <div className="cel-logo"><AnimatedLogo height={24} /></div>
        <div className="cel-top">
          <i className="burst" aria-hidden="true" />
          <div className="cel-badge">
            <img src={asset('images/profiles/' + profile.icon)} width="170" height="170" alt={tc(profile.title) + ' completion badge'} />
            <span className="cel-emoji emo" aria-hidden="true">{profile.emoji}</span>
          </div>
        </div>
        <span className="cel-ribbon"><span className="emo" aria-hidden="true">💞</span> {t('card.completed')} · {tc(profile.flavor)}</span>
        <h3 className="cel-title">{t('cel.title', { profile: tc(profile.title) })}</h3>
        {name && <p className="cel-name">{t('cel.byName', { name })}</p>}
        <p className="cel-sub">{next ? t('cel.sub') : t('cel.all')}</p>
        <LocketReward profile={profile} firstTime={firstTime} />
        {unlock && unlockItem && (
          <div className={'cel-unlock u-' + unlock.kind} style={{ '--u1': unlockItem.palette[0], '--u2': unlockItem.palette[1] }} role="status">
            <span className="cu-lock" aria-hidden="true">🗝️</span>
            <span className="cu-txt"><b>{t(unlock.kind === 'surveys' ? 'cel.unlockSurveys' : 'cel.unlockSurvey')}</b><small><span className="emo" aria-hidden="true">{unlockItem.emoji}</span> {tc(unlockItem.title)}</small></span>
            <i className="cu-rays" aria-hidden="true" />
          </div>
        )}
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
