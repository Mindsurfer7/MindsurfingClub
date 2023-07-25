import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileScheme } from '../types/profile';

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
});

export const {} = profileSlice.actions;
export const { reducer: profileReducer } = profileSlice;
