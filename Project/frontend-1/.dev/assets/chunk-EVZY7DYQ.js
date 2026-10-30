import {
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/data/faqs.js
init_define_import_meta_env();
var FAQ_GROUPS = [
  {
    id: "joining",
    title: "Joining & eligibility",
    color: "blue",
    items: [
      {
        q: "What is MyHealthOpinions?",
        a: "MyHealthOpinions is a free research community where healthcare professionals, caregivers, patients and everyday consumers share opinions in online surveys and earn rewards for completed studies."
      },
      {
        q: "Is it really free to join?",
        a: 'Yes. Registration is completely free and we will never ask you to pay, buy a product or "invest" anything to take part \u2014 you earn rewards, you never pay them.'
      },
      {
        q: "Is MyHealthOpinions one of the legit paid survey sites?",
        a: "Yes. We are run by Frequent Research Fieldwork Solutions Pvt. Ltd. (ISO 9001, ISO 27001 and ISO 20252 certified, ESOMAR member); joining is free, rewards are shown before each survey and payouts go through PayPal, Wire Transfer, Amazon Gift Cards or UPI in India."
      },
      {
        q: "Who can sign up?",
        a: "Adults aged 18 or over who are healthcare professionals, family caregivers, patients or consumers in one of the countries we cover can join; each study then sets its own eligibility rules."
      },
      {
        q: "How do I register?",
        a: "Choose your profile (Healthcare Professional, Caregiver or Patient), fill in the short form, pass the CAPTCHA and confirm the link we email you \u2014 that double opt-in activates your account."
      }
    ]
  },
  {
    id: "surveys",
    title: "Surveys & invitations",
    color: "teal",
    items: [
      {
        q: "How will I know when a survey is available?",
        a: "We send invitations that match your profile by email, and you can also see them on your account dashboard; SMS and WhatsApp alerts are available where you opt in."
      },
      {
        q: "Why did I not qualify for a survey?",
        a: "Every study needs a specific audience, so the opening screening questions check whether you fit; if you do not match, the survey closes early and that is completely normal."
      },
      {
        q: "Why does a survey say it is closed or full?",
        a: "Studies close once they reach the number of participants the researcher needs, so opening invitations soon after they arrive gives you the best chance."
      },
      {
        q: "How can I receive more invitations?",
        a: "Complete every profile section and keep it updated, because the more accurately we know your background, the more studies we can match you with."
      },
      {
        q: "Why do surveys ask similar questions at the start?",
        a: "Those questions protect data quality and confirm you are the right respondent for that specific study, even if you answered something similar in your profile."
      },
      {
        q: "A survey showed a technical error. What should I do?",
        a: "Wait a few minutes and try again from the same invitation; if the error continues, email support@myhealthopinions.com with a screenshot so we can fix it."
      }
    ]
  },
  {
    id: "rewards",
    title: "Rewards & payouts",
    color: "amber",
    items: [
      {
        q: "How are rewards calculated?",
        a: "Each survey shows its reward before you start; it depends on the topic, length and audience, and the points are credited once the completion is validated."
      },
      {
        q: "How much does each survey pay?",
        a: "Typical rewards are $15\u2013$20 per survey for patients, $15\u2013$25 for caregivers and $20\u2013$50 for doctors and specialists. The exact reward depends on the study\u2019s length and audience and is always shown in the invitation before you start."
      },
      {
        q: "Which payment methods can I choose?",
        a: "Cash rewards by PayPal, bank transfer or wire transfer, digital gift cards, and shopping or grocery vouchers; UPI is available only to members in India, and healthcare professionals can also choose a Medical Report on selected studies. Options can vary by country."
      },
      {
        q: "When can I redeem my points?",
        a: 'Once your balance reaches the minimum redemption threshold shown on your dashboard, use the "Redeem Now" button and pick your preferred payout method.'
      },
      {
        q: "Can I make money online fast with paid surveys?",
        a: "Paid surveys are a steady top-up, not a get-rich-quick scheme: each completed survey earns its stated reward, points are validated, and payouts follow your redemption request \u2014 so be wary of any site promising instant or unlimited cash."
      },
      {
        q: 'Are these "free money surveys"?',
        a: "Joining is free and you never pay anything, but the rewards are earned: you receive an incentive for the time and honest opinions you give in each completed survey."
      },
      {
        q: "How long does a payout take?",
        a: "After we validate your profile and completed surveys, payouts are usually processed within two to three weeks, so please double-check your payment details to avoid delays."
      }
    ]
  },
  {
    id: "clinical",
    title: "Surveys vs clinical studies",
    color: "teal",
    items: [
      {
        q: "Do you offer paid clinical studies or drug trials near me?",
        a: "No. MyHealthOpinions runs online health surveys and market research only \u2014 nothing is tested on you; for paid clinical trials near you, search official registries such as ClinicalTrials.gov or ask your doctor."
      },
      {
        q: "How is a paid health survey different from paid clinical research?",
        a: "Paid clinical research (a clinical trial) tests a medicine, device or procedure under medical supervision, whereas a paid health survey simply asks about your experiences and opinions online, from home, in a few minutes."
      },
      {
        q: "Who uses the answers from healthcare surveys?",
        a: "Pharmaceutical, medical device and health-technology companies, hospitals and research agencies (including clinical research organizations) use anonymised, combined answers to improve medicines, services and patient care."
      }
    ]
  },
  {
    id: "account",
    title: "Account & privacy",
    color: "violet",
    items: [
      {
        q: "Can I change my email address?",
        a: "For security the primary email cannot be changed from the dashboard, but our support team can help if you email support@myhealthopinions.com from your registered address."
      },
      {
        q: "Can I edit my personal details?",
        a: "You can update most profile categories at any time, but core details such as gender and date of birth are locked after registration to protect data integrity."
      },
      {
        q: "How do I delete my account?",
        a: "Go to My Profile and choose Delete Account, then confirm via email; you can restore it within 30 days, after which your account data is permanently removed."
      },
      {
        q: "Do you share or sell my personal information?",
        a: "No. We never sell your personal data, clients only receive anonymised, aggregated answers, and we do not share identifiable details without your consent unless the law requires it."
      },
      {
        q: "Why do you ask about income or household?",
        a: "Some studies need people from specific income or family groups, and these details help us match you; they are kept confidential and are never used for advertising."
      }
    ]
  }
];
var byQ = (q) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.q === q);
var HOME_FAQ = [
  byQ("Is it really free to join?"),
  byQ("Is MyHealthOpinions one of the legit paid survey sites?"),
  byQ("Which payment methods can I choose?"),
  byQ("Can I make money online fast with paid surveys?"),
  byQ("Do you offer paid clinical studies or drug trials near me?"),
  byQ("Do you share or sell my personal information?")
];
var HOW_FAQ = [
  { q: "Do I really get paid to take surveys?", a: "Yes. Every completed, validated survey earns the reward shown in its invitation; points add up in your dashboard and are redeemed once you reach the threshold." },
  { q: "How many surveys can I take?", a: "It depends on how many studies match your profile at any time. Completing your profile and opening invitations promptly gives you the most opportunities." },
  { q: "What if I am screened out?", a: "Screen-outs are normal \u2014 each study needs a very specific audience. It says nothing about the quality of your answers." },
  { q: "Is doing surveys for money a full-time job?", a: "No. Treat it as a flexible top-up you can do from home or your phone, not a replacement for a salary." }
];

export {
  FAQ_GROUPS,
  HOME_FAQ,
  HOW_FAQ
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2RhdGEvZmFxcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gRkFRIGNvbnRlbnQgKHZpc2libGUgb24gL2ZhcSBhbmQgdXNlZCBmb3IgRkFRUGFnZSBKU09OLUxEKS4gQW5zd2VycyBhcmUgcmV3cml0dGVuIGZyb20gdGhlIGV4aXN0aW5nXG4vLyBNeUhlYWx0aE9waW5pb25zIEZBUS4gT3BlcmF0aW9ucyBzaG91bGQgY29uZmlybSBwYXlvdXQgdGltaW5ncyBhbmQgYWNjb3VudCBydWxlcyBzdGF5IGFjY3VyYXRlLlxuZXhwb3J0IGNvbnN0IEZBUV9HUk9VUFMgPSBbXG4gIHtcbiAgICBpZDogJ2pvaW5pbmcnLFxuICAgIHRpdGxlOiAnSm9pbmluZyAmIGVsaWdpYmlsaXR5JyxcbiAgICBjb2xvcjogJ2JsdWUnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHE6ICdXaGF0IGlzIE15SGVhbHRoT3BpbmlvbnM/JyxcbiAgICAgICAgYTogJ015SGVhbHRoT3BpbmlvbnMgaXMgYSBmcmVlIHJlc2VhcmNoIGNvbW11bml0eSB3aGVyZSBoZWFsdGhjYXJlIHByb2Zlc3Npb25hbHMsIGNhcmVnaXZlcnMsIHBhdGllbnRzIGFuZCBldmVyeWRheSBjb25zdW1lcnMgc2hhcmUgb3BpbmlvbnMgaW4gb25saW5lIHN1cnZleXMgYW5kIGVhcm4gcmV3YXJkcyBmb3IgY29tcGxldGVkIHN0dWRpZXMuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdJcyBpdCByZWFsbHkgZnJlZSB0byBqb2luPycsXG4gICAgICAgIGE6ICdZZXMuIFJlZ2lzdHJhdGlvbiBpcyBjb21wbGV0ZWx5IGZyZWUgYW5kIHdlIHdpbGwgbmV2ZXIgYXNrIHlvdSB0byBwYXksIGJ1eSBhIHByb2R1Y3Qgb3IgXCJpbnZlc3RcIiBhbnl0aGluZyB0byB0YWtlIHBhcnQgXHUyMDE0IHlvdSBlYXJuIHJld2FyZHMsIHlvdSBuZXZlciBwYXkgdGhlbS4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0lzIE15SGVhbHRoT3BpbmlvbnMgb25lIG9mIHRoZSBsZWdpdCBwYWlkIHN1cnZleSBzaXRlcz8nLFxuICAgICAgICBhOiAnWWVzLiBXZSBhcmUgcnVuIGJ5IEZyZXF1ZW50IFJlc2VhcmNoIEZpZWxkd29yayBTb2x1dGlvbnMgUHZ0LiBMdGQuIChJU08gOTAwMSwgSVNPIDI3MDAxIGFuZCBJU08gMjAyNTIgY2VydGlmaWVkLCBFU09NQVIgbWVtYmVyKTsgam9pbmluZyBpcyBmcmVlLCByZXdhcmRzIGFyZSBzaG93biBiZWZvcmUgZWFjaCBzdXJ2ZXkgYW5kIHBheW91dHMgZ28gdGhyb3VnaCBQYXlQYWwsIFdpcmUgVHJhbnNmZXIsIEFtYXpvbiBHaWZ0IENhcmRzIG9yIFVQSSBpbiBJbmRpYS4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ1dobyBjYW4gc2lnbiB1cD8nLFxuICAgICAgICBhOiAnQWR1bHRzIGFnZWQgMTggb3Igb3ZlciB3aG8gYXJlIGhlYWx0aGNhcmUgcHJvZmVzc2lvbmFscywgZmFtaWx5IGNhcmVnaXZlcnMsIHBhdGllbnRzIG9yIGNvbnN1bWVycyBpbiBvbmUgb2YgdGhlIGNvdW50cmllcyB3ZSBjb3ZlciBjYW4gam9pbjsgZWFjaCBzdHVkeSB0aGVuIHNldHMgaXRzIG93biBlbGlnaWJpbGl0eSBydWxlcy4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0hvdyBkbyBJIHJlZ2lzdGVyPycsXG4gICAgICAgIGE6ICdDaG9vc2UgeW91ciBwcm9maWxlIChIZWFsdGhjYXJlIFByb2Zlc3Npb25hbCwgQ2FyZWdpdmVyIG9yIFBhdGllbnQpLCBmaWxsIGluIHRoZSBzaG9ydCBmb3JtLCBwYXNzIHRoZSBDQVBUQ0hBIGFuZCBjb25maXJtIHRoZSBsaW5rIHdlIGVtYWlsIHlvdSBcdTIwMTQgdGhhdCBkb3VibGUgb3B0LWluIGFjdGl2YXRlcyB5b3VyIGFjY291bnQuJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3VydmV5cycsXG4gICAgdGl0bGU6ICdTdXJ2ZXlzICYgaW52aXRhdGlvbnMnLFxuICAgIGNvbG9yOiAndGVhbCcsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgcTogJ0hvdyB3aWxsIEkga25vdyB3aGVuIGEgc3VydmV5IGlzIGF2YWlsYWJsZT8nLFxuICAgICAgICBhOiAnV2Ugc2VuZCBpbnZpdGF0aW9ucyB0aGF0IG1hdGNoIHlvdXIgcHJvZmlsZSBieSBlbWFpbCwgYW5kIHlvdSBjYW4gYWxzbyBzZWUgdGhlbSBvbiB5b3VyIGFjY291bnQgZGFzaGJvYXJkOyBTTVMgYW5kIFdoYXRzQXBwIGFsZXJ0cyBhcmUgYXZhaWxhYmxlIHdoZXJlIHlvdSBvcHQgaW4uJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdXaHkgZGlkIEkgbm90IHF1YWxpZnkgZm9yIGEgc3VydmV5PycsXG4gICAgICAgIGE6ICdFdmVyeSBzdHVkeSBuZWVkcyBhIHNwZWNpZmljIGF1ZGllbmNlLCBzbyB0aGUgb3BlbmluZyBzY3JlZW5pbmcgcXVlc3Rpb25zIGNoZWNrIHdoZXRoZXIgeW91IGZpdDsgaWYgeW91IGRvIG5vdCBtYXRjaCwgdGhlIHN1cnZleSBjbG9zZXMgZWFybHkgYW5kIHRoYXQgaXMgY29tcGxldGVseSBub3JtYWwuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdXaHkgZG9lcyBhIHN1cnZleSBzYXkgaXQgaXMgY2xvc2VkIG9yIGZ1bGw/JyxcbiAgICAgICAgYTogJ1N0dWRpZXMgY2xvc2Ugb25jZSB0aGV5IHJlYWNoIHRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIHRoZSByZXNlYXJjaGVyIG5lZWRzLCBzbyBvcGVuaW5nIGludml0YXRpb25zIHNvb24gYWZ0ZXIgdGhleSBhcnJpdmUgZ2l2ZXMgeW91IHRoZSBiZXN0IGNoYW5jZS4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0hvdyBjYW4gSSByZWNlaXZlIG1vcmUgaW52aXRhdGlvbnM/JyxcbiAgICAgICAgYTogJ0NvbXBsZXRlIGV2ZXJ5IHByb2ZpbGUgc2VjdGlvbiBhbmQga2VlcCBpdCB1cGRhdGVkLCBiZWNhdXNlIHRoZSBtb3JlIGFjY3VyYXRlbHkgd2Uga25vdyB5b3VyIGJhY2tncm91bmQsIHRoZSBtb3JlIHN0dWRpZXMgd2UgY2FuIG1hdGNoIHlvdSB3aXRoLicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBxOiAnV2h5IGRvIHN1cnZleXMgYXNrIHNpbWlsYXIgcXVlc3Rpb25zIGF0IHRoZSBzdGFydD8nLFxuICAgICAgICBhOiAnVGhvc2UgcXVlc3Rpb25zIHByb3RlY3QgZGF0YSBxdWFsaXR5IGFuZCBjb25maXJtIHlvdSBhcmUgdGhlIHJpZ2h0IHJlc3BvbmRlbnQgZm9yIHRoYXQgc3BlY2lmaWMgc3R1ZHksIGV2ZW4gaWYgeW91IGFuc3dlcmVkIHNvbWV0aGluZyBzaW1pbGFyIGluIHlvdXIgcHJvZmlsZS4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0Egc3VydmV5IHNob3dlZCBhIHRlY2huaWNhbCBlcnJvci4gV2hhdCBzaG91bGQgSSBkbz8nLFxuICAgICAgICBhOiAnV2FpdCBhIGZldyBtaW51dGVzIGFuZCB0cnkgYWdhaW4gZnJvbSB0aGUgc2FtZSBpbnZpdGF0aW9uOyBpZiB0aGUgZXJyb3IgY29udGludWVzLCBlbWFpbCBzdXBwb3J0QG15aGVhbHRob3BpbmlvbnMuY29tIHdpdGggYSBzY3JlZW5zaG90IHNvIHdlIGNhbiBmaXggaXQuJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAncmV3YXJkcycsXG4gICAgdGl0bGU6ICdSZXdhcmRzICYgcGF5b3V0cycsXG4gICAgY29sb3I6ICdhbWJlcicsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgcTogJ0hvdyBhcmUgcmV3YXJkcyBjYWxjdWxhdGVkPycsXG4gICAgICAgIGE6ICdFYWNoIHN1cnZleSBzaG93cyBpdHMgcmV3YXJkIGJlZm9yZSB5b3Ugc3RhcnQ7IGl0IGRlcGVuZHMgb24gdGhlIHRvcGljLCBsZW5ndGggYW5kIGF1ZGllbmNlLCBhbmQgdGhlIHBvaW50cyBhcmUgY3JlZGl0ZWQgb25jZSB0aGUgY29tcGxldGlvbiBpcyB2YWxpZGF0ZWQuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdIb3cgbXVjaCBkb2VzIGVhY2ggc3VydmV5IHBheT8nLFxuICAgICAgICBhOiAnVHlwaWNhbCByZXdhcmRzIGFyZSAkMTVcdTIwMTMkMjAgcGVyIHN1cnZleSBmb3IgcGF0aWVudHMsICQxNVx1MjAxMyQyNSBmb3IgY2FyZWdpdmVycyBhbmQgJDIwXHUyMDEzJDUwIGZvciBkb2N0b3JzIGFuZCBzcGVjaWFsaXN0cy4gVGhlIGV4YWN0IHJld2FyZCBkZXBlbmRzIG9uIHRoZSBzdHVkeVx1MjAxOXMgbGVuZ3RoIGFuZCBhdWRpZW5jZSBhbmQgaXMgYWx3YXlzIHNob3duIGluIHRoZSBpbnZpdGF0aW9uIGJlZm9yZSB5b3Ugc3RhcnQuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdXaGljaCBwYXltZW50IG1ldGhvZHMgY2FuIEkgY2hvb3NlPycsXG4gICAgICAgIGE6ICdDYXNoIHJld2FyZHMgYnkgUGF5UGFsLCBiYW5rIHRyYW5zZmVyIG9yIHdpcmUgdHJhbnNmZXIsIGRpZ2l0YWwgZ2lmdCBjYXJkcywgYW5kIHNob3BwaW5nIG9yIGdyb2Nlcnkgdm91Y2hlcnM7IFVQSSBpcyBhdmFpbGFibGUgb25seSB0byBtZW1iZXJzIGluIEluZGlhLCBhbmQgaGVhbHRoY2FyZSBwcm9mZXNzaW9uYWxzIGNhbiBhbHNvIGNob29zZSBhIE1lZGljYWwgUmVwb3J0IG9uIHNlbGVjdGVkIHN0dWRpZXMuIE9wdGlvbnMgY2FuIHZhcnkgYnkgY291bnRyeS4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ1doZW4gY2FuIEkgcmVkZWVtIG15IHBvaW50cz8nLFxuICAgICAgICBhOiAnT25jZSB5b3VyIGJhbGFuY2UgcmVhY2hlcyB0aGUgbWluaW11bSByZWRlbXB0aW9uIHRocmVzaG9sZCBzaG93biBvbiB5b3VyIGRhc2hib2FyZCwgdXNlIHRoZSBcIlJlZGVlbSBOb3dcIiBidXR0b24gYW5kIHBpY2sgeW91ciBwcmVmZXJyZWQgcGF5b3V0IG1ldGhvZC4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0NhbiBJIG1ha2UgbW9uZXkgb25saW5lIGZhc3Qgd2l0aCBwYWlkIHN1cnZleXM/JyxcbiAgICAgICAgYTogJ1BhaWQgc3VydmV5cyBhcmUgYSBzdGVhZHkgdG9wLXVwLCBub3QgYSBnZXQtcmljaC1xdWljayBzY2hlbWU6IGVhY2ggY29tcGxldGVkIHN1cnZleSBlYXJucyBpdHMgc3RhdGVkIHJld2FyZCwgcG9pbnRzIGFyZSB2YWxpZGF0ZWQsIGFuZCBwYXlvdXRzIGZvbGxvdyB5b3VyIHJlZGVtcHRpb24gcmVxdWVzdCBcdTIwMTQgc28gYmUgd2FyeSBvZiBhbnkgc2l0ZSBwcm9taXNpbmcgaW5zdGFudCBvciB1bmxpbWl0ZWQgY2FzaC4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ0FyZSB0aGVzZSBcImZyZWUgbW9uZXkgc3VydmV5c1wiPycsXG4gICAgICAgIGE6ICdKb2luaW5nIGlzIGZyZWUgYW5kIHlvdSBuZXZlciBwYXkgYW55dGhpbmcsIGJ1dCB0aGUgcmV3YXJkcyBhcmUgZWFybmVkOiB5b3UgcmVjZWl2ZSBhbiBpbmNlbnRpdmUgZm9yIHRoZSB0aW1lIGFuZCBob25lc3Qgb3BpbmlvbnMgeW91IGdpdmUgaW4gZWFjaCBjb21wbGV0ZWQgc3VydmV5LicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBxOiAnSG93IGxvbmcgZG9lcyBhIHBheW91dCB0YWtlPycsXG4gICAgICAgIGE6ICdBZnRlciB3ZSB2YWxpZGF0ZSB5b3VyIHByb2ZpbGUgYW5kIGNvbXBsZXRlZCBzdXJ2ZXlzLCBwYXlvdXRzIGFyZSB1c3VhbGx5IHByb2Nlc3NlZCB3aXRoaW4gdHdvIHRvIHRocmVlIHdlZWtzLCBzbyBwbGVhc2UgZG91YmxlLWNoZWNrIHlvdXIgcGF5bWVudCBkZXRhaWxzIHRvIGF2b2lkIGRlbGF5cy4nLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICdjbGluaWNhbCcsXG4gICAgdGl0bGU6ICdTdXJ2ZXlzIHZzIGNsaW5pY2FsIHN0dWRpZXMnLFxuICAgIGNvbG9yOiAndGVhbCcsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgcTogJ0RvIHlvdSBvZmZlciBwYWlkIGNsaW5pY2FsIHN0dWRpZXMgb3IgZHJ1ZyB0cmlhbHMgbmVhciBtZT8nLFxuICAgICAgICBhOiAnTm8uIE15SGVhbHRoT3BpbmlvbnMgcnVucyBvbmxpbmUgaGVhbHRoIHN1cnZleXMgYW5kIG1hcmtldCByZXNlYXJjaCBvbmx5IFx1MjAxNCBub3RoaW5nIGlzIHRlc3RlZCBvbiB5b3U7IGZvciBwYWlkIGNsaW5pY2FsIHRyaWFscyBuZWFyIHlvdSwgc2VhcmNoIG9mZmljaWFsIHJlZ2lzdHJpZXMgc3VjaCBhcyBDbGluaWNhbFRyaWFscy5nb3Ygb3IgYXNrIHlvdXIgZG9jdG9yLicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBxOiAnSG93IGlzIGEgcGFpZCBoZWFsdGggc3VydmV5IGRpZmZlcmVudCBmcm9tIHBhaWQgY2xpbmljYWwgcmVzZWFyY2g/JyxcbiAgICAgICAgYTogJ1BhaWQgY2xpbmljYWwgcmVzZWFyY2ggKGEgY2xpbmljYWwgdHJpYWwpIHRlc3RzIGEgbWVkaWNpbmUsIGRldmljZSBvciBwcm9jZWR1cmUgdW5kZXIgbWVkaWNhbCBzdXBlcnZpc2lvbiwgd2hlcmVhcyBhIHBhaWQgaGVhbHRoIHN1cnZleSBzaW1wbHkgYXNrcyBhYm91dCB5b3VyIGV4cGVyaWVuY2VzIGFuZCBvcGluaW9ucyBvbmxpbmUsIGZyb20gaG9tZSwgaW4gYSBmZXcgbWludXRlcy4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcTogJ1dobyB1c2VzIHRoZSBhbnN3ZXJzIGZyb20gaGVhbHRoY2FyZSBzdXJ2ZXlzPycsXG4gICAgICAgIGE6ICdQaGFybWFjZXV0aWNhbCwgbWVkaWNhbCBkZXZpY2UgYW5kIGhlYWx0aC10ZWNobm9sb2d5IGNvbXBhbmllcywgaG9zcGl0YWxzIGFuZCByZXNlYXJjaCBhZ2VuY2llcyAoaW5jbHVkaW5nIGNsaW5pY2FsIHJlc2VhcmNoIG9yZ2FuaXphdGlvbnMpIHVzZSBhbm9ueW1pc2VkLCBjb21iaW5lZCBhbnN3ZXJzIHRvIGltcHJvdmUgbWVkaWNpbmVzLCBzZXJ2aWNlcyBhbmQgcGF0aWVudCBjYXJlLicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ2FjY291bnQnLFxuICAgIHRpdGxlOiAnQWNjb3VudCAmIHByaXZhY3knLFxuICAgIGNvbG9yOiAndmlvbGV0JyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICBxOiAnQ2FuIEkgY2hhbmdlIG15IGVtYWlsIGFkZHJlc3M/JyxcbiAgICAgICAgYTogJ0ZvciBzZWN1cml0eSB0aGUgcHJpbWFyeSBlbWFpbCBjYW5ub3QgYmUgY2hhbmdlZCBmcm9tIHRoZSBkYXNoYm9hcmQsIGJ1dCBvdXIgc3VwcG9ydCB0ZWFtIGNhbiBoZWxwIGlmIHlvdSBlbWFpbCBzdXBwb3J0QG15aGVhbHRob3BpbmlvbnMuY29tIGZyb20geW91ciByZWdpc3RlcmVkIGFkZHJlc3MuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdDYW4gSSBlZGl0IG15IHBlcnNvbmFsIGRldGFpbHM/JyxcbiAgICAgICAgYTogJ1lvdSBjYW4gdXBkYXRlIG1vc3QgcHJvZmlsZSBjYXRlZ29yaWVzIGF0IGFueSB0aW1lLCBidXQgY29yZSBkZXRhaWxzIHN1Y2ggYXMgZ2VuZGVyIGFuZCBkYXRlIG9mIGJpcnRoIGFyZSBsb2NrZWQgYWZ0ZXIgcmVnaXN0cmF0aW9uIHRvIHByb3RlY3QgZGF0YSBpbnRlZ3JpdHkuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdIb3cgZG8gSSBkZWxldGUgbXkgYWNjb3VudD8nLFxuICAgICAgICBhOiAnR28gdG8gTXkgUHJvZmlsZSBhbmQgY2hvb3NlIERlbGV0ZSBBY2NvdW50LCB0aGVuIGNvbmZpcm0gdmlhIGVtYWlsOyB5b3UgY2FuIHJlc3RvcmUgaXQgd2l0aGluIDMwIGRheXMsIGFmdGVyIHdoaWNoIHlvdXIgYWNjb3VudCBkYXRhIGlzIHBlcm1hbmVudGx5IHJlbW92ZWQuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdEbyB5b3Ugc2hhcmUgb3Igc2VsbCBteSBwZXJzb25hbCBpbmZvcm1hdGlvbj8nLFxuICAgICAgICBhOiAnTm8uIFdlIG5ldmVyIHNlbGwgeW91ciBwZXJzb25hbCBkYXRhLCBjbGllbnRzIG9ubHkgcmVjZWl2ZSBhbm9ueW1pc2VkLCBhZ2dyZWdhdGVkIGFuc3dlcnMsIGFuZCB3ZSBkbyBub3Qgc2hhcmUgaWRlbnRpZmlhYmxlIGRldGFpbHMgd2l0aG91dCB5b3VyIGNvbnNlbnQgdW5sZXNzIHRoZSBsYXcgcmVxdWlyZXMgaXQuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHE6ICdXaHkgZG8geW91IGFzayBhYm91dCBpbmNvbWUgb3IgaG91c2Vob2xkPycsXG4gICAgICAgIGE6ICdTb21lIHN0dWRpZXMgbmVlZCBwZW9wbGUgZnJvbSBzcGVjaWZpYyBpbmNvbWUgb3IgZmFtaWx5IGdyb3VwcywgYW5kIHRoZXNlIGRldGFpbHMgaGVscCB1cyBtYXRjaCB5b3U7IHRoZXkgYXJlIGtlcHQgY29uZmlkZW50aWFsIGFuZCBhcmUgbmV2ZXIgdXNlZCBmb3IgYWR2ZXJ0aXNpbmcuJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG5cbmNvbnN0IGJ5USA9IChxKSA9PiBGQVFfR1JPVVBTLmZsYXRNYXAoKGcpID0+IGcuaXRlbXMpLmZpbmQoKGkpID0+IGkucSA9PT0gcSk7XG5leHBvcnQgY29uc3QgSE9NRV9GQVEgPSBbXG4gIGJ5USgnSXMgaXQgcmVhbGx5IGZyZWUgdG8gam9pbj8nKSxcbiAgYnlRKCdJcyBNeUhlYWx0aE9waW5pb25zIG9uZSBvZiB0aGUgbGVnaXQgcGFpZCBzdXJ2ZXkgc2l0ZXM/JyksXG4gIGJ5USgnV2hpY2ggcGF5bWVudCBtZXRob2RzIGNhbiBJIGNob29zZT8nKSxcbiAgYnlRKCdDYW4gSSBtYWtlIG1vbmV5IG9ubGluZSBmYXN0IHdpdGggcGFpZCBzdXJ2ZXlzPycpLFxuICBieVEoJ0RvIHlvdSBvZmZlciBwYWlkIGNsaW5pY2FsIHN0dWRpZXMgb3IgZHJ1ZyB0cmlhbHMgbmVhciBtZT8nKSxcbiAgYnlRKCdEbyB5b3Ugc2hhcmUgb3Igc2VsbCBteSBwZXJzb25hbCBpbmZvcm1hdGlvbj8nKSxcbl07XG5cbi8vIFwiSG93IEl0IFdvcmtzXCIgcGFnZSBGQVEgKGFsc28gdXNlZCBieSB0aGUgbGl2ZSBoZWxwIGFzc2lzdGFudCkuXG5leHBvcnQgY29uc3QgSE9XX0ZBUSA9IFtcbiAgeyBxOiAnRG8gSSByZWFsbHkgZ2V0IHBhaWQgdG8gdGFrZSBzdXJ2ZXlzPycsIGE6ICdZZXMuIEV2ZXJ5IGNvbXBsZXRlZCwgdmFsaWRhdGVkIHN1cnZleSBlYXJucyB0aGUgcmV3YXJkIHNob3duIGluIGl0cyBpbnZpdGF0aW9uOyBwb2ludHMgYWRkIHVwIGluIHlvdXIgZGFzaGJvYXJkIGFuZCBhcmUgcmVkZWVtZWQgb25jZSB5b3UgcmVhY2ggdGhlIHRocmVzaG9sZC4nIH0sXG4gIHsgcTogJ0hvdyBtYW55IHN1cnZleXMgY2FuIEkgdGFrZT8nLCBhOiAnSXQgZGVwZW5kcyBvbiBob3cgbWFueSBzdHVkaWVzIG1hdGNoIHlvdXIgcHJvZmlsZSBhdCBhbnkgdGltZS4gQ29tcGxldGluZyB5b3VyIHByb2ZpbGUgYW5kIG9wZW5pbmcgaW52aXRhdGlvbnMgcHJvbXB0bHkgZ2l2ZXMgeW91IHRoZSBtb3N0IG9wcG9ydHVuaXRpZXMuJyB9LFxuICB7IHE6ICdXaGF0IGlmIEkgYW0gc2NyZWVuZWQgb3V0PycsIGE6ICdTY3JlZW4tb3V0cyBhcmUgbm9ybWFsIFx1MjAxNCBlYWNoIHN0dWR5IG5lZWRzIGEgdmVyeSBzcGVjaWZpYyBhdWRpZW5jZS4gSXQgc2F5cyBub3RoaW5nIGFib3V0IHRoZSBxdWFsaXR5IG9mIHlvdXIgYW5zd2Vycy4nIH0sXG4gIHsgcTogJ0lzIGRvaW5nIHN1cnZleXMgZm9yIG1vbmV5IGEgZnVsbC10aW1lIGpvYj8nLCBhOiAnTm8uIFRyZWF0IGl0IGFzIGEgZmxleGlibGUgdG9wLXVwIHlvdSBjYW4gZG8gZnJvbSBob21lIG9yIHlvdXIgcGhvbmUsIG5vdCBhIHJlcGxhY2VtZW50IGZvciBhIHNhbGFyeS4nIH0sXG5dO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQTtBQUVPLElBQU0sYUFBYTtBQUFBLEVBQ3hCO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEdBQUc7QUFBQSxRQUNILEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLFFBQ0UsR0FBRztBQUFBLFFBQ0gsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLE1BQU0sQ0FBQyxNQUFNLFdBQVcsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFDcEUsSUFBTSxXQUFXO0FBQUEsRUFDdEIsSUFBSSw0QkFBNEI7QUFBQSxFQUNoQyxJQUFJLHlEQUF5RDtBQUFBLEVBQzdELElBQUkscUNBQXFDO0FBQUEsRUFDekMsSUFBSSxpREFBaUQ7QUFBQSxFQUNyRCxJQUFJLDREQUE0RDtBQUFBLEVBQ2hFLElBQUksK0NBQStDO0FBQ3JEO0FBR08sSUFBTSxVQUFVO0FBQUEsRUFDckIsRUFBRSxHQUFHLHlDQUF5QyxHQUFHLGtLQUFrSztBQUFBLEVBQ25OLEVBQUUsR0FBRyxnQ0FBZ0MsR0FBRyw0SkFBNEo7QUFBQSxFQUNwTSxFQUFFLEdBQUcsOEJBQThCLEdBQUcsOEhBQXlIO0FBQUEsRUFDL0osRUFBRSxHQUFHLCtDQUErQyxHQUFHLHdHQUF3RztBQUNqSzsiLAogICJuYW1lcyI6IFtdCn0K
