"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography, Button, LinearProgress } from "@mui/material";
import { useMember } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import { motion } from "framer-motion";
import { useTourActive } from "@/Context/tourStore";
import mockRewards from "@/mockData/rewards";

import { api, Page, loadData } from "@/util";
import PopUp from "@/componentsMHO/PopUp";

// ---------- Points (baad me badalne ho to sirf yahin) ----------
const SOCIAL_POINTS = 50;
const REFERRAL_POINTS = 100;
// Admin verify karne par socials ka status inme se kuch ban jata hai
const SOCIAL_APPROVED_STATUS = ["approved","rewarded"];

// ---------- Helpers ----------
const asTime = (v) => {
  if (!v) return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
};

// dateRange: ["YYYY-MM-DD", "YYYY-MM-DD"]. Date na ho to row chhupate nahi.
const inRange = (date, dateRange) => {
  if (!Array.isArray(dateRange) || dateRange.length !== 2) return true;
  const t = asTime(date);
  if (t === null) return true;
  const from = new Date(`${dateRange[0]}T00:00:00`).getTime();
  const to = new Date(`${dateRange[1]}T23:59:59.999`).getTime();
  return t >= from && t <= to;
};

const socialAction = (platform = "") =>
  ({ facebook: "like", youtube: "subscription" })[
    String(platform).toLowerCase()
  ] ?? "follow";

// Survey + Social + Referral ko ek jaisi rows me badalta hai
function buildRewardRows({ responses = [], socials = [], referred = [], dateRange = [] }) {
  const rows = [];

  // 1) Survey (logic pehle jaisa)
  responses.forEach((r, i) => {
    const start = asTime(r?.timeline?.start);
    const end = asTime(r?.updatedAt);
    rows.push({
      id: `survey-${r?._id ?? i}`,
      type: "Survey",
      source: r?.source,
      slug: r?.survey?.slug,
      activity: r?.survey?.name ?? "Survey",
      date: r?.timeline?.start ?? r?.createdAt ?? null,
      loiMs: start !== null && end !== null && end >= start ? end - start : null,
      status: r?.status,
      points: r?.status === "complete" ? Number(r?.points) || 0 : 0,
    });
  });

  // 2) Social: admin verify karne ke baad hi points
  socials.forEach((s, i) => {
    if (!SOCIAL_APPROVED_STATUS.includes(String(s?.status).toLowerCase())) return;
    const date = s?.rewardedAt ?? s?.verifiedAt ?? s?.updatedAt ?? s?.createdAt ?? null;
    if (!inRange(date, dateRange)) return;
    const platform = s?.platform ?? s?.name ?? "social";
    rows.push({
      id: `social-${s?._id ?? platform ?? i}`,
      type: "Social",
      activity: `${platform} ${socialAction(platform)} (verified by admin)`,
      date,
      loiMs: null,
      status: "approved",
      points: SOCIAL_POINTS,
    });
  });

  // 3) Referral: dost ka email verify hone par
  referred.forEach((u, i) => {
    if (u?.isVerified?.email !== "verified") return;
    if (!inRange(u?.createdAt, dateRange)) return;
    rows.push({
      id: `referral-${u?._id ?? i}`,
      type: "Referral",
      activity: `${u?.fullName || u?.mail || "Friend"} joined via your referral`,
      date: u?.createdAt ?? null,
      loiMs: null,
      status: "approved",
      points: REFERRAL_POINTS,
    });
  });

  return rows.sort((a, b) => (asTime(b.date) ?? 0) - (asTime(a.date) ?? 0));
}

// ---------- Page ----------
export default function page() {
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);

  const tourActive = useTourActive();

  const [isLoading, setIsLoading] = React.useState(true);

const userId = user?._id ?? user?.id;
const rangeKey = Array.isArray(dateRange) ? dateRange.join("|") : "";

React.useEffect(() => {
  if (!userId || !Array.isArray(dateRange) || dateRange.length !== 2) return;
  setIsLoading(true);
  let cancelled = false;

  const filters = {
    status: { $nin: ["invited"] },
    dateRange,
  };

  Promise.allSettled([
    api.post(`/api/v1/response`, filters),
    api.get(`/api/v1/follow-social/verify`),
    api.post(`/api/v1/user`, { referredBy: userId }),
  ])
    .then((results) => {
      if (cancelled) return;
      const list = (i) =>
        results[i].status === "fulfilled" &&
        Array.isArray(results[i].value?.data)
          ? results[i].value.data
          : [];

      const myId = String(userId);
      const socials = list(1).filter(
        (s) => String(s?.created?.By?._id ?? s?.created?.By) === myId,
      );

      setData(
        buildRewardRows({
          responses: list(0),
          socials,
          referred: list(2),
          dateRange,
        }),
      );
    })
    .finally(() => {
      if (!cancelled) setIsLoading(false);
    });

  return () => {
    cancelled = true;
  };
}, [userId, rangeKey]);

  // Tour ka mock data bhi naye shape me
  const rows = React.useMemo(
    () => (tourActive ? buildRewardRows({ responses: mockRewards.data }) : data),
    [tourActive, data],
  );

  const columns = [
    {
      id: "type",
      label: "Type",
      width: 110,
      render: (info) => info.type,
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "activity",
      label: "Activity",
      render: (info) => info.activity,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Date",
      render: (info) => (info.date ? new Date(info.date).toLocaleString() : "-"),
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) => (info.loiMs != null ? info.loiMs.toTime() : "-"),
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        info.type === "Survey" &&
        info.source === "internal" &&
        info.status === "dropout" ? (
          <Page.Link href={`/survey?name=${info.slug}`}>Continue</Page.Link>
        ) : (
          <Page.Text
            sx={{
              fontSize: 13,
              textTransform: "capitalize",
              color: info.status === "dropout" ? "red" : "black",
            }}
          >
            {info.status}
          </Page.Text>
        ),
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "rewards",
      label: "Rewards",
      render: (info) => <span>{info.points} Points</span>,
    },
  ];

  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      {/* <RewardStatus /> */}

      <motion.div
        data-tour="rewards-history-table"
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Datatable
          isLoading={isLoading && !tourActive}
          pagination={[10, 20, 50, 100]}
          pageSize={20}
          noDataMsg="No Record Found."
          data={rows}
          hideColumnSelector
          extra={
            <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
              <DateRangeSelector
                onUpdate={(e) => {
                  setDateRange(
                    e.map(
                      (d) => new Date(d.toDate()).toISOString().split("T")[0],
                    ),
                  );
                }}
              />
            </Box>
          }
          title={
            <Typography
              sx={{
                fontSize: "16px",
                display: "inline-block",
                fontWeight: "600",
                color: "primary.main",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.secondary.dark}`,
                pb: 0.5,
                my: 1,
              }}
            >
              Rewards History
            </Typography>
          }
          columns={columns}
        />
      </motion.div>
    </Grid>
  );
}



function RewardStatus() {
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [points, setPoints] = React.useState(0);
  const [conversionRate, setConversionRate] = React.useState(1);
  const [threshold, setThreshold] = React.useState(1500);

  React.useEffect(() => {
    setLoading(true);

    api
      .get(`/api/v1/me/points`)
      .then((resp) => {
        if (resp.status === "error") {
          router.replace("/survey?name=welcome");
        }

        let data = resp.data;

        setPoints(data.totalPoints);
        setThreshold(data.threshold);
        setConversionRate(data.conversionRate);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <></>;

  return (
    <>
      <Grid
        container
        size={12}
        mb={2}
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{
          border: "1px solid rgba(89, 172, 119, 0.6)",
          bgcolor: "azure",
          borderRadius: 4,
          px: 3,
          py: 3,
          minHeight: "120px",
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Typography fontSize={{ xs: 14, md: 13, xl: 14 }}>
            Reward Points
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "22px", xl: "28px" },
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              whiteSpace: "normal",
            }}
          >
            {points} Points (~{" "}
            {(Number(points) * Number(conversionRate)).toMoney("USD")})
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          container
          direction="column"
          alignItems="flex-end"
          justifyContent="center"
        >
          <Button
            disabled={threshold > points}
            variant="contained"
            size="small"
            color="secondary"
            sx={{
              color: "white",
              mt: 1,
              px: 2,
              fontWeight: 600,
              borderRadius: 2,
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Redeem Points
          </Button>
        </Grid>

        <Grid size={12} mt={1}>
          <LinearProgress
            variant="determinate"
            value={Math.min(Math.round((points / threshold) * 100), 100)}
            sx={{
              height: 20,
              borderRadius: 5,
              border: "1px solid rgba(89, 172, 119, 0.4)",
              backgroundColor: "#dffff1",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
              },
            }}
          />

          {threshold > points && (
            <Typography fontSize="13px" mt={1} ml={1}>
              Get <b>{threshold - points}</b> more points to redeem
            </Typography>
          )}
        </Grid>

        <Grid
          size={12}
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          mt={2}
        >
          <Typography fontSize="15px">
            Total Surveys: <b>20</b>
          </Typography>

          <Typography fontSize="15px">
            Earnings: <b>$20</b>
          </Typography>

          <Typography fontSize="15px">
            Pending: <b>$20</b>
          </Typography>
        </Grid>
      </Grid>

      <RedeemForm
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

function RedeemForm({ open, onClose }) {
  const [points, setPoints] = React.useState(0);
  const [method, setMethod] = React.useState("");

  return (
    <PopUp open={open} onClose={onClose} hideTitle={true} maxWidth={"sm"}>
      <Grid
        size={12}
        container
        direction="column"
        alignItems="center"
        py={1}
        px={2}
        bgcolor="#fff"
      >
        <Typography color="secondary" variant="h5" p={2} fontWeight={600}>
          Redeem Points
        </Typography>

        <Typography fontSize={14} textAlign="center" mb={3}>
          You have <b>1200</b> points available for redemption. Please enter
          the number of points you wish to redeem below.
        </Typography>

        <Page.InputTextField
          label="Points to Redeem"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          type="number"
          inputProps={{
            min: 0,
            max: 100,
          }}
          fullWidth
        />

        <Page.Select
          label="Redemption Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          sx={{ mt: 2 }}
          options={[
            { value: "method1", label: "Method 1" },
            { value: "method2", label: "Method 2" },
          ]}
        />

        <Grid size={12} container justifyContent="flex-end" mt={3}>
          <Button
            variant="outlined"
            onClick={onClose}
            size="medium"
            sx={{ my: 3, borderWidth: 2, fontWeight: 600 }}
          >
            Cancel
          </Button>

          <Button
            color="secondary"
            variant="contained"
            disabled={!points || !method}
            onClick={() => {
              console.log("Redeem", { points, method });
            }}
            size="medium"
            sx={{
              my: 3,
              borderWidth: 2,
              fontWeight: 600,
              color: "white",
              ml: 2,
            }}
          >
            Redeem
          </Button>
        </Grid>
      </Grid>
    </PopUp>
  );
}