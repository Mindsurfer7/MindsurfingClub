import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../types/profile';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { getProfileForm } from '../selectors/getProfile';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<any>
>('profile/updateProfileData', async (_, thunkAPI) => {
  const formData = getProfileForm(thunkAPI.getState());

  try {
    const response = await thunkAPI.extra.API.put<Profile>(
      '/profile',
      formData,
    );
    console.log(response);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
