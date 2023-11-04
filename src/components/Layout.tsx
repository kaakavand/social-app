// import React from 'react'
import React from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    mode: "dark",
    warning: {
      main: "#FFAA28",
      light: "#757ce8",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
  direction: "rtl", // Both here and <body dir="rtl">
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Layout = ({ children }: any) => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">{children}</Container>;
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;