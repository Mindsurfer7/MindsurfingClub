import { Participant } from 'entities/Challenge/types/ChallengeScheme';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

import { getChallengeData } from 'entities/Challenge/model/selectors/getChallengeData';
import { v4 } from 'uuid';

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

  if (!endDate || !startDate) {
    throw new Error('endDate is undefined');
  }

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const dayArray = [];

  for (
    let date = startDateObj;
    date <= endDateObj;
    date.setDate(date.getDate() + 1)
  ) {
    dayArray.push({ date: new Date(date), isDone: false });
  }

  const participant = {
    ID: userID,
    nickname: profileG?.displayName,
    points: 0,
    isDoneArray: dayArray,
  };

  try {
    await addDoc(challangesRef, {
      title: title,
      isFinished: false,
      description: description,
      communityID: publicID,
      participants: [participant],
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
