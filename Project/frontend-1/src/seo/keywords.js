// Search topics → the page that best answers them. Powers the "Popular searches" hubs (internal
// linking for SEO + an easy way for visitors to find answers). Labels are written the way people
// search (from the Ubersuggest / Google Ads keyword research in SEO-KEYWORD-MAP.md).
// heat: 3 = highest search demand, 1 = niche. Only link to pages that genuinely answer the query.
export const TOPIC_GROUPS = [
  { id: 'earn', label: 'Earn online', color: '#1e5bff' },
  { id: 'surveys', label: 'Paid surveys', color: '#f97316' },
  { id: 'health', label: 'Healthcare & clinical', color: '#14b8a6' },
  { id: 'payouts', label: 'Rewards & payouts', color: '#8b5cf6' },
  { id: 'safety', label: 'Safety & legit sites', color: '#e8344e' },
];

const T = (label, to, group, heat = 1) => ({ label, to, group, heat });

export const TOPICS = [
  T('Paid surveys for money', '/blog/paid-surveys-for-money-beginners-guide', 'surveys', 3),
  T('Online surveys for money', '/how-it-works', 'surveys', 3),
  T('Get paid to take surveys', '/blog/get-paid-to-take-surveys-from-home', 'surveys', 3),
  T('Surveys to make money', '/earn', 'surveys', 2),
  T('Earn money through surveys', '/blog/how-much-can-you-earn-from-paid-surveys', 'surveys', 2),
  T('High paying surveys', '/blog/high-paying-surveys-what-sets-the-reward', 'surveys', 1),
  T('Why you get screened out', '/blog/why-you-get-screened-out-of-surveys', 'surveys', 1),
  T('Get more survey invitations', '/blog/get-more-paid-survey-invitations', 'surveys', 1),
  T('Online focus groups that pay', '/blog/online-focus-groups-paid', 'surveys', 1),
  T('Earn money online without investment', '/blog/earn-money-online-without-investment', 'earn', 3),
  T('Legit ways to make money online', '/blog/legit-ways-to-make-money-online', 'earn', 3),
  T('Make money from home', '/blog/make-money-from-home-side-income-ideas', 'earn', 3),
  T('Make money from your phone', '/blog/make-money-from-your-phone-with-surveys', 'earn', 2),
  T('Online jobs for students without investment', '/blog/online-jobs-for-students-without-investment', 'earn', 2),
  T('Extra income from home', '/blog/extra-income-from-home-for-retirees-and-homemakers', 'earn', 1),
  T('Paid online market research', '/blog/paid-online-market-research-explained', 'earn', 1),
  T('Paid surveys for doctors', '/blog/paid-surveys-for-doctors', 'health', 2),
  T('Paid surveys for nurses', '/blog/paid-surveys-for-nurses', 'health', 2),
  T('Side hustle for healthcare workers', '/blog/side-hustle-for-healthcare-workers', 'health', 1),
  T('Extra income for pharmacists', '/blog/extra-income-ideas-for-pharmacists', 'health', 1),
  T('Caregiver surveys that pay', '/blog/caregiver-surveys-get-paid-for-your-opinion', 'health', 1),
  T('Paid health surveys for patients', '/blog/paid-health-surveys-for-patients', 'health', 2),
  T('Paid clinical studies near me', '/blog/paid-clinical-studies-vs-paid-surveys', 'health', 3),
  T('Clinical research organization', '/blog/what-is-a-clinical-research-organization', 'health', 2),
  T('Randomised clinical trials', '/blog/randomised-clinical-trials-explained', 'health', 2),
  T('Surveys that pay via PayPal', '/blog/surveys-that-pay-via-paypal', 'payouts', 2),
  T('Surveys for Amazon gift cards', '/blog/surveys-for-amazon-gift-cards', 'payouts', 2),
  T('UPI survey rewards in India', '/blog/upi-survey-rewards-earn-online-india', 'payouts', 2),
  T('Paid surveys for cash', '/rewards', 'payouts', 3),
  T('Surveys that pay instantly?', '/blog/surveys-that-pay-instantly-truth', 'payouts', 1),
  T('Best paid survey sites', '/blog/best-paid-survey-sites-checklist', 'safety', 3),
  T('Are surveys for money legit?', '/blog/are-online-surveys-for-money-legit', 'safety', 3),
  T('Legit paid survey sites', '/trust-safety', 'safety', 2),
  T('Survey privacy & GDPR', '/blog/survey-privacy-and-gdpr', 'safety', 1),
];

export const topicsFor = (groups) => TOPICS.filter((t) => groups.includes(t.group));
