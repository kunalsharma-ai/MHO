import { startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { loadUI } from './i18n/index.js';
import { detectLanguage } from './lib/languages.js';
import { store } from './lib/store.js';
import './styles/app.css';
import './styles/dashboard.css';

const root = document.getElementById('root');
const lang = detectLanguage(store.get().lang);

function start() {
  if (lang === 'en' && root.firstElementChild) {
    // index.html already contains the pre-rendered English page → just attach React to it
    // hydrate as a transition → React yields to the browser every few ms (short tasks = low TBT)
    startTransition(() => { hydrateRoot(root, <App initialLang="en" />); });
  } else {
    root.textContent = '';
    createRoot(root).render(<App initialLang={lang} />);
  }
  requestAnimationFrame(() => document.documentElement.classList.remove('hide-ssr'));
}

/* Load the visitor's UI language (tiny chunk) before the first render → no English flash */
if (lang === 'en') start();
else loadUI(lang).then(start, start);

/* Register the service worker in production for instant repeat visits & offline use */
if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.MHO_CONFIG?.disableSW) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
