import { ArticlesPageAsync } from './../../UI/ArticlesPage.async';
import axios from 'axios';

import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { requestNextArticlesPage } from './requestNextArticlesPage';
import { requestArticlesList } from './requestArticlesList';

jest.mock('./requestArticlesList');

describe('requestNextArticlesPage.test', () => {
  test('happy request', async () => {
    const thunk = new TestAsyncThunk(requestNextArticlesPage, {
      ArticlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(requestArticlesList).toBeCalledWith({ page: 3 });
  });
  test('req not called', async () => {
    const thunk = new TestAsyncThunk(requestNextArticlesPage, {
      ArticlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    const result = await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(requestArticlesList).not.toHaveBeenCalled();
  });
});
