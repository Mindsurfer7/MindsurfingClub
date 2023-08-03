import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { getMessages } from '../selectors/getGPTdata';
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
import { getConversationID } from '../selectors/getFirestoreData';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
//@ts-ignore
import { v4 } from 'uuid';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';

export const create1stDialog = createAsyncThunk<
  any,
  dialogPayload,
  ThunkConfig<any>
>('GPT/create1stDialog', async (payload, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const convDocRef = doc(GPT_DB, 'conversations', `${userID}`);

  try {
    await setDoc(convDocRef, {
      dialogs: [
        {
          model: 'gpt-3.5-turbo',
          messages: [],
          dialogName: payload.name,
          ID: payload.ID,
        },
      ],
    });
    console.log('Document created');
  } catch (error) {
    console.error('Error creating conversation document:', error);
  }
});
