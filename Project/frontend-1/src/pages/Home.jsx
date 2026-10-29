import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PageSeo } from '../components/PageHero.jsx';
import { HOME_FAQS, PAGES } from '../data/pages.js';
import HeroOrbit from '../sections/HeroOrbit.jsx';
import InviteMarquee from '../sections/InviteMarquee.jsx';
import AudienceSplit from '../sections/AudienceSplit.jsx';
import JourneyPath from '../sections/JourneyPath.jsx';
import GlobeReach from '../sections/GlobeReach.jsx';
import { JobTitleWaterfall } from '../sections/ProfileSections.jsx';
import { IncentiveStories, InvitationsPhone, PayoutFan } from '../sections/RewardSections.jsx';
import { PrivacyVault, QualityRadar, VerificationScanner } from '../sections/TrustSections.jsx';
import BlogBento from '../sections/BlogBento.jsx';
import SearchShowcase from '../sections/SearchShowcase.jsx';
import { CommunityLedger, MemberVoices, SurveyBoard } from '../sections/CommunitySections.jsx';

const page = PAGES.home;

const WHY = [
  { icon: 'heart', t: '100% free membership', d: 'No joining fee, no deposit, no withdrawal charge.' },
  { icon: 'coins', t: 'Rewarding opinions', d: 'Every eligible survey adds to your balance.' },
  { icon: 'mobile', t: 'Any device, anywhere', d: 'Phone, tablet or laptop — wherever you are.' },
  { icon: 'lock', t: 'Secure & confidential', d: 'Your personal details are never sold or shared.' },
  { icon: 'wallet', t: 'Quick payout modes', d: 'PayPal, wire transfer or Amazon gift card — plus UPI in India.' },
  { icon: 'headset', t: '24/7 Live Help', d: 'Chat or WhatsApp us whenever you need a hand.' },
];

export default function Home() {
  return (
    <>
      <PageSeo page={page} faqs={HOME_FAQS} home />
      <HeroOrbit />
      <InviteMarquee />
      <CommunityLedger />

      <section className="section intro-strip" aria-labelledby="intro-title">
        <div className="container intro-row">
          <div className="intro-copy reveal">
            <p className="eyebrow">Why MyFrequentRewards</p>
            <h2 id="intro-title">The honest way to <span className="hl-orange">earn money online without investment</span></h2>
            <p>
              MyFrequentRewards is the worldwide consumer and business opinion community of Frequent Research. Brands, agencies and organisations need real people to tell them what works — and they reward that insight. You share your honest opinion in paid online surveys; we turn it into rewards you can actually use. It is one of the simplest ways to make money online — and one of the few real ways to make money from home for free.
            </p>
            <p>
              Whether you are a student looking for online earning without investment, a parent searching for a side hustle from home, or a senior professional with rare industry expertise, joining is free and takes minutes. Take online surveys for money on any device and redeem via PayPal, UPI, bank transfer or Amazon gift cards. Read our guide on <Link to="/blog/how-to-earn-money-online-with-surveys">how to earn money online with surveys</Link> or see <Link to="/how-it-works">how it works</Link>.
            </p>
          </div>
          <ul className="why-tiles">
            {WHY.map((w, i) => (
              <li key={w.t} className="why-tile reveal" style={{ '--d': `${i * 0.07}s` }}>
                <span className="why-ico"><Icon name={w.icon} size={24} /></span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AudienceSplit />
      <JourneyPath />
      <SurveyBoard />
      <GlobeReach />
      <JobTitleWaterfall />
      <InvitationsPhone />
      <PayoutFan />
      <IncentiveStories />
      <MemberVoices />
      <QualityRadar />
      <VerificationScanner />
      <PrivacyVault />
      <SearchShowcase />
      <BlogBento />

      <section className="section faq-home" aria-labelledby="faq-home-title">
        <div className="container faq-home-row">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-home-title">Quick answers before you join</h2>
            <p className="sec-sub">Still curious? Our <Link to="/faq">full FAQ</Link> covers surveys, rewards and privacy — or ask Live Help any time.</p>
            <a className="ext-note" href="https://esomar.org/codes-and-guidelines" target="_blank" rel="noopener noreferrer"><Icon name="book" size={16} /> Market research codes of conduct (ESOMAR)</a>
          </div>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
