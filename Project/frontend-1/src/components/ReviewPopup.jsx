import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { COUNTRIES } from '../data/countries.js';
import { SOCIALS } from '../data/site.js';
import { getJSON, postJSON } from '../utils/api.js';
import { session, store } from '../utils/storage.js';
import { EMAIL_RE } from '../utils/validate.js';
import { normalizeReview, rememberOwnReview } from '../utils/reviews.js';

// "Reward Ticket" rates & reviews experience.
// • A "Rate your experience" tab lives on the RIGHT edge of every page (slides in a few seconds after entry),
//   breathes/nudges periodically and occasionally shows a small "How are we doing?" bubble.
// • The full popup NEVER opens on entry. It auto-opens only after real engagement (≥ 45 s on site and
//   ≥ 35 % scrolled) — or on exit-intent — and only at a quiet moment (no typing, chat, cookie banner or
//   active scrolling). Pacing (see AUTO): max 2 per visit at least 4 min apart, then at most once a day,
//   never more than 6 times in total. Never again after a review is submitted. Never on /sign-up or /login.
// • Reviews shown inside come only from VITE_REVIEWS_FEED_URL (approved, genuine). No rating schema is emitted.

const FEED = import.meta.env.VITE_REVIEWS_FEED_URL || '/api/reviews';
const ENDPOINT = import.meta.env.VITE_REVIEW_ENDPOINT || '/api/reviews';
const BLOCKED = ['/sign-up', '/login'];
const COINS = [
  { v: 1, label: 'Meh', hue: '#FF5E7E' },
  { v: 2, label: 'Okay', hue: '#FF8A00' },
  { v: 3, label: 'Good', hue: '#FFC233' },
  { v: 4, label: 'Great', hue: '#14C9B5' },
  { v: 5, label: 'Brilliant', hue: '#2F6BFF' },
];
const HIGHLIGHTS = ['Easy sign-up', 'Relevant surveys', 'Quick payouts', 'Helpful support', 'Mobile-friendly', 'Clear rewards', 'Feels secure', 'Great for professionals'];
const AUTO = {
  minSeconds: 45, // time on site before the first auto prompt
  minScroll: 0.35, // scroll depth on any page
  exitAfterSeconds: 25, // exit-intent allowed after this
  gapInVisitSeconds: 240, // between the 1st and 2nd prompt of the same visit
  maxPerVisit: 2,
  gapBetweenVisitsHours: 20,
  maxEver: 6,
  quietMs: 2500, // visitor must be idle this long (not scrolling/typing) before we ask
  tabDelayMs: 4000, // right-edge tab slides in after this
  bubbleEverySeconds: 75, // small "How are we doing?" bubble cadence
};

function Jar({ level }) {
  // SVG jar that fills with coins as rating rises
  const h = (level / 5) * 112;
  return (
    <svg viewBox="0 0 120 160" className="rt-jar" aria-hidden="true">
      <defs>
        <clipPath id="jarclip"><path d="M24 30h72v8c10 6 14 16 14 30v66c0 12-8 20-20 20H30c-12 0-20-8-20-20V68c0-14 4-24 14-30z" /></clipPath>
        <linearGradient id="coinfill" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#FF8A00" /><stop offset="1" stopColor="#FFC233" /></linearGradient>
      </defs>
      <g clipPath="url(#jarclip)">
        <rect x="0" y={154 - h} width="120" height={h + 6} fill="url(#coinfill)" className="rt-jar-fill" />
        {Array.from({ length: level * 3 }).map((_, i) => (
          <circle key={i} cx={22 + ((i * 29) % 78)} cy={150 - (Math.floor(i / 3) * 22 + (i % 2) * 8)} r="7" fill="#FFE08A" stroke="#C26B00" strokeWidth="1.5" className="rt-jar-coin" style={{ animationDelay: `${i * 40}ms` }} />
        ))}
      </g>
      <path d="M24 30h72v8c10 6 14 16 14 30v66c0 12-8 20-20 20H30c-12 0-20-8-20-20V68c0-14 4-24 14-30z" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="3" />
      <rect x="20" y="18" width="80" height="14" rx="5" fill="#FFC233" />
      <rect x="44" y="21" width="32" height="5" rx="2.5" fill="#0B1E5B" />
    </svg>
  );
}

export default function ReviewPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [drop, setDrop] = useState(0);
  const [tags, setTags] = useState([]);
  const [f, setF] = useState({ text: '', name: '', country: '', company: '', email: '', consent: false, website: '' });
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('idle');
  const [reviews, setReviews] = useState([]);
  const [ri, setRi] = useState(0);
  const [peek, setPeek] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [live, setLive] = useState(true);
  const cardRef = useRef(null);
  const lastFocus = useRef(null);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  const done = () => Boolean(store.get('mfr_reviewed'));

  const canAuto = () => {
    if (done() || BLOCKED.includes(pathRef.current)) return false;
    const log = store.get('mfr_rt_log', { n: 0, last: 0 });
    const inVisit = session.get('mfr_rt_n', 0);
    const visitLast = session.get('mfr_rt_last', 0);
    const now = Date.now();
    if (log.n >= AUTO.maxEver || inVisit >= AUTO.maxPerVisit) return false;
    if (inVisit === 0 && log.last && now - log.last < AUTO.gapBetweenVisitsHours * 3600e3) return false;
    if (inVisit > 0 && now - visitLast < AUTO.gapInVisitSeconds * 1000) return false;
    return true;
  };
  // Never interrupt: typing, chat open, cookie banner showing, tab hidden.
  const busy = () =>
    document.hidden ||
    Boolean(document.activeElement && document.activeElement.matches && document.activeElement.matches('input, textarea, select, [contenteditable="true"]')) ||
    Boolean(document.querySelector('.chat-panel.is-open, .cookie'));

  const show = (auto) => {
    if (BLOCKED.includes(pathRef.current)) return;
    if (auto) {
      if (!canAuto()) return;
      const log = store.get('mfr_rt_log', { n: 0, last: 0 });
      store.set('mfr_rt_log', { n: log.n + 1, last: Date.now() });
      session.set('mfr_rt_n', session.get('mfr_rt_n', 0) + 1);
      session.set('mfr_rt_last', Date.now());
    }
    setBubble(false);
    lastFocus.current = document.activeElement;
    setOpen(true);
  };

  useEffect(() => {
    const take = (d) => setReviews((Array.isArray(d) ? d : (d && d.reviews) || []).map(normalizeReview).filter(Boolean));
    getJSON(FEED).then(take).catch(() => getJSON('/data/reviews.json').then(take).catch(() => {}));
    const t = setTimeout(() => setPeek(true), AUTO.tabDelayMs); // tab slides in shortly after entry
    return () => clearTimeout(t);
  }, []);

  // Engagement trigger: time on site (whole visit) + scroll depth, asked only at a quiet moment; or exit intent.
  useEffect(() => {
    const t0 = session.get('mfr_t0', 0) || Date.now();
    session.set('mfr_t0', t0);
    let maxScroll = 0;
    let lastActive = Date.now();
    const onScroll = () => {
      lastActive = Date.now();
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max > 0) maxScroll = Math.max(maxScroll, h.scrollTop / max);
    };
    const onActive = () => { lastActive = Date.now(); };
    const tick = setInterval(() => {
      const secs = (Date.now() - t0) / 1000;
      const quiet = Date.now() - lastActive >= AUTO.quietMs;
      if (secs >= AUTO.minSeconds && maxScroll >= AUTO.minScroll && quiet && !busy() && canAuto()) show(true);
    }, 1500);
    const onLeave = (e) => {
      if (e.clientY <= 0 && (Date.now() - t0) / 1000 >= AUTO.exitAfterSeconds && !busy() && canAuto()) show(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onActive);
    window.addEventListener('pointerdown', onActive);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      clearInterval(tick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onActive);
      window.removeEventListener('pointerdown', onActive);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gentle reminder bubble beside the tab every so often (never while the popup is open).
  useEffect(() => {
    if (open || done()) return undefined;
    let hide;
    const t = setInterval(() => {
      if (busy() || BLOCKED.includes(pathRef.current)) return;
      setBubble(true);
      hide = setTimeout(() => setBubble(false), 6000);
    }, AUTO.bubbleEverySeconds * 1000);
    return () => { clearInterval(t); clearTimeout(hide); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    setTimeout(() => cardRef.current && cardRef.current.focus(), 60);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open || reviews.length < 2) return undefined;
    const t = setInterval(() => setRi((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [open, reviews.length]);

  useEffect(() => {
    if (BLOCKED.includes(pathname)) setOpen(false);
  }, [pathname]);

  function close() {
    setOpen(false);
    if (session.get('mfr_rt_n', 0) > 0) session.set('mfr_rt_last', Date.now());
    if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
  }

  function pick(v) {
    setRating(v);
    setDrop(v);
    setTimeout(() => setStep(2), 650);
  }

  function validate(v = f) {
    const e = {};
    if (v.text.trim().length < 20) e.text = 'Please write at least 20 characters.';
    if (!/^[\p{L}][\p{L}\s.'-]{1,39}$/u.test(v.name.trim())) e.name = 'Please enter your first name.';
    if (!v.country) e.country = 'Please choose your country.';
    if (v.company.trim().length > 60) e.company = 'Keep the company name under 60 characters.';
    if (/https?:|www\./i.test(v.text + v.company)) e.text = 'Please remove links from your review.';
    if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email.';
    if (!v.consent) e.consent = 'Please accept so we can store your review.';
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (f.website || Object.keys(e).length) return;
    setStatus('sending');
    const countryName = (COUNTRIES.find((c) => c.iso === f.country) || {}).name || '';
    const payload = { rating, highlights: tags, text: f.text.trim().slice(0, 600), firstName: f.name.trim(), country: f.country, countryName, company: f.company.trim(), email: f.email.trim(), page: pathname, consentPublish: true };
    try {
      const res = await postJSON(ENDPOINT, payload);
      store.set('mfr_reviewed', Date.now());
      // Show the reviewer their own testimonial straight away; everyone else sees it once the server publishes it.
      rememberOwnReview({ id: res.id, name: payload.firstName, iso: f.country, country: countryName, company: payload.company, rating, text: payload.text, createdAt: new Date().toISOString(), pending: res.status === 'pending' });
      setLive(res.status !== 'pending');
      setStatus('idle');
      setStep(3);
    } catch {
      setStatus('error');
    }
  }

  const set = (k, v) => {
    const n = { ...f, [k]: v };
    setF(n);
    if (Object.keys(errs).length) setErrs(validate(n));
  };

  const coin = COINS.find((c) => c.v === rating);
  const r = reviews[ri];

  return (
    <>
      {!done() && !BLOCKED.includes(pathname) ? (
        <button type="button" className={`rt-tab ${peek ? 'is-in' : ''} ${bubble ? 'is-nudge' : ''}`} onClick={() => show(false)} aria-label="Rate your experience with MyFrequentRewards" aria-haspopup="dialog">
          <span className="rt-tab-face">
            <span className="rt-tab-star"><Icon name="star" size={16} fill="currentColor" /></span>
            <span className="rt-tab-txt">Rate your experience</span>
            <span className="rt-tab-shine" aria-hidden="true" />
          </span>
          <span className="rt-tab-dot" aria-hidden="true" />
          {bubble ? <span className="rt-bubble" aria-hidden="true">How are we doing? <b>Tap to rate</b> <span className="rt-bubble-stars">★★★★★</span></span> : null}
        </button>
      ) : null}

      {open ? (
        <div className="rt-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="rt-ticket" role="dialog" aria-modal="true" aria-labelledby="rt-title" tabIndex={-1} ref={cardRef}>
            <aside className="rt-stub">
              <p className="rt-kicker"><Icon name="gift" size={14} /> Reward ticket</p>
              <Jar level={drop} />
              <p className="rt-score">{rating ? <><b>{rating}</b>/5 · {coin.label}</> : 'Drop a coin to rate'}</p>
              <ol className="rt-steps">
                {['Rate', 'Tell us', 'Done'].map((s, i) => (
                  <li key={s} className={step > i + 1 ? 'done' : step === i + 1 ? 'now' : ''}><span>{step > i + 1 ? '✓' : i + 1}</span>{s}</li>
                ))}
              </ol>
              <p className="rt-serial">No. MFR-{String(new Date().getFullYear())}-{rating || 0}{tags.length}</p>
            </aside>
            <div className="rt-perf" aria-hidden="true" />
            <section className="rt-main">
              <button type="button" className="rt-x" onClick={close} aria-label="Close"><Icon name="close" size={18} /></button>

              {step === 1 ? (
                <div className="rt-pane" key="s1">
                  <h2 id="rt-title">Enjoying MyFrequentRewards?</h2>
                  <p className="muted">Drop a reward coin into the jar — it takes under a minute and helps other people decide.</p>
                  <div className="rt-coins" role="radiogroup" aria-label="Your rating">
                    {COINS.map((c) => (
                      <button type="button" role="radio" aria-checked={rating === c.v} key={c.v} className={`rt-coin ${rating === c.v ? 'on' : ''}`} style={{ '--h': c.hue }} onClick={() => pick(c.v)}>
                        <span className="rt-coin-face"><b>{c.v}</b><Icon name="star" size={14} fill="currentColor" /></span>
                        <small>{c.label}</small>
                      </button>
                    ))}
                  </div>
                  {r ? (
                    <figure className="rt-quote" key={ri}>
                      <blockquote>“{r.text}”</blockquote>
                      <figcaption>— {r.name}{r.country ? `, ${r.country}` : ''}</figcaption>
                    </figure>
                  ) : null}
                  <button type="button" className="rt-later" onClick={close}>Maybe later</button>
                </div>
              ) : null}

              {step === 2 ? (
                <form className="rt-pane" key="s2" onSubmit={submit} noValidate>
                  <h2 id="rt-title"><span className="rt-badge" style={{ '--h': coin?.hue }}>{rating}★ {coin?.label}</span> What stood out?</h2>
                  <div className="rt-tags" role="group" aria-label="Highlights (optional)">
                    {HIGHLIGHTS.map((t) => (
                      <button type="button" key={t} aria-pressed={tags.includes(t)} className={tags.includes(t) ? 'on' : ''} onClick={() => setTags((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]))}>
                        {tags.includes(t) ? <Icon name="check" size={14} stroke={2.6} /> : <Icon name="sparkle" size={14} />} {t}
                      </button>
                    ))}
                  </div>
                  <div className={`rt-field ${errs.text ? 'err' : ''}`}>
                    <label htmlFor="rt-text">Your review <i>*</i></label>
                    <textarea id="rt-text" rows={3} maxLength={1000} value={f.text} onChange={(e) => set('text', e.target.value)} placeholder="What did we do well? What could we do better?" aria-invalid={Boolean(errs.text)} />
                    <span className="rt-count">{f.text.trim().length}/20+</span>
                    {errs.text ? <p className="f-err" role="alert">{errs.text}</p> : null}
                  </div>
                  <div className="rt-row">
                    <div className={`rt-field ${errs.name ? 'err' : ''}`}>
                      <label htmlFor="rt-name">First name <i>*</i></label>
                      <input id="rt-name" autoComplete="given-name" maxLength={40} value={f.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errs.name)} />
                      {errs.name ? <p className="f-err" role="alert">{errs.name}</p> : null}
                    </div>
                    <div className={`rt-field ${errs.country ? 'err' : ''}`}>
                      <label htmlFor="rt-country">Country <i>*</i></label>
                      <select id="rt-country" value={f.country} onChange={(e) => set('country', e.target.value)} aria-invalid={Boolean(errs.country)}>
                        <option value="">Select</option>
                        {COUNTRIES.map((c) => <option key={c.iso} value={c.iso}>{c.name}</option>)}
                      </select>
                      {errs.country ? <p className="f-err" role="alert">{errs.country}</p> : null}
                    </div>
                  </div>
                  <div className="rt-row">
                    <div className={`rt-field ${errs.company ? 'err' : ''}`}>
                      <label htmlFor="rt-company">Company <small>(optional)</small></label>
                      <input id="rt-company" autoComplete="organization" maxLength={60} value={f.company} onChange={(e) => set('company', e.target.value)} aria-invalid={Boolean(errs.company)} />
                      {errs.company ? <p className="f-err" role="alert">{errs.company}</p> : null}
                    </div>
                    <div className={`rt-field ${errs.email ? 'err' : ''}`}>
                      <label htmlFor="rt-email">Email <i>*</i> <small>(never shown)</small></label>
                      <input id="rt-email" type="email" autoComplete="email" maxLength={120} value={f.email} onChange={(e) => set('email', e.target.value)} aria-invalid={Boolean(errs.email)} />
                      {errs.email ? <p className="f-err" role="alert">{errs.email}</p> : null}
                    </div>
                  </div>
                  <div className="hp" aria-hidden="true"><label htmlFor="rt-web">Website</label><input id="rt-web" tabIndex={-1} value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></div>
                  <label className={`rt-consent ${errs.consent ? 'err' : ''}`}>
                    <input type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} />
                    <span>I agree that MyFrequentRewards may store these details and contact me about my review (<Link to="/privacy" onClick={close}>Privacy Policy</Link>). My first name, country, company (if given), rating and review may be published as a member testimonial on this website. My email is never shown.</span>
                  </label>
                  {errs.consent ? <p className="f-err" role="alert">{errs.consent}</p> : null}
                  {status === 'error' ? <p className="form-error" role="alert">We couldn’t send your review. Please try again.</p> : null}
                  <div className="rt-actions">
                    <button type="button" className="btn btn-ghost-dark" onClick={() => setStep(1)}>Back</button>
                    <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Send my review <Icon name="send" size={16} /></>}</button>
                  </div>
                </form>
              ) : null}

              {step === 3 ? (
                <div className="rt-pane rt-done" key="s3">
                  <div className="rt-stamp" aria-hidden="true">RECEIVED<small>with thanks</small></div>
                  <h2 id="rt-title">Thank you, {f.name.split(' ')[0]}!</h2>
                  <p className="muted">{live ? 'Your review is now part of our member testimonials — with your name, flag and rating.' : 'Your review will join our member testimonials after a quick automated check.'}</p>
                  <Link to={{ pathname: '/', hash: '#voices' }} className="rt-see" onClick={close}><Icon name="chat" size={16} /> See it in member testimonials <Icon name="arrow" size={14} /></Link>
                  <p className="muted rt-follow">Follow us for survey drops and payout tips:</p>
                  <ul className="rt-qr">
                    {SOCIALS.map((s) => (
                      <li key={s.id} style={{ '--sc': s.color }}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer">
                          <img src={s.qr} alt={`QR code for MyFrequentRewards on ${s.name}`} width="84" height="84" loading="lazy" />
                          <span><Icon name={s.id} size={14} /> {s.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="btn btn-dark" onClick={close}>Back to the site</button>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
