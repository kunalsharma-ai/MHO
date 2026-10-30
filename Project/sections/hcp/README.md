# MyHealthOpinions — Healthcare Professionals · “My Profile” section v3.0 (“Clinical Genome”)

The **My Profile** section of the HCP dashboard: a fast, multilingual React section where doctors, nurses, pharmacists
and allied-health professionals complete their **profiles** (in any order — nothing is locked) and earn
**70 Reward Points + 5 Quality Score** for every profile they complete.

v3.0 is a complete visual redesign of v2.0 that keeps **every working feature** (question bank, validation, lazy
country/state/city lists, file upload, edit/review, deep links, 12 languages, RTL, light/dark, per-language sounds,
prerender, dashboard embed, API adapter, reminder service) and replaces the reward experience, the hero, the cards,
the question flow and the completion screen.

| | |
|---|---|
| **Stack** | React 19 · plain CSS · Canvas 2D + Web Animations · Web Audio (no audio files) · esbuild (Vite config kept) |
| **Ships as** | **dashboard embed** (`dist-embed/`, `MHOProfileSection.mount()`) · stand-alone page (`dist/`) · single-file preview |
| **Fonts** | Manrope (headings + numbers, 600–700) · Inter (body 400–500, buttons / navigation 500–600) — self-hosted |
| **Languages** | English, 简体中文, हिन्दी, Español, Français, Deutsch, 日本語, العربية (RTL), Português, Русский, 한국어, Italiano |
| **Look** | bio-luminescent colour fields + 8 floating 3D medical objects; dark lab panels; **every profile has its own palette, texture, art, sound and completion show** — no white surface anywhere |
| **Hero** | compact; the v2 HoloScan globe kept; new greeting animation “Welcome back, **Kunal**” (letters drop in, a heartbeat line writes under the name) with a warm, progress-aware line |
| **Rewards** | **Clinical Genome** — a turning 3D DNA helix, one gene (rung) per profile; read-outs, milestones, chromosome map; scales to 100+ profiles |
| **Header** | animated logo · Reward Points capsule · Quality Score heartbeat · profile ring — the +70 / +5 tokens fly in and the digits roll |
| **Inputs** | 3 name boxes · inline DOB calendar (year first) · phone with flag · country · code · country & state flags · currency flag + name + symbol + code on income questions · a meaningful emoji on every option |

## Quick start

```bash
npm install
npm run build:all          # i18n merge → dist/ → dist-embed/ → preview/mho-hcp-preview.html
npm run serve              # dist/ on :4173      ·  npm run serve:embed  → dist-embed/ on :4174
```

Tests (Playwright, against the served builds — see [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md)):

```bash
npm run test:e2e        # completes all 11 profiles through the UI like a real user, at 1366×800 and 390×844
npm run test:extra      # 51 focused checks: rewards maths, no locks, name/DOB/phone/flags/currency, i18n, RTL, flights, responsive, embed
npm run test:paths      # every question-bank branch is finishable
npm run check:locales   # every language covers every key
```

## Put it in your dashboard

```html
<link rel="stylesheet" href="/mho-hcp/mho-hcp-section.css">
<div id="mho-profile"></div>
<script src="/mho-hcp/mho-hcp-section.js"></script>
<script>
  MHOProfileSection.mount('#mho-profile', {
    assetBase: '/mho-hcp/',
    user: { firstName: 'Kunal', panelistId: 'P-1029' },
    config: { apiBase: 'https://api.example.com', rewards: { pointsPerProfile: 70, qualityPerProfile: 5 } },
  });
</script>
```

Every rule is scoped to `.mho-hcp`; theme, language, direction and palette live on the mount element. Full guide:
[`docs/DASHBOARD_INTEGRATION.md`](docs/DASHBOARD_INTEGRATION.md). Demo page: `dist-embed/example-dashboard.html`.

## Runtime configuration (no rebuild)

`public/config.js` (stand-alone) or the `config` mount option (embed):

```js
window.MHO_CONFIG = {
  user: { firstName: 'Kunal' },
  rewards: { pointsPerProfile: 70, qualityPerProfile: 5 },   // once per profile; QS = accumulated points
  order: ['basic', 'professional-category', …],              // optional display order; new profiles appear automatically
  apiBase: 'https://api.example.com',
};
```

## Folder map

```
src/
  main.jsx · embed.jsx      stand-alone entry (hydrates the pre-render) · dashboard entry (MHOProfileSection.mount)
  App.jsx                   section shell: header → hero → Clinical Genome → profiles → footer, overlays, language/theme/sound
  store.jsx                 answers, completed, seen (rewards delivered), started, theme, language, sound + localStorage
  i18n/                     languages.js (12 palettes + sounds) · en.js · v2/ + v3/<code>.json (UI strings) · index.jsx
  data/                     hcp.generated.json (question bank) · profileMeta.js (palette, texture, emoji, fx per profile) · altText.js
  lib/
    rewards.js              70 + 5 per profile, totals, progress, milestones, chromosome grouping (pure, tested)
    patterns.js             per-profile SVG textures          · celebrate.js  completion → genome hand-off
    tokenflight.js          capsule (+70) and heartbeat (+5) flights, bursts, floating labels
    engine.js · validation.js · display.js · geo.js (currencies) · phone-meta.js · stateFlags.js · optionEmoji.js · keywordEmoji.js
    sound.js · api.js · storage.js · loader.js · theme.js · asset.js · router.js · host.js
  components/
    TopBar · Brand (animated logo) · BgFx · Hero · Genome (rewards) · Profiles (cards) · LanguagePicker · LangWipe · Toasts
    Wizard (+ FlowBar) · Fields · DatePicker · Completion (+ fx.js) · Review · Footer · RollNumber · CountUp · ErrorBoundary · Flag
  styles/hcp.css            the whole design system (tokens, light/dark, RTL, responsive, reduced motion)
public/                     config.js · data/ · locales/ · images/ · fonts/ (Manrope + Inter)
server/                     reference API + 2-day reminder e-mail (v3 copy: +70 pts · +5 QS)
scripts/                    build-esbuild.mjs · build-embed.mjs · scope-css.mjs · prerender.mjs · merge-ui-v3.mjs · check_locales.mjs
tests/                      e2e-human.mjs · test-extra.mjs · paths.test.mjs
docs/                       developer documentation (start with DEVELOPER_HANDOVER.md)
```

## Documentation

| | |
|---|---|
| [DEVELOPER_HANDOVER](docs/DEVELOPER_HANDOVER.md) | **start here**: architecture, data flow, where to change what |
| [MIGRATION_V2_TO_V3](docs/MIGRATION_V2_TO_V3.md) | what changed, what was removed, saved-progress compatibility, backend changes |
| [REWARDS_AND_QUALITY_SCORE](docs/REWARDS_AND_QUALITY_SCORE.md) | 70 + 5 rules, Clinical Genome, delivery animation, no double rewards, scaling to 100+ |
| [DESIGN_SYSTEM](docs/DESIGN_SYSTEM.md) | “Clinical Genome”: tokens, fonts, per-profile identities, motion, sound |
| [PROFILES](docs/PROFILES.md) | profile cards, order, filter, adding a profile |
| [INPUTS_AND_FLAGS](docs/INPUTS_AND_FLAGS.md) · [DOB_CALENDAR](docs/DOB_CALENDAR.md) | name boxes, phone, flags, currency, option emoji · the calendar |
| [I18N_AND_THEMES](docs/I18N_AND_THEMES.md) | languages, palettes, adding strings, RTL |
| [DASHBOARD_INTEGRATION](docs/DASHBOARD_INTEGRATION.md) · [API_INTEGRATION](docs/API_INTEGRATION.md) | embed + mount options · backend endpoints |
| [REMINDER_EMAILS](docs/REMINDER_EMAILS.md) | 2-day reminder e-mail |
| [RESPONSIVE_AND_DEVICES](docs/RESPONSIVE_AND_DEVICES.md) · [ACCESSIBILITY](docs/ACCESSIBILITY.md) · [PERFORMANCE](docs/PERFORMANCE.md) | breakpoints and tested sizes · a11y · speed |
| [BUG_FIXES](docs/BUG_FIXES.md) · [QA_CHECKLIST](docs/QA_CHECKLIST.md) · [GO_LIVE_CHECKLIST](docs/GO_LIVE_CHECKLIST.md) | fixed glitches · tests · launch |
| [DEPLOYMENT](docs/DEPLOYMENT.md) · [CUSTOMIZATION](docs/CUSTOMIZATION.md) · [DATA](docs/DATA.md) · [ALT_TEXT](docs/ALT_TEXT.md) | hosting · quick changes · question bank · image alt text |
