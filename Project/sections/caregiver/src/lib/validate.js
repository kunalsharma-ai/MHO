/**
 * Validation rules for every open-ended question.
 * Each rule returns null (valid) or [messageKey, params?].
 * Message keys are translated in src/i18n/ui.js (section "err").
 */

const LETTERS = /\p{L}/gu;
const letterCount = (s) => (s.match(LETTERS) || []).length;
const hasUrl = (s) => /(https?:\/\/|www\.)\S+/i.test(s);
const hasEmail = (s) => /[\w.+-]+@[\w-]+\.[\w.]+/.test(s);
const hasPhone = (s) => /(\+?\d[\d\s().-]{7,}\d)/.test(s);
const spammy = (s) => /(.)\1{5,}/u.test(s) || /^(\p{L}{1,3})\1{3,}$/u.test(s.replace(/\s/g, ''));

export const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,24}$/;
const EMAIL_TYPOS = {
  'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'gmail.cm': 'gmail.com',
  'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'yahooo.com': 'yahoo.com',
  'outlok.com': 'outlook.com', 'outlook.co': 'outlook.com', 'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com', 'rediffmail.co': 'rediffmail.com',
};

/** Postal-code formats for the countries in the panel. Countries listed in NO_POSTCODE make the zipcode optional. */
const ZIP = {
  US: /^\d{5}(-\d{4})?$/, IN: /^[1-9]\d{5}$/, GB: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  AU: /^\d{4}$/, NZ: /^\d{4}$/, CN: /^\d{6}$/, SG: /^\d{6}$/, RU: /^\d{6}$/, RO: /^\d{6}$/, JP: /^\d{3}-?\d{4}$/, KR: /^\d{5}$/,
  BR: /^\d{5}-?\d{3}$/, NL: /^\d{4}\s?[A-Z]{2}$/i, PT: /^\d{4}-?\d{3}$/, PL: /^\d{2}-?\d{3}$/, SE: /^\d{3}\s?\d{2}$/, CZ: /^\d{3}\s?\d{2}$/, SK: /^\d{3}\s?\d{2}$/, GR: /^\d{3}\s?\d{2}$/,
  IE: /^[A-Z]\d[\dW]\s?[A-Z\d]{4}$/i, AR: /^([A-Z]\d{4}[A-Z]{3}|\d{4})$/i, CL: /^\d{7}$/, CO: /^\d{6}$/, PE: /^\d{5}$/, MX: /^\d{5}$/, DE: /^\d{5}$/, FR: /^\d{5}$/, IT: /^\d{5}$/, ES: /^\d{5}$/,
  FI: /^\d{5}$/, EE: /^\d{5}$/, HR: /^\d{5}$/, TR: /^\d{5}$/, UA: /^\d{5}$/, MY: /^\d{5}$/, TH: /^\d{5}$/, ID: /^\d{5}$/, PK: /^\d{5}$/, LK: /^\d{5}$/, NP: /^\d{5}$/, KH: /^\d{5}$/, MA: /^\d{5}$/, DZ: /^\d{5}$/,
  KE: /^\d{5}$/, EG: /^\d{5}$/, IQ: /^\d{5}$/, IR: /^\d{5}-?\d{5}$/, SA: /^\d{5}(-\d{4})?$/, KW: /^\d{5}$/, JO: /^\d{5}$/, IL: /^\d{7}$/, CR: /^\d{5}$/, DO: /^\d{5}$/, BA: /^\d{5}$/, AF: /^\d{4}$/,
  AT: /^\d{4}$/, BE: /^\d{4}$/, BG: /^\d{4}$/, CH: /^\d{4}$/, DK: /^\d{4}$/, HU: /^\d{4}$/, LU: /^(L-)?\d{4}$/i, NO: /^\d{4}$/, AL: /^\d{4}$/, CY: /^\d{4}$/, PH: /^\d{4}$/, BD: /^\d{4}$/, ZA: /^\d{4}$/, BH: /^\d{3,4}$/, OM: /^\d{3}$/, IS: /^\d{3}$/,
  VN: /^\d{6}$/, TW: /^\d{3}(\d{2,3})?$/, ET: /^\d{4}$/, NG: /^\d{6}$/, LY: /^\d{5}$/, MU: /^\d{5}$/,
};
export const NO_POSTCODE = new Set(['AE', 'AO', 'HK', 'QA', 'UG', 'ZW', 'GH', 'CM']);
const ZIP_EXAMPLE = { US: '10001', IN: '110001', GB: 'SW1A 1AA', CA: 'K1A 0B1', JP: '100-0001', BR: '01001-000', NL: '1012 AB', PT: '1000-001', PL: '00-001', IE: 'D02 X285' };
export const zipExample = (cc) => {
  if (ZIP_EXAMPLE[cc]) return ZIP_EXAMPLE[cc];
  const m = ZIP[cc] && ZIP[cc].source.match(/^\^\\d\{(\d)\}\$$/);
  return m ? '123456789'.slice(0, +m[1]) : '';
};

function ibanValid(raw) {
  const s = raw.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(s)) return false;
  const r = s.slice(4) + s.slice(0, 4);
  let mod = 0;
  for (const ch of r) {
    const v = ch >= 'A' ? String(ch.charCodeAt(0) - 55) : ch;
    for (const d of v) mod = (mod * 10 + +d) % 97;
  }
  return mod === 1;
}

export function ageFromDob(dob) {
  if (!dob) return null;
  const d = new Date(dob + 'T00:00:00');
  if (isNaN(d)) return null;
  const n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  const m = n.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < d.getDate())) a--;
  return a;
}

const intIn = (v, lo, hi) => {
  if (!/^\d+$/.test(String(v).trim())) return ['int'];
  const n = +v;
  if (n < lo || n > hi) return ['range', { min: lo, max: hi }];
  return null;
};
const urlish = (v, host) => new RegExp(`^(https?:\\/\\/)?(www\\.|m\\.)?${host}\\/`, 'i').test(v);

/**
 * @param {string} rule   rule name from caregiver.json
 * @param {string} value  raw input
 * @param {object} ctx    { answers, country }
 */
export function validate(rule, value, ctx = {}) {
  const v = String(value ?? '').trim();
  switch (rule) {
    case 'fullname':
      if (v.length < 2) return ['minChars', { n: 2 }];
      if (v.length > 80) return ['maxChars', { n: 80 }];
      if (/\d/.test(v)) return ['noDigits'];
      if (!/^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u.test(v)) return ['lettersOnly'];
      if (letterCount(v) < 2 || spammy(v)) return ['realName'];
      return null;
    case 'namepart': // middle / last name box (optional): letters only, an initial is fine
      if (v.length > 40) return ['maxChars', { n: 40 }];
      if (/\d/.test(v)) return ['noDigits'];
      if (!/^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u.test(v)) return ['lettersOnly'];
      return null;
    case 'nickname':
      if (v.length < 1) return ['required'];
      if (v.length > 40) return ['maxChars', { n: 40 }];
      if (!/^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u.test(v)) return ['lettersOnly'];
      return null;
    case 'dob': {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return ['date'];
      const a = ageFromDob(v);
      if (a === null) return ['date'];
      if (new Date(v) > new Date()) return ['future'];
      if (a < 18) return ['minAge', { n: 18 }];
      if (a > 110) return ['maxAge', { n: 110 }];
      return null;
    }
    case 'email':
    case 'altemail': {
      if (!EMAIL_RE.test(v) || v.includes('..')) return ['email'];
      const dom = v.split('@')[1].toLowerCase();
      if (EMAIL_TYPOS[dom]) return ['emailTypo', { fix: v.split('@')[0] + '@' + EMAIL_TYPOS[dom] }];
      if (rule === 'altemail' && ctx.answers?.mail?.v && ctx.answers.mail.v.toLowerCase() === v.toLowerCase()) return ['altSame'];
      return null;
    }
    case 'zip': {
      const cc = ctx.country;
      if (!v) return NO_POSTCODE.has(cc) ? null : ['required'];
      const re = ZIP[cc] || /^[A-Z0-9][A-Z0-9 -]{1,9}$/i;
      return re.test(v) ? null : ['zip', { ex: zipExample(cc) }];
    }
    case 'url':
      if (!v) return null;
      return /^(https?:\/\/)?([\p{L}\d-]+\.)+[\p{L}]{2,24}(:\d{2,5})?(\/\S*)?$/u.test(v) ? null : ['url'];
    case 'x':
      if (!v) return null;
      return /^@?[A-Za-z0-9_]{1,15}$/.test(v) || urlish(v, '(x|twitter)\\.com') ? null : ['handle', { ex: '@yourname' }];
    case 'instagram':
      if (!v) return null;
      return /^@?(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._]{1,30}$/.test(v) || urlish(v, 'instagram\\.com') ? null : ['handle', { ex: '@yourname' }];
    case 'youtube':
      if (!v) return null;
      return /^@?[A-Za-z0-9._-]{3,30}$/.test(v) || urlish(v, '(youtube\\.com|youtu\\.be)') ? null : ['handle', { ex: '@yourchannel' }];
    case 'linkedin':
      if (!v) return null;
      return /^[A-Za-z0-9-]{3,100}$/.test(v) || urlish(v, '([a-z]{2}\\.)?linkedin\\.com') ? null : ['handle', { ex: 'linkedin.com/in/yourname' }];
    case 'facebook':
      if (!v) return null;
      return /^[A-Za-z0-9.]{5,50}$/.test(v) || urlish(v, '(facebook|fb)\\.com') ? null : ['handle', { ex: 'facebook.com/yourname' }];
    case 'bankname':
      if (v.length < 2) return ['minChars', { n: 2 }];
      if (v.length > 80) return ['maxChars', { n: 80 }];
      if (letterCount(v) < 2 || !/^[\p{L}\p{M}0-9 &.,'’()\-]+$/u.test(v)) return ['bankname'];
      return null;
    case 'bankcode': {
      const s = v.replace(/\s+/g, '').toUpperCase();
      if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(s)) return null; // IFSC
      if (/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(s)) return null; // SWIFT/BIC
      if (ibanValid(s)) return null; // IBAN
      return ['bankcode'];
    }
    case 'account': {
      const s = v.replace(/[\s-]/g, '');
      if (/^\d{6,20}$/.test(s) || ibanValid(s)) return null;
      return ['account'];
    }
    case 'upi':
      return /^[A-Za-z0-9.\-_]{2,256}@[A-Za-z]{2,64}$/.test(v) ? null : ['upi'];
    case 'amazon':
      if (EMAIL_RE.test(v)) return null;
      if (/^\+?\d[\d\s-]{7,16}\d$/.test(v)) return null;
      return ['amazon'];
    case 'phone': {
      const s = v.replace(/[\s().-]/g, '');
      if (!/^\+?[1-9]\d{7,14}$/.test(s)) return ['phone'];
      if (/^(\+?\d)\1+$/.test(s) || /(\d)\1{7,}/.test(s)) return ['phone'];
      return null;
    }
    case 'jobtitle':
      if (v.length < 2) return ['minChars', { n: 2 }];
      if (v.length > 60) return ['maxChars', { n: 60 }];
      if (letterCount(v) < 2 || !/^[\p{L}\p{M}0-9 &/.,'’()+\-]+$/u.test(v) || spammy(v)) return ['jobtitle'];
      return null;
    case 'specify':
      if (v.length < 2) return ['minChars', { n: 2 }];
      if (v.length > 100) return ['maxChars', { n: 100 }];
      if (letterCount(v) < 2 || spammy(v)) return ['meaningful'];
      if (hasUrl(v)) return ['noLinks'];
      return null;
    case 'household':
      return intIn(v, 1, 30);
    case 'hoursWeek':
      return intIn(v, 0, 168);
    case 'caregivingYears': {
      const e = intIn(v, 0, 80);
      if (e) return e;
      const age = ageFromDob(ctx.answers?.dob?.v);
      if (age !== null && +v > Math.max(age - 5, 0)) return ['yearsVsAge', { age }];
      return null;
    }
    case 'about': {
      if (v.length < 30) return ['minChars', { n: 30 }];
      if (v.length > 600) return ['maxChars', { n: 600 }];
      if (v.split(/\s+/).filter(Boolean).length < 5) return ['minWords', { n: 5 }];
      if (letterCount(v) < 20 || spammy(v)) return ['meaningful'];
      if (hasUrl(v) || hasEmail(v) || hasPhone(v)) return ['noContact'];
      return null;
    }
    case 'wish':
      if (!v) return null;
      if (v.length < 5) return ['minChars', { n: 5 }];
      if (v.length > 400) return ['maxChars', { n: 400 }];
      if (letterCount(v) < 3 || spammy(v)) return ['meaningful'];
      if (hasUrl(v) || hasEmail(v) || hasPhone(v)) return ['noContact'];
      return null;
    default:
      return v ? null : ['required'];
  }
}
