import ReactDOM from "react-dom/client";
import { Index } from "./pages/Index";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import stylisRTLPlugin from "stylis-plugin-rtl";
import "./assets/styles/main.css";
import { createTheme } from "@mui/material";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <>
      <Index />
      <ToastContainer />
  </>
);
