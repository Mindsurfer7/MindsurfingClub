import AboutPage from 'pages/about/UI/AboutPage';

import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/main';
import { PsyRoom } from 'pages/PsyRoom';
import Error404 from 'pages/404/Error404';
import PracticeCenter from 'pages/PracticeCenter/UI/PracticeCenter';
import { ProfilePageAsync } from 'pages/ProfilePage'; //import ProfilePage from 'pages/ProfilePage/UI/ProfilePage';
import ChatWindow from 'pages/PsyRoom/UI/ChatWindow/ChatWindow';
import { ArticlesPageAsync } from 'pages/ArticlesPage';
import { PlayerSpaceAsync } from 'pages/PlayerSpace';
import { ArticleDetailsPageAsync } from 'pages/ArticleDetails';
import { CommunityAsync } from 'pages/Community/UI/Community.async';
import { SingleGroupPageAsync } from 'pages/SingleGroupPage';
import ChallengePage from 'pages/ChallengePage/UI/ChallengePage';
import { ChallengePageAsync } from 'pages/ChallengePage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  requiresGoogleAuth?: boolean;
};

export enum AppRoutes {
  Main = 'Main',
  Home = 'Home',
  About = 'About',
  PsyRoom = 'PsyRoom',
  Conversation = 'Conversation',
  Community = 'Community',
  Articles = 'articles',
  SingleArticle = 'SingleArticle',
  Profile = 'Profile',
  PracticeCenter = 'PracticeCenter',
  Challenge = 'Challenge',
  PlayerSpace = 'PlayerSpace',
  SingleGroup = 'SingleGroup',
  NotFound = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Home]: '/home',
  [AppRoutes.About]: '/about',
  [AppRoutes.PsyRoom]: '/psyroom',
  [AppRoutes.Profile]: '/profile/',
  [AppRoutes.PracticeCenter]: '/practiceCenter',
  [AppRoutes.PlayerSpace]: '/PlayerSpace',
  [AppRoutes.Conversation]: '/:conversationID',
  [AppRoutes.Community]: '/communities',
  [AppRoutes.Articles]: '/articles',
  [AppRoutes.SingleArticle]: '/articles/',
  [AppRoutes.SingleGroup]: '/communities/SingleGroup/',
  [AppRoutes.Challenge]: 'communities/SingleGroup/:publicID/challenge/',
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
    path: `${RoutePath.Conversation}/:conversationId`,
    element: <ChatWindow />,
  },
  [AppRoutes.Profile]: {
    path: `${RoutePath.Profile}:profileID`,
    element: <ProfilePageAsync />,
    authOnly: true,
  },
  [AppRoutes.PracticeCenter]: {
    path: RoutePath[AppRoutes.PracticeCenter],
    element: <PracticeCenter />,
  },
  [AppRoutes.PlayerSpace]: {
    path: RoutePath[AppRoutes.PlayerSpace],
    element: <PlayerSpaceAsync />,
  },
  [AppRoutes.Articles]: {
    path: RoutePath[AppRoutes.Articles],
    element: <ArticlesPageAsync />,
    authOnly: true,
  },
  [AppRoutes.SingleArticle]: {
    path: `${RoutePath.SingleArticle}:articleID`, //    path: `${RoutePath.SingleArticle}:ID`,
    element: <ArticleDetailsPageAsync />,
    authOnly: true,
  },
  [AppRoutes.Community]: {
    path: RoutePath[AppRoutes.Community],
    element: <CommunityAsync />,
    authOnly: false,
  },
  [AppRoutes.SingleGroup]: {
    path: `${RoutePath.SingleGroup}:publicID`,
    element: <SingleGroupPageAsync />,
    authOnly: false,
  },
  [AppRoutes.Challenge]: {
    path: `${RoutePath.Challenge}:challengeID`,
    element: <ChallengePageAsync />,
    authOnly: false,
  },
  [AppRoutes.NotFound]: {
    path: RoutePath[AppRoutes.NotFound],
    element: <Error404 />,
  },
};
