// Performance guard for the whole site: every page section (and the footer) pauses its CSS animations while
// it is off-screen, and resumes when it scrolls back into view. Before this, the home page kept ~420
// infinite animations running at once, which is what made scrolling lag and the page "hang".
//
// It uses a data attribute (data-still) instead of a class, so React never overwrites it, and it watches
// the page for new sections (route changes, tabs) with a MutationObserver.
import { useEffect } from 'react';

const SELECTOR = 'main > *, main section, .site-footer, .footer-stage, .vband';

// Motion budget. Every looping effect (inside the page, in the floating buttons, the header logo or the video
// band) plays for a few seconds of on-screen time and then rests. Hovering a floating button or the logo plays
// its animation again, and a section replays its loops each time it scrolls back into view.
const BUDGET_MS = 7000;
const KEEP = '[data-loop]'; // opt-in for a loop that must never rest
const REPLAY = '.help-stack, .ytfab, .ytcard, .site-header .brand, .site-footer .brand';
function tame() {
  if (typeof document.getAnimations !== 'function') return;
  for (const a of document.getAnimations()) {
    if (a.__tamed || !a.animationName) continue;
    a.__tamed = true;
    const fx = a.effect;
    const el = fx && fx.target;
    if (!el || !el.closest) continue;
    const t = fx.getTiming();
    if (t.iterations !== Infinity) continue;
    if (el.closest(KEEP)) continue;
    // Every looping effect plays for a few seconds of on-screen time, then rests. Even GPU-friendly loops keep
    // the browser producing frames, and dozens of them at once is what made slower laptops and phones lag.
    // A section replays its motion each time it scrolls back into view (see the observer below).
    const dur = Number(t.duration) || 1000;
    try { fx.updateTiming({ iterations: Math.max(1, Math.round(BUDGET_MS / dur)) }); } catch { /* ignore */ }
  }
}

export default function AnimationGate() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const watched = new WeakSet();
    let lateTame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // sections skipped by content-visibility only create their animations once they render
            clearTimeout(lateTame); lateTame = setTimeout(tame, 300);
            const was = e.target.hasAttribute('data-still');
            e.target.removeAttribute('data-still');
            // coming back into view: rested loops play their few seconds again
            if (was) {
              try { e.target.getAnimations({ subtree: true }).forEach((a) => a.playState === 'finished' && a.play()); } catch { /* ignore */ }
            }
          } else e.target.setAttribute('data-still', '');
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
    const budget = () => tame();
    scan();
    budget();
    const late = [setTimeout(budget, 1500), setTimeout(budget, 4000)];
    let t = 0;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => { scan(); budget(); }, 200);
    });
    // Hovering a floating button or the logo plays its (rested) animations again.
    let lastReplay = 0;
    const onOver = (e) => {
      const host = e.target instanceof Element && e.target.closest(REPLAY);
      if (!host || Date.now() - lastReplay < 1200) return;
      lastReplay = Date.now();
      try { host.getAnimations({ subtree: true }).forEach((a) => a.playState === 'finished' && a.play()); } catch { /* ignore */ }
    };
    document.addEventListener('pointerover', onOver, { passive: true });
    const main = document.getElementById('main');
    if (main) mo.observe(main.parentElement || main, { childList: true, subtree: true });
    // Hidden tab: stop everything (browsers throttle rAF, but CSS animations still cost on some devices).
    const onVis = () => document.documentElement.toggleAttribute('data-hidden', document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t);
      clearTimeout(lateTame);
      late.forEach(clearTimeout);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return null;
}
