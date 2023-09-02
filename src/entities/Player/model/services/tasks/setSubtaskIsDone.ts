import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestDailyz } from '../requestDailyz';
import { requestTasks } from '../requestTasks';

export const setSubtaskIsDone = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/setSubtaskIsDone',
  async (taskID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    console.log('reducer: ' + taskID);
    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const playerDoc = await getDoc(playerDocRef);
      const tasks = playerDoc.data()?.tasks || [];

      // Find the daily task containing the target subtask
      const targetTask = tasks
        .filter((task: any) => task.subtasks !== undefined)
        .find((task: any) =>
          task.subtasks.some((subtask: any) => subtask.id === taskID),
        );

      if (targetTask) {
        // Find the index of the subtask within the subtasks array
        const subtaskIndex = targetTask.subtasks.findIndex(
          (subtask: any) => subtask.id === taskID,
        );

        // Update the isDone value of the subtask
        targetTask.subtasks[subtaskIndex].isDone = true;

        // Update the entire 'tasks' array in the document
        await updateDoc(playerDocRef, {
          tasks: tasks,
        });
        thunkAPI.dispatch(requestTasks());
        console.log('isDone value updated');
      }
    } catch (error) {
      console.error('Error changing IsDone', error);
    }
  },
);
