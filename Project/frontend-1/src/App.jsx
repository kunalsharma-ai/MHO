// Application shell: router, header/footer, page switching, per-route <head> updates and the
// site-wide widgets (live help, rate-your-experience, reward toasts, cookie consent, cursor), the language
// system (picker, page translation, colour grades, sounds) and the off-screen animation gate.
import { lazy, Suspense, useEffect, useReducer, useRef } from 'react';
import { Router, useRouter } from './router.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import PageVideoBand from './components/PageVideoBand.jsx';
import { useMounted } from './components/ui.jsx';
import { loaded, loadPage, pageKeyFor } from './pages/registry.js';
import { postCache } from './data/blogs/postStore.js';
import { getMeta, applyHead } from './seo/head.js';
import { track, socialReturnTarget } from './utils/helpers.js';
import { syncPendingAnswersSoon } from './utils/pendingAnswers.js';
import AnimationGate from './components/AnimationGate.jsx';
import { I18nProvider } from './i18n/I18nProvider.jsx';
import { LanguagePicker, TranslateStatus } from './components/Language.jsx';

// Widgets that only appear after the page is interactive are separate chunks, so the first load ships less
// JavaScript (they never render during prerender/hydration, see `mounted` below).
const Cursor = lazy(() => import('./components/Cursor.jsx'));
const LiveChat = lazy(() => import('./components/LiveChat.jsx'));
const RateExperience = lazy(() => import('./components/RateExperience.jsx'));
const RewardToasts = lazy(() => import('./components/RewardToasts.jsx'));
const CookieBanner = lazy(() => import('./components/CookieBanner.jsx'));
const VideoFab = lazy(() => import('./components/VideoFab.jsx'));
// Same event as openCookieSettings() in CookieBanner.jsx (kept here so the banner can load lazily).
const openCookieSettings = () => window.dispatchEvent(new Event('mho-cookie-settings'));

// Forms where review prompts and reward pop-ups would distract (no reviews on sign-up / log-in).
const QUIET_ROUTES = ['/join', '/login'];

function Shell() {
  const { path } = useRouter();
  const mounted = useMounted();
  const key = pageKeyFor(path);
  const [, rerender] = useReducer((x) => x + 1, 0);
  const last = useRef(null);

  const Page = loaded[key];
  if (Page) last.current = { Page, path };

  useEffect(() => {
    if (!loaded[key]) loadPage(key).then(rerender).catch(() => rerender());
  }, [key]);

  // Sign-up answers still waiting in this browser are saved as soon as the person is logged in (no network call when nothing waits,
  // and at most one try per minute).
  useEffect(() => {
    syncPendingAnswersSoon();
  }, []);

  // After a social sign-in the backend sends the browser to "/?signup=1&name=…&email=…" or "/?verifyemail=…".
  // Sign-up lives on /join here, so forward those links (only from the home address).
  useEffect(() => {
    if (path !== '/') return;
    const to = socialReturnTarget(window.location.search);
    if (to) window.location.replace(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const slug = path.startsWith('/blog/') ? path.slice(6) : null;
    applyHead(getMeta(path, { post: slug ? postCache[slug] : null }));
    track('page_view', { page_path: path });
  }, [path]);

  const quiet = QUIET_ROUTES.includes(path);
  const Show = Page || last.current?.Page;
  const shownPath = Page ? path : last.current?.path;

  return (
    <>
      {mounted && (
        <Suspense fallback={null}>
          <Cursor />
        </Suspense>
      )}
      {mounted && <AnimationGate />}
      <Header />
      <main id="main" tabIndex={-1} className={`page page-${key.toLowerCase()} ${Page ? '' : 'is-loading'}`} key={shownPath}>
        {Show ? <Show path={shownPath} /> : <div className="page-loader" aria-label="Loading" />}
      </main>
      {Page && key !== 'NotFound' && <PageVideoBand />}
      <Footer onCookieSettings={openCookieSettings} />
      {mounted && (
        <Suspense fallback={null}>
          <LiveChat />
          <RateExperience suppressed={quiet} />
          {!quiet && <RewardToasts />}
          <CookieBanner />
          <VideoFab />
          <LanguagePicker />
          <TranslateStatus />
        </Suspense>
      )}
    </>
  );
}

export default function App({ initialPath = '/' }) {
  return (
    <Router initialPath={initialPath}>
      <I18nProvider>
        <Shell />
      </I18nProvider>
    </Router>
  );
}
