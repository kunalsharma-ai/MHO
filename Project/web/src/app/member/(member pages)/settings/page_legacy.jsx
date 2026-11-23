"use client";
import React from "react";
import { api, Page } from "@/util";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Collapse,
  CircularProgress,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Terms } from "@/app/auth/terms/page";
import { useMember } from "@/Context";
import { useDebounce, useToast } from "@/hooks";
import { motion } from "framer-motion";

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

const sectionVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function page() {
  return (
    <Grid
      size={12}
      container
      spacing={2}
      py={2}
      px={{ xs: 2, md: 3 }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <MotionGrid
        custom={0}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        size={{ xs: 12, md: 6 }}
      >
        <ChangePassword />
      </MotionGrid>

      <MotionGrid
        custom={1}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        size={{ xs: 12, md: 6 }}
      >
        <SurveyNotification />
      </MotionGrid>

      <MotionGrid
        custom={3}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        size={12}
      >
        <TermsAndConditions />
      </MotionGrid>
    </Grid>
  );
}

function ChangePassword() {
  const [inputs, setInputs] = React.useState({
    oldPassword: "",
    newPassword: "",
    cnfPassword: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null); // { type: "success" | "error", message: string }

  // Helper: pulls the most useful error message out of whatever shape the
  // API returns, so a wrong "current password" (or any other backend error)
  // always shows something clear instead of "undefined" / a blank toast.
  const extractErrorMessage = (resp) => {
    return (
      resp?.message ||
      resp?.data?.message ||
      resp?.error ||
      (Array.isArray(resp?.errors) && resp.errors[0]) ||
      "Something went wrong. Please check your current password and try again."
    );
  };

  return (
    <Grid
      data-tour="settings-password"
      size={12}
      container
      spacing={2}
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setFeedback(null);

        try {
          let resp = await api.patch(`/api/v1/me`, inputs);

          if (resp?.status === "success") {
            setFeedback({
              type: "success",
              message: resp?.message || "Password changed successfully!",
            });
            setInputs({
              oldPassword: "",
              newPassword: "",
              cnfPassword: "",
            });
          } else {
            const message = extractErrorMessage(resp);
            setFeedback({ type: "error", message });
          }
        } catch (err) {
          setFeedback({
            type: "error",
            message:
              err?.message ||
              "Couldn't change your password right now. Please try again.",
          });
        } finally {
          setLoading(false);
        }
      }}
    >
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: 600,
            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Change Password
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={2}
        px={2}
        py={2}
        sx={{
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          borderRadius: 2,
        }}
      >
        <Page.Input
          label="Current Password"
          type="password"
          name="password"
          value={inputs.oldPassword}
          error={feedback?.type === "error"}
          onChange={(e) => {
            setInputs({ ...inputs, oldPassword: e?.target?.value ?? "" });
            if (feedback?.type === "error") setFeedback(null);
          }}
          sx={{ bgcolor: "white" }}
        />
        <Page.Input
          label="New Password"
          type="password"
          name="newPassword"
          strengthMeter={true}
          value={inputs.newPassword}
          onChange={(e) => {
            setInputs({ ...inputs, newPassword: e?.target?.value ?? "" });
            if (feedback?.type === "error") setFeedback(null);
          }}
          sx={{ bgcolor: "white" }}
        />
        <Page.Input
          label="Confirm New Password"
          type="password"
          name="cnfPassword"
          match="newPassword"
          value={inputs.cnfPassword}
          sx={{ bgcolor: "white" }}
          onChange={(e) => {
            setInputs({ ...inputs, cnfPassword: e?.target?.value ?? "" });
            if (feedback?.type === "error") setFeedback(null);
          }}
        />

        <Collapse in={Boolean(feedback)} unmountOnExit>
          {feedback && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                px: 1.75,
                py: 1.25,
                borderRadius: 2,
                bgcolor: (theme) =>
                  feedback.type === "success"
                    ? "#EDF7EE"
                    : theme.palette.primary.light,
                border: (theme) =>
                  `1px solid ${
                    feedback.type === "success"
                      ? "#A9D6AE"
                      : theme.palette.secondary.main
                  }`,
              }}
            >
              {feedback.type === "success" ? (
                <CheckCircleRoundedIcon
                  fontSize="small"
                  sx={{ color: "#2E7D32", mt: "1px" }}
                />
              ) : (
                <ErrorRoundedIcon
                  fontSize="small"
                  sx={{ color: "secondary.main", mt: "1px" }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: feedback.type === "success" ? "#1B5E20" : "primary.main",
                  fontWeight: 500,
                }}
              >
                {feedback.message}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setFeedback(null)}
                sx={{
                  p: 0.25,
                  color:
                    feedback.type === "success" ? "#2E7D32" : "secondary.main",
                }}
              >
                <CloseRoundedIcon fontSize="inherit" />
              </IconButton>
            </Box>
          )}
        </Collapse>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={
          loading ||
          inputs.cnfPassword !== inputs.newPassword ||
          inputs.newPassword === "" ||
          inputs.oldPassword === ""
        }
        startIcon={
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : undefined
        }
        sx={{
          ml: 1,
          color: "white",
          px: 2,
          fontWeight: 600,
        }}
      >
        {loading ? "Changing..." : "Change Password"}
      </Button>
    </Grid>
  );
}

function SurveyNotification() {
  const [selected, setSelected] = React.useState([]);
  const [initialSelected, setInitialSelected] = React.useState([]);
  const [user] = [useMember()];
  React.useEffect(() => {
    if (!user) return;
    api
      .post(`/api/v1/me`, { questions: ["communication-methods"] })
      .then((resp) => {
        setSelected(resp.data["communication-methods"] ?? []);
        setInitialSelected(resp.data["communication-methods"] ?? []);
      });
  }, [user]);

  const options = [
    { label: "By E-Mail", value: "email" },
    { label: "By SMS (Short Message Service)", value: "sms" },
    { label: "By Phone Call", value: "phone" },
    { label: "By Dashboard Notifications", value: "dashboard" },
    { label: "By Whatsapp", value: "whatsapp" },
  ];

  const isUnchanged = React.useMemo(() => {
    const sort = (arr) => [...arr].sort();
    return (
      JSON.stringify(sort(selected)) === JSON.stringify(sort(initialSelected))
    );
  }, [selected, initialSelected]);

  return (
    <Grid data-tour="settings-notifications" size={12} container spacing={2}>
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Survey Notification
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={0}
        px={2}
        py={2}
        sx={{
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          borderRadius: 2,
        }}
      >
        <Typography fontSize={16} my={1}>
          How do you like to be notified for new survey
        </Typography>

        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={(e) => {
                  selected.includes(option.value)
                    ? setSelected(
                        selected.filter((opt) => opt !== option.value),
                      )
                    : setSelected([...selected, option.value]);
                }}
                sx={{ color: "secondary.main" }}
              />
            }
            label={option.label}
          />
        ))}
      </Grid>

      <Button
        onClick={async (e) => {
          let resp = await api.patch(`/api/v1/me/answer`, {
            "communication-methods": selected,
          });
          useToast(resp);
          console.log(resp);
        }}
        disabled={isUnchanged}
        variant="contained"
        color="secondary"
        sx={{
          ml: 1,
          color: "white",
          px: 2,
          fontWeight: 600,
        }}
      >
        Save and Update
      </Button>
    </Grid>
  );
}

function ChangeEmail() {
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [isUnused, setIsUnused] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const user = useMember();
  useDebounce(
    () => {
      if (
        !Boolean(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
            email,
          ),
        )
      )
        return setIsValid(false);
      api
        .post(`/api/v1/user`, {
          mail: email.trim().toLowerCase(),
        })
        .then((resp) => {
          if (resp.data.length === 0) setIsUnused(true);
        });
    },
    1000,
    [email],
  );
  useDebounce(
    () => {
      if (
        !Boolean(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
            email,
          ),
        )
      )
        return setIsValid(false);
      api
        .post(`/api/v1/validator/email`, {
          email: email.trim().toLowerCase(),
        })
        .then((resp) => {
          setIsValid(resp.valid);
        });
    },
    1000,
    [email],
  );

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      spacing={2}
      justifySelf="flex-start"
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        let resp = await api.patch(`/api/v1/me/change-email`, { email });
        // useToast(resp);
        setMessage(resp.message);
        if (resp.status === "success" && "Reload" in user) user.Reload();
        setIsValid(false);
      }}
    >
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: 600,
            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Change Email
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={2}
        px={2}
        py={2}
        sx={{
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          borderRadius: 2,
        }}
      >
        <Page.Input
          label="New Email"
          onChange={(e) => {
            setEmail(e?.target?.value ?? "");
          }}
          sx={{ bgcolor: "white" }}
        />
      </Grid>

      <Typography width="100%" ml={1} color="secondary" fontWeight={500}>
        {message}
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={!isValid || !isUnused}
        sx={{
          ml: 1,
          px: 2,
          color: "white",
          fontWeight: 600,
        }}
      >
        Change Email
      </Button>
    </Grid>
  );
}

function TermsAndConditions() {
  return (
    <Grid data-tour="settings-terms" size={12} container spacing={2} my={2}>
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Terms and Conditions
        </Typography>
      </Box>
      <Grid
        size={12}
        sx={{
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          borderRadius: 2,
        }}
      >
        <Terms width={"100%"} hideLoading={true} />
      </Grid>
    </Grid>
  );
}