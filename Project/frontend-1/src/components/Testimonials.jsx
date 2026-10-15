// Testimonials: "Heartbeat Voices" (an ECG line whose peaks are members — the pulse travels to the
// active voice) and "Voices Wall" (filterable tilted cards). Member-submitted reviews appear first.
import { useEffect, useMemo, useState } from 'react';
import { TESTIMONIALS, AUDIENCES } from '../data/testimonials.js';
import { useMemberReviews } from '../utils/reviews.js';
import { Flag, Stars, LiveZone } from './ui.jsx';
import Icon from './Icon.jsx';

const ROLE_TO_AUD = { hcp: 'doctors', caregiver: 'caregivers', patient: 'patients' };
const audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || '#3d5afe';
const initials = (n) => n.replace(/^Dr\.?\s+/i, '').split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

function useAllVoices() {
  const member = useMemberReviews();
  return useMemo(
    () => [
      ...member.map((m) => ({ ...m, name: m.name, role: m.designation, audience: ROLE_TO_AUD[m.roleType] || 'patients', member: true })),
      ...TESTIMONIALS,
    ],
    [member]
  );
}

export function HeartbeatVoices() {
  const all = useAllVoices();
  const [aud, setAud] = useState('all');
  const list = useMemo(() => (aud === 'all' ? all : all.filter((t) => t.audience === aud)), [all, aud]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const cur = list[Math.min(i, list.length - 1)] || list[0];

  useEffect(() => setI(0), [aud]);
  useEffect(() => {
    if (paused || list.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 6500);
    return () => clearInterval(t);
  }, [paused, list.length]);

  // ECG geometry: one peak per voice
  const W = 1000, H = 120, base = 78;
  const step = W / (list.length + 1);
  const pathD = list
    .map((_, k) => {
      const x = step * (k + 1);
      return `L${x - 14} ${base} L${x - 7} ${base - 10} L${x} ${18} L${x + 7} ${base + 18} L${x + 13} ${base}`;
    })
    .join(' ');
  const d = `M0 ${base} ${pathD} L${W} ${base}`;
  const activeX = step * (i + 1);

  return (
    <LiveZone className="hb-voices" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hb-filters" role="tablist" aria-label="Filter testimonials">
        <button role="tab" aria-selected={aud === 'all'} className={aud === 'all' ? 'on' : ''} onClick={() => setAud('all')}>All voices</button>
        {AUDIENCES.map((a) => (
          <button key={a.id} role="tab" aria-selected={aud === a.id} className={aud === a.id ? 'on' : ''} style={{ '--c': a.color }} onClick={() => setAud(a.id)}>
            {a.label}
          </button>
        ))}
      </div>

      <div className="hb-monitor">
        <svg className="hb-line" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hb-g" x1="0" x2="1">
              <stop offset="0" stopColor="#14b8a6" />
              <stop offset=".5" stopColor="#3d5afe" />
              <stop offset="1" stopColor="#e8344e" />
            </linearGradient>
          </defs>
          <path d={d} className="hb-path" />
          <path d={d} className="hb-glow" />
        </svg>
        <div className="hb-nodes">
          {list.map((t, k) => (
            <button
              key={t.id || t.name}
              className={`hb-node ${k === i ? 'on' : ''} ${t.member ? 'is-member' : ''}`}
              style={{ left: `${((k + 1) / (list.length + 1)) * 100}%`, '--c': audColor(t.audience) }}
              onClick={() => setI(k)}
              aria-label={`Show review from ${t.name}`}
            >
              {initials(t.name)}
            </button>
          ))}
          <span className="hb-cursor" style={{ left: `${(activeX / W) * 100}%` }} aria-hidden="true" />
        </div>
      </div>

      {cur && (
        <figure className="hb-card" key={(cur.id || cur.name) + aud} style={{ '--c': audColor(cur.audience) }}>
          <div className="hb-quote-mark" aria-hidden="true"><Icon name="quote" size={40} /></div>
          <blockquote>
            <p>{cur.quote}</p>
          </blockquote>
          <figcaption>
            <span className="hb-avatar">{initials(cur.name)}</span>
            <span className="hb-who">
              <b>{cur.name}</b>
              <span>{cur.role}{cur.company ? ` · ${cur.company}` : ''}</span>
            </span>
            <span className="hb-place">
              <Flag code={cur.cc} name={cur.country} size={28} />
              <span>{cur.country}</span>
            </span>
            <Stars value={cur.rating} size={16} />
            {cur.member && <span className="hb-new">New review</span>}
          </figcaption>
          <div className="hb-nav">
            <button onClick={() => setI((i - 1 + list.length) % list.length)} aria-label="Previous review"><Icon name="arrowLeft" size={18} /></button>
            <span>{String(i + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
            <button onClick={() => setI((i + 1) % list.length)} aria-label="Next review"><Icon name="arrow" size={18} /></button>
          </div>
        </figure>
      )}
    </LiveZone>
  );
}

export function VoicesWall() {
  const all = useAllVoices();
  const [aud, setAud] = useState('all');
  const list = aud === 'all' ? all : all.filter((t) => t.audience === aud);
  return (
    <div className="voices-wall">
      <div className="hb-filters" role="tablist" aria-label="Filter reviews">
        <button role="tab" aria-selected={aud === 'all'} className={aud === 'all' ? 'on' : ''} onClick={() => setAud('all')}>Everyone</button>
        {AUDIENCES.map((a) => (
          <button key={a.id} role="tab" aria-selected={aud === a.id} className={aud === a.id ? 'on' : ''} style={{ '--c': a.color }} onClick={() => setAud(a.id)}>{a.label}</button>
        ))}
      </div>
      <div className="vw-grid">
        {list.map((t, k) => (
          <figure key={t.id || t.name} className={`vw-card ${t.member ? 'is-member' : ''}`} style={{ '--c': audColor(t.audience), '--k': k % 6 }}>
            <div className="vw-top">
              <span className="hb-avatar">{initials(t.name)}</span>
              <span className="hb-who"><b>{t.name}</b><span>{t.role}{t.company ? ` · ${t.company}` : ''}</span></span>
              <Flag code={t.cc} name={t.country} size={26} />
            </div>
            <Stars value={t.rating} size={14} />
            <blockquote><p>{t.quote}</p></blockquote>
            <figcaption>{t.country}{t.member && <span className="hb-new">New</span>}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
