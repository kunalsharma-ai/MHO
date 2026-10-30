import { createRoot, hydrateRoot } from 'react-dom/client';
import { StoreProvider } from './store.jsx';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { go } from './lib/router.js';
import './styles/hcp.css';

/* Stand-alone page entry (dist/). The dashboard embed entry is src/embed.jsx (dist-embed/). */
const container = document.getElementById('root');
const prerendered = container.firstElementChild !== null;
const tree = (
  <ErrorBoundary onReset={() => { go(''); location.reload(); }}>
    <StoreProvider hydrating={prerendered}>
      <App />
    </StoreProvider>
  </ErrorBoundary>
);

if (prerendered) {
  // Reuse the build-time HTML (fast LCP); fall back to a clean client render if it does not match.
  hydrateRoot(container, tree, { onRecoverableError: (e) => { if (window.__MHO_DEBUG__) console.warn('[hydration]', e); } });
} else {
  createRoot(container).render(tree);
}

// Service worker in production for instant repeat visits (never in the embed build).
if (import.meta.env.PROD && 'serviceWorker' in navigator && location.protocol === 'https:' && !(window.MHO_CONFIG && window.MHO_CONFIG.disableSW)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
