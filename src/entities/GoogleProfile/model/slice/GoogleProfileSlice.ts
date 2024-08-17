import { createSlice } from '@reduxjs/toolkit';
import {
  GoogleProfile,
  GoogleProfileScheme,
} from 'entities/GoogleProfile/types/GoogleProfile';
import {
  loginWithGoogle,
  logoutWithGoogle,
} from 'features/AuthWithGoogle/model/services/loginWithGoogle';
import { PROFILE_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const initialState: GoogleProfileScheme = {
  isLogged: false,
  isLoading: false,
  account: {} as GoogleProfile,
  error: '',
  inited: false,
};

export const GoogleProfileSlice = createSlice({
  name: 'GoogleProfile',
  initialState,
  reducers: {
    logUserIn: (state) => {
      state.isLogged = true;
    },
    logoutAccount: (state) => {
      state.account = undefined;
      state.isLogged = false;
      localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
    },
    initGoogleAuthData: (state) => {
      const user = localStorage.getItem(PROFILE_LOCALSTORAGE_KEY);
      if (user) {
        state.account = JSON.parse(user);
        state.isLogged = true;
      }
      state.inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLogged = true;
        state.isLoading = false;
        state.account = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutWithGoogle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(logoutWithGoogle.fulfilled, (state, action) => {
        state.isLogged = false;
        state.isLoading = false;
        localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
      })
      .addCase(logoutWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'some error logging out';
      });
  },
});

export const { logUserIn, logoutAccount, initGoogleAuthData } =
  GoogleProfileSlice.actions;
export const { reducer: GoogleProfileReducer } = GoogleProfileSlice;
