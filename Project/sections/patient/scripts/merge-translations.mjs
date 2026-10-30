#!/usr/bin/env node
/**
 * Merges translator files into public/data/i18n/<lang>.json.
 *   node scripts/merge-translations.mjs <dir-with-files> <strings.json>
 * Each file is named <lang>-<anything>.txt and has one "index|translation" per line,
 * where index points into <strings.json> (an array of English source strings).
 * Brand names, blood groups etc. are kept as in English automatically.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const [dir, src] = process.argv.slice(2);
const strings = JSON.parse(fs.readFileSync(src, 'utf8'));
const IDENTITY = /^(A|B|AB|O)[+−]$|Acuvue|Advanced Bionics|Air Optix|AlignerCo|Bausch|Biofinity|^Byte$|Candid|ClearCorrect|^Cochlear \(|DAILIES|DrSmile|GN Hearing|Invisalign|MED-EL|Oticon|Phonak|ReSound|Siemens|SmileDirectClub|SnapCorrect|Starkey|SureSmile|Unitron|Widex/;
const LANGS = ['zh', 'es', 'hi', 'ar', 'fr', 'de', 'pt', 'ja', 'ko', 'ru', 'it'];
for (const lang of LANGS) {
  const f = path.join(ROOT, 'public/data/i18n', lang + '.json');
  const dict = JSON.parse(fs.readFileSync(f, 'utf8'));
  let added = 0, bad = 0;
  for (const s of strings) if (IDENTITY.test(s) && !dict[s]) { dict[s] = s; added++; }
  for (const file of fs.readdirSync(dir).filter((x) => x.startsWith(lang + '-') && x.endsWith('.txt')).sort()) {
    for (const line of fs.readFileSync(path.join(dir, file), 'utf8').split('\n')) {
      const m = /^(\d+)\|(.+)$/.exec(line.trim());
      if (!m) continue;
      const en = strings[+m[1]];
      if (en === undefined) { bad++; continue; }
      dict[en] = m[2].trim();
      added++;
    }
  }
  fs.writeFileSync(f, JSON.stringify(Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a.localeCompare(b)))));
  console.log(`${lang}: +${added}${bad ? ` (${bad} bad lines)` : ''}`);
}
