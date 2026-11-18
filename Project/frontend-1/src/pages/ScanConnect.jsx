// Scan & Connect — every official channel of MyHealthOpinions, its sister panels, Frequent Research and
// Sampledge, each with a scannable, brand-coloured QR code. Palette: "neon signal" (ink, mint, cyan, violet).
// Sections, each with its own visual: 3D QR cube hero · channel "signal cards" · panel switcher with a
// big code per panel · company orbit · Sampledge ticket strip · how-to-scan phone flow · member voice ticker.
import { useEffect, useState } from 'react';
import { Breadcrumbs, useInView, LiveZone, Button } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import QrCode from '../components/QrCode.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { MHO_CHANNELS, PANELS, COMPANY, SAMPLEDGE, NET, CODE_COUNT } from '../data/connect.js';
import { TESTIMONIALS } from '../data/testimonials.js';
import { openPageVideo } from '../data/pageVideos.js';
import frEmblem from '../assets/brand/frequent-research-emblem.webp';

const ICON = { web: 'globe', star: 'star', grid: 'grid' };
const ic = (k) => ICON[k] || k;
const grad = (k) => `linear-gradient(135deg, ${NET[k][0]}, ${NET[k][1]})`;

function CopyLink({ url, name }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="sc-copy"
      onClick={() => {
        navigator.clipboard?.writeText(url).then(() => { setDone(true); setTimeout(() => setDone(false), 1600); }).catch(() => {});
      }}
      aria-label={`Copy ${name} link`}
    >
      <Icon name={done ? 'check' : 'copy'} size={15} />{done ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ---------- Hero: rotating 3D cube of real QR codes ---------- */
const CUBE = ['web', 'youtube', 'instagram', 'linkedin', 'facebook', 'whatsapp'].map((k) => MHO_CHANNELS.find((c) => c.k === k)).filter(Boolean);

function QrCube() {
  return (
    <LiveZone className="sc-cube-stage" aria-hidden="true">
      <span className="sc-rings"><i /><i /><i /></span>
      <div className="sc-cube">
        {CUBE.map((c, i) => (
          <div key={c.k} className={`sc-face f${i}`} style={{ '--c1': NET[c.k][0], '--c2': NET[c.k][1] }}>
            <QrCode url={c.url} color="#06121f" eye={NET[c.k][0]} size={150} label={`${c.name} QR code`} />
            <b><Icon name={ic(c.k)} size={14} />{c.name}</b>
          </div>
        ))}
      </div>
      <span className="sc-beam" />
      <span className="sc-shadow" />
      {[['Point your camera', 'camera'], ['Code found', 'check'], ['Opens instantly', 'external']].map(([t, n], i) => (
        <span key={t} className={`sc-chip s${i}`} style={{ '--i': i }}><Icon name={n} size={14} />{t}</span>
      ))}
    </LiveZone>
  );
}

/* ---------- MHO channels: signal cards ---------- */
function ChannelCards() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`sc-signal ${inView ? 'is-in' : ''}`}>
      {MHO_CHANNELS.map((c, i) => (
        <article key={c.k} className="sc-card" style={{ '--c1': NET[c.k][0], '--c2': NET[c.k][1], '--i': i }}>
          <span className="sc-card-glow" aria-hidden="true" />
          <header>
            <span className="sc-card-ic"><Icon name={ic(c.k)} size={22} /></span>
            <span><b>{c.name}</b><small>{c.handle}</small></span>
          </header>
          <div className="sc-card-qr">
            <QrCode url={c.url} color="#0b1b3f" eye={NET[c.k][0]} size={150} label={`QR code: MyHealthOpinions on ${c.name}`} />
            <span className="sc-card-scan" aria-hidden="true" />
          </div>
          <p>{c.line}</p>
          <footer>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="sc-open">Open<Icon name="external" size={14} /></a>
            <CopyLink url={c.url} name={c.name} />
          </footer>
        </article>
      ))}
    </div>
  );
}

/* ---------- Panel switcher ---------- */
function PanelSwitcher() {
  const [on, setOn] = useState(0);
  const p = PANELS[on];
  return (
    <div className="sc-panels" style={{ '--p1': p.c1, '--p2': p.c2, '--p0': p.c0 }}>
      <div className="sc-ptabs" role="tablist" aria-label="Our research panels">
        {PANELS.map((x, i) => (
          <button key={x.id} role="tab" id={`sc-tab-${x.id}`} aria-controls="sc-panel" aria-selected={i === on} className={i === on ? 'on' : ''} style={{ '--p1': x.c1, '--p2': x.c2 }} onClick={() => setOn(i)}>
            <span className="sc-ptab-ic"><Icon name={x.icon} size={18} /></span>
            <span><b>{x.name}</b><small>{x.who}</small></span>
          </button>
        ))}
      </div>
      <div className="sc-pbody" id="sc-panel" role="tabpanel" aria-labelledby={`sc-tab-${p.id}`} key={p.id}>
        <div className="sc-pmain">
          <span className="sc-pbadge">{p.id === 'mho' ? 'You are here' : 'Sister panel'}</span>
          <h3>{p.name}</h3>
          <p className="sc-ptag">{p.tag}</p>
          <p className="sc-pwho"><Icon name="users" size={16} />{p.who}</p>
          <div className="sc-pqr">
            <QrCode url={p.site} color={p.c0} eye={p.c1} size={190} label={`QR code: ${p.name} website`} />
            <a href={p.site} target="_blank" rel="noopener noreferrer">{p.site.replace(/^https:\/\/(www\.)?|\/$/g, '')}<Icon name="external" size={14} /></a>
          </div>
        </div>
        <ul className="sc-plinks">
          {p.links.map((l, i) => (
            <li key={l.k} style={{ '--i': i, '--c1': NET[l.k][0], '--c2': NET[l.k][1] }}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                <QrCode url={l.url} color="#0b1b3f" eye={NET[l.k][0]} size={84} label={`QR code: ${p.name} on ${l.name}`} />
                <span><i><Icon name={ic(l.k)} size={14} /></i><b>{l.name}</b><small>{l.handle}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Frequent Research orbit ---------- */
function CompanyOrbit() {
  const [sel, setSel] = useState(0);
  const l = COMPANY.links[sel];
  return (
    <div className="sc-co">
      <LiveZone className="sc-orbit">
        <span className="sc-orbit-ring" aria-hidden="true" />
        <span className="sc-orbit-core">
          <img src={frEmblem} alt="Frequent Research emblem" width="96" height="96" loading="lazy" />
          <b>Frequent Research</b>
        </span>
        <div className="sc-orbit-spin">
          {COMPANY.links.map((x, i) => (
            <button key={x.k} type="button" className={`sc-orbit-node ${i === sel ? 'on' : ''}`} style={{ '--i': i, '--n': COMPANY.links.length, '--c1': NET[x.k][0], '--c2': NET[x.k][1] }} onClick={() => setSel(i)} aria-pressed={i === sel} aria-label={`Show the Frequent Research ${x.name} code`}>
              <Icon name={ic(x.k)} size={20} />
            </button>
          ))}
        </div>
      </LiveZone>
      <div className="sc-co-card" key={l.k} style={{ '--c1': NET[l.k][0], '--c2': NET[l.k][1] }}>
        <span className="sc-co-net"><Icon name={ic(l.k)} size={16} />{l.name}</span>
        <h3>{l.handle}</h3>
        <p>{l.line}</p>
        <QrCode url={l.url} color="#0b1b3f" eye={NET[l.k][0]} size={170} label={`QR code: Frequent Research on ${l.name}`} />
        <a href={l.url} target="_blank" rel="noopener noreferrer" className="sc-open">Follow on {l.name}<Icon name="external" size={14} /></a>
      </div>
      <ul className="sc-extras">
        {COMPANY.extras.map((x) => (
          <li key={x.k} style={{ '--c1': NET[x.k][0], '--c2': NET[x.k][1] }}>
            <QrCode url={x.url} color="#0b1b3f" eye={NET[x.k][0]} size={88} label={`QR code: ${x.name}`} />
            <span><b><Icon name={ic(x.k)} size={15} />{x.name}</b><small>{x.handle}</small><a href={x.url} target="_blank" rel="noopener noreferrer">{x.cta} →</a></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Sampledge ticket strip ---------- */
function TicketStrip() {
  return (
    <div className="sc-tickets" role="list">
      {SAMPLEDGE.links.map((l, i) => (
        <a key={l.k} role="listitem" href={l.url} target="_blank" rel="noopener noreferrer" className="sc-ticket" style={{ '--c1': NET[l.k][0], '--c2': NET[l.k][1], '--i': i }}>
          <span className="sc-tk-top"><Icon name={ic(l.k)} size={18} /><b>{l.name}</b><small>No. {String(i + 1).padStart(2, '0')}</small></span>
          <QrCode url={l.url} color="#111827" eye={NET[l.k][0]} size={120} label={`QR code: Sampledge on ${l.name}`} />
          <span className="sc-tk-handle">{l.handle}</span>
        </a>
      ))}
    </div>
  );
}

/* ---------- How to scan ---------- */
const STEPS = [
  { ic: 'camera', t: 'Open your camera', d: 'Any phone camera or Google Lens' },
  { ic: 'scan', t: 'Point at a code', d: 'Hold it steady for a second' },
  { ic: 'tap', t: 'Tap the link', d: 'The channel opens in its app' },
];

function HowToScan() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const t = setInterval(() => setStep((s) => (s + 1) % 3), 2200);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <div ref={ref} className={`sc-how ${inView ? 'is-in' : ''}`} data-step={step}>
      <div className="sc-mobile" aria-hidden="true">
        <span className="sc-mobile-notch" />
        <span className="sc-mobile-screen">
          <span className="sc-ph-cam"><QrCode url={MHO_CHANNELS[0].url} color="#06121f" size={110} /></span>
          <span className="sc-ph-found"><Icon name="check" size={14} />myhealthopinions.com</span>
          <span className="sc-ph-open"><HeartMark size={30} /><b>MyHealthOpinions</b><small>Opening…</small></span>
        </span>
      </div>
      <ol className="sc-steps">
        {STEPS.map((s, i) => (
          <li key={s.t} className={i === step ? 'on' : ''}>
            <span className="sc-step-ic"><Icon name={s.ic} size={22} /></span>
            <span><b>{s.t}</b><small>{s.d}</small></span>
            <i className="sc-step-bar" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Member voice ticker ---------- */
function VoiceTicker() {
  const picks = TESTIMONIALS.filter((_, i) => i % 3 === 0).slice(0, 8);
  const row = [...picks, ...picks];
  return (
    <div className="sc-ticker" aria-label="What members say">
      <div className="sc-ticker-track">
        {row.map((t, i) => (
          <figure key={i} aria-hidden={i >= picks.length ? 'true' : undefined}>
            <blockquote>“{t.quote.split('. ')[0].replace(/\.$/, '')}.”</blockquote>
            <figcaption><b>{t.name}</b> · {t.role}, {t.country}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ScanConnect() {
  return (
    <>
      <section className="sc-hero">
        <div className="sc-hero-bg" aria-hidden="true"><i /><i /><i /></div>
        <div className="container sc-hero-in">
          <div className="sc-hero-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/about-us', label: 'About Us' }, { label: 'Scan & Connect' }]} />
            <span className="sc-eyebrow"><Icon name="qr" size={14} />Scan & Connect</span>
            <h1 className="sc-title">
              <span className="sc-w1">Point.</span> <span className="sc-w2">Scan.</span> <span className="sc-w3">Stay in the loop.</span>
            </h1>
            <p className="sc-lead">All the MyHealthOpinions QR codes in one place: our own channels, our sister panels, Frequent Research and Sampledge. Point your phone at any code, or tap it.</p>
            <ul className="sc-stats">
              <li><b>{CODE_COUNT}</b><span>live codes</span></li>
              <li><b>5</b><span>brands</span></li>
              <li><b>1</b><span>WhatsApp for all</span></li>
            </ul>
            <div className="sc-ctas">
              <Button to="/scan-and-connect#sc-ours" icon="qr">Start scanning</Button>
              <button type="button" className="btn btn-ghost sc-watch" onClick={openPageVideo}><span className="btn-label">Watch the video</span><Icon name="play" size={16} fill="currentColor" stroke={0} className="btn-icon" /></button>
            </div>
          </div>
          <QrCube />
        </div>
      </section>

      <section className="section sc-sec-ours" id="sc-ours">
        <div className="container">
          <header className="scx-head">
            <span className="sc-kicker" style={{ '--k': '#e8344e' }}>01 · Our channels</span>
            <h2>Follow <span className="sc-hl-warm">MyHealthOpinions</span> everywhere</h2>
          </header>
          <ChannelCards />
        </div>
      </section>

      <section className="section sc-sec-panels">
        <div className="container">
          <header className="scx-head">
            <span className="sc-kicker" style={{ '--k': '#22d3ee' }}>02 · Our panel family</span>
            <h2>Three panels, <span className="sc-hl-cool">one research team</span></h2>
          </header>
          <PanelSwitcher />
        </div>
      </section>

      <section className="section sc-sec-co">
        <div className="container">
          <header className="scx-head">
            <span className="sc-kicker" style={{ '--k': '#8b7bff' }}>03 · The company behind us</span>
            <h2>Frequent Research, <span className="sc-hl-violet">on every network</span></h2>
          </header>
          <CompanyOrbit />
        </div>
      </section>

      <section className="section sc-sec-sampledge">
        <div className="container">
          <header className="scx-head scx-head-row">
            <div>
              <span className="sc-kicker" style={{ '--k': '#ffb020' }}>04 · Sampledge</span>
              <h2>{SAMPLEDGE.what}</h2>
            </div>
            <p className="scx-head-note"><Icon name="arrow" size={16} />Scroll the tickets</p>
          </header>
          <TicketStrip />
        </div>
      </section>

      <section className="section sc-sec-how">
        <div className="container">
          <header className="scx-head">
            <span className="sc-kicker" style={{ '--k': '#2ee6a6' }}>05 · How it works</span>
            <h2>Three seconds from <span className="sc-hl-mint">code to channel</span></h2>
          </header>
          <HowToScan />
        </div>
      </section>

      <section className="sc-sec-voices">
        <VoiceTicker />
      </section>
    </>
  );
}
