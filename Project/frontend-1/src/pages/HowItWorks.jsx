import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import JourneyPath from '../sections/JourneyPath.jsx';
import { InvitationsPhone } from '../sections/RewardSections.jsx';

const page = PAGES.howItWorks;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'How It Works', path: page.path }];

const DEEP = [
  {
    icon: 'user', color: '#FF8A00', t: 'Register online — free for life',
    d: 'Create your account with an active email, mobile number, country and date of birth. A CAPTCHA and quick validation keep bots out from day one.',
    bullets: ['No fees, ever', 'Full date of birth (DD/MM/YYYY) — kept private', 'One account per person'],
  },
  {
    icon: 'doubleCheck', color: '#2F6BFF', t: 'Verify your email and phone',
    d: 'Double opt-in activates your account. It protects you, keeps the community genuine and makes sure invitations reach you.',
    bullets: ['Email confirmation link', 'Phone verification code', 'Professionals may confirm a company email'],
  },
  {
    icon: 'layers', color: '#14C9B5', t: 'Complete your profile surveys',
    d: 'Profile surveys about your household, work, interests and devices are how we match you to studies. Profile sections can also add points to your balance.',
    bullets: ['Consumer and business profile sections', 'Update anytime life changes', 'More complete = better matches'],
  },
  {
    icon: 'mail', color: '#8B5CF6', t: 'Receive matched survey invitations',
    d: 'When a study needs someone like you, you are notified through your dashboard, SMS, WhatsApp or email. Each invitation shows the topic, estimated time and incentive.',
    bullets: ['Respond early — quotas fill', 'Screen-outs are normal', 'Honest answers build your quality score'],
  },
  {
    icon: 'gift', color: '#FF5E7E', t: 'Track, claim and receive rewards',
    d: 'Watch your balance grow in the dashboard. Once you reach the claim threshold, claim via PayPal, wire transfer or Amazon gift card — or UPI if you live in India. Unclaimed balances carry forward.',
    bullets: ['Transparent balance history', 'Four payout methods', 'Support on WhatsApp and Live Help'],
  },
];

const FAQS = [
  { q: 'How long does it take to join?', a: 'Most people register, verify and start their first profile survey within a few minutes.' },
  { q: 'Do I need to log in every day to find surveys?', a: 'No — invitations come to you by dashboard, SMS, WhatsApp or email, so you can simply respond when one arrives.' },
  { q: 'Why are profile surveys so important?', a: 'They tell us which studies fit you, so a complete and honest profile leads to more relevant invitations.' },
  { q: 'What happens if I do not qualify for a survey?', a: 'You are politely screened out, and new matching invitations will keep arriving.' },
  { q: 'How do I claim my rewards?', a: 'Open your dashboard, choose claim once you reach the threshold, pick a payout method and confirm.' },
  { q: 'Can I take part from any device?', a: 'Yes, surveys work on phones, tablets and computers with a modern browser.' },
];

export default function HowItWorks() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="How it works"
        title={page.h1}
        lead="Five simple steps turn your honest opinion into real rewards — no investment, no skills, no fees. Here is exactly what happens from sign-up to payout."
        art="steps"
        theme="sunrise"
      >
        <div className="ph-actions">
          <Link to="/sign-up" className="btn btn-light">Join free <Icon name="arrow" size={18} /></Link>
          <Link to="/rewards-and-payouts" className="btn btn-outline-light">See rewards</Link>
        </div>
      </PageHero>

      <JourneyPath compact />

      <section className="section zigzag" aria-labelledby="zz-title">
        <div className="container">
          <div className="sec-head sec-center reveal">
            <p className="eyebrow">Step by step</p>
            <h2 id="zz-title">Every step, unpacked</h2>
            <p className="sec-sub">If you have ever wondered how to earn money online safely, this is the whole process — nothing hidden.</p>
          </div>
          <ol className="zz-list">
            {DEEP.map((s, i) => (
              <li key={s.t} className={`zz reveal ${i % 2 ? 'flip' : ''}`} style={{ '--c': s.color }}>
                <div className="zz-visual" aria-hidden="true">
                  <span className="zz-num">{i + 1}</span>
                  <span className="zz-ico"><Icon name={s.icon} size={46} stroke={1.4} /></span>
                  <span className="zz-orbit" />
                </div>
                <div className="zz-copy">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <ul>{s.bullets.map((b) => <li key={b}><Icon name="check" size={16} stroke={2.4} /> {b}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section curve-sec" aria-labelledby="curve-title">
        <div className="container curve-row">
          <div className="reveal">
            <p className="eyebrow">Profile power</p>
            <h2 id="curve-title">A fuller profile means better-matched surveys</h2>
            <p className="sec-sub">Researchers look for specific people. Each profile section you complete opens doors to studies that need exactly your background — read our <Link to="/blog/survey-profile-tips-to-qualify-more">profile tips</Link>.</p>
            <ul className="legend-list">
              <li><i className="lg-a" /> Matching invitations</li>
              <li><i className="lg-b" /> Screen-outs</li>
            </ul>
            <p className="tiny muted">Illustrative relationship, not a guarantee of survey volume.</p>
          </div>
          <figure className="curve-chart reveal" aria-label="Illustrative chart: as profile completeness rises, matching invitations rise and screen-outs fall">
            <svg viewBox="0 0 520 300" role="img">
              <title>Profile completeness versus matching invitations (illustrative)</title>
              {[60, 120, 180, 240].map((y) => <line key={y} x1="50" x2="500" y1={y} y2={y} className="cc-grid" />)}
              <path d="M50 250 C 160 240, 240 180, 300 120 S 430 50, 500 40" className="cc-a" />
              <path d="M50 70 C 170 90, 250 150, 320 200 S 440 240, 500 245" className="cc-b" />
              <circle cx="500" cy="40" r="7" className="cc-dot" />
              <text x="50" y="285" className="cc-lbl">Basic sign-up</text>
              <text x="500" y="285" textAnchor="end" className="cc-lbl">Complete profile</text>
            </svg>
          </figure>
        </div>
      </section>

      <InvitationsPhone />

      <section className="section compare" aria-labelledby="cmp-title">
        <div className="container">
          <div className="sec-head sec-center reveal">
            <p className="eyebrow">Two journeys, one platform</p>
            <h2 id="cmp-title">Consumer or professional — or both</h2>
          </div>
          <div className="cmp-grid">
            <article className="cmp-card cmp-c reveal">
              <h3><Icon name="user" /> Consumer member</h3>
              <ul>
                <li>Everyday topics: shopping, food, tech, travel, media</li>
                <li>Short, frequent studies</li>
                <li>Perfect for students, parents, homemakers, retirees</li>
              </ul>
              <Link to="/paid-surveys-for-consumers" className="link-arrow">Consumer surveys <Icon name="arrow" size={16} /></Link>
            </article>
            <div className="cmp-vs" aria-hidden="true">&amp;</div>
            <article className="cmp-card cmp-b reveal">
              <h3><Icon name="briefcase" /> Professional member</h3>
              <ul>
                <li>B2B topics: software, purchasing, operations, healthcare</li>
                <li>Higher-value studies for verified experts</li>
                <li>Perfect for CXOs, managers, engineers, owners</li>
              </ul>
              <Link to="/paid-surveys-for-professionals" className="link-arrow">Professional surveys <Icon name="arrow" size={16} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="hiw-faq">
        <div className="container faq-home-row">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 id="hiw-faq">How it works — answered</h2>
            <p className="sec-sub">More in the <Link to="/faq">FAQ</Link> or our guide to <Link to="/blog/earn-money-online-without-investment">earning without investment</Link>.</p>
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="Ready for step one?" sub="It’s free, it’s quick, and your first profile survey is waiting." variant="ocean" />
    </>
  );
}
