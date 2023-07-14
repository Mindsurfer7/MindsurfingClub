import { render } from "react-dom";
import React from "react";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "App/providers/ThemeProvider";
import "shared/config/i18next/i18n";

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
