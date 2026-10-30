#!/usr/bin/env node
/**
 * Lab performance check (Lighthouse-like) using Playwright + Chrome DevTools Protocol.
 *   BASE_URL=http://localhost:4173/ node scripts/perf.mjs
 * Mobile profile = Moto G Power class: 4x CPU slowdown + "Slow 4G" (150 ms RTT, 1.6 Mbps down).
 * Reports FCP, LCP, CLS and TBT (sum of long-task time over 50 ms) for 3 runs (median).
 */
import { chromium } from 'playwright';
const BASE = process.env.BASE_URL || 'http://localhost:4173/';

const PROFILES = {
  mobile: { viewport: { width: 412, height: 823 }, dpr: 2.625, cpu: 4, net: { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 } },
  desktop: { viewport: { width: 1350, height: 940 }, dpr: 1, cpu: 1, net: { latency: 40, downloadThroughput: (10 * 1024 * 1024) / 8, uploadThroughput: (10 * 1024 * 1024) / 8 } },
};

async function runOnce(browser, p) {
  const ctx = await browser.newContext({ viewport: p.viewport, deviceScaleFactor: p.dpr, isMobile: p.viewport.width < 600 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, ...p.net });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: p.cpu });
  await page.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0, lt: [] };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__m.lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__m.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__m.lt.push([e.startTime, e.duration]))).observe({ type: 'longtask', buffered: true });
  });
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForTimeout(5000);
  const r = await page.evaluate(() => {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
    const tbt = window.__m.lt.filter(([s]) => s >= fcp).reduce((a, [, d]) => a + Math.max(0, d - 50), 0);
    return { fcp, lcp: window.__m.lcp, cls: window.__m.cls, tbt };
  });
  await ctx.close();
  return r;
}

const browser = await chromium.launch();
for (const [name, p] of Object.entries(PROFILES)) {
  const runs = [];
  for (let i = 0; i < 3; i++) runs.push(await runOnce(browser, p));
  const med = (k) => runs.map((r) => r[k]).sort((a, b) => a - b)[1];
  console.log(`${name.padEnd(8)} FCP ${(med('fcp') / 1000).toFixed(2)} s · LCP ${(med('lcp') / 1000).toFixed(2)} s · CLS ${med('cls').toFixed(3)} · TBT ${Math.round(med('tbt'))} ms`);
}
await browser.close();
