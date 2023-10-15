import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Article } from 'entities/Article';
import { ArticleDetailsCommentsScheme } from '../types/ArticleDetailsCommentsSceme';
import { StateScheme } from 'App/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { requestCommentsByArticleID } from '../services/fetchCommentsByArticleId/requestCommentsByArticleID';
import { queryUsernameByID } from 'entities/Player';

const commentsAdapter = createEntityAdapter<CommentType>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateScheme>(
  (state) => state.ArticleComments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'ArticleComments',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsScheme>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<CommentType[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestCommentsByArticleID.pending, (state) => {
        //the same as fetch but firebase API

        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        requestCommentsByArticleID.fulfilled,
        (state, action: PayloadAction<CommentType[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(requestCommentsByArticleID.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
    // .addCase(queryUsernameByID.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(queryUsernameByID.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   commentsAdapter.setOne(state, action.payload);
    // })
    // .addCase(queryUsernameByID.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
