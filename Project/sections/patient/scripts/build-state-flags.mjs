#!/usr/bin/env node
/**
 * Builds the small state / province flag images used next to every state option.
 * Source: https://github.com/amckenna41/iso3166-flag-icons (ISO 3166-2 subdivision flags, MIT/public-domain artwork)
 *   git clone --depth 1 --filter=blob:none --sparse https://github.com/amckenna41/iso3166-flag-icons /tmp/fi
 *   (cd /tmp/fi && git sparse-checkout set iso3166-2-flags)
 *   node scripts/build-state-flags.mjs /tmp/fi/iso3166-2-flags
 * Output: public/images/flags/s/<ISO-CODE>.webp (48×32) + public/data/state-flags.json (list of codes that have a flag).
 * States without an official flag get a generated badge in the UI (country flag + state code), so nothing is blank.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) { console.error('usage: node scripts/build-state-flags.mjs <iso3166-2-flags dir>'); process.exit(1); }
const OUT = path.join(ROOT, 'public/images/flags/s');
fs.mkdirSync(OUT, { recursive: true });
const want = new Set();
const geoDir = path.join(ROOT, 'public/data/geo');
for (const f of fs.readdirSync(geoDir)) if (f.endsWith('.json')) for (const [, code] of JSON.parse(fs.readFileSync(path.join(geoDir, f), 'utf8')).state || []) want.add(code.toUpperCase());
const files = new Map();
for (const cc of fs.readdirSync(SRC)) {
  const d = path.join(SRC, cc);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d)) {
    const m = /^(.+)\.(svg|png|jpe?g)$/i.exec(f);
    if (!m) continue;
    const code = m[1].toUpperCase();
    if (!want.has(code)) continue;
    const prev = files.get(code);
    if (!prev || /svg$/i.test(f)) files.set(code, path.join(d, f));
  }
}
const ok = [];
let i = 0;
for (const [code, file] of files) {
  try {
    await sharp(file, { density: 96 }).resize(48, 32, { fit: 'cover', position: 'centre' }).webp({ quality: 82 }).toFile(path.join(OUT, code + '.webp'));
    ok.push(code);
  } catch (e) { console.warn('skip', code, e.message); }
  if (++i % 200 === 0) console.log(i, '/', files.size);
}
ok.sort();
fs.writeFileSync(path.join(ROOT, 'public/data/state-flags.json'), JSON.stringify(ok));
console.log(`✔ ${ok.length} of ${want.size} states/provinces have a flag image`);
