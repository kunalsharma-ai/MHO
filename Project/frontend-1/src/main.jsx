// Browser entry point (loaded by index.html → <script type="module" src="/src/main.jsx">).
//
// Production pages are prerendered to static HTML (scripts/prerender.mjs), so we first download the code
// for the current page, then hydrate — React attaches to the existing markup without re-rendering it.
// In `npm run dev` and the single-file preview the page is empty and React renders it from scratch.
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { currentPath } from './router.jsx';
import { ROUTER_MODE } from './config/env.js';
import { loadPage, pageKeyFor } from './pages/registry.js';
import { loadPost } from './data/blogs/postStore.js';
import './styles/index.css';


async function start() {
  const path = currentPath();
  const key = pageKeyFor(path);
  try {
    await loadPage(key);
    if (key === 'BlogPost') await loadPost(path.slice('/blog/'.length));
  } catch {
    /* network hiccup: App retries the page load itself */
  }
  const root = document.getElementById('root');
  const app = (
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>
  );
  const prerendered = ROUTER_MODE === 'history' && root.firstElementChild;
  if (prerendered) hydrateRoot(root, app);
  else createRoot(root).render(app);
  document.documentElement.classList.add('js-ready');
}

start();
