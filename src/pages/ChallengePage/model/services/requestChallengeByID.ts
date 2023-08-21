import { Challenge } from 'entities/Challenge/';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const requestChallengeByID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('ChallengePage/requestChallengeByID', async (challengeID, thunkAPI) => {
  console.log(challengeID);

  const challengeDocRef = doc(GPT_DB, 'challenges', `${challengeID}`);

  try {
    const challenge = await getDoc(challengeDocRef);
    console.log(challenge.data());

    return challenge.data();
  } catch (error) {
    console.error('Error isDone value updating', error);
  }
});
