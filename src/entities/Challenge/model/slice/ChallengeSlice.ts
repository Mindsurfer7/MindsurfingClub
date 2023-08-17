import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewChallenge } from '../services/createNewChallenge';
import { ChallengeScheme } from 'entities/Challenge/types/ChallengeScheme';
import { requestChallenges } from '../services/requestChallenges';
import { getChallengesByUserID } from '../services/getChellengesByUserID';

const initialState: ChallengeScheme = {
  isLoading: false,
  showChallenges: false,
  challenges: [],
  challengeData: {
    ID: '',
    communityID: '',
    title: 'string',
    description: 'string',
    startDate: 'string',
    endDate: 'string',
    executionType: 'string',
    points: 9,
    participantsID: [],
  },
  error: '',
};

export const ChallengeSlice = createSlice({
  name: 'Challenges',
  initialState,
  reducers: {
    setShowChallenges: (state, action: PayloadAction<boolean>) => {
      state.showChallenges = action.payload;
    },
    setChallengeTitle: (state, action: PayloadAction<string>) => {
      state.challengeData.title = action.payload;
    },
    setChallengeDescription: (state, action: PayloadAction<string>) => {
      state.challengeData.description = action.payload;
    },
    setChallengeStartDate: (state, action: PayloadAction<string>) => {
      state.challengeData.startDate = action.payload;
    },
    setChallengeEndDate: (state, action: PayloadAction<string>) => {
      state.challengeData.endDate = action.payload;
    },
    setChallengeExecutionType: (state, action: PayloadAction<string>) => {
      state.challengeData.executionType = action.payload;
    },
    setChallengePoints: (state, action: PayloadAction<number>) => {
      state.challengeData.points = action.payload;
    },
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
    builder
      .addCase(getChallengesByUserID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getChallengesByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(getChallengesByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setShowChallenges,
  setChallengeTitle,
  setChallengeDescription,
  setChallengeStartDate,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
} = ChallengeSlice.actions;
export const { reducer: ChallengeReducer } = ChallengeSlice;
