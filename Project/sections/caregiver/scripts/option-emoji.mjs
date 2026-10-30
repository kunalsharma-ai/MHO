/**
 * Gives EVERY answer option its own emoji, so each option tile has a picture.
 * Rules are checked top to bottom; the first match wins.
 * `q` = question name (some words mean different things in different questions).
 * Edit freely – then run `npm run data`.
 */
const R = [
  // ---------- frequency ladder (checked first so every step gets its own picture) ----------
  [/^(daily|every day|several times a day|multiple times a day|more than once a day)/i, '☀️'], [/^weekly or more|several times a week|^weekly|once a week|every week/i, '📅'],
  [/^monthly|once a month|few times a month|every month/i, '🗓️'], [/every few months|quarterly/i, '🍂'], [/^(yearly|annually|once a year)/i, '🎆'],
  [/^less often|^rarely|^occasionally/i, '🌘'], [/only when needed|as needed/i, '🆘'],
  // ---------- duration / share ladders ----------
  [/less than 5 minutes/i, '⚡'], [/^5.10 minutes/i, '☕'], [/^10.20 minutes/i, '📖'], [/^20 minutes or more/i, '🛋️'],
  [/less than 25%/i, '🌒'], [/^25.49%/i, '🌓'], [/^50.74%/i, '🌔'], [/75% or more/i, '🌕'],
  // ---------- tobacco & nicotine ----------
  [/^cigarettes/i, '🚬'], [/cigars/i, '🟫'], [/pipe tobacco/i, '🪈'], [/smokeless|chewing/i, '🍃'], [/heated tobacco/i, '🔥'], [/vap|e-cig/i, '💨'], [/nicotine pouch|patch|gum/i, '🩹'],
  // ---------- disability groups ----------
  [/physical disabilit/i, '♿'], [/intellectual|developmental/i, '🧩'], [/sensory disabilit/i, '👂'], [/neurological disabilit/i, '🧠'], [/multiple disabilit/i, '🫂'],
  // ---------- facility types ----------
  [/nursing home/i, '🏥'], [/assisted living/i, '🏘️'], [/group home/i, '🏠'],
  // ---------- leadership roles ----------
  [/care supervisor/i, '🧑‍🏫'], [/team leader/i, '🚩'], [/facility\/unit manager|unit manager/i, '🏢'], [/home care manager/i, '🏡'], [/director of care/i, '🎯'], [/operations manager/i, '⚙️'],
  // ---------- care worker titles ----------
  [/personal care assistant/i, '🧴'], [/home health aide/i, '🩹'], [/^healthcare assistant/i, '🩻'], [/^certified nursing assistant/i, '📜'], [/direct support professional/i, '🧑‍🔧'], [/patient\/client support/i, '🫱'],
  // ---------- apps & online platforms ----------
  [/fitness.*apps?|exercise apps/i, '🏃'], [/diet|nutrition apps/i, '🥗'], [/tele(consultation|medicine)/i, '👩‍⚕️'], [/wearable/i, '⌚'],
  [/^food delivery/i, '🛵'], [/e-commerce|marketplace/i, '📦'], [/brand\/manufacturer/i, '🏷️'], [/pharmacy\/healthcare websites/i, '💊'], [/specialty health/i, '🌿'], [/social commerce/i, '🤳'],
  // ---------- yes / no family ----------
  [/^yes,? (i am the primary|fully)/i, '🙋'], [/^yes,? (jointly|partially)/i, '🤝'], [/^yes,? (provide|influence)/i, '💡'],
  [/^yes active license|^yes,? currently|^yes,? regularly/i, '✅'], [/^yes,? but not currently/i, '⏸️'],
  [/^yes\b/i, '✅'], [/^no\b|^not involved|^no involvement|^not licensed/i, '❌'],
  [/^maybe|^not sure|^it varies|^varies/i, '🤔'], [/prefer not/i, '🤐'], [/^not applicable/i, '➖'],
  [/^none|^i do not|do not purchase|^never$|never had/i, '🚫'], [/^other|^others/i, '✏️'],
  [/childcare$/i, '🧸'], [/elder care/i, '🧓'], [/medical\/health-related|healthcare\/medical|health-related support/i, '🩺'], [/long-term assistance/i, '♾️'],
  [/healthcare information/i, '🔎'], [/choosing healthcare/i, '🧭'], [/patient\/client support/i, '🤝'], [/healthcare organization/i, '🏥'], [/similar role/i, '🔁'],
  [/coordinating care/i, '🗂️'], [/^rarely/i, '🌘'], [/mixed age|multiple age/i, '👨‍👩‍👧‍👦'], [/administrative\/support manager/i, '👔'], [/family health/i, '💚'],
  [/not usually involved/i, '🙂'], [/directly from brands/i, '🏷️'], [/nutritionist|dietitian/i, '🥗'], [/^both$/i, '📱'],
  // ---------- people & relationships ----------
  [/grandchild/i, '👶'], [/grandparent/i, '👵'], [/^parent\/guardian/i, '🧑‍🍼'], [/^parent$/i, '👨‍👩‍👧'], [/spouse|partner/i, '💑'],
  [/^child$|^children$|children\/young|^child's home|child\/family|paediatric|children's/i, '🧒'], [/infant/i, '👶'], [/toddler/i, '🧸'],
  [/preschool/i, '🖍️'], [/school-age|^school$/i, '🎒'], [/teenager/i, '🧑‍🎤'], [/sibling/i, '👫'], [/other relative|another family|family member|^family$/i, '👪'],
  [/^friend/i, '🧑‍🤝‍🧑'], [/neighbo/i, '🏘️'], [/^myself \+ children/i, '👨‍👧'], [/^myself \+ spouse/i, '💑'], [/^myself only|^myself$/i, '🙋'],
  [/entire family|household member|^jointly$/i, '👨‍👩‍👧‍👦'], [/someone else|care recipient$/i, '🧑'], [/older adult|elderly|^older|65\+|75\+|frailty/i, '🧓'],
  [/dementia|alzheimer/i, '🧠'], [/disabilit|wheelchair/i, '♿'], [/chronic/i, '🩺'], [/recover|post-surgical|rehabilitation \//i, '🩹'],
  [/terminal|palliative|hospice/i, '🕊️'], [/mental|behavio/i, '🧠'], [/cancer/i, '🎗️'], [/^adult$|adults with/i, '🧑'], [/vulnerable/i, '🫂'],
  [/non-family client|client\/patient|patients with|general patient/i, '🧑‍⚕️'],
  // ---------- gender / marital ----------
  [/^male$/i, '👨'], [/^female$/i, '👩'], [/single/i, '🙂'], [/^married/i, '💍'], [/separated|divorced|widow/i, '💔'], [/domestic partnership|living with someone/i, '🏠'],
  // ---------- caregiving situation & roles ----------
  [/unpaid care to a family/i, '💞'], [/paid\/professional care as part/i, '🩺'], [/both unpaid and paid/i, '🤲'],
  [/professional caregiver|both professional and family/i, '🧑‍⚕️'], [/family\/unpaid caregiver only/i, '💞'], [/not involved in caregiving/i, '🙅'],
  [/personal care aide|personal care assistant/i, '🧼'], [/home care worker|home health aide/i, '🏡'], [/healthcare assistant|nursing assistant|cna/i, '🩺'],
  [/support worker|direct support/i, '🤝'], [/elder care worker/i, '🧓'], [/childcare worker/i, '🧸'], [/live-in/i, '🛏️'], [/community care worker/i, '🏘️'],
  [/residential care worker/i, '🏢'], [/care coordinator|care manager|case manager/i, '🗂️'], [/supervisory|administrative care|supervisor|team leader|director of care|operations manager|unit manager/i, '👔'],
  [/senior caregiver/i, '🎖️'],
  // ---------- care activities ----------
  [/bath|shower|hygiene|toilet/i, '🛁'], [/dressing|grooming|dress/i, '👕'], [/feeding|eating|meal|cooking|food prep/i, '🍲'], [/medication|pill|prescription|injection|iv therapy/i, '💊'],
  [/mobility|transfer|walking aid/i, '🦯'], [/transport/i, '🚗'], [/appointment|scheduling/i, '📅'], [/health monitoring|monitoring|vital|observation|symptom/i, '🩺'],
  [/rehabilitation|physiotherapy/i, '🧘'], [/household|home organization|home & leisure|household products/i, '🏠'], [/shopping|grocery|procurement|purchasing/i, '🛒'],
  [/financ|bill|budget|premium|payment management/i, '💰'], [/emotional|counsel|therap/i, '💗'], [/companionship|social companionship|social support/i, '🫶'],
  [/communication|communicat/i, '💬'], [/paperwork|documentation|reporting|charting|assessment/i, '📝'], [/care planning|planning/i, '🗓️'],
  [/wound/i, '🩹'], [/emergency|triage/i, '🚑'], [/equipment/i, '🦽'], [/training|onboarding|education support|educational/i, '📚'],
  [/recruitment|staff/i, '👥'], [/quality|compliance|audit/i, '✅'], [/incident|complaint|risk/i, '⚠️'], [/supervision$/i, '👀'], [/special-needs/i, '🧩'],
  [/personal care|day-to-day|daily living|activities of daily/i, '🤲'], [/independent living/i, '🗝️'], [/employment support/i, '💼'], [/community participation|community support/i, '🏘️'],
  [/service coordination|provider referral|benefits/i, '🔗'], [/claims?/i, '🧾'], [/coverage|in-network|prior authorization/i, '🛡️'], [/selecting\/changing insurance/i, '🔄'],
  [/overnight/i, '🌙'], [/clinical support/i, '🩻'], [/administrative support/i, '🗂️'], [/patient care coordination/i, '🗂️'], [/handling/i, '🧯'],
  // ---------- places ----------
  [/hospital/i, '🏥'], [/clinic/i, '🏨'], [/nursing home|long-term care|nursing\/|assisted living|residential|group home|supported living/i, '🏢'],
  [/client's home|client homes|individual's home|private home|patient’s home|my home|^home$|home care|home health|home healthcare|private residence/i, '🏡'],
  [/day program|day service|daycare|childcare (facility|center)|day care/i, '🏫'], [/community|outreach|recreation center/i, '🏘️'], [/supermarket|hypermarket|wholesale|convenience|local grocery|specialty retailer|retailer/i, '🏬'],
  [/gym|fitness center|sports club/i, '🏋️'], [/outdoor|public space/i, '🌳'], [/online|virtual|website|app\b|apps|platform|e-commerce|marketplace|social commerce/i, '🌐'],
  [/different country/i, '✈️'], [/live together/i, '🏠'], [/less than 30 minutes/i, '🚶'], [/30–60 minutes/i, '🚌'], [/more than 1 hour/i, '🚆'],
  [/multiple settings|healthcare facility|rehabilitation facility|therapy center|agency/i, '🏥'], [/urban/i, '🏙️'], [/rural/i, '🌾'],
  // ---------- education ----------
  [/less than high school/i, '📒'], [/high school/i, '🏫'], [/diploma|ged|certificate/i, '📜'], [/some college/i, '📚'], [/associate/i, '🎓'], [/bachelor/i, '🎓'],
  [/master/i, '🎓'], [/doctor|phd|professional degree/i, '👩‍🎓'], [/nursing degree|licensed vocational/i, '🩺'], [/cpr|life support|acls|bls/i, '❤️‍🔥'],
  [/geriatric/i, '🧓'], [/infection/i, '🦠'], [/leadership|management training/i, '🧭'], [/certification/i, '📜'], [/license expired|certification expired/i, '⌛'],
  // ---------- work & employment ----------
  [/full-time|fulltime/i, '🕘'], [/part-time|parttime/i, '🕐'], [/self-employed|freelanc/i, '🧑‍💻'], [/government|public employee|govt/i, '🏛️'], [/homemaker/i, '🏡'],
  [/temporary|seasonal|contract/i, '📆'], [/retired|pension/i, '🏖️'], [/unemployed|not working|not currently employed/i, '🔍'], [/agency-employed|employed by|employer/i, '🏢'],
  [/volunteer/i, '🙌'], [/agriculture/i, '🌾'], [/manufacturing/i, '🏭'], [/^service$/i, '🛎️'], [/decision maker|decision-maker|primary decision/i, '👑'],
  [/joint decision|share decision|shared with someone|jointly/i, '🤝'], [/recommend|influenc|advisor|give input/i, '💡'], [/authorized representative/i, '📜'],
  [/recently joined/i, '🌱'], [/support role only|limited involvement/i, '🙂'], [/very involved/i, '🔥'], [/somewhat involved|occasionally involved/i, '👍'], [/minimally involved/i, '🤏'],
  [/operations/i, '⚙️'], [/performance/i, '📈'], [/scheduling|shift/i, '🗓️'],
  // ---------- insurance ----------
  [/currently insured/i, '🛡️'], [/previously insured/i, '⏳'], [/never had health insurance/i, '🚫'], [/government\/public program|medicaid|medicare/i, '🏛️'],
  [/private insurance|private \/ marketplace|purchased directly/i, '🏦'], [/employer provided|employer\/employer|employer pays/i, '🏢'], [/pay the full premium/i, '💳'], [/share the premium/i, '➗'],
  [/someone else pays/i, '🫴'], [/combination of sources/i, '🧩'], [/doctor\/medical visits/i, '👩‍⚕️'], [/hospitalization/i, '🏥'], [/diagnostic/i, '🔬'], [/dental|vision/i, '🦷'],
  // ---------- food & drink ----------
  [/fresh food|organic|groceries$/i, '🥦'], [/packaged/i, '📦'], [/snack/i, '🍿'], [/frozen/i, '🧊'], [/ready-to-eat|meal delivery|meal-kit|food delivery/i, '🍱'],
  [/bakery|confectionery/i, '🥐'], [/cooking ingredients/i, '🧂'], [/baby|children's food/i, '🍼'], [/nutritional|special-diet|medical foods/i, '🥣'],
  [/bottled water/i, '💧'], [/soft drink|cold drink/i, '🥤'], [/juice/i, '🧃'], [/energy drink/i, '⚡'], [/sports drink|electrolyte/i, '🏃'], [/^tea|tea \(/i, '🍵'],
  [/coffee/i, '☕'], [/hot chocolate|cocoa/i, '🍫'], [/herbal|medicinal teas|ayurvedic|tonic/i, '🌿'], [/dairy|plant-based/i, '🥛'], [/functional|health beverage/i, '🧪'],
  [/beer/i, '🍺'], [/wine/i, '🍷'], [/whiskey|whisky|rum|vodka/i, '🥃'], [/cocktail/i, '🍸'], [/alcohol/i, '🍻'], [/protein/i, '💪'], [/meal replacement/i, '🥤'],
  [/vitamin|supplement|probiotic/i, '💊'], [/green|detox/i, '🥬'], [/vegetarian/i, '🥕'], [/vegan/i, '🌱'], [/keto|low-carb/i, '🥑'], [/diabetic|low-sugar/i, '🩸'],
  [/heart-healthy/i, '❤️'], [/gluten/i, '🌾'], [/intermittent fasting/i, '⏳'], [/low-sodium/i, '🧂'], [/high-protein/i, '🍗'], [/allergy/i, '🤧'], [/no special diet/i, '🍽️'],
  [/cigarette|cigar|pipe|tobacco|smokeless|chewing|heated tobacco|nicotine|vaping|e-cig/i, '🚬'], [/used to/i, '🔙'], [/regularly$|yes, regularly/i, '🔁'], [/occasionally/i, '🌗'],
  [/personal care products|beauty|cosmetic/i, '💄'], [/fitness products|fitness\/wellness|sports equipment/i, '🏸'], [/health\/wellness|health & wellness|wellness products/i, '🌿'],
  [/clothing|fashion|footwear/i, '👗'], [/electronics/i, '🔌'], [/beverages/i, '🥤'], [/food & groceries/i, '🧺'], [/pharmacy|pharmacist/i, '💊'],
  // ---------- sport & fitness ----------
  [/football|soccer/i, '⚽'], [/cricket/i, '🏏'], [/basketball/i, '🏀'], [/badminton/i, '🏸'], [/tennis/i, '🎾'], [/running|marathon|jogging|cardio/i, '🏃'],
  [/swimming/i, '🏊'], [/cycling/i, '🚴'], [/yoga|pilates|meditation|stretching/i, '🧘'], [/gym|weight|strength/i, '🏋️'], [/home workout/i, '🏠'],
  [/walking/i, '🚶'], [/team sports/i, '🤾'], [/sports|outdoor activities|recreational/i, '🏅'], [/general health/i, '💚'], [/weight management/i, '⚖️'],
  [/stress/i, '😌'], [/managing a health condition/i, '🩺'], [/supporting the person/i, '🫶'], [/smartwatch|fitness tracker|heart-rate/i, '⌚'], [/smart fitness/i, '🚲'],
  [/<5 hours/i, '😫'], [/5–7 hours/i, '😐'], [/7–9 hours/i, '😴'], [/>9 hours/i, '🛌'],
  // ---------- tech ----------
  [/smartphone|iphone|android/i, '📱'], [/tablet/i, '📲'], [/laptop|desktop/i, '💻'], [/wearable/i, '⌚'], [/telemedicine|teleconsult|telehealth|online consult|online doctor/i, '👩‍💻'],
  [/symptom tracker|tracking/i, '📈'], [/ai\b|ai-based|ai assistant/i, '🤖'], [/refill/i, '💊'], [/support groups|communities/i, '👥'], [/awareness|education apps/i, '📖'],
  [/diet \/ nutrition apps/i, '🥗'], [/fitness \/ exercise apps/i, '🏃'],
  // ---------- surveys & rewards ----------
  [/weekly|bi-weekly|monthly|daily|as available|every few|less often|only when needed|several times/i, '🗓️'], [/less than 5 minutes|5–10 minutes|10–20 minutes|20 minutes/i, '⏱️'],
  [/online \(via|online surveys|online opinion/i, '🖥️'], [/mobile app/i, '📱'], [/telephone|telephonic|cati/i, '📞'], [/in-person/i, '🗣️'], [/focus group/i, '👥'],
  [/product trials|concept/i, '🧪'], [/diary|long-term tracking/i, '📔'], [/healthcare \/ patient/i, '🏥'], [/consumer/i, '🛍️'], [/sharing my opinion/i, '🗣️'],
  [/helping improve/i, '🌍'], [/rewards|incentives|gift card/i, '🎁'], [/learning/i, '🧠'], [/morning/i, '🌅'], [/afternoon/i, '☀️'], [/evening/i, '🌙'],
  [/paypal/i, '🅿️'], [/upi|unified payment/i, '📲'], [/wire transfer|bank/i, '🏦'], [/amazon/i, '🛍️'],
  // ---------- channels / info ----------
  [/whatsapp|telegram|wechat/i, '💬'], [/facebook/i, '📘'], [/instagram/i, '📸'], [/youtube|video/i, '▶️'], [/x \(twitter\)/i, '𝕏'], [/linkedin/i, '💼'], [/tiktok/i, '🎵'],
  [/snapchat/i, '👻'], [/reddit/i, '🤖'], [/search engine/i, '🔎'], [/social media/i, '📣'], [/email invitation/i, '📧'], [/advertisement/i, '📺'], [/doctors|nurses|healthcare provider/i, '👩‍⚕️'],
  [/books|magazines/i, '📚'], [/patient associations|charities/i, '🎗️'], [/caregiver community|association|support group/i, '👥'], [/respite/i, '🛋️'], [/adult day care/i, '🏫'],
  [/medical equipment rental/i, '🦽'],
  // ---------- hobbies / languages ----------
  [/reading/i, '📖'], [/gardening/i, '🌻'], [/music/i, '🎶'], [/travel/i, '✈️'], [/gaming/i, '🎮'], [/arts|crafts/i, '🎨'], [/movies|tv series/i, '🎬'],
  [/spiritual|religious/i, '🙏'], [/spending time with family/i, '👨‍👩‍👧'], [/english/i, '🇬🇧'], [/chinese|mandarin/i, '🇨🇳'], [/hindi/i, '🇮🇳'], [/spanish/i, '🇪🇸'],
  [/arabic/i, '🇦🇪'], [/french/i, '🇫🇷'], [/bengali/i, '🇧🇩'], [/portuguese/i, '🇧🇷'], [/russian/i, '🇷🇺'], [/japanese/i, '🇯🇵'], [/german/i, '🇩🇪'], [/korean/i, '🇰🇷'],
  [/italian/i, '🇮🇹'], [/turkish/i, '🇹🇷'], [/vietnamese/i, '🇻🇳'], [/tamil|telugu|marathi/i, '🇮🇳'], [/urdu/i, '🇵🇰'], [/indonesian|malay/i, '🇮🇩'],
  // ---------- challenges ----------
  [/finding enough time/i, '⏰'], [/financial pressure/i, '💸'], [/emotional stress/i, '😥'], [/physical strain/i, '🏋️'], [/navigating/i, '🧭'], [/balancing work/i, '⚖️'],
  [/no time for myself/i, '🛑'], [/isolated/i, '🏝️'], [/reliable information/i, '🔍'],
  // ---------- conditions ----------
  [/diabetes/i, '🩸'], [/heart disease/i, '❤️'], [/stroke/i, '🧠'], [/parkinson/i, '🤲'], [/arthritis|joint/i, '🦴'], [/copd|breathing/i, '🫁'], [/kidney/i, '🫘'], [/autism/i, '🧩'],
  // ---------- numbers & ranges ----------
  [/year|month/i, '⏳'], [/minutes away/i, '📍'], [/%/, '📊'], [/^\d|more than \d|over \d|under 5/i, '🔢'],
];

export function optionEmoji(q, label) {
  const l = String(label).trim();
  if (q === 'children') return ['🚫', '👶', '👧👦', '👨‍👩‍👧‍👦', '🏫'][['0', '1-3', '4-6', '7-9', '10+'].indexOf(l)] || '👶';
  if (q === 'gender' && /^other/i.test(l)) return '🌈';
  if (/income/.test(q)) return '💵';
  // age ranges → a life-stage face instead of a generic number icon
  if (/(^|-)age|age-?group|-age$/i.test(q) && /^(under )?\d|\+$/.test(l)) {
    const n = /^under/i.test(l) ? 0 : parseInt(l, 10);
    return n < 5 ? '👶' : n < 13 ? '🧒' : n < 18 ? '🧑‍🎓' : n < 25 ? '🧑' : n < 45 ? '🧑‍💼' : n < 65 ? '🧔' : n < 75 ? '👵' : '🧓';
  }
  for (const [re, e] of R) if (re.test(l)) return e;
  return null;
}

/** Country code → flag emoji (regional indicator letters) */
export const flagOf = (cc) => (/^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : '🏳️');
