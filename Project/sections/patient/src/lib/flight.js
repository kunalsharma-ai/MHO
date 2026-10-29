/**
 * Reward delivery flights — a glowing "+50" coin capsule and a "+1 QS" heart token leave the well that was
 * just filled and arc up to the Reward Points / Quality Score pills in the section header. On arrival the pill
 * bounces, a ring pulses and a burst of tiny health sparks sprays out. Web Animations API on fixed elements
 * inside the overlay layer (transform / opacity only, 60 fps).
 */
import { getLayer } from './root.js';

const reduced = () => typeof matchMedia === 'function' && (matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate);
const center = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export { wait };

/** bounce + ring + sparks on the target pill */
export function burst(target, colors = ['#14B8C4', '#8B5CF6', '#F7B547', '#F2611B']) {
  if (!target) return;
  target.classList.remove('pop');
  void target.offsetWidth;
  target.classList.add('pop');
  setTimeout(() => target.classList.remove('pop'), 900);
  if (reduced()) return;
  const layer = getLayer();
  const c = center(target);
  const shapes = ['✚', '♥', '✦', '●'];
  for (let k = 0; k < 14; k++) {
    const d = document.createElement('i');
    d.className = 'spark-bit';
    d.textContent = shapes[k % shapes.length];
    d.style.color = colors[k % colors.length];
    d.style.left = c.x + 'px';
    d.style.top = c.y + 'px';
    layer.appendChild(d);
    const a = (k / 14) * Math.PI * 2, dist = 26 + (k % 3) * 14;
    d.animate(
      [
        { transform: 'translate(-50%,-50%) scale(.6)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist + 10}px)) rotate(${k * 47}deg) scale(1.1)`, opacity: 0 },
      ],
      { duration: 750, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }
    ).onfinish = () => d.remove();
  }
}

/**
 * fly a token from one element to another along a cubic arc
 * kind: 'pts' | 'qs' ; label: text on the token
 */
export function fly(fromEl, toEl, { kind = 'pts', label = '', colors = ['#14B8C4', '#8B5CF6'], delay = 0, duration = 1250 } = {}) {
  return new Promise((resolve) => {
    if (!toEl) return resolve();
    if (!fromEl || reduced()) { burst(toEl, colors); return resolve(); }
    const a = center(fromEl), b = center(toEl);
    const el = document.createElement('div');
    el.className = 'tok tok-' + kind;
    el.style.setProperty('--t1', colors[0]);
    el.style.setProperty('--t2', colors[1]);
    el.innerHTML = `<i class="tok-ic"></i><b>${label}</b>`;
    el.style.opacity = '0';
    getLayer().appendChild(el);
    const side = kind === 'qs' ? 1 : -1;
    const c1 = { x: a.x + side * 90, y: a.y - 160 };
    const c2 = { x: b.x + (a.x - b.x) * 0.25, y: Math.min(a.y, b.y) - 60 };
    const at = (t) => { const u = 1 - t; return { x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x, y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y }; };
    const frames = [];
    for (let k = 0; k <= 36; k++) {
      const t = k / 36, p = at(t);
      const s = t < 0.12 ? 0.4 + t * 6 : t > 0.86 ? 1.12 - (t - 0.86) * 4.5 : 1.12;
      frames.push({ transform: `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${(1 - t) * side * -14}deg) scale(${s})`, opacity: t > 0.97 ? 0 : 1, offset: t });
    }
    setTimeout(() => {
      el.style.opacity = '';
      const anim = el.animate(frames, { duration, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
      const done = () => { el.remove(); burst(toEl, colors); resolve(); };
      anim.onfinish = done;
      anim.oncancel = done;
    }, delay);
  });
}

/** floating "+50" text that rises from an element (used on wells and cards) */
export function floatText(fromEl, text, cls = '') {
  if (!fromEl || reduced()) return;
  const c = center(fromEl);
  const el = document.createElement('b');
  el.className = 'float-txt ' + cls;
  el.textContent = text;
  el.style.left = c.x + 'px';
  el.style.top = c.y + 'px';
  getLayer().appendChild(el);
  el.animate([{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-120%) scale(1.1)', opacity: 1, offset: 0.25 }, { transform: 'translate(-50%,-260%) scale(1)', opacity: 0 }], { duration: 1300, easing: 'ease-out', fill: 'forwards' }).onfinish = () => el.remove();
}
