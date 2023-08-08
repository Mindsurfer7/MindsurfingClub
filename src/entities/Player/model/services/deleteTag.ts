import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getAllTags } from '../selectors/getPlayerData';
import { requestAllTags } from './requestAllTags';

export const deleteTag = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/deleteTag',
  async (tag, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const TaskDocSnap = await getDoc(DocRef);
      const tagsArray = TaskDocSnap.get('AllTags') || [];

      const tagIndex = tagsArray.findIndex((t: any) => t === tag);

      if (tagIndex !== -1) {
        tagsArray.splice(tagIndex, 1);

        await updateDoc(DocRef, {
          AllTags: tagsArray,
        });
        thunkAPI.dispatch(requestAllTags());
      }

      console.log('tag removed');
    } catch (error) {
      console.error('Error tag deleting', error);
    }
  },
);
