import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { TaskTrackerScheme } from 'entities/TaskTracker/types/taskTracker';

const initialState: TaskTrackerScheme = {
  showCompleted: false,
  // challengeData: {
  //   title: 'string',
  //   description: 'string',
  //   startDate: 'string',
  //   endDate: 'string',
  //   executionType: 'string',
  //   points: 9,
  //   participants: [],
  // },
  selectedTag: '',
  description: '',
  difficulty: 1,
  isLoading: false,
  title: '',
  isDone: false,
  tags: [],
  id: '',
  error: '',
};

export const TaskTrackerSlice = createSlice({
  name: 'TaskTracker',
  initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;
    },
    clearSelectedTag: (state) => {
      state.selectedTag = ' ';
    },
    setShowCompleted: (state, action: PayloadAction<boolean>) => {
      state.showCompleted = action.payload;
    },

    clearInputs: (state) => {
      state.difficulty = 1;
      state.description = '';
      state.title = '';
      state.id = '';
      state.tags = [];
    },
    setNewInitialState: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        difficulty: number;
        tags: string[];
        id: string;
      }>,
    ) => {
      console.log(action.payload.tags);

      state.difficulty = action.payload.difficulty;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.tags = action.payload.tags;
    },
    //////////////////////////////
    // setChallengeTitle: (state, action: PayloadAction<string>) => {
    //   state.challengeData.title = action.payload;
    // },
    // setChallengeDescription: (state, action: PayloadAction<string>) => {
    //   state.challengeData.description = action.payload;
    // },
    // setChallengeStartDate: (state, action: PayloadAction<string>) => {
    //   state.challengeData.startDate = action.payload;
    // },
    // setChallengeEndDate: (state, action: PayloadAction<string>) => {
    //   state.challengeData.endDate = action.payload;
    // },
    // setChallengeExecutionType: (state, action: PayloadAction<string>) => {
    //   state.challengeData.executionType = action.payload;
    // },
    // setChallengePoints: (state, action: PayloadAction<number>) => {
    //   state.challengeData.points = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewHabit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.description = '';
        (state.difficulty = 0), (state.id = '');
        state.title = '';
        state.tags = [];
      })
      .addCase(createNewHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDescription,
  setDifficulty,
  setShowCompleted,
  setSelectedTag,
  clearSelectedTag,
  setID,
  setTags,
  setTitle,
  clearInputs,
  setNewInitialState,
  /////////////////////////////
  // setChallengeTitle,
  // setChallengeDescription,
  // setChallengeStartDate,
  // setChallengeEndDate,
  // setChallengeExecutionType,
  // setChallengePoints,
} = TaskTrackerSlice.actions;
export const { reducer: TaskTrackerReducer } = TaskTrackerSlice;
