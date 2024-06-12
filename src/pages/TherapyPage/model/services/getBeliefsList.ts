import { Challenge, setChallengeData } from 'entities/Challenge/';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';

export const getBeliefsList = createAsyncThunk<any, void, ThunkConfig<any>>(
  'TherapyPage/getBeliefsList',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const userId = state.GoogleProfile.account?.uid;

    console.log(userId, 'userId');

    const document = doc(GPT_DB, 'TherapyStorage', `${userId}`);

    try {
      const therapyDoc = await getDoc(document);
      const therapyData = therapyDoc.data();

      console.log(therapyDoc);

      return {
        ...therapyData,
        //   id: .id,
      };
    } catch (error) {
      console.error('Error requesting', error);
    }
  },
);
