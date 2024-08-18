import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  getArticleType,
  getArtilcesOrder,
  getArtilcesPageLimit,
  getArtilcesPageNum,
  getArtilcesSearch,
  getArtilcesSort,
} from '../selectors/getArticlesPageData';
import { setQueryParams } from 'shared/lib/URL/setQueryParams';
import { ArticleType } from 'entities/Article/types/article';

export interface requestArticlesProps {
  replace?: boolean;
}
// fake backend
export const requestArticlesList = createAsyncThunk<
  Article[],
  requestArticlesProps,
  ThunkConfig<string>
>('ArticlesPage/requestArticlesList', async (props, thunkAPI) => {
  // const { page = 1 } = props;
  const limit = getArtilcesPageLimit(thunkAPI.getState());

  const search = getArtilcesSearch(thunkAPI.getState());
  const sort = getArtilcesSort(thunkAPI.getState());
  const order = getArtilcesOrder(thunkAPI.getState());
  const page = getArtilcesPageNum(thunkAPI.getState());
  const type = getArticleType(thunkAPI.getState());
  try {
    setQueryParams({
      sort,
      order,
      search,
      type,
    });

    const response = thunkAPI.extra.API.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    return (await response).data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
