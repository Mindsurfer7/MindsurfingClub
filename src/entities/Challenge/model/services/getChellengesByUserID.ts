import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  Challenge,
  Participant,
} from 'entities/Challenge/types/ChallengeScheme';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const getChallengesByUserID = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('Challenge/getChallengesByUserID', async (_, thunkAPI) => {
  const challengesRef = collection(GPT_DB, 'challenges');
  const userID = getGoogleID(thunkAPI.getState());

  try {
    const querySnapshot = await getDocs(challengesRef);
    const challenges: Challenge[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const participant = data.participants.find(
        (participant: Participant) => participant.ID === userID,
      );

      if (participant) {
        //@ts-ignore
        challenges.push({
          ...data,
          id: doc.id,
        });
      }
    });

    console.log(challenges);

    return challenges;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
