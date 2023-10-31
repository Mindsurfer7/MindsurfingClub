import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import axios from 'axios';
import { collection, doc, getDoc } from 'firebase/firestore';

export const getArticleTypes = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('TextEditor/getArticleTypes', async (_, thunkAPI) => {
  const docRef = doc(collection(GPT_DB, 'settings'), 'articleTypes');
  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Document does not exist!');
    }

    const data = docSnap.data();
    return data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
