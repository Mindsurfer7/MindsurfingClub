import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { CommentType } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  CommentType[],
  string | undefined,
  ThunkConfig<string>
>('ArticleComments/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
  console.log(articleId + ' hello1');

  if (!articleId) {
    console.log(articleId + ' inside !articleID');
    return thunkAPI.rejectWithValue('error');
  }

  try {
    const response = await thunkAPI.extra.API.get<CommentType[]>('/comments', {
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
    console.log(articleId + ' inside catch error');
    return thunkAPI.rejectWithValue('error');
  }
});
