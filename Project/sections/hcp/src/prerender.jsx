// Build-time prerender of the home screen (hero + vault + dashboard) into index.html so the first
// paint / LCP happens straight from HTML + CSS, before any JavaScript runs. See scripts/prerender.mjs.
import { renderToString } from 'react-dom/server';
import { StoreProvider } from './store.jsx';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export function render() {
  return renderToString(<ErrorBoundary onReset={() => {}}><StoreProvider hydrating><App /></StoreProvider></ErrorBoundary>);
}
