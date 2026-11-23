"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Rating,
} from "@mui/material";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
//import OnboardingTour from "../../components/OnboardingTour";

import { useMember, useQuery } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, loadData, Page } from "@/util";
import { useToast } from "@/hooks";
import { SurveyPoints, CurrentUser } from "../../components";
import SegmentDashboard from "./SegmentDashboard";

import {
  Poll as PollIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Stars as StarsIcon,
  Star as StarIcon,
  AttachMoney as AttachMoneyIcon,
  Payments as PaymentsIcon,
} from "@mui/icons-material";

const formatNumber = (value) =>
  Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 });

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const surveyContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const surveyCard = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function page() {
  const member = useMember();
  const user = [];
  const router = useRouter();
  const [[threshold, setThreshold], [conversionRate, setConversionRate]] = [
    React.useState(15000),
    React.useState(0.001),
  ];
  function onPointsUpdate(data) {
    setThreshold(data.threshold);
    setConversionRate(data.conversionRate);
  }

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  if (!member) return <LoadingOverlay />;
  return (
    <Grid
      container
      size={12}
      sx={{
        bgcolor: "#f4f7fb",
        minHeight: "100vh",
        p: { xs: 1, md: 3.5 },
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {/* Panel-specific dashboard (HCP, caregiver or patient), from GET /api/v1/me/dashboard */}
      <div data-tour="greeting">
        <SegmentDashboard member={member} />
      </div>
      <Grid
        size={12}
        container
        sx={{
          display: { xs: "flex", lg: "none" },
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 30px rgba(12, 90, 219, 0.03)",
          px: { xs: 3, md: 4 },
          py: { xs: 2.5, md: 3 },
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: "linear-gradient(180deg, #0c5adb 0%, #063686 100%)",
          },
        }}
      >
        <CurrentUser />
        <SurveyPoints onUpdate={onPointsUpdate} />
      </Grid>
      <Grid size={12} data-tour="stats">
        <Stats threshold={threshold} conversionRate={conversionRate} />
      </Grid>
      <Grid size={12} data-tour="surveys">
        <Surveys />
      </Grid>
      <MotionGrid
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        size={12}
        px={{ xs: 2, md: 3 }}
        py={2}
        mt={1}
        justifyContent="center"
        data-tour="survey-history"
        sx={{
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.02)",
        }}
      >
        <SurveyHistory />
      </MotionGrid>
    </Grid>
  );
}

function Stats({ threshold, conversionRate }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/statistics`),
      (resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;

        setStatistics(data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [threshold, conversionRate]);

  return (
    <Grid size={12}>
      <StatCards
        statistics={statistics}
        isLoading={isLoading}
        conversionRate={conversionRate}
      />
    </Grid>
  );
}

function Surveys() {
  const [user, query, router] = [useMember(), useQuery(), useRouter()];
  const [availableSurveys, setAvailableSurveys] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/survey`),
      (resp) => {
        if (!resp || resp.status === "error") return;
        const { data } = resp;
        setAvailableSurveys(data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [user]);

  const surveys = [
    {
      name: "Your Survey",
      link: "/member/surveys?source=internal",
      description:
        "Handpicked opportunities curated specifically around your unique profile insights. Complete these high-value matches to maximize your earnings securely and directly.",
      isAvailable: Boolean(availableSurveys?.internal),
      stat: [
        {
          title: "All New Surveys",
          filter: null,
          count: availableSurveys?.internal?.all ?? 0,
          bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        },
        {
          title: "High Reward Surveys",
          filter: "High Reward Surveys",
          count: availableSurveys?.internal?.highRewards ?? 0,
          bg: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
        },
        {
          filter: "Short Surveys",
          title: "Short Surveys",
          count: availableSurveys?.internal?.short ?? 0,
          bg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        },
        // {
        //   title: "New Surveys",
        //   filter: "New Surveys",
        //   count: availableSurveys?.internal?.newSurveys ?? 0,
        //   bg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
        // },
      ],
    },
    {
      name: "Daily Survey",
      link: "/member/surveys?source=external",
      description:
        "High-frequency, rotating questionnaires updated constantly throughout the day. Dive in anytime for quick, continuous chances to boost your daily points balance.",
      isAvailable: Boolean(availableSurveys?.external),
      stat: [
        {
          title: "All New Surveys",
          filter: null,
          count: 0,
          bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        },
        {
          title: "High Reward Surveys",
          filter: "High Reward Surveys",
          count: 0,
          bg: "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)",
        },
        {
          filter: "Short Surveys",
          title: "Short Surveys",
          count: 0,
          bg: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
        },
        // {
        //   title: "New Surveys",
        //   filter: "New Surveys",
        //   count: 0,
        //   bg: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
        // },
      ],
    },
  ];

  return (
    <MotionGrid
      container
      variants={surveyContainer}
      initial="hidden"
      animate="show"
      size={12}
      spacing={3}
      px={{ xs: 2.5, md: 4 }}
      py={3.5}
      justifyContent="center"
      sx={{
        borderRadius: "16px",
        background: "linear-gradient(180deg,#f8fbff,#ffffff)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow: "0 4px 25px rgba(0, 0, 0, 0.02)",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        px={0.5}
        mb={0.5}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            Available Surveys
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "text.secondary",
              mt: 0.3,
            }}
          >
            Complete surveys matched to your profile and earn rewards.
          </Typography>
        </Box>
      </Box>

      {surveys.map((survey, index) => {
        return (
          <MotionGrid
            variants={surveyCard}
            custom={index}
            whileHover={{
              y: -4,
              scale: 1.015,
              transition: {
                duration: 0.25,
              },
            }}
            container
            key={index}
            size={{ xs: 12, lg: 6 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            p={1}
            sx={{
              boxShadow:
                index === 0
                  ? "0 20px 45px rgba(13,92,199,.35)"
                  : "0 20px 45px rgba(10,77,165,.35)",
              background:
                index === 0
                  ? "linear-gradient(  135deg,  #FFC170 0%,  #FF9A2A 35%,  #FF7A00 70%,  #D95F00 100%)"
                  : "linear-gradient(135deg,#0D5CC7,#0A4DA5,#083E86)",
              borderRadius: "16px",
              color: "#fff",
              overflow: "hidden",
              textAlign: "center",
              minHeight: 306,
              transition:
                "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
              willChange: "transform",

              position: "relative",
              "&:hover": {
                boxShadow:
                  index === 0
                    ? "0 28px 60px rgba(13,92,199,.45)"
                    : "0 28px 60px rgba(10,77,165,.45)",

                transform: "translateY(-3px) scale(1.015)",
              },
            }}
          >
            {isLoading ? (
              <Page.Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "inline-flex",
                  zIndex: 10,
                }}
              >
                <CircularProgress sx={{ color: "white" }} thickness={2} />
              </Page.Box>
            ) : survey.isAvailable ? (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,0) 45%)",
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    top: -150,
                    right: -120,
                    background:
                      index === 0
                        ? "rgba(255,255,255,.10)"
                        : "rgba(255,255,255,.08)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    bottom: -90,
                    left: -60,
                    background:
                      index === 0
                        ? "rgba(255,209,153,.22)"
                        : "rgba(255,122,0,.18)",
                    filter: "blur(35px)",
                    pointerEvents: "none",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: -0.6,
                    mb: 1,
                    textShadow: "0 3px 12px rgba(0,0,0,.25)",
                  }}
                >
                  {survey.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    opacity: 0.94,
                    maxWidth: 470,
                  }}
                >
                  {survey.description}
                </Typography>

                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  width="100%"
                  my={1}
                  px={1}
                >
                  {survey.stat.map((item, statIndex) => (
                    <MotionGrid
                      key={statIndex}
                      size={{ xs: 6, sm: 4 }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.45 + statIndex * 0.08,
                        duration: 0.35,
                      }}
                    >
                      <Page.Link
                        href={`${survey.link}&filter=${item.filter}`}
                        sx={{
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "none",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: 14,
                            py: 1.4,
                            px: 1.2,

                            background:
                              "linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.08))",

                            border: "1px solid rgba(255,255,255,.22)",

                            backdropFilter: "blur(14px)",

                            boxShadow: "0 10px 24px rgba(230,100,0,.18)",

                            transition: ".35s",

                            "&:hover": {
                              transform: "translateY(-6px)",
                              background:
                                "linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,.12))",
                              boxShadow: "0 18px 35px rgba(0,0,0,.28)",
                            },
                          }}
                        >
                          {" "}
                          <Typography
                            sx={{
                              fontSize: 30,
                              fontWeight: 900,
                              letterSpacing: -1,
                              color: "#fff",
                              textShadow: "0 4px 12px rgba(0,0,0,.3)",
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                              opacity: 0.82,
                              color: "#fff2e3",
                              mb: 0.5,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      </Page.Link>
                    </MotionGrid>
                  ))}
                </Grid>
              </>
            ) : (
              <MotionBox
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                width={"100%"}
                display="flex"
                alignItems="center"
                flexDirection={{ xs: "column", xl: "row" }}
                justifyContent="space-between"
                gap={1}
                mb={2}
                textAlign="center"
                px={3}
                position={"relative"}
                zIndex={2}
              >
                <Box
                  component="img"
                  src={
                    index === 0
                      ? "/images/no-survey.png"
                      : "/images/no-daily-survey.png"
                  }
                  alt="No surveys"
                  sx={{
                    width: 220,
                    maxWidth: "100%",
                    objectFit: "contain",
                    mb: 2,
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.12))",
                  }}
                />

                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 1,
                    }}
                  >
                    {index === 0
                      ? "No surveys right now"
                      : "No daily surveys yet"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "15px",
                      opacity: 0.92,
                      maxWidth: 360,
                      lineHeight: 1.7,
                      mb: 3,
                    }}
                  >
                    {index === 0
                      ? "Keep your profile details updated regularly to unlock more relevant survey opportunities and higher reward matches."
                      : "Quick surveys and earning opportunities will appear throughout the day."}
                  </Typography>

                  {index === 0 && (
                    <Button
                      href="/member/profiles"
                      variant="contained"
                      disableElevation
                      sx={{
                        mt: 1,

                        borderRadius: 14,

                        px: 3.5,

                        py: 1.2,

                        fontWeight: 700,

                        border: (theme) =>
                          `1px solid ${theme.palette.secondary.light}`,

                        textTransform: "none",

                        background: "linear-gradient(135deg,#FF7A00,#E66400)",

                        color: "#fff",

                        boxShadow: "0 12px 28px rgba(255,122,0,.4)",

                        "&:hover": {
                          background: "linear-gradient(135deg,#FF8D24,#FF7A00)",

                          transform: "translateY(-2px)",

                          boxShadow: "0 18px 36px rgba(255,122,0,.5)",
                        },
                      }}
                    >
                      Update Profile
                    </Button>
                  )}
                </Box>
              </MotionBox>
            )}
          </MotionGrid>
        );
      })}
    </MotionGrid>
  );
}

export function SurveyHistory() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);
  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    let filters = {
      status: {
        $nin: ["invited"],
      },
    };
    if (
      Boolean(dateRange) &&
      Boolean(dateRange instanceof Array) &&
      dateRange.length === 2
    )
      filters = { ...filters, dateRange };
    loadData(
      api.post(`/api/v1/response`, filters),
      (resp) => {
        setData(resp?.data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [user, dateRange]);

  const renderStatusBadge = (status, source, slug) => {
   const config = {
      complete: {
        bg: "#e6f4ea",
        color: "#137333",
        border: "rgba(19, 115, 51, 0.15)",
      },
      terminate: {
        bg: "#fce8e6",
        color: "#c5221f",
        border: "rgba(197, 34, 31, 0.15)",
      },
      overquota: {
        bg: "#fef7e0",
        color: "#b06000",
        border: "rgba(176, 96, 0, 0.15)",
      },
      dropout: {
        bg: "#f3f4f6",
        color: "#4b5563",
        border: "rgba(75, 85, 99, 0.15)",
      },
    };

    const style = config[status] || {
      bg: "#f3f4f6",
      color: "#4b5563",
      border: "rgba(75, 85, 99, 0.15)",
    };

    return (
      <Box
        sx={{
          display: "inline-block",
          bgcolor: style.bg,
          color: style.color,
          border: `1px solid ${style.border}`,
          borderRadius: "20px",
          px: 1.8,
          py: 0.4,
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {status}
      </Box>
    );
  };

  const columns = [
    {
      id: "surveyname",
      label: "Survey Name",
      width: 300,
      render: (info) => (
        <Typography
          sx={{
            fontWeight: "600",
            color: "primary.main",
            fontSize: "14px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: 280,
          }}
        >
          {info?.survey?.name}
        </Typography>
      ),
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Start time",
      render: (info) => {
        if (["complete", "terminate", "overquota"].includes(info.status))
          return (
            <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
              {new Date(info.timeline.start).toLocaleString()}
            </Typography>
          );
        return "";
      },
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) => {
        if (["complete", "terminate", "overquota"].includes(info.status)) {
          const loi = (
            new Date(info.updatedAt) - new Date(info.timeline.start)
          )?.toTime();
          return (
            <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
              {loi}
            </Typography>
          );
        }
        return "";
      },
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        renderStatusBadge(info.status, info.source, info.survey?.slug),
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "rewards",
      label: "Rewards",
      render: (info) => {
        const isComplete = info.status === "complete";
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: isComplete ? "#d97706" : "text.disabled",
              }}
            />
            <Typography
              sx={{
                fontWeight: isComplete ? "700" : "500",
                color: isComplete ? "#d97706" : "text.secondary",
                fontSize: "13px",
              }}
            >
              {isComplete ? `${info.points} Points` : "0 Points"}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: "surveyFeedback",
      label: "Survey Feedback",
      render: (info) => (
        <Page.Box
          title={`${info.rating} Stars`}
          sx={{ width: 200, display: "flex", alignItems: "center" }}
        >
          <Rating
            name="survey-feedback"
            value={info.rating}
            precision={0.5}
            readOnly
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Page.Box>
      ),
    },
  ];

  return (
    <Datatable
      isLoading={isLoading}
      pagination={[10, 20, 50, 100]}
      pageSize={20}
      noDataMsg="No Record Found."
      data={data.filter((info) => info.status !== "invited")}
      hideDownload={true}
      hideColumnSelector
      extra={
        <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
          <DateRangeSelector
            onUpdate={(e) => {
              setDateRange(
                e.map((d) => new Date(d.toDate()).toISOString().split("T")[0]),
              );
            }}
          />
        </Box>
      }
      title={
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "700",
            color: "primary.main",
            letterSpacing: "-0.5px",
            pb: 0.5,
            my: 1,
          }}
        >
          Recent Survey Activity
        </Typography>
      }
      columns={columns}
    />
  );
}

const StatCards = ({ statistics, isLoading, conversionRate }) => {
  const iconStyle = {
    sx: {
      fontSize: 26,
      color: "#fff",
    },
  };

  const stats = React.useMemo(
    () => [
      {
        title: "Survey Participated",
        value: formatNumber(statistics?.total ?? 0),
        icon: <PollIcon {...iconStyle} />,
        accent: (theme) => theme.palette.primary.main,
        hideOnLargeScreen: false,
      },
      {
        title: "Survey Completed",
        value: formatNumber(statistics?.complete ?? 0),
        icon: <CheckCircleIcon {...iconStyle} />,
        accent: "#2EAF61",
        hideOnLargeScreen: false,
      },
      {
        title: "Survey Disqualified",
        value: formatNumber(statistics?.disqualified ?? 0),
        icon: <CancelIcon {...iconStyle} />,
        accent: "#E55353",
        hideOnLargeScreen: false,
      },
      {
        title: "Rewards Earned (Points)",
        value: formatNumber(statistics?.points ?? 0),
        icon: <StarsIcon {...iconStyle} />,
        accent: (theme) => theme.palette.secondary.main,
        hideOnLargeScreen: true,
      },
      {
        title: "Rewards Earned",
        value: {
          usd: `${(Number(statistics?.points ?? 0) * Number(conversionRate)).toMoney("USD")}`,
          local: `${(Number(statistics?.points ?? 0) * Number(conversionRate)).toLocalCurrency("USD")}`,
        },
        icon: <AttachMoneyIcon {...iconStyle} />,
        accent: "#4C8BF5",
        hideOnLargeScreen: false,
      },
      {
        title: "Rewards Claimed",
        value: {
          usd: `${((statistics?.claimed ?? 0) / 100).toMoney("USD")}`,
          local: `${((statistics?.claimed ?? 0) / 100).toLocalCurrency("USD")}`,
        },
        icon: <PaymentsIcon {...iconStyle} />,
        accent: (theme) => theme.palette.secondary.dark,
        hideOnLargeScreen: false,
      },
    ],
    [statistics, conversionRate],
  );

  return (
    <MotionBox
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      sx={{ gap: 3, py: 1 }}
    >
      {stats.map((data, index) => (
        <MotionGrid
          key={index}
          variants={cardVariant}
          whileHover={{
            y: -4,
            scale: 1.02,
            transition: {
              duration: 0.2,
            },
          }}
          size={12}
          sx={{
            display: data.hideOnLargeScreen
              ? { xs: "block", xl: "none" }
              : "block",

            height: 135,
            position: "relative",

            borderRadius: 3,
            overflow: "hidden",

            background: "#fcfdff",

            border: "1px solid",
            borderColor: "divider",

            boxShadow: "0 8px 24px rgba(15,23,42,.08)",

            transition: "box-shadow .35s, border-color .35s",

            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 10,
              background: data.accent,
              borderRadius: "0 8px 8px 0",
            },

            "&:hover": {
              borderColor: data.accent,
              boxShadow: "0 18px 38px rgba(0,0,0,.12)",

              "& .icon-circle": {
                transform: "scale(1.08) rotate(8deg)",
              },
            },
          }}
        >
          {isLoading ? (
            <Page.Box
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
                sx={{ color: data.accent }}
                thickness={2.5}
                size={28}
              />
            </Page.Box>
          ) : (
            <Page.Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "flex-end",
                padding: "18px 22px",
              }}
            >
              <Box
                className="icon-circle"
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: data.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 10px 24px ${data.accent}33`,
                  transition: ".3s",
                }}
              >
                {data.icon}
              </Box>

              <Page.Box>
                {typeof data.value === "object" ? (
                  <Page.Box
                    sx={{ display: "flex", alignItems: "flex-baseline" }}
                  >
                    <Page.Text
                      sx={{
                        fontSize: 36,
                        fontWeight: 800,
                        letterSpacing: -0.8,
                        lineHeight: 1,
                      }}
                    >
                      {data.value.usd}
                    </Page.Text>

                    <Page.Text
                      sx={{
                        ml: 1,
                        mt: 0.5,
                        fontSize: 18,
                        color: "text.secondary",
                      }}
                    >
                      {data.value.local}
                    </Page.Text>
                  </Page.Box>
                ) : (
                  <Page.Text
                    sx={{
                      fontSize: 36,
                      fontWeight: 800,
                      letterSpacing: -0.8,
                      lineHeight: 1,
                    }}
                  >
                    {data.value}
                  </Page.Text>
                )}
              </Page.Box>
              <Page.Text
                sx={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "text.secondary",
                  letterSpacing: "-0.2px",
                  mb: 1,
                  maxWidth: "120px",
                }}
              >
                {data.title}
              </Page.Text>
            </Page.Box>
          )}
        </MotionGrid>
      ))}
    </MotionBox>
  );
};
