// `vite preview` behaves like the production static host (see docker/nginx.conf):
//   /about-us   → 301 /about-us/
//   /about-us/  → dist/about-us/index.html (Vite's own html fallback + static middleware)
//   unknown URL → dist/404.html with HTTP 404
import fs from 'node:fs';
import path from 'node:path';

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();

export function previewNotFoundPage() {
  return {
    name: 'mho:preview-404',
    configurePreviewServer(server) {
      const distDir = path.resolve(server.config.root, server.config.build.outDir);
      return () => {
        server.middlewares.use((req, res, next) => {
          const [rawPath, query] = (req.url || '/').split('#')[0].split('?');
          const pathname = decodeURIComponent(rawPath);
          const target = path.join(distDir, pathname);
          if (!target.startsWith(distDir)) return next();

          // A real file (Vite has already rewritten "/about-us/" to "/about-us/index.html"): let Vite serve it.
          if (isFile(target)) return next();

          // "/about-us" → "/about-us/" like the production host.
          if (!pathname.endsWith('/') && isFile(path.join(target, 'index.html'))) {
            res.statusCode = 301;
            res.setHeader('Location', pathname + '/' + (query ? '?' + query : ''));
            return res.end();
          }

          const notFound = path.join(distDir, '404.html');
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(isFile(notFound) ? fs.readFileSync(notFound) : 'Not found');
        });
      };
    },
  };
}
