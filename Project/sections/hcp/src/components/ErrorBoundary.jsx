import { Component } from 'react';
import { useI18n } from '../i18n/index.jsx';

function Fallback({ onReset }) {
  const i18n = useI18n();
  const t = i18n ? i18n.t : (k) => ({ errorTitle: 'Something went wrong', errorSub: 'Your answers are saved.', errorBack: 'Back to my profiles' })[k];
  return (
    <div className="overlay overlay--error" role="alertdialog" aria-labelledby="err-t">
      <div className="err-card">
        <div className="err-emoji" aria-hidden="true">🩹</div>
        <h2 id="err-t">{t('errorTitle')}</h2>
        <p>{t('errorSub')}</p>
        <button type="button" className="btn btn--primary" onClick={onReset}>{t('errorBack')}</button>
      </div>
    </div>
  );
}

/** Catches render errors so a bug never leaves the user on a blank white screen. */
export default class ErrorBoundary extends Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { console.error('[MHO]', err, info); } // eslint-disable-line no-console
  reset = () => { this.setState({ err: null }); this.props.onReset?.(); };
  render() {
    if (this.state.err) return <Fallback onReset={this.reset} />;
    return this.props.children;
  }
}
