import ReactDOM from "react-dom/client";
import { Index } from "./pages/Index";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import stylisRTLPlugin from "stylis-plugin-rtl";
import "./main.css";
import { createTheme } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    warning: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});

root.render(
    <ThemeProvider theme={theme}>
      <Index />
    </ThemeProvider>
);
