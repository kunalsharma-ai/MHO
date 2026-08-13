"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MemberNotification from "./MemberNotification";
import { useMember } from "@/Context";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function MemberHeader() {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [router, user] = [useRouter(), useMember()];

  const handleLogout = async () => {
    try {
      setProfileAnchorEl(null);
      await user.Logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: 78,
          bgcolor: "rgba(255,255,255,.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(13,92,199,.08)",
          boxShadow: "0 10px 35px rgba(13,92,199,.08)",
          zIndex: 1201,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 2,
            background: "linear-gradient(90deg,#FF7A00,#FFC170,#0D5CC7)",
          },
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            px: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{
              cursor: "pointer",
              transition: ".25s",

              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onClick={() => router.push("/member/dashboard")}
          >
            <Box
              component="img"
              src="/images/logo/logo.png"
              alt="logo"
              height="50px"
              width="56px"
              sx={{
                ml: 2,
                mb: 1,
                cursor: "pointer",
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => {
                router.push("/member/dashboard");
              }}
            />
            <Box
              component="img"
              src="/images/logo/My-Health-Opinions.png"
              alt="logo"
              height="72px"
              width="227.7px"
              sx={{
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
                pb: 1,
              }}
              onClick={() => {
                router.push("/member/dashboard");
              }}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            gap={{ xs: 1, md: 2 }}
            pb={1}
          >
            <QualityScore value={user?.qualityScore ?? 0} total={200} />
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f8fafc",
                border: "1px solid",
                borderColor: "divider",
                transition: ".25s",

                "&:hover": {
                  bgcolor: "primary.light",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <MemberNotification />
            </Box>

            <Button
              onClick={(event) => setProfileAnchorEl(event.currentTarget)}
              sx={{
                px: 1,
                py: 0.75,
                borderRadius: 4,
                textTransform: "none",
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "divider",

                "&:hover": {
                  bgcolor: "primary.light",
                },
              }}
            >
              <Avatar
                src={user?.profilePicture || ""}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "primary.main",
                  border: "2px solid white",
                  boxShadow: "0 4px 12px rgba(13,92,199,.15)",
                }}
              />
              <Box
                display={{ xs: "none", lg: "flex" }}
                flexDirection="column"
                mx={1.5}
                alignItems="flex-start"
              >
                <Typography
                  fontWeight={700}
                  color="text.primary"
                  lineHeight={1.2}
                >
                  {user?.name?.first}
                </Typography>

                <Typography
                  fontSize={10}
                  color="text.secondary"
                  textTransform={"capitalize"}
                >
                  {user?.role}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 240,
            borderRadius: 4,
            overflow: "visible",
            bgcolor: "#fff",
            boxShadow: "0 25px 60px rgba(0,0,0,.18)",

            "&:before": {
              content: '""',
              position: "absolute",
              top: -8,
              right: 26,
              width: 16,
              height: 16,
              bgcolor: "#fff",
              transform: "rotate(45deg)",
            },
          },
        }}
      >
        {user?.navbar?.map((link) => (
          <MenuItem
            key={link?.text}
            onClick={() => {
              setProfileAnchorEl(null);
              router.replace(link?.link ?? "/");
            }}
            sx={{
              py: 1.4,
              px: 2.5,
              gap: 1.5,
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              fontWeight: 600,

              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            {link?.icon && <i className={link.icon} />}
            {link?.text}
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleLogout}
          sx={{
            mt: 1,

            borderTop: "1px solid",

            borderColor: "grey.200",

            py: 1.5,
            px: 2.5,
            mx: 1,
            gap: 1.5,

            color: "error.main",

            fontWeight: 700,
          }}
        >
          <i className="icon-power" />
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}

function getProgressColor(value, total) {
  const ratio = Math.max(0, Math.min(1, value / total));
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * ratio);
  return `rgb(${r}, ${g}, 0)`;
}

const getQualityLabel = (percent) => {
  if (percent >= 90) return "Excellent";
  if (percent >= 75) return "Very Good";
  if (percent >= 50) return "Good";
  if (percent >= 25) return "Average";
  return "Needs Work";
};

const QualityScore = ({ value, total }) => {
  const percentage = Math.min(100, ((value || 0) / total) * 100);
  const progressColor = getProgressColor(value, total);

  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      alignItems="center"
      gap={1}
      sx={{
        height: 62,
        minWidth: 260,
        px: 4,
        borderRadius: 18,
        background: "linear-gradient(135deg,#ffffff,#f8fbff)",
        border: "1px solid rgba(13,92,199,.08)",
        boxShadow: "0 8px 20px rgba(13,92,199,.08)",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 30px rgba(13,92,199,.15)",
        },
      }}
    >
      <Box flex={1}>
        <Box display="flex" alignItems="center" gap={0.75}>
          <WorkspacePremiumIcon
            sx={{
              fontSize: 17,
              color: progressColor,
            }}
          />

          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              color: "text.secondary",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Quality Score
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={0.5}
        >
          <Box display="flex" alignItems="flex-end" gap={0.5}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                lineHeight: 1,
                color: "text.primary",
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 600,
                color: "text.secondary",
                mb: 0.15,
              }}
            >
              / {total}
            </Typography>
          </Box>

          <Box
            sx={{
              px: 1,
              py: 0.35,
              borderRadius: 10,
              bgcolor: `${progressColor}18`,
              color: progressColor,
              fontSize: 10,
              fontWeight: 700,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {getQualityLabel(percentage)}
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            mt: 0.6,
            height: 5,
            borderRadius: 20,
            bgcolor: "#edf2f7",

            "& .MuiLinearProgress-bar": {
              borderRadius: 20,
              background: `linear-gradient(90deg, ${progressColor}, ${progressColor})`,
            },
          }}
        />
      </Box>
    </Box>
  );
};