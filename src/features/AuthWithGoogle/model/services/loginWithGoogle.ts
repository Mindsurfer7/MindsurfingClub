// import {
//   ThunkConfig,
//   ThunkExtraArg,
// } from './../../../../../App/providers/StoreProvider/config/stateScheme';
// import { API } from './../../../../../shared/API/API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User';
import { setAuthData } from 'entities/User/model/slice/userSlice';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { authG, googleProvider } from 'App/API/firebaseAPI';
import {
  GoogleProfile,
  logoutAccount,
  setAccount,
} from 'entities/GoogleProfile';

export const loginWithGoogle = createAsyncThunk<
  GoogleProfile,
  void,
  ThunkConfig<string>
>('googleLogin/loginWithGoogle', async (_, thunkAPI) => {
  try {
    const response = await signInWithPopup(authG, googleProvider).then(() => {
      const currentUser = authG.currentUser;
      if (!currentUser) {
        throw new Error('User not found');
      }

      // Extract the required data from the currentUser object
      const { uid, displayName, email, photoURL } = currentUser;
      const profile: GoogleProfile = { uid, displayName, email, photoURL };

      //no need if fulfilled code is written in slice
      // thunkAPI.dispatch(setAccount(profile));

      return Promise.resolve({
        profile,
      });
    });

    if (!response) {
      throw new Error();
    }

    return response.profile;
  } catch (e) {
    return thunkAPI.rejectWithValue('somethin bad happened');
  }
});

export const logoutWithGoogle = createAsyncThunk(
  'googleLogout/loginWithGoogle',
  async (_, thunkAPI) => {
    console.log('logout thunnk called');
    try {
      await signOut(authG).then(() =>
        Promise.resolve({ status: 200, message: 'You were logged out' }),
      );

      thunkAPI.dispatch(logoutAccount());
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
