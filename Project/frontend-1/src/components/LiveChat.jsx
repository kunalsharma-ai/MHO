// 24/7 help assistant + WhatsApp shortcut (bottom-right stack).
//
// Answers come from the website's own content (FAQ page, audience pages, How It Works, every blog FAQ,
// legal pages, quality checks, plus hand-written intents) via src/components/chat/engine.js, which is
// loaded only when the chat opens. Every answer links to the page it comes from ("Read more").
//
// When the assistant has no confident answer it does not guess: it asks for the visitor's full name,
// email, phone (optional) and country, then posts the question to API.enquiry (source: "live-chat") so a
// person can reply. In dev / preview builds the request is simulated (PREVIEW_FORMS).
import { useEffect, useRef, useState } from 'react';
import { Link } from '../router.jsx';
import { SITE, API, whatsappLink } from '../config/site.js';
import Icon from './Icon.jsx';
import { sfx, store, session, validateEmail, validateName, postJSON, track } from '../utils/helpers.js';
import { visit } from '../utils/dismissed.js';
import { ALL_COUNTRIES } from '../data/countries.js';
import { isSoundEnabled, setSoundEnabled, onSoundChange } from '../i18n/soundPrefs.js';

const QUICK = ['How much does each survey pay?', 'Is it free to join?', 'How do I get paid?', 'Is UPI available?', 'Which countries?', 'Why was I screened out?', 'Is my data safe?', 'Talk to a person'];
const TILES = [
  ['sparkle', 'Join free', 'How do I join?', '#2457f5'],
  ['coins', 'Survey rates', 'How much does each survey pay?', '#00b386'],
  ['wallet', 'Get paid', 'How do I get paid?', '#ff6a2c'],
  ['filter', 'Screen-outs', 'Why was I screened out?', '#ffb020'],
  ['stethoscope', 'Professionals', 'I am a doctor or nurse. How do I join?', '#0ea5e9'],
  ['lock', 'Privacy', 'Is my data safe?', '#8a4dff'],
];

const LEAD_PROMPT = {
  message: 'What would you like to ask our team?',
  name: 'What’s your full name?',
  email: 'Thanks! What’s your email address? We’ll reply there.',
  phone: 'Your contact number, with country code? (Optional — tap “Skip”.)',
  country: 'And which country are you in?',
};
const PLACEHOLDER = {
  message: 'Type your question…', name: 'Your full name', email: 'you@example.com', phone: '+91 98xxxxxx10 — or tap Skip', country: 'Start typing your country…',
};
const ORDER = ['message', 'name', 'email', 'phone', 'country', 'confirm'];
const next = (step) => ORDER[ORDER.indexOf(step) + 1];

const cNorm = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z ]/g, '').trim();
const C_ALIAS = { usa: 'us', us: 'us', america: 'us', uk: 'gb', england: 'gb', britain: 'gb', uae: 'ae', dubai: 'ae', ksa: 'sa', saudi: 'sa', korea: 'kr', russia: 'ru' };
function findCountry(input) {
  const q = cNorm(input);
  if (!q) return { list: [] };
  if (C_ALIAS[q]) return { hit: ALL_COUNTRIES.find((c) => c.code === C_ALIAS[q]) };
  const exact = ALL_COUNTRIES.find((c) => cNorm(c.name) === q);
  if (exact) return { hit: exact };
  const list = ALL_COUNTRIES.filter((c) => cNorm(c.name).startsWith(q)).concat(ALL_COUNTRIES.filter((c) => !cNorm(c.name).startsWith(q) && cNorm(c.name).includes(q)));
  if (list.length === 1) return { hit: list[0] };
  return { list: list.slice(0, 5) };
}

function ChatLogo({ size = 30 }) {
  return (
    <svg className="chat-logo" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="cl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ffe4e6" />
        </linearGradient>
      </defs>
      <path d="M8 8h32a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-9 8v-8H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="url(#cl-g)" />
      <path className="cl-ecg" d="M10 21h7l2.5-5 4 10 3-8 2 3H38" fill="none" stroke="#e8344e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
    </svg>
  );
}

/** Bot text → paragraphs and bullet lists ("• " lines). */
function Rich({ text }) {
  const blocks = [];
  text.split('\n').forEach((line) => {
    if (line.startsWith('• ')) {
      const last = blocks[blocks.length - 1];
      if (last?.ul) last.ul.push(line.slice(2));
      else blocks.push({ ul: [line.slice(2)] });
    } else if (line.trim()) blocks.push({ p: line });
  });
  return blocks.map((b, i) => (b.ul ? <ul key={i}>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul> : <p key={i}>{b.p}</p>));
}

export default function LiveChat({ quiet = false }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [sound, setSound] = useState(true);
  const [hello, setHello] = useState(false);
  const [lead, setLead] = useState(null); // { step, q, name, email, phone, country, sending }
  const [chips, setChips] = useState(null); // step-specific quick replies while collecting details
  const engine = useRef(null);
  const body = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    setSound(isSoundEnabled());
    return onSoundChange(setSound);
  }, []);

  useEffect(() => {
    // Friendly greeting bubble + soft pop on the visitor's first interaction (browsers block audio before it).
    if (visit.get('mho-greeted')) return;
    const greet = () => {
      visit.set('mho-greeted', true);
      sfx('playChatHello');
      setHello(true);
      setTimeout(() => setHello(false), 7000);
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener('pointerdown', greet);
      window.removeEventListener('keydown', greet);
    };
    window.addEventListener('pointerdown', greet, { once: true });
    window.addEventListener('keydown', greet, { once: true });
    return cleanup;
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, chips]);

  const loadEngine = () => {
    if (!engine.current) engine.current = import('./chat/engine.js');
    return engine.current;
  };

  const botSay = (item, delay = 650) => new Promise((resolve) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', ...item }]);
      if (sound) sfx('playChatMessage');
      resolve();
    }, delay);
  });

  const openChat = () => {
    setOpen(true);
    setHello(false);
    sfx('playChatOpen');
    loadEngine();
    if (!msgs.length) {
      botSay({ a: "Hi there! 👋 I'm the MyHealthOpinions help assistant — online 24/7. Ask me anything about joining, survey rates, rewards, payouts or privacy." }, 500);
    }
    setTimeout(() => input.current?.focus(), 350);
  };
  const openRef = useRef(openChat);
  openRef.current = openChat;
  useEffect(() => {
    const onAsk = () => openRef.current();
    window.addEventListener('mho-open-chat', onAsk);
    return () => window.removeEventListener('mho-open-chat', onAsk);
  }, []);

  /* ---------- details collection (for questions the assistant can't answer) ---------- */
  const startLead = async (q = '', intro) => {
    const first = q ? 'name' : 'message';
    setLead({ step: first, q, name: '', email: '', phone: '', country: '' });
    setChips(['Cancel']);
    if (intro) await botSay({ a: intro }, 600);
    await botSay({ a: LEAD_PROMPT[first], step: true }, 500);
  };

  const cancelLead = () => {
    setLead(null);
    setChips(null);
    botSay({ a: 'No problem — your details were not sent. Ask me anything else.' }, 400);
  };

  const sendLead = async (L) => {
    setLead({ ...L, sending: true });
    setChips(null);
    const res = await postJSON(API.enquiry, {
      name: L.name, email: L.email, phone: L.phone, country: L.country,
      topic: 'Live chat question', message: L.q.slice(0, 2000), source: 'live-chat',
      page: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '',
    });
    if (res.ok) {
      track('chat_lead', { country: L.country });
      setLead(null);
      const first = L.name.split(' ')[0];
      await botSay({ a: `✅ Sent! Thanks ${first} — a member of our team will reply to ${L.email}, usually the same working day.${res.preview ? ' (Preview build: nothing was actually sent.)' : ''}\nAnything else I can help with?`, done: true }, 500);
    } else {
      setLead({ ...L, sending: false, step: 'confirm' });
      await botSay({ a: 'Sorry — that didn’t go through. Please try again, or reach us directly on WhatsApp or email.', human: true }, 400);
    }
  };

  const handleLead = async (raw) => {
    const v = raw.trim();
    if (/^(cancel|stop|exit|quit)$/i.test(v)) { cancelLead(); return; }
    const L = { ...lead };
    let err = '';
    if (L.step === 'message') {
      if (v.length < 5) err = 'Please add a little more detail so the team can help.';
      else L.q = v;
    } else if (L.step === 'name') {
      err = validateName(v, 'full name');
      if (!err) L.name = v.replace(/\s+/g, ' ');
    } else if (L.step === 'email') {
      err = validateEmail(v);
      if (!err) L.email = v.trim();
    } else if (L.step === 'phone') {
      if (/^skip$/i.test(v) || /^(no|none|na|n\/a)$/i.test(v)) L.phone = '';
      else {
        const digits = v.replace(/[^\d]/g, '');
        if (!/^[+\d][\d\s()-]*$/.test(v) || digits.length < 7 || digits.length > 15) err = 'That number doesn’t look right — use digits with your country code (7–15 digits), or tap “Skip”.';
        else L.phone = v;
      }
    } else if (L.step === 'country') {
      const f = findCountry(v);
      if (f.hit) L.country = f.hit.name;
      else if (f.list.length) {
        setChips([...f.list.map((c) => c.name), 'Cancel']);
        await botSay({ a: 'Did you mean one of these?' }, 400);
        return;
      } else err = 'I couldn’t find that country — please type its full name.';
    }
    if (err) { await botSay({ a: err, warn: true }, 400); return; }
    L.step = next(L.step);
    setLead(L);
    if (L.step === 'confirm') {
      setChips(null);
      await botSay({ a: 'Please check your details:', card: { ...L } }, 500);
      return;
    }
    setChips(L.step === 'phone' ? ['Skip', 'Cancel'] : ['Cancel']);
    await botSay({ a: L.step === 'email' ? `Thanks, ${L.name.split(' ')[0]}! What’s your email address? We’ll reply there.` : LEAD_PROMPT[L.step], step: true }, 500);
  };

  /* ---------- main send ---------- */
  const send = async (raw) => {
    const q = (raw ?? text).trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { from: 'me', a: q }]);
    sfx('playChatSend');
    setText('');
    if (lead && lead.step !== 'confirm') { handleLead(q); return; }
    if (lead && lead.step === 'confirm') setLead(null);
    const mod = await loadEngine();
    const r = mod.respond(q);
    track('chat_question', { matched: r.unknown ? 'unknown' : r.id || 'answer' });
    const delay = 600 + Math.min(q.length * 10, 800);
    if (r.unknown) {
      await botSay({ a: 'Good question! I don’t have a confirmed answer for that on our website, and I’d rather not guess. A member of our team can answer you personally — I just need a few details.', related: r.related }, delay);
      startLead(q);
      return;
    }
    await botSay({ ...r, leadQ: r.lead ? q : '' }, delay);
  };

  const toggleSound = () => setSoundEnabled(!isSoundEnabled());

  const step = lead?.step;
  const quick = chips || QUICK;

  return (
    <div className={`help-stack dock ${open ? 'chat-open' : ''}`} data-mode-skip="">
      {/* The help stack (styles/dock.css): WhatsApp on top, rate-us in the middle, live chat at the bottom with
          its "Live help 24/7" pill. The page's video has its own round button on the left (VideoFab.jsx). */}
      <a className="fab-wa dock-sat ds-1" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp ${SITE.whatsappDisplay}`}>
        <span className="dock-halo" aria-hidden="true" />
        <span className="dock-core fx-ring" data-loop=""><Icon name="whatsapp" size={26} /></span>
        <span className="fx-wa" aria-hidden="true" data-loop=""><i /><i /><i /></span>
        <span className="fab-tip">WhatsApp us</span>
      </a>
      {!quiet && (
        <button type="button" className="dock-sat dock-rate ds-2" onClick={() => window.dispatchEvent(new Event('mho-open-rate'))} aria-haspopup="dialog" aria-label="Rate your experience">
          <span className="dock-halo" aria-hidden="true" />
          <span className="dock-core">
            <span className="dock-rate-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}</span>
            <span className="fx-flip" data-loop=""><Icon name="star" size={24} fill="currentColor" stroke={0} /></span>
          </span>
          <span className="fx-burst" aria-hidden="true" data-loop="">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} style={{ '--i': i }} />)}</span>
          <span className="fab-tip">Rate your experience</span>
        </button>
      )}

      {hello && !open && (
        <button className="hello-bubble" onClick={openChat}>
          <b>Need a hand?</b> We're online 24/7 — ask me anything. <Icon name="x" size={12} />
        </button>
      )}

      <button className="fab-chat" onClick={open ? () => { setOpen(false); sfx('playChatClose'); } : openChat} onPointerEnter={loadEngine} aria-expanded={open} aria-controls="mho-chat" aria-label={open ? 'Close live help' : 'Open live help, available 24/7'}>
        <span className="dock-halo" aria-hidden="true" />
        <span className="fab-orbit" aria-hidden="true"><i /><i /><i /></span>
        <span className="fab-face fx-bob" data-loop="">{open ? <Icon name="x" size={24} /> : <ChatLogo size={34} />}</span>
        {!open && <span className="fx-typing" aria-hidden="true" data-loop=""><i /><i /><i /></span>}
        {!open && !msgs.length && <span className="dock-badge" aria-hidden="true">1</span>}
        <span className="fab-label"><i className="dot" />Live help 24/7</span>
      </button>

      <section id="mho-chat" className={`chat-win ${open ? 'is-open' : ''}`} aria-label="Live help chat" aria-hidden={!open} inert={!open}>
        <header className="chat-head ch4">
          <div className="chat-avatar"><ChatLogo size={34} /><span className="chat-online" /></div>
          <div className="chat-title">
            <strong>Live Help <em>24/7</em></strong>
            <span><i className="dot" /> Online now · replies in seconds</span>
          </div>
          <button onClick={toggleSound} aria-label={sound ? 'Mute chat sounds' : 'Unmute chat sounds'}><Icon name={sound ? 'volume' : 'mute'} size={18} /></button>
          <button onClick={() => setOpen(false)} aria-label="Close chat"><Icon name="x" size={18} /></button>
          <svg className="ch4-wave" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22 C 60 6, 120 40, 200 22 S 340 6, 400 22 V40 H0z" /></svg>
        </header>
        <div className="chat-body" ref={body} aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={`msg msg-${m.from} ${m.warn ? 'msg-warn' : ''} ${m.step ? 'msg-step' : ''} ${m.done ? 'msg-done' : ''}`}>
              {m.from === 'bot' ? <div className="msg-bubble"><Rich text={m.a} /></div> : <p>{m.a}</p>}
              {m.card && (
                <div className="lead-card">
                  <dl>
                    <div><dt>Question</dt><dd>{m.card.q}</dd></div>
                    <div><dt>Full name</dt><dd>{m.card.name}</dd></div>
                    <div><dt>Email</dt><dd>{m.card.email}</dd></div>
                    <div><dt>Phone</dt><dd>{m.card.phone || '—'}</dd></div>
                    <div><dt>Country</dt><dd>{m.card.country}</dd></div>
                  </dl>
                  {lead?.step === 'confirm' && i === msgs.length - 1 && (
                    <div className="lead-actions">
                      <button type="button" className="lc-send" disabled={lead.sending} onClick={() => sendLead(lead)}>{lead.sending ? 'Sending…' : 'Send to our team'} <Icon name="send" size={14} /></button>
                      <button type="button" className="lc-ghost" disabled={lead.sending} onClick={() => startLead(lead.q)}>Edit details</button>
                      <button type="button" className="lc-ghost" disabled={lead.sending} onClick={cancelLead}>Cancel</button>
                    </div>
                  )}
                  <small><Icon name="lock" size={11} /> Used only to answer your question. <Link to="/privacy" onClick={() => setOpen(false)}>Privacy Policy</Link></small>
                </div>
              )}
              {m.links?.length > 0 && (
                <div className="msg-src">
                  <span><Icon name="book" size={12} /> Read more on our website</span>
                  <div className="msg-links">
                    {m.links.map(([to, label]) => <Link key={to + label} to={to} onClick={() => setOpen(false)}>{label} <Icon name="arrow" size={12} /></Link>)}
                  </div>
                </div>
              )}
              {m.human && (
                <div className="msg-links">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={13} /> WhatsApp</a>
                  <a href={`mailto:${SITE.email}`}><Icon name="mail" size={13} /> Email support</a>
                </div>
              )}
              {m.leadQ !== undefined && m.lead && !lead && (
                <button type="button" className="msg-leadbtn" onClick={() => startLead(m.leadQ && !/^(talk|human|agent|contact|call)/i.test(m.leadQ) ? m.leadQ : '')}><Icon name="user" size={13} /> Leave my details for the team</button>
              )}
              {m.related?.length > 0 && (
                <div className="msg-related">
                  <span>People also ask</span>
                  {m.related.map((q) => <button key={q} type="button" onClick={() => send(q)}>{q}</button>)}
                </div>
              )}
            </div>
          ))}
          {msgs.length === 1 && !typing && (
            <div className="ch4-welcome">
              <h3>Curious how <span>surveys work?</span></h3>
              <p>Pick a topic or type below — answers are instant, any time of day.</p>
              <div className="ch4-tiles">
                {TILES.map(([ic, t, q, c]) => (
                  <button key={t} type="button" onClick={() => send(q)} style={{ '--c': c }}><span><Icon name={ic} size={18} /></span>{t}</button>
                ))}
              </div>
            </div>
          )}
          {typing && <div className="msg msg-bot typing" aria-label="Assistant is typing"><i /><i /><i /></div>}
        </div>
        <div className={`chat-quick ${chips ? 'is-lead' : ''}`}>
          {quick.map((q) => <button key={q} onClick={() => (q === 'Cancel' && lead ? (setMsgs((m) => [...m, { from: 'me', a: 'Cancel' }]), cancelLead()) : send(q))}>{q}</button>)}
        </div>
        <form className="chat-form ch4-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <span className="ch4-spark" aria-hidden="true"><Icon name={step && step !== 'confirm' ? 'user' : 'sparkle'} size={16} /></span>
          <input
            ref={input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={step && PLACEHOLDER[step] ? PLACEHOLDER[step] : 'Ask anything about surveys or rewards…'}
            aria-label={step && PLACEHOLDER[step] ? PLACEHOLDER[step] : 'Your message'}
            inputMode={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
            autoComplete={step === 'name' ? 'name' : step === 'email' ? 'email' : step === 'phone' ? 'tel' : step === 'country' ? 'country-name' : 'off'}
            maxLength={step === 'message' ? 500 : 300}
          />
          <button type="submit" aria-label="Send" disabled={!text.trim()}><Icon name="send" size={18} /></button>
        </form>
        <p className="chat-foot"><Icon name="lock" size={11} /> Secure · we’ll never ask for your password or OTP</p>
      </section>
    </div>
  );
}
