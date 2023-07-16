import { Suspense, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "App/providers/ThemeProvider";
import { AppRouter } from "./providers/Router";
import { NavBar } from "widgets/NavBar";
import { Sidebar } from "widgets/Sidebar";
import Modal from "shared/UI/Modal/Modal";
import Modal2 from "shared/UI/Modal/Modal2";

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
