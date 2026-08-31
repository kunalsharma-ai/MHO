const mockSurveys = {
  status: "success",
  message: "",
  data: [
    {
      id: "mock-1",
      name: "Healthcare Habits Survey",
      slug: "healthcare-habits-survey",
      points: 350,
      loi: 8,
      surveyCategory: "health",
      participationStatus: "invited",
    },
    {
      id: "mock-2",
      name: "Daily Shopping Preferences",
      slug: "daily-shopping-preferences",
      points: 500,
      loi: 12,
      surveyCategory: "shopping",
      participationStatus: "invited",
    },
    {
      id: "mock-3",
      name: "Travel & Vacation Planning",
      slug: "travel-vacation-planning",
      points: 700,
      loi: 18,
      surveyCategory: "travel",
      participationStatus: "dropout",
    },
    
  ],
};

export default mockSurveys;