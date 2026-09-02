"use client";
import React, { Suspense } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import AboutUs from "@/componentsMHO/AboutUs";
import Stats from "@/componentsMHO/Stats";
import RewardModes from "@/componentsMHO/RewardModes";
import HeroSection from "@/componentsMHO/HeroSection";
import SurveyFlexibility from "@/componentsMHO/SurveyFlexibility";
import HealthcareProfessionals from "@/componentsMHO/HealthcareProfessionals";
import HealthcareSpecialities from "@/componentsMHO/HealthcareSpecialities";
import Solutions from "@/componentsMHO/Solutions";
import JoinPanel from "@/componentsMHO/JoinPanel";
import Footer from "@/componentsMHO/Footer";
import Testimonial from "@/componentsMHO/Testimonial";
import Reveal from "@/componentsMHO/RevealOnScroll";
import Header from "@/componentsMHO/Header";
import SignUp from "@/componentsMHO/SignUp";
import Login from "@/componentsMHO/Login";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useMember, useQuery } from "@/Context";
import FeedbackForm from "@/componentsMHO/FeedbackForm";
import { Popup } from "@/components/Popup";
import RecentActivityPopup from "@/componentsMHO/RecentActivityPopup";

export default function Home() {
  const query = useQuery();
  const homeRef = React.useRef(null);
  const aboutRef = React.useRef(null);
  const professionalsRef = React.useRef(null);
  const specialitiesRef = React.useRef(null);
  const solutionsRef = React.useRef(null);
  const testimonialsRef = React.useRef(null);
  const joinRef = React.useRef(null);

  const [visible, setVisible] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [userType, setUserType] = React.useState(null);

  React.useEffect(() => {
    if (!query) return;
    if (![null, undefined].includes(query.signup)) {
      setOpenSignUp(true);
    }
  }, [query]);

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

  const sections = [
    { label: "HOME", ref: homeRef },
    { label: "ABOUT US", ref: aboutRef },
    { label: "OUR PROFESSIONALS", ref: professionalsRef },
    { label: "OUR SPECIALTIES", ref: specialitiesRef },
    { label: "SOLUTIONS", ref: solutionsRef },
    { label: "TESTIMONIALS", ref: testimonialsRef },
    { label: "CONTACT", ref: joinRef },
  ];

  return (
    <>
      <div
        id="scroll-container"
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Header sections={sections} open={openLogin} setOpen={setOpenLogin} />

        <div ref={homeRef} className="scroll-target">
          <HeroSection
            open={openSignUp}
            setOpen={setOpenSignUp}
            setUserType={setUserType}
          />
        </div>
        <Reveal>
          <div ref={aboutRef} className="scroll-target">
            <AboutUs />
          </div>
        </Reveal>
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <RewardModes />
        </Reveal>
        <Reveal>
          <SurveyFlexibility />
        </Reveal>
        <div ref={professionalsRef} className="scroll-target">
          <Reveal>
            <HealthcareProfessionals />
          </Reveal>
        </div>
        <div ref={specialitiesRef} className="scroll-target">
          <Reveal>
            <HealthcareSpecialities />
          </Reveal>
        </div>
        <div ref={solutionsRef} className="scroll-target">
          <Reveal>
            <Solutions />
          </Reveal>
        </div>
        <div ref={testimonialsRef} className="scroll-target">
          <Testimonial />
        </div>
        <div ref={joinRef} className="scroll-target">
          <JoinPanel open={openSignUp} setOpen={setOpenSignUp} />
        </div>

        <Footer sections={sections} />
        <Zoom in={visible} unmountOnExit>
          <Fab
            size="medium"
            color="primary"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              position: "fixed",
              bottom: 15,
              left: 15,
              boxShadow: 4,
              zIndex: 999,
              color: "white",
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: "30px" }} />
          </Fab>
        </Zoom>
        <RecentActivityPopup ToTopButtonVisible={visible} />
        <SignUp
          userType={userType}
          setUserType={setUserType}
          open={openSignUp}
          setOpenLogin={setOpenLogin}
          onClose={() => {
            setOpenSignUp(false);
          }}
        />
        <Login
          open={openLogin}
          setOpenSignUp={setOpenSignUp}
          onClose={() => {
            setOpenLogin(false);
          }}
        />

        {/* <Popup open={true} onClose={() => {}} hideTitle maxWidth="sm">
          <FeedbackForm />
        </Popup> */}
      </div>
    </>
  );
}
