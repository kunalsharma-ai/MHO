#!/usr/bin/env node
/**
 * Reports missing translations.
 *   node scripts/i18n-check.mjs
 * - question/option texts: public/data/content-strings.en.json vs public/data/i18n/<lang>.json
 * - UI strings: src/i18n/en.js vs src/i18n/<lang>.js
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const strings = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/content-strings.en.json'), 'utf8')).filter((s) => /[A-Za-z]/.test(s) && !/^(Up to \d+|\d+ and above|\d+-\d+)$/.test(s)); // number ranges are formatted automatically
const en = (await import(url.pathToFileURL(path.join(ROOT, 'src/i18n/en.js')).href)).default;
let missingTotal = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'public/data/i18n'))) {
  const lang = f.replace('.json', '');
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/i18n', f), 'utf8'));
  const miss = strings.filter((s) => !dict[s]);
  const ui = (await import(url.pathToFileURL(path.join(ROOT, 'src/i18n', lang + '.js')).href)).default;
  const uiMiss = Object.keys(en).filter((k) => !(k in ui));
  missingTotal += miss.length + uiMiss.length;
  console.log(`${lang}: content ${strings.length - miss.length}/${strings.length}${miss.length ? ' – missing e.g. "' + miss[0] + '"' : ''} · UI ${Object.keys(en).length - uiMiss.length}/${Object.keys(en).length}${uiMiss.length ? ' – missing ' + uiMiss.join(', ') : ''}`);
}
process.exit(missingTotal ? 1 : 0);
