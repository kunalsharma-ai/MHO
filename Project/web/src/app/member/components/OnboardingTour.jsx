<<<<<<< HEAD
"use client";
import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { api, loadData } from "@/util";

const MotionPaper = motion.create(Paper);

const STORAGE_KEY = "mho_dashboard_tour_seen";

export function resetOnboardingTour() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function OnboardingTour() {
  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [rect, setRect] = React.useState(null);
  const [steps, setSteps] = React.useState([]);

  const currentStep = steps[stepIndex];

  
  React.useEffect(() => {
    loadData(
        api.get(`/data/tour.json`),
       async resp=>{
            if(resp instanceof Array)
            setSteps(resp??[])
        }
    )
    // fetch(TOUR_JSON_PATH)
    //   .then((res) => res.json())
    //   .then((data) => setSteps(Array.isArray(data) ? data : []))
    //   .catch((err) => {
    //     console.error("OnboardingTour: tour.json load nahi ho paayi", err);
    //   });
  }, []);

  
  React.useEffect(() => {
    if (steps.length === 0) return;
    setMounted(true);
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      const timer = setTimeout(() => setActive(true), 700);
      return () => clearTimeout(timer);
    }
  }, [steps]);

  
  const updateRect = React.useCallback(() => {
    if (!currentStep) return;
    const el = document.querySelector(currentStep.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      
      setTimeout(() => {
        const r = el.getBoundingClientRect();
        setRect(r);
      }, 250);
    } else {
      
      console.warn(
        `OnboardingTour: target "${currentStep.target}" not found on page. Check ki iss element pe data-tour attribute add hai ya nahi.`,
      );
      setRect(null);
    }
  }, [currentStep]);

  React.useEffect(() => {
    if (!active) return;
    updateRect();

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [active, updateRect]);

  const endTour = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setActive(false);
    setStepIndex(0);
  };

  const handleNext = () => {
    if (stepIndex === steps.length - 1) {
      endTour();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    setStepIndex((i) => Math.max(0, i - 1));
  };

  if (!mounted || !active || steps.length === 0) return null;

  const padding = 8;
  const highlightBox = rect
    ? {
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      }
    : null;

 
  const tooltipWidth = 340;
  let tooltipTop, tooltipLeft;

  if (highlightBox) {
    tooltipTop = highlightBox.top + highlightBox.height + 16;
    tooltipLeft = Math.min(
      Math.max(highlightBox.left, 16),
      window.innerWidth - tooltipWidth - 16,
    );
    if (tooltipTop + 200 > window.innerHeight) {

      tooltipTop = Math.max(highlightBox.top - 210, 16);
    }
  } else {
    tooltipTop = window.innerHeight / 2 - 100;
    tooltipLeft = window.innerWidth / 2 - tooltipWidth / 2;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
      }}
    >
      
      <Box
        onClick={endTour}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(15, 23, 42, 0.6)",
          transition: "clip-path 0.3s ease",
          clipPath: highlightBox
            ? `polygon(
                0% 0%, 0% 100%, ${highlightBox.left}px 100%,
                ${highlightBox.left}px ${highlightBox.top}px,
                ${highlightBox.left + highlightBox.width}px ${highlightBox.top}px,
                ${highlightBox.left + highlightBox.width}px ${highlightBox.top + highlightBox.height}px,
                ${highlightBox.left}px ${highlightBox.top + highlightBox.height}px,
                ${highlightBox.left}px 100%, 100% 100%, 100% 0%
              )`
            : "none",
        }}
      />

      
      {highlightBox && (
        <motion.div
          style={{
            position: "fixed",
            top: highlightBox.top,
            left: highlightBox.left,
            width: highlightBox.width,
            height: highlightBox.height,
            borderRadius: "12px",
            border: "2px solid #0c5adb",
            pointerEvents: "none",
          }}
          animate={{
            boxShadow: [
              "0 0 0 4px rgba(12, 90, 219, 0.22)",
              "0 0 0 9px rgba(12, 90, 219, 0.08)",
              "0 0 0 4px rgba(12, 90, 219, 0.22)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      
      <MotionPaper
        elevation={0}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{
          opacity: 1,
          y: [0, -6, 0],
          scale: 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", stiffness: 260, damping: 20 },
          y: {
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        sx={{
          position: "fixed",
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          maxWidth: "calc(100vw - 32px)",
          p: 2.5,
          borderRadius: "16px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(245,249,255,0.92) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow:
            "0 20px 45px rgba(12, 90, 219, 0.18), 0 4px 12px rgba(0,0,0,0.06)",
          transition: "top 0.35s ease, left 0.35s ease",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "primary.main" }}>
                {currentStep.title}
              </Typography>
              <IconButton size="small" onClick={endTour} sx={{ mt: -0.5, mr: -1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.6, mb: 2.5 }}>
              {currentStep.content}
            </Typography>
          </motion.div>
        </AnimatePresence>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" gap={0.6}>
            {steps.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: i === stepIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 4,
                  bgcolor: i === stepIndex ? "primary.main" : "rgba(12,90,219,0.2)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          <Box display="flex" gap={1}>
            <Button size="small" onClick={endTour} sx={{ textTransform: "none", color: "text.secondary" }}>
              Skip
            </Button>
            {stepIndex > 0 && (
              <Button size="small" onClick={handleBack} sx={{ textTransform: "none" }}>
                Back
              </Button>
            )}
            <Button
              size="small"
              variant="contained"
              onClick={handleNext}
              disableElevation
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 600,
                boxShadow: "0 8px 18px rgba(12, 90, 219, 0.35)",
              }}
            >
              {stepIndex === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </MotionPaper>
    </Box>
  );
=======
"use client";
import { Joyride } from "react-joyride";
import useOnboardingTour from "@/hooks/useOnboardingTour";


const JOYRIDE_OPTIONS = {
  primaryColor: "#0c5adb",
  textColor: "#1a1a1a",
  overlayColor: "rgba(15, 23, 42, 0.6)",
  zIndex: 10000,
  spotlightPadding: 8,
  
  showProgress: false,
  buttons: ["back", "primary", "skip"],
  skipBeacon: true,
  overlayClickAction: "close",
};

const JOYRIDE_STYLES = {
  tooltip: {
    borderRadius: 16,
    padding: 20,
  },
  tooltipTitle: {
    fontWeight: 700,
    fontSize: 16,
  },
  tooltipContent: {
    fontSize: 14,
    lineHeight: 1.6,
    padding: "8px 0",
  },
  // Renamed from `buttonNext` in v2.
  buttonPrimary: {
    borderRadius: 8,
    fontWeight: 600,
    padding: "8px 14px",
  },
  buttonBack: {
    marginRight: 8,
  },
};

export default function OnboardingTour({ member, userName = "", greeting = "" }) {
  const { run, steps, handleJoyrideCallback , isLastRouteInTour} = useOnboardingTour({
    member,
    userName,
    greeting,
  });

  if (steps.length === 0) return null;

  const locale = {
    back: "Back",
    close: "Close",
    skip: "Skip",
    next: "Next",
    last: isLastRouteInTour? "Finish" : "Next",
  };

  return (
    <Joyride
      run={run}
      steps={steps}
      callback={e=>{
        console.log("something is happening");
        handleJoyrideCallback(e)}}
      
      continuous
      options={JOYRIDE_OPTIONS}
      styles={JOYRIDE_STYLES}
      locale={locale}
    />
  );
>>>>>>> f3c065e142630c709283c18b9f77e9afd4a0b15d
}