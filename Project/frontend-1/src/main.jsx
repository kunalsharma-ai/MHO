import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { PagesContext, pageFor } from './router/pages.js';
import { lazyPages } from './router/lazyPages.js';
import './styles/global.css';
import './styles/sections.css';
import './styles/pages.css';
import './styles/widgets.css';
import './styles/community.css';
import './styles/auth.css';
import './styles/chat.css';
import './styles/brand.css';
import './styles/blog.css';
import './styles/scenes.css';
import './styles/contact.css';
import './styles/cursor.css';
import './styles/perf.css';

document.documentElement.classList.add('js');

// Routing strategy (prevents "404 – This page wandered off" when the site is opened in an unexpected way):
// • VITE_ROUTER=hash (single-file preview) or the site opened straight from disk (file://) → HashRouter.
// • Otherwise BrowserRouter with clean URLs.
const useHash = import.meta.env.VITE_ROUTER === 'hash' || window.location.protocol === 'file:';
if (useHash && window.location.protocol === 'file:' && !window.location.hash) window.location.hash = '#/';
const Router = useHash ? HashRouter : BrowserRouter;

const normalize = (p) => (p.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/');

const tree = (
  <StrictMode>
    <PagesContext.Provider value={lazyPages}>
      <Router>
        <App />
      </Router>
    </PagesContext.Provider>
  </StrictMode>
);

const root = document.getElementById('root');
// Hydrate only when the prerendered HTML belongs to THIS url. If a host served index.html or 404.html as a
// fallback for another route, render fresh on the client so the correct page appears instead of a 404.
const prerenderedFor = root.getAttribute('data-route');
const matches = !useHash && root.hasChildNodes() && prerenderedFor && normalize(prerenderedFor) === normalize(window.location.pathname);
// Download the current page's chunk first, so hydration renders exactly the prerendered markup.
const currentPath = useHash ? (window.location.hash.slice(1) || '/') : window.location.pathname;
const start = () => {
  if (matches) hydrateRoot(root, tree);
  else {
    root.innerHTML = '';
    createRoot(root).render(tree);
  }
};
lazyPages.load(pageFor(currentPath)).then(start, start);
