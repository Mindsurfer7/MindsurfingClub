import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateScheme, StoreProvider } from 'App/providers/StoreProvider';
import { Theme, ThemeProvider } from 'App/providers/ThemeProvider';

export const StoreDecorator =
  (state: DeepPartial<StateScheme>) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state}>
        <StoryComponent />
      </StoreProvider>
    );
