// Home — "Browse a few of our paid surveys" as a 3D invitation inbox.
//   RateRail     the typical reward band of each audience on a $0–$50 ruler (bars grow in, coin stacks
//                rise, the price tag counts up)
//   SurveyInbox  every sample study is a sealed envelope: wax seal = reward, postmark = minutes, stamp =
//                topic. Hover, focus or tap opens the flap and the letter slides out. While the section is
//                on screen, a new envelope "arrives" (wiggles and opens itself) every few seconds.
// Data: RATE_BANDS + SAMPLE_SURVEYS in src/data/surveys.js. All text is real DOM text (SEO + a11y).
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useInView } from './ui.jsx';
import { Link } from '../router.jsx';
import { RATE_BANDS, RATE_MAX, SAMPLE_SURVEYS } from '../data/surveys.js';

const BAND = Object.fromEntries(RATE_BANDS.map((b) => [b.id, b]));
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function CountTo({ to, run, delay = 0 }) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) return undefined;
    if (reduced()) { setV(to); return undefined; }
    let raf;
    const t0 = performance.now() + delay;
    const step = (now) => {
      const p = Math.min(Math.max((now - t0) / 1100, 0), 1);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run, delay]);
  return v;
}

export function RateRail({ active, onPick }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`rrail ${inView ? 'is-in' : ''}`}>
      <div className="rr-ruler" aria-hidden="true">
        {Array.from({ length: RATE_MAX / 5 + 1 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 5 / RATE_MAX) * 100}%` }} className={i % 2 ? 'mn' : ''}>{i % 2 ? '' : `$${i * 5}`}</span>
        ))}
      </div>
      {RATE_BANDS.map((b, i) => (
        <button
          key={b.id}
          type="button"
          className={`rr-lane ${active === b.id ? 'on' : ''}`}
          style={{ '--c': b.color, '--c2': b.accent, '--lf': b.min / RATE_MAX, '--wf': (b.max - b.min) / RATE_MAX, '--i': i }}
          onClick={() => onPick(active === b.id ? 'all' : b.id)}
          aria-pressed={active === b.id}
        >
          <span className="rr-who"><span className="rr-ic"><Icon name={b.icon} size={18} /></span><span><b>{b.label}</b><small>{b.note}</small></span></span>
          <span className="rr-track">
            <span className="rr-bar"><span className="rr-glint" /></span>
            <span className="rr-stack" aria-hidden="true">{Array.from({ length: 3 + i * 2 }).map((_, k) => <i key={k} style={{ '--k': k }} />)}</span>
            <span className="rr-tag">
              $<CountTo to={b.min} run={inView} delay={i * 180} />–$<CountTo to={b.max} run={inView} delay={i * 180 + 120} />
              <small>per survey</small>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function Envelope({ s, idx, open, setOpen, arriving }) {
  const b = BAND[s.band];
  return (
    <li className={`ivl ${open ? 'open' : ''} ${arriving ? 'arrive' : ''}`} style={{ '--c': b.color, '--c2': b.accent, '--i': idx % 8 }}>
      <button
        type="button"
        className="iv-btn"
        aria-expanded={open}
        onClick={() => setOpen(open ? null : s.title)}
      >
        <span className="iv-3d">
          <span className="iv-back" aria-hidden="true" />
          <span className="iv-letter">
            <span className="el-aud"><Icon name={b.icon} size={12} />{s.aud}</span>
            <b className="el-title">{s.title}</b>
            <span className="el-text">{s.text}</span>
            <span className="el-meta">
              <span><Icon name="clock" size={13} />{s.mins} min</span>
              <span className="el-pay">Reward <em>${s.reward}</em></span>
            </span>
          </span>
          <span className="iv-pocket" aria-hidden="true" />
          <span className="iv-front" aria-hidden="true">
            <span className="ef-to">To: {s.aud}</span>
            <span className="ef-title">{s.title}</span>
            <span className="ef-lines"><i /><i /></span>
          </span>
          <span className="iv-flap" aria-hidden="true" />
          <span className="iv-seal" aria-hidden="true"><b>${s.reward}</b></span>
          <span className="iv-stamp" aria-hidden="true"><Icon name={s.icon} size={18} /></span>
          <span className="iv-post" aria-hidden="true"><b>{s.mins}</b>MIN</span>
          {arriving && <span className="iv-new" aria-hidden="true">New invite</span>}
        </span>
      </button>
    </li>
  );
}

export default function SurveyInbox() {
  const [band, setBand] = useState('all');
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState(null);
  const [arrive, setArrive] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.15 }, false);
  const userAt = useRef(0);

  const list = useMemo(() => SAMPLE_SURVEYS.filter((s) => band === 'all' || s.band === band), [band]);
  const shown = all || band !== 'all' ? list : list.slice(0, 8);
  const counts = useMemo(() => Object.fromEntries(RATE_BANDS.map((b) => [b.id, SAMPLE_SURVEYS.filter((s) => s.band === b.id).length])), []);

  // "New invitation" moment: every few seconds one envelope wiggles and opens itself (pauses after a user tap).
  useEffect(() => {
    if (!inView || reduced()) return undefined;
    let k = 0;
    const t = setInterval(() => {
      if (document.hidden || Date.now() - userAt.current < 8000) return;
      const pick = shown[(k * 3 + 1) % shown.length];
      k += 1;
      setArrive(pick.title);
      setOpen(pick.title);
      setTimeout(() => { setArrive(null); setOpen((o) => (o === pick.title ? null : o)); }, 2600);
    }, 4200);
    return () => clearInterval(t);
  }, [inView, shown]);

  const userOpen = (v) => {
    userAt.current = Date.now(); setArrive(null); setOpen(v);
    if (v) import('../i18n/sounds.js').then((m) => m.playEnvelope(shown.findIndex((x) => x.title === v))).catch(() => {});
  };
  const pickBand = (v) => { userAt.current = Date.now(); setBand(v); setOpen(null); };

  return (
    <div ref={ref} className="sinbox">
      <RateRail active={band} onPick={pickBand} />

      <div className="si-tabs" role="tablist" aria-label="Filter surveys by audience">
        <button role="tab" aria-selected={band === 'all'} className={band === 'all' ? 'on' : ''} onClick={() => pickBand('all')}>All surveys <em>{SAMPLE_SURVEYS.length}</em></button>
        {RATE_BANDS.map((b) => (
          <button key={b.id} role="tab" aria-selected={band === b.id} className={band === b.id ? 'on' : ''} style={{ '--c': b.color }} onClick={() => pickBand(b.id)}>
            <Icon name={b.icon} size={14} />{b.label} <em>{counts[b.id]}</em>
          </button>
        ))}
      </div>

      <ul className="si-grid" key={band}>
        {shown.map((s, i) => <Envelope key={s.title} s={s} idx={i} open={open === s.title} setOpen={userOpen} arriving={arrive === s.title} />)}
      </ul>

      <div className="si-foot">
        {band === 'all' && !all && <button type="button" className="btn btn-ghost" onClick={() => setAll(true)}><span className="btn-label">Open all {SAMPLE_SURVEYS.length} invitations</span><Icon name="mail" size={18} /></button>}
        <Link className="btn btn-primary" to={band === 'all' ? '/join' : `/join#${band}`}><span className="btn-label">Get invitations like these</span><Icon name="arrow" size={18} /></Link>
      </div>
      <p className="si-note"><Icon name="info" size={14} /> Sample studies. Every invitation shows its exact reward, topic and time before you start.</p>
    </div>
  );
}
