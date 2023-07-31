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
import { GoogleProfile } from 'entities/User/model/types/user';
import { LoginScheme } from 'features/AuthByUsername';
import { GoogleProfileScheme } from 'features/AuthWithGoogle/model/types/GloginSceme';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateScheme {
  loginForm?: LoginScheme;
  profile?: ProfileScheme;
  GoogleProfile?: GoogleProfileScheme;
  user: UserScheme;
  GPT?: GPTscheme;
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
