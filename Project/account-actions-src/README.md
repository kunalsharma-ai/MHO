# MyHealthOpinions: Account Care (Delete / Deactivate My Account)

**Version 1.0.0** · React 19.2.8 + esbuild 0.28.2

1. **The Account Care page**: members can deactivate for 30/60/90 days, put the account on hold, reactivate (only when on hold), or request permanent deletion. Each request is password-verified, gets a request ID (`MHO-DEL-YYYYMMDD-XXXXX`), creates a Support ticket, and is processed within 7 working days.
2. **The "Account Care" dashboard card**: the entry point (light and dark versions).

The design is MyHealthOpinions' own, different from both the MFR and T2O versions:
- a split screen with a sticky "vitals" panel;
- a beating 3D heart with a live ECG trace;
- capsule-shaped accordion options;
- a split step wizard;
- a patient-chart tracker with a heartbeat strip;
- heartbeat, monitor and kalimba sounds;
- six health-themed 3D objects and completion animations.

It has light (white) and dark (deep teal) themes, a sound on every click, and works on desktop, laptop, tablet and phone.

## Quick start
```bash
npm install
npm run dev            # http://localhost:5173 (mock API, demo password: Health@2026)
npm run build          # dist/ (standalone page + ESM library)
npm run build:preview  # preview/mho-account-actions-preview.html (single file)
npm run mock-server    # reference API on http://localhost:8787 (serves dist/ too)
```

## Folder map
```
src/
  AccountActionsPage.jsx            Main page component (default export)
  index.js                          Public exports
  main.jsx                          Standalone mount (reads window.MHO_CONFIG)
  config/actions.js                 ★ Actions, palettes (Mint, Lavender, Coral, Ocean, Cardinal, Pulse), statuses, copy
  services/httpApi.js · mockApi.js  ★ Production API client · preview mock + Support simulator
  context/                          AppContext (theme, sound on every click, mood, toasts) · AccountContext
  components/TopBar.jsx             Heart + wordmark, breadcrumb with mini ECG, sun/moon button, heart sound button, Demo
  components/Backdrop.jsx           Blobs, heartbeat traces, plus sparkles
  components/HeartEmblem.jsx        3D beating heart
  components/Sections.jsx           Vitals panel, capsule accordion, delete card, revive card, vital steps
  components/Object3D.jsx           Six CSS-3D objects
  components/modal/CareWizard.jsx   Review/Warning → Verify → Confirm → Sending → Done
  components/tracker/RequestTracker.jsx  Heartbeat strip, history, ticket, emails
  components/dashboard/             AccountSettingsCard (+ CSS)
  lib/sound.js · lib/fx.js          Sound kit · completion animations
  styles/                           tokens · base · sections · objects · wizard · tracker · responsive
scripts/ server/ snippets/ emails/ docs/ preview/
```

## Documents
Start with [docs/00-GO-LIVE-OVERVIEW.md](docs/00-GO-LIVE-OVERVIEW.md).

| # | Document |
|---|---|
| 00 | Go-live overview |
| 01 | Integration guide |
| 02 | API spec + openapi.yaml |
| 03 | Backend implementation |
| 04 | Security & privacy |
| 05 | Support Team SOP |
| 06 | Email templates |
| 07 | Design system (MHO) |
| 08 | QA test plan |
| 09 | Accessibility |
| 10 | Deployment checklist |
| 11 | Copy deck |
| 12 | Performance |
