/**
 * MyHealthOpinions · HCP "My Profile" section v3.0 — runtime configuration (no rebuild needed).
 * Every value is optional; delete a line to use the built-in default.
 */
window.MHO_CONFIG = Object.assign({
  /* the logged-in professional — shown in the hero greeting ("Welcome back, Kunal") and on the completion screen */
  user: { firstName: 'Kunal' },

  /* rewards per completed profile — awarded ONCE per profile (editing / re-submitting never adds more).
     The Quality Score is an accumulated number of points (5, 10, 15 …), not a percentage. */
  rewards: {
    pointsPerProfile: 70,
    qualityPerProfile: 5,
  },

  /* display order of the profiles (optional). Profiles not listed here follow in question-bank order,
     so new profiles appear automatically. Nothing is locked — every profile opens in any order. */
  order: ['basic', 'professional-category', 'professional', 'educational', 'experience', 'professional-address',
          'documents', 'social-media', 'technical', 'survey-participation', 'additional-details'],

  /* lang: 'en',   // force a language (otherwise ?lang= → saved choice → browser language) */
  /* apiBase: 'https://api.example.com',   // see docs/API_INTEGRATION.md */
}, window.MHO_CONFIG || {});
