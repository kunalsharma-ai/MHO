// Rewards — primary: "paid surveys for cash". Secondary: earn cash for surveys, surveys that pay money,
// surveys that pay via PayPal, surveys for Amazon gift cards, UPI survey rewards, surveys to make cash.
import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { VaultHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Reveal, Button, Eyebrow } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { PaymentStack } from '../components/Showcase.jsx';
import TopicHub from '../components/TopicHub.jsx';
import RewardVending from '../components/RewardVending.jsx';
import { Link } from '../router.jsx';

const FLOW = [
  { ic: 'check', t: 'Complete a survey', d: 'Reward shown upfront', c: '#3d5afe' },
  { ic: 'shieldCheck', t: 'Validation', d: 'Quality & completion checked', c: '#14b8a6' },
  { ic: 'coins', t: 'Points credited', d: 'Visible on your dashboard', c: '#f59e0b' },
  { ic: 'target', t: 'Reach the threshold', d: 'Shown in your account', c: '#8b5cf6' },
  { ic: 'wallet', t: 'Redeem Now', d: 'Pick your payout method', c: '#e8344e' },
  { ic: 'gift', t: 'Paid', d: 'Usually within 2–3 weeks', c: '#10b981' },
];

function PointsJar() {
  const [n, setN] = useState(3);
  const pct = Math.min(n * 12.5, 100);
  return (
    <div className="points-jar">
      <div className="pj-glass" style={{ '--p': pct + '%' }} aria-hidden="true">
        <div className="pj-liquid"><span className="pj-wave" /><span className="pj-wave w2" /></div>
        {Array.from({ length: Math.min(n, 8) }).map((_, i) => <i key={i} className="pj-coin" style={{ '--i': i }} />)}
        <span className="pj-line"><em>Redemption threshold</em></span>
      </div>
      <div className="pj-ctrl">
        <p><b>{n}</b> completed survey{n === 1 ? '' : 's'} <span>(illustration)</span></p>
        <div className="pj-btns">
          <button onClick={() => setN(Math.max(0, n - 1))} aria-label="One fewer survey"><Icon name="minus" size={18} /></button>
          <button onClick={() => setN(Math.min(8, n + 1))} aria-label="One more survey"><Icon name="plus" size={18} /></button>
        </div>
        <p className="pj-state" aria-live="polite">{pct >= 100 ? '🎉 Ready to redeem!' : `${Math.round(100 - pct)}% to go`}</p>
        <small>Real point values depend on each survey and are shown in your invitation and dashboard.</small>
      </div>
    </div>
  );
}

export default function Rewards() {
  return (
    <>
      <PageHero
        theme="vault"
        eyebrow="Rewards & payouts"
        eyebrowColor="#facc15"
        title={['Paid surveys for cash —', { t: 'redeemed', hl: 'warm' }, 'your way']}
        lead="Earn cash for surveys and choose how it reaches you: PayPal, Wire Transfer or Amazon Gift Cards worldwide, and UPI for members in India. No fees to join, no fees to redeem."
        ctas={[{ label: 'Start earning', to: '/join' }, { label: 'How payouts work', to: '/rewards#flow', variant: 'ghost', icon: 'coins' }]}
        art={<VaultHeroArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Rewards' }]}
      />

      <section className="section rw-shelves">
        <div className="container">
          <SectionHead eyebrow="Reward categories" title={<>Three audiences, <span className="ink-grad">three reward menus</span></>} lead="What a surgeon finds useful isn’t what a busy carer or a patient needs. Each machine holds the rewards offered to that group — press a slot to see it drop. The exact options for a study are listed in its invitation." color="#8b5cf6" />
          <RewardVending />
        </div>
      </section>

      <section className="section rw-methods">
        <div className="container">
          <SectionHead eyebrow="Surveys that pay money" title="Four ways to get paid" lead="Choose your country — we only show payout options that genuinely work there. UPI is India-only." color="#f97316" />
          <PaymentStack initialCountry="us" />
          <div className="chip-links">
            <Link to="/blog/surveys-that-pay-via-paypal">Surveys that pay via PayPal</Link>
            <Link to="/blog/surveys-for-amazon-gift-cards">Surveys for Amazon gift cards</Link>
            <Link to="/blog/upi-survey-rewards-earn-online-india">UPI survey rewards in India</Link>
          </div>
        </div>
      </section>

      <section className="section rw-flow dark-band" id="flow">
        <div className="container">
          <SectionHead eyebrow="Surveys to make cash, step by step" title={<>How your reward <span className="ink-gold">travels</span></>} color="#facc15" />
          <ol className="relay">
            {FLOW.map((f, i) => (
              <Reveal as="li" key={f.t} delay={i * 110} style={{ '--c': f.c }}>
                <span className="rl-ic"><Icon name={f.ic} size={22} /></span>
                <b>{f.t}</b>
                <small>{f.d}</small>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section rw-jar">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#8b5cf6">Points & threshold</Eyebrow>
            <h2>Watch your points <span className="ink-grad">fill up</span></h2>
            <p className="lead">Each completed survey adds points. When your balance reaches the minimum threshold, the “Redeem Now” button unlocks on your dashboard.</p>
            <ul className="tick-list">
              <li><Icon name="check" size={16} stroke={3} />Double-check payout details to avoid delays</li>
              <li><Icon name="check" size={16} stroke={3} />Payment options can vary by country law</li>
              <li><Icon name="check" size={16} stroke={3} />Be wary of any site promising “instant cash”</li>
            </ul>
            <Link className="text-link" to="/blog/surveys-that-pay-instantly-truth">The truth about instant payouts <Icon name="arrow" size={14} /></Link>
          </div>
          <PointsJar />
        </div>
      </section>

      <section className="section rw-cta">
        <div className="container">
          <div className="help-card rw-band">
            <span className="hc-ic"><Icon name="gift" size={30} /></span>
            <div><h2>More surveys, more rewards</h2><p>Get invitations by email, dashboard, SMS or WhatsApp — and redeem the way that suits you.</p></div>
            <div className="hc-btns"><Button to="/join" variant="gold">Join free &amp; get invited</Button></div>
          </div>
        </div>
      </section>

      <TopicHub groups={['payouts', 'surveys']} title="Rewards questions people search for" eyebrow="Payout guides" exclude="/rewards" />
    </>
  );
}
