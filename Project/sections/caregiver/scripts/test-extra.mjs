#!/usr/bin/env node
/**
 * Extra regression checks (run after test-flows.mjs):
 *  1. "Other" never auto-advances and requires a valid "Please specify" text
 *  2. Validation blocks bad input (name with digits, bad email); the DOB calendar never offers under-18 / future dates
 *  3. Professional Profile reaches the end for EVERY caregiver role (20 roles)
 *  4. A completed profile can be edited from its About You tile and stays completed
 *  6. Keyboard: the DOB calendar moves with the arrow keys and picks with Enter
 *  7. The completion screen fits every screen size and its buttons are never covered
 *  5. Closing a profile mid-way never shows a blank page
 *
 *   BASE_URL=http://localhost:4173/ node scripts/test-extra.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4173/';
const browser = await chromium.launch();
let fails = 0;
const ok = (c, msg) => { console.log((c ? '  ✔ ' : '  ✖ ') + msg); if (!c) fails++; };
const qid = async (p) => (await p.locator('h3.q-label[id]').getAttribute('id')).slice(3);
const waitQ = (p) => p.waitForSelector('h3.q-label[id], .celebrate, .view-review, .view-empty', { timeout: 8000 });
async function next(p, prev) {
  await p.waitForFunction((x) => !document.querySelector('#ql-' + CSS.escape(x)) || document.querySelector('.celebrate'), prev, { timeout: 8000 });
}
async function chip(p, text) {
  const id = await qid(p);
  await p.locator('.chips .chip').filter({ hasText: text }).first().click();
  return id;
}

/* ---------- 1 + 2 + 5 ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(BASE + '#profile=basic');
  await waitQ(p);
  // name with digits
  await p.click('.name-q .btn.primary');
  ok((await qid(p)) === 'fullname' && (await p.locator('.nm-field.bad, .q-err.on').count()) >= 1, 'first name is required (three name boxes)');
  await p.fill('#in-fullname-first', 'John 3');
  await p.click('.name-q .btn.primary');
  ok((await p.locator('.nm-field.bad, .q-err.on').count()) >= 1 && (await qid(p)) === 'fullname', 'name with digits is rejected');
  await p.fill('#in-fullname-first', 'John');
  await p.fill('#in-fullname-last', 'Carter');
  await p.locator('#in-fullname-first').press('Enter'); // v2.0.1: Enter continues from any name box
  await next(p, 'fullname');
  ok((await qid(p)) !== 'fullname', 'Enter in the name boxes moves forward');
  // gender → Other must NOT auto-advance
  await chip(p, 'Other');
  await p.waitForTimeout(600);
  ok((await qid(p)) === 'gender' && (await p.locator('.specify input').count()) === 1, '"Other" shows "Please specify" and does not auto-advance');
  await p.click('.q-actions .btn.primary');
  ok((await p.locator('.q-err.on').count()) === 1, 'empty "Please specify" is rejected');
  await p.fill('.specify input', 'Non-binary');
  await p.click('.q-actions .btn.primary');
  await next(p, 'gender');
  // under-18 DOB
  await p.waitForSelector('.dob-q');
  ok(await p.locator('.dob-q .q-actions .btn.primary').isDisabled(), 'DOB: Continue stays disabled until a date is picked');
  if (!(await p.locator('.cal.v-years').count())) await p.locator('.dob-field').click();
  const thisYear = new Date().getFullYear();
  for (let k = 0; k < 4; k++) if (await p.locator('.cal-head .cal-nav').last().isEnabled()) await p.locator('.cal-head .cal-nav').last().click();
  const enabledYears = await p.locator('.cal-y:not([disabled])').allInnerTexts();
  ok(enabledYears.length > 0 && enabledYears.every((y) => Number(y.replace(/\D/g, '')) <= thisYear - 18), 'DOB: years under 18 / in the future cannot be chosen');
  await p.locator('.cal-y:not([disabled])').last().click();
  await p.locator('.cal-m:not([disabled])').first().click();
  // keyboard: focus the grid day, move right twice and confirm with Enter
  await p.locator('.cal-d[tabindex="0"]').focus();
  await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Enter');
  await p.waitForTimeout(250);
  ok((await p.locator('.cal-d.on').count()) === 1 && (await p.locator('.dob-age').count()) === 1, 'DOB: arrow keys + Enter pick a day, the age is shown');
  await p.click('.dob-q .q-actions .btn.primary');
  await next(p, 'dob');
  await p.fill('.text-q input', 'john@gmial.com');
  await p.click('.text-q .btn.primary');
  ok((await p.locator('.q-err.on').innerText()).includes('gmail.com'), 'email typo suggestion offered (gmial → gmail)');
  // close mid-way → dashboard visible, no blank page
  await p.click('.run-head .close');
  await p.waitForTimeout(400);
  ok((await p.locator('.hero-title').isVisible()) && (await p.locator('.runner').count()) === 0, 'closing a profile returns to the page (no white screen)');
  ok(errors.length === 0, 'no JavaScript errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await ctx.close();
}

/* ---------- 3: every professional role ---------- */
const ROLES = ['Professional Caregiver', 'Personal Care Aide', 'Personal Care Assistant', 'Home Care Worker', 'Home Health Aide', 'Healthcare Assistant', 'Nursing Assistant', 'Certified Nursing Assistant', 'Support Worker', 'Disability Support Worker', 'Elder Care Worker', 'Childcare Worker', 'Live-in Caregiver', 'Community Care Worker', 'Residential Care Worker', 'Direct Support Professional', 'Care Coordinator', 'Patient/Client Support Worker', 'Supervisory / Administrative Care Roles', 'Other'];
for (const role of ROLES) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + '#profile=professional');
  let steps = 0, done = false;
  for (; steps < 80; steps++) {
    await waitQ(p);
    if (await p.locator('.celebrate').count()) { done = true; break; }
    const id = await qid(p);
    const want = { 'caregiver-support': 'Yes', 'caregiving-situation': 'paid/professional care as part', 'cg-describe': role }[id];
    const chips = p.locator('.chips .chip');
    const target = want ? chips.filter({ hasText: want }).first() : chips.first();
    const multi = (await p.locator('.chips[role=group]').count()) > 0;
    if (await p.locator('.listbox').count()) {
      if (want) await p.fill('.search-box input', want);
      await p.locator(want === 'Other' ? '.listbox li.other' : '.listbox li[role=option]:not(.other)').first().click();
    } else await target.click();
    await p.waitForTimeout(80);
    if (await p.locator('.specify input').count()) { await p.fill('.specify input', 'Something specific'); await p.locator('.specify input').press('Enter'); }
    else if (multi) await p.click('.q-actions .btn.primary');
    await next(p, id);
  }
  const reached = await p.locator('.cel-title').count();
  ok(done && reached, `Professional Profile completes for role "${role}" (${steps} answers)`);
  await ctx.close();
}

/* ---------- 4: edit after completion ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + '#profile=care-role');
  await waitQ(p); await chip(p, 'Yes'); await next(p, 'caregiver-support');
  await waitQ(p); await chip(p, 'unpaid care'); await p.waitForSelector('.celebrate');
  await p.click('.cel-actions .btn.ghost'); // back to profiles
  await p.waitForTimeout(600);
  ok((await p.locator('#profiles .step.is-done').count()) === 1, 'completed profile shows as a completed About You tile');
  await p.click('#profiles .step.is-done'); // opens review / edit
  await p.waitForSelector('.review');
  await p.locator('.rev-row').nth(1).locator('button').click();
  await waitQ(p);
  await chip(p, 'both');
  await p.waitForSelector('.review');
  ok((await p.locator('.rev-row').nth(1).innerText()).includes('both'), 'edited answer is saved and shown in review');
  await p.click('.review .q-actions .btn.primary');
  await p.waitForTimeout(400);
  ok((await p.locator('#profiles .step.is-done').count()) === 1 && (await p.locator('.bead.st-done').count()) === 1, 'profile stays completed after editing (rewards are not given twice)');
  await ctx.close();
}

/* ---------- 7: completion screen fits every screen, buttons never covered ---------- */
for (const [w, h] of [[320, 568], [390, 844], [844, 390], [1024, 600], [1366, 640], [1920, 1080]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(BASE + '#profile=care-role');
  await waitQ(p); await chip(p, 'Yes'); await next(p, 'caregiver-support');
  await waitQ(p); await chip(p, 'unpaid care'); await p.waitForSelector('.celebrate'); await p.waitForTimeout(3200);
  const r = await p.evaluate(() => {
    const c = document.querySelector('.celebrate');
    const free = (sel) => { const e = document.querySelector(sel); const q = e.getBoundingClientRect(); const t = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); return q.bottom <= innerHeight && q.top >= 0 && (t === e || e.contains(t)); };
    return c.scrollHeight <= c.clientHeight + 1 && free('.cel-actions .btn.primary') && free('.cel-row .btn:not(.ghost)') && free('.cel-row .btn.ghost');
  });
  ok(r, `completion screen at ${w}×${h}: Next, Review and Back to profiles are all visible without scrolling`);
  await p.click('.cel-row .btn.ghost'); await p.waitForTimeout(500);
  ok((await p.locator('.runner').count()) === 0, `…and "Back to profiles" returns to the dashboard (${w}×${h})`);
  await ctx.close();
}

await browser.close();
console.log(fails ? `\n✖ ${fails} check(s) failed` : '\n✔ all extra checks passed');
process.exit(fails ? 1 : 0);
