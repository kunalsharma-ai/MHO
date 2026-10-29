/**
 * HCP reward flights (Web Animations API, transform / opacity only).
 *
 *   flyToken(fromEl, toEl, '+70', colors, onLand, 'pts') → an amber two-tone CAPSULE carrying +70 (Reward Points)
 *   flyToken(fromEl, toEl, '+5',  colors, onLand, 'qs')  → a teal HEARTBEAT badge carrying +5 (Quality Score)
 *   sparkBurst(el, colors)                               → ring of tiny plus-signs and nucleotides around a gene
 *
 * The token lifts off, banks in a smooth arc (the capsule tumbles, the heart beats) and lands in its wallet pill;
 * the pill bounces (.pop), a burst sprays out and a "+70" / "+5" label floats up from it.
 */
import { layerEl } from './host.js';

const reduced = () => typeof matchMedia !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate;
function center(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
const visible = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; };

export function burst(target, colors = ['#FFB020', '#FF7A45', '#2EE6C5', '#22B8F0'], shape = 'pts', label = '') {
  if (!target) return;
  target.classList.remove('pop');
  void target.offsetWidth; // restart the CSS animation
  target.classList.add('pop');
  setTimeout(() => target.classList.remove('pop'), 900);
  if (reduced() || !visible(target)) return;
  const c = center(target);
  const N = 14;
  for (let k = 0; k < N; k++) {
    const d = document.createElement('i');
    d.className = 'hcp-bit ' + (shape === 'qs' ? 'hb-plus' : 'hb-pill');
    d.style.setProperty('--fc', colors[k % colors.length]);
    d.style.left = c.x + 'px'; d.style.top = c.y + 'px';
    layerEl().appendChild(d);
    const a = (k / N) * Math.PI * 2;
    const dist = 26 + (k % 3) * 14;
    d.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist + 12}px)) rotate(${k * 50}deg) scale(.3)`, opacity: 0 },
    ], { duration: 720, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => d.remove();
  }
  if (label) {
    const f = document.createElement('b');
    f.className = 'hcp-float ' + (shape === 'qs' ? 'hf-qs' : 'hf-pts');
    f.textContent = label;
    f.style.left = c.x + 'px'; f.style.top = c.y + 'px';
    layerEl().appendChild(f);
    const down = c.y < 110; // near the top of the screen: float downwards so the label is never cut off
    f.animate(down ? [
      { transform: 'translate(-50%,30%) scale(.6)', opacity: 0 },
      { transform: 'translate(-50%,110%) scale(1.1)', opacity: 1, offset: 0.25 },
      { transform: 'translate(-50%,190%) scale(1)', opacity: 0 },
    ] : [
      { transform: 'translate(-50%,-30%) scale(.6)', opacity: 0 },
      { transform: 'translate(-50%,-110%) scale(1.1)', opacity: 1, offset: 0.25 },
      { transform: 'translate(-50%,-190%) scale(1)', opacity: 0 },
    ], { duration: 1300, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => f.remove();
  }
}

export function sparkBurst(el, colors) {
  if (!el || reduced() || !visible(el)) return;
  const c = center(el);
  for (let k = 0; k < 18; k++) {
    const d = document.createElement('i');
    d.className = 'hcp-bit ' + (k % 2 ? 'hb-plus' : 'hb-dot');
    d.style.setProperty('--fc', colors[k % colors.length]);
    d.style.left = c.x + 'px'; d.style.top = c.y + 'px';
    layerEl().appendChild(d);
    const a = (k / 18) * Math.PI * 2;
    const dist = 34 + (k % 4) * 12;
    d.animate([
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px), calc(-50% + ${Math.sin(a) * dist}px)) rotate(${k * 40}deg) scale(1)`, opacity: 0 },
    ], { duration: 900, easing: 'cubic-bezier(.15,.8,.3,1)', fill: 'forwards' }).onfinish = () => d.remove();
  }
}

const SVG_PTS = '<svg viewBox="0 0 48 48" aria-hidden="true"><g transform="rotate(-38 24 24)"><rect class="tk-b" x="4" y="15" width="40" height="18" rx="9"/><path class="tk-a" d="M13 15h11v18H13a9 9 0 0 1 0-18z"/><rect class="tk-s" x="9" y="18.5" width="12" height="3.4" rx="1.7"/></g></svg>';
const SVG_QS = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="tk-ring" cx="24" cy="24" r="21"/><path class="tk-heart" d="M24 38S11 30 11 21.5C11 17 14.3 14 18 14c2.7 0 4.8 1.4 6 3.5 1.2-2.1 3.3-3.5 6-3.5 3.7 0 7 3 7 7.5C37 30 24 38 24 38z"/><path class="tk-ecg" d="M13 24h6l2.5-5 3.5 9 2.5-6 2 2h6"/></svg>';

export function flyToken(fromEl, toEl, label, colors, onLand, kind = 'pts') {
  if (!fromEl || !toEl || reduced() || !visible(fromEl)) {
    burst(toEl, colors, kind, label);
    onLand?.();
    return;
  }
  const a = center(fromEl); const b = center(toEl);
  const el = document.createElement('div');
  el.className = 'hcp-token tk-' + kind;
  el.style.setProperty('--t1', colors[0]);
  el.style.setProperty('--t2', colors[1]);
  el.innerHTML = (kind === 'qs' ? SVG_QS : SVG_PTS) + '<b></b>';
  el.querySelector('b').textContent = label;
  layerEl().appendChild(el);

  const up = kind === 'qs' ? 120 : 170;
  const c1 = { x: a.x + (kind === 'qs' ? 90 : -70), y: a.y - up };
  const c2 = { x: b.x + (a.x - b.x) * 0.25, y: Math.min(a.y, b.y) - 40 };
  const at = (tt) => {
    const u = 1 - tt;
    return {
      x: u * u * u * a.x + 3 * u * u * tt * c1.x + 3 * u * tt * tt * c2.x + tt * tt * tt * b.x,
      y: u * u * u * a.y + 3 * u * u * tt * c1.y + 3 * u * tt * tt * c2.y + tt * tt * tt * b.y,
    };
  };
  const N = 30; const frames = [];
  for (let k = 0; k <= N; k++) {
    const tt = k / N; const pt = at(tt);
    const s = tt < 0.15 ? 0.5 + tt * 4.5 : tt > 0.85 ? 1.17 - (tt - 0.85) * 4.4 : 1.17;
    frames.push({ transform: `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%) scale(${s})`, opacity: tt > 0.97 ? 0 : 1, offset: tt });
  }
  const anim = el.animate(frames, { duration: kind === 'qs' ? 1150 : 1250, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
  let landed = false;
  const done = () => {
    if (landed) return;
    landed = true;
    el.remove();
    burst(toEl, colors, kind, label);
    onLand?.();
  };
  anim.onfinish = done;
  anim.oncancel = done;
}
