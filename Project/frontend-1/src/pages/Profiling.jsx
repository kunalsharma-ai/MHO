// Profiling & Quality Score — interactive 0–200 quality gauge, gates and security layers.
import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { DocHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Reveal, Eyebrow } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { QualityPipeline } from '../components/Showcase.jsx';
import { Link } from '../router.jsx';

const GATES = [
  { at: 50, t: 'Registration gate', d: 'Attention question + open-ended answer of 10–20 words, no copy-paste.', c: '#3d5afe' },
  { at: 60, t: 'Gate survey', d: 'Score at least 60/200 with 20–30 unique words before any client survey.', c: '#14b8a6' },
];

const LAYERS = [
  ['shield', 'CAPTCHA at every level'], ['gate', 'Gate survey'], ['filter', 'Pre-screening'], ['pin', 'Geo-tagging'],
  ['chart', 'IP score tracking'], ['globe', 'Latitude & longitude checks'], ['fingerprint', 'Digital fingerprinting (RelevantID, TrueSample, Radware)'],
  ['onion', 'Proxy & TOR detection'], ['bot', 'BOT prevention before traffic reaches servers'], ['copy', 'Duplicate cleansing (automated + manual)'],
];

function Gauge() {
  const [score, setScore] = useState(120);
  const angle = (score / 200) * 180 - 90;
  const state = score >= 60 ? 'Eligible for client surveys' : score >= 50 ? 'Registered — needs the gate survey' : 'Below the quality bar';
  return (
    <div className="gauge-wrap">
      <div className="gauge" aria-hidden="true">
        <svg viewBox="0 0 220 125">
          <defs>
            <linearGradient id="gg" x1="0" x2="1"><stop offset="0" stopColor="#e8344e" /><stop offset=".3" stopColor="#f59e0b" /><stop offset=".6" stopColor="#14b8a6" /><stop offset="1" stopColor="#3d5afe" /></linearGradient>
          </defs>
          <path d="M15 115 A95 95 0 0 1 205 115" fill="none" stroke="url(#gg)" strokeWidth="18" strokeLinecap="round" />
          {[50, 60].map((g) => {
            const a = ((g / 200) * 180 - 180) * (Math.PI / 180);
            return <line key={g} x1={110 + Math.cos(a) * 78} y1={115 + Math.sin(a) * 78} x2={110 + Math.cos(a) * 112} y2={115 + Math.sin(a) * 112} stroke="#0b1b3f" strokeWidth="2.5" strokeDasharray="3 3" />;
          })}
        </svg>
        <span className="gauge-needle" style={{ transform: `rotate(${angle}deg)` }} />
        <b className="gauge-val">{score}<small>/200</small></b>
      </div>
      <label className="gauge-ctrl">
        <span>Try a score</span>
        <input type="range" min="0" max="200" value={score} onChange={(e) => setScore(Number(e.target.value))} aria-valuetext={`${score} of 200: ${state}`} />
      </label>
      <p className={`gauge-state ${score >= 60 ? 'ok' : score >= 50 ? 'mid' : 'low'}`} aria-live="polite">{state}</p>
    </div>
  );
}

export default function Profiling() {
  return (
    <>
      <PageHero
        theme="legal doc-profiling"
        eyebrow="Profiling & Quality Score"
        eyebrowColor="#14b8a6"
        title={['Profiling & the', { t: 'survey quality score', hl: 'grad' }]}
        lead="Our survey quality score measures each respondent from 0 to 200, so researchers get genuine answers — and honest members get more of the right invitations."
        art={<DocHeroArt icon="chart" />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Profiling & Quality Score' }]}
      />

      <section className="section prof-gauge">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#3d5afe">The quality score</Eyebrow>
            <h2>Two gates before a client survey</h2>
            <ol className="gates">
              {GATES.map((g) => (
                <li key={g.t} style={{ '--c': g.c }}><b>{g.at}+</b><span><strong>{g.t}</strong>{g.d}</span></li>
              ))}
            </ol>
            <p className="fine">Members who fail attention checks or open-ended quality parameters are not routed to client surveys.</p>
          </div>
          <Gauge />
        </div>
      </section>

      <section className="section prof-numbers dark-band">
        <div className="container">
          <SectionHead eyebrow="Profiling standard" title={<>Rich profiles, <span className="ink-gold">better matches</span></>} color="#facc15" />
          <div className="num-tiles">
            {[['11', 'profiling segments at registration'], ['100+', 'panel profile questions'], ['300+', 'sub-profiling questions'], ['90+', 'countries in the wider Frequent Research network']].map(([n, l], i) => (
              <Reveal key={l} className="num-tile" delay={i * 90} effect="zoom"><b>{n}</b><span>{l}</span></Reveal>
            ))}
          </div>
          <p className="center fine light">Members are asked to update profiles after registration and after surveys, so data stays current with the market.</p>
        </div>
      </section>

      <section className="section prof-layers">
        <div className="container">
          <SectionHead eyebrow="Advanced security" title="Ten layers between a bot and a survey" color="#e8344e" />
          <ul className="layer-stack">
            {LAYERS.map(([ic, t], i) => (
              <Reveal as="li" key={t} delay={i * 50} effect="left" style={{ '--i': i }}><Icon name={ic} size={18} />{t}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section prof-pipeline">
        <div className="container">
          <SectionHead eyebrow="Quality standard" title="All 18 checks at a glance" lead="ISO 9001, ISO 27001 and ISO 20252 certified processes, backed by an in-house QC team." color="#3d5afe" />
          <QualityPipeline />
          <p className="center"><Link className="text-link" to="/trust-safety">More on Trust & Safety <Icon name="arrow" size={14} /></Link></p>
        </div>
      </section>
    </>
  );
}
