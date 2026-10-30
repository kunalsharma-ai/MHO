#!/usr/bin/env node
/**
 * v2.0 dashboard strings: merges scripts/i18n-v2/<lang>.json into src/i18n/<lang>.js and removes the
 * strings of sections that were removed (hero language strip, stats, ticker, care promise tiles,
 * Care Treasure Chest). Safe to run more than once.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'zh', 'es', 'hi', 'ar', 'fr', 'de', 'pt', 'ja', 'ko', 'ru', 'it'];
const DROP = /^(hero\.(kicker|title1|title2|motto|sub|cta|ctaContinue|ctaDone|ctaSecondary|pick|chip\d)$|hero\.stat\.|ticker\.|promise\.|tr\.|dash\.(title|sub|eyebrow|journey|meter|complete|continue|todo|done|doneEmpty|additional|additionalSub|allDone|loading)$|card\.(reward|earned|step)$|cel\.(reward|points|worth|toGift|giftReady|kept|keptNote)$)/;

for (const l of LANGS) {
  const file = path.join(ROOT, 'src/i18n', l + '.js');
  const mod = await import(url.pathToFileURL(file).href + '?v=' + Date.now());
  const cur = { ...mod.default };
  for (const k of Object.keys(cur)) if (DROP.test(k)) delete cur[k];
  const add = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/i18n-v2', l + '.json'), 'utf8'));
  Object.assign(cur, add);
  const head = l === 'en' ? '/** English UI strings – the source of truth for every other locale. */\n' : `/** UI strings: ${l} */\n`;
  const body = Object.entries(cur).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');
  fs.writeFileSync(file, `${head}export default {\n${body}\n};\n`);
  console.log('✔', l, Object.keys(cur).length, 'strings');
}
