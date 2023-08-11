import { GoogleProfileScheme } from 'entities/GoogleProfile/types/GoogleProfile';
import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { GPTscheme } from 'entities/GPT/types/GPTScheme';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';
import { GoogleLoginScheme } from 'features/AuthWithGoogle/model/types/GloginSceme';
import { PlayerScheme } from 'entities/Player/types/player';
import { TaskTrackerScheme } from 'entities/TaskTracker/types/taskTracker';
import { SingleArticleScheme } from 'entities/Article';

export interface StateScheme {
  loginForm?: LoginScheme;
  profile?: ProfileScheme;
  Player: PlayerScheme;
  Article?: SingleArticleScheme;
  TaskTracker: TaskTrackerScheme;
  GoogleProfile: GoogleProfileScheme;
  GoogleLogin: GoogleLoginScheme;
  user: UserScheme;
  GPT: GPTscheme;
}

export type StateSchemeKey = keyof StateScheme;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemeKey, reducer: Reducer) => void;
  remove: (key: StateSchemeKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}
export interface ThunkExtraArg {
  API: AxiosInstance;
  GPT_API: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
  //dispatch: Dispatch;
}
