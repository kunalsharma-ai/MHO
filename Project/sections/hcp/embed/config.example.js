/**
 * Every option of MHOProfileSection.mount(el, options) — copy what you need.   (v3.0)
 * (The stand-alone page reads the same `config` keys from public/config.js → window.MHO_CONFIG.)
 */
MHOProfileSection.mount('#mho-profile', {
  assetBase: '/mho-hcp/',              // URL of the dist-embed/ folder (data/, locales/, images/, fonts/ are loaded from here)
  lang: 'en',                          // optional: en zh hi es fr de ja ar pt ru ko it (default: saved choice → browser)
  routing: 'memory',                   // 'memory' (default, never touches your URL) | 'hash' (#/profile/<slug> deep links)
  user: {
    firstName: 'Kunal',                // hero greeting ("Welcome back, Kunal") + completion screen
    panelistId: 'P-1029',              // sent with every API call
  },
  config: {
    apiBase: 'https://api.example.com',   // POST /hcp/profile/:slug, /hcp/progress, /hcp/upload (see docs/API_INTEGRATION.md)
    rewards: { pointsPerProfile: 70, qualityPerProfile: 5 },   // awarded once per profile; QS is accumulated points
    order: ['basic', 'professional-category', 'professional', 'educational', 'experience', 'professional-address',
            'documents', 'social-media', 'technical', 'survey-participation', 'additional-details'],   // optional display order
  },
});
// later: MHOProfileSection.open('documents')  ·  MHOProfileSection.unmount()
