import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Captcha from '../components/Captcha.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { CONTACT, whatsappLink } from '../data/site.js';
import { validateContact } from '../utils/validate.js';
import { postJSON } from '../utils/api.js';

const page = PAGES.contact;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact Us', path: page.path }];
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Mangolpur+Kalan+New+Delhi+110085';

const FAQS = [
  { q: 'What is the fastest way to reach support?', a: 'Live Help 24/7 gives instant answers, and WhatsApp connects you with our team.' },
  { q: 'What should I include in a reward query?', a: 'Your registered email and the approximate claim date — never your password or OTP.' },
  { q: 'Do you offer phone support?', a: `Yes, you can call ${CONTACT.phone} during business hours.` },
  { q: 'How do I report a scam using your name?', a: 'Forward the message to our support email so we can investigate.' },
  { q: 'Can I request my data or account deletion here?', a: 'Yes — choose “Privacy & data” as the topic and we will verify and process your request.' },
];

// Channel deck — the meter shows typical response speed (visual, relative).
const CHANNELS = [
  { id: 'chat', icon: 'chat', t: 'Live Help', sub: '24/7 · instant answers', best: 'Quick questions, any hour', speed: 'Instant', meter: 1, cta: 'Start chat', action: 'chat', c: '#FF8A00', c2: '#FF5E7E' },
  { id: 'wa', icon: 'whatsapp', t: 'WhatsApp', sub: CONTACT.whatsappDisplay, best: 'Account & reward help', speed: 'Minutes', meter: 0.8, cta: 'Open WhatsApp', href: whatsappLink(), c: '#25D366', c2: '#128C7E' },
  { id: 'mail', icon: 'mail', t: 'Email', sub: CONTACT.email, best: 'Detailed queries & data requests', speed: '1 business day', meter: 0.45, cta: 'Write an email', href: `mailto:${CONTACT.email}`, c: '#2F6BFF', c2: '#8B5CF6' },
  { id: 'phone', icon: 'phone', t: 'Phone', sub: CONTACT.phone, best: 'Talk it through', speed: 'Business hours', meter: 0.6, cta: 'Call now', href: CONTACT.phoneHref, c: '#8B5CF6', c2: '#E8457A' },
];

const TOPICS = [
  { t: 'Sign-up & verification', icon: 'user', c: '#FF8A00' },
  { t: 'Surveys & invitations', icon: 'clipboard', c: '#2F6BFF' },
  { t: 'Rewards & payouts', icon: 'wallet', c: '#E5A100' },
  { t: 'Privacy & data', icon: 'lock', c: '#14C9B5' },
  { t: 'Business / professional profile', icon: 'briefcase', c: '#8B5CF6' },
  { t: 'Something else', icon: 'chat', c: '#E8457A' },
];

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', topic: '', message: '', captchaOk: false, website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const capRef = useRef(null);
  const formRef = useRef(null);
  const set = (k, val) => {
    const n = { ...v, [k]: val };
    setV(n);
    if (status === 'tried') setErrors(validateContact(n));
  };
  const pickTopic = (t) => {
    set('topic', t);
    if (formRef.current && window.matchMedia('(max-width: 960px)').matches) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  async function submit(e) {
    e.preventDefault();
    const es = validateContact(v);
    setErrors(es);
    setStatus('tried');
    if (v.website || Object.keys(es).length) return;
    setStatus('sending');
    try {
      await postJSON(ENDPOINT, { name: v.name.trim(), email: v.email.trim(), topic: v.topic, message: v.message.trim().slice(0, 2000), captchaToken: capRef.current?.token?.() });
      setStatus('done');
    } catch {
      setStatus('error');
      capRef.current?.refresh();
    }
  }

  const openChat = () => document.querySelector('.dock-chat')?.click();
  const fld = (k) => `cf-field ${errors[k] ? 'bad' : ''} ${v[k] && !errors[k] ? 'good' : ''}`;

  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero crumbs={crumbs} eyebrow="Contact" title={page.h1} lead="Questions about sign-up, surveys, rewards or privacy? Reach a real team through the channel you prefer — Live Help is open around the clock." art="chat" theme="sunrise" />

      {/* Channel deck */}
      <section className="ct-deck" aria-label="Contact channels">
        <div className="container">
          <ul className="ct-cards">
            {CHANNELS.map((c, i) => {
              const inner = (
                <>
                  <span className="ct-ico"><Icon name={c.icon} size={26} /></span>
                  <span className="ct-t">{c.t}</span>
                  <span className="ct-sub">{c.sub}</span>
                  <span className="ct-best">{c.best}</span>
                  <span className="ct-meter" aria-label={`Typical response: ${c.speed}`}><i style={{ '--m': c.meter }} /></span>
                  <span className="ct-speed"><Icon name="clock" size={13} /> {c.speed}</span>
                  <span className="ct-cta">{c.cta} <Icon name="arrow" size={15} /></span>
                </>
              );
              return (
                <li key={c.id} className="ct-card" style={{ '--c': c.c, '--c2': c.c2, '--i': i }}>
                  {c.action ? (
                    <button type="button" onClick={openChat}>{inner}</button>
                  ) : (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Message studio */}
      <section className="section ct-studio" aria-labelledby="form-title">
        <div className="container ct-studio-row">
          <div className="ct-side">
            <p className="eyebrow">Message studio</p>
            <h2 id="form-title">Tell us what you need</h2>
            <p className="sec-sub">Pick a topic — it fills the form for you. We usually reply within one business day.</p>
            <div className="ct-topics" role="group" aria-label="Choose a topic">
              {TOPICS.map((t, i) => (
                <button type="button" key={t.t} className={`ct-topic ${v.topic === t.t ? 'on' : ''}`} style={{ '--c': t.c, '--i': i }} onClick={() => pickTopic(t.t)} aria-pressed={v.topic === t.t}>
                  <span><Icon name={t.icon} size={18} /></span>{t.t}
                </button>
              ))}
            </div>

            <ol className="ct-flow" aria-label="What happens next">
              <li><i><Icon name="send" size={16} /></i><b>You send</b><small>Your message reaches our support desk</small></li>
              <li><i><Icon name="layers" size={16} /></i><b>We review</b><small>The right specialist picks it up</small></li>
              <li><i><Icon name="mail" size={16} /></i><b>We reply</b><small>Usually within one business day</small></li>
            </ol>

            <a className="ct-map" href={MAPS} target="_blank" rel="noopener noreferrer">
              <span className="ct-map-art" aria-hidden="true">
                <svg viewBox="0 0 300 140" preserveAspectRatio="none"><path d="M0 100 C 60 80 90 120 150 96 S 250 60 300 80" /><path d="M0 40 C 80 50 120 20 180 36 S 260 70 300 52" /><path d="M120 0 V140 M210 0 V140" /></svg>
                <span className="ct-pin"><Icon name="pin" size={22} /></span>
              </span>
              <span className="ct-map-copy">
                <b>Frequent Research Fieldwork Solutions Pvt. Ltd.</b>
                <small>{CONTACT.address.street}, {CONTACT.address.city} – {CONTACT.address.postalCode}, India</small>
                <em>Open in Google Maps <Icon name="arrow" size={14} /></em>
              </span>
            </a>
          </div>

          <div className="ct-form-card" ref={formRef}>
            {status === 'done' ? (
              <div className="ct-done" role="status">
                <div className="ct-done-burst" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
                <div className="done-check"><Icon name="check" size={40} stroke={2.8} /></div>
                <h3>Message sent!</h3>
                <p>Thanks, {v.name.split(' ')[0]}. We’ll reply to <b>{v.email}</b> — usually within one business day.</p>
                <button type="button" className="btn btn-ghost-dark" onClick={openChat}>Need it faster? Open Live Help</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="ct-form-head">
                  <span className="ct-form-ico"><Icon name="send" size={20} /></span>
                  <div><b>Send us a message</b><small>All fields are required</small></div>
                </div>
                <div className="cf-grid">
                  <div className={fld('name')}>
                    <Icon name="user" size={18} />
                    <input id="c-name" placeholder=" " autoComplete="name" value={v.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errors.name)} maxLength={80} />
                    <label htmlFor="c-name">Your name</label>
                    {errors.name ? <p className="f-err" role="alert">{errors.name}</p> : null}
                  </div>
                  <div className={fld('email')}>
                    <Icon name="mail" size={18} />
                    <input id="c-email" type="email" placeholder=" " autoComplete="email" value={v.email} onChange={(e) => set('email', e.target.value)} aria-invalid={Boolean(errors.email)} maxLength={120} />
                    <label htmlFor="c-email">Email</label>
                    {errors.email ? <p className="f-err" role="alert">{errors.email}</p> : null}
                  </div>
                  <div className={`${fld('topic')} full`}>
                    <Icon name="layers" size={18} />
                    <select id="c-topic" className={v.topic ? 'has-val' : ''} value={v.topic} onChange={(e) => set('topic', e.target.value)} aria-invalid={Boolean(errors.topic)}>
                      <option value="" disabled hidden />
                      {TOPICS.map((t) => <option key={t.t}>{t.t}</option>)}
                    </select>
                    <label htmlFor="c-topic">Topic</label>
                    {errors.topic ? <p className="f-err" role="alert">{errors.topic}</p> : null}
                  </div>
                  <div className={`${fld('message')} full area`}>
                    <Icon name="chat" size={18} />
                    <textarea id="c-msg" rows={5} placeholder=" " value={v.message} onChange={(e) => set('message', e.target.value)} aria-invalid={Boolean(errors.message)} maxLength={2000} />
                    <label htmlFor="c-msg">Message</label>
                    <span className="cf-count" aria-hidden="true"><i style={{ '--p': Math.min(1, v.message.trim().length / 15) }} />{v.message.length}/2000</span>
                    {errors.message ? <p className="f-err" role="alert">{errors.message}</p> : null}
                  </div>
                </div>
                <div className="hp" aria-hidden="true"><label htmlFor="c-web">Website</label><input id="c-web" tabIndex={-1} value={v.website} onChange={(e) => setV({ ...v, website: e.target.value })} autoComplete="off" /></div>
                <div className={`cf-captcha ${errors.captcha ? 'bad' : ''} ${v.captchaOk ? 'good' : ''}`}>
                  <p><Icon name="shield" size={15} /> Security check {v.captchaOk ? <b>Verified</b> : null}</p>
                  <Captcha ref={capRef} error={errors.captcha} onChange={(ok) => set('captchaOk', ok)} />
                </div>
                {status === 'error' ? <p className="form-error" role="alert">We couldn’t send your message. Please try WhatsApp or email instead.</p> : null}
                <button type="submit" className={`btn btn-primary btn-block btn-shine ct-send ${status === 'sending' ? 'is-sending' : ''}`} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <span className="ct-plane"><Icon name="send" size={16} /></span>
                </button>
                <p className="ct-safe"><Icon name="lock" size={13} /> Never share passwords, OTPs or card details — including with us. <Link to="/privacy">Privacy policy</Link></p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="ct-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="ct-faq">Support questions</h2><p className="sec-sub">Browse the <Link to="/faq">full FAQ</Link>.</p></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
    </>
  );
}
