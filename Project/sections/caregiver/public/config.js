/**
 * Runtime configuration – edit on the server WITHOUT rebuilding the app.
 *
 * apiBase     Backend base URL. Leave '' to keep answers only in the browser.
 * submitPath  Path for a profile submission. {profile} is replaced by the profile id.
 *             Body: { profile, respondentId, language, completedAt|updatedAt, answers }
 * progressPath  Rewards & reminder e-mails: chapters done / still open are POSTed here
 *             whenever they change. Body: { respondentId, email, name, language, completed, pending, points, usd, at }
 *             (see server/ for the reminder service that e-mails open chapters every 2 days)
 * headers     Extra request headers (e.g. an API key for a public endpoint).
 * links       Footer links.
 * disableSW   true = do not register the service worker.
 *
 * ── v2.0 dashboard ──
 * user        The logged-in caregiver. Your dashboard fills this in (or pass it to MHOProfileSection.mount()).
 *             firstName is used in the greeting ("Good afternoon, Kunal") and in the Circle of Care.
 * rewards     Points and Quality Score per completed profile / survey and the display exchange rate.
 *             Payouts must always be calculated on your backend.
 */
window.MHO_CONFIG = {
  apiBase: '',
  submitPath: '/caregiver/profiles/{profile}',
  progressPath: '/caregiver/progress',
  headers: {},
  links: {
    privacy: 'https://www.myhealthopinions.com/privacy-policy',
    terms: 'https://www.myhealthopinions.com/terms-and-conditions',
    help: 'mailto:support@myhealthopinions.com',
  },
  disableSW: false,
  user: { firstName: '', respondentId: '' },
  rewards: {
    pointsPerProfile: 50,
    qualityPerProfile: 1,
    pointsPerSurvey: 50,
    qualityPerSurvey: 1,
    pointsPerUsd: 1000,
  },
};
