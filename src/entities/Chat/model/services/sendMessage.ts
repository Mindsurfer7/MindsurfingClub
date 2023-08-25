import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getChallengeData } from 'entities/Challenge/model/selectors/getChallengeData';
import { v4 } from 'uuid';

export const sendMessage = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Chat/sendMessage',
  async (messageText, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const profileG = getGoogleProfile(thunkAPI.getState());

    const chatRef = doc(GPT_DB, 'chat', `x4sIrZP5xda9FQpBVSXT`);

    const newMessage = {
      text: messageText,
      createdAt: new Date().toISOString(),
      username: profileG?.displayName,
    };

    try {
      await updateDoc(chatRef, {
        messages: arrayUnion(newMessage),
      });

      console.log('message sent');
    } catch (error) {
      console.error('Error sending message', error);
    }
  },
);
