/**
 * Phone numbering metadata (calling code + national number length) and country currencies.
 * Carried over from MyFrequentRewards v4.1 (src/validation/phone-meta.js, src/validation/geo.js).
 */
const RAW = `AF 93 9 9|AX 358 5 12|AL 355 8 9|DZ 213 8 9|AS 1 10 10|AD 376 6 9|AO 244 9 9|AI 1 10 10|AQ 672 6 6|AG 1 10 10|AR 54 10 11|AM 374 8 8|AW 297 7 7|AU 61 9 9|AT 43 4 13|AZ 994 9 9|BS 1 10 10|BH 973 8 8|BD 880 10 10|BB 1 10 10|BY 375 9 10|BE 32 8 9|BZ 501 7 7|BJ 229 8 10|BM 1 10 10|BT 975 7 8|BO 591 8 8|BQ 599 7 7|BA 387 8 9|BW 267 7 8|BV 47 8 8|BR 55 10 11|IO 246 7 7|BN 673 7 7|BG 359 7 9|BF 226 8 8|BI 257 8 8|CV 238 7 7|KH 855 8 9|CM 237 9 9|CA 1 10 10|KY 1 10 10|CF 236 8 8|TD 235 8 8|CL 56 9 9|CN 86 7 11|CX 61 9 9|CC 61 9 9|CO 57 10 10|KM 269 7 7|CG 242 9 9|CD 243 9 9|CK 682 5 5|CR 506 8 8|CI 225 10 10|HR 385 8 9|CU 53 6 8|CW 599 7 8|CY 357 8 8|CZ 420 9 9|DK 45 8 8|DJ 253 8 8|DM 1 10 10|DO 1 10 10|EC 593 8 9|EG 20 9 10|SV 503 8 8|GQ 240 9 9|ER 291 7 7|EE 372 7 8|SZ 268 8 8|ET 251 9 9|FK 500 5 5|FO 298 6 6|FJ 679 7 7|FI 358 5 12|FR 33 9 9|GF 594 9 9|PF 689 8 8|TF 262 9 9|GA 241 7 8|GM 220 7 7|GE 995 9 9|DE 49 6 13|GH 233 9 9|GI 350 8 8|GR 30 10 10|GL 299 6 6|GD 1 10 10|GP 590 9 9|GU 1 10 10|GT 502 8 8|GG 44 10 10|GN 224 9 9|GW 245 9 9|GY 592 7 7|HT 509 8 8|HM 672 6 6|VA 39 6 11|HN 504 8 8|HK 852 8 8|HU 36 8 9|IS 354 7 9|IN 91 10 10|ID 62 8 12|IR 98 10 10|IQ 964 8 10|IE 353 7 9|IM 44 10 10|IL 972 8 9|IT 39 6 11|JM 1 10 10|JP 81 9 10|JE 44 10 10|JO 962 8 9|KZ 7 10 10|KE 254 9 9|KI 686 5 8|KP 850 8 10|KR 82 8 10|KW 965 8 8|KG 996 9 9|LA 856 8 10|LV 371 8 8|LB 961 7 8|LS 266 8 8|LR 231 7 9|LY 218 9 9|LI 423 7 9|LT 370 8 8|LU 352 4 11|MO 853 8 8|MG 261 9 9|MW 265 7 9|MY 60 8 10|MV 960 7 7|ML 223 8 8|MT 356 8 8|MH 692 7 7|MQ 596 9 9|MR 222 8 8|MU 230 7 8|YT 262 9 9|MX 52 10 10|FM 691 7 7|MD 373 8 8|MC 377 8 9|MN 976 8 8|ME 382 8 8|MS 1 10 10|MA 212 9 9|MZ 258 8 9|MM 95 7 10|NA 264 8 9|NR 674 7 7|NP 977 8 10|NL 31 9 9|NC 687 6 6|NZ 64 8 10|NI 505 8 8|NE 227 8 8|NG 234 8 10|NU 683 4 4|NF 672 6 6|MK 389 8 8|MP 1 10 10|NO 47 8 8|OM 968 8 8|PK 92 9 10|PW 680 7 7|PS 970 8 9|PA 507 7 8|PG 675 7 8|PY 595 9 9|PE 51 8 9|PH 63 8 10|PN 64 9 9|PL 48 9 9|PT 351 9 9|PR 1 10 10|QA 974 8 8|RE 262 9 9|RO 40 9 9|RU 7 10 10|RW 250 9 9|BL 590 9 9|SH 290 4 5|KN 1 10 10|LC 1 10 10|MF 590 9 9|PM 508 6 6|VC 1 10 10|WS 685 5 7|SM 378 6 10|ST 239 7 7|SA 966 9 9|SN 221 9 9|RS 381 8 9|SC 248 7 7|SL 232 8 8|SG 65 8 8|SX 1 10 10|SK 421 9 9|SI 386 8 8|SB 677 5 7|SO 252 7 9|ZA 27 9 9|GS 500 5 5|SS 211 9 9|ES 34 9 9|LK 94 9 9|SD 249 9 9|SR 597 6 7|SJ 47 8 8|SE 46 7 9|CH 41 9 9|SY 963 8 9|TW 886 8 9|TJ 992 9 9|TZ 255 9 9|TH 66 8 9|TL 670 7 8|TG 228 8 8|TK 690 4 7|TO 676 5 7|TT 1 10 10|TN 216 8 8|TR 90 10 10|TM 993 8 8|TC 1 10 10|TV 688 5 6|UG 256 9 9|UA 380 9 9|AE 971 8 9|GB 44 9 10|US 1 10 10|UM 1 10 10|UY 598 8 8|UZ 998 9 9|VU 678 5 7|VE 58 10 10|VN 84 9 10|VG 1 10 10|VI 1 10 10|WF 681 6 6|EH 212 9 9|YE 967 7 9|ZM 260 9 9|ZW 263 9 10|XK 383 8 9`;

export const PHONE = {};
for (const row of RAW.split('|')) {
  const [cc, dial, min, max] = row.split(' ');
  PHONE[cc] = { dial, min: +min, max: +max };
}
// NANP: valid area code + exchange (first digits 2-9)
const NANP = /^[2-9]\d{2}[2-9]\d{6}$/;
for (const cc of Object.keys(PHONE)) if (PHONE[cc].dial === '1') PHONE[cc].pattern = NANP;

// Mobile prefixes of the national significant number (largest panel markets)
export const MOBILE = {
  IN: /^[6-9]\d{9}$/, CN: /^1[3-9]\d{9}$/, GB: /^7[1-9]\d{8}$/, DE: /^1[5-7]\d{8,9}$/, FR: /^[67]\d{8}$/, ES: /^[67]\d{8}$/,
  IT: /^3\d{8,9}$/, NL: /^6\d{8}$/, BE: /^4\d{8}$/, PT: /^9\d{8}$/, PL: /^(45|5\d|6[069]|7[2389]|8[18])\d{7}$/, SE: /^7[02369]\d{7}$/,
  NO: /^[49]\d{7}$/, DK: /^[2-9]\d{7}$/, FI: /^(4\d|50)\d{4,8}$/, IE: /^8[3-9]\d{7}$/, CH: /^7[5-9]\d{7}$/, AT: /^6\d{6,12}$/,
  AU: /^4\d{8}$/, NZ: /^2\d{7,9}$/, JP: /^[789]0\d{8}$/, KR: /^1[016-9]\d{7,8}$/, TW: /^9\d{8}$/, HK: /^[4-79]\d{7}$/,
  SG: /^[89]\d{7}$/, MY: /^1\d{8,9}$/, ID: /^8\d{8,11}$/, TH: /^[689]\d{8}$/, VN: /^(3|5|7|8|9)\d{8}$/, PH: /^9\d{9}$/,
  PK: /^3\d{9}$/, BD: /^1[3-9]\d{8}$/, LK: /^7\d{8}$/, NP: /^9[78]\d{8}$/, AE: /^5[024-8]\d{7}$/, SA: /^5\d{8}$/, QA: /^[3-7]\d{7}$/,
  KW: /^[569]\d{7}$/, OM: /^[79]\d{7}$/, BH: /^3\d{7}$/, EG: /^1[0-25]\d{8}$/, NG: /^[789][01]\d{8}$/, KE: /^(7\d|1[01])\d{7}$/,
  ZA: /^[6-8]\d{8}$/, GH: /^[25]\d{8}$/, MA: /^[67]\d{8}$/, TR: /^5\d{9}$/, RU: /^9\d{9}$/, UA: /^(39|5\d|6[3-8]|7[35]|9\d)\d{7}$/,
  MX: /^\d{10}$/, BR: /^\d{2}9\d{8}$/, AR: /^9?\d{10}$/, CO: /^3\d{9}$/, CL: /^9\d{8}$/, PE: /^9\d{8}$/, IL: /^5\d{8}$/, IR: /^9\d{9}$/
};
export const CALLING_CODES = Object.entries(PHONE).map(([cc, m]) => [cc, m.dial]);

export const CURRENCY = { US: 'USD', CA: 'CAD', MX: 'MXN', BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', GB: 'GBP', IE: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', GR: 'EUR', LU: 'EUR', SK: 'EUR', SI: 'EUR', EE: 'EUR', LV: 'EUR', LT: 'EUR', MT: 'EUR', CY: 'EUR', HR: 'EUR', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', IS: 'ISK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN', RS: 'RSD', UA: 'UAH', RU: 'RUB', BY: 'BYN', TR: 'TRY', IL: 'ILS', SA: 'SAR', AE: 'AED', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR', JO: 'JOD', LB: 'LBP', EG: 'EGP', MA: 'MAD', DZ: 'DZD', TN: 'TND', NG: 'NGN', GH: 'GHS', KE: 'KES', UG: 'UGX', TZ: 'TZS', ET: 'ETB', ZA: 'ZAR', IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR', CN: 'CNY', HK: 'HKD', TW: 'TWD', JP: 'JPY', KR: 'KRW', SG: 'SGD', MY: 'MYR', ID: 'IDR', TH: 'THB', VN: 'VND', PH: 'PHP', AU: 'AUD', NZ: 'NZD', IR: 'IRR', IQ: 'IQD', KZ: 'KZT', UZ: 'UZS', MN: 'MNT', KH: 'KHR', MM: 'MMK', LA: 'LAK' };
/* countries of the MyHealthOpinions panel not in the MFR list */
Object.assign(CURRENCY, { AF: 'AFN', AL: 'ALL', AO: 'AOA', BA: 'BAM', CM: 'XAF', CR: 'CRC', DO: 'DOP', LY: 'LYD', MU: 'MUR', ZW: 'USD' });
export const currencyFor = (cc) => CURRENCY[cc] || null;
