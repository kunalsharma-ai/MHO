import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import FrLogo from '../components/FrLogo.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { BRAND } from '../data/site.js';
import GlobeReach from '../sections/GlobeReach.jsx';

const page = PAGES.about;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'About Us', path: page.path }];

const VALUES = [
  { icon: 'heart', t: 'Respect', d: 'Your time and opinion deserve a fair reward.', c: '#FF5E7E' },
  { icon: 'eye', t: 'Transparency', d: 'Clear rules, clear rewards, clear policies.', c: '#2F6BFF' },
  { icon: 'shield', t: 'Integrity', d: 'Verified people, honest data, no shortcuts.', c: '#14C9B5' },
  { icon: 'globe', t: 'Inclusion', d: 'Every country, culture and career is welcome.', c: '#FF8A00' },
];

const FAQS = [
  { q: 'Who runs MyFrequentRewards?', a: `MyFrequentRewards is operated by ${BRAND.legalName}, trading as MyFrequentRewards.` },
  { q: 'What is the relationship with Frequent Research?', a: 'MyFrequentRewards is the consumer and business opinion community of Frequent Research, an ISO-certified market research company.' },
  { q: 'Where are you based?', a: 'Our office is in Mangolpur Kalan, New Delhi, India, and our members are worldwide.' },
  { q: 'How can I contact the team?', a: 'Use 24/7 Live Help, WhatsApp, email or phone — all listed on our contact page.' },
  { q: 'Is MyFrequentRewards legitimate?', a: 'Yes — it is free to join, publishes its policies and is run by a registered research company.' },
];

export default function About() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="About us"
        title={page.h1}
        lead="We are the worldwide consumer and business opinion community of Frequent Research — built on a simple belief: when you help the world make better decisions, you deserve to be rewarded."
        art="pen"
        theme="navy"
      />

      <section className="section story" aria-labelledby="story-title">
        <div className="container story-row">
          <div className="story-quote reveal">
            <Icon name="sparkle" size={32} />
            <p>“{BRAND.tagline}”</p>
            <span>— The MyFrequentRewards promise</span>
          </div>
          <div className="reveal">
            <p className="eyebrow">Who we are</p>
            <h2 id="story-title">A research community with a reward at its heart</h2>
            <p>MyFrequentRewards welcomes consumers and business professionals to take part in wide-ranging market research studies. Members share honest perspectives on products, services, workplaces and ideas — and receive rewards for every eligible contribution.</p>
            <p>Behind the community stands <a href={BRAND.parent.url} target="_blank" rel="noopener noreferrer">Frequent Research</a>, a fieldwork and data collection company serving brands and agencies worldwide. That expertise means real studies, verified respondents and reliable payouts. Learn <Link to="/how-it-works">how it works</Link> or read our <Link to="/blog">blogs</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section values" aria-labelledby="val-title">
        <div className="container">
          <div className="sec-head sec-center reveal"><p className="eyebrow">What we stand for</p><h2 id="val-title">Four values, zero compromise</h2></div>
          <ul className="values-row">
            {VALUES.map((v, i) => (
              <li key={v.t} className="value-coin reveal" style={{ '--c': v.c, '--d': `${i * 0.1}s` }}>
                <div className="vc-inner">
                  <div className="vc-front"><Icon name={v.icon} size={34} /><strong>{v.t}</strong></div>
                  <div className="vc-back"><p>{v.d}</p></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GlobeReach />

      <section className="section iso-sec" aria-labelledby="ab-iso">
        <div className="container iso-row reveal">
          <FrLogo variant="iso" width={520} height={277} alt="Frequent Research logo with ISO 20252:2019, 9001:2015 and 27001:2013 certifications" />
          <div>
            <p className="eyebrow">Credentials</p>
            <h2 id="ab-iso">Quality you can verify</h2>
            <p className="sec-sub">Insights · Analytics · Growth. Our parent company is certified to {BRAND.iso.join(', ')}. See our <Link to="/quality-and-data-security">quality & security</Link> approach.</p>
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="ab-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="ab-faq">About the company</h2></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
