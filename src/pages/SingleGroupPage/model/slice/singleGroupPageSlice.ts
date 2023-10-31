import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleGroupPageScheme } from '../types/singleGroupPageScheme';
import { requestPostsByPublicID } from '../services/requestPostsByPublicID';
import { publishPostInPublic } from '../services/publishPostInPublic';
import { requestArticlesByPublicID } from '../services/requestArticlesByPublicID';

const initialState: SingleGroupPageScheme = {
  isLoading: false,
  error: 'undefined',
  articles: [],
  posts: [],
};

export const singleGroupPageSlice = createSlice({
  name: 'SingleGroupPage',
  initialState,
  reducers: {
    initsingleGroupPage: (state, action: PayloadAction<string>) => {
      //   state._inited = true;
    },
  },
  extraReducers: (builder) => {
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
      .addCase(publishPostInPublic.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(publishPostInPublic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(publishPostInPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestArticlesByPublicID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestArticlesByPublicID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(requestArticlesByPublicID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'error';
      });
  },
});

export const {} = singleGroupPageSlice.actions;
export const { reducer: singleGroupPageReducer } = singleGroupPageSlice;
