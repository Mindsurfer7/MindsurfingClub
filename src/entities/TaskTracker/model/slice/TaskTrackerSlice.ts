import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import {
  Subtask,
  TaskTrackerScheme,
} from 'entities/TaskTracker/types/taskTracker';
import { requestTodayTasks } from '../services/requestTodayTasks';

const initialState: TaskTrackerScheme = {
  showCompleted: false,
  selectedTag: '',
  description: '',
  difficulty: 1,
  isLoading: false,
  ShowTodayTasks: false,
  showPrinciples: false,
  showCharacter: false,
  todayTasks: [],
  title: '',
  isDone: false,
  subtasks: [],
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
    setSubtaskTitle: (
      state,
      action: PayloadAction<{ value: string; index: number }>,
    ) => {
      const { value, index } = action.payload;

      if (state.subtasks) {
        const updatedSubtasks = [...state.subtasks];
        updatedSubtasks[index].title = value;
        state.subtasks = updatedSubtasks;
      }
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
    setShowPrinciples: (state, action: PayloadAction<boolean>) => {
      state.showPrinciples = action.payload;
    },
    setSubtask: (state, action: PayloadAction<Subtask>) => {
      state.subtasks?.push(action.payload);
    },
    setSubtasks: (state, action: PayloadAction<Subtask[]>) => {
      state.subtasks = action.payload;
    },
    setShowTodayTasks: (state, action: PayloadAction<boolean>) => {
      state.ShowTodayTasks = action.payload;
    },
    setShowCharacter: (state, action: PayloadAction<boolean>) => {
      state.showCharacter = action.payload;
    },

    clearInputs: (state) => {
      state.difficulty = 1;
      state.description = '';
      state.title = '';
      state.id = '';
      state.tags = [];
      state.subtasks = [];
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
      state.difficulty = action.payload.difficulty;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.tags = action.payload.tags;
    },
    //////////////////////////////
    // setChallengeTitle: (state, action: PayloadAction<string>) => {
    //   state.challengeData.title = action.payload;
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
    builder
      .addCase(requestTodayTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestTodayTasks.fulfilled, (state, action) => {
        state.todayTasks = action.payload;
      })
      .addCase(requestTodayTasks.rejected, (state, action) => {
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
  setShowCharacter,
  setSubtaskTitle,
  setShowTodayTasks,
  setShowPrinciples,
  setID,
  setTags,
  setTitle,
  setSubtask,
  clearInputs,
  setSubtasks,
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
