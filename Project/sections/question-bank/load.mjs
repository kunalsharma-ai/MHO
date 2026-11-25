/**
 * The MHO question bank: Profile.json, Question.json and Option.json are the database exports, kept as they are.
 * Every section builder (caregiver, patient, healthcare professional) and the completion-rule exporter read them
 * through here, so one copy of the bank feeds all three panels.
 *
 *   import { bank } from '../../question-bank/load.mjs';
 *   const { PROFILES, QUESTIONS, OPTIONS } = bank('care giver');
 *
 * A panel's profiles and questions are the ones whose `category` names that panel. Options are not filtered:
 * the builders look them up by question name.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

export const DIR = path.dirname(url.fileURLToPath(import.meta.url));
export const FILES = { profiles: path.join(DIR, 'Profile.json'), questions: path.join(DIR, 'Question.json'), options: path.join(DIR, 'Option.json') };

const cache = {};
const oid = (d) => String(d?._id?.$oid ?? d?._id ?? '');
// records in the order they were created (ObjectId order), which is the authored order of options;
// database exports are often sorted another way (for example by label)
const read = (f) => (cache[f] ||= JSON.parse(fs.readFileSync(f, 'utf8')).sort((a, b) => (oid(a) < oid(b) ? -1 : oid(a) > oid(b) ? 1 : 0)));
const norm = (c) => String(c ?? '').trim().toLowerCase();
const has = (doc, category) => [].concat(doc.category ?? []).map(norm).includes(norm(category));

export function bank(category) {
  return {
    PROFILES: read(FILES.profiles).filter((p) => has(p, category)),
    QUESTIONS: read(FILES.questions).filter((q) => has(q, category)),
    OPTIONS: read(FILES.options),
  };
}
