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

export default function page() {
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);
 
  const tourActive = useTourActive();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user || !dateRange || dateRange.length !==2) return;
    setIsLoading(true);
    let cancelled = false;

    // if (tourActive) {
    //   setData(mockRewards.data);
    //   setIsLoading(false);
    //   return()=>{
    //     cancelled = true;
    //   };
    // }

    let filters = {
      status: {
        $nin: ["invited"],
      },
    };

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      filters.dateRange = dateRange;
    }

    loadData(
      api.post(`/api/v1/response`, filters),
      (resp) => {
        setData(resp.data);
      },
      () => {
        if (cancelled) return;
        setIsLoading(false);
      }
    );
  }, [user, dateRange, tourActive]);

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  const columns = [
    {
      id: "surveyname",
      label: "Survey Name",
      render: (info) => info?.survey?.name,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Start time",
      render: (info) => new Date(info.timeline.start).toLocaleString(),
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) =>
        (new Date(info.updatedAt) - new Date(info.timeline.start))?.toTime(),
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        info.source === "internal" && info.status === "dropout" ? (
          <Page.Link href={`/survey?name=${info.survey.slug}`}>
            Continue
          </Page.Link>
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
      render: (info) => (
        <span>
          {info.status === "complete" ? info.points : 0} Points
        </span>
      ),
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Datatable
          isLoading={isLoading}
          pagination={[10, 20, 50, 100]}
          pageSize={20}
          noDataMsg="No Record Found."
          data={tourActive ? mockRewards.data : data}
          hideColumnSelector
          extra={
            <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
              <DateRangeSelector
                onUpdate={(e) => {
                  setDateRange(
                    e.map(
                      (d) =>
                        new Date(d.toDate()).toISOString().split("T")[0]
                    )
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
            value={Math.min(
              Math.round((points / threshold) * 100),
              100
            )}
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