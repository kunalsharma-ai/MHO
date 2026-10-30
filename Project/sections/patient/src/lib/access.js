
import { cfg } from './config.js';

/* mirrors the chapter of each item in public/data/patient.json so rewards can be counted before the
   question bank has loaded (scripts/test-dashboard.mjs checks it stays in sync) */
const PROFILE_IDS = new Set(['basic', 'general-health', 'conditions', 'symptoms', 'education', 'work']);
let dataKinds = null;

export function setKinds(survey) {
  dataKinds = Object.fromEntries(survey.profiles.map((p) => [p.id, p.chapter === 'you' ? 'profile' : 'survey']));
}
export const profileIdList = () => (dataKinds ? Object.keys(dataKinds).filter((k) => dataKinds[k] === 'profile') : [...PROFILE_IDS]);
export const kindOf = (id) => (dataKinds?.[id] ?? (PROFILE_IDS.has(id) ? 'profile' : 'survey'));

/**
 * @param survey   patient.json
 * @param statuses allStatuses() result ({ map: { id: { status, pct } } })
 * @returns { profiles: [p], surveys: [p], profilesDone, profilesTotal, map: { id: { kind, locked, reason, blocker } }, nextProfile, nextSurvey }
 */
export function accessOf(survey, statuses) {
  const profiles = survey.profiles.filter((p) => kindOf(p.id) === 'profile');
  const surveys = survey.profiles.filter((p) => kindOf(p.id) === 'survey');
  const done = (id) => statuses.map[id]?.status === 'done';
  const profilesDone = profiles.filter((p) => done(p.id)).length;
  const allProfiles = profilesDone === profiles.length;
  const seq = cfg().unlock !== 'all';
  const map = {};
  profiles.forEach((p) => { map[p.id] = { kind: 'profile', locked: false }; });
  let firstOpen = null;
  surveys.forEach((p) => {
    if (done(p.id)) { map[p.id] = { kind: 'survey', locked: false }; return; }
    if (!allProfiles) { map[p.id] = { kind: 'survey', locked: true, reason: 'profiles' }; return; }
    if (!seq || !firstOpen) { map[p.id] = { kind: 'survey', locked: false }; if (!firstOpen) firstOpen = p.id; return; }
    map[p.id] = { kind: 'survey', locked: true, reason: 'sequence', blocker: firstOpen };
  });
  const nextProfile = profiles.find((p) => !done(p.id))?.id || null;
  const nextSurvey = surveys.find((p) => !done(p.id) && !map[p.id].locked)?.id || null;
  return { profiles, surveys, profilesDone, profilesTotal: profiles.length, allProfiles, map, nextProfile, nextSurvey };
}
