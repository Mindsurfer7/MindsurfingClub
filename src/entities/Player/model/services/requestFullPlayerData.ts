import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestFullPlayerData = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('Player/requestFullPlayerData', async (_, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  if (!userID) {
    return thunkAPI.rejectWithValue('User ID is not available');
  }

  const playerDocRef = doc(GPT_DB, 'accounts', userID); // Получаем ссылку на документ по ID

  try {
    const docSnapshot = await getDoc(playerDocRef); // Получаем документ по ID

    if (!docSnapshot.exists()) {
      return thunkAPI.rejectWithValue('Player data not found');
    }

    const fullPlayerData = docSnapshot.data();

    console.log(fullPlayerData);

    if (!fullPlayerData) {
      return thunkAPI.rejectWithValue('Player field not found');
    }

    return fullPlayerData;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error requesting player data');
  }
});
