// Per-page SEO definitions (single source of truth for <title>, meta description, canonical,
// keywords map, sitemap priority and JSON-LD type). Edit here — prerender, client navigation
// and sitemap.xml all read from this file. See SEO-KEYWORD-MAP.md for the keyword strategy.
//
// Rules: title 50–60 chars · description 140–160 chars · one primary keyword per page ·
// 3–8 secondary keywords used naturally in copy (never stuffed).

export const PAGES = {
  '/': {
    name: 'Home',
    title: 'Paid Surveys for Money | Get Paid for Your Health Opinion',
    description:
      'Join free to take paid surveys for money. Doctors, nurses, patients and caregivers make money from health surveys via PayPal, UPI and digital gift cards.',
    primary: 'paid surveys',
    secondary: ['surveys for money', 'online surveys for money', 'get paid for surveys', 'paid survey sites', 'surveys that pay money', 'earn money online without investment', 'paid health surveys', 'paid surveys for doctors'],
    changefreq: 'weekly',
    priority: '1.0',
    breadcrumb: false,
  },
  '/about-us': {
    name: 'About Us',
    title: 'About MyHealthOpinions | Healthcare Research Community',
    description:
      'MyHealthOpinions is a healthcare research community powered by Frequent Research. Learn who we are, how we protect members and why our paid surveys matter.',
    primary: 'healthcare research community',
    secondary: ['healthcare market research', 'medicine research', 'paid clinical research', 'clinical research organization', 'legit paid survey site', 'Frequent Research'],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/earn': {
    name: 'Earn',
    title: 'Earn Money Online With Surveys | Consumers & Professionals',
    description:
      'Earn money online without investment. Consumers, doctors, nurses, pharmacists and business professionals in 55 countries share opinions and get paid.',
    primary: 'earn money online',
    secondary: ['online earning without investment', 'make money from home', 'surveys to make money', 'earn money surveys', 'side hustle from home', 'work from home earn money without investment', 'paid medical research studies'],
    changefreq: 'monthly',
    priority: '0.9',
  },
  '/healthcare-professionals': {
    name: 'Healthcare Professionals',
    title: 'Paid Medical Surveys for Healthcare Professionals | MHO',
    description:
      'Paid medical surveys for healthcare professionals: doctors, nurses, pharmacists, allied health, lab, admin and support staff. 1,300+ roles, paid honoraria.',
    primary: 'paid medical surveys for healthcare professionals',
    secondary: ['paid surveys for doctors', 'paid surveys for nurses', 'surveys for pharmacists', 'healthcare professional surveys', 'medical market research panel', 'physician honorarium surveys'],
    changefreq: 'monthly',
    priority: '0.9',
    faqKey: 'hcp',
  },
  '/caregivers': {
    name: 'Caregivers',
    title: 'Paid Surveys for Caregivers | Share Your Caring Experience',
    description:
      'Paid surveys for caregivers: family carers, parents and home care aides share what caring is like in short, flexible studies, with cash and voucher rewards.',
    primary: 'paid surveys for caregivers',
    secondary: ['caregiver surveys', 'family caregiver research', 'surveys for carers', 'earn money from home as a caregiver', 'dementia caregiver survey'],
    changefreq: 'monthly',
    priority: '0.8',
    faqKey: 'caregiver',
  },
  '/patients': {
    name: 'Patients',
    title: 'Paid Surveys for Patients | Get Paid for Your Health Story',
    description:
      'Paid surveys for patients living with 195+ conditions across 20 therapy areas. No tests or clinic visits: share your experience by phone and get rewarded.',
    primary: 'paid surveys for patients',
    secondary: ['patient surveys', 'paid health surveys', 'paid medical research studies', 'chronic illness surveys', 'patient experience research'],
    changefreq: 'monthly',
    priority: '0.8',
    faqKey: 'patient',
  },
  '/how-it-works': {
    name: 'How It Works',
    title: 'How to Get Paid to Take Surveys | MyHealthOpinions Guide',
    description:
      'See how paid surveys work: join free, build your profile, get matched invitations, answer honestly and redeem rewards. A clear four-step guide for members.',
    primary: 'get paid to take surveys',
    secondary: ['get paid to do surveys', 'paid to do surveys', 'survey and get paid', 'take surveys for money', 'doing surveys for money', 'earn money through surveys', 'survey and earn money'],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/rewards': {
    name: 'Rewards',
    title: 'Paid Surveys for Cash: PayPal, UPI & Gift Card Rewards',
    description:
      'Earn cash for surveys and redeem your way: PayPal, Wire Transfer and Amazon Gift Cards worldwide, plus UPI in India. See how points and payouts work.',
    primary: 'paid surveys for cash',
    secondary: ['earn cash for surveys', 'surveys that pay money', 'surveys that pay via PayPal', 'surveys for amazon gift cards', 'UPI survey rewards', 'surveys to make cash'],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/trust-safety': {
    name: 'Trust & Safety',
    title: 'Legit Paid Survey Sites: How We Keep Members Safe | MHO',
    description:
      'Not all paid online survey sites are equal. See the 18 quality checks, identity verification and privacy promises that make MyHealthOpinions safe to join.',
    primary: 'legit paid survey sites',
    secondary: ['paid online survey sites', 'survey websites that pay', 'free money surveys', 'legit paid surveys', 'safe ways to make money online', 'survey data privacy'],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/blog': {
    name: 'Blogs',
    title: 'Make Money Online Blog: Paid Survey Tips & Guides | MHO',
    description:
      'Honest guides on paid surveys, earning money online without investment, healthcare surveys for professionals and how to spot survey scams. Updated often.',
    primary: 'make money online',
    secondary: ['ways to make money online', 'easy ways to make money online', 'online earning websites', 'paid survey tips', 'earn money online', 'side hustle from home'],
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/reviews': {
    name: 'Ratings & Reviews',
    title: 'MyHealthOpinions Reviews & Ratings | Real Member Scores',
    description:
      'MyHealthOpinions reviews and ratings from doctors, nurses, allied health staff, caregivers and patients, with full score breakdowns. Add your own rating today.',
    primary: 'MyHealthOpinions reviews',
    secondary: ['MyHealthOpinions ratings', 'paid surveys legit reviews', 'survey site reviews', 'healthcare survey reviews'],
    changefreq: 'weekly',
    priority: '0.7',
  },
  '/scan-and-connect': {
    name: 'Scan & Connect',
    title: 'Scan & Connect | MyHealthOpinions QR Codes & Social Links',
    description:
      'Scan MyHealthOpinions QR codes for every official channel, sister panels Turn2Opinion and MyFrequentRewards, Frequent Research and Sampledge, or tap to follow.',
    primary: 'MyHealthOpinions QR codes',
    secondary: ['MyHealthOpinions social media', 'Frequent Research panels', 'Turn2Opinion', 'MyFrequentRewards', 'Sampledge'],
    changefreq: 'monthly',
    priority: '0.6',
  },
  '/faq': {
    name: 'FAQ',
    title: 'Paid Surveys FAQ | Joining, Rewards & Payouts Answered',
    description:
      'Answers about joining MyHealthOpinions, survey invitations, screen-outs, reward points, PayPal and UPI payouts, profile updates, privacy and account deletion.',
    primary: 'paid surveys FAQ',
    secondary: ['how do paid surveys work', 'are paid surveys free', 'paid clinical studies near me', 'make money online fast', 'survey payout time'],
    changefreq: 'monthly',
    priority: '0.7',
    schema: 'FAQPage',
  },
  '/contact': {
    name: 'Contact',
    title: 'Contact MyHealthOpinions | 24/7 Chat, WhatsApp & Email',
    description:
      'Need help with surveys, rewards or your account? Reach MyHealthOpinions by live chat, WhatsApp, email or phone. Our support team is based in New Delhi.',
    primary: 'contact MyHealthOpinions',
    secondary: ['survey support', 'paid survey help', 'MyHealthOpinions WhatsApp'],
    changefreq: 'yearly',
    priority: '0.6',
    schema: 'ContactPage',
  },
  '/join': {
    name: 'Join Free',
    title: 'Join Free & Start Earning From Surveys | MyHealthOpinions',
    description:
      'Join free as a healthcare professional, caregiver or patient. Create your MyHealthOpinions account, verify your email and start earning from surveys.',
    primary: 'join free',
    secondary: ['join paid surveys free', 'free survey sign up', 'register for paid surveys'],
    changefreq: 'yearly',
    priority: '0.8',
  },
  '/login': {
    name: 'Log in',
    title: 'Member Log In | MyHealthOpinions Survey Dashboard Access',
    description:
      'Log in to your MyHealthOpinions account to see survey invitations, track reward points and redeem incentives through your preferred payment method.',
    primary: 'MyHealthOpinions login',
    secondary: [],
    changefreq: 'yearly',
    priority: '0.3',
    robots: 'noindex, follow',
    sitemap: false,
  },
  '/reset-password': {
    name: 'Reset password',
    title: 'Reset Your Password | MyHealthOpinions',
    description:
      'Confirm your email and create or reset your MyHealthOpinions password to finish setting up your account securely.',
    primary: 'MyHealthOpinions password',
    secondary: [],
    changefreq: 'yearly',
    priority: '0.1',
    robots: 'noindex, nofollow',
    sitemap: false,
  },
  '/complete-profile': {
    name: 'Complete your profile',
    title: 'Complete Your Profile | MyHealthOpinions',
    description:
      'Answer a few more questions so MyHealthOpinions can match you with the paid studies that suit you best.',
    primary: 'complete profile',
    secondary: [],
    changefreq: 'yearly',
    priority: '0.1',
    robots: 'noindex, nofollow',
    sitemap: false,
  },
  '/create-password': {
    name: 'Create password',
    title: 'Create Your Password | MyHealthOpinions',
    description:
      'Confirm your email and create or reset your MyHealthOpinions password to finish setting up your account securely.',
    primary: 'MyHealthOpinions password',
    secondary: [],
    changefreq: 'yearly',
    priority: '0.1',
    robots: 'noindex, nofollow',
    sitemap: false,
  },
  '/auth/password': {
    name: 'Create password',
    title: 'Create Your Password | MyHealthOpinions',
    description:
      'Confirm your email and create or reset your MyHealthOpinions password to finish setting up your account securely.',
    primary: 'MyHealthOpinions password',
    secondary: [],
    changefreq: 'yearly',
    priority: '0.1',
    robots: 'noindex, nofollow',
    sitemap: false,
  },
  '/privacy': {
    name: 'Privacy Policy',
    title: 'Privacy Policy | How MyHealthOpinions Protects Your Data',
    description:
      'Our privacy policy explains how MyHealthOpinions collects, uses, stores and protects personal information, your choices, and why we never sell your data.',
    primary: 'privacy policy',
    secondary: ['data protection', 'personal information'],
    changefreq: 'yearly',
    priority: '0.4',
  },
  '/gdpr': {
    name: 'GDPR Compliance',
    title: 'GDPR Compliant Market Research & Surveys | MyHealthOpinions',
    description:
      'GDPR compliant market research at MyHealthOpinions: consent before contact, purpose limitation, retention windows, your right to erasure and clear sharing.',
    primary: 'GDPR compliant market research',
    secondary: ['GDPR survey', 'right to erasure', 'research consent'],
    changefreq: 'yearly',
    priority: '0.4',
  },
  '/cookies': {
    name: 'Cookie Policy',
    title: 'Cookie Policy | Cookies We Use and Your Choices | MHO',
    description:
      'Our cookie policy lists every cookie MyHealthOpinions uses (essential, performance and analytics), what each does, how long it lasts and how to opt out.',
    primary: 'cookie policy',
    secondary: ['cookie preferences', 'analytics cookies'],
    changefreq: 'yearly',
    priority: '0.3',
  },
  '/terms': {
    name: 'Terms of Use',
    title: 'Terms of Use | MyHealthOpinions Member & Licence Terms',
    description:
      'The MyHealthOpinions terms of use: member registration, reward redemption, licence options, permitted use, ownership, warranties and liability limits.',
    primary: 'terms of use',
    secondary: ['survey terms', 'member agreement'],
    changefreq: 'yearly',
    priority: '0.3',
  },
  '/profiling': {
    name: 'Profiling & Quality Score',
    title: 'Profiling & Survey Quality Score | How Members Are Scored',
    description:
      'How MyHealthOpinions profiles members and scores response quality from 0 to 200 using bot checks, gate surveys, digital fingerprinting and manual review.',
    primary: 'survey quality score',
    secondary: ['respondent profiling', 'bot prevention', 'digital fingerprinting'],
    changefreq: 'yearly',
    priority: '0.5',
  },
  '/sitemap': {
    name: 'Sitemap',
    title: 'HTML Sitemap | Every MyHealthOpinions Page in One Place',
    description:
      'Our HTML sitemap lists every MyHealthOpinions page: earning guides, how paid surveys work, rewards, trust and safety, blog articles, support and legal.',
    primary: 'sitemap',
    secondary: [],
    changefreq: 'monthly',
    priority: '0.3',
  },
  '/404': {
    name: 'Page not found',
    title: 'Page Not Found (404) | MyHealthOpinions Paid Surveys',
    description: 'This page could not be found. Head back to the MyHealthOpinions home page, browse our paid survey guides or contact our support team for help.',
    robots: 'noindex, follow',
    sitemap: false,
  },
};

export const NAV = [
  { to: '/', label: 'Home' },
  {
    to: '/about-us',
    label: 'About Us',
    children: [
      { to: '/about-us', label: 'About MyHealthOpinions', icon: 'building', sub: 'Who we are, our certifications and reach', grade: 'about' },
      { to: '/reviews', label: 'Our Ratings & Reviews', icon: 'star', sub: 'Real scores from professionals, caregivers and patients', grade: 'reviews', rating: true },
      { to: '/scan-and-connect', label: 'Scan & Connect', icon: 'qr', sub: 'QR codes for our panels and social channels', grade: 'scan' },
    ],
  },
  {
    to: '/earn',
    label: 'Who It’s For',
    children: [
      { to: '/healthcare-professionals', label: 'Healthcare professionals', icon: 'stethoscope', sub: 'Doctors, nurses, pharmacy, lab, admin & support', grade: 'hcp' },
      { to: '/caregivers', label: 'Caregivers', icon: 'hands', sub: 'Family carers, parents & home care aides', grade: 'caregiver' },
      { to: '/patients', label: 'Patients', icon: 'heart', sub: '195+ conditions across 20 health areas', grade: 'patient' },
      { to: '/earn', label: 'Everyone else', icon: 'users', sub: 'Consumers & business professionals', grade: 'other' },
    ],
  },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/trust-safety', label: 'Trust & Safety' },
  { to: '/blog', label: 'Blogs', badge: 'Trending' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];
