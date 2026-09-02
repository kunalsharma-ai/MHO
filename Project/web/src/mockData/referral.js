const dummyReferralData = [
  { name: "Rahul Sharma", email: "rahul.sharma@example.com", status: "Joined", dateOfJoining: "20 Aug 2026" },
  { name: "Priya Verma", email: "priya.verma@example.com", status: "Joined", dateOfJoining: "18 Aug 2026" },
  { name: "Amit Kumar", email: "amit.kumar@example.com", status: "Pending", dateOfJoining: "15 Aug 2026" },
  { name: "Neha Singh", email: "neha.singh@example.com", status: "Joined", dateOfJoining: "12 Aug 2026" },
  { name: "Rohit Gupta", email: "rohit.gupta@example.com", status: "Pending", dateOfJoining: "10 Aug 2026" },
  { name: "Anjali Mehta", email: "anjali.mehta@example.com", status: "Joined", dateOfJoining: "07 Aug 2026" },
  { name: "Vikas Patel", email: "vikas.patel@example.com", status: "Joined", dateOfJoining: "04 Aug 2026" },
  { name: "Sneha Joshi", email: "sneha.joshi@example.com", status: "Pending", dateOfJoining: "01 Aug 2026" },
];

// Real page's columns expect fullName / mail / isVerified.email / createdAt -
// reshape the friendly list above into that exact shape here, so page.jsx
// never needs to know about the mismatch.
const data = dummyReferralData.map((item, index) => ({
  id: `mock-${index}`,
  _id: `mock-${index}`,
  fullName: item.name,
  mail: item.email,
  isVerified: { email: item.status === "Joined" ? "verified" : "unverified" },
  createdAt: new Date(item.dateOfJoining).toISOString(),
}));

const referrals = {
  status: "success",
  message: "",
  data,
};

export default referrals;