// Home — primary keyword: "paid surveys". Secondary: surveys for money, online surveys for money,
// get paid for surveys, paid survey sites, surveys that pay money, earn money online without investment.
import RoleHero from '../components/RoleHero.jsx';
import { SectionHead, Button } from '../components/ui.jsx';
import { CommunityPulse, FlagGlobe } from '../components/HomeSections.jsx';
import { RewardSlot, ChannelHub, VoiceWall, ChatFaq } from '../components/HomeV3.jsx';
import { DiseaseAtlas, HospitalLift, MetroSteps, Anonymiser } from '../components/HomeV4.jsx';
import TopicHub, { TopicTicker } from '../components/TopicHub.jsx';
import SurveyInbox from '../components/SurveyInbox.jsx';
import { HOME_FAQ } from '../data/faqs.js';
import { COVERAGE_COUNT } from '../data/countries.js';

export default function Home() {
  return (
    <>
      <RoleHero />
      <TopicTicker />

      <CommunityPulse />

      <section className="section s-slot">
        <div className="container">
          <SectionHead
            eyebrow="Rewards"
            title={<>Digital gift cards &amp; cash, <span className="ink-grad">your way</span></>}
            lead="Cash, vouchers, gift cards or a personal health report. Pull the lever and see what the paid surveys you complete can turn into."
            color="#ff6a2c"
          />
          <RewardSlot />
        </div>
      </section>

      <section className="section surveys-belt s-inbox">
        <div className="container">
          <SectionHead eyebrow="Online surveys for money" title="Browse paid surveys for money" lead="The kind of studies landing in members’ inboxes right now: patients earn $15–$20, caregivers $15–$25 and doctors & specialists $20–$50 per survey. Every invitation tells you the topic, the time it takes and the reward before you click a thing." color="#f97316" />
          <SurveyInbox />
        </div>
      </section>

      <section className="section s-metro">
        <div className="container">
          <SectionHead eyebrow="Get paid for surveys in four steps" title="Make money with health surveys in four steps" lead="No investment, no selling, no gimmicks. Hop on, tell us about yourself once, answer the surveys that fit, and collect at the last stop." color="#00a88a" />
          <MetroSteps />
          <div className="center-cta"><Button to="/how-it-works" variant="ghost">See the full journey</Button></div>
        </div>
      </section>

      <section className="section s-hub">
        <div className="container">
          <SectionHead eyebrow="Survey invitations" title="Never miss a survey that fits you" lead="Pick the channel you actually check. New studies find their way to your phone the moment they open." color="#7c3aed" />
          <ChannelHub />
        </div>
      </section>

      <section className="section s-lift">
        <div className="container">
          <SectionHead eyebrow="Healthcare community" title="Professionals we work with, floor by floor" lead="From the boardroom to the ambulance bay: more than 1,300 job titles across every department of a hospital, plus the caregivers next door. Press a lift button to visit a floor." color="#2457f5" />
          <HospitalLift />
        </div>
      </section>

      <section className="section s-atlas">
        <div className="container">
          <SectionHead eyebrow="Areas of expertise" title="Every condition we research, head to toe" lead="Twenty therapy areas and nearly two hundred conditions, from asthma to rare genetic disorders. Spin the wheel or tap an area to see who we listen to." color="#ec4899" />
          <DiseaseAtlas />
        </div>
      </section>

      <section className="section s-voices">
        <div className="container">
          <SectionHead eyebrow="Member voices" title="What our community is saying" lead="Doctors, nurses, allied health professionals, caregivers and patients from more than 20 countries. Swipe, or tap a card at the side, to bring the next voice on stage." color="#ec4899" />
          <VoiceWall />
          <div className="center-cta"><Button to="/reviews" variant="ghost" icon="star">All reviews and rate us</Button></div>
        </div>
      </section>

      <section className="section countries-sec" id="countries">
        <div className="container">
          <SectionHead eyebrow="Global community" title={<>Paid online surveys in <span className="ink-grad">{COVERAGE_COUNT} countries</span></>} lead="A spinning globe of every flag we cover. Tap a region and its countries step forward." color="#00a88a" />
          <FlagGlobe />
        </div>
      </section>

      <section className="section s-vault">
        <div className="container">
          <SectionHead eyebrow="Your details are safe with us" title="Your name goes in. A code comes out." lead="We don’t share your personal details with anyone. Watch them scramble: researchers only ever see a respondent code and combined charts, and 18 quality and security checks keep bots out." color="#00a88a" />
          <Anonymiser />
          <div className="center-cta"><Button to="/trust-safety" variant="ghost">See all 18 quality checks</Button></div>
        </div>
      </section>

      <TopicHub />

      <section className="section s-faq">
        <div className="container">
          <SectionHead eyebrow="Quick answers" title="Questions before you join?" lead="Tap a question and our help desk answers. For everything else, the full FAQ has you covered." color="#ff6a2c" />
          <ChatFaq items={HOME_FAQ} />
          <div className="center-cta"><Button to="/faq" variant="ghost">All FAQs</Button></div>
        </div>
      </section>
    </>
  );
}
