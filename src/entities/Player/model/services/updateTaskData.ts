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
import { Daily, Task } from 'entities/Player/types/player';
import { requestTodayTasks } from 'entities/TaskTracker/model/services/requestTodayTasks';

// {id: string, taskTypeArray: boolean[]}

export const updateTaskData = createAsyncThunk<any, any, ThunkConfig<any>>(
  'Player/updateTaskData',
  async ({ id, taskType }, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());
    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    //trackerData берет данные из инпута в состоянии edit / create task
    const updatedTask: any = {
      id: id,
      description: trackerData.description,
      difficulty: trackerData.difficulty,
      isDone: false,
      subtasks: trackerData.subtasks,
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

        updatedTask.isDoneTimestamp = new Date();

        const elementIndexD = dailys.findIndex((x: any) => x.id === id);

        if (elementIndexD !== -1) {
          dailys[elementIndexD] = updatedTask;

          await updateDoc(playerDocRef, {
            daily: dailys,
          });
          thunkAPI.dispatch(requestDailyz());
        }
      } else if (taskType === 'today') {
        const todays = playerDoc.data()?.today || [];

        const elementIndexD = todays.findIndex((x: Task) => x.id === id);

        if (elementIndexD !== -1) {
          todays[elementIndexD] = updatedTask;

          await updateDoc(playerDocRef, {
            today: todays,
          });
          thunkAPI.dispatch(requestTodayTasks());
        }
      }
    } catch (error) {
      console.error('Error updatin task', error);
    }
  },
);
