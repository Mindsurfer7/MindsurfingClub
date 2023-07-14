import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Preloader from "shared/UI/Preloader/Preloader";
import { routeConfig } from "shared/config/routesConfig/routesConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => {
          return (
            <Route
              key={path}
              element={<div className="page-wrapper">{element}</div>}
              path={path}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
