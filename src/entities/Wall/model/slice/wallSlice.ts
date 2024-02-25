import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WallScheme } from '../types/wall';

const initialState: WallScheme = {
  isLoading: false,
  error: '',
  posts: [],
  _inited: false,
};

export const WallSlice = createSlice({
  name: 'Wall',
  initialState,
  reducers: {
    initWall: (state, action: PayloadAction<string>) => {
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(publishPost.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(publishPost.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(publishPost.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { initWall } = WallSlice.actions;
export const { reducer: WallReducer } = WallSlice;
