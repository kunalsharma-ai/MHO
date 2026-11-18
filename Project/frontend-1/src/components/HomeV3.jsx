// v3 home sections — each one has its own visual idea so no two sections share a template:
//   RewardSlot     "Get rewarded your way" as a reward slot machine (pull the lever)
//   ChannelHub     invitations travelling from four channels into a phone
//   VoiceWall      spotlight testimonial + three scrolling review columns
//   ChatFaq        quick answers as a chat with our help desk
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Persona from './Persona.jsx';
import { Flag, Stars, LiveZone, useInView } from './ui.jsx';
import { Link } from '../router.jsx';
import { TESTIMONIALS, AUDIENCES } from '../data/testimonials.js';
import { NOTIFY_CHANNELS } from '../data/rewards.js';
import { useMemberReviews } from '../utils/reviews.js';
import { tr } from '../i18n/engine.js';

/* =====================================================================
   1. Reward slot machine
   ===================================================================== */
export const REWARD_TYPES = [
  { id: 'shopping', t: 'Shopping Vouchers', icon: 'bag', c: '#ff7a1a' },
  { id: 'cash', t: 'Cash Rewards', icon: 'wallet', c: '#16a34a' },
  { id: 'grocery', t: 'Grocery Vouchers', icon: 'home', c: '#f59e0b' },
  { id: 'bank', t: 'Bank Transfer', icon: 'bank', c: '#0f766e' },
  { id: 'paypal', t: 'PayPal', icon: 'paypal', c: '#0070e0' },
  { id: 'wire', t: 'Wire Transfer', icon: 'bank', c: '#0f766e' },
  { id: 'upi', t: 'UPI (India)', icon: 'upi', c: '#5f259f' },
  { id: 'report', t: 'Medical Report', icon: 'clipboard', c: '#db2777' },
  { id: 'digital', t: 'Digital Gift Cards', icon: 'card', c: '#7c3aed' },
];
const N = REWARD_TYPES.length;
const ITEM_H = 92;

function Reel({ target, from, spinning, delay }) {
  const strip = useMemo(() => [...REWARD_TYPES, ...REWARD_TYPES, ...REWARD_TYPES, ...REWARD_TYPES], []);
  const offset = spinning ? 27 + target : from;
  return (
    <div className="reel">
      <div
        className="reel-strip"
        style={{
          transform: `translateY(${-(offset - 1) * ITEM_H}px)`,
          transition: spinning ? `transform ${1.6 + delay}s cubic-bezier(.17,.67,.24,1.02)` : 'none',
        }}
      >
        {strip.map((r, i) => (
          <span key={i} className="reel-item" style={{ '--c': r.c }}>
            <span className="ri-ic"><Icon name={r.icon} size={26} /></span>
            <small>{r.t}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

export function RewardSlot() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [targets, setTargets] = useState([0, 4, 6]);
  const [from, setFrom] = useState([0, 4, 6]);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);
  const [pulled, setPulled] = useState(false);
  const busy = useRef(false);
  const first = useRef(true);
  const queued = useRef(false); // a lever pull that arrived while the reels were still turning
  const spinRef = useRef(null);

  const spin = (sound = true) => {
    if (busy.current) {
      // never swallow a pull: play it as soon as the current spin lands
      if (sound) queued.current = true;
      return;
    }
    busy.current = true;
    // money sound on every pull (synth chunk is lazy-loaded; respects the site's Sound on/off switch)
    if (sound) import('../i18n/sounds.js').then((m) => m.playSlotPull()).catch(() => {});
    setWon(false);
    setPulled(true);
    setTimeout(() => setPulled(false), 450);
    const next = targets.map((t, i) => (t + 2 + Math.floor(Math.random() * (N - 2)) + i) % N);
    setFrom(targets);
    setSpinning(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setTargets(next);
        setSpinning(true);
      })
    );
    setTimeout(() => {
      setSpinning(false);
      setFrom(next);
      setWon(true);
      busy.current = false;
      if (queued.current) {
        queued.current = false;
        setTimeout(() => spinRef.current?.(true), 350);
      }
    }, 2600);
  };
  spinRef.current = spin;

  useEffect(() => {
    if (inView && first.current) {
      first.current = false;
      const t = setTimeout(() => spin(false), 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const shown = new Set(won ? targets.map((t) => REWARD_TYPES[t].id) : []);

  return (
    <div className="slot-wrap" ref={ref}>
      <LiveZone className={`slot ${won ? 'is-won' : ''}`}>
        <div className="slot-sign">
          <span className="slot-bulbs" aria-hidden="true">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</span>
          <b>Reward machine</b>
          <small>pull the lever</small>
        </div>
        <div className="slot-window">
          <span className="slot-line" aria-hidden="true" />
          {[0, 1, 2].map((i) => <Reel key={i} target={targets[i]} from={from[i]} spinning={spinning} delay={i * 0.35} />)}
        </div>
        <div className="slot-tray" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => <i key={i} className="tray-coin" style={{ '--i': i }} />)}
        </div>
        <button className={`slot-lever ${pulled ? 'is-pulled' : ''}`} onClick={() => spin(true)} aria-label="Spin the reward machine">
          <span className="lv-stick" /><span className="lv-knob" />
        </button>
        <p className="sr-only notranslate" translate="no" aria-live="polite">{won ? tr('Showing {0}').replace('{0}', targets.map((t) => tr(REWARD_TYPES[t].t)).join(', ')) : ''}</p>
      </LiveZone>

      <ul className="reward-grid">
        {REWARD_TYPES.map((r, i) => (
          <li key={r.id} className={shown.has(r.id) ? 'hit' : ''} style={{ '--c': r.c, '--i': i }}>
            <span className="rg-ic"><Icon name={r.icon} size={22} /></span>
            <b>{r.t}</b>
          </li>
        ))}
        <li className="rg-note"><Icon name="info" size={16} /><span>UPI payouts are available for members in India.</span></li>
      </ul>
    </div>
  );
}

/* =====================================================================
   4. Channel hub — invitations fly into the phone
   ===================================================================== */
const CH = {
  dashboard: { icon: 'dashboard', c: '#7c3aed', title: 'New study matched to your profile', sub: 'Health & wellness · about 12 min' },
  sms: { icon: 'sms', c: '#f59e0b', title: 'MHO: a new survey is waiting for you', sub: 'Tap to see topic, time and reward' },
  whatsapp: { icon: 'whatsapp', c: '#22c55e', title: 'MyHealthOpinions', sub: 'A study that fits your profile just opened' },
  email: { icon: 'mail', c: '#2457f5', title: 'Your next survey invitation', sub: 'Topic, estimated time and reward inside' },
};
const PATHS = [
  'M120 70 C 260 70, 300 180, 420 200',
  'M880 70 C 740 70, 700 180, 580 200',
  'M120 330 C 260 330, 300 240, 420 220',
  'M880 330 C 740 330, 700 240, 580 220',
];
export function ChannelHub() {
  const [ref, inView] = useInView({ threshold: 0.3 }, false);
  const [i, setI] = useState(0);
  const [feed, setFeed] = useState([{ k: 0, c: 0 }]);
  const go = (k) => {
    setI(k);
    setFeed((f) => [{ k: Date.now() + Math.random(), c: k }, ...f].slice(0, 3));
  };
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setI((x) => { const n = (x + 1) % 4; setFeed((f) => [{ k: Date.now(), c: n }, ...f].slice(0, 3)); return n; }), 2600);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <div className="hub" ref={ref}>
      <svg className="hub-wires" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        {PATHS.map((d, k) => (
          <g key={k} className={k === i ? 'on' : ''} style={{ '--c': CH[NOTIFY_CHANNELS[k].id].c }}>
            <path d={d} className="hw-path" />
            <circle r="7" className="hw-dot"><animateMotion dur="2.6s" repeatCount="indefinite" path={d} /></circle>
          </g>
        ))}
      </svg>
      {NOTIFY_CHANNELS.map((c, k) => (
        <button key={c.id} className={`hub-node hn-${k} ${k === i ? 'on' : ''}`} style={{ '--c': CH[c.id].c }} onClick={() => go(k)}>
          <span className="hn-ic"><Icon name={CH[c.id].icon} size={22} /><i /></span>
          <span className="hn-txt"><b>{c.name}</b><small>{c.blurb}</small></span>
        </button>
      ))}
      <div className="hub-phone" aria-hidden="true">
        <span className="hp-notch" />
        <span className="hp-time">9:41</span>
        <span className="hp-date">Tuesday, new studies waiting</span>
        <div className="hp-stack">
          {feed.map((f, d) => {
            const c = CH[NOTIFY_CHANNELS[f.c].id];
            return (
              <div key={f.k} className="hp-note" style={{ '--d': d, '--c': c.c }}>
                <span className="hpn-ic"><Icon name={c.icon} size={16} /></span>
                <span className="hpn-t"><b>{c.title}</b><small>{c.sub}</small></span>
                <em>{d === 0 ? 'now' : `${d * 3}m`}</em>
              </div>
            );
          })}
        </div>
        <span className="hp-ring" />
      </div>
    </div>
  );
}

/* =====================================================================
   7. Voice wall — testimonials
   ===================================================================== */
const ROLE_TO_AUD = { hcp: 'doctors', caregiver: 'caregivers', patient: 'patients' };
const audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || '#2457f5';
const audLabel = (id) => AUDIENCES.find((a) => a.id === id)?.label || '';
const initials = (n) => n.replace(/^Dr\.?\s+/i, '').split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();


export function VoiceWall() {
  const member = useMemberReviews();
  const all = useMemo(() => [
    ...member.map((m) => ({ ...m, role: m.designation, audience: ROLE_TO_AUD[m.roleType] || 'patients', member: true })),
    ...TESTIMONIALS,
  ], [member]);
  const [aud, setAud] = useState('all');
  const list = useMemo(() => (aud === 'all' ? all : all.filter((t) => t.audience === aud)), [all, aud]);
  const [pick, setPick] = useState(0);
  const held = useRef(false);
  const [ref, inView] = useInView({ threshold: 0.2 }, false);
  useEffect(() => setPick(0), [aud]);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => !held.current && setPick((p) => (p + 1) % Math.max(list.length, 1)), 6000);
    return () => clearInterval(t);
  }, [inView, list.length]);
  const cur = list[Math.min(pick, list.length - 1)];
  const n = list.length;
  const go = (k) => { held.current = true; setPick((p) => (p + k + n) % n); };
  const down = useRef(null);
  // Cover-flow: the current voice faces you, two on each side lean away in 3D. Only those five are rendered.
  const near = [];
  for (let d = -2; d <= 2; d++) if (n > Math.abs(d) * 2 || d >= 0) { const i = (pick + d + n * 4) % n; if (!near.some((x) => x.i === i)) near.push({ i, d }); }

  return (
    <div className="vwall vw-air" ref={ref}>
      <div className="hb-filters" role="tablist" aria-label="Filter member voices">
        <button role="tab" aria-selected={aud === 'all'} className={aud === 'all' ? 'on' : ''} onClick={() => setAud('all')}>Everyone <em>{all.length}</em></button>
        {AUDIENCES.map((a) => (
          <button key={a.id} role="tab" aria-selected={aud === a.id} className={aud === a.id ? 'on' : ''} style={{ '--c': a.color }} onClick={() => setAud(a.id)}>
            {a.label} <em>{all.filter((t) => t.audience === a.id).length}</em>
          </button>
        ))}
      </div>
      {cur && (
        <div className="air-stage" style={{ '--c': audColor(cur.audience) }}>
          <span className="air-beams" aria-hidden="true"><i /><i /></span>
          <span className="air-sign" aria-hidden="true"><i />Member voices · on air</span>
          <div
            className="air-flow"
            onPointerDown={(e) => { down.current = e.clientX; }}
            onPointerUp={(e) => { if (down.current == null) return; const dx = e.clientX - down.current; down.current = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}
          >
            {near.map(({ i, d }) => {
              const t = list[i];
              return (
                <figure key={(t.id || t.name) + aud} className={`air-card ${d === 0 ? 'on' : ''}`} style={{ '--d': d, '--ad': Math.abs(d), '--c': audColor(t.audience) }} aria-hidden={d !== 0 || undefined}>
                  <span className="air-tag">{audLabel(t.audience)}{t.member && <em>New review</em>}</span>
                  <svg className="air-q" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V18C0 8 6 1 16 0l2 5c-6 2-9 6-9 12h8v15zm22 0V18c0-10 6-17 16-18l2 5c-6 2-9 6-9 12h8v15z" /></svg>
                  <blockquote><p>{t.quote}</p></blockquote>
                  <Stars value={t.rating} size={18} className="air-stars" />
                  <figcaption>
                    <span className="air-av">{initials(t.name)}</span>
                    <span className="air-who"><b>{t.name}</b><small>{t.role}{t.company ? `, ${t.company}` : ''}</small></span>
                    <span className="air-place"><Flag code={t.cc} name={t.country} size={26} />{t.country}</span>
                  </figcaption>
                  {d !== 0 && <button type="button" className="air-hit" tabIndex={-1} onClick={() => go(d)} aria-label={`Show review from ${t.name}`} />}
                </figure>
              );
            })}
          </div>
          <div className="air-wave" aria-hidden="true" key={pick}>{Array.from({ length: 32 }, (_, k) => <i key={k} style={{ '--k': k, '--h': ((k * 37) % 10) / 10 }} />)}</div>
          <div className="air-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review"><Icon name="arrowLeft" size={18} /></button>
            <span aria-live="polite">{pick + 1} of {n}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next review"><Icon name="arrow" size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   9. Chat FAQ
   ===================================================================== */
export function ChatFaq({ items }) {
  const [i, setI] = useState(0);
  const [typing, setTyping] = useState(false);
  const ask = (k) => {
    if (k === i) return;
    setI(k);
    setTyping(true);
    setTimeout(() => setTyping(false), 750);
  };
  return (
    <div className="cfaq">
      <ul className="cf-qs">
        {items.map((q, k) => (
          <li key={q.q}>
            <button className={k === i ? 'on' : ''} onClick={() => ask(k)} aria-pressed={k === i}>
              <Icon name="chat" size={15} />{q.q}
            </button>
          </li>
        ))}
      </ul>
      <div className="cf-window">
        <div className="cf-head">
          <span className="cf-av"><Persona kind="nurse" skin={4} hair={1} hairStyle={1} size={38} /></span>
          <span><b>MyHealthOpinions help desk</b><small><i className="dot" /> usually replies in minutes</small></span>
        </div>
        <div className="cf-body">
          <div className="cf-msg me" key={'q' + i}><p>{items[i].q}</p></div>
          {typing ? (
            <div className="cf-msg bot typing" aria-label="Typing"><i /><i /><i /></div>
          ) : (
            <div className="cf-msg bot" key={'a' + i}><p>{items[i].a}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
