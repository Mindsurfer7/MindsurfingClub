import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import axios from 'axios';
import { Article } from 'entities/Article/types/article';

export const requestArticleByID = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('Article/requestArticleByID', async (artID, thunkAPI) => {
  try {
    const response = await axios.get<Article>(
      `http://localhost:8000/articles/${artID}`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
