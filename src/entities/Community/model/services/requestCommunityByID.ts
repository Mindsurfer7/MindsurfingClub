import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestCommunityByID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Community/requestCommunityByID', async (ID, thunkAPI) => {
  const publicsRef = collection(GPT_DB, 'publics');

  try {
    const response = await getDocs(publicsRef);

    if (!response) {
      throw new Error();
    }

    const community = response.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((x) => x.id === ID);

    return community[0];
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
