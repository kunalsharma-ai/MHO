import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D5CC7",
      light: "#EAF3FF",
      dark: "#0A4DA5",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FF7A00",
      light: "#FFD199",
      dark: "#E66400",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1A2B49",
      secondary: "#5F6C7B",
    },

    divider: "#E5EAF2",

    page: {
      main: "#f4f4f4",
    },

    card: {
      main: "#ffffff",
    },
    cardbg: {
      main: "#EAF3FF", // #FFE4CC
    },
    cardtext: {
      main: "#001B66",
    },
  },
  // palette: {
  //   primary: {
  //     main: "#59AC77",
  //   },
  //   secondary: {
  //     main: "#06923E",
  //   },
  //   page: {
  //     main: "#f4f4f4",
  //   },
  //   card: {
  //     main: "#ffffff",
  //   },
  //   cardbg: {
  //     main: "#dffff1", // "#c2f5d7"// "#c6e3f4"  //   "#8cb2f333",
  //   },
  // },
  typography: {
    color: "black",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 14,
          color: "black",
          fontWeight: 500,
        },
        '[role="presentation"].MuiPopover-root': {
          zIndex: 15000,
        },
        ".MuiTooltip-arrow::before": {
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxSizing: "border-box",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#E66400 transparent",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#E66400",
          borderRadius: "8px",
          border: "2px solid transparent",
          backgroundClip: "content-box",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#FFD199",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        shrink: {
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 13,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "14px",
          "&.Mui-selected": {
            color: "#0D5CC7",
          },
        },
        indicator: {
          backgroundColor: "#0D5CC7",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "secondary.main",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
            color: "primary.main",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 13,
          fontWeight: "500",
          border: "1px solid #ccc",
          borderRadius: 4,
          background: "#EAF3FF",
          color: "black",
          px: 3,
          py: 5,
          whiteSpace: "normal",
          hyphens: "auto",
          maxWidth: 350,
        },
        arrow: {
          color: "#EAF3FF",
        },
      },
      defaultProps: {
        arrow: true,
        enterTouchDelay: 10,
        leaveTouchDelay: 3000,
        PopperProps: {
          modifiers: [
            {
              name: "zIndex",
              enabled: true,
              phase: "write",
              fn: ({ state }) => {
                state.styles.popper.zIndex = 9999;
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
