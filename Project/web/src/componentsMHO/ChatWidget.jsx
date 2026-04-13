"use client";

import React from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveIcon from "@mui/icons-material/Remove";

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const dummyMessages = [
  {
    id: 1,
    text: "Hello! How can I help you?",
    sender: "bot",
    name: "Support",
    timestamp: Date.now() - 60000,
  },
  {
    id: 2,
    text: "I need some info about your services.",
    sender: "me",
    name: "You",
    timestamp: Date.now() - 30000,
  },
  {
    id: 3,
    text: "Sure, what would you like to know?",
    sender: "bot",
    name: "Support",
    timestamp: Date.now(),
  },
];

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(dummyMessages);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: "me",
        name: "You",
        timestamp: Date.now(),
      },
    ]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is a demo reply.",
          sender: "bot",
          name: "Support",
          timestamp: Date.now(),
        },
      ]);
    }, 800);
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          color: "white",
        }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 320,
            height: "calc(100vh - 200px)",
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: "#04662b",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Support Chat
            </Typography>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <RemoveIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "#f5f5f5",
            }}
          >
            {messages.map((msg) => {
              const isMe = msg.sender === "me";

              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMe ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      maxWidth: "75%",
                      borderRadius: 2,
                      bgcolor: isMe ? "secondary.main" : "grey.300",
                      color: isMe ? "white" : "black",
                    }}
                  >
                    {!isMe && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          fontWeight: 600,
                          mb: 0.3,
                        }}
                      >
                        {msg.name}
                      </Typography>
                    )}

                    <Typography variant="body2">{msg.text}</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mt: 0.5,
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          lineHeight: 1,
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 600,
                          fontSize: "8px !Important",
                        }}
                      >
                        {formatTime(msg.timestamp)}{" "}
                      </Typography>
                      {isMe && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CheckIcon sx={{ fontSize: 14 }} />
                          <DoneAllIcon
                            sx={{
                              fontSize: 14,
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              p: 1,
              display: "flex",
              gap: 1,
              borderTop: "1px solid #ddd",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
