import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import { DepartmentWheel, IndustryBento, JobTitleWaterfall } from '../sections/ProfileSections.jsx';
import { VerificationScanner } from '../sections/TrustSections.jsx';

const page = PAGES.professionals;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'For Professionals', path: page.path }];

const TOPICS = [
  { icon: 'database', t: 'Software & cloud', d: 'Tools you evaluate, buy or use daily.' },
  { icon: 'clipboard', t: 'Procurement', d: 'How vendors are chosen and budgets set.' },
  { icon: 'activity', t: 'Operations', d: 'Manufacturing, logistics and supply chains.' },
  { icon: 'heart', t: 'Healthcare', d: 'Clinical practice, devices and care pathways.' },
  { icon: 'user', t: 'People & HR', d: 'Hiring, training and workplace technology.' },
  { icon: 'trend', t: 'Strategy', d: 'Industry outlook, regulation and growth.' },
];

const FAQS = [
  { q: 'Why are professional surveys rewarded more?', a: 'Specialist audiences are harder to reach, so B2B studies typically carry higher incentives than general consumer studies.' },
  { q: 'How do you verify professionals?', a: 'Through company email validation, phone verification, public profile cross-referencing such as LinkedIn, external database checks and manual reviews.' },
  { q: 'Will my employer or clients see my identity?', a: 'No — your identity is never shared; answers are reported anonymously or in aggregate.' },
  { q: 'Should I share confidential company information?', a: 'Never; surveys ask for your professional opinion, not confidential data.' },
  { q: 'Can business owners and freelancers join?', a: 'Yes — founders, owners, partners and independent consultants are welcome.' },
  { q: 'Do professionals also receive consumer surveys?', a: 'Yes, you can receive both business and consumer studies.' },
];

export default function Professionals() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="For business professionals"
        title={page.h1}
        lead="Your expertise moves markets. Share it in verified B2B studies — from enterprise software to hospital operations — and earn rewards that respect the value of your time."
        art="grid"
        theme="exec"
      >
        <div className="ph-actions">
          <Link to="/sign-up?type=professional" className="btn btn-light">Join as a professional <Icon name="arrow" size={18} /></Link>
          <Link to="/who-can-join" className="btn btn-outline-light">Roles we welcome</Link>
        </div>
      </PageHero>

      <section className="section topics" aria-labelledby="tp-title">
        <div className="container topics-row">
          <div className="reveal">
            <p className="eyebrow">B2B research</p>
            <h2 id="tp-title">What professionals are asked about</h2>
            <p className="sec-sub">Make money from the internet without investment by doing what you already do best — thinking critically about your field. Read the full <Link to="/blog/paid-surveys-for-business-professionals">professional’s guide</Link>.</p>
          </div>
          <ul className="topic-orbit">
            {TOPICS.map((t, i) => (
              <li key={t.t} className="reveal" style={{ '--i': i }}>
                <span><Icon name={t.icon} size={24} /></span>
                <strong>{t.t}</strong>
                <small>{t.d}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JobTitleWaterfall />
      <IndustryBento />
      <DepartmentWheel />
      <VerificationScanner />

      <section className="section prose-sec" aria-labelledby="pr-deep">
        <div className="container prose-cols reveal">
          <h2 id="pr-deep">Expert opinion, protected identity</h2>
          <div>
            <p>B2B research only works when clients trust that respondents are who they say they are. That is why verification is stricter for professionals — and why verified professional opinions are rewarded more generously.</p>
            <p>Verification confirms your credentials; it never exposes them. Your name, employer and contact details are never passed to research clients. See the full list of <Link to="/quality-and-data-security">quality and security checks</Link> and our <Link to="/privacy">privacy policy</Link>. Market research standards such as <a href="https://www.iso.org/standard/73671.html" target="_blank" rel="noopener noreferrer">ISO 20252</a> guide how our parent company works.</p>
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="pr-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="pr-faq">Professional questions</h2></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="Your expertise deserves a reward." sub="Join free, verify once, and start receiving B2B invitations." variant="exec" />
    </>
  );
}
