import { someFn } from "./test";
import { render } from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "./theme/ThemeContext";
import ThemeProvider from "./theme/ThemeProvider";

console.log("xxx");

someFn();

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
