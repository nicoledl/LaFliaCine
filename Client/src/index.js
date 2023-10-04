import React from "react";
import * as ReactDom from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
