import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Flag } from '../components/CountryPicker.jsx';
import { REGIONS } from '../data/profiles.js';
import { GEO } from '../data/geo.js';
import { COUNTRIES } from '../data/countries.js';
import { prefersReducedMotion } from '../utils/storage.js';

// "Signal Globe": a dotted 3D globe (canvas, no library) where glowing opinion signals arc from member
// countries to Frequent Research HQ in New Delhi. Choosing a region spins the globe to face it; hovering a
// flag pings that country. Throttled to ~30 fps and paused off-screen.

const HQ = [28.6, 77.2];
const ISO = Object.fromEntries(COUNTRIES.map((c) => [c.name.toLowerCase(), c.iso]));
const isoOf = (name) => ISO[name.toLowerCase()] || '';
const toVec = ([lat, lon]) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};
const slerp = (a, b, t) => {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(d);
  if (w < 1e-4) return a;
  const s = Math.sin(w);
  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};
// circular mean longitude of a region → the rotation that faces it
const facing = (names) => {
  let x = 0;
  let y = 0;
  names.forEach((n) => {
    const g = GEO[n];
    if (!g) return;
    x += Math.cos((g[1] * Math.PI) / 180);
    y += Math.sin((g[1] * Math.PI) / 180);
  });
  return -Math.atan2(y, x);
};

function Globe({ active, focus }) {
  const ref = useRef(null);
  const state = useRef({ active, focus });
  state.current = { active, focus };

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return undefined;
    const ctx = cvs.getContext('2d');
    let raf;
    let visible = true;
    let rot = -1.35; // start facing India
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const N = 900;
    const dots = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = ga * i;
      dots.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    const hq = toVec(HQ);
    const markers = [];
    REGIONS.forEach((reg) => reg.countries.forEach((c) => GEO[c] && markers.push({ reg: reg.id, color: reg.color, name: c, v: toVec(GEO[c]), seed: Math.random() })));
    const targets = Object.fromEntries(REGIONS.map((r) => [r.id, facing(r.countries)]));

    const resize = () => {
      const s = cvs.parentElement.clientWidth;
      cvs.width = s * dpr;
      cvs.height = s * dpr;
      cvs.style.width = s + 'px';
      cvs.style.height = s + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cvs);

    const tilt = -0.32;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    let cosR = 1;
    let sinR = 0;
    const project = (v, R, c, lift = 1) => {
      const x = (v[0] * cosR + v[2] * sinR) * lift;
      const z = (-v[0] * sinR + v[2] * cosR) * lift;
      const y = v[1] * lift;
      return [c + x * R, c - (y * cosT - z * sinT) * R, y * sinT + z * cosT];
    };

    const reduce = prefersReducedMotion();
    const BANDS = 6;
    const bands = Array.from({ length: BANDS }, () => []);
    let lastT = 0;
    let t = 0;
    const draw = (now = 0) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (now - lastT < 32) return;
      lastT = now;
      t += 1;
      const { active: act, focus: foc } = state.current;
      // rotation: auto-spin for "all", ease to face a chosen region / hovered country
      let target = null;
      if (foc && GEO[foc]) target = -(GEO[foc][1] * Math.PI) / 180;
      else if (act !== 'all') target = targets[act];
      if (target !== null) {
        let d = target - rot;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        rot += reduce ? d : d * 0.08;
      } else if (!reduce) rot += 0.005;
      cosR = Math.cos(rot);
      sinR = Math.sin(rot);

      const W = cvs.width;
      const R = W * 0.4;
      const c = W / 2;
      ctx.clearRect(0, 0, W, W);

      // dotted sphere (batched by brightness)
      for (let b = 0; b < BANDS; b++) bands[b].length = 0;
      for (const d of dots) {
        const [x, y, z] = project(d, R, c);
        if (z < -0.05) continue;
        const zc = Math.max(0, Math.min(0.999, z));
        bands[Math.floor(zc * BANDS)].push(x, y, (0.8 + zc * 1.1) * dpr);
      }
      for (let b = 0; b < BANDS; b++) {
        const arr = bands[b];
        if (!arr.length) continue;
        ctx.fillStyle = `rgba(170,190,255,${(0.1 + ((b + 0.5) / BANDS) * 0.42).toFixed(3)})`;
        ctx.beginPath();
        for (let k = 0; k < arr.length; k += 3) {
          ctx.moveTo(arr[k] + arr[k + 2], arr[k + 1]);
          ctx.arc(arr[k], arr[k + 1], arr[k + 2], 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // opinion signals: arcs from active countries to HQ with a travelling comet
      const pool = markers.filter((m) => act === 'all' || m.reg === act);
      const shown = act === 'all' ? pool.filter((m, i) => (i + Math.floor(t / 90)) % 4 === 0) : pool;
      ctx.lineCap = 'round';
      for (const m of shown) {
        const dist = Math.acos(Math.min(1, m.v[0] * hq[0] + m.v[1] * hq[1] + m.v[2] * hq[2]));
        if (dist < 0.05) continue;
        const lift = Math.min(0.22, 0.08 + dist * 0.07);
        const pts = [];
        for (let s = 0; s <= 24; s++) {
          const u = s / 24;
          pts.push(project(slerp(m.v, hq, u), R, c, 1 + Math.sin(Math.PI * u) * lift));
        }
        // a point is hidden when it is behind the sphere and inside its silhouette
        const hidden = (p) => p[2] < 0 && Math.hypot(p[0] - c, p[1] - c) < R * 0.99;
        ctx.strokeStyle = m.color;
        ctx.globalAlpha = 0.32;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        let pen = false;
        for (const p of pts) {
          if (hidden(p)) { pen = false; continue; }
          if (pen) ctx.lineTo(p[0], p[1]); else { ctx.moveTo(p[0], p[1]); pen = true; }
        }
        ctx.stroke();
        // comet
        const u = (t * 0.012 + m.seed) % 1;
        const idx = Math.floor(u * 24);
        const p = pts[idx];
        if (!hidden(p)) {
          for (let tail = 0; tail < 4 && idx - tail >= 0; tail++) {
            const q = pts[idx - tail];
            if (hidden(q)) break;
            ctx.globalAlpha = 0.9 - tail * 0.22;
            ctx.fillStyle = tail ? m.color : '#fff';
            ctx.beginPath();
            ctx.arc(q[0], q[1], (2.6 - tail * 0.5) * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // country markers
      for (const m of markers) {
        const [x, y, z] = project(m.v, R, c);
        if (z < 0) continue;
        const on = act === 'all' || act === m.reg;
        const hot = foc === m.name;
        const pulse = (Math.sin(t / 9 + m.seed * 6) + 1) / 2;
        ctx.globalAlpha = on ? 0.35 + z * 0.65 : 0.12;
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(x, y, (hot ? 6 : on ? 3.2 + pulse * 1.4 : 2.2) * dpr, 0, Math.PI * 2);
        ctx.fill();
        if (hot) {
          const ring = (t % 30) / 30;
          ctx.strokeStyle = m.color;
          ctx.lineWidth = 2 * dpr;
          ctx.globalAlpha = 1 - ring;
          ctx.beginPath();
          ctx.arc(x, y, (8 + ring * 26) * dpr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // HQ beacon (New Delhi)
      const [hx, hy, hz] = project(hq, R, c);
      if (hz > 0) {
        const ring = (t % 40) / 40;
        ctx.strokeStyle = '#FFC233';
        ctx.lineWidth = 2 * dpr;
        ctx.globalAlpha = 1 - ring;
        ctx.beginPath();
        ctx.arc(hx, hy, (6 + ring * 22) * dpr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFC233';
        ctx.beginPath();
        ctx.arc(hx, hy, 5 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(hx, hy, 2 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="globe-canvas" role="img" aria-label="Rotating globe with opinion signals flying from member countries to Frequent Research in New Delhi" />;
}

export default function GlobeReach({ withLink = true }) {
  const [active, setActive] = useState('all');
  const [focus, setFocus] = useState(null);
  const reg = REGIONS.find((r) => r.id === active);
  const list = useMemo(
    () => (reg ? reg.countries.map((c) => ({ c, color: reg.color })) : REGIONS.flatMap((r) => r.countries.map((c) => ({ c, color: r.color })))),
    [reg]
  );
  return (
    <section className="section globe-sec" aria-labelledby="globe-title">
      <div className="globe-stars" aria-hidden="true" />
      <div className="container globe-row">
        <div className="globe-wrap reveal">
          <span className="gx-atmo" aria-hidden="true" />
          <span className="gx-orbit o1" aria-hidden="true"><i /></span>
          <span className="gx-orbit o2" aria-hidden="true"><i /></span>
          <Globe active={active} focus={focus} />
          <p className="gx-hq" aria-hidden="true"><span /> Frequent Research · New Delhi</p>
        </div>
        <div className="globe-copy reveal">
          <p className="eyebrow eyebrow-light">Global reach</p>
          <h2 id="globe-title">Five regions. <span className="grad-text">One community.</span></h2>
          <p className="muted-light">From Bogotá to Bengaluru, Lagos to London — watch opinions travel from every corner of the world. Pick a region, then hover a flag.</p>
          <div className="region-tabs" role="tablist" aria-label="Choose a region">
            <button type="button" role="tab" aria-selected={active === 'all'} className={active === 'all' ? 'on' : ''} onClick={() => setActive('all')} style={{ '--rc': '#fff' }}>All regions</button>
            {REGIONS.map((r) => (
              <button type="button" role="tab" key={r.id} aria-selected={active === r.id} className={active === r.id ? 'on' : ''} onClick={() => setActive(r.id)} style={{ '--rc': r.color }}>
                <i /> {r.name}
              </button>
            ))}
          </div>
          <ul className={`flag-deck ${active === 'all' ? 'is-all' : ''}`} key={active} aria-live="polite">
            {list.map(({ c, color }, i) => (
              <li
                key={c}
                style={{ '--i': Math.min(i, 40), '--rc': color }}
                onMouseEnter={() => setFocus(c)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(c)}
                onBlur={() => setFocus(null)}
                tabIndex={0}
              >
                <span className="fd-flag"><Flag iso={isoOf(c)} size={active === 'all' ? 18 : 26} /></span>
                <span className="fd-name">{c}</span>
              </li>
            ))}
          </ul>
          {withLink ? <Link to="/who-can-join" className="link-arrow light">See every profile we welcome <Icon name="arrow" size={16} /></Link> : null}
        </div>
      </div>
    </section>
  );
}
