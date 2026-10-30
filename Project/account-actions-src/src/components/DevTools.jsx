import { TERMINAL, STATUS, FLOW } from '../config/actions.js';
import { useAccount } from '../context/AccountContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import { sound } from '../lib/sound.js';
import { Icon } from './Icon.jsx';

/** Preview-only panel that simulates the Support Team. Hidden in production (showDevTools=false). */
export function DevTools({ id, onClose }) {
  const { dev, account, request, requestKey } = useAccount();
  const { toast } = useApp();
  const open = request && !TERMINAL.includes(request.status);

  const advance = () => {
    const s = dev.advance();
    const st = s.request?.status;
    if (st === 'completed') { sound.play(`done-${requestKey}`); window.dispatchEvent(new CustomEvent('mho:completed', { detail: requestKey })); toast('Support marked your request as Completed.', 'check'); }
    else if (st) toast(`Support status: ${STATUS[st].label}`, 'headset');
  };

  return (
    <div className="dev-panel" id={id} role="dialog" aria-label="Demo tools">
      <div className="dev-head"><b><Icon name="sliders" />Demo tools</b><button type="button" className="icon-btn sm" onClick={onClose} aria-label="Close demo tools" data-sfx="close"><Icon name="x" /></button></div>
      <p className="dev-note">For review only. These buttons stand in for your API and Support Team, and don't ship to production.</p>
      <div className="dev-grp"><span>Account status</span>
        <div className="seg">
          <button type="button" aria-pressed={account.status !== 'hold'} onClick={() => { dev.setAccountStatus('active'); toast('Account set to Active'); }}>Active</button>
          <button type="button" aria-pressed={account.status === 'hold'} onClick={() => { dev.setAccountStatus('hold'); toast('Account set to On hold: the Reactivate option is now showing', 'pause'); }}>On hold</button>
        </div>
      </div>
      <div className="dev-grp"><span>Support Team simulation</span>
        <div className="dev-row">
          <button type="button" className="mini" disabled={!open} onClick={advance}>
            Advance to {open ? STATUS[FLOW[Math.min(FLOW.indexOf(request.status) + 1, FLOW.length - 1)]]?.label : 'next status'}
          </button>
          <button type="button" className="mini" disabled={!open} onClick={() => { dev.markUnable(); toast('Support marked the request as Unable to Process.', 'alert'); }}>Unable to process</button>
        </div>
      </div>
      <div className="dev-grp"><span>Demo password</span><code>{dev.password}</code></div>
      <button type="button" className="mini wide" onClick={() => { dev.reset(); toast('Demo reset', 'refresh'); }}><Icon name="refresh" />Reset demo</button>
    </div>
  );
}
