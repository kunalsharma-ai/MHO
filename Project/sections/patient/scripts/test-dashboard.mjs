#!/usr/bin/env node
/**
 * End-to-end check of the dashboard section (v2):
 *   • completes the 6 About You PROFILES, then every SURVEY in order (surveys must stay locked until all
 *     profiles are done and must open one at a time)
 *   • checks the header Reward Points / Quality Score after delivery (50 pts + 1 QS per item by default)
 *   • checks that a locked survey opens the "vault" dialog instead of the question flow
 *
 *   npm run build:preview && npm run test:dashboard            (uses the single-file preview)
 *   BASE_URL=http://localhost:4173/ npm run test:dashboard     (against dist/ served by npm run serve)
 *   PERSONA=chronic SHOTS=./shots npm run test:dashboard
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const PREVIEW = path.resolve('preview/MHO-Patient-Dashboard-Preview.html');
const BASE = process.env.BASE_URL || 'file://' + PREVIEW;
const DATA = JSON.parse(fs.readFileSync(new URL('../public/data/patient.json', import.meta.url)));
const PROFILES = DATA.profiles.filter((p) => p.chapter === 'you').map((p) => p.id);
const SURVEYS = DATA.profiles.filter((p) => p.chapter !== 'you').map((p) => p.id);
const SHOTS = process.env.SHOTS;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const TEXT = {
  dob: '1978-04-12', mail: 'priya.sharma@example.com', website: 'example.com',
  'food-allergy': 'Peanuts and lactose', bmi: '31.5',
  'social-media-x': 'priya_health', 'social-media-youtube': '', 'social-media-linkedin': 'linkedin.com/in/priya', 'social-media-facebook': '', 'social-media-instagram': 'priya.health',
  'payment-method-upi': 'priya@okaxis', 'payment-method-paypal': 'priya@example.com', 'payment-method-amazon': 'priya@example.com',
  'payment-method-bank-name': 'State Bank of India', 'payment-method-bank-ifsc': 'SBIN0001234', 'payment-method-bank-account': '123456789012',
  'ad-preferred-name': 'Priya', 'ad-mobile': '+91 98765 43210', 'ad-alt-email': '', 'ad-height': '164', 'ad-weight': '71', 'ad-diagnosis-year': '2015',
  'ad-household-size': '4',
  'ad-about': 'I have lived with type 2 diabetes and high blood pressure for ten years and I manage them with medicine, walking and a careful diet.',
  'ad-wish': '',
};

/* persona = preferred option labels (substring match, an array selects several); everything else → first option */
const ONLY = process.env.PERSONA;
const ALL_CONDITIONS = ['Diabetes', 'Hypertension', 'High Cholesterol', 'Asthma', 'Arthritis', 'Heart Disease', 'Depression', 'Obesity', 'Cancer', 'Thyroid', 'Sleep Apnea', 'Skin Disorder', 'Gastric', 'Neurologic', 'Vision / Hearing', 'Autoimmune', 'Dental', 'Bone and', 'Male / Female', 'HIV'];
const PERSONAS_ALL = {
  chronic: { country: 'India', 'health-status': 'Poor', 'chronic-conditions': ALL_CONDITIONS, 'vision-condition-treatment-category': ['Glasses', 'Hearing Aids'], 'lense-type': 'Monthly', 'hiv-test': 'Yes', 'dental-condition-alignment': 'Yes, currently', 'obesity-mesures': 'Yes', 'have-food-allergy': 'Yes', alcohol: 'Yes, regularly', smoke: 'Yes', 'do-exercise': 'Yes', 'do-sport-participation': 'Yes', 'employment-status': 'Employed full-time', industry: 'Service', 'payment-method': 'Wire', 'disease-types': ['Diabetes', 'High blood pressure', 'Asthma'], 'patient-health-condition': 'Yes', 'health-monitoring-device': 'Yes', 'health-medical-apps': 'Yes, regularly' },
  healthy: { country: 'United States', 'health-status': 'Excellent', 'patient-health-condition': 'No', 'employment-status': 'Student', 'payment-method': 'Paypal', 'disease-types': 'None of these', 'have-food-allergy': 'No', alcohol: 'Never', smoke: 'No', 'do-exercise': 'No', 'do-sport-participation': 'No', 'receiving-treatment-primary-condition': 'No', 'health-monitoring-device': 'No', 'health-medical-apps': 'No', 'diagnostic-test-releted-to-primary-condition': 'No' },
  other: { country: 'Germany', 'health-status': 'Fair', 'chronic-conditions': ['Depression'], 'employment-status': 'Homemaker', 'payment-method': 'UPI', 'disease-types': ['Other diagnosed', 'Migraine'], 'primary-health-condition': 'Migraine', gender: 'Other', 'relationship-status': 'Married', 'condition-diagnsis-by-healthcareprofessional': 'Yes' },
  retired: { country: 'United Arab Emirates', 'health-status': 'Fair', 'chronic-conditions': ['Cancer', 'Male / Female'], 'employment-status': 'Retired', industry: 'Govt', 'payment-method': 'Amazon', 'disease-types': ['Cancer', 'Osteoporosis'] },
};
const PERSONAS = ONLY ? { [ONLY]: PERSONAS_ALL[ONLY] } : PERSONAS_ALL;
const ZIP = { India: '110001', 'United States': '10001', Germany: '10115', 'United Arab Emirates': '' };

async function answerOne(page, persona, log) {
  await page.waitForSelector('h3.q-label[id], .celebrate, .view-review, .view-empty', { timeout: 8000 });
  const label = page.locator('h3.q-label[id]');
  if (!(await label.count())) return null; // celebration / review / empty state – handled by caller
  const id = (await label.getAttribute('id')).slice(3);
  const pref = persona[id];
  if (await page.locator('.loading[aria-busy]').count()) { await page.waitForTimeout(300); return id; }
  if (await page.locator('.listbox').count()) {
    if (pref) await page.fill('.search-box input', pref);
    await page.locator('.listbox li[role=option]:not(.other)').first().click();
  } else if (await page.locator('.chips').count()) {
    const chips = page.locator('.chips .chip');
    const multi = (await page.locator('.chips[role=group]').count()) > 0;
    const prefs = Array.isArray(pref) ? pref : pref ? [pref] : [];
    let clicked = 0;
    for (const want of prefs) {
      const m = chips.filter({ hasText: want });
      if (await m.count()) { await m.first().click(); clicked++; if (!multi) break; await page.waitForTimeout(40); }
    }
    if (!clicked) await chips.first().click();
    if (await page.locator('.specify input').count()) {
      await page.fill('.specify input', 'My own answer');
      await page.locator('.specify input').press('Enter');
    } else if (multi) {
      await page.locator('.q-actions .btn.primary').click();
    }
  } else if (await page.locator('.nm-grid').count()) {
    const f = page.locator('.nm-f input');
    await f.nth(0).fill('Kunal'); await f.nth(2).fill('Sharma');
    await page.locator('.text-q .btn.primary').click();
  } else if (await page.locator('.dob').count()) {
    await page.fill('.dob input.seg-d', '12'); await page.fill('.dob input.seg-m', '04'); await page.fill('.dob input.seg-y', '1978');
    await page.locator('.text-q .btn.primary').click();
  } else if (await page.locator('.ph-row').count()) {
    const PHONE = { India: '9876543210', 'United States': '2015550123', Germany: '15123456789', 'United Arab Emirates': '501234567' };
    await page.fill('.ph-row input', PHONE[persona.country] || '9876543210');
    await page.locator('.text-q .btn.primary').click();
  } else {
    const input = page.locator('.text-q input, .text-q textarea').first();
    let v = TEXT[id];
    if (id === 'zipcode') v = ZIP[persona.country] ?? '12345';
    if (v === undefined) v = 'Sample answer text';
    if (v === '' && (await page.locator('.text-q .btn.ghost').count())) await page.locator('.text-q .btn.ghost').click();
    else {
      await input.fill(v);
      const confirm = page.locator('.text-q input[placeholder]').nth(1);
      if (id === 'payment-method-bank-account') await confirm.fill(v);
      await page.locator('.text-q .btn.primary').click();
    }
  }
  log.push(id);
  await page.waitForTimeout(350);
  await page.waitForFunction((prev) => !document.querySelector('#ql-' + CSS.escape(prev)) || document.querySelector('.q-err.on') || document.querySelector('.celebrate'), id, { timeout: 8000 }).catch(() => {});
  const err = page.locator('.q-err.on');
  if (await err.count()) throw new Error(`validation error on ${id}: ${await err.innerText()}`);
  return id;
}


async function complete(page, persona, pid, name) {
  await page.evaluate((id) => { location.hash = 'profile=' + id; }, pid);
  const log = [];
  for (let step = 0; step < 260; step++) {
    if (await page.locator('.celebrate').count()) return { ok: true, log };
    if (await page.locator('.vdlg').count()) return { ok: false, locked: true, log };
    if (await page.locator('.view-empty').count()) { await page.locator('.view-empty .btn.primary').click(); await page.waitForTimeout(200); continue; }
    if (await page.locator('.view-review').count()) return { ok: true, log };
    try { await answerOne(page, persona, log); } catch (e) {
      console.log(`  ✖ ${name}/${pid} after [${log.slice(-3).join(', ')}]: ${e.message.split('\n')[0]}`);
      if (SHOTS) await page.screenshot({ path: `${SHOTS}/fail-${name}-${pid}.png` });
      return { ok: false, log };
    }
  }
  return { ok: false, log };
}
const header = async (page) => page.evaluate(() => ({
  pts: document.querySelector('#mho-pts .hp-num')?.getAttribute('aria-label'),
  qs: document.querySelector('#mho-qs .hp-num')?.getAttribute('aria-label'),
}));
async function backHome(page) {
  const btn = page.locator('.cel-row .btn.ghost');
  if (await btn.count()) await btn.click(); else await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  // wait for the delivery animation to finish
  await page.waitForFunction(() => !document.querySelector('.well.filling') && !document.querySelector('.tok'), null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(400);
}

const browser = await chromium.launch();
let failures = 0;
for (const [name, persona] of Object.entries(PERSONAS)) {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE);
  await page.waitForSelector('.scard', { timeout: 15000 });
  // a survey must be locked before the profiles are done
  await page.locator('.scard .sc-hit').first().click();
  const vault = await page.locator('.vdlg').count();
  console.log(vault ? '  ✔ locked survey shows the vault dialog' : '  ✖ locked survey did not show the vault dialog');
  if (!vault) failures++;
  if (SHOTS && vault) await page.screenshot({ path: `${SHOTS}/${name}-vault.png` });
  await page.keyboard.press('Escape');
  let n = 0;
  for (const pid of [...PROFILES, ...SURVEYS]) {
    if (SURVEYS.includes(pid) && pid === SURVEYS[0]) {
      const locked = await page.locator('.scard.is-locked').count();
      console.log(`  ✔ after profiles: ${locked} of ${SURVEYS.length} surveys still locked (expected ${SURVEYS.length - 1})`);
      if (locked !== SURVEYS.length - 1) failures++;
    }
    const r = await complete(page, persona, pid, name);
    if (r.ok) n++;
    console.log(`${r.ok ? '  ✔' : '  ✖'} ${name.padEnd(9)} ${pid.padEnd(16)} ${r.log.length} answers${r.locked ? ' (LOCKED)' : ''}`);
    if (!r.ok) { failures++; break; }
    if (SHOTS && (pid === PROFILES[0] || pid === SURVEYS[0])) { await page.waitForTimeout(1900); await page.screenshot({ path: `${SHOTS}/${name}-cel-${pid}.png` }); }
    await backHome(page);
    const want = String(n * 50), wantQs = String(n);
    await page.waitForFunction(([a, b]) => document.querySelector('#mho-pts .hp-num')?.getAttribute('aria-label').replace(/\D/g, '') === a && document.querySelector('#mho-qs .hp-num')?.getAttribute('aria-label').replace(/\D/g, '') === b, [want, wantQs], { timeout: 20000 }).catch(() => {});
    const h = await header(page);
    const ok = h.pts?.replace(/\D/g, '') === want && h.qs?.replace(/\D/g, '') === wantQs;
    if (!ok) { console.log(`  ✖ header after ${pid}: ${JSON.stringify(h)} expected ${want} pts / ${wantQs} QS`); failures++; }
    if (process.env.SAVE_STATE) fs.writeFileSync(`${process.env.SAVE_STATE}/state-${n}.json`, await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).map((k) => [k, localStorage.getItem(k)])))));
    if (SHOTS && pid === PROFILES[PROFILES.length - 1]) await page.screenshot({ path: `${SHOTS}/${name}-unlocked.png`, fullPage: true });
  }
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/${name}-final.png`, fullPage: true });
  console.log(`  → ${name}: ${n} items completed${errors.length ? ' · JS errors: ' + errors.join(' | ') : ''}`);
  if (errors.length) failures++;
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n✖ ${failures} problem(s)` : '\n✔ every profile and survey completed, locks and rewards correct');
process.exit(failures ? 1 : 0);
