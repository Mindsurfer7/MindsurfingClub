import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const queryUsernameByID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('ArticleComments/queryUsernameByID', async (userID, thunkAPI) => {
  const accRef = doc(GPT_DB, 'accounts', userID);

  try {
    const docSnap = await getDoc(accRef);

    if (docSnap.exists()) {
      const userData = docSnap.data().Player;
      const username = userData.username;

      console.log(userData);

      return username;
    } else {
      console.log('Пользователь не найден');
      return 'Unknown User';
    }
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
