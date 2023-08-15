import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const removeDaily = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/removeDaily',
  async (dailyID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const docRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const dailyDocSnap = await getDoc(docRef);
      const dailyArray = dailyDocSnap.get('daily') || [];

      const dailyIndex = dailyArray.findIndex(
        (daily: any) => daily.id === dailyID,
      );

      if (dailyIndex !== -1) {
        dailyArray.splice(dailyIndex, 1);

        await updateDoc(docRef, {
          daily: dailyArray,
        });
      }

      console.log('Daily removed');
    } catch (error) {
      console.error('Error removing daily', error);
    }
  },
);
