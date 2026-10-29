import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import RichText from '../components/RichText.jsx';
import { Breadcrumbs, CtaBand, FaqList } from '../components/Common.jsx';
import Seo from '../seo/Seo.jsx';
import { articleLd, breadcrumbLd, faqLd } from '../seo/schema.js';
import { getBlog, relatedBlogs } from '../data/blogs/index.js';
import { SITE_URL } from '../data/site.js';
import NotFound from './NotFound.jsx';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlog(slug);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = document.querySelector('.post-body');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.max(0, Math.min(1, -r.top / (total || 1))));
    };
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, [slug]);

  if (!post) return <NotFound />;
  const path = `/blog/${post.slug}`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blogs', path: '/blog' }, { name: post.title, path }];
  const toc = post.chapters;
  const url = SITE_URL + path;
  const share = [
    { n: 'WhatsApp', i: 'whatsapp', h: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + url)}` },
    { n: 'LinkedIn', i: 'linkedin', h: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { n: 'Facebook', i: 'facebook', h: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        path={path}
        image={post.cover}
        type="article"
        keywords={[post.primaryKeyword, ...post.secondaryKeywords].join(', ')}
        jsonLd={[articleLd(post), breadcrumbLd(crumbs), faqLd(post.faqs)]}
      />
      <div className="read-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className="post-hero">
        <img className="post-hero-img" src={post.cover} alt="" width="1200" height="675" fetchpriority="high" />
        <div className="post-hero-shade" aria-hidden="true" />
        <div className="container post-hero-inner">
          <Breadcrumbs items={crumbs} />
          <p className="post-cat">{post.category}{post.trending ? <span><Icon name="trend" size={14} /> Trending</span> : null}</p>
          <h1>{post.title}</h1>
          <p className="post-meta">
            <span><Icon name="pen" size={14} /> MyFrequentRewards Editorial Team</span>
            <span><Icon name="calendar" size={14} /> {fmt(post.date)}</span>
            <span><Icon name="clock" size={14} /> {post.readMins} min read</span>
          </p>
        </div>
      </header>

      <div className="container post-row">
        <aside className="post-aside">
          <nav className="post-toc" aria-label="Table of contents">
            <p>In this article</p>
            <ol>{toc.map((c) => (<li key={c.title}><a href={`#${slugify(c.title)}`}>{c.title}</a><ol>{c.sections.filter((x) => x.h2).map((x) => <li key={x.h2}><a href={`#${slugify(x.h2)}`}>{x.h2}</a></li>)}</ol></li>))}<li><a href="#faqs">FAQs</a></li></ol>
          </nav>
          <div className="post-share">
            <p>Share</p>
            {share.map((s) => <a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.n}`}><Icon name={s.i} size={18} /></a>)}
            <button type="button" aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {}); }}>
              <Icon name={copied ? 'check' : 'copy'} size={18} />
            </button>
          </div>
        </aside>

        <article className="post-body">
          <p className="post-lead">{post.excerpt}</p>
          {post.chapters.map((c, ci) => (
            <div key={c.title} className="post-chapter">
              <h2 id={slugify(c.title)}><span className="ch-n">{String(ci + 1).padStart(2, '0')}</span>{c.title}</h2>
              {c.sections.map((s, i) => (
                <section key={i} id={s.h2 ? slugify(s.h2) : undefined}>
                  {s.h2 ? <h3>{s.h2}</h3> : null}
                  {(s.p || []).map((p, k) => <p key={k}><RichText text={p} /></p>)}
                  {s.list ? <ul className="post-list">{s.list.map((l) => <li key={l}><Icon name="check" size={16} stroke={2.4} /> <span><RichText text={l} /></span></li>)}</ul> : null}
                  {s.qa ? <dl className="post-qa">{s.qa.map((q) => <div key={q.q}><dt>{q.q}</dt><dd>{q.a}</dd></div>)}</dl> : null}
                </section>
              ))}
              {ci === 0 ? (
                <aside className="post-cta-inline">
                  <div><strong>Turn this into rewards.</strong><span>Join free — no investment needed.</span></div>
                  <Link to="/sign-up" className="btn btn-primary btn-sm">Join free <Icon name="arrow" size={14} /></Link>
                </aside>
              ) : null}
              {ci === 2 ? (
                <aside className="post-cta-inline alt">
                  <div><strong>Your opinion has value.</strong><span>Consumers and professionals earn rewards — free to join.</span></div>
                  <Link to="/how-it-works" className="btn btn-light btn-sm">See how it works <Icon name="arrow" size={14} /></Link>
                </aside>
              ) : null}
            </div>
          ))}
          <div className="post-keys">
            <p>Topics</p>
            <ul>{[post.primaryKeyword, ...post.secondaryKeywords].map((k) => <li key={k}>{k}</li>)}</ul>
          </div>
          <section id="faqs" className="post-faqs">
            <h2>Frequently asked questions</h2>
            <FaqList faqs={post.faqs} />
          </section>
        </article>
      </div>

      <section className="section related" aria-labelledby="rel-title">
        <div className="container">
          <h2 id="rel-title">Keep reading</h2>
          <ul className="rel-grid">
            {relatedBlogs(post).map((r) => (
              <li key={r.slug}>
                <Link to={`/blog/${r.slug}`}>
                  <img src={r.cover} alt={`Cover illustration: ${r.title}`} width="1200" height="675" loading="lazy" />
                  <span className="bc-cat">{r.category}</span>
                  <h3>{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Ready to put this into practice?" />
    </>
  );
}
