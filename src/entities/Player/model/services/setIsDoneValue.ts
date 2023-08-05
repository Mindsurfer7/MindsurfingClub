import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
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
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const setIsDoneDailyAPI = createAsyncThunk<
  any,
  { taskID: string; isDone: boolean },
  ThunkConfig<any>
>('Player/setIsDoneDailyAPI', async ({ taskID, isDone }, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

  try {
    const playerDoc = await getDoc(playerDocRef);
    const daily = playerDoc.data()?.daily || [];

    // Find the index of the element with the given elementID
    const elementIndex = daily.findIndex((x: any) => x.id === taskID);

    if (elementIndex !== -1) {
      // Update the isDone value of the element at the found index
      daily[elementIndex].isDone = isDone;

      // Update the entire 'daily' array in the document
      await updateDoc(playerDocRef, {
        daily: daily,
      });
    }
    console.log('isDone value updated');
  } catch (error) {
    console.error('Error increasing points', error);
  }
});
