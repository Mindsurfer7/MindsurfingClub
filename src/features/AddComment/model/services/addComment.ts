import { requestCommentsByArticleID } from './../../../../pages/ArticleDetails/model/services/fetchCommentsByArticleId/requestCommentsByArticleID';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { getCommentText } from '../selectors/getCommentsData';
import { getCurrentArticleID } from 'pages/ArticleDetails/model/selectors/getCommentsData';

export const addComment = createAsyncThunk<
  any,
  Record<string, string>,
  ThunkConfig<any>
>('Comment/addComment', async (payload, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const text = getCommentText(thunkAPI.getState());
  const comments = collection(GPT_DB, 'ArticleComments');
  const articleID = getCurrentArticleID(thunkAPI.getState());

  const comment = {
    ID: payload.ID,
    articleID: articleID,
    userID,
    text,
  };

  try {
    await addDoc(comments, comment);
    if (articleID) {
      thunkAPI.dispatch(requestCommentsByArticleID(articleID));
    }

    console.log('comment created');
  } catch (error) {
    console.error('Error creating comment', error);
  }
});
