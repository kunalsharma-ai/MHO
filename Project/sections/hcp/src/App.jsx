import { lazy, Suspense, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useStore, firstNameOf } from './store.jsx';
import { I18nProvider, useI18n } from './i18n/index.jsx';
import { applyTheme } from './lib/theme.js';
import { PROFILES, PENDING } from './lib/engine.js';
import { ensureProfile } from './lib/bridge.js';
import { progressOf } from './lib/rewards.js';
import { usePath, parseRoute, go } from './lib/router.js';
import { hostEl, isEmbedded, lockScroll } from './lib/host.js';
import { ambientClick, unlockAudio } from './lib/sound.js';
import Hero from './components/Hero.jsx';
import Genome from './components/Genome.jsx';
import Profiles from './components/Profiles.jsx';
import BgFx from './components/BgFx.jsx';
import Footer from './components/Footer.jsx';
import Toasts, { toast } from './components/Toasts.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AnimatedLogo } from './components/Brand.jsx';

const Wizard = lazy(() => import('./components/Wizard.jsx'));
const Review = lazy(() => import('./components/Review.jsx'));

function OverlayFallback() {
  return <div className="overlay-fallback" aria-busy="true"><AnimatedLogo heart height={56} /></div>;
}

/**
 * The "My Profile" section: header → compact welcome hero → Clinical Genome (rewards) → profile cards → footer,
 * plus the question-flow / review overlays, language dialog, language transition and toasts.
 * v3.0: no gating — every profile opens in any order.
 */
function Shell({ userName }) {
  const { state, dispatch } = useStore();
  const { t } = useI18n();
  // first render must equal the pre-rendered HTML (nothing completed, no name) → real data right after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    try {
      const nav = navigator;
      if (nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 2) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2)) hostEl().classList.add('hcp-lite');
    } catch { /* ignore */ }
  }, []);
  const path = usePath(mounted);
  const known = useMemo(() => new Set(PROFILES.map((p) => p.slug)), []);
  const route = parseRoute(path, known);
  const [, refresh] = useReducer((n) => n + 1, 0);
  const pendingSlug = route.kind !== 'home' && PENDING[route.slug] ? route.slug : null;
  useEffect(() => {
    if (!pendingSlug) return undefined;
    let alive = true;
    ensureProfile(pendingSlug)
      .then((values) => {
        if (!alive) return;
        if (values) dispatch({ type: 'hydrate', slug: pendingSlug, values });
        refresh();
      })
      .catch(() => {
        if (!alive) return;
        go('');
        toast(t('loadFailed'), 'warn', '\u26A0\uFE0F');
      });
    return () => { alive = false; };
  }, [pendingSlug]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const onFail = () => toast(t('saveFailed'), 'warn', '\u26A0\uFE0F');
    window.addEventListener('mho:save-failed', onFail);
    return () => window.removeEventListener('mho:save-failed', onFail);
  }, [t]);
  const completed = mounted ? state.completed : {};
  const pr = useMemo(() => progressOf(completed), [completed]);
  const name = mounted ? firstNameOf(state, userName) : '';

  /* a soft click for every click (only inside the section when embedded) */
  useEffect(() => {
    const root = isEmbedded() ? hostEl() : document;
    const on = (e) => {
      unlockAudio();
      if (e.target instanceof Element && e.target.closest('button, a, [role="option"], input, select, label, summary')) ambientClick();
    };
    root.addEventListener('click', on);
    return () => root.removeEventListener('click', on);
  }, []);

  /* deep link from the reminder e-mail: ?profile=documents → opens it */
  useEffect(() => {
    try {
      const s = new URLSearchParams(location.search).get('profile');
      if (s && known.has(s) && !path) go(`profile/${s}`);
    } catch { /* ignore */ }
    const idle = () => { import('./components/Wizard.jsx'); import('./components/Completion.jsx'); };
    if ('requestIdleCallback' in window) requestIdleCallback(idle, { timeout: 4000 }); else setTimeout(idle, 2000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { applyTheme(state.lang, state.theme); }, [state.lang, state.theme]);

  const overlay = route.kind !== 'home';
  useEffect(() => {
    lockScroll(overlay);
    // leaving the page (back button, menu link) while a questionnaire is open must give the page its scroll back
    return () => { if (overlay) lockScroll(false); };
  }, [overlay]);

  const goRewards = useCallback(() => document.getElementById('rewards')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), []);
  const openItem = useCallback((slug, mode = 'run', at) => {
    if (!slug) { goRewards(); return; }
    dispatch({ type: 'started', slug });
    if (mode === 'review') go(`review/${slug}`);
    else go(`profile/${slug}${at ? `/edit/${encodeURIComponent(at)}` : ''}`);
  }, [dispatch, goRewards]);
  const close = useCallback(() => go(''), []);


  return (
    <>
      <div className="hcp-root" id="hcp-root" inert={overlay ? true : undefined}>
        <a className="skip" href="#profiles">{t('skip')}</a>
        <BgFx />
        <main id="main" className="hcp-main">
          <Hero name={name} pr={pr} mounted={mounted} onStart={openItem} />
          <Genome mounted={mounted} completed={state.completed} seen={state.seen} pr={pr} runnerOpen={overlay} onOpen={openItem} dispatch={dispatch} />
          <Profiles mounted={mounted} answers={state.answers} completed={state.completed} pr={pr} onOpen={openItem} />
        </main>
        <Footer />
      </div>

      {overlay && (
        <ErrorBoundary key={route.slug + route.kind} onReset={close}>
          <Suspense fallback={<OverlayFallback />}>
            {pendingSlug && <OverlayFallback />}
            {!pendingSlug && route.kind === 'profile' && (
              <Wizard key={`${route.slug}-${route.mode || ''}-${route.q || ''}`} slug={route.slug} editFrom={route.mode === 'edit' ? route.q : null}
                pr={pr} onClose={close} onOpen={openItem} />
            )}
            {!pendingSlug && route.kind === 'review' && <Review slug={route.slug} onClose={close} onOpen={openItem} />}
          </Suspense>
        </ErrorBoundary>
      )}
      <Toasts />
    </>
  );
}

export default function App({ userName }) {
  const { state } = useStore();
  return (
    <I18nProvider lang={state.lang}>
      <Shell userName={userName} />
    </I18nProvider>
  );
}
