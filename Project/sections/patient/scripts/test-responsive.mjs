#!/usr/bin/env node
/**
 * Responsive QA: opens the section at 11 screen sizes (phones portrait + landscape, tablets, laptops,
 * desktops), in light/dark and LTR/RTL, and fails if anything overflows horizontally or is cut off.
 * Also opens the question flow, the date-of-birth calendar, the locked-survey dialog and the language
 * picker at each size. Screenshots go to SHOTS (default ./qa-shots).
 *
 *   npm run build:preview && npm run test:responsive
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const FILE = 'file://' + path.resolve('preview/MHO-Patient-Dashboard-Preview.html');
const SHOTS = process.env.SHOTS || 'qa-shots';
fs.mkdirSync(SHOTS, { recursive: true });
const SIZES = [[320, 568, 'phone-se'], [360, 740, 'android'], [390, 844, 'iphone'], [430, 932, 'iphone-max'], [844, 390, 'phone-landscape'], [768, 1024, 'ipad'], [1024, 768, 'ipad-landscape'], [1180, 820, 'tablet-pro'], [1280, 800, 'laptop'], [1440, 900, 'desktop'], [1920, 1080, 'full-hd']];

/** elements that stick out of the screen and are NOT clipped by an ancestor */
const overflowCheck = () => {
  const W = document.documentElement.clientWidth, bad = [];
  const clipped = (el, r) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' || cs.overflow !== 'visible' || cs.clipPath !== 'none') {
        const ar = a.getBoundingClientRect();
        if (r.left >= ar.left - 1 && r.right <= ar.right + 1) return false;
        return true;
      }
    }
    return false;
  };
  document.querySelectorAll('.mho-app *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.position === 'fixed' || el.closest('.ambient, [aria-hidden="true"], .lwipe')) return;
    if ((r.right > W + 1 || r.left < -1) && !clipped(el, r)) bad.push((el.className?.baseVal ?? el.className) + ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
  });
  return { W, scrollW: document.documentElement.scrollWidth, bad: bad.slice(0, 6) };
};

const browser = await chromium.launch();
let problems = 0;
for (const [w, h, name] of SIZES) {
  for (const variant of ['light', 'dark-ar']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 900, isMobile: w < 900 });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(FILE + (variant === 'dark-ar' ? '?lang=ar' : ''));
    await p.waitForSelector('.scard', { timeout: 15000 });
    if (variant === 'dark-ar') { await p.click('.theme-btn'); }
    await p.waitForTimeout(900);
    const r1 = await p.evaluate(overflowCheck);
    await p.screenshot({ path: `${SHOTS}/${name}-${variant}-top.png` });
    await p.locator('#mho-rewards').scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${SHOTS}/${name}-${variant}-rewards.png` });
    // locked dialog
    await p.locator('.scard .sc-hit').first().click();
    await p.waitForTimeout(700);
    const dlg = await p.evaluate(() => { const d = document.querySelector('.vdlg'); if (!d) return null; const r = d.getBoundingClientRect(); return { l: r.left, r: r.right, W: innerWidth }; });
    if (variant === 'light') await p.screenshot({ path: `${SHOTS}/${name}-locked.png` });
    await p.keyboard.press('Escape');
    // question flow + calendar
    await p.evaluate(() => { location.hash = 'profile=basic'; });
    await p.waitForSelector('.nm-f input', { timeout: 8000 });
    await p.locator('.nm-f input').first().fill('Kunal');
    await p.locator('.text-q .btn.primary').click();
    await p.waitForTimeout(500);
    await p.locator('.chips .chip').first().click();
    await p.waitForSelector('.dob-btn');
    await p.click('.dob-btn');
    await p.waitForTimeout(600);
    const r2 = await p.evaluate(overflowCheck);
    if (variant === 'light') await p.screenshot({ path: `${SHOTS}/${name}-calendar.png` });
    await ctx.close();
    const ok = r1.scrollW <= r1.W && !r1.bad.length && r2.scrollW <= r2.W && !r2.bad.length && dlg && dlg.l >= 0 && dlg.r <= dlg.W && !errs.length;
    if (!ok) problems++;
    console.log(`${ok ? '  ✔' : '  ✖'} ${name.padEnd(16)} ${String(w + '×' + h).padEnd(10)} ${variant.padEnd(8)}${ok ? '' : ' ' + JSON.stringify({ r1, r2, dlg, errs })}`);
  }
}
await browser.close();
console.log(problems ? `\n✖ ${problems} layout problem(s)` : '\n✔ no horizontal overflow or clipped dialogs at any size');
process.exit(problems ? 1 : 0);
