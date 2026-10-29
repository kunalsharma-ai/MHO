import Icon from '../components/Icon.jsx';

// Two counter-scrolling ribbons of the audiences currently invited — breadth, no numbers.
const ROW1 = ['IT Managers · Germany', 'Parents · Brazil', 'Doctors · India', 'Gamers · Japan', 'Founders · UAE', 'Students · Philippines', 'EV owners · Norway', 'HR Directors · UK', 'Homemakers · Mexico', 'Engineers · South Korea'];
const ROW2 = ['Procurement Heads · USA', 'Retirees · Spain', 'Pet owners · Australia', 'CFOs · Singapore', 'Travellers · France', 'Farmers · Kenya', 'Shoppers · Nigeria', 'Teachers · Poland', 'Pharmacists · Egypt', 'Developers · Vietnam'];

export default function InviteMarquee() {
  return (
    <section className="marquee-band" aria-label="Audiences we invite">
      <div className="mq-label"><span className="live-dot" /> Opinions wanted from</div>
      <div className="mq-track">
        <ul className="mq-row">{[...ROW1, ...ROW1].map((t, i) => <li key={i} aria-hidden={i >= ROW1.length}><Icon name="sparkle" size={14} /> {t}</li>)}</ul>
      </div>
      <div className="mq-track mq-rev">
        <ul className="mq-row">{[...ROW2, ...ROW2].map((t, i) => <li key={i} aria-hidden={i >= ROW2.length}><Icon name="star" size={14} /> {t}</li>)}</ul>
      </div>
    </section>
  );
}
