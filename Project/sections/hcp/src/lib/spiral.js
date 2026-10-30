/**
 * Synapse network layout: neurons on a golden-angle (sunflower) spiral between the Evidence Core and the rim.
 * Works for any number of items — 11, 40 or 150 — neurons simply get smaller (tested in tests/test-extra.mjs).
 * Returns { pts: [{x, y, r}] in % of the square stage, links: [{a, b}] (b = -1 → core), size: neuron diameter in % }.
 */
const GOLDEN = Math.PI * (3 - Math.sqrt(5)); // 137.5°

/** positions (in % of the square stage) on a sunflower spiral between the core and the rim */
export function spiralLayout(n) {
  const size = n <= 12 ? 11.5 : Math.max(3.4, 40 / Math.sqrt(n + 1)); // neuron diameter, % of stage
  const r0 = 25 + size / 2; // just outside the core
  const r1 = 50 - size / 2 - 0.8;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const r = n === 1 ? r0 : r0 + (r1 - r0) * Math.sqrt((i + 0.35) / (n - 0.4));
    const a = i * GOLDEN - Math.PI / 2;
    pts.push({ x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, r });
  }
  // dendrites: each neuron → nearest earlier neuron; the first ring also links to the core
  const links = [];
  for (let i = 0; i < n; i++) {
    let best = -1; let bd = Infinity;
    for (let j = 0; j < i; j++) {
      const d = (pts[i].x - pts[j].x) ** 2 + (pts[i].y - pts[j].y) ** 2;
      if (d < bd) { bd = d; best = j; }
    }
    if (i < Math.min(5, n) || best < 0) links.push({ a: i, b: -1 });
    if (best >= 0) links.push({ a: i, b: best });
  }
  return { pts, links, size };
}

