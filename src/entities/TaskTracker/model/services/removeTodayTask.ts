import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestTodayTasks } from './requestTodayTasks';

export const removeTodayTask = createAsyncThunk<any, string, ThunkConfig<any>>(
  'TaskTracker/removeTodayTask',
  async (taskID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const TaskDocSnap = await getDoc(DocRef);
      const tasksArray = TaskDocSnap.get('today') || [];

      const taskIndex = tasksArray.findIndex((t: any) => t.id === taskID);

      if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);

        await updateDoc(DocRef, {
          today: tasksArray,
        });
      }
      thunkAPI.dispatch(requestTodayTasks());
      // thunkAPI.dispatch(cutTask(habitID));
      console.log('task removed');
    } catch (error) {
      console.error('Error creating habit', error);
    }
  },
);
