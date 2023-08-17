import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, SingleArticleScheme } from 'entities/Article/types/article';
import { requestArticleByID } from '../services/requestArticleByID';
import { fetchArticleById } from '../services/fetchArticleById';

const initialState: SingleArticleScheme = {
  isLoading: false,
  data: undefined,
};

export const ArticleSlice = createSlice({
  name: 'Article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = ArticleSlice.actions;
export const { reducer: ArticleReducer } = ArticleSlice;
