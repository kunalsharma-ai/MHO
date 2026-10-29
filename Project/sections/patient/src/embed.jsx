/**
 * Dashboard integration API.
 *
 *   import { mountMHOPatient } from './mho-patient-section.js';
 *   const section = mountMHOPatient(document.getElementById('profile-tab'), {
 *     user: { firstName: 'Kunal', id: 'u_123', email: 'kunal@example.com' },
 *     view: 'all',                 // 'all' | 'profiles' | 'surveys'
 *     assetBase: '/mho/',          // where images/, fonts/, data/ are served from
 *     apiBase: 'https://api.myhealthopinions.com',
 *     onRewards: ({ points, qualityScore, level }) => updateHeader(points, qualityScore),
 *   });
 *   section.setView('surveys');    // switch tab without remounting
 *   section.unmount();
 *
 * React apps can render <MHOPatientSection view="profiles" /> directly after calling configureMHO(options).
 * Events on window: 'mho:rewards' { points, qualityScore, level, completed } and 'mho:complete' { id, kind }.
 */
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { controller } from './lib/controller.js';
import { cards } from './lib/cards.js';
import { setMountOptions } from './lib/config.js';
import { initStore } from './lib/store.js';
import { injectFonts } from './lib/fonts.js';
import CSS from 'mho:css';

/* the stylesheet (already scoped to .mho-app at build time) is injected once */
function injectCss() {
  if (typeof document === 'undefined' || document.getElementById('mho-css')) return;
  const st = document.createElement('style');
  st.id = 'mho-css';
  st.textContent = CSS;
  document.head.appendChild(st);
}

export function configureMHO(options = {}) {
  setMountOptions(options);
  initStore();
  injectFonts();
  injectCss();
}

export function MHOPatientSection(props) {
  return <App {...props} />;
}

export function mountMHOPatient(el, options = {}) {
  if (!el) throw new Error('mountMHOPatient: element not found');
  configureMHO(options);
  const root = createRoot(el);
  let view = options.view || 'all';
  const render = () => root.render(<App view={view} />);
  render();
  return {
    setView(v) { view = v; render(); },
    items: controller.items,
    open: controller.open,
    subscribe: controller.subscribe,
    setCard: cards.set,
    removeCard: cards.remove,
    unmount() { root.unmount(); document.querySelectorAll('.mho-layer').forEach((n) => n.remove()); },
  };
}

if (typeof window !== 'undefined') window.MHOPatient = { mount: mountMHOPatient, configure: configureMHO };
