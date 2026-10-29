import { useEffect, useState } from 'react';
import { postJSON } from '../utils/api.js';
import './SocialLogin.css';

// "Continue with Google / Facebook …" — the same social sign-in the member portal offers.
//
//  • The API lists the enabled providers: POST /api/v1/auth/socials  →  data: [{ name, authUrl }].
//  • Each button just opens the provider's authUrl. When the provider sends the member back, the API
//    - signs an existing member in and sends them to /member/dashboard, or
//    - sends a new member to /?signup=1&name=…&email=…  (App.jsx forwards that to /sign-up, which pre-fills the form).
//  • Nothing is shown when no provider is enabled (or the API can't be reached).
const ENDPOINT = import.meta.env.VITE_SOCIALS_ENDPOINT || '/api/v1/auth/socials';

const LABELS = { linkedin: 'LinkedIn', github: 'GitHub', x: 'X', twitter: 'X' };
const labelOf = (name) => LABELS[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);
// only plain web / site-relative links (never javascript: and the like)
const safeUrl = (u) => (typeof u === 'string' && /^(https?:\/\/|\/)/i.test(u.trim()) ? u.trim() : '');

const ICONS = {
  google: (
    <>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3a7.2 7.2 0 0 1-10.7-3.78H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.36 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l3.96-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.4 6.6l3.96 3.1A7.2 7.2 0 0 1 12 4.75z" />
    </>
  ),
  facebook: <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />,
  linkedin: <path fill="#0A66C2" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />,
  github: <path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />,
  apple: <path fill="currentColor" d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.3-.8s2 .8 3.4.8 2.3-1.2 3.1-2.4c1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 .1-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.1.1 2.3-.6 3.1-1.5z" />,
  microsoft: (
    <>
      <path fill="#F25022" d="M1 1h10v10H1z" /><path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" /><path fill="#FFB900" d="M13 13h10v10H13z" />
    </>
  ),
  x: <path fill="currentColor" d="M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.5-6.6 7.5H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.5h2L6.5 3.3H4.3l13.3 17.4z" />,
};
ICONS.twitter = ICONS.x;
const FALLBACK = <path fill="currentColor" d="M10 17l5-5-5-5v3H2v4h8v3zm4-14h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6v-2h6V5h-6V3z" />;

export default function SocialLogin() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    let live = true;
    postJSON(ENDPOINT, {})
      .then((res) => {
        const list = (Array.isArray(res.data) ? res.data : [])
          .map((p) => ({ name: String((p && p.name) || '').trim(), url: safeUrl(p && p.authUrl) }))
          .filter((p) => p.name && p.url);
        if (live) setProviders(list);
      })
      .catch(() => { /* social sign-in is not enabled: show nothing */ });
    return () => { live = false; };
  }, []);

  if (!providers.length) return null;
  return (
    <div className="soc" role="group" aria-label="Continue with a social account">
      <p className="soc-or"><span>or continue with</span></p>
      <div className="soc-list">
        {providers.map((p) => (
          <a key={p.name} className="soc-btn" href={p.url} aria-label={`Continue with ${labelOf(p.name)}`} title={`Continue with ${labelOf(p.name)}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONS[p.name.toLowerCase()] || FALLBACK}</svg>
          </a>
        ))}
      </div>
    </div>
  );
}
