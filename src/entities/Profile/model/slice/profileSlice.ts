import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileScheme } from '../types/profile';
import { requestProfileData } from '../services/requestProfileData';

const initialState: ProfileScheme = {
  isLoading: false,
  readonly: true,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestProfileData.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        requestProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(requestProfileData.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const {} = profileSlice.actions;
export const { reducer: profileReducer } = profileSlice;
