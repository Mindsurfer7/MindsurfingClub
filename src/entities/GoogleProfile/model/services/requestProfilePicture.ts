import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestProfilePic = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('GoogleProfile/requestProfilePic', async (userID, thunkAPI) => {
  const accRef = doc(GPT_DB, 'accounts', userID);

  try {
    const docSnap = await getDoc(accRef);

    if (docSnap.exists()) {
      const photoURL = docSnap.data().Player.photoURL;

      console.log(photoURL);

      return photoURL;
    } else {
      console.log('Пользователь не найден');
      return 'Unknown User';
    }
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
