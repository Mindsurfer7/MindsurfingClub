import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { getMessages } from '../selectors/getGPTdata';
import { doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getConversationID } from '../selectors/getFirestoreData';

export const updateMessagesDB = createAsyncThunk<any, void, ThunkConfig<any>>(
  'GPT/updateMessagesDB',
  async (_, thunkAPI) => {
    const messages = getMessages(thunkAPI.getState());
    const id = getConversationID(thunkAPI.getState());
    const conversation = doc(GPT_DB, 'conversations', id);

    try {
      await updateDoc(conversation, { messages: messages });
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
