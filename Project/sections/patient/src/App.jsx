import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { store, useStore } from './lib/store.js';
import { cfg } from './lib/config.js';
import { applyLanguage, isFull } from './lib/languages.js';
import { I18nCtx, makeT } from './lib/i18n.js';
import { loadContent, loadSurvey, geoStore, onGeo } from './lib/data.js';
import { sound } from './lib/sound.js';
import { hydrate, ensureProfile, sourceOfSlug } from './lib/bridge.js';
import { registerRoot, setRootAttrs, lockScroll } from './lib/root.js';
import { totals, pendingDelivery, levelOf, completedIds, setPoints, rewardOf } from './lib/rewards.js';
import { controller } from './lib/controller.js';
import { cards } from './lib/cards.js';
import CardMount from './components/CardMount.jsx';
import { accessOf, setKinds } from './lib/access.js';
import { loadUI } from './i18n/index.js';
import { allStatuses } from './lib/engine.js';
import { wait } from './lib/flight.js';
import Hero from './components/Hero.jsx';
import Ambient from './components/Ambient.jsx';
import PulseMonitor from './components/PulseMonitor.jsx';
import Dashboard from './components/Dashboard.jsx';
import LockedDialog from './components/LockedDialog.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ToastProvider, useToast } from './components/Toasts.jsx';

const Runner = lazy(() => import('./components/Runner.jsx'));

const CLICKABLE = 'button, a[href], [role="option"], [role="tab"], [role="radio"], [role="checkbox"], summary, label.clickable';

/** first name: dashboard → answers (first-name box / full name) → '' */
function firstNameOf(answers) {
  const c = cfg().user || {};
  if (c.firstName) return String(c.firstName).trim();
  const f = answers?.fullname;
  if (f?.parts?.f) return f.parts.f;
  if (typeof f?.v === 'string' && f.v.trim()) return f.v.trim().split(/\s+/)[0];
  return '';
}

function Section({ view: viewProp }) {
  const saved = useStore((s) => s);
  const c = cfg();
  const view = viewProp || c.view || 'all';
  // the member area passes the language and light / dark mode chosen in its header
  const lang = typeof c.lang === 'string' && c.lang ? c.lang : 'en';
  const theme = c.theme === 'dark' ? 'dark' : 'light';
  const [content, setContent] = useState({});
  const [uiTick, setUiTick] = useState(0);
  const [survey, setSurvey] = useState(null);
  const [surveyErr, setSurveyErr] = useState(false);
  const [geoTick, setGeoTick] = useState(0);
  const cardEntries = useSyncExternalStore(cards.subscribe, cards.snapshot);
  const [open, setOpen] = useState(null); // { id, mode, at? }
  const [locked, setLocked] = useState(null);
  const rootRef = useRef(null);
  const pulseRef = useRef(null);
  const toast = useToast();
  const muted = saved.muted ?? !c.sound;

  /* the section root carries theme / language / palette (never <html>) */
  useEffect(() => registerRoot(rootRef.current), []);
  useEffect(() => { setRootAttrs({ 'data-theme': theme }); }, [theme]);
  useEffect(() => { sound.setMuted(muted); }, [muted]);

  /* language: palette, direction, sounds, UI + content dictionaries */
  useEffect(() => {
    applyLanguage(lang);
    sound.setLang(lang);
    let alive = true;
    if (isFull(lang)) loadUI(lang).then(() => alive && setUiTick((n) => n + 1));
    loadContent(lang).then((x) => alive && setContent(x));
    return () => { alive = false; };
  }, [lang]);
  const loading = useRef(false);
  const fetchSurvey = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    setSurveyErr(false);
    loadSurvey().then(async (s) => { setKinds(s); setPoints(s.points, await hydrate(s, store)); setSurvey(s); }).catch(() => { loading.current = false; setSurveyErr(true); });
  }, []);
  useEffect(() => {
    fetchSurvey();
    return onGeo(() => setGeoTick((n) => n + 1));
  }, [fetchSurvey]);

  /* deep link: #profile=<id> */
  useEffect(() => {
    const check = () => {
      const m = /profile=([\w-]+)/.exec(location.hash);
      if (!m || !survey) return;
      if (survey.profiles.some((p) => p.id === m[1])) openItem(m[1], 'run');
    };
    check();
    addEventListener('hashchange', check);
    return () => removeEventListener('hashchange', check);
  }, [survey]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const i18n = useMemo(() => makeT(lang, content), [lang, content, uiTick]);
  useEffect(() => {
    const onFail = () => toast(i18n.t('save.failed'), 'warn', '⚠️', 5200);
    window.addEventListener('mho:save-failed', onFail);
    return () => window.removeEventListener('mho:save-failed', onFail);
  }, [toast, i18n]);
  useEffect(() => {
    if (!open || !survey?.pending?.[open.id]) return undefined;
    let alive = true;
    ensureProfile(survey, open.id, store)
      .then((next) => { if (alive) setSurvey(next); })
      .catch(() => {
        if (!alive) return;
        setOpen(null);
        toast(i18n.t('load.failed'), 'warn', '⚠️', 5200);
      });
    return () => { alive = false; };
  }, [open, survey]); // eslint-disable-line react-hooks/exhaustive-deps
  const statuses = useMemo(
    () => (survey ? allStatuses(survey, saved.answers, saved.meta, geoStore) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [survey, saved.answers, saved.meta, geoTick]
  );
  const access = useMemo(() => (survey && statuses ? accessOf(survey, statuses) : null), [survey, statuses]);
  const shown = totals(saved.meta, saved.delivered);
  const name = firstNameOf(saved.answers);

  /* ---- pause the animations of everything that is off screen (smooth scrolling on low-end phones) ---- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver !== 'function') return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('mho-off', !e.isIntersecting)), { rootMargin: '120px 0px' });
    const watch = () => root.querySelectorAll('.amb-o, .pulse, .block, .pcard, .scard, .shead').forEach((el) => { if (!el.dataset.io) { el.dataset.io = 1; io.observe(el); } });
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(root, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  /* ---- global click sound: any button / link / option in the section ---- */
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.(CLICKABLE);
      if (!el || !el.closest('.mho-app')) return;
      sound.unlock();
      sound.click(el.matches('[role="tab"], [role="option"]') ? 'soft' : 'press');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* ---- actions ---- */
  const accessRef = useRef(null);
  accessRef.current = access;
  const openItem = useCallback((id, mode = 'run', at) => {
    if (!survey) return;
    const ac = accessRef.current?.map[id];
    if (ac?.locked && mode === 'run') { setLocked(id); return; }
    sound.unlock();
    sound.open(id);
    store.markStarted(id);
    setOpen({ id, mode, at });
  }, [survey]);
  const showLocked = useCallback((id) => { sound.unlock(); setLocked(id); }, []);
  /* the member area opens a profile by its database slug or name, the package by its own id: accept all three */
  const surveyRef = useRef(null);
  surveyRef.current = survey;
  const wantRef = useRef(null);
  const resolveId = (want) => {
    const ps = surveyRef.current?.profiles;
    if (!ps) return null;
    const w = String(want ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
    const src = sourceOfSlug(w);
    const hit = ps.find((p) => p.id === want) || ps.find((p) => String(p.source || '').toLowerCase() === w) || (src && ps.find((p) => String(p.source || '').toLowerCase() === src));
    return hit ? hit.id : null;
  };
  useEffect(() => {
    controller.attach({ open: (want) => {
      const id = resolveId(want);
      if (id) openItem(id, 'run');
      else if (!surveyRef.current) { wantRef.current = want; }
    } });
  }, [openItem]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!survey || !wantRef.current) return;
    const id = resolveId(wantRef.current);
    wantRef.current = null;
    if (id) openItem(id, 'run');
  }, [survey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!survey || !access || !statuses) return;
    controller.publish(access.surveys.map((p) => ({
      id: p.id,
      name: p.title,
      points: rewardOf(p.id).pts,
      questions: p.questions.length,
      pct: statuses.map[p.id].pct,
      done: statuses.map[p.id].status === 'done',
      locked: access.map[p.id].locked,
      p,
      st: statuses.map[p.id],
      ac: access.map[p.id],
      completedAt: saved.meta.completed?.[p.id],
    })));
  }, [survey, access, statuses, saved.meta]);

  const closeRunner = useCallback(() => {
    setOpen(null);
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  }, []);
  useEffect(() => { lockScroll(!!open); return () => { if (open) lockScroll(false); }; }, [open]);

  /** the next item the patient should do after `id` (respects the locks) */
  const nextAfter = useCallback((id, meta) => {
    if (!survey) return null;
    const st = allStatuses(survey, store.get().answers, meta || store.get().meta, geoStore);
    const ac = accessOf(survey, st);
    const nid = ac.nextProfile || ac.nextSurvey;
    return nid && nid !== id ? survey.profiles.find((p) => p.id === nid) : null;
  }, [survey]);

  /* ---- rewards: tell the host + backend ---- */
  const full = totals(saved.meta);
  const completedKey = completedIds(saved.meta).sort().join(',');
  useEffect(() => {
    const detail = { points: full.pts, qualityScore: full.qs, level: levelOf(full.qs).key, completed: completedIds(saved.meta) };
    window.dispatchEvent(new CustomEvent('mho:rewards', { detail }));
    try { cfg().onRewards?.(detail); } catch {}
  }, [completedKey, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- delivery: after the question flow closes, every new completion fills its well and flies to the header ---- */
  const delivering = useRef(false);
  useEffect(() => {
    if (open || !survey || !access || delivering.current) return;
    const pend = pendingDelivery(saved.meta, saved.delivered);
    const unlockNew = access.surveys.find((p) => !access.map[p.id].locked && statuses.map[p.id].status !== 'done' && !saved.unlockSeen?.[p.id]);
    if (!pend.length && !unlockNew) return;
    delivering.current = true;
    (async () => {
      await wait(350);
      for (const id of pend) {
        const before = totals(store.get().meta, store.get().delivered).qs;
        if (pulseRef.current) await pulseRef.current.deliver(id, { prevQs: before });
        else await wait(200);
        store.markDelivered(id);
        await wait(250);
      }
      if (unlockNew) {
        const card = rootRef.current?.querySelector('#mho-surveys');
        card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        await wait(700);
        sound.unlocked();
        if (Object.keys(saved.unlockSeen || {}).length === 0) toast(i18n.t('sv.unlockedAll'), 'ok', '🔓', 4200);
        await wait(2600);
        store.markUnlockSeen(unlockNew.id);
      }
      delivering.current = false;
    })();
  }, [open, survey, access, saved.meta, saved.delivered, saved.unlockSeen]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextItem = access && survey ? survey.profiles.find((p) => p.id === (access.nextProfile || access.nextSurvey)) : null;
  const goRewards = () => rootRef.current?.querySelector('#mho-rewards, #mho-surveys')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <I18nCtx.Provider value={i18n}>
      <div className={'mho-app mho-section view-' + view} ref={rootRef}>
        {view !== 'headless' && <Ambient />}
        {view !== 'headless' && <div className="mho-main" inert={open ? true : undefined}>
          {view !== 'surveys' && c.showHero !== false && (
            <Hero name={name} access={access} statuses={statuses} next={nextItem} onStart={(id) => (id ? openItem(id, 'run') : goRewards())} />
          )}
          {view !== 'surveys' && (
            <PulseMonitor ref={pulseRef} survey={survey} statuses={statuses} access={access} delivered={saved.delivered}
              pts={shown.pts} qs={shown.qs} name={name} onOpen={openItem} onLocked={showLocked} />
          )}
          <Dashboard view={view} survey={survey} error={surveyErr} onRetry={() => { loading.current = false; fetchSurvey(); }}
            statuses={statuses} access={access} meta={saved.meta} unlockSeen={saved.unlockSeen} onOpen={openItem} onLocked={showLocked} />
        </div>}
      </div>
      {locked && survey && access && (
        <LockedDialog survey={survey} statuses={statuses} access={access} id={locked} name={name} onOpen={openItem} onClose={() => setLocked(null)} />
      )}
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
              nextAfter={nextAfter}
              onClose={closeRunner}
              onOpen={openItem}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      {cardEntries.map((e) => createPortal(<CardMount item={e.item} onOpen={openItem} onLocked={showLocked} />, e.el, e.key))}
    </I18nCtx.Provider>
  );
}

/** <MHOPatientSection view="all|profiles|surveys" /> — the dashboard section */
export default function App(props) {
  return (
    <ToastProvider>
      <Section {...props} />
    </ToastProvider>
  );
}
