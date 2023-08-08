import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const saveNotification = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/saveNotification',
  async (newNote, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      await updateDoc(DocRef, {
        notifications: arrayUnion(newNote),
      });

      console.log('notifications updated');
    } catch (error) {
      console.error('Error updating notifications', error);
    }
  },
);
