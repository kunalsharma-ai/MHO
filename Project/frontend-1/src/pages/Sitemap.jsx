// Human-readable sitemap (helps visitors and crawlers find every page).
import PageHero from '../components/PageHero.jsx';
import { DocHeroArt } from '../components/HeroArt.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router.jsx';
import { PAGES } from '../seo/pages.js';
import { BLOGS, BLOG_CATEGORIES } from '../data/blogs/index.js';

const GROUPS = [
  ['Explore', ['/', '/about-us', '/how-it-works', '/rewards', '/trust-safety', '/reviews']],
  ['Who it’s for', ['/healthcare-professionals', '/caregivers', '/patients', '/earn']],
  ['Help', ['/faq', '/contact', '/join', '/login']],
  ['Legal', ['/privacy', '/cookies', '/terms', '/gdpr', '/profiling']],
];

export default function Sitemap() {
  return (
    <>
      <PageHero
        theme="legal"
        eyebrow="Sitemap"
        title={['Every page,', { t: 'one place', hl: 'grad' }]}
        lead="Browse every MyHealthOpinions page and all of our guides to paid surveys, earning online and healthcare research."
        art={<DocHeroArt icon="list" />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Sitemap' }]}
      />
      <section className="section sitemap">
        <div className="container sm-grid">
          {GROUPS.map(([t, paths]) => (
            <nav key={t} className="sm-col" aria-label={t}>
              <h2>{t}</h2>
              <ul>{paths.map((p) => <li key={p}><Link to={p}><Icon name="arrow" size={13} />{PAGES[p].name}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="container">
          <h2 className="sm-blog-title">Blogs & guides</h2>
          <div className="sm-blog">
            {BLOG_CATEGORIES.map((c) => (
              <nav key={c} aria-label={c}>
                <h3>{c}</h3>
                <ul>{BLOGS.filter((b) => b.category === c).map((b) => <li key={b.slug}><Link to={`/blog/${b.slug}`}>{b.title}</Link></li>)}</ul>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
