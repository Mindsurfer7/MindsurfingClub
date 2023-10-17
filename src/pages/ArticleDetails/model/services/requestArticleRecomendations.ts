import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestArticleRecomendations = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('ArticleRecomendations/requestArticleRecomendations', async (_, thunkAPI) => {
  const articlesRef = collection(GPT_DB, 'articles');

  try {
    const limitedQuery = query(articlesRef, limit(4));
    const response = await getDocs(limitedQuery);

    const filteredResponse = response.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    if (!response) {
      throw new Error();
    }
    console.log(filteredResponse);

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
