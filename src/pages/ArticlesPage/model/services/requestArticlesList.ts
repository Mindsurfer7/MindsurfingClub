import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { getArtilcesPageLimit } from '../selectors/getArticlesPageData';

export interface requestArticlesProps {
  page?: number;
}

export const requestArticlesList = createAsyncThunk<
  Article[],
  requestArticlesProps,
  ThunkConfig<string>
>('ArticlesPage/requestArticlesList', async (props, thunkAPI) => {
  const { page = 1 } = props;
  const limit = getArtilcesPageLimit(thunkAPI.getState());
  try {
    const response = thunkAPI.extra.API.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
      },
    });

    return (await response).data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
