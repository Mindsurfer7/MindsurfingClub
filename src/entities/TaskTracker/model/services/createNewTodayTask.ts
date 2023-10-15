import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { addNewTag } from 'entities/Player/model/services/addNewTag';
import { requestTodayTasks } from './requestTodayTasks';

export const createNewTodayTask = createAsyncThunk<any, void, ThunkConfig<any>>(
  'TaskTracker/createNewTodayTask',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    const newTask = {
      id: trackerData.id,
      description: trackerData.description,
      difficulty: trackerData.difficulty,
      subtasks: trackerData.subtasks,
      isDone: false,
      title: trackerData.title,
      tags: trackerData.tags,
    };

    try {
      await updateDoc(DocRef, {
        today: arrayUnion(newTask),
      });

      await thunkAPI.dispatch(requestTodayTasks());
      await thunkAPI.dispatch(addNewTag());

      console.log('Task created');
    } catch (error) {
      console.error('Error creating task', error);
    }
  },
);
