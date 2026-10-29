import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { whatsappLink } from '../data/site.js';
import { session, store } from '../utils/storage.js';

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.path}>
            {i < items.length - 1 ? <Link to={it.path}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqList({ faqs, variant = 'stack' }) {
  return (
    <div className={`faq-list faq-${variant}`}>
      {faqs.map((f, i) => (
        <details key={f.q} className="faq-item" style={{ '--i': i }}>
          <summary>
            <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="faq-q">{f.q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = 'Your opinion is worth more than you think.', sub = 'Join free in two minutes — no investment, no fees, ever.', variant = 'sunrise' }) {
  return (
    <section className={`cta-band cta-${variant}`} aria-label="Join MyFrequentRewards">
      <div className="container cta-inner reveal">
        <div className="cta-confetti" aria-hidden="true">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
        <h2>{title}</h2>
        <p>{sub}</p>
        <div className="cta-actions">
          <Link to="/sign-up" className="btn btn-light btn-lg">Join free now <Icon name="arrow" size={18} /></Link>
          <Link to="/how-it-works" className="btn btn-outline-light btn-lg">See how it works</Link>
        </div>
      </div>
    </section>
  );
}

export function FloatingDock({ onChat, chatOpen }) {
  // Teaser: once per visit, ~15 s in, a small "Ask us anything" bubble + unread badge invite a question.
  const [tease, setTease] = useState(false);
  const [badge, setBadge] = useState(false);
  useEffect(() => {
    if (session.get('mfr_chat_seen')) return undefined;
    const t1 = setTimeout(() => { setTease(true); setBadge(true); }, 15000);
    const t2 = setTimeout(() => setTease(false), 24000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => {
    if (chatOpen) { setTease(false); setBadge(false); session.set('mfr_chat_seen', 1); }
  }, [chatOpen]);
  return (
    <div className="dock" aria-label="Quick help">
      <a className="dock-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (+91 81782 00573)">
        <Icon name="whatsapp" size={28} stroke={1.6} />
        <span className="dock-tip">WhatsApp us</span>
      </a>
      <div className="dock-chat-wrap">
        {tease && !chatOpen ? (
          <button type="button" className="dock-tease" onClick={onChat}>
            <span className="dock-tease-x" role="presentation" onClick={(e) => { e.stopPropagation(); setTease(false); }}>×</span>
            <b>Questions? Ask us anything 💬</b>
            <small>Payouts, surveys, sign-up — instant answers 24/7</small>
          </button>
        ) : null}
        <button type="button" className={`dock-chat ${chatOpen ? 'is-open' : ''}`} onClick={onChat} aria-expanded={chatOpen} aria-label="Open Live Help 24/7">
          <span className="dock-ring" aria-hidden="true" />
          <span className="dock-chat-ico" aria-hidden="true"><Icon name={chatOpen ? 'close' : 'chat'} size={24} /></span>
          <span className="dock-label">Live Help <b>24/7</b></span>
          {badge && !chatOpen ? <span className="dock-badge" aria-label="1 new message">1</span> : null}
        </button>
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const reopen = () => setShow(true);
    window.addEventListener('mfr:cookie-settings', reopen);
    let t;
    if (!store.get('mfr_cookie_choice')) t = setTimeout(() => setShow(true), 1200);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mfr:cookie-settings', reopen);
    };
  }, []);
  const choose = (v) => {
    store.set('mfr_cookie_choice', { analytics: v, at: Date.now() });
    // Analytics loaders should read this choice before firing (see README → Analytics & consent).
    window.dispatchEvent(new CustomEvent('mfr:consent', { detail: { analytics: v } }));
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie" role="region" aria-label="Cookie choices">
      <Icon name="cookie" size={26} />
      <p>We use essential cookies to keep you signed in and secure, and optional analytics cookies to improve the site. <Link to="/cookies">Cookies policy</Link></p>
      <div className="cookie-btns">
        <button type="button" className="btn btn-ghost-dark btn-sm" onClick={() => choose(false)}>Essential only</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => choose(true)}>Accept all</button>
      </div>
    </div>
  );
}

export function ScrollProgress() {
  // Writes straight to the DOM once per frame — no React re-render on every scroll event.
  const ref = useRef(null);
  useEffect(() => {
    let queued = false;
    const paint = () => {
      queued = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
    };
    const on = () => {
      if (!queued) { queued = true; requestAnimationFrame(paint); }
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div ref={ref} className="scroll-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />;
}

export function SectionHead({ eyebrow, title, sub, align = 'left', light = false, id }) {
  return (
    <div className={`sec-head sec-${align} ${light ? 'is-light' : ''} reveal`}>
      {eyebrow ? <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {sub ? <p className="sec-sub">{sub}</p> : null}
    </div>
  );
}
