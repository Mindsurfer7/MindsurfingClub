import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Article, ArticleViewType } from 'entities/Article';
import { StateScheme } from 'App/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import { ArticlesPageScheme } from '../types/articlesPageScheme';
import { requestArticlesList } from '../services/requestArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateScheme>(
  (state) => state.ArticlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: 'ArticlesPage',
  initialState: articlesAdapter.getInitialState<ArticlesPageScheme>({
    isLoading: false,
    error: undefined,
    view: ArticleViewType.Square,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleViewType>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleViewType;
      state.view = view;
      const limit = view === ArticleViewType.Rectangle ? 4 : 9;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        requestArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.setAll(state, action.payload);
        },
      )
      .addCase(requestArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setView, initState } = articlesPageSlice.actions;
export const { reducer: articlesPageReducer } = articlesPageSlice;
