import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { setMessagesArray } from '../slice/chatSlice';

export const setConnection = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Chat/setConnection',
  async (messageText, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const profileG = getGoogleProfile(thunkAPI.getState());

    const chatDocRef = doc(GPT_DB, 'chat', 'x4sIrZP5xda9FQpBVSXT');

    try {
      const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const messages = docSnapshot.data().messages || [];
          thunkAPI.dispatch(setMessagesArray(messages));
        }
      });

      console.log('Connection established');

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up connection', error);
    }
  },
);

// const chatRef = doc(GPT_DB, 'chat', `x4sIrZP5xda9FQpBVSXT`)
