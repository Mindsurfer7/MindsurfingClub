import { Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import MainPage from "pages/main/UI/MainPage";
import AboutPage from "pages/about/UI/AboutPage";
import { Link } from "react-router-dom";
import { Suspense, useContext, useState } from "react";
import {
  Theme,
  ThemeContext,
} from "App/providers/ThemeProvider/lib/ThemeContext";

import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "App/providers/ThemeProvider";
import { AppRouter } from "./providers/Router";
import { NavBar } from "widgets/NavBar";
import { Sidebar } from "widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <NavBar />

        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
