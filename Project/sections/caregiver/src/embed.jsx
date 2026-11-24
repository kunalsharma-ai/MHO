
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { controller } from './lib/controller.js';
import { cards } from './lib/cards.js';
import { loadUI } from './i18n/index.js';
import { store } from './lib/store.js';
import { setHost } from './lib/host.js';
import './styles/app.css';
import './styles/dashboard.css';

let current = null;

async function mount(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) throw new Error('MHOProfileSection: mount element not found');
  if (current) current.unmount();
  const prev = window.MHO_CONFIG || {};
  const assetBase = opts.assetBase ?? prev.assetBase ?? '';
  window.MHO_CONFIG = {
    ...prev,
    ...(opts.config || {}),
    assetBase,
    dataBase: (opts.config && opts.config.dataBase) || prev.dataBase || (assetBase ? assetBase.replace(/\/?$/, '/') + 'data/' : 'data/'),
    user: { ...(prev.user || {}), ...(opts.user || {}) },
    lang: opts.lang || prev.lang,
    theme: opts.theme || prev.theme,
    disableSW: true,
  };
  if (opts.user?.respondentId) store.set({ rid: String(opts.user.respondentId) });
  el.classList.add('mho-pp');
  if (opts.view === 'headless') {
    el.style.minHeight = '0';
    el.style.background = 'transparent';
  }
  setHost(el);
  await loadUI(window.MHO_CONFIG.lang || 'en');
  const root = createRoot(el);
  const view = opts.view || 'all';
  root.render(<App userName={opts.user?.firstName} view={view} />);
  current = {
    el,
    items: controller.items,
    open: controller.open,
    subscribe: controller.subscribe,
    setCard: cards.set,
    removeCard: cards.remove,
    unmount() {
      root.unmount();
      el.classList.remove('mho-pp');
      setHost(null);
      current = null;
    },
  };
  return current;
}

window.MHOProfileSection = { mount, unmount: () => current?.unmount(), version: '2.0.0' };
