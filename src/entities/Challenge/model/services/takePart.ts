import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const takePart = createAsyncThunk<any, any, ThunkConfig<any>>(
  'Challenge/takePart',
  async ({ chalID, startDate, endDate }, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const profileG = getGoogleProfile(thunkAPI.getState());

    const DocRef = doc(GPT_DB, 'challenges', `${chalID}`);

    console.log(chalID);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dayArray = [];
    for (
      let date = startDateObj;
      date <= endDateObj;
      date.setDate(date.getDate() + 1)
    ) {
      dayArray.push({ date: new Date(date), isDone: false }); // { date: new Date(date), isDone: false }
    }

    const participantData = {
      ID: userID,
      isDoneArray: dayArray,
      nickname: profileG?.displayName,
      points: 0,
    };

    try {
      await updateDoc(DocRef, {
        participants: arrayUnion(participantData),
      });

      console.log('particiance succeed');
    } catch (error) {
      console.error('Error takin part', error);
    }
  },
);
