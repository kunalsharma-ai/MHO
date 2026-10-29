import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import useInView from '../hooks/useInView.js';
import { NOTIFY_CHANNELS, PAYOUTS } from '../data/site.js';
import useActivityFeed, { initials } from '../hooks/useActivityFeed.js';

// Survey Invitations — phone mock-up with channel-synced notifications
const NOTES = {
  dashboard: { app: 'MFR Dashboard', msg: 'A new survey matches your profile · Tech & Apps · ~12 min', time: 'now' },
  sms: { app: 'SMS · MFR', msg: 'New paid survey available for you. Open your dashboard to start.', time: '1m' },
  whatsapp: { app: 'WhatsApp · MyFrequentRewards', msg: '🎯 Survey match! Business software study for IT managers.', time: '2m' },
  email: { app: 'Email · invitations@', msg: 'Your invitation: Travel Experience Study — details inside.', time: '3m' },
};

export function InvitationsPhone() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setI((x) => (x + 1) % NOTIFY_CHANNELS.length), 2800);
    return () => clearInterval(t);
  }, [paused, visible]);
  const ch = NOTIFY_CHANNELS[i];
  return (
    <section ref={vref} className="section invites" aria-labelledby="inv-title">
      <div className="container inv-row">
        <div className="inv-copy reveal">
          <p className="eyebrow">Survey Invitations</p>
          <h2 id="inv-title">Never miss a survey opportunity</h2>
          <p className="sec-sub">Choose the notification method that works best for you and stay updated whenever a new survey matching your profile becomes available.</p>
          <ul className="inv-channels" onMouseLeave={() => setPaused(false)}>
            {NOTIFY_CHANNELS.map((c, k) => (
              <li key={c.id}>
                <button type="button" className={k === i ? 'on' : ''} onMouseEnter={() => { setPaused(true); setI(k); }} onFocus={() => { setPaused(true); setI(k); }} onClick={() => setI(k)}>
                  <span className={`inv-ico ic-${c.id}`}><Icon name={c.icon} size={22} /></span>
                  <span><strong>{c.name}</strong><small>{c.line}</small></span>
                  <span className="inv-bar" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="phone-wrap reveal" aria-hidden="true">
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <p className="ph-time">9:41</p>
              <p className="ph-date">Your next reward is one tap away</p>
              <div className="ph-stack">
                {NOTIFY_CHANNELS.map((c, k) => {
                  const pos = (k - i + NOTIFY_CHANNELS.length) % NOTIFY_CHANNELS.length;
                  return (
                    <div key={c.id} className={`ph-note pos-${pos} nt-${c.id}`}>
                      <span className={`inv-ico ic-${c.id}`}><Icon name={c.icon} size={16} /></span>
                      <div><b>{NOTES[c.id].app}</b><small>{NOTES[c.id].time}</small><p>{NOTES[c.id].msg}</p></div>
                    </div>
                  );
                })}
              </div>
              <div className="ph-active">{ch.name}</div>
            </div>
          </div>
          <div className="phone-glow" />
        </div>
      </div>
    </section>
  );
}

// Payouts — interactive 3D card fan
export function PayoutFan() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [front, setFront] = useState(0);
  useEffect(() => {
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setFront((f) => (f + 1) % PAYOUTS.length), 3400);
    return () => clearInterval(t);
  }, [visible]);
  return (
    <section ref={vref} className="section payouts" aria-labelledby="pay-title">
      <div className="container pay-row">
        <div className="fan-stage reveal" aria-hidden="true">
          {PAYOUTS.map((p, k) => {
            const pos = (k - front + PAYOUTS.length) % PAYOUTS.length;
            return (
              <div key={p.id} className={`pcard pp-${pos}`} style={{ '--h1': p.hue, '--h2': p.hue2 }} onMouseEnter={() => setFront(k)}>
                <div className="pcard-chip" />
                <span className="pcard-ico"><Icon name={p.icon} size={28} /></span>
                <strong>{p.name}</strong>
                <small>MyFrequentRewards · Reward payout</small>
                <span className="pcard-shine" />
              </div>
            );
          })}
        </div>
        <div className="pay-copy reveal">
          <p className="eyebrow">Rewards</p>
          <h2 id="pay-title">Get rewarded <span className="hl-orange">your way</span></h2>
          <p className="sec-sub">Receive your survey incentives through secure and convenient payment methods that suit your preferences.</p>
          <ul className="pay-list">
            {PAYOUTS.map((p, k) => (
              <li key={p.id}>
                <button type="button" className={k === front ? 'on' : ''} onClick={() => setFront(k)} onFocus={() => setFront(k)}>
                  <span className="pay-dot" style={{ '--h1': p.hue, '--h2': p.hue2 }}><Icon name={p.icon} size={18} /></span>
                  <span><strong>{p.name}</strong><small>{p.line}</small></span>
                  <em>{p.best}</em>
                </button>
              </li>
            ))}
          </ul>
          <Link to="/rewards-and-payouts" className="link-arrow">How claims work <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

// Rewards Claim — animated four-stage progress meter (redesign of the current "Rewards Claim" cards)
const CLAIM = [
  { icon: 'gift', t: 'Earn rewards', d: 'Participate in eligible surveys and research studies to earn valuable rewards.' },
  { icon: 'wallet', t: 'Check your balance', d: 'Keep track of your available rewards and monitor your earned points.' },
  { icon: 'clipboard', t: 'Submit a claim', d: 'Request your reward when you meet the eligibility and claim requirements.' },
  { icon: 'badge', t: 'Receive your reward', d: 'Get your reward after your claim has been successfully processed.' },
];
export function ClaimMeter() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setS((x) => (x + 1) % (CLAIM.length + 1)), 1800);
    return () => clearInterval(t);
  }, [visible]);
  return (
    <section ref={vref} className="section claim" aria-labelledby="claim-title">
      <div className="container">
        <div className="claim-head reveal">
          <p className="eyebrow">Rewards claim</p>
          <h2 id="claim-title">Complete surveys, earn rewards, <br />and easily claim what’s yours.</h2>
        </div>
        <div className="claim-meter reveal">
          <div className="cm-track"><div className="cm-fill" style={{ width: `${(Math.min(s, CLAIM.length) / CLAIM.length) * 100}%` }} /></div>
          <ol className="cm-steps">
            {CLAIM.map((c, i) => (
              <li key={c.t} className={i < s ? 'done' : i === s ? 'now' : ''}>
                <span className="cm-node"><Icon name={i < s ? 'check' : c.icon} size={22} stroke={i < s ? 2.6 : 1.8} /></span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Incentive stories — random, smoothly cross-fading reward moments (only when a real feed exists)
export function IncentiveStories() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const { items, isPreview } = useActivityFeed();
  const [order, setOrder] = useState([]);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
  }, [items]);
  useEffect(() => {
    if (!order.length) return undefined;
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setK((x) => (x + 1) % order.length), 3200);
    return () => clearInterval(t);
  }, [order.length, visible]);
  if (!order.length) return null;
  const vis = [0, 1, 2].map((o) => order[(k + o) % order.length]);
  return (
    <section ref={vref} className="section stories" aria-labelledby="stories-title">
      <div className="container stories-row">
        <div className="stories-copy reveal">
          <p className="eyebrow eyebrow-light">Rewards in motion</p>
          <h2 id="stories-title">Consumers and professionals, <span className="grad-text">rewarded around the world</span></h2>
          <p className="muted-light">A live look at incentives members are receiving — across regions, roles and payout methods.{isPreview ? ' ' : ''}{isPreview ? <em className="preview-tag">Preview data</em> : null}</p>
        </div>
        <div className="stories-deck" aria-live="polite">
          {vis.map((v, i) => (
            <article key={`${k}-${i}`} className={`story s-${i} ${v.segment === 'business' ? 'is-biz' : ''}`}>
              <div className="story-av">{initials(v.name)}</div>
              <div className="story-body">
                <p className="story-who"><strong>{v.name}</strong> · {v.role}</p>
                <p className="story-amt">{v.amount}</p>
                <p className="story-meta"><Icon name={v.segment === 'business' ? 'briefcase' : 'user'} size={14} /> {v.segment === 'business' ? 'Professional' : 'Consumer'} · <Icon name="pin" size={14} /> {v.place} · {v.method}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
