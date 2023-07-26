//import { counterSlice } from "./../../../../entities/Counter/model/slice/counterSlice";
import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { StateScheme, ThunkExtraArg } from './stateScheme';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { useDispatch } from 'react-redux';
import { API } from 'shared/API/API';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    API: API,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });
  //@ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDiscpatch = () => useDispatch<AppDispatch>();
