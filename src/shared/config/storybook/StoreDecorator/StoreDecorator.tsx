import { ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'App/providers/StoreProvider';
import { Theme, ThemeProvider } from 'App/providers/ThemeProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateScheme>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );

// DeepPartial<ReducersMapObject<StateScheme>>
