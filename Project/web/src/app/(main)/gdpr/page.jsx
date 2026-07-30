import React from "react";
import { Grid, Typography } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";

function page() {
  return (
    <Grid
      size={12}
      container
      direction="column"
      alignItems={"center"}
      className="scroll-target"
    >
      <SubHeader title="GDPR Compliance" pageName="GDPR Compliance" />
      <Grid
        size={{ xs: 11, md: 8 }}
        container
        justifyContent={"center"}
        direction={"column"}
        py={7}
        // px={2}
        textAlign={"justify"}
      >
        <Typography
          lineHeight={"1.5"}
          fontSize={"22px"}
          color="secondary.main"
          fontWeight={"bold"}
        >
          GDPR Compliance
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          It’s been more than a year since GDPR came into effect. GDPR affects
          all EU nationals and the companies concerned with them in any way.
          Since then the way data is collected, stored, processed and analysed
          has changed a lot, which implies that market research has changed.
          GDPR survey is all about dealing with one’s personal data such that it
          doesn’t reveal his/her identity.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          There are various methods of doing market research and can be broadly
          classified into quantitative and qualitative methods. Quantitative
          methods involve statistical methods, surveys, interviews,
          questionnaires, focus groups, and many more. Qualitative methods rely
          on subjective data such as expressions, emotions, mannerisms, body
          language, etc. Now the organizations need to be more careful with not
          just individual elements of personal data, but even if the combination
          of those elements can identify an individual. GDPR compliant market
          research companies will have to be just more careful about how they
          deal with data.
        </Typography>
        <Typography
          lineHeight={"1.5"}
          fontSize={"16px"}
          mt={2}
          fontWeight={"bold"}
        >
          Things to keep in mind while doing GDPR compliant market research
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          In order to comply with GDPR law, organizations must identify how the
          data they collect fit their business and their research projects.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          For instance, while storing cookies on the user’s machine, websites
          must mention the purpose behind them in the download pop-up. Also,
          websites need to declare at the same time what will the information
          collected be used for. Say, in case the cookies will be used for
          sending discounts and offers or marketing emails, it must be declared
          in the pop-up.
        </Typography>
        <Typography
          lineHeight={"1.5"}
          fontSize={"16px"}
          mt={2}
          fontWeight={"bold"}
        >
          Get the consent of your target audience.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          Say, you are conducting a survey to know the favorite meal of the
          population aged 27-35. If this survey is a part of the GDPR market
          research project, you must make sure your email list has people who
          have shown willingness to be contacted for any opinion or feedback
          survey. While asking for their consent, you must explicitly mention
          that they will be contacted for surveys. This means you will not be
          able to send them marketing emails or newsletters unless they have
          subscribed to them.
        </Typography>

        <Typography
          lineHeight={"1.5"}
          fontSize={"16px"}
          mt={2}
          fontWeight={"bold"}
        >
          While contacting people to gather data, ask questions like,
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          “Are they the right people to contact?”,
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          “Will I get the information I need for my market research?”,
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          “Do I have permission to contact them?”
        </Typography>

        <Typography
          lineHeight={"1.5"}
          fontSize={"16px"}
          mt={2}
          fontWeight={"bold"}
        >
          Keep a link to your data privacy and security policies.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          When people trust that their personal data is safe and will not be
          misused by the market research companies, they may not hesitate to
          share details about them. However, in case though you might not use
          their personal data, if you are sharing it with any third-party,
          mention it explicitly.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          With GDPR market research regulations, companies would also need to
          stay ethical in terms of what they do with the data. If you are
          collecting personal data and are keeping it safe at your end, but
          sharing it with third-party, then you must declare it at the point of
          data collection as well as on your website. Suppose, if you are
          running a survey, then you must keep a link to your privacy policies
          in the invitation email as well as on the website.
        </Typography>

        <Typography
          lineHeight={"1.5"}
          fontSize={"16px"}
          mt={2}
          fontWeight={"bold"}
        >
          Let your respondents know for long will you be using the GDPR market
          research data.
        </Typography>

        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          Market research methods such as online surveys and questionnaires
          collect data by asking a set of questions. Once, a good number of
          responses are received, the data is stored in databases and used to
          generate various analytics reports. If you let the respondents know
          that you will be storing data for a fixed duration, it can help you
          get consent from more people. Once the validity period is over,
          destroy the data. This helps in protecting data from being accessed by
          unauthorized use. Also, GDPR allows individuals the right to erase or
          forget the information collected about them.
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px" mb={1}>
          Few people have concerns about where the data collected about EU
          nationals will be stored. Storing sensitive data outside the
          geographical boundaries may not give them enough control over it.
          Particularly, when data is stored in the cloud where the division of
          responsibility isn’t clear a few times. It can be a matter of
          discussion in such cases, as to whether the cloud service provider,
          vendor partner or the customer will be responsible for the data
          security and privacy. Because of this ambiguity and susceptibility to
          security attacks, cloud storage hasn’t been considered to be too safe.
          However, with the passage of time, the cloud computing model has
          matured and hence, such fears have dispersed to a great extent. In
          general, GDPR compliance reinforces the good practice that a market
          research company should follow. There is nothing to fear if you are
          handling the data with care!
        </Typography>
        <Typography lineHeight={"1.5"} fontSize="16px">
          In case you have queries about GDPR compliant market research, get in
          touch with us at{" "}
          <Typography
            lineHeight={"1.5"}
            component={"a"}
            fontSize={"16px"}
            color="secondary.main"
            fontWeight={"bold"}
            href="mailto:support@myhealthopinions.com."
          >
            support@myhealthopinions.com.
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default page;
