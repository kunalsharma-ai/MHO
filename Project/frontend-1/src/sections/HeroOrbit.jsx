import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Motto from '../components/Motto.jsx';
import useInView from '../hooks/useInView.js';
import { BRAND } from '../data/site.js';

const WHO = ['students', 'homemakers', 'IT managers', 'doctors', 'gamers', 'founders', 'retirees', 'engineers', 'parents', 'CXOs'];
const ORBIT_A = ['gift', 'wallet', 'star', 'chat'];
const ORBIT_B = ['briefcase', 'user', 'coins', 'globe', 'shield'];

export default function HeroOrbit() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setW((i) => (i + 1) % WHO.length), 2200);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <section ref={vref} className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aurora a1" />
        <div className="hero-aurora a2" />
        <div className="hero-aurora a3" />
        <div className="hero-grid" />
        {Array.from({ length: 18 }).map((_, i) => <i key={i} className="hero-spark" style={{ '--i': i }} />)}
      </div>

      <div className="container hero-row">
        <div className="hero-copy">
          <Motto className="mx-home" />
          <h1 id="hero-title" className="hero-title">
            <span className="ht-line">Earn money online</span>
            <span className="ht-line ht-accent">by sharing your opinion</span>
          </h1>
          <p className="hero-who" aria-live="off">
            Paid surveys built for{' '}
            <span className="who-swap">
              {WHO.map((x, i) => (
                <span key={x} className={i === w ? 'on' : ''} aria-hidden={i !== w}>{x}</span>
              ))}
            </span>
          </p>
          <p className="hero-lead">
            No investment. No fees. Just your honest voice — rewarded through <strong>PayPal</strong>, <strong>wire transfer</strong> or <strong>Amazon gift cards</strong> — plus <strong>UPI</strong> in India.
          </p>
          <div className="hero-actions">
            <Link to="/sign-up" className="btn btn-primary btn-lg btn-shine">Start earning free <Icon name="arrow" size={20} /></Link>
            <Link to="/how-it-works" className="btn btn-glass btn-lg"><span className="play-dot" /> How it works</Link>
          </div>
          <ul className="hero-ticks">
            <li><Icon name="check" size={16} stroke={2.6} /> 100% free membership</li>
            <li><Icon name="check" size={16} stroke={2.6} /> Consumers & professionals</li>
            <li><Icon name="check" size={16} stroke={2.6} /> Data never sold</li>
          </ul>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="orbit-scene">
            <div className="ring ring-a">
              {ORBIT_A.map((ic, i) => (
                <span key={ic} className="orb" style={{ '--a': `${(360 / ORBIT_A.length) * i}deg` }}><span className="orb-in"><Icon name={ic} size={20} /></span></span>
              ))}
            </div>
            <div className="ring ring-b">
              {ORBIT_B.map((ic, i) => (
                <span key={ic} className="orb orb-b" style={{ '--a': `${(360 / ORBIT_B.length) * i}deg` }}><span className="orb-in"><Icon name={ic} size={18} /></span></span>
              ))}
            </div>
            <div className="coin">
              <div className="coin-face coin-front"><img src={BRAND.monogram} alt="" width="150" height="150" /></div>
              <div className="coin-face coin-back"><Icon name="gift" size={64} /></div>
              <div className="coin-edge" />
            </div>
            <div className="float-card fc-1"><Icon name="mail" size={16} /> New survey match <b>· 12 min</b></div>
            <div className="float-card fc-2"><Icon name="wallet" size={16} /> Reward added <b>✓</b></div>
            <div className="float-card fc-3"><Icon name="shield" size={16} /> Profile verified</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true"><span /></div>
    </section>
  );
}
