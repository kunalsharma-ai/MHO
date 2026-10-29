import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { metaOf } from '../data/profileMeta.js';
import { surfaceVars } from '../lib/patterns.js';
import { hostEl } from '../lib/host.js';

function Card({ item }) {
  const { t, fmtNum } = useI18n();
  const { p, st, n } = item;
  const m = metaOf(p.id);
  const done = st.status === 'done';
  const state = done ? 'done' : 'open';
  const status = done ? t('stDone') : p.badge || t('stNew');
  const act = () => { if (!p.disabled) item.onOpen?.(); };
  return (
    <li className={'pcard st-' + state} style={{ ...surfaceVars(m), '--k': 0 }}>
      <button type="button" className="pc-hit" onClick={act} aria-label={`${p.title} — ${status}`} />
      <i className="pc-pat" aria-hidden="true" />
      <i className="pc-glow" aria-hidden="true" />
      <div className="pc-top" aria-hidden="true">
        <span className="pc-code mono">S-{String(n).padStart(2, '0')}</span>
        <span className={'pc-chip ch-' + state}>{done ? '✓ ' : '✦ '}{status}</span>
      </div>
      <div className="pc-art" aria-hidden="true">
        <i className="pc-ring" />
        <span className="pc-emo">{p.emoji}</span>
      </div>
      <div className="pc-body">
        <p className="pc-flavor">{p.flavor}</p>
        <h3 className="pc-title">{p.title}</h3>
        <p className="pc-desc">{p.blurb}</p>
        <p className="pc-meta mono" aria-hidden="true"><span>⏱ {t('minutes', { n: fmtNum(p.external.minutes) })}</span></p>
        <div className="pc-foot">
          <span className={'pc-rw' + (done ? ' got' : '')}>
            <b className="rw-p mono">+{fmtNum(p.external.points)} <small>{t('pts')}</small></b>
          </span>
          <span className={'pc-btn ' + (done ? 'ghost' : 'solid')} aria-hidden="true">{p.cta || <>{t('start')} →</>}</span>
        </div>
      </div>
    </li>
  );
}

export default function ExternalCard({ item }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = hostEl();
    const el = ref.current;
    for (const name of Array.from(host.style)) {
      if (name.startsWith('--')) el.style.setProperty(name, host.style.getPropertyValue(name));
    }
    Object.assign(el.dataset, host.dataset);
    el.lang = host.lang;
    el.dir = host.dir;
  });
  return (
    <div className="mho-hcp" ref={ref} style={{ minHeight: 0, background: 'transparent', overflow: 'visible' }}>
      <ul className="pgrid" style={{ gridTemplateColumns: '1fr', listStyle: 'none', margin: 0, padding: 0 }}>
        <Card item={item} />
      </ul>
    </div>
  );
}
