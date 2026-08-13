"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#ff4d4f",
  "#faad14",
  "#52c41a",
  "#1677ff",
  "#722ed1",
  "#eb2f96",
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ trigger, count = 120, duration = 2.8 }) {
  const [pieces, setPieces] = React.useState([]);

  React.useEffect(() => {
    if (!trigger) return;

    const confetti = Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: random(6, 12),
      left: random(35, 65),
      x: random(-350, 350),
      y: random(-450, -150),
      rotate: random(-720, 720),
      delay: random(0, 0.25),
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }));

    setPieces(confetti);

    const timer = setTimeout(
      () => {
        setPieces([]);
      },
      duration * 1000 + 500,
    );

    return () => clearTimeout(timer);
  }, [trigger, count, duration]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: piece.x,
              y: piece.y + 900,
              rotate: piece.rotate,
              opacity: 0,
              scale: [0, 1, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration,
              delay: piece.delay,
              ease: [0.15, 0.8, 0.2, 1],
            }}
            style={{
              position: "absolute",
              left: `${piece.left}%`,
              top: "45%",
              width: piece.size,
              height: piece.size,
              background: piece.color,
              borderRadius: piece.shape === "circle" ? "50%" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
}
