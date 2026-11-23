// Illustrations from the HCP, caregiver and patient profile-section packages (Project/sections/*/public/images).
import logo from "./img/logo.png";
import heart from "./img/heart.png";
import hcp_additional_details from "./img/hcp/additional-details.svg";
import hcp_basic from "./img/hcp/basic.svg";
import hcp_documents from "./img/hcp/documents.svg";
import hcp_educational from "./img/hcp/educational.svg";
import hcp_experience from "./img/hcp/experience.svg";
import hcp_professional_address from "./img/hcp/professional-address.svg";
import hcp_professional_category from "./img/hcp/professional-category.svg";
import hcp_professional from "./img/hcp/professional.svg";
import hcp_social_media from "./img/hcp/social-media.svg";
import hcp_survey_participation from "./img/hcp/survey-participation.svg";
import hcp_technical from "./img/hcp/technical.svg";
import caregiver_additional from "./img/caregiver/additional.svg";
import caregiver_basic from "./img/caregiver/basic.svg";
import caregiver_care_role from "./img/caregiver/care-role.svg";
import caregiver_education from "./img/caregiver/education.svg";
import caregiver_fitness from "./img/caregiver/fitness.svg";
import caregiver_food from "./img/caregiver/food.svg";
import caregiver_health from "./img/caregiver/health.svg";
import caregiver_insurance from "./img/caregiver/insurance.svg";
import caregiver_professional from "./img/caregiver/professional.svg";
import caregiver_social from "./img/caregiver/social.svg";
import caregiver_survey from "./img/caregiver/survey.svg";
import caregiver_tech from "./img/caregiver/tech.svg";
import patient_additional from "./img/patient/additional.svg";
import patient_basic from "./img/patient/basic.svg";
import patient_conditions from "./img/patient/conditions.svg";
import patient_decisions from "./img/patient/decisions.svg";
import patient_devices from "./img/patient/devices.svg";
import patient_diagnostics from "./img/patient/diagnostics.svg";
import patient_digital from "./img/patient/digital.svg";
import patient_education from "./img/patient/education.svg";
import patient_eligibility from "./img/patient/eligibility.svg";
import patient_food from "./img/patient/food.svg";
import patient_general_health from "./img/patient/general-health.svg";
import patient_hospital from "./img/patient/hospital.svg";
import patient_info from "./img/patient/info.svg";
import patient_insurance from "./img/patient/insurance.svg";
import patient_lifestyle from "./img/patient/lifestyle.svg";
import patient_medication from "./img/patient/medication.svg";
import patient_personal_health from "./img/patient/personal-health.svg";
import patient_providers from "./img/patient/providers.svg";
import patient_research from "./img/patient/research.svg";
import patient_social from "./img/patient/social.svg";
import patient_survey from "./img/patient/survey.svg";
import patient_symptoms from "./img/patient/symptoms.svg";
import patient_treatment from "./img/patient/treatment.svg";
import patient_verification from "./img/patient/verification.svg";
import patient_work from "./img/patient/work.svg";
import scenes_hug from "./img/scenes/hug.svg";
import scenes_meal from "./img/scenes/meal.svg";
import scenes_meds from "./img/scenes/meds.svg";
import scenes_story from "./img/scenes/story.svg";
import scenes_walk from "./img/scenes/walk.svg";
import scenes_wheel from "./img/scenes/wheel.svg";
const hcp = {
  "additional-details": hcp_additional_details,
  "basic": hcp_basic,
  "documents": hcp_documents,
  "educational": hcp_educational,
  "experience": hcp_experience,
  "professional-address": hcp_professional_address,
  "professional-category": hcp_professional_category,
  "professional": hcp_professional,
  "social-media": hcp_social_media,
  "survey-participation": hcp_survey_participation,
  "technical": hcp_technical,
};
const caregiver = {
  "additional": caregiver_additional,
  "basic": caregiver_basic,
  "care-role": caregiver_care_role,
  "education": caregiver_education,
  "fitness": caregiver_fitness,
  "food": caregiver_food,
  "health": caregiver_health,
  "insurance": caregiver_insurance,
  "professional": caregiver_professional,
  "social": caregiver_social,
  "survey": caregiver_survey,
  "tech": caregiver_tech,
};
const patient = {
  "additional": patient_additional,
  "basic": patient_basic,
  "conditions": patient_conditions,
  "decisions": patient_decisions,
  "devices": patient_devices,
  "diagnostics": patient_diagnostics,
  "digital": patient_digital,
  "education": patient_education,
  "eligibility": patient_eligibility,
  "food": patient_food,
  "general-health": patient_general_health,
  "hospital": patient_hospital,
  "info": patient_info,
  "insurance": patient_insurance,
  "lifestyle": patient_lifestyle,
  "medication": patient_medication,
  "personal-health": patient_personal_health,
  "providers": patient_providers,
  "research": patient_research,
  "social": patient_social,
  "survey": patient_survey,
  "symptoms": patient_symptoms,
  "treatment": patient_treatment,
  "verification": patient_verification,
  "work": patient_work,
};
const scenes = {
  "hug": scenes_hug,
  "meal": scenes_meal,
  "meds": scenes_meds,
  "story": scenes_story,
  "walk": scenes_walk,
  "wheel": scenes_wheel,
};
const src = (m) => (m && typeof m === "object" ? m.src : m) || "";
export const LOGO = src(logo);
export const HEART = src(heart);
export const SCENES = Object.fromEntries(Object.entries(scenes).map(([k, v]) => [k, src(v)]));
const SETS = { hcp, caregiver, patient };

// keyword → image name per panel; the first rule whose words appear in the section slug or name wins
const RULES = {
  hcp: [["document|verif", "documents"], ["address", "professional-address"], ["experience", "experience"], ["educat", "educational"], ["technolog|digital", "technical"], ["survey|reward pref|participation", "survey-participation"], ["social", "social-media"], ["category|professional profile", "professional-category"], ["special|practice|professional", "professional"], ["additional", "additional-details"], ["basic", "basic"]],
  caregiver: [["role|caregiving|screener", "care-role"], ["educat", "education"], ["health insurance|insurance", "insurance"], ["health", "health"], ["professional", "professional"], ["survey|reward", "survey"], ["food", "food"], ["sport|fitness", "fitness"], ["technolog", "tech"], ["social", "social"], ["additional", "additional"], ["basic", "basic"]],
  patient: [["social", "social"], ["survey|survery", "survey"], ["insurance|payment", "insurance"], ["food", "food"], ["lifestyle", "lifestyle"], ["personal health", "personal-health"], ["general health", "general-health"], ["condition", "conditions"], ["symptom", "symptoms"], ["provider", "providers"], ["treatment decision|decision|experience", "decisions"], ["treatment", "treatment"], ["medication|pharmacy", "medication"], ["diagnos", "diagnostics"], ["device", "devices"], ["hospital", "hospital"], ["information|online", "info"], ["research", "research"], ["verification|documentation", "verification"], ["eligib|recruit", "eligibility"], ["digital|technolog", "digital"], ["educat", "education"], ["professional|work", "work"], ["additional", "additional"], ["basic|about", "basic"]],
};

/** the package illustration for a profile section of this panel (falls back to the panel's basic profile image) */
export function sectionKey(panel, slug = "", name = "") {
  const text = `${slug} ${name}`.toLowerCase().replace(/-/g, " ");
  const hit = (RULES[panel] || RULES.patient).find(([re]) => new RegExp(re).test(text));
  return hit ? hit[1] : "basic";
}
export function sectionArt(panel, slug = "", name = "") {
  const set = SETS[panel] || SETS.patient;
  return src(set[sectionKey(panel, slug, name)] || set.basic);
}
export const artByName = (panel, name) => src((SETS[panel] || {})[name]);
