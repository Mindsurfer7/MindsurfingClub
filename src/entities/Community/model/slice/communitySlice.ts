import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunitiesScheme } from 'entities/Community/types/CommunityScheme';
import { requestAllGroups } from '../services/requestAllGroups';
import { requestCommunityByID } from '../services/requestCommunityByID';

const initialState: CommunitiesScheme = {
  isLoading: false,
  groups: [],
  community: null,
  title: '',
  description: '',
  members: [''],
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
      state.description = action.payload;
    },
    clearGroupModalInputs: (state) => {
      state.title = '';
      state.description = '';
    },
    setNewMember: (state, action: PayloadAction<string>) => {
      state.members?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllGroups.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(requestAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestCommunityByID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestCommunityByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.community = action.payload;
      })
      .addCase(requestCommunityByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setTitle, setDescription, clearGroupModalInputs, setNewMember } =
  CommunitySlice.actions;
export const { reducer: CommunityReducer } = CommunitySlice;
