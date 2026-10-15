// Content for the three audience pages — kept strictly separate:
//   /healthcare-professionals/  /caregivers/  /patients/
// Each audience has its own process, journey, profile questions, rewards and FAQs.

export const AUDIENCE = {
  hcp: {
    path: '/healthcare-professionals',
    name: 'Healthcare professionals',
    eyebrow: 'For healthcare professionals',
    title: ['Paid medical surveys for', { t: 'every healthcare role', hl: 'grad' }],
    lead: 'Paid medical surveys for healthcare professionals of every kind: doctors, surgeons, nurses, pharmacists, lab and imaging teams, allied health, health IT, hospital leaders and support staff. Your experience shapes tomorrow’s medicines, devices and services, and verified members receive an honorarium for every completed study.',
    badges: ['1,300+ job titles recruited', 'Honoraria for every completed study', 'Licence-verified panel'],
    stats: [['1,300+', 'job titles'], ['10', 'professional groups'], ['55', 'countries']],
    process: [
      { t: 'Quick screening', d: 'Two questions confirm you work in healthcare and whether you are a clinician.', icon: 'shieldCheck' },
      { t: 'Education & specialty', d: 'Your qualification, primary role, specialization and job level — from the full list of 1,300+ titles.', icon: 'student' },
      { t: 'Practice & workplace', d: 'Country and region of practice, facility type and size, sector and employer.', icon: 'hospital' },
      { t: 'Licence verification', d: 'Your registration number is masked (only the last 4 digits are visible to the panel team) and used only to verify you.', icon: 'key' },
      { t: 'Matched studies & honoraria', d: 'Specialist surveys, interviews and focus groups that fit your expertise, each with the honorarium shown upfront.', icon: 'coins' },
    ],
    journey: [
      { t: 'Invitation lands', d: 'Topic, length and honorarium are in the email, dashboard, SMS or WhatsApp alert.', icon: 'bell' },
      { t: 'Short screener', d: 'A few questions confirm the study fits your specialty and practice.', icon: 'filter' },
      { t: 'Share your expertise', d: 'Treatment patterns, device usability, pathways, policy — usually 15–30 minutes.', icon: 'stethoscope' },
      { t: 'Honorarium credited', d: 'Points reach your account after quality checks; redeem by PayPal, wire transfer, gift card or UPI in India.', icon: 'wallet' },
    ],
    profile: ['Screening (healthcare industry, clinician)', 'Basic demographics', 'Education & licensure', 'Primary role, specialization & job level', 'Country, region & facility of practice', 'Professional address & employer', 'Years of practice & patients per week', 'Clinical trial experience', 'Purchasing & formulary influence', 'EHR, telemedicine & digital health', 'Research preferences & availability', 'Certification number & verification consent'],
    minutes: '8–10',
  },
  caregiver: {
    path: '/caregivers',
    name: 'Caregivers',
    eyebrow: 'For caregivers',
    title: ['Paid surveys for', { t: 'the people who care', hl: 'grad' }],
    lead: 'Paid surveys for caregivers looking after a parent, partner, child or client. Your daily experience — medicines, appointments, night checks and paperwork — helps companies design better support. Short surveys, flexible timing, and rewards like cash, gift cards, shopping and grocery vouchers.',
    badges: ['14 caregiver profiles', 'Sensitive questions always optional', 'Cash, grocery & wellness rewards'],
    stats: [['14', 'caregiver profiles'], ['8–15', 'minutes per survey'], ['20', 'health areas']],
    process: [
      { t: 'Tell us your caring role', d: 'Family carer, parent, long-distance, professional aide — pick what fits.', icon: 'hands' },
      { t: 'Who you care for', d: 'Relationship, age group and the main health conditions involved.', icon: 'users' },
      { t: 'Your day-to-day', d: 'Hours of care, living arrangement and the tasks you help with.', icon: 'calendar' },
      { t: 'Matched surveys', d: 'Studies on support services, medicines, devices, insurance and carer wellbeing.', icon: 'bell' },
      { t: 'Choose your reward', d: 'Cash, gift cards, shopping or grocery vouchers — whatever helps most.', icon: 'gift' },
    ],
    journey: [
      { t: 'Morning: invitation', d: 'A short survey arrives while the kettle boils — the time and reward are shown upfront.', icon: 'sun' },
      { t: 'Afternoon: a quiet moment', d: 'Answer during a waiting-room visit or a nap. Pause and pick it up later.', icon: 'clock' },
      { t: 'Evening: done', d: 'Points land in your dashboard once quality checks pass.', icon: 'check' },
      { t: 'Weekend: redeem', d: 'Swap points for groceries, shopping vouchers, cash or a gift card.', icon: 'bag' },
    ],
    profile: ['Your caring role', 'Who you care for', 'Their age group', 'Health conditions involved', 'Hours of care per week', 'How long you have been caring', 'Where they live', 'Paid or unpaid care', 'Tasks you help with', 'Your role in care decisions'],
    minutes: '4–5',
  },
  patient: {
    path: '/patients',
    name: 'Patients',
    eyebrow: 'For patients',
    title: ['Paid surveys where', { t: 'your health story counts', hl: 'grad' }],
    lead: 'Paid surveys for patients living with a long-term condition, recovering from surgery, newly diagnosed or simply health-conscious. Share your experience from your phone — no clinics, tests or medicines — and earn a reward for every survey you complete.',
    badges: ['195+ conditions across 20 areas', 'Your name never leaves our hands', 'Skip any question you like'],
    stats: [['195+', 'conditions'], ['20', 'therapy areas'], ['0', 'tests or visits']],
    process: [
      { t: 'Describe yourself', d: 'Long-term condition, newly diagnosed, survivor, rare disease, new parent…', icon: 'user' },
      { t: 'Pick your health areas', d: 'Optional and confidential — it only decides which studies reach you.', icon: 'lock' },
      { t: 'Care & preferences', d: 'Where you get care and which research formats you are happy with.', icon: 'clipboard' },
      { t: 'Matched surveys', d: 'About living with your condition, treatments, devices and services.', icon: 'bell' },
      { t: 'Collect rewards', d: 'Gift cards, cash, shopping or grocery vouchers.', icon: 'gift' },
    ],
    journey: [
      { t: 'You get matched', d: 'Only studies relevant to your health areas reach you.', icon: 'target' },
      { t: 'Answer from your phone', d: 'Most surveys take 10–20 minutes and can be paused.', icon: 'phone' },
      { t: 'Stay anonymous', d: 'Researchers see a respondent code and combined answers — never your name.', icon: 'shieldCheck' },
      { t: 'Get rewarded', d: 'Redeem by PayPal, bank or wire transfer, gift card, or UPI in India.', icon: 'gift' },
    ],
    profile: ['Which best describes you', 'Conditions you can speak about (optional)', 'When you were diagnosed (optional)', 'Current treatment (optional)', 'Where you get care', 'How your care is paid for (optional)', 'Research formats you are happy with'],
    minutes: '3–4',
  },
};

export const AUDIENCE_FAQ = {
  hcp: [
    { q: 'Who counts as a healthcare professional?', a: 'Anyone working in the healthcare industry: doctors and surgeons, nurses and midwives, dentists, pharmacists, laboratory and imaging staff, allied health professionals, health IT and administration teams, hospital management and support staff such as front office, records, billing and ambulance services.' },
    { q: 'What if I do not work in healthcare?', a: 'The professional panel is only for people working in the healthcare industry. If you answer “No” to the first screening question, sign-up ends and you return to the home page. You can still join as a patient or caregiver if that applies to you.' },
    { q: 'Why do you ask for my licence or registration number?', a: 'To verify that every professional on the panel is genuine. The number is stored securely, used only for verification, and the panel team sees only the last four characters.' },
    { q: 'How much are honoraria?', a: 'Each invitation shows the honorarium before you start. It depends on the length of the study and how specialised the audience is — rarer specialties and longer interviews pay more.' },
    { q: 'Can non-clinical staff join?', a: 'Yes. Health IT, administration, management and support staff are part of the panel. Clinical questions such as patients seen per week are only asked to clinicians.' },
  ],
  caregiver: [
    { q: 'Do I need to be a paid carer?', a: 'No. Most caregiver members are unpaid family carers — adult children, partners, parents of children with health needs. Professional home care aides and live-in carers are welcome too.' },
    { q: 'Will you ask about the person I care for?', a: 'Only in general terms: their age group and the main health conditions involved, so we can match you to relevant studies. Never their name, and every sensitive question is optional.' },
    { q: 'How long are caregiver surveys?', a: 'Usually 8–15 minutes. You can pause and continue later from your dashboard.' },
    { q: 'What rewards can caregivers choose?', a: 'Digital gift cards, shopping and grocery vouchers, or cash by PayPal, bank transfer, wire transfer or UPI (India), depending on the study and your country.' },
  ],
  patient: [
    { q: 'Is this a clinical trial?', a: 'No. We run online surveys and interviews about your experience. There are no tests, clinic visits or medicines involved.' },
    { q: 'Do I have to share my health conditions?', a: 'No. It is optional and confidential. Sharing them simply means you receive studies that match your experience instead of generic ones.' },
    { q: 'Who sees my answers?', a: 'Researchers receive a respondent code and combined results. Your name, email and phone number are never shared with clients.' },
    { q: 'Which conditions do you research?', a: 'More than 195 conditions across 20 therapy areas — from heart disease, diabetes and cancer to mental health, skin conditions and rare genetic disorders. Healthy, health-conscious people are welcome too.' },
  ],
};
