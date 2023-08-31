import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  getArtilcesPageHasMore,
  getArtilcesPageIsLoading,
  getArtilcesPageLimit,
  getArtilcesPageNum,
} from '../selectors/getArticlesPageData';
import { setPage } from '../slice/articlePageSlice';
import { requestArticlesList } from './requestArticlesList';

export const requestNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('ArticlesPage/requestNextArticlesPage', async (_, thunkAPI) => {
  const hasMore = getArtilcesPageHasMore(thunkAPI.getState());
  const page = getArtilcesPageNum(thunkAPI.getState());
  const isLoading = getArtilcesPageIsLoading(thunkAPI.getState());

  if (hasMore && !isLoading) {
    thunkAPI.dispatch(setPage(page + 1));
    thunkAPI.dispatch(requestArticlesList({ page: page + 1 }));
  }
});
