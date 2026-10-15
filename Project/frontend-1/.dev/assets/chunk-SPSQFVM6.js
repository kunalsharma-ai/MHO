import {
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/data/rewards.js
init_define_import_meta_env();
var PAYMENT_METHODS = [
  { id: "paypal", name: "PayPal", color: "#003087", accent: "#009cde", blurb: "Straight to your PayPal wallet in most countries." },
  { id: "upi", name: "UPI", color: "#5f259f", accent: "#ff7909", blurb: "Instant bank-to-bank transfer for members in India.", countries: ["in"] },
  { id: "wire", name: "Wire Transfer", color: "#0f766e", accent: "#14b8a6", blurb: "Direct to your bank account, where supported." },
  { id: "amazon", name: "Amazon Gift Card", color: "#232f3e", accent: "#ff9900", blurb: "A digital gift card code sent to your inbox." },
  { id: "report", name: "Medical Report", color: "#9d174d", accent: "#f472b6", blurb: "A personalised health report as your reward on selected studies." }
];
function methodsFor(countryCode = "") {
  const cc = countryCode.toLowerCase();
  return PAYMENT_METHODS.filter((m) => !m.countries || m.countries.includes(cc));
}
var isMethodAllowed = (methodId, countryCode) => methodsFor(countryCode).some((m) => m.id === methodId);
var NOTIFY_CHANNELS = [
  { id: "dashboard", name: "Account Dashboard", blurb: "Track surveys and rewards anytime." },
  { id: "sms", name: "SMS", blurb: "Instant survey alerts on your phone." },
  { id: "whatsapp", name: "WhatsApp", blurb: "Invitations straight to your chats." },
  { id: "email", name: "Email", blurb: "Detailed invitations in your inbox." }
];

export {
  PAYMENT_METHODS,
  methodsFor,
  isMethodAllowed,
  NOTIFY_CHANNELS
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2RhdGEvcmV3YXJkcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gUGF5b3V0IG1ldGhvZHMuIFVQSSBpcyBhbiBJbmRpYS1vbmx5IHJhaWwgKE5QQ0kpIGFuZCBtdXN0IG5ldmVyIGJlIG9mZmVyZWQgb3V0c2lkZSBJbmRpYS5cbmV4cG9ydCBjb25zdCBQQVlNRU5UX01FVEhPRFMgPSBbXG4gIHsgaWQ6ICdwYXlwYWwnLCBuYW1lOiAnUGF5UGFsJywgY29sb3I6ICcjMDAzMDg3JywgYWNjZW50OiAnIzAwOWNkZScsIGJsdXJiOiAnU3RyYWlnaHQgdG8geW91ciBQYXlQYWwgd2FsbGV0IGluIG1vc3QgY291bnRyaWVzLicgfSxcbiAgeyBpZDogJ3VwaScsIG5hbWU6ICdVUEknLCBjb2xvcjogJyM1ZjI1OWYnLCBhY2NlbnQ6ICcjZmY3OTA5JywgYmx1cmI6ICdJbnN0YW50IGJhbmstdG8tYmFuayB0cmFuc2ZlciBmb3IgbWVtYmVycyBpbiBJbmRpYS4nLCBjb3VudHJpZXM6IFsnaW4nXSB9LFxuICB7IGlkOiAnd2lyZScsIG5hbWU6ICdXaXJlIFRyYW5zZmVyJywgY29sb3I6ICcjMGY3NjZlJywgYWNjZW50OiAnIzE0YjhhNicsIGJsdXJiOiAnRGlyZWN0IHRvIHlvdXIgYmFuayBhY2NvdW50LCB3aGVyZSBzdXBwb3J0ZWQuJyB9LFxuICB7IGlkOiAnYW1hem9uJywgbmFtZTogJ0FtYXpvbiBHaWZ0IENhcmQnLCBjb2xvcjogJyMyMzJmM2UnLCBhY2NlbnQ6ICcjZmY5OTAwJywgYmx1cmI6ICdBIGRpZ2l0YWwgZ2lmdCBjYXJkIGNvZGUgc2VudCB0byB5b3VyIGluYm94LicgfSxcbiAgeyBpZDogJ3JlcG9ydCcsIG5hbWU6ICdNZWRpY2FsIFJlcG9ydCcsIGNvbG9yOiAnIzlkMTc0ZCcsIGFjY2VudDogJyNmNDcyYjYnLCBibHVyYjogJ0EgcGVyc29uYWxpc2VkIGhlYWx0aCByZXBvcnQgYXMgeW91ciByZXdhcmQgb24gc2VsZWN0ZWQgc3R1ZGllcy4nIH0sXG5dO1xuXG4vKiogTWV0aG9kcyBhdmFpbGFibGUgZm9yIGEgY291bnRyeSAoSVNPMikuIFVQSSBvbmx5IGZvciBJbmRpYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXRob2RzRm9yKGNvdW50cnlDb2RlID0gJycpIHtcbiAgY29uc3QgY2MgPSBjb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gUEFZTUVOVF9NRVRIT0RTLmZpbHRlcigobSkgPT4gIW0uY291bnRyaWVzIHx8IG0uY291bnRyaWVzLmluY2x1ZGVzKGNjKSk7XG59XG5cbmV4cG9ydCBjb25zdCBpc01ldGhvZEFsbG93ZWQgPSAobWV0aG9kSWQsIGNvdW50cnlDb2RlKSA9PiBtZXRob2RzRm9yKGNvdW50cnlDb2RlKS5zb21lKChtKSA9PiBtLmlkID09PSBtZXRob2RJZCk7XG5cbmV4cG9ydCBjb25zdCBOT1RJRllfQ0hBTk5FTFMgPSBbXG4gIHsgaWQ6ICdkYXNoYm9hcmQnLCBuYW1lOiAnQWNjb3VudCBEYXNoYm9hcmQnLCBibHVyYjogJ1RyYWNrIHN1cnZleXMgYW5kIHJld2FyZHMgYW55dGltZS4nIH0sXG4gIHsgaWQ6ICdzbXMnLCBuYW1lOiAnU01TJywgYmx1cmI6ICdJbnN0YW50IHN1cnZleSBhbGVydHMgb24geW91ciBwaG9uZS4nIH0sXG4gIHsgaWQ6ICd3aGF0c2FwcCcsIG5hbWU6ICdXaGF0c0FwcCcsIGJsdXJiOiAnSW52aXRhdGlvbnMgc3RyYWlnaHQgdG8geW91ciBjaGF0cy4nIH0sXG4gIHsgaWQ6ICdlbWFpbCcsIG5hbWU6ICdFbWFpbCcsIGJsdXJiOiAnRGV0YWlsZWQgaW52aXRhdGlvbnMgaW4geW91ciBpbmJveC4nIH0sXG5dO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQTtBQUNPLElBQU0sa0JBQWtCO0FBQUEsRUFDN0IsRUFBRSxJQUFJLFVBQVUsTUFBTSxVQUFVLE9BQU8sV0FBVyxRQUFRLFdBQVcsT0FBTyxvREFBb0Q7QUFBQSxFQUNoSSxFQUFFLElBQUksT0FBTyxNQUFNLE9BQU8sT0FBTyxXQUFXLFFBQVEsV0FBVyxPQUFPLHVEQUF1RCxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQUEsRUFDL0ksRUFBRSxJQUFJLFFBQVEsTUFBTSxpQkFBaUIsT0FBTyxXQUFXLFFBQVEsV0FBVyxPQUFPLGdEQUFnRDtBQUFBLEVBQ2pJLEVBQUUsSUFBSSxVQUFVLE1BQU0sb0JBQW9CLE9BQU8sV0FBVyxRQUFRLFdBQVcsT0FBTywrQ0FBK0M7QUFBQSxFQUNySSxFQUFFLElBQUksVUFBVSxNQUFNLGtCQUFrQixPQUFPLFdBQVcsUUFBUSxXQUFXLE9BQU8sbUVBQW1FO0FBQ3pKO0FBR08sU0FBUyxXQUFXLGNBQWMsSUFBSTtBQUMzQyxRQUFNLEtBQUssWUFBWSxZQUFZO0FBQ25DLFNBQU8sZ0JBQWdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxhQUFhLEVBQUUsVUFBVSxTQUFTLEVBQUUsQ0FBQztBQUMvRTtBQUVPLElBQU0sa0JBQWtCLENBQUMsVUFBVSxnQkFBZ0IsV0FBVyxXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLFFBQVE7QUFFeEcsSUFBTSxrQkFBa0I7QUFBQSxFQUM3QixFQUFFLElBQUksYUFBYSxNQUFNLHFCQUFxQixPQUFPLHFDQUFxQztBQUFBLEVBQzFGLEVBQUUsSUFBSSxPQUFPLE1BQU0sT0FBTyxPQUFPLHVDQUF1QztBQUFBLEVBQ3hFLEVBQUUsSUFBSSxZQUFZLE1BQU0sWUFBWSxPQUFPLHNDQUFzQztBQUFBLEVBQ2pGLEVBQUUsSUFBSSxTQUFTLE1BQU0sU0FBUyxPQUFPLHNDQUFzQztBQUM3RTsiLAogICJuYW1lcyI6IFtdCn0K
