import { postJSON } from './api.js';
import { USER_API } from '../data/site.js';

const VALIDATOR_API = import.meta.env.VITE_EMAIL_VALIDATOR_ENDPOINT || '/api/v1/validator/email';

/** '' when OK, otherwise an error message. */
export async function checkEmailDomain(email) {
  try {
    const res = await postJSON(VALIDATOR_API, { email });
    if (res && Object.prototype.hasOwnProperty.call(res, 'valid') && !res.valid) {
      return 'This email address doesn’t look valid. Please check it.';
    }
    return '';
  } catch {
    return '';
  }
}

/** true only when the backend clearly reports an existing account. */
export async function checkEmailTaken(mail) {
  try {
    const res = await postJSON(`${USER_API}/check`, { mail });
    const n = Number(res?.data);
    return Number.isFinite(n) && n > 0;
  } catch {
    return false;
  }
}