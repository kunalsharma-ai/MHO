import { Grid } from "@mui/material";

function SectionTitle(attr) {
  const sectionHeaderStyle = {
    height: 52,
    px: 3,
    fontSize: 20,
    fontWeight: 700,
    color: attr.isDisabled ? "grey" : "primary.main",
    background: attr.isDisabled
      ? "#e4e5e6"
      : (theme) => `
      linear-gradient(
        135deg,
        ${theme.palette.secondary.light || "#EAF2FF"} 0%,
        #FFFFFF 45%,
        #F6F9FF 65%,
        ${theme.palette.secondary.light || "#EAF2FF"} 100%
      )
    `,
    borderBottom: (theme) => `1px solid ${theme.palette.secondary.light}`,
    backgroundSize: "150% 150%",
    animation: "gradientShift 12s ease infinite",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <Grid
        size={12}
        sx={{
          ...sectionHeaderStyle,
          ...attr.sx,
          display: "flex",
          alignItems: "center",
        }}
      >
        {attr.title}
        {attr.children}
      </Grid>
    </>
  );
}

export default SectionTitle;
