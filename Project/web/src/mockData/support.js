const mockSupportTickets = {
  status: "success",
  message: "",
  data: [
    {
      _id: "mock-1",
      id: "mock-1",
      createdAt: "2026-08-20T10:00:00.000Z",
      ticketNo: "TCK-1001",
      subject: "Unable to complete survey - Diabetic Habits Survey",
      status: "open",
    },
    {
      _id: "mock-2",
      id: "mock-2",
      createdAt: "2026-08-18T14:30:00.000Z",
      ticketNo: "TCK-1000",
      subject: "Reward points not credited after survey completion",
      status: "closed",
    },
    {
      _id: "mock-3",
      id: "mock-3",
      createdAt: "2026-08-15T09:15:00.000Z",
      ticketNo: "TCK-0998",
      subject: "Question about redemption timeline",
      status: "pending",
    },
  ],
};

export default mockSupportTickets;