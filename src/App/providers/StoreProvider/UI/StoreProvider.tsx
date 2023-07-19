import React, { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./StoreProvider.module.scss";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateScheme } from "../config/stateScheme";
import { DeepPartial } from "@reduxjs/toolkit";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateScheme>;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const { children, initialState } = props;
  const store = createReduxStore(initialState as StateScheme);
  return <Provider store={store}>{children}</Provider>;
};
