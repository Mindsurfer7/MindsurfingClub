import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginWithGoogle, logoutWithGoogle } from '../services/loginWithGoogle';
import { GoogleLoginScheme } from '../types/GloginSceme';

const initialState: GoogleLoginScheme = {
  isLogged: false,
  isLoading: false,
  error: '',
};

export const googleLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLogged = true;
        state.isLoading = false;
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
      })
      .addCase(logoutWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'some error logging out';
      });
  },
});

export const {} = googleLoginSlice.actions;
export const { reducer: googleLoginReducer } = googleLoginSlice;
