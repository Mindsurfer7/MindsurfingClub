import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { TaskTrackerScheme } from 'entities/TaskTracker/types/taskTracker';

const initialState: TaskTrackerScheme = {
  showCompleted: false,
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
    setTags: (state, action: PayloadAction<string>) => {
      state.tags = [];
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
  setID,
  setTags,
  setTitle,
  clearInputs,
} = TaskTrackerSlice.actions;
export const { reducer: TaskTrackerReducer } = TaskTrackerSlice;
