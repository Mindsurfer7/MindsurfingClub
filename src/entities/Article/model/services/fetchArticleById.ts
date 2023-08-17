import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types/article';
import { ThunkConfig } from 'App/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('Article/fetchArticleById', async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    console.log(articleId);

    const response = await extra.API.get<Article>(`/articles/${articleId}`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
