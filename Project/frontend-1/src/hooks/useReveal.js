import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 1) Reveal: adds .is-in to every .reveal element when it scrolls into view — including elements that mount
//    later (via MutationObserver). A cheap once-per-frame scroll sweep also reveals anything the visitor has
//    already scrolled past, so a fast flick or a busy phone can never leave a section invisible.
// 2) Off-screen pause: sections more than a screen away get [data-off] and CSS pauses their animations,
//    so only what the visitor can see is animating (big win for scroll smoothness and battery).
// Content stays visible without JS (CSS only hides .reveal when <html> has the .js class).
export default function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const showAll = () => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'));
    if (!('IntersectionObserver' in window)) {
      showAll();
      return undefined;
    }
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.01 }
    );
    const pauseIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.removeAttribute('data-off') : e.target.setAttribute('data-off', ''))),
      { rootMargin: '150px 0px 150px 0px' }
    );
    const pauseSeen = new WeakSet();
    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
      document.querySelectorAll('#main section, .site-footer').forEach((el) => {
        if (!pauseSeen.has(el)) {
          pauseSeen.add(el);
          pauseIo.observe(el);
        }
      });
    };
    let queued = false;
    const sweep = () => {
      queued = false;
      const limit = window.innerHeight * 0.96;
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!queued) { queued = true; requestAnimationFrame(sweep); }
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    const safety = setTimeout(sweep, 1200);
    return () => {
      io.disconnect();
      pauseIo.disconnect();
      mo.disconnect();
      clearTimeout(safety);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);
}
