import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { HeadContext } from './seo/Seo.jsx';
import { PagesContext } from './router/pages.js';
import { eagerPages } from './router/eagerPages.js';

export { ALL_ROUTES, STATIC_ROUTES, BLOG_ROUTES } from './routes.js';
export { SITE_URL } from './data/site.js';

export function render(url) {
  const headCtx = { head: '' };
  const html = renderToString(
    <HeadContext.Provider value={headCtx}>
      <PagesContext.Provider value={eagerPages}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </PagesContext.Provider>
    </HeadContext.Provider>
  );
  return { html, head: headCtx.head };
}
