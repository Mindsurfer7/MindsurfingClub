import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, setDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const initializePlayer = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/initializePlayer',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const profile = getGoogleProfile(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      await setDoc(playerDocRef, {
        Player: {
          UID: userID,
          coins: 0,
          health: 100,
          level: 0,
          points: 10,
          username: profile?.displayName || 'Unknown',
          new: false,
        },
        AllTags: ['Monday'],
        habits: [
          {
            id: 'advwebvsqbvr',
            description: 'create ur 1st task',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        tasks: [
          {
            id: 'advwebvsqbvr',
            description: 'create ur 1st task',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        daily: [
          {
            id: 'advwebvsqbvr',
            description: 'create ur 1st task',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        completed: [],
      });
      console.log('account created');
    } catch (error) {
      console.error('Error creating account document:', error);
    }
  },
);
