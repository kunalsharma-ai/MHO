import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { COMPANY_SIZES, CONSUMER_DEMOGRAPHICS, CONSUMER_INTERESTS, DEPARTMENTS, INDUSTRIES, JOB_TITLES } from '../data/profiles.js';

// 1) Job titles — vertical, counter-scrolling columns ("talent waterfall")
export function JobTitleWaterfall() {
  return (
    <section className="section waterfall" aria-labelledby="jt-title">
      <div className="container wf-row">
        <div className="wf-copy reveal">
          <p className="eyebrow">Job titles</p>
          <h2 id="jt-title">From the boardroom <br />to the <span className="hl-blue">shop floor</span>.</h2>
          <p className="sec-sub">Leaders, managers, specialists, professionals, owners and public servants — every level of seniority has a voice here.</p>
          <ul className="tier-legend">
            {JOB_TITLES.map((t) => <li key={t.tier} style={{ '--c': t.color }}><i />{t.tier}</li>)}
          </ul>
        </div>
        <div className="wf-cols" aria-label="Job titles we welcome">
          {[0, 1, 2].map((col) => {
            const groups = JOB_TITLES.filter((_, i) => i % 3 === col);
            const items = groups.flatMap((g) => g.items.map((it) => ({ it, c: g.color })));
            return (
              <div key={col} className={`wf-col ${col === 1 ? 'up' : 'down'}`}>
                <ul>
                  {[...items, ...items].map((x, i) => (
                    <li key={i} style={{ '--c': x.c }} aria-hidden={i >= items.length}>{x.it}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 2) Industries — tabbed "bento" with animated tiles
export function IndustryBento() {
  const [g, setG] = useState(0);
  const grp = INDUSTRIES[g];
  return (
    <section className="section industries" aria-labelledby="ind-title">
      <div className="container">
        <div className="ind-head reveal">
          <div>
            <p className="eyebrow">Industries</p>
            <h2 id="ind-title">Every sector. <span className="hl-orange">Every specialism.</span></h2>
          </div>
          <div className="ind-tabs" role="tablist" aria-label="Industry groups">
            {INDUSTRIES.map((x, i) => (
              <button type="button" key={x.group} role="tab" aria-selected={g === i} className={g === i ? 'on' : ''} onClick={() => setG(i)}>{x.group}</button>
            ))}
          </div>
        </div>
        <ul className="ind-bento" key={g}>
          {grp.items.map((it, i) => (
            <li key={it} style={{ '--i': i }} className={i % 5 === 0 ? 'wide' : ''}>
              <span className="ind-n" aria-hidden="true"><Icon name="sparkle" size={16} /></span>
              <strong>{it}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// 3) Departments — rotating radial wheel
export function DepartmentWheel() {
  const n = DEPARTMENTS.length;
  return (
    <section className="section dept" aria-labelledby="dept-title">
      <div className="container dept-row">
        <div className="dept-wheel-wrap reveal" aria-hidden="true">
          <div className="dept-wheel">
            {DEPARTMENTS.map((d, i) => (
              <span key={d} className="dept-spoke" style={{ '--r': `${(360 / n) * i}deg` }}><em>{d}</em></span>
            ))}
            <div className="dept-hub"><Icon name="briefcase" size={34} /><b>Departments</b></div>
          </div>
        </div>
        <div className="dept-copy reveal">
          <p className="eyebrow">Departments</p>
          <h2 id="dept-title">Wherever you sit in the org chart.</h2>
          <p className="sec-sub">Finance to field engineering, procurement to people teams — researchers need perspectives from every function.</p>
          <ul className="dept-list">{DEPARTMENTS.map((d) => <li key={d}>{d}</li>)}</ul>
          <div className="size-ladder" aria-label="Company sizes">
            <p className="size-title">Company sizes</p>
            <ol>{COMPANY_SIZES.map((s, i) => <li key={s} style={{ '--i': i }}><span />{s}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4) Consumer interests — expanding mosaic tiles
export function InterestMosaic() {
  const [open, setOpen] = useState('family');
  return (
    <section className="section mosaic" aria-labelledby="int-title">
      <div className="container">
        <div className="mosaic-head reveal">
          <p className="eyebrow">Consumer profiles</p>
          <h2 id="int-title">Whatever you love, <span className="hl-pink">someone wants your take.</span></h2>
        </div>
        <ul className="mosaic-grid">
          {CONSUMER_INTERESTS.map((c, i) => (
            <li key={c.id} className={`mz ${open === c.id ? 'is-open' : ''}`} style={{ '--i': i }}>
              <button type="button" onClick={() => setOpen(c.id)} onMouseEnter={() => setOpen(c.id)} aria-expanded={open === c.id}>
                <span className="mz-ico"><Icon name={c.icon} size={22} /></span>
                <strong>{c.label}</strong>
              </button>
              <ul className="mz-items">{c.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// 5) Demographics — layered ribbon rows
export function DemographicRibbons() {
  return (
    <section className="section ribbons" aria-labelledby="demo-title">
      <div className="container">
        <div className="ribbon-head reveal">
          <p className="eyebrow">Demographics</p>
          <h2 id="demo-title">Every age. Every stage. Every background.</h2>
        </div>
        <div className="ribbon-stack">
          {CONSUMER_DEMOGRAPHICS.map((r, i) => (
            <div key={r.label} className="ribbon reveal" style={{ '--i': i }}>
              <span className="ribbon-label">{r.label}</span>
              <ul>{r.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
