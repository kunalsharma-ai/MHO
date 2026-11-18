// How it works — primary: "get paid to take surveys". Secondary: get paid to do surveys, paid to do
// surveys, survey and get paid, take surveys for money, doing surveys for money, earn money through surveys.
import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { SectionHead, Eyebrow } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { ConveyorArt, LoopTrack, DayDial } from '../components/HowV4.jsx';
import TopicHub from '../components/TopicHub.jsx';
import { ScreeningSieve, HabitDeck, FaqStage } from '../components/R8.jsx';
import { Link } from '../router.jsx';
import { STEPS } from '../data/surveys.js';
import { HOW_FAQ } from '../data/faqs.js';

const DAY = [
  { time: '08:10', ic: 'mail', t: 'Invitation lands', d: '“Heart health study · 15 min · reward shown”' },
  { time: '12:40', ic: 'phone', t: 'Lunch-break survey', d: 'Screener passed, 15 minutes on the phone.' },
  { time: '12:56', ic: 'check', t: 'Completed', d: 'Points pending validation on your dashboard.' },
  { time: 'Later', ic: 'wallet', t: 'Redeem', d: 'Hit the threshold → “Redeem Now” → PayPal, Wire, Gift Card or UPI.' },
];


export default function HowItWorks() {
  const [day, setDay] = useState(0);
  return (
    <>
      <PageHero
        theme="journey"
        eyebrow="How it works"
        eyebrowColor="#14b8a6"
        title={['Get paid to take surveys', { t: 'in four', hl: 'marker' }, { t: 'simple steps', hl: 'grad' }]}
        lead="Join free, tell us about yourself once, receive surveys that match you, and redeem rewards your way. Here is exactly what happens — including the parts other survey sites skip."
        ctas={[{ label: 'Create my free account', to: '/join' }, { label: 'Payout options', to: '/rewards', variant: 'ghost', icon: 'wallet' }]}
        art={<ConveyorArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'How It Works' }]}
      />

      <section className="section how-steps">
        <div className="container">
          <SectionHead eyebrow="The journey" title="Survey and get paid — the whole loop" lead="Four checkpoints, then round again: every new study that matches your profile starts another lap." color="#3d5afe" />
          <LoopTrack steps={STEPS} />
        </div>
      </section>

      {/* A day in the life — interactive timeline */}
      <section className="section how-day dark-band">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#facc15">A day of doing surveys for money</Eyebrow>
            <h2>Fits into the gaps of a <span className="ink-gold">busy day</span></h2>
            <p className="lead">Spin through a typical day on the 24-hour dial. No fixed hours — you decide when to take surveys for money.</p>
          </div>
          <DayDial items={DAY} day={day} setDay={setDay} />
        </div>
      </section>

      {/* Funnel */}
      <section className="section how-funnel">
        <div className="container split">
          <ScreeningSieve />
          <div className="split-copy">
            <Eyebrow color="#f59e0b">Why not every invite pays</Eyebrow>
            <h2>Screening is how paid surveys stay valuable</h2>
            <p className="lead">Researchers pay for a precise audience. Short screeners make sure you are a fit before you invest time — so when you do qualify, your opinion genuinely counts and you earn money through surveys that match you.</p>
            <Link className="text-link" to="/blog/why-you-get-screened-out-of-surveys">Why you get screened out <Icon name="arrow" size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Tips grid */}
      <section className="section how-tips">
        <div className="container">
          <SectionHead eyebrow="Pro tips" title="Get paid to do surveys more often" lead="Six habits of members who receive the most invitations." color="#e8344e" />
          <HabitDeck />
        </div>
      </section>

      <section className="section how-faq">
        <div className="container">
          <FaqStage items={HOW_FAQ} idPrefix="howfaq" theme="how" eyebrow="Paid to do surveys?" title="Common questions" />
        </div>
      </section>

      <TopicHub groups={['surveys', 'payouts']} title="Learn more about paid surveys" eyebrow="Guides" />
    </>
  );
}
