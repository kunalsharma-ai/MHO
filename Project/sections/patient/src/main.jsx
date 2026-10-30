
import { mountMHOPatient } from './embed.jsx';

const el = document.getElementById('mho-root');
const params = new URLSearchParams(location.search);
const opts = { ...(window.MHO_MOUNT || {}) };
if (params.get('name')) opts.user = { ...(opts.user || {}), firstName: params.get('name') };
if (params.get('view')) opts.view = params.get('view');
const section = mountMHOPatient(el, opts);
window.mhoSection = section;
document.querySelectorAll('[data-mho-view]').forEach((b) => b.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('[data-mho-view]').forEach((x) => x.classList.toggle('on', x === b));
  section.setView(b.dataset.mhoView);
  document.querySelector('.shell-main')?.scrollTo?.({ top: 0, behavior: 'smooth' });
}));

if ('serviceWorker' in navigator && location.protocol === 'https:' && window.MHO_CONFIG && window.MHO_CONFIG.disableSW === false) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
