import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { Task } from 'entities/Player/types/player';

export const removeHabit = createAsyncThunk<any, string, ThunkConfig<any>>(
  'Player/removeHabit',
  async (habitID, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    const habitDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    try {
      const habitDocSnap = await getDoc(habitDocRef);
      const habitsArray = habitDocSnap.get('habits') || [];

      const habitIndex = habitsArray.findIndex(
        (habit: any) => habit.id === habitID,
      );

      if (habitIndex !== -1) {
        habitsArray.splice(habitIndex, 1);

        await updateDoc(habitDocRef, {
          habits: habitsArray,
        });
      }

      console.log('habit removed');
    } catch (error) {
      console.error('Error creating habit', error);
    }
  },
);
