import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TextEditorScheme } from '../types/textEditor';
import { publishArticle } from '../services/publishArticle';
import { uploadImage } from 'features/UploadImage/model/services/uploadImage';

const initialState: TextEditorScheme = {
  isLoading: false,
  isPublished: false,
  error: undefined,
  imageLink: '',
  text: '',
};

export const textEditorSlice = createSlice({
  name: 'TextEditor',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    addText: (state, action: PayloadAction<string>) => {
      // state.text.push String(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishArticle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(publishArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isPublished = true;
      })
      .addCase(publishArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(uploadImage.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageLink = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setText } = textEditorSlice.actions;
export const { reducer: textEditorReducer } = textEditorSlice;
