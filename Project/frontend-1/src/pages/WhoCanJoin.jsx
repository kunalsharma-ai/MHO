import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import PageHero, { PageSeo } from '../components/PageHero.jsx';
import { CtaBand, FaqList } from '../components/Common.jsx';
import { PAGES } from '../data/pages.js';
import GlobeReach from '../sections/GlobeReach.jsx';
import { DemographicRibbons, DepartmentWheel, IndustryBento, InterestMosaic, JobTitleWaterfall } from '../sections/ProfileSections.jsx';

const page = PAGES.whoCanJoin;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Who Can Join', path: page.path }];

const FAQS = [
  { q: 'Which countries can join?', a: 'Members join from across Asia-Pacific, Europe, North America, South America, the Middle East and Africa; eligibility is confirmed at sign-up.' },
  { q: 'Do I need a particular job to join?', a: 'No — consumers of every background are welcome, and professionals also receive B2B studies about their work.' },
  { q: 'Is there a minimum age?', a: 'Yes, you must meet the minimum age shown at sign-up, confirmed using your date of birth.' },
  { q: 'Can I join if I am not working?', a: 'Absolutely — students, homemakers, retirees and job seekers are all valuable consumer voices.' },
  { q: 'Why do you ask about industry and department?', a: 'It lets us invite you to business studies that match your real expertise.' },
];

export default function WhoCanJoin() {
  return (
    <>
      <PageSeo page={page} faqs={FAQS} crumbs={crumbs} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Profiles we welcome"
        title={page.h1}
        lead="Online surveys for everyone: consumers of every age and background, and professionals from every industry, department and level of seniority — across five world regions."
        art="globe"
        theme="ocean"
      >
        <nav className="jump-links" aria-label="Jump to section">
          <a href="#globe-title">Countries</a><a href="#demo-title">Demographics</a><a href="#int-title">Interests</a><a href="#jt-title">Job titles</a><a href="#ind-title">Industries</a><a href="#dept-title">Departments</a>
        </nav>
      </PageHero>

      <GlobeReach withLink={false} />
      <DemographicRibbons />
      <InterestMosaic />
      <JobTitleWaterfall />
      <IndustryBento />
      <DepartmentWheel />

      <section className="section prose-sec" aria-labelledby="wcj-deep">
        <div className="container prose-cols reveal">
          <h2 id="wcj-deep">Why diversity of profiles matters</h2>
          <div>
            <p>Good research reflects the real world. A study about electric vehicles needs drivers in Oslo and Delhi; a study about hospital software needs administrators in Nairobi and New York. The broader our community, the more relevant invitations every member receives.</p>
            <p>That is why we welcome every walk of life — and why your honest profile matters. Start with <Link to="/how-it-works">how it works</Link>, explore <Link to="/paid-surveys-for-consumers">consumer</Link> and <Link to="/paid-surveys-for-professionals">professional</Link> surveys, or read <Link to="/blog/earn-dollars-online-without-investment">earning from international studies</Link>.</p>
          </div>
        </div>
      </section>

      <section className="section faq-split" aria-labelledby="wcj-faq">
        <div className="container faq-home-row">
          <div className="reveal"><p className="eyebrow">FAQ</p><h2 id="wcj-faq">Eligibility questions</h2><p className="sec-sub"><Link to="/sign-up">Check eligibility by signing up <Icon name="arrow" size={14} /></Link></p></div>
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CtaBand title="There’s a place for your voice here." variant="ocean" />
    </>
  );
}
