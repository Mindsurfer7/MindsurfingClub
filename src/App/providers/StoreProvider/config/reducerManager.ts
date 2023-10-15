import {
  AnyAction,
  Reducer,
  ReducersMapObject,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  MountedReducers,
  ReducerManager,
  StateScheme,
  StateSchemeKey,
} from './stateScheme';

export function createReducerManager(
  initialReducers: ReducersMapObject<StateScheme>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemeKey> = [];

  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,

    getMountedReducers: () => mountedReducers,

    reduce: (state: StateScheme, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => delete state[key]);

        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: StateSchemeKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      mountedReducers[key] = true;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key: StateSchemeKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];

      keysToRemove.push(key);
      mountedReducers[key] = false;
      combinedReducer = combineReducers(reducers);
    },
  };
}

//   const staticReducers = {
//     users: usersReducer,
//     posts: postsReducer
//   }

//   export function configureStore(initialState) {
//     const reducerManager = createReducerManager(staticReducers)

//     // Create a store with the root reducer function being the one exposed by the manager.
//     const store = createStore(reducerManager.reduce, initialState)

//     // Optional: Put the reducer manager on the store so it is easily accessible
//     store.reducerManager = reducerManager
//   }
