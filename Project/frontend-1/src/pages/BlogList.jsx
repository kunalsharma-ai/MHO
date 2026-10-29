import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand } from '../components/Common.jsx';
import { CoverWall } from '../components/HeroScenes.jsx';
import { PAGES } from '../data/pages.js';
import { BLOG_META as BLOGS, BLOG_CATEGORIES } from '../data/blogs/meta.js';
import { SITE_URL } from '../data/site.js';

const page = PAGES.blog;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blogs', path: page.path }];
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Category identity: icon + colour used by the topic chart, the chips and the card strips.
const CAT = {
  All: { icon: 'layers', c: '#0B1E5B' },
  'Getting Started': { icon: 'sparkle', c: '#FF8A00' },
  'Earning Ideas': { icon: 'trend', c: '#14C9B5' },
  Students: { icon: 'book', c: '#8B5CF6' },
  Rewards: { icon: 'gift', c: '#E5A100' },
  India: { icon: 'pin', c: '#FF6A00' },
  Professionals: { icon: 'briefcase', c: '#2F6BFF' },
  Safety: { icon: 'shield', c: '#0EA5A0' },
  Tips: { icon: 'star', c: '#FF5E7E' },
  'Behind the Scenes': { icon: 'eye', c: '#1E3A9E' },
};
const catOf = (c) => CAT[c] || CAT.All;

export default function BlogList() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const trending = BLOGS.filter((b) => b.trending);
  const featured = trending[0] || BLOGS[0];
  const counts = useMemo(() => Object.fromEntries(BLOG_CATEGORIES.map((c) => [c, c === 'All' ? BLOGS.length : BLOGS.filter((b) => b.category === c).length])), []);
  const maxCount = Math.max(...BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => counts[c]));
  const list = useMemo(
    () => BLOGS.filter((b) => (cat === 'All' || b.category === cat) && (b.title + b.excerpt + b.primaryKeyword).toLowerCase().includes(q.toLowerCase())),
    [cat, q]
  );
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BLOGS.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/blog/${b.slug}`, name: b.title })),
  };
  return (
    <>
      <PageSeo page={page} crumbs={crumbs} extraLd={[itemList]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Blogs"
        title={page.h1}
        lead="Trending guides on how to earn money online without investment — honest tips on paid surveys, payouts, safety and side income for consumers and professionals."
        theme="berry"
        artNode={<CoverWall posts={BLOGS.slice(0, 12)} />}
      >
        <div className="faq-search bx-search">
          <Icon name="audit" size={20} />
          <label htmlFor="blog-q" className="sr-only">Search blogs</label>
          <input id="blog-q" placeholder={`Search ${BLOGS.length} guides…`} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <ul className="bx-stats">
          <li><b>{BLOGS.length}</b> long-form guides</li>
          <li><b>{BLOG_CATEGORIES.length - 1}</b> topics</li>
          <li><b>{Math.round(BLOGS.reduce((a, b) => a + b.readMins, 0) / BLOGS.length)}</b> min avg. read</li>
        </ul>
      </PageHero>

      {/* Trending ticker */}
      <section className="bx-ticker" aria-label="Trending now">
        <span className="bx-ticker-tag"><span className="live-dot" /> Trending</span>
        <div className="bx-ticker-mask">
          <ol className="bx-ticker-track">
            {[...trending, ...trending].map((b, i) => (
              <li key={b.slug + i} aria-hidden={i >= trending.length}>
                <Link to={`/blog/${b.slug}`} tabIndex={i >= trending.length ? -1 : 0}><span>#{(i % trending.length) + 1}</span>{b.title}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured story */}
      {featured ? (
        <section className="section bx-featured" aria-labelledby="bx-feat-title">
          <div className="container bx-feat-row">
            <Link to={`/blog/${featured.slug}`} className="bx-feat-img reveal" aria-hidden="true" tabIndex={-1}>
              <img src={featured.cover} alt="" width="1200" height="675" />
              <span className="bx-feat-badge"><Icon name="trend" size={14} /> Editor’s pick</span>
            </Link>
            <div className="bx-feat-copy reveal">
              <p className="bx-cat" style={{ '--cc': catOf(featured.category).c }}><Icon name={catOf(featured.category).icon} size={14} /> {featured.category}</p>
              <h2 id="bx-feat-title"><Link to={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
              <p className="bx-feat-ex">{featured.excerpt}</p>
              <p className="bx-meta"><Icon name="calendar" size={14} /> {fmt(featured.date)} <i /> <Icon name="clock" size={14} /> {featured.readMins} min read</p>
              <Link to={`/blog/${featured.slug}`} className="btn btn-primary btn-shine">Read the guide <Icon name="arrow" size={18} /></Link>
              <ul className="bx-also">
                {trending.slice(1, 4).map((b) => (
                  <li key={b.slug}>
                    <Link to={`/blog/${b.slug}`}><img src={b.cover} alt="" width="96" height="54" loading="lazy" /><span>{b.title}</span></Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section bx-index" aria-labelledby="bx-index-title">
        <div className="container">
          <div className="bx-index-head">
            <div>
              <p className="eyebrow">Explore by topic</p>
              <h2 id="bx-index-title">What we write about</h2>
            </div>
            {/* Topic chart — each bar is a filter */}
            <div className="bx-chart" role="tablist" aria-label="Blog categories">
              {BLOG_CATEGORIES.map((c, i) => (
                <button
                  type="button"
                  role="tab"
                  key={c}
                  aria-selected={cat === c}
                  className={`bx-bar ${cat === c ? 'on' : ''}`}
                  style={{ '--cc': catOf(c).c, '--h': c === 'All' ? 1 : Math.max(0.15, counts[c] / maxCount) * 0.9, '--i': i }}
                  onClick={() => setCat(c)}
                >
                  <span className="bx-bar-col"><b>{counts[c]}</b></span>
                  <span className="bx-bar-ico"><Icon name={catOf(c).icon} size={16} /></span>
                  <span className="bx-bar-lbl">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <ul className="bx-grid" key={cat + q}>
            {list.map((b, i) => (
              <li key={b.slug} className="bx-card" style={{ '--i': Math.min(i, 12), '--cc': catOf(b.category).c }}>
                <Link to={`/blog/${b.slug}`}>
                  <div className="bx-card-img">
                    <img src={b.cover} alt={`Cover illustration: ${b.title}`} width="1200" height="675" loading={i < 3 ? 'eager' : 'lazy'} />
                    {b.trending ? <span className="bx-hot"><Icon name="trend" size={13} /> Trending</span> : null}
                    <span className="bx-read">{b.readMins} min</span>
                  </div>
                  <div className="bx-card-body">
                    <span className="bx-cat" style={{ '--cc': catOf(b.category).c }}><Icon name={catOf(b.category).icon} size={13} /> {b.category}</span>
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <span className="bx-foot">
                      <span className="bx-date"><Icon name="calendar" size={13} /> {fmt(b.date)}</span>
                      <span className="bx-go">Read <Icon name="arrow" size={14} /></span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {!list.length ? <p className="muted center">No blogs match your search.</p> : null}
        </div>
      </section>
      <CtaBand title="Reading is great. Earning is better." sub="Put these tips to work — join free in two minutes." />
    </>
  );
}
