import { requestCommunityByID } from './model/services/requestCommunityByID';
import { PublicType } from './types/CommunityScheme';
import {
  getCommunityData,
  getSinglePublicData,
  getClubsAreLoading,
} from './model/selectors/getCommunityData';
import { requestAllGroups } from './model/services/requestAllGroups';
import { createGroup } from './model/services/createGroup';
import { GroupCreatorModal } from './UI/GroupCreatorModal/GroupCreatorModal';
import { CommunityReducer } from 'entities/Community/model/slice/communitySlice';
import {
  clearGroupModalInputs,
  setTitle,
  setDescription,
} from 'entities/Community/model/slice/communitySlice';
import { CommunitiesScheme } from 'entities/Community/types/CommunityScheme';

export {
  CommunitiesScheme,
  GroupCreatorModal,
  CommunityReducer,
  createGroup,
  clearGroupModalInputs,
  setDescription,
  setTitle,
  requestAllGroups,
  getCommunityData,
  requestCommunityByID,
  getSinglePublicData,
  getClubsAreLoading,
  PublicType,
};
