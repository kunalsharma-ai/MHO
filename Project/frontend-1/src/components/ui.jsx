// Small shared UI primitives.
import { useEffect, useRef, useState } from 'react';
import { flagUrl } from '../data/countries.js';
import { Link } from '../router.jsx';
import Icon from './Icon.jsx';

/** True after the first client render (use for anything random/browser-only to avoid hydration mismatch). */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/** Adds .is-in when the element enters the viewport; .is-paused toggles off-screen to stop CSS animations. */
export function useInView(options = { threshold: 0.15 }, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) setInView(false);
    }, options);
    io.observe(el);
    // Fail-safe for one-shot reveals: if a fast fling, a jump link or the End key scrolls past the element
    // without it ever intersecting, reveal it anyway so no content can stay invisible.
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (el.getBoundingClientRect().top < window.innerHeight) { setInView(true); cleanup(); }
      });
    };
    const cleanup = () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
    if (once) window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, effect = 'up', style, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal reveal-${effect} ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/** Wrapper that pauses its CSS animations while off-screen (performance). */
export function LiveZone({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0 }, false);
  return (
    <Tag ref={ref} className={`live-zone ${inView ? '' : 'is-paused'} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Flag({ code, name, size = 24, className = '' }) {
  const w = size <= 20 ? 20 : size <= 40 ? 40 : 80;
  return (
    <img
      className={`flag ${className}`}
      src={flagUrl(code, w)}
      alt={name ? `${name} flag` : ''}
      width={size}
      height={Math.round(size * 0.75)}
      loading="lazy"
      decoding="async"
    />
  );
}

export function Stars({ value = 5, size = 16, className = '' }) {
  return (
    <span className={`stars ${className}`} aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} fill={i <= value ? 'currentColor' : 'none'} className={i <= value ? 'on' : 'off'} />
      ))}
    </span>
  );
}

export function Button({ to, children, variant = 'primary', icon = 'arrow', className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      {icon && <Icon name={icon} size={18} className="btn-icon" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <button className={cls} {...rest}>{inner}</button>;
}

export function Eyebrow({ children, color }) {
  return (
    <span className="eyebrow" style={color ? { '--eb': color } : undefined}>
      <i aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, lead, align = 'center', color, id }) {
  return (
    <header className={`section-head align-${align}`} id={id}>
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.to || it.label}>
            {i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Accordion({ items, idPrefix = 'acc', defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`acc-item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-${i}`}
                id={`${idPrefix}-btn-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className="acc-sign" aria-hidden="true"><i /><i /></span>
              </button>
            </h3>
            <div className="acc-panel" id={`${idPrefix}-${i}`} role="region" aria-labelledby={`${idPrefix}-btn-${i}`}>
              <div><p>{it.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
