import { useEffect, useRef, useState } from 'react';
import heart from '../assets/mho-heart.webp';
import { Icon } from './Icon.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useAccount } from '../context/AccountContext.jsx';
import { DevTools } from './DevTools.jsx';

/** Brand lock-up: the MHO heart emblem + live wordmark (crisp at any size, readable in both themes) */
export function Brand({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <img src={heart} alt="" width="40" height="40" draggable="false" />
      <span className="brand-word"><b>MyHealth</b><em>Opinions</em></span>
    </span>
  );
}

/** Round theme button: the sun and moon swap with a rotating morph */
export function ThemeButton() {
  const { theme, toggleTheme } = useApp();
  const dark = theme === 'dark';
  return (
    <button type="button" className={`themer ${dark ? 'is-dark' : 'is-light'}`} onClick={toggleTheme} data-sfx="none"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title={dark ? 'Light theme' : 'Dark theme'}>
      <span className="themer-sun"><Icon name="sun" /></span>
      <span className="themer-moon"><Icon name="moon" /></span>
      <span className="themer-label">{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
}

/** Sound button: a heart that beats while sound is on */
export function SoundButton() {
  const { soundOn, toggleSound } = useApp();
  return (
    <button type="button" className={`sndh ${soundOn ? 'on' : 'off'}`} onClick={toggleSound} data-sfx="none" aria-pressed={soundOn}
      aria-label={soundOn ? 'Turn sound effects off' : 'Turn sound effects on'} title={soundOn ? 'Sound on' : 'Sound off'}>
      <Icon name={soundOn ? 'heart' : 'mute'} />
      {soundOn && <i className="sndh-wave" aria-hidden="true" />}
    </button>
  );
}

export function TopBar({ links, showDevTools }) {
  const { user, dev } = useAccount();
  const [devOpen, setDevOpen] = useState(false);
  const devRef = useRef(null);
  const initials = user.name.split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  const nav = (key) => (links.onNavigate ? (e) => links.onNavigate(e, key) : undefined);

  useEffect(() => {
    if (!devOpen) return;
    const out = (e) => { if (devRef.current && !devRef.current.contains(e.target)) setDevOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setDevOpen(false); };
    document.addEventListener('pointerdown', out); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', esc); };
  }, [devOpen]);

  return (
    <header className="top">
      <div className="top-in">
        <a className="top-brand" href={links.dashboard} onClick={nav('dashboard')} aria-label="MyHealthOpinions dashboard"><Brand /></a>
        <nav className="top-crumbs" aria-label="Breadcrumb">
          <svg className="mini-ecg" viewBox="0 0 60 20" aria-hidden="true"><path d="M0 10 H18 L22 4 L26 16 L30 2 L34 18 L38 10 H60" /></svg>
          <a href={links.dashboard} onClick={nav('dashboard')}>Dashboard</a><Icon name="chev" />
          <a href={links.account} onClick={nav('account')}>My Account</a><Icon name="chev" />
          <span aria-current="page">Account Care</span>
        </nav>
        <div className="top-actions">
          {showDevTools && dev && (
            <div className="dev-wrap" ref={devRef}>
              <button type="button" className={`dev-btn ${devOpen ? 'on' : ''}`} aria-expanded={devOpen} aria-controls="mho-dev" onClick={() => setDevOpen((v) => !v)} data-sfx="toggle">
                <Icon name="sliders" /><span>Demo</span>
              </button>
              {devOpen && <DevTools id="mho-dev" onClose={() => setDevOpen(false)} />}
            </div>
          )}
          <ThemeButton />
          <SoundButton />
          <span className="who" title={`${user.name} · ${user.email}`}><span className="who-av">{initials}</span><span className="who-name">{user.name}</span></span>
        </div>
      </div>
    </header>
  );
}
