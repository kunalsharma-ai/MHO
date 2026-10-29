import { PHONE } from './phone-meta.js';
import { ZIP, NO_ZIP } from './geo.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i;
const HANDLE = /^@?[A-Za-z0-9._]{2,30}$/;
const LICENSE = /^[A-Za-z0-9/\- ]+$/;
const IFSC = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const SWIFT = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
const IBAN = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
const UPI = /^[\w.-]{2,256}@[A-Za-z][A-Za-z0-9]{1,63}$/;
const FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];

export const isOtherSelected = (q, value) => {
  if (!q.options) return false;
  const vals = Array.isArray(value) ? value : [value];
  return q.options.some((o) => o.other && vals.includes(o.v));
};

const empty = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)
  || (typeof v === 'object' && !Array.isArray(v) && 'num' in v && !String(v.num || '').trim());

/**
 * @returns {null | {key: string, vars?: object}} translation key for the error
 * ctx: { answers (merged lookup fn get(name)), otherText, countryName }
 */
export function validate(q, value, ctx = {}) {
  const get = ctx.get || (() => undefined);
  const nowYear = new Date().getFullYear();
  const country = q.countryFrom ? get(q.countryFrom) : undefined;
  const optional = q.optional || (q.rule === 'zip' && country && NO_ZIP.has(country));

  if (value && typeof value === 'object' && value.__masked) return null; // saved earlier, kept server-side
  if (empty(value)) return optional ? null : { key: 'errRequired' };

  // choice questions
  if (q.type === 'single' || q.type === 'select' || q.type === 'multi' || q.type === 'country' || q.type === 'combo') {
    if (q.type === 'multi' && q.max && value.length > q.max) return { key: 'errMaxSelect', vars: { n: q.max } };
    if (isOtherSelected(q, value)) {
      const s = String(ctx.otherText || '').trim();
      if (s.length < 2) return { key: 'errSpecify' };
      if (s.length > 120) return { key: 'errMax', vars: { n: 120 } };
    }
    if (q.type === 'combo' && typeof value === 'string' && value.trim().length < 2) return { key: 'errMin', vars: { n: 2 } };
    return null;
  }

  const s = typeof value === 'string' ? value.trim() : value;
  const lenCheck = () => {
    if (q.min && String(s).length < q.min) return { key: 'errMin', vars: { n: q.min } };
    if (q.max && String(s).length > q.max) return { key: 'errMax', vars: { n: q.max } };
    return null;
  };

  switch (q.rule) {
    case 'name':
      if (!NAME.test(s)) return { key: 'errName' };
      return lenCheck();
    case 'email':
      return EMAIL.test(s) && s.length <= 254 ? null : { key: 'errEmail' };
    case 'dob': {
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return { key: 'errDate' };
      const age = ageFrom(s);
      if (age < (q.minAge ?? 18) || age > (q.maxAge ?? 100)) return { key: 'errAge', vars: { min: q.minAge ?? 18, max: q.maxAge ?? 100 } };
      return null;
    }
    case 'zip': {
      const re = ZIP[country];
      if (re) return re.test(s) ? null : { key: 'errZip', vars: { country: ctx.countryName || country } };
      return /^[A-Za-z0-9 -]{3,10}$/.test(s) ? null : { key: 'errZipGeneric' };
    }
    case 'phone': {
      let digits = String(value.num || '').replace(/\D/g, '');
      const meta = value.cc && PHONE[value.cc];
      if (meta) {
        if (digits.length === meta.max + 1 && digits[0] === '0') digits = digits.slice(1); // national trunk prefix
        if (digits.length < meta.min || digits.length > meta.max) return { key: 'errPhoneLen', vars: { n: meta.min === meta.max ? String(meta.min) : `${meta.min}–${meta.max}` } };
        if (meta.pattern && !meta.pattern.test(digits)) return { key: 'errPhone' };
        return null;
      }
      return digits.length >= 6 && digits.length <= 15 ? null : { key: 'errPhone' };
    }
    case 'url':
      return URL_RE.test(s) ? null : { key: 'errUrl' };
    case 'linkedinCompany':
    case 'linkedinPerson':
      return /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/(company|in|school|showcase)\/[^\s/]{2,}/i.test(s) ? null : { key: 'errLinkedin' };
    case 'handle':
      return HANDLE.test(s) ? null : { key: 'errHandle' };
    case 'handleOrUrl':
      return HANDLE.test(s) || URL_RE.test(s) ? null : { key: 'errHandle' };
    case 'license':
      if (!LICENSE.test(s) || !/\d/.test(s)) return { key: 'errLicense' };
      return lenCheck() ? { key: 'errLicense' } : null;
    case 'org':
      if (String(s).length < (q.min || 2) || !/\p{L}/u.test(s)) return { key: 'errOrg', vars: { n: q.min || 2 } };
      return lenCheck();
    case 'address':
      if (String(s).length < (q.min || 3) || !/[\p{L}\d]/u.test(s)) return { key: 'errAddress', vars: { n: q.min || 3 } };
      return lenCheck();
    case 'freetext':
      if (!/[\p{L}\d]/u.test(s)) return { key: 'errMin', vars: { n: q.min || 2 } };
      return lenCheck();
    case 'year': {
      const y = Number(s);
      const min = q.minYear || 1950;
      if (!Number.isInteger(y) || y < min || y > nowYear) return { key: 'errYear', vars: { min, max: nowYear } };
      const dob = get('dob');
      const gap = q.afterDob ?? 18;
      if (dob && !Number.isNaN(new Date(dob).getTime()) && y < new Date(dob).getFullYear() + gap) return { key: 'errYearDob', vars: { n: gap } };
      return null;
    }
    case 'file': {
      if (!FILE_TYPES.includes(value.type)) return { key: 'errFileType' };
      if (value.size > (q.maxMB || 5) * 1024 * 1024) return { key: 'errFileSize', vars: { n: q.maxMB || 5 } };
      return null;
    }
    case 'bankCode': {
      const v = String(s).replace(/\s+/g, '').toUpperCase();
      return IFSC.test(v) || SWIFT.test(v) || IBAN.test(v) ? null : { key: 'errBankCode' };
    }
    case 'bankAccount': {
      const v = String(s).replace(/[\s-]/g, '');
      return /^[A-Za-z0-9]{6,34}$/.test(v) ? null : { key: 'errBankAccount' };
    }
    case 'upi':
      return UPI.test(s) ? null : { key: 'errUpi' };
    case 'number': {
      const n = Number(value);
      if (!Number.isFinite(n) || n < q.min || n > q.max) return { key: 'errNumber', vars: { min: q.min, max: q.max } };
      return null;
    }
    default:
      return lenCheck();
  }
}

export function ageFrom(iso) {
  const d = new Date(iso);
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a -= 1;
  return a;
}
