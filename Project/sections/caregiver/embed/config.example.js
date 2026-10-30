/**
 * MHOProfileSection.mount(element, options) — every option.
 * Copy what you need into your dashboard page. Nothing here is required except assetBase when the
 * dist-embed/ folder is not served from the same folder as the page.
 */
MHOProfileSection.mount('#mho-profile', {
  // URL of the folder that holds mho-profile-section.js / data / images / fonts (trailing slash optional)
  assetBase: '/static/mho-profile/',

  // the logged-in caregiver (greeting, Circle of Care, reminder e-mails, submissions)
  user: { firstName: 'Kunal', respondentId: 'R-102938' },

  // 'en' 'zh' 'es' 'hi' 'ar' 'fr' 'de' 'pt' 'ja' 'ko' 'ru' 'it' — omit to use the saved choice / browser language
  lang: 'en',

  // anything from public/config.js
  config: {
    apiBase: 'https://api.myhealthopinions.com',      // '' = answers stay in the browser only
    submitPath: '/caregiver/profiles/{profile}',
    progressPath: '/caregiver/progress',                // turns on the 2-day reminder e-mails (server/)
    headers: { Authorization: 'Bearer <session token>' },
    credentials: 'include',                           // send dashboard cookies with API calls
    rewards: { pointsPerProfile: 50, qualityPerProfile: 1, pointsPerSurvey: 50, qualityPerSurvey: 1, pointsPerUsd: 1000 },
    links: { privacy: 'https://www.myhealthopinions.com/privacy-policy', terms: 'https://www.myhealthopinions.com/terms-and-conditions', help: 'mailto:support@myhealthopinions.com' },
  },
});
