// Page hero shell. Every page passes its own tagline, background theme and animated art so heroes
// share structure (consistent brand) without looking like the same template.
//   title: array of parts — "plain text" or { t: 'text', hl: 'grad' | 'marker' | 'outline' | 'warm' | 'mint' }
import { Fragment } from 'react';
import { Breadcrumbs, Eyebrow, Button } from './ui.jsx';

function Title({ parts, as: Tag = 'h1' }) {
  let w = 0;
  return (
    <Tag className="hero-title">
      {parts.map((p, i) => {
        const text = typeof p === 'string' ? p : p.t;
        const hl = typeof p === 'string' ? '' : p.hl;
        return (
          <Fragment key={i}>
          {i > 0 && ' '}
          <span className={hl ? `hl hl-${hl}` : undefined}>
            {text.split(/(\s+)/).map((word, k) =>
              /^\s+$/.test(word) ? word : (
                <span key={k} className="hw" style={{ '--w': w++ }}>{word}</span>
              )
            )}
          </span>
          </Fragment>
        );
      })}
    </Tag>
  );
}

export default function PageHero({ eyebrow, eyebrowColor, title, lead, ctas = [], art, theme = 'aurora', crumbs, children, className = '', badges }) {
  return (
    <section className={`page-hero theme-${theme} ${className}`}>
      <div className="ph-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container ph-inner">
        <div className="ph-copy">
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>}
          <Title parts={title} />
          {lead && <p className="ph-lead">{lead}</p>}
          {badges && <ul className="ph-badges">{badges.map((b) => <li key={b}>{b}</li>)}</ul>}
          {ctas.length > 0 && (
            <div className="ph-ctas">
              {ctas.map((c) => (
                <Button key={c.label} to={c.to} variant={c.variant || 'primary'} icon={c.icon === undefined ? 'arrow' : c.icon}>{c.label}</Button>
              ))}
            </div>
          )}
          {children}
        </div>
        {art && <div className="ph-art">{art}</div>}
      </div>
    </section>
  );
}

export { Title as HeroTitle };
