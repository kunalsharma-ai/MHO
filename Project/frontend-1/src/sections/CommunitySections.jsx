import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Flag } from '../components/CountryPicker.jsx';
import useInView from '../hooks/useInView.js';
import { STATS, STATS_URL, SURVEY_CATEGORIES } from '../data/community.js';
import useLiveReviews from '../hooks/useLiveReviews.js';
import { isRecent } from '../utils/reviews.js';

/* ───────────────────────── 1) Community ledger — rolling odometers, each with its own micro-chart ───────────────────────── */

function Odometer({ value, prefix = '', suffix = '' }) {
  const str = Number(value).toLocaleString('en-US');
  let di = 0;
  return (
    <span className="odo" aria-hidden="true">
      {prefix ? <span className="odo-fix">{prefix}</span> : null}
      {[...str].map((ch, i) => {
        if (!/\d/.test(ch)) return <span className="odo-sep" key={i}>{ch}</span>;
        di += 1;
        return (
          <span className="odo-d" key={i}>
            <span className="odo-strip" style={{ '--n': ch, '--i': di }}>
              {'01234567890123456789'.split('').map((d, k) => <span key={k}>{d}</span>)}
            </span>
          </span>
        );
      })}
      {suffix ? <span className="odo-fix">{suffix}</span> : null}
    </span>
  );
}

const fmtMonth = (ym) => {
  const [y, m] = String(ym).split('-').map(Number);
  if (!y || !m) return '';
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

function useStats() {
  const [s, setS] = useState(STATS);
  useEffect(() => {
    if (!STATS_URL) return undefined;
    let live = true;
    fetch(STATS_URL, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => live && j && setS((cur) => ({ ...cur, ...j })))
      .catch(() => {});
    return () => { live = false; };
  }, []);
  return s;
}

export function CommunityLedger() {
  const s = useStats();
  const [ref, go] = useInView({ threshold: 0.25 });
  const tiles = [
    { key: 'paid', label: 'Rewards paid', value: s.rewardsPaidUsd, prefix: '$', suffix: '+', tone: 'sun', viz: 'coins', note: 'PayPal · UPI · bank · gift cards' },
    { key: 'done', label: 'Surveys completed this month', value: s.surveysCompletedThisMonth, tone: 'teal', viz: 'calendar', note: 'Opinions shared by members' },
    { key: 'open', label: 'Surveys available monthly', value: s.monthlyAvailableSurveys, suffix: '+', tone: 'violet', viz: 'bars', note: 'New invitations every month' },
    { key: 'members', label: 'Members registered', value: s.membersRegistered, tone: 'blue', viz: 'dots', note: 'From many countries' },
  ];
  return (
    <section className={`section ledger ${go ? 'go' : ''}`} aria-labelledby="ledger-title" ref={ref}>
      <div className="ledger-grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="ledger-head reveal">
          <p className="eyebrow">Community at a glance</p>
          <h2 id="ledger-title">Real opinions. <span className="lg-hl">Real rewards.</span></h2>
          {fmtMonth(s.asOf) ? <p className="ledger-asof"><span className="live-dot" /> Updated {fmtMonth(s.asOf)}</p> : null}
        </div>
        <ul className="ledger-tiles">
          {tiles.map((t, i) => (
            <li key={t.key} className={`lt lt-${t.tone}`} style={{ '--d': `${i * 0.12}s` }}>
              <div className={`lt-viz viz-${t.viz}`} aria-hidden="true">
                {t.viz === 'coins' && [0, 1, 2, 3, 4].map((k) => <i key={k} style={{ '--k': k }} />)}
                {t.viz === 'calendar' && Array.from({ length: 28 }, (_, k) => <i key={k} style={{ '--k': k }} />)}
                {t.viz === 'bars' && SURVEY_CATEGORIES.map((c, k) => <i key={c.id} style={{ '--k': k, '--h': `${35 + ((c.reward * 9 + c.mins * 2) % 60)}%`, background: c.tone }} />)}
                {t.viz === 'dots' && Array.from({ length: 35 }, (_, k) => <i key={k} style={{ '--k': (k * 7) % 35 }} />)}
              </div>
              <p className="lt-num">
                <Odometer value={t.value} prefix={t.prefix} suffix={t.suffix} />
                <span className="sr-only">{`${t.prefix || ''}${Number(t.value).toLocaleString('en-US')}${t.suffix || ''}`}</span>
              </p>
              <h3 className="lt-label">{t.label}</h3>
              <p className="lt-note">{t.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── 2) Survey board — split-flap "now open" board ───────────────────────── */

function Flaps({ text }) {
  return (
    <span className="flaps" aria-hidden="true">
      {[...text].map((ch, i) => <span className="flap" key={i} style={{ '--k': i }}>{ch}</span>)}
    </span>
  );
}

export function SurveyBoard() {
  const [ref, go] = useInView({ threshold: 0.15 });
  return (
    <section className={`section sboard-sec ${go ? 'go' : ''}`} aria-labelledby="sboard-title" ref={ref}>
      <div className="container">
        <div className="sboard-head reveal">
          <div>
            <p className="eyebrow">Survey board</p>
            <h2 id="sboard-title">Pick a topic you love. <span className="hl-orange">Get rewarded for it.</span></h2>
          </div>
          <p className="sec-sub">Typical rewards and lengths by survey category. Every invitation shows its exact reward and time before you start — no surprises.</p>
        </div>

        <div className="sboard" role="table" aria-label="Survey categories with typical reward and length">
          <div className="sb-row sb-th" role="row">
            <span role="columnheader">Category</span>
            <span role="columnheader">Survey</span>
            <span role="columnheader">Reward</span>
            <span role="columnheader">Time</span>
            <span role="columnheader">Status</span>
          </div>
          {SURVEY_CATEGORIES.map((c, i) => (
            <div className="sb-row" role="row" key={c.id} style={{ '--tone': c.tone, '--r': i }}>
              <span role="cell" className="sb-cat"><span className="sb-ico"><Icon name={c.icon} size={18} /></span>{c.tag}</span>
              <span role="cell" className="sb-title">
                <strong>{c.title}</strong>
                <small>{c.desc}</small>
              </span>
              <span role="cell" className="sb-reward">
                <Flaps text={`$${c.reward}`} />
                <span className="sr-only">${c.reward}</span>
              </span>
              <span role="cell" className="sb-time">
                <span className="sb-ring" style={{ '--p': Math.min(1, c.mins / 20) }} aria-hidden="true" />
                {c.mins} min
              </span>
              <span role="cell" className="sb-status"><span className="sb-light" aria-hidden="true" />Open</span>
            </div>
          ))}
        </div>
        <div className="sboard-cta reveal">
          <Link to="/sign-up" className="btn btn-primary btn-shine">Join free &amp; get invitations <Icon name="arrow" size={18} /></Link>
          <Link to="/rewards-and-payouts" className="btn btn-ghost-dark">How rewards are paid</Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3) Member voices — the "Opinion Frequency" world-radio tuner ───────────────────────── */

// Stations spread across the FM band (88–108) however many reviews there are.
const freq = (i, n) => (n > 1 ? 88 + (i / (n - 1)) * 20 : 98).toFixed(1);
const Stars = ({ n }) => (n ? <span className="vq-stars" role="img" aria-label={`Rated ${n} out of 5`}>{'★'.repeat(n)}<i>{'★'.repeat(5 - n)}</i></span> : null);

export function MemberVoices() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const hold = hover || focusIn; // pause while pointer or keyboard focus is on the radio
  const [ref, inView] = useInView({ once: false, threshold: 0.2 });
  const userMoved = useRef(false);
  const dialRef = useRef(null);
  const { reviews: TESTIMONIALS, status } = useLiveReviews();
  const n = TESTIMONIALS.length;
  const firstId = TESTIMONIALS[0] && TESTIMONIALS[0].id;
  const prevFirst = useRef(firstId);
  // A brand-new review arrived (or the visitor just posted one): tune straight to it.
  useEffect(() => {
    if (firstId !== prevFirst.current) {
      prevFirst.current = firstId;
      setI(0);
    }
  }, [firstId]);
  useEffect(() => { if (i >= n) setI(0); }, [i, n]);

  // Roving focus: arrow keys move focus along the dial together with the selection.
  useEffect(() => {
    const d = dialRef.current;
    if (d && d.contains(document.activeElement)) {
      const b = d.querySelectorAll('.tn-stations button')[i];
      if (b && b !== document.activeElement) b.focus();
    }
  }, [i]);
  const cur = TESTIMONIALS[Math.min(i, n - 1)] || TESTIMONIALS[0];

  useEffect(() => {
    if (!playing || hold || !inView) return undefined;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 7000);
    return () => clearTimeout(t);
  }, [i, playing, hold, inView, n]);

  const tune = (k) => {
    userMoved.current = true;
    setI(((k % n) + n) % n);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); tune(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); tune(i - 1); }
  };
  const pct = ((i + 0.5) / n) * 100; // centre of the active station

  return (
    <section id="voices" className="section voices" aria-labelledby="voices-title" ref={ref}>
      <div className="container">
        <div className="voices-head reveal">
          <p className="eyebrow">Testimonials</p>
          <h2 id="voices-title">Tune in to members <span className="vh-hl">around the world</span></h2>
          <p className="sec-sub">Every station is a real member voice. Turn the dial, pick a flag, or let it play.</p>
        </div>

        <div
          className={`radio ${playing && !hold && inView ? 'is-on' : ''}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={(e) => setFocusIn(e.target.matches(':focus-visible'))}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusIn(false); }}
        >
          <div className="radio-top">
            <div className="radio-lcd" aria-hidden="true">
              <span className="lcd-band">{status === 'live' ? <b className="lcd-live">● LIVE</b> : 'FM'}</span>
              <span className="lcd-freq" key={`f${i}`}>{freq(i, n)}</span>
              <span className="lcd-country">{cur.country}</span>
            </div>
            <div className="radio-wave" aria-hidden="true">
              {Array.from({ length: 28 }, (_, k) => <i key={k} style={{ '--k': k, '--a': 0.35 + (((k * 37) % 11) / 11) * 0.65 }} />)}
            </div>
            <div className="radio-ctrl">
              <button type="button" className="rc-btn" onClick={() => tune(i - 1)} aria-label="Previous testimonial"><Icon name="chevron" size={18} /></button>
              <button type="button" className="rc-btn rc-play" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing} aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}>
                {playing ? <span className="rc-pause" aria-hidden="true"><i /><i /></span> : <span className="rc-tri" aria-hidden="true" />}
              </button>
              <button type="button" className="rc-btn rc-next" onClick={() => tune(i + 1)} aria-label="Next testimonial"><Icon name="chevron" size={18} /></button>
            </div>
          </div>

          <div className="radio-stage" aria-live={userMoved.current ? 'polite' : 'off'}>
            <span className="radio-static" key={`s${i}`} aria-hidden="true" />
            {TESTIMONIALS.map((t, k) => (
              <figure key={t.id} className={`vq ${k === i ? 'on' : ''}`} aria-hidden={k !== i}>
                <div className="vq-flag"><Flag iso={t.iso} size={44} /></div>
                <blockquote>
                  {t.own || isRecent(t) ? <p className={`vq-badge ${t.pending ? 'is-pending' : ''}`}>{t.own ? (t.pending ? 'Your review · awaiting a quick check' : 'Your review · just published') : 'Just in'}</p> : null}
                  <p>{t.text}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  {t.company ? <span className="vq-company"><Icon name="briefcase" size={14} /> {t.company}</span> : null}
                  {t.country ? <span className="vq-country"><Flag iso={t.iso} size={14} /> {t.country}</span> : null}
                  <Stars n={t.rating} />
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="tn-wrap">
            <div className="tn-dial" ref={dialRef} style={{ minWidth: `${Math.max(640, n * 50)}px` }} role="group" aria-label="Choose a member by country" onKeyDown={onKey}>
              <div className="tn-ticks" aria-hidden="true" />
              <div className="tn-needle" style={{ transform: `translateX(${pct}%)` }} aria-hidden="true"><i /></div>
              <ol className="tn-stations">
                {TESTIMONIALS.map((t, k) => (
                  <li key={t.id} className={isRecent(t) ? 'is-new' : ''}>
                    <button
                      type="button"
                      className={k === i ? 'on' : ''}
                      onClick={() => tune(k)}
                      aria-pressed={k === i}
                      aria-label={`${t.name}, ${t.country}`}
                      tabIndex={k === i ? 0 : -1}
                    >
                      <Flag iso={t.iso} size={18} />
                      <small>{freq(k, n)}</small>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <p className="voices-foot reveal">Reviews from members of MyFrequentRewards — new ones appear here automatically. Want to add your voice? Use <strong>Rate your experience</strong> on the right edge of the screen.</p>
      </div>
    </section>
  );
}
