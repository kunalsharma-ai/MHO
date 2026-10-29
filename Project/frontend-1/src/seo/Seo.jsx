import { createContext, useContext, useEffect } from 'react';
import { BRAND, SITE_URL } from '../data/site.js';

// Lightweight head manager (no extra dependency).
// - During prerender (SSR) the meta is pushed into HeadContext and written into static HTML.
// - In the browser, it updates <head> on every route change.
export const HeadContext = createContext(null);

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildHead({ title, description, path = '/', image, type = 'website', noindex = false, jsonLd = [], keywords }) {
  const url = SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''));
  const img = SITE_URL + (image || BRAND.ogImage);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    keywords ? `<meta name="keywords" content="${esc(keywords)}" />` : '',
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${BRAND.name}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    ...jsonLd.filter(Boolean).map(
      (obj) => `<script type="application/ld+json" data-seo="1">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function Seo(props) {
  const ctx = useContext(HeadContext);
  if (ctx) ctx.head = buildHead(props); // SSR / prerender path

  const { title, description, path = '/', image, type = 'website', noindex = false, jsonLd = [], keywords } = props;
  useEffect(() => {
    const url = SITE_URL + (path === '/' ? '/' : path.replace(/\/$/, ''));
    const img = SITE_URL + (image || BRAND.ogImage);
    document.title = title;
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
    document.head.querySelectorAll('script[data-seo="1"]').forEach((s) => s.remove());
    jsonLd.filter(Boolean).forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = '1';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [title, description, path, image, type, noindex, keywords, JSON.stringify(jsonLd)]);

  return null;
}
