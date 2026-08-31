const mockRewardsProcessed = {
  status: "success",
  message: "",
  data: [
    {
      _id: "mock-1",
      id: "mock-1",
      survey: { name: "Diabetic Habits Survey" },
      processedAt: "2026-08-15T10:30:00.000Z",
      points: 1500,
      method: "PayPal",
      status: "credited",
    },
    {
      _id: "mock-2",
      id: "mock-2",
      survey: { name: "Food & Lifestyle Survey" },
      processedAt: "2026-08-10T14:00:00.000Z",
      points: 1800,
      method: "UPI",
      status: "credited",
    },
    {
      _id: "mock-3",
      id: "mock-3",
      survey: { name: "Technology & Gadgets Survey" },
      processedAt: "2026-08-05T09:15:00.000Z",
      points: 2500,
      method: "Wire Transfer",
      status: "processing",
    },
  ],
};

export default mockRewardsProcessed;