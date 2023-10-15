import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestTodayTasks } from './requestTodayTasks';

export const setTodayIsDone = createAsyncThunk<any, string, ThunkConfig<any>>(
  'TaskTracker/setTodayIsDone',
  async (taskID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const todayDoc = await getDoc(playerDocRef);
      const tasks = todayDoc.data()?.today || [];

      const elementIndex = tasks.findIndex((x: any) => x.id === taskID);

      if (elementIndex !== -1) {
        tasks[elementIndex].isDone = true;

        await updateDoc(playerDocRef, {
          today: tasks,
        });

        thunkAPI.dispatch(requestTodayTasks());
      }
      console.log('isDone value updated');
    } catch (error) {
      console.error('Error isDone value updating', error);
    }
  },
);
