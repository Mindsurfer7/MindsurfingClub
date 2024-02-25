import React, { Children, FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import type { ReduxStoreWithManager } from 'App/providers/StoreProvider';
import { StateSchemeKey } from 'App/providers/StoreProvider/config/stateScheme';

export type ReducersList = {
  [reducerKey in StateSchemeKey]?: Reducer;
};

type ReducersListEntry = [StateSchemeKey, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { children, reducers, removeAfterUnmount } = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    (Object.entries(reducers) as ReducersListEntry[]).forEach(
      ([reducerKey, reducer]) => {
        const mounted = mountedReducers[reducerKey];

        if (!mounted) {
          store.reducerManager.add(reducerKey, reducer);
          dispatch({ type: `@INIT ${reducerKey} reducer` });
        }
      },
    );

    return () => {
      if (removeAfterUnmount) {
        (Object.entries(reducers) as ReducersListEntry[]).forEach(
          ([reducerKey, reducer]) => {
            store.reducerManager.remove(reducerKey);
            dispatch({ type: `@DESTROY ${reducerKey} reducer` });
          },
        );
      }
    };
  }, []);

  return <>{children}</>;
};
