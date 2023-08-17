import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../types/profile';
import { ThunkConfig } from 'App/providers/StoreProvider';

export const requestProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/requestProfileData', async (profileID, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.API.get<Profile>(
      `/profile/${profileID}`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
