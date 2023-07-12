import AboutPage from "pages/about/UI/AboutPage";

import { RouteProps } from "react-router-dom";
import { MainPage } from "pages/main";
import { MainPageLazy } from "pages/main/UI/MainPage.lazy";
import { AboutPageLazy } from "pages/about";
import { PsyRoom } from "pages/PsyRoom";

export enum AppRoutes {
  Main = "main",
  About = "about",
  PsyRoom = "psyroom",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: "/main",
  [AppRoutes.About]: "/about",
  [AppRoutes.PsyRoom]: "/psyroom",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.Main]: {
    path: RoutePath[AppRoutes.Main],
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
};
