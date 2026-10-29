// Question names ("Question.name" in the backend, category b2b / b2c) that the "Your world" answers are saved under,
// with PATCH /api/v1/me/answer { "<question name>": <answer> }:
//   jobrole   · "Job Title"           · select       (answer = the option's `value`)
//   industry  · "Industry?"           · select       (answer = the option's `value`)
//   hobbies   · "Hobbies & Interests" · multiselect  (answer = list of option `value`s)
// The options (label + value) are loaded from GET /api/v1/option/<question name>.
// Override with VITE_Q_* if the names differ on another backend.
const env = import.meta.env;

export const WORLD_QUESTIONS = {
  jobTitle: env.VITE_Q_JOB_TITLE || 'jobrole',
  industry: env.VITE_Q_INDUSTRY || 'industry',
  interests: env.VITE_Q_INTERESTS || 'hobbies',
};
