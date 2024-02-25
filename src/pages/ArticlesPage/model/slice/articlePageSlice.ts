import { SortOrder } from './../../../../shared/types/index';
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ArticleViewType } from 'entities/Article';
import { Article } from 'entities/Article';
import type { StateScheme } from 'App/providers/StoreProvider';
import type { CommentType } from 'entities/Comment';
import { ArticlesPageScheme } from '../types/articlesPageScheme';
import { requestArticlesList } from '../services/requestArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticleSortField, ArticleType } from 'entities/Article/types/article';
import { requestArticlesFirebaseTEST } from '../services/firebaseTestArticlesRequest';
import { DocumentSnapshot } from 'firebase/firestore';

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
    _inited: false,
    sort: ArticleSortField.VIEWS,
    search: '',
    order: 'desc',
    type: ArticleType.ALL,
    lastDocSnapshot: null,
  }),
  reducers: {
    setLastDocSnapshot: (state, action: PayloadAction<DocumentSnapshot>) => {
      state.lastDocSnapshot = action.payload;
    },
    setView: (state, action: PayloadAction<ArticleViewType>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
      state.limit = state.view === ArticleViewType.Rectangle ? 4 : 9;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleViewType;
      state.view = view;
      state.limit = view === ArticleViewType.Rectangle ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestArticlesFirebaseTEST.pending, (state, action) => {
        //requestArticlesList
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(requestArticlesFirebaseTEST.fulfilled, (state, action) => {
        //PayloadAction<Article[]>
        state.isLoading = false;
        //state.hasMore = action.payload.length > 0; оч станное условие для этого флага.
        console.log(`BEFORE ALL IFS `);

        if (action.meta.arg.replace) {
          console.log(action);

          articlesAdapter.setAll(state, action.payload);
        } else {
          console.log(action);

          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(requestArticlesFirebaseTEST.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setPage,
  setView,
  setHasMore,
  initState,
  setOrder,
  setSearch,
  setSort,
  setType,
  setLastDocSnapshot,
} = articlesPageSlice.actions;
export const { reducer: articlesPageReducer } = articlesPageSlice;
