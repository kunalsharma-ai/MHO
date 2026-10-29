import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { PAYOUTS } from '../data/site.js';
import { ClaimMeter, IncentiveStories, InvitationsPhone, PayoutFan } from '../sections/RewardSections.jsx';

const page = PAGES.rewards;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Rewards & Payouts', path: page.path }];

const MATRIX = [
  { k: 'Where it works best', v: ['Worldwide', 'India', 'Verified bank accounts', 'Online shoppers'] },
  { k: 'What you need', v: ['PayPal email', 'UPI ID (India only)', 'Bank account details', 'Email for delivery'] },
  { k: 'Lands as', v: ['Wallet balance', 'Bank credit', 'Bank credit', 'Digital gift code'] },
  { k: 'Great for', v: ['Dollar-valued rewards', 'Instant rupee transfers', 'Bank-first members', 'Everyday shopping'] },
];

const FAQS = [
  { q: 'How do I earn money online cash rewards with MyFrequentRewards?', a: 'Complete eligible surveys and profile sections to build your balance, then claim it as PayPal, wire transfer, UPI (India only) or an Amazon gift card.' },
  { q: 'Is there a minimum amount to claim?', a: 'Yes, a claim threshold applies and is shown in your dashboard; balances below it carry forward.' },
  { q: 'Which payout should I choose?', a: 'UPI suits members in India, PayPal suits most international members, wire transfer suits bank-only preferences and gift cards suit shoppers.' },
  { q: 'Why might a reward stay pending?', a: 'Rewards may stay pending while quality checks confirm a completion with the research client.' },
  { q: 'How do survey invitations reach me?', a: 'Through your Account Dashboard, SMS, WhatsApp or email — you choose.' },
  { q: 'Are there any fees?', a: 'MyFrequentRewards charges no fees; your payment provider’s own terms may apply.' },
];

export default function Rewards() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Rewards & payouts"
        title={page.h1}
        lead="Earn money online in cash or gift cards: track your balance, claim when you are ready and receive rewards through PayPal, wire transfer or Amazon gift card — plus UPI for members in India."
        art="coins"
        theme="gold"
      >
        <ul className="ph-pills">{PAYOUTS.map((p) => <li key={p.id}><Icon name={p.icon} size={16} /> {p.name}{p.only === 'IN' ? <small className="ph-only">India only</small> : null}</li>)}</ul>
      </PageHero>

      <PayoutFan />

      <section className="section matrix-sec" aria-labelledby="mx-title">
        <div className="container">
          <div className="sec-head sec-center reveal">
            <p className="eyebrow">Compare</p>
            <h2 id="mx-title">Pick the payout that fits your life</h2>
            <p className="sec-sub">All options are secure, and you can choose a different one each time you claim. Members in India can use all four; members in other countries can use PayPal, wire transfer or an Amazon gift card. Learn about UPI (India only) from <a href="https://www.npci.org.in/what-we-do/upi/product-overview" target="_blank" rel="noopener noreferrer">NPCI</a>.</p>
          </div>
          <div className="matrix reveal" role="table" aria-label="Payout method comparison">
            <div className="mx-row mx-headrow" role="row">
              <span role="columnheader" className="mx-k" />
              {PAYOUTS.map((p) => (
                <span role="columnheader" key={p.id} className="mx-h" style={{ '--h1': p.hue, '--h2': p.hue2 }}>
                  <Icon name={p.icon} size={20} /> {p.name}
                </span>
              ))}
            </div>
            {MATRIX.map((r) => (
              <div className="mx-row" role="row" key={r.k}>
                <span role="rowheader" className="mx-k">{r.k}</span>
                {r.v.map((v, i) => <span role="cell" key={i} data-label={PAYOUTS[i].name}>{v}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClaimMeter />
      <InvitationsPhone />
      <IncentiveStories />

      <section className="section rules" aria-labelledby="rules-title">
        <div className="container rules-row">
          <div className="reveal">
            <p className="eyebrow">Fair play</p>
            <h2 id="rules-title">Simple rules that protect your rewards</h2>
            <p className="sec-sub">Rewards are paid for eligible, validated completions. Full details are in our <Link to="/terms">terms of use</Link> and <Link to="/profiling">profiling & quality score</Link> policy.</p>
          </div>
          <ul className="rule-cards">
            <li className="reveal"><Icon name="user" size={22} /><strong>One account per person</strong><span>Duplicates are detected and removed.</span></li>
            <li className="reveal"><Icon name="pen" size={22} /><strong>Honest, attentive answers</strong><span>Quality checks protect the value of every reward.</span></li>
            <li className="reveal"><Icon name="clock" size={22} /><strong>Balances carry forward</strong><span>Nothing is lost if you take a break.</span></li>
            <li className="reveal"><Icon name="lock" size={22} /><strong>Secure payout details</strong><span>Used only to send your reward.</span></li>
          </ul>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="rw-faq">
        <div className="container faq-home-row">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 id="rw-faq">Rewards questions</h2>
            <p className="sec-sub">Compare methods in our blog: <Link to="/blog/survey-rewards-paypal-upi-gift-cards">PayPal vs UPI vs gift cards</Link>.</p>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="Your first reward starts with a free account." variant="sunrise" />
    </>
  );
}
