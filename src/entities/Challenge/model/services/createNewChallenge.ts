import { v4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const createNewChallenge = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Challenge/createNewChallenge', async (title, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const challangesRef = collection(GPT_DB, 'challenges');
  //const habitDocRef = doc(GPT_DB, 'challenges', `${userID}`);

  //мож понадобится как темплейт для объекта челленджа
  // const newDaily = {
  //   id: trackerData.id,
  //   description: trackerData.description,
  //   difficulty: trackerData.difficulty,
  //   isDone: false,
  //   title: trackerData.title,
  //   tags: trackerData.tags,
  //   isDoneTimestamp: new Date(),
  // };

  try {
    await addDoc(challangesRef, {
      ID: v4(),
      title: title,
      participantsID: [],
    });

    console.log('challenge created');
  } catch (error) {
    console.error('Error creating dailyk', error);
  }
});
