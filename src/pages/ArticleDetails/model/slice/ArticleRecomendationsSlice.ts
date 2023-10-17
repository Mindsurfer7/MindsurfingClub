import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { StateScheme } from 'App/providers/StoreProvider';
import { ArticleDetailsRecomendationsScheme } from '../types/ArticleRecomedationsScheme';
import { requestArticleRecomendations } from '../services/requestArticleRecomendations';

const recomendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecomendations =
  recomendationsAdapter.getSelectors<StateScheme>(
    (state) =>
      state.ArticleRecomendations || recomendationsAdapter.getInitialState(),
  );

const articleDetailsRecomendationsSlice = createSlice({
  name: 'ArticleRecomendations',
  initialState:
    recomendationsAdapter.getInitialState<ArticleDetailsRecomendationsScheme>({
      isLoading: false,
      error: undefined,
      ids: [],
      entities: {},
    }),
  reducers: {
    setX: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestArticleRecomendations.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        requestArticleRecomendations.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          recomendationsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(requestArticleRecomendations.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = articleDetailsRecomendationsSlice.actions;

export const { reducer: articleDetailsRecomendationsReducer } =
  articleDetailsRecomendationsSlice;
