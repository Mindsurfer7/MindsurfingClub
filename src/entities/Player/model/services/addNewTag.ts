import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { requestAllTags } from './requestAllTags';

export const addNewTag = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/addNewTag',
  async (newTag, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    const Doc = await getDoc(DocRef);
    const allTags = Doc.data()?.AllTags || [];

    const allTagsSet = new Set(allTags); // Convert allTags to a Set

    const filteredTags = trackerData.tags.filter((tag) => !allTagsSet.has(tag));

    // let filteredTags: string[] = [];

    // trackerData.tags.forEach((tag) => {
    //   if (!allTags.includes(tag)) {
    //     filteredTags.push(tag);
    //   }
    // });

    const updatedTags = [...allTags, ...filteredTags];

    try {
      await updateDoc(DocRef, {
        AllTags: updatedTags,
      });
      thunkAPI.dispatch(requestAllTags());
      console.log('tags updated');
    } catch (error) {
      console.error('Error updating tags', error);
    }
  },
);
