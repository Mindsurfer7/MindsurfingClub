import { render } from "react-dom";
import "./App/styles/index.scss";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "App/providers/ThemeProvider";
import "shared/config/i18next/i18n";

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"ff

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
