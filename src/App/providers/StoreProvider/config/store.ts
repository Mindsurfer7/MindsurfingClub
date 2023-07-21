//import { counterSlice } from "./../../../../entities/Counter/model/slice/counterSlice";
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme } from './stateScheme';
import { counterReducer } from 'entities/Counter/model/slice/counterSlice';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';

export function createReduxStore(initialState?: StateScheme) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    counter: counterReducer,
    user: userReducer,
    LoginForm: loginReducer,
  };

  return configureStore<StateScheme>({
    reducer: rootReducers,
    devTools: IS_DEV,
    preloadedState: initialState,
  });
}
