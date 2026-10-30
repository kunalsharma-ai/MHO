// About — primary: "healthcare research community". Secondary: healthcare market research, medicine
// research, paid clinical research (contrast), clinical research organization, Frequent Research.
// Each section has its own visual: holographic member card (hero), certificate plaque (Frequent
// Research), live data pipeline (how research flows), four animated promise tiles, a road-map timeline.
import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { SectionHead, Reveal, Button, LiveZone, useInView } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import Persona from '../components/Persona.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { BadgeParade } from '../components/Footer.jsx';
import { AudiencePortals } from '../components/EarnV4.jsx';
import { VerificationRing } from '../components/Showcase.jsx';
import { Link } from '../router.jsx';
import frLogo from '../assets/brand/frequent-research-logo.webp';

const CLIENTS = [
  ['flask', 'Pharma & biotech'], ['monitor', 'Medical devices'], ['microscope', 'Diagnostics'],
  ['building', 'Hospitals & health systems'], ['phone', 'Health tech'], ['book', 'Academic & public health'],
];
const MEMBERS = [
  ['stethoscope', 'Doctors & specialists', '#2457f5'], ['nurse', 'Nurses & midwives', '#5b3df5'], ['pill', 'Pharmacists & allied health', '#8a4dff'],
  ['hands', 'Caregivers', '#ff6a2c'], ['heart', 'Patients', '#00a88a'], ['users', 'Health consumers', '#ec4899'],
];

const TIMELINE = [
  { y: '2017', t: 'Frequent Research is founded', d: 'Frequent Research Fieldwork Solutions Pvt. Ltd. opens its doors in New Delhi.', ic: 'building' },
  { y: 'ISO', t: 'Certified, three times over', d: 'ISO 9001 quality, ISO 27001 information security and ISO 20252 market research.', ic: 'shieldCheck' },
  { y: 'MHO', t: 'A panel just for healthcare', d: 'MyHealthOpinions launches for healthcare professionals, caregivers and patients.', ic: 'heart' },
  { y: '55', t: 'Countries and counting', d: 'Members across Asia-Pacific, Europe, the Middle East, Africa and the Americas.', ic: 'globe' },
];

/* ---------- Hero art: holographic membership card ---------- */
function MemberCard() {
  return (
    <LiveZone className="mcard-stage" aria-hidden="true">
      <div className="mcard">
        <div className="mc-face mc-front">
          <span className="mc-holo" />
          <span className="mc-top"><HeartMark size={34} /><b>MyHealthOpinions</b><em>Member</em></span>
          <span className="mc-chip" />
          <span className="mc-people">
            <Persona kind="doctor" skin={2} hair={0} size={46} />
            <Persona kind="caregiver" skin={1} hair={3} hairStyle={1} size={46} />
            <Persona kind="patient" skin={3} hair={2} size={46} />
          </span>
          <span className="mc-line"><small>Healthcare research community</small><b>Since 2017</b></span>
          <svg className="mc-ecg" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M0 24h90l10-16 12 28 10-22 8 10h170" pathLength="100" /></svg>
        </div>
        <div className="mc-face mc-back">
          <span className="mc-stripe" />
          <ul>
            <li><Icon name="globe" size={14} /> 55 countries</li>
            <li><Icon name="shieldCheck" size={14} /> 3 ISO certifications</li>
            <li><Icon name="users" size={14} /> 31,240+ panelists</li>
          </ul>
        </div>
      </div>
      {[['coins', 'Rewards for every study'], ['lock', 'Data never sold'], ['users', '25+ professional groups']].map(([ic, t], i) => (
        <span key={t} className="mc-float" style={{ '--i': i }}><Icon name={ic} size={14} />{t}</span>
      ))}
    </LiveZone>
  );
}

/* ---------- Data pipeline ---------- */
function Pipeline() {
  const L = [40, 100, 160, 220, 280, 340];
  return (
    <LiveZone className="pipe3">
      <ul className="p3-col p3-left">
        {CLIENTS.map(([ic, t], i) => <li key={t} style={{ '--i': i }}><Icon name={ic} size={16} />{t}</li>)}
      </ul>
      <div className="p3-mid" aria-hidden="true">
        <svg viewBox="0 0 400 380" preserveAspectRatio="none">
          {L.map((y, i) => {
            const a = `M0 ${y} C 120 ${y}, 120 190, 170 190`;
            const b = `M230 190 C 280 190, 280 ${y}, 400 ${y}`;
            return (
              <g key={i}>
                <path d={a} className="p3-wire w-in" />
                <path d={b} className="p3-wire w-out" />
                <circle r="5" className="p3-pk in"><animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" path={a} /></circle>
                <circle r="5" className="p3-pk out"><animateMotion dur={`${2.4 + i * 0.2}s`} repeatCount="indefinite" path={b} keyPoints="1;0" keyTimes="0;1" calcMode="linear" /></circle>
              </g>
            );
          })}
        </svg>
        <span className="p3-core">
          <span className="p3-gear" />
          <HeartMark size={46} />
          <b>MyHealthOpinions</b>
          <small>verify · match · anonymise · reward</small>
        </span>
        <span className="p3-lbl l1">questions</span>
        <span className="p3-lbl l2">honest answers</span>
      </div>
      <ul className="p3-col p3-right">
        {MEMBERS.map(([ic, t, c], i) => <li key={t} style={{ '--i': i, '--c': c }}><Icon name={ic} size={16} />{t}</li>)}
      </ul>
    </LiveZone>
  );
}

/* ---------- Promise tiles, each with its own mini animation ---------- */
function Promises() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div ref={ref} className={`promises ${inView ? 'is-in' : ''}`}>
      <article className="pr pr-heart">
        <span className="pr-viz" aria-hidden="true"><svg viewBox="0 0 120 50"><path d="M0 30h30l8-18 10 34 10-26 8 10h54" pathLength="100" /></svg><Icon name="heart" size={30} fill="currentColor" stroke={1} /></span>
        <h3>Patient-centric</h3>
        <p>Lived experience is evidence. We make room for it in medicine research.</p>
      </article>
      <article className="pr pr-shield">
        <span className="pr-viz" aria-hidden="true"><Icon name="shieldCheck" size={40} /><i className="pr-scan" /></span>
        <h3>Trust before hype</h3>
        <p>No income promises, no fees, no selling your data. Ever.</p>
      </article>
      <article className="pr pr-target">
        <span className="pr-viz" aria-hidden="true"><span className="pr-rings"><i /><i /><i /></span><span className="pr-dart" /></span>
        <h3>Right person, right study</h3>
        <p>Careful profiling means fewer wasted screeners and better answers.</p>
      </article>
      <article className="pr pr-coin">
        <span className="pr-viz" aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} className="pr-c" style={{ '--i': i }} />)}</span>
        <h3>Fair rewards</h3>
        <p>Every completed study earns the incentive you saw before you started.</p>
      </article>
    </div>
  );
}

/* ---------- Road-map timeline ---------- */
function Roadmap() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setOn((x) => (x + 1) % TIMELINE.length), 2600);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <div ref={ref} className={`road ${inView ? 'is-in' : ''}`}>
      <svg className="road-svg" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="road-base" d="M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" />
        <path className="road-dash" d="M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" />
        <circle r="10" className="road-car"><animateMotion dur="10s" repeatCount="indefinite" path="M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" /></circle>
      </svg>
      <ol>
        {TIMELINE.map((t, i) => (
          <li key={t.t} className={i === on ? 'on' : ''} style={{ '--i': i }} onMouseEnter={() => setOn(i)}>
            <span className="rd-pin"><Icon name={t.ic} size={18} /></span>
            <b className="rd-y">{t.y}</b>
            <h3>{t.t}</h3>
            <p>{t.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        theme="about"
        eyebrow="About MyHealthOpinions"
        eyebrowColor="#ff6a2c"
        title={['Transforming healthcare,', { t: 'one opinion at a time', hl: 'grad' }]}
        lead="MyHealthOpinions is a healthcare research community powered by Frequent Research. We connect physicians, nurses, allied health professionals, patients and caregivers with the organisations shaping tomorrow's medicine, and reward every member for their time."
        ctas={[{ label: 'Join the community', to: '/join' }, { label: 'Who can earn', to: '/earn', variant: 'ghost', icon: 'users' }]}
        art={<MemberCard />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'About Us' }]}
      />

      <section className="section about-plaque">
        <div className="container split">
          <Reveal className="plaque" effect="zoom">
            <span className="pq-border" aria-hidden="true" />
            <div className="pq-in">
              <img className="pq-logo" src={frLogo} alt="Frequent Research Fieldwork Solutions — Insights, Analytics, Growth. An ISO certified company" width="589" height="314" loading="lazy" />
              <span className="pq-ribbon"><Icon name="sparkle" size={14} /> Powered by Frequent Research</span>
            </div>
          </Reveal>
          <div className="split-copy">
            <span className="eyebrow" style={{ '--eb': '#2457f5' }}><i aria-hidden="true" />Welcome to MyHealthOpinions</span>
            <h2>A healthcare research community built on real experience</h2>
            <p className="lead">Share what you see on the ward, at the bedside or in your own treatment, help shape the next generation of healthcare, and get rewarded for your time.</p>
            <div className="fact-dials">
              {[['2017', 'founded in New Delhi', 100, '#2457f5'], ['55', 'countries', 78, '#00a88a'], ['3', 'ISO certifications', 60, '#ff6a2c']].map(([v, l, p, c], i) => (
                <div key={l} className="fd" style={{ '--p': p, '--c': c, '--i': i }}>
                  <svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" className="fd-bg" /><circle cx="40" cy="40" r="34" className="fd-fg" pathLength="100" /></svg>
                  <b>{v}</b><span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-flow3">
        <div className="container">
          <SectionHead eyebrow="How healthcare market research flows" title="From your answer to better medicine" lead="Organisations need real-world insight. You have it. Watch the questions travel in and the anonymous answers travel out." color="#ffb020" />
          <Pipeline />
          <p className="flow-note">
            <Icon name="info" size={16} />
            <span>We run online surveys and market research, not clinical trials. Paid clinical research tests treatments under medical supervision; our studies only ask for your views. <Link to="/blog/paid-clinical-studies-vs-paid-surveys">See the difference</Link> or read <Link to="/blog/what-is-a-clinical-research-organization">what a clinical research organization does</Link>.</span>
          </p>
        </div>
      </section>

      <section className="section about-promises">
        <div className="container">
          <SectionHead eyebrow="What we stand for" title="Four promises behind every survey" color="#00a88a" />
          <Promises />
        </div>
      </section>

      <section className="section about-road">
        <div className="container">
          <SectionHead eyebrow="Our journey" title="Built by market research specialists" color="#7c3aed" />
          <Roadmap />
        </div>
      </section>

      <section className="section about-profiles" id="profiles">
        <div className="container">
          <SectionHead eyebrow="Our healthcare panel" title="Three doors into one community" lead="Healthcare professionals across 10 groups and 1,300+ job titles, caregivers of every kind, and patients living with 195+ conditions. Each has its own page, process and rewards." color="#2457f5" />
          <AudiencePortals />
        </div>
      </section>

      <section className="section about-verify">
        <div className="container split">
          <div className="split-copy">
            <span className="eyebrow" style={{ '--eb': '#00a88a' }}><i aria-hidden="true" />Verified recruitment</span>
            <h2>Professionals are who they say they are</h2>
            <p className="lead">Our quality team checks professional credentials and employment where it applies, using six verification protocols plus a manual review.</p>
            <Button to="/trust-safety" variant="ghost">All 18 quality checks</Button>
          </div>
          <VerificationRing />
        </div>
      </section>

      <section className="section certs">
        <div className="container">
          <Reveal className="certs-card" effect="zoom">
            <h2>Certified and affiliated</h2>
            <p>ISO 9001:2015, ISO 27001, ISO 20252:2019, ESOMAR member and MSME registered. Hover a badge to flip it.</p>
            <BadgeParade light />
          </Reveal>
        </div>
      </section>
    </>
  );
}
