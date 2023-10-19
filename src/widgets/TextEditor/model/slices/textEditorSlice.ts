import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TextEditorScheme } from '../types/textEditor';
import { publishArticle } from '../services/publishArticle';

const initialState: TextEditorScheme = {
  isLoading: false,
  isPublished: false,
  error: undefined,
  text: '',
};

export const textEditorSlice = createSlice({
  name: 'TextEditor',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishArticle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        publishArticle.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isPublished = true;
        },
      )
      .addCase(publishArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setText } = textEditorSlice.actions;
export const { reducer: textEditorReducer } = textEditorSlice;
