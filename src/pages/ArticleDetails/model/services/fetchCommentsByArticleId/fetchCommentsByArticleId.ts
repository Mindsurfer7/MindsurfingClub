import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import axios from 'axios';
import { CommentType } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  CommentType[],
  string | undefined,
  ThunkConfig<string>
>('ArticleComment/fetchCommentsByArticleId', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!articleId) {
    return rejectWithValue('error');
  }

  try {
    const response = await extra.API.get<CommentType[]>('/comments', {
      params: {
        articleId,
        _expand: 'user',
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
