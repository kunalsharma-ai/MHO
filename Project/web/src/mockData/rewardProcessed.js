const mockRewardsProcessed = {
  status: "success",
  message: "",
  data: [
    {
      _id: "mock-1",
      id: "mock-1",
      claimedPoints: 1500,
      claimedAmount: "15",
      dateTime: "2026-08-15T10:30:00.000Z",
      transactionId: "TXN-2026081500123",
      paymentMethod: "PayPal",
      paymentProcessedDate: "2026-08-17T00:00:00.000Z",
      status: "credited",
    },
    {
      _id: "mock-2",
      id: "mock-2",
      claimedPoints: 1800,
      claimedAmount: "18",
      dateTime: "2026-08-10T14:00:00.000Z",
      transactionId: "TXN-2026081000456",
      paymentMethod: "UPI",
      paymentProcessedDate: "2026-08-12T00:00:00.000Z",
      status: "credited",
    },
    {
      _id: "mock-3",
      id: "mock-3",
      claimedPoints: 2500,
      claimedAmount: "25",
      dateTime: "2026-08-05T09:15:00.000Z",
      transactionId: "TXN-2026080500789",
      paymentMethod: "Wire Transfer",
      paymentProcessedDate: null,
      status: "processing",
    },
  ],
};

export default mockRewardsProcessed;