import { Component } from 'react';
import { createPortal } from 'react-dom';
import { getLayer } from '../lib/root.js';

/** Prevents a "white screen": any error inside the profile overlay closes it gracefully. */
export default class ErrorBoundary extends Component {
  constructor(p) {
    super(p);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  componentDidCatch(err, info) {
    // eslint-disable-next-line no-console
    console.error('[MHO] recovered from error', err, info?.componentStack);
  }
  render() {
    if (this.state.err) {
      return createPortal(
        <div className="runner runner-error" role="alertdialog" aria-live="assertive">
          <div className="q-card">
            <p className="q-emoji" aria-hidden="true">🛠️</p>
            <h2>Something went wrong, but your answers are safe.</h2>
            <button className="btn primary" type="button" onClick={() => { this.setState({ err: null }); this.props.onReset?.(); }}>
              Back to profiles
            </button>
          </div>
        </div>,
        getLayer()
      );
    }
    return this.props.children;
  }
}
