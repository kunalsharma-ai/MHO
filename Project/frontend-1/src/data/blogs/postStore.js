// Blog article bodies: cached after first download. The prerenderer seeds the cache with every post.
import { POST_LOADERS } from './posts/index.js';

export const postCache = {};

export function seedPosts(map) {
  Object.assign(postCache, map);
}

export async function loadPost(slug) {
  if (postCache[slug]) return postCache[slug];
  const loader = POST_LOADERS[slug];
  if (!loader) return null;
  postCache[slug] = (await loader()).default;
  return postCache[slug];
}

/** Estimated reading time in minutes (≈220 words per minute). */
export function readingTime(post) {
  if (!post) return 7;
  const words = post.body.split(/\s+/).length + post.faqs.reduce((n, f) => n + (f.q + ' ' + f.a).split(/\s+/).length, 0);
  return Math.max(3, Math.round(words / 220));
}
