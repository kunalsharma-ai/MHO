#!/usr/bin/env node
/**
 * End-to-end check: completes EVERY profile and survey for several caregiver personas (in the order the
 * gate allows: About You profiles first, then the surveys one by one) and fails if any item cannot reach
 * its completion screen. Uses the v2.0 inputs: three name boxes, phone with country code, DOB calendar.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run build && npx serve dist -l 4173 &
 *   BASE_URL=http://localhost:4173/ npm run test:flows
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4173/';
const ITEMS = JSON.parse(fs.readFileSync(new URL('../public/data/caregiver.json', import.meta.url))).profiles;
// About You profiles first, then the surveys (the order the dashboard unlocks them)
const PROFILES = [...ITEMS.filter((p) => p.chapter === 'you'), ...ITEMS.filter((p) => p.chapter !== 'you')].map((p) => p.id);
const MOBILE = { India: '9876543210', 'United States': '2125550123', Germany: '15123456789', 'United Arab Emirates': '501234567' };

const TEXT = {
  fullname: 'Priya Sharma', dob: '1985-04-12', mail: 'priya.sharma@example.com', website: 'example.com',
  'cg-jobrole': 'Care manager', 'cg-allergy-details': 'Peanuts',
  'social-media-x': 'priya_cares', 'social-media-youtube': '', 'social-media-linkedin': 'linkedin.com/in/priya', 'social-media-facebook': '', 'social-media-instagram': 'priya.cares',
  'payment-method-upi': 'priya@okaxis', 'payment-method-paypal': 'priya@example.com', 'payment-method-amazon': 'priya@example.com',
  'payment-method-bank-name': 'State Bank of India', 'payment-method-bank-ifsc': 'SBIN0001234', 'payment-method-bank-account': '123456789012',
  'ad-preferred-name': 'Priya', 'ad-mobile': '+91 98765 43210', 'ad-alt-email': '', 'ad-occupation': 'Home carer',
  'ad-household-size': '4', 'ad-caregiving-years': '6', 'ad-caregiving-hours': '20',
  'ad-about': 'I look after my mother who lives with dementia and I also work part time as a carer for older adults in my town.',
  'ad-wish': '',
};

/* persona = preferred option labels (substring match); everything else → first option */
const ONLY = process.env.PERSONA;
const PERSONAS_ALL = {
  unpaid: { 'caregiver-support': 'Yes', 'caregiving-situation': 'unpaid care', country: 'India', gender: 'Other', 'food-allergies': 'Yes', 'payment-method': 'UPI' },
  paid: { 'caregiver-support': 'Yes', 'caregiving-situation': 'paid/professional care as part', country: 'United States', 'cg-describe': 'Supervisory', 'professional-qualification': 'Other', 'payment-method': 'Wire' },
  both: { 'caregiver-support': 'Yes', 'caregiving-situation': 'both', country: 'Germany', 'cg-describe': 'Home Health Aide', 'payment-method': 'Paypal', 'empstat-homeuser': 'Homemaker' },
  notCaring: { 'caregiver-support': 'No', country: 'United Arab Emirates', 'payment-method': 'Amazon' },
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
  if (await page.locator('.name-q').count()) {
    // v2.0: three name boxes – first (required), middle + last (optional)
    await page.fill('#in-fullname-first', 'Priya');
    await page.fill('#in-fullname-last', 'Sharma');
    await page.locator('.name-q .btn.primary').click();
  } else if (await page.locator('.dob-q').count()) {
    // v2.0: date-of-birth calendar – year → month → day, then confirm
    if (!(await page.locator('.cal.v-years').count())) await page.locator('.dob-field').click();
    await page.locator('.cal-y:not([disabled])').nth(5).click();
    await page.locator('.cal-m:not([disabled])').nth(3).click();
    await page.locator('.cal-d:not([disabled])').nth(11).click();
    await page.locator('.dob-q .q-actions .btn.primary').click();
  } else if (await page.locator('.phone-q').count()) {
    await page.fill('.phone input[type=tel]', MOBILE[persona.country] || '9876543210');
    await page.locator('.phone-q .q-actions .btn.primary').click();
  } else if (await page.locator('.listbox').count()) {
    if (pref) await page.fill('.search-box input', pref);
    await page.locator('.listbox li[role=option]:not(.other)').first().click();
  } else if (await page.locator('.chips').count()) {
    const chips = page.locator('.chips .chip');
    let target = chips.first();
    if (pref) {
      const m = chips.filter({ hasText: pref });
      if (await m.count()) target = m.first();
    }
    const multi = (await page.locator('.chips[role=group]').count()) > 0;
    await target.click();
    if (await page.locator('.specify input').count()) {
      await page.fill('.specify input', 'My own answer');
      await page.locator('.specify input').press('Enter');
    } else if (multi) {
      await page.locator('.q-actions .btn.primary').click();
    }
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

const browser = await chromium.launch();
let failures = 0;
for (const [name, persona] of Object.entries(PERSONAS)) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE);
  for (const pid of PROFILES.filter((x) => !process.env.ONLYP || process.env.ONLYP.split(',').includes(x))) {
    await page.goto(BASE + '#profile=' + pid);
    await page.reload();
    const log = [];
    let ok = false;
    for (let step = 0; step < 200; step++) {
      if (await page.locator('.celebrate').count()) {
        ok = true;
        if (process.env.CEL_SHOTS) { await page.waitForTimeout(1900); await page.screenshot({ path: `${process.env.CEL_SHOTS}/cel-${pid}.png` }); }
        break;
      }
      if (await page.locator('.view-empty').count()) { await page.locator('.view-empty .btn.primary').click(); await page.waitForTimeout(200); continue; }
      if (await page.locator('.view-review').count()) { ok = true; break; }
      try { await answerOne(page, persona, log); } catch (e) { console.log(`  ✖ ${name}/${pid} after [${log.slice(-3).join(', ')}]: ${e.message.split('\n')[0]}`); if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}/fail-${name}-${pid}.png` }); break; }
    }
    console.log(`${ok ? '  ✔' : '  ✖'} ${name.padEnd(9)} ${pid.padEnd(13)} ${log.length} answers`);
    if (!ok) failures++;
  }
  // v2.0: every profile and survey must show as a completed bead in the Circle of Care
  await page.goto(BASE);
  await page.waitForTimeout(1500);
  const done = await page.locator('.bead.st-done').count();
  console.log(`  → ${name}: ${done} completed beads in the Circle of Care${errors.length ? ' · JS errors: ' + errors.join(' | ') : ''}`);
  if (done !== PROFILES.length || errors.length) failures++;
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n✖ ${failures} problem(s)` : '\n✔ every profile and survey completed for every persona');
process.exit(failures ? 1 : 0);
