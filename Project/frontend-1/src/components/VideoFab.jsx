// Floating "Watch" button on every page (bottom left). It opens that page's video (src/data/pageVideos.js)
// inside that page's own scene: every main page has its own template, cover and button colours
// (the list of templates is at the top of pageVideos.js).
// The YouTube player (youtube-nocookie.com) only loads after the visitor presses play, so the button costs
// no third-party requests until it is used. Loaded lazily after the page is interactive (see App.jsx).
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, Link } from '../router.jsx';
import Icon from './Icon.jsx';
import { CHANNEL_URL, parseYouTube, videoFor } from '../data/pageVideos.js';
import { sfx } from '../utils/helpers.js';
import { openRateExperience } from './RateExperience.jsx';

function Cover({ v }) {
  return (
    <span className="vx-cover" aria-hidden="true">
      <span className="vx-cover-art" />
      <span className="vx-cover-tx">
        <small>{v.eyebrow}</small>
        <b>{v.title}</b>
        <em>{v.em}</em>
      </span>
      <span className="vx-cover-brand">MyHealthOpinions</span>
    </span>
  );
}

function Player({ v, label }) {
  const [on, setOn] = useState(false);
  const yt = parseYouTube(v.url);
  if (!yt) {
    return (
      <div className="vx-player vx-soon">
        <Icon name="film" size={34} />
        <b>Video coming soon</b>
      </div>
    );
  }
  return (
    <div className="vx-player">
      {on ? (
        <iframe
          title={label}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt.id)}?autoplay=1&rel=0&playsinline=1${yt.start ? `&start=${yt.start}` : ''}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="vx-poster" onClick={() => setOn(true)} aria-label={`Play video: ${label}`}>
          <img src={`https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <Cover v={v} />
          <span className="vx-play" aria-hidden="true"><i /><i /><Icon name="play" size={30} fill="currentColor" stroke={0} /></span>
        </button>
      )}
    </div>
  );
}

function Copy({ v, onClose }) {
  const { cta } = v;
  return (
    <div className="vx-copy">
      <span className="vx-eyebrow"><Icon name="youtube" size={14} />{v.eyebrow}</span>
      <h2 id="vx-title">{v.title} <em>{v.em}</em></h2>
      <p className="vx-lede">{v.lede}</p>
      <ol className="vx-points">
        {v.points.map((p, i) => (
          <li key={p} style={{ '--i': i }}><span>{String(i + 1).padStart(2, '0')}</span>{p}</li>
        ))}
      </ol>
      <div className="vx-ctas">
        {cta?.action === 'rate' ? (
          <button type="button" className="vx-btn vx-btn-main" onClick={() => { onClose(); openRateExperience(); }}>{cta.label}<Icon name="star" size={16} /></button>
        ) : cta?.to?.startsWith('http') ? null : cta?.to ? (
          <Link to={cta.to} className="vx-btn vx-btn-main" onClick={onClose}>{cta.label}<Icon name="arrow" size={16} /></Link>
        ) : null}
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="vx-btn vx-btn-yt"><Icon name="youtube" size={18} />Subscribe</a>
      </div>
    </div>
  );
}

/* ---------- Scene decorations (one per template) ---------- */
const DECOR = {
  lightbox: () => (
    <>
      <svg className="vx-ribs" viewBox="0 0 400 300" aria-hidden="true">
        <path d="M200 20v260" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <path d={`M196 ${60 + i * 34} C ${140 - i * 4} ${50 + i * 34}, ${90 - i * 2} ${80 + i * 36}, ${110 - i * 4} ${110 + i * 36}`} />
            <path d={`M204 ${60 + i * 34} C ${260 + i * 4} ${50 + i * 34}, ${310 + i * 2} ${80 + i * 36}, ${290 + i * 4} ${110 + i * 36}`} />
          </g>
        ))}
      </svg>
      <span className="vx-clips" aria-hidden="true"><i /><i /></span>
    </>
  ),
  premiere: () => (
    <>
      <span className="vx-beams" aria-hidden="true"><i /><i /></span>
      <span className="vx-bulbs" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="vx-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={18 + (i % 3) * 6} fill="currentColor" stroke={0} style={{ '--i': i }} />)}</span>
    </>
  ),
  handheld: () => (
    <>
      <span className="vx-brackets" aria-hidden="true"><i /><i /><i /><i /><b /></span>
      <span className="vx-orbit" aria-hidden="true">
        {['youtube', 'instagram', 'linkedin', 'facebook', 'whatsapp', 'qr'].map((n, i) => <i key={n} style={{ '--i': i }}><Icon name={n} size={18} /></i>)}
      </span>
    </>
  ),
  monitor: () => (
    <>
      <svg className="vx-ecg" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 50h300l20-36 22 62 18-46 14 20h326l20-36 22 62 18-46 14 20h406" pathLength="100" />
      </svg>
      <span className="vx-cross" aria-hidden="true" />
    </>
  ),
  arcade: () => (
    <>
      <span className="vx-pixels" />
      <span className="vx-coins">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className={`c${i}`}>★</i>)}</span>
      <span className="vx-hiscore"><small>HI-SCORE</small><b>055 COUNTRIES</b></span>
    </>
  ),
  surgical: () => (
    <>
      <span className="vx-lamp"><i /><i /><i /><i /><i /><i /><i /></span>
      <span className="vx-cone" />
      <span className="vx-tools">{['stethoscope', 'scalpel', 'pill', 'microscope', 'heart'].map((n, i) => <i key={n} className={`t${i}`}><Icon name={n} size={18} /></i>)}</span>
    </>
  ),
  hearth: () => (
    <>
      <span className="vx-lights">{Array.from({ length: 14 }, (_, i) => <i key={i} className={`l${i % 4}`} />)}</span>
      <span className="vx-window"><i /><i /></span>
      <span className="vx-hearts">{[0, 1, 2, 3].map((i) => <i key={i} className={`h${i}`}><Icon name="heart" size={16} fill="currentColor" stroke={0} /></i>)}</span>
    </>
  ),
  bloom: () => (
    <>
      <span className="vx-blobs"><i /><i /><i /></span>
      <span className="vx-caps">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={`p${i}`} />)}</span>
    </>
  ),
  blueprint: () => (
    <>
      <span className="vx-dim h"><b>16</b></span>
      <span className="vx-dim v"><b>9</b></span>
      <span className="vx-steps">{['01', '02', '03', '04'].map((n, i) => <i key={n} className={`s${i}`}>{n}</i>)}</span>
      <span className="vx-compass" />
    </>
  ),
  vault: () => (
    <>
      <span className="vx-door"><i /><b /></span>
      <span className="vx-rain">{Array.from({ length: 10 }, (_, i) => <i key={i} className={`r${i}`} />)}</span>
    </>
  ),
  shield: () => (
    <>
      <span className="vx-bin">{Array.from({ length: 12 }, (_, i) => <i key={i} className={`b${i % 6}`}>{(i * 7919).toString(2).slice(-8)}</i>)}</span>
      <span className="vx-shieldmark"><Icon name="shield" size={120} /><i /></span>
      <span className="vx-lockchip"><Icon name="lock" size={14} />Identity verified</span>
    </>
  ),
  magazine: () => (
    <>
      <span className="vx-mast">THE JOURNAL</span>
      <span className="vx-issue">Issue Nº 01 · MyHealthOpinions</span>
      <span className="vx-cols"><i /><i /><i /></span>
    </>
  ),
  quiz: () => (
    <>
      <span className="vx-qs">{['?', '!', '?', '?', '!', '?'].map((q, i) => <i key={i} className={`q${i}`}>{q}</i>)}</span>
      <span className="vx-typing"><i /><i /><i /></span>
    </>
  ),
  postcard: () => (
    <>
      <span className="vx-airmail" />
      <span className="vx-stamp"><Icon name="heart" size={26} fill="currentColor" stroke={0} /><small>MHO · 2017</small></span>
      <span className="vx-postmark"><b>NEW DELHI</b><small>SUPPORT · 24/7</small></span>
      <span className="vx-plane"><Icon name="send" size={22} /></span>
    </>
  ),
  launch: () => (
    <>
      <span className="vx-stars2" />
      <span className="vx-rocket"><Icon name="send" size={34} /><i /></span>
      <span className="vx-count">{['3', '2', '1', 'GO'].map((c, i) => <i key={c} className={`k${i}`}>{c}</i>)}</span>
    </>
  ),
  dossier: () => (
    <>
      <span className="vx-folder"><i /></span>
      <span className="vx-stampbox">REVIEWED</span>
      <span className="vx-lines"><i /><i /><i /><i /><i /></span>
    </>
  ),
};

export default function VideoFab() {
  const { path } = useRouter();
  const v = videoFor(path);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const label = `${v.title} ${v.em}`.trim();

  const close = useCallback(() => setOpen(false), []);

  // "Show & watch" bubble: pops up beside the button a few seconds after each page loads, once per page per
  // visit, and tucks itself away after a while (or when closed / when the video is opened).
  const [tip, setTip] = useState(false);
  useEffect(() => {
    setTip(false);
    let seen = false;
    try { seen = sessionStorage.getItem(`mho-vtip-${path}`) === '1'; } catch { /* storage blocked */ }
    if (seen) return undefined;
    const t1 = setTimeout(() => setTip(true), 3500);
    const t2 = setTimeout(() => setTip(false), 15500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [path]);
  const hideTip = useCallback(() => {
    setTip(false);
    try { sessionStorage.setItem(`mho-vtip-${path}`, '1'); } catch { /* storage blocked */ }
  }, [path]);
  useEffect(() => { if (open) { hideTip(); sfx('playVideoOpen'); } }, [open, hideTip]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('mho-open-video', onOpen);
    return () => window.removeEventListener('mho-open-video', onOpen);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    document.documentElement.classList.add('vx-lock');
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const box = document.querySelector('.vx-dialog');
        const f = box ? [...box.querySelectorAll('a[href], button, iframe')] : [];
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('vx-lock');
      document.removeEventListener('keydown', onKey);
      (prev && prev.focus ? prev : document.querySelector('.dock-video'))?.focus?.();
    };
  }, [open]);

  const Decor = DECOR[v.template] || DECOR.monitor;

  return (
    <>
      {/* The round video launcher sits in the help dock (LiveChat.jsx) and opens this window via openPageVideo(). */}
      <div className={`vtip vtip-${v.template} ${tip && !open ? 'is-in' : ''}`} role="status" aria-hidden={!tip || open}>
        <button type="button" className="vtip-body" onClick={() => setOpen(true)} tabIndex={tip && !open ? 0 : -1}>
          <span className="vtip-live"><i />Show &amp; watch</span>
          <b>{v.title} <em>{v.em}</em></b>
          <small><Icon name="play" size={11} fill="currentColor" stroke={0} />Watch this page&rsquo;s video</small>
        </button>
        <button type="button" className="vtip-x" onClick={hideTip} aria-label="Hide video tip" tabIndex={tip && !open ? 0 : -1}><Icon name="x" size={12} /></button>
      </div>
      {open &&
        createPortal(
          <div className={`vx vx-${v.template}`} role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
            <div className="vx-dialog" role="dialog" aria-modal="true" aria-labelledby="vx-title">
              <div className="vx-scene" aria-hidden="true"><Decor /></div>
              <button ref={closeRef} type="button" className="vx-close" onClick={close} aria-label="Close video"><Icon name="x" size={22} /></button>
              <div className="vx-grid">
                <Copy v={v} onClose={close} />
                <div className="vx-stage">
                  <div className="vx-frame">
                    <Player v={v} label={label} />
                    <span className="vx-caption"><small>{v.eyebrow}</small><b>{label}</b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
