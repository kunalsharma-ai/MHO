// Maps the sign-up form to the body the backend expects on PUT /api/v1/user.
// Kept free of imports so it can be unit-tested without Vite.
//
// Backend rules this respects (see model/User.js):
//   • `mail` (not `email`), lower-cased. The pair (mail, origin) is unique.
//   • `phone` is country code + number, digits only. A leading "+" fails its validator.
//   • `gender` is required: Male | Female | Other.
//   • `address[].tag` is required; `country` is the lower-case ISO code.
//   • `password` is NOT sent. The backend drops it and sets it later from the emailed link.
//
// Fields the backend has no place for yet (job title, industry, company email, interests, marketing
// opt-in, language) are collected by the form but not sent. Add them here once the model has them.

const digits = (s = '') => String(s).replace(/\D/g, '');
const DEVICE_CHANNELS = ['sms', 'whatsapp']; // identified by phone; everything else by email

export function buildRegisterPayload(v, { dial = '', categories, timezone = 'UTC', }) {
  const mail = v.email.trim().toLowerCase();
  const phone = digits(dial) + digits(v.phone);

  const notification = Object.entries(v.notify || {})
    .filter(([, on]) => on)
    .map(([channel]) => ({ channel, category: [], identity: DEVICE_CHANNELS.includes(channel) ? phone : mail }));

  const payload = {
    category: v.memberType === 'professional' ? categories.professional : categories.consumer,
    name: { first: v.firstName.trim(), last: v.lastName.trim() },
    gender: v.gender,
    dob: v.dob, // ISO YYYY-MM-DD
    mail,
    phone,
    timezone,
    address: [{ tag: 'home', country: String(v.country).toLowerCase() }],
    notification,
  };
 
  return payload;
}
