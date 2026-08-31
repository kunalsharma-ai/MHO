"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  IconButton,
  MobileStepper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import Question from "@/app/survey/components/Question";
import Survey from "@/app/survey/components/Survey";
import { api, Page } from "@/util";
import { useMember, useQuery as useQueryParameters } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

function TabLabel({ label, progress = 0, icon, selected }) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      size={12}
      sx={{
        minWidth: { xs: "calc(100vw - 190px)", sm: 300 },
        px: { xs: 0, sm: 1 },
      }}
    >
      <i className={`fas ${icon}`} alt="icon" />

      <Grid sx={{ flex: 1 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 12,
              textTransform: "capitalize",
              pr: 1,
            }}
          >
            {label}
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {progress && `${progress} %`}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            ".MuiLinearProgress-bar": {
              bgcolor: (theme) =>
                selected ? "white" : theme.palette.secondary.main,
            },
            width: "100%",
            height: 3,
            borderRadius: 1.5,
            bgcolor: (theme) =>
              selected ? "rgba(255,255,255,0.2)" : theme.palette.cardbg.main,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default function () {
  const [editMode, setEditMode] = React.useState(false);
  const [user, query, router] = [
    useMember(),
    useQueryParameters(),
    useRouter(),
  ];
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ["profiles", user?.category, editMode ? "true" : "false"],
    queryFn: () =>
      api
        .post("/api/v1/profile", { category: user.category })
        .then((r) => r.data),
    enabled: !!user?.category || !editMode,
  });
  if (profilesLoading || profiles.length === 0) return <></>;
  const activeTab = !query.profile
    ? 1
    : 1 + profiles.map((profile) => profile.slug).indexOf(query.profile);
  // if(!activeTab){
  //   router.push(`?profile=${profiles?.[0]?.slug}`, { scroll: false });
  // }
  const selectedProfile = activeTab ? profiles.at(activeTab - 1) : profiles[0];

  return (
    <Grid container size={12} px={1} mt={2} justifyContent="center">
      <ProfileTabs
        profiles={profiles}
        query={query}
        onChange={(e) => {
          console.log(e);
          router.push(`?profile=${e}`, { scroll: false });
          // setEditMode(false);
        }}
      />
      <Grid container size={12} justifyContent="center" mt={2}>
        <Grid
          size={{ xs: 11, md: 10 }}
          sx={{
            bgcolor: (theme) => theme.palette.cardbg.main,
            borderRadius: "16px",
            boxShadow: 1,
          }}
        >
          <Grid
            container
            size={12}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: "16px 16px 0 0",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(10,71,201,.22)",
              position: "relative",
              overflow: "hidden",
              background: `
linear-gradient(
  90deg,
  #1f4a97 0%,
  #3477d7 35%,
  #5f9fe8 70%,
  #4a8be0 100%
)
`,
            }}
          >
            <Typography
              fontSize={16}
              fontWeight={600}
              textTransform="capitalize"
            >
              {selectedProfile?.name}
            </Typography>
            <Page.Box display="flex" alignItems="center" gap={2}>
              <Typography fontSize={16}>
                {1}/{selectedProfile?.pages?.length ?? ""}
              </Typography>
              {!editMode && (
                <Button
                  endIcon={<EditIcon sx={{ fontSize: 14 }} />}
                  onClick={() => setEditMode(true)}
                  sx={{
                    color: "white",
                    p: 0,
                    fontSize: 14,
                    textTransform: "none",
                    ml: 1,
                  }}
                >
                  Update
                </Button>
              )}
            </Page.Box>
          </Grid>
          <Survey
            editMode={editMode}
            setEditMode={setEditMode}
            hideSteps={true}
            isProfile={true}
            survey={selectedProfile}
            start={0}
            user={user}
            endpage={"/api/v1/me/profile"}
            onComplete={(e) => {
              setEditMode(false);
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
function ProfileTabs({ profiles, query, onChange }) {
  const tabs = React.useMemo(() => {
    return profiles.map((p) => ({
      label: p.name,
      icon: p.icon,
      link: p.slug,
      status: p.status,
    }));
  }, [profiles]);

  const activeTab = React.useMemo(() => {
    if (
      !profiles ||
      !query?.profile ||
      !(profiles instanceof Array) ||
      profiles.length === 0
    )
      return 0;
    return profiles.map((p) => p.slug).indexOf(query.profile);
  }, [profiles, query]);
  if ([undefined, null].includes(activeTab)) return <></>;
  return (
    <Tabs
      value={activeTab}
      onChange={(_, v) => {
        onChange(tabs[v].link);
      }}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      sx={{
        width: "100%",
        pb: 0.5,
        borderBottom: "3px solid #eef3fb",

        "& .MuiTabs-flexContainer": {
          gap: 1,
        },

        "& .MuiTabs-scrollButtons": {
          color: "primary.main",
          "&.Mui-disabled": {
            opacity: 0.3,
          },
        },

        "& .MuiTabs-scrollButtons .MuiSvgIcon-root": {
          fontSize: 30,
        },

        "& .MuiTabs-indicator": {
          display: "none",
        },

        "& .MuiTab-root": {
          minHeight: 72,
          px: 2,
          py: 1.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "#E3ECF8",
          bgcolor: "#fff",
          color: "#24324B",
          fontSize: { xs: 14, md: 15 },
          fontWeight: 600,
          textTransform: "none",
          overflow: "hidden",
          transition: "all .25s ease",

          "&:hover": {
            bgcolor: "#F5F9FF",
            borderColor: "#A9CBF8",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0,27,102,.08)",
          },
        },

        "& .Mui-selected": {
          color: "white !important",
          borderColor: "transparent",
          boxShadow: "0 10px 24px rgba(0,27,102,.25)",

          background: `
      linear-gradient(
        135deg,
        #001B66 0%,
        #0A47C9 35%,
        #5BA8F5 70%,
        #7BC4FF 100%
      )
    `,
          backgroundSize: "250% 250%",
          animation: "profileGradientShift 8s ease infinite",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 28px rgba(0,27,102,.3)",
          },
        },

        "@keyframes profileGradientShift": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label}
          sx={{ borderRadius: 2, m: 0.5, border: "2px solid whitesmoke" }}
          label={
            <TabLabel
              label={tab.label}
              icon={tab.icon}
              selected={activeTab === i}
              progress={tab.status}
            />
          }
        />
      ))}
    </Tabs>
  );
}
function profilePages() {
  const [user, query, router] = [
    useMember(),
    useQueryParameters(),
    useRouter(),
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);

  const form = useForm({ defaultValues: {} });
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = form;
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ["profiles", user?.category],
    queryFn: () =>
      api
        .post("/api/v1/profile", { category: user.category })
        .then((r) => r.data),
    enabled: !!user?.category,
  });
  const tabs = React.useMemo(() => {
    return profiles.map((p) => ({
      label: p.name,
      icon: p.icon,
      link: p.slug,
    }));
  }, [profiles]);

  const activeTab = React.useMemo(() => {
    if (
      !profiles ||
      !query?.profile ||
      !(profiles instanceof Array) ||
      profiles.length === 0
    )
      return;
    return profiles.map((p) => p.slug).indexOf(query.profile);
  }, [profiles, query]);
  const selectedProfile =
    profiles instanceof Array && profiles.length > 0
      ? profiles[activeTab ?? 0]
      : {};
  const questions = selectedProfile?.pages?.[activeStep] ?? [];
  const { data: questionBank = [] } = useQuery({
    queryKey: ["questions", questions],
    queryFn: () =>
      api
        .post("/api/v1/question", {
          name: { $in: questions },
        })
        .then((r) =>
          r.data.reduce((acc, c) => {
            //       // console.log(`${c.parent}->${c.name}`);
            acc[c.name] = {
              label: c.label,
              name: c.name,
              type: c.type,
              options: c.options ?? [],
              parent: c.parent,
              size: c.size,
              required: c.required,
              disabled: c.disabled,
            };
            if (c.name === "dob") {
              const today = new Date();
              acc["dob"].dateRange = [
                `${today.getFullYear() - 120}-01-01`,
                `${today.getFullYear() - 15}-01-01`,
              ];
            }
            return acc;
          }, {}),
        ),
    enabled: questions.length > 0,
  });
  const { data: meAnswers, isLoading: meLoading } = useQuery({
    queryKey: ["me", questions],
    queryFn: () => api.post("/api/v1/me", { questions }).then((r) => r.data),
    enabled: questions.length > 0,
  });
  React.useEffect(() => {
    form.reset({ ...meAnswers });
  }, [user, meAnswers]);

  async function onSubmit(answers) {
    let request = {
      answers,
      questions: selectedProfile?.pages?.[activeStep],
    };
    try {
      let resp = await api.patch(`/api/v1/me/profile`, request);
      useToast(resp);
      setEditMode(false);
    } catch (error) {
      useToast({
        status: "error",
        message: error.message,
      });
    }
  }
  return (
    <>
      <Grid container size={12} px={1} mt={2} justifyContent="center">
        <Tabs
          value={activeTab}
          onChange={(_, v) => {
            router.push(`?profile=${tabs[v].link}`, { scroll: false });
            setEditMode(false);
          }}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            width: "100%",
            pb: 0.3,
            borderBottom: "3px solid whitesmoke",
            "& .MuiTabs-scrollButtons .MuiSvgIcon-root": { fontSize: 30 },
            "& .MuiTabs-indicator": {
              bgcolor: (theme) => theme.palette.secondary.main,

              height: 3,
              display: "none",
            },
            "& .MuiTab-root": {
              color: "black",
              fontSize: { xs: 14, md: 16 },
              fontWeight: 600,
            },
            "& .Mui-selected": {
              bgcolor: (theme) => theme.palette.secondary.main,
              color: "white !important",
            },
          }}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={tab.label}
              sx={{ borderRadius: 2, m: 0.5, border: "2px solid whitesmoke" }}
              label={
                <TabLabel
                  label={tab.label}
                  icon={tab.icon}
                  selected={activeTab === i}
                  // progress={12}
                />
              }
            />
          ))}
        </Tabs>
        <Grid container size={12} justifyContent="center" mt={2}>
          {/* <ShowData form={form}/> */}
          <Grid
            size={{ xs: 11, md: 10 }}
            sx={{
              bgcolor: (theme) => theme.palette.cardbg.main,
              borderRadius: 2.5,
              boxShadow: 1,
              mb: 4,
            }}
          >
            <Grid
              container
              size={12}
              justifyContent="space-between"
              alignItems="center"
              sx={{
                py: 1.5,
                px: 2,
                color: "white",
                bgcolor: (theme) => theme.palette.secondary.main,
                fontWeight: 600,
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Typography
                fontSize={16}
                fontWeight={600}
                textTransform="capitalize"
              >
                {selectedProfile?.name}
              </Typography>
              <Page.Box display="flex" alignItems="center" gap={2}>
                <Typography fontSize={16}>
                  {activeStep + 1}/{selectedProfile?.pages?.length ?? ""}
                </Typography>
                {/* { !editMode && (
                  <IconButton
                    onClick={ () => setEditMode(true) }
                    sx={ { color: "white", p: 0 } }
                  >
                    <EditIcon />
                  </IconButton>
                ) }     */}
                {!editMode && (
                  <Button
                    endIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={{
                      color: "white",
                      p: 0,
                      fontSize: 15,
                      textTransform: "none",
                      ml: 1,
                    }}
                  >
                    Update
                  </Button>
                )}
              </Page.Box>
            </Grid>

            <Grid
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              container
              size={12}
              py={2}
              px={{ xs: 0, md: 2 }}
            >
              {selectedProfile?.pages?.[activeStep].map((qName) => {
                const q = questionBank[qName];
                if (!q) return null;
                return (
                  <Question
                    key={q.name}
                    editMode={!editMode}
                    form={form}
                    question={q}
                    control={control}
                    errors={errors}
                    watch={watch}
                  />
                );
              })}
              <Grid size={12} container>
                {selectedProfile?.pages?.length > 1 && (
                  <MobileStepper
                    variant="dots"
                    steps={selectedProfile?.pages?.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                      flexGrow: 1,
                      bgcolor: "transparent",
                    }}
                    backButton={
                      <IconButton
                        color="secondary"
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft fontSize="large" />
                      </IconButton>
                    }
                    nextButton={
                      <IconButton
                        color="secondary"
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        disabled={
                          activeStep === selectedProfile?.pages?.length - 1
                        }
                      >
                        <KeyboardArrowRight fontSize="large" />
                      </IconButton>
                    }
                  />
                )}
              </Grid>

              {editMode &&
                activeStep === selectedProfile?.pages?.length - 1 && (
                  <Grid
                    size={12}
                    container
                    justifyContent="flex-end"
                    p={2}
                    spacing={2}
                  >
                    <Page.MuiButton
                      onClick={() => {
                        setEditMode(false);
                      }}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Cancel
                    </Page.MuiButton>
                    <Page.MuiButton
                      variant="contained"
                      color="secondary"
                      type="submit"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        width: "110px",
                      }}
                    >
                      Save Profile
                    </Page.MuiButton>
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
function ShowData({ form }) {
  const data = form.watch();
  return (
    <div style={{ width: "100%" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
