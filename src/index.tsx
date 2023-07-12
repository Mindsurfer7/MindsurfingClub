import { someFn } from "./test";
import { render } from "react-dom";
import React from "react";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "./App/providers/ThemeProvider/lib/ThemeContext";
import { ThemeProvider } from "App/providers/ThemeProvider";

import "shared/config/i18next/i18n";

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
