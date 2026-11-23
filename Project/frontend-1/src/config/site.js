// Central site configuration. Deployment values come from VITE_* variables in .env files (see .env.example
// and src/config/env.js). Everything here ends up in the public JS bundle — never place secrets in it.
import { env, PREVIEW_FORMS as PREVIEW, PREVIEW_ACCOUNT as PREVIEW_ACC } from './env.js';

export const SITE_URL = env('SITE_URL', 'https://www.myhealthopinions.com').replace(/\/+$/, '');

// X (Twitter) profile: footer link, schema sameAs and twitter:site. Override with VITE_X_URL ("off" hides it).
const X_URL = env('X_URL', 'https://x.com/MHO_Community').replace(/^off$/i, '').replace(/\/+$/, '');
const X_HANDLE = X_URL ? '@' + X_URL.split('/').pop() : '';

export const SITE = {
  name: 'MyHealthOpinions',
  legalName: 'Frequent Research Fieldwork Solutions Pvt. Ltd.',
  tagline: 'Your health experience is worth something.',
  email: 'support@myhealthopinions.com',
  phoneDisplay: '+91 81300 15743',
  phoneHref: '+918130015743',
  whatsappNumber: '918178200573',
  whatsappDisplay: '+91 81782 00573',
  address: ['Mangolpur Kalan', 'New Delhi – 110085', 'India'],
  foundingYear: 2017,
  socials: [
    { id: 'facebook', label: 'Facebook', handle: '@myhealthopinions', url: 'https://www.facebook.com/myhealthopinions/' },
    { id: 'linkedin', label: 'LinkedIn', handle: 'MyHealthOpinions', url: 'https://www.linkedin.com/company/myhealthopinions/' },
    { id: 'youtube', label: 'YouTube', handle: '@MyHealthOpinions', url: 'https://www.youtube.com/@MyHealthOpinions' },
    { id: 'instagram', label: 'Instagram', handle: '@myhealthopinions', url: 'https://www.instagram.com/myhealthopinions/' },
    ...(X_URL ? [{ id: 'xsocial', label: 'X', handle: X_HANDLE, url: X_URL }] : []),
  ],
  xHandle: X_HANDLE,
};

export const whatsappLink = (text = 'Hi MyHealthOpinions team, I have a question.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Backend endpoints. They are served by the hosting backend, NOT by this repository.
export const API = {
  enquiry: env('ENQUIRY_URL', '/api/enquiry'),
  contact: env('CONTACT_URL', '/api/v1/contact'), // Contact page form: POST { name, email, phone, topic, message, source }
  // Account endpoints of the working backend (same ones web-1 uses). They are same-origin: the backend
  // identifies the site by the Host header, so this site and /api/v1 must be served from one domain.
  register: env('REGISTER_URL', '/api/v1/user'), // PUT = create account (+ verification email); PATCH = set password; POST /:id = verify link
  // Secure account flow (backend routes/api/Account.js): register, verify link, set/reset password, login, CAPTCHA, location.
  account: env('ACCOUNT_URL', '/api/v1/account'),
  journey: env('JOURNEY_URL', '/api/v1/me/journey'), // GET → { next, nextUrl, consent, emailVerified } where the member goes next
  login: env('LOGIN_URL', '/api/v1/user/login'), // POST { mail, password, remember } → { status, token }
  resend: env('RESEND_URL', '/api/v1/user'), // POST { mail } → re-sends the verification email
  forgot: env('FORGOT_URL', '/api/v1/forgot-password'), // POST { user: <email> } → reset link by email
  category: env('CATEGORY_URL', '/api/v1/category'), // POST { showOnRegistration: true } → categories + age rules
  socials: env('SOCIALS_URL', '/api/v1/auth/socials'), // POST {} → { data: [{ name, authUrl }] } the social log-in providers (Google, LinkedIn, X ...)
  emailValidate: env('EMAIL_VALIDATE_URL', '/api/v1/validator/email'), // POST { email } → { valid } (does the e-mail domain accept mail?)
  emailExists: env('EMAIL_EXISTS_URL', '/api/v1/user/check'), // POST { mail } → { data: <number of accounts with this e-mail> }
  me: env('ME_URL', '/api/v1/me'), // POST { questions: [...] } → the person's current answers (needs the login token)
  meAnswer: env('ME_ANSWER_URL', '/api/v1/me/answer'), // PATCH { '<question>': value } → saves answers (needs the login token)
  country: env('COUNTRY_URL', '/api/v1/get-country'), // GET → { country: 'IN', ... } the visitor's country from the IP address (same call web-1 makes)
  testimonial: env('TESTIMONIAL_URL', '/api/v1/testimonial'), // PUT { rate, message } (logged-in member) · GET approved reviews
  // JSON feed of real, consented, recent reward redemptions (see README → "Reward activity feed").
  rewardFeed: env('REWARD_FEED_URL', ''),
};

export const ANALYTICS = {
  ga4: env('GA4_ID', ''),
  // Meta (Facebook) Pixel. Loaded only after the visitor allows analytics cookies, like GA4.
  // Override with VITE_FB_PIXEL_ID, or set it to "off" to disable.
  fbPixel: env('FB_PIXEL_ID', '2241850863212660').replace(/^off$/i, ''),
};

// Minimum participant age enforced in the sign-up form (server must enforce it too).
export const MIN_AGE = Number(env('MIN_AGE', 18)) // Kunal 2026-11-23: new sign-ups are 18+ only;

// true only for `npm run dev` and the single-file review preview: forms simulate a successful
// submission locally instead of calling the backend. Always false in production builds.
export const PREVIEW_FORMS = PREVIEW;
export const PREVIEW_ACCOUNT = PREVIEW_ACC;
