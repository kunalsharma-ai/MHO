"use client";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Snackbar,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  Tooltip,
  Tabs,
  Tab,
  Fade,
  Collapse,
  Rating,
  Stack,
  Card,
  CardContent,
  TextField,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarIcon from "@mui/icons-material/Star";
import CakeIcon from "@mui/icons-material/Cake";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { Datatable, Form } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import PopUp from "@/componentsMHO/PopUp";
import { api, loadData, Page } from "@/util";
import DataList from "@/componentsMHO/DataList";
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import { useTourActive } from "@/Context/tourStore";
import mockRewardsProcessed from "@/mockData/rewardProcessed";
import MyAccountPoints from "../../components/MyAccountPoints";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RedeemIcon from "@mui/icons-material/Redeem";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
const paymentMethods = {
  paypal: "/images/payment/paypal.png",
  "wire-transfer": "/images/payment/wire-transfer.png",
  "amazon-gift-card": "/images/payment/amazone.png",
  upi: "/images/payment/upi.png",
  "healthcare-report": "/images/payment/healthcare-report.png",
};

const iconStyle = {
  color: "#fff",
  verticalAlign: "middle",
  ml: 1,
  mb: 0.5,
  fontSize: 24,
};

const getGenderIcon = (gender) => {
  switch (gender) {
    case "Male":
      return (
        <Tooltip title="Male" placement="top">
          <MaleIcon sx={iconStyle} />
        </Tooltip>
      );
    case "Female":
      return (
        <Tooltip title="Female" placement="top">
          <FemaleIcon sx={iconStyle} />
        </Tooltip>
      );
    case "Other":
      return (
        <Tooltip title="Others" placement="top">
          <PersonIcon sx={iconStyle} />
        </Tooltip>
      );
    default:
      return null;
  }
};

const getAge = (age) => {
  if (!age) return "";
  const { years = 0, month = 0, day = 0 } = age;
  return month > 0 || day > 0 ? years + 1 : years;
};

export default function page() {
  const user = useMember();

  return (
    <Grid
      container
      size={12}
      py={2}
      px={{ xs: 2, md: 3 }}
      sx={{ border: `1px solid #e0e0e0` }}
      spacing={2}
    >
      <Grid container size={{ xs: 12, md: 6, xl: 3 }} alignSelf={"flex-start"}>
        <UserInfo user={user} />
      </Grid>

      <Grid container size={{ xs: 12, md: 6, xl: 9 }} alignContent="flex-start">
        <MyAccountPoints />
        <Stats user={user} />
        <Summary />
      </Grid>
    </Grid>
  );
}

function Stats() {
  const [statistics, setStatistics] = React.useState({});

  React.useEffect(() => {
    api
      .get(`/api/v1/me/statistics`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);

        setStatistics(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const stats = [
    // {
    //   title: "Current Rewards",
    //   value: `${statistics?.totalRewards ?? 0} pts`,
    //   subtitle: "Available reward balance",
    //   icon: "/images/myaccount/currentreward.png",
    //   bg: "rgba(255, 152, 0, 0.12)",
    // },
    {
    title: "Claimed Rewards",
    value: `0 pts`,
    subtitle: "Rewards already redeemed",
    Icon: RedeemIcon,
    color: "#4CAF50",
    bg: "rgba(76, 175, 80, 0.12)",
  },
  {
    title: "Total Rewards Earned",
    value: `${statistics?.totalRewards ?? 0} pts`,
    subtitle: "Lifetime reward earnings",
    Icon: EmojiEventsIcon,
    color: "#FFA000",
    bg: "rgba(255, 193, 7, 0.12)",
  },
  {
    title: "Total Surveys Taken",
    value: (statistics?.total ?? 0).toLocaleString("en-US"),
    subtitle: "All survey attempts",
    Icon: AssignmentIcon,
    color: "#2196F3",
    bg: "rgba(33, 150, 243, 0.12)",
  },
  {
    title: "Completed Surveys",
    value: (statistics?.complete ?? 0).toLocaleString("en-US"),
    subtitle: "Successfully completed",
    Icon: AssignmentTurnedInIcon,
    color: "#4CAF50",
    bg: "rgba(76, 175, 80, 0.12)",
  },
  {
    title: "Disqualified Surveys",
    value: (statistics?.disqualified ?? 0).toLocaleString("en-US"),
    subtitle: "Screened out surveys",
    Icon: PersonOffIcon,
    color: "#F44336",
    bg: "rgba(244, 67, 54, 0.12)",
  },
  {
    title: "Abandoned Surveys",
    value: (statistics?.abdoned ?? 0).toLocaleString("en-US"),
    subtitle: "Surveys not completed",
    Icon: ExitToAppIcon,
    color: "#757575",
    bg: "rgba(158, 158, 158, 0.12)",
  },
  {
    title: "Approved Surveys",
    value: (statistics?.approved ?? 0).toLocaleString("en-US"),
    subtitle: "Approved responses",
    Icon: VerifiedIcon,
    color: "#009688",
    bg: "rgba(0, 150, 136, 0.12)",
  },
  {
    title: "Rejected Surveys",
    value: (statistics?.rejected ?? 0).toLocaleString("en-US"),
    subtitle: "Rejected responses",
    Icon: CancelIcon,
    color: "#E91E63",
    bg: "rgba(233, 30, 99, 0.12)",
  },
  ];

  return (
    <Grid container spacing={2} my={2} data-tour="myaccount-stats-cards">
      {stats.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            xl: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    flexShrink: 0,
                    borderRadius: "50%",
                    bgcolor: item.bg,
                  }}
                >
                  <item.Icon sx={{ fontSize: 34, color: item.color }} />
                </Avatar>

                <Box flex={1} minWidth={0}>
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight={600}
                    mb={1}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function UserInfo({ user }) {
  const form = useForm();

  const [visibleFields, setVisibleFields] = React.useState({});
  const [editingField, setEditingField] = React.useState(null);
  const [alternateContact, setAlternateContact] = React.useState({ email: "", phone: "" });
  const toggleField = (index) => {
    setVisibleFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maskValue = (value) => {
    return value ? "xxxxxx" : "";
  };
  const handleAlternateChange = (field) => (e) => {
    setAlternateContact((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAlternateEdit = (field) => setEditingField(field);

  const handleAlternateCancel = (field) => {
    setAlternateContact((prev) => ({
      ...prev,
      [field]: user?.[field === "email" ? "alternate-email" : "alternate-phone"] || "",
    }));
    setEditingField(null);
  };

  const handleAlternateDone = async (field) => {
    const fieldName = field === "email" ? "alternate-email" : "alternate-phone";
    const value = alternateContact[field];
    try {
      const resp = await api.patch(`/api/v1/me/answer`, { [fieldName]: value });
      useToast(resp);

      const alterResp = await api.post(`/api/v1/me`, {
        questions: ["alternate-email", "alternate-phone"],
      });
      user.update(alterResp.data);
      setEditingField(null);
    } catch (error) {
      console.error(`Failed to update ${fieldName}:`, error);
    }
  };

  React.useEffect(() => {
    if (!user) return;

    form.reset({
      profilePicture: user.profilePicture ?? "/images/logo/user.png",
    });
    const alternateEmail =
  user?.["alternate-email"] &&
  user["alternate-email"] !== user?.mail
    ? user["alternate-email"]
    : "";

setAlternateContact({
  email: alternateEmail,
  phone: user?.["alternate-phone"] || "",
});
  }, [user]);

  const rating =
    user?.qualityScoreTotal > 0
      ? Math.round(
          ((user?.qualityScore ?? 0) / user.qualityScoreTotal) * 5 * 2,
        ) / 2
      : 0;

  const userData = [
    {
      type: "view",
      icon: <CakeIcon sx={{ fontSize: 18 }} />,
      label: "Birth Date",
      value: `${new Date(user?.dob).showDate()} (${getAge(user?.age)} yrs)`,
    },
    {
      type: "view",
      icon: <EventNoteIcon sx={{ fontSize: 18 }} />,
      label: "Joined on",
      value: new Date(user?.createdAt).showDate(),
    },
    {
      type: "view",
      truncate: true,
      icon: <EmailIcon sx={{ fontSize: 18 }} />,
      label: "Email",
      value: user?.mail,
    },
    {
      type: "edit",
      field: "email",
      icon: <EmailIcon sx={{ fontSize: 18 }} />,
      label: "Alternate Email",
      value: alternateContact.email,
      placeholder: "Enter alternate email",
    },
    {
      type: "view",
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
      label: "Mobile",
      value: `+${user?.phone}`,
    },
    {
      type: "edit",
      field: "phone",
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
      label: "Alternate Mobile",
      value: alternateContact.phone,
      placeholder: "Enter alternate phone",
    },
  ];

  return (
    <Grid
      size={12}
      container
      p={2.5}
      spacing={1}
      alignItems={"center"}
      alignContent={"flex-start"}
      alignSelf={{ md: "flex-start", xl: "stretch" }}
      justifyContent={"space-between"}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 5,
        background: `
linear-gradient(
180deg,
#ffffff 0%,
#fafcff 60%,
#f4f8ff 100%
)
`,
        border: "1px solid rgba(0,27,102,.12)",
        boxShadow: "0 12px 40px rgba(0,27,102,.08)",
        color: "#24324B",
      }}
    >
      {/* Decorative Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `
      linear-gradient(120deg, transparent 0%, transparent 48%, #0A47C9 49%, transparent 50%),
      linear-gradient(60deg, transparent 0%, transparent 48%, #001B66 49%, transparent 50%)
    `,
          backgroundSize: "220px 220px",
          pointerEvents: "none",
        }}
      />

      {/* Top Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -90,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,27,102,.45) 0%, rgba(10,71,201,.18) 55%, transparent 100%)",
          filter: "blur(70px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -120,
          left: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,55,166,.28) 0%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <Grid
        size={12}
        container
        component="form"
        onSubmit={form.handleSubmit(async (e) => {
          e.preventDefault();
          console.log(e);
        })}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems={"center"}
        pb={1.5}
        spacing={0}
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Profile Image */}
        <Grid
          size={12}
          position={"relative"}
          container
          justifyContent="center"
          alignItems="center"
          p={1}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "50%",
            }}
          >
            <Form.Upload
              form={form}
              name="profilePicture"
              tooltipTitle={"Profile Picture"}
              endpoint="/api/v1/upload/image"
              accept={"image/*"}
              hideCaption={true}
              sx={{
                height: "130px",
                width: "130px",
                borderRadius: "50%",
                border: `3px solid rgba(255,255,255,0.9)`,
                background: "#fff",
              }}
              containerSx={{
                alignItems: "center",
              }}
              onUpload={async () => {
                const updatedValue = form.watch();

                let temp = await api.put("/api/v1/me", updatedValue);

                useToast(temp);

                user.Reload();
              }}
            />
          </Box>
        </Grid>

        {/* User Info */}
        <Grid
          size={12}
          container
          direction="column"
          alignItems={"center"}
          spacing={0}
        >
          <Box display={"flex"} alignItems="center" gap={0.5}>
            <Typography
              fontSize={26}
              fontWeight={700}
              sx={{
                color: "#001B66",
                textShadow: "0 1px 2px rgba(255,255,255,.35)",
                textAlign: "center",
              }}
            >
              {user?.fullName}
            </Typography>

            {getGenderIcon(user?.gender)}
          </Box>

          {user?.isMinor && (
            <>
              <Box display={"flex"} alignItems="center" mt={1}>
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                  }}
                >
                  {user?.parent?.name?.first}

                  {user?.parent?.relation && (
                    <span
                      style={{
                        paddingLeft: "0.5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      [{user?.parent?.relation}]
                    </span>
                  )}
                </Typography>
              </Box>

              <Typography
                fontWeight={600}
                fontSize={12}
                sx={{
                  color: "primary.main",
                }}
              >
                {user?.parent?.email}
              </Typography>
            </>
          )}

          <Rating
            name="account-rating"
            value={rating}
            precision={0.5}
            readOnly
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.28 }} fontSize="inherit" />
            }
            sx={{
              pt: 0.5,
              pb: 2,
              "& .MuiRating-iconFilled": {
                color: "#FFD54F",
              },
            }}
          />
        </Grid>

        {/* User Data */}
        <Grid
          size={12}
          container
          spacing={1.6}
          justifyContent="flex-start"
          direction={"column"}
          alignItems="center"
          data-tour="myaccount-profile-info"
        >
          {userData.map((item, index) => {
            const isEdit = item.type === "edit";
            const isEditing = isEdit && editingField === item.field;
            const isEmailField = item.field === "email" || item.label === "Email";
            const isPhoneField = item.field === "phone" || item.label === "Mobile";
            return (
              <Grid
                key={index}
                size={12}
                container
                alignItems="flex-start"
                spacing={0}
                sx={{
                  background: "linear-gradient(180deg,#FFFFFF 0%,#F7FAFF 100%)",
                  border: "1px solid #E5EDF8",
                  backdropFilter: "blur(10px)",
                  borderRadius: "14px",
                  px: 1.5,
                  py: 1.2,
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    mr: 1.2,
                    display: "flex",
                    alignItems: "center",
                    color: "secondary.main",
                    pt: 0.2,
                  }}
                >
                  {item.icon}
                </Box>

                {/* Main content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* FIRST LINE */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    {/* Label */}
                    <Typography
                      sx={{
                        color: "#24324B",
                        pr: 0.5,
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}:
                    </Typography>

                    {/* Value */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {isEmailField && (item.truncate || isEdit) && visibleFields[index] ? (
                        <Tooltip title={item.value || ""} placement="top">
                          <Typography
                            component="span"
                            noWrap
                            sx={{
                              color: "#24324B",
                              fontWeight: 600,
                              flex: 1,
                              fontSize: 13,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              minWidth: 0,
                            }}
                          >
                            {item.value?.length > 12
                              ? item.value.slice(0, 12) + "..."
                              : item.value || "Not added"}
                          </Typography>
                        </Tooltip>
                      ) : isPhoneField && visibleFields[index] ? (
                        <Tooltip title={item.value || ""} placement="top">
                          <Typography
                            component="span"
                            noWrap
                            sx={{
                              color: "#24324B",
                              fontWeight: 600,
                              flex: 1,
                              fontSize: 13,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              minWidth: 0,
                            }}
                          >
                            {item.value
                              ? `...${item.value.slice(-4)}`
                              : "Not added"}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <Typography
                          component="span"
                          noWrap
                          sx={{
                            color: "#24324B",
                            fontWeight: 600,
                            flex: 1,
                            fontSize: 13,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            minWidth: 0,
                          }}
                        >
                          {isEdit
                            ? visibleFields[index]
                              ? item.value || "Not added"
                              : "xxxxxx"
                            : visibleFields[index]
                            ? item.value
                            : maskValue(item.value)}
                        </Typography>
                      )}

                      {/* Edit icon */}
                      {!isEditing && isEdit && visibleFields[index] && (
                        <IconButton
                          size="small"
                          onClick={() => handleAlternateEdit(item.field)}
                          sx={{
                            color: "secondary.dark",
                            ml: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}

                      {/* Eye icon - ALWAYS FIRST LINE */}
                      {!isEditing && (
                        <IconButton
                          size="small"
                          onClick={() => toggleField(index)}
                          sx={{
                            color: "primary.main",
                            ml: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          {visibleFields[index] ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  {/* SECOND LINE - ONLY WHEN EDITING */}
                  {isEditing && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        mt: 0.5,
                      }}
                    >
                      <TextField
                        fullWidth
                        autoFocus
                        variant="standard"
                        value={alternateContact[item.field]}
                        onChange={handleAlternateChange(item.field)}
                        placeholder={item.placeholder}
                        size="small"
                        InputProps={{
                          disableUnderline: false,
                        }}
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          "& .MuiInputBase-input": {
                            color: "#24324B",
                            fontSize: 13,
                          },
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "rgba(0,27,102,.3)",
                          },
                          "& .MuiInput-underline:hover:before": {
                            borderBottomColor: "secondary.main",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "secondary.main",
                          },
                        }}
                      />

                      {/* Tick */}
                      <IconButton
                        size="small"
                        onClick={() => handleAlternateDone(item.field)}
                        sx={{
                          color: "success.main",
                          ml: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>

                      {/* Cross */}
                      <IconButton
                        size="small"
                        onClick={() => handleAlternateCancel(item.field)}
                        sx={{
                          color: "error.main",
                          ml: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {/* Payment Section */}
      <Box
        data-tour="myaccount-payment"
        sx={{
          width: "100%",
          px: 2,
          borderRadius: "18px",
          background: "#fff",
          border: "1px solid #E5EDF8",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Payment />
      </Box>

      {/* Social Section */}
      <Box
        data-tour="myaccount-social"
        sx={{
          width: "100%",
          px: 2,
          pb: 1,
          borderRadius: "18px",
          background: "#fff",
          border: "1px solid #E5EDF8",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SocialAccounts user={user} />
      </Box>
    </Grid>
  );
}


const methodFieldsConfig = {
  "wire-transfer": [
    { key: "bankName", label: "Bank", placeholder: "Enter bank name" },
    { key: "ifsc", label: "IFSC/IBAN/SWIFT", placeholder: "Enter IFSC/IBAN/SWIFT code" },
    { key: "bankAccount", label: "Account Number", placeholder: "Enter account number" },
  ],
  upi: [
    { key: "upiAccount", label: "VPA", placeholder: "Enter UPI ID" },
  ],
  paypal: [
    { key: "paypalAccount", label: "PayPal Email", placeholder: "Enter PayPal email" },
  ],
  "amazon-gift-card": [
    { key: "amazonAccount", label: "Amazon ID", placeholder: "Enter Amazon Giftcard ID" },
  ],
  "healthcare-report": [
    { key: "healthcareReportAccount", label: "Healthcare Report ID", placeholder: "Enter Healthcare Report ID" },
  ],
};

const memberKeyMap = {
  bankName: "payment-method-bank-name",
  ifsc: "payment-method-bank-ifsc",
  bankAccount: "payment-method-bank-account",
  upiAccount: "payment-method-upi",
  paypalAccount: "payment-method-paypal",
  amazonAccount: "payment-method-amazon",
  healthcareReportAccount: "payment-method-healthcare-report",
};

// saved data (member) ke basis par, draft ke basis par nahi
const isMethodComplete = (member, methodValue) => {
  const fields = methodFieldsConfig[methodValue] || [];
  return (
    fields.length > 0 &&
    fields.every((f) => member?.[memberKeyMap[f.key]]?.toString().trim())
  );
};
const hasSavedData = (member, methodValue) =>
  (methodFieldsConfig[methodValue] || []).some((f) =>
    member?.[memberKeyMap[f.key]]?.toString().trim(),
  );

function Payment() {
  const [paymentOptions, setPaymentOptions] = React.useState([]);

  const [payment, setPayment] = React.useState({});
  const [expandedMethod, setExpandedMethod] = React.useState(false);
  const [editingMethod, setEditingMethod] = React.useState(null);
  const [editBackup, setEditBackup] = React.useState({});
  const [primaryMethod, setPrimaryMethod] = React.useState(null);
  const autoSavedRef = React.useRef(false);
  const [primaryAlert, setPrimaryAlert] = React.useState({
  open: false,
  message: "",
});
const [primaryHint, setPrimaryHint] = React.useState(null);
const hintTimerRef = React.useRef(null);
  const member = useMember();
  React.useEffect(() => {
    loadData(
      api.get(`/api/v1/option/payment-method`),
      (resp) => {
        setPaymentOptions(resp.data);
      },
      () => {},
    );
  }, []);

 React.useEffect(() => {
  if (!member) return;

  setPayment({
    method: member["payment-method"],
    ifsc: member["payment-method-bank-ifsc"],
    bankAccount: member["payment-method-bank-account"],
    bankName: member["payment-method-bank-name"],
    amazonAccount: member["payment-method-amazon"],
    paypalAccount: member["payment-method-paypal"],
    upiAccount: member["payment-method-upi"],
    healthcareReportAccount: member["payment-method-healthcare-report"],
  });

  const savedPrimary = member["payment-method-primary"];
  const selected = member["payment-method"];
  const completeMethods = Object.keys(methodFieldsConfig).filter((m) =>
    isMethodComplete(member, m),
  );

  let primary = null;
  if (savedPrimary && isMethodComplete(member, savedPrimary)) {
    primary = savedPrimary;
  } else if (selected && isMethodComplete(member, selected)) {
    primary = selected;
  } else if (completeMethods.length === 1) {
    primary = completeMethods[0];
  }

  setPrimaryMethod(primary);

  // backend ko bhi sync karo (sirf ek baar), warna payout me primary missing rahega
  if (primary !== (savedPrimary || null) && !autoSavedRef.current) {
    autoSavedRef.current = true;
    api
      .patch(`/api/v1/me/answer`, { "payment-method-primary": primary || "" })
      .catch((err) => console.error("Failed to sync primary method", err));
  }
}, [member]);
  React.useEffect(() => () => clearTimeout(hintTimerRef.current), []);  

  const sortedOptions = React.useMemo(() => {
  const rank = (m) =>
    m.value === primaryMethod ? 0 : hasSavedData(member, m.value) ? 1 : 2;

  return [...paymentOptions].sort(
    (a, b) =>
      rank(a) - rank(b) ||
      String(a.label).localeCompare(String(b.label)),
  );
}, [paymentOptions, primaryMethod, member]);
  const hasData = (methodValue) => {
    const fields = methodFieldsConfig[methodValue] || [];
    return fields.some((f) => payment[f.key]?.toString().trim());
  };

  const handleFieldChange = (key) => (e) => {
    setPayment((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleAccordionChange = (methodValue) => (e, isExpanded) => {
    setExpandedMethod(isExpanded ? methodValue : false);
    if (!isExpanded) setEditingMethod(null);
  };

  const handleEditMethod = (methodValue) => {
    setEditBackup((prev) => ({
      ...prev,
      [methodValue]: { ...payment },
    }));

    setEditingMethod(methodValue);
  };

  const handleCancelEdit = (methodValue) => {
    const backup = editBackup[methodValue];

    if (backup) {
      setPayment(backup);
    }

    setEditingMethod(null);
  };

  const handleSaveMethod = async (methodValue) => {
    try {
      const resp = await api.patch(`/api/v1/me/answer`, {
        "payment-method-bank-ifsc": payment.ifsc,
        "payment-method-bank-account": payment.bankAccount,
        "payment-method-bank-name": payment.bankName,
        "payment-method-amazon": payment.amazonAccount,
        "payment-method-paypal": payment.paypalAccount,
        "payment-method-upi": payment.upiAccount,
        "payment-method-healthcare-report": payment.healthcareReportAccount,
      });
      useToast(resp);
      await member.Reload();

     if (primaryMethod === methodValue) {
  const stillFilled = (methodFieldsConfig[methodValue] || []).every((f) =>
    payment[f.key]?.toString().trim(),
  );
  if (!stillFilled) {
    setPrimaryMethod(null);
    await api.patch(`/api/v1/me/answer`, { "payment-method-primary": "" });
  }
} 
    } catch (error) {
      console.error(`Failed to update payment method ${methodValue}:`, error);
    } finally {
      setEditingMethod(null);
    }
  };

const handleSetPrimary = async (methodValue) => {
  if (methodValue === primaryMethod) return;

if (!isMethodComplete(member, methodValue)) {
  setPrimaryHint(methodValue);
  clearTimeout(hintTimerRef.current);
  hintTimerRef.current = setTimeout(() => setPrimaryHint(null), 4000);
  return;
}

  const previous = primaryMethod;
  setPrimaryMethod(methodValue);
  try {
    const resp = await api.patch(`/api/v1/me/answer`, {
      "payment-method-primary": methodValue,
    });
    useToast(resp);
    if (resp?.status === "error") setPrimaryMethod(previous);
  } catch (error) {
    setPrimaryMethod(previous); // rollback
    console.error(`Failed to set primary payment method:`, error);
  }
};

  return (
    <Grid size={12} container spacing={2} justifyContent="center">
      {/* Header */}
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        px={1}
        pt={1}
        minHeight={46}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Payment Methods
        </Typography>
      </Box>

      <Grid size={12} container spacing={1}>
        {sortedOptions.map((method, index) => {
          const methodValue = method.value;
          const isEditing = editingMethod === methodValue;
          const filled = hasData(methodValue);
          const isPrimary = primaryMethod === methodValue;
          const fields = methodFieldsConfig[methodValue] || [];

          return (
            <Grid size={12} key={method.value}>
              <Accordion
                expanded={expandedMethod === methodValue}
                onChange={handleAccordionChange(methodValue)}
                sx={{
                  background: "linear-gradient(180deg,#FFFFFF 0%,#F7FAFF 100%)",
                  border: "1px solid #E5EDF8",
                  color: "#24324B",
                  "&:before": { display: "none" },
                  borderRadius: "10px !important",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: 1,
                    }}
                  >
                    {filled && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "secondary.main",
                          flexShrink: 0,
                        }}
                      />
                    )}

                 <Box sx={{ flex: 1, minWidth: 0 }}>
  <Typography sx={{ fontWeight: 600, color: "#24324B" }}>
    {method.label}
  </Typography>

  {primaryHint === methodValue && (
    <Typography
      sx={{
        color: "error.main",
        fontSize: 12,
        fontWeight: 500,
        mt: 0.3,
        lineHeight: 1.3,
      }}
    >
      Save your details first to set as primary
    </Typography>
  )}
</Box>

                    <IconButton
                      component="span"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(methodValue);
                      }}
                      sx={{ color: isPrimary ? "#FFB300" : "action.disabled" }}
                    >
                      {isPrimary ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={1}>
                    {fields.map((f) => (
                      <Grid
                        key={f.key}
                        size={12}
                        container
                        alignItems="center"
                        spacing={0}
                        sx={{
                          background: "#F7FAFF",
                          borderRadius: "10px",
                          px: 1.5,
                          py: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {isEditing ? (
                            <TextField
                              fullWidth
                              variant="standard"
                              value={payment[f.key] || ""}
                              onChange={handleFieldChange(f.key)}
                              placeholder={f.placeholder}
                              size="small"
                              InputProps={{ disableUnderline: true }}
                              sx={{
                                flex: 1,
                                minWidth: 0,
                                "& .MuiInputBase-input": {
                                  color: "#24324B",
                                  fontSize: 13,
                                },
                              }}
                            />
                          ) : (
                            <Typography
                              component="span"
                              sx={{
                                color: "#24324B",
                                fontWeight: 600,
                                flex: 1,
                                fontSize: 13,
                              }}
                            >
                              xxxxxx
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexShrink: 0,
                              ml: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                isEditing
                                  ? handleSaveMethod(methodValue)
                                  : handleEditMethod(methodValue)
                              }
                              sx={{
                                color: isEditing
                                  ? "success.main"
                                  : "secondary.dark",
                              }}
                            >
                              {isEditing ? (
                                <CheckIcon fontSize="small" />
                              ) : (
                                <EditIcon fontSize="small" />
                              )}
                            </IconButton>

                            {isEditing && (
                              <IconButton
                                size="small"
                                onClick={() => handleCancelEdit(methodValue)}
                                sx={{
                                  color: "error.main",
                                  ml: 0.5,
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                        
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
      
    </Grid>
  );
}

function SocialAccounts({ user }) {
  const [openContact, setOpenContact] = React.useState(false);

  const [contact, setContact] = React.useState({
    whatsapp: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  });
  React.useEffect(() => {
    if (!user) return () => {};
    setContact(
      Object.fromEntries(
        Object.entries(user)
          .filter((e) => e[0].startsWith("social-media"))
          .map((d) => [d[0].replace("social-media-", ""), d[1]]),
      ),
    );
  }, [user]);

  const handleChange = (key) => (e) => {
    setContact((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const contactIcons = {
    whatsapp: <WhatsAppIcon sx={{ fontSize: 24, color: "#25D366" }} />,
    instagram: <InstagramIcon sx={{ fontSize: 24, color: "#C13584" }} />,
    facebook: <FacebookIcon sx={{ fontSize: 24, color: "#3b5998" }} />,
    linkedin: <LinkedInIcon sx={{ fontSize: 24, color: "#0e76a8" }} />,
    youtube: <YouTubeIcon sx={{ fontSize: 24, color: "#FF0000" }} />,
    x: <XIcon sx={{ fontSize: 24, color: "#000" }} />,
  };

  const socialChannels = [
    {
      name: "WhatsApp",
      key: "whatsapp",
      icon: <WhatsAppIcon sx={{ fontSize: 26, color: "#25D366" }} />,
    },
    {
      name: "Instagram",
      key: "instagram",
      icon: <InstagramIcon sx={{ fontSize: 26, color: "#C13584" }} />,
    },
    {
      name: "Facebook",
      key: "facebook",
      icon: <FacebookIcon sx={{ fontSize: 26, color: "#3b5998" }} />,
    },
    {
      name: "LinkedIn",
      key: "linkedin",
      icon: <LinkedInIcon sx={{ fontSize: 26, color: "#0e76a8" }} />,
    },
    {
      name: "YouTube",
      key: "youtube",
      icon: <YouTubeIcon sx={{ fontSize: 26, color: "#FF0000" }} />,
    },
    {
      name: "X (formerly Twitter)",
      key: "x",
      icon: <XIcon sx={{ fontSize: 26, color: "black" }} />,
    },
  ];

  return (
    <Grid size={12} container spacing={1} justifyContent="center">
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        pt={1}
        minHeight={46}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,

            color: "primary.main",
            borderBottom: (theme) =>
              `2px solid ${theme.palette.secondary.dark}`,
            pb: 0.5,
          }}
        >
          Social Contacts
        </Typography>
        {Object.values(contact).some((value) => value?.trim()) && (
          <IconButton
            onClick={() => setOpenContact(true)}
            sx={{
              // bgcolor: "secondary.light",
              color: "secondary.dark",
              border: "1px solid",
              borderColor: "secondary.light",
              "&:hover": {
                bgcolor: "secondary.main",
                color: "#fff",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Grid container size={12} spacing={1.5}>
        {Object.entries(contact).filter(([_, value]) => value?.trim())
          .length ? (
          Object.entries(contact)
            .filter(([_, value]) => value?.trim())
            .map(([key, value], index, arr) => (
              <Tooltip
                title={`${key?.Capitalize()} :  ${value}`}
                key={index}
                placement="top"
              >
                <Page.Box px={1.5}>{contactIcons[key]}</Page.Box>
              </Tooltip>
            ))
        ) : (
          <Box
            sx={{
              width: "100%",
              py: 4,
              textAlign: "center",
              borderRadius: 3,
              border: "1px dashed",
              borderColor: "divider",
              bgcolor: "grey.50",
            }}
          >
            <Typography color="text.secondary">
              No social accounts linked yet.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => setOpenContact(true)}
            >
              Add Social Accounts
            </Button>
          </Box>
        )}
      </Grid>

      <PopUp
        maxWidth="md"
        title={
          Object.values(contact).some((value) => value?.trim())
            ? "Edit Social Contacts"
            : "Add Social Contacts"
        }
        open={openContact}
        onClose={() => setOpenContact(false)}
      >
        <Grid
          size={12}
          container
          alignItems="center"
          // justifyContent="center"
          px={2}
          pt={2}
          sx={{ bgcolor: "#fff" }}
        >
          <Box px={3} pt={2} justifySelf="flex-start">
            <Typography color="text.secondary" fontSize={13}>
              Link your preferred social media accounts
            </Typography>
          </Box>
          <Grid size={12} container spacing={3} p={3} justifyContent="center">
            {socialChannels.map(({ name, key, icon }, index) => (
              <Grid key={index} container size={6} spacing={0}>
                <Page.Input
                  label={name}
                  size="normal"
                  value={contact[key]}
                  onChange={handleChange(key)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            bgcolor: "grey.100",
                          }}
                        >
                          {icon}
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              width: "100%",
              mt: 1,
              p: 3,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={async () => {
                const socials = Object.fromEntries(
                  Object.entries(contact).map((c) => [
                    `social-media-${c[0]}`,
                    c[1],
                  ]),
                );
                const resp = await api.patch(`/api/v1/me/answer`, socials);
                useToast(resp);
                setOpenContact(false);
                user.Reload();
              }}
              size="large"
              variant="contained"
              color="secondary"
              sx={{
                minWidth: 240,
                borderRadius: 10,
                fontWeight: 700,
                px: 5,
              }}
            >
              Save Chanegs
            </Button>
          </Box>
        </Grid>
      </PopUp>
    </Grid>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={1000} unmountOnExit>
      <Box hidden={value !== index} sx={{ width: "100%" }}>
        {" "}
        {value === index && children}
      </Box>
    </Fade>
  );
}

function Summary() {
  const router = useRouter();
  const [points, setPoints] = React.useState(0); //todo: set from api call
  const [conversionRate, setConversionRate] = React.useState(1); //todo: set conversion rate from api call
  const [threshold, setThreshold] = React.useState(1500); //todo: set from server config
  const tourActive = useTourActive();
  React.useEffect(() => {
    api
      .get(`/api/v1/me/points`)
      .then((resp) => {
        if (resp.status === "error") router.replace("/survey?name=welcome");
        // if (!resp.data) return useToast(resp);
        let data = resp.data;
        setPoints(data.totalPoints);
        setThreshold(data.threshold);
        setConversionRate(data.conversionRate);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);
  const rewardSummary = [
    {
      label: "Current Rewards",
      value: `${points}pts`,
    },
    {
      label: "Conversion",
      value: `$${(Number(points) * Number(conversionRate)).toFixed(2)}`,
    },
    {
      label: "Needed reward points for payout",
      value: `${threshold - points}pts`,
    },
  ];
  const [activeTab, setActiveTab] = React.useState(0);
  const [rewardsDateRange, setRewardsDateRange] = React.useState([]);
  const [rejectedDateRange, setRejectedDateRange] = React.useState([]);
 const tabs = [
    // {
    //   label: "Rewards Summary",
    //   render: (
    //     <Grid size={12}>
    //       <DataList dataList={rewardSummary} />
    //     </Grid>
    //   ),
    // },
    {
      label: "Rewards Processed Summary",
      render: (
        <Grid size={12} data-tour="myaccount-rewards-processed">
          <Datatable
            isLoading={false}
            pagination={[10, 20, 50]}
            pageSize={20}
            hideColumnSelector
            hideDownload
            noDataMsg="No Record Found."
            data={tourActive ? mockRewardsProcessed.data : []}
            extra={
            <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
              <DateRangeSelector
                onUpdate={(e) => {
                  setRewardsDateRange(
                    e.map((d) => new Date(d.toDate()).toISOString().split("T")[0]),
                  );
                }}
              />
            </Box>
          }
            columns={[
              {
                id: "claimedPoints",
                label: "Claimed Points",
                render: (info) => `${info.claimedPoints} pts`,
              },
              {
                id: "claimedAmount",
                label: "Claimed Amount",
                render: (info) => `₹${info.claimedAmount}`,
              },
              {
                id: "dateTime",
                label: "Date - Time",
                render: (info) => new Date(info.dateTime).toLocaleString(),
              },
              {
                id: "transactionId",
                label: "Transaction ID",
                render: (info) => info.transactionId,
              },
              {
                id: "paymentMethod",
                label: "Payment Method",
                render: (info) => info.paymentMethod,
              },
              {
                id: "paymentProcessedDate",
                label: "Payment Processed Date",
                render: (info) =>
                  info.paymentProcessedDate
                    ? new Date(info.paymentProcessedDate).toLocaleDateString()
                    : "-",
              },
              {
                id: "status",
                label: "Status",
                render: (info) => (
                  <span style={{ textTransform: "capitalize" }}>{info.status}</span>
                ),
              },
            ]}
          />
        </Grid>
      ),
    },
    {
      label: "Rejected Responses",
      
      render: (
        <Grid size={12} container justifyContent="center" >
          <Datatable
          hideColumnSelector
          hideDownload
            data={[]}
            extra={
            <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
              <DateRangeSelector
                onUpdate={(e) => {
                  setRewardsDateRange(
                    e.map((d) => new Date(d.toDate()).toISOString().split("T")[0]),
                  );
                }}
              />
            </Box>
          }
            columns={[
              {
                id: "survey",
                label: "Survey Name",
                render: (info) => info.survey?.name,
              },
              {
                id: "createdAt",
                label: "created At",
                render: (info) => new Date(info.createdAt).toLocaleString(),
              },
              {
                id: "points",
                label: "Points",
                render: (info) => `${info.points} pts`,
              },
              {
                id: "reason",
                label: "Reason",
                render: (info) => info.reason,
              },
              {
                id: "status",
                label: "Status",
                render: (info) => info.status,
              },
            ]}
            isLoading={false}
          />
        </Grid>
      ),
    },
  ];

  return (
    <Grid size={12} container px={1} mt={2} justifyContent="center">
      <Tabs
        value={activeTab}
        onChange={(e, v) => {
          setActiveTab(v);
        }}
        variant="fullWidth"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          borderBottom: "3px solid whitesmoke",
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
            height: "3px",
          },
          "& .MuiTab-root": {
            color: "gray",
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "primary.main !important",

            fontWeight: 600,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={activeTab} index={index}>
          {tab.render}
        </TabPanel>
      ))}
    </Grid>
  );
}
