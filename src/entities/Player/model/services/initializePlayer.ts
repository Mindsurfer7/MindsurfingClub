import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, setDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { v4 } from 'uuid';
import { requestPlayerData } from './requestPlayerData';

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
          photoURL: profile?.photoURL,
          username: profile?.displayName || 'Unknown',
          new: false,
        },
        AllTags: ['Monday'],
        habits: [
          {
            id: v4(),
            description: 'create ur 1st habit',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        tasks: [
          {
            id: v4(),
            description: 'create ur 1st task',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        daily: [
          {
            id: v4(),
            description: 'create ur 1st daily task',
            difficulty: 4,
            isDone: false,
            title: 'onboarding task',
            tags: [],
          },
        ],
        completed: [],
      });

      thunkAPI.dispatch(requestPlayerData());

      console.log('account created');
    } catch (error) {
      console.error('Error creating account document:', error);
    }
  },
);
