import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestChallenges = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Challenge/requestChallenges',
  async (_, thunkAPI) => {
    const challengesRef = collection(GPT_DB, 'challenges');

    try {
      const response = await getDocs(challengesRef);

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
  },
);
