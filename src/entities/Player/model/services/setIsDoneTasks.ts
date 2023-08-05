import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const setIsDoneTasksAPI = createAsyncThunk<
  any,
  { taskID: string; isDone: boolean },
  ThunkConfig<any>
>('Player/setIsDoneTasksAPI', async ({ taskID, isDone }, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

  try {
    const playerDoc = await getDoc(playerDocRef);
    const tasks = playerDoc.data()?.tasks || [];

    // Find the index of the element with the given elementID
    const elementIndex = tasks.findIndex((x: any) => x.id === taskID);

    if (elementIndex !== -1) {
      // Update the isDone value of the element at the found index
      tasks[elementIndex].isDone = isDone;

      // Update the entire 'daily' array in the document
      await updateDoc(playerDocRef, {
        tasks: tasks,
      });
      await updateDoc(playerDocRef, {
        completed: arrayUnion(tasks[elementIndex]),
      });
    }
    console.log('isDone value updated');
  } catch (error) {
    console.error('Error isDone value updating', error);
  }
});
