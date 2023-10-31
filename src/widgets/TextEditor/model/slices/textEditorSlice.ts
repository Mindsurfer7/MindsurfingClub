import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TextEditorScheme } from '../types/textEditor';
import { publishArticle } from '../services/publishArticle';
import { uploadImage } from 'features/UploadImage/model/services/uploadImage';
import { updateArticle } from '../services/updateArticle';
import { requestPublicByModeratotID } from 'entities/Community/model/services/requestPublicByModeratotID';
import { getArticleTypes } from 'pages/ArticleCreatePage/model/services/getArticleTypes';

const initialState: TextEditorScheme = {
  isLoading: false,
  isPublished: false,
  publicID: '',
  publicSelectOptions: [],
  articleTypeOptions: [],
  selectedArticleTypeOptions: [],
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
    setPublicID: (state, action: PayloadAction<string>) => {
      state.publicID = action.payload;
    },
    selectArticleType: (state, action: PayloadAction<string>) => {
      state.articleTypeOptions.push(action.payload);
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
        // state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.imageLink = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateArticle.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestPublicByModeratotID.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(requestPublicByModeratotID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicSelectOptions = action.payload;
      })
      .addCase(requestPublicByModeratotID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(getArticleTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articleTypeOptions = action.payload;
    });
  },
});

export const { setText, setPublicID, selectArticleType } =
  textEditorSlice.actions;
export const { reducer: textEditorReducer } = textEditorSlice;
