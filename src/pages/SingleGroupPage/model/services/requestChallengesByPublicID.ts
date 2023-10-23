import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestChallengesByPublicID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Challenge/requestChallengesByPublicID', async (publicID, thunkAPI) => {
  const challengesRef = collection(GPT_DB, 'challenges');

  try {
    const q = query(challengesRef, where('communityID', '==', publicID));
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
    console.log(filteredResponse);

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
