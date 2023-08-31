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

//соединение должно устанавливаться с чатом который имеет такой же айди как и паблик айди.

export const setConnection = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Chat/setConnection',
  async (publicID, thunkAPI) => {
    const chatDocRef = doc(GPT_DB, 'chat', publicID);

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
