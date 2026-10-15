// "Rate your experience": always-visible side tab + a modal that opens itself occasionally
// (never on arrival: first after ~45 s of browsing or 40% scroll, then at most twice more per session,
// spaced several minutes apart, and never again after a review is submitted).
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { Field, CountrySelect, PhoneInput } from './FormKit.jsx';
import { validateEmail, validateName, validatePhone, store, session, pop, track } from '../utils/helpers.js';
import { submitReview } from '../utils/reviews.js';
import { countryByCode } from '../data/countries.js';
import { Link } from '../router.jsx';
import { Flag } from './ui.jsx';

const ROLES = [
  { id: 'hcp', label: 'Healthcare Professional', sub: 'Doctor, nurse, pharmacist, allied health, admin…', icon: 'stethoscope', ask: 'Take our pulse' },
  { id: 'caregiver', label: 'Caregiver', sub: 'Family & care support', icon: 'hands', ask: 'Fill our heart' },
  { id: 'patient', label: 'Patient', sub: 'Lived experience', icon: 'heart', ask: 'Raise our sun' },
];
const STEPS = ['You', 'Rate', 'About you', 'Review'];
const MOODS = {
  hcp: ['Pick a reading', 'Critical', 'Needs work', 'Stable', 'Strong', 'Excellent'],
  caregiver: ['Pick a level', 'Running on empty', 'A little low', 'Half full', 'Warm', 'Full of love'],
  patient: ['Pick the sky', 'Stormy', 'Cloudy', 'Clearing up', 'Sunny', 'Shining bright'],
  none: ['Choose who you are', '', '', '', '', ''],
};

/* ---- role-specific rating instruments (r = 0..5) ---- */
function PulseGauge({ r }) {
  const ang = -90 + (r ? (r - 3) * 34 : -80);
  const amp = 6 + r * 7;
  const seg = (i) => {
    const a0 = Math.PI * (1 + i / 5) + 0.03, a1 = Math.PI * (1 + (i + 1) / 5) - 0.03;
    const P = (a, R) => [120 + R * Math.cos(a), 128 + R * Math.sin(a)].map((n) => n.toFixed(1)).join(' ');
    return `M${P(a0, 96)} A96 96 0 0 1 ${P(a1, 96)} L${P(a1, 70)} A70 70 0 0 0 ${P(a0, 70)} Z`;
  };
  return (
    <svg viewBox="0 0 240 200" className="ri ri-gauge" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={seg(i)} className={`rg-seg s${i + 1} ${r > i ? 'on' : ''}`} />)}
      <g className="rg-needle" style={{ transform: `rotate(${ang}deg)` }}><path d="M117 128 L120 44 L123 128 Z" /><circle cx="120" cy="128" r="10" /></g>
      <text x="120" y="112" textAnchor="middle" className="rg-val">{r || '–'}<tspan className="rg-of">/5</tspan></text>
      <path className="rg-ecg" style={{ '--amp': amp }} d={`M10 176 H70 l8 -${amp / 2} 8 ${amp / 2} H100 l6 -${amp} 8 ${amp * 1.8} 8 -${amp * 1.1} 6 ${amp * 0.3} H160 l8 -${amp / 3} 8 ${amp / 3} H230`} pathLength="100" />
    </svg>
  );
}

function HeartFill({ r }) {
  const level = 168 - r * 30;
  return (
    <svg viewBox="0 0 220 200" className="ri ri-heart" aria-hidden="true">
      <defs>
        <clipPath id="rh-clip"><path d="M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z" /></clipPath>
      </defs>
      <path d="M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z" className="rh-shell" />
      <g clipPath="url(#rh-clip)">
        <g className="rh-liquid" style={{ transform: `translateY(${level}px)` }}>
          <path className="rh-wave" d="M-40 6 Q-20 -6 0 6 T40 6 T80 6 T120 6 T160 6 T200 6 T240 6 T280 6 V220 H-40z" />
          <path className="rh-wave b" d="M-40 10 Q-20 0 0 10 T40 10 T80 10 T120 10 T160 10 T200 10 T240 10 T280 10 V220 H-40z" />
        </g>
        {r >= 3 && [0, 1, 2, 3].map((i) => <circle key={i} className="rh-bub" style={{ '--i': i }} cx={70 + i * 26} cy="170" r={3 + (i % 2) * 2} />)}
      </g>
      <path d="M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z" className="rh-outline" />
      <path d="M44 52c4-12 14-20 26-20" className="rh-gloss" />
      <text x="110" y="104" textAnchor="middle" className="rh-pct">{r * 20}%</text>
    </svg>
  );
}

function Sunrise({ r }) {
  const cx = 34 + r * 34, cy = 150 - r * 22;
  return (
    <svg viewBox="0 0 240 200" className={`ri ri-sun sky-${r}`} aria-hidden="true">
      <rect x="0" y="0" width="240" height="200" rx="24" className="rs-sky" />
      <g className="rs-sunwrap" style={{ transform: `translate(${cx}px, ${cy}px)` }}>
        <g className="rs-rays">{Array.from({ length: 12 }).map((_, i) => <rect key={i} x="-2" y="-40" width="4" height="12" rx="2" transform={`rotate(${i * 30})`} />)}</g>
        <circle r="22" className="rs-sun" />
      </g>
      {r <= 2 && <g className="rs-rain">{Array.from({ length: 10 }).map((_, i) => <line key={i} x1={20 + i * 22} y1="40" x2={14 + i * 22} y2="56" style={{ '--i': i }} />)}</g>}
      <g className="rs-cloud c1" style={{ opacity: r >= 5 ? 0 : 1 }}><ellipse cx="60" cy="48" rx="30" ry="14" /><ellipse cx="80" cy="40" rx="20" ry="14" /></g>
      <g className="rs-cloud c2" style={{ opacity: r >= 4 ? 0 : 1 }}><ellipse cx="170" cy="30" rx="28" ry="12" /><ellipse cx="188" cy="24" rx="16" ry="10" /></g>
      {r >= 4 && <g className="rs-birds"><path d="M150 70q6-6 12 0q6-6 12 0" /><path d="M176 56q5-5 10 0q5-5 10 0" /></g>}
      <path d="M0 160 Q50 120 100 150 T200 140 T240 150 V200 H0z" className="rs-hill h1" />
      <path d="M0 176 Q70 146 130 170 T240 166 V200 H0z" className="rs-hill h2" />
    </svg>
  );
}
const INSTRUMENT = { hcp: PulseGauge, caregiver: HeartFill, patient: Sunrise };

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', phoneCc: 'in', company: '', designation: '', country: '', role: '', rating: 0, text: '' };

export const openRateExperience = () => window.dispatchEvent(new Event('mho-open-rate'));

/** suppressed: hide the tab and skip auto-prompts (used on the sign-up and log-in pages). */
export default function RateExperience({ suppressed = false }) {
  const suppressedRef = useRef(suppressed);
  suppressedRef.current = suppressed;
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [hoverR, setHoverR] = useState(0);
  const [step, setStep] = useState(0);
  const [state, setState] = useState('form'); // form | sending | done
  const [submitErr, setSubmitErr] = useState('');
  const dialog = useRef(null);
  const lastFocus = useRef(null);

  const set = (k) => (v) => { setF((s) => ({ ...s, [k]: v && v.target ? v.target.value : v })); setErr((e) => (e[k] ? Object.fromEntries(Object.entries(e).filter(([x]) => x !== k)) : e)); };

  // Gentle auto-prompt
  useEffect(() => {
    if (store.get('mho-reviewed')) return;
    const start = Date.now();
    let maxScroll = 0;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) maxScroll = Math.max(maxScroll, window.scrollY / h);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = setInterval(() => {
      const shown = session.get('mho-rate-shown', 0);
      const last = session.get('mho-rate-last', 0);
      const elapsed = (Date.now() - start) / 1000;
      const busy = document.documentElement.classList.contains('menu-open') || document.querySelector('.chat-win.is-open') || document.querySelector('.modal.is-open');
      if (store.get('mho-reviewed') || shown >= 3 || busy || suppressedRef.current) return;
      const ready = shown === 0 ? (elapsed > 45 && maxScroll > 0.4) || elapsed > 80 : Date.now() - last > 4 * 60 * 1000;
      if (ready) {
        session.set('mho-rate-shown', shown + 1);
        session.set('mho-rate-last', Date.now());
        openModal('auto');
      }
    }, 5000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onOpen = () => openModal('link');
    window.addEventListener('mho-open-rate', onOpen);
    return () => window.removeEventListener('mho-open-rate', onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (src = 'tab') => {
    lastFocus.current = document.activeElement;
    setOpen(true);
    setState((s) => (s === 'done' ? 'done' : 'form'));
    pop(0.1);
    track('review_prompt_open', { source: src });
  };
  const close = () => {
    setOpen(false);
    session.set('mho-rate-last', Date.now());
    setTimeout(() => lastFocus.current?.focus?.(), 50);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && dialog.current) {
        const els = dialog.current.querySelectorAll('button, input, textarea, select, a[href]');
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => dialog.current?.querySelector('.rj-role input, .rj-rate button')?.focus(), 80);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const validate = (only) => {
    const e = {};
    if (!f.rating) e.rating = 'Pick a face to rate your experience.';
    const fn = validateName(f.firstName, 'first name');
    if (fn) e.firstName = fn;
    const ln = validateName(f.lastName, 'last name', false);
    if (ln) e.lastName = ln;
    const em = validateEmail(f.email);
    if (em) e.email = em;
    if (!f.company.trim()) e.company = 'Please enter your company or organisation.';
    if (!f.designation.trim()) e.designation = 'Please enter your designation.';
    if (!f.country) e.country = 'Please choose your country.';
    if (!f.role) e.role = 'Tell us which member type you are.';
    if (f.text.trim().length < 20) e.text = 'Please write at least 20 characters so others can learn from your review.';
    const ph = validatePhone(f.phone, f.phoneCc, false);
    if (ph) e.phone = ph;
    if (only === 0) return Object.fromEntries(Object.entries(e).filter(([k]) => k === 'role'));
    if (only === 1) return Object.fromEntries(Object.entries(e).filter(([k]) => k === 'rating'));
    if (only === 2) return Object.fromEntries(Object.entries(e).filter(([k]) => ['firstName', 'lastName', 'email', 'company', 'designation', 'country', 'phone'].includes(k)));
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErr(e);
    if (Object.keys(e).length) return;
    pop(0.06);
    setStep((x) => Math.min(x + 1, 3));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (step < 3) return next();
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      if (e.role) setStep(0);
      else if (e.rating) setStep(1);
      else if (!e.text) setStep(2);
      return;
    }
    setState('sending');
    setSubmitErr('');
    const res = await submitReview({
      ...f,
      phone: f.phone ? `${countryByCode(f.phoneCc)?.dial || ''} ${f.phone}` : '',
      countryName: countryByCode(f.country)?.name,
    });
    if (!res.ok) {
      setState('form');
      setSubmitErr(res.message);
      return;
    }
    store.set('mho-reviewed', true);
    track('review_submitted', { rating: f.rating, role: f.role });
    setState('done');
    pop(0.16);
  };

  const r = step === 1 ? hoverR || f.rating : f.rating;
  const role = ROLES.find((x) => x.id === f.role);
  const moods = MOODS[f.role || 'none'];
  const Instrument = INSTRUMENT[f.role] || PulseGauge;

  return (
    <>
      {!suppressed && (
        <button className="rate-tab" onClick={() => openModal('tab')} aria-haspopup="dialog">
          <span className="rate-tab-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={12} fill="currentColor" style={{ '--i': i }} />)}
          </span>
          <span className="rate-tab-text">Rate your experience</span>
        </button>
      )}

      <div className={`modal rate-modal rj4 ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="modal-backdrop" onClick={close} />
        <div className={`rj4-dialog r-${r || 0} ${f.role ? 'rgrade-' + f.role : 'rgrade-none'}`} role="dialog" aria-modal="true" aria-labelledby="rate-title" ref={dialog}>
          <button className="modal-x" onClick={close} aria-label="Close"><Icon name="x" size={20} /></button>

          {/* Left: role-specific animated instrument */}
          <aside className="rj4-stage" aria-hidden="true">
            <span className="rjs-glow" />
            {f.role ? (
              <div className="rjs-inst" key={f.role}>
                <Instrument r={r} />
                <span className="rjs-mood">{moods[r]}</span>
              </div>
            ) : (
              <div className="rjs-trio">
                {ROLES.map((ro, i) => <span key={ro.id} className={`rjs-orb t-${ro.id}`} style={{ '--i': i }}><Icon name={ro.icon} size={26} /></span>)}
                <span className="rjs-mood">Your voice, 60 seconds</span>
              </div>
            )}
            {step >= 2 && state !== 'done' && (
              <div className="rjs-preview">
                <span className="rjp-top">
                  <span className="rjp-av">{(f.firstName || '?').slice(0, 1).toUpperCase()}</span>
                  <span className="rjp-who"><b>{f.firstName || 'Your name'} {f.lastName ? f.lastName[0] + '.' : ''}</b><small>{[f.designation, f.company].filter(Boolean).join(', ') || 'Your designation'}</small></span>
                  {f.country && <Flag code={f.country} size={22} />}
                </span>
                <span className="rjp-stars">{[1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" size={13} fill={n <= f.rating ? 'currentColor' : 'none'} />)}</span>
                <p>{f.text || 'Your review appears here as you type…'}</p>
              </div>
            )}
          </aside>

          {/* Right: form */}
          <div className="rj4-main">
            {state === 'done' ? (
              <div className="rj-done">
                <div className="rd-burst" aria-hidden="true">{Array.from({ length: 16 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
                <span className="rjd-badge" aria-hidden="true"><Icon name="check" size={30} stroke={3} /></span>
                <h2 id="rate-title">Thank you, {f.firstName || 'friend'}!</h2>
                <p>Your review shows in the member voices on this device straight away, and for everyone once our team has approved it.</p>
                <Link to="/reviews" className="btn btn-primary" onClick={close}><span className="btn-label">See member reviews</span><Icon name="arrow" size={18} /></Link>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <header className="rj4-head">
                  <ol className="rj4-steps" aria-label="Progress">
                    {STEPS.map((st, i) => (
                      <li key={st} className={i === step ? 'on' : i < step ? 'done' : ''}>
                        <button type="button" onClick={() => i < step && setStep(i)} disabled={i > step} aria-label={`Step ${i + 1}: ${st}`}>
                          <span>{i < step ? <Icon name="check" size={11} stroke={3.5} /> : i + 1}</span><em>{st}</em>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <h2 id="rate-title">{step === 0 ? 'Rate your experience' : step === 1 ? (role ? role.ask : 'Your rating') : step === 2 ? 'Who should we credit?' : 'Tell other members what it’s like'}</h2>
                  <p>{step === 0 ? 'First, tell us who you are. Each member type rates us in its own way.' : step === 1 ? 'Tap a level from 1 to 5.' : step === 2 ? 'Your email and phone stay private.' : 'A few honest lines help other members decide.'}</p>
                </header>

                <div className="rj4-body" key={step}>
                  {step === 0 && (
                    <fieldset className="rj-roles4">
                      <legend className="sr-only">I am a</legend>
                      {ROLES.map((ro) => (
                        <label key={ro.id} className={`rj-role4 t-${ro.id} ${f.role === ro.id ? 'on' : ''}`}>
                          <input type="radio" name="rate-role" value={ro.id} checked={f.role === ro.id} onChange={() => set('role')(ro.id)} />
                          <span className="rr-ic"><Icon name={ro.icon} size={22} /></span>
                          <span className="rr-t"><b>{ro.label}</b><small>{ro.sub}</small></span>
                          <span className="rr-tick" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>
                        </label>
                      ))}
                      {err.role && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.role}</p>}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <>
                      <div className="rj-rate" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHoverR(0)}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={f.rating === n}
                            aria-label={`${n} out of 5: ${moods[n]}`}
                            className={`rr-btn ${n === f.rating ? 'on' : ''} ${n <= r ? 'lit' : ''}`}
                            style={{ '--n': n }}
                            onMouseEnter={() => setHoverR(n)}
                            onFocus={() => setHoverR(n)}
                            onBlur={() => setHoverR(0)}
                            onClick={() => { set('rating')(n); pop(0.05 + n * 0.01); }}
                          >
                            <span className="rrb-ic"><Icon name={f.role === 'hcp' ? 'pulse' : f.role === 'caregiver' ? 'heart' : 'sun'} size={18} fill={f.role === 'caregiver' && n <= r ? 'currentColor' : 'none'} /></span>
                            <b>{n}</b>
                          </button>
                        ))}
                      </div>
                      <p className="rj-mood4" aria-live="polite">{moods[r]}</p>
                      {err.rating && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.rating}</p>}
                    </>
                  )}

                  {step === 2 && (
                    <div className="rj-fields">
                      <div className="form-row">
                        <Field label="First name" required htmlFor="rv-fn" error={err.firstName}>
                          <input id="rv-fn" value={f.firstName} onChange={set('firstName')} autoComplete="given-name" aria-invalid={!!err.firstName} />
                        </Field>
                        <Field label="Last name" htmlFor="rv-ln" error={err.lastName}>
                          <input id="rv-ln" value={f.lastName} onChange={set('lastName')} autoComplete="family-name" />
                        </Field>
                      </div>
                      <Field label="Email" required htmlFor="rv-em" error={err.email} hint="Never shown publicly." icon="mail">
                        <input id="rv-em" type="email" value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={!!err.email} />
                      </Field>
                      <div className="form-row">
                        <Field label="Company name" required htmlFor="rv-co" error={err.company} icon="building">
                          <input id="rv-co" value={f.company} onChange={set('company')} autoComplete="organization" aria-invalid={!!err.company} />
                        </Field>
                        <Field label="Designation" required htmlFor="rv-de" error={err.designation} icon="briefcase">
                          <input id="rv-de" value={f.designation} onChange={set('designation')} autoComplete="organization-title" aria-invalid={!!err.designation} />
                        </Field>
                      </div>
                      <div className="form-row">
                        <Field label="Country" required htmlFor="rv-ct" error={err.country} icon="globe">
                          <CountrySelect id="rv-ct" value={f.country} onChange={(c) => { setF((s) => ({ ...s, country: c, phoneCc: s.phone ? s.phoneCc : c })); setErr((e) => ({ ...e, country: undefined })); }} invalid={!!err.country} />
                        </Field>
                        <Field label="Phone number" htmlFor="rv-ph" error={err.phone} icon="phone">
                          <PhoneInput id="rv-ph" country={f.phoneCc} onCountry={set('phoneCc')} value={f.phone} onChange={set('phone')} invalid={!!err.phone} />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <Field label="Your review" required htmlFor="rv-tx" error={err.text}>
                      <textarea id="rv-tx" rows={6} value={f.text} onChange={set('text')} maxLength={600} placeholder="What did you enjoy? What could be better?" aria-invalid={!!err.text} />
                      <span className="char-count">{f.text.length}/600</span>
                    </Field>
                  )}
                </div>

                {submitErr && <p className="form-alert" role="alert">{submitErr}</p>}
                <footer className="rj-foot">
                  {step > 0 ? <button type="button" className="btn btn-ghost" onClick={() => { setErr({}); setStep(step - 1); }}><Icon name="arrowLeft" size={18} /><span className="btn-label">Back</span></button> : <span className="rj-privacy"><Icon name="lock" size={12} /> Email and phone stay private</span>}
                  <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
                    <span className="btn-label">{step < 3 ? 'Continue' : state === 'sending' ? 'Publishing…' : 'Publish my review'}</span>
                    <Icon name={step < 3 ? 'arrow' : 'send'} size={18} />
                  </button>
                </footer>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
