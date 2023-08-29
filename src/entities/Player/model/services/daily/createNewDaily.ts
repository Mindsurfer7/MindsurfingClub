import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { addNewTag } from '../addNewTag';

export const createNewDaily = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/createNewDaily',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const habitDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    const newDaily = {
      id: trackerData.id,
      description: trackerData.description,
      difficulty: trackerData.difficulty,
      subtasks: trackerData.subtasks,
      isDone: false,
      title: trackerData.title,
      tags: trackerData.tags,
      isDoneTimestamp: new Date(),
    };

    try {
      await updateDoc(habitDocRef, {
        daily: arrayUnion(newDaily),
      });
      await thunkAPI.dispatch(addNewTag());
      console.log('dailyk created');
    } catch (error) {
      console.error('Error creating dailyk', error);
    }
  },
);
