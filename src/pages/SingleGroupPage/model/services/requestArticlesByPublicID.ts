import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import axios from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const requestArticlesByPublicID = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('SingleGroupPage/requestArticlesByPublicID', async (publicID, thunkAPI) => {
  const artRef = collection(GPT_DB, 'articles');

  try {
    const q = query(artRef, where('publicID', '==', publicID));
    const response = await getDocs(q);

    const filteredResponse = response.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    if (!response) {
      throw new Error();
    }

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
