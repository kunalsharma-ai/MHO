// Country helpers for the 86 MHO panel countries: dial codes, currencies, postal-code rules.
export const DIAL = {
  DZ: '213', AO: '244', CM: '237', KE: '254', ET: '251', GH: '233', LY: '218', MU: '230', MA: '212', NG: '234',
  ZA: '27', UG: '256', ZW: '263', AF: '93', PK: '92', BD: '880', KH: '855', CN: '86', HK: '852', IN: '91',
  ID: '62', JP: '81', MY: '60', NP: '977', PH: '63', SG: '65', KR: '82', LK: '94', TW: '886', TH: '66',
  VN: '84', AL: '355', AT: '43', BE: '32', BA: '387', BG: '359', HR: '385', CZ: '420', DK: '45', EE: '372',
  FI: '358', FR: '33', DE: '49', GR: '30', HU: '36', IS: '354', IE: '353', IT: '39', LU: '352', NL: '31',
  NO: '47', PL: '48', PT: '351', RO: '40', RU: '7', SK: '421', ES: '34', SE: '46', CH: '41', TR: '90',
  UA: '380', GB: '44', CA: '1', CR: '506', DO: '1', MX: '52', US: '1', AR: '54', BR: '55', CL: '56',
  CO: '57', PE: '51', AU: '61', NZ: '64', BH: '973', CY: '357', EG: '20', IR: '98', IQ: '964', IL: '972',
  JO: '962', KW: '965', OM: '968', QA: '974', SA: '966', AE: '971',
};

export const CURRENCY = {
  DZ: 'DZD', AO: 'AOA', CM: 'XAF', KE: 'KES', ET: 'ETB', GH: 'GHS', LY: 'LYD', MU: 'MUR', MA: 'MAD', NG: 'NGN',
  ZA: 'ZAR', UG: 'UGX', ZW: 'USD', AF: 'AFN', PK: 'PKR', BD: 'BDT', KH: 'KHR', CN: 'CNY', HK: 'HKD', IN: 'INR',
  ID: 'IDR', JP: 'JPY', MY: 'MYR', NP: 'NPR', PH: 'PHP', SG: 'SGD', KR: 'KRW', LK: 'LKR', TW: 'TWD', TH: 'THB',
  VN: 'VND', AL: 'ALL', AT: 'EUR', BE: 'EUR', BA: 'BAM', BG: 'BGN', HR: 'EUR', CZ: 'CZK', DK: 'DKK', EE: 'EUR',
  FI: 'EUR', FR: 'EUR', DE: 'EUR', GR: 'EUR', HU: 'HUF', IS: 'ISK', IE: 'EUR', IT: 'EUR', LU: 'EUR', NL: 'EUR',
  NO: 'NOK', PL: 'PLN', PT: 'EUR', RO: 'RON', RU: 'RUB', SK: 'EUR', ES: 'EUR', SE: 'SEK', CH: 'CHF', TR: 'TRY',
  UA: 'UAH', GB: 'GBP', CA: 'CAD', CR: 'CRC', DO: 'DOP', MX: 'MXN', US: 'USD', AR: 'ARS', BR: 'BRL', CL: 'CLP',
  CO: 'COP', PE: 'PEN', AU: 'AUD', NZ: 'NZD', BH: 'BHD', CY: 'EUR', EG: 'EGP', IR: 'IRR', IQ: 'IQD', IL: 'ILS',
  JO: 'JOD', KW: 'KWD', OM: 'OMR', QA: 'QAR', SA: 'SAR', AE: 'AED',
};

// Postal code patterns (countries without postal codes accept any 0–10 chars and the field is optional).
export const ZIP = {
  US: /^\d{5}(-\d{4})?$/, IN: /^[1-9]\d{5}$/, GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
  DE: /^\d{5}$/, FR: /^\d{5}$/, IT: /^\d{5}$/, ES: /^\d{5}$/, AU: /^\d{4}$/, NZ: /^\d{4}$/, CN: /^\d{6}$/,
  JP: /^\d{3}-?\d{4}$/, BR: /^\d{5}-?\d{3}$/, MX: /^\d{5}$/, NL: /^\d{4} ?[A-Z]{2}$/i, BE: /^\d{4}$/, AT: /^\d{4}$/,
  CH: /^\d{4}$/, SE: /^\d{3} ?\d{2}$/, NO: /^\d{4}$/, DK: /^\d{4}$/, FI: /^\d{5}$/, PL: /^\d{2}-\d{3}$/,
  PT: /^\d{4}-\d{3}$/, IE: /^[A-Z]\d[\dW] ?[A-Z\d]{4}$/i, RU: /^\d{6}$/, KR: /^\d{5}$/, SG: /^\d{6}$/,
  MY: /^\d{5}$/, TH: /^\d{5}$/, PH: /^\d{4}$/, ID: /^\d{5}$/, VN: /^\d{6}$/, PK: /^\d{5}$/, BD: /^\d{4}$/,
  LK: /^\d{5}$/, NP: /^\d{5}$/, TW: /^\d{3}(\d{2,3})?$/, ZA: /^\d{4}$/, NG: /^\d{6}$/, KE: /^\d{5}$/,
  EG: /^\d{5}$/, SA: /^\d{5}(-\d{4})?$/, IL: /^\d{5}(\d{2})?$/, TR: /^\d{5}$/, UA: /^\d{5}$/, RO: /^\d{6}$/,
  GR: /^\d{3} ?\d{2}$/, CZ: /^\d{3} ?\d{2}$/, SK: /^\d{3} ?\d{2}$/, HU: /^\d{4}$/, BG: /^\d{4}$/, HR: /^\d{5}$/,
  AR: /^([A-Z]\d{4}[A-Z]{3}|\d{4})$/i, CL: /^\d{7}$/, CO: /^\d{6}$/, PE: /^\d{5}$/, CR: /^\d{5}$/, DO: /^\d{5}$/,
  MA: /^\d{5}$/, DZ: /^\d{5}$/, IR: /^\d{10}$/, IQ: /^\d{5}$/, JO: /^\d{5}$/, KW: /^\d{5}$/, OM: /^\d{3}$/,
  CY: /^\d{4}$/, LU: /^\d{4}$/, IS: /^\d{3}$/, EE: /^\d{5}$/, AL: /^\d{4}$/, BA: /^\d{5}$/, KH: /^\d{5,6}$/,
  AF: /^\d{4}$/, ET: /^\d{4}$/, MU: /^\d{5}$/, BH: /^\d{3,4}$/,
};
// Countries where postal codes are not commonly used: field becomes optional.
export const NO_ZIP = new Set(['HK', 'AE', 'QA', 'AO', 'GH', 'UG', 'ZW', 'CM', 'LY']);

export function currencyFmt(cc, lang) {
  const cur = CURRENCY[cc];
  if (!cur) return (n) => String(n);
  try {
    const f = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, maximumFractionDigits: 0 });
    return (n) => f.format(n);
  } catch { return (n) => `${cur} ${n}`; }
}

/** Turn raw income labels like "Up to 712800" / "712801-1350001" / "3898806 and above" into currency text. */
export function formatIncomeLabel(label, cc, lang) {
  const f = currencyFmt(cc, lang);
  const nums = String(label).match(/\d+/g);
  if (!nums) return label;
  if (/^up to/i.test(label)) return `≤ ${f(+nums[0])}`;
  if (/above/i.test(label)) return `${f(+nums[0])}+`;
  if (nums.length >= 2) return `${f(+nums[0])} – ${f(+nums[1])}`;
  return label;
}

/** { code: 'INR', symbol: '₹', name: 'Indian Rupee' } for a country, names in the UI language */
export function currencyInfo(cc, lang = 'en') {
  const code = CURRENCY[cc];
  if (!code) return null;
  const loc = lang === 'zh' ? 'zh-CN' : lang;
  let symbol = code; let name = code;
  try { symbol = new Intl.NumberFormat(loc, { style: 'currency', currency: code, currencyDisplay: 'narrowSymbol' }).formatToParts(1).find((p) => p.type === 'currency')?.value || code; } catch { /* old browser */ }
  try { name = new Intl.DisplayNames([loc], { type: 'currency' }).of(code) || code; } catch { /* old browser */ }
  return { code, symbol, name };
}
