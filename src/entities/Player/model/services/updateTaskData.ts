import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { addNewTag } from './addNewTag';
import { requestTasks } from './requestTasks';
import { requestHabits } from './requestHabits';
import { requestDailyz } from './requestDailyz';

// {id: string, taskTypeArray: boolean[]}

export const updateTaskData = createAsyncThunk<any, any, ThunkConfig<any>>(
  'Player/updateTaskData',
  async ({ id, taskType }, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    //принимать должна данные таска она хэбит или дейлик
    const updatedTask = {
      id: id,
      description: trackerData.description,
      difficulty: trackerData.difficulty,
      isDone: false,
      title: trackerData.title,
      tags: trackerData.tags,
    };

    try {
      const playerDoc = await getDoc(playerDocRef);

      if (taskType === 'task') {
        const tasks = playerDoc.data()?.tasks || [];

        const elementIndex = tasks.findIndex((x: any) => x.id === id);

        if (elementIndex !== -1) {
          tasks[elementIndex] = updatedTask;

          await updateDoc(playerDocRef, {
            tasks: tasks,
          });

          thunkAPI.dispatch(requestTasks());
        }
      } else if (taskType === 'habit') {
        const habits = playerDoc.data()?.habits || [];

        const elementIndexH = habits.findIndex((x: any) => x.id === id);

        if (elementIndexH !== -1) {
          habits[elementIndexH] = updatedTask;

          await updateDoc(playerDocRef, {
            habits: habits,
          });
          thunkAPI.dispatch(requestHabits());
        }
      } else if (taskType === 'daily') {
        const dailys = playerDoc.data()?.daily || [];

        const elementIndexD = dailys.findIndex((x: any) => x.id === id);

        if (elementIndexD !== -1) {
          dailys[elementIndexD] = updatedTask;

          await updateDoc(playerDocRef, {
            daily: dailys,
          });
          thunkAPI.dispatch(requestDailyz());
        }
      }
    } catch (error) {
      console.error('Error updatin task', error);
    }
  },
);
