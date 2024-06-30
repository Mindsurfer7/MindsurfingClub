import { ChallengeScheme } from './../../../../entities/Challenge/types/ChallengeScheme';
import { GoogleProfileScheme } from 'entities/GoogleProfile/types/GoogleProfile';
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { GPTscheme } from 'entities/GPT/types/GPTScheme';
import type { PlayerScheme } from 'entities/Player/types/player';
import type { TaskTrackerScheme } from 'entities/TaskTracker/types/taskTracker';
import type { SingleArticleScheme } from 'entities/Article';
import type { CommunitiesScheme } from 'entities/Community';
import type { ArticleDetailsCommentsScheme } from 'pages/ArticleDetails/model/types/ArticleDetailsCommentsSceme';
import type { AddCommentScheme } from 'features/AddComment';
import type { ChallengePageScheme } from 'pages/ChallengePage';
import type { ChatScheme } from 'entities/Chat';
import type { ArticlesPageScheme } from 'pages/ArticlesPage';
import type { ScrollSaverScheme } from 'features/ScrollSaver';
import type { ArticleDetailsRecomendationsScheme } from 'pages/ArticleDetails';
import type { TextEditorScheme } from 'widgets/TextEditor/model/types/textEditor';
import type { WallScheme } from 'entities/Wall';
import type { SingleGroupPageScheme } from 'pages/SingleGroupPage';
import type { ProfilePageScheme } from 'pages/ProfilePage';
import { TherapyPageScheme } from 'pages/TherapyPage/model/types/therapy';

export interface StateScheme {
  //Article
  Article?: SingleArticleScheme;
  ArticlesPage?: ArticlesPageScheme;
  ProfilePage?: ProfilePageScheme;
  ArticleComments?: ArticleDetailsCommentsScheme;
  ArticleRecomendations?: ArticleDetailsRecomendationsScheme;
  AddComment?: AddCommentScheme;
  //profile
  GoogleProfile: GoogleProfileScheme;
  Player: PlayerScheme;
  TaskTracker: TaskTrackerScheme;
  //community & chalenges
  Community: CommunitiesScheme;
  SingleGroupPage?: SingleGroupPageScheme;
  Challenge: ChallengeScheme;
  ChallengePage?: ChallengePageScheme;
  //settings & widgets
  ScrollSaver: ScrollSaverScheme;
  TextEditor?: TextEditorScheme;
  Wall?: WallScheme;
  //GPT
  Chat: ChatScheme;
  GPT: GPTscheme;
  //psy
  TherapyPage: TherapyPageScheme;
}

export type StateSchemeKey = keyof StateScheme;
export type MountedReducers = OptionalRecord<StateSchemeKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemeKey, reducer: Reducer) => void;
  remove: (key: StateSchemeKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}
export interface ThunkExtraArg {
  API: AxiosInstance;
  GPT_API: AxiosInstance;
  GPT_Audio_API: AxiosInstance;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
  //dispatch: Dispatch;
}
