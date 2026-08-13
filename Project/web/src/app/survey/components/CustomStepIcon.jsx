"use client";
import CheckCircle from "@mui/icons-material/CheckCircle";
export default function CustomStepIcon(props) {
  const { active, completed, className } = props;
  const stepNumber = props.icon;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: active ? "#0A4DA5" : completed ? "#0D5CC7" : "#e0e0e0",
        color: "white",
        fontWeight: active ? "bold" : "normal",
        fontSize: "12px",
      }}
    >
      {completed ? <CheckCircle sx={{ fontSize: 16 }} /> : stepNumber}
    </div>
  );
}
