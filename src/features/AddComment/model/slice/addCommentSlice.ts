import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentScheme } from '../types/addComment';

const initialState: AddCommentScheme = {
  text: '',
  error: undefined,
};

export const addCommentSlice = createSlice({
  name: 'addComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(requestProfileData.pending, (state, action) => {
    //     state.error = undefined;
    //     state.isLoading = true;
    //   })
    //   .addCase(
    //     requestProfileData.fulfilled,
    //     (state, action: PayloadAction<Profile>) => {
    //       state.isLoading = false;
    //       state.data = action.payload;
    //       state.form = action.payload;
    //     },
    //   )
    //   .addCase(requestProfileData.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })
  },
});

export const { setText } = addCommentSlice.actions;
export const { reducer: addCommentReducer } = addCommentSlice;
