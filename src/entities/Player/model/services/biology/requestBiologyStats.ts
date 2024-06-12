import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestBiologyStats = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('Player/requestBiologyStats', async (_, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const DocRef = doc(GPT_DB, 'biology', `${userID}`);

  try {
    const docSnap = await getDoc(DocRef);

    if (docSnap.exists()) {
      const biologyData = docSnap.data();

      console.log('Document data:', biologyData);

      return biologyData; // Верните данные, если нужно
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error gettin bio', error);
  }
});
