// Reviews — the ONLY place member testimonials are shown (per brand guidance).
import PageHero from '../components/PageHero.jsx';
import { StarsHeroArt } from '../components/HeroArt.jsx';
import { SectionHead, Button } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { HeartbeatVoices, VoicesWall } from '../components/Testimonials.jsx';
import { openRateExperience } from '../components/RateExperience.jsx';
import { AUDIENCES, TESTIMONIALS } from '../data/testimonials.js';

export default function Reviews() {
  const counts = AUDIENCES.map((a) => ({ ...a, n: TESTIMONIALS.filter((t) => t.audience === a.id).length }));
  const max = Math.max(...counts.map((c) => c.n));
  return (
    <>
      <PageHero
        theme="stars"
        eyebrow="Member reviews"
        eyebrowColor="#f59e0b"
        title={['Voices from our', { t: 'healthcare', hl: 'grad' }, 'community']}
        lead="Read MyHealthOpinions reviews from doctors, nurses, allied health professionals, caregivers and patients around the world — then add your own voice in under a minute."
        art={<StarsHeroArt />}
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Reviews' }]}
      >
        <div className="ph-ctas">
          <Button onClick={openRateExperience} icon="star">Rate your experience</Button>
        </div>
      </PageHero>

      <section className="section rv-pulse">
        <div className="container">
          <SectionHead eyebrow="Heartbeat voices" title="Every peak is a member's story" lead="Tap a node on the pulse line — or let it play." color="#e8344e" />
          <HeartbeatVoices />
        </div>
      </section>

      <section className="section rv-mix dark-band">
        <div className="container split">
          <div className="split-copy">
            <h2>Who is speaking</h2>
            <p className="lead">Reviews come from every corner of our panel.</p>
          </div>
          <ul className="mix-bars">
            {counts.map((c, i) => (
              <li key={c.id} style={{ '--c': c.color, '--v': (c.n / max) * 100 + '%', '--i': i }}>
                <span>{c.label}</span><i aria-hidden="true" /><b>{c.n}</b>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rv-wall">
        <div className="container">
          <SectionHead eyebrow="The wall" title="All member reviews" color="#3d5afe" />
          <VoicesWall />
          <div className="rv-add">
            <Icon name="pen" size={22} />
            <div><b>Been part of a study?</b><span>Your review appears here instantly on your device, and publicly after a quick moderation check.</span></div>
            <Button onClick={openRateExperience} icon="star">Write a review</Button>
          </div>
        </div>
      </section>
    </>
  );
}
