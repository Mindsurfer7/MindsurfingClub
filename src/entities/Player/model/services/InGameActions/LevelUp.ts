import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestPlayerData } from '../requestPlayerData';

export const LevelUp = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/LevelUp',
  async (points, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const playerDoc = await getDoc(playerDocRef);
      const currentLevel = playerDoc.data()?.Player?.level || 0;
      const newLevel = currentLevel + 1;

      await updateDoc(playerDocRef, {
        'Player.level': newLevel,
      });
      thunkAPI.dispatch(requestPlayerData());
      console.log('Level Up');
    } catch (error) {
      console.error('Error level up', error);
    }
  },
);
