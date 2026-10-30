import { createRoot } from 'react-dom/client';
import AccountActionsPage from './AccountActionsPage.jsx';
import { createMemberApi } from './services/memberApi.js';

const query = new URLSearchParams(window.location.search);
const queryId = (query.get('id') || '').trim();
const theme = query.get('theme') === 'dark' ? 'dark' : query.get('theme') === 'light' ? 'light' : undefined;
const framed = window.parent !== window;
const LINKS = { dashboard: '/member/dashboard', account: '/member/myaccount', support: '/member/support', home: '/' };

const tell = (message) => {
  try { window.parent.postMessage({ source: 'mho-account-actions', ...message }, window.location.origin); } catch { /* ignore */ }
};

const links = {
  ...LINKS,
  onNavigate: (event, key) => {
    event.preventDefault();
    if (framed) tell({ type: 'navigate', key });
    else window.location.assign(LINKS[key] || LINKS.account);
  },
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && framed && !document.querySelector('.mho .wiz-card')) tell({ type: 'close' });
});

async function member() {
  const user = { id: queryId, name: 'Member', email: '', points: Number(query.get('points')) || 0, pointsValue: query.get('usd') || '' };
  try {
    let token = '';
    try { token = localStorage.getItem('token') || ''; } catch { /* ignore */ }
    const res = await fetch('/api/v1/me', { credentials: 'same-origin', headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
    const data = (await res.json())?.data;
    if (!data) return user;
    const name = data.fullName || [data.name?.first, data.name?.last].filter(Boolean).join(' ');
    return { ...user, id: data._id || queryId, name: name || user.name, email: data.mail || '' };
  } catch {
    return user;
  }
}

member().then((user) => {
  createRoot(document.getElementById('mho-account-actions')).render(
    <AccountActionsPage api={createMemberApi({ memberId: user.id, memberMail: user.email, onSignedOut: () => tell({ type: 'signedOut' }) })} user={user} links={links} theme={theme} />,
  );
});
