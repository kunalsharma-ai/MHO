// Backend Answer keys for the "Your world" step. A key MUST equal the Question `name` in the database
// (the Question model stores names in lowercase, so use lowercase here).
export const ANSWER_KEYS = {
  jobTitle: 'jobtitle',
  industry: 'industry',
  companyEmail: 'companyemail',
  interests: 'interests',
  communication: 'communication-methods',
};

// Sign-up notification channel -> option `value` of the `communication-methods` question.
// WhatsApp has no option in that question, so it is intentionally not mapped (it stays in User.notification).
const COMM_VALUE = { dashboard: 'dashboard', email: 'email', sms: 'sms' };

/**
 * @param {'consumer'|'professional'} memberType
 * @param {object} v         the "Your world" form state
 * @param {string[]} channels notification channels chosen at sign-up, e.g. ['dashboard', 'sms']
 */
export function buildProfileAnswers(memberType, v, channels = []) {
  const out = {};
  const text = (field, value) => {
    const s = String(value ?? '').trim();
    if (s) out[ANSWER_KEYS[field]] = s;
  };
  if (memberType === 'professional') {
    text('jobTitle', v.jobTitle);
    text('industry', v.industry);
    text('companyEmail', String(v.companyEmail || '').toLowerCase());
  } else if (Array.isArray(v.interests) && v.interests.length) {
    out[ANSWER_KEYS.interests] = v.interests;
  }

  const comm = [...new Set((Array.isArray(channels) ? channels : []).map((c) => COMM_VALUE[c]).filter(Boolean))];
  if (comm.length) out[ANSWER_KEYS.communication] = comm;

  return out;
}