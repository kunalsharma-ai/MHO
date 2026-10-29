// New showcase sections: community pulse, reward wheel & shelves, professional honeycomb,
// specialty capsules, 3D testimonial carousel and the 3D flag globe.
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Persona from './Persona.jsx';
import Counter from './Counter.jsx';
import { Flag, Stars, LiveZone, useInView, Reveal } from './ui.jsx';
import { Link } from '../router.jsx';
import { COMMUNITY_STATS, REWARD_ROLES, PRO_CATEGORIES, SPECIALTIES } from '../data/community.js';
import { TESTIMONIALS, AUDIENCES } from '../data/testimonials.js';
import { useMemberReviews } from '../utils/reviews.js';
import { REGIONS, COVERAGE_COUNT } from '../data/countries.js';
import { HeartMark } from './Brand.jsx';

/* ---------------- Community pulse: four stats, four different mini-visuals ---------------- */
function StatViz({ id, on }) {
  if (id === 'panelists')
    return (
      <span className="sv-crowd" aria-hidden="true">
        {[['doctor', 2, 0, 0], ['nurse', 4, 1, 1], ['caregiver', 1, 3, 1], ['patient', 3, 2, 0], ['pharmacist', 0, 4, 2], ['elder', 1, 0, 0]].map((p, i) => (
          <span key={i} style={{ '--i': i }}><Persona kind={p[0]} skin={p[1]} hair={p[2]} hairStyle={p[3]} size={38} /></span>
        ))}
        <b>+</b>
      </span>
    );
  if (id === 'incentives')
    return (
      <span className="sv-coins" aria-hidden="true">
        {[5, 8, 6, 10, 7, 12].map((n, k) => (
          <span key={k} className="svc-col" style={{ '--n': n, '--k': k }}>{Array.from({ length: n }).map((_, j) => <i key={j} style={{ '--j': j }} />)}</span>
        ))}
      </span>
    );
  if (id === 'monthly')
    return (
      <span className="sv-cal" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => <i key={i} className={[2, 5, 6, 9, 11, 13, 16, 18, 19, 22, 24, 26].includes(i) ? 'on' : ''} style={{ '--i': i }} />)}
      </span>
    );
  return (
    <span className="sv-ring" aria-hidden="true">
      <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" className="r-bg" /><circle cx="50" cy="50" r="42" className="r-fg" pathLength="100" /></svg>
      <Icon name="check" size={26} stroke={3} />
    </span>
  );
}

export function CommunityPulse() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section ref={ref} className={`section community ${inView ? 'is-in' : ''}`}>
      <div className="container">
        <header className="cm-head">
          <span className="eyebrow" style={{ '--eb': '#facc15' }}><i aria-hidden="true" />Our community</span>
          <h2>Trusted by <span className="ink-gold">thousands</span>, one honest answer at a time</h2>
          <p>Every opinion nudges a healthcare decision somewhere in the world. Here is what our members have built together so far.</p>
        </header>
        <div className="cm-grid">
          {COMMUNITY_STATS.map((s, i) => (
            <article key={s.id} className={`cm-card cm-${s.id}`} style={{ '--c': s.color, '--i': i }}>
              <StatViz id={s.id} on={inView} />
              <strong><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} duration={1800} /></strong>
              <h3>{s.label}</h3>
              <small>{s.note}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reward wheel (home): pick a role, the wheel spins to each reward ---------------- */
export function RewardWheel() {
  const [r, setR] = useState(0);
  const [sel, setSel] = useState(0);
  const role = REWARD_ROLES[r];
  const n = role.items.length;
  const item = role.items[sel % n];
  const touched = useRef(false);
  const [wref, wIn] = useInView({ threshold: 0 }, false);
  useEffect(() => { setSel(0); }, [r]);
  useEffect(() => {
    if (!wIn) return; // only while on screen
    const t = setInterval(() => { if (!touched.current && !document.hidden) setSel((s) => (s + 1) % n); }, 2600);
    return () => clearInterval(t);
  }, [n, wIn]);
  return (
    <div className="rwheel" ref={wref} style={{ '--c': role.color, '--c2': role.accent }}>
      <div className="rw-roles" role="tablist" aria-label="Reward categories for">
        {REWARD_ROLES.map((x, i) => (
          <button key={x.id} role="tab" aria-selected={i === r} className={i === r ? 'on' : ''} style={{ '--c': x.color }} onClick={() => { touched.current = false; setR(i); }}>
            <Icon name={x.icon} size={18} />{x.title}
          </button>
        ))}
      </div>
      <div className="rw-stage">
        <LiveZone className="rw-dial" key={role.id}>
          <div className="rw-spin" style={{ '--rot': `${-(sel % n) * (360 / n)}deg` }}>
            {role.items.map((it, i) => (
              <button
                key={it.t}
                className={`rw-node ${i === sel % n ? 'on' : ''}`}
                style={{ '--a': `${i * (360 / n)}deg` }}
                onClick={() => { touched.current = true; setSel(i); }}
                aria-label={it.t}
                aria-pressed={i === sel % n}
              >
                <span className="rwn-in"><Icon name={it.icon} size={20} /></span>
              </button>
            ))}
          </div>
          <div className="rw-core">
            <span className="rw-gift" aria-hidden="true"><Icon name="gift" size={30} /></span>
            <b key={item.t}>{item.t}</b>
            <small key={item.d}>{item.d}</small>
          </div>
          <span className="rw-pointer" aria-hidden="true" />
        </LiveZone>
        <div className="rw-list">
          <p className="rw-line">{role.line}</p>
          <ul>
            {role.items.map((it, i) => (
              <li key={it.t} className={i === sel % n ? 'on' : ''} style={{ '--i': i }}>
                <button onClick={() => { touched.current = true; setSel(i); }}><Icon name={it.icon} size={15} />{it.t}</button>
              </li>
            ))}
          </ul>
          <p className="fine">Reward options depend on the study and your country — each invitation shows what you can earn.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Professionals honeycomb ---------------- */
const HEX_ICONS = ['nurse', 'stethoscope', 'briefcase', 'stethoscope', 'nurse', 'nurse', 'nurse', 'hands', 'building', 'pill', 'pulse', 'key', 'shield', 'users', 'clipboard', 'flask', 'bag', 'users', 'sparkle', 'monitor', 'scalpel', 'compass', 'ambulance', 'layers', 'chat'];
export function ProHoneycomb() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const cells = [...PRO_CATEGORIES.map((p, i) => ({ p, i })), { count: true, i: PRO_CATEGORIES.length }];
  const rows = [];
  let at = 0;
  for (const n of [7, 6, 7, 6]) { rows.push(cells.slice(at, at + n)); at += n; }
  return (
    <div ref={ref} className={`honeycomb ${inView ? 'is-in' : ''}`}>
      <ul>
        {rows.map((row, r) => (
          <li key={r} className={`hc-row ${r % 2 ? 'odd' : ''}`}>
            <ul>
              {row.map((c) => (
                c.count ? (
                  <li key="count" className="hx-cell hx-count" style={{ '--i': c.i }}><span className="hx"><strong>25+</strong><b>professional categories</b></span></li>
                ) : (
                  <li key={c.p} className="hx-cell" style={{ '--i': c.i }} tabIndex={0}>
                    <span className="hx"><Icon name={HEX_ICONS[c.i] || 'user'} size={20} /><b>{c.p}</b></span>
                  </li>
                )
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Specialty capsules ---------------- */
export function SpecialtyCapsules() {
  return (
    <LiveZone className="capsules">
      {SPECIALTIES.map((s, i) => (
        <span key={s.t} className="capsule" style={{ '--c': s.c, '--i': i }}>
          <span className="cp-half"><Icon name={s.icon} size={18} /></span>
          <span className="cp-text">{s.t}</span>
        </span>
      ))}
      <span className="capsule cp-total" style={{ '--c': '#0b1b3f', '--i': 10 }}><span className="cp-half"><b>10+</b></span><span className="cp-text">specialty areas</span></span>
    </LiveZone>
  );
}

/* ---------------- 3D testimonial carousel ---------------- */
const ROLE_TO_AUD = { hcp: 'doctors', caregiver: 'caregivers', patient: 'patients' };
const audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || '#3d5afe';
const initials = (n) => n.replace(/^Dr\.?\s+/i, '').split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export function VoiceCarousel() {
  const member = useMemberReviews();
  const all = useMemo(() => [
    ...member.map((m) => ({ ...m, role: m.designation, audience: ROLE_TO_AUD[m.roleType] || 'patients', member: true })),
    ...TESTIMONIALS,
  ], [member]);
  const [aud, setAud] = useState('all');
  const list = useMemo(() => (aud === 'all' ? all : all.filter((t) => t.audience === aud)).slice(0, 12), [all, aud]);
  const n = Math.max(list.length, 3);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cref, cIn] = useInView({ threshold: 0 }, false);
  useEffect(() => setStep(0), [aud]);
  useEffect(() => {
    if (paused || !cIn) return; // only while on screen
    const t = setInterval(() => !document.hidden && setStep((s) => s + 1), 4200);
    return () => clearInterval(t);
  }, [paused, cIn]);
  const front = ((step % n) + n) % n;
  const cur = list[front] || list[0];
  return (
    <div className="vcar" ref={cref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hb-filters" role="tablist" aria-label="Filter member voices">
        <button role="tab" aria-selected={aud === 'all'} className={aud === 'all' ? 'on' : ''} onClick={() => setAud('all')}>Everyone</button>
        {AUDIENCES.map((a) => (
          <button key={a.id} role="tab" aria-selected={aud === a.id} className={aud === a.id ? 'on' : ''} style={{ '--c': a.color }} onClick={() => setAud(a.id)}>{a.label}</button>
        ))}
      </div>
      <LiveZone className="vc-stage" aria-hidden="true">
        <div className="vc-ring" style={{ '--n': n, '--rot': `${-step * (360 / n)}deg` }}>
          {list.map((t, i) => (
            <figure key={(t.id || t.name) + i} className={`vc-card ${i === front ? 'front' : ''}`} style={{ '--i': i, '--c': audColor(t.audience) }} onClick={() => setStep(step + ((i - front + n) % n <= n / 2 ? (i - front + n) % n : (i - front + n) % n - n))}>
              <span className="hb-avatar">{initials(t.name)}</span>
              <b>{t.name}</b>
              <small>{t.role}</small>
              <span className="vc-flag"><Flag code={t.cc} name={t.country} size={26} /><em>{t.country}</em></span>
              <Stars value={t.rating} size={13} />
            </figure>
          ))}
        </div>
        <div className="vc-floor" />
      </LiveZone>
      {cur && (
        <figure className="vc-quote" key={(cur.id || cur.name) + front} style={{ '--c': audColor(cur.audience) }}>
          <span className="vcq-mark" aria-hidden="true"><Icon name="quote" size={28} /></span>
          <blockquote><p>{cur.quote}</p></blockquote>
          <figcaption>
            <Flag code={cur.cc} name={cur.country} size={30} />
            <span className="vcq-who"><b>{cur.name}</b>{cur.company ? ` · ${cur.company}` : ''}<small>{cur.country} · {cur.role}</small></span>
            <Stars value={cur.rating} size={16} />
            {cur.member && <span className="hb-new">New review</span>}
          </figcaption>
          <div className="vc-nav">
            <button onClick={() => setStep(step - 1)} aria-label="Previous review"><Icon name="arrowLeft" size={18} /></button>
            <span>{String(front + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
            <button onClick={() => setStep(step + 1)} aria-label="Next review"><Icon name="arrow" size={18} /></button>
          </div>
        </figure>
      )}
    </div>
  );
}

/* ---------------- 3D flag globe ---------------- */
export function FlagGlobe() {
  const [active, setActive] = useState('all');
  const pts = useMemo(() => {
    const all = REGIONS.flatMap((r) => r.countries.map(([code, name]) => ({ code, name, region: r.id, color: r.color })));
    const N = all.length;
    return all.map((c, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = (i * 137.508) % 360;
      return { ...c, lat, lon };
    });
  }, []);
  const region = REGIONS.find((r) => r.id === active);
  return (
    <div className={`fglobe-wrap ${active !== 'all' ? 'has-focus' : ''}`}>
      <LiveZone className="fglobe-stage">
        <div className="fg-stars" aria-hidden="true" />
        <div className="fg-atmo" aria-hidden="true" />
        <div className="fglobe" aria-hidden="true">
          <div className="fg-spin">
            {pts.map((p) => (
              <span key={p.code} className={`fg-pt ${active === 'all' || active === p.region ? 'on' : ''}`} style={{ transform: `rotateY(${p.lon}deg) rotateX(${p.lat}deg) translateZ(var(--R))`, '--c': p.color }}>
                <Flag code={p.code} size={28} />
              </span>
            ))}
            <span className="fg-equator" /><span className="fg-meridian" /><span className="fg-meridian m2" />
          </div>
          <span className="fg-core"><HeartMark size={64} /></span>
        </div>
        <div className="fg-count">
          <strong>{region ? region.countries.length : COVERAGE_COUNT}</strong>
          <span>{region ? region.name : 'countries · 5 regions'}</span>
        </div>
      </LiveZone>
      <div className="region-tabs" role="tablist" aria-label="Regions">
        <button role="tab" aria-selected={active === 'all'} className={active === 'all' ? 'on' : ''} onClick={() => setActive('all')} style={{ '--c': '#0b1b3f' }}>All regions</button>
        {REGIONS.map((r) => (
          <button key={r.id} role="tab" aria-selected={active === r.id} className={active === r.id ? 'on' : ''} onClick={() => setActive(r.id)} style={{ '--c': r.color }}>
            {r.name} <em>{r.countries.length}</em>
          </button>
        ))}
      </div>
      <div className="flag-cloud">
        {REGIONS.filter((r) => active === 'all' || r.id === active).flatMap((r) => r.countries.map(([code, name], i) => (
          <span key={code} className="fcl" style={{ '--c': r.color, '--i': i }}><Flag code={code} name={name} size={28} />{name}</span>
        )))}
      </div>
    </div>
  );
}
