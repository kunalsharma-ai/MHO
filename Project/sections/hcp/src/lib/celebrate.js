/**
 * Tiny hand-off between the completion screen and the Clinical Genome.
 * The completion screen delivers the reward tokens itself (into the wallet inside the question flow) and queues the
 * slug here; when the flow closes, the genome plays the "bond forms" animation on that rung and the header pills
 * shimmer — so the reward is visible in both places without being added twice.
 */
const q = new Set();
export const queueCelebration = (slug) => { q.add(slug); };
export function takeCelebrations() { const out = [...q]; q.clear(); return out; }
