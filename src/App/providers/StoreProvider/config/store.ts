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
import { GPT_API, GPT_Audio_API } from 'App/API/firebaseAPI';
import { GoogleProfileReducer } from 'entities/GoogleProfile/model/slice/GoogleProfileSlice';
import { GPTReducer } from 'entities/GPT';
import { PlayerReducer } from 'entities/Player/model/slice/playerSlice';
import { TaskTrackerReducer } from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import { CommunityReducer } from 'entities/Community/model/slice/communitySlice';
import { ChallengeReducer } from 'entities/Challenge/model/slice/ChallengeSlice';
import { ChatReducer } from 'entities/Chat/model/slice/chatSlice';
import { scrollSaverReducer } from 'features/ScrollSaver/model/slice/scrollSaverSlice';
import { TherapyPageReducer } from 'pages/TherapyPage/model/slice/therapyPageSlice';

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    Player: PlayerReducer,
    TaskTracker: TaskTrackerReducer,
    ScrollSaver: scrollSaverReducer,
    Community: CommunityReducer,
    Challenge: ChallengeReducer,
    Chat: ChatReducer,
    GPT: GPTReducer,
    TherapyPage: TherapyPageReducer,
    GoogleProfile: GoogleProfileReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    API: API,
    GPT_API: GPT_API,
    GPT_Audio_API: GPT_Audio_API,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    devTools: IS_DEV,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
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
