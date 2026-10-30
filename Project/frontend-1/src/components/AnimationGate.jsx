// Performance guard for the whole site: every page section (and the footer) pauses its CSS animations while
// it is off-screen, and resumes when it scrolls back into view. Before this, the home page kept ~420
// infinite animations running at once, which is what made scrolling lag and the page "hang".
//
// It uses a data attribute (data-still) instead of a class, so React never overwrites it, and it watches
// the page for new sections (route changes, tabs) with a MutationObserver.
import { useEffect } from 'react';

const SELECTOR = 'main > *, main section, .site-footer, .footer-stage';

export default function AnimationGate() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const watched = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute('data-still');
          else e.target.setAttribute('data-still', '');
          // SVG SMIL animations (<animateMotion> dots, gradient drifts) ignore CSS — pause them too.
          e.target.querySelectorAll('svg').forEach((svg) => {
            if (!svg.querySelector('animate, animateMotion, animateTransform')) return;
            try {
              if (e.isIntersecting) svg.unpauseAnimations();
              else svg.pauseAnimations();
            } catch {
              /* nested <svg> or unsupported: ignore */
            }
          });
        }
      },
      { rootMargin: '120px 0px' }
    );
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };
    scan();
    let t = 0;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(scan, 120);
    });
    const main = document.getElementById('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    // Hidden tab: stop everything (browsers throttle rAF, but CSS animations still cost on some devices).
    const onVis = () => document.documentElement.toggleAttribute('data-hidden', document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return null;
}
