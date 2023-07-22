//import { counterSlice } from "./../../../../entities/Counter/model/slice/counterSlice";
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme } from './stateScheme';
import { counterReducer } from 'entities/Counter/model/slice/counterSlice';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';

export function createReduxStore(initialState?: StateScheme) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateScheme>({
    //@ts-ignore
    reducer: reducerManager.reduce,
    devTools: IS_DEV,
    preloadedState: initialState,
  });
  //@ts-ignore
  store.reducerManager = reducerManager;

  return store;
}
