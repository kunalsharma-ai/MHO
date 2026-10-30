# MyHealthOpinions · Patient Dashboard Section (v2.0)

The patient **profile and survey section** of the MyHealthOpinions dashboard, built with React 19. When a patient signs in and opens the Profile (or Surveys) tab of the MHO dashboard, the dashboard mounts this section.

> **Good afternoon, Kunal 👋 — Welcome back! Your health story is taking shape.**

## What patients get

- **A greeting hero.** It uses the patient's name and the time of day, a warm line that follows their progress, a progress capsule and one "Continue" button. The 3D DNA-helix animation from v1.2 is kept.
- **Health Pulse rewards.**
  - Every completed profile or survey earns **+50 Reward Points and +1 Quality Score**.
  - A patient monitor shows a live ECG, the points, a Quality Score gauge and the level.
  - A **lab well plate** has one well per item (it scales to 100+), and a level ladder runs from Newcomer to Legend II…
  - When an item is completed, its well is pipetted and fills, the monitor surges, and "+50" and "+1 QS" tokens fly to the **header pills**.
- **Three sections:**
  1. **About You profiles** (complete these first);
  2. **Incomplete** (resume anything open);
  3. **Health surveys** — **black & white and locked** until the profiles are done, then **unlocked one at a time**. A locked survey opens an animated "vault" pop-up that shows exactly what to do next.
- **No white anywhere.** An animated colour mesh with floating 3D health objects. Every profile and survey has its own colour story, texture, idle animation, **completion animation** and **sound theme**.
- **The MyFrequentRewards language system.** 12 fully translated languages + 80 auto-translated, a searchable picker, a colour wipe with greeting and flag, and a signature melody for each language.
- **A sound on every click** (synthesised, no audio files) and an animated MyHealthOpinions logo.
- **Smarter questions:**
  - first / middle / last name boxes;
  - an inline **date-of-birth calendar** (years → months → days, keyboard support, 18–110 years);
  - a **phone number** field with flag, country name and calling code;
  - **country and state flags**;
  - **income in the country's currency**;
  - an emoji that matches every option.
- **Fully responsive** from 320 px phones to 4K, in portrait and landscape, light and dark, LTR and RTL. It adapts to the width the dashboard gives it (container queries).

## Quick start

```bash
npm install
npm run dev              # http://localhost:5173 (inside a sample dashboard shell, live reload)
npm run build            # dist/ (embed bundles + static files + demo)
npm run build:preview    # preview/MHO-Patient-Dashboard-Preview.html (one file, double-click to open)
npm run serve            # serve dist/ on http://localhost:4173
npm run test:dashboard   # E2E: 4 personas × 25 items, locks, rewards   (needs build:preview)
npm run test:responsive  # 11 screen sizes × light/dark/RTL overflow check (needs build:preview)
npm run i18n:check       # missing translations (0 today)
```

Node 18+ is required. Playwright is only needed for the tests.

## Put it in the dashboard

```html
<div id="mho-profile-tab" style="--mho-sticky-top: 64px"></div>
<script src="/mho-section/embed/mho-patient-section.js?v=2.0.0"></script>
<script>
  const section = MHOPatient.mount(document.getElementById('mho-profile-tab'), {
    assetBase: '/mho-section/',
    user: { firstName: 'Kunal', id: 'u_123', email: 'kunal@example.com' },
    view: 'all',                       // 'all' | 'profiles' | 'surveys'  → section.setView('surveys')
    apiBase: 'https://api.myhealthopinions.com',
    onRewards: ({ points, qualityScore, level }) => { /* update your own header */ },
  });
</script>
```

React dashboards can use `configureMHO(options)` + `<MHOPatientSection view="surveys" />` from `embed/mho-patient-section.react.js`. Full guide: **[docs/DASHBOARD_INTEGRATION.md](docs/DASHBOARD_INTEGRATION.md)**.

## Documents

| Document | For |
|---|---|
| [docs/DASHBOARD_INTEGRATION.md](docs/DASHBOARD_INTEGRATION.md) | Mounting, options, views/tabs, events, sticky offset, style isolation, CSP, sign-in/out |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Build, hosting (Nginx, Docker, Netlify, Vercel, S3/CDN), headers, go-live checklist, updates, rollback |
| [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md) | Payloads your backend receives (completions with reward, progress with points/Quality Score) |
| [docs/REWARDS_HEALTH_PULSE.md](docs/REWARDS_HEALTH_PULSE.md) | Points, Quality Score, levels, the delivery animation, scaling to 100+ items |
| [docs/PROFILES_AND_SURVEYS.md](docs/PROFILES_AND_SURVEYS.md) | Profiles vs surveys, lock rules, the three sections, the vault pop-up |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | What was removed, page structure, logo, backgrounds, per-item colours/animations/sounds, sound map, accessibility |
| [docs/LANGUAGES.md](docs/LANGUAGES.md) | 12 + 80 languages, auto-translation, currency/date formatting, adding languages |
| [docs/VALIDATION_RULES.md](docs/VALIDATION_RULES.md) | Every validation rule (name boxes, DOB, phone per country…) |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Question bank, branching, saved and exported answer shapes |
| [docs/DEVELOPER_HANDOVER.md](docs/DEVELOPER_HANDOVER.md) | Code map, how a completion flows through the code, conventions |
| [docs/QA_REPORT.md](docs/QA_REPORT.md) | What was tested, on which sizes, and the results |
| [docs/ALT_TEXT.md](docs/ALT_TEXT.md) | Alt text of the illustrations |
| [CHANGELOG.md](CHANGELOG.md) | What changed in each version |

## Configuration without rebuilding

`dist/config.js` (`window.MHO_CONFIG`) accepts the same options as `mount()`, including the reward amounts:
`rewards: { pointsPerProfile: 50, pointsPerSurvey: 50, qualityPerProfile: 1, qualityPerSurvey: 1, pointsPerUsd: 1000 }`.

The browser only displays rewards. **Your backend must award points and Quality Score once per item**; see the API guide.
