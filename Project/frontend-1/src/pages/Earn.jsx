// Earn — primary: "earn money online". Secondary: online earning without investment, make money from
// home, surveys to make money, earn money surveys, side hustle from home, paid medical research studies.
import PageHero from '../components/PageHero.jsx';
import { KaleidoHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Button, Eyebrow } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import TopicHub from '../components/TopicHub.jsx';
import { Link } from '../router.jsx';
import { CoinTowers, AudiencePortals, ConditionPulse, InterestDeck, ScamSwitch } from '../components/EarnV4.jsx';
import { CountryStamps } from '../components/R8.jsx';

export default function Earn() {
  return (
    <>
      <PageHero
        theme="earn"
        eyebrow="Who can earn"
        eyebrowColor="#8b5cf6"
        title={['Earn money online', { t: 'without investment', hl: 'marker' }, '— with your', { t: 'opinions', hl: 'grad' }]}
        lead="Healthcare professionals, patients, caregivers, students, homemakers, retirees and business professionals use paid surveys as a side hustle from home. Free to join, rewards for every completed survey."
        ctas={[{ label: 'Start earning free', to: '/join' }, { label: 'See payout options', to: '/rewards', variant: 'ghost', icon: 'wallet' }]}
        art={<KaleidoHeroArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Earn' }]}
        badges={['Zero investment', 'Work from home or phone', '18+ only']}
      />

      {/* Ladder — why rewards differ */}
      <section className="section earn-ladder">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#3d5afe">Earn money surveys, explained</Eyebrow>
            <h2>Why some surveys to make money pay <span className="ink-grad">more than others</span></h2>
            <p className="lead">Rewards follow scarcity and effort. A 20-minute oncology study for specialists pays more than a 10-minute consumer poll — and every invitation tells you the reward before you begin.</p>
            <Link className="text-link" to="/blog/how-much-can-you-earn-from-paid-surveys">How much can you really earn? <Icon name="arrow" size={14} /></Link>
          </div>
          <CoinTowers />
        </div>
      </section>

      {/* Professionals */}
      <section className="section earn-pros" id="professionals">
        <div className="container">
          <SectionHead eyebrow="Healthcare, caregivers & patients" title="Paid surveys for doctors, nurses & allied health — and the people they care for" lead="Pick your door. Each audience has its own page with the roles we recruit, the sign-up steps, the rewards and the questions we ask." color="#3d5afe" />
          <AudiencePortals />
          <div className="chip-links">
            <Link to="/blog/paid-surveys-for-doctors">Paid surveys for doctors</Link>
            <Link to="/blog/paid-surveys-for-nurses">Paid surveys for nurses</Link>
            <Link to="/blog/extra-income-ideas-for-pharmacists">Extra income for pharmacists</Link>
            <Link to="/blog/side-hustle-for-healthcare-workers">Side hustle for healthcare workers</Link>
          </div>
        </div>
      </section>

      {/* Patients & caregivers */}
      <section className="section earn-patients dark-band" id="patients">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#34d399">Patients & caregivers</Eyebrow>
            <h2>Paid medical research studies — <span className="ink-mint">from your sofa</span></h2>
            <p className="lead">Share what living with a condition, or caring for someone who does, is really like. No tests, no clinic visits, no medicine — just your experience, in your own time.</p>
            <ul className="tick-list light">
              <li><Icon name="check" size={16} stroke={3} />20 health areas and 195+ conditions, from diabetes to rare diseases</li>
              <li><Icon name="check" size={16} stroke={3} />Sensitive questions are always optional</li>
              <li><Icon name="check" size={16} stroke={3} />Answers are anonymised and combined</li>
            </ul>
            <p className="fine light">
              Looking for paid clinical studies near you? Those are medical trials, which we do not run — <Link to="/blog/paid-clinical-studies-vs-paid-surveys">here is how they differ and how to find them safely</Link>.
            </p>
            <Button to="/join#patient" variant="gold">Join as a patient</Button>
          </div>
          <ConditionPulse />
        </div>
      </section>

      {/* Everyone else */}
      <section className="section earn-everyone">
        <div className="container">
          <SectionHead eyebrow="Make money from home" title="Not in healthcare? You can still earn" lead="Consumers and business professionals take health, lifestyle and workplace surveys too." color="#8b5cf6" />
          <InterestDeck />
        </div>
      </section>

      {/* Myth flip cards */}
      <section className="section earn-myths">
        <div className="container split">
          <div className="split-copy">
            <Eyebrow color="#e8344e">Online earning without investment</Eyebrow>
            <h2>Real ways to make money online never ask you to pay first</h2>
            <p className="lead">If money has to flow from you before money can flow to you, walk away. Flip each red flag to see what a legitimate survey site does instead.</p>
            <Link className="text-link" to="/blog/legit-ways-to-make-money-online">Legit ways to make money online <Icon name="arrow" size={14} /></Link>
          </div>
          <ScamSwitch />
        </div>
      </section>

      {/* Countries */}
      <section className="section countries-sec" id="countries">
        <div className="container">
          <SectionHead eyebrow="Where you can earn" title="55 countries, 5 regions, one community" lead="Every destination on the board is open to join right now. Pick a region to flip the board." color="#14b8a6" />
          <CountryStamps />
        </div>
      </section>

      <TopicHub groups={['earn', 'health', 'surveys']} title="Ways to make money online — answered" eyebrow="Keep exploring" />
    </>
  );
}
