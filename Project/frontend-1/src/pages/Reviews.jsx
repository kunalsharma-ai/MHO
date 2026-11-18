// Ratings & Reviews: where member testimonials live. Every number on this page is computed from the
// published reviews in src/data/testimonials.js (RATING) plus live member reviews; nothing is typed in by hand.
//
// Layout: "The verdict is in" hero (score gauge + 3D wall of scrolling reviews) · a sticky panel dock ·
// five panel "rooms", each with its own look so no two panels feel the same:
//   Doctors & specialists → clinical chart (Rx pads on graph paper, ECG trace)
//   Nurses               → shift board (pinned sticky notes, day/night clock)
//   Allied health        → under the microscope (glass slides on a light table, scan beam)
//   Caregivers           → family album (taped polaroids)
//   Patients             → message thread (chat bubbles, read receipts)
// then a scoreboard (star equaliser, panel race, country stamps) and the "your turn on the mic" call to review.
import { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs, Button, LiveZone, useInView, Stars } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { openRateExperience } from '../components/RateExperience.jsx';
import { AUDIENCES, TESTIMONIALS, RATING } from '../data/testimonials.js';
import { openPageVideo } from '../data/pageVideos.js';
import { useMemberReviews } from '../utils/reviews.js';

const ROLE_TO_AUD = { hcp: 'doctors', caregiver: 'caregivers', patient: 'patients' };
const initials = (name) => String(name || '?').replace(/^Dr\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const firstSentence = (q) => (String(q).match(/^.*?[.!?](\s|$)/) || [q])[0].trim();
const audLabel = (id) => AUDIENCES.find((a) => a.id === id)?.label || id;
const avgOf = (list) => (list.length ? list.reduce((a, t) => a + (t.rating || 0), 0) / list.length : 0);
const cc = (t) => String(t.cc || '').toUpperCase();

const ROOMS = [
  { id: 'doctors', icon: 'stethoscope', no: '01', kicker: 'Chart 01 · Clinical opinions', title: 'Doctors &', em: 'specialists', line: 'Signed, dated and on the record, like every good chart note.' },
  { id: 'nurses', icon: 'nurse', no: '02', kicker: 'Board 02 · Shift handover', title: 'Notes from', em: 'the shift', line: 'Pinned to the board between rounds, day shift and night shift.' },
  { id: 'allied', icon: 'microscope', no: '03', kicker: 'Slide 03 · Allied health', title: 'Under the', em: 'microscope', line: 'Pharmacy, therapy, lab, imaging and nutrition, each one a sample worth a closer look.' },
  { id: 'caregivers', icon: 'hands', no: '04', kicker: 'Album 04 · Caregivers', title: 'From the', em: 'family album', line: 'The people who keep care going at home, at the kitchen table and beyond.' },
  { id: 'patients', icon: 'chat', no: '05', kicker: 'Thread 05 · Patients', title: 'In their', em: 'own words', line: 'Straight from the people who use healthcare every day.' },
];

/** Published reviews + approved live member reviews, grouped by panel. */
function usePanels() {
  const member = useMemberReviews();
  return useMemo(() => {
    const all = [
      ...member.map((m) => ({ ...m, role: m.designation || 'Member', audience: ROLE_TO_AUD[m.roleType] || 'patients', member: true })),
      ...TESTIMONIALS,
    ];
    const by = {};
    AUDIENCES.forEach((a) => { by[a.id] = all.filter((t) => t.audience === a.id); });
    return by;
  }, [member]);
}

/* =================== Hero =================== */
const CYCLE = ['clinics', 'wards', 'labs', 'living rooms', 'waiting rooms'];
function CycleWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % CYCLE.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rx-cycle" aria-hidden="true">
      <span key={i} className="rx-cycle-w">{CYCLE[i]}</span>
    </span>
  );
}

function Gauge() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const pct = RATING.exact / 5;
  const deg = -90 + 180 * pct;
  return (
    <div ref={ref} className={`rx-gauge ${on ? 'is-in' : ''}`} role="img" aria-label={`Average rating ${RATING.average} out of 5 from ${RATING.count} reviews`}>
      <svg viewBox="0 0 220 124" aria-hidden="true">
        <defs>
          <linearGradient id="rxg" x1="0" x2="1">
            <stop offset="0" stopColor="#5ab0ff" /><stop offset=".5" stopColor="#a78bfa" /><stop offset="1" stopColor="#ffc94d" />
          </linearGradient>
        </defs>
        <path d="M14 112a96 96 0 0 1 192 0" className="rx-g-track" />
        <path d="M14 112a96 96 0 0 1 192 0" className="rx-g-arc" pathLength="100" strokeDasharray={`${(pct * 100).toFixed(1)} 100`} />
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const a = Math.PI - (Math.PI * k) / 5;
          return <text key={k} x={(110 + 74 * Math.cos(a)).toFixed(1)} y={(116 - 74 * Math.sin(a)).toFixed(1)} className="rx-g-tick">{k}</text>;
        })}
      </svg>
      <span className="rx-needle" style={{ '--deg': `${deg.toFixed(1)}deg` }} aria-hidden="true"><i /></span>
      <span className="rx-g-val"><b>{RATING.average.toFixed(1)}</b><small>out of 5</small></span>
    </div>
  );
}

function WallCard({ t }) {
  return (
    <li className={`rx-wc a-${t.audience}`}>
      <span className="rx-wc-top"><Stars value={t.rating} size={12} /><span className="cc-tag">{cc(t)}</span></span>
      <q>{firstSentence(t.quote)}</q>
      <span className="rx-wc-who"><i>{initials(t.name)}</i><span><b>{t.name}</b><small>{t.role}</small></span></span>
    </li>
  );
}

function HeroWall() {
  const cols = [0, 1, 2].map((c) => TESTIMONIALS.filter((_, i) => i % 3 === c));
  return (
    <LiveZone className="rx-wall" aria-hidden="true">
      <div className="rx-wall-tilt">
        {cols.map((list, c) => (
          <ul key={c} className={`rx-wcol c${c}`}>
            {[...list, ...list].map((t, i) => <WallCard key={`${t.name}-${i}`} t={t} />)}
          </ul>
        ))}
      </div>
    </LiveZone>
  );
}

function Hero() {
  return (
    <section className="rx-hero">
      <div className="rx-aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="container rx-hero-in">
        <div className="rx-hero-copy">
          <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/about-us', label: 'About Us' }, { label: 'Ratings & Reviews' }]} />
          <span className="rx-eyebrow"><span className="rx-live" />Ratings & Reviews · {RATING.count} member voices</span>
          <h1 className="rx-title">
            <span className="rx-t1">The verdict</span>
            <span className="rx-t2">is in.</span>
          </h1>
          <p className="rx-lead">
            MyHealthOpinions reviews, straight from the <CycleWord /><span className="sr-only">clinics, wards, labs and living rooms</span> where
            our doctors, nurses, allied health pros, caregivers and patients work and live.
          </p>
          <div className="rx-hero-score">
            <Gauge />
            <ul className="rx-hero-facts">
              <li><b>{RATING.count}</b><small>reviews</small></li>
              <li><b>{AUDIENCES.length}</b><small>panels</small></li>
              <li><b>{RATING.countries}</b><small>countries</small></li>
            </ul>
          </div>
          <div className="rx-ctas">
            <Button onClick={openRateExperience} icon="star">Rate your experience</Button>
            <button type="button" className="btn btn-ghost" onClick={openPageVideo}><span className="btn-label">Watch members</span><Icon name="play" size={16} fill="currentColor" stroke={0} className="btn-icon" /></button>
          </div>
        </div>
        <HeroWall />
      </div>
    </section>
  );
}

/* =================== Panel dock =================== */
function Dock({ panels }) {
  return (
    <nav className="rx-dock" aria-label="Reviews by panel">
      <div className="container rx-dock-in">
        {ROOMS.map((r) => (
          <a key={r.id} href={`#panel-${r.id}`} className={`rx-dock-a a-${r.id}`}>
            <span className="rx-dock-ic"><Icon name={r.icon} size={18} /></span>
            <span><b>{audLabel(r.id)}</b><small>{panels[r.id].length} reviews · {avgOf(panels[r.id]).toFixed(1)}★</small></span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function RoomHead({ room, list }) {
  const avg = avgOf(list);
  return (
    <header className="rx-rhead">
      <span className="rx-rno" aria-hidden="true">{room.no}</span>
      <div className="rx-rtext">
        <span className="rx-rkicker"><Icon name={room.icon} size={14} />{room.kicker}</span>
        <h2>{room.title} <em>{room.em}</em></h2>
        <p>{room.line}</p>
      </div>
      <div className="rx-rstat" aria-label={`${audLabel(room.id)}: average ${avg.toFixed(1)} out of 5 from ${list.length} reviews`}>
        <b>{avg.toFixed(1)}</b>
        <Stars value={Math.round(avg)} size={14} />
        <small>{list.length} reviews</small>
      </div>
    </header>
  );
}

function Room({ room, list, children, deco }) {
  const [ref, on] = useInView({ threshold: 0.05 });
  return (
    <section id={`panel-${room.id}`} ref={ref} className={`rx-room room-${room.id} ${on ? 'is-in' : ''}`}>
      <LiveZone className="rx-deco" aria-hidden="true">{deco}</LiveZone>
      <div className="container rx-room-in">
        <RoomHead room={room} list={list} />
        {children}
      </div>
    </section>
  );
}

const MemberTag = ({ t }) => (t.member ? <span className="rx-member">Member review</span> : null);

/* ---- 01 Doctors: clinical chart ---- */
function ChartRoom({ room, list }) {
  return (
    <Room room={room} list={list} deco={(
      <svg className="rx-ecg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path pathLength="100" d="M0 60h220l14-24 16 56 20-90 18 74 12-16h180l14-24 16 56 20-90 18 74 12-16h180l14-24 16 56 20-90 18 74 12-16h180l14-24 16 56 20-90 18 74 12-16h120" />
      </svg>
    )}>
      <ul className="rx-rx-grid">
        {list.map((t, i) => (
          <li key={`${t.name}-${i}`} className="rx-rxpad" style={{ '--i': i }}>
            <span className="rx-clip" aria-hidden="true" />
            <div className="rx-pad-head">
              <span className="rx-rxsym" aria-hidden="true">℞</span>
              <span><b>{t.name}</b><small>{t.role}</small></span>
              <span className="cc-tag">{cc(t)}</span>
            </div>
            <p>{t.quote}</p>
            <div className="rx-pad-foot"><Stars value={t.rating} size={13} /><MemberTag t={t} /><span className="rx-sign" aria-hidden="true">{t.name.replace(/^Dr\.\s*/, '').split(' ')[0]}</span></div>
          </li>
        ))}
      </ul>
    </Room>
  );
}

/* ---- 02 Nurses: shift board ---- */
function ShiftRoom({ room, list }) {
  return (
    <Room room={room} list={list} deco={(
      <span className="rx-shiftclock"><span className="rx-sun" /><span className="rx-moon" /><i /></span>
    )}>
      <ul className="rx-board">
        {list.map((t, i) => (
          <li key={`${t.name}-${i}`} className={`rx-note n${i % 5}`} style={{ '--i': i }}>
            <span className="rx-pin" aria-hidden="true" />
            <span className="rx-note-shift"><Icon name={i % 2 ? 'moon' : 'clock'} size={12} />{i % 2 ? 'Night shift' : 'Day shift'}</span>
            <p>{t.quote}</p>
            <span className="rx-note-who"><b>{t.name}</b><small>{t.role} · {t.country}</small></span>
            <span className="rx-note-foot"><Stars value={t.rating} size={13} /><MemberTag t={t} /></span>
          </li>
        ))}
      </ul>
    </Room>
  );
}

/* ---- 03 Allied health: microscope slides ---- */
function LabRoom({ room, list }) {
  return (
    <Room room={room} list={list} deco={(<><span className="rx-beam" />{[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <span key={k} className={`rx-bub b${k}`} />)}</>)}>
      <ul className="rx-slides">
        {list.map((t, i) => (
          <li key={`${t.name}-${i}`} className="rx-slide" style={{ '--i': i }}>
            <span className="rx-slide-label"><b>{String(i + 1).padStart(2, '0')}</b><small>{t.role}</small></span>
            <div className="rx-slide-glass">
              <span className="rx-cell" aria-hidden="true"><i /><i /><i /></span>
              <p>{t.quote}</p>
              <span className="rx-slide-who"><b>{t.name}</b><span className="cc-tag">{cc(t)}</span><Stars value={t.rating} size={12} /><MemberTag t={t} /></span>
            </div>
          </li>
        ))}
      </ul>
    </Room>
  );
}

/* ---- 04 Caregivers: family album ---- */
function AlbumRoom({ room, list }) {
  return (
    <Room room={room} list={list} deco={[0, 1, 2, 3, 4, 5].map((k) => <span key={k} className={`rx-heart h${k}`}><Icon name="heart" size={22} fill="currentColor" stroke={0} /></span>)}>
      <ul className="rx-album">
        {list.map((t, i) => (
          <li key={`${t.name}-${i}`} className={`rx-polaroid p${i % 4}`} style={{ '--i': i }}>
            <span className="rx-tape" aria-hidden="true" />
            <div className="rx-photo" aria-hidden="true"><span>{initials(t.name)}</span><Icon name="home" size={18} /></div>
            <p>{t.quote}</p>
            <span className="rx-caption"><b>{t.name}</b> · {t.role}, {t.country}</span>
            <span className="rx-pol-foot"><Stars value={t.rating} size={13} /><MemberTag t={t} /></span>
          </li>
        ))}
      </ul>
    </Room>
  );
}

/* ---- 05 Patients: message thread ---- */
function ChatRoom({ room, list }) {
  return (
    <Room room={room} list={list} deco={<><span className="rx-orb o1" /><span className="rx-orb o2" /></>}>
      <div className="rx-chat">
        <div className="rx-chat-bar" aria-hidden="true">
          <span className="rx-chat-av"><Icon name="users" size={18} /></span>
          <span><b>Patient voices</b><small>{list.length} members · online</small></span>
          <Icon name="call" size={18} />
        </div>
        <ol className="rx-thread">
          {list.map((t, i) => (
            <li key={`${t.name}-${i}`} className={`rx-msg ${i % 2 ? 'r' : 'l'}`} style={{ '--i': i }}>
              <i className="rx-msg-av" aria-hidden="true">{initials(t.name)}</i>
              <div className="rx-bubble">
                <span className="rx-msg-who"><b>{t.name}</b> · {t.country}</span>
                <p>{t.quote}</p>
                <span className="rx-msg-foot"><Stars value={t.rating} size={11} /><small>{t.role}</small><MemberTag t={t} /><span className="rx-read" aria-hidden="true">✓✓</span></span>
              </div>
            </li>
          ))}
          <li className="rx-msg l rx-typing" aria-hidden="true"><i className="rx-msg-av">+</i><div className="rx-bubble"><span /><span /><span /></div></li>
        </ol>
        <p className="rx-consent"><Icon name="shield" size={14} />Patient reviews are published only with the member's informed consent.</p>
      </div>
    </Room>
  );
}

/* =================== Scoreboard =================== */
function Scoreboard({ panels }) {
  const [ref, on] = useInView({ threshold: 0.2 });
  const max = Math.max(...RATING.dist.map((d) => d.n), 1);
  const countries = useMemo(() => {
    const m = new Map();
    TESTIMONIALS.forEach((t) => m.set(t.cc, { cc: t.cc, country: t.country, n: (m.get(t.cc)?.n || 0) + 1 }));
    return [...m.values()].sort((a, b) => b.n - a.n);
  }, []);
  return (
    <section ref={ref} className={`rx-score ${on ? 'is-in' : ''}`}>
      <div className="container">
        <header className="rx-score-head">
          <span className="rx-rkicker">The scoreboard</span>
          <h2>Every star, <em>counted in the open.</em></h2>
        </header>
        <div className="rx-score-grid">
          <div className="rx-sb rx-eq">
            <h3>Star split</h3>
            <div className="rx-eq-bars">
              {RATING.dist.map((d, i) => (
                <div key={d.stars} className="rx-eq-col" style={{ '--h': `${Math.max(4, (d.n / max) * 100).toFixed(0)}%`, '--i': i }}>
                  <b>{d.n}</b>
                  <span className="rx-eq-bar"><i /></span>
                  <small>{d.stars}★</small>
                </div>
              ))}
            </div>
            <p className="rx-sb-note">{RATING.count} published reviews · exact average {RATING.exact.toFixed(2)}</p>
          </div>
          <div className="rx-sb rx-race">
            <h3>Average by panel</h3>
            <ul>
              {ROOMS.map((r, i) => {
                const a = avgOf(panels[r.id]);
                return (
                  <li key={r.id} className={`a-${r.id}`} style={{ '--w': `${((a / 5) * 100).toFixed(0)}%`, '--i': i }}>
                    <span className="rx-race-ic"><Icon name={r.icon} size={15} /></span>
                    <span className="rx-race-lbl">{audLabel(r.id)}</span>
                    <span className="rx-race-track"><i /></span>
                    <b>{a.toFixed(1)}</b>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rx-sb rx-stamps">
            <h3>Stamped in {RATING.countries} countries</h3>
            <ul>
              {countries.map((c, i) => (
                <li key={c.cc} className={`st${i % 4}`} style={{ '--i': i }} title={`${c.country}: ${c.n} review${c.n > 1 ? 's' : ''}`}>
                  <b>{c.cc.toUpperCase()}</b><small>{c.country}</small>{c.n > 1 && <i>×{c.n}</i>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MicCta() {
  return (
    <section className="rx-mic">
      <LiveZone className="rx-mic-in container">
        <button type="button" className="rx-mic-btn" onClick={openRateExperience} aria-label="Rate your experience">
          <span className="rx-mic-ring r1" /><span className="rx-mic-ring r2" /><span className="rx-mic-ring r3" />
          <Icon name="mic" size={40} />
        </button>
        <div className="rx-mic-copy">
          <span className="rx-rkicker">Your turn on the mic</span>
          <h2>Been part of a study? <em>Tell us how it went.</em></h2>
          <p>Your review shows on your device right away, and goes public after a quick moderation check.</p>
          <span className="rx-eqline" aria-hidden="true">{Array.from({ length: 18 }, (_, k) => <i key={k} className={`k${k % 6}`} />)}</span>
        </div>
        <Button onClick={openRateExperience} icon="star">Write a review</Button>
      </LiveZone>
    </section>
  );
}

export default function Reviews() {
  const panels = usePanels();
  const R = Object.fromEntries(ROOMS.map((r) => [r.id, r]));
  return (
    <>
      <Hero />
      <Dock panels={panels} />
      <ChartRoom room={R.doctors} list={panels.doctors} />
      <ShiftRoom room={R.nurses} list={panels.nurses} />
      <LabRoom room={R.allied} list={panels.allied} />
      <AlbumRoom room={R.caregivers} list={panels.caregivers} />
      <ChatRoom room={R.patients} list={panels.patients} />
      <Scoreboard panels={panels} />
      <MicCta />
    </>
  );
}
