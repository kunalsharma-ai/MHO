import { complete, flush } from './bridge.js';

export async function submitProfile(item) {
  await flush();
  if (item.completedAt) await complete(item.profile);
}
