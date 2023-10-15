import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestArticleByID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Article/requestArticleByID', async (ID, thunkAPI) => {
  const artRef = collection(GPT_DB, 'articles');

  try {
    const documentRef = doc(artRef, ID);

    const docSnapshot = await getDoc(documentRef);

    if (!docSnapshot) {
      throw new Error();
    }

    return docSnapshot.data();
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
