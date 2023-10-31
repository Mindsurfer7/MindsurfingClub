import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const likePost = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Post/likePost',
  async (postID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'posts', `${postID}`);

    try {
      await updateDoc(DocRef, {
        likes: arrayUnion(userID),
      });

      console.log('like succeed');
    } catch (error) {
      console.error('Error liking', error);
    }
  },
);
