// How-it-works visuals (v4):
//   ConveyorArt  hero: profile, invitation and survey boxes ride a conveyor belt into a reward press,
//                which stamps out a coin that hops into a wallet
//   LoopTrack    the four steps as checkpoints on a looping race track; a glowing token laps it
//   DayDial      a 24-hour dial: tap a moment of the day and the hand swings to it
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { LiveZone, useInView } from './ui.jsx';

export function ConveyorArt() {
  const boxes = [['user', 'Join'], ['clipboard', 'Profile'], ['mail', 'Invite'], ['check', 'Survey']];
  return (
    <LiveZone className="conv" aria-hidden="true">
      <div className="cv-press">
        <span className="cvp-head"><Icon name="coins" size={20} /> Reward press</span>
        <span className="cvp-ram" />
        <span className="cvp-light" />
      </div>
      <div className="cv-belt">
        <span className="cvb-top" />
        <span className="cvb-rollers">{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>
        {boxes.map(([ic, t], i) => (
          <span key={t} className="cv-box" style={{ '--i': i }}>
            <span className="cvx-face"><Icon name={ic} size={18} /><b>{t}</b></span>
          </span>
        ))}
      </div>
      <span className="cv-coin"><b>$</b></span>
      <span className="cv-wallet"><Icon name="wallet" size={22} /><small>Paid</small></span>
      <span className="cv-spark s1" /><span className="cv-spark s2" /><span className="cv-spark s3" />
    </LiveZone>
  );
}

export function LoopTrack({ steps }) {
  return (
    <LiveZone className="loop">
      <div className="lp-track" aria-hidden="true">
        <svg viewBox="0 0 300 300">
          <defs>
            <linearGradient id="lp-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3d5afe" /><stop offset=".35" stopColor="#14b8a6" /><stop offset=".7" stopColor="#f59e0b" /><stop offset="1" stopColor="#e8344e" /></linearGradient>
          </defs>
          <circle cx="150" cy="150" r="118" className="lp-road" />
          <circle cx="150" cy="150" r="118" className="lp-lane" stroke="url(#lp-g)" />
          <circle cx="150" cy="150" r="118" className="lp-dash" />
          {steps.map((s, i) => {
            const a = (-90 + i * 90) * (Math.PI / 180);
            return <circle key={s.title} cx={150 + 118 * Math.cos(a)} cy={150 + 118 * Math.sin(a)} r="15" className="lp-check" style={{ '--c': s.color, '--i': i }} />;
          })}
          <g className="lp-token"><circle r="10" /><circle r="18" className="lp-halo" /></g>
        </svg>
        <div className="lp-center"><Icon name="refresh" size={26} /><b>Repeat</b><small>new studies every month</small></div>
      </div>
      <ol className="lp-steps">
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--c': s.color, '--i': i }}>
            <span className="lps-ic"><Icon name={s.icon} size={20} /></span>
            <span><small>Checkpoint {i + 1}</small><b>{s.title}</b><span>{s.text}</span></span>
          </li>
        ))}
      </ol>
    </LiveZone>
  );
}

const toAngle = (time) => {
  if (!/^\d/.test(time)) return 300; // "Later" → evening
  const [h, m] = time.split(':').map(Number);
  return ((h + m / 60) / 24) * 360;
};

const DIAL_MS = 3400;

export function DayDial({ items, day, setDay }) {
  const cur = items[day];
  // The hand only ever turns forwards, so the loop from "Later" back to the morning keeps spinning clockwise.
  const turns = useRef({ last: day, add: 0 });
  if (day !== turns.current.last) {
    if (day < turns.current.last) turns.current.add += 360;
    turns.current.last = day;
  }
  const ang = toAngle(cur.time) + turns.current.add;
  // Auto-play: moves to the next moment every 3.4 s in a continuous loop, while the dial is on screen
  // and the visitor is not hovering it. A tap restarts the timer from that moment.
  const [ref, visible] = useInView({ threshold: 0.3 }, false);
  const [hold, setHold] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!visible || hold || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(() => setDay((d) => (d + 1) % items.length), DIAL_MS);
    return () => clearTimeout(t);
  }, [visible, hold, day, tick, items.length, setDay]);
  // set with setProperty: the angle keeps growing, and a style prop would mint a new CSS class per value
  const hand = useRef(null);
  useEffect(() => { hand.current?.style.setProperty('transform', `rotate(${ang}deg)`); }, [ang]);
  const go = (i) => { setDay(i); setTick((n) => n + 1); };
  const playing = visible && !hold;
  return (
    <div ref={ref} className={`dial ${playing ? 'is-playing' : ''}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)} style={{ '--dial-ms': `${DIAL_MS}ms` }}>
      <div className="dl-face" aria-hidden="true">
        <svg viewBox="0 0 260 260">
          <circle cx="130" cy="130" r="118" className="dl-ring" />
          <path d="M248 130 A118 118 0 0 1 12 130" className="dl-sun" />
          <path d="M12 130 A118 118 0 0 1 248 130" className="dl-night" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="130" y1="16" x2="130" y2={i % 6 ? 24 : 32} transform={`rotate(${i * 15} 130 130)`} className="dl-tick" />
          ))}
          {['0', '6', '12', '18'].map((t, i) => <text key={t} x={130 + 92 * Math.sin((i * 90 * Math.PI) / 180)} y={134 - 92 * Math.cos((i * 90 * Math.PI) / 180)} textAnchor="middle" className="dl-num">{t}</text>)}
          {items.map((d, i) => {
            const a = (toAngle(d.time) * Math.PI) / 180;
            return <circle key={d.t} cx={130 + 108 * Math.sin(a)} cy={130 - 108 * Math.cos(a)} r={i === day ? 10 : 7} className={`dl-dot ${i === day ? 'on' : i < day ? 'past' : ''}`} />;
          })}
          <g className="dl-hand" ref={hand}><line x1="130" y1="130" x2="130" y2="40" /><circle cx="130" cy="130" r="8" /></g>
        </svg>
        <span className="dl-icon" key={day}><Icon name={cur.ic} size={22} /></span>
      </div>
      <div className="dl-list">
        <ol>
          {items.map((d, i) => (
            <li key={d.t} className={i === day ? 'on' : i < day ? 'past' : ''}>
              <button onClick={() => go(i)} aria-pressed={i === day}>
                <span className="dlt-time">{d.time}</span>
                <span className="dlt-txt"><b>{d.t}</b><small>{d.d}</small></span>
                {i === day && <span className="dlt-prog" key={`${day}-${tick}`} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-gold" onClick={() => go((day + 1) % items.length)}>
          <span className="btn-label">{day === items.length - 1 ? 'Start the day again' : 'Next moment'}</span><Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
