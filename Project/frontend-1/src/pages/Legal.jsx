// Shared layout for Privacy, Terms, GDPR and Cookie pages: "at a glance" cards, sticky contents, sections.
import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { LegalArt } from '../components/HeroArt.jsx';
import { Reveal } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { Link } from '../router.jsx';
import { LEGAL } from '../data/legal.js';
import { PAGES } from '../seo/pages.js';
import { openCookieSettings } from '../components/CookieBanner.jsx';

const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const OTHER = ['/privacy', '/terms', '/gdpr', '/cookies', '/profiling'];

export default function Legal({ path }) {
  const doc = LEGAL[path] || LEGAL['/privacy'];
  const [active, setActive] = useState(doc.sections[0].id);

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-25% 0px -65% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  return (
    <>
      <PageHero
        theme={`legal ${doc.theme}`}
        eyebrow={doc.eyebrow}
        eyebrowColor="#3d5afe"
        title={doc.title}
        lead={doc.lead}
        art={<LegalArt path={path} />}
        crumbs={[{ to: '/', label: 'Home' }, { label: PAGES[path]?.name || doc.eyebrow }]}
        badges={[`Last updated ${fmt(doc.updated)}`]}
      />

      <section className="section legal-glance">
        <div className="container glance-grid">
          {doc.glance.map(([ic, t, d], i) => (
            <Reveal key={t} className="glance keycap" delay={i * 80} style={{ '--c': ['#2457f5', '#00a88a', '#ef2d56', '#8a4dff', '#ff6a2c'][i % 5] }}>
              <span><Icon name={ic} size={22} /></span>
              <b>{t}</b>
              <small>{d}</small>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section legal-body">
        <div className="container legal-layout">
          <nav className="toc legal-toc" aria-label="Contents">
            <b>Contents</b>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id} className={active === s.id ? 'on' : ''}>
                  <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{s.title}</a>
                </li>
              ))}
            </ol>
            {path === '/cookies' && (
              <button className="btn btn-primary btn-sm" onClick={openCookieSettings}><span className="btn-label">Cookie settings</span></button>
            )}
          </nav>
          <div className="legal-sections">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="legal-sec">
                <h2><span className="ls-ic"><Icon name={s.icon} size={18} /></span>{s.title}</h2>
                {s.p?.map((p, i) => <p key={i}>{p}</p>)}
                {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </section>
            ))}
            <div className="legal-more">
              <b>Related policies</b>
              <div>{OTHER.filter((o) => o !== path).map((o) => <Link key={o} to={o}>{PAGES[o].name}</Link>)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
