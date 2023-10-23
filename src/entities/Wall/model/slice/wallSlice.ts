import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WallScheme } from '../types/wall';
import { publishPost } from '../services/publishPost';
import { requestPostsByPublicID } from '../services/requestPostsByPublicID';
import { requestPostsByUserID } from '../services/requestPostsByUserID';

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
    builder
      .addCase(publishPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(publishPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestPostsByPublicID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestPostsByPublicID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(requestPostsByPublicID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestPostsByUserID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestPostsByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(requestPostsByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { initWall } = WallSlice.actions;
export const { reducer: WallReducer } = WallSlice;
