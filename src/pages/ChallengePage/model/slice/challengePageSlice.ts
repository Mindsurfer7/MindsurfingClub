import { Challenge } from './../../../../entities/Challenge/types/ChallengeScheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChallengePageScheme } from '../types/ChallengePageScheme';
import { requestChallengeByID } from '../services/requestChallengeByID';

const initialState: ChallengePageScheme = {
  isLoading: false,
  challengeData: {
    id: '',
    communityID: '',
    title: '',
    isFinished: false,
    description: '',
    startDate: '',
    endDate: '',
    executionType: 'once',
    points: 9,
    participants: [],
  },
  error: '',
};

export const ChallengePageSlice = createSlice({
  name: 'ChallengePage',
  initialState,
  reducers: {
    setChallengeData: (state, action: PayloadAction<Challenge>) => {
      state.challengeData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestChallengeByID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestChallengeByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challengeData = action.payload;
      })
      .addCase(requestChallengeByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = ChallengePageSlice.actions;
export const { reducer: ChallengePageReducer } = ChallengePageSlice;
