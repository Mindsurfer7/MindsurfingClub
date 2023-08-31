import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, doc, setDoc } from 'firebase/firestore';

export const setNewClubChat = createAsyncThunk<
  any,
  string,
  ThunkConfig<string>
>('Chat/setNewClubChat', async (publicID, thunkAPI) => {
  const dataToSet = {
    messages: [],
  };

  try {
    // @ts-ignore
    await setDoc(doc(GPT_DB, 'chat', publicID), dataToSet);

    console.log('Document created and set successfully');
  } catch (error) {
    console.error('Error creating and setting the document', error);
    throw error;
  }
});
