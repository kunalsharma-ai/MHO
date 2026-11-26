/**
 * MyHealthOpinions patient dashboard section — runtime configuration.
 * Edit on the server WITHOUT rebuilding. Anything here can also be passed to
 * mountMHOPatient(el, options) by the dashboard (options passed there win).
 *
 * apiBase        Backend base URL. '' = answers stay only in the browser (demo mode).
 * submitPath     POST for a finished profile / survey. {profile} is replaced by its id.
 *                Body: { profile, kind: 'profile'|'survey', reward: { pts, qs }, respondentId, language,
 *                        completedAt | updatedAt, answers }
 * progressPath   POST whenever completions change: { respondentId, email, name, language, completed,
 *                completedProfiles, completedSurveys, points, qualityScore, level, usd, at }
 * headers        Extra request headers (e.g. { Authorization: 'Bearer …' }).
 * credentials    fetch credentials mode: 'omit' | 'same-origin' | 'include' (send dashboard cookies).
 * assetBase      Where images/, fonts/ and data/ are served from ('' = same folder as the page).
 * user           Signed-in patient: firstName shown in the greeting; id keeps each user's answers separate.
 * view           'all' (profiles + surveys) | 'profiles' | 'surveys'.
 * theme          'auto' | 'light' | 'dark' (patients can still switch; their choice is remembered).
 * sound          Default sound state for first-time visitors (true = on).
 * unlock         'sequential' (surveys open one at a time after the profiles) | 'all'.
 * rewards        Points and Quality Score per completed item, and the exchange rate.
 * translateEndpoint  Optional translation API for the 80 auto-translated languages
 *                POST { source: 'en', target, q: [...] } → { translations: [...] }.
 * useBrowserTranslator  Use Chrome's on-device translator when no endpoint is set.
 * noGoogleFonts  true = do not load Manrope from Google Fonts (strict CSP); a local fallback is used.
 */
window.MHO_CONFIG = {
  apiBase: '',
  submitPath: '/patient/profiles/{profile}',
  progressPath: '/patient/progress',
  headers: {},
  credentials: 'omit',
  assetBase: '',
  user: { firstName: '', id: '', email: '' },
  view: 'all',
  theme: 'auto',
  sound: true,
  unlock: 'sequential',
  rewards: { pointsPerProfile: 50, pointsPerSurvey: 50, qualityPerProfile: 1, qualityPerSurvey: 1, pointsPerUsd: 1000 },
  translateEndpoint: '',
  useBrowserTranslator: true,
  noGoogleFonts: false,
};
