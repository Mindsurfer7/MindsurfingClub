import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestPlayerData } from '../requestPlayerData';

export const rewardCoins = createAsyncThunk<any, number, ThunkConfig<any>>(
  'Player/rewardCoins',
  async (coins, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const playerDoc = await getDoc(playerDocRef);
      const currentCoins = playerDoc.data()?.Player?.coins || 0;
      const totalCoins = currentCoins + coins;

      await updateDoc(playerDocRef, {
        'Player.coins': totalCoins,
      });
      thunkAPI.dispatch(requestPlayerData());
      console.log('coins rewarded ');
    } catch (error) {
      console.error('Error rewarding coins', error);
    }
  },
);
