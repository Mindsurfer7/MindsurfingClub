import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestAllGroups = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Community/requestAllGroups',
  async (_, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const publicsRef = collection(GPT_DB, 'publics');

    try {
      const response = await getDocs(publicsRef);

      if (!response) {
        throw new Error();
      }

      const allGroups = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return allGroups;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
