// Rewards page — "Three audiences, three reward menus" as three reward vending machines.
// Each audience gets its own machine in its own colour grade (professionals blue/violet, caregivers
// orange/coral, patients teal/aqua). Every reward sits in a lit slot on a spiral coil; the machine
// vends one on its own every few seconds (coil turns, the reward drops into the pickup tray), and
// visitors can press any slot to vend it themselves. All rewards are real buttons and plain text,
// so screen readers and search engines get the full list. Data: REWARD_ROLES in src/data/community.js.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { useInView } from './ui.jsx';
import { Link } from '../router.jsx';
import { REWARD_ROLES } from '../data/community.js';

const ROWS = 'ABC';
const code = (i) => `${ROWS[Math.floor(i / 3)]}${(i % 3) + 1}`;
const joinLabel = (id) => (id === 'hcp' ? 'Join as a professional' : id === 'caregiver' ? 'Join as a caregiver' : 'Join as a patient');

function Machine({ role, index }) {
  const n = role.items.length;
  const [sel, setSel] = useState(index * 2 % n);
  const [tick, setTick] = useState(0);
  const [user, setUser] = useState(false);
  const hold = useRef(0);
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let t;
    const start = setTimeout(() => {
      t = setInterval(() => {
        if (document.hidden || Date.now() < hold.current) return;
        setSel((s) => (s + 1) % n);
        setTick((k) => k + 1);
      }, 3200);
    }, 900 + index * 1050);
    return () => { clearTimeout(start); clearInterval(t); };
  }, [inView, n, index]);

  const vend = (i) => {
    hold.current = Date.now() + 9000; setUser(true); setSel(i); setTick((k) => k + 1);
    import('../i18n/sounds.js').then((m) => m.playVend(i)).catch(() => {});
  };
  const item = role.items[sel];
  const spare = n % 3 ? 3 - (n % 3) : 0;

  return (
    <article ref={ref} className={`vend v-${role.id} ${seen ? 'is-on' : ''}`} style={{ '--c': role.color, '--c2': role.accent, '--i': index }}>
      <header className="vd-top">
        <span className="vd-bulbs" aria-hidden="true">{Array.from({ length: 13 }).map((_, i) => <i key={i} style={{ '--b': i }} />)}</span>
        <span className="vd-badge"><Icon name={role.icon} size={22} /></span>
        <h3>{role.title}</h3>
        <p>{role.line}</p>
      </header>

      <div className="vd-body">
        <div className="vd-glass">
          <ul className="vd-grid" aria-label={`Rewards for ${role.title.toLowerCase()}`}>
            {role.items.map((it, i) => {
              const on = i === sel;
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    className={`vd-slot ${on ? 'on' : ''}`}
                    style={{ '--ic': it.c, '--k': i }}
                    onClick={() => vend(i)}
                    aria-pressed={on}
                    aria-label={`${it.t}: ${it.d}`}
                  >
                    <span className="vd-item" key={on ? `v${tick}` : 'idle'}>
                      <span className="vd-prod"><Icon name={it.icon} size={22} /></span>
                    </span>
                    <span className={`vd-coil ${on ? 'spin' : ''}`} key={on ? `c${tick}` : 'c'} aria-hidden="true" />
                    <span className="vd-tag"><em>{code(i)}</em>{it.t}</span>
                  </button>
                </li>
              );
            })}
            {Array.from({ length: spare }).map((_, i) => (
              <li key={`join${i}`} className="vd-spare">
                <Link to={`/join#${role.id}`} className="vd-slot vd-joinslot">
                  <span className="vd-prod"><Icon name="plus" size={20} /></span>
                  <span className="vd-tag"><em>{code(n + i)}</em>Join free</span>
                </Link>
              </li>
            ))}
          </ul>
          <span className="vd-sheen" aria-hidden="true" />
        </div>

        <div className="vd-side" aria-hidden="true">
          <span className="vd-screen"><b key={tick}>{code(sel)}</b><small>VEND</small></span>
          <span className="vd-keys">{Array.from({ length: 9 }).map((_, i) => <i key={i} className={i === sel % 9 ? 'lit' : ''} />)}</span>
          <span className="vd-coinslot"><i /></span>
          <span className="vd-note"><Icon name="coins" size={14} /></span>
        </div>
      </div>

      <div className="vd-tray" aria-live={user ? 'polite' : 'off'}>
        <span className="vd-flap" aria-hidden="true" />
        <span className="vd-out" key={tick} style={{ '--ic': item.c }}>
          <span className="vd-out-ic"><Icon name={item.icon} size={22} /></span>
          <span className="vd-out-t"><b>{item.t}</b><small>{item.d}</small></span>
          <span className="vd-pop" aria-hidden="true">{Array.from({ length: 6 }).map((_, i) => <i key={i} style={{ '--p': i }} />)}</span>
        </span>
      </div>

      <Link to={`/join#${role.id}`} className="vd-cta">{joinLabel(role.id)} <Icon name="arrow" size={15} /></Link>
      <span className="vd-feet" aria-hidden="true"><i /><i /></span>
    </article>
  );
}

export default function RewardVending() {
  return (
    <div className="vending">
      {REWARD_ROLES.map((role, i) => <Machine key={role.id} role={role} index={i} />)}
      <p className="vd-hint"><Icon name="sparkle" size={14} /> Tap any slot to vend it · options for each study are listed in its invitation · UPI is for members in India</p>
    </div>
  );
}
