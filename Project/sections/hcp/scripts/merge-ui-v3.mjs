#!/usr/bin/env node
/**
 * Merges the UI strings of v2.0 and v3.0 (src/i18n/v2/<code>.json, then src/i18n/v3/<code>.json) into
 * public/locales/<code>.json → "ui". English lives in src/i18n/{v2,v3}/en.json and is bundled through src/i18n/en.js.
 *   node scripts/merge-ui-v3.mjs        (then: node scripts/check_locales.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/locales');
for (const ver of ['v2', 'v3']) {
  const SRC = path.join(ROOT, 'src/i18n', ver);
  const en = JSON.parse(fs.readFileSync(path.join(SRC, 'en.json'), 'utf8'));
  for (const f of fs.readdirSync(OUT)) {
    const src = path.join(SRC, f);
    if (!fs.existsSync(src)) { console.warn(`⚠ no ${ver} strings for`, f); continue; }
    const strings = JSON.parse(fs.readFileSync(src, 'utf8'));
    const missing = Object.keys(en).filter((k) => !(k in strings));
    if (missing.length) console.warn(`⚠ ${ver} ${f}: ${missing.length} keys fall back to English: ${missing.slice(0, 8).join(', ')}`);
    const loc = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
    loc.ui = { ...loc.ui, ...strings };
    fs.writeFileSync(path.join(OUT, f), JSON.stringify(loc));
    console.log('✓', ver, f, Object.keys(strings).length, 'keys');
  }
}
