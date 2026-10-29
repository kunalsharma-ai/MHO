import { WORLD_QUESTIONS as Q } from '../data/worldQuestions.js';

// What the member picked in step 4 "Your world", as the body of PATCH /api/v1/me/answer:
//   { "<question name>": answer }  — a string, or a list of strings for multiple choices.
// Professionals: job role + industry. Consumers: the interests they ticked (optional → {} when none).
export function buildWorldAnswers(v) {
  if (v.memberType === 'professional') {
    return {
      [Q.jobTitle]: (v.jobTitle || '').trim(),
      [Q.industry]: v.industry,
    };
  }
  return v.interests && v.interests.length ? { [Q.interests]: [...v.interests] } : {};
}

// The company email has no profile question; it is kept on the member's own record (PUT /api/v1/me).
// Returns null when there is nothing to save.
export function buildWorldProfile(v) {
  const companyEmail = (v.companyEmail || '').trim().toLowerCase();
  return v.memberType === 'professional' && companyEmail ? { professional: { companyEmail } } : null;
}
