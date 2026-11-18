// Route → page module map. Pages are code-split: the browser downloads only the page it needs.
// The prerenderer (src/entry-server.jsx) seeds `loaded` with eager imports from ./all.js instead.
// To add a page: create src/pages/<Name>.jsx, add it here AND in ./all.js, then add its SEO entry
// in src/seo/pages.js (title, description, keywords, sitemap).
import { normalize } from '../router.jsx';

export const ROUTES = {
  '/': 'Home',
  '/about-us': 'About',
  '/earn': 'Earn',
  '/healthcare-professionals': 'Audience',
  '/caregivers': 'Audience',
  '/patients': 'Audience',
  '/how-it-works': 'HowItWorks',
  '/rewards': 'Rewards',
  '/trust-safety': 'TrustSafety',
  '/blog': 'Blog',
  '/reviews': 'Reviews',
  '/scan-and-connect': 'ScanConnect',
  '/faq': 'Faq',
  '/contact': 'Contact',
  '/join': 'Join',
  '/login': 'Login',
  '/complete-profile': 'CompleteProfile',
  '/auth/password': 'Password',
  '/create-password': 'Password',
  '/reset-password': 'Password',
  '/privacy': 'Legal',
  '/gdpr': 'Legal',
  '/cookies': 'Legal',
  '/terms': 'Legal',
  '/profiling': 'Profiling',
  '/sitemap': 'Sitemap',
};

export const LOADERS = {
  Home: () => import('./Home.jsx'),
  About: () => import('./About.jsx'),
  Earn: () => import('./Earn.jsx'),
  Audience: () => import('./Audience.jsx'),
  HowItWorks: () => import('./HowItWorks.jsx'),
  Rewards: () => import('./Rewards.jsx'),
  TrustSafety: () => import('./TrustSafety.jsx'),
  Blog: () => import('./Blog.jsx'),
  BlogPost: () => import('./BlogPost.jsx'),
  Reviews: () => import('./Reviews.jsx'),
  ScanConnect: () => import('./ScanConnect.jsx'),
  Faq: () => import('./Faq.jsx'),
  Contact: () => import('./Contact.jsx'),
  Join: () => import('./Join.jsx'),
  Login: () => import('./Login.jsx'),
  CompleteProfile: () => import('./CompleteProfile.jsx'),
  Password: () => import('./Password.jsx'),
  Legal: () => import('./Legal.jsx'),
  Profiling: () => import('./Profiling.jsx'),
  Sitemap: () => import('./Sitemap.jsx'),
  NotFound: () => import('./NotFound.jsx'),
};

/** Components already downloaded (key → component). */
export const loaded = {};

export function pageKeyFor(rawPath) {
  const path = normalize(rawPath);
  if (ROUTES[path]) return ROUTES[path];
  if (/^\/blog\/[a-z0-9-]+$/.test(path)) return 'BlogPost';
  return 'NotFound';
}

export async function loadPage(key) {
  if (!loaded[key]) loaded[key] = (await LOADERS[key]()).default;
  return loaded[key];
}
