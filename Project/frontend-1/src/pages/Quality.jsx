import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import FrLogo from '../components/FrLogo.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { QUALITY_LAYERS } from '../data/quality.js';
import { BRAND } from '../data/site.js';
import { PrivacyVault, QualityRadar, VerificationScanner } from '../sections/TrustSections.jsx';

const page = PAGES.quality;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Quality & Security', path: page.path }];

const FAQS = [
  { q: 'Why so many quality checks?', a: 'They protect honest members and research clients from bots, fraud and duplicate accounts, which keeps rewards flowing.' },
  { q: 'Do the checks collect extra personal data?', a: 'Checks use technical signals such as device, timezone and network to detect fraud, not to advertise to you.' },
  { q: 'Why was my VPN blocked?', a: 'GEO-IP, proxy and TOR detection require you to connect from your real location.' },
  { q: 'Who carries out manual reviews?', a: 'Our quality verification team reviews flagged accounts and validates professional credentials where applicable.' },
  { q: 'Is my data shared with anyone?', a: 'No, your personal details are never sold or shared with anyone else.' },
];

export default function Quality() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Trust & safety"
        title={page.h1}
        lead="Safe online earning starts with a trustworthy community. Here is how we keep accounts genuine, responses honest and your personal data private."
        art="shield"
        theme="teal"
      />

      <section className="section layers-sec" aria-labelledby="ly-title">
        <div className="container layers-row">
          <div className="reveal">
            <p className="eyebrow">Defence in depth</p>
            <h2 id="ly-title">Three layers of protection</h2>
            <p className="sec-sub">Checks work together, so one weak signal never decides alone — and honest members flow straight through.</p>
          </div>
          <div className="layer-stack reveal" aria-hidden="true">
            {QUALITY_LAYERS.map((l, i) => (
              <div key={l.id} className="layer-plate" style={{ '--lc': l.color, '--i': i }}>
                <strong>{l.name}</strong><span>{l.line}</span>
              </div>
            ))}
          </div>
          <ul className="layer-legend">
            {QUALITY_LAYERS.map((l) => <li key={l.id} style={{ '--lc': l.color }}><i /><strong>{l.name}</strong> — {l.line}</li>)}
          </ul>
        </div>
      </section>

      <QualityRadar withLink={false} />
      <VerificationScanner />
      <PrivacyVault />

      <section className="section iso-sec" aria-labelledby="iso-title">
        <div className="container iso-row reveal">
          <FrLogo variant="iso" width={520} height={277} alt="Frequent Research — ISO 20252:2019, ISO 9001:2015 and ISO 27001:2013 certified" />
          <div>
            <p className="eyebrow">Standards</p>
            <h2 id="iso-title">Backed by an ISO-certified research company</h2>
            <p className="sec-sub">MyFrequentRewards is operated by {BRAND.legalName}. Our parent brand Frequent Research works to {BRAND.iso.join(', ')} — covering market research quality, quality management and information security. Read about <a href="https://www.iso.org/standard/73671.html" target="_blank" rel="noopener noreferrer">ISO 20252 market research standards</a>.</p>
            <div className="iso-links">
              <Link to="/profiling" className="link-arrow">Profiling & quality score <Icon name="arrow" size={16} /></Link>
              <Link to="/privacy" className="link-arrow">Privacy policy <Icon name="arrow" size={16} /></Link>
              <Link to="/gdpr" className="link-arrow">GDPR compliance <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="q-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="q-faq">Security questions</h2><p className="sec-sub">Learn to <Link to="/blog/legit-survey-sites-spot-scams">spot fake survey sites</Link>.</p></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="Join a community you can trust." variant="teal" />
    </>
  );
}
