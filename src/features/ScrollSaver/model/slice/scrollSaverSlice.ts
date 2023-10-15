import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaverScheme } from '../types/scrollSaverScheme';

const initialState: ScrollSaverScheme = {
  scroll: {},
};

export const scrollSaverSlice = createSlice({
  name: 'ScrollSaver',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position;
    },
  },
  extraReducers: (builder) => {},
});

export const { setScrollPosition } = scrollSaverSlice.actions;
export const { reducer: scrollSaverReducer } = scrollSaverSlice;
