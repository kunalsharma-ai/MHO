/**
 * Caregiver reward flights (Web Animations API, transform/opacity only).
 *
 *   flyToken(fromEl, toEl, '+50', colors, onLand, 'coin')  → a golden heart-coin carrying "+50" (Care Points)
 *   flyToken(fromEl, toEl, '+1',  colors, onLand, 'star')  → a rosette star badge carrying "+1" (Quality Score)
 *
 * The token rises out of the bead in the Circle of Care, flips and arcs into the header wallet; on arrival the
 * pill bounces (class .pop) and a burst of tiny hearts / petals sprays out.
 */
import { layerEl } from './host.js';

const reduced = () => typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate;

function center(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** burst + bounce on the receiving pill */
export function foilBurst(target, colors = ['#FFB547', '#FF6B5B', '#E8457C', '#FFD98A'], shape = 'coin') {
  if (!target) return;
  target.classList.remove('pop');
  void target.offsetWidth; // restart the CSS animation
  target.classList.add('pop');
  setTimeout(() => target.classList.remove('pop'), 900);
  if (reduced()) return;
  const c = center(target);
  const N = 14;
  for (let k = 0; k < N; k++) {
    const d = document.createElement('i');
    d.className = 'foil-bit ' + (shape === 'star' ? 'fb-petal' : 'fb-heart');
    d.style.setProperty('--fc', colors[k % colors.length]);
    d.style.left = c.x + 'px';
    d.style.top = c.y + 'px';
    layerEl().appendChild(d);
    const a = (k / N) * Math.PI * 2;
    const dist = 30 + (k % 3) * 14;
    d.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0deg) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist + 16}px)) rotate(${k * 67}deg) scale(.4)`, opacity: 0 },
      ],
      { duration: 720, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }
    ).onfinish = () => d.remove();
  }
}

export function flyToken(fromEl, toEl, label, colors, onLand, kind = 'coin') {
  if (!fromEl || !toEl || reduced()) {
    foilBurst(toEl, colors, kind);
    onLand?.();
    return;
  }
  const a = center(fromEl);
  const b = center(toEl);
  const el = document.createElement('div');
  el.className = 'token tk-' + kind;
  el.style.setProperty('--t1', colors[0]);
  el.style.setProperty('--t2', colors[1]);
  el.innerHTML = kind === 'star'
    ? '<svg viewBox="0 0 48 48" aria-hidden="true"><path class="tk-ros" d="M24 2l5 6 8-2 1 8 7 4-4 7 4 7-7 4-1 8-8-2-5 6-5-6-8 2-1-8-7-4 4-7-4-7 7-4 1-8 8 2z"/><path class="tk-st" d="M24 12l3.5 7.5 8 .8-6 5.4 1.8 8-7.3-4.3-7.3 4.3 1.8-8-6-5.4 8-.8z"/></svg><b></b>'
    : '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="tk-rim" cx="24" cy="24" r="22"/><circle class="tk-face" cx="24" cy="24" r="17"/><path class="tk-hrt" d="M24 34s-9-5.4-11.2-10.8C11 19.3 13.5 15 17.8 15c2.5 0 4.2 1.3 5.2 3 1-1.7 2.7-3 5.2-3 4.3 0 6.8 4.3 5 8.2C33 28.6 24 34 24 34z"/></svg><b></b>';
  el.querySelector('b').textContent = label;
  layerEl().appendChild(el);

  const up = kind === 'star' ? 160 : 210;
  const c1 = { x: a.x + (kind === 'star' ? 70 : -50), y: a.y - up };
  const c2 = { x: b.x + (a.x - b.x) * 0.3, y: Math.min(a.y, b.y) - 40 };
  const at = (t) => {
    const u = 1 - t;
    return {
      x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
      y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
    };
  };
  const N = 36;
  const frames = [];
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    const p = at(t);
    const s = t < 0.15 ? 0.4 + t * 5 : t > 0.85 ? 1.15 - (t - 0.85) * 4 : 1.15;
    const spin = kind === 'star' ? t * 360 : Math.sin(t * Math.PI * 3) * 22;
    frames.push({ transform: `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) ${kind === 'coin' ? `rotateY(${t * 720}deg)` : `rotate(${spin}deg)`} scale(${s})`, opacity: t > 0.97 ? 0 : 1, offset: t });
  }
  const anim = el.animate(frames, { duration: kind === 'star' ? 1250 : 1350, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
  let landed = false;
  const done = () => {
    if (landed) return;
    landed = true;
    el.remove();
    foilBurst(toEl, colors, kind);
    onLand?.();
  };
  anim.onfinish = done;
  anim.oncancel = done;
}
