// Every prerendered / sitemap URL. Add new pages here AND in App.jsx.
import { BLOG_META as BLOGS } from './data/blogs/meta.js';

export const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly' },
  { path: '/rewards-and-payouts', priority: '0.9', changefreq: 'monthly' },
  { path: '/paid-surveys-for-consumers', priority: '0.9', changefreq: 'monthly' },
  { path: '/paid-surveys-for-professionals', priority: '0.9', changefreq: 'monthly' },
  { path: '/who-can-join', priority: '0.8', changefreq: 'monthly' },
  { path: '/quality-and-data-security', priority: '0.8', changefreq: 'monthly' },
  { path: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.6', changefreq: 'yearly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/sign-up', priority: '0.8', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly' },
  { path: '/gdpr', priority: '0.4', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly' },
  { path: '/profiling', priority: '0.5', changefreq: 'yearly' },
];

// Prerendered but excluded from the sitemap (noindex)
export const NOINDEX_ROUTES = [{ path: '/login' }, { path: '/auth/password' }, { path: '/404' }];

export const BLOG_ROUTES = BLOGS.map((b) => ({ path: `/blog/${b.slug}`, priority: '0.7', changefreq: 'monthly', lastmod: b.updated || b.date }));

export const ALL_ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES, ...NOINDEX_ROUTES];
