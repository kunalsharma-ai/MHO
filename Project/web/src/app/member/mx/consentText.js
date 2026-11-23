// Approval statements of each panel consent form, copied from the installed consent packages
// (frontend-1/public/consent/*), so My Account shows exactly what the member agreed to.
export const REQUIRED = ["terms", "privacy", "accuracy", "confidential"];
export const OPTIONAL = ["interviews", "clientContact", "sensitive", "marketing", "analytics"];
export const STATEMENTS = {
  "hcp": {
    "terms": "I have read and accept the Healthcare Professionals Panel Terms and Conditions.",
    "privacy": "I agree that my personal and professional information is processed as described in the Privacy Notice to run my account, studies and incentives.",
    "accuracy": "I confirm that I meet the age requirement and that my healthcare qualifications and professional details are accurate and my own.",
    "confidential": "I will never share identifiable patient information, or confidential information about my healthcare organisation that I am not authorised to disclose.",
    "interviews": "Invite me to expert interviews, calls and recorded sessions.",
    "clientContact": "I am open to studies where a sponsor may learn my professional identity or contact me for follow-up.",
    "sensitive": "Invite me to studies that may involve sensitive topics, such as my own health.",
    "marketing": "Send me optional newsletters and offers from MyHealthOpinions.",
    "analytics": "Allow optional analytics cookies that help us improve the panel."
  },
  "caregiver": {
    "terms": "I have read and accept the Caregivers Panel Terms and Conditions.",
    "privacy": "I agree that my personal information is processed as described in the Privacy Notice to run my account, studies and rewards.",
    "accuracy": "I confirm that I meet the age requirement and that my caregiving experience and any qualifications I give are accurate and my own.",
    "confidential": "I will protect the people I care for: I will not share information that identifies them, or confidential client or workplace information I am not authorised to disclose.",
    "interviews": "Invite me to interviews, video calls and studies that may include recordings or photographs.",
    "clientContact": "I am open to studies where my identity, quotes or professional role may be shared with a research client.",
    "sensitive": "Invite me to studies that may involve sensitive topics, such as health, disability or family circumstances.",
    "marketing": "Send me optional newsletters and offers from MyHealthOpinions.",
    "analytics": "Allow optional analytics cookies that help us improve the panel."
  },
  "patient": {
    "terms": "I have read and accept the Patients Panel Terms and Conditions.",
    "privacy": "I agree that my personal information is processed as described in the Privacy Notice to run my account, studies and rewards.",
    "accuracy": "I confirm that I meet the minimum age and that the health and personal information I give will be truthful and my own.",
    "confidential": "I will not share other people’s medical records or identifiable health information, and I understand the panel gives no medical advice and is not an emergency service.",
    "interviews": "Invite me to recorded interviews, video discussions and patient-story projects.",
    "clientContact": "I am open to studies where authorised researchers or sponsors may see my identity or use quotes that could identify me.",
    "sensitive": "Invite me to studies that ask about my health conditions, treatments and medicines.",
    "marketing": "Send me optional newsletters and offers from MyHealthOpinions.",
    "analytics": "Allow optional analytics cookies that help us improve the panel."
  }
};
