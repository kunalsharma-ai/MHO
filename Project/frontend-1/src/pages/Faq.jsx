import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { ALL_FAQS, PAGES } from '../data/pages.js';

const page = PAGES.faq;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'FAQ', path: page.path }];
const CATS = ['All', ...Array.from(new Set(ALL_FAQS.map((f) => f.cat)))];
const ICONS = { All: 'sparkle', 'Getting started': 'user', Account: 'lock', Surveys: 'clipboard', Rewards: 'gift', 'Privacy & security': 'lock', Support: 'headset' };

export default function Faq() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const list = useMemo(
    () => ALL_FAQS.filter((f) => (cat === 'All' || f.cat === cat) && (f.q + f.a).toLowerCase().includes(q.toLowerCase())),
    [cat, q]
  );
  return (
    <>
      <PageSeo page={page} faqs={ALL_FAQS} crumbs={crumbs} />
      <PageHero crumbs={crumbs} eyebrow="Help centre" title={page.h1} lead="Everything about joining, paid surveys, rewards, payouts, privacy and support — in one place." art="question" theme="violet">
        <div className="faq-search">
          <Icon name="audit" size={20} />
          <label htmlFor="faq-q" className="sr-only">Search questions</label>
          <input id="faq-q" placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </PageHero>
      <section className="section faq-page">
        <div className="container faq-page-row">
          <nav className="faq-cats" aria-label="FAQ categories">
            {CATS.map((c) => (
              <button type="button" key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)} aria-pressed={cat === c}>
                <Icon name={ICONS[c] || 'sparkle'} size={18} /> {c}
              </button>
            ))}
          </nav>
          <div>
            {list.length ? <FaqList faqs={list} /> : <p className="muted">No questions match “{q}”. Try Live Help — it’s open 24/7.</p>}
            <p className="faq-more">Need more? Read <Link to="/blog/how-to-earn-money-online-with-surveys">how to earn money online</Link>, <Link to="/rewards-and-payouts">rewards & payouts</Link>, <Link to="/quality-and-data-security">quality & security</Link> or <Link to="/contact-us">contact us</Link>. Data rights for EU members are set out in the <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">GDPR</a>.</p>
          </div>
        </div>
      </section>
      <CtaBand variant="violet" />
    </>
  );
}
