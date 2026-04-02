"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import theme from "@/theme/theme.js";
import "@/lib/enhancements.js";
import { MemberProvider, QueryProvider } from "@/Context";
import { TelemetryProvider } from "@/Context/telemetry";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";

// Create the cache once
function createEmotionCache() {
  return createCache({ key: "mui", prepend: true });
}

export default function Providers({ children }) {
  const [cache] = React.useState(() => {
    const cache = createEmotionCache();
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={ `${cache.key} ${Object.keys(cache.inserted).join(" ")}` }
        dangerouslySetInnerHTML={ {
          __html: Object.values(cache.inserted).join(" "),
        } }
      />
    );
  });

  return (
    <React.Suspense fallback={ <LoadingOverlay /> }>
      <CacheProvider value={ cache }>
        <ThemeProvider theme={ theme }>{ children }</ThemeProvider>
      </CacheProvider>
    </React.Suspense>
  );
}
