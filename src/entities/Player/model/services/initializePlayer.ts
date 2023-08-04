import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  Firestore,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
//@ts-ignore
import { v4 } from 'uuid';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';

export const initializePlayer = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/initializePlayer',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      await setDoc(playerDocRef, {
        Player: {
          UID: userID,
          coins: 0,
          health: 100,
          level: 0,
          points: 10,
          username: 'Mindsurfer',
          new: false,
        },
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
