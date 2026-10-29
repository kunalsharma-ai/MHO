import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { Breadcrumbs, CtaBand } from '../components/Common.jsx';
import Seo from '../seo/Seo.jsx';
import { breadcrumbLd, webPageLd } from '../seo/schema.js';
import { LEGAL, LEGAL_UPDATED } from '../data/legal.js';

function CookieGroups({ doc, n }) {
  const [open, setOpen] = useState(0);
  const manage = () => {
    try { window.localStorage.removeItem('mfr_cookie_choice'); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('mfr:cookie-settings'));
  };
  return (
    <section id="cookie-categories" className="legal-sec">
      <h2><span>{String(n).padStart(2, '0')}</span> Cookie categories</h2>
      <div className="cg-list">
        {doc.cookieGroups.map((g, i) => (
          <div key={g.name} className={`cg ${open === i ? 'is-open' : ''}`}>
            <button type="button" className="cg-head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="cg-dot" style={{ '--i': i }} />
              <strong>{g.name}</strong>
              <em>{g.always ? 'Always active' : `${g.rows.length || 'No'} cookie${g.rows.length === 1 ? '' : 's'} listed`}</em>
              <Icon name="chevron" size={18} />
            </button>
            <div className="cg-body">
              <p>{g.desc}</p>
              {g.rows.length ? (
                <div className="cookie-table" role="table" aria-label={`${g.name} cookies`}>
                  <div className="ct-row ct-head" role="row">{['Name', 'Purpose', 'Type', 'Expires in'].map((h) => <span key={h} role="columnheader">{h}</span>)}</div>
                  {g.rows.map((r) => (
                    <div className="ct-row" role="row" key={r.name}>
                      <span role="cell" data-l="Name"><strong className="ct-name">{r.name}</strong></span>
                      <span role="cell" data-l="Purpose">{r.purpose}</span>
                      <span role="cell" data-l="Type"><em className={`ct-type t-${r.type.includes('local') ? 'functionality' : 'essential'}`}>{r.type}</em></span>
                      <span role="cell" data-l="Expires in">{r.expires}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-dark cg-manage" onClick={manage}><Icon name="cookie" size={18} /> Manage cookie preferences</button>
    </section>
  );
}

function ScoreGauge({ scale }) {
  const pct = (scale.gate / scale.max) * 100;
  return (
    <figure className="score-gauge" aria-label={`Quality score scale from ${scale.min} to ${scale.max}; gate survey pass mark ${scale.gate}`}>
      <div className="sg-bar"><span className="sg-fill" /><i className="sg-gate" style={{ left: `${pct}%` }}><b>Gate pass {scale.gate}</b></i></div>
      <div className="sg-ticks"><span>{scale.min}</span><span>{scale.max / 2}</span><span>{scale.max}</span></div>
      <ul className="sg-labels">{scale.labels.map((l, i) => <li key={l} style={{ '--i': i }}>{l}</li>)}</ul>
      <figcaption>Your quality score is measured on a {scale.min}–{scale.max} scale.</figcaption>
    </figure>
  );
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function LegalPage({ id }) {
  const doc = LEGAL[id];
  const crumbs = [{ name: 'Home', path: '/' }, { name: doc.label, path: doc.path }];
  const others = Object.entries(LEGAL).filter(([k]) => k !== id);
  return (
    <>
      <Seo
        title={doc.metaTitle}
        description={doc.metaDescription}
        path={doc.path}
        jsonLd={[webPageLd({ name: doc.metaTitle, description: doc.metaDescription, path: doc.path }), breadcrumbLd(crumbs)]}
      />
      <section className="legal-hero" style={{ '--acc': doc.accent }}>
        <div className="legal-rays" aria-hidden="true">{Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
        <div className="container legal-hero-row">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="legal-badge"><Icon name={doc.icon} size={16} /> {doc.label}</p>
            <h1>{doc.label}</h1>
            <p className="legal-tag">{doc.hero}</p>
            <p className="legal-date"><Icon name="calendar" size={14} /> Last updated: {new Date(LEGAL_UPDATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
          </div>
          <div className="legal-seal" aria-hidden="true"><Icon name={doc.icon} size={64} stroke={1.2} /></div>
        </div>
      </section>

      <section className="legal-summary container" aria-label="At a glance">
        {doc.summary.map((s, i) => (
          <div key={s.t} className="ls-card reveal" style={{ '--acc': doc.accent, '--d': `${i * 0.08}s` }}>
            <span><Icon name={s.icon} size={22} /></span>
            <strong>{s.t}</strong>
            <p>{s.d}</p>
          </div>
        ))}
      </section>

      <section className="section legal-body" style={{ '--acc': doc.accent }}>
        <div className="container legal-row">
          <aside className="legal-toc" aria-label="On this page">
            <p>On this page</p>
            <ol>
              {doc.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{s.h}</a></li>)}
              {doc.cookieGroups ? <li><a href="#cookie-categories">Cookie categories</a></li> : null}
            </ol>
          </aside>
          <article className="legal-article">
            {doc.intro ? <p className="legal-intro">{doc.intro}</p> : null}
            {doc.scale ? <ScoreGauge scale={doc.scale} /> : null}
            {doc.sections.map((s, i) => (
              <section key={s.h} id={slugify(s.h)} className="legal-sec">
                <h2><span>{String(i + 1).padStart(2, '0')}</span> {s.h}</h2>
                {(s.p || []).map((p, k) => <p key={k}>{p}</p>)}
                {s.list ? <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul> : null}
              </section>
            ))}
            {doc.cookieGroups ? <CookieGroups doc={doc} n={doc.sections.length + 1} /> : null}
            <div className="legal-contact">
              <Icon name="mail" size={22} />
              <p>Questions about this policy? Email <a href="mailto:support@myfrequentrewards.com">support@myfrequentrewards.com</a> or visit <Link to="/contact-us">contact us</Link>.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section legal-more" aria-label="Other policies">
        <div className="container">
          <h2 className="lm-title">More policies</h2>
          <ul className="lm-grid">
            {others.map(([k, d]) => (
              <li key={k} style={{ '--acc': d.accent }}>
                <Link to={d.path}><Icon name={d.icon} size={22} /><strong>{d.label}</strong><span>{d.hero}</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Earn with confidence." sub="Transparent policies. Free membership. Real rewards." variant="ocean" />
    </>
  );
}
