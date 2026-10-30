import { useEffect, useMemo, useRef, useState } from 'react';
import './styles/index.css';
import { AppProvider, useApp } from './context/AppContext.jsx';
import { AccountProvider, useAccount } from './context/AccountContext.jsx';
import { Backdrop } from './components/Backdrop.jsx';
import { TopBar, Brand } from './components/TopBar.jsx';
import { CapsuleList, DeleteCard, GoneState, ReviveCard, VitalSteps, VitalsPanel } from './components/Sections.jsx';
import { RequestTracker } from './components/tracker/RequestTracker.jsx';
import { CareWizard } from './components/modal/CareWizard.jsx';
import { Icon } from './components/Icon.jsx';
import { runFx } from './lib/fx.js';
import { useReducedMotion } from './hooks/index.js';

const DEFAULT_LINKS = { dashboard: '/dashboard', account: '/dashboard/account', support: '/contact' };

/**
 * MyHealthOpinions · Account Care (Delete / Deactivate My Account).
 *
 * @param {object}  props.api                    createHttpApi() (production) or createMockApi() (preview)
 * @param {object}  props.user                   { name, email, id, points?, pointsValue? }
 * @param {object}  [props.links]                { dashboard, account, support, onNavigate?(event, key) }
 * @param {boolean} [props.showDevTools]         preview-only "Demo" Support simulator
 * @param {boolean} [props.showInternalPreviews] Support-ticket and Emails tabs (staging only)
 * @param {'light'|'dark'} [props.theme]         force a theme (default: saved choice → system preference)
 * @param {boolean} [props.fullPage]             false = embed inside an existing dashboard shell (no top bar)
 */
export default function AccountActionsPage({ api, user, links, showDevTools = false, showInternalPreviews = false, theme, fullPage = true }) {
  const rootRef = useRef(null);
  const l = useMemo(() => ({ ...DEFAULT_LINKS, ...links }), [links]);
  return (
    <AppProvider rootRef={rootRef} forcedTheme={theme}>
      <AccountProvider api={api} user={user}>
        <Root rootRef={rootRef} links={l} showDevTools={showDevTools} showInternalPreviews={showInternalPreviews} fullPage={fullPage} />
      </AccountProvider>
    </AppProvider>
  );
}

function Root({ rootRef, links, showDevTools, showInternalPreviews, fullPage }) {
  const { theme, lockMood, setBaseMood } = useApp();
  const { account, error, loading, refresh, requestKey } = useAccount();
  const [open, setOpen] = useState(null);
  const fxRef = useRef(null);
  const rm = useReducedMotion();

  useEffect(() => { setBaseMood(account.status === 'hold' ? 'react' : account.status === 'deleted' ? 'del' : 'brand'); }, [account.status, setBaseMood]);
  useEffect(() => {
    if (!fullPage) return;
    const b = document.body, prev = b.style.background;
    b.style.background = theme === 'light' ? '#FFFFFF' : '#06141C';
    document.documentElement.style.colorScheme = theme;
    return () => { b.style.background = prev; };
  }, [theme, fullPage]);
  useEffect(() => {
    let stop = () => {};
    const on = (e) => { if (!rm) { stop(); stop = runFx(fxRef.current, e.detail || requestKey, null); } };
    window.addEventListener('mho:completed', on);
    return () => { window.removeEventListener('mho:completed', on); stop(); };
  }, [requestKey, rm]);

  const select = (k) => { setOpen(k); lockMood(k); };
  const closeWizard = () => { setOpen(null); lockMood(null); };
  const track = () => requestAnimationFrame(() => document.getElementById('mho-tracker')?.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'start' }));
  const gone = account.status === 'deleted';
  const nav = (key) => (links.onNavigate ? (e) => links.onNavigate(e, key) : undefined);

  return (
    <div className={`mho ${fullPage ? 'full' : 'embedded'}`} data-theme={theme} ref={rootRef}>
      <Backdrop />
      <canvas ref={fxRef} className="fx page-fx" aria-hidden="true" />
      {fullPage && <TopBar links={links} showDevTools={showDevTools} />}
      <div className="wrap layout">
        <aside className="layout-side"><VitalsPanel /></aside>
        <main className="layout-main" id="mho-main">
          {error && <div className="notice err-notice" role="alert"><Icon name="alert" /><span>{error}</span><button type="button" className="btn ghost sm" onClick={refresh}><Icon name="refresh" />Try again</button></div>}
          <RequestTracker showInternal={showInternalPreviews} />
          {gone ? <GoneState /> : (<><ReviveCard onSelect={select} /><CapsuleList onSelect={select} /><DeleteCard onSelect={select} /></>)}
          <VitalSteps />
        </main>
      </div>
      <footer className="foot">
        <div className="wrap foot-in">
          <Brand className="foot-brand" />
          <span>© {new Date().getFullYear()} MyHealthOpinions · Your health, your voice.</span>
          <span>Changed your mind? <a href={links.dashboard} onClick={nav('dashboard')}>Return to your dashboard</a> · <a href={links.support} onClick={nav('support')}>Contact Support</a></span>
        </div>
      </footer>
      {loading && <span className="sr-only" role="status">Loading your account…</span>}
      {open && <CareWizard k={open} onClose={closeWizard} onTrack={track} links={links} showDemoHint={showDevTools} />}
    </div>
  );
}
