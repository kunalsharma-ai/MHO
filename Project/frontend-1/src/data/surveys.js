// Example survey topics (from the existing MyHealthOpinions site). Shown as illustrations of the kind of
// studies members receive — rewards and lengths vary per study and country. Update with real live
// studies from the panel platform if you want this section to be current.
// Typical reward ranges per audience (set by MyHealthOpinions). Each invitation states its exact reward.
export const RATE_BANDS = [
  { id: 'patient', label: 'Patients', min: 15, max: 20, color: '#00a88a', accent: '#12c2e9', icon: 'heart', note: 'Lived-experience studies' },
  { id: 'caregiver', label: 'Caregivers', min: 15, max: 25, color: '#ff8a1f', accent: '#ff4f6d', icon: 'hands', note: 'Care & support studies' },
  { id: 'hcp', label: 'Doctors & specialists', min: 20, max: 50, color: '#2457f5', accent: '#8a4dff', icon: 'stethoscope', note: 'Clinical & specialty studies' },
];
export const RATE_MAX = 50;

// Sample studies of the kind members receive (topics from the MyHealthOpinions site). Rewards sit inside
// the audience's band above; the exact reward, length and topic are always shown in each invitation.
export const SAMPLE_SURVEYS = [
  { band: 'patient', aud: 'Patients', reward: 18, title: 'Diabetes Treatment', text: 'Share your experience with diabetes treatments to help improve future care and patient outcomes.', mins: 12, icon: 'drop' },
  { band: 'hcp', aud: 'Doctors', reward: 35, title: 'Cardiology Research', text: 'Provide insights on heart health, medications and treatment approaches in this cardiology study.', mins: 18, icon: 'heart' },
  { band: 'hcp', aud: 'Specialists', reward: 50, title: 'Oncology Study', text: 'Contribute your expertise on cancer diagnosis, therapies and patient management practices.', mins: 20, icon: 'ribbon' },
  { band: 'caregiver', aud: 'Caregivers', reward: 20, title: 'Caregiver Experience', text: 'Tell us about your caregiving journey to support the development of better healthcare services.', mins: 10, icon: 'hands' },
  { band: 'patient', aud: 'Patients', reward: 15, title: 'Nutrition & Diet', text: 'Share your opinions on nutrition, healthy eating habits and dietary recommendations for better wellness.', mins: 14, icon: 'apple' },
  { band: 'patient', aud: 'Patients', reward: 17, title: 'Mental Wellness', text: 'Help researchers understand mental well-being, stress management and access to support resources.', mins: 15, icon: 'smile' },
  { band: 'hcp', aud: 'Specialists', reward: 45, title: 'Neurology Practice', text: 'Share how you diagnose and manage migraine, epilepsy and Parkinson’s disease in everyday practice.', mins: 20, icon: 'brain' },
  { band: 'hcp', aud: 'Doctors', reward: 25, title: 'Primary Care Prescribing', text: 'Tell us how you choose treatments for common long-term conditions in general practice.', mins: 15, icon: 'pill' },
  { band: 'caregiver', aud: 'Caregivers', reward: 25, title: 'Dementia Care at Home', text: 'Describe the daily routines, tools and support that help you care for a family member living with dementia.', mins: 15, icon: 'home' },
  { band: 'patient', aud: 'Patients', reward: 20, title: 'Asthma & Breathing', text: 'Tell us about inhalers, flare-ups and what helps you breathe easier day to day.', mins: 12, icon: 'lungs' },
  { band: 'hcp', aud: 'Specialists', reward: 40, title: 'Diabetes Devices', text: 'Rate glucose monitors and insulin pens you recommend, and what patients find hard to use.', mins: 18, icon: 'syringe' },
  { band: 'caregiver', aud: 'Caregivers', reward: 15, title: 'Medicine Management', text: 'Show us how you organise medicines, refills and doctor visits for the person you care for.', mins: 10, icon: 'clipboard' },
  { band: 'hcp', aud: 'Doctors', reward: 30, title: 'Dermatology Treatments', text: 'Share your views on treating eczema, psoriasis and acne, and how patients respond.', mins: 15, icon: 'sparkle' },
  { band: 'patient', aud: 'Patients', reward: 19, title: 'Heart Health', text: 'Tell us about living with high blood pressure or cholesterol and the support that helps.', mins: 14, icon: 'pulse' },
  { band: 'caregiver', aud: 'Caregivers', reward: 22, title: 'Child Health Support', text: 'Parents of children with long-term conditions: share what makes school days and check-ups easier.', mins: 12, icon: 'baby' },
  { band: 'hcp', aud: 'Specialists', reward: 48, title: 'Rare Disease Pathways', text: 'Explain how rare genetic conditions are diagnosed and referred in your hospital or clinic.', mins: 25, icon: 'dna' },
  { band: 'patient', aud: 'Patients', reward: 16, title: 'Arthritis & Joint Pain', text: 'Share how joint pain affects your day and which treatments and aids make a difference.', mins: 12, icon: 'bone' },
  { band: 'caregiver', aud: 'Caregivers', reward: 18, title: 'Stroke Recovery at Home', text: 'Tell us about rehabilitation, equipment and respite after a family member’s stroke.', mins: 14, icon: 'wheelchair' },
];

export const STEPS = [
  { title: 'Join free', text: 'Pick Healthcare Professional, Caregiver or Patient and create your account in about 3 minutes. No fees, no investment.', icon: 'user', color: '#3d5afe' },
  { title: 'Build your profile', text: 'Answer profile questions once so we can match you to the right paid surveys — and skip the wrong ones.', icon: 'clipboard', color: '#14b8a6' },
  { title: 'Get invitations', text: 'Matched surveys arrive by email, dashboard, SMS or WhatsApp with topic, time and reward shown upfront.', icon: 'mail', color: '#f59e0b' },
  { title: 'Get paid', text: 'Complete surveys, collect points and redeem via PayPal, Wire Transfer, Amazon Gift Cards — or UPI in India.', icon: 'coins', color: '#e8344e' },
];
