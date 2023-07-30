// import {
//   ThunkConfig,
//   ThunkExtraArg,
// } from './../../../../../App/providers/StoreProvider/config/stateScheme';
// import { API } from './../../../../../shared/API/API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User';
import {
  setAuthData,
  setGoogleAuthData,
} from 'entities/User/model/slice/userSlice';
import { signInWithPopup, signOut } from 'firebase/auth';
import { authG, googleProvider } from 'index';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { GoogleProfile } from 'entities/User/model/types/user';

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
    try {
      return await signOut(authG).then(() =>
        Promise.resolve({ status: 200, message: 'You were logged out' }),
      );
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
