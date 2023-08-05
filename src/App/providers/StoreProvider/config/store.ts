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
import { GPT_API } from 'App/API/firebaseAPI';
import { googleLoginReducer } from 'features/AuthWithGoogle/model/slice/googleLoginSlice';
import { GoogleProfileReducer } from 'entities/GoogleProfile/model/slice/GoogleProfileSlice';
import { GPTReducer } from 'entities/GPT';
import { PlayerReducer } from 'entities/Player/model/slice/playerSlice';
import { TaskTrackerReducer } from 'entities/TaskTracker/model/slice/TaskTrackerSlice';

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    user: userReducer,
    Player: PlayerReducer,
    TaskTracker: TaskTrackerReducer,
    GPT: GPTReducer,
    GoogleProfile: GoogleProfileReducer,
    GoogleLogin: googleLoginReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    API: API,
    GPT_API: GPT_API,
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
