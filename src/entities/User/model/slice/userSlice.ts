import { createSlice } from '@reduxjs/toolkit';
import { UserScheme } from '../types/user';

const initialState: UserScheme = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
});
//didnt export actions
export const {} = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export interface CounterScheme {
  value: number;
}
