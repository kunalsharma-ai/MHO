"use client";
import React from "react";
import {
  Datatable,
  FlagAndCountryCode,
  PageTitle,
  SectionTitle,
} from "@/components";
import { Grid, IconButton, Chip, FormControlLabel } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useRouter } from "next/navigation";
import SurveyStatsCards from "@/app/admin/components/SurveyStats";
import { Page, api } from "@/util";
import { SideDrawer } from "@/components/Popup";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@/Context";
import Mailer from "@/app/admin/components/Mailer";

const statusColor = [
  {
    color: "#009efb",
    value: "Drafted",
  },
  {
    color: "#4da256",
    value: "live",
  },
  {
    color: "#ffa500",
    value: "hold",
  },
  {
    color: "#c62828",
    value: "close",
  },
  {
    color: "#8e44ad",
    value: "reconciled",
  },
  {
    color: "#d35400",
    value: "invoiced",
  },
  {
    color: "#2ecc71",
    value: "paid",
  },
];

export default function page() {
  const query = useQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [showFilteredUsers, setShowFilteredUsers] = React.useState({
    open: false,
    data: null,
    market: null,
  });
  const [openFilters, setOpenFilters] = React.useState({
    open: false,
    filters: null,
  });
  const endpoint = `/api/v1/project/${query.id}`;

  const [survey, setSurvey] = React.useState({});

  function openResponseHandler(d) {
    setShowFilteredUsers({ open: true, data: d });
  }

  React.useEffect(() => {
    setIsLoading(true);
    api.get(endpoint).then((resp) => {
      setSurvey(resp.data);
      setIsLoading(false);
    });
  }, [query]);

  const [batches, setBatches] = React.useState([]);
  React.useEffect(() => {
    api
      .post(`/api/v1/batch`, {
        survey: survey?._id,
      })
      .then((resp) => {
        if ("data" in resp) setBatches(resp.data);
      });
  }, [survey, openFilters.open]);

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, lg: 3 },
      }}
    >
      <PageTitle
        onBack={async (e) => {
          router.push("/admin/surveys");
        }}
        title={<>{survey?.pid && `[${survey?.pid}] ${survey?.name}`}</>}
        actions={
          survey?.status && (
            <Chip
              variant="contained"
              sx={{
                fontWeight: 600,
                px: 1,
                fontSize: 15,
                color: "white",
                bgcolor: statusColor.find((c) => c.value === survey.status)
                  ?.color,
              }}
              label={survey?.status}
            />
          )
        }
      />

      <SurveyStatsCards
        onClick={(d) => {
          openResponseHandler(d);
        }}
      />
      <Grid size={12} container mt={2}>
        <Datatable
          columns={[
            {
              id: "Market Status",
              label: "Market Status",
              data: "Market Status	",
            },

            {
              id: "Country",
              label: "Country",
              render: (info) =>
                info.country.map((cn) => (
                  <Page.Box p={0.3} key={cn}>
                    <FlagAndCountryCode cn={cn} />
                  </Page.Box>
                )),
            },

            {
              id: "Survey Points",
              label: "Survey Points",
              // data: "Survey Points",
              render: (info) => {
                return Number(info?.cpi ?? 10) * 100;
              },
            },
            {
              id: "filters",
              label: "Filters",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setOpenFilters({ open: true, filters: info?.filters });
                  }}
                >
                  Show Filters
                </Page.MuiButton>
              ),
            },
            { id: "completes", label: "Completes", data: "completes" },
            { id: "LOI", label: "LOI", data: "loi" },
            { id: "IR", label: "IR", data: "ir" },
            {
              id: "Qualified",
              label: "Qualified",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {info.qualified.length}
                </Page.MuiButton>
              ),
            },
            {
              id: "Invited",
              label: "Invited",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {
                    info.qualified.filter((u) =>
                      [
                        "invited",
                        "disqualified",
                        "completed",
                        "overquota",
                        "dropout",
                      ].includes(u?.status),
                    ).length
                  }
                </Page.MuiButton>
              ),
            },
            {
              id: "Pending",
              label: "Pending",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {info.qualified.filter((u) => u?.status === "invited").length}
                </Page.MuiButton>
              ),
            },
            {
              id: "Clicks",
              label: "Clicks",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {
                    info.qualified.filter((u) =>
                      [
                        "disqualified",
                        "completed",
                        "overquota",
                        "dropout",
                      ].includes(u?.status),
                    ).length
                  }
                </Page.MuiButton>
              ),
            },
            {
              id: "Disqualified",
              label: "Disqualified",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {
                    info.qualified.filter((u) =>
                      ["disqualified"].includes(u?.status),
                    ).length
                  }
                </Page.MuiButton>
              ),
            },
            {
              id: "Overquota",
              label: "Overquota",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {
                    info.qualified.filter((u) =>
                      ["overquota"].includes(u?.status),
                    ).length
                  }
                </Page.MuiButton>
              ),
            },
            {
              id: "dropouts",
              label: "dropouts",
              render: (info) => (
                <Page.MuiButton
                  color="secondary"
                  sx={{ textTransform: "none", fontWeight: 600, p: 0 }}
                  onClick={() => {
                    setShowFilteredUsers({
                      open: true,
                      data: info.qualified,
                      market: info,
                    });
                  }}
                >
                  {
                    info.qualified.filter((u) =>
                      ["dropout"].includes(u?.status),
                    ).length
                  }
                </Page.MuiButton>
              ),
            },
          ]}
          data={survey?.markets}
          isLoading={isLoading}
          pagination={[10, 20, 50, 100]}
          pageSize={10}
          hideToolbar
          noDataMsg="No Record Found."
        />
      </Grid>

      <BatchesHistory
        setShowFilteredUsers={setShowFilteredUsers}
        survey={survey}
        batches={batches}
        setBatches={setBatches}
      />

      <SideDrawer
        open={showFilteredUsers.open}
        hideTitleBar={true}
        width="96vw"
        onClose={() => setShowFilteredUsers({ open: false, data: null })}
      >
        <SendInvites
          survey={survey}
          users={showFilteredUsers?.data}
          market={showFilteredUsers?.market}
          onClose={() => setShowFilteredUsers({ open: false, data: null })}
        />
      </SideDrawer>

      <SideDrawer
        title="Applied Filters"
        open={openFilters.open}
        onClose={() => setOpenFilters({ open: false, filters: null })}
      >
        <FiltersList filters={openFilters.filters} />
      </SideDrawer>
    </Page.Box>
  );
}

function BatchesHistory({ setShowFilteredUsers, survey, batches, setBatches }) {
  return (
    <Grid
      container
      size={12}
      spacing={0}
      sx={{
        p: 2,
        bgcolor: "white",
        boxShadow: 2,
        borderRadius: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
      }}
    >
      <Page.Text
        fontSize={16}
        fontWeight={600}
        sx={{
          fontSize: "16px",
          display: "inline-block",
          fontWeight: "600",
          color: "primary.main",
          borderBottom: (theme) => `2px solid ${theme.palette.secondary.dark}`,
          pb: 0.5,
        }}
      >
        Batches{" "}
      </Page.Text>

      {batches.length > 0 ? (
        <Grid size={12} container mt={2} spacing={1.5} alignItems="center">
          {batches.map((batch) => {
            return (
              <Grid
                key={batch._id}
                container
                size={{ xs: 12, md: 6, xl: 4 }}
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                sx={{
                  border: (theme) =>
                    `1px solid ${theme.palette.secondary.main}`,
                  bgcolor: "primary.light",
                  borderRadius: 4,
                  px: { xs: 3, xl: 5 },
                  py: 3,
                  minHeight: "120px",
                }}
              >
                <Grid
                  size={{ xs: 12, md: 8 }}
                  container
                  direction="column"
                  spacing={1}
                >
                  <Page.Text
                    fontWeight={600}
                    fontSize={16}
                    sx={{ color: "secondary.main" }}
                  >
                    {batch.name}
                  </Page.Text>
                  <Page.Text>
                    {batch.status === "pending" ? "Scheduled At" : "Sent on"}:{" "}
                    <b>{new Date(batch?.scheduledAt).toFormat()}</b>
                  </Page.Text>
                  <Page.Text>
                    Invited Members : <b>{batch?.emails?.length}</b>
                  </Page.Text>
                </Grid>
                <Grid
                  size={{ xs: 12, md: 4 }}
                  container
                  alignItems="flex-end"
                  direction="column"
                  spacing={1}
                >
                  <Page.MuiButton
                    disabled={batch.status !== "pending"}
                    onClick={() =>
                      setShowFilteredUsers({ open: true, data: null })
                    }
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: 600, width: 100 }}
                  >
                    Edit
                  </Page.MuiButton>
                  <Page.MuiButton
                    disabled={batch.status !== "pending"}
                    onClick={async () => {
                      await api.delete(`/api/v1/batch/${batch._id}`);

                      await api
                        .post(`/api/v1/batch`, {
                          survey: survey._id,
                        })
                        .then((resp) => {
                          if ("data" in resp) setBatches(resp.data);
                        });
                    }}
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: 600, borderWidth: 2, width: 100 }}
                  >
                    Cancel
                  </Page.MuiButton>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid
          container
          size={12}
          justifyContent="center"
          alignItems="center"
          height={150}
        >
          <Page.Text sx={{ mt: 1 }}>No Batches Found.</Page.Text>
        </Grid>
      )}
    </Grid>
  );
}

function FiltersList({ filters }) {
  return (
    <Grid size={12} container spacing={1}>
      {filters?.map((filter, index) => {
        return (
          <Grid
            size={12}
            container
            key={index}
            sx={{ borderRadius: 2, border: "1px solid #cecece", p: 2 }}
          >
            <Page.Text
              fontWeight={600}
              fontSize={16}
              sx={{ color: "secondary.main" }}
            >
              {filter?.type}
            </Page.Text>

            <Grid container size={12} sx={{ mt: 1 }} spacing={0}>
              {Object.entries(filter?.value).map(([key, val], index) => {
                if (filter.type !== "Age")
                  return (
                    <Grid
                      size={12}
                      key={key}
                      container
                      justifyContent="space-between"
                      p={1}
                      sx={{
                        bgcolor: index % 2 ? "inherit" : "#f4f4f4",
                      }}
                    >
                      <Page.Text fontWeight={500}>{key}</Page.Text>
                      {val && <Page.Text fontWeight={600}> {val}</Page.Text>}
                    </Grid>
                  );
                return (
                  <Grid
                    size={12}
                    key={`${val.min}-${val.max}`}
                    container
                    justifyContent="space-between"
                    p={1}
                    sx={{
                      bgcolor: index % 2 ? "inherit" : "#f4f4f4",
                    }}
                  >
                    <Page.Text
                      fontWeight={500}
                    >{`${val.min}-${val.max}`}</Page.Text>
                    {val && (
                      <Page.Text fontWeight={600}> {val.quota ?? ""}</Page.Text>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

function SendInvites({ users, survey, market, onClose }) {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [sendMail, setSendMail] = React.useState(false);

  const [isAddingToBatch, setIsAddingToBatch] = React.useState(false);

  const handleToggle = (user) => {
    if (!user) return;
    setSelectedUsers((prev) => {
      const exists = prev.some((u) => u.user === user.user);
      if (exists) {
        return prev.filter((u) => u.user !== user.user);
      }
      return [...prev, user];
    });
  };

  const handleToggleAll = () => {
    if (selectedUsers?.length === users?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      size={12}
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 1,
        pb: 2,
        alignSelf: "flex-start",
      }}
    >
      <SectionTitle
        title={sendMail ? "Send Mail" : "Users List"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton
          onClick={
            sendMail
              ? () => {
                  setSendMail(false);
                }
              : onClose
          }
          sx={{ color: "secondary.main" }}
        >
          <CloseIcon />
        </IconButton>
      </SectionTitle>

      <Grid size={12} container spacing={1} px={2.5} py={1}>
        <Grid
          size={{ xs: 12, sm: 6, md: 3 }}
          container
          justifyContent="space-between"
          sx={{
            border: (theme) => `1px solid ${theme.palette.secondary.main}`,

            p: 1,
            borderRadius: 1,
          }}
        >
          <Page.Text fontWeight={600}>Batch Size:</Page.Text>
          {Boolean(sendMail)
            ? selectedUsers?.length
            : `${selectedUsers?.length}/${market?.schedule?.batch}`}
        </Grid>
        {Boolean(sendMail) ? (
          <></>
        ) : (
          <>
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              container
              justifyContent="space-between"
              sx={{
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,

                p: 1,
                borderRadius: 1,
              }}
            >
              <Page.Text fontWeight={600}>Start Time:</Page.Text>
              {new Date(market?.schedule?.time ?? "").toFormat()} (IST)
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              container
              justifyContent="space-between"
              sx={{
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,

                p: 1,
                borderRadius: 1,
              }}
            >
              <Page.Text fontWeight={600}>Batch Frequency:</Page.Text>
              {market?.schedule?.frequency}
            </Grid>

            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              container
              justifyContent="space-between"
              sx={{
                border: (theme) => `1px solid ${theme.palette.secondary.main}`,

                p: 1,
                borderRadius: 1,
              }}
            >
              <Page.Text fontWeight={600}>Total Batches:</Page.Text>
              {Math.ceil(
                Number(market?.completes ?? 0) /
                  Number(market?.schedule?.batch ?? 1),
              )}
            </Grid>
          </>
        )}
      </Grid>
      {!sendMail ? (
        <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
          <Datatable
            columns={[
              {
                id: "checkbox",
                width: 60,
                label: (
                  <Page.Checkbox
                    checked={
                      selectedUsers?.length === users?.length &&
                      users?.length > 0
                    }
                    indeterminate={
                      selectedUsers?.length > 0 &&
                      selectedUsers?.length < users?.length
                    }
                    onChange={handleToggleAll}
                    sx={{
                      "& .MuiSvgIcon-root": { color: "white" },
                      "&.Mui-checked .MuiSvgIcon-root": { color: "white" },
                    }}
                  />
                ),
                render: (info) => (
                  <Page.Checkbox
                    checked={selectedUsers?.some((u) => u.user === info.user)}
                    onChange={() => handleToggle(info)}
                  />
                ),
              },
              {
                id: "Name",
                label: "Name",
                render: (info) => Object.values(info.name).join(" "),
              },
              { id: "Email", label: "	Email", data: "mail" },
              {
                id: "Country",
                label: "	Country",
                width: 100,
                render: (info) => (
                  <FlagAndCountryCode key={info.country} cn={info.country} />
                ),
              },
              { id: "Timezone", label: "	Timezone", data: "timezone" },
              {
                id: "Quality Score",
                label: "Quality Score",
                data: "qualityScore",
                width: 150,
              },
              { id: "Points", label: "Points", data: "Points", width: 150 },
              { id: "Last Login", label: "Last Login", data: "Last Login" },
            ]}
            data={users}
            isLoading={false}
            pagination={[10, 20, 50, 100]}
            pageSize={10}
            hideToolbar
            noDataMsg="No Record Found."
          />
          <Grid
            size={12}
            container
            justifyContent={
              selectedUsers.length === 0 ? "flex-end" : "space-between"
            }
            alignItems="flex-end"
            px={0.5}
          >
            {selectedUsers.length !== 0 && (
              <Page.Box display="flex" flex="1" flexDirection="column">
                {isAddingToBatch && (
                  <Page.Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mt={1}
                    ml={2}
                  >
                    <Page.Box sx={{ width: "240px" }}>
                      <Page.Select
                        label="Batch"
                        onChange={() => {}}
                        options={[]}
                      />
                    </Page.Box>

                    {/* if new batch */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        // value={}
                        label="Batch Schedule"
                        onChange={(v) => {}}
                        format="DD MMM YYYY hh:mm A"
                        sx={{ bgcolor: "white" }}
                        slotProps={{
                          popper: {
                            disablePortal: true,
                            sx: {
                              zIndex: 99999,
                            },
                          },

                          textField: {
                            size: "small",
                            sx: {
                              "& .MuiInputBase-input": {
                                fontSize: 12,
                              },
                              bgcolor: "white",
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Page.Box>
                )}
              </Page.Box>
            )}

            <Page.MuiButton
              disabled={
                selectedUsers.length === 0 ||
                selectedUsers.length > market?.schedule?.batch
              }
              onClick={() => {
                setSendMail(market);
              }}
              variant="contained"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              Send Invite
            </Page.MuiButton>
          </Grid>
        </Grid>
      ) : (
        <Mailer
          users={selectedUsers}
          survey={survey}
          market={sendMail}
          onClose={onClose}
        />
      )}
    </Grid>
  );
}

// old code
// function SendInvites({ users, survey, market, onClose }) {
//   const [selectedUsers, setSelectedUsers] = React.useState([]);
//   const [sendMail, setSendMail] = React.useState(false);
//   const handleToggle = (user) => {
//     if (!user) return;
//     setSelectedUsers((prev) => {
//       const exists = prev.some((u) => u.user === user.user);
//       if (exists) {
//         return prev.filter((u) => u.user !== user.user);
//       }
//       return [...prev, user];
//     });
//   };

//   const handleToggleAll = () => {
//     if (selectedUsers?.length === users?.length) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(users);
//     }
//   };

//   return (
//     <Grid
//       container
//       spacing={1}
//       size={12}
//       sx={{
//         bgcolor: "white",
//         overflow: "hidden",
//         borderRadius: "10px",
//         boxShadow: 1,
//         pb: 2,
//         alignSelf: "flex-start",
//       }}
//     >
//       <SectionTitle
//         title={sendMail ? "Send Mail" : "Users List"}
//         sx={{ justifyContent: "space-between" }}
//       >
//         <IconButton
//           onClick={
//             sendMail
//               ? () => {
//                   setSendMail(false);
//                 }
//               : onClose
//           }
//           sx={{ color: "secondary.main" }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </SectionTitle>

//       <Grid size={12} container spacing={1} px={2.5} py={1}>
//         <Grid
//           size={{ xs: 12, sm: 6, md: 3 }}
//           container
//           justifyContent="space-between"
//           sx={{ border: "1px solid rgba(89, 172, 119, 0.6)", p: 1, borderRadius: 1 }}
//         >
//           <Page.Text fontWeight={600}>Time:</Page.Text>
//           {market?.schedule?.time}
//         </Grid>
//         <Grid
//           size={{ xs: 12, sm: 6, md: 3 }}
//           container
//           justifyContent="space-between"
//           sx={{ border: "1px solid rgba(89, 172, 119, 0.6)", p: 1, borderRadius: 1 }}
//         >
//           <Page.Text fontWeight={600}>Batch Size:</Page.Text>
//           {market?.schedule?.batch}
//         </Grid>
//         <Grid
//           size={{ xs: 12, sm: 6, md: 3 }}
//           container
//           justifyContent="space-between"
//           sx={{ border: "1px solid rgba(89, 172, 119, 0.6)", p: 1, borderRadius: 1 }}
//         >
//           <Page.Text fontWeight={600}>Batch Frequency:</Page.Text>
//           {market?.schedule?.frequency}
//         </Grid>

//         <Grid
//           size={{ xs: 12, sm: 6, md: 3 }}
//           container
//           justifyContent="space-between"
//           sx={{ border: "1px solid rgba(89, 172, 119, 0.6)", p: 1, borderRadius: 1 }}
//         >
//           <Page.Text fontWeight={600}>Total Batches:</Page.Text>
//           {Math.ceil(
//             Number(market?.completes ?? 0) /
//               Number(market?.schedule?.batch ?? 1)
//           )}
//         </Grid>
//       </Grid>
//       {!sendMail ? (
//         <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
//           <Datatable
//             columns={[
//               {
//                 id: "checkbox",
//                 width: 60,
//                 label: (
//                   <Page.Checkbox
//                     checked={
//                       selectedUsers?.length === users?.length &&
//                       users?.length > 0
//                     }
//                     indeterminate={
//                       selectedUsers?.length > 0 &&
//                       selectedUsers?.length < users?.length
//                     }
//                     onChange={handleToggleAll}
//                     sx={{
//                       "& .MuiSvgIcon-root": { color: "white" },
//                       "&.Mui-checked .MuiSvgIcon-root": { color: "white" },
//                     }}
//                   />
//                 ),
//                 render: (info) => (
//                   <Page.Checkbox
//                     checked={selectedUsers?.some((u) => u.user === info.user)}
//                     onChange={() => handleToggle(info)}
//                   />
//                 ),
//               },
//               {
//                 id: "Name",
//                 label: "Name",
//                 render: (info) => Object.values(info.name).join(" "),
//               },
//               { id: "Email", label: "	Email", data: "mail" },
//               {
//                 id: "Country",
//                 label: "	Country",
//                 width: 100,
//                 render: (info) => (
//                   <FlagAndCountryCode key={info.country} cn={info.country} />
//                 ),
//               },
//               { id: "Timezone", label: "	Timezone", data: "timezone" },
//               {
//                 id: "Quality Score",
//                 label: "Quality Score",
//                 data: "qualityScore",
//                 width: 150,
//               },
//               { id: "Points", label: "Points", data: "Points", width: 150 },
//               { id: "Last Login", label: "Last Login", data: "Last Login" },
//             ]}
//             data={users}
//             isLoading={false}
//             pagination={[10, 20, 50, 100]}
//             pageSize={10}
//             hideToolbar
//             noDataMsg="No Record Found."
//           />
//           <Grid size={12} container justifyContent="flex-end">
//             <Page.MuiButton
//               disabled={selectedUsers.length === 0}
//               onClick={() => {
//                 setSendMail(true);
//               }}
//               variant="contained"
//               color="secondary"
//               sx={{ fontWeight: 600 }}
//             >
//               Send Invite
//             </Page.MuiButton>
//           </Grid>
//         </Grid>
//       ) : (
//         <Mailer users={selectedUsers} survey={survey} />
//       )}
//     </Grid>
//   );
// }
