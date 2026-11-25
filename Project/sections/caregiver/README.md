# MyHealthOpinions · Caregiver Dashboard — “My Profile” section (v2.0)

The caregiver **profile + survey area that lives inside the MyHealthOpinions dashboard**. When a caregiver logs in and
opens the *My Profile* tab, this section is what they see: a warm personal greeting, the **Circle of Care** reward
system, their **About You profiles**, the profiles still to finish, and the **caregiver surveys** that unseal one at a time.

> **Good evening, Kunal 👋 — Welcome back, *Kunal*. Your caregiver profile is taking shape.**

| | |
|---|---|
| **Profiles first** | The 7 *About You* items are **profiles** (Caregiving Role, Basic, Education & Care Skills, Professional, Technology & Digital Health, Survey & Reward Preferences, Social Media & Payouts). They are shown first and must be completed before anything else. |
| **Surveys, one at a time** | The other 5 items are **surveys** (Personal Health, Health Insurance, Food & Lifestyle, Sports & Fitness, Additional Details). They stay **sealed in black & white** — taped shut with a heart padlock — until every profile is done, then unseal **one by one**. Tapping a sealed survey opens the animated “care door” pop-up. |
| **Rewards** | Every completed profile or survey = **+50 Care Points and +1 Quality Score** (once; editing never adds more). Shown in the **Circle of Care** — a glass heart that fills with warm light as the Quality Score grows, surrounded by turning orbits of “care beads”, one per item, that scale to 100+ items — and in the header **Care Wallet**. |
| **Completion** | 12 different completion animations + the “care locket” reward (a heart locket swings open, a heart-coin +50 and a rosette star +1 rise out on a puff of petals). Back on the dashboard the bead blooms, a ripple of care leaves the heart and the coin and star fly into the wallet. Level-ups get a ribbon. |
| **Look & feel** | “Warm Embrace”: plum · coral · amber · rose on peach, a serif display face, arches, postcards with perforated stamps, silk-wave background with bokeh and floating 3D care objects. No white surfaces anywhere. Every profile has its own colour grade, texture, illustration, layout side, sound motif and completion animation. Animated MyHealthOpinions logo everywhere. Light + dark. **Completely different from the patient dashboard, with the same features.** |
| **DOB calendar** | An interactive date-of-birth picker: start with a 20-year page of years, then month, then day; arrow-key / Page / Home / End navigation, under-18 and future dates disabled, age shown instantly, works with touch, keyboard and screen readers, never clipped. |
| **Languages** | 12 languages, carried over from **MyFrequentRewards**: language picker with search, a silk-curtain colour sweep with the language’s greeting, signature melody and toast. |
| **Inputs** | Name in three boxes (first required, middle + last optional) · mobile number with country flag, name and calling code · incomes in the caregiver’s own currency (₹, $, €, ¥ …) · country flags · state flags · a unique emoji on every option · a sound on every click. |
| **Reminder e-mails** | Every 2 days to caregivers with unfinished items: “Your Circle of Care is waiting” with an animated Circle of Care banner, their Care Points / Quality Score, the keyring and one-tap postcards for the missing profiles (or the survey that is unsealed now). 12 languages. |

---

## 1. What is in this package

| Path | What it is |
|---|---|
| `preview/mho-caregiver-dashboard-preview.html` | **Open this first.** One self-contained file (double-click). Demo caregiver “Kunal”. |
| `dist-embed/` | **For your dashboard:** `mho-profile-section.js` + `.css` (scoped to `.mho-pp`), data, images, fonts, `example-dashboard.html`. Mount it into your *My Profile* tab with one call. |
| `dist/` | The same section as a stand-alone page (route or iframe option). |
| `src/` | Full React 19 source. |
| `server/` | Caregiver API + the 2-day reminder e-mail service (Node). `server/previews/` has the e-mail in 12 languages × 2 modes. |
| `emails/` | The reminder e-mail as ready-to-open HTML (English + Hindi, profile mode and survey mode). |
| `docs/` | Everything your developers need (see §6). |

## 2. Quick start

```bash
npm install                 # react, react-dom, esbuild (+ playwright for tests, optional)
npm run dev                 # http://localhost:5173  (add ?name=Kunal to see the greeting)
npm run build               # stand-alone page        → dist/
npm run build:embed         # dashboard embed bundle  → dist-embed/
npm run build:preview       # single-file preview     → preview/
```

Node.js 18+.

## 3. Put it in your dashboard (recommended)

```html
<link rel="stylesheet" href="/static/mho-profile/mho-profile-section.css">
<div id="mho-profile"></div>
<script src="/static/mho-profile/mho-profile-section.js"></script>
<script>
  MHOProfileSection.mount('#mho-profile', {
    assetBase: '/static/mho-profile/',
    user: { firstName: 'Kunal', respondentId: 'R-102938' },     // from your login session
    config: { apiBase: 'https://api.myhealthopinions.com' },
  });
</script>
```

Everything stays inside `#mho-profile` (styles are scoped, theme/language are set on the element, overlays and reward
flights render inside it). Your sidebar can link to `#profiles`, `#surveys` and `#rewards`.
Full guide: **[`docs/DASHBOARD_INTEGRATION.md`](docs/DASHBOARD_INTEGRATION.md)** (embed, iframe, route, SPA frameworks, auth, CSP).

## 4. Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with live reload |
| `npm run build` | Stand-alone production build → `dist/` (pre-rendered first screen, inlined critical CSS, service worker) |
| `npm run build:embed` | Dashboard bundle → `dist-embed/` (one JS + one scoped CSS + assets + example page) |
| `npm run build:preview` | `preview/mho-caregiver-dashboard-preview.html` (everything inlined) |
| `npm run build:all` | data → build → preview → embed |
| `npm run data` | Rebuilds `public/data/*` from `../question-bank/` (after the question bank changes) |
| `npm run i18n:v2` | Merges `scripts/i18n-v2/<lang>.json` into the 12 UI dictionaries |
| `npm run i18n:check` | Reports missing translations |
| `npm run test:flows` | Completes **every** profile and survey for 4 caregiver personas in a real browser (in the order the gate allows; uses the name boxes, the DOB calendar and the phone input) |
| `npm run test:extra` | Validation, “Other”, name boxes, DOB calendar (incl. keyboard), all 20 professional roles, editing keeps rewards |
| `npm run test:rewards` | Reward delivery (bead, coin, star, wallet), no double rewards, gating + care-door pop-ups, 150-item orbit layout |
| `npm run perf` | Lighthouse-style timing (FCP, LCP, TBT, CLS) for mobile and desktop |
| `cd server && npm run preview:emails` | Renders the reminder e-mail for all 12 languages |

Tests need Playwright: `npm i -D playwright && npx playwright install chromium`, then `npm run serve` in a second terminal.

## 5. Common changes

| I want to… | Do this |
|---|---|
| Change points / quality score per item | `public/config.js → rewards` (no rebuild) and `server/.env`. Your backend pays out. |
| Make another chapter count as a “profile” | `PROFILE_CHAPTERS` in `src/lib/rewards.js` (+ `server/templates/care-reminder.js`) and the `chapter` in `PROFILE_META` |
| Add a 13th (or 130th) profile / survey | Add it to the question bank and `PROFILE_META`, run `npm run data`. The Circle of Care adds a bead (and orbits) automatically; gating and e-mail pick it up too. See [`docs/REWARDS_AND_QUALITY_SCORE.md`](docs/REWARDS_AND_QUALITY_SCORE.md#scaling-to-100-items). |
| Change a profile’s colours / emoji / completion animation | `PROFILE_META` in `scripts/build-data.mjs`, then `npm run data` |
| Change care levels | `LEVELS` in `src/lib/rewards.js` (+ `lvl.*` strings, + `server/templates/care-reminder.js`) |
| Change the DOB rules (minimum age 18, max 110) | `DatePicker.jsx` props / `validate.js → dob` — see [`docs/DOB_CALENDAR.md`](docs/DOB_CALENDAR.md) |
| Change wording | `scripts/i18n-v2/<lang>.json` → `npm run i18n:v2` (or edit `src/i18n/<lang>.js` directly) |
| Change the greeting name source | `useUserName()` in `src/App.jsx` (mount option → config → `?name=` → the caregiver’s own answers) |
| Change e-mail wording / interval | `server/templates/care-reminder-strings.js`, `server/.env` |

## 6. Documentation

- [Developer handover — start here](docs/DEVELOPER_HANDOVER.md)
- [Dashboard integration (embed / iframe / route)](docs/DASHBOARD_INTEGRATION.md)
- [Profiles & surveys: the unlock rules](docs/PROFILES_AND_SURVEYS.md)
- [Rewards: Care Points, Quality Score, Circle of Care](docs/REWARDS_AND_QUALITY_SCORE.md)
- [Date-of-birth calendar](docs/DOB_CALENDAR.md)
- [Reminder e-mails](docs/REMINDER_EMAILS.md)
- [Design system: colours, type, animations, sounds](docs/DESIGN_SYSTEM.md)
- [Languages (MyFrequentRewards language system)](docs/I18N_AND_THEMES.md)
- [Inputs: names, phone, currency, flags](docs/INPUTS_AND_FLAGS.md)
- [Responsive behaviour & device testing](docs/RESPONSIVE_AND_DEVICES.md)
- [Backend / API](docs/API_INTEGRATION.md) · [Deployment](docs/DEPLOYMENT.md) · [Go-live checklist](docs/GO_LIVE_CHECKLIST.md) · [QA checklist](docs/QA_CHECKLIST.md)
- [Data model](docs/DATA_MODEL.md) · [Validation rules](docs/VALIDATION_RULES.md) · [Performance](docs/PERFORMANCE.md) · [Alt text](docs/ALT_TEXT.md) · [Changelog](CHANGELOG.md)
