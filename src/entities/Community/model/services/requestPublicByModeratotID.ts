import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import axios from 'axios';
import { PublicType } from 'entities/Community/types/CommunityScheme';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { title } from 'process';

export const requestPublicByModeratotID = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('xxxx/requestPublicByModeratotID', async (moderatorID, thunkAPI) => {
  const publicsRef = collection(GPT_DB, 'publics');
  const q = query(
    publicsRef,
    where('moderators', 'array-contains', moderatorID),
  );
  try {
    const response = await getDocs(q);

    if (!response.docs) {
      throw new Error();
    }

    const filteredResponse = response.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    const selectOptions = filteredResponse.map((pb) => {
      return {
        //@ts-ignore
        content: pb.title,
        value: pb.id,
        isChoosen: false,
      };
    });
    return selectOptions;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
