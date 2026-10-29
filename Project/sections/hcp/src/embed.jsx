/**
 * Dashboard embed entry — mounts the HCP "My Profile" section inside YOUR dashboard page.
 *
 *   <link rel="stylesheet" href="/mho-hcp/mho-hcp-section.css">
 *   <div id="mho-profile"></div>
 *   <script src="/mho-hcp/mho-hcp-section.js"></script>
 *   <script>
 *     MHOProfileSection.mount('#mho-profile', {
 *       assetBase: '/mho-hcp/',                          // where dist-embed/ is served from
 *       user: { firstName: 'Kunal', panelistId: 'P-1029' },
 *       lang: 'en',                                      // optional – otherwise saved choice / browser language
 *       routing: 'memory',                               // default; 'hash' to use #/profile/<slug> links
 *       config: { apiBase: 'https://api.example.com', rewards: { pointsPerProfile: 50 } },
 *     });
 *   </script>
 *
 * Theme, language palette and direction live on the mount element; all CSS is scoped to `.mho-hcp`, so nothing changes
 * in the rest of your dashboard. See docs/DASHBOARD_INTEGRATION.md.
 */
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './store.jsx';
import App from './App.jsx';
import CardHost from './components/CardHost.jsx';
import { I18nProvider } from './i18n/index.jsx';
import { cards } from './lib/cards.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { setHost } from './lib/host.js';
import { setRouterMode, go } from './lib/router.js';
import { boot } from './lib/bridge.js';
import './styles/hcp.css';

let current = null;

async function mount(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error('MHOProfileSection: mount element not found');
  if (current) current.unmount();
  const prev = window.MHO_CONFIG || {};
  window.MHO_CONFIG = {
    ...prev,
    ...(opts.config || {}),
    assetBase: opts.assetBase ?? prev.assetBase ?? '',
    user: { ...(prev.user || {}), ...(opts.user || {}) },
    lang: opts.lang || prev.lang,
    embedded: true,
    disableSW: true,
  };
  if (opts.user?.panelistId) { try { localStorage.setItem('mho-pid', String(opts.user.panelistId)); } catch { /* ignore */ } }
  setRouterMode(opts.routing === 'hash' ? 'hash' : 'memory');
  const headless = opts.view === 'headless';
  const start = headless ? {} : await boot();
  el.classList.add('mho-hcp');
  if (headless) {
    el.style.minHeight = '0';
    el.style.background = 'transparent';
  }
  setHost(el);
  const root = createRoot(el);
  root.render(
    <ErrorBoundary onReset={() => go('')}>
      {headless ? (
        <I18nProvider lang="en">
          <CardHost />
        </I18nProvider>
      ) : (
        <StoreProvider boot={start}>
          <App userName={opts.user?.firstName} />
        </StoreProvider>
      )}
    </ErrorBoundary>
  );
  current = {
    el,
    items: () => [],
    subscribe: () => () => {},
    setCard: cards.set,
    removeCard: cards.remove,
    open: (slug) => go(`profile/${slug}`),
    unmount() {
      root.unmount();
      el.classList.remove('mho-hcp');
      setHost(null);
      current = null;
    },
  };
  return current;
}

window.MHOProfileSection = { mount, unmount: () => current?.unmount(), open: (slug) => current?.open(slug), version: '3.0.0' };
