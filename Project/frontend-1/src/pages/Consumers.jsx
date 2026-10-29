import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { DemographicRibbons, InterestMosaic } from '../sections/ProfileSections.jsx';
import { PayoutFan } from '../sections/RewardSections.jsx';

const page = PAGES.consumers;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'For Consumers', path: page.path }];

const PERSONAS = [
  { icon: 'book', t: 'Students', d: 'Earn between classes — tech, media and education studies love young voices.', to: '/blog/online-earning-for-students-without-investment' },
  { icon: 'heart', t: 'Homemakers & parents', d: 'Your household decisions shape grocery, family and home brands.', to: '/blog/online-earning-for-homemakers' },
  { icon: 'mobile', t: 'Gamers & streamers', d: 'Mobile, console and PC players are in constant demand.', to: '/blog/earn-money-online-on-mobile' },
  { icon: 'activity', t: 'Drivers & EV owners', d: 'Automotive, insurance and mobility research needs you.', to: '/who-can-join' },
  { icon: 'globe', t: 'Travellers', d: 'Airlines, hotels and travel apps want your experiences.', to: '/who-can-join' },
  { icon: 'clock', t: 'Retirees', d: 'Decades of perspective for health, finance and leisure studies.', to: '/blog/online-earning-for-retirees' },
];

const WEEK = [
  { d: 'Mon', t: 'Profile refresh', i: 'layers' },
  { d: 'Tue', t: 'Quick snack survey', i: 'coins' },
  { d: 'Wed', t: 'App feedback', i: 'mobile' },
  { d: 'Thu', t: 'Ad concept test', i: 'eye' },
  { d: 'Fri', t: 'Travel study', i: 'globe' },
  { d: 'Sat', t: 'Check balance', i: 'wallet' },
  { d: 'Sun', t: 'Claim reward', i: 'gift' },
];

const FAQS = [
  { q: 'Who counts as a consumer member?', a: 'Any eligible adult — students, workers, parents, homemakers, retirees — sharing opinions about everyday products and services.' },
  { q: 'Can I earn money online from home with consumer surveys?', a: 'Yes, consumer surveys are completed online from any device, wherever you are.' },
  { q: 'What topics will I see?', a: 'Shopping, food and beverages, technology, travel, finance, automotive, beauty, pets, health, gaming and more.' },
  { q: 'Do I need any experience?', a: 'No — your everyday experience as a consumer is exactly what researchers need.' },
  { q: 'Is joining really free?', a: 'Yes, there is no investment or fee of any kind.' },
];

export default function Consumers() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="For consumers"
        title={page.h1}
        lead="Earn money online from home by telling brands what you really think about the things you buy, use, watch and love. Free to join, flexible, and rewarded via PayPal or gift cards — plus UPI in India."
        art="bubbles"
        theme="berry"
      >
        <div className="ph-actions">
          <Link to="/sign-up" className="btn btn-light">Join as a consumer <Icon name="arrow" size={18} /></Link>
        </div>
      </PageHero>

      <section className="section personas" aria-labelledby="per-title">
        <div className="container">
          <div className="sec-head reveal">
            <p className="eyebrow">Made for real life</p>
            <h2 id="per-title">Find yourself here</h2>
            <p className="sec-sub">Online earning without investment works best when it fits your day. Pick your world.</p>
          </div>
          <ul className="persona-grid">
            {PERSONAS.map((p, i) => (
              <li key={p.t} className="persona reveal" style={{ '--d': `${i * 0.06}s` }}>
                <Link to={p.to}>
                  <span className="persona-ico"><Icon name={p.icon} size={28} /></span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <span className="persona-go"><Icon name="arrow" size={18} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InterestMosaic />

      <section className="section week" aria-labelledby="week-title">
        <div className="container">
          <div className="sec-head sec-center reveal">
            <p className="eyebrow">A week of earning</p>
            <h2 id="week-title">Small moments, steady rewards</h2>
            <p className="sec-sub">A typical flexible week for a consumer member — minutes at a time, never a chore.</p>
          </div>
          <ol className="week-track reveal">
            {WEEK.map((w, i) => (
              <li key={w.d} style={{ '--i': i }}>
                <span className="wk-day">{w.d}</span>
                <span className="wk-dot"><Icon name={w.i} size={18} /></span>
                <span className="wk-t">{w.t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DemographicRibbons />

      <section className="section prose-sec" aria-labelledby="cs-deep">
        <div className="container prose-cols reveal">
          <h2 id="cs-deep">Why consumer opinions are worth rewarding</h2>
          <div>
            <p>Every product on a shelf and every app on your phone was shaped by research. Before a brand changes a recipe, a price or a package, it asks people like you. Your answers reduce the risk of costly mistakes — that is why consumer research communities reward participation.</p>
            <p>At MyFrequentRewards you never pay to take part. You simply keep your profile honest, answer invitations that match you and claim your balance when you are ready. Learn the basics in <Link to="/blog/earn-money-online-free-guide">earn money online free</Link>, or see the <Link to="/quality-and-data-security">security checks</Link> that keep the community fair.</p>
          </div>
        </div>
      </section>

      <PayoutFan />

      <section className="section faq-split" aria-labelledby="cs-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="cs-faq">Consumer questions</h2></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="Your everyday opinion has value." sub="Join free and start sharing it today." variant="berry" />
    </>
  );
}
