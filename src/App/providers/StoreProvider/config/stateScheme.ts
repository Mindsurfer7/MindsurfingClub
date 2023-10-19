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
import { GPTscheme } from 'entities/GPT/types/GPTScheme';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';
import { GoogleLoginScheme } from 'features/AuthWithGoogle/model/types/GloginSceme';
import { PlayerScheme } from 'entities/Player/types/player';
import { TaskTrackerScheme } from 'entities/TaskTracker/types/taskTracker';
import { SingleArticleScheme } from 'entities/Article';
import { CommunitiesScheme } from 'entities/Community';
import { ArticleDetailsCommentsScheme } from 'pages/ArticleDetails/model/types/ArticleDetailsCommentsSceme';
import { AddCommentScheme } from 'features/AddComment';
import { ChallengePageScheme } from 'pages/ChallengePage';
import { ChatScheme } from 'entities/Chat';
import { ArticlesPageScheme } from 'pages/ArticlesPage';
import { ScrollSaverScheme } from 'features/ScrollSaver';
import { ArticleDetailsRecomendationsScheme } from 'pages/ArticleDetails';
import { TextEditorScheme } from 'widgets/TextEditor/model/types/textEditor';

export interface StateScheme {
  loginForm?: LoginScheme;
  profile?: ProfileScheme;
  ScrollSaver: ScrollSaverScheme;
  Player: PlayerScheme;
  Article?: SingleArticleScheme;
  ArticlesPage?: ArticlesPageScheme;
  ArticleComments?: ArticleDetailsCommentsScheme;
  ArticleRecomendations?: ArticleDetailsRecomendationsScheme;
  AddComment?: AddCommentScheme;
  TaskTracker: TaskTrackerScheme;
  Community: CommunitiesScheme;
  Challenge: ChallengeScheme;
  ChallengePage?: ChallengePageScheme;
  GoogleProfile: GoogleProfileScheme;
  GoogleLogin: GoogleLoginScheme;
  TextEditor?: TextEditorScheme;
  user: UserScheme;
  Chat: ChatScheme;
  GPT: GPTscheme;
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
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
  //dispatch: Dispatch;
}
