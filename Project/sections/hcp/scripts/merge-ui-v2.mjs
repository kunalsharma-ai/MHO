#!/usr/bin/env node
/**
 * Merges the v2.0 UI strings (src/i18n/v2/<code>.json) into public/locales/<code>.json → "ui".
 * English lives in src/i18n/v2/en.json and is bundled through src/i18n/en.js.
 *   node scripts/merge-ui-v2.mjs        (then: node scripts/check_locales.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src/i18n/v2');
const OUT = path.join(ROOT, 'public/locales');
const en = JSON.parse(fs.readFileSync(path.join(SRC, 'en.json'), 'utf8'));
for (const f of fs.readdirSync(OUT)) {
  const code = f.replace('.json', '');
  const src = path.join(SRC, f);
  if (!fs.existsSync(src)) { console.warn('⚠ no v2 strings for', code); continue; }
  const v2 = JSON.parse(fs.readFileSync(src, 'utf8'));
  const missing = Object.keys(en).filter((k) => !(k in v2));
  if (missing.length) console.warn(`⚠ ${code}: ${missing.length} keys fall back to English: ${missing.slice(0, 8).join(', ')}`);
  const loc = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  loc.ui = { ...loc.ui, ...v2 };
  fs.writeFileSync(path.join(OUT, f), JSON.stringify(loc));
  console.log('✓', code, Object.keys(v2).length, 'v2 keys');
}
