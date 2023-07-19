//import { counterSlice } from "./../../../../entities/Counter/model/slice/counterSlice";
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme } from './stateScheme';
import { counterReducer } from 'entities/Counter/model/slice/counterSlice';
import { userReducer } from 'entities/User';

export function createReduxStore(initialState?: StateScheme) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
  };

  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: IS_DEV,
    preloadedState: initialState,
  });
}
