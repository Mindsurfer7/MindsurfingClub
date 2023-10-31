import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getArticleImageLink } from 'widgets/TextEditor/model/selectors/getTextEditorData';

export const updateProfilePicture = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('GoogleProfile/updateProfilePicture', async (zero, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const URL = getArticleImageLink(thunkAPI.getState());
  const docRef = doc(GPT_DB, 'accounts', `${userID}`);

  console.log(URL);

  const updateData = {
    'Player.photoURL': URL,
  };

  try {
    updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updatin pic', error);
  }
});
