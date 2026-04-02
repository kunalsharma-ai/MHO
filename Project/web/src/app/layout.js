import "./globals.css";

import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import { Toast } from "@/components";
import "@/lib/enhancements.js";
import { ContextProviders } from "@/Context";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/css/style.css" as="style" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>My Health Opinions – Earn Rewards for Sharing Your Voice</title>
        <meta
          name="description"
          content="Join My Health Opinions — a trusted platform where doctors and patients share insights and earn rewards for participating in surveys that shape better healthcare."
        />
        <meta
          name="keywords"
          content="health survey, doctors, patients, rewards, healthcare opinions, medical surveys, healthcare research"
        />
        <meta name="author" content="My Health Opinions" />

        <meta
          property="og:title"
          content="My Health Opinions – Earn Rewards for Sharing Your Voice"
        />
        <meta
          property="og:description"
          content="Join doctors and patients in shaping healthcare by sharing your insights. Earn rewards for your valuable opinions."
        />
        <meta property="og:url" content="https://myhealthopinions.com/" />
        <meta property="og:site_name" content="My Health Opinions" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://myhealthopinions.com/images/logo/My-Health-Opinions.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="480" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="My Health Opinions – Earn Rewards for Sharing Your Voice"
        />
        <meta
          name="twitter:description"
          content="Doctors and patients share insights and earn rewards for surveys that improve healthcare outcomes."
        />
        <meta
          name="twitter:image"
          content="https://myhealthopinions.com/images/logo/My-Health-Opinions.png"
        />

        {/* <link rel="canonical" href="https://myhealthopinions.com/" /> */}
      </head>
      <body>
        <Providers>
          <ContextProviders>
            <CssBaseline />
            <main role="main">{children}</main>
            <Toast />
          </ContextProviders>
        </Providers>
        {/* <scrip src="/wasm_exec.js" /> */}
        {/* <call-us-selector
          phonesystem-url="https://1697.3cx.cloud"
          party="frequentresearch"
        ></call-us-selector>
        <script
          defer
          src="https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js"
          id="tcx-callus-js"
        ></script> */}
      </body>
    </html>
  );
}
