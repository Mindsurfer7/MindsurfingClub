import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import { requestProfileDataProps } from 'entities/requestProfileDataProps';
import { Profile } from '../types/profile';
import { ThunkConfig } from 'App/providers/StoreProvider';

//{ rejectValue: string }

export const requestProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>('profile/requestProfileData', async (_, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.API.get<Profile>('/profile');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
