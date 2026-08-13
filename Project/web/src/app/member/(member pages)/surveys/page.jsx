"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { motion } from "framer-motion";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DataCards from "@/components/DataCards";

import { loadData, api } from "@/util";
import { useQuery } from "@/Context";
import { SurveyPoints } from "../../components";
import { SurveyHistory } from "../dashboard/page";

const permittedStatus = ["invited", "dropout"];

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const MotionCard = motion.create(Card);
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function SurveyDashboard() {
  const [query] = [useQuery()];
  const [surveys, setSurveys] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.post(`/api/v1/me/survey`, { source: query.source, status: "active" }),
      (resp) => {
        setSurveys(resp.data);
      },
      () => setIsLoading(false),
    );
  }, [query]);

  // const dummySurveys = [
  //   {
  //     id: 1,
  //     name: "Healthcare Habits Survey",
  //     slug: "healthcare-habits-survey",
  //     points: 350,
  //     loi: 8,
  //     surveyCategory: "health",
  //     participationStatus: "invited",
  //   },
  //   {
  //     id: 2,
  //     name: "Daily Shopping Preferences",
  //     slug: "daily-shopping-preferences",
  //     points: 500,
  //     loi: 12,
  //     surveyCategory: "shopping",
  //     participationStatus: "invited",
  //   },
  //   {
  //     id: 3,
  //     name: "Travel & Vacation Planning",
  //     slug: "travel-vacation-planning",
  //     points: 700,
  //     loi: 18,
  //     surveyCategory: "travel",
  //     participationStatus: "dropout",
  //   },
  //   {
  //     id: 4,
  //     name: "Fitness & Sports Lifestyle",
  //     slug: "fitness-sports-lifestyle",
  //     points: 450,
  //     loi: 10,
  //     surveyCategory: "sports",
  //     participationStatus: "invited",
  //   },
  //   {
  //     id: 5,
  //     name: "Mobile Technology Usage",
  //     slug: "mobile-technology-usage",
  //     points: 800,
  //     loi: 20,
  //     surveyCategory: "media, electronics, mobile & technology",
  //     participationStatus: "invited",
  //   },
  //   {
  //     id: 6,
  //     name: "Financial Planning Study",
  //     slug: "financial-planning-study",
  //     points: 900,
  //     loi: 25,
  //     surveyCategory: "financial",
  //     participationStatus: "invited",
  //   },
  //   {
  //     id: 7,
  //     name: "Beauty & Fashion Trends",
  //     slug: "beauty-fashion-trends",
  //     points: 400,
  //     loi: 7,
  //     surveyCategory: "beauty & fashion",
  //     participationStatus: "dropout",
  //   },
  //   {
  //     id: 8,
  //     name: "Food & Lifestyle Choices",
  //     slug: "food-lifestyle-choices",
  //     points: 550,
  //     loi: 15,
  //     surveyCategory: "Lifestyle and food",
  //     participationStatus: "invited",
  //   },
  // ];

  const availableSurveys = surveys?.filter((s) =>
    permittedStatus.includes(s.participationStatus),
  );
  // const availableSurveys = dummySurveys?.filter((s) =>
  //   permittedStatus.includes(s.participationStatus),
  // );

  const stats = [
    {
      title: "Available Surveys",
      value: availableSurveys?.length,
      subtitle: "Surveys",
      icon: <AssignmentOutlinedIcon />,
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
    {
      title: "Total Earning Opportunity",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${availableSurveys?.reduce((sum, survey) => sum + survey.points, 0)} pts`,
      subtitle: "Across all surveys",
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: "#16A34A",
      bg: "#ECFDF3",
    },
    {
      title: "Estimated Time",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${Math.round(availableSurveys?.reduce((sum, survey) => sum + survey.loi, 0) / availableSurveys?.length)} min`,
      subtitle: "On average",
      icon: <AccessTimeOutlinedIcon />,
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      title: "Average Reward",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${Math.round(availableSurveys?.reduce((sum, survey) => sum + survey.points, 0) / availableSurveys?.length)} pts`,
      subtitle: "Per survey",
      icon: <CardGiftcardOutlinedIcon />,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
  ];

  return (
    <MotionBox
      initial="hidden"
      animate="show"
      variants={containerVariants}
      sx={{
        p: { xs: 1, md: 2.5 },
        bgcolor: "#eff3f5",
      }}
    >
      <MotionGrid
        variants={fadeUp}
        container
        justifyContent="space-between"
        alignItems="flex-start"
        mb={3}
        spacing={{ xs: 3, md: 0 }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            fontSize={{ xs: 20, md: 26 }}
            fontWeight={700}
            color="text.primary"
          >
            Available Surveys
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Complete surveys, share your opinion and earn rewards.
          </Typography>
        </Grid>

        <SurveyPoints onUpdate={() => {}} />
      </MotionGrid>
      {availableSurveys.length !== 0 && !isLoading && (
        <SurveyStat stats={stats} isLoading={isLoading} />
      )}
      <MotionBox variants={fadeUp}>
        <Divider sx={{ my: 2, bgcolor: "#ffe" }} />
      </MotionBox>
      <SurveyList surveys={surveys} query={query} isLoading={isLoading} />
      {/* <SurveyList surveys={dummySurveys} query={query} isLoading={isLoading} /> */}
      <Divider sx={{ my: 2, bgcolor: "#ffe" }} />
      <MotionBox variants={fadeUp}>
        <SurveyHistory />
      </MotionBox>
    </MotionBox>
  );
}

function SurveyStat({ stats, isLoading }) {
  return (
    <>
      <MotionGrid container spacing={3} variants={containerVariants}>
        {stats.map((item, index) => (
          <MotionGrid
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { duration: 0.2 },
            }}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <MotionCard
              whileHover={{
                scale: 1.02,
              }}
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "inline-flex",
                      zIndex: 10,
                    }}
                  >
                    <CircularProgress
                      sx={{ color: "primary.main" }}
                      thickness={2}
                    />
                  </Box>
                ) : (
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: item.bg,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                        mb={1}
                      >
                        {item.title}
                      </Typography>

                      <Typography variant="h5" fontWeight={700}>
                        {item.value}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </MotionCard>
          </MotionGrid>
        ))}
      </MotionGrid>
    </>
  );
}

function SurveyList({ surveys, query, isLoading }) {
  const [activeFilter, setActiveFilter] = React.useState(
    !query.filter || query.filter === "null" || query.filter === "undefined"
      ? "All New Surveys"
      : query.filter,
  );
  console.log(activeFilter);
  const filters = [
    {
      label: "All New Surveys",
      badge: "New",
    },
    {
      label: "High Reward Surveys",
      filter: (survey) => survey.points > 500,
    },
    {
      label: "Short Surveys",
      filter: (survey) => survey.loi <= 5,
    },
    // {
    //   label: "New Surveys",
    //   badge: "New",
    //   filter: (survey) => survey.participationStatus === "invited",
    // },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <DataCards
        data={surveys}
        isLoading={isLoading}
        filter={filters.find((filter) => filter.label === activeFilter)}
        pageSize={4}
        getSearchText={(row) => row.name}
        emptyMessage="No surveys available."
        renderToolbar={() => (
          <MotionBox
            variants={fadeUp}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              width: "100%",
              alignItems: "center",
            }}
          >
            {filters.map((filter) => {
              const active = activeFilter === filter.label;

              return (
                <Button
                  key={filter.label}
                  variant={active ? "contained" : "outlined"}
                  color={active ? "primary" : "inherit"}
                  onClick={() => setActiveFilter(filter.label)}
                  sx={{
                    height: 34,
                    px: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: "divider",
                    bgcolor: active ? "secondary.main" : "#fff",
                    color: active ? "#fff" : "text.primary",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: 1,
                    },
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={700}>
                      {filter.label}
                    </Typography>

                    {filter.badge && (
                      <Chip
                        label={filter.badge}
                        size="small"
                        color="success"
                        sx={{
                          height: 20,
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#fff",
                          background:
                            "linear-gradient(45deg, #00c853, #64dd17)",
                        }}
                      />
                    )}
                  </Stack>
                </Button>
              );
            })}
          </MotionBox>
        )}
        card={(row) => <SurveyCard survey={row} />}
        cardProps={{
          elevation: 0,
          sx: {
            mt: 1,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

function SurveyCard({ survey }) {
  const getCategoryData = (survey) => {
    const categories = [
      { name: "basic", icon: "fa-id-card-clip", color: "#1E40AF" },
      { name: "professional", icon: "fa-user-tie", color: "#1F2937" },
      { name: "educational", icon: "fa-graduation-cap", color: "#7C3AED" },
      {
        name: "Survey and Rewards",
        icon: "fa-clipboard-list",
        color: "#16A34A",
      },
      { name: "financial", icon: "fa-circle-dollar-to-slot", color: "#CA8A04" },
      { name: "parenting", icon: "fa-people-roof", color: "#DB2777" },
      {
        name: "Home and Pet Ownership",
        icon: "fa-house-chimney",
        color: "#EA580C",
      },
      { name: "shopping", icon: "fa-cart-shopping", color: "#E11D48" },
      { name: "Lifestyle and food", icon: "fa-utensils", color: "#B45309" },
      { name: "travel", icon: "fa-plane-departure", color: "#0E7490" },
      { name: "automobile", icon: "fa-car-side", color: "#334155" },
      { name: "health", icon: "fa-heart-pulse", color: "#DC2626" },
      { name: "beauty & fashion", icon: "fa-hand-dots", color: "#C026D3" },
      {
        name: "media, electronics, mobile & technology",
        icon: "fa-microchip",
        color: "#4338CA",
      },
      { name: "sports", icon: "fa-basketball", color: "#F59E0B" },
      { name: "gaming", icon: "fa-gamepad", color: "#7C3AED" },
    ];

    const surveyCategory = survey.surveyCategory || "";

    return (
      categories.find(
        (cat) =>
          surveyCategory.toLowerCase().includes(cat.name.toLowerCase()) ||
          cat.name.toLowerCase().includes(surveyCategory.toLowerCase()),
      ) || { icon: "fa-clipboard-list", color: "#64748B" }
    );
  };

  const category = getCategoryData(survey);
  const darkColor = category.color;
  const lightBg = darkColor + "20";

  const descriptionMap = {
    health: "Share your healthcare habits and help improve health awareness.",
    shopping: "Tell us about your shopping preferences and purchasing habits.",
    travel: "Share your travel experiences and vacation planning preferences.",
    sports: "Help us understand your fitness and sports lifestyle.",
    financial: "Share your financial planning and spending habits.",
    "beauty & fashion":
      "Tell us about your beauty routines and fashion preferences.",
    "Lifestyle and food": "Share your food choices and lifestyle preferences.",
    "media, electronics, mobile & technology":
      "Help us understand your technology and mobile device usage.",
  };
  const lightenColor = (hex, amount = 45) => {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;

    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const gradientColor = lightenColor(darkColor, 45);

  return (
    <Box
      sx={(theme) => ({
        p: { xs: 1, md: 3 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 5,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(145deg, ${gradientColor} 0%, ${darkColor} 100%)`,
        boxShadow: `0 15px 35px ${darkColor}30`,
        transition: ".35s ease",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          top: -90,
          right: -70,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,.05)",
          bottom: -60,
          left: -40,
        },

        "& > *": {
          position: "relative",
          zIndex: 2,
        },

        "& .survey-icon": {
          width: 95,
          height: 95,
          mb: 2,
          bgcolor: "rgba(255,255,255,.18)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          border: "2px solid rgba(255,255,255,.25)",
          boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          transition: ".35s",
        },

        "& .category": {
          color: "rgba(255,255,255,.85)",
          fontWeight: 600,
          fontSize: 15,
          mt: 0.5,
          textTransform: "capitalize",
        },

        "& .desc": {
          color: "rgba(255,255,255,.82)",
          fontSize: 14,
          lineHeight: 1.7,
          mt: 2,
          minHeight: 68,
        },

        "& .metric": {
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          color: "#fff",
          fontWeight: 600,
        },

        "& .survey-button": {
          mt: "auto",
          borderRadius: 2.5,
          py: 1.2,
          fontWeight: 700,
          textTransform: "none",
          bgcolor: "#fff",
          color: darkColor,
          boxShadow: "none",

          "&:hover": {
            bgcolor: "rgba(255,255,255,.92)",
            boxShadow: 4,
          },
        },

        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `0 22px 45px ${darkColor}50`,

          "& .survey-icon": {
            transform: "scale(1.1) rotate(-6deg)",
          },
        },
      })}
    >
      {/* Status */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        {survey.participationStatus === "invited" ? (
          <Chip
            size="small"
            label="New"
            sx={{
              bgcolor: "rgba(255,255,255,.18)",
              color: "#fff",
              fontWeight: 700,
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,.2)",
            }}
          />
        ) : (
          <Chip
            size="small"
            label={survey.participationStatus}
            color={
              survey.participationStatus === "complete"
                ? "success"
                : survey.participationStatus === "dropout"
                  ? "error"
                  : "primary"
            }
            sx={{
              textTransform: "capitalize",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      {/* Icon */}
      <Avatar className="survey-icon">
        <i className={`fa-solid ${category.icon}`} style={{ fontSize: 38 }} />
      </Avatar>

      {/* Title */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: "#fff",
          lineHeight: 1.35,
        }}
      >
        {survey.name}
      </Typography>
      {/* Category */}
      <Typography className="category">{survey.surveyCategory}</Typography>

      {/* Description */}
      <Typography className="desc">
        {descriptionMap[survey.surveyCategory] ??
          "Share your opinion by completing this survey and earn rewards."}
      </Typography>

      {/* Time & Points */}
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        sx={{
          mt: 2,
          mb: 3,
        }}
      >
        <Box className="metric">
          <AccessTimeRoundedIcon sx={{ color: "#fff" }} />
          <Typography fontWeight={600}>{survey.loi} mins</Typography>
        </Box>

        <Box className="metric">
          <AccountBalanceWalletOutlinedIcon sx={{ color: "#fff" }} />
          <Typography fontWeight={700}>{survey.points} pts</Typography>
        </Box>
      </Stack>

      {permittedStatus.includes(survey.participationStatus) && (
        <Button
          className="survey-button"
          fullWidth
          variant="contained"
          color="secondary"
          href={`/survey?name=${survey.slug}`}
        >
          Start Survey
        </Button>
      )}
    </Box>
  );
}
