/**
 * Profiles first, then surveys — one at a time.
 *
 *   PROFILES = every item in the "About You" chapter (see PROFILE_CHAPTERS in rewards.js).
 *   SURVEYS  = every other item (health, research, additional details …).
 *
 *   1. All surveys stay LOCKED until every profile is complete.
 *   2. Then surveys unlock ONE BY ONE in their order: the next one opens only when the one before it is done.
 *
 * Pure function — used by the dashboard, the Circle of Care, deep links and the completion screen.
 * Completed = meta.completed[id] (a chapter that was completed stays completed even if new follow-up
 * questions appear later, so editing never re-locks anything).
 */
import { isProfileChapter, itemsOf } from './rewards.js';

export function gate(survey, meta) {
  const items = itemsOf(survey);
  const done = (id) => !!meta?.completed?.[id];
  const profiles = items.filter((p) => isProfileChapter(p.chapter));
  const surveys = items.filter((p) => !isProfileChapter(p.chapter));
  const profDone = profiles.filter((p) => done(p.id)).length;
  const profilesComplete = profDone === profiles.length;
  const lock = {}; // id → null (open) | 'profiles' | 'sequence'
  let current = null; // the survey that is open right now
  for (const p of profiles) lock[p.id] = null;
  for (const s of surveys) {
    if (!profilesComplete) lock[s.id] = 'profiles';
    else if (done(s.id)) lock[s.id] = null;
    else if (!current) { lock[s.id] = null; current = s.id; }
    else lock[s.id] = 'sequence';
  }
  const nextProfile = profiles.find((p) => !done(p.id)) || null;
  const survDone = surveys.filter((s) => done(s.id)).length;
  return {
    items,
    profiles,
    surveys,
    profDone,
    survDone,
    profilesComplete,
    lock,
    current,
    /** what to do next: first unfinished profile, else the open survey */
    next: nextProfile ? nextProfile.id : current,
    nextProfile: nextProfile ? nextProfile.id : null,
    missingProfiles: profiles.filter((p) => !done(p.id)),
    allDone: profilesComplete && !current,
  };
}
