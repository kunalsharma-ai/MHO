"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Grid,
  Tabs,
  Tab,
  Fade,
  Chip,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useMember } from "@/Context";
import { Datatable, Form, SectionTitle } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={1000} unmountOnExit>
      <Page.Box
        hidden={value !== index}
        sx={{ width: "100%", bgcolor: "white", mb: { xs: 1, md: 2 } }}
      >
        {value === index && children}
      </Page.Box>
    </Fade>
  );
}
export default function () {
  const [activeTab, setActiveTab] = React.useState(0); // set to 1 for Page to default to Create Ticket Tab
  const tabs = [
    {
      label: "F.A.Q.",
      render: <FAQ />,
    },
    {
      label: "Contact Support",
      render: <ContactSupport />,
    },
  ];

  return (
    <Grid
      size={12}
      container
      px={{ xs: 1, md: 2 }}
      pt={{ xs: 1, md: 2 }}
      justifyContent="center"
      sx={{ bgcolor: (theme) => theme.palette.page.main }}
    >
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
          bgcolor: "white",
          borderBottom: "3px solid whitesmoke",
          "& .MuiTabs-indicator": {
            backgroundColor: "secondary.main",
            height: "3px",
          },
          "& .MuiTab-root": {
            color: "gray",
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "secondary.main",

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

function ContactSupport() {
  const [createTicket, setCreateTicket] = React.useState(false);
  const [activeTicket, setActiveTicket] = React.useState(true);
  const [reload, setReload] = React.useState(0);
  function reloadData() {
    setReload((reload + 1) % 10);
  }
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      {createTicket ? (
        <CreateTicket
          setCreateTicket={setCreateTicket}
          setActiveTicket={setActiveTicket}
          reloadData={reloadData}
        />
      ) : activeTicket ? (
        <TicketList
          setCreateTicket={setCreateTicket}
          reload={reload}
          setActiveTicket={setActiveTicket}
        />
      ) : (
        <Grid size={12}>
          <Grid
            size={12}
            container
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Page.Text
              sx={{
                fontSize: "16px",
                display: "inline-block",
                fontWeight: "600",
                borderBottom: "2px solid #59AC77",
                pb: 0.5,
                my: 1,
              }}
            >
              Support Tickets
            </Page.Text>
            <Page.MuiButton
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateTicket(true);
              }}
              sx={{
                fontWeight: "bold",
              }}
            >
              Create Ticket
            </Page.MuiButton>
          </Grid>
          <Grid
            container
            size={12}
            justifyContent="center"
            alignItems="center"
            p={2}
            mb={1}
            sx={{
              minHeight: "300px",
              border: "1px solid rgba(89, 172, 119, 0.6)",
              borderRadius: 2,
            }}
          >
            No Active Support Tickets
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function TicketList({ setCreateTicket, setActiveTicket, reload }) {
  const router = useRouter();
  const [user] = [useMember()];
  const [dateRange, setDateRange] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [ticketStatus, setTicketStatus] = React.useState("all");

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await api.post(`/api/v1/support`, {
          "issueRaisedBy.email": user.mail,
        });
        if (Array.isArray(resp?.data)) {
          setData(resp.data);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, dateRange, reload]);

  React.useEffect(() => {
    if (!isLoading) {
      setActiveTicket(Array.isArray(data) && data.length > 0);
    }
  }, [data, isLoading, setActiveTicket]);

  const columns = [
    {
      id: "createdAt",
      label: "Created On",
      render: (info) => `${new Date(info.createdAt).relativeTime()} ago`,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "ticketNo",
      label: "Ticket Number",
      render: (info) => info.ticketNo,
      feature: ["sortable", "lockable"],
    },
    {
      id: "subject",
      label: "Subject",
      width: 220,
      render: (info) => info.subject,
      feature: ["sortable", "lockable"],
    },

    {
      id: "status",
      label: "Status",
      render: (info) => (
        <Chip
          label={info.status}
          size="small"
          color={info.status === "closed" ? "error" : "info"}
          sx={{
            fontSize: "12px",
            textTransform: "capitalize",
            height: 22,
            px: 1,
          }}
        />
      ),
      feature: ["filterable", "sortable"],
    },
    {
      id: "action",
      label: "Action",
      width: "200px",
      render: (info) => (
        <div
          style={{
            display: "flex",
            gap: "4px",
          }}
        >
          <Page.MuiButton
            variant="contained"
            color="secondary"
            size="small"
            sx={{ height: 22, textTransform: "none" }}
            onClick={() => {
              router.push(`./support/open?ticket=${info._id}`);
            }}
          >
            Open
          </Page.MuiButton>
        </div>
      ),
    },
  ];
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Datatable
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        noDataMsg="No Record Found."
        data={data}
        hideColumnSelector
        extra={
          <Page.Box
            px={{ xs: 0, md: 2 }}
            my={{ xs: 1, md: 0 }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Page.MuiButton
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateTicket(true);
              }}
              sx={{
                height: 30,
                fontSize: 12,
                textTransform: "none",
                py: "5px",
              }}
            >
              Create Ticket
            </Page.MuiButton>
            <Page.Select
              label=""
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
              options={[
                { label: "All Tickets", value: "all" },
                { label: "Pending Tickets", value: "pending" },
                { label: "Closed Tickets", value: "closed" },
              ]}
              sx={{
                width: "160px",
                height: 30,

                "& .MuiSelect-select": {
                  padding: "5px 14px",
                  height: 30,
                  fontSize: "12px !important",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.500",
                  },
                },
              }}
            />
            <DateRangeSelector
              onUpdate={(e) => {
                setDateRange(
                  e.map(
                    (d) => new Date(d.toDate()).toISOString().split("T")[0],
                  ),
                );
              }}
            />
          </Page.Box>
        }
        title={
          <Page.Text
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: "2px solid #59AC77",
              pb: 0.5,
              my: 1,
            }}
          >
            Support Tickets
          </Page.Text>
        }
        columns={columns}
      />
    </Grid>
  );
}

function CreateTicket({ reloadData, setCreateTicket, setActiveTicket }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const subject = watch("subject");
  const description = watch("description");

  const isDisabled =
    !subject?.trim() || !description?.replace(/<[^>]*>/g, "").trim();

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(async (data) => {
        let resp = await api.put(`/api/v1/support`, data);
        useToast(resp);
        if (resp.status === "success") {
          setCreateTicket(false);
          setActiveTicket(true);
          reloadData();
        }
      })}
      container
      spacing={2}
      size={12}
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 1,
        pb: 2,
        my: 1,
        alignSelf: "flex-start",
        border: "1px solid rgba(89, 172, 119, 0.6)",
      }}
    >
      <SectionTitle title="Create Ticket" />

      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Form.Input
          control={control}
          {...form.register("subject")}
          label="Subject"
          validations={{ required: "Subject is required" }}
        />
        <Form.TextEditor
          control={control}
          name="description"
          label="Description"
        />
        <Form.Upload
          endpoint="/api/v1/upload/image"
          name="attachments"
          control={control}
          form={form}
          multiple
          accept="image/jpeg,image/png,image/webp"
          hideCaption
        />
      </Grid>
      <Grid
        container
        size={12}
        sx={{
          justifyContent: "flex-end",
          mr: 2,
          mb: 1,
        }}
      >
        <Page.MuiButton
          onClick={() => {
            setCreateTicket(false);
          }}
          variant="outlined"
          color="secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Cancel
        </Page.MuiButton>
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isDisabled}
          sx={{
            fontWeight: "bold",
          }}
        >
          Create
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}

const faqs = [
  //   {
  //     title: "How do I become a member?",
  //     content: `My Health Opinions is dedicated healthcare panel for Doctors, Caregiver and Patient category.

  // To register on My Health Opinions, You need to choose the respective category before registration. You will be asked to provide some basic questions while creating your account, as well as the option to provide some more in-depth information about yourself in order to participate in our surveys. After completing the signup form, My Health Opinions panel will send a confirmation email into your registered email ID in order to confirm the profile validity and finalize your registration process. Alternatively, You may click the link in your email to confirm your registration over panel and to receive the survey access.`,
  //   },
  //   {
  //     title: "Any hidden charges while registration?",
  //     content: `Registration to My Health Opinions is completely free - you will not be asked for any payment. On the contrary, it is you who earns points that can be exchanged for PayPal, UPI, Wire Transfer, Gift vouchers etc., by taking participation in our sponsored surveys.`,
  //   },
  //   {
  //     title: "Why should I become a member of My Health Opinions?",
  //     content: `Becoming a member lets you take part in surveys on different topics. You can then start to accumulate the rewards after achieving the minimum threshold points. You can redeem for an incentive of your choice from “Redeem Now” button from Dashboard.`,
  //   },
  {
    title: "How do I change my email address and password?",
    content: `Due to security, My Health Opinions don’t allow updating the primary email ID for the profile. You may contact support team at support@frequentresearch.com for any type of email update request.

You can change your password after login to the My Health Opinions Dashboard, Go to “Change Password” section after selecting Settings option in Sidebar.`,
  },
  {
    title: "How can I edit my personal information?",
    content: `My Health Opinions Panel allows all users to change personal information with limited access only. Some of the basic personal information cannot be updated such as Gender, Age or Date of birth provided at the time of registration.
You can update any information from left section profile categories. Update the information and save.`,
  },
  {
    title: "How can I cancel my account?",
    content: `My Health Opinions respects all user data privacy so user can request for Account Deletion.

For Cancel/Delete your account, User need to login and go to top right my profile section then choose Delete Account.

After request for deletion, My Health Opinions will require a user confirmation through registered email ID. User can restore the account within 30 days otherwise all account data will be removed from the My Health Opinions Database and user need to create a new account for account activation.`,
  },
  {
    title: "How do I participate in Surveys?",
    content: `My Health Opinions always share the survey according to the user preference and input provided by the user. User will get the notification for new surveys by email, dashboard popup information and alert for new surveys.

All surveys will appear at the dashboard with basic information and proceed by clicking the “Start Now” button on respective surveys.`,
  },
  {
    title: "How many points will I earn for my participation?",
    content: `All reward points depend upon the survey information and these details will always appear in My Health Opinions dashboard. User can check some basic survey information along with reward points and proceed for the surveys.`,
  },
  {
    title: "How many surveys will I be invited to?",
    content: `My Health Opinions always share the survey according to the user preference and input provided by the user. User will get the notification for new surveys by email, dashboard popup information and alert for new surveys. You can login to your account and you will get the available survey information at the dashboard under “External Survey”.

My Health Opinions always encourage you to keep your profile up to date and increase the chance of getting more surveys.

The number of surveys you receive will vary depending on what personal settings you have and how many surveys are currently available. You can login to your account and under "Profile" tab, you can select "Ideal survey frequency" as per your choice. We encourage you to keep your profile up to date and increase the chance of getting more surveys.`,
  },
  {
    title: "Technical difficulties with a survey, and why does this happen?",
    content: `One of the major reasons behind technical issues is that survey respondents are using a variety of operating systems, browsers, Internet connection types, and hardware, and not all are necessarily compatible with the technology of all surveys that may be available.

If you encounter a technical difficulty during any survey. Usually, if you wait for a while, and try again later, the problem will be resolved and the survey resumed where the user left. Otherwise, if you are still seeing an error after waiting a while, please report it to support team at support@frequentresearch.com along with error information screenshot, if possible. We apologize for any inconvenience caused by technical errors. We will do our best to get them resolved.`,
  },
  {
    title:
      "Why does My Health Opinions ask the same questions in almost every survey?",
    content: `My Health Opinions profiling process is continuous. The objective is to have broad and current attributes on each panel member. Our clients make decisions based on responses from our users in their surveys. Implementing strict quality controls helps us make sure you are part of the target the client is looking for. The questions at the beginning of each survey may seem repetitive but are necessary to ensure the integrity of panellists.`,
  },
  {
    title:
      "When I click on the survey link, it says 'Survey is closed'. What does that mean?",
    content: `From usual experience, My Health Opinions understand that not everyone has time or opportunity to participate in all the surveys we send out. For one instance, a user might be on vacation and cannot participate in a specific survey on time.

My Health Opinions launch survey to large number of people and it gets closed when desired number of participants have been reached. Thereafter, no more users can participate in the survey. If you get this message, it means My Health Opinions already have the number of participants the survey is looking for.

User need to keep updated and login usually to check the survey offers.`,
  },
  {
    title: "How will I receive my rewards?",
    content: `Once the user achieves the minimum threshold and can request to redeem earned points.

The rewards could be in any form i.e. PayPal, Gift Vouchers, Bank Transfer etc. All payment forms could be different as per the country law.

User must ensure all of their information is correct to avoid any delays.`,
  },
  {
    title: "How long will it take to receive my reward once redeemed?",
    content: `Once the user requests for point redemption, My Health Opinions Support team check the validity of the profile and survey completion then proceed to share the information to accounts department for credit procedure.

All payment procedure could take up to 2-3 weeks before the transfer is actually executed. This could be due to several other transfers being queued for execution.

User must ensure all of their information is correct to avoid any delays.`,
  },
  {
    title: "What is done with the information I filled out when signing up?",
    content: `My Health Opinions respects the user data privacy policy. Your profile data is stored on our secured server that allows us to call upon those members who match specific criteria to participate in the surveys. This process is completely automated and members are contacted by My Health Opinions via email to participate in our surveys. All responses are held in aggregate, which means that individual responses are not linked to personally identifiable information. The information you provide will never be sold or used to advertise. You are not responsible for buying any product or service at any time, nor will any company solicit you as a result of joining My Health Opinions panel.`,
  },
  {
    title:
      "Why do you ask questions about age, income and other personal information?",
    content: `This information is used to match members with specific survey requirements. In some cases, our clients require feedback from people in a certain income bracket or those who have children.

Please be assured that this information is securely kept and strictly confidential. The more information you provide, the greater are your chances of receiving invitations to surveys you may qualify for, and the more opportunities you may receive to earn rewards. Go through our privacy policy for more details.`,
  },
];
function FAQ() {
  return (
    <Grid size={12} px={{ xs: 0, md: 3 }} py={2}>
      <Grid
        size={12}
        container
        direction="column"
        alignItems={"center"}
        sx={{ border: `1px solid #e0e0e0` }}
      >
        <Grid
          size={{ xs: 11, xl: 8 }}
          container
          justifyContent={"center"}
          py={5}
          px={0.5}
        >
          <Typography fontWeight={"bold"} fontSize={"24px"}>
            Do You Have{" "}
            <Page.Box component="span" color="secondary.main">
              Any Question?
            </Page.Box>
          </Typography>

          <Grid size={12} container direction="column" spacing={2} mt={4}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                disableGutters
                sx={{
                  boxShadow: 0,
                  bgcolor: "#d5eeea",
                  border: `1px solid #e0e0e0`,
                  p: { xs: 0, md: 1.5 },
                  borderRadius: 3,
                  minHeight: "50px",
                  "&:first-of-type": {
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  },
                  "&:last-of-type": {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ borderRadius: 3 }}
                >
                  <Typography fontSize={"18px"} fontWeight="500">
                    {faq.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "white", borderRadius: 2 }}>
                  <Typography
                    fontSize={"15px"}
                    textAlign={"justify"}
                    fontWeight={500}
                    p={{ xs: 0, md: 1 }}
                  >
                    {faq.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
