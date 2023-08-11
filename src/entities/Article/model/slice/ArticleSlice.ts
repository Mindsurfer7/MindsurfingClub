import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, SingleArticleScheme } from 'entities/Article/types/article';
import { requestArticleByID } from '../services/requestArticleByID';

const initialState: SingleArticleScheme = {
  isLoading: false,
};

export const ArticleSlice = createSlice({
  name: 'Article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestArticleByID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        requestArticleByID.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(requestArticleByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = ArticleSlice.actions;
export const { reducer: ArticleReducer } = ArticleSlice;
