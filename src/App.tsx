import { Route, Routes } from "react-router-dom";
import { Counter } from "./components/Counter";
import "./styles/index.scss";
import MainPage from "./components/pages/main/MainPage";
import AboutPage from "./components/pages/about/AboutPage";
import { Link } from "react-router-dom";
import { AboutPageLazy } from "./components/pages/about/AboutPage.lazy";
import { MainPageLazy } from "./components/pages/main/MainPage.lazy";
import { Suspense, useContext, useState } from "react";
import { Theme, ThemeContext } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./tools/classNames/classNames";

const App = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={switchTheme}>Switch</button>
      <Link to={"/main"}>glava</Link>
      <Link to={"/about"}>about</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/about"} element={<AboutPageLazy />} />
          <Route path={"/main"} element={<MainPageLazy />} />
        </Routes>
      </Suspense>
      <Counter />
    </div>
  );
};

export default App;
