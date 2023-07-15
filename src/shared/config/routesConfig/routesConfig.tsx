import AboutPage from "pages/about/UI/AboutPage";

import { RouteProps } from "react-router-dom";
import { MainPage } from "pages/main";
import { PsyRoom } from "pages/PsyRoom";
import Error404 from "pages/404/Error404";

export enum AppRoutes {
  Main = "main",
  Home = "home",
  About = "about",
  PsyRoom = "psyroom",
  NotFound = "not-found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: "/main",
  [AppRoutes.Home]: "/home",
  [AppRoutes.About]: "/about",
  [AppRoutes.PsyRoom]: "/psyroom",
  [AppRoutes.NotFound]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.Main]: {
    path: RoutePath[AppRoutes.Main],
    element: <MainPage />,
  },
  [AppRoutes.Home]: {
    path: RoutePath[AppRoutes.Home],
    element: <MainPage />,
  },
  [AppRoutes.About]: {
    path: RoutePath[AppRoutes.About],
    element: <AboutPage />,
  },
  [AppRoutes.PsyRoom]: {
    path: RoutePath[AppRoutes.PsyRoom],
    element: <PsyRoom />,
  },
  [AppRoutes.NotFound]: {
    path: RoutePath[AppRoutes.NotFound],
    element: <Error404 />,
  },
};
