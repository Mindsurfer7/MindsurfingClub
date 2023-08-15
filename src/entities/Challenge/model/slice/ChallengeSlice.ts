import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewChallenge } from '../services/createNewChallenge';
import { ChallengeScheme } from 'entities/Challenge/types/ChallengeScheme';
import { requestChallenges } from '../services/requestChallenges';

const initialState: ChallengeScheme = {
  isLoading: false,
  challenges: [],
  error: '',
};

export const ChallengeSlice = createSlice({
  name: 'Challenges',
  initialState,
  reducers: {
    setIsDoneDaily: (
      state,
      action: PayloadAction<{ taskID: string; isDone: boolean }>,
    ) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChallenge.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewChallenge.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.allTags = action.payload;
      })
      .addCase(createNewChallenge.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestChallenges.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(requestChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = ChallengeSlice.actions;
export const { reducer: ChallengeReducer } = ChallengeSlice;
