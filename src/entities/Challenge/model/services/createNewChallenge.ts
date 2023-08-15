import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

import { getChallengeData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';

export const createNewChallenge = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Challenge/createNewChallenge', async (publicID, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const profileG = getGoogleProfile(thunkAPI.getState());

  const { description, title, startDate, endDate, executionType, points } =
    getChallengeData(thunkAPI.getState());
  const challangesRef = collection(GPT_DB, 'challenges');

  try {
    await addDoc(challangesRef, {
      title: title,
      description: description,
      communityID: publicID,
      participantsID: [{ ID: userID, nickname: profileG?.displayName }],
      startDate: startDate,
      endDate: endDate,
      executionType: executionType,
      points: points,
    });

    console.log('challenge created');
  } catch (error) {
    console.error('Error creating challenge', error);
  }
});
