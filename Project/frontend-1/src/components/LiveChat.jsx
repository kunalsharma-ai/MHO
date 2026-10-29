import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { ALL_FAQS } from '../data/pages.js';
import { BRAND, CONTACT, whatsappLink } from '../data/site.js';
import { pop, setSound, soundOn } from '../utils/sound.js';

// 24/7 Live Help ("Help Hub"): instant answers from the FAQ knowledge base, a topic launcher that invites
// questions, and one-tap hand-off to a human (WhatsApp, email, or Tawk.to when VITE_TAWK_* are configured).

const TAWK_P = import.meta.env.VITE_TAWK_PROPERTY_ID;
const TAWK_W = import.meta.env.VITE_TAWK_WIDGET_ID;

const INTENTS = [
  { k: ['hi', 'hello', 'hey', 'namaste', 'good morning'], a: 'Hello! 👋 I can help with joining, surveys, rewards, payouts, privacy or your account. What would you like to know?' },
  { k: ['sign up', 'signup', 'register', 'join', 'create account'], a: 'Joining is free and takes about two minutes. You’ll need your email, mobile number, country and date of birth — then confirm your email and you’re in.', link: ['/sign-up', 'Start sign-up'] },
  { k: ['upi'], a: 'UPI is available for members in India only. Members in India can claim via UPI, PayPal, wire transfer or Amazon gift card; members in other countries can choose PayPal, wire transfer or Amazon gift card.', link: ['/rewards-and-payouts', 'See payout options'] },
  { k: ['payout', 'paypal', 'wire', 'bank', 'gift card', 'amazon', 'withdraw', 'redeem', 'claim', 'payment'], a: 'Once your balance reaches the claim threshold you can redeem from your dashboard. India: UPI, PayPal, wire transfer or Amazon gift card. Other countries: PayPal, wire transfer or Amazon gift card. Verification and processing can take 2–3 weeks.', link: ['/rewards-and-payouts', 'See payout options'] },
  { k: ['pending', 'not received', 'delay', 'late', 'missing reward'], a: 'Rewards can stay pending while quality checks finish. If a claim seems late, share your registered email with our team on WhatsApp and we’ll check it.', human: true },
  { k: ['screen', 'disqualif', 'not qualify', 'kicked'], a: 'Screen-outs happen when a study needs a different audience or its quota is full. Keeping your profile complete and accurate helps you match more often.', link: ['/blog/survey-profile-tips-to-qualify-more', 'Profile tips'] },
  { k: ['how much', 'earn', 'money', 'reward per', 'points'], a: 'Every survey shows its reward and estimated time before you start. Typical rewards range by topic — for instance shopping surveys around $4 for ~10 minutes and travel surveys around $7 for ~18 minutes.', link: ['/how-it-works', 'How it works'] },
  { k: ['professional', 'b2b', 'business', 'manager', 'linkedin', 'company email'], a: 'Business professionals receive B2B studies about their role and industry. We verify credentials (such as a company email or LinkedIn) to protect research quality.', link: ['/paid-surveys-for-professionals', 'For professionals'] },
  { k: ['privacy', 'data', 'share', 'sell', 'gdpr', 'delete', 'safe'], a: 'Your personal details are never sold or shared. Clients only see anonymised answers, and you can request access or deletion anytime.', link: ['/privacy', 'Privacy policy'] },
  { k: ['password', 'login', 'log in', 'locked', 'verify', 'otp', 'verification', 'account'], a: 'For login or verification issues, use “Forgot password?” on the login page. Never share your OTP with anyone — our team will never ask for it.', link: ['/login', 'Go to login'], human: true },
  { k: ['vpn', 'proxy', 'tor'], a: 'VPNs, proxies and TOR are blocked by our location and network checks. Please connect from your real location.' },
  { k: ['age', 'birth', 'minor', 'old'], a: 'We confirm eligibility using the date of birth you pick in the sign-up calendar. It’s kept private and never shared.' },
  { k: ['fee', 'pay to join', 'cost', 'charge', 'free'], a: 'MyFrequentRewards is 100% free. We never ask for a joining, membership or claim fee.' },
  { k: ['human', 'agent', 'person', 'call', 'talk', 'support'], a: 'Of course — connect with a real person below. 🙌', human: true },
];

const TOPICS = [
  { q: 'How do I join?', t: 'Joining', d: 'Free · 2 minutes', icon: 'user', c: '#FF8A00' },
  { q: 'What are the payout options?', t: 'Payouts', d: 'UPI · PayPal · more', icon: 'wallet', c: '#14C9B5' },
  { q: 'How much can I earn per survey?', t: 'Rewards', d: 'Per-survey points', icon: 'coins', c: '#FFC233' },
  { q: 'Why was I screened out?', t: 'Surveys', d: 'Screeners & quotas', icon: 'clipboard', c: '#2F6BFF' },
  { q: 'Is my data safe?', t: 'Privacy', d: 'Never sold or shared', icon: 'shield', c: '#8B5CF6' },
  { q: 'I want to talk to a person', t: 'Real person', d: 'WhatsApp · email', icon: 'headset', c: '#E8457A' },
];
const POPULAR = ['Is it really free?', 'When do I get paid?', 'Can professionals join?', 'Is UPI available?', 'I forgot my password', 'Do I need an app?'];
const GREETINGS = ['How can we help today?', 'Got a question about payouts?', 'Curious how surveys work?', 'Ready to start earning?'];

function answer(q) {
  const t = q.toLowerCase();
  const hit = INTENTS.find((i) => i.k.some((k) => t.includes(k)));
  if (hit) return hit;
  if (t.includes('app')) return { a: 'No app download is needed — MyFrequentRewards works in any mobile or desktop browser, and invitations arrive by dashboard, SMS, WhatsApp or email.' };
  const words = t.split(/\W+/).filter((w) => w.length > 3);
  let best = null;
  let score = 0;
  ALL_FAQS.forEach((f) => {
    const s = words.filter((w) => (f.q + ' ' + f.a).toLowerCase().includes(w)).length;
    if (s > score) { score = s; best = f; }
  });
  if (best && score >= 1) return { a: best.a };
  return { a: 'Good question! Let me connect you with our support team so they can help directly.', human: true };
}

function loadTawk() {
  if (!TAWK_P || !TAWK_W || window.Tawk_API) {
    if (window.Tawk_API && window.Tawk_API.maximize) window.Tawk_API.maximize();
    return Boolean(TAWK_P && TAWK_W);
  }
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.onLoad = () => window.Tawk_API.maximize();
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://embed.tawk.to/${TAWK_P}/${TAWK_W}`;
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');
  document.body.appendChild(s);
  return true;
}

const timeNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function Typewriter({ lines }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  useEffect(() => {
    const full = lines[i];
    if (n < full.length) {
      const t = setTimeout(() => setN(n + 1), 38);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setI((i + 1) % lines.length); setN(0); }, 2600);
    return () => clearTimeout(t);
  }, [i, n, lines]);
  return <span className="hc-type">{lines[i].slice(0, n)}<i aria-hidden="true" /></span>;
}

export default function LiveChat({ open, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sent, setSent] = useState(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const started = msgs.length > 0;

  const [sound, setSoundState] = useState(true);
  useEffect(() => setSoundState(soundOn()), []);
  useEffect(() => {
    if (open) {
      pop(); // pop every time the chat opens
      setTimeout(() => inputRef.current && inputRef.current.focus({ preventScroll: true }), 300);
    }
  }, [open]);
  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundState(next);
    if (next) pop({ volume: 0.15 });
  };
  useEffect(() => {
    // Keep the welcome screen at the top; follow the conversation once it starts.
    if (bodyRef.current && (msgs.length || typing)) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && open && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const ask = (text) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: 'me', text: q, at: timeNow() }]);
    setInput('');
    setSent((s) => s + 1);
    setTyping(true);
    const res = answer(q);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: res.a, link: res.link, human: res.human, at: timeNow() }]);
      pop({ volume: 0.1, pitch: 1.3 }); // gentle pop for each reply
    }, 750 + Math.min(q.length * 12, 900));
  };
  const rate = (idx, v) => setMsgs((m) => m.map((x, i) => (i === idx ? { ...x, rated: v } : x)));
  const tab = open ? 0 : -1;

  return (
    <div className={`hc ${open ? 'is-open' : ''}`} role="dialog" aria-modal="false" aria-label="Live Help chat" aria-hidden={!open}>
      <div className="hc-head">
        <span className="hc-aurora a1" aria-hidden="true" />
        <span className="hc-aurora a2" aria-hidden="true" />
        <div className="hc-head-row">
          <div className="hc-avatar" aria-hidden="true">
            <span className="hc-avatar-ring" />
            <img src={BRAND.monogram} alt="" width="40" height="40" />
            <i className="hc-online" />
          </div>
          <div className="hc-title">
            <strong>Live Help <span>24/7</span></strong>
            <small><i className="hc-dot" /> Online now · replies in seconds</small>
          </div>
          <button type="button" className={`hc-snd ${sound ? '' : 'off'}`} onClick={toggleSound} aria-pressed={!sound} aria-label={sound ? 'Mute chat sounds' : 'Turn chat sounds on'} title={sound ? 'Sound on' : 'Sound off'} tabIndex={tab}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              {sound ? <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></> : <path d="m16 9 5 6m0-6-5 6" />}
            </svg>
          </button>
          <button type="button" className="hc-x" onClick={onClose} aria-label="Close chat" tabIndex={tab}><Icon name="close" size={18} /></button>
        </div>
        <div className="hc-wave" aria-hidden="true">
          <svg viewBox="0 0 400 24" preserveAspectRatio="none"><path d="M0 12 C 60 0, 100 24, 160 12 S 260 0, 320 12 S 380 24, 400 12 V24 H0Z" /></svg>
        </div>
      </div>

      <div className="hc-body" ref={bodyRef} aria-live="polite">
        {!started ? (
          <div className="hc-welcome">
            <p className="hc-hi"><span className="hc-wave-hand" aria-hidden="true">👋</span> Hi there!</p>
            <h3><Typewriter lines={GREETINGS} /></h3>
            <p className="hc-sub">Pick a topic or type below — answers are instant, any time of day.</p>
            <div className="hc-topics">
              {TOPICS.map((t, i) => (
                <button type="button" key={t.t} className="hc-topic" style={{ '--c': t.c, '--i': i }} onClick={() => ask(t.q)} tabIndex={tab}>
                  <span className="hc-topic-ico"><Icon name={t.icon} size={18} /></span>
                  <b>{t.t}</b>
                  <small>{t.d}</small>
                </button>
              ))}
            </div>
            <a className="hc-wa-card" href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={tab}>
              <span className="hc-wa-ico"><Icon name="whatsapp" size={20} /></span>
              <span><b>Prefer WhatsApp?</b><small>Chat with our support team</small></span>
              <Icon name="arrow" size={16} />
            </a>
          </div>
        ) : null}

        {msgs.map((m, i) => (
          <div key={i} className={`hc-msg ${m.from}`}>
            {m.from === 'bot' ? <img className="hc-msg-av" src={BRAND.monogram} alt="" width="28" height="28" /> : null}
            <div className="hc-bubble">
              <p>{m.text}</p>
              {m.link ? (
                <Link to={m.link[0]} className="hc-link" onClick={onClose} tabIndex={tab}>{m.link[1]} <Icon name="arrow" size={14} /></Link>
              ) : null}
              {m.human ? (
                <div className="hc-human">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={tab} className="wa"><Icon name="whatsapp" size={16} /> WhatsApp</a>
                  <a href={`mailto:${CONTACT.email}`} tabIndex={tab}><Icon name="mail" size={16} /> Email</a>
                  {TAWK_P ? <button type="button" onClick={loadTawk} tabIndex={tab}><Icon name="chat" size={16} /> Live agent</button> : null}
                </div>
              ) : null}
              <span className="hc-meta">
                {m.at}
                {m.from === 'bot' ? (
                  m.rated ? <em className="hc-thanks">Thanks for the feedback!</em> : (
                    <span className="hc-rate">
                      Helpful?
                      <button type="button" onClick={() => rate(i, 'up')} aria-label="Yes, helpful" tabIndex={tab}>👍</button>
                      <button type="button" onClick={() => rate(i, 'down')} aria-label="Not helpful" tabIndex={tab}>👎</button>
                    </span>
                  )
                ) : <span className="hc-tick" aria-label="Sent">✓✓</span>}
              </span>
            </div>
          </div>
        ))}
        {typing ? (
          <div className="hc-msg bot">
            <img className="hc-msg-av" src={BRAND.monogram} alt="" width="28" height="28" />
            <div className="hc-bubble hc-typing" aria-label="Support is typing"><span /><span /><span /></div>
          </div>
        ) : null}
      </div>

      <div className="hc-popular" aria-label="Popular questions">
        <div className="hc-popular-track">
          {[...POPULAR, ...POPULAR].map((q, i) => (
            <button type="button" key={q + i} onClick={() => ask(q)} tabIndex={i < POPULAR.length ? tab : -1} aria-hidden={i >= POPULAR.length}>{q}</button>
          ))}
        </div>
      </div>

      <form className="hc-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
        <label htmlFor="chat-q" className="sr-only">Type your question</label>
        <span className="hc-input-ico" aria-hidden="true"><Icon name="sparkle" size={18} /></span>
        <input id="chat-q" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about surveys or rewards…" maxLength={300} autoComplete="off" tabIndex={tab} />
        <button type="submit" className={`hc-send ${input.trim() ? 'ready' : ''} ${sent ? 'flew' : ''}`} aria-label="Send" tabIndex={tab} key={sent}><Icon name="send" size={18} /></button>
      </form>
      <p className="hc-foot"><Icon name="lock" size={12} /> Secure · We’ll never ask for your password or OTP</p>
    </div>
  );
}
