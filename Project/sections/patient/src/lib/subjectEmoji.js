/**
 * Emoji for long option lists that have none in the question bank (degrees, sectors, departments,
 * freelance roles, job titles): chosen from what the option is ABOUT, never at random.
 * First matching rule wins (specific subjects before general ones).
 */
const RULES = [
  [/midwi|nursing|\bnurse|\bgnm\b|\banm\b/i, '👩‍⚕️'], [/pharm/i, '💊'], [/dental|dentist|denti/i, '🦷'],
  [/physio|physical therap|chiropract|occupational therap|osteopath|podiatr/i, '🦴'], [/radiolog|x-ray|imaging|radiograph|radio oncology/i, '🩻'],
  [/dialysis|blood/i, '🩸'], [/optom|ophthal|audiolog/i, '👁️'], [/ayurved|naturopath|homeopath|herbal/i, '🌿'], [/yoga/i, '🧘'],
  [/nutrition|diet/i, '🥗'], [/patholog|lab tech|laboratory|medical lab|\bdmlt\b|clinical research/i, '🧪'],
  [/obstetric|gynae|child health|\bdch\b|\bdgo\b/i, '🤰'], [/dermatolog|cosmetolog/i, '💆'], [/infection|sanitary|icu|first aid|paramedic|\bot technician/i, '🚑'],
  [/surg|medicine|medical|\bm\.?d\b|health|hospital|clinic|physician/i, '⚕️'],
  [/veterin|animal/i, '🐾'], [/agricult|farm|horticult|plant|crop|fertiliz|pesticide/i, '🌾'], [/forest|wood|pulp|paper/i, '🌲'], [/fish/i, '🐟'],
  [/bakery|confection/i, '🧁'], [/culinary|food|bevarage|beverage|meat/i, '🍳'], [/hotel|hospitality/i, '🏨'], [/tourism|travel|leisure/i, '🧳'],
  [/space/i, '🚀'], [/aviation|aero|aircraft|air hostess|air force/i, '✈️'], [/automobile|automotive/i, '🚗'],
  [/marine|shipbuild|navy|coast guard|marines/i, '⚓'], [/robot|mechatron/i, '🤖'], [/mechanical|production|manufactur|industrial|instrument/i, '⚙️'],
  [/semiconductor|electronic/i, '🔌'], [/electric|power|energy/i, '⚡'], [/civil|construction|site engineering|surveying|architect/i, '🏗️'],
  [/petroleum|oil|gas/i, '🛢️'], [/chemi/i, '⚗️'], [/mining|metallurg|steel/i, '⛏️'], [/ceramic|plastic/i, '🏺'],
  [/biotech|genetic|molecular|microbio|biochem|biomedical|biology|neuroscience|physiology/i, '🧬'],
  [/android|ios|mobile|app\b|app /i, '📱'], [/seo|google|keyword|link|search engine|alexa|backlink|back-link/i, '🔍'], [/e-?mail|mail chimp|gmail/i, '📧'],
  [/social media|facebook|pinterest|instagram|smm/i, '📣'], [/logo|graphic|banner|icon|color|colour|holograph|3d|2d|\bdesign/i, '🎨'],
  [/ui\b|ux\b|user interface/i, '🖌️'], [/data entry|excel|sql|record|data arranger|word count/i, '🗂️'], [/data|analytics|big data/i, '📊'],
  [/web|wordpress|wp\b|php|html|css|cms|drupal|shopify|coder|developer|programm|software|computer|information tech|\bi\.?t\b|information system|informatics|it sector|internet/i, '💻'],
  [/writer|writing|content|article|blog|story|novel|copy|scribble|sentence|alphabet|letters|literature|creative writing/i, '✍️'],
  [/virtual assist|customer|support|chat|phone|correspondent|ticket/i, '🎧'], [/ecommerce|e-commerce|shop|retail|store/i, '🛒'],
  [/marketing|advertis|brand|sales|ads|adwords|buzz|engagement|booster|promot/i, '📈'],
  [/cyber law|intellectual property|taxation law|labou?r law|\blaw|legal|juris|\bllm|legum|canon law/i, '⚖️'], [/forensic/i, '🔎'], [/criminal|criminolog|justice|public safety|security/i, '🚔'],
  [/actuar|insurance|risk/i, '🛡️'], [/bank|bfsi|invest|trading|financ|finance/i, '🏦'], [/account|taxation|tax\b|commerce/i, '🧾'], [/econom/i, '📉'],
  [/human resource|\bhr\b|hrd|labor relations|industrial and labor/i, '🤝'], [/supply|logistic|dispatch|transport/i, '🚚'], [/warehous|packaging|store/i, '📦'],
  [/project|program management/i, '📋'], [/consult/i, '💡'], [/procurement|purchas/i, '🧮'], [/quality|inspection/i, '✅'], [/research|r&d/i, '🔬'],
  [/business|management|\bmba\b|pgdm|administration|enterprise|strategic|operation|executive|manager|mid level/i, '💼'],
  [/library/i, '📚'], [/journalism|mass comm|news|publishing|editorial/i, '📰'], [/broadcast|radio|media/i, '🎙️'], [/music|jazz|sacred music/i, '🎵'],
  [/photograph/i, '📷'], [/animation|multimedia|video game/i, '🎮'], [/film|acting|entertainment|creative|cultur|art|fine arts/i, '🎭'],
  [/fashion|apparel|garment|tailor/i, '👗'], [/textile|handloom|knitting|weaving|leather/i, '🧵'], [/interior|house design|real estate|urban|city planning|landscape/i, '🏡'],
  [/event/i, '🎉'], [/language|french|german|linguist|modern languages|foreign/i, '🗣️'],
  [/psycholog|cognitive|counsel|guidance/i, '🧠'], [/social work|child advocacy|community/i, '🫶'],
  [/theolog|divinity|religio|bible|rabbinic|ministry|sacred/i, '🕊️'], [/philosoph|humanities|liberal|history|anthropolog|american studies|indian studies/i, '🏛️'],
  [/politic|public admin|public affairs|public policy|public management|government|govt|international (relations|affairs|studies)|foreign service|public service/i, '🏛️'],
  [/math|statistic|quantitative/i, '📐'], [/physics/i, '🔭'], [/meteorolog/i, '🌦️'], [/environment/i, '🌍'], [/science|scientist/i, '🔬'],
  [/sport|athletic|physical education/i, '🏅'], [/military|army|veteran|reserv|national guard|defen[cs]e|arms|service academy|active duty|spouse|enthusiast/i, '🎖️'],
  [/telecom/i, '📡'], [/water/i, '💧'], [/tobacco/i, '🚬'], [/gambl/i, '🎲'], [/floral/i, '💐'], [/teach|education|elementary|nursery|childhood|training|school|\bd\.?\s?el\.?\s?ed|\bett\b|\bntt\b/i, '🧑‍🏫'],
  [/maintenance|utilities|facilities/i, '🔧'], [/information services/i, 'ℹ️'], [/professional services|word specialist|blank page/i, '🗒️'], [/natural resource/i, '🏞️'], [/considering joining/i, '🤔'], [/family member/i, '👪'], [/multi task|\bva\b/i, '🧑‍💻'], [/auditing/i, '🧐'], [/doctor|doctoral|ph\.?d/i, '👨‍🎓'], [/master/i, '🎓'], [/bachelor|degree|associate/i, '🎓'], [/diploma|course/i, '📜'],
];
export function subjectEmoji(label, fallback = '💬') {
  for (const [re, e] of RULES) if (re.test(label)) return e;
  return fallback;
}
