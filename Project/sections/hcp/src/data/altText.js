// Single source of truth for image alt text. scripts/gen_docs.mjs exports this to
// public/alt-text.json and ALT_TEXT.md so content/SEO teams can review it.
export const ALT = {
  'images/mho-logo.png': 'MyHealthOpinions logo — a red-to-orange heart with a heartbeat line beside the MyHealthOpinions wordmark',
  'images/profiles/basic.svg': 'Illustration of an ID card with a heartbeat line for the Basic Profile',
  'images/profiles/professional-category.svg': 'Illustration of a hospital building with a medical cross for the Professional Profile',
  'images/profiles/professional.svg': 'Illustration of a stethoscope for Speciality and Area of Practice',
  'images/profiles/educational.svg': 'Illustration of a graduation cap and diploma for the Educational Profile',
  'images/profiles/experience.svg': 'Illustration of a medal with a star for the Experience profile',
  'images/profiles/professional-address.svg': 'Illustration of a map pin over a city map for the Professional Address profile',
  'images/profiles/technical.svg': 'Illustration of a laptop showing a heartbeat for Technology and Digital Health',
  'images/profiles/survey-participation.svg': 'Illustration of chat bubbles and a checklist for Survey Participation and Rewards',
  'images/profiles/documents.svg': 'Illustration of a shield with a check mark over a licence document for Documents',
  'images/profiles/social-media.svg': 'Illustration of gold coins and a social heart for Social Media and Reward Payout',
  'images/profiles/additional-details.svg': 'Illustration of a molecule and DNA strand for the Additional Details survey',
  'images/og-image.png': 'MyHealthOpinions for Healthcare Professionals — your clinical insight shapes tomorrow’s medicine',
};

export const flagAlt = (name) => `Flag of ${name}`;
export const alt = (path) => ALT[path] || '';
