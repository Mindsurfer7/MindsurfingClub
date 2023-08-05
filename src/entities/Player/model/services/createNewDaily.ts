import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';

export const createNewDaily = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/createNewDaily',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const trackerData = getTaskTrackerData(thunkAPI.getState());

    const habitDocRef = doc(GPT_DB, 'accounts', `${userID}`);

    const newDaily = {
      id: trackerData.id,
      description: trackerData.description,
      difficulty: trackerData.difficulty,
      isDone: false,
      title: trackerData.title,
      tags: trackerData.tags,
    };

    try {
      await updateDoc(habitDocRef, {
        daily: arrayUnion(newDaily),
      });
      console.log('dailyk created');
    } catch (error) {
      console.error('Error creating dailyk', error);
    }
  },
);
