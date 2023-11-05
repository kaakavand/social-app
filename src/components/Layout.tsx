// import React from 'react'
import React, { useEffect, useState } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Drawer from "@mui/material/Drawer";
import TuneIcon from "@mui/icons-material/Tune";
import DarkModeMenu from "./DarkModeMenu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const profileImage = require("./../assets/images/profile.jpg");
const iranImage = require("./../assets/images/Flag-Iran.webp");

const Layout = ({ children, themeChenge }: {children : ReactJSXElement, themeChenge : Function}) => {
  const [thmeState, setThemeState] = useState<"dark" | "light">("dark");
  const theme = createTheme({
    palette: {
      mode: thmeState,
      warning: {
        main: "#FFAA28",
        light: "#757ce8",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
    direction: "rtl",
  });

  useEffect(() => {
    themeChenge(theme.palette.mode);
  }, []);

  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const [state, setState] = React.useState({ right: false });

  type Anchor = "top" | "left" | "bottom" | "right";

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, ["right"]: open });
    };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Box display={"flex"} justifyContent={'space-between'} padding={2} alignItems={'center'} sx={{background: theme.palette.mode === "dark" ? "#151B25" : "#fff",}}>
            <SearchIcon sx={{color: theme.palette.mode === "dark" ? "#fff" : "#151B25",}}/>
            <header className="header">
              <img className="lang" src={iranImage} alt="language" />
              <img src={profileImage} alt="profile" />
            </header>
          </Box>
          <div>
            <React.Fragment key={"right"}>
              <Drawer
                anchor={"right"}
                open={state.right}
                onClose={toggleDrawer("right", false)}
                sx={{
                  position: "relative",
                  borderRadius: "15px",
                  overflow: "initial",
                }}
              >
                {!state.right ? (
                  <TuneIcon
                    sx={{
                      position: "fixed",
                      top: "50%",
                      // right: "0",
                      background: "#fff",
                      color: "#212121",
                      padding: "4px",
                      borderRadius: "7px 0px 7px 7px",
                      cursor: "pointer",
                    }}
                    onClick={() => setState({ right: true })}
                  />
                ) : (
                  <CloseIcon
                    onClick={() => setState({ right: false })}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      bottom: "50%",
                      left: "-24px",
                      background: "#fff",
                      color: "#212121",
                      padding: "4px",
                      borderRadius: "7px 0px 7px 7px",
                      cursor: "pointer",
                    }}
                  />
                )}

                <DarkModeMenu
                  changTheme={(value: 'dark' | 'light') => {
                    setThemeState(value);
                    themeChenge(value);
                  }}
                />
              </Drawer>
            </React.Fragment>
            <div
              style={{
                background: theme.palette.mode === "dark" ? "#151B25" : "#fff",
              }}
            >
              <Container maxWidth="md">{children}</Container>;
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>

      <TuneIcon
        sx={{
          position: "fixed",
          top: "50%",
          left: "0",
          background: "#fff",
          color: "#212121",
          padding: "4px",
          borderRadius: "0px 7px 7px 7px",
          cursor: "pointer",
        }}
        onClick={() => setState({ right: true })}
      />
    </>
  );
};

export default Layout;
