import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { getArticleID } from 'entities/Article/model/selectors/getArticleData';
import { CommentType } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getUlbiUserID } from 'entities/User/model/selectors/getUsername';

interface AddCommentPayload {
  articleId: string;
  userID: string;
  text: string;
}

export const addCommentForArticle = createAsyncThunk<
  CommentType,
  string,
  ThunkConfig<string>
>('Article/addCommentForArticle', async (text, thunkAPI) => {
  const userID = getUlbiUserID(thunkAPI.getState());

  const articleID = getArticleID(thunkAPI.getState());

  if (!userID || !text || !articleID) {
    return thunkAPI.rejectWithValue('no data');
  }

  try {
    const response = await thunkAPI.extra.API.post<CommentType>('/comments', {
      articleId: articleID,
      userId: userID,
      text: text,
    });

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(fetchCommentsByArticleId(articleID));

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('error');
  }
});
