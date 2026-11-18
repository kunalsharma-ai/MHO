import "./globals.css";

import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import { Toast } from "@/components";
import "@/lib/enhancements.js";
import { ContextProviders } from "@/Context";
import { GoogleTagManager } from "@next/third-parties/google";
import ChatWidget from "@/componentsMHO/ChatWidget";
import RecentActivityPopup from "@/componentsMHO/RecentActivityPopup";
import LanguageSync from "@/componentsMHO/LanguageSync";
import MetaPixel from "@/componentsMHO/MetaPixel";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/css/style.css" as="style" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>
          My Health Opinions | Healthcare Surveys & Rewards Community
        </title>
        <meta
          name="description"
          content="Join My Health Opinions, a trusted healthcare survey community where patients and consumers participate in medical research surveys and earn exciting rewards for sharing their opinions. "
        />
        <meta
          name="keywords"
          content="healthcare surveys, 
          medical research surveys, 
          patient opinion surveys, 
          healthcare rewards platform, 
          online health surveys, 
          medical survey panel, 
          patient research community, 
          health opinion platform, 
          healthcare market research, 
          paid healthcare surveys, 
          medical research community, 
          health survey rewards, 
          patient feedback surveys, 
          healthcare consumer panel, 
          medical opinion surveys, 
          online patient surveys, 
          healthcare research panel, 
          consumer healthcare surveys, 
          pharma market research, 
          healthcare insights platform "
        />
      </head>
      <body>
        <Providers>
          <ContextProviders>
            <CssBaseline />
            <LanguageSync />
            <MetaPixel />
            <main role="main">{children}</main>
            {/* <ChatWidget /> */}
            <Toast />
          </ContextProviders>
        </Providers>
        {/* <scrip src="/wasm_exec.js" /> */}
        {/* <call-us-selector
          phonesystem-url="https://1706.3cx.cloud"
          party="frequent"
        ></call-us-selector>
        <script
          defer
          src="https://downloads-global.3cx.com/downloads/livechatandtalk/v1/callus.js"
          id="tcx-callus-js"
        ></script> */}
        <GoogleTagManager gtmId="GTM-549KJ2GG" />
      </body>
    </html>
  );
}
