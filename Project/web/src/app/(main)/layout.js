"use client";
import React, { Suspense } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Header from "@/componentsMHO/Header";
import Footer from "@/componentsMHO/Footer";
import JoinPanel from "@/componentsMHO/JoinPanel";
import SignUp from "@/componentsMHO/SignUp_2026-09--03";
import Login from "@/componentsMHO/Login";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";

export default function MainLayout({ children }) {
  const [visible, setVisible] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [userType, setUserType] = React.useState(null);

  React.useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      setVisible(scrollContainer.scrollTop > 300);
    };

    scrollContainer.addEventListener("scroll", toggleVisibility);
    return () =>
      scrollContainer.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div
        id="scroll-container"
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {" "}
        <Header open={openLogin} setOpen={setOpenLogin} />
        <main>{children}</main>
        <JoinPanel open={openSignUp} setOpen={setOpenSignUp} />
        <Footer />
        <SignUp
          userType={userType}
          setUserType={setUserType}
          open={openSignUp}
          onClose={() => {
            setOpenSignUp(false);
          }}
          setOpenLogin={setOpenLogin}
        />
        <Login
          open={openLogin}
          setOpenSignUp={setOpenSignUp}
          onClose={() => {
            setOpenLogin(false);
          }}
        />
        <Zoom in={visible} unmountOnExit>
          <Fab
            size="medium"
            color="primary"
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 35,
              right: 35,
              boxShadow: 4,
              zIndex: 999,
              color: "white",
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: "30px" }} />
          </Fab>
        </Zoom>
      </div>
    </Suspense>
  );
}
