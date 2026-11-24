/**
 * Emoji for every QUESTION and every answer OPTION of the patient site.
 *   QUESTION_EMOJI(name, label) → the big icon shown next to a question
 *   optionEmoji(question, label, value) → the icon on each answer tile
 * Rules are checked top to bottom; the first match wins. Edit freely, then run `npm run data`.
 */

/* ---------------- question icons (explicit, so each one is hand-picked) ---------------- */
const Q = {
  fullname: '🙋', gender: '🧑‍🤝‍🧑', dob: '🎂', mail: '📧', country: '🌍', state: '🗺️', city: '🏙️', zipcode: '📮', ethnicity: '🧬', rural: '🏡',
  'personal-income': '💰', 'household-income': '🏦', 'relationship-status': '💍', children: '👶', website: '🌐',
  'patient-living-arrangement': '🏡', 'patient-care-support': '🤝',
  education: '🎓', 'education-diploma': '📜', 'education-associate-degree': '📘', 'education-ug': '🎓', 'education-pg': '🧑‍🎓', 'education-doctorate': '👩‍🔬',
  'diet-plan': '🥗', 'have-food-allergy': '🥜', 'food-allergy': '🤧', 'hot-drinks': '☕', 'cold-drinks': '🧃', alcohol: '🍷', 'alcohol-category': '🍹', smoke: '🚭',
  'smoke-category': '🚬', suppliment: '💪', 'do-exercise': '🏋️', exercises: '🤸', 'do-sport-participation': '🏅', 'sport-category': '⚽', 'sleep-duration': '😴',
  'health-status': '🌤️', 'chronic-conditions': '🩺', 'diabetes-type': '🩸', 'diabetes-monitoring': '📟', 'diabetes-research-consent': '🔬', 'diabetes-docs-consent': '📄',
  hypertension: '🫀', 'hypertension-medication': '💊', 'hypertension-research-consent': '📋', 'hypertension-docs-consent': '🗂️',
  'cholesterol-age': '🎂', 'cholesterol-type': '🧈', comorbidities: '🧩', 'cholesterol-family-history': '👪', 'cholesterol-treatment': '🥑',
  'asthma-age': '📅', 'asthma-type': '🌬️', 'asthma-diagnosis': '💨', 'asthma-severity': '📶', 'asthma-triggers': '🌫️',
  'arthritis-type': '🦴', 'arthritis-age': '⏳', 'arthritis-severity': '📶', 'arthritis-affected-joints': '🦵',
  'heart-disease-type': '❤️', 'heart-disease-age': '⏳', 'heart-disease-severity': '📶',
  'depression-condition': '🧠', 'depression-age': '⏳', 'depression-severity': '📶', 'depression-symptom': '🌧️', 'depression-treatment': '🫂', 'depression-treatment-category': '🛋️',
  'obesity-age': '⏳', bmi: '⚖️', 'obesity-severity': '📶', 'obesity-mesures': '🏃', 'obesity-treatment-category': '🥦',
  'cancer-category': '🎗️', 'cancer-age': '📅', 'cancer-stage': '🔢', 'cancer-experience': '🔁', 'cancer-treatment-status': '🏥', 'cancer-treatment-category': '💉',
  'thiroid-category': '🦋', 'thiroid-age': '⏳', 'thiroid-severity': '📶', 'thiroid-treatment-status': '🩺', 'thiroid-treatment-category': '💊',
  'anidra-category': '😪', 'anidra-age': '⏳', 'anidra-severity': '📶', 'anidra-treatment-status': '🛌', 'anidra-treatment-category': '😷',
  'skin-condition': '🧴', 'skin-condition-age': '⏳', 'skin-condition-severity': '📶', 'skin-condition-treatment': '🩹', 'skin-condition-treatment-category': '🧪',
  'stomach-condition': '🫃', 'stomach-condition-age': '⏳', 'stomach-condition-severity': '📶', 'stomach-condition-treatment': '🩺', 'stomach-condition-treatment-category': '💊',
  'neuro-condition': '🧠', 'neuro-age': '⏳', 'neuro-sevirity': '📶', 'neuro-treatment-status': '🩺', 'neuro-treatment-category': '⚡',
  'vision-condition': '👁️', 'vision-condition-age': '⏳', 'vision-condition-sevirity': '📶', 'vision-condition-treatment': '👓', 'vision-condition-treatment-category': '🦻',
  'lense-type': '👁️‍🗨️', 'lense-brand': '🏷️', 'hearing-device': '🦻', 'hearing-device-brand': '🏷️',
  'blood-condition': '🩸', 'blood-condition-age': '⏳', 'blood-condition-sevirity': '📶', 'blood-condition-treatment': '🩺', 'blood-condition-treatment-category': '💉',
  'dental-condition': '🦷', 'dental-condition-age': '⏳', 'dental-condition-sevirity': '📶', 'dental-condition-treatment': '🪥', 'dental-condition-treatment-category': '🦷',
  'dental-condition-alignment': '😁', 'dental-condition-tooth-aligner-category': '🦷', 'dental-condition-tooth-aligner-brand': '🏷️',
  'spine-condition': '🦴', 'spine-condition-age': '⏳', 'spine-condition-sevirity': '📶', 'spine-condition-treatment': '🩺', 'spine-condition-treatment-category': '🧘',
  'sex-condition': '⚧️', 'sex-condition-age': '⏳', 'sex-condition-sevirity': '📶', 'sex-condition-treatment': '🩺', 'sex-condition-treatment-category': '💊',
  'hiv-test': '🧪', 'hiv-test-result': '📃', 'hiv-age': '📅', 'hiv-treatment': '🗓️',
  'doctor-visit-category': '👩‍⚕️', 'health-insurance': '🛡️', 'health-insurance-type': '📑', 'health-checkup': '🩺', 'covid-vaccine': '💉',
  'employment-status': '💼', 'jobseeker-patient': '🔍', 'availing-pension': '🏦', industry: '🏭', 'patient-sector': '🏢', department: '🗂️', 'employment-jobrole': '🧑‍💼',
  'organization-revenue': '📈', 'patient-orgoverseas': '✈️', 'patient-orgsize': '👥', hw: '🏠', 'experience-patient': '⏳', 'orgdecision-patient': '🧭', 'freelancer-patient': '🧑‍💻',
  'survey-participation-history': '📋', 'survey-participation-frequency': '🗓️', 'survey-participation-category': '🗳️', 'other-survey-panel': '🔗', 'survey-mode': '📲',
  'survey-participation-time-duration': '⏱️', 'willingness-survey-participation': '🙌', 'survey-type-interested-in': '🔍', 'share-consent': '🤝', 'survey-participation-motivation': '💡',
  'video-survey-participation-consent': '🎥', 'mode-of-payment': '🎁', 'survey-participation-timeslot': '🕰️', 'recontact-consent': '📬',
  'use-fitness-mobile-app': '⌚', 'use-devices': '💻', 'health-management-app': '📱', 'health-service': '🌐',
  'patient-health-condition': '🩺', 'no-health-problem': '🔢', 'health-condition-timing': '⏳', 'diagnosed-condition': '🔎', 'current-condition-status': '📈',
  'disease-types': '📋', 'primary-health-condition': '🎯', 'condition-diagnsis-by-healthcareprofessional': '👨‍⚕️', 'first-diagnosed-timing': '📅',
  'experience-symptoms-releted-to-primary-condition': '🌡️', 'describe-severity-symptoms': '📶', 'condition-affect-daily-life': '🏃', 'condition-affect-work-study': '💼', 'condition-affect-everyday-activities': '🧺',
  'professional-list': '👩‍⚕️', 'visit-healthcare-for-primary-condition': '🗓️', 'place-receive-care': '🏥', 'manages-treatment': '🧑‍⚕️',
  'receiving-treatment-primary-condition': '🩹', 'types-of-treatment-currently-using': '💉', 'medications-prescription-currently-taking': '💊', 'prescribed-medication-timing': '⏰',
  'treatment-stopped-of-side-effects': '⚠️', 'treatment-satisfaction': '😊',
  'obtain-prescription-medicines': '🏪', 'manage-medications': '🗃️', 'switched-medication': '🔄',
  'diagnostic-test-releted-to-primary-condition': '🔬', 'types-of-test-received': '🧪', 'frequently-undergo-monitoring-for-condition': '📊',
  'health-monitoring-device': '⌚', 'device-type': '🩺', 'frequently-using-health-monitoring-device': '🔁', 'health-medical-apps': '📱', 'types-of-health-apps': '📲',
  'visiting-hospital': '🏥', 'howmany-times-visiting-healthcare': '🔢', hospitalised: '🛏️',
  'health-insurance-currenlty': '🛡️', 'healthcare-expenses': '💳', 'affected-healthcare-costs': '💸', 'delayed-healthcare-cost': '⏸️',
  'physically-active': '🏃', 'descrive-typical-diet': '🍽️', 'smoking-tobacco-nicotine': '🚭', 'consume-alcohlic-beverages': '🍷', 'hours-sleep': '🛌',
  'healthcare-treatment-decisions': '🤝', 'factors-choosing-treatment': '⚖️', 'second-medical-opinion': '🔁', 'health-condition-managing-confidence': '💪',
  'looking-health-information': '🔎', 'online-information-about-health-condition': '🌐', 'participate-online-health-community': '👥', 'share-health-experience-online': '💬',
  'participate-market-research': '📊', 'participated-in-clinical-trial': '🧪', 'participating-future-healthcare-market': '🔮', 'types-of-research-consider-participating': '🧭',
  'spending-time-on-research': '⏱️', 'healthcare-experiences': '🎙️',
  'document-verification': '✅', 'types-of-documentation': '📄', 'provide-photograph': '📸', 'verification-call': '📞',
  'selected-health-condition': '🎯', 'receiving-treatment': '🩺', 'received-treatment': '📅', 'contacted-for-research-opportunities': '📬', 'types-of-studies': '🔬',
  'social-media-x': '𝕏', 'social-media-youtube': '▶️', 'social-media-facebook': '👍', 'social-media-instagram': '📸', 'social-media-linkedin': '💼',
  'payment-method': '💳', 'payment-method-bank-name': '🏦', 'payment-method-bank-ifsc': '🔢', 'payment-method-bank-account': '🧾', 'payment-method-upi': '📲', 'payment-method-paypal': '🅿️', 'payment-method-amazon': '🛍️',
};
export function QUESTION_EMOJI(name) {
  return Q[name] || '💬';
}

/* ---------------- option icons ---------------- */
// per-question lists (in option order) where a fixed sequence reads best
const SEQ = {
  'types-of-studies': ['🏥', '💊', '🏪', '🩺', '🔬', '📲', '🛡️', '🏨', '🗣️', '📢', '💉', '🧘', '✏️'],
  'disease-types': ['🩸', '🍬', '🫀', '🧈', '❤️', '⚡', '🌬️', '🫁', '🦴', '🦿', '⚖️', '🎗️', '🦋', '🫘', '🍂', '🫃', '🌧️', '😰', '🎭', '🤕', '🌩️', '🧠', '🤲', '🧩', '😪', '🔥', '🧴', '🛡️', '🔴', '🦠', '👓', '🦻', '🦷', '♀️', '♂️', '⚧️', '🕸️', '💪', '🦓', '✏️', '🚫'],
  'chronic-conditions': ['🩸', '🫀', '🧈', '🌬️', '🦴', '❤️', '🌧️', '⚖️', '🎗️', '🦋', '😪', '🧴', '🫃', '🧠', '👁️', '🛡️', '🦷', '🦿', '⚧️', '🔴', '🚫'],
  'diabetes-type': ['1️⃣', '2️⃣', '🤰', '⚠️', '🤔'],
  'cholesterol-type': ['🔺', '🔻', '🧈', '🧬'],
  'asthma-type': ['🌼', '🏃', '🏭', '🌬️'],
  'arthritis-type': ['🦴', '✋', '🧴', '🦶'],
  'heart-disease-type': ['🫀', '💔', '💓', '🪫', '🚪', '👶'],
  'depression-symptom': ['🌧️', '😰', '🫥', '🌙', '🪫', '😱', '🌫️'],
  'lense-type': ['☀️', '🗓️', '📆', '🌙', '💎', '🌈', '👓'],
  'hearing-device': ['🦻', '🐚', '➕'],
  'blood-condition': ['🦴', '🐺', '🧠', '🩸', '😮‍💨', '🩹', '🧬', '🌙', '🧫'],
  'spine-condition': ['🦴', '🦵', '🧍', '💿', '🩼', '💪'],
  'device-type': ['🩸', '📟', '🫀', '🫁', '💨', '😷', '⌚', '📳', '📈', '⚖️', '🚨', '🦻', '🦽', '💉', '✏️', '🚫'],
  exercises: ['🏋️', '🏃', '🧘', '🏞️', '🏠', '🦵'],
  'employment-status': ['🕘', '🕐', '🧑‍💻', '💻', '📆', '🏛️', '🔍', '🏡', '🧑‍🎨', '🏖️', '🎒', '♿', '🤐'],
  'survey-participation-frequency': ['📅', '🗓️', '📆', '🕊️'],
  'ad-drug-allergies': ['💊', '🧪', '🩹', '😷', '🩻', '🧤', '✏️', '🚫', '🤔'],
  'ad-how-heard': ['🔎', '📣', '👪', '📧', '👩‍⚕️', '📺', '👥', '✏️'],
  'health-status': ['🌟', '😄', '🙂', '😐', '😟', '😣'],
  children: ['🚫', '👶', '👧', '👨‍👩‍👧‍👦', '🏫'],
  'sleep-duration': ['😫', '😐', '😴', '🛌'],
  'hours-sleep': ['🥱', '😫', '😐', '😴', '🛌', '💤'],
  'condition-affect-daily-life': ['😀', '🙂', '😐', '😟', '😣'],
  'condition-affect-work-study': ['😀', '🙂', '😐', '😟', '🛑', '➖'],
  'condition-affect-everyday-activities': ['🟢', '🟡', '🟠', '🔴', '⛔'],
  'describe-severity-symptoms': ['🌱', '🟢', '🟡', '🟠', '🔴', '✨'],
  'treatment-satisfaction': ['😍', '🙂', '😐', '🙁', '😠'],
  'health-condition-managing-confidence': ['💪', '👍', '😐', '😕', '😟'],
  'participating-future-healthcare-market': ['🤩', '🙂', '🤔', '🙁', '🙅'],
  'physically-active': ['🏃', '🚴', '🚶', '🧍', '🛋️'],
  'descrive-typical-diet': ['🥗', '🍎', '🍱', '🍟', '🍩'],
  'prescribed-medication-timing': ['✅', '👍', '🤏', '😕', '🚫', '➖'],
  'medications-prescription-currently-taking': ['🚫', '1️⃣', '2️⃣', '🔢', '💊', '🧺'],
  'no-health-problem': ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '🚫'],
  'howmany-times-visiting-healthcare': ['🚫', '🌱', '🌿', '🪴', '🌳', '🌲'],
  'spending-time-on-research': ['⚡', '☕', '📖', '🍿', '🎬', '🛋️'],
  'survey-participation-time-duration': ['⚡', '☕', '📖', '🛋️'],
  'experience-patient': ['🌱', '🌿', '🪴', '🌳', '🌲', '🏔️', '🏆', '👑'],
  'patient-orgsize': ['🧍', '👥', '🏪', '🏬', '🏢', '🏭', '🏙️', '🌆', '🌐'],
  'patient-orgoverseas': ['1️⃣', '✈️', '🌍', '🌐', '🚫'],
  'cancer-stage': ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🤔'],
  'cholesterol-age': ['🧑', '🧑‍💼', '🧔', '👨‍🦳', '👵'],
  'second-medical-opinion': ['🔁', '🔄', '🌘', '🚫', '⚠️'],
  'affected-healthcare-costs': ['💸', '💵', '🌘', '🚫', '🤐'],
  'share-health-experience-online': ['📣', '💬', '✌️', '🚫'],
  'frequently-undergo-monitoring-for-condition': ['📅', '🗓️', '🍂', '🌗', '🎆', '🆘', '🌘', '🚫'],
  'visit-healthcare-for-primary-condition': ['🔥', '🗓️', '🍂', '🌗', '🎆', '🌘', '🆘'],
  'online-information-about-health-condition': ['☀️', '📆', '📅', '🗓️', '🌘', '🚫'],
  'consume-alcohlic-beverages': ['🍻', '🍷', '🥂', '🌘', '🚫'],
  'smoking-tobacco-nicotine': ['🚬', '🌗', '🔙', '🚭'],
  'frequently-using-health-monitoring-device': ['🔁', '☀️', '📆', '📅', '🌘', '👩‍⚕️'],
  'experience-symptoms-releted-to-primary-condition': ['☀️', '📆', '📅', '🗓️', '🌗', '🌘', '✨'],
  'hiv-treatment': ['🗓️', '🍂', '🌗', '🎆', '🌘', '🆘'],
  'ad-medicine-spend': ['🆓', '🪙', '💵', '💰', '🤐'],
  'ad-blood-group': ['🅰️', '🔺', '🅱️', '🔷', '🆎', '💠', '🅾️', '⭕', '🤔'],
};
// value-based keys for questions whose option values carry the meaning (revenue bands)
const BY_VALUE = {
  'organization-revenue': { micro: '🌱', mini: '🌿', small: '🪴', medium: '🌳', large: '🏢', enterprise: '🏙️' },
};

const R = [
  // ---------- yes / no / maybe family ----------
  [/^yes,? currently using|^yes,? currently$|^yes,? regularly/i, '✅'], [/^yes,? used in the past|^yes,? in the past/i, '🔙'], [/^yes,? occasionally/i, '🌗'],
  [/^yes,? within the last (3|6) months/i, '🆕'], [/^yes,? 3-6 months/i, '🗓️'], [/^yes,? 6-12 months/i, '📆'], [/^yes,? 1-2 years/i, '🍂'], [/^yes,? more than (a|2) years?/i, '⌛'],
  [/^yes,? as an inpatient/i, '🛏️'], [/^yes,? emergency/i, '🚑'], [/^yes,? outpatient/i, '🚶'], [/^yes,? for testing/i, '🧪'],
  [/^yes,? employer-provided/i, '🏢'], [/^yes,? privately/i, '🏦'], [/^yes,? government/i, '🏛️'], [/^yes,? through a family/i, '👪'],
  [/^yes,? on doctor/i, '👩‍⚕️'], [/^yes,? because of side effects/i, '⚠️'], [/^yes,? because of cost/i, '💸'], [/^yes,? because of availability/i, '📦'], [/^yes,? because it was more convenient/i, '👌'],
  [/^yes – inhaler/i, '💨'], [/^yes – oral/i, '💊'], [/^yes – biologic/i, '💉'],
  [/^yes\b/i, '✅'], [/^no,? never used/i, '🚫'], [/^no,? i manage/i, '🙋'], [/^no\b/i, '❌'],
  [/^maybe|^not sure|^unsure|^don't know|^i don't know/i, '🤔'], [/prefer not/i, '🤐'], [/^not applicable/i, '➖'],
  [/^definitely interested/i, '🤩'], [/^probably interested/i, '🙂'], [/^probably not/i, '🙁'], [/^definitely not/i, '🙅'],
  [/considered doing so/i, '🤔'], [/treatment recently completed/i, '🏁'], [/waiting to start/i, '⏳'], [/currently awaiting|awaiting diagnosis/i, '⏳'], [/in remission/i, '🌈'],
  [/^none|^i do not|^never$|^i currently have no symptoms|no current symptoms/i, '🚫'], [/^other|^others/i, '✏️'],
  [/^positive$/i, '➕'], [/^negative$/i, '➖'],
  // ---------- severity & frequency ladders ----------
  [/^very mild/i, '🌱'], [/^mild$/i, '🟢'], [/^moderate$/i, '🟡'], [/^severe$/i, '🔴'], [/^very severe/i, '🆘'],
  [/^not at all$/i, '😀'], [/^slightly$/i, '🙂'], [/^moderately$/i, '😐'], [/^significantly$/i, '😟'], [/^extremely$/i, '😣'],
  [/^always$/i, '✅'], [/^usually$/i, '👍'], [/^often$/i, '🔁'], [/^sometimes$/i, '🌗'], [/^rarely$/i, '🌘'],
  [/^frequently$/i, '🔁'], [/^once or twice$/i, '✌️'], [/only for major/i, '⚠️'],
  [/^(daily|every day|several times a day)/i, '☀️'], [/several times a week/i, '📆'], [/^weekly|about once a week|once a week/i, '📅'], [/^bi-weekly/i, '🗓️'],
  [/^monthly|more than once a month|several times a month/i, '🗓️'], [/every 2-3 months|every few months|every 4-6 months|every 6 months/i, '🍂'], [/once or twice a year|^annually/i, '🎆'],
  [/less than once a year/i, '🌘'], [/^occasionally/i, '🌗'], [/only when (required|symptoms|needed)|only when instructed/i, '🆘'], [/^as available/i, '🕊️'],
  [/^newly diagnosed/i, '🆕'], [/^stable$/i, '⚖️'], [/^improving$/i, '📈'], [/getting worse/i, '📉'], [/well controlled/i, '🎯'], [/poorly controlled/i, '🌀'], [/recurring|intermittent/i, '🔁'],
  [/^very satisfied|^very confident/i, '😍'], [/^somewhat satisfied|^somewhat confident/i, '🙂'], [/neither/i, '😐'], [/^somewhat (dis|un)/i, '🙁'], [/^very dissatisfied|^not at all confident/i, '😠'],
  [/^very active/i, '🏃'], [/^moderately active/i, '🚴'], [/^somewhat active/i, '🚶'], [/^slightly active/i, '🧍'], [/^not active/i, '🛋️'],
  [/former user/i, '🔙'], [/used to but quit/i, '🔙'],
  // ---------- durations ----------
  [/within the past year|less than (6 months|1 year)|within the last 3 months/i, '🌱'], [/^6 months|6-12 months|3-6 months/i, '🌿'], [/^1 ?[-–] ?(2|3) years|^1-2 years/i, '🪴'],
  [/^3 ?[-–] ?5 years|^4 ?[-–] ?7 years|^4–7/i, '🌳'], [/^6-10 years|^8\+ years|more than 5 years/i, '🌲'], [/more than 10 years/i, '🏔️'], [/under 30/i, '🧑'],
  // ---------- conditions ----------
  [/^diabetes|type 1|type 2|prediabetes|gestational/i, '🩸'], [/hypertension|high blood pressure/i, '🫀'], [/cholesterol|ldl|hdl|triglyceride|hypercholesterol/i, '🧈'],
  [/asthma/i, '🌬️'], [/^copd/i, '🫁'], [/arthritis|osteoarthritis|gout/i, '🦴'], [/heart attack|heart disease|cardiovascular|coronary|heart failure|valvular|congenital heart/i, '❤️'],
  [/arrhythmia/i, '💓'], [/depression|sadness|low mood/i, '🌧️'], [/anxiety|worry|fear|panic/i, '😰'], [/bipolar/i, '🎭'], [/obesity/i, '⚖️'],
  [/breast cancer/i, '🎀'], [/lung cancer/i, '🫁'], [/colorectal/i, '🎗️'], [/prostate/i, '🔵'], [/leukemia|lymphoma/i, '🩸'], [/pancreatic|liver cancer/i, '🫀'], [/skin cancer|oral cancer|thyroid cancer|^cancer/i, '🎗️'],
  [/hypothyroid/i, '🐢'], [/hyperthyroid/i, '🐇'], [/hashimoto/i, '🛡️'], [/graves/i, '👁️'], [/nodule|goiter/i, '🔘'], [/thyroid/i, '🦋'],
  [/obstructive sleep/i, '😴'], [/central sleep/i, '🧠'], [/mixed \/ complex sleep/i, '🌀'], [/sleep apnea/i, '😪'],
  [/acne/i, '🔴'], [/eczema|dermatitis/i, '🩹'], [/psoriasis/i, '🧴'], [/fungal/i, '🍄'], [/rosacea/i, '🌹'], [/vitiligo/i, '🐄'], [/skin condition|skin disorder/i, '🧴'],
  [/gerd|heartburn|reflux/i, '🔥'], [/crohn|colitis|ibd/i, '🫃'], [/irritable bowel|ibs/i, '🌪️'], [/kidney/i, '🫘'], [/urinary|uti/i, '💧'], [/gallbladder|liver disease/i, '🍂'], [/digestive|gastro|gastric/i, '🫃'],
  [/migraine|headache/i, '🤕'], [/multiple sclerosis/i, '🧠'], [/stroke|ischemic/i, '⚡'], [/parkinson/i, '🤲'], [/epilep|seizure/i, '🌩️'], [/neuropathy/i, '🦶'], [/alzheimer|dementia/i, '🧩'],
  [/neurolog|nervous/i, '🧠'], [/low vision|vision impairment|eye\/vision/i, '👓'], [/blindness/i, '🦯'], [/hearing loss|hearing condition|hearing impairment/i, '🦻'], [/deafness/i, '🧏'], [/vision \/ hearing/i, '👁️'],
  [/lupus/i, '🐺'], [/anemia/i, '🩸'], [/hemophilia|bleeding/i, '🩹'], [/thalassemia/i, '🧬'], [/sickle cell/i, '🌙'], [/platelet|clotting/i, '🧫'], [/autoimmune/i, '🛡️'],
  [/tooth decay|cavities/i, '🦷'], [/gum disease/i, '🫦'], [/tooth sensitivity/i, '🧊'], [/misaligned|malocclusion/i, '😬'], [/tmj|temporomandibular/i, '🗣️'], [/dental/i, '🦷'],
  [/osteoporosis/i, '🦴'], [/cervical spine|neck pain/i, '🧍'], [/herniated|slipped disc/i, '💿'], [/fracture|bone injury/i, '🩼'], [/muscular|ligament/i, '💪'], [/musculoskeletal|bone and/i, '🦴'],
  [/erectile/i, '🔵'], [/testosterone/i, '🧔'], [/menopause/i, '🌸'], [/male \/ female health|women's health/i, '♀️'], [/men's health/i, '♂️'], [/sexual|reproductive/i, '⚧️'], [/^hiv/i, '🎗️'],
  [/chronic pain/i, '🤕'], [/infectious/i, '🦠'], [/rare disease/i, '🦓'], [/liver/i, '🫀'],
  // ---------- symptoms & triggers ----------
  [/loss of interest/i, '🫥'], [/sleeping|insomnia/i, '🌙'], [/fatigue|low energy/i, '🪫'], [/concentrating/i, '🌫️'],
  [/stress \/ emotions|stress$/i, '😣'], [/smoke \/ pollution/i, '🏭'], [/respiratory infection/i, '🤧'], [/cold air/i, '❄️'], [/^exercise$/i, '🏃'], [/dust|mold/i, '🧹'], [/pollen|allergen/i, '🌼'],
  [/hands|fingers/i, '✋'], [/knees/i, '🦵'], [/hips/i, '🍑'], [/shoulders/i, '💪'], [/spine|back/i, '🧍'],
  // ---------- treatments ----------
  [/prescription medication|prescription medicines|^prescription$|levothyroxine|statins/i, '💊'], [/over-the-counter/i, '🏪'], [/injectable/i, '💉'], [/infusion|transfusion|plasma/i, '🩸'],
  [/inhaler/i, '💨'], [/biologic/i, '🧬'], [/chemotherapy/i, '💉'], [/radiotherapy|radioactive/i, '☢️'], [/immunotherapy|targeted/i, '🎯'], [/hormone/i, '⚗️'], [/palliative/i, '🕊️'],
  [/surgery|surgical|procedures|bariatric/i, '🩻'], [/physical therapy|physiotherapy|rehabilitation/i, '🧘'], [/occupational therapy/i, '🧑‍🔧'], [/psychotherapy|counsel|psychological|behavioural/i, '🛋️'],
  [/dietary changes|dietary modifications|diet plan|nutritionist|nutrition plan|low-fat/i, '🥗'], [/exercise \/ (fitness|physical)|exercise\/lifestyle|lifestyle (changes|modifications|interventions)/i, '🏃'],
  [/medical device$|^medical device information/i, '🩺'], [/digital health programme/i, '📲'], [/alternative|complementary|ayurved|home remedies/i, '🌿'], [/monitoring only/i, '👀'],
  [/supplements \(e\.g\., omega/i, '🐟'], [/cpap|bipap/i, '😷'], [/oral appliance|mouth guard/i, '🦷'], [/phototherapy|light therapy/i, '💡'], [/fillings|root canal/i, '🦷'], [/orthodontic/i, '😬'],
  [/oral hygiene/i, '🪥'], [/glasses|contact lenses/i, '👓'], [/hearing aids?|cochlear/i, '🦻'], [/assistive technology/i, '🔊'], [/^rehabilitation \/ therapy/i, '🧘'],
  // ---------- monitoring & devices ----------
  [/finger-prick|glucose meter|blood glucose/i, '🩸'], [/continuous glucose|cgm/i, '📟'], [/lab tests only|laboratory/i, '🧪'],
  [/blood pressure monitor/i, '🫀'], [/pulse oximeter/i, '🫁'], [/smart inhaler/i, '💨'], [/fitness tracker|smartwatch/i, '⌚'], [/ecg monitor|ecg\/ekg/i, '📈'],
  [/weight\/body|weight management/i, '⚖️'], [/medical alert/i, '🚨'], [/mobility device/i, '🦽'], [/insulin pump/i, '💉'], [/hearing device/i, '🦻'],
  [/blood test/i, '🩸'], [/urine test/i, '🧪'], [/imaging|x-ray/i, '🩻'], [/ct scan/i, '🌀'], [/^mri/i, '🧲'], [/ultrasound/i, '📡'], [/biopsy/i, '🔬'], [/genetic/i, '🧬'],
  [/endoscopy/i, '🔭'], [/lung function/i, '🫁'], [/eye examination/i, '👁️'], [/hearing test/i, '👂'],
  // ---------- contact lenses / brands ----------
  [/daily disposable/i, '☀️'], [/bi-weekly disposable/i, '🗓️'], [/monthly disposable/i, '📅'], [/extended wear/i, '🌙'], [/rigid gas/i, '💎'], [/cosmetic|colored/i, '🌈'], [/glasses only/i, '👓'],
  [/acuvue/i, '🔵'], [/air optix/i, '🌬️'], [/biofinity/i, '♾️'], [/bausch/i, '🟢'], [/dailies/i, '☀️'], [/other brand/i, '✏️'],
  [/phonak/i, '🔊'], [/widex/i, '🎧'], [/resound/i, '🎶'], [/oticon/i, '👂'], [/starkey/i, '⭐'], [/siemens|signia/i, '📶'], [/gn hearing/i, '🔉'], [/unitron/i, '🎚️'], [/cochlear \(/i, '🐚'], [/med-el/i, '🎵'], [/advanced bionics/i, '🤖'],
  [/^cochlear implant/i, '🐚'], [/^hearing aid$/i, '🦻'], [/^both$/i, '➕'],
  [/dentist-prescribed/i, '👩‍⚕️'], [/direct-to-consumer|mail-order/i, '📦'], [/night-only/i, '🌙'], [/cosmetic \/ non-medical/i, '✨'],
  [/invisalign/i, '😁'], [/clearcorrect/i, '💎'], [/suresmile/i, '😊'], [/candid/i, '📸'], [/smiledirect/i, '😃'], [/^byte$/i, '🦷'], [/alignerco/i, '🔷'], [/snapcorrect/i, '📷'], [/drsmile/i, '😄'],
  // ---------- healthcare professionals & places ----------
  [/general (practitioner|physician)|family doctor/i, '👨‍⚕️'], [/internist/i, '🩺'], [/specialist physician|^specialist$/i, '🧑‍⚕️'], [/^surgeon/i, '🔪'], [/cardiolog/i, '❤️'], [/endocrinolog/i, '🦋'],
  [/oncolog/i, '🎗️'], [/neurolog/i, '🧠'], [/psychiatr/i, '🛋️'], [/psycholog/i, '💭'], [/dermatolog/i, '🧴'], [/gastroenterolog/i, '🫃'], [/pulmonolog/i, '🫁'], [/rheumatolog/i, '🦴'], [/nephrolog/i, '🫘'],
  [/ophthalmolog|optometrist/i, '👁️'], [/ent specialist|ear, nose/i, '👂'], [/gynecolog/i, '🌸'], [/urolog/i, '💧'], [/^dentist/i, '🦷'], [/physiotherapist/i, '🧘'], [/^nurse/i, '👩‍⚕️'],
  [/pharmacist/i, '💊'], [/dietitian|nutritionist/i, '🥗'], [/orthopedist|bone specialist/i, '🦴'], [/alternative medicine practitioner/i, '🌿'],
  [/private hospital/i, '🏥'], [/public\/government hospital/i, '🏛️'], [/private clinic/i, '🏨'], [/community health/i, '🏘️'], [/specialist clinic/i, '🔬'], [/university|teaching hospital/i, '🎓'],
  [/telehealth|virtual clinic|telemedicine|teleconsult|online consult/i, '💻'], [/pharmacy-based/i, '💊'], [/multiple healthcare professionals/i, '👥'], [/hospital team/i, '🏥'], [/manage most of it myself|manage them myself/i, '🙋'],
  [/emergency department/i, '🚑'], [/screening programme/i, '📋'], [/hospital\/clinic|^hospital/i, '🏥'], [/self-diagnosed/i, '🙋'],
  [/local pharmacy/i, '🏪'], [/hospital pharmacy/i, '🏥'], [/online pharmacy/i, '🛒'], [/mail-order pharmacy/i, '📦'], [/directly from healthcare provider/i, '👩‍⚕️'],
  [/family member helps/i, '👪'], [/caregiver helps/i, '🤝'], [/healthcare professional helps/i, '👩‍⚕️'], [/medication management app/i, '📱'],
  [/make most decisions myself/i, '🙋'], [/jointly with my doctor/i, '🤝'], [/doctor makes most/i, '👨‍⚕️'], [/family\/caregiver is heavily/i, '👪'],
  // ---------- decisions & information ----------
  [/^effectiveness/i, '🎯'], [/^safety/i, '🛡️'], [/side effects/i, '⚠️'], [/^cost$/i, '💲'], [/^convenience/i, '👌'], [/treatment frequency/i, '🔁'], [/ease of administration/i, '🤲'],
  [/doctor's recommendation/i, '👩‍⚕️'], [/^availability/i, '📦'], [/insurance coverage/i, '📑'], [/clinical evidence/i, '📊'], [/patient reviews/i, '⭐'],
  [/doctor\/healthcare professional/i, '👩‍⚕️'], [/search engines/i, '🔎'], [/government health websites/i, '🏛️'], [/pharmaceutical company/i, '🏭'], [/health websites/i, '🌐'], [/^social media/i, '📣'],
  [/patient communities/i, '👥'], [/online forums/i, '💬'], [/^youtube/i, '▶️'], [/friends\/family|friend or family|friends and family/i, '👪'], [/medical journals/i, '📚'],
  // ---------- research ----------
  [/online surveys/i, '🖥️'], [/telephone interviews|telephonic/i, '📞'], [/video interviews/i, '🎥'], [/in-person interviews/i, '🗣️'], [/focus groups?/i, '👥'], [/online communities/i, '🌐'],
  [/product\/concept testing|product trials/i, '🧪'], [/medical device testing/i, '🩺'], [/patient diary|diary or long-term/i, '📔'], [/mobile research/i, '📱'], [/longitudinal/i, '📈'], [/clinical research/i, '🔬'],
  [/healthcare services/i, '🏥'], [/prescription medicines/i, '💊'], [/otc medicines/i, '🏪'], [/^medical devices/i, '🩺'], [/^diagnostics/i, '🔬'], [/^digital health/i, '📲'], [/^health insurance/i, '🛡️'],
  [/hospitals and clinics/i, '🏨'], [/patient experience/i, '🗣️'], [/disease awareness/i, '📢'], [/treatment experience/i, '💉'], [/lifestyle and wellness/i, '🧘'],
  [/medication packaging/i, '📦'], [/laboratory report/i, '🧪'], [/diagnostic report/i, '📋'], [/hospital\/clinic document/i, '🏥'], [/doctor's documentation/i, '👨‍⚕️'],
  // ---------- insurance & payment ----------
  [/^myself$/i, '🙋'], [/^employer$/i, '🏢'], [/government\/public programme/i, '🏛️'], [/insurance provider/i, '🛡️'], [/^family member$/i, '👪'], [/combination of sources/i, '🧩'],
  [/employer provided/i, '🏢'], [/private \/ marketplace/i, '🏦'], [/medicaid/i, '🏛️'], [/medicare/i, '🧓'],
  [/paypal/i, '🅿️'], [/upi|unified payment/i, '📲'], [/wire transfer/i, '🏦'], [/amazon/i, '🛍️'], [/gift cards?/i, '🎁'],
  // ---------- people ----------
  [/^male$/i, '👨'], [/^female$/i, '👩'], [/single/i, '🙂'], [/^married/i, '💍'], [/separated|divorced|widow/i, '💔'], [/domestic partnership|living with someone/i, '🏡'],
  [/spouse or partner/i, '💑'], [/^parent$/i, '👨‍👩‍👧'], [/son or daughter/i, '👧'], [/other family member/i, '👪'], [/friend or neighbour/i, '🏘️'], [/paid caregiver/i, '🧑‍⚕️'],
  // ---------- education ----------
  [/less than high school/i, '📒'], [/high school/i, '🏫'], [/diploma|ged/i, '📜'], [/some college/i, '📚'], [/associate/i, '📘'], [/bachelor/i, '🎓'], [/master/i, '🧑‍🎓'],
  [/professional degree/i, '⚕️'], [/doctorate|phd/i, '👩‍🔬'],
  // ---------- work ----------
  [/employed full-time/i, '🕘'], [/employed part-time/i, '🕐'], [/self-employed full-time/i, '🧑‍💻'], [/self-employed part-time/i, '💻'], [/temporary|seasonal/i, '📆'], [/government\/public employee/i, '🏛️'],
  [/^unemployed/i, '🔍'], [/^homemaker/i, '🏡'], [/^freelancer/i, '🧑‍🎨'], [/^retired/i, '🏖️'], [/^student/i, '🎒'], [/^disabled/i, '♿'], [/prefer not to answer/i, '🤐'],
  [/^agriculture/i, '🌾'], [/govt\. and defense/i, '🎖️'], [/^manufacturing/i, '🏭'], [/^service$/i, '🛎️'],
  [/shopping and procurement/i, '🛒'], [/household management/i, '🏠'], [/family health/i, '💚'], [/^childcare/i, '🧸'], [/cooking and meal/i, '🍳'], [/elder care/i, '🧓'], [/event and social/i, '🎉'],
  [/home organization/i, '🧹'], [/education support/i, '📚'], [/budgeting|finance manager/i, '💰'],
  [/recently joined/i, '🌱'], [/not usually involved/i, '🙂'], [/sole decision maker/i, '👑'], [/give input/i, '💡'], [/share decision making/i, '🤝'],
  // ---------- surveys ----------
  [/healthcare \/ patient-related/i, '🏥'], [/consumer \/ product/i, '🛍️'], [/online opinion polls/i, '🗳️'], [/in-person \/ telephone/i, '📞'],
  [/online \(via link/i, '🔗'], [/^mobile app/i, '📱'], [/telephone \/ cati/i, '☎️'], [/in-person interview/i, '🗣️'],
  [/less than 5 minutes|less than 10 minutes/i, '⚡'], [/5–10 minutes|10-20 minutes/i, '☕'], [/10–20 minutes|21-30 minutes/i, '📖'], [/20 minutes or more|31-45|46-60/i, '🛋️'], [/more than 60 minutes/i, '🎬'],
  [/sharing my opinion/i, '🗣️'], [/helping improve/i, '🌍'], [/rewards|incentives/i, '🎁'], [/learning new/i, '🧠'], [/^morning/i, '🌅'], [/^afternoon/i, '☀️'], [/^evening/i, '🌙'],
  // ---------- food, drink, fitness ----------
  [/vegetarian/i, '🥕'], [/vegan/i, '🌱'], [/^keto/i, '🥑'], [/low-carb|high-protein/i, '🍗'], [/diabetic|low-sugar/i, '🍬'], [/heart-healthy/i, '❤️'], [/gluten/i, '🌾'], [/intermittent fasting/i, '⏳'],
  [/^tea \(/i, '🍵'], [/^coffee/i, '☕'], [/hot chocolate|cocoa/i, '🍫'], [/herbal or medicinal teas/i, '🌿'],
  [/soft drinks|sodas/i, '🥤'], [/energy drinks/i, '⚡'], [/fruit juices \(packaged/i, '🧃'], [/fresh fruit juices|smoothies/i, '🍹'], [/iced tea|cold coffee/i, '🧋'], [/flavored water|vitamin water/i, '💧'],
  [/^beer/i, '🍺'], [/^wine/i, '🍷'], [/whiskey/i, '🥃'], [/vodka/i, '🍸'], [/^rum/i, '🏴‍☠️'], [/cocktails/i, '🍹'],
  [/^cigarettes/i, '🚬'], [/^cigars/i, '🟫'], [/^pipe$/i, '🪈'], [/e-cigarettes|vaping/i, '💨'], [/chewing tobacco/i, '🍃'],
  [/protein shakes/i, '💪'], [/meal replacement/i, '🥤'], [/electrolyte|sports drinks/i, '🏃'], [/vitamin \/ probiotic/i, '💊'], [/green \/ detox/i, '🥬'], [/ayurvedic \/ herbal tonics/i, '🌿'],
  [/gym workout|weight training/i, '🏋️'], [/cardio/i, '🏃'], [/yoga \/ meditation/i, '🧘'], [/sports \/ outdoor/i, '🏞️'], [/home workouts/i, '🏠'], [/physiotherapy exercises/i, '🧑‍⚕️'],
  [/football|soccer/i, '⚽'], [/cricket/i, '🏏'], [/basketball/i, '🏀'], [/badminton/i, '🏸'], [/tennis/i, '🎾'], [/running|marathon/i, '🏃'], [/swimming/i, '🏊'], [/cycling/i, '🚴'], [/yoga|pilates/i, '🧘'],
  [/<5 hours/i, '😫'], [/5–7 hours/i, '😐'], [/7–9 hours/i, '😴'], [/>9 hours/i, '🛌'],
  // ---------- tech & apps ----------
  [/^smartphone/i, '📱'], [/^tablet/i, '📲'], [/laptop|desktop/i, '💻'], [/wearable health device/i, '🩺'], [/medication reminders/i, '⏰'], [/symptom (trackers|tracking)|tracking symptoms|digital symptom/i, '📈'],
  [/fitness \/ exercise apps|exercise\/fitness/i, '🏃'], [/diet \/ nutrition apps|diet\/nutrition/i, '🥗'], [/wearable device companion/i, '⌚'], [/virtual support groups/i, '👥'], [/ai-based/i, '🤖'],
  [/prescription refill/i, '🔁'], [/health education|awareness apps/i, '📖'], [/blood pressure monitoring/i, '🫀'], [/mental wellbeing/i, '🧠'], [/appointment management/i, '📅'], [/medical records/i, '🗂️'],
  [/communication with healthcare/i, '💬'], [/android/i, '🤖'], [/iphone|ios/i, '🍏'], [/do not use a smartphone/i, '📵'],
  // ---------- additional details ----------
  [/english/i, '🇬🇧'], [/chinese|mandarin/i, '🇨🇳'], [/hindi/i, '🇮🇳'], [/spanish/i, '🇪🇸'], [/arabic/i, '🇦🇪'], [/french/i, '🇫🇷'], [/bengali/i, '🇧🇩'], [/portuguese/i, '🇧🇷'], [/russian/i, '🇷🇺'],
  [/japanese/i, '🇯🇵'], [/german/i, '🇩🇪'], [/korean/i, '🇰🇷'], [/italian/i, '🇮🇹'], [/turkish/i, '🇹🇷'], [/vietnamese/i, '🇻🇳'], [/tamil|telugu|marathi/i, '🇮🇳'], [/urdu/i, '🇵🇰'], [/indonesian|malay/i, '🇮🇩'],
  [/whatsapp/i, '💬'], [/^facebook/i, '📘'], [/^instagram/i, '📸'], [/x \(twitter\)/i, '𝕏'], [/^linkedin/i, '💼'], [/tiktok/i, '🎵'], [/wechat/i, '🟩'], [/telegram/i, '✈️'], [/snapchat/i, '👻'], [/reddit/i, '👽'],
  [/reading/i, '📖'], [/cooking|baking/i, '🧁'], [/gardening/i, '🌻'], [/^music/i, '🎶'], [/^travel/i, '✈️'], [/gaming/i, '🎮'], [/arts|crafts/i, '🎨'], [/movies|tv series/i, '🎬'], [/fitness \/ sports/i, '🏅'],
  [/volunteering/i, '🙌'], [/spiritual|religious/i, '🙏'], [/spending time with family/i, '👨‍👩‍👧'],
  [/email invitation/i, '📧'], [/doctor or pharmacist/i, '👩‍⚕️'], [/online advertisement/i, '📺'], [/patient community/i, '👥'],
  [/penicillin|antibiotics/i, '💊'], [/sulfa/i, '🧪'], [/aspirin|nsaids/i, '💊'], [/anaesthetics/i, '😷'], [/contrast dye/i, '🩻'], [/^latex/i, '🧤'],
  [/walking stick|cane/i, '🦯'], [/walker|rollator/i, '🛒'], [/^wheelchair/i, '🦽'], [/mobility scooter/i, '🛵'], [/prosthesis/i, '🦿'],
  [/nothing \(fully covered\)/i, '🆓'], [/a small amount/i, '🪙'], [/a moderate amount/i, '💵'], [/a large amount/i, '💰'],
  [/asthma \/ allergies/i, '🌼'], [/mental health conditions/i, '🧠'], [/thyroid disorders/i, '🦋'], [/stroke/i, '⚡'],
  // ---------- numbers ----------
  [/^\d/, '🔢'],
];

export function optionEmoji(q, label, value) {
  const l = String(label).trim();
  if (q === 'gender' && /^other/i.test(l)) return '🌈';
  if (q === 'patient-living-arrangement') return ({ 'living alone': '🧍', 'living with spouse/partner': '💑', 'living with children': '👨‍👧', 'living with parents': '👪', 'living with other family members': '🏠', 'assisted living/community housing': '🏘️' })[l.toLowerCase()] || (/^other/i.test(l) ? '✏️' : null);
  if (q === 'patient-care-support') return ({ 'yes, regularly': '🤝', 'yes, occasionally': '🫶', no: '🙅' })[l.toLowerCase()] || null;
  if (BY_VALUE[q]) return BY_VALUE[q][value] || '💼';
  if (/income/.test(q)) return '💵';
  for (const [re, e] of R) if (re.test(l)) return e;
  return null;
}
export function applySequence(q, n) {
  return SEQ[q] && SEQ[q].length >= n ? SEQ[q].slice(0, n) : null;
}

/** Country code → flag emoji (regional indicator letters) */
export const flagOf = (cc) => (/^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : '🏳️');
