import React from "react";

import SubHeader from "@/componentsMHO/SubHeader";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    title: "How do I become a member?",
    content: `My Health Opinions is dedicated healthcare panel for Doctors, Caregiver and Patient category.

To register on My Health Opinions, You need to choose the respective category before registration. You will be asked to provide some basic questions while creating your account, as well as the option to provide some more in-depth information about yourself in order to participate in our surveys. After completing the signup form, My Health Opinions panel will send a confirmation email into your registered email ID in order to confirm the profile validity and finalize your registration process. Alternatively, You may click the link in your email to confirm your registration over panel and to receive the survey access.`,
  },
  {
    title: "Any hidden charges while registration?",
    content: `Registration to My Health Opinions is completely free - you will not be asked for any payment. On the contrary, it is you who earns points that can be exchanged for PayPal, UPI, Wire Transfer, Gift vouchers etc., by taking participation in our sponsored surveys.`,
  },
  {
    title: "Why should I become a member of My Health Opinions?",
    content: `Becoming a member lets you take part in surveys on different topics. You can then start to accumulate the rewards after achieving the minimum threshold points. You can redeem for an incentive of your choice from “Redeem Now” button from Dashboard.`,
  },
  {
    title: "How do I change my email address and password?",
    content: `Due to security, My Health Opinions don’t allow updating the primary email ID for the profile. You may contact support team at support@frequentresearch.com for any type of email update request.

You can change your password after login to the My Health Opinions Dashboard,  Go to “Change Password” section after selecting Settings option in Sidebar.`,
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

function page() {
  return (
    <Grid
      size={12}
      container
      direction="column"
      alignItems={"center"}
      className="scroll-target"
    >
      <SubHeader title="FAQ" pageName="faq" />
      <Grid size={{ xs: 11, md: 8 }} container justifyContent={"center"} py={5}>
        <Typography fontWeight={"bold"} fontSize={"24px"}>
          Do You Have{" "}
          <Typography
            fontSize={"24px"}
            component="span"
            color="secondary.main"
            fontWeight={"bold"}
          >
            Any Question?
          </Typography>
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
                p: 1.5,
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
                <Typography fontSize={"15px"} textAlign={"justify"} p={1}>
                  {faq.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default page;
