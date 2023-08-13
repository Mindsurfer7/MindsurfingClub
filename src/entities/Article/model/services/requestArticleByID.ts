import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestArticleByID = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Article/requestArticleByID ',
  async (_, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const accountsRef = collection(GPT_DB, 'articles');

    try {
      const response = await getDocs(accountsRef);

      const filteredResponse = response.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
        .filter((c) => c.id === 'iwX4MYrXc7Um85cEiUnB');

      if (!response) {
        throw new Error();
      }
      //@ts-ignore
      return filteredResponse[0];
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
