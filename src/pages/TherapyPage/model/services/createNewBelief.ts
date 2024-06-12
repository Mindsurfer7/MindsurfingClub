import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { Belief } from '../types/therapy';
import { getBeliefsList } from './getBeliefsList';

export const createNewBelief = createAsyncThunk<any, Belief, ThunkConfig<any>>(
  'TherapyPage/createNewBelief',
  async (newBelief, thunkAPI) => {
    const state = thunkAPI.getState();

    const userId = state.GoogleProfile.account?.uid;

    const document = doc(GPT_DB, 'TherapyStorage', `${userId}`);

    try {
      await updateDoc(document, {
        beliefs: arrayUnion(newBelief),
      });

      thunkAPI.dispatch(getBeliefsList());

      return { success: true };
    } catch (error) {
      console.error('Error creating new belief:', error);
      return { error };
    }
  },
);
