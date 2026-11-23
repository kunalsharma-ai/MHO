// /complete-profile used to run the welcome survey after sign-up. The welcome survey is no longer part of joining:
// this page now only sends the member to their next step (consent form for their panel, or the dashboard).
import { useEffect } from 'react';
import { nextUrl } from '../utils/session.js';
import { auth } from '../utils/helpers.js';

export default function CompleteProfile() {
  useEffect(() => {
    if (!auth.getToken()) { window.location.replace('/login?next=/member/dashboard'); return; }
    nextUrl().then((to) => window.location.replace(to || '/member/dashboard'));
  }, []);
  return (
    <main className="acx" id="main">
      <p className="acx-small" role="status" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Taking you to your next step…</p>
    </main>
  );
}
