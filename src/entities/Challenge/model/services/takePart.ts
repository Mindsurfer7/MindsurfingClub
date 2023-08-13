import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const takePart = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Challenge/takePart',
  async (chalID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'challenges', `${chalID}`);

    try {
      await updateDoc(DocRef, {
        participantsID: arrayUnion(userID),
      });

      console.log('particiance succeed');
    } catch (error) {
      console.error('Error takin part', error);
    }
  },
);
