// "Watch the full video" band at the bottom of every page (just above the footer).
// It presents that page's video (src/data/pageVideos.js) in the page's own template colours, and asks
// visitors to watch to the end, then like, subscribe (with the bell), and share it on YouTube.
// The player itself is the page's video window (VideoFab), so no YouTube request is made until someone presses play.
import { useState } from 'react';
import { useRouter } from '../router.jsx';
import Icon from './Icon.jsx';
import { CHANNEL_URL, parseYouTube, videoFor, openPageVideo } from '../data/pageVideos.js';

const HIDE = ['/login', '/create-password', '/reset-password', '/complete-profile'];

export default function PageVideoBand() {
  const { path } = useRouter();
  const [copied, setCopied] = useState(false);
  if (HIDE.includes(path) || path.startsWith('/auth')) return null;
  const v = videoFor(path);
  const yt = parseYouTube(v.url);
  const watchUrl = yt ? `https://www.youtube.com/watch?v=${yt.id}` : CHANNEL_URL;
  const subUrl = `${CHANNEL_URL}?sub_confirmation=1`;

  const share = async () => {
    const data = { title: `${v.title} ${v.em} | MyHealthOpinions`, url: watchUrl };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(watchUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* share sheet closed or clipboard blocked */
    }
  };

  return (
    <section className={`vband vband-${v.template}`} aria-labelledby="vband-title">
      <span className="vb-aurora" aria-hidden="true"><i /><i /><i /></span>
      <div className="container vb-grid">
        <button type="button" className="vb-screen" onClick={openPageVideo} aria-label={`Play the video: ${v.title} ${v.em}`}>
          {yt && <img src={`https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" width="480" height="360" />}
          <span className="vb-shade" aria-hidden="true" />
          <span className="vb-cap" aria-hidden="true"><small>{v.eyebrow}</small><b>{v.title}</b><em>{v.em}</em></span>
          <span className="vb-brand" aria-hidden="true"><Icon name="youtube" size={14} />MyHealthOpinions</span>
          <span className="vb-play" aria-hidden="true"><i /><i /><Icon name="play" size={34} fill="currentColor" stroke={0} /></span>
          <span className="vb-bar" aria-hidden="true"><i /><b /></span>
          <span className="vb-reacts" aria-hidden="true">
            {['heart', 'thumb', 'star', 'heart', 'thumb'].map((n, i) => <i key={i} style={{ '--k': i }}><Icon name={n} size={14} fill={n === 'thumb' ? 'none' : 'currentColor'} stroke={n === 'thumb' ? 2 : 0} /></i>)}
          </span>
        </button>

        <div className="vb-copy">
          <span className="vb-eyebrow"><span className="vb-live" />Watch the full video</span>
          <h2 id="vband-title">{v.title} <em>{v.em}</em></h2>
          <p className="vb-lede">{v.lede} Watch it right to the end, then tell us what you think.</p>
          <ul className="vb-points">
            {v.points.map((p, i) => <li key={p} style={{ '--i': i }}><Icon name="check" size={14} />{p}</li>)}
          </ul>
          <div className="vb-main">
            <button type="button" className="vb-watch" onClick={openPageVideo}><span><Icon name="play" size={16} fill="currentColor" stroke={0} /></span>Watch now</button>
            <a className="vb-sub" href={subUrl} target="_blank" rel="noopener noreferrer"><Icon name="youtube" size={18} />Subscribe<span className="vb-bell"><Icon name="bell" size={14} /></span></a>
          </div>
          <div className="vb-acts" role="group" aria-label="Support us on YouTube">
            <a className="vb-act vb-like" href={watchUrl} target="_blank" rel="noopener noreferrer"><Icon name="thumb" size={16} /><b>Like</b><small>on YouTube</small></a>
            <a className="vb-act vb-follow" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"><Icon name="bell" size={16} /><b>Follow</b><small>tap the bell</small></a>
            <button type="button" className="vb-act vb-share" onClick={share}><Icon name="share" size={16} /><b>{copied ? 'Link copied' : 'Share'}</b><small>with a friend</small></button>
          </div>
        </div>
      </div>
    </section>
  );
}
