// Home-page community figures, survey categories and member testimonials — supplied by MyFrequentRewards.
// ⚠ Keep these TRUE and current. They are shown publicly as facts; consumer-protection rules (e.g. FTC rule on
//   fake reviews, India's CCPA online-review guidelines, EU UCPD) require figures and testimonials to be genuine
//   and verifiable. Update `asOf` whenever you change the numbers, or serve them live via VITE_STATS_URL.

export const STATS = {
  asOf: '2026-10',
  rewardsPaidUsd: 11840, // shown as "$11,840+"
  surveysCompletedThisMonth: 1325,
  monthlyAvailableSurveys: 37, // shown as "37+"
  membersRegistered: 26780,
};

// Optional live override: a JSON endpoint returning any of the keys above, e.g.
// { "rewardsPaidUsd": 12010, "surveysCompletedThisMonth": 1402, "asOf": "2026-11" }
export const STATS_URL = import.meta.env.VITE_STATS_URL || '';

// Typical survey categories with their usual reward and length. The exact reward and length of every survey
// is shown in its invitation before a member starts.
export const SURVEY_CATEGORIES = [
  { id: 'shopping', tag: 'Shopping', title: 'Shopping Habits', desc: 'Share your shopping preferences and experiences to help brands improve their products and services.', reward: 4, mins: 10, icon: 'gift', tone: '#FF8A00' },
  { id: 'tech', tag: 'Technology', title: 'Technology & Apps', desc: 'Tell us what you think about the latest apps, devices, and technology products.', reward: 6, mins: 15, icon: 'mobile', tone: '#2F6BFF' },
  { id: 'lifestyle', tag: 'Lifestyle', title: 'Food & Lifestyle', desc: 'Share your opinions about food, restaurants, brands, and everyday lifestyle choices.', reward: 5, mins: 12, icon: 'heart', tone: '#E8457A' },
  { id: 'travel', tag: 'Travel', title: 'Travel Experience', desc: 'Tell us about your travel preferences and experiences to help shape future services.', reward: 7, mins: 18, icon: 'globe', tone: '#14C9B5' },
  { id: 'entertainment', tag: 'Entertainment', title: 'Entertainment', desc: 'Share your views on movies, shows, games, and the entertainment you enjoy.', reward: 4, mins: 10, icon: 'star', tone: '#8B5CF6' },
  { id: 'consumer', tag: 'Consumer', title: 'Consumer Opinion', desc: 'Give your honest opinion about products and services and earn rewards for your participation.', reward: 6, mins: 14, icon: 'chat', tone: '#FFC233' },
];

// Member testimonials (as supplied; one duplicate entry removed). `iso` drives the flag.
export const TESTIMONIALS = [
  { name: 'Lucas', country: 'Brazil', iso: 'BR', text: 'I have tested a few paid survey websites and this is one of the better ones. The process is simple and I like getting surveys related to my interests.' },
  { name: 'Emily', country: 'United States', iso: 'US', text: 'I have tried several survey websites, but this one feels much more genuine. The surveys are easy to understand and payments are reliable.' },
  { name: 'Daniel', country: 'United Kingdom', iso: 'GB', text: 'Really good experience so far. I like that the surveys are relevant and I can earn something in my spare time. Payment process is simple.' },
  { name: 'Sophie', country: 'France', iso: 'FR', text: 'I was looking for a trustworthy paid survey platform and finally found one that actually works. The support team is also very helpful.' },
  { name: 'Maria', country: 'Spain', iso: 'ES', text: 'I joined just to try it and was pleasantly surprised. The survey invitations are regular and the overall website is easy to use.' },
  { name: 'Oliver', country: 'Germany', iso: 'DE', text: 'Good platform for earning a little extra through market research surveys. I especially appreciate the clear information about each survey.' },
  { name: 'Aisha', country: 'United Arab Emirates', iso: 'AE', text: 'The registration was quick and I started receiving survey opportunities without any difficulty. A useful way to earn during free time.' },
  { name: 'Ethan', country: 'Canada', iso: 'CA', text: 'I have had a positive experience with the platform. The surveys are simple, the website works smoothly, and rewards are clearly explained.' },
  { name: 'Giulia', country: 'Italy', iso: 'IT', text: 'Much better than many survey sites I have previously tried. I like the simple interface and the fact that the surveys are relevant to my profile.' },
  { name: 'Michael', country: 'South Africa', iso: 'ZA', text: 'A decent and reliable survey platform. I have completed several surveys and the experience has been quite smooth. Customer support is responsive too.' },
  { name: 'Priya', country: 'India', iso: 'IN', text: 'I joined mainly to earn in my spare time and have been happy with the experience. The survey instructions are clear and the platform is easy to navigate.' },
  { name: 'Nora', country: 'Netherlands', iso: 'NL', text: 'The website is simple, professional and easy to understand. I enjoy sharing my opinions through the surveys and earning rewards at the same time.' },
  { name: 'Kenji', country: 'Japan', iso: 'JP', text: 'A convenient platform for completing surveys in free time. The registration process was easy and I have had a good overall experience with the service.' },
  { name: 'Charoen', country: 'Thailand', iso: 'TH', text: 'Frankly say this is one of the best sites that offers real money. I was fed up with fake advertisements. Good work and support.' },
];
