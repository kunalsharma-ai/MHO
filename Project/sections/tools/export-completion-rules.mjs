#!/usr/bin/env node
/**
 * Writes backend/app/lib/sectionRules.json: what each profile questionnaire (caregiver, patient, healthcare
 * professional) actually asks, so the backend's profile completion counts the same questions the member sees.
 *
 * The section packages apply their own rules on top of the question bank (questions moved between profiles,
 * duplicates no longer asked, follow-ups that open on a specific answer, optional questions). The backend reads
 * the bank directly, so without these rules a finished profile could never reach 100%.
 *
 * Only the DIFFERENCES from the bank are written, so later edits to the bank keep working:
 *   profiles[name].remove / .add   question names taken off / placed on a profile
 *   rules[name]                    when a question applies: "always", or { p: parent, v: [values] | "*" }
 *   optional                       questions a member may skip (a saved "skipped" answer counts as answered)
 *
 * Usage: node sections/tools/export-completion-rules.mjs <Profile.json> <Question.json> <Option.json> [out.json]
 *        (exports of the Profile, Question and Option collections, as arrays)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const [profFile, qFile, oFile, outFile = path.join(here, '../../backend/app/lib/sectionRules.json')] = process.argv.slice(2);
if (!oFile) { console.error('usage: export-completion-rules.mjs <Profile.json> <Question.json> <Option.json> [out.json]'); process.exit(1); }
const read = (f) => { const j = JSON.parse(fs.readFileSync(f, 'utf8')); return Array.isArray(j) ? j : j.data || j.Profile || j.Question || j.Option || []; };
const oid = (x) => (x && x.$oid) || (x == null ? x : String(x));
const live = (d) => d.isActive !== false && d.isDeleted !== true;
const PROFILES = read(profFile).filter(live).map((d) => ({ ...d, _id: oid(d._id) }));
const QUESTIONS = read(qFile).filter((d) => d.isDeleted !== true).map((d) => ({ ...d, _id: oid(d._id) }));
const OPTIONS = read(oFile).filter(live).map((d) => ({ ...d, _id: oid(d._id) }));
const qBy = new Map(QUESTIONS.map((q) => [q.name, q]));
const optBy = new Map();
for (const o of OPTIONS) (optBy.get(o.question) || optBy.set(o.question, []).get(o.question)).push(o);
const byId = (l) => [...l].sort((a, b) => (a._id < b._id ? -1 : a._id > b._id ? 1 : 0));
const key = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
const namesOf = (doc) => [...new Set((doc.pages || []).flatMap((pg) => (Array.isArray(pg) ? pg.slice(1) : [])))];

function collect(names) {
  const seen = new Set();
  let queue = [...names];
  while (queue.length) {
    queue = [...new Set(queue)].filter((n) => n && !seen.has(n));
    queue.forEach((n) => seen.add(n));
    queue = queue.map((n) => qBy.get(n)?.parent).filter(Boolean);
  }
  const questions = [...seen].map((n) => qBy.get(n)).filter(Boolean);
  const options = [...seen].flatMap((n) => optBy.get(n) || []);
  return { questions: byId(questions), options: byId(options) };
}

/** The bank's own rule for a question, as the backend reads it (parent + option/validation parent values). */
function bankRule(name) {
  const q = qBy.get(name);
  if (!q || !q.parent) return 'always';
  const vals = [...new Set((optBy.get(name) || []).flatMap((o) => [].concat(o.parentValue ?? [])).filter((v) => v && v !== '-').map((v) => String(v).toLowerCase()))];
  return { p: q.parent, v: vals.length ? vals.sort() : '*' };
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------------------------------------------------------------- caregiver and patient (same engine) */
async function engineRules(dir, category, main, extraFor) {
  const lib = pathToFileURL(path.join(here, '..', dir, 'src/lib')).href;
  const { default: build } = await import(lib + '/builder.js');
  const Q26 = await import(lib + '/questions-2026.js');
  const docs = Q26.editProfileDocs(byId(PROFILES.filter((p) => key(p.category) === category && !/not in use/i.test(p.name || ''))));
  const docOf = (name) => docs.find((d) => key(d.name) === key(name));
  const out = { profiles: {}, rules: {}, optional: new Set() };
  for (const doc of docs) {
    const also = (Q26.preloadFor ? Q26.preloadFor(doc.name) : []).map(docOf).filter((d) => d && d !== doc);
    const { questions, options } = collect([...namesOf(doc), ...extraFor(doc), ...also.flatMap(namesOf)]);
    const built = JSON.parse(build({ PROFILES: [doc, ...also], QUESTIONS: questions, OPTIONS: options })[main]);
    const prof = built.profiles.find((p) => key(p.source) === key(doc.name));
    if (!prof) continue;
    const raw = namesOf(PROFILES.find((p) => p._id === doc._id) || doc);
    const remove = raw.filter((n) => !prof.questions.includes(n));
    const add = prof.questions.filter((n) => !raw.includes(n));
    if (remove.length || add.length) out.profiles[key(doc.name)] = { ...(remove.length ? { remove } : {}), ...(add.length ? { add } : {}) };
    for (const n of prof.questions) {
      const q = built.questions[n];
      if (!q) continue;
      let rule;
      if (q.geo) rule = 'always'; // country / state / city / income: asked of everyone, in that order
      else if (q.type !== 'choice') rule = q.when ? { p: q.when.q, v: q.when.any ? '*' : [...q.when.in].map((v) => String(v).toLowerCase()).sort() } : 'always';
      else {
        const opts = q.options || [];
        if (!opts.length || opts.some((o) => !o[2])) rule = 'always';
        else rule = { p: q.parent, v: [...new Set(opts.flatMap((o) => o[2]).map((v) => String(v).toLowerCase()))].sort() };
      }
      if (!same(rule, bankRule(n))) out.rules[n] = rule;
      if (q.optional) out.optional.add(n);
    }
  }
  return { profiles: out.profiles, rules: out.rules, optional: [...out.optional].sort() };
}

/* ---------------------------------------------------------------- healthcare professional */
async function hcpRules() {
  // the HCP package builds each profile with its own builder (overrides.json holds its rules)
  const lib = path.join(here, '../hcp/src/lib');
  const overrides = JSON.parse(fs.readFileSync(path.join(lib, 'overrides.json'), 'utf8'));
  const tmp = fs.mkdtempSync(path.join((await import('os')).tmpdir(), 'hcp-builder-'));
  fs.writeFileSync(path.join(tmp, 'overrides.json'), JSON.stringify(overrides));
  fs.writeFileSync(path.join(tmp, 'builder.mjs'), fs.readFileSync(path.join(lib, 'builder.js'), 'utf8').replace(/from\s+["']\.\/overrides\.json["'];?/, 'from "./overrides.json" with { type: "json" };'));
  const { default: build } = await import(pathToFileURL(path.join(tmp, 'builder.mjs')).href);
  const mine = PROFILES.filter((p) => key(p.category) === 'healthcare professional' && !/not in use/i.test(p.name || ''));
  const byName = new Map();
  for (const d of [...mine].sort((x, y) => Number(/\s/.test(x.slug || ' ')) - Number(/\s/.test(y.slug || ' ')))) if (!byName.has(key(d.name))) byName.set(key(d.name), d);
  const docs = mine.filter((d) => byName.get(key(d.name)) === d);
  const allNames = [...new Set(docs.flatMap(namesOf))];
  const out = { profiles: {}, rules: {}, optional: new Set() };
  for (const doc of docs) {
    const { questions, options } = collect([...namesOf(doc), 'country']);
    let built;
    try { built = JSON.parse(build({ PROFILES: [doc], QUESTIONS: questions, OPTIONS: options, ALL_NAMES: allNames, DYNAMIC: [] })['hcp.generated.json']); } catch (e) { console.warn('hcp', doc.slug, e.message); continue; }
    const prof = built.profiles.find((p) => p.slug === doc.slug);
    if (!prof) continue;
    const raw = namesOf(doc);
    const remove = raw.filter((n) => !prof.questions.includes(n));
    const add = prof.questions.filter((n) => !raw.includes(n));
    if (remove.length || add.length) out.profiles[key(doc.name)] = { ...(remove.length ? { remove } : {}), ...(add.length ? { add } : {}) };
    const qs = prof.questions;
    for (const n of qs) {
      const q = built.questions[n];
      if (!q) continue;
      let rule;
      if (q.when) rule = { p: q.when.q, v: q.when.answered ? '*' : [...q.when.in].map((v) => String(v).toLowerCase()).sort() };
      else if (q.source === 'joblevel') rule = bankRule(n); // job levels are bank options that follow the specialisation
      else if (q.source || q.type === 'country') rule = 'always'; // country / state / city / ethnicity / income lists
      else if (!q.parent) rule = 'always';
      else {
        const opts = Array.isArray(q.options) ? q.options : [];
        const vals = opts.length && opts.every((o) => o.p) ? [...new Set(opts.flatMap((o) => o.p).map((v) => String(v).toLowerCase()))].sort() : '*';
        if (qs.includes(q.parent)) rule = { p: q.parent, v: opts.length ? vals : '*' };
        // parent answered in another profile: every option shows while it is unanswered, the matching ones after
        else rule = vals === '*' ? 'always' : { p: q.parent, v: vals, loose: true };
      }
      if (!same(rule, bankRule(n))) out.rules[n] = rule;
      if (q.optional) out.optional.add(n);
    }
  }
  return { profiles: out.profiles, rules: out.rules, optional: [...out.optional].sort() };
}

const rules = {
  'care giver': await engineRules('caregiver', 'care giver', 'caregiver.json', () => ['country', 'department', 'hw', 'do-exercise', 'do-sport-participation']),
  patient: await engineRules('patient', 'patient', 'patient.json', (doc) => ['country', ...(namesOf(doc).includes('department') ? ['employment-jobrole'] : [])]),
  'healthcare professional': await hcpRules(),
};
const body = { _doc: 'Generated by sections/tools/export-completion-rules.mjs from the section packages. Do not edit by hand.', ...rules };
fs.writeFileSync(outFile, JSON.stringify(body, null, 1) + '\n');
for (const [c, r] of Object.entries(rules)) console.log(`${c}: ${Object.keys(r.profiles).length} profiles edited, ${Object.keys(r.rules).length} question rules, ${r.optional.length} optional`);
console.log('wrote', outFile);
