import { useId, useRef, useState } from 'react';
import { ACTIONS, FLOW_RAIL, PALETTES, TEMP_KEYS, paletteVars } from '../config/actions.js';
import { useAccount } from '../context/AccountContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import { Icon } from './Icon.jsx';
import { Object3D } from './Object3D.jsx';
import { HeartEmblem } from './HeartEmblem.jsx';

const STATUS_LABEL = {
  active: { cls: 'ok', text: 'Active' },
  hold: { cls: 'hold', text: 'On hold' },
  deactivated: { cls: 'off', text: 'Deactivated' },
  deleted: { cls: 'gone', text: 'Deletion completed' },
};
const DOSE = { d30: ['30', 'days'], d60: ['60', 'days'], d90: ['90', 'days'], hold: ['∞', 'no end'] };
const BTN_ICON = { hold: 'moon', del: 'trash', react: 'heart' };
const SPARK = 'M0 12 H14 L17 6 L20 18 L24 2 L28 22 L31 12 H60';

function splitTitle(label) {
  const m = {
    'Deactivate for 30 Days': ['Deactivate for ', '30 Days'], 'Deactivate for 60 Days': ['Deactivate for ', '60 Days'], 'Deactivate for 90 Days': ['Deactivate for ', '90 Days'],
    'Put My Account on Hold': ['Put My Account ', 'on Hold'], 'Permanently Delete My Account': ['Permanently Delete ', 'My Account'], 'Reactivate My Account': ['Reactivate ', 'My Account'],
  }[label];
  return m ? <>{m[0]}<em>{m[1]}</em></> : label;
}

function ActionButton({ k, disabled, current, onSelect }) {
  const A = ACTIONS[k];
  const ic = current ? 'check' : BTN_ICON[k];
  return (
    <button type="button" className="btn fill" disabled={disabled || current} onClick={(e) => onSelect(k, e.currentTarget)} data-sfx={`sel-${k}`}>
      {ic && <Icon name={ic} />}{current ? 'Account on hold' : A.cta}{!ic && <Icon name="chev" />}
    </button>
  );
}

/** Left "vitals" panel: beating heart, headline, readings. Sticky on large screens. */
export function VitalsPanel() {
  const { account, user, loading } = useAccount();
  const s = STATUS_LABEL[account.status] || STATUS_LABEL.active;
  return (
    <section className="vitals" aria-labelledby="mho-h1">
      <HeartEmblem />
      <span className="kicker"><Icon name="pulse" />Account Care · Your data, your choice</span>
      <h1 id="mho-h1">Delete or <span className="hl">Deactivate</span> My Account</h1>
      <p className="lede">We’re sorry to see you go. You can temporarily deactivate your account or request permanent deletion of your MyHealthOpinions account.</p>
      <ul className="vfacts">
        <li><span><Icon name="lock" /></span><div><b>Password required</b><small>for every change</small></div></li>
        <li><span><Icon name="headset" /></span><div><b>Reviewed by Support</b><small>a real person checks it</small></div></li>
        <li><span><Icon name="clock" /></span><div><b>Within 7 working days</b><small>processing time</small></div></li>
      </ul>
      <dl className="monitor">
        <div><dt>Account status</dt><dd>{loading ? <span className="skeleton" /> : <><i className={`dotp ${s.cls}`} />{s.text}{account.status === 'deactivated' && account.days ? ` · ${account.days}d` : ''}</>}</dd>
          <svg viewBox="0 0 60 24" aria-hidden="true"><path d={SPARK} /></svg></div>
        <div><dt>Points</dt><dd>{user.points ?? 0}{user.pointsValue ? <small>{user.pointsValue}</small> : null}</dd></div>
        <div><dt>Member ID</dt><dd className="mono">{user.id}</dd></div>
      </dl>
    </section>
  );
}

/** One capsule (accordion item). The header shows the option; opening it reveals details and the action. */
function Capsule({ k, open, onToggle, disabled, current, onSelect }) {
  const A = ACTIONS[k];
  const { setMood } = useApp();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [n, unit] = DOSE[k];
  return (
    <article className={`cap cap-${k} ${open ? 'open' : ''}`} style={paletteVars(k)} onPointerEnter={() => setMood(k)} onPointerLeave={() => setMood(null)}>
      {current && <span className="cap-now">Current status</span>}
      <button type="button" className="cap-head" aria-expanded={open} aria-controls={`${id}-b`} id={`${id}-h`} onClick={() => onToggle(k)} onFocus={() => setMood(k)} data-sfx="tab">
        <span className="cap-obj"><Object3D k={k} size={50} /></span>
        <span className="cap-txt">
          <span className="tag"><Icon name={A.tagIcon} />{A.tag}</span>
          <span className="cap-title">{splitTitle(A.label)}</span>
          <span className="cap-desc">{A.desc}</span>
        </span>
        <span className="cap-dose" aria-hidden="true"><b>{n}</b><small>{unit}</small></span>
        <span className="cap-chev" aria-hidden="true"><Icon name="chev" /></span>
      </button>
      <div className="cap-body" id={`${id}-b`} role="region" aria-labelledby={`${id}-h`} inert={!open}>
        <div className="cap-inner">
          <div className="cap-grid">
            <div className="cap-big"><Object3D k={k} size={104} /><span className="cap-pal"><i />{PALETTES[k].name}</span></div>
            <div className="cap-info">
              <h4>What happens?</h4>
              <ul className="cap-list">{A.bullets.map((b) => <li key={b}><Icon name="check" />{b}</li>)}</ul>
              <ul className="chips">{A.chips.map(([ic, t]) => <li key={t}><Icon name={ic} />{t}</li>)}</ul>
              <ActionButton k={k} disabled={disabled} current={current} onSelect={onSelect} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CapsuleList({ onSelect }) {
  const { account, pending, request } = useAccount();
  const [open, setOpen] = useState('d30');
  const onHold = account.status === 'hold';
  const toggle = (k) => setOpen((o) => (o === k ? null : k));
  return (
    <section className="sec" aria-labelledby="mho-opt-h">
      <header className="sec-head">
        <span className="sec-ic" style={{ '--hue': '#10B981' }}><Icon name="leaf" /></span>
        <div><h2 id="mho-opt-h">Take a break, keep your account</h2><p>Choose how long you’d like to step away. Your account stays in our system, and every request is checked by our Support Team.</p></div>
      </header>
      {pending && <div className="notice" role="status"><Icon name="clock" /><span>You have a request in progress (<b className="mono">{request.id}</b>). You can choose another option once it has been completed or cancelled.</span></div>}
      <div className="caps">
        {[...TEMP_KEYS, 'hold'].map((k) => (
          <Capsule key={k} k={k} open={open === k} onToggle={toggle} disabled={pending} current={k === 'hold' && onHold} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export function DeleteCard({ onSelect }) {
  const { pending } = useAccount();
  const { setMood } = useApp();
  const A = ACTIONS.del;
  return (
    <section className="sec" aria-labelledby="mho-del-h">
      <header className="sec-head">
        <span className="sec-ic" style={{ '--hue': '#E11D48' }}><Icon name="alert" /></span>
        <div><h2 id="mho-del-h">Permanent deletion</h2><p>This option is different from a break. Once a deletion has been completed it cannot normally be reversed.</p></div>
      </header>
      <article className="delc" style={paletteVars('del')} onPointerEnter={() => setMood('del')} onPointerLeave={() => setMood(null)}>
        <div className="delc-obj"><Object3D k="del" size={110} /></div>
        <div className="delc-body">
          <span className="tag"><Icon name="alert" />{A.tag}</span>
          <h3>{splitTitle(A.label)}</h3>
          <p>{A.desc}</p>
          <ul className="chips">{A.chips.map(([ic, t]) => <li key={t}><Icon name={ic} />{t}</li>)}</ul>
          <ActionButton k="del" disabled={pending} onSelect={onSelect} />
        </div>
      </article>
    </section>
  );
}

export function ReviveCard({ onSelect }) {
  const { account, pending } = useAccount();
  const { setMood } = useApp();
  if (account.status !== 'hold') return null;
  const A = ACTIONS.react;
  return (
    <section className="sec" id="reactivate" aria-labelledby="mho-re-h">
      <article className="revive" style={paletteVars('react')} onPointerEnter={() => setMood('react')} onPointerLeave={() => setMood(null)}>
        <div className="revive-obj"><Object3D k="react" size={112} /></div>
        <div className="revive-body">
          <span className="tag"><Icon name="moon" />Your account is currently on hold</span>
          <h2 id="mho-re-h">{splitTitle(A.label)}</h2>
          <p>{A.desc}</p>
          <ul className="chips">{A.chips.map(([ic, t]) => <li key={t}><Icon name={ic} />{t}</li>)}</ul>
          <ActionButton k="react" disabled={pending} onSelect={onSelect} />
        </div>
      </article>
    </section>
  );
}

export function GoneState() {
  return (
    <section className="sec">
      <div className="gone" style={paletteVars('del')}>
        <Object3D k="del" size={72} />
        <div><span className="tag"><Icon name="check" />Account status</span><h2>Your account deletion request has been completed.</h2><p>A confirmation email has been sent to your registered email address.</p></div>
      </div>
    </section>
  );
}

/** "Vital steps": 8 cards joined by one continuous heartbeat line */
export function VitalSteps() {
  return (
    <section className="sec" aria-labelledby="mho-flow-h">
      <header className="sec-head">
        <span className="sec-ic" style={{ '--hue': '#E53935' }}><Icon name="pulse" /></span>
        <div><h2 id="mho-flow-h">How your request moves</h2><p>Every account change follows the same secure path, whether you take a break, put your account on hold, reactivate or delete.</p></div>
      </header>
      <ol className="vsteps">
        {FLOW_RAIL.map((s, i) => (
          <li key={s.title} style={{ '--hue': s.hue }}>
            <svg className="vs-ecg" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 12 H38 L42 6 L46 18 L50 2 L54 22 L58 12 H100" /></svg>
            <span className="vs-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="vs-ic"><Icon name={s.icon} /></span>
            <b>{s.title}</b><small>{s.sub}</small>
          </li>
        ))}
      </ol>
    </section>
  );
}
