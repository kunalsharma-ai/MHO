// v4 home sections — each one its own visual idea:
//   DiseaseAtlas   all 20 therapy areas on a rotating colour wheel; the chosen area's conditions spill out
//   HospitalLift   the healthcare workforce as an isometric hospital — ride the glass lift floor by floor;
//                  caregivers live in the house next door
//   MetroSteps     the four steps to a first payout as a metro line with a train that stops at each station
//   Anonymiser     personal details scramble into a respondent code; only combined charts come out
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { LiveZone, useInView } from './ui.jsx';
import { Link } from '../router.jsx';
import { THERAPY_AREAS, CONDITION_COUNT } from '../data/conditions.js';
import { FLOORS, CAREGIVER_HOUSE } from '../data/workforce.js';
import { STEPS } from '../data/surveys.js';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Auto-advance an index while visible, until the visitor interacts. */
function useAutoCycle(n, ms, ref, inView) {
  const [i, setI] = useState(0);
  const touched = useRef(false);
  useEffect(() => {
    if (!inView || reduced()) return;
    const t = setInterval(() => { if (!touched.current && !document.hidden) setI((x) => (x + 1) % n); }, ms);
    return () => clearInterval(t);
  }, [inView, n, ms]);
  const pick = (k) => { touched.current = true; setI(k); };
  return [i, pick];
}

/* =====================================================================
   1. Disease atlas — colour wheel of therapy areas
   ===================================================================== */
const N = THERAPY_AREAS.length;
const SEG = 360 / N;
const rad = (d) => (d * Math.PI) / 180;
const pt = (r, a) => [+(r * Math.cos(rad(a))).toFixed(2), +(r * Math.sin(rad(a))).toFixed(2)];
function arc(i, R = 188, r = 122, gap = 0.9) {
  const a0 = -90 - SEG / 2 + i * SEG + gap;
  const a1 = a0 + SEG - gap * 2;
  const [x0, y0] = pt(R, a0), [x1, y1] = pt(R, a1), [x2, y2] = pt(r, a1), [x3, y3] = pt(r, a0);
  return `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r} ${r} 0 0 0 ${x3} ${y3}Z`;
}

export function DiseaseAtlas() {
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [i, pick] = useAutoCycle(N, 3400, ref, inView);
  const [rot, setRot] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    let d = (i - prev.current) % N;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    setRot((r) => r - d * SEG);
    prev.current = i;
  }, [i]);
  const a = THERAPY_AREAS[i];
  return (
    <div className="atlas" ref={ref} style={{ '--ac': a.color }}>
      <LiveZone className="atlas-wheel">
        <svg viewBox="-200 -200 400 400" className="aw-svg" role="group" aria-label="Therapy areas">
          <circle r="197" className="aw-dash" />
          <g className="aw-rot" style={{ transform: `rotate(${rot}deg)`, '--w': `${rot}deg` }}>
            {THERAPY_AREAS.map((x, k) => {
              const mid = -90 + k * SEG;
              const [ox, oy] = pt(9, mid);
              const [ix, iy] = pt(155, mid);
              return (
                <g key={x.id} className={`aw-seg ${k === i ? 'on' : ''}`} style={{ '--c': x.color, transform: k === i ? `translate(${ox}px, ${oy}px)` : 'none' }} onClick={() => pick(k)}>
                  <path d={arc(k)} />
                  <g transform={`translate(${ix - 11} ${iy - 11})`}><g className="aw-ic"><Icon name={x.icon} size={22} stroke={2.2} /></g></g>
                </g>
              );
            })}
          </g>
          <circle r="114" className="aw-core" />
          <circle r="114" className="aw-pulse" />
        </svg>
        <div className="aw-center" key={a.id} aria-live="polite">
          <span className="awc-ic"><Icon name={a.icon} size={30} /></span>
          <b>{a.area}</b>
          <small>{a.items.length} conditions</small>
        </div>
        <span className="aw-pointer" aria-hidden="true" />
      </LiveZone>
      <div className="atlas-side">
        <div className="as-total"><b>{CONDITION_COUNT}+</b><span>conditions across<br />{N} therapy areas</span></div>
        <div className="as-tabs" role="tablist" aria-label="Choose a therapy area">
          {THERAPY_AREAS.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} style={{ '--c': x.color }} onClick={() => pick(k)} title={x.area}>
              <Icon name={x.icon} size={15} /><span className="sr-only">{x.area}</span>
            </button>
          ))}
        </div>
        <div className="as-panel" key={a.id}>
          <h3><Icon name={a.icon} size={18} /> {a.area}</h3>
          <ul className="as-chips">
            {a.items.map((c, k) => <li key={c} style={{ '--i': k }}>{c}</li>)}
          </ul>
        </div>
        <div className="as-links">
          <Link className="text-link" to="/patients">Patients: what we study <Icon name="arrow" size={14} /></Link>
          <Link className="text-link" to="/healthcare-professionals">Specialists we recruit <Icon name="arrow" size={14} /></Link>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   2. Hospital lift — the workforce floor by floor
   ===================================================================== */
const ISO = (X, Y, Z) => [300 + (X - Y) * 0.866, 386 + (X + Y) * 0.5 - Z];
const iso = (arr) => arr.map(([x, y, z]) => ISO(x, y, z).map((n) => n.toFixed(1)).join(',')).join(' ');
const FH = 23; // floor height
const BW = 132, BD = 88; // building footprint
function Slab({ z, f, on }) {
  const top = z + FH;
  const winL = Array.from({ length: 6 }, (_, k) => 8 + k * 20.5);
  const winR = [8, 26, 44];
  return (
    <g className={`hl-floor ${on ? 'on' : ''}`} style={{ '--c': f.color }}>
      <polygon className="hf-r" points={iso([[BW, 0, z], [BW, BD, z], [BW, BD, top], [BW, 0, top]])} />
      <polygon className="hf-l" points={iso([[0, BD, z], [BW, BD, z], [BW, BD, top], [0, BD, top]])} />
      <polygon className="hf-band" points={iso([[0, BD, top - 3], [BW, BD, top - 3], [BW, BD, top], [0, BD, top]])} />
      <polygon className="hf-band r" points={iso([[BW, 0, top - 3], [BW, BD, top - 3], [BW, BD, top], [BW, 0, top]])} />
      {winL.map((x, k) => <polygon key={'l' + k} className="hf-win" style={{ '--k': k }} points={iso([[x, BD, z + 6], [x + 12, BD, z + 6], [x + 12, BD, z + 16], [x, BD, z + 16]])} />)}
      {winR.map((y, k) => <polygon key={'r' + k} className="hf-win r" style={{ '--k': k + 6 }} points={iso([[BW, y, z + 6], [BW, y + 12, z + 6], [BW, y + 12, z + 16], [BW, y, z + 16]])} />)}
    </g>
  );
}

export function HospitalLift() {
  const stops = useMemo(() => [...FLOORS, CAREGIVER_HOUSE], []);
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [i, pick] = useAutoCycle(stops.length, 3200, ref, inView);
  const cur = stops[i];
  const isHouse = cur.id === 'caregivers';
  const liftZ = isHouse ? 0 : (cur.floor - 1) * FH;
  const H = FLOORS.length * FH;
  return (
    <div className="hlift" ref={ref} style={{ '--c': cur.color }}>
      <LiveZone className="hl-scene">
        <svg viewBox="40 60 520 460" className="hl-svg" aria-hidden="true">
          <defs>
            <linearGradient id="hl-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c7d2fe" stopOpacity=".5" /><stop offset="1" stopColor="#e0e7ff" stopOpacity=".2" /></linearGradient>
          </defs>
          {/* ground + road */}
          <polygon className="hl-ground" points={iso([[-160, -60, 0], [220, -60, 0], [220, 240, 0], [-160, 240, 0]])} />
          <polygon className="hl-road" points={iso([[-160, 120, 0], [220, 120, 0], [220, 150, 0], [-160, 150, 0]])} />
          {[-140, -90, -40, 10, 60, 110, 160].map((x) => <polygon key={x} className="hl-lane" points={iso([[x, 134, 0], [x + 26, 134, 0], [x + 26, 136, 0], [x, 136, 0]])} />)}
          {/* ambulance */}
          <g className="hl-amb">
            <polygon fill="#fff" points={iso([[0, 126, 0], [28, 126, 0], [28, 126, 14], [0, 126, 14]])} />
            <polygon fill="#f1f5f9" points={iso([[0, 126, 14], [28, 126, 14], [28, 140, 14], [0, 140, 14]])} />
            <polygon fill="#e2e8f0" points={iso([[28, 126, 0], [28, 140, 0], [28, 140, 14], [28, 126, 14]])} />
            <polygon fill="#ef2d56" points={iso([[0, 126, 6], [28, 126, 6], [28, 126, 9], [0, 126, 9]])} />
            <polygon className="hl-siren" points={iso([[10, 131, 14], [16, 131, 14], [16, 135, 18], [10, 135, 18]])} />
          </g>
          {/* caregiver house */}
          <g className={`hl-house ${isHouse ? 'on' : ''}`} onClick={() => pick(stops.length - 1)}>
            <polygon className="hh-r" points={iso([[-120, 30, 0], [-120, 80, 0], [-120, 80, 34], [-120, 30, 34]])} />
            <polygon className="hh-l" points={iso([[-170, 80, 0], [-120, 80, 0], [-120, 80, 34], [-170, 80, 34]])} />
            <polygon className="hh-roof" points={iso([[-170, 80, 34], [-120, 80, 34], [-120, 55, 58], [-170, 55, 58]])} />
            <polygon className="hh-roof r" points={iso([[-120, 30, 34], [-120, 80, 34], [-120, 55, 58]])} />
            <polygon className="hh-door" points={iso([[-150, 80, 0], [-140, 80, 0], [-140, 80, 18], [-150, 80, 18]])} />
            <polygon className="hh-win" points={iso([[-132, 80, 14], [-124, 80, 14], [-124, 80, 24], [-132, 80, 24]])} />
            <polygon className="hh-win" points={iso([[-120, 42, 14], [-120, 52, 14], [-120, 52, 24], [-120, 42, 24]])} />
            <g className="hh-heart" transform={`translate(${ISO(-145, 55, 74).join(' ')})`}><path d="M0 -3c-3-6-12-4-10 3 1 4 10 9 10 9s9-5 10-9c2-7-7-9-10-3z" /></g>
          </g>
          {/* hospital */}
          <polygon className="hl-shadow" points={iso([[0, 0, 0], [BW + 30, 0, 0], [BW + 30, BD + 20, 0], [0, BD + 20, 0]])} />
          {FLOORS.slice().reverse().map((f) => <Slab key={f.id} f={f} z={(f.floor - 1) * FH} on={cur.id === f.id} />)}
          <polygon className="hl-roof" points={iso([[0, 0, H], [BW, 0, H], [BW, BD, H], [0, BD, H]])} />
          <g className="hl-sign">
            <polygon fill="#ef2d56" points={iso([[52, 30, H], [80, 30, H], [80, 30, H + 34], [52, 30, H + 34]])} />
            <polygon fill="#fff" points={iso([[62, 30, H + 8], [70, 30, H + 8], [70, 30, H + 26], [62, 30, H + 26]])} />
            <polygon fill="#fff" points={iso([[56, 30, H + 13], [76, 30, H + 13], [76, 30, H + 21], [56, 30, H + 21]])} />
          </g>
          {/* glass lift shaft + car */}
          <polygon className="hl-shaft" points={iso([[BW, 62, 0], [BW + 14, 62, 0], [BW + 14, 62, H + 6], [BW, 62, H + 6]])} />
          <polygon className="hl-shaft r" points={iso([[BW + 14, 62, 0], [BW + 14, 82, 0], [BW + 14, 82, H + 6], [BW + 14, 62, H + 6]])} />
          <g className="hl-car" style={{ transform: `translateY(${-liftZ}px)` }}>
            <polygon className="hc-f" points={iso([[BW + 14, 64, 2], [BW + 14, 80, 2], [BW + 14, 80, 20], [BW + 14, 64, 20]])} />
            <polygon className="hc-s" points={iso([[BW + 2, 64, 20], [BW + 14, 64, 20], [BW + 14, 80, 20], [BW + 2, 80, 20]])} />
            <circle className="hc-dot" cx={ISO(BW + 14, 72, 11)[0]} cy={ISO(BW + 14, 72, 11)[1]} r="2.4" />
          </g>
          {/* floor pins (clickable) */}
          {FLOORS.map((f) => {
            const [x, y] = ISO(0, BD, (f.floor - 1) * FH + FH / 2);
            return (
              <g key={f.id} className={`hl-pin ${cur.id === f.id ? 'on' : ''}`} transform={`translate(${x - 26} ${y})`} style={{ '--c': f.color }} onClick={() => pick(FLOORS.indexOf(f))}>
                <rect x="-16" y="-9" width="26" height="18" rx="6" />
                <text x="-3" y="4" textAnchor="middle">{f.floor}</text>
              </g>
            );
          })}
        </svg>
      </LiveZone>

      <div className="hl-side">
        <div className="hl-panel" role="group" aria-label="Lift buttons">
          <span className="hp-head"><Icon name="layers" size={14} /> Ride the lift</span>
          <div className="hp-btns">
            {FLOORS.map((f, k) => (
              <button key={f.id} className={cur.id === f.id ? 'on' : ''} style={{ '--c': f.color }} onClick={() => pick(k)} aria-pressed={cur.id === f.id} aria-label={`Floor ${f.floor}: ${f.label}`}>{f.floor}</button>
            ))}
            <button className={`hp-home ${isHouse ? 'on' : ''}`} style={{ '--c': CAREGIVER_HOUSE.color }} onClick={() => pick(stops.length - 1)} aria-pressed={isHouse} aria-label="Next door: caregivers at home"><Icon name="home" size={15} /></button>
          </div>
          <span className="hp-display" aria-live="polite"><i>{isHouse ? '⌂' : cur.floor}</i>{isHouse ? 'Next door' : `Floor ${cur.floor}`}</span>
        </div>
        <article className="hl-card" key={cur.id}>
          <span className="hcard-ic"><Icon name={cur.icon} size={22} /></span>
          <h3>{cur.label}</h3>
          <p className="hcard-meta">{isHouse ? `${cur.roles.length} caregiver profiles` : <>{cur.titles} job titles{cur.extra ? ` · ${cur.extra}` : ''}</>}</p>
          <ul className="hcard-roles">
            {(cur.core || []).map((r, k) => <li key={r} className="core" style={{ '--i': k }}>{r}</li>)}
            {cur.roles.map((r, k) => <li key={r} style={{ '--i': k + (cur.core?.length || 0) }}>{r}</li>)}
          </ul>
          <Link className="text-link" to={isHouse ? '/caregivers' : `/healthcare-professionals#${cur.id}`}>{isHouse ? 'Everything for caregivers' : 'Every role on this floor'} <Icon name="arrow" size={14} /></Link>
        </article>
      </div>
    </div>
  );
}

/* =====================================================================
   3. Metro steps — four stations to a first payout
   ===================================================================== */
export function MetroSteps() {
  return (
    <LiveZone className="metro">
      <div className="mt-line" aria-hidden="true">
        <span className="mt-track"><i /></span>
        <span className="mt-train"><span className="mtt-win" /><span className="mtt-win" /><span className="mtt-logo"><Icon name="heart" size={12} fill="currentColor" stroke={1} /></span></span>
        <span className="mt-coin">$</span>
      </div>
      <ol className="mt-stations">
        {STEPS.map((s, k) => (
          <li key={s.title} style={{ '--c': s.color, '--k': k }}>
            <span className="mt-stop" aria-hidden="true"><Icon name={s.icon} size={18} /></span>
            <span className="mt-card">
              <small>Station {k + 1}</small>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </LiveZone>
  );
}

/* =====================================================================
   4. Anonymiser — personal details scramble into a respondent code
   ===================================================================== */
const GLYPHS = '█▓▒░#%&@$*+=?<>/\\';
const FIELDS = [['user', 'Name', 'Your name'], ['mail', 'Email', 'you@email.com'], ['phone', 'Phone', '+00 00000 00000'], ['pin', 'City', 'Your city']];

function useScramble(active) {
  const [phase, setPhase] = useState(0); // 0 clear → 1 scrambling → 2 sealed
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active || reduced()) return;
    let t;
    const run = (p) => { setPhase(p); t = setTimeout(() => run((p + 1) % 3), p === 1 ? 1800 : 2600); };
    run(0);
    return () => clearTimeout(t);
  }, [active]);
  useEffect(() => {
    if (phase !== 1) return;
    const t = setInterval(() => setTick((x) => x + 1), 70);
    return () => clearInterval(t);
  }, [phase]);
  return [phase, tick];
}
const scramble = (s, tick) => s.split('').map((ch, i) => (ch === ' ' ? ' ' : GLYPHS[(i * 7 + tick * 3) % GLYPHS.length])).join('');

export function Anonymiser() {
  const [ref, inView] = useInView({ threshold: 0.3 }, false);
  const [phase, tick] = useScramble(inView);
  return (
    <div className="anon" ref={ref}>
      <LiveZone className={`anon-scene ph-${phase}`} aria-hidden="true">
        <div className="an-card an-in">
          <span className="an-head"><Icon name="user" size={15} /> Your profile</span>
          {FIELDS.map(([ic, k, v]) => (
            <span key={k} className="an-row"><Icon name={ic} size={14} /><em>{k}</em><code>{phase === 0 ? v : phase === 1 ? scramble(v, tick) : '•'.repeat(Math.min(v.length, 12))}</code></span>
          ))}
          <span className="an-row ok"><Icon name="clipboard" size={14} /><em>Answers</em><code>Q1 · Q2 · Q3 …</code></span>
        </div>
        <div className="an-machine">
          <span className="am-gear g1" /><span className="am-gear g2" />
          <span className="am-core"><Icon name="lock" size={26} /></span>
          <span className="am-beam" />
          {Array.from({ length: 6 }).map((_, k) => <i key={k} className="am-bit" style={{ '--k': k }} />)}
          <span className="am-lbl">Anonymiser</span>
        </div>
        <div className="an-card an-out">
          <span className="an-head"><Icon name="chart" size={15} /> What researchers get</span>
          <span className="an-id">Respondent <b>#R-48213</b></span>
          <svg viewBox="0 0 120 120" className="an-donut">
            <circle cx="60" cy="60" r="44" className="d-bg" />
            <circle cx="60" cy="60" r="44" className="d-a" pathLength="100" />
            <circle cx="60" cy="60" r="44" className="d-b" pathLength="100" />
            <text x="60" y="58" textAnchor="middle">2,140</text>
            <text x="60" y="74" textAnchor="middle" className="d-sm">answers</text>
          </svg>
          <span className="an-legend"><i className="la" />62% better <i className="lb" />28% same</span>
          <small>Combined results only · no names</small>
        </div>
      </LiveZone>
      <ul className="anon-promises">
        {[
          ['lock', 'Never sold', 'Your personal information is not for sale, to anyone.', '#00a88a'],
          ['users', 'Combined answers only', 'Researchers see totals, never your name or email.', '#2457f5'],
          ['shieldCheck', 'Certified security', 'ISO 27001 information security and ISO 20252 research standards.', '#7c3aed'],
          ['x', 'Leave any time', 'Delete your account from your profile in two clicks.', '#ef2d56'],
        ].map(([ic, t, d, c], k) => (
          <li key={t} style={{ '--c': c, '--k': k }}>
            <span className="ap-ic"><Icon name={ic} size={18} /></span>
            <b>{t}</b>
            <small>{d}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
