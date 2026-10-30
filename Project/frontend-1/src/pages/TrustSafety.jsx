// Trust & Safety — primary: "legit paid survey sites". Secondary: paid online survey sites, survey
// websites that pay, free money surveys (honest answer), legit paid surveys, safe ways to make money online.
import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { ShieldHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Reveal, Button, Eyebrow } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { QualityPipeline, VerificationRing, PrivacySeal } from '../components/Showcase.jsx';
import TopicHub from '../components/TopicHub.jsx';
import { Link } from '../router.jsx';

const CHECKLIST = [
  'Free to join — no deposit, no “activation” fee',
  'Real company name, address and support contacts',
  'Reward and time shown before each survey',
  'Clear privacy policy; data never sold',
  'Recognised payout methods (PayPal, bank, gift cards, UPI in India)',
  'Realistic earnings — no salary promises',
  'Industry standards (ISO 20252, ESOMAR)',
  'Easy account deletion',
];

function SiteChecker() {
  const [ticks, setTicks] = useState(() => CHECKLIST.map(() => false));
  const score = ticks.filter(Boolean).length;
  const verdict = score === CHECKLIST.length ? 'Looks legit ✔' : score >= 6 ? 'Mostly fine — check the gaps' : score >= 3 ? 'Proceed with caution' : 'Red flags — walk away';
  return (
    <div className="checker">
      <div className="ck-gauge" style={{ '--p': (score / CHECKLIST.length) * 100 }} aria-hidden="true">
        <svg viewBox="0 0 120 70"><path d="M10 64 A50 50 0 0 1 110 64" className="ck-track" /><path d="M10 64 A50 50 0 0 1 110 64" className="ck-fill" pathLength="100" /></svg>
        <b>{score}/{CHECKLIST.length}</b>
      </div>
      <p className="ck-verdict" aria-live="polite">{verdict}</p>
      <ul>
        {CHECKLIST.map((c, i) => (
          <li key={c}>
            <label className={ticks[i] ? 'on' : ''}>
              <input type="checkbox" checked={ticks[i]} onChange={() => setTicks(ticks.map((t, k) => (k === i ? !t : t)))} />
              <span className="ck-box" aria-hidden="true"><Icon name="check" size={13} stroke={3.5} /></span>
              {c}
            </label>
          </li>
        ))}
      </ul>
      <small>Use this checklist on any of the paid online survey sites you are considering — including us.</small>
    </div>
  );
}

export default function TrustSafety() {
  return (
    <>
      <PageHero
        theme="shield"
        eyebrow="Trust & Safety"
        eyebrowColor="#10b981"
        title={['Legit paid survey sites', { t: 'earn trust', hl: 'mint' }, '— here is how we do it']}
        lead="Eighteen quality and security checks, verified professionals, ISO-certified data security and a simple promise: your personal details are never sold or shared with clients."
        ctas={[{ label: 'Join safely', to: '/join' }, { label: 'Privacy Policy', to: '/privacy', variant: 'ghost', icon: 'lock' }]}
        art={<ShieldHeroArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Trust & Safety' }]}
      />

      <section className="section ts-pipeline">
        <div className="container">
          <SectionHead eyebrow="18 checks, 3 stages" title="Quality checks that protect every survey" lead="From sign-up to the last question, each layer filters bots, duplicates and rushed answers — so the survey websites that pay can keep paying." color="#3d5afe" />
          <QualityPipeline />
        </div>
      </section>

      <section className="section ts-verify dark-band">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#34d399">Professional verification</Eyebrow>
            <h2>Six protocols + <span className="ink-mint">manual review</span></h2>
            <p className="lead">Doctors, nurses and other professionals are checked through company email, phone, public profiles, external databases and behaviour monitoring, then reviewed by our quality team.</p>
            <Link className="text-link light" to="/profiling">Profiling & quality score <Icon name="arrow" size={14} /></Link>
          </div>
          <VerificationRing />
        </div>
      </section>

      <section className="section ts-checker">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#e8344e">Free money surveys? Not quite.</Eyebrow>
            <h2>Spot legit paid surveys in 60 seconds</h2>
            <p className="lead">Joining a good survey site is free — but the rewards are earned, not “free money”. Adverts for “free cash surveys” that pay for nothing are selling something. Tick what the site you are checking does right.</p>
            <Link className="text-link" to="/blog/best-paid-survey-sites-checklist">Full checklist: best paid survey sites <Icon name="arrow" size={14} /></Link>
          </div>
          <SiteChecker />
        </div>
      </section>

      <section className="section ts-privacy">
        <div className="container promise-grid">
          <PrivacySeal />
          <div>
            <Eyebrow color="#10b981">Your data, protected</Eyebrow>
            <h2>What happens to your answers</h2>
            <div className="data-flow">
              {[
                ['user', 'You answer', 'in a secure, encrypted survey link'],
                ['layers', 'We anonymise', 'names & contact details removed'],
                ['chart', 'Clients see totals', 'combined results only, never you'],
              ].map(([ic, t, d], i) => (
                <Reveal key={t} className="df-step" delay={i * 140} effect="left">
                  <span><Icon name={ic} size={20} /></span>
                  <b>{t}</b>
                  <small>{d}</small>
                </Reveal>
              ))}
            </div>
            <Button to="/gdpr" variant="ghost">GDPR & your rights</Button>
          </div>
        </div>
      </section>

      <TopicHub groups={['safety', 'earn']} title="Safe ways to make money online" eyebrow="Stay scam-free" exclude="/trust-safety" />
    </>
  );
}
