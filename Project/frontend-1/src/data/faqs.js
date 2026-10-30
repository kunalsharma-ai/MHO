// FAQ content (visible on /faq and used for FAQPage JSON-LD). Answers are rewritten from the existing
// MyHealthOpinions FAQ. Operations should confirm payout timings and account rules stay accurate.
export const FAQ_GROUPS = [
  {
    id: 'joining',
    title: 'Joining & eligibility',
    color: 'blue',
    items: [
      {
        q: 'What is MyHealthOpinions?',
        a: 'MyHealthOpinions is a free research community where healthcare professionals, caregivers, patients and everyday consumers share opinions in online surveys and earn rewards for completed studies.',
      },
      {
        q: 'Is it really free to join?',
        a: 'Yes. Registration is completely free and we will never ask you to pay, buy a product or "invest" anything to take part — you earn rewards, you never pay them.',
      },
      {
        q: 'Is MyHealthOpinions one of the legit paid survey sites?',
        a: 'Yes. We are run by Frequent Research Fieldwork Solutions Pvt. Ltd. (ISO 9001, ISO 27001 and ISO 20252 certified, ESOMAR member); joining is free, rewards are shown before each survey and payouts go through PayPal, Wire Transfer, Amazon Gift Cards or UPI in India.',
      },
      {
        q: 'Who can sign up?',
        a: 'Adults aged 18 or over who are healthcare professionals, family caregivers, patients or consumers in one of the countries we cover can join; each study then sets its own eligibility rules.',
      },
      {
        q: 'How do I register?',
        a: 'Choose your profile (Healthcare Professional, Caregiver or Patient), fill in the short form, pass the CAPTCHA and confirm the link we email you — that double opt-in activates your account.',
      },
    ],
  },
  {
    id: 'surveys',
    title: 'Surveys & invitations',
    color: 'teal',
    items: [
      {
        q: 'How will I know when a survey is available?',
        a: 'We send invitations that match your profile by email, and you can also see them on your account dashboard; SMS and WhatsApp alerts are available where you opt in.',
      },
      {
        q: 'Why did I not qualify for a survey?',
        a: 'Every study needs a specific audience, so the opening screening questions check whether you fit; if you do not match, the survey closes early and that is completely normal.',
      },
      {
        q: 'Why does a survey say it is closed or full?',
        a: 'Studies close once they reach the number of participants the researcher needs, so opening invitations soon after they arrive gives you the best chance.',
      },
      {
        q: 'How can I receive more invitations?',
        a: 'Complete every profile section and keep it updated, because the more accurately we know your background, the more studies we can match you with.',
      },
      {
        q: 'Why do surveys ask similar questions at the start?',
        a: 'Those questions protect data quality and confirm you are the right respondent for that specific study, even if you answered something similar in your profile.',
      },
      {
        q: 'A survey showed a technical error. What should I do?',
        a: 'Wait a few minutes and try again from the same invitation; if the error continues, email support@myhealthopinions.com with a screenshot so we can fix it.',
      },
    ],
  },
  {
    id: 'rewards',
    title: 'Rewards & payouts',
    color: 'amber',
    items: [
      {
        q: 'How are rewards calculated?',
        a: 'Each survey shows its reward before you start; it depends on the topic, length and audience, and the points are credited once the completion is validated.',
      },
      {
        q: 'How much does each survey pay?',
        a: 'Typical rewards are $15–$20 per survey for patients, $15–$25 for caregivers and $20–$50 for doctors and specialists. The exact reward depends on the study’s length and audience and is always shown in the invitation before you start.',
      },
      {
        q: 'Which payment methods can I choose?',
        a: 'Cash rewards by PayPal, bank transfer or wire transfer, digital gift cards, and shopping or grocery vouchers; UPI is available only to members in India, and healthcare professionals can also choose a Medical Report on selected studies. Options can vary by country.',
      },
      {
        q: 'When can I redeem my points?',
        a: 'Once your balance reaches the minimum redemption threshold shown on your dashboard, use the "Redeem Now" button and pick your preferred payout method.',
      },
      {
        q: 'Can I make money online fast with paid surveys?',
        a: 'Paid surveys are a steady top-up, not a get-rich-quick scheme: each completed survey earns its stated reward, points are validated, and payouts follow your redemption request — so be wary of any site promising instant or unlimited cash.',
      },
      {
        q: 'Are these "free money surveys"?',
        a: 'Joining is free and you never pay anything, but the rewards are earned: you receive an incentive for the time and honest opinions you give in each completed survey.',
      },
      {
        q: 'How long does a payout take?',
        a: 'After we validate your profile and completed surveys, payouts are usually processed within two to three weeks, so please double-check your payment details to avoid delays.',
      },
    ],
  },
  {
    id: 'clinical',
    title: 'Surveys vs clinical studies',
    color: 'teal',
    items: [
      {
        q: 'Do you offer paid clinical studies or drug trials near me?',
        a: 'No. MyHealthOpinions runs online health surveys and market research only — nothing is tested on you; for paid clinical trials near you, search official registries such as ClinicalTrials.gov or ask your doctor.',
      },
      {
        q: 'How is a paid health survey different from paid clinical research?',
        a: 'Paid clinical research (a clinical trial) tests a medicine, device or procedure under medical supervision, whereas a paid health survey simply asks about your experiences and opinions online, from home, in a few minutes.',
      },
      {
        q: 'Who uses the answers from healthcare surveys?',
        a: 'Pharmaceutical, medical device and health-technology companies, hospitals and research agencies (including clinical research organizations) use anonymised, combined answers to improve medicines, services and patient care.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & privacy',
    color: 'violet',
    items: [
      {
        q: 'Can I change my email address?',
        a: 'For security the primary email cannot be changed from the dashboard, but our support team can help if you email support@myhealthopinions.com from your registered address.',
      },
      {
        q: 'Can I edit my personal details?',
        a: 'You can update most profile categories at any time, but core details such as gender and date of birth are locked after registration to protect data integrity.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to My Profile and choose Delete Account, then confirm via email; you can restore it within 30 days, after which your account data is permanently removed.',
      },
      {
        q: 'Do you share or sell my personal information?',
        a: 'No. We never sell your personal data, clients only receive anonymised, aggregated answers, and we do not share identifiable details without your consent unless the law requires it.',
      },
      {
        q: 'Why do you ask about income or household?',
        a: 'Some studies need people from specific income or family groups, and these details help us match you; they are kept confidential and are never used for advertising.',
      },
    ],
  },
];

const byQ = (q) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.q === q);
export const HOME_FAQ = [
  byQ('Is it really free to join?'),
  byQ('Is MyHealthOpinions one of the legit paid survey sites?'),
  byQ('Which payment methods can I choose?'),
  byQ('Can I make money online fast with paid surveys?'),
  byQ('Do you offer paid clinical studies or drug trials near me?'),
  byQ('Do you share or sell my personal information?'),
];

// "How It Works" page FAQ (also used by the live help assistant).
export const HOW_FAQ = [
  { q: 'Do I really get paid to take surveys?', a: 'Yes. Every completed, validated survey earns the reward shown in its invitation; points add up in your dashboard and are redeemed once you reach the threshold.' },
  { q: 'How many surveys can I take?', a: 'It depends on how many studies match your profile at any time. Completing your profile and opening invitations promptly gives you the most opportunities.' },
  { q: 'What if I am screened out?', a: 'Screen-outs are normal — each study needs a very specific audience. It says nothing about the quality of your answers.' },
  { q: 'Is doing surveys for money a full-time job?', a: 'No. Treat it as a flexible top-up you can do from home or your phone, not a replacement for a salary.' },
];
