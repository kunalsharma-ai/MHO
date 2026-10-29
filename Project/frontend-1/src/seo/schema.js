// Honest Schema.org builders. No ratings/reviews markup is generated (no verified review data source).
import { BRAND, CONTACT, SITE_URL, SOCIALS } from '../data/site.js';

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: SITE_URL + '/',
  logo: SITE_URL + BRAND.logoPng,
  email: CONTACT.email,
  telephone: CONTACT.phoneHref.replace('tel:', ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.country,
  },
  parentOrganization: { '@type': 'Organization', name: BRAND.parent.name, url: BRAND.parent.url },
  sameAs: SOCIALS.map((s) => s.url),
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BRAND.name,
  url: SITE_URL + '/',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en',
});

export const webPageLd = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  description,
  url: SITE_URL + path,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: SITE_URL + it.path,
  })),
});

// FAQPage: Google limits rich results for FAQ to authoritative sites, but the markup remains valid
// and accurately represents visible on-page FAQs.
export const faqLd = (faqs = []) =>
  faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

export const articleLd = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.metaDescription,
  image: SITE_URL + post.cover,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  author: { '@type': 'Organization', name: 'MyFrequentRewards Editorial Team', url: SITE_URL + '/about-us' },
  publisher: { '@id': `${SITE_URL}/#organization` },
  mainEntityOfPage: SITE_URL + '/blog/' + post.slug,
  keywords: [post.primaryKeyword, ...(post.secondaryKeywords || [])].join(', '),
});
