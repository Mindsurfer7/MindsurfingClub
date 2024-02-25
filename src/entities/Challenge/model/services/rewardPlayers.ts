import { isDoneObject } from './../../types/ChallengeScheme';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import type { Participant } from 'entities/Challenge/types/ChallengeScheme';

export const rewardPlayers = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Challenge/rewardPlayers',
  async (challengeID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const challengeDocRef = doc(GPT_DB, 'challenges', `${challengeID}`);
    //1stly set finish true
    //   challengeDocRef.data()

    try {
      await updateDoc(challengeDocRef, {
        isFinished: true,
      });
    } catch (error) {
      console.error('Error rewarding', error);
    }
  },
);
