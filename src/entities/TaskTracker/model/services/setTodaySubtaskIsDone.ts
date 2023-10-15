import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { Subtask } from 'entities/TaskTracker/types/taskTracker';
import { Task } from 'entities/Player/types/player';
import { requestTodayTasks } from './requestTodayTasks';

export const setTodaySubtaskIsDone = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Player/setDailySubtaskIsDone', async (taskID, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

  try {
    const todayDoc = await getDoc(playerDocRef);
    const tasks = todayDoc.data()?.today || [];

    const targetDailyTask = tasks.find((dailyTask: Task) =>
      dailyTask?.subtasks?.find((subtask: Subtask) => subtask.id === taskID),
    );

    if (targetDailyTask) {
      const subtaskIndex = targetDailyTask.subtasks.findIndex(
        (subtask: Subtask) => subtask.id === taskID,
      );

      targetDailyTask.subtasks[subtaskIndex].isDone = true;

      await updateDoc(playerDocRef, {
        today: tasks,
      });
      thunkAPI.dispatch(requestTodayTasks());
      console.log('isDone value updated');
    }
  } catch (error) {
    console.error('Error changing IsDone', error);
  }
});
