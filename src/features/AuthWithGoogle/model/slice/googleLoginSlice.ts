import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginWithGoogle, logoutWithGoogle } from '../services/loginWithGoogle';
import { GoogleProfileScheme } from '../types/GloginSceme';
import { GoogleProfile } from 'entities/User/model/types/user';

const initialState: GoogleProfileScheme = {
  isLogged: false,
  isLoading: false,
  account: {} as GoogleProfile,
  error: '',
};

export const googleLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
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
        state.account = undefined;
      })
      .addCase(logoutWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'some error logging out';
      });
  },
});

export const { setAccount } = googleLoginSlice.actions;
export const { reducer: googleLoginReducer } = googleLoginSlice;
