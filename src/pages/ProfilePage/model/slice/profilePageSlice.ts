import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { requestPostsByUserID } from '../services/requestPostsByUserID';
import {
  ProfileInterface,
  ProfilePageScheme,
} from '../types/profilePageScheme';
import { publishPostInProfile } from '../services/publishPostInProfile';
import {
  GoogleProfile,
  requestGoogleProfileData,
} from 'entities/GoogleProfile';

const initialState: ProfilePageScheme = {
  isLoading: false,
  error: '',
  posts: [],
  readonly: true,
};

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    initprofilePage: (state, action: PayloadAction<string>) => {
      //   state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPostInProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(publishPostInProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(publishPostInProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestPostsByUserID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestPostsByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(requestPostsByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestGoogleProfileData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        requestGoogleProfileData.fulfilled,
        (state, action: PayloadAction<ProfileInterface>) => {
          state.isLoading = false;
          state.profile = action.payload;
          state.form = action.payload;
        },
      )
      .addCase(requestGoogleProfileData.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const {} = profilePageSlice.actions;
export const { reducer: profilePageReducer } = profilePageSlice;
