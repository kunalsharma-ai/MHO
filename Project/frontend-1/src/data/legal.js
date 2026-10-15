// Legal content, restructured from the existing MyHealthOpinions policies for readability.
// IMPORTANT: have your legal adviser review any wording change before publishing. Section shape:
// { id, title, icon, p: [paragraphs], list: [bullets] }. `glance` = summary cards at the top.

export const LEGAL = {
  '/privacy': {
    theme: 'doc-privacy',
    icon: 'lock',
    eyebrow: 'Privacy Policy',
    title: ['How we protect', { t: 'your information', hl: 'grad' }],
    lead: 'This privacy policy explains how My Health Opinions, operated by Frequent Research Fieldwork Solutions Private Limited, collects, uses and protects your personal information.',
    updated: '2026-10-01',
    glance: [
      ['x', 'We never sell your data', 'No sale of personal information to anyone.'],
      ['users', 'Aggregates only', 'Clients receive anonymised, combined answers.'],
      ['shieldCheck', 'Consent first', 'Withdraw consent or delete your account any time.'],
      ['lock', 'Secured', 'Encryption, firewalls and restricted access.'],
    ],
    sections: [
      { id: 'who-we-are', title: 'Who we are', icon: 'building', p: [
        'My Health Opinions is a provider of healthcare and pharmaceutical market research with a panel of healthcare professionals, patients and individual participants. It operates in India under Frequent Research Fieldwork Solutions Private Limited, established in 2017.',
        'Our proprietary panel is managed globally and includes primary care physicians, medical specialists, pharmacy professionals, physician assistants, nurses and other healthcare experts, as well as individuals representing diverse health issues. Our website, survey platform (powered by third-party software) and related activities are our "Services".',
        '"Personal Information" means data that identifies, relates to, describes or could reasonably be linked to a specific individual or household. We limit collection to what is reasonably necessary for the purposes we tell you about.',
      ] },
      { id: 'what-we-collect', title: 'Information you give us', icon: 'clipboard', list: [
        'Account registration: name, email, password and preferred survey language.',
        'Healthcare professionals: profession, employment, experience and, where registered, certificate/licence number.',
        'Consumer health panels: mailing address, city and postcode, gender, employment and marital status, income, ethnicity, religion, health diagnosis and treatment status — some questions are optional.',
        'Surveys, interviews and focus groups: information specific to each study.',
        'Subscriptions and contact forms: name, email, company, request type and description.',
      ] },
      { id: 'automatic', title: 'Information collected automatically', icon: 'monitor', p: [
        'When you use our Services we receive device, browser and operating-system details, your IP address, the referring website, pages requested and the date and time of each request. Cookies and similar technologies are explained in our Cookie Policy.',
        'Our Services are not intended for children. If we learn that a child has submitted personal information without verifiable parental consent, we promptly delete it. You must be 18 or older to register as a panel member.',
      ] },
      { id: 'consent', title: 'Consent', icon: 'check', p: [
        'We obtain your consent to collect, use or disclose personal information except where the law authorises or requires otherwise. Consent can be express or implied and given verbally, in writing or electronically. You may withdraw consent at any time with reasonable notice; we will explain the likely consequences, such as being unable to continue certain services.',
      ] },
      { id: 'how-we-use', title: 'How we use your information', icon: 'target', list: [
        'Authenticating your identity and confirming your credentials.',
        'Determining your eligibility for surveys and inviting you to take part.',
        'Clarifying your survey responses and determining eligibility for rewards.',
        'Providing and administering requested products and services.',
        'Protecting members, clients and ourselves from fraud and error.',
        'Managing business transfers such as mergers or acquisitions.',
        'Complying with legal requirements and authorisations.',
      ] },
      { id: 'sharing', title: 'When we share information', icon: 'link', p: [
        'Clients receive aggregate survey responses. We do not disclose personally identifiable information to clients without your prior written consent, unless required or authorised by law.',
        'Service providers (payment providers, hosting, sales and marketing support, analytics and system support) may process data on our behalf under contracts requiring protection consistent with this policy. We may disclose information to governing or regulatory bodies, government agencies or law enforcement where legally required, to exercise or defend legal rights, to protect safety and security, or as part of a business transfer.',
        'We do not sell Personal Information to any third party.',
      ] },
      { id: 'retention', title: 'How long we keep it', icon: 'clock', p: [
        'We retain personal information for as long as needed for the purposes above, then archive it for periods required by law before deletion. Account information is kept while your account is active and deleted through our standard process when the account is closed. Survey contributions become part of anonymised, aggregated market data. Records needed for regulatory obligations, such as tax and transaction history, are retained accordingly.',
      ] },
      { id: 'protection', title: 'How we protect it', icon: 'shield', list: [
        'Physical measures: locked storage and controlled access to physical records.',
        'Organisational measures: access limited to authorised personnel.',
        'Electronic measures: encryption, passwords and firewalls.',
        'Suppliers and agents are contractually required to provide comparable protection.',
        'No method of transmission or storage is 100% secure — please never send sensitive data by email or chat.',
      ] },
      { id: 'rights', title: 'Your privacy rights', icon: 'user', list: [
        'Keep your profile up to date from your account settings.',
        'Unsubscribe from emails using the link in any message.',
        'Request correction of inaccurate or incomplete information.',
        'Request account deletion from your profile (restorable for 30 days).',
        'California residents (CCPA): know what we collect and disclose, access it, and receive equal service. We do not sell personal information.',
      ] },
      { id: 'contact', title: 'Contact us', icon: 'mail', p: [
        'My Health Opinions, C/O Frequent Research Fieldwork Solutions Private Limited, Mangolpur Kalan, New Delhi – 110085, India. Email support@myhealthopinions.com · Phone +91 81300 15743.',
        'We may update this policy from time to time; the "Last updated" date above shows the current version.',
      ] },
    ],
  },

  '/terms': {
    theme: 'doc-terms',
    icon: 'scale',
    eyebrow: 'Terms of Use',
    title: ['Member & licence', { t: 'terms of use', hl: 'grad' }],
    lead: 'These terms govern registration with MyHealthOpinions, survey participation and reward redemption, and the licensing of Frequent Research products.',
    updated: '2026-10-01',
    glance: [
      ['user', 'One person, one account', 'Registrations are personal and non-transferable.'],
      ['gift', 'Rewards by country rules', 'Gift vouchers, PayPal or bank transfer as permitted.'],
      ['x', 'Leave any time', 'Request account deletion whenever you wish.'],
      ['scale', 'Fair use', 'Use products lawfully and ethically.'],
    ],
    sections: [
      { id: 'definitions', title: '1. Definitions', icon: 'book', list: [
        'The Licensor — Frequent Research Fieldwork Solutions Private Limited.',
        'The Licensee / Subscriber — individuals registered with MyHealthOpinions.',
        'The Product — survey offers, survey rewards and reward redemption by gift vouchers, PayPal or bank transfer as per country guidelines.',
      ] },
      { id: 'agreement', title: '2. Licence agreement', icon: 'pen', p: [
        'By signing and submitting a My Health Opinions order or registration form, you (and your organisation, where applicable) accept these Terms. The department responsible for allocating the product must inform users of appropriate and inappropriate use.',
      ] },
      { id: 'usage', title: '3. Usage rights & licensing options', icon: 'key', p: [
        'The Licensor grants non-exclusive, non-transferable rights. Products are protected by copyright and must be used ethically and lawfully.',
      ], list: [
        'Panel registration — for a single individual only. Credentials may not be shared, transferred or sold. Members may request account deletion at any time.',
        'Site licence — sharing among verified, signed clients at the designated business address; delivered as PDF.',
        'Corporate licence — use by one corporation under a single name; subsidiaries under different names are excluded.',
        'Executive summary — single-user, may not be copied or published.',
        'Enterprise licence — all subsidiaries of the purchasing parent company.',
        'Presentation, citation or publication of report information requires written permission from the Licensor.',
      ] },
      { id: 'tracker', title: '4. Reimbursement Tracker', icon: 'chart', p: [
        'The Licensor provides market intelligence and reimbursement tracking for medical device and pharmaceutical companies. Corporate licences cover up to 5 users unless agreed otherwise, for 12 months via the web portal. Initial setup includes 4 subsegments per therapeutic area (1–15 keywords each). The Licensor does not guarantee continued access to every policy tracked, nor that keywords capture every desired policy.',
      ] },
      { id: 'limits', title: '5. Limitation of use', icon: 'filter', list: [
        'Proprietary information, including specific data sources, is confidential.',
        'Products may not be copied, transferred, modified, translated or incorporated into other products except as defined here.',
        'Products may not be used in ways that cause material financial harm to the Licensor.',
        'Public citation or distribution requires express written permission.',
      ] },
      { id: 'ownership', title: '6. Ownership & copyright', icon: 'shield', p: [
        'Title and intellectual-property rights remain with the Licensor. Licensees must keep copyright notices, reproduce them on authorised copies and prevent unauthorised copying.',
      ] },
      { id: 'warranty', title: '7. Limited warranty', icon: 'check', p: [
        'The Licensor warrants it has the right to distribute the Products and that they do not infringe third-party rights. Anticipated publication dates are estimates; delivered orders cannot be cancelled. All other warranties, including merchantability or fitness for a particular purpose, are disclaimed.',
      ] },
      { id: 'liability', title: '8. Limitation of liability', icon: 'info', p: [
        'Liability is limited to replacement of physically defective media or documentation and never exceeds the original purchase amount. The Licensor is not liable for loss of profit, data, or special, incidental, consequential or punitive damages. The Licensor indemnifies licensees against third-party claims arising from breach of its warranty, subject to these terms.',
      ] },
      { id: 'entire', title: '9. Entire agreement', icon: 'layers', p: [
        'These Terms are the complete agreement and supersede prior communications. Changes require written agreement; click-through licences do not modify these Terms.',
      ] },
    ],
  },

  '/gdpr': {
    theme: 'doc-gdpr',
    icon: 'shieldCheck',
    eyebrow: 'GDPR Compliance',
    title: ['Consent-first', { t: 'market research', hl: 'grad' }],
    lead: 'GDPR changed how personal data is collected, stored and analysed. Here is how GDPR compliant market research works at MyHealthOpinions — and the rights you hold.',
    updated: '2026-10-01',
    glance: [
      ['check', 'Consent before contact', 'We only invite people who agreed to research contact.'],
      ['target', 'Purpose limitation', 'Survey contact is not marketing.'],
      ['clock', 'Retention windows', 'Data kept only as long as needed.'],
      ['x', 'Right to erasure', 'Ask us to delete your data.'],
    ],
    sections: [
      { id: 'what', title: 'What GDPR means for surveys', icon: 'globe', p: [
        'GDPR applies to the personal data of people in the EU and to organisations that handle it. Research must protect individual elements of personal data — and combinations of elements that could identify someone.',
      ] },
      { id: 'consent', title: 'Getting consent', icon: 'mail-check', p: [
        'We invite only people who have agreed to be contacted for opinion or feedback surveys, and we tell you so explicitly when you sign up. Research invitations are not marketing: we do not send newsletters unless you subscribe to them separately.',
      ], list: ['Are they the right people to contact?', 'Will the study get the information it needs?', 'Do we have permission to contact them?'] },
      { id: 'transparency', title: 'Transparency', icon: 'link', p: [
        'Links to our privacy and security policies appear in invitations and on this website. If data is shared with a third party, we declare it at the point of collection.',
      ] },
      { id: 'retention', title: 'Retention & erasure', icon: 'clock', p: [
        'We tell respondents how long research data is kept and destroy it once the validity period ends. You have the right to be forgotten — request erasure from your profile or by emailing us.',
      ] },
      { id: 'storage', title: 'Where data is stored', icon: 'database', p: [
        'We use certified, secure infrastructure with clear allocation of responsibility between us, our vendors and clients. Frequent Research is ISO 27001 certified for information security.',
      ] },
      { id: 'contact', title: 'Questions', icon: 'chat', p: ['Questions about GDPR compliant market research? Email support@myhealthopinions.com.'] },
    ],
  },

  '/cookies': {
    theme: 'doc-cookies',
    icon: 'cookie',
    eyebrow: 'Cookie Policy',
    title: ['Cookies we use —', { t: 'and your choices', hl: 'grad' }],
    lead: 'This website uses a small number of cookies and browser-storage items. Essential ones keep the site working; analytics cookies load only if you allow them.',
    updated: '2026-10-01',
    glance: [
      ['lock', 'Essential', 'Security, consent choice and session.'],
      ['chart', 'Analytics (opt-in)', 'Google Analytics 4, only after consent.'],
      ['x', 'No ad trackers', 'We do not run advertising cookies on this site.'],
      ['refresh', 'Change any time', 'Use “Cookie settings” in the footer.'],
    ],
    sections: [
      { id: 'what', title: 'What cookies are', icon: 'info', p: ['Cookies are small text files stored by your browser. Similar technologies such as localStorage keep small preferences on your device.'] },
      { id: 'essential', title: 'Essential (always on)', icon: 'lock', list: [
        'mho-consent — remembers your cookie choice (browser storage, until you clear it).',
        'mho-sound, mho-reviewed, mho-reviews — remember chat-sound preference and reviews you submitted on this device.',
        'Session items (mho-greeted, mho-rate-*) — limit pop-ups to a few per visit; cleared when you close the tab.',
        'Member area cookies set by our survey platform after you log in, to keep you signed in securely.',
      ] },
      { id: 'analytics', title: 'Analytics (only with your consent)', icon: 'chart', list: [
        '_ga, _ga_<ID> — Google Analytics 4, used to understand page visits in aggregate (IP anonymised). Expire after up to 2 years.',
      ] },
      { id: 'third', title: 'Third-party content', icon: 'globe', p: ['Fonts are loaded from Google Fonts, which may log technical request data (country flags are hosted on our own server). Links to social networks and WhatsApp open their own sites under their own policies.'] },
      { id: 'manage', title: 'Managing cookies', icon: 'refresh', p: ['Use “Cookie settings” in the footer to change your choice at any time, or clear cookies in your browser settings. Blocking essential storage may stop parts of the site working.'] },
    ],
  },
};
