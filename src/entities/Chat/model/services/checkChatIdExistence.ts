import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc } from 'firebase/firestore';
import { setConnection } from './setConnection';
import { setChatIDExistence } from '../slice/chatSlice';
import { setNewClubChat } from './setNewClubChat';

export const checkChatExistence = createAsyncThunk<
  any,
  string,
  ThunkConfig<string>
>('Chat/checkChatExistence', async (publicID, thunkAPI) => {
  //setChatIDExistence
  const chatDocRef = doc(GPT_DB, 'chat', publicID);

  try {
    const docSnapshot = await getDoc(chatDocRef);

    if (docSnapshot.exists()) {
      const unsubscribe = await thunkAPI.dispatch(setConnection(publicID));
      thunkAPI.dispatch(setChatIDExistence());
      console.log('success chat connection');
      // return () => unsubscribe();
    } else {
      await thunkAPI.dispatch(setNewClubChat(publicID));
      thunkAPI.dispatch(setChatIDExistence());

      console.log('success new chat creation');
    }
  } catch (error) {
    console.error('Error checking chat existence', error);
    throw error;
  }
});
