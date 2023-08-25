import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getChallengeData } from 'entities/Challenge/model/selectors/getChallengeData';
import { v4 } from 'uuid';

export const requestChatMessages = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('Chat/requestChatMessages', async (messageText, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const profileG = getGoogleProfile(thunkAPI.getState());

  const chatRef = doc(GPT_DB, 'chat', 'x4sIrZP5xda9FQpBVSXT');

  try {
    const response = await getDoc(chatRef);
    const chatData = response.data();
    const messages = chatData?.messages || [];

    console.log('messages loaded');

    return messages;
  } catch (error) {
    console.error('Error sending message', error);
  }
});
