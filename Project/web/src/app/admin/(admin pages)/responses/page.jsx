"use client";
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Datatable } from "@/components";
import { useQuery } from "@/Context";
import { useToast } from "@/hooks";
import { api, Page } from "@/util";

export default function page() {
  const [data, setData] = React.useState([]);
  const [reload, setReload] = React.useState(1);
  const query = useQuery();
  React.useEffect(() => {
    api.post(`/api/v1/survey/responses`, query).then((resp) => {
      setData(resp.data);
    });
  }, [query, reload]);
  const columns = [
    {
      id: "points",
      label: "points",
      render: (info) => info.points,
    },
    {
      id: "source",
      label: "source",
      render: (info) => info.source,
    },
    {
      id: "survey",
      label: "Survey",
      render: (info) => info.survey.name,
    },
    {
      id: "status",
      label: "Status",
      render: (info) => info.status,
    },
    {
      id: "user",
      label: "User",
      render: (info) => (
        <Page.Link href={`/api/v1/user/${info?.user?._id}`}>
          {info?.user?.fullName} ({info?.user?.mail})
        </Page.Link>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: (info) => {
        if (info.reward.status === "Pending")
          return (
            <>
              <Page.MuiButton
                color="success"
                onClick={async (e) => {
                  let cnf = confirm("Do you want to approve this?");
                  if (!cnf) return;
                  const temp = await api.put(
                    `/api/v1/rewards/${info.reward._id}`,
                    {
                      status: "Approve",
                    },
                  );
                  useToast(temp);
                  setReload((reload + 1) % 10);
                }}
              >
                Approve
              </Page.MuiButton>
              <Page.MuiButton
                color="error"
                onClick={async (e) => {
                  let cnf = confirm("Do you want to reject this?");
                  if (!cnf) return;
                  const temp = await api.put(
                    `/api/v1/rewards/${info.reward._id}`,
                    {
                      status: "Reject",
                    },
                  );
                  useToast(temp);
                  setReload((reload + 1) % 10);
                }}
              >
                Reject
              </Page.MuiButton>
            </>
          );
        else return <>{info.reward.status}</>;
      },
    },
  ];
  return (
    <Grid size={12} p={{ xs: 2, md: 3 }} sx={{ border: `1px solid #e0e0e0` }}>
      <Datatable
        columns={columns}
        data={data}
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={50}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        title={
          <Typography
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              color: "primary.main",
              borderBottom: (theme) =>
                `2px solid ${theme.palette.secondary.dark}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Survey Responses
          </Typography>
        }
      />
    </Grid>
  );
}
