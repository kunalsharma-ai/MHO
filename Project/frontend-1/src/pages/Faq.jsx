// FAQ — primary: "paid surveys FAQ". FAQPage JSON-LD is generated from the same data (src/data/faqs.js).
// Layout: a dark "ask anything" hero with a command-bar search and quick chips, topic tiles, and every
// question as a chat thread — tap a question bubble and the help desk "types" its answer.
// Answers are always in the HTML (native <details>), so search engines and screen readers get them all.
import { Fragment, useMemo, useState } from 'react';
import { Breadcrumbs, Button, LiveZone } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { FAQ_GROUPS } from '../data/faqs.js';
import { whatsappLink, SITE } from '../config/site.js';

const COLORS = { joining: '#2457f5', surveys: '#00a88a', rewards: '#ff6a2c', clinical: '#8a4dff', account: '#ef2d56' };
const ICONS = { joining: 'user', surveys: 'clipboard', rewards: 'coins', clinical: 'microscope', account: 'lock' };
const CHIPS = ['PayPal', 'UPI', 'screened out', 'points', 'delete', 'clinical trial', 'free'];
const TOTAL = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

function Hl({ text, q }) {
  const t = q.trim();
  if (t.length < 2) return text;
  const parts = text.split(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
  return parts.map((p, i) => (p.toLowerCase() === t.toLowerCase() ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>));
}

function QaArt() {
  const pairs = [['Is it really free to join?', 'Yes — no fees, ever.'], ['How do I get paid?', 'PayPal, wire, gift cards or UPI in India.'], ['Why was I screened out?', 'The study needed a different profile.']];
  return (
    <LiveZone className="qa-art" aria-hidden="true">
      {pairs.map(([q, a], i) => (
        <div key={q} className="qa-pair" style={{ '--i': i }}>
          <span className="qa-q"><i>?</i>{q}</span>
          <span className="qa-a"><span className="qa-av"><HeartMark size={16} /></span><span className="qa-dots"><b /><b /><b /></span><em>{a}</em></span>
        </div>
      ))}
      <span className="qa-ring r1" /><span className="qa-ring r2" />
    </LiveZone>
  );
}

export default function Faq() {
  const [g, setG] = useState('all');
  const [q, setQ] = useState('');
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    return FAQ_GROUPS.filter((x) => g === 'all' || x.id === g)
      .map((x) => ({ ...x, items: t ? x.items.filter((i) => (i.q + i.a).toLowerCase().includes(t)) : x.items }))
      .filter((x) => x.items.length);
  }, [g, q]);
  const hits = groups.reduce((n, x) => n + x.items.length, 0);
  const searching = q.trim().length > 0;

  return (
    <>
      <section className="faq4-hero">
        <div className="f4-bg" aria-hidden="true">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ '--i': i }}>{i % 3 ? '?' : '✓'}</i>)}</div>
        <div className="container f4-inner">
          <div className="f4-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'FAQ' }]} />
            <span className="f4-kicker"><Icon name="chat" size={14} /> {TOTAL} answers · updated every month</span>
            <h1>Paid surveys FAQ: <span>ask us anything</span></h1>
            <p>Joining, invitations, screen-outs, points, PayPal and UPI payouts, clinical studies, privacy and account deletion — straight answers in plain words.</p>
            <label className="f4-search">
              <Icon name="search" size={20} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a question… e.g. “How do I get paid?”" aria-label="Search FAQs" />
              {searching && <span className="f4-count">{hits} {hits === 1 ? 'answer' : 'answers'}</span>}
            </label>
            <div className="f4-chips" aria-label="Popular searches">
              {CHIPS.map((c) => <button key={c} type="button" className={q === c ? 'on' : ''} onClick={() => setQ(q === c ? '' : c)}>{c}</button>)}
            </div>
          </div>
          <QaArt />
        </div>
      </section>

      <section className="section faq4-topics">
        <div className="container">
          <div className="f4-tiles" role="tablist" aria-label="FAQ topics">
            <button role="tab" aria-selected={g === 'all'} className={`f4-tile all ${g === 'all' ? 'on' : ''}`} onClick={() => setG('all')} style={{ '--c': '#1b1035' }}>
              <span className="ft-ic"><Icon name="list" size={22} /></span><b>Everything</b><em>{TOTAL} answers</em>
            </button>
            {FAQ_GROUPS.map((x, i) => (
              <button key={x.id} role="tab" aria-selected={g === x.id} className={`f4-tile ${g === x.id ? 'on' : ''}`} onClick={() => setG(x.id)} style={{ '--c': COLORS[x.id], '--i': i }}>
                <span className="ft-ic"><Icon name={ICONS[x.id] || 'info'} size={22} /></span><b>{x.title}</b><em>{x.items.length} answers</em>
                <span className="ft-peek">{x.items[0].q}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq4-thread">
        <div className="container f4-thread-wrap">
          {groups.map((x) => (
            <section key={x.id} className="f4-chapter" style={{ '--c': COLORS[x.id] }} aria-labelledby={`fc-${x.id}`}>
              <h2 id={`fc-${x.id}`}><span><Icon name={ICONS[x.id] || 'info'} size={18} /></span>{x.title}<em>{x.items.length}</em></h2>
              <div className="f4-items">
                {x.items.map((it, k) => (
                  <details key={it.q} className="f4-qa" open={searching && k < 3 ? true : undefined}>
                    <summary>
                      <span className="f4-me" aria-hidden="true"><Icon name="user" size={14} /></span>
                      <span className="f4-q"><Hl text={it.q} q={q} /></span>
                      <span className="f4-plus" aria-hidden="true"><Icon name="plus" size={14} /></span>
                    </summary>
                    <div className="f4-a">
                      <span className="f4-bot" aria-hidden="true"><HeartMark size={18} /></span>
                      <div className="f4-bubble">
                        <span className="f4-typing" aria-hidden="true"><b /><b /><b /></span>
                        <p><Hl text={it.a} q={q} /></p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
          {!groups.length && (
            <div className="f4-empty">
              <span><Icon name="search" size={26} /></span>
              <h2>No answer matches “{q}” yet</h2>
              <p>Ask the 24/7 help assistant (bottom-right) or message the support team on WhatsApp.</p>
              <button type="button" className="btn btn-ghost" onClick={() => { setQ(''); setG('all'); }}><span className="btn-label">Clear the search</span></button>
            </div>
          )}
        </div>
      </section>

      <section className="section faq4-help">
        <div className="container">
          <div className="f4-help">
            <div className="fh-copy">
              <h2>Still stuck? A real person replies.</h2>
              <p>Pick the channel you like. Most messages get an answer the same working day.</p>
            </div>
            <div className="fh-cards">
              <a className="fh-card wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={22} /><b>WhatsApp</b><small>{SITE.whatsappDisplay}</small></a>
              <a className="fh-card em" href={`mailto:${SITE.email}`}><Icon name="mail" size={22} /><b>Email</b><small>{SITE.email}</small></a>
              <Button to="/contact" variant="ghost">Contact page</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
