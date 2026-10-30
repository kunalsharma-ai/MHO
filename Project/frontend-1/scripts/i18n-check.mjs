// npm run i18n:check — validates the hand-written dictionaries in src/i18n/dict/:
//   • every language in src/i18n/languages.js (except English) has a dictionary file
//   • every dictionary has exactly one entry per key in keys.js (same order)
//   • no entry is left identical to the English key by accident (reported as a warning)
//   • every language has a sound signature
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DICT = path.join(ROOT, 'src/i18n/dict');
const { KEYS } = await import(pathToFileURL(path.join(DICT, 'keys.js')).href);
const { LANGUAGES } = await import(pathToFileURL(path.join(ROOT, 'src/i18n/languages.js')).href);
const soundSrc = fs.readFileSync(path.join(ROOT, 'src/i18n/sounds.js'), 'utf8');

let errors = 0;
let warnings = 0;
const SAME_OK = new Set(['FAQ', 'Blogs', 'Global', 'Sitemap', 'Platform', 'Patient', 'Patients', 'Home', 'Contact', 'Trending', 'Rewards', 'Africa', 'India', 'Asia', 'Close']);
for (const l of LANGUAGES) {
  if (!new RegExp(`(^|\\s)'?${l.sound.replace('-', '\\-')}'?: \\(t\\)`, 'm').test(soundSrc)) {
    console.error(`✖ ${l.code}: no sound recipe "${l.sound}"`);
    errors++;
  }
  if (l.code === 'en') continue;
  const file = path.join(DICT, `${l.code}.js`);
  if (!fs.existsSync(file)) {
    console.error(`✖ ${l.code}: missing src/i18n/dict/${l.code}.js`);
    errors++;
    continue;
  }
  const list = (await import(pathToFileURL(file).href)).default;
  if (list.length !== KEYS.length) {
    console.error(`✖ ${l.code}: ${list.length} entries, expected ${KEYS.length}`);
    errors++;
  }
  const same = list.filter((v, i) => v === KEYS[i] && !SAME_OK.has(v) && !/^[\d₹$€£ /]+/.test(v));
  if (same.length > 8) {
    console.warn(`⚠ ${l.code}: ${same.length} entries identical to English (${same.slice(0, 4).join(' | ')} …)`);
    warnings++;
  }
}
console.log(`${errors ? '✖' : '✔'} ${LANGUAGES.length} languages · ${KEYS.length} keys · ${errors} errors · ${warnings} warnings`);
process.exit(errors ? 1 : 0);
