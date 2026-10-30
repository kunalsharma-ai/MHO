import { useEffect, useRef, useState } from 'react';
import { sound } from '../lib/sound.js';
import { AnimatedLogo } from './Brand.jsx';

const ICONS = {
  people: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.6" /><path d="M16.5 14.2c2.6.3 4.5 2.4 4.5 5.1" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.500 4h3A1.500 1.500 0 0 1 15 5.500V7M3 13h18" /></>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12M12 8c-1.500-3-5-3-5-.5S10.500 8 12 8zm0 0c1.500-3 5-3 5-.5S13.500 8 12 8z" /></>,
};

const Glyph = ({ name, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

const Badge = ({ src, icon, name }) => {
  const [shown, setShown] = useState(Boolean(src));
  if (!shown) return <Glyph name={icon} size={20} />;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 10, padding: '4px 10px' }}>
      <img src={src} alt={name} style={{ display: 'block', height: 26, width: 'auto', maxWidth: 150 }} onError={() => setShown(false)} />
    </span>
  );
};

const bold = (text) => text.split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));

export default function ScreenOutModal({ rule, palette, onConfirm }) {
  const closeRef = useRef(null);

  useEffect(() => {
    sound.locked();
    const id = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    document.documentElement.classList.add('lock');
    return () => { cancelAnimationFrame(id); document.documentElement.classList.remove('lock'); };
  }, []);

  const go = (url) => (e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
    onConfirm();
  };

  return (
    <div className="lm-backdrop" style={{ zIndex: 1000 }}>
      <div className="lm" role="alertdialog" aria-modal="true" aria-labelledby="so-title" aria-describedby="so-text"
        style={{ '--p1': palette[0], '--p2': palette[1], width: 'min(700px, 100%)', padding: '22px clamp(18px, 3vw, 28px)' }}>
        <i className="lm-glow" aria-hidden="true" />
        <button ref={closeRef} className="icon-btn lm-x" type="button" onClick={() => onConfirm()} aria-label="Close">✕</button>
        <div style={{ textAlign: 'center' }}>
          <Glyph name="people" size={26} />
          <h2 id="so-title" style={{ margin: '8px 0 8px', fontSize: 'clamp(18px, 2.6vw, 22px)' }}>{rule.title}</h2>
        </div>
        <div id="so-text" style={{ textAlign: 'center', fontSize: 14, lineHeight: 1.5 }}>
          {rule.paragraphs.map((p, i) => <p key={i} style={{ margin: '0 0 6px' }}>{bold(p)}</p>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginTop: 14 }}>
          {rule.links.map((l) => (
            <section key={l.url} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Badge src={l.logo} icon={l.icon} name={l.name} />
                <h3 style={{ margin: 0, fontSize: 16 }}>{l.name}</h3>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, flex: 1 }}>{l.text}</p>
              <small style={{ opacity: 0.8 }}>Website: {l.site}</small>
              <a className="btn primary" href={l.url} target="_blank" rel="noopener noreferrer" onClick={go(l.url)} style={{ display: 'flex', justifyContent: 'center' }}>{l.button}</a>
            </section>
          ))}
        </div>
        <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 12, opacity: 0.85 }}>{rule.note}</p>
      </div>
    </div>
  );
}
