import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import LiveChat from './LiveChat.jsx';
import ActivityToasts from './ActivityToasts.jsx';
import ReviewPopup from './ReviewPopup.jsx';
import CustomCursor from './CustomCursor.jsx';
import { CookieBanner, FloatingDock, ScrollProgress } from './Common.jsx';
import useReveal from '../hooks/useReveal.js';
import { PagesContext, pageFor } from '../router/pages.js';
import { welcomePop } from '../utils/sound.js';

export default function Layout({ children }) {
  const [chat, setChat] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { pathname, hash } = useLocation();
  useReveal();

  const pages = useContext(PagesContext);
  useEffect(() => setMounted(true), []);
  useEffect(() => welcomePop(), []);

  // Prefetch a page's code the moment a visitor shows intent (hover, touch, keyboard focus) so the click is
  // instant; then, once the browser is idle, quietly fetch the most-visited pages.
  useEffect(() => {
    if (!pages) return undefined;
    const want = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      let href = a.getAttribute('href') || '';
      if (href.startsWith('#/')) href = href.slice(1);
      if (!href.startsWith('/') || href.startsWith('//')) return;
      pages.load(pageFor(href)).catch(() => {});
    };
    const opts = { passive: true };
    document.addEventListener('pointerover', want, opts);
    document.addEventListener('touchstart', want, opts);
    document.addEventListener('focusin', want);
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 2500));
    const id = idle(() => ['SignUp', 'HowItWorks', 'Rewards', 'BlogList'].forEach((n) => pages.load(n).catch(() => {})), { timeout: 6000 });
    return () => {
      document.removeEventListener('pointerover', want, opts);
      document.removeEventListener('touchstart', want, opts);
      document.removeEventListener('focusin', want);
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id);
    };
  }, [pages]);

  // In-page anchors (#section) must scroll, not navigate. With hash routing (preview / file://) a raw
  // "#section" link would otherwise be treated as a route and show the 404 page.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.startsWith('#/')) return;
      const el = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (el.tabIndex < 0 && el.id === 'main') el.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Deep links such as /#voices: scroll to the section once the page chunk has rendered it.
    let tries = 0;
    const t = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 20) {
        clearInterval(t);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => clearInterval(t);
  }, [pathname, hash]);

  const closeChat = useCallback(() => setChat(false), []);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <FloatingDock onChat={() => setChat((v) => !v)} chatOpen={chat} />
      {mounted ? (
        <>
          <LiveChat open={chat} onClose={closeChat} />
          <ActivityToasts />
          <ReviewPopup />
          <CookieBanner />
          <CustomCursor />
        </>
      ) : null}
    </>
  );
}
