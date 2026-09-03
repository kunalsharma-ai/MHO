"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { Close, Paid, Poll, Star, Verified } from "@mui/icons-material";

const MotionPaper = motion.create(Paper);

const names = [
  // International
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Sofia",
  "Lucas",
  "Mia",
  "Ethan",
  "Amelia",
  "Oliver",
  "Chloe",
  "Mateo",
  "Isabella",
  "Leo",
  "Elena",
  "Daniel",
  "Ava",
  "James",
  "Camila",
  "Alexander",
  "Luna",
  "Theo",
  "Nora",
  "Max",
  "Clara",
  "Julian",
  "Layla",
  "Oscar",
  "Maya",
  "Adrian",
  "Ella",
  "Finn",
  "Alice",
  "Sebastian",
  "Ruby",
  "Gabriel",
  "Zoe",
  "Nathan",
  "Sophie",
  "Ryan",
  "Hannah",
  "David",
  "Eva",
  "Samuel",
  "Julia",
  "Michael",
  "Anna",
  "Benjamin",
  "Grace",
  "Thomas",
  "Emily",
  "Jack",
  "Maria",
  "William",
  "Sarah",
  "Alex",
  "Laura",
  "Chris",
  "Rachel",
  "Ben",
  "Kate",
  "George",
  "Samantha",
  "Matthew",
  "Lily",
  "Henry",
  "Victoria",
  "Joseph",
  "Madison",
  "Charles",
  "Scarlett",
  "Andrew",
  "Natalie",
  "Edward",
  "Lucy",
  "Robert",
  "Stella",
  "Mila",
  "Leah",
  "Adam",
  "Isla",
  "Louis",
  "Bella",

  // Indian
  "Aarav",
  "Aditi",
  "Arjun",
  "Ananya",
  "Aditya",
  "Ishita",
  "Rohan",
  "Priya",
  "Rahul",
  "Sneha",
  "Karan",
  "Pooja",
  "Vikram",
  "Neha",
  "Amit",
  "Kavya",
  "Sahil",
  "Riya",
  "Nikhil",
  "Simran",
  "Varun",
  "Meera",
  "Akash",
  "Isha",
  "Yash",
  "Shreya",
  "Manish",
  "Nisha",
  "Raj",
  "Divya",
  "Kunal",
  "Manya",
  "Abhishek",
  "Tanya",
  "Mohit",
  "Pallavi",
  "Suresh",
  "Komal",
  "Varsha",
  "Harsh",
  "Ayesha",
  "Dev",
  "Ritika",
  "Ankit",
  "Swati",
  "Vivek",
  "Tanvi",
  "Ravi",
  "Sakshi",
  "Ayush",
  "Preeti",
  "Rajat",
  "Muskan",
  "Dhruv",
  "Nandini",
  "Sameer",
  "Shivani",
  "Manav",
  "Juhi",
  "Rishabh",
  "Kritika",
  "Aman",
  "Bhavna",
  "Varsha",
  "Tarun",
  "Pallav",
  "Sonia",
  "Gaurav",
  "Shivam",
  "Payal",
  "Vishal",
  "Shruti",
  "Anmol",
  "Deepak",
  "Nikita",
  "Rohit",
  "Poonam",
];

const activityTypes = [
  {
    action: "just redeemed",
    values: ["$20", "$25", "$30"],
    description: "Reward redeemed",
    icon: Paid,
  },
  {
    action: "completed a survey and earned",
    values: [
      "750 points",
      "1,000 points",
      "1,250 points",
      "1,500 points",
      "1,800 points",
      "2,000 points",
    ],
    description: "Survey completed",
    icon: Poll,
  },
  {
    action: "just earned",
    values: [
      "500 points",
      "600 points",
      "700 points",
      "800 points",
      "900 points",
      "1,000 points",
      "1,200 points",
      "1,350 points",
    ],
    description: "Survey reward",
    icon: Star,
  },
];

const DISPLAY_TIME = 7000;
const QUEUE_SIZE = 25;

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getInitialDelay = () => randomDelay(4000, 10000);

const getBetweenDelay = () => randomDelay(8000, 20000);

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateActivity = () => {
  const person = randomItem(names);
  const activity = randomItem(activityTypes);
  const value = randomItem(activity.values);

  return {
    name: person,
    action: activity.action,
    value,
    description: activity.description,
    icon: activity.icon,
  };
};

const generateQueue = (count = QUEUE_SIZE) => {
  const queue = [];
  const used = new Set();

  while (queue.length < count) {
    const activity = generateActivity();

    const key = `${activity.name}-${activity.action}-${activity.value}`;

    if (!used.has(key)) {
      used.add(key);
      queue.push(activity);
    }
  }

  return queue;
};
export default function RecentActivityPopup({ ToTopButtonVisible }) {
  const pathname = usePathname();

  const [activityQueue, setActivityQueue] = useState(() => generateQueue());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    let showTimer;
    let hideTimer;
    let nextTimer;

    const showActivity = () => {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        nextTimer = setTimeout(() => {
          setCurrentIndex((prev) => {
            const nextIndex = prev + 1;
            if (nextIndex >= activityQueue.length) {
              setActivityQueue(generateQueue());
              return 0;
            }
            return nextIndex;
          });
          showActivity();
        }, getBetweenDelay());
      }, DISPLAY_TIME);
    };
    showTimer = setTimeout(showActivity, getInitialDelay());
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [pathname, activityQueue.length]);

  if (pathname !== "/") {
    return null;
  }

  const current = activityQueue[currentIndex];

  if (!current) {
    return null;
  }

  const ActivityIcon = current.icon;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <MotionPaper
          key={`${current.name}-${current.action}-${current.value}`}
          elevation={0}
          initial={{
            opacity: 0,
            x: -80,
            y: 25,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -80,
            y: 25,
            scale: 0.94,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.8,
          }}
          sx={{
            position: "fixed",
            left: {
              xs: 12,
              sm: ToTopButtonVisible ? 74 : 14,
            },
            bottom: {
              xs: 12,
              sm: 14,
            },
            width: {
              xs: "calc(100vw - 24px)",
              sm: 380,
            },
            maxWidth: "380px",
            zIndex: 999,
            overflow: "hidden",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F7FBFF 100%)",
            border: "1px solid rgba(13, 92, 199, 0.14)",
            boxShadow:
              "0 16px 45px rgba(13, 92, 199, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -45,
              right: -35,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,122,0,0.16) 0%, rgba(255,122,0,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: -55,
              left: -45,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(13,92,199,0.10) 0%, rgba(13,92,199,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.75,
              pr: 1.25,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background:
                      "linear-gradient(135deg, #0D5CC7 0%, #0A4DA5 100%)",
                    color: "#fff",
                    boxShadow: "0 6px 18px rgba(13, 92, 199, 0.28)",
                  }}
                >
                  <ActivityIcon sx={{ fontSize: 24 }} />
                </Avatar>
              </motion.div>

              <Box
                sx={{
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  width: 17,
                  height: 17,
                  borderRadius: "50%",
                  backgroundColor: "#FF7A00",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Verified
                  sx={{
                    fontSize: 11,
                    color: "#fff",
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  mb: 0.4,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#FF7A00",
                    boxShadow: "0 0 0 4px rgba(255,122,0,0.10)",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 10.5,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "0.8px",
                    color: "#0D5CC7",
                    textTransform: "uppercase",
                  }}
                >
                  Live activity
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "#263238",
                  fontWeight: 500,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  {current.name}
                </Box>{" "}
                {current.action}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mt: 0.6,
                  px: 1,
                  py: 0.35,
                  borderRadius: "6px",
                  backgroundColor: "#FFF4E8",
                  border: "1px solid rgba(255,122,0,0.16)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#E66400",
                    lineHeight: 1.2,
                  }}
                >
                  {current.value}
                </Typography>
              </Box>
            </Box>

            <IconButton
              onClick={() => setVisible(false)}
              size="small"
              sx={{
                alignSelf: "flex-start",
                mt: -0.5,
                color: "#9AA5B1",
                "&:hover": {
                  color: "#0D5CC7",
                  backgroundColor: "#EAF3FF",
                },
              }}
            >
              <Close sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              height: 3,
              backgroundColor: "#EAF3FF",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                duration: DISPLAY_TIME / 1000,
                ease: "linear",
              }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #0D5CC7 0%, #FF7A00 100%)",
                borderRadius: "0 3px 3px 0",
              }}
            />
          </Box>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
