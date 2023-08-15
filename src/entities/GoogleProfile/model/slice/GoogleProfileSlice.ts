import { createSlice } from '@reduxjs/toolkit';
import {
  GoogleProfile,
  GoogleProfileScheme,
} from 'entities/GoogleProfile/types/GoogleProfile';
import { loginWithGoogle } from 'features/AuthWithGoogle/model/services/loginWithGoogle';

const initialState: GoogleProfileScheme = {
  isLogged: false,
  isLoading: false,
  account: {} as GoogleProfile,
  error: '',
};

export const GoogleProfileSlice = createSlice({
  name: 'GoogleProfile',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
      state.isLogged = true;
    },
    logoutAccount: (state) => {
      state.account = undefined;
      state.isLogged = false;
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
      });
  },
});

export const { setAccount, logoutAccount } = GoogleProfileSlice.actions;
export const { reducer: GoogleProfileReducer } = GoogleProfileSlice;
