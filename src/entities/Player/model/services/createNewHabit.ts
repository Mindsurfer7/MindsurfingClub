import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { addNewTag } from './addNewTag';
import { TaskSubType } from 'entities/TaskTracker/types/taskTracker';
import { Habit } from 'entities/Player/types/player';

export const createNewHabit = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/createNewHabit',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const habitDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    let newHabit: Habit;

    if (trackerData.subtype === TaskSubType.Reverse) {
      newHabit = {
        id: trackerData.id,
        description: trackerData.description,
        difficulty: trackerData.difficulty,
        isDone: false,
        title: trackerData.title,
        tags: trackerData.tags,
        subtype: trackerData.subtype,

        step: trackerData.step,
        count: trackerData.count,
      };
    } else {
      //trackerData.subtype === TaskSubType.Classic
      newHabit = {
        id: trackerData.id,
        description: trackerData.description,
        difficulty: trackerData.difficulty,
        isDone: false,
        title: trackerData.title,
        tags: trackerData.tags,
        subtype: trackerData.subtype,
      };
    }

    try {
      await updateDoc(habitDocRef, {
        habits: arrayUnion(newHabit),
      });
      await thunkAPI.dispatch(addNewTag());
      console.log('habit created');
    } catch (error) {
      console.error('Error creating habit', error);
    }
  },
);
