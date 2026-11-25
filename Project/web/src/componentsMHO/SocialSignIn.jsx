"use client";
// Social sign-in buttons for the web app's log-in and sign-up, in the same format and with the same process as the
// public site (frontend-1 components/SocialLogin.jsx): the providers come from POST /api/v1/auth/socials, only
// https sign-on links are shown, and each button goes to the provider's own link. Nothing is shown when the server
// has social sign-on switched off.
import React from "react";
import { api } from "@/util";
import "./social-sign-in.css";

const LABEL = { google: "Google", linkedin: "LinkedIn", twitter: "X", x: "X", facebook: "Facebook", github: "GitHub", apple: "Apple", microsoft: "Microsoft" };

function ProviderIcon({ name }) {
  if (name === "google") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3a7.2 7.2 0 0 1-10.72-3.78H1.34v3.09A12 12 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.35 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.34a12 12 0 0 0 0 10.78l4.01-3.09z" />
        <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.34 6.61l4.01 3.1A7.15 7.15 0 0 1 12 4.77z" />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path fill="#0a66c2" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    );
  }
  if (name === "twitter" || name === "x") {
    return (
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
      </svg>
    );
  }
  return <span className="mho-social-dot" aria-hidden="true" />;
}

export default function SocialSignIn({ label = "or continue with" }) {
  const [providers, setProviders] = React.useState([]);
  React.useEffect(() => {
    let live = true;
    api.post("/api/v1/auth/socials", {}).then((resp) => {
      const list = Array.isArray(resp?.data) ? resp.data : [];
      if (live) {
        setProviders(list
          .filter((p) => p && p.name && typeof p.authUrl === "string" && /^https:\/\//i.test(p.authUrl.trim()))
          .map((p) => ({ name: String(p.name).toLowerCase(), authUrl: p.authUrl.trim() })));
      }
    }).catch(() => { /* social sign-on unavailable: show nothing */ });
    return () => { live = false; };
  }, []);

  if (!providers.length) return null;
  return (
    <div className="mho-social">
      <p className="mho-social-or"><span>{label}</span></p>
      <div className="mho-social-row">
        {providers.map((p) => (
          <a key={p.name} className="mho-social-btn" href={p.authUrl} rel="noopener">
            <ProviderIcon name={p.name} />
            <span>{LABEL[p.name] || p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
