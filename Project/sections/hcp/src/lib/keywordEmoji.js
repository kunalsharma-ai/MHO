/**
 * Meaningful emoji for options in the very long lists that have no hand-picked emoji
 * (degrees, diplomas, sectors, departments, freelancer roles, job titles…).
 * The first matching keyword wins; the order goes from specific to general.
 */
const RULES = [
  [/dental|dentist|orthodont/i, '🦷'], [/veterin|animal/i, '🐾'], [/nurs/i, '👩‍⚕️'], [/pharma/i, '💊'], [/physio|physical therap|chiropract|osteopath/i, '🦴'],
  [/radio(log|graph)|x-?ray|imaging|oncology/i, '🩻'], [/lab(orator)?|patholog/i, '🧪'], [/optom|vision|ophthalm/i, '👓'], [/audiolog|hearing/i, '👂'],
  [/nutri|diet|food|meat|bakery|culinary|catering|hotel|hospitality/i, '🍽️'], [/medic|clinic|health|surgery|m\.d\./i, '🩺'], [/psych/i, '🧠'],
  [/genetic|biotech|bio-?tech|genom/i, '🧬'], [/bio(chem|log|medic)/i, '🦠'], [/chem/i, '⚗️'], [/physics|nuclear|atomic/i, '⚛️'], [/math|statist|quant/i, '📐'],
  [/data|analytic|mining/i, '📊'], [/artificial intell|machine learn|\bai\b|robot/i, '🤖'], [/cyber|security|risk/i, '🛡️'],
  [/software|computer|comput|\bit\b|informat|programm|coder|php|developer|wordpress|drupal|cms|web|app\b|android|ios/i, '💻'],
  [/electronic|semiconductor|electrical|instrument|mechatron/i, '🔌'], [/telecom|communication|broadcast|radio\b/i, '📡'],
  [/aero|aviation|aircraft|space|air force/i, '✈️'], [/marine|naval|navy|ship|maritime|marines/i, '⚓'], [/army|military|guard|veteran|reserv|active duty|defen|arms\b|service academy/i, '🎖️'],
  [/automo|vehicle|car\b|motor/i, '🚗'], [/civil|construct|building|real estate|property/i, '🏗️'], [/architect|interior|planning|city/i, '🏛️'],
  [/mechanical|production|industrial|manufactur|plant\b|steel|metal|mining|ceramic|plastic|pulp|paper|wood|leather/i, '🏭'],
  [/petrol|oil|gas|energy|power|electric util/i, '⛽'], [/water|environment|ecolog|forestry|natural resource|green/i, '🌱'], [/agri|farm|crop|plant science|horticult/i, '🌾'],
  [/textile|garment|fashion|apparel|handloom|knit|weav|spinn/i, '🧵'], [/design|graphic|logo|banner|color|ux\b|creative tech/i, '🎨'], [/animation|multimedia|video game|film|cinema/i, '🎬'],
  [/fine art|\barts?\b|painting|sculpt/i, '🖼️'], [/music|musical/i, '🎵'], [/sport|fitness|athlet|leisure/i, '🏅'], [/tourism|travel/i, '🧳'],
  [/law|legal|juris|legum|justice|criminal|canon/i, '⚖️'], [/divinity|theolog|ministry|religio/i, '🕊️'], [/philosoph/i, '🤔'],
  [/language|linguist|letters|literature|english|writer|writing|blog|content|copy|article|novel|scribble|sentence|alphabet|e-book/i, '✍️'],
  [/journal|news|media|publish|press/i, '📰'], [/library/i, '📚'], [/teach|education|training|tutor|elementary/i, '🍎'],
  [/social work|community|public affair|public admin|public service|policy|government|polit/i, '🏛️'],
  [/econom/i, '📈'], [/accoun|audit|tax/i, '🧾'], [/bank|financ|invest|trading|bfsi|insurance/i, '🏦'], [/commerce|trade|retail|ecommerce|store/i, '🛍️'],
  [/market|advertis|brand|seo|link build|back-?link|digital marketing|email/i, '📣'], [/sales|business develop/i, '🤝'],
  [/business|management|mba|enterprise|admin|executive|strategic|operation|project|program/i, '💼'],
  [/logist|supply|dispatch|transport|warehous|cold chain|packag|procure/i, '🚚'], [/customer|support|service/i, '🎧'],
  [/quality|inspect/i, '✅'], [/research|r&d|science|scientif/i, '🔬'], [/tobacco/i, '🚬'], [/virtual assistant|\bva\b|data entry|record/i, '🗂️'],
  [/spouse|family/i, '👪'], [/retire/i, '🌅'], [/student|considering/i, '🎓'],
];
export function keywordEmoji(label, fallback) {
  const s = String(label || '');
  for (const [re, e] of RULES) if (re.test(s)) return e;
  return fallback;
}
