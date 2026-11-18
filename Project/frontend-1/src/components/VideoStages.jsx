// One stage per video template for the "Watch the full video" band (PageVideoBand).
// Every page gets its own frame, layout and motion around the same YouTube cover:
// a vitals monitor, an X-ray light box, a cinema premiere, a phone scanner, an arcade cabinet and so on.
// Everything is inside one <button>, so only spans and SVG are used. Motion is transform and opacity only,
// and AnimationGate pauses the band while it is off screen.
import Icon from './Icon.jsx';

const n = (k) => Array.from({ length: k }, (_, i) => i);

function Cover({ yt, v, glyph = 'play' }) {
  return (
    <span className="vs-cover">
      {yt && <img src={`https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" width="480" height="360" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
      <span className="vs-shade" />
      <span className="vs-cap"><small>{v.eyebrow}</small><b>{v.title}</b><em>{v.em}</em></span>
      <span className="vs-play"><i /><i />{glyph === 'play' ? <Icon name="play" size={30} fill="currentColor" stroke={0} /> : glyph}</span>
    </span>
  );
}

const STAGES = {
  // Home: bedside vitals monitor with a live ECG trace
  monitor: (p) => (
    <span className="vs-frame">
      <span className="vs-bezel">
        <span className="vs-top"><i className="vs-led" />MHO · LIVE<span className="vs-heart"><Icon name="heart" size={14} fill="currentColor" stroke={0} /></span></span>
        <span className="vs-body">
          <Cover {...p} />
          <span className="vs-side">
            {['ECG', 'PULSE', 'RESP'].map((t, i) => <span key={t} className={`vs-ch c${i}`}><small>{t}</small><b>{n(7).map((k) => <i key={k} style={{ '--k': k }} />)}</b></span>)}
          </span>
        </span>
        <span className="vs-ecgw"><svg className="vs-ecg" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 34h90l12-22 14 44 12-34 9 12h163l12-22 14 44 12-34 9 12h163l12-22 14 44 12-34 9 12h41M600 34h90l12-22 14 44 12-34 9 12h163l12-22 14 44 12-34 9 12h163l12-22 14 44 12-34 9 12h41" /></svg></span>
      </span>
    </span>
  ),

  // About: X-ray light box with clips and a scanning bar
  lightbox: (p) => (
    <span className="vs-frame">
      <span className="vs-box">
        <span className="vs-clip l" /><span className="vs-clip r" />
        <Cover {...p} />
        <svg className="vs-ribs" viewBox="0 0 400 240" preserveAspectRatio="none">
          <path d="M200 10v220" />
          {n(5).map((i) => <path key={i} d={`M196 ${40 + i * 36}C150 ${32 + i * 36} 110 ${52 + i * 38} 120 ${80 + i * 38}M204 ${40 + i * 36}C250 ${32 + i * 36} 290 ${52 + i * 38} 280 ${80 + i * 38}`} />)}
        </svg>
        <span className="vs-scan" />
      </span>
      <span className="vs-films">{['A', 'B', 'C'].map((t, i) => <span key={t} style={{ '--i': i }}><b>{t}</b></span>)}</span>
    </span>
  ),

  // Reviews: cinema premiere with marquee, curtains and spotlights
  premiere: (p) => (
    <span className="vs-frame">
      <span className="vs-beams"><i /><i /></span>
      <span className="vs-marquee">
        <span className="vs-bulbs">{n(26).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
        <b>Now showing</b><small>Member stories · Tonight</small>
      </span>
      <span className="vs-cinema">
        <Cover {...p} />
        <span className="vs-curtain l" /><span className="vs-curtain r" />
      </span>
      <span className="vs-seats">{n(9).map((i) => <i key={i} />)}</span>
    </span>
  ),

  // Scan & connect: a phone scanning the video
  handheld: (p) => (
    <span className="vs-frame">
      <span className="vs-orbit">{['youtube', 'instagram', 'linkedin', 'facebook', 'whatsapp', 'qr'].map((k, i) => <i key={k} style={{ '--i': i }}><Icon name={k} size={18} /></i>)}</span>
      <span className="vs-phone">
        <span className="vs-notch" />
        <Cover {...p} />
        <span className="vs-brackets"><i /><i /><i /><i /></span>
        <span className="vs-scan" />
        <span className="vs-found"><Icon name="check" size={13} />Video found</span>
      </span>
    </span>
  ),

  // Earn: neon arcade cabinet
  arcade: (p) => (
    <span className="vs-frame">
      <span className="vs-cab">
        <span className="vs-cabtop"><b>OPINION QUEST</b></span>
        <span className="vs-crt"><Cover {...p} glyph={<b className="vs-px">▶</b>} /><span className="vs-lines" /><span className="vs-coin">INSERT COIN</span></span>
        <span className="vs-panel"><span className="vs-stick"><i /></span><span className="vs-btns"><i /><i /><i /></span></span>
      </span>
      <span className="vs-stars">{n(6).map((i) => <i key={i} style={{ '--i': i }}>★</i>)}</span>
    </span>
  ),

  // Healthcare professionals: operating-theatre lamp over a steel monitor
  surgical: (p) => (
    <span className="vs-frame">
      <span className="vs-lamp"><span className="vs-disc">{n(7).map((i) => <i key={i} style={{ '--i': i }} />)}</span></span>
      <span className="vs-cone" />
      <span className="vs-steel"><Cover {...p} /></span>
      <span className="vs-tray">{['stethoscope', 'scalpel', 'pill', 'microscope', 'heart'].map((k, i) => <i key={k} style={{ '--i': i }}><Icon name={k} size={18} /></i>)}</span>
    </span>
  ),

  // Caregivers: a warm house window with string lights
  hearth: (p) => (
    <span className="vs-frame">
      <span className="vs-roof"><span className="vs-chimney"><i /><i /><i /></span></span>
      <span className="vs-lights">{n(13).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="vs-house">
        <span className="vs-window"><Cover {...p} /><span className="vs-mullion" /><span className="vs-drape l" /><span className="vs-drape r" /></span>
        <span className="vs-sill">{n(3).map((i) => <i key={i}><Icon name="heart" size={12} fill="currentColor" stroke={0} /></i>)}</span>
      </span>
    </span>
  ),

  // Patients: organic blob with floating capsules and cells
  bloom: (p) => (
    <span className="vs-frame">
      <span className="vs-petals"><i /><i /><i /></span>
      <span className="vs-blob"><Cover {...p} /></span>
      <span className="vs-caps">{n(6).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="vs-cells">{n(5).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
    </span>
  ),

  // How it works: technical blueprint with dimension lines and a title block
  blueprint: (p) => (
    <span className="vs-frame">
      <span className="vs-sheet">
        <span className="vs-dim h"><b>W · 16</b></span>
        <span className="vs-dim v"><b>H · 9</b></span>
        <span className="vs-draw"><Cover {...p} /><span className="vs-cross"><i /><i /><i /><i /></span></span>
        <span className="vs-block"><small>DWG</small><b>MHO-HOW-01</b><small>SCALE 1:1 · 4 STEPS</small></span>
        <span className="vs-compass"><i /></span>
        <span className="vs-steps">{['01', '02', '03', '04'].map((s, i) => <i key={s} style={{ '--i': i }}>{s}</i>)}</span>
      </span>
    </span>
  ),

  // Rewards: vault door beside a gold-trimmed screen, coins falling
  vault: (p) => (
    <span className="vs-frame">
      <span className="vs-safe"><Cover {...p} glyph={<b className="vs-coinplay"><Icon name="play" size={24} fill="currentColor" stroke={0} /></b>} /></span>
      <span className="vs-door"><span className="vs-dial">{n(8).map((i) => <i key={i} style={{ '--i': i }} />)}</span><b /></span>
      <span className="vs-rain">{n(9).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
      <span className="vs-bars"><i /><i /><i /></span>
    </span>
  ),

  // Trust & safety: secure terminal with a scanning shield
  shield: (p) => (
    <span className="vs-frame">
      <span className="vs-term">
        <span className="vs-tbar"><i /><i /><i /><small>secure-view — myhealthopinions</small><Icon name="lock" size={12} /></span>
        <span className="vs-tbody">
          <Cover {...p} />
          <span className="vs-shieldmark"><Icon name="shield" size={90} /><i /></span>
        </span>
        <span className="vs-log">{p.v.points.map((t, i) => <span key={t} style={{ '--i': i }}><b>✓</b>{t}</span>)}</span>
      </span>
    </span>
  ),

  // Blog: magazine cover
  magazine: (p) => (
    <span className="vs-frame">
      <span className="vs-mag">
        <span className="vs-mast">THE JOURNAL</span>
        <span className="vs-issue"><small>Issue Nº 01</small><small>MyHealthOpinions</small></span>
        <Cover {...p} />
        <span className="vs-mlines"><b>{p.v.title} {p.v.em}</b><small>Watch the film inside</small></span>
        <span className="vs-code">{n(14).map((i) => <i key={i} style={{ '--w': (i * 7) % 3 + 1 }} />)}</span>
      </span>
      <span className="vs-sticker"><b>WATCH</b><small>the issue</small></span>
    </span>
  ),

  // FAQ: a speech bubble with questions floating around it
  quiz: (p) => (
    <span className="vs-frame">
      <span className="vs-qs">{['?', '!', '?', '?', '!', '?', '?'].map((q, i) => <i key={i} style={{ '--i': i }}>{q}</i>)}</span>
      <span className="vs-bubble"><Cover {...p} /><span className="vs-typing"><i /><i /><i /></span></span>
      <span className="vs-answers">{['A', 'B', 'C'].map((a, i) => <i key={a} style={{ '--i': i }}><b>{a}</b><s /></i>)}</span>
    </span>
  ),

  // Contact: airmail postcard with a stamp and postmark
  postcard: (p) => (
    <span className="vs-frame">
      <span className="vs-card">
        <span className="vs-photo"><Cover {...p} /></span>
        <span className="vs-back">
          <span className="vs-stamp"><Icon name="heart" size={22} fill="currentColor" stroke={0} /><small>MHO</small></span>
          <span className="vs-postmark"><b>WITH LOVE</b><small>MyHealthOpinions</small></span>
          <span className="vs-addr"><i /><i /><i /></span>
          <span className="vs-hello">Wish you were here!</span>
        </span>
      </span>
      <span className="vs-plane"><Icon name="send" size={22} /></span>
    </span>
  ),

  // Join: mission control, a rocket and a countdown
  launch: (p) => (
    <span className="vs-frame">
      <span className="vs-sky"><i /><i /></span>
      <span className="vs-port"><Cover {...p} /><span className="vs-hud"><i /><i /><i /><i /></span></span>
      <span className="vs-rocket"><Icon name="send" size={30} /><i /></span>
      <span className="vs-count">{['3', '2', '1', 'GO'].map((c, i) => <i key={c} style={{ '--i': i }}>{c}</i>)}</span>
    </span>
  ),

  // Legal pages: manila folder with a clipped photo and a stamp
  dossier: (p) => (
    <span className="vs-frame">
      <span className="vs-folder">
        <span className="vs-tab">FILE · {p.v.fab}</span>
        <span className="vs-paper"><span className="vs-ruled">{n(8).map((i) => <i key={i} />)}</span></span>
        <span className="vs-photo"><Cover {...p} /><span className="vs-pclip" /></span>
        <span className="vs-stampbox">REVIEWED</span>
      </span>
    </span>
  ),
};

export default function VideoStage({ template, yt, v }) {
  const S = STAGES[template] || STAGES.monitor;
  return <S yt={yt} v={v} />;
}
