import type { StateScheme, ThunkConfig } from './config/stateScheme';
import { StoreProvider } from './UI/StoreProvider';
import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import type { ReduxStoreWithManager } from './config/stateScheme';

export {
  StoreProvider,
  createReduxStore,
  StateScheme,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
};
