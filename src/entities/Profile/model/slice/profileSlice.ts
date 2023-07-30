import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileScheme } from '../types/profile';
import { requestProfileData } from '../services/requestProfileData';
import { updateProfileData } from '../services/updateProfileData';

const initialState: ProfileScheme = {
  isLoading: false,
  readonly: true,
  error: undefined,
  data: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
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
          state.form = action.payload;
        },
      )
      .addCase(requestProfileData.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      })
      .addCase(updateProfileData.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.form = action.payload;
          state.readonly = true;
        },
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const { setReadonly, updateProfile, cancelEdit } = profileSlice.actions;
export const { reducer: profileReducer } = profileSlice;
