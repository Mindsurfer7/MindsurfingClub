import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestDailyz } from '../requestDailyz';

export const setDailySubtaskIsDone = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Player/setDailySubtaskIsDone', async (taskID, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

  try {
    const playerDoc = await getDoc(playerDocRef);
    const dailyTasks = playerDoc.data()?.daily || [];

    // Find the daily task containing the target subtask
    const targetDailyTask = dailyTasks.find((dailyTask: any) =>
      dailyTask.subtasks.some((subtask: any) => subtask.id === taskID),
    );

    if (targetDailyTask) {
      // Find the index of the subtask within the subtasks array
      const subtaskIndex = targetDailyTask.subtasks.findIndex(
        (subtask: any) => subtask.id === taskID,
      );

      // Update the isDone value of the subtask
      targetDailyTask.subtasks[subtaskIndex].isDone = true;

      // Update the entire 'daily' array in the document
      await updateDoc(playerDocRef, {
        daily: dailyTasks,
      });
      thunkAPI.dispatch(requestDailyz());
      console.log('isDone value updated');
    }
  } catch (error) {
    console.error('Error changing IsDone', error);
  }
});
