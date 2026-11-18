// Floating "Watch" button on every page (bottom left). It opens that page's video (src/data/pageVideos.js)
// inside that page's own scene: an X-ray lightbox (About), a premiere stage (Ratings & Reviews), a handheld
// phone scanner (Scan & Connect) or a vitals monitor (every other page).
// The YouTube player (youtube-nocookie.com) only loads after the visitor presses play, so the button costs
// no third-party requests until it is used. Loaded lazily after the page is interactive (see App.jsx).
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, Link } from '../router.jsx';
import Icon from './Icon.jsx';
import { CHANNEL_URL, parseYouTube, videoFor } from '../data/pageVideos.js';
import { openRateExperience } from './RateExperience.jsx';

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
};

export default function VideoFab() {
  const { path } = useRouter();
  const v = videoFor(path);
  const [open, setOpen] = useState(false);
  const fabRef = useRef(null);
  const closeRef = useRef(null);
  const label = `${v.title} ${v.em}`.trim();

  const close = useCallback(() => setOpen(false), []);

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
      (prev && prev.focus ? prev : fabRef.current)?.focus?.();
    };
  }, [open]);

  const Decor = DECOR[v.template] || DECOR.monitor;

  return (
    <>
      <button ref={fabRef} type="button" className={`vfab vfab-${v.template}`} aria-haspopup="dialog" aria-label="Watch this page's video" onClick={() => setOpen(true)}>
        <span className="vfab-halo" aria-hidden="true" />
        <span className="vfab-ring" aria-hidden="true" />
        <span className="vfab-core" aria-hidden="true">
          <svg viewBox="0 0 28 20" width="28" height="20"><rect width="28" height="20" rx="5.5" fill="#fff" /><path d="M11 5.6v8.8l7.6-4.4z" fill="#e8344e" /></svg>
        </span>
        <span className="vfab-label" aria-hidden="true"><b>Watch</b><small>this page's video</small></span>
      </button>
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
