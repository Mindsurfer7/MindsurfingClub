import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestArticlesFirebaseTEST = createAsyncThunk<
  any,
  any,
  ThunkConfig<any>
>('Articles/requestArticles', async (_, thunkAPI) => {
  const articlesRef = collection(GPT_DB, 'articles');

  try {
    const response = await getDocs(articlesRef);

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
