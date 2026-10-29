#!/usr/bin/env node
/**
 * v2.0 rewards + gating end-to-end (real browser):
 *   1. a freshly completed profile is delivered: its bead blooms, a +50 heart-coin → points, a +1 rosette star → Quality Score
 *   2. header wallet shows 50 pts / 1 QS, the Circle of Care shows the same, delivery plays only once (reload → no replay)
 *   3. surveys are sealed until all About You profiles are done; tapping one opens the "care door" pop-up
 *   4. a deep link to a sealed survey opens the pop-up, never the questions
 *   5. once every profile is done the first survey is open and the second is sealed "one at a time"
 *   6. the orbit layout scales: 150 items all get a bead (no item is dropped)
 *   BASE_URL=http://localhost:4173/ node scripts/test-rewards.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4173/';
const ITEMS = JSON.parse(fs.readFileSync(new URL('../public/data/caregiver.json', import.meta.url))).profiles;
const PROFILES = ITEMS.filter((p) => p.chapter === 'you').map((p) => p.id);
const SURVEYS = ITEMS.filter((p) => p.chapter !== 'you').map((p) => p.id);
let fails = 0;
const ok = (c, m) => { console.log((c ? '  ✔ ' : '  ✖ ') + m); if (!c) fails++; };
const state = (completed, seen) => JSON.stringify({ answers: {}, meta: { completed, started: completed }, gemSeen: seen, lang: 'en', theme: 'light', muted: true });
const b = await chromium.launch();
async function open(completed, seen, hash = '') {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript((s) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('mho.caregiver.v1', s); sessionStorage.setItem('seeded', '1'); } }, state(completed, seen));
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(BASE + hash);
  return { p, ctx, errors };
}
const num = async (p, sel) => Number((await p.locator(sel).getAttribute('aria-label')).match(/[\d,]+/)[0].replace(/,/g, ''));

{ // 1 + 2
  const { p, ctx, errors } = await open({ 'care-role': Date.now() }, {});
  await p.waitForSelector('.bead.born', { timeout: 6000 }).then(() => ok(true, 'the completed bead blooms')).catch(() => ok(false, 'the completed bead blooms'));
  await p.waitForSelector('.token.tk-coin', { timeout: 4000 }).then(() => ok(true, 'a +50 heart-coin flies to the wallet')).catch(() => ok(false, 'a +50 heart-coin flies to the wallet'));
  await p.waitForSelector('.token.tk-star', { timeout: 4000 }).then(() => ok(true, 'a +1 rosette star flies to the Quality Score')).catch(() => ok(false, 'a +1 rosette star flies to the Quality Score'));
  await p.waitForTimeout(2600);
  ok((await num(p, '#rw-pts')) === 50, 'header Care Points show 50');
  ok((await num(p, '#rw-qs')) === 1, 'header Quality Score shows 1');
  ok((await p.locator('.bead.st-done').count()) === 1, 'Circle of Care shows one completed bead');
  ok((await p.locator('.cc-levelup').count()) + (await p.locator('.ladder li.now').count()) >= 1, 'care level ladder is updated');
  await p.reload();
  await p.waitForTimeout(2200);
  ok((await p.locator('.token').count()) === 0 && (await num(p, '#rw-pts')) === 50, 'no replay after reload, points kept');
  ok(errors.length === 0, 'no JavaScript errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await ctx.close();
}
{ // 3 + 4
  const { p, ctx } = await open({ 'care-role': 1 }, { 'care-role': 1 }, '#profile=' + SURVEYS[0]);
  await p.waitForSelector('.lm', { timeout: 6000 }).then(() => ok(true, 'deep link to a sealed survey opens the care-door pop-up')).catch(() => ok(false, 'deep link to a sealed survey opens the care-door pop-up'));
  ok((await p.locator('.runner').count()) === 0, '…and never the questions');
  ok((await p.locator('.lm-list li').count()) === PROFILES.length - 1, `pop-up lists the ${PROFILES.length - 1} missing About You profiles`);
  ok((await p.locator('.kf-key').count()) === PROFILES.length, 'the keyring carries one key per profile');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  ok((await p.locator('#surveys .post.is-locked').count()) === SURVEYS.length, `all ${SURVEYS.length} surveys are sealed (black & white)`);
  await p.locator('#surveys .post.is-locked .sealbtn').first().click();
  await p.waitForSelector('.lm-profiles', { timeout: 3000 }).then(() => ok(true, 'tapping a sealed survey explains how to unlock it')).catch(() => ok(false, 'tapping a sealed survey explains how to unlock it'));
  await ctx.close();
}
{ // 5
  const all = Object.fromEntries(PROFILES.map((id) => [id, 1]));
  const { p, ctx } = await open(all, all);
  await p.waitForTimeout(1500);
  ok((await p.locator('#surveys .post.is-current').count()) === 1, 'first survey is unsealed');
  ok((await p.locator('#surveys .post.is-locked').count()) === SURVEYS.length - 1, `the other ${SURVEYS.length - 1} stay sealed (one at a time)`);
  await p.locator('#surveys .post.is-locked .sealbtn').first().click();
  await p.waitForSelector('.lm-sequence', { timeout: 3000 }).then(() => ok(true, 'a later survey shows the stepping stones ("one step at a time")')).catch(() => ok(false, 'a later survey shows the stepping stones'));
  await ctx.close();
}
await b.close();

{ // 6 — orbit layout capacity (pure function, no browser)
  const src = fs.readFileSync(new URL('../src/components/CareCircle.jsx', import.meta.url), 'utf8');
  const fn = src.slice(src.indexOf('function orbitLayout'), src.indexOf('\nconst Bead'));
  const isProfileChapter = (c) => c === 'you';
  const orbitLayout = new Function('isProfileChapter', fn + '\nreturn orbitLayout;')(isProfileChapter);
  for (const n of [12, 40, 100, 150]) {
    const items = Array.from({ length: n }, (_, i) => ({ id: 'x' + i, chapter: i < n / 4 ? 'you' : 'health' }));
    const { rings } = orbitLayout(items);
    ok(rings.reduce((a, r) => a + r.items.length, 0) === n, `${n} items → ${rings.length} orbits, every item has a bead`);
  }
}
console.log(fails ? `\n✖ ${fails} check(s) failed` : '\n✔ rewards and gating work');
process.exit(fails ? 1 : 0);
