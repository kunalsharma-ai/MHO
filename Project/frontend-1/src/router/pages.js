import { createContext } from 'react';
import { matchPath } from 'react-router-dom';

// Single route table. App.jsx renders it; main.jsx uses it to download the right page before hydrating;
// Layout uses it to prefetch a page when a visitor hovers or touches a link.
// Add new pages here (and in src/routes.js for the sitemap/prerender list).
export const PAGE_ROUTES = [
  { path: '/', page: 'Home' },
  { path: '/how-it-works', page: 'HowItWorks' },
  { path: '/rewards-and-payouts', page: 'Rewards' },
  { path: '/paid-surveys-for-consumers', page: 'Consumers' },
  { path: '/paid-surveys-for-professionals', page: 'Professionals' },
  { path: '/who-can-join', page: 'WhoCanJoin' },
  { path: '/quality-and-data-security', page: 'Quality' },
  { path: '/about-us', page: 'About' },
  { path: '/faq', page: 'Faq' },
  { path: '/contact-us', page: 'Contact' },
  { path: '/blog', page: 'BlogList' },
  { path: '/blog/:slug', page: 'BlogPost' },
  { path: '/sign-up', page: 'SignUp' },
  { path: '/login', page: 'Login' },
  { path: '/set-password', page: 'SetPassword' },
   { path: '/forgot-password', page: 'ForgotPassword' },
  { path: '/privacy', page: 'LegalPage', props: { id: 'privacy' } },
  { path: '/gdpr', page: 'LegalPage', props: { id: 'gdpr' } },
  { path: '/cookies', page: 'LegalPage', props: { id: 'cookies' } },
  { path: '/terms', page: 'LegalPage', props: { id: 'terms' } },
  { path: '/profiling', page: 'LegalPage', props: { id: 'profiling' } },
  { path: '*', page: 'NotFound' },
];

export function pageFor(pathname = '/') {
  const clean = (pathname.split(/[?#]/)[0].replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/');
  const hit = PAGE_ROUTES.find((r) => r.path !== '*' && matchPath({ path: r.path, end: true }, clean));
  return hit ? hit.page : 'NotFound';
}

// { get(name) → component | undefined, load(name) → Promise }
export const PagesContext = createContext(null);
