import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunityScheme } from 'entities/Community/types/CommunityScheme';

const initialState: CommunityScheme = {
  isLoading: false,
  title: '',
  desciption: '',
  participants: [],
  error: '',
  id: '',
  posterLink: '',
};

export const CommunitySlice = createSlice({
  name: 'Community',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.desciption = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(createNewChallenge.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(createNewChallenge.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     //state.allTags = action.payload;
    //   })
    //   .addCase(createNewChallenge.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { setTitle, setDescription } = CommunitySlice.actions;
export const { reducer: CommunityReducer } = CommunitySlice;
