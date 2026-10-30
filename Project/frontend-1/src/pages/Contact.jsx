import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import Persona from '../components/Persona.jsx';
import { Breadcrumbs, LiveZone, useMounted } from '../components/ui.jsx';
import { Field, PhoneInput, Captcha } from '../components/FormKit.jsx';
import { SITE, whatsappLink, API } from '../config/site.js';
import { validateEmail, validateName, validatePhone, postJSON, track, detectCountry } from '../utils/helpers.js';
import { countryByCode } from '../data/countries.js';
import { Link } from '../router.jsx';

const TOPICS = [
  ['user', 'Joining & my account'],
  ['clipboard', 'A survey I took'],
  ['coins', 'Rewards & payouts'],
  ['lock', 'Privacy & data'],
  ['briefcase', 'Research partnership'],
  ['chat', 'Something else'],
];

const CHANNELS = [
  { ic: 'whatsapp', t: 'WhatsApp', v: SITE.whatsappDisplay, href: whatsappLink(), c1: '#25d366', c2: '#0e9f6e', status: 'Fastest replies', live: true },
  { ic: 'mail', t: 'Email', v: SITE.email, href: `mailto:${SITE.email}`, c1: '#2457f5', c2: '#8a4dff', status: 'Screenshots welcome' },
  { ic: 'call', t: 'Phone', v: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}`, c1: '#ff6a2c', c2: '#ef2d56', status: 'Monday to Saturday' },
  { ic: 'chat', t: 'Live help', v: 'Answers in seconds', href: null, c1: '#ffb020', c2: '#ff6a2c', status: 'Open 24/7', live: true },
];

const EMPTY = { name: '', email: '', phone: '', cc: 'in', topic: '', message: '', website: '' };

function DelhiClock() {
  const mounted = useMounted();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, weekday: 'long' })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  const h = Number(parts.hour) % 12, m = Number(parts.minute), s = Number(parts.second);
  return (
    <div className="dclock">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="56" className="dc-face" />
        {Array.from({ length: 12 }).map((_, i) => <line key={i} x1="60" y1="10" x2="60" y2={i % 3 ? 16 : 20} transform={`rotate(${i * 30} 60 60)`} className="dc-tick" />)}
        {mounted && (
          <>
            <line x1="60" y1="60" x2="60" y2="32" className="dc-h" transform={`rotate(${h * 30 + m / 2} 60 60)`} />
            <line x1="60" y1="60" x2="60" y2="20" className="dc-m" transform={`rotate(${m * 6 + s / 10} 60 60)`} />
            <line x1="60" y1="66" x2="60" y2="16" className="dc-s" transform={`rotate(${s * 6} 60 60)`} />
          </>
        )}
        <circle cx="60" cy="60" r="4" className="dc-pin" />
      </svg>
      <div>
        <small>Right now in New Delhi</small>
        <b>{mounted ? `${parts.hour}:${parts.minute}` : '--:--'}</b>
        <span>{mounted ? parts.weekday : ''} · our support team is based here</span>
      </div>
    </div>
  );
}

export default function Contact() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [human, setHuman] = useState(false);
  const [capKey, setCapKey] = useState(0);
  const [state, setState] = useState('form');
  const [alert, setAlert] = useState('');
  const [focus, setFocus] = useState(false);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
  const ccTouched = useRef(false); // the person picked a phone country themselves
  const ccDetected = useRef(''); // the visitor's country from the IP address

  // Phone country code from the visitor's IP, same call as the sign-up page. Never overrides a choice already made.
  useEffect(() => {
    let live = true;
    detectCountry().then((code) => {
      if (!live || !code || !countryByCode(code)) return;
      ccDetected.current = code;
      if (!ccTouched.current) setF((s) => ({ ...s, cc: code }));
    });
    return () => { live = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const n = validateName(f.name, 'name'); if (n) x.name = n;
    const em = validateEmail(f.email); if (em) x.email = em;
    const ph = validatePhone(f.phone, f.cc, false); if (ph) x.phone = ph;
    if (!f.topic) x.topic = 'Choose what your message is about.';
    if (f.message.trim().length < 15) x.message = 'Add a little more detail (at least 15 characters).';
    if (!human) x.captcha = 'Complete the human check.';
    setErr(x);
    if (Object.keys(x).length) return;
    if (f.website) return; // honeypot: bots fill hidden fields
    setState('sending');
    setAlert('');
    const res = await postJSON(API.contact, {
      name: f.name.trim(), email: f.email.trim(), phone: f.phone ? `${countryByCode(f.cc)?.dial} ${f.phone}` : '',
      topic: f.topic, message: f.message.trim().slice(0, 2000), source: 'contact-page',
    });
    if (!res.ok || res.data?.status === 'error') {
      setState('form');
      setAlert(res.data?.message || 'Your message didn’t go through. Try again, or reach us on WhatsApp or email.');
      setCapKey((k) => k + 1);
      return;
    }
    track('contact_submit', { topic: f.topic });
    setState('flying');
    setTimeout(() => setState('done'), 1500);
  };

  return (
    <>
      <section className="c3-hero">
        <div className="c3-bg" aria-hidden="true"><i /><i /><i /></div>
        <div className="container c3-hero-in">
          <div className="c3-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'Contact' }]} />
            <h1 className="hero-title">Contact MyHealthOpinions. <span className="c3-hl">A real person replies.</span></h1>
            <p className="c3-lead">Questions about joining, a survey, your rewards or a research partnership? Pick the channel you like best. Most messages are answered within one working day, and the help assistant never sleeps.</p>
            <DelhiClock />
          </div>
          <ul className="c3-tiles">
            {CHANNELS.map((c, i) => {
              const inner = (
                <>
                  <span className="ct-ic"><Icon name={c.ic} size={30} />{c.live && <i className="ct-live" />}</span>
                  <span className={`ct-fx fx-${c.ic}`} aria-hidden="true">{c.ic === 'whatsapp' ? <><b /><b /><b /></> : c.ic === 'mail' ? '1' : c.ic === 'call' ? <><i /><i /></> : <><i /><i /></>}</span>
                  <b>{c.t}</b>
                  <span className="ct-v">{c.v}</span>
                  <em><span className="dot" /> {c.status}</em>
                  <span className="ct-go"><Icon name="arrow" size={16} /></span>
                </>
              );
              return (
                <li key={c.t} style={{ '--c1': c.c1, '--c2': c.c2, '--i': i }}>
                  {c.href ? (
                    <a className="ct" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>
                  ) : (
                    <button type="button" className="ct" onClick={() => document.querySelector('.fab-chat')?.click()}>{inner}</button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section c3-main">
        <div className="container c3-grid">
          <div className={`letter4 ${focus ? 'is-open' : ''} ${state === 'flying' ? 'is-flying' : ''}`}>
            <span className="l4-plane" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 2 2 9.5l7 3 3 7z" /><path d="M22 2 9 12.5" /></svg></span>
            <div className="env3-letter l4-paper">
              <span className="l4-postmark" aria-hidden="true"><b>MHO</b><small>New Delhi</small></span>
              {state === 'done' ? (
                <div className="sent3">
                  <span className="s3-stamp" aria-hidden="true"><Icon name="check" size={34} stroke={3} /></span>
                  <h2>Message delivered <span className="ticks" aria-hidden="true">✓✓</span></h2>
                  <p>Thanks, {f.name.split(' ')[0]}. We’ll reply to {f.email}, usually within one working day.</p>
                  <button className="btn btn-ghost" onClick={() => { setF({ ...EMPTY, cc: ccDetected.current || EMPTY.cc }); ccTouched.current = false; setState('form'); setHuman(false); setCapKey((k) => k + 1); setFocus(false); }}><span className="btn-label">Write another message</span></button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate onFocus={() => setFocus(true)}>
                  <div className="l3-head">
                    <span className="l3-av"><Persona kind="nurse" skin={4} hair={1} hairStyle={1} size={44} /></span>
                    <div><h2>Write to us</h2><p>Dear MyHealthOpinions team…</p></div>
                    <span className="l3-stamp" aria-hidden="true"><Icon name="heart" size={20} fill="currentColor" stroke={1} /></span>
                  </div>
                  <fieldset className="t3-topics">
                    <legend>What’s it about? <b aria-hidden="true">*</b></legend>
                    <div>
                      {TOPICS.map(([ic, t], i) => (
                        <label key={t} className={f.topic === t ? 'on' : ''} style={{ '--tc': ['#2457f5', '#00a88a', '#ff6a2c', '#8a4dff', '#0ea5e9', '#ef2d56'][i] }}>
                          <input type="radio" name="topic" value={t} checked={f.topic === t} onChange={() => set('topic')(t)} />
                          <Icon name={ic} size={18} />{t}
                        </label>
                      ))}
                    </div>
                    {err.topic && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.topic}</p>}
                  </fieldset>
                  <div className="form-row">
                    <Field label="Full name" required htmlFor="ct-name" error={err.name} icon="user">
                      <input id="ct-name" value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.name} />
                    </Field>
                    <Field label="Email" required htmlFor="ct-email" error={err.email} icon="mail">
                      <input id="ct-email" type="email" value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={!!err.email} />
                    </Field>
                  </div>
                  <Field label="Phone" htmlFor="ct-phone" error={err.phone} icon="phone">
                    <PhoneInput id="ct-phone" country={f.cc} onCountry={(v) => { ccTouched.current = true; set('cc')(v); }} value={f.phone} onChange={set('phone')} invalid={!!err.phone} />
                  </Field>
                  <Field label="Your message" required htmlFor="ct-msg" error={err.message} icon="pen">
                    <textarea id="ct-msg" rows={5} value={f.message} onChange={set('message')} maxLength={2000} aria-invalid={!!err.message} placeholder="Tell us what happened. Please leave out passwords and medical record numbers." />
                  </Field>
                  <div className="hp" aria-hidden="true">
                    <label htmlFor="ct-web">Website</label>
                    <input id="ct-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
                  </div>
                  <Captcha onChange={setHuman} invalid={!!err.captcha} resetKey={capKey} />
                  {err.captcha && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.captcha}</p>}
                  {alert && <p className="form-alert" role="alert">{alert}</p>}
                  <button className="btn btn-primary btn-block" type="submit" disabled={state !== 'form'}>
                    <span className="btn-label">{state === 'sending' ? 'Sending…' : 'Send my message'}</span>
                    <Icon name="send" size={18} />
                  </button>
                  <p className="form-fine"><Icon name="lock" size={12} /> We only use your details to reply. See our <Link to="/privacy">Privacy Policy</Link>.</p>
                </form>
              )}
            </div>
          </div>

          <aside className="c3-side">
            <LiveZone className="radar-map">
              <span className="rm-grid" aria-hidden="true" />
              <span className="rm-sweep" aria-hidden="true" />
              {[0, 1, 2].map((i) => <span key={i} className="rm-ring" style={{ '--i': i }} aria-hidden="true" />)}
              <span className="rm-pin" aria-hidden="true"><Icon name="pin" size={34} /></span>
              <span className="rm-label">Mangolpur Kalan, New Delhi</span>
            </LiveZone>
            <div className="c3-office">
              <h2>Our office</h2>
              <p>{SITE.legalName}<br />{SITE.address.join(', ')}</p>
              <a className="text-link" href="https://maps.google.com/?q=Mangolpur+Kalan+New+Delhi+110085" target="_blank" rel="noopener noreferrer">Open in Google Maps <Icon name="external" size={13} /></a>
            </div>
            <div className="c3-quick">
              <h3>Faster than a message</h3>
              <ul>
                <li><Link to="/faq"><Icon name="coins" size={16} />When will I get paid?</Link></li>
                <li><Link to="/faq"><Icon name="filter" size={16} />Why was I screened out?</Link></li>
                <li><Link to="/faq"><Icon name="lock" size={16} />How do I delete my account?</Link></li>
                <li><Link to="/rewards"><Icon name="wallet" size={16} />Which payout options do I have?</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
