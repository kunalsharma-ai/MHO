// npm run i18n:generate -- [--langs zh-CN,ja,hi] [--provider azure|deepl|google|endpoint] [--limit 500]
//
// Machine-translates i18n/source-strings.json (from `npm run i18n:extract`) into every language and writes
// src/i18n/generated/<code>.json. Those files are bundled with the site (one lazy chunk per language), so
// the WHOLE site then switches language instantly, offline and inside mainland China — no runtime API.
//
// Runs on your build machine only. API keys come from environment variables and never reach the browser:
//   azure    AZURE_TRANSLATOR_KEY, AZURE_TRANSLATOR_REGION   (Azure AI Translator; Azure China has its own endpoint: AZURE_TRANSLATOR_ENDPOINT)
//   deepl    DEEPL_API_KEY                                    (DeepL API; not every language here is supported by DeepL)
//   google   GOOGLE_TRANSLATE_KEY                             (Google Cloud Translation v2, API key)
//   endpoint TRANSLATE_ENDPOINT                               (your own POST endpoint, same contract as VITE_TRANSLATE_URL)
//
// Existing translations are kept (incremental: only new strings are sent), so re-running after content
// changes is cheap. Review machine output for legal pages and medical wording before publishing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]] : acc), [])
);
const { LANGUAGES } = await import(pathToFileURL(path.join(ROOT, 'src/i18n/languages.js')).href);
const SRC = path.join(ROOT, 'i18n/source-strings.json');
const OUT = path.join(ROOT, 'src/i18n/generated');
if (!fs.existsSync(SRC)) {
  console.error('✖ i18n/source-strings.json not found — run `npm run build && npm run i18n:extract` first.');
  process.exit(1);
}
const provider = args.provider || (process.env.AZURE_TRANSLATOR_KEY ? 'azure' : process.env.DEEPL_API_KEY ? 'deepl' : process.env.GOOGLE_TRANSLATE_KEY ? 'google' : process.env.TRANSLATE_ENDPOINT ? 'endpoint' : '');
if (!provider) {
  console.error('✖ No translation provider configured. Set AZURE_TRANSLATOR_KEY, DEEPL_API_KEY, GOOGLE_TRANSLATE_KEY or TRANSLATE_ENDPOINT (see README → Multilanguage).');
  process.exit(1);
}
const KEEP = ['MyHealthOpinions', 'Frequent Research', 'PayPal', 'UPI', 'WhatsApp', 'Amazon', 'ESOMAR', 'GDPR', 'ISO'];
const strings = JSON.parse(fs.readFileSync(SRC, 'utf8')).map((s) => s.text).slice(0, Number(args.limit) || undefined);
const langs = LANGUAGES.filter((l) => l.code !== 'en' && (!args.langs || String(args.langs).split(',').includes(l.code)));

const DEEPL = { 'zh-CN': 'ZH-HANS', 'zh-TW': 'ZH-HANT', pt: 'PT-BR', nb: 'NB', en: 'EN-GB' };
async function translate(batch, l) {
  if (provider === 'azure') {
    const ep = process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
    const to = { 'zh-CN': 'zh-Hans', 'zh-TW': 'zh-Hant', nb: 'nb', fil: 'fil' }[l.code] || l.mt;
    const r = await fetch(`${ep}/translate?api-version=3.0&from=en&to=${to}&textType=plain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY, ...(process.env.AZURE_TRANSLATOR_REGION ? { 'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION } : {}) },
      body: JSON.stringify(batch.map((Text) => ({ Text }))),
    });
    if (!r.ok) throw new Error(`Azure ${r.status} ${await r.text()}`);
    return (await r.json()).map((x) => x.translations?.[0]?.text ?? null);
  }
  if (provider === 'deepl') {
    const key = process.env.DEEPL_API_KEY;
    const host = key.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
    const r = await fetch(`${host}/v2/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `DeepL-Auth-Key ${key}` },
      body: JSON.stringify({ text: batch, source_lang: 'EN', target_lang: DEEPL[l.code] || l.mt.toUpperCase() }),
    });
    if (!r.ok) throw new Error(`DeepL ${r.status} ${await r.text()}`);
    return (await r.json()).translations.map((x) => x.text);
  }
  if (provider === 'google') {
    const target = { 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', nb: 'no', fil: 'tl', he: 'iw' }[l.code] || l.mt;
    const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: batch, source: 'en', target, format: 'text' }),
    });
    if (!r.ok) throw new Error(`Google ${r.status} ${await r.text()}`);
    return (await r.json()).data.translations.map((x) => x.translatedText);
  }
  const r = await fetch(process.env.TRANSLATE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source: 'en', target: l.mt, texts: batch }) });
  if (!r.ok) throw new Error(`Endpoint ${r.status}`);
  return (await r.json()).translations;
}

/** Protect brand names from being translated: swap for placeholders, restore afterwards. */
const protect = (s) => KEEP.reduce((t, w, i) => t.split(w).join(`⟦${i}⟧`), s);
const restore = (s) => s.replace(/⟦\s*(\d+)\s*⟧/g, (_, i) => KEEP[+i] ?? '');

fs.mkdirSync(OUT, { recursive: true });
for (const l of langs) {
  const file = path.join(OUT, `${l.code}.json`);
  const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  const todo = strings.filter((s) => !existing[s]);
  process.stdout.write(`${l.code.padEnd(6)} ${todo.length} new string(s) `);
  for (let i = 0; i < todo.length; ) {
    const batch = [];
    let chars = 0;
    while (i < todo.length && batch.length < 50 && chars + todo[i].length < 9000) chars += todo[i++].length, batch.push(todo[i - 1]);
    if (!batch.length) batch.push(todo[i++]);
    try {
      const res = await translate(batch.map(protect), l);
      batch.forEach((s, k) => res[k] && (existing[s] = restore(res[k])));
      process.stdout.write('.');
    } catch (e) {
      console.error(`\n  ✖ ${l.code}: ${e.message.slice(0, 200)}`);
      break;
    }
  }
  fs.writeFileSync(file, JSON.stringify(existing, null, 0));
  console.log(` ✔ ${Object.keys(existing).length} total`);
}
console.log('Done. Rebuild (npm run build) to bundle the new translations.');
