import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ProfileScheme } from 'entities/Profile';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateScheme {
  loginForm?: LoginScheme;
  profile?: ProfileScheme;
  user: UserScheme;
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
  navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  //dispatch: Dispatch;
}
