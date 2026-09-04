import React from "react";
import { Grid, Typography, List, ListItem } from "@mui/material";
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
      <SubHeader title="Terms and Conditions" pageName="Terms and Conditions" />
      <Grid
        size={{ xs: 11, md: 8 }}
        container
        justifyContent={"center"}
        direction={"column"}
        py={7}
        textAlign={"justify"}
      >
        <Typography fontSize={"18px"} fontWeight={"bold"}>
          My Health Opinions Terms of Use
        </Typography>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          1. Definitions
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            <b>The Licensor</b> –{" "}
            <Typography
              component={"a"}
              target="_blank"
              href="https://www.frequentresearch.com"
              fontSize={"16px"}
              color="secondary.main"
              fontWeight={600}
            >
              Frequent Research Fieldwork Solutions Private Limited
            </Typography>
          </ListItem>
          <ListItem>
            <b>The Licensee / Subscriber</b> – Individuals registered with{" "}
            <Typography
              component={"a"}
              target="_blank"
              href="/"
              fontSize={"16px"}
              color="secondary.main"
              fontWeight={600}
            >
              MyHealthOpinions
            </Typography>
            .
          </ListItem>
          <ListItem>
            <b>The Product</b> – Survey Offers, Survey Rewards, Reward
            redemption by Gift Vouchers, PayPal, Bank Transfer as per Country
            guideline.
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          2. License Agreement
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            Please read these terms of use before signing your order form. By
            signing and submitting an My Health Opinions Order Form for any
            product, you and your organization, as the licensee, indicate your
            acceptance of these Terms and Conditions.
          </ListItem>
          <ListItem>
            The department responsible for the allocation of the product has a
            responsibility to inform users about the policy. The department
            shall ensure that all users receive instruction on what constitutes
            appropriate and inappropriate use of the product.
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          3. Usage Rights and Licensing Options
        </Typography>
        <Typography fontSize={"16px"} pt={1}>
          The Licensor grants the Licensee the following non-exclusive and
          non-transferable rights to the purchased Product or Products:
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            The Licensor’s Products are always restricted by copyright
            protection and additional restrictions may be placed on their use.
            The licensee must ensure that the report is used in an ethical and
            lawful manner and agrees to adhere to the restrictions in this
            document.
          </ListItem>
          <ListItem>
            Licensee may use the purchased Product in accordance with the terms
            of this Agreement.
          </ListItem>
          <ListItem>
            Licensee may use the strategic information in the Product in their
            company’s decision-making process.
          </ListItem>
          <ListItem>
            The following licensing options are applicable based on the
            License(s) designated by registration through panel:
            <List
              sx={{
                listStyleType: "lower-roman",
                pl: 2,
                "& .MuiListItem-root": {
                  textAlign: "justify",
                  display: "list-item",
                  py: 0.2,
                  fontSize: "16px",
                },
              }}
            >
              <ListItem>
                <b>Panel Registration</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    Each Panel registration is for use by a single individual
                    only. Usage rights may not be transferred, sold or
                    distributed by any means.
                  </ListItem>
                  <ListItem>
                    Registered users may not present or share the credential
                    publicly in part or in entirety under any circumstances.
                  </ListItem>
                  <ListItem>
                    Registered Member could opt for Account deletion request any
                    time.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                <b>Site License</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    A site license allows sharing of the reports between various
                    verified and signed client and according to the survey
                    offers at company’s designated business address within this
                    agreement.
                  </ListItem>
                  <ListItem>
                    The usage rights are licensed to any and all members of the
                    company. Usage rights may not be transferred, sold or
                    distributed outside of that specific location.
                  </ListItem>
                  <ListItem>
                    Licensee may share information from the report with other
                    licensed parties.
                  </ListItem>
                  <ListItem>
                    Licensee may create individual electronic and / or print
                    copies for distribution and sharing with other licensed
                    parties in accordance with this agreement.
                  </ListItem>
                  <ListItem>
                    Licensee may use information contained in the report for
                    presentation, citation or publication only with written
                    permission from the Licensor.
                  </ListItem>
                  <ListItem>
                    A site license is delivered in PDF format. Hard copies may
                    be requested at an additional charge.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                <b>Corporate License</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    A corporate license is for the use of one corporation. A
                    corporation is defined as any business entity incorporated
                    under a single name. Separate corporations operating under
                    the same parent company are not included in this license.
                  </ListItem>
                  <ListItem>
                    Usage rights are licensed to any and all members of the
                    purchasing corporation. Usage rights may not be transferred,
                    sold or distributed to any business entity of a different
                    name.
                  </ListItem>
                  <ListItem>
                    The Licensor will only deliver the report or any copies of
                    the report to the purchaser. Any other parties must contact
                    the purchaser directly.
                  </ListItem>
                  <ListItem>
                    A corporate license is delivered in PDF format. Hard copies
                    may be requested at an additional charge.
                  </ListItem>
                  <ListItem>
                    Licensee may share information from the report with other
                    licensed parties.
                  </ListItem>
                  <ListItem>
                    Licensee may create individual electronic and / or print
                    copies for distribution and sharing with other licensed
                    parties in accordance with this agreement.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                <b> Executive Summary</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    An Executive Summary is for use by a single individual only.
                    Usage rights may not be transferred, sold or distributed by
                    any means.
                  </ListItem>
                  <ListItem>
                    An Executive Summary can be purchased in PDF format.
                  </ListItem>
                  <ListItem>
                    An Executive Summary may not be copied, reproduced, or
                    adapted electronically or physically.
                  </ListItem>
                  <ListItem>
                    Information in the Executive Summary may be shared verbally
                    or visually so long as no reproduction is made.
                  </ListItem>
                  <ListItem>
                    Executive Summary users may not present or share the product
                    publicly (including shareholders and investors) in part or
                    in entirety under any circumstances.
                  </ListItem>
                  <ListItem>
                    Licensee may use information contained in the report for
                    presentation, citation or publication only with written
                    permission from the Licensor; except as provided in the
                    order form.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                <b>Enterprise License</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    An enterprise license is for use by any and all subsidiaries
                    of the purchasing parent company.
                  </ListItem>
                  <ListItem>
                    The usage rights are licensed to any and all members of the
                    business conglomerate. Usage rights may not be transferred,
                    sold or distributed outside of the business conglomerate.
                  </ListItem>
                  <ListItem>
                    An Enterprise license is delivered in PDF format. Hard
                    copies may be requested at an additional charge.
                  </ListItem>
                  <ListItem>
                    Licensee may share information from the report with other
                    licensed parties.
                  </ListItem>
                  <ListItem>
                    Licensee may create individual electronic and / or print
                    copies for distribution and sharing with other licensed
                    parties in accordance with this agreement.
                  </ListItem>
                  <ListItem>
                    Licensee may use information contained in the report for
                    presentation, citation or publication only with written
                    permission from the Licensor.
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          4. Reimbursement Tracker
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            The Licensor carries on the business of providing market
            intelligence, monitoring and competitive insight, as well as
            tracking reimbursements for medical device and pharmaceutical
            companies around the world.
          </ListItem>
          <ListItem>
            The Licensee has represented that the Licensee intends to use the
            Services from the Licensor to have access to timely reimbursement
            information and incorporate such information into the Licensee’s own
            reports and products.
          </ListItem>
          <ListItem>
            NOW THEREFORE, in consideration of the premises and the mutual
            covenants and agreements contained in this Agreement and for other
            good and valuable consideration, the receipt and sufficiency of
            which are herein acknowledged by each party herein, the parties
            hereby covenant and agree as follows:
            <List
              sx={{
                listStyleType: "lower-roman",
                pl: 2,
                "& .MuiListItem-root": {
                  textAlign: "justify",
                  display: "list-item",
                  py: 0.2,
                  fontSize: "16px",
                },
              }}
            >
              <ListItem>
                <b>Definitions</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    Services – Reimbursement Tracking or any other services
                    provided to the Subscriber as specified in Schedule A.
                  </ListItem>
                  <ListItem>
                    Subscription Fee – Agreed price for subscribing to the
                    Services as specified in Schedule A.
                  </ListItem>
                  <ListItem>
                    Therapeutic Area – A logical categorization of medical
                    devices and procedures based on common terminology.
                  </ListItem>
                  <ListItem>
                    Subsegment – A smaller grouping of medical devices and
                    procedures that falls under a larger Therapeutic Area and
                    more specifically referring to a group of keywords for
                    Reimbursement Tracker.
                  </ListItem>
                  <ListItem>
                    Keywords – A set of chosen phrases, names, medical
                    procedures, medical devices, product names and codes used to
                    track policies within Reimbursement Tracker.
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>
                <b>General</b>
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    Licensor will provide the Services to the Subscriber as
                    mentioned in Schedule A.
                  </ListItem>
                  <ListItem>
                    The Subscriber’s department or departments responsible for
                    the allocation of the Services subscribed to from the
                    Licensor has the responsibility to inform the Subscriber’s
                    licensed users (as defined in Section 3) of the Services and
                    the terms of use indicated in this Agreement. The Subscriber
                    accepts that the Services licensed from the Licensor are for
                    internal use of the Subscriber by its licensed users (as
                    defined in Section 3) and access to such Services will not
                    be shared with entities outside of the Subscriber without
                    prior written permission from the Licensor.
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            USAGE RIGHTS AND LICENSING OPTIONS – The Licensor grants to the
            Subscriber the following non-exclusive, corporate-wide, and
            non-transferable rights to the subscription Services.
            <List
              sx={{
                listStyleType: "lower-roman",
                pl: 2,
                "& .MuiListItem-root": {
                  textAlign: "justify",
                  display: "list-item",
                  py: 0.2,
                  fontSize: "16px",
                },
              }}
            >
              <ListItem>
                The Licensor’s technology is always restricted by copyright
                protection and additional restrictions may be placed on their
                use at the discretion of the Licensor in agreement with the
                Subscriber. The Subscriber must ensure that the Services are
                used in an ethical and lawful manner and agrees to adhere to the
                restrictions in this Agreement.
              </ListItem>
              <ListItem>
                Subscriber may use the Services in accordance with the Terms of
                this Agreement. The following licensing option is applicable
                based on the license(s) designated on the signed order form:
                <List
                  sx={{
                    listStyleType: "number",
                    pl: 2,
                    "& .MuiListItem-root": {
                      textAlign: "justify",
                      display: "list-item",
                      py: 0.2,
                      fontSize: "16px",
                    },
                  }}
                >
                  <ListItem>
                    <b>Corporate License</b>
                    <List
                      sx={{
                        listStyleType: "lower-alpha",
                        pl: 2,
                        "& .MuiListItem-root": {
                          textAlign: "justify",
                          display: "list-item",
                          py: 0.2,
                          fontSize: "16px",
                        },
                      }}
                    >
                      <ListItem>
                        Usage rights are licensed for up to 5 users within the
                        Subscriber’s company unless otherwise stated within the
                        signed proposal. Additional licenses may be requested
                        from the Licensor at an additional charge. Usage rights
                        may not be transferred, sold or distributed to any
                        business entity of a different name.
                      </ListItem>
                      <ListItem>
                        The Licensor will only deliver the Services to the
                        person designated as Subscriber.
                      </ListItem>
                      <ListItem>
                        The Services under this corporate license agreement are
                        delivered under the Reimbursement Tracker portal, a
                        web-based subscription service provided by the Licensor,
                        for a period of 12-months from the starting date of this
                        Agreement.
                      </ListItem>
                      <ListItem>
                        The access to Reimbursement Tracker web-based portal by
                        the Subscriber will expire following 12 calendar months
                        from the date of this Agreement.
                      </ListItem>
                      <ListItem>
                        Upon reactivation within 6 months of expiration, the
                        Licensor will provide access to the original
                        customization at no additional fees. If any additional
                        customizations are required, or if reactivation is
                        beyond this time period, additional fees will apply.
                      </ListItem>
                      <ListItem>
                        The Licensor does not guarantee continued access to
                        every policy currently tracked in Reimbursement Tracker
                        due to reliance on infrastructure that is outside of the
                        control of the Licensor.
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    <b>Service Customization and Setup</b>
                    <List
                      sx={{
                        listStyleType: "lower-alpha",
                        pl: 2,
                        "& .MuiListItem-root": {
                          textAlign: "justify",
                          display: "list-item",
                          py: 0.2,
                          fontSize: "16px",
                        },
                      }}
                    >
                      <ListItem>
                        Included in the initial service setup are 4 Subsegments
                        per therapeutic area of subscription. Each Subsegment
                        must consist of at least 1 keyword and a maximum of 15.
                      </ListItem>
                      <ListItem>
                        The Licensor is responsible for the initial setup of
                        customization at a rate of 2 weeks per therapeutic area.
                        This customization is subject to minor revisions based
                        on feedback from the Licensee / Subscriber for the
                        duration of the subscription.
                      </ListItem>
                      <ListItem>
                        The Licensee / Subscriber is responsible for providing
                        keywords related to the policies they want to track. The
                        Licensor will advise the Licensee on ways to improve the
                        accuracy to which the keywords successfully track
                        policies. The Licensor does not guarantee the ability to
                        track every desired policy with the given keywords, and
                        does not guarantee the exclusion of undesired policies.
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          5. Limitation of Use – Applicable to All License Options
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            Licensee / Subscriber does not have the right to inquire after or be
            informed on proprietary information including, but not limited to,
            specific sources of data collection. The Licensor’s research
            methodology is publicly available and included in every product.
            Individual sources of information are confidential and will not be
            disclosed to any purchasing party.
          </ListItem>
          <ListItem>
            Licensee / Subscriber may not use or copy the Product except as
            defined by this Agreement. Licensee may not transfer the right of
            license in any way to any party not covered under the original
            license agreement. Permission to distribute the Product in whole or
            in part, or as part of a derivative work outside of the originally
            licensed party or parties is not granted by this Agreement and is
            specifically prohibited.
          </ListItem>
          <ListItem>
            Licensee / Subscriber may not modify, adapt or translate the product
            in any way unless defined by this Agreement. The Licensee /
            Subscriber may not incorporate the Product into another product for
            commercial or non-profit distribution. Permission to prepare
            derivative works incorporating the product in whole or in part for
            use only by Licensee (for single license users) or by Licensee’s
            organization (for corporate or enterprise license holders) must be
            granted to the licensee in writing by the Licensor. Such derivative
            works may not be used or distributed, commercially or privately,
            outside of the Licensee’s organization; except as provided in the
            Order Form.
          </ListItem>
          <ListItem>
            Licensee / Subscriber may not use the product in any way that could
            cause material financial harm to the Licensor or result in any
            potential loss in profit for the Licensor.
          </ListItem>
          <ListItem>
            Licensee / Subscriber may not publicly cite and distribute
            information from the Product without express written permission from
            the Licensor.
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          6. Ownership and Copyright
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            Title, ownership right in and intellectual property rights to the
            Products and all copies thereof shall remain with the Licensor.
          </ListItem>
          <ListItem>
            Licensee agrees
            <List
              sx={{
                listStyleType: "lower-alpha",
                pl: 2,
                "& .MuiListItem-root": {
                  textAlign: "justify",
                  display: "list-item",
                  py: 0.2,
                  fontSize: "16px",
                },
              }}
            >
              <ListItem>
                Not to remove any copyright notice from the Product(s).
              </ListItem>
              <ListItem>
                To reproduce all such notices on any authorized copies.
              </ListItem>
              <ListItem>
                To use best efforts to prevent any unauthorized copying of the
                Product(s).
              </ListItem>
            </List>
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          7. Limited Warranty
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            The Licensor warrants that it has the right to enter into this
            Agreement, to distribute the Product(s) and to grant the rights
            herein to the Licensee and that the Product(s) is/are not in
            violation of any patent, copyright, trademark, trade secret or other
            proprietary right or contract right of any third party.
          </ListItem>
          <ListItem>
            For reports purchased prior to their publication date, the Licensor
            does not warrant a specific completion or delivery date and orders
            may not be cancelled based on delivery date.
          </ListItem>
          <ListItem>
            Anticipated publication dates given are estimates only and may be
            altered at any time. Best efforts will always be made to meet the
            needs of the Licensee, but orders may not be cancelled based on
            failure to meet an anticipated delivery date.
          </ListItem>
          <ListItem>
            The Licensor makes no representation or warranty that its product(s)
            meet(s) the Licensee’s particular standards, requirements, or needs.
          </ListItem>
          <ListItem>
            Once the Product has been delivered, the order cannot be cancelled
            for any reason, including but not limited to product dissatisfaction
            or timeliness. The Licensor reserves the exclusive right to
            terminate an agreement once an order has been signed, submitted and
            filled.
          </ListItem>
          <ListItem>
            The Licensor specifically disclaims all other warranties,
            representation, or condition, express or implied, including but not
            limited to an implied warranty or condition of merchantability or
            fitness for a particular purpose. All other implied terms are
            excluded.
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          8. Limitation of Liability
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            The entire and exclusive liability and remedy shall be limited to
            replacement of physically defective media or documentation and shall
            not include or extend to any claim for or right to recover any other
            damages, including but not limited to, loss of profit, data, or
            special, incidental or consequential damages, punitive damages or
            other similar claims, even if the Licensor has been specifically
            advised of the possibility of such damages. In no event will the
            Licensor’s liability for any damages to Licensee or any third party
            ever exceed the original purchase amount of the Product.
          </ListItem>
          <ListItem>
            No employee of the Licensor may be held publicly or personally
            liable for any Product content.
          </ListItem>
          <ListItem>
            Provided that the content is only used in accordance with this
            agreement for any breach of the warranties set forth in Section 6.1
            above, Licensor agrees, subject to the terms of this Section 7 and
            Section 6 above, to defend, indemnify and hold harmless Licensee,
            and each of Licensee’s respective officers, directors and employees,
            from all damages, liabilities and expenses (including reasonable
            outside legal fees) arising out of or in connection with any breach
            or alleged breach by Licensor of its warranty in Section 6.1 above.
            This indemnification does not apply to Licensee’s continued use of
            content following notice from Licensor that the content is subject
            to a claim of infringement of a third party’s right. This
            indemnification against third party claims for a breach of warranty
            is not subject to the limitations of Section 6.1 above.
          </ListItem>
        </List>

        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          9. Entire Agreement
        </Typography>
        <List
          sx={{
            listStyleType: "lower-alpha",
            pl: 4,
            "& .MuiListItem-root": {
              textAlign: "justify",
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            This Terms of Use Agreement represents the complete agreement
            between the parties relating to this license for the Licensor’s
            Product(s) and supersedes all prior agreements, communications,
            proposals, and representations between the parties and prevails over
            any conflicting or additional terms of any quote, order,
            acknowledgment or similar communication. This agreement may be
            updated by the Licensor with the written agreement of the Licensee.
            Any modifications of this agreement by the Licensee must be agreed
            to and signed by the Licensor. Notwithstanding the foregoing,
            acceptance of a clickthrough license by Licensee shall not
            constitute a written modification of this Agreement, and the terms
            of this Agreement shall supersede any clickthrough license now or
            hereafter entered into by the parties.
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default page;
