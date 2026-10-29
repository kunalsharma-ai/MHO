import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import BrandLogo from './BrandLogo.jsx';
import { BRAND } from '../data/site.js';

const EARN = [
  { to: '/paid-surveys-for-consumers', label: 'For Consumers', sub: 'Students, parents, shoppers, gamers', icon: 'user' },
  { to: '/paid-surveys-for-professionals', label: 'For Professionals', sub: 'CXOs, managers, engineers, doctors', icon: 'briefcase' },
  { to: '/who-can-join', label: 'Who Can Join', sub: 'Countries, roles & industries', icon: 'globe' },
];

// Menu order (as requested): Home · About Us · Earn ▾ · How It Works · Rewards · Trust & Safety · Blogs · FAQ · Contact
const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'About Us' },
  { earn: true },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/rewards-and-payouts', label: 'Rewards' },
  { to: '/quality-and-data-security', label: 'Trust & Safety' },
  { to: '/blog', label: 'Blogs', hot: true },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact-us', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });

  // "Magic pill": a gradient pill glides under whichever item you hover and settles back on the active page.
  const moveTo = useCallback((el) => {
    const nav = navRef.current;
    if (!nav || !el || window.matchMedia('(max-width: 767px)').matches) return setInd((v) => ({ ...v, on: false }));
    const a = nav.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    setInd({ x: b.left - a.left, w: b.width, on: true });
  }, []);
  const settle = useCallback(() => {
    const nav = navRef.current;
    const active = nav && (nav.querySelector('.nav-link.is-active') || (EARN.some((e) => pathname.startsWith(e.to)) && nav.querySelector('.nav-drop-btn')));
    if (active) moveTo(active);
    else setInd((v) => ({ ...v, on: false }));
  }, [moveTo, pathname]);
  useEffect(() => {
    const t = setTimeout(settle, 60);
    window.addEventListener('resize', settle);
    document.fonts && document.fonts.ready && document.fonts.ready.then(settle).catch(() => {});
    return () => { clearTimeout(t); window.removeEventListener('resize', settle); };
  }, [settle]);
  const hover = (e) => {
    const el = e.target.closest && e.target.closest('.nav-link');
    if (el) moveTo(el);
  };

  useEffect(() => {
    setOpen(false);
    setEarnOpen(false);
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container header-row">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <BrandLogo width={184} eager />
        </Link>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" ref={navRef} onMouseOver={hover} onMouseLeave={settle} onFocus={hover}>
          <span className={`nav-pill ${ind.on ? 'on' : ''}`} style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true" />
          {NAV.map((n, i) => n.earn ? (
            <div
              key="earn"
              style={{ '--i': i }}
              className={`nav-drop nav-in ${earnOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setEarnOpen(true)}
              onMouseLeave={() => setEarnOpen(false)}
            >
              <button type="button" className="nav-link nav-drop-btn" aria-expanded={earnOpen} onClick={() => setEarnOpen((v) => !v)}>
                Earn <Icon name="chevron" size={16} />
              </button>
              <div className="nav-panel" role="menu">
                {EARN.map((e) => (
                  <Link key={e.to} to={e.to} className="nav-panel-item" role="menuitem">
                    <span className="npi-ico"><Icon name={e.icon} /></span>
                    <span>
                      <strong>{e.label}</strong>
                      <small>{e.sub}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <NavLink key={n.to} to={n.to} end={n.end} style={{ '--i': i }} className={({ isActive }) => `nav-link nav-in ${isActive ? 'is-active' : ''}`}>
              {n.label}
              {n.hot ? <span className="nav-hot">Trending</span> : null}
            </NavLink>
          ))}
          <div className="nav-cta-mobile">
            <Link to="/login" className="btn btn-ghost-dark">Log in</Link>
            <Link to="/sign-up" className="btn btn-primary">Join free</Link>
          </div>
        </nav>

        <div className="header-cta">
          <Link to="/login" className="btn btn-text hdr-login"><span className="hdr-login-ico"><Icon name="user" size={16} /></span>Log in</Link>
          <Link to="/sign-up" className="btn btn-primary btn-glow btn-shine hdr-join">
            <span className="hdr-join-spark" aria-hidden="true"><Icon name="gift" size={16} /></span>
            Join free <span className="hdr-join-arrow"><Icon name="arrow" size={18} /></span>
          </Link>
          <button
            type="button"
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
