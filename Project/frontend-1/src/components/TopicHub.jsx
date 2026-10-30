// "Popular searches" hub: what people search for → the page that answers it.
// Internal links with descriptive anchor text (good for SEO) presented as a filterable heat map.
import { useEffect, useState } from 'react';
import { Link } from '../router.jsx';
import { TOPICS, TOPIC_GROUPS } from '../seo/keywords.js';
import Icon from './Icon.jsx';
import { SectionHead, useInView } from './ui.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { tr } from '../i18n/engine.js';

function SearchTyper({ items }) {
  const [ref, inView] = useInView({ threshold: 0 }, false);
  const { lang } = useI18n();
  const [i, setI] = useState(0);
  const [n, setN] = useState(items[0]?.label.length || 0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (!items.length || !inView) return; // typing pauses while off-screen (no background re-renders)
    const full = tr(items[i].label);
    const t = setTimeout(() => {
      if (!del && n < full.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % items.length); }
    }, !del && n === full.length ? 1600 : del ? 25 : 60);
    return () => clearTimeout(t);
  }, [i, n, del, items, inView, lang]);
  const cur = items[i];
  return (
    <div className="th-search" aria-hidden="true" ref={ref}>
      <Icon name="search" size={20} />
      <span className="ths-q notranslate" translate="no">{cur ? tr(cur.label).slice(0, n) : ''}<i className="ths-caret" /></span>
      <span className="ths-go">Answered here <Icon name="arrow" size={14} /></span>
    </div>
  );
}

export default function TopicHub({ groups = TOPIC_GROUPS.map((g) => g.id), title = 'Popular searches, honestly answered', eyebrow = 'Trending topics', lead, exclude }) {
  const [g, setG] = useState('all');
  const pool = TOPICS.filter((t) => groups.includes(t.group) && t.to !== exclude);
  const list = g === 'all' ? pool : pool.filter((t) => t.group === g);
  const groupsShown = TOPIC_GROUPS.filter((x) => groups.includes(x.id));
  const color = (id) => TOPIC_GROUPS.find((x) => x.id === id)?.color;
  return (
    <section className="topic-hub section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} lead={lead || 'The questions people type into search engines every day — each one links to a straight, no-hype answer.'} color="#f97316" />
        <SearchTyper items={pool.filter((t) => t.heat >= 2)} />
        {groupsShown.length > 1 && (
          <div className="th-tabs" role="tablist" aria-label="Filter topics">
            <button role="tab" aria-selected={g === 'all'} className={g === 'all' ? 'on' : ''} onClick={() => setG('all')}>All topics</button>
            {groupsShown.map((x) => (
              <button key={x.id} role="tab" aria-selected={g === x.id} className={g === x.id ? 'on' : ''} style={{ '--c': x.color }} onClick={() => setG(x.id)}>{x.label}</button>
            ))}
          </div>
        )}
        <ul className="th-cloud" key={g}>
          {list.map((t, i) => (
            <li key={t.label} className={`heat-${t.heat}`} style={{ '--c': color(t.group), '--i': i }}>
              <Link to={t.to}>
                <span className="th-heat" aria-hidden="true">{Array.from({ length: t.heat }).map((_, k) => <i key={k} />)}</span>
                <span className="th-label">{t.label}</span>
                <Icon name="arrow" size={14} className="th-go" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Slim scrolling ticker of topics (decorative duplicate is hidden from assistive tech). */
export function TopicTicker({ groups }) {
  const list = groups ? TOPICS.filter((t) => groups.includes(t.group)) : TOPICS.filter((t) => t.heat >= 2);
  return (
    <nav className="topic-ticker" aria-label="Popular searches">
      <span className="tt-label"><Icon name="trending" size={14} /> People search</span>
      <div className="tt-viewport">
        <div className="tt-track">
          {[...list, ...list].map((t, i) => (
            <Link key={i} to={t.to} tabIndex={i >= list.length ? -1 : undefined} aria-hidden={i >= list.length || undefined}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
