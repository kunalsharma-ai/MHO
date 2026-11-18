import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useRouter, normalize } from '../router.jsx';
import { NAV } from '../seo/pages.js';
import { Logo } from './Brand.jsx';
import Icon from './Icon.jsx';
import { useMounted } from './ui.jsx';
import { LanguageButton } from './Language.jsx';
import { useSession, logout } from '../utils/session.js';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Header() {
  const { path } = useRouter();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false });
  const progress = useRef(null);
  const user = useSession(); // null = guest; otherwise the logged-in member (same data web-1's header uses)
  const [pmenu, setPmenu] = useState(false);
  const pmRef = useRef(null);

  const matches = (to) => (to === '/' ? path === '/' : path === to || path.startsWith(to + '/'));
  const activeIdx = NAV.findIndex((n) => matches(n.to) || (n.children || []).some((c) => matches(c.to)));

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding active-link pill
  useIsoLayout(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = () => {
      const a = nav.querySelectorAll('a.nav-link')[activeIdx];
      if (!a) return setPill((p) => ({ ...p, show: false }));
      setPill({ x: a.getBoundingClientRect().left - nav.getBoundingClientRect().left, w: a.offsetWidth, show: true });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [activeIdx, mounted]);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!pmenu) return;
    const away = (e) => { if (pmRef.current && !pmRef.current.contains(e.target)) setPmenu(false); };
    const esc = (e) => e.key === 'Escape' && setPmenu(false);
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [pmenu]);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    if (open) document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const authActive = (to) => normalize(to) === path;

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-progress" ref={progress} aria-hidden="true" />
        <div className="container header-inner">
          <Link to="/" className="header-logo notranslate" translate="no" aria-label="MyHealthOpinions home">
            <Logo size={50} onDark />
          </Link>
          <LanguageButton />
          <nav className="main-nav" aria-label="Main" ref={navRef}>
            <span className="nav-pill" style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.show ? 1 : 0 }} aria-hidden="true" />
            {NAV.map((n) =>
              n.children ? (
                <div key={n.to} className="nav-dd">
                  <Link to={n.to} className="nav-link" aria-haspopup="true">
                    {n.label}<Icon name="plus" size={12} className="dd-caret" />
                  </Link>
                  <div className="dd-panel">
                    {n.children.map((c) => (
                      <Link key={c.to} to={c.to} className={`dd-item g-${c.grade}`}>
                        <span className="ddi-ic"><Icon name={c.icon} size={18} /></span>
                        <span><b>{c.label}</b><small>{c.sub}</small></span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className="nav-link">
                  {n.label}
                  {n.badge && <span className="nav-badge"><Icon name="trending" size={11} />{n.badge}</span>}
                </Link>
              )
            )}
          </nav>
          <div className="header-cta">
            {user ? (
              <div className="hd-user" ref={pmRef}>
                <button type="button" className="hd-user-btn" aria-haspopup="menu" aria-expanded={pmenu} onClick={() => setPmenu((o) => !o)}>
                  {user.profilePicture ? <img src={user.profilePicture} alt="Your profile photo" /> : <span className="hd-av">{(user.name?.first || 'U').charAt(0).toUpperCase()}</span>}
                  <b>{user.name?.first || 'User'}</b>
                </button>
                {pmenu && (
                  <div className="hd-menu" role="menu">
                    {(user.navbar?.length ? user.navbar : [{ link: '/member/dashboard', text: 'Dashboard' }]).map((l) => (
                      // /member/* is the member app (not part of this site's router), so a normal link with a full page load.
                      <a key={l.link} href={l.link} role="menuitem">{l.text}</a>
                    ))}
                    <button type="button" role="menuitem" className="hd-out" onClick={logout}>Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={`btn-login ${authActive('/login') ? 'on' : ''}`}>
                  <Icon name="user" size={16} /> Log in
                </Link>
                <Link to="/join" className="btn-join">
                  <span>Join free</span>
                  <i aria-hidden="true" />
                </Link>
              </>
            )}
            <button className={`burger ${open ? 'is-open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      {mounted &&
        createPortal(
          <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
            <div className="mm-backdrop" onClick={() => setOpen(false)} />
            <div className="mm-panel" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="mm-top">
                <Logo size={34} onDark />
                <LanguageButton compact />
                <button className="mm-close" onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="x" size={22} /></button>
              </div>
              <div className="mm-orbs" aria-hidden="true"><i /><i /><i /></div>
              <nav aria-label="Mobile">
                {NAV.map((n, i) => (
                  <div key={n.to} className="mm-group">
                    {n.children ? (
                      <>
                        <span className="mm-link mm-head" style={{ '--i': i }}>
                          <span className="mm-num">{String(i + 1).padStart(2, '0')}</span>
                          <span className="mm-label">{n.label}</span>
                        </span>
                        <div className="mm-sub">
                          {n.children.map((c) => (
                            <Link key={c.to} to={c.to} className={`mm-sublink g-${c.grade}`}><Icon name={c.icon} size={16} />{c.label}</Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link to={n.to} className="mm-link" style={{ '--i': i }}>
                        <span className="mm-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="mm-label">{n.label}</span>
                        {n.badge && <span className="nav-badge">{n.badge}</span>}
                        <Icon name="arrow" size={18} className="mm-arrow" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mm-cta">
                {user ? (
                  <>
                    <a href="/member/dashboard" className="btn btn-primary"><span className="btn-label">Dashboard</span><Icon name="arrow" size={18} /></a>
                    <button type="button" className="btn btn-ghost" onClick={logout}><span className="btn-label">Sign out</span></button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-ghost"><span className="btn-label">Log in</span></Link>
                    <Link to="/join" className="btn btn-primary"><span className="btn-label">Join free</span><Icon name="arrow" size={18} /></Link>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
