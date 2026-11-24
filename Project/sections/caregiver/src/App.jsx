import { lazy, Suspense, startTransition, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { store, useStore } from './lib/store.js';
import { applyLanguage } from './lib/languages.js';
import { I18nCtx, makeT } from './lib/i18n.js';
import { loadContent, loadSurvey, geoStore, onGeo } from './lib/data.js';
import { sound, installClickSound } from './lib/sound.js';
import { hydrate, ensureProfile, flush } from './lib/bridge.js';
import { registerItems, setPoints, rewardOf } from './lib/rewards.js';
import { controller } from './lib/controller.js';
import { cards } from './lib/cards.js';
import CardMount from './components/CardMount.jsx';
import { gate } from './lib/gating.js';
import { hostEl, isEmbedded } from './lib/host.js';
import { loadUI } from './i18n/index.js';
import { allStatuses } from './lib/engine.js';
import Hero from './components/Hero.jsx';
import Dashboard from './components/Dashboard.jsx';
import CareCircle from './components/CareCircle.jsx';
import BgFx from './components/BgFx.jsx';
import Footer from './components/Footer.jsx';
import Toasts, { toast } from './components/Toasts.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const Runner = lazy(() => import('./components/Runner.jsx'));
const LockedModal = lazy(() => import('./components/LockedModal.jsx'));
const ScreenOutModal = lazy(() => import('./components/ScreenOutModal.jsx'));

/** Logged-in caregiver's first name: mount option / config → ?name= → their own answers → none */
function useUserName(propName, answers) {
  return useMemo(() => {
    const clean = (s) => (typeof s === 'string' ? s.trim().split(/\s+/)[0].slice(0, 30) : '');
    if (propName) return clean(propName);
    const c = typeof window !== 'undefined' && window.MHO_CONFIG && window.MHO_CONFIG.user;
    if (c && c.firstName) return clean(c.firstName);
    try { const q = new URLSearchParams(location.search).get('name'); if (q && /^[\p{L}\p{M}' .-]{1,40}$/u.test(q)) return clean(q); } catch {}
    const v = (k) => { const a = answers?.[k]; return a && typeof a.v === 'string' ? a.v : ''; };
    return clean(v('ad-preferred-name')) || clean(answers?.fullname?.parts?.first) || clean(v('fullname'));
  }, [propName, answers]);
}

export default function App({ userName: propName, view = 'all' }) {
  const saved = useStore((s) => s);
  // the member area passes the language and light / dark mode chosen in its header
  const conf = (typeof window !== 'undefined' && window.MHO_CONFIG) || {};
  const lang = typeof conf.lang === 'string' && conf.lang ? conf.lang : 'en';
  const theme = conf.theme === 'dark' ? 'dark' : 'light';
  const [content, setContent] = useState({});
  const [survey, setSurvey] = useState(null);
  const [surveyErr, setSurveyErr] = useState(false);
  const [geoTick, setGeoTick] = useState(0);
  const cardEntries = useSyncExternalStore(cards.subscribe, cards.snapshot);
  const [open, setOpen] = useState(null); // { id, mode: 'run' | 'review', at?: questionName }
  const [lockInfo, setLockInfo] = useState(null); // { id, reason }
  const [screenedOut, setScreenedOut] = useState(null);
  // first render must equal the pre-rendered HTML (light theme, sound on, nothing completed) → sync real prefs right after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // a soft click for every click (inside the section only when it is embedded in your dashboard)
  useEffect(() => installClickSound(isEmbedded() ? hostEl() : document), []);
  // the name is shown after mount: the pre-rendered HTML is generic (no caregiver data in it), so hydration stays exact
  const liveName = useUserName(propName, saved.answers);
  const name = mounted ? liveName : '';

  /* language: palette, direction, sounds, content dictionary */
  useEffect(() => {
    applyLanguage(lang);
    sound.setLang(lang);
    let alive = true;
    loadContent(lang).then((c) => alive && setContent(c));
    return () => { alive = false; };
  }, [lang]);

  useEffect(() => { hostEl().dataset.theme = theme; }, [theme]);
  useEffect(() => { sound.setMuted(true); }, []);

  const loading = useRef(false);
  const fetchSurvey = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    setSurveyErr(false);
    loadSurvey()
      // a transition lets React render the cards + Circle of Care in small slices (smooth on slow phones)
      .then(async (s) => { registerItems(s.profiles); setPoints(s.points, await hydrate(s, store)); startTransition(() => setSurvey(s)); })
      .catch(() => { loading.current = false; setSurveyErr(true); });
  }, []);

  /* This is a dashboard tab: the caregiver is here to work on their profile, so the question bank
     (≈40 KB compressed) is fetched right after the first paint, in idle time. */
  useEffect(() => {
    const off = onGeo(() => setGeoTick((n) => n + 1));
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300));
    const id = idle(() => fetchSurvey(), { timeout: 1200 });
    const go = () => fetchSurvey();
    addEventListener('pointerdown', go, { once: true, passive: true });
    return () => { off(); removeEventListener('pointerdown', go); window.cancelIdleCallback?.(id); };
  }, [fetchSurvey]);

  const meta = mounted ? saved.meta : { completed: {}, started: {} };
  const g = useMemo(() => gate(survey, meta), [survey, meta]);
  const i18n = useMemo(() => makeT(lang, content), [lang, content]);
  useEffect(() => {
    const onFail = () => toast(i18n.t('save.failed'), 'warn', '⚠️');
    window.addEventListener('mho:save-failed', onFail);
    return () => window.removeEventListener('mho:save-failed', onFail);
  }, [i18n]);
  useEffect(() => {
    if (!open || !survey?.pending?.[open.id]) return undefined;
    let alive = true;
    ensureProfile(survey, open.id, store)
      .then((next) => { if (alive) setSurvey(next); })
      .catch(() => {
        if (!alive) return;
        setOpen(null);
        toast(i18n.t('load.failed'), 'warn', '⚠️');
      });
    return () => { alive = false; };
  }, [open, survey]); // eslint-disable-line react-hooks/exhaustive-deps
  const statuses = useMemo(
    () => (survey ? allStatuses(survey, saved.answers, saved.meta, geoStore) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [survey, saved.answers, saved.meta, geoTick]
  );

  /* opening anything goes through the gate: locked surveys show the "sealed" pop-up instead */
  const gRef = useRef(g);
  gRef.current = g;
  const openProfile = useCallback((id, mode = 'run', at) => {
    fetchSurvey();
    sound.unlock();
    const gg = gRef.current;
    if (gg.lock[id] && !store.get().meta.completed?.[id]) {
      setLockInfo({ id, reason: gg.lock[id] });
      return;
    }
    sound.next();
    store.markStarted(id);
    setOpen({ id, mode, at });
  }, [fetchSurvey]);
  const showLocked = useCallback((id) => {
    const gg = gRef.current;
    setLockInfo({ id, reason: gg.lock[id] || 'profiles' });
  }, []);

  useEffect(() => { controller.attach({ open: (id) => openProfile(id, 'run') }); }, [openProfile]);
  useEffect(() => {
    const rules = window.MHO_HOST?.screenOut || {};
    for (const [question, rule] of Object.entries(rules)) {
      const a = saved.answers[question];
      if (a && rule.values.includes(String(a.v))) { setOpen(null); setScreenedOut(rule); return; }
    }
  }, [saved.answers]);
  const confirmScreenOut = async (url) => {
    await flush();
    window.MHO_HOST?.signOut?.(url);
  };
  useEffect(() => {
    if (!survey || !statuses) return;
    controller.publish(g.surveys.map((x) => {
      const p = survey.profiles.find((q) => q.id === x.id) || x;
      return {
        id: x.id,
        name: p.title,
        points: rewardOf(x.id).pts,
        questions: p.questions.length,
        pct: statuses.map[x.id]?.pct || 0,
        done: !!meta.completed?.[x.id],
        locked: !!g.lock[x.id] && !meta.completed?.[x.id],
        p,
        st: statuses.map[x.id],
        lock: mounted ? g.lock[x.id] : 'profiles',
        completedAt: meta.completed?.[x.id],
      };
    }));
  }, [survey, statuses, g, meta, mounted]);

  /* deep link: #profile=<id> opens a profile directly (on load and when the hash changes) */
  useEffect(() => {
    if (!mounted) return undefined;
    const check = () => {
      const m = /profile=([\w-]+)/.exec(location.hash);
      if (!m) return;
      if (!survey) { fetchSurvey(); return; }
      if (survey.profiles.some((p) => p.id === m[1])) openProfile(m[1], 'run');
    };
    check();
    addEventListener('hashchange', check);
    return () => removeEventListener('hashchange', check);
  }, [survey, fetchSurvey, mounted, openProfile]);

  const closeRunner = useCallback(() => {
    setOpen(null);
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }, []);

  /* lock page scroll while the question flow is open */
  useEffect(() => {
    document.documentElement.classList.toggle('lock', !!open);
    // leaving the page (back button, menu link) while a questionnaire is open must give the page its scroll back
    return () => { if (open) document.documentElement.classList.remove('lock'); };
  }, [open]);

  const nextItem = g.next ? g.items.find((p) => p.id === g.next) : null;
  const returning = mounted && Object.keys(saved.meta.started || {}).length > 0;
  const lockItem = lockInfo ? (survey?.profiles.find((p) => p.id === lockInfo.id) || g.items.find((p) => p.id === lockInfo.id)) : null;

  return (
    <I18nCtx.Provider value={i18n}>
      <div className="pp-root" id="pp-root" style={view === 'headless' ? { display: 'none' } : undefined}>
        {view !== 'headless' && <a className="skip" href="#profiles">{i18n.t('skip')}</a>}
        {view !== 'headless' && <BgFx />}
        {view !== 'headless' && <main id="main" className="pp-main" inert={open || lockInfo ? true : undefined}>
          {view !== 'surveys' && <Hero name={name} g={mounted ? g : null} returning={returning} onStart={openProfile} nextItem={nextItem} />}
          {view !== 'surveys' && <CareCircle mounted={mounted} survey={survey} statuses={statuses} meta={meta} gemSeen={saved.gemSeen} g={g}
            runnerOpen={!!open} name={name} onOpen={openProfile} />}
          <Dashboard view={view} survey={survey} error={surveyErr} onRetry={() => { loading.current = false; fetchSurvey(); }}
            statuses={statuses} meta={meta} g={g} mounted={mounted} onOpen={openProfile} onLocked={showLocked} />
        </main>}
        {view !== 'surveys' && view !== 'headless' && <Footer />}
      </div>
      {screenedOut && (<Suspense fallback={null}><ScreenOutModal rule={screenedOut} palette={(survey?.profiles[0]?.palette) || ['#B5175A', '#FF5C8A']} onConfirm={confirmScreenOut} /></Suspense>)}
      {lockInfo && lockItem && (
        <Suspense fallback={null}>
          <LockedModal item={lockItem} reason={lockInfo.reason} g={g} survey={survey} name={name} onClose={() => setLockInfo(null)} onOpen={openProfile} />
        </Suspense>
      )}
      <Toasts />
      {open && (!survey || survey.pending?.[open.id]) && <div className="runner-fallback" aria-busy="true" />}
      {open && survey && !survey.pending?.[open.id] && (
        <ErrorBoundary onReset={closeRunner}>
          <Suspense fallback={<div className="runner-fallback" aria-busy="true" />}>
            <Runner
              key={open.id + open.mode + (open.at || '')}
              survey={survey}
              profileId={open.id}
              mode={open.mode}
              startAt={open.at}
              answers={saved.answers}
              meta={saved.meta}
              name={name}
              onClose={closeRunner}
              onOpen={openProfile}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      {cardEntries.map((e) => createPortal(<CardMount item={e.item} onOpen={openProfile} onLocked={showLocked} />, e.el, e.key))}
    </I18nCtx.Provider>
  );
}
