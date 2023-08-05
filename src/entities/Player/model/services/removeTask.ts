import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { Task } from 'entities/Player/types/player';

export const removeTask = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/removeTask',
  async (habitID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const TaskDocSnap = await getDoc(DocRef);
      const tasksArray = TaskDocSnap.get('tasks') || [];

      const taskIndex = tasksArray.findIndex((t: any) => t.id === habitID);

      if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);

        await updateDoc(DocRef, {
          tasks: tasksArray,
        });
      }

      console.log('task removed');
    } catch (error) {
      console.error('Error creating habit', error);
    }
  },
);
