/**
 * Profiles first, then surveys — one at a time.
 *
 *   1. Every research survey stays SEALED until every About-You profile is complete.
 *   2. Then the surveys unlock ONE BY ONE in their order: the next opens only when the one before it is done.
 *
 * Pure function — used by the dashboard, the Synapse network, deep links and the completion screen.
 * A completed item stays completed (editing answers later never re-locks anything).
 */
import { profileSlugs, surveySlugs } from './rewards.js';

export function gate(completed = {}) {
  const done = (s) => !!completed[s];
  const profiles = profileSlugs();
  const surveys = surveySlugs();
  const profDone = profiles.filter(done).length;
  const profilesComplete = profDone === profiles.length;
  const lock = {}; // slug → null (open) | 'profiles' | 'sequence'
  let current = null;
  for (const p of profiles) lock[p] = null;
  for (const s of surveys) {
    if (!profilesComplete) lock[s] = 'profiles';
    else if (done(s)) lock[s] = null;
    else if (!current) { lock[s] = null; current = s; }
    else lock[s] = 'sequence';
  }
  const nextProfile = profiles.find((p) => !done(p)) || null;
  return {
    items: [...profiles, ...surveys],
    profiles,
    surveys,
    profDone,
    survDone: surveys.filter(done).length,
    profilesComplete,
    lock,
    current,
    next: nextProfile || current,
    nextProfile,
    missingProfiles: profiles.filter((p) => !done(p)),
    allDone: profilesComplete && !current,
  };
}
