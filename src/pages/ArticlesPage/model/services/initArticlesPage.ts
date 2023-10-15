import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import axios from 'axios';
import { getArtilcesInited } from '../selectors/getArticlesPageData';
import { requestArticlesList } from './requestArticlesList';
import {
  initState,
  setOrder,
  setSearch,
  setSort,
  setType,
} from '../slice/articlePageSlice';
import { ArticleSortField, ArticleType } from 'entities/Article/types/article';
import { SortOrder } from 'shared/types';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('ArticlesPage/initArticlesPage', async (searchParams, thunkAPI) => {
  const inited = getArtilcesInited(thunkAPI.getState());
  try {
    if (!inited) {
      const sortFromURL = searchParams.get('sort') as ArticleSortField;
      const orderFromURL = searchParams.get('order') as SortOrder;
      const searchFromURL = searchParams.get('search');
      const typeFromURL = searchParams.get('type') as ArticleType;

      if (sortFromURL) {
        thunkAPI.dispatch(setSort(sortFromURL));
      }
      if (orderFromURL) {
        thunkAPI.dispatch(setOrder(orderFromURL));
      }
      if (searchFromURL) {
        thunkAPI.dispatch(setSearch(searchFromURL));
      }
      if (typeFromURL) {
        thunkAPI.dispatch(setType(typeFromURL));
      }

      thunkAPI.dispatch(initState());
      thunkAPI.dispatch(requestArticlesList({}));
    }
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
