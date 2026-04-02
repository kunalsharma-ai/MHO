"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Carousel({ cardsData }) {
  const visible = 4;
  const baseCardWidth = 380;
  const baseCardHeight = 240;
  const baseGap = 18;

  // Responsive state
  const [dimensions, setDimensions] = useState({
    cardWidth: baseCardWidth,
    cardHeight: baseCardHeight,
    gap: baseGap,
    width: 1200, // default SSR safe width
  });

  // Update dimensions based on viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      if (width < 900) {
        // Mobile
        const cardWidth = 320;
        setDimensions({
          cardWidth,
          cardHeight: Math.max(180, baseCardHeight * 0.6),
          gap: 8,
          width,
        });
      } else if (width < 1200) {
        // Small desktop
        const cardWidth = Math.max(320, Math.min(380, width * 0.28));
        setDimensions({
          cardWidth,
          cardHeight: Math.max(220, baseCardHeight * 0.9),
          gap: 14,
          width,
        });
      } else {
        // Large desktop
        setDimensions({
          cardWidth: baseCardWidth,
          cardHeight: baseCardHeight,
          gap: baseGap,
          width,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { cardWidth, cardHeight, gap, width } = dimensions;
  const totalCardWidth = cardWidth + gap;
  const containerWidth = visible * cardWidth + (visible - 1) * gap;

  // Duplicate cards for infinite loop
  const cards = [
    ...cardsData.slice(-visible),
    ...cardsData,
    ...cardsData.slice(0, visible),
  ];

  const [index, setIndex] = useState(visible); // start at first real card
  const [isAnimating, setIsAnimating] = useState(false);
  const [instantJump, setInstantJump] = useState(false); // disable transition when teleporting
  const timeoutRef = useRef(null);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev - 1);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset animation state when dimensions change
  useEffect(() => {
    setIsAnimating(false);
  }, [dimensions]);

  // Looping logic
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (index >= cards.length - visible) {
      // Jump to real first card without transition
      setInstantJump(true);
      setIndex(visible);
    } else if (index < visible) {
      // Jump to real last card without transition
      setInstantJump(true);
      setIndex(cards.length - visible * 2);
    }
  };

  // Responsive values derived from state
  const hoverScale = width < 600 ? 1.05 : 1.3;
  const arrowSize = width < 600 ? "small" : "medium";

  return (
    <Box
      sx={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${cardHeight}px`,
        overflow: "hidden",
        mx: "auto",
        maxWidth: "100%",
      }}
    >
      <motion.div
        animate={{ x: -index * totalCardWidth }}
        transition={
          instantJump ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }
        }
        onUpdate={() => {
          // When a frame renders after an instant jump, re-enable transitions
          if (instantJump) setInstantJump(false);
        }}
        onAnimationComplete={handleTransitionEnd}
        style={{
          display: "flex",
          gap: `${gap}px`,
          width: `${cards.length * cardWidth + (cards.length - 1) * gap}px`,
          height: `${cardHeight}px`,
        }}
      >
        {cards.map((card, i) => (
          <Box
            key={`${card.id || i}-${i}`}
            sx={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: { xs: 1.5, sm: 2 },
                overflow: "hidden",
                boxShadow: 3,
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={card.img}
                alt={card.label}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: `scale(${hoverScale})`,
                    cursor: "pointer",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0,0,0,0.7)",
                  py: { xs: 0.25, sm: 0.5 },
                }}
              >
                <Box
                  sx={{
                    color: "white",
                    px: { xs: 0.5, sm: 1 },
                    textAlign: "center",
                    fontSize: {
                      xs: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    },
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  {card.label}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </motion.div>

      <IconButton
        onClick={prev}
        aria-label="Previous"
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: -5, md: -10 },
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "transparent",
          boxShadow: 2,
          "&:hover": { bgcolor: "grey.200" },
          minWidth: { xs: "32px", sm: "40px" },
          height: { xs: "32px", sm: "40px" },
        }}
      >
        <ArrowBackIos fontSize={arrowSize} />
      </IconButton>

      <IconButton
        onClick={next}
        aria-label="Next"
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: -5, md: -10 },
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "transparent",
          boxShadow: 2,
          "&:hover": { bgcolor: "grey.200" },
          minWidth: { xs: "32px", sm: "40px" },
          height: { xs: "32px", sm: "40px" },
        }}
      >
        <ArrowForwardIos fontSize={arrowSize} />
      </IconButton>
    </Box>
  );
}
