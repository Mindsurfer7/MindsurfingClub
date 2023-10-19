import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/main';
import { PsyRoom } from 'pages/PsyRoom';
import Error404 from 'pages/404/Error404';
import { ProfilePageAsync } from 'pages/ProfilePage';
import ChatWindow from 'pages/PsyRoom/UI/ChatWindow/ChatWindow';
import { ArticlesPageAsync } from 'pages/ArticlesPage';
import { PlayerSpaceAsync } from 'pages/PlayerSpace';
import { ArticleDetailsPageAsync } from 'pages/ArticleDetails';
import { CommunityAsync } from 'pages/Community/UI/Community.async';
import { SingleGroupPageAsync } from 'pages/SingleGroupPage';
import { ChallengePageAsync } from 'pages/ChallengePage';
import { AboutPageLazy } from 'pages/about';
import { PracticeCenterAsync } from 'pages/PracticeCenter';
import { TextEditor } from 'widgets/TextEditor';

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
  TextEditor = 'TextEditor',
  NotFound = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Home]: '/home',
  [AppRoutes.About]: '/about',
  [AppRoutes.PsyRoom]: '/psyroom',
  [AppRoutes.Profile]: '/profile/',
  [AppRoutes.TextEditor]: '/TextEditor',
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
  [AppRoutes.TextEditor]: {
    path: RoutePath[AppRoutes.TextEditor],
    element: <TextEditor />,
  },
  [AppRoutes.About]: {
    path: RoutePath[AppRoutes.About],
    element: <AboutPageLazy />,
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
    element: <PracticeCenterAsync />,
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
