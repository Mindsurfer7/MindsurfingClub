import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
// import { Post } from '../types/wall';

export const requestPostsByUserID = createAsyncThunk<
  any, //Post[]
  string,
  ThunkConfig<any>
>('Wall/requestPostsByUserID', async (authorID, thunkAPI) => {
  const postsRef = collection(GPT_DB, 'posts');

  try {
    const q = query(
      postsRef,
      where('authorID', '==', authorID),
      where('publicID', 'in', ['none', '']),
    );
    const response = await getDocs(q);

    const filteredResponse = response.docs.map((doc) => {
      return {
        ...doc.data(),
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
