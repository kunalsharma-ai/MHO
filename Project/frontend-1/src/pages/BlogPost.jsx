// Blog article: hero cover, reading progress, sticky table of contents, body, FAQs, related guides.
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Link } from '../router.jsx';
import Icon from '../components/Icon.jsx';
import Markdown, { parseBlocks } from '../components/Markdown.jsx';
import { Breadcrumbs, Accordion, Button } from '../components/ui.jsx';
import { BlogCover, BlogCard } from './Blog.jsx';
import { findBlog, BLOGS } from '../data/blogs/index.js';
import { postCache, loadPost, readingTime } from '../data/blogs/postStore.js';
import { getMeta, applyHead } from '../seo/head.js';
import NotFound from './NotFound.jsx';

const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function Toc({ items }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: '-20% 0px -70% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="toc" aria-label="On this page">
      <b>On this page</b>
      <ol>
        {items.map((i) => (
          <li key={i.id} className={active === i.id ? 'on' : ''}>
            <a href={`#${i.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{i.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function BlogPost({ path }) {
  const slug = path.replace(/^\/blog\//, '');
  const meta = findBlog(slug);
  const [, rerender] = useReducer((x) => x + 1, 0);
  const post = postCache[slug];

  useEffect(() => {
    if (meta && !postCache[slug]) loadPost(slug).then(() => { rerender(); applyHead(getMeta(path, { post: postCache[slug] })); });
  }, [slug, meta, path]);

  const blocks = useMemo(() => (post ? parseBlocks(post.body) : []), [post]);
  const toc = blocks.filter((b) => b.t === 'h2');
  const related = useMemo(() => {
    if (!meta) return [];
    const same = BLOGS.filter((b) => b.slug !== slug && b.category === meta.category);
    const other = BLOGS.filter((b) => b.slug !== slug && b.category !== meta.category);
    return [...same, ...other].slice(0, 3);
  }, [slug, meta]);

  if (!meta) return <NotFound />;

  return (
    <article className="post">
      <header className="post-hero" style={{ '--from': meta.cover.from, '--to': meta.cover.to }}>
        <div className="container post-hero-inner">
          <div className="ph-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/blog', label: 'Blogs' }, { label: meta.title }]} />
            <span className="post-cat">{meta.category}</span>
            <h1>{meta.title}</h1>
            <p className="post-lead">{meta.metaDescription}</p>
            <p className="post-meta">
              <span><Icon name="calendar" size={14} /> {fmt(meta.date)}</span>
              <span><Icon name="clock" size={14} /> {readingTime(post)} min read</span>
              <span><Icon name="user" size={14} /> MyHealthOpinions editorial team</span>
            </p>
          </div>
          <BlogCover post={meta} big />
        </div>
      </header>

      <div className="container post-layout">
        <aside className="post-aside">
          {toc.length > 0 && <Toc items={toc} />}
          <div className="aside-cta">
            <Icon name="coins" size={22} />
            <b>Get paid for your opinion</b>
            <span>Free to join. Rewards via PayPal, Amazon Gift Cards, Wire — and UPI in India.</span>
            <Link to="/join" className="btn btn-primary btn-sm"><span className="btn-label">Join free</span></Link>
          </div>
        </aside>

        <div className="post-body prose">
          {post ? <Markdown blocks={blocks} /> : <div className="post-skeleton" aria-label="Loading article"><i /><i /><i /><i /></div>}

          {post?.faqs?.length > 0 && (
            <section className="post-faq">
              <h2 id="faqs">Frequently asked questions</h2>
              <Accordion items={post.faqs} idPrefix={`pf-${slug}`} defaultOpen={0} />
            </section>
          )}

          <div className="post-cta">
            <div>
              <h2>Ready to turn your opinions into rewards?</h2>
              <p>Join MyHealthOpinions free — healthcare professionals, caregivers, patients and consumers in 55 countries.</p>
            </div>
            <Button to="/join" variant="gold">Create free account</Button>
          </div>
        </div>
      </div>

      <section className="section post-related">
        <div className="container">
          <h2 className="related-title">Keep reading</h2>
          <div className="blog-grid">{related.map((p, i) => <BlogCard key={p.slug} post={p} i={i} />)}</div>
        </div>
      </section>
    </article>
  );
}
