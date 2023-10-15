import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestCommentsByArticleID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('ArticleComments/requestCommentsByArticleID', async (articleID, thunkAPI) => {
  const commentsRef = collection(GPT_DB, 'ArticleComments');

  try {
    const q = query(commentsRef, where('articleID', '==', articleID));
    const response = await getDocs(q);

    const filteredResponse = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log(filteredResponse);

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
