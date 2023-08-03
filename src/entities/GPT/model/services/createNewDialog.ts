import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';

export const createNewDialog = createAsyncThunk<
  any,
  dialogPayload,
  ThunkConfig<any>
>('GPT/createNewDialog', async (payload, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const convDocRef = doc(GPT_DB, 'conversations', `${userID}`);
  const newDialog = {
    model: 'gpt-3.5-turbo',
    messages: [],
    dialogName: payload.name,
    ID: payload.ID,
  };

  try {
    await updateDoc(convDocRef, {
      dialogs: arrayUnion(newDialog),
    });
    console.log('Document created');
  } catch (error) {
    console.error('Error creating conversation document:', error);
  }
});
