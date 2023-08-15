import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import {
  getGroupDescription,
  getGroupTitle,
} from '../selectors/getCommunityData';

export const createGroup = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Community/createGroup',
  async (payload, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const title = getGroupTitle(thunkAPI.getState());
    const description = getGroupDescription(thunkAPI.getState());

    const publicsRef = collection(GPT_DB, 'publics');
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
      await addDoc(publicsRef, {
        title: title,
        description: description,
        members: [userID],
        challenges: [],
        posterLink:
          'https://us.123rf.com/450wm/lkeskinen/lkeskinen1709/lkeskinen170910246/86379213-community-rubber-stamp.jpg?ver=6',
      });

      console.log('public created');
    } catch (error) {
      console.error('Error creating public', error);
    }
  },
);
