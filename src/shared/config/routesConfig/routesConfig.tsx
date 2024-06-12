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
import { ArticleCreatePage } from 'pages/ArticleCreatePage';
import { TherapyPageAsync } from 'pages/TherapyPage/UI/TherapyPage.async';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  requiresGoogleAuth?: boolean;
};

export enum AppRoutes {
  Main = 'Main',
  Home = 'Home',
  About = 'About',
  PsyRoom = 'PsyRoom',
  Therapy = 'Therapy',
  Conversation = 'Conversation',
  Community = 'Community',
  SingleGroup = 'SingleGroup',
  Articles = 'articles',
  SingleArticle = 'SingleArticle',
  ArticleCreate = 'ArticleCreate',
  ArticleEdit = 'ArticleEdit',
  Profile = 'Profile',
  Challenge = 'Challenge',
  PlayerSpace = 'PlayerSpace',
  NotFound = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.Main]: '/',
  [AppRoutes.Home]: '/home',
  [AppRoutes.About]: '/about',
  [AppRoutes.PsyRoom]: '/psyroom',
  [AppRoutes.Therapy]: '/therapy',
  [AppRoutes.Profile]: '/profile/',
  [AppRoutes.PlayerSpace]: '/PlayerSpace',
  [AppRoutes.Conversation]: '/:conversationID',
  [AppRoutes.Community]: '/communities',
  [AppRoutes.Articles]: '/articles',
  [AppRoutes.SingleArticle]: '/articles/',
  [AppRoutes.ArticleCreate]: 'articles/new',
  [AppRoutes.ArticleEdit]: '/articles/:id/edit',
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
    element: <AboutPageLazy />,
  },
  [AppRoutes.PsyRoom]: {
    path: RoutePath[AppRoutes.PsyRoom],
    element: <PsyRoom />,
    //requiresGoogleAuth: true,
  },
  [AppRoutes.Therapy]: {
    path: RoutePath[AppRoutes.Therapy],
    element: <TherapyPageAsync />,
    //requiresGoogleAuth: true,
  },
  [AppRoutes.Conversation]: {
    path: `${RoutePath.Conversation}/:conversationId`,
    element: <ChatWindow />,
  },
  [AppRoutes.Profile]: {
    path: `${RoutePath.Profile}:profileID`,
    element: <ProfilePageAsync />,
    authOnly: false,
  },
  [AppRoutes.PlayerSpace]: {
    path: RoutePath[AppRoutes.PlayerSpace],
    element: <PlayerSpaceAsync />,
  },
  [AppRoutes.Articles]: {
    path: RoutePath[AppRoutes.Articles],
    element: <ArticlesPageAsync />,
    authOnly: false,
  },
  [AppRoutes.SingleArticle]: {
    path: `${RoutePath.SingleArticle}:articleID`, //    path: `${RoutePath.SingleArticle}:ID`,
    element: <ArticleDetailsPageAsync />,
    authOnly: false,
  },
  [AppRoutes.ArticleCreate]: {
    path: RoutePath[AppRoutes.ArticleCreate],
    element: <ArticleCreatePage />,
  },
  [AppRoutes.ArticleEdit]: {
    path: RoutePath[AppRoutes.ArticleEdit],
    element: <ArticleCreatePage />,
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
