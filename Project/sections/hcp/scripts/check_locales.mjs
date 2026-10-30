// Verifies every locale covers all UI keys, profiles, questions and short option labels,
// and that {placeholders} match English. Run: node scripts/check_locales.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const en = (await import(pathToFileURL(path.join(ROOT, 'src/i18n/en.js')))).default;
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/hcp.generated.json'), 'utf8'));
const OPTIONAL_UI = new Set(['language', 'view', 'pressKey', 'hidden', 'reducedMotion']);
const BRANDS = new Set(['Zoom', 'Skype', 'Google Meet', 'Microsoft Teams', 'WhatsApp Video', 'Paypal', 'iPhone']);
const optLabels = new Set();
for (const q of Object.values(data.questions)) {
  if (!['single', 'multi'].includes(q.type)) continue;
  if (q.source) continue;
  for (const o of q.options || []) if (/[A-Za-z]/.test(o.l) && !BRANDS.has(o.l)) optLabels.add(o.l);
}
// long taxonomy lists (specialisation / management roles) are kept in English by design
for (const n of ['doc-specialization', 'healthcare-management-job-role', 'rural']) for (const o of data.questions[n]?.options || []) optLabels.delete(o.l);
optLabels.add('Urban'); optLabels.add('Rural');

const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(',');
let bad = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'public/locales'))) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/locales', f), 'utf8'));
  const miss = [];
  for (const k of Object.keys(en.ui)) {
    if (OPTIONAL_UI.has(k)) continue;
    if (!(k in d.ui)) miss.push(`ui.${k}`);
    else if (ph(d.ui[k]) !== ph(en.ui[k])) miss.push(`placeholder ui.${k}`);
  }
  for (const s of Object.keys(en.profiles)) for (const fld of ['name', 'desc', 'flavor']) if (!d.profiles?.[s]?.[fld]) miss.push(`profiles.${s}.${fld}`);
  for (const n of Object.keys(data.questions)) if (!d.questions?.[n]) miss.push(`q.${n}`);
  for (const l of optLabels) if (!d.options?.[l]) miss.push(`o.${l}`);
  if (en.ui.roles.split('|').length !== d.ui.roles.split('|').length) miss.push('roles count');
  if (en.ui.tiers.split('|').length !== d.ui.tiers.split('|').length) miss.push('tiers count');
  console.log(`${miss.length ? '✘' : '✔'} ${f}${miss.length ? `: ${miss.length} missing → ${miss.slice(0, 12).join(' | ')}` : ''}`);
  bad += miss.length;
}
process.exit(bad ? 1 : 0);
