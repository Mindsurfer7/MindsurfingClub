import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateScheme } from '../config/stateScheme';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
  //navigate?: (to: To, options?: NavigateOptions) => void;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  //const navigate = useNavigate();

  const { children, initialState, asyncReducers } = props;
  const store = createReduxStore(
    initialState as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
    //navigate,
  );
  return <Provider store={store}>{children}</Provider>;
};
