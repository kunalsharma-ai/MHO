const dummyReferralData = [
  { name: "Rahul Sharma", email: "rahul.sharma@example.com", status: "Joined", sentAt: "2026-08-18", dateOfJoining: "2026-08-20" },
  { name: "Priya Verma", email: "priya.verma@example.com", status: "Joined", sentAt: "2026-08-16", dateOfJoining: "2026-08-18" },
  { name: "Amit Kumar", email: "amit.kumar@example.com", status: "Pending", sentAt: "2026-08-15", dateOfJoining: "" },
  { name: "Neha Singh", email: "neha.singh@example.com", status: "Joined", sentAt: "2026-08-10", dateOfJoining: "2026-08-12" },
  { name: "Rohit Gupta", email: "rohit.gupta@example.com", status: "Pending", sentAt: "2026-08-10", dateOfJoining: "" },
  { name: "Anjali Mehta", email: "anjali.mehta@example.com", status: "Joined", sentAt: "2026-08-05", dateOfJoining: "2026-08-07" },
  { name: "Vikas Patel", email: "vikas.patel@example.com", status: "Joined", sentAt: "2026-08-02", dateOfJoining: "2026-08-04" },
  { name: "Sneha Joshi", email: "sneha.joshi@example.com", status: "Pending", sentAt: "2026-08-01", dateOfJoining: "" },
];

// Same shape that loadReferralHistory() in page.jsx produces after merging
// invites with registered users.
const data = dummyReferralData.map((item, index) => {
  const joined = item.status === "Joined";
  return {
    id: `mock-${index}`,
    _id: `mock-${index}`,
    email: item.email,
    registered: joined ? "Registered" : "Not Registered",
    sentAt: new Date(item.sentAt).toISOString(),
    name: joined ? item.name : "",
    status: joined ? "verified" : "",
    dateOfJoining: joined ? new Date(item.dateOfJoining).toISOString() : "",
  };
});

const referrals = {
  status: "success",
  message: "",
  data,
};

export default referrals;