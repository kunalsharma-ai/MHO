// Card name, colours, title and one-line description of every profile, as the supplied panel designs define them
// (Project/sections/hcp/src/data/profileMeta.js, caregiver and patient src/lib/builder.js). Keyed by the HCP slug or by
// the profile name the API returns (the package "source").
export const CATALOG = {
 "hcp": {
  "basic": {
   "p": [
    "#FF4D6D",
    "#3A0A1C"
   ],
   "flavor": "Vital Pulse"
  },
  "professional-category": {
   "p": [
    "#2F6BFF",
    "#071A45"
   ],
   "flavor": "Hospital Grid"
  },
  "professional": {
   "p": [
    "#8B3DFF",
    "#200A45"
   ],
   "flavor": "Specialty Spectrum"
  },
  "educational": {
   "p": [
    "#F5A400",
    "#2E1C00"
   ],
   "flavor": "Graduation Gold"
  },
  "experience": {
   "p": [
    "#FF6A13",
    "#3A1404"
   ],
   "flavor": "Clinical Mastery"
  },
  "professional-address": {
   "p": [
    "#00B39B",
    "#012E2A"
   ],
   "flavor": "Practice Map"
  },
  "documents": {
   "p": [
    "#10B76F",
    "#03301B"
   ],
   "flavor": "Verified Credentials"
  },
  "social-media": {
   "p": [
    "#E0A100",
    "#2B2300"
   ],
   "flavor": "Rewards & Social"
  },
  "technical": {
   "p": [
    "#0AA5C8",
    "#02283A"
   ],
   "flavor": "Digital Health"
  },
  "survey-participation": {
   "p": [
    "#E8267D",
    "#3A0623"
   ],
   "flavor": "Voice of Medicine"
  },
  "additional-details": {
   "p": [
    "#5B4BFF",
    "#100B3D"
   ],
   "flavor": "Molecular Deep-Dive"
  }
 },
 "caregiver": {
  "screener": {
   "id": "care-role",
   "title": "Your Caregiving Role",
   "p": [
    "#FF8A3D",
    "#D7263D"
   ],
   "flavor": "Rose Ember",
   "blurb": "Tell us how you care for others"
  },
  "basic profile": {
   "id": "basic",
   "title": "Basic Profile",
   "p": [
    "#2BB3C0",
    "#0F6E8F"
   ],
   "flavor": "Ocean Teal",
   "blurb": "Who you are and where you live"
  },
  "educational profile": {
   "id": "education",
   "title": "Education & Care Skills",
   "p": [
    "#9B5DE5",
    "#5B2A86"
   ],
   "flavor": "Royal Plum",
   "blurb": "Your studies, skills and the care you give"
  },
  "professional profile": {
   "id": "professional",
   "title": "Professional Profile",
   "p": [
    "#2EC4A6",
    "#08776A"
   ],
   "flavor": "Clinic Mint",
   "blurb": "Your work, role and experience"
  },
  "personal health profile": {
   "id": "health",
   "title": "Personal Health",
   "p": [
    "#FF6B7D",
    "#D62839"
   ],
   "flavor": "Coral Pulse",
   "blurb": "A quick check-in on your own wellbeing"
  },
  "health insurance profile": {
   "id": "insurance",
   "title": "Health Insurance",
   "p": [
    "#4C7DFF",
    "#1D3FA8"
   ],
   "flavor": "Sapphire Shield",
   "blurb": "Your cover and the cover you manage"
  },
  "food and lifestyle": {
   "id": "food",
   "title": "Food & Lifestyle",
   "p": [
    "#8CC63F",
    "#2F7D32"
   ],
   "flavor": "Garden Fresh",
   "blurb": "What you eat, drink and buy"
  },
  "sports and physical fitness": {
   "id": "fitness",
   "title": "Sports & Fitness",
   "p": [
    "#FFA62B",
    "#E0520C"
   ],
   "flavor": "Sunrise Energy",
   "blurb": "How you move and stay active"
  },
  "technology and survey participation": {
   "id": "tech",
   "title": "Technology & Digital Health",
   "p": [
    "#D600B0",
    "#5A12D6"
   ],
   "flavor": "Neon Violet",
   "blurb": "Devices, apps and digital health"
  },
  "survey participation and reward preferences profile": {
   "id": "survey",
   "title": "Survey & Reward Preferences",
   "p": [
    "#FF5C8A",
    "#B5175A"
   ],
   "flavor": "Gift Magenta",
   "blurb": "How you like to take part and be rewarded"
  },
  "social media and reward reclaim": {
   "id": "social",
   "title": "Social Media & Payouts",
   "p": [
    "#12B5CB",
    "#00695C"
   ],
   "flavor": "Jade Wallet",
   "blurb": "Where to reach you and how to pay you"
  },
  "additional": {
   "id": "additional",
   "title": "Additional Details",
   "p": [
    "#7C4DFF",
    "#26287A"
   ],
   "flavor": "Galaxy Indigo",
   "blurb": "Help us understand you even better"
  }
 },
 "patient": {
  "basic profile": {
   "id": "basic",
   "title": "About You",
   "p": [
    "#38BDF8",
    "#0B6E99"
   ],
   "flavor": "Sky Lagoon",
   "blurb": "Who you are and where you live"
  },
  "general health profile": {
   "id": "general-health",
   "title": "General Health",
   "p": [
    "#FBBF24",
    "#C2410C"
   ],
   "flavor": "Morning Sun",
   "blurb": "How you feel and how long you have lived with your condition"
  },
  "medical condition profile": {
   "id": "conditions",
   "title": "Medical Conditions",
   "p": [
    "#60A5FA",
    "#1E40AF"
   ],
   "flavor": "Ocean Indigo",
   "blurb": "Conditions you have been diagnosed with"
  },
  "symptoms and severity": {
   "id": "symptoms",
   "title": "Symptoms & Severity",
   "p": [
    "#F97316",
    "#B91C1C"
   ],
   "flavor": "Ember Glow",
   "blurb": "How your condition affects daily life"
  },
  "personal health profile": {
   "id": "personal-health",
   "title": "Personal Health",
   "p": [
    "#FB7185",
    "#BE123C"
   ],
   "flavor": "Coral Pulse",
   "blurb": "Chronic conditions in a little more detail"
  },
  "treatment profile": {
   "id": "treatment",
   "title": "Treatment",
   "p": [
    "#E879F9",
    "#86198F"
   ],
   "flavor": "Orchid Bloom",
   "blurb": "The treatments you use and how well they work for you"
  },
  "medication and pharmacy behaviour": {
   "id": "medication",
   "title": "Medication & Pharmacy",
   "p": [
    "#F43F5E",
    "#C2410C"
   ],
   "flavor": "Pill Pop",
   "blurb": "Where you get your medicines and how you manage them"
  },
  "healthcare provider profile": {
   "id": "providers",
   "title": "Healthcare Providers",
   "p": [
    "#34D399",
    "#047857"
   ],
   "flavor": "Clinic Mint",
   "blurb": "Who looks after your health, and where"
  },
  "diagnostic testing": {
   "id": "diagnostics",
   "title": "Diagnostic Testing",
   "p": [
    "#22D3EE",
    "#155E75"
   ],
   "flavor": "Lab Cyan",
   "blurb": "Tests and monitoring for your condition"
  },
  "medical devices and digital health": {
   "id": "devices",
   "title": "Medical Devices & Apps",
   "p": [
    "#84CC16",
    "#1E3A8A"
   ],
   "flavor": "Midnight Lime",
   "blurb": "Monitors, wearables and health apps"
  },
  "hospital and healthcare utilisation": {
   "id": "hospital",
   "title": "Hospital Visits",
   "p": [
    "#FDA4AF",
    "#9F1239"
   ],
   "flavor": "Rose Quartz",
   "blurb": "Hospital and doctor visits in the past year"
  },
  "health insurance and healthcare payment": {
   "id": "insurance",
   "title": "Insurance & Costs",
   "p": [
    "#818CF8",
    "#1D4ED8"
   ],
   "flavor": "Sapphire Shield",
   "blurb": "Health cover and paying for care"
  },
  "lifestyle and behaviour": {
   "id": "lifestyle",
   "title": "Lifestyle & Habits",
   "p": [
    "#FACC15",
    "#0F766E"
   ],
   "flavor": "Lotus Lime",
   "blurb": "Activity, diet, sleep and everyday habits"
  },
  "food and lifestyle profile": {
   "id": "food",
   "title": "Food, Drink & Fitness",
   "p": [
    "#A3E635",
    "#15803D"
   ],
   "flavor": "Garden Fresh",
   "blurb": "What you eat and drink, and how you stay active"
  },
  "patient experience and treatment decisions": {
   "id": "decisions",
   "title": "Treatment Decisions",
   "p": [
    "#F59E0B",
    "#A16207"
   ],
   "flavor": "Amber Gold",
   "blurb": "How you choose treatments and how confident you feel"
  },
  "health information and online behaviour": {
   "id": "info",
   "title": "Health Information",
   "p": [
    "#06B6D4",
    "#0369A1"
   ],
   "flavor": "Electric Blue",
   "blurb": "Where you look for health information"
  },
  "technology and digital health profile": {
   "id": "digital",
   "title": "Technology & Digital Health",
   "p": [
    "#D946EF",
    "#6D28D9"
   ],
   "flavor": "Neon Violet",
   "blurb": "Devices and digital health services you use"
  },
  "educational profile": {
   "id": "education",
   "title": "Education",
   "p": [
    "#A78BFA",
    "#4C1D95"
   ],
   "flavor": "Lilac Scholar",
   "blurb": "Your highest qualification"
  },
  "professional profile": {
   "id": "work",
   "title": "Work & Profession",
   "p": [
    "#14B8A6",
    "#334155"
   ],
   "flavor": "Graphite Teal",
   "blurb": "Your job, industry and organization"
  },
  "clinical research and market research experience": {
   "id": "research",
   "title": "Research Experience",
   "p": [
    "#8B5CF6",
    "#5B21B6"
   ],
   "flavor": "Lab Violet",
   "blurb": "Market research and clinical trials you have joined"
  },
  "patient recruitment eligibility": {
   "id": "eligibility",
   "title": "Study Eligibility",
   "p": [
    "#10B981",
    "#065F46"
   ],
   "flavor": "Emerald Target",
   "blurb": "Help us match you with the right studies"
  },
  "documentation and verification": {
   "id": "verification",
   "title": "Verification",
   "p": [
    "#6366F1",
    "#3730A3"
   ],
   "flavor": "Ink Indigo",
   "blurb": "How you could confirm a diagnosis if a study needs it"
  },
  "survey participation and reward preferences profile": {
   "id": "survey",
   "title": "Survey Preferences",
   "p": [
    "#F472B6",
    "#BE185D"
   ],
   "flavor": "Gift Magenta",
   "blurb": "How you like to take part and be rewarded"
  },
  "social media and reward reclaim": {
   "id": "social",
   "title": "Social Media & Payouts",
   "p": [
    "#12B5CB",
    "#00695C"
   ],
   "flavor": "Jade Wallet",
   "blurb": "Where to reach you and how to pay you"
  },
  "additional": {
   "id": "additional",
   "title": "Additional Details",
   "p": [
    "#7C4DFF",
    "#26287A"
   ],
   "flavor": "Galaxy Indigo",
   "blurb": "Help us understand you and your health even better"
  }
 }
};

export function metaOf(panel, s) {
  const c = CATALOG[panel] || {};
  const name = String(s?.name || "").toLowerCase();
  return c[s?.slug] || c[name] || Object.values(c).find((x) => x.id && (x.id === s?.slug)) || null;
}
