// Builds the <head> for any route. Used by the prerenderer (string) and by client-side navigation (DOM).
import { PAGES } from './pages.js';
import { SITE, SITE_URL } from '../config/site.js';
import { BLOGS, findBlog } from '../data/blogs/index.js';
import { FAQ_GROUPS } from '../data/faqs.js';
import { AUDIENCE_FAQ } from '../data/audiences.js';
import { normalize } from '../router.jsx';

const OG_IMAGE = '/images/og-myhealthopinions.png';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const canonicalFor = (path) => SITE_URL + (path === '/' ? '/' : path + '/');

const ORG = {
  '@type': 'Organization',
  '@id': SITE_URL + '/#organization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL + '/',
  logo: SITE_URL + '/images/myhealthopinions-logo.png',
  email: SITE.email,
  telephone: SITE.phoneHref,
  foundingDate: String(SITE.foundingYear),
  address: { '@type': 'PostalAddress', addressLocality: 'Mangolpur Kalan, New Delhi', postalCode: '110085', addressCountry: 'IN' },
  sameAs: SITE.socials.map((s) => s.url),
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: SITE.email, telephone: SITE.phoneHref, availableLanguage: ['English'] }],
};

// LocalBusiness: the registered office in New Delhi (Local SEO / Google Business Profile match).
const LOCAL_BUSINESS = {
  '@type': 'LocalBusiness',
  '@id': SITE_URL + '/#localbusiness',
  name: SITE.name,
  legalName: SITE.legalName,
  description:
    'MyHealthOpinions is a free paid-survey community where healthcare professionals, caregivers, patients and consumers earn rewards for sharing opinions in market research.',
  url: SITE_URL + '/',
  logo: ORG.logo,
  image: SITE_URL + OG_IMAGE,
  email: SITE.email,
  telephone: SITE.phoneHref,
  priceRange: 'Free to join',
  foundingDate: String(SITE.foundingYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address[0],
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  areaServed: 'Worldwide',
  parentOrganization: { '@id': ORG['@id'] },
  sameAs: ORG.sameAs,
};

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: canonicalFor(it.path) })),
  };
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function getMeta(rawPath, opts = {}) {
  const path = normalize(rawPath);
  const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);

  if (blogMatch) {
    const post = findBlog(blogMatch[1]);
    if (post) {
      const url = canonicalFor(path);
      return {
        path,
        title: post.metaTitle,
        description: post.metaDescription,
        canonical: url,
        robots: 'index, follow, max-image-preview:large',
        ogType: 'article',
        image: OG_IMAGE,
        keywords: [post.primary, ...post.secondary],
        jsonLd: [
          {
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            author: { '@id': ORG['@id'] },
            publisher: { '@id': ORG['@id'] },
            mainEntityOfPage: url,
            image: SITE_URL + OG_IMAGE,
            keywords: [post.primary, ...post.secondary].join(', '),
            articleSection: post.category,
          },
          ORG,
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blog' },
            { name: post.title, path },
          ]),
          ...(opts.post?.faqs?.length ? [faqSchema(opts.post.faqs)] : []),
        ],
      };
    }
  }

  const key = PAGES[path] ? path : '/404';
  const page = PAGES[key];
  const jsonLd = [];
  if (key === '/') {
    jsonLd.push(ORG, LOCAL_BUSINESS, {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      name: SITE.name,
      url: SITE_URL + '/',
      publisher: { '@id': ORG['@id'] },
      inLanguage: 'en',
    });
  } else if (key !== '/404') {
    if (key === '/about-us' || key === '/contact') jsonLd.push(ORG, LOCAL_BUSINESS);
    jsonLd.push(breadcrumb([{ name: 'Home', path: '/' }, { name: page.name, path: key }]));
    if (page.schema === 'FAQPage') jsonLd.push(faqSchema(FAQ_GROUPS.flatMap((g) => g.items)));
    if (page.faqKey && AUDIENCE_FAQ[page.faqKey]) jsonLd.push(faqSchema(AUDIENCE_FAQ[page.faqKey]));
    if (page.schema === 'ContactPage') jsonLd.push({ '@type': 'ContactPage', name: page.title, url: canonicalFor(key), about: { '@id': ORG['@id'] } });
    if (key === '/blog')
      jsonLd.push({
        '@type': 'Blog',
        name: 'MyHealthOpinions Blog',
        url: canonicalFor('/blog'),
        blogPost: BLOGS.map((b) => ({ '@type': 'BlogPosting', headline: b.title, url: canonicalFor('/blog/' + b.slug), datePublished: b.date })),
      });
  }

  return {
    path: key === '/404' ? path : key,
    title: page.title,
    description: page.description,
    canonical: key === '/404' ? null : canonicalFor(key),
    robots: page.robots || 'index, follow, max-image-preview:large',
    ogType: 'website',
    image: OG_IMAGE,
    keywords: page.primary ? [page.primary, ...(page.secondary || [])] : [],
    jsonLd,
    status: key === '/404' ? 404 : 200,
  };
}

function ldString(meta) {
  if (!meta.jsonLd.length) return '';
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': meta.jsonLd }).replace(/</g, '\\u003c');
}

/** <head> markup for prerendered HTML. */
export function headString(meta) {
  const img = SITE_URL + meta.image;
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    meta.canonical ? `<link rel="canonical" href="${meta.canonical}" />` : '',
    // One English URL per page; other languages are an on-page switcher, not separate URLs.
    meta.canonical ? `<link rel="alternate" hreflang="en" href="${meta.canonical}" />` : '',
    meta.canonical ? `<link rel="alternate" hreflang="x-default" href="${meta.canonical}" />` : '',
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    meta.canonical ? `<meta property="og:url" content="${meta.canonical}" />` : '',
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name + ' paid surveys community')}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    SITE.xHandle ? `<meta name="twitter:site" content="${esc(SITE.xHandle)}" />` : '',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    meta.jsonLd.length ? `<script type="application/ld+json" id="ld-json">${ldString(meta)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

/** Update the live document head after client-side navigation. */
export function applyHead(meta) {
  if (typeof document === 'undefined') return;
  document.title = meta.title;
  const set = (selector, attr, create, value) => {
    let el = document.head.querySelector(selector);
    if (value == null) return el?.remove();
    if (!el) {
      el = document.createElement(create.tag);
      Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const metaName = (n, v) => set(`meta[name="${n}"]`, 'content', { tag: 'meta', attrs: { name: n } }, v);
  const metaProp = (p, v) => set(`meta[property="${p}"]`, 'content', { tag: 'meta', attrs: { property: p } }, v);
  metaName('description', meta.description);
  metaName('robots', meta.robots);
  set('link[rel="canonical"]', 'href', { tag: 'link', attrs: { rel: 'canonical' } }, meta.canonical);
  set('link[rel="alternate"][hreflang="en"]', 'href', { tag: 'link', attrs: { rel: 'alternate', hreflang: 'en' } }, meta.canonical);
  set('link[rel="alternate"][hreflang="x-default"]', 'href', { tag: 'link', attrs: { rel: 'alternate', hreflang: 'x-default' } }, meta.canonical);
  metaProp('og:title', meta.title);
  metaProp('og:description', meta.description);
  metaProp('og:type', meta.ogType);
  metaProp('og:url', meta.canonical);
  metaName('twitter:title', meta.title);
  metaName('twitter:description', meta.description);
  let ld = document.getElementById('ld-json');
  const json = ldString(meta);
  if (!json) return ld?.remove();
  if (!ld) {
    ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'ld-json';
    document.head.appendChild(ld);
  }
  ld.textContent = json;
}
