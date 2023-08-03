import AboutPage from 'pages/about/UI/AboutPage';

import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/main';
import { PsyRoom } from 'pages/PsyRoom';
import Error404 from 'pages/404/Error404';
import PracticeCenter from 'pages/PracticeCenter/UI/PracticeCenter';
import { ProfilePageAsync } from 'pages/ProfilePage'; //import ProfilePage from 'pages/ProfilePage/UI/ProfilePage';
import ChatWindow from 'pages/PsyRoom/UI/ChatWindow/ChatWindow';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  requiresGoogleAuth?: boolean;
};

export enum AppRoutes {
  Main = 'Main',
  Home = 'Home',
  About = 'About',
  PsyRoom = 'PsyRoom',
  Conversation = 'Conversation',
  Profile = 'Profile',
  PracticeCenter = 'PracticeCenter',
  NotFound = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Home]: '/home',
  [AppRoutes.About]: '/about',
  [AppRoutes.PsyRoom]: '/psyroom',
  [AppRoutes.Profile]: '/profile',
  [AppRoutes.PracticeCenter]: '/practiceCenter',
  [AppRoutes.Conversation]: '/:conversationID',
  [AppRoutes.NotFound]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
    //requiresGoogleAuth: true,
  },
  [AppRoutes.Conversation]: {
    path: `${RoutePath[AppRoutes.Conversation]}/:conversationId`,
    element: <ChatWindow />,
  },
  [AppRoutes.Profile]: {
    path: RoutePath[AppRoutes.Profile],
    element: <ProfilePageAsync />,
    authOnly: true,
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
