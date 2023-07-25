//import { counterSlice } from "./../../../../entities/Counter/model/slice/counterSlice";
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateScheme } from './stateScheme';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { useDispatch } from 'react-redux';

export function createReduxStore(
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
) {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
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

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDiscpatch = () => useDispatch<AppDispatch>();
