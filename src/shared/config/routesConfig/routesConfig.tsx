import AboutPage from 'pages/about/UI/AboutPage';

import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/main';
import { PsyRoom } from 'pages/PsyRoom';
import Error404 from 'pages/404/Error404';
import PracticeCenter from 'pages/PracticeCenter/UI/PracticeCenter';

export enum AppRoutes {
  Main = 'main',
  Home = 'home',
  About = 'about',
  PsyRoom = 'psyroom',
  PracticeCenter = 'practiceCenter',
  NotFound = 'not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Home]: '/home',
  [AppRoutes.About]: '/about',
  [AppRoutes.PsyRoom]: '/psyroom',
  [AppRoutes.PracticeCenter]: '/practiceCenter',
  [AppRoutes.NotFound]: '*',
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
  [AppRoutes.PracticeCenter]: {
    path: RoutePath[AppRoutes.PracticeCenter],
    element: <PracticeCenter />,
  },
  [AppRoutes.NotFound]: {
    path: RoutePath[AppRoutes.NotFound],
    element: <Error404 />,
  },
};
