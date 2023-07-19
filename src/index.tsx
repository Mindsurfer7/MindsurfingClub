import { render } from "react-dom";
import "./App/styles/index.scss";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "App/providers/ThemeProvider";
import "shared/config/i18next/i18n";
import { StoreProvider } from "App/providers/StoreProvider";

//import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"ff

render(
  <StoreProvider>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StoreProvider>,

  document.getElementById("root")
);
