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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMember } from "@/Context";
import AdminNotification from "./AdminNotification";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import Page from "../(admin pages)/category/page";

export default function AdminHeader() {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const me = useMember();
  const router = useRouter();

  // if (!me) return <LoadingOverlay />;
  return (
    <div>
      {" "}
      <AppBar
        position="fixed"
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              cursor: "pointer",
              transition: ".25s",

              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onClick={async (e) => {
              router.push(`/admin/dashboard`);
            }}
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
                router.push("/admin/dashboard");
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
                router.push("/admin/dashboard");
              }}
            />
            <Typography
              color="primary"
              fontWeight={700}
              fontSize={20}
              mb={0.2}
              display={{ xs: "none", sm: "block" }}
            >
              Admin Portal
            </Typography>
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            gap={{ xs: 0, md: 2 }}
            pb={1}
          >
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
              <AdminNotification />
            </Box>

            <Button
              onClick={(event) => setProfileAnchorEl(event.currentTarget)}
              sx={{
                px: 1,
                mx: 1,
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
                alt="User photo"
                src={me?.profilePicture ?? ""}
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
                  {me?.name?.first}
                </Typography>

                <Typography
                  fontSize={10}
                  color="text.secondary"
                  textTransform={"capitalize"}
                >
                  {me?.role}
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
        {me?.navbar?.map((link) => (
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
          onClick={async () => {
            setProfileAnchorEl(null);
            localStorage.removeItem("token");

            me.Reload();
          }}
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
