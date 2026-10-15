// Blog index — primary: "make money online". Secondary: ways to make money online, easy ways to make
// money online, online earning websites, paid survey tips.
import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { StackHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Reveal } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import BlogArt from '../components/BlogArt.jsx';
import TopicHub from '../components/TopicHub.jsx';
import { Link } from '../router.jsx';
import { BLOGS, BLOG_CATEGORIES } from '../data/blogs/index.js';

const CAT_COLOR = {
  'Earn Online': '#1e5bff', 'Paid Surveys': '#f97316', 'Healthcare Professionals': '#14b8a6',
  'Rewards & Payouts': '#8b5cf6', 'Clinical Research': '#0891b2', 'Safety & Privacy': '#e8344e',
};
const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const BlogCover = BlogArt;

export function BlogCard({ post, i = 0 }) {
  return (
    <Reveal as="article" className="blog-card" delay={(i % 3) * 90} style={{ '--cc': CAT_COLOR[post.category] }}>
      <Link to={`/blog/${post.slug}`} className="bc-link">
        <BlogCover post={post} />
        <div className="bc-body">
          <span className="bc-cat">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.metaDescription}</p>
          <span className="bc-meta"><Icon name="calendar" size={13} />{fmt(post.date)}<span className="bc-read">Read <Icon name="arrow" size={13} /></span></span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Blog() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const trending = BLOGS.filter((b) => b.trending).slice(0, 3);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return BLOGS.filter((b) => (cat === 'All' || b.category === cat) && (!t || (b.title + ' ' + b.primary + ' ' + b.secondary.join(' ')).toLowerCase().includes(t)));
  }, [cat, q]);
  const [lead, ...rest] = trending;
  return (
    <>
      <PageHero
        theme="stack"
        eyebrow="Blogs & guides"
        eyebrowColor="#f97316"
        title={['Make money online —', { t: 'the honest', hl: 'marker' }, { t: 'playbook', hl: 'grad' }]}
        lead="Thirty in-depth guides on paid surveys, ways to make money online without investment, healthcare side income, payouts and staying safe from scams. No hype, just what works."
        art={<StackHeroArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Blogs' }]}
      />

      {/* Trending — magazine layout */}
      <section className="section blog-trending">
        <div className="container">
          <SectionHead align="left" eyebrow="🔥 Trending now" title="Most-read this month" color="#e8344e" />
          <div className="trend-grid">
            {lead && (
              <Link to={`/blog/${lead.slug}`} className="trend-lead">
                <BlogCover post={lead} big />
                <div className="tl-copy">
                  <span className="bc-cat">{lead.category}</span>
                  <h3>{lead.title}</h3>
                  <p>{lead.metaDescription}</p>
                </div>
              </Link>
            )}
            <div className="trend-side">
              {rest.map((p, i) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="trend-item">
                  <span className="ti-n">0{i + 2}</span>
                  <span><span className="bc-cat">{p.category}</span><b>{p.title}</b></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="section blog-library">
        <div className="container">
          <div className="lib-bar">
            <div className="lib-cats" role="tablist" aria-label="Blog categories">
              {['All', ...BLOG_CATEGORIES].map((c) => (
                <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} style={{ '--c': CAT_COLOR[c] || '#0b1b3f' }} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <label className="lib-search">
              <Icon name="search" size={16} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guides…" aria-label="Search blog guides" />
            </label>
          </div>
          <p className="lib-count" aria-live="polite">{list.length} guide{list.length === 1 ? '' : 's'}</p>
          <div className="blog-grid">
            {list.map((p, i) => <BlogCard key={p.slug} post={p} i={i} />)}
          </div>
          {!list.length && <p className="lib-empty">No guides match that search — try “PayPal”, “nurses” or “without investment”.</p>}
        </div>
      </section>

      <TopicHub title="Easy ways to make money online — by topic" eyebrow="Browse by search" />
    </>
  );
}
