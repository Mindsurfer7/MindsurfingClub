import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from 'App/providers/StoreProvider';

export const getScrollPosition = (state: StateScheme) =>
  state.ScrollSaver.scroll;

export const getScrollByPath = createSelector(
  getScrollPosition,
  (state: StateScheme, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
