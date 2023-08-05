import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const decreasePoints = createAsyncThunk<any, number, ThunkConfig<any>>(
  'Player/decreasePoints',
  async (points, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const playerDoc = await getDoc(playerDocRef);
      const currentPoints = playerDoc.data()?.Player?.points || 0;
      const newPoints = currentPoints - points;

      await updateDoc(playerDocRef, {
        'Player.points': newPoints,
      });
      console.log('Points decreased');
    } catch (error) {
      console.error('Error decreasing points', error);
    }
  },
);
