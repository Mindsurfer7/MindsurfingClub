import { createSlice } from "@reduxjs/toolkit";

const initialState: CounterScheme = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const { reducer: counterReducer } = counterSlice;

export interface CounterScheme {
  value: number;
}
