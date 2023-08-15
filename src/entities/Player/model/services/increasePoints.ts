import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { LevelUp } from './InGameActions/LevelUp';

export const increasePoints = createAsyncThunk<any, number, ThunkConfig<any>>(
  'Player/increasePoints',
  async (points, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const playerDoc = await getDoc(playerDocRef);
      const currentPoints = playerDoc.data()?.Player?.points || 0;
      const newPoints = currentPoints + points;

      if (newPoints > 999) {
        await thunkAPI.dispatch(LevelUp());

        await updateDoc(playerDocRef, {
          'Player.points': newPoints - 1000,
        });
      } else {
        await updateDoc(playerDocRef, {
          'Player.points': newPoints,
        });
      }

      console.log('Points increased');
    } catch (error) {
      console.error('Error increasing points', error);
    }
  },
);
