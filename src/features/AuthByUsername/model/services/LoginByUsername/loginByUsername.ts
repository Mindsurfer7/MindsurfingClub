import {
  ThunkConfig,
  ThunkExtraArg,
} from './../../../../../App/providers/StoreProvider/config/stateScheme';
import { API } from './../../../../../shared/API/API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User';
import { setAuthData } from 'entities/User/model/slice/userSlice';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface loginByUsernameProps {
  username: string;
  password: string;
}

enum LoginErrors {
  INCORRECT_DATA = '',
}
//ThunkConfig<string>  { rejectedValue: string; extra: ThunkExtraArg }
export const loginByUsername = createAsyncThunk<
  User,
  loginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.API.post<User>('/login', authData);

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

    thunkAPI.dispatch(setAuthData(response.data));

    //thunkAPI.extra.navigate?.('/profile');
    // thunkAPI.dispatch(setAuthData(response.data));

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Wrong password or login');
  }
});
