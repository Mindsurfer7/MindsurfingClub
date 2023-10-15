import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const queryUsernameByID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('ArticleComments/queryUsernameByID', async (userID, thunkAPI) => {
  const accRef = collection(GPT_DB, 'accounts');

  try {
    const q = query(accRef, where('UID', '==', userID));
    const response = await getDocs(q);

    const filteredResponse = response.docs.map((doc) => ({
      ...doc.data(),
    }));

    console.log(filteredResponse);

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
