import { requestGoogleProfileData } from '../GoogleProfile/model/services/requestGoogleProfileData';

import NewProfileCard from './UI/ProfileCard/NewProfileCard';
import { requestProfileData } from './model/services/requestProfileData';
export { Profile, ProfileScheme } from './model/types/profile';

export { profileReducer } from './model/slice/profileSlice';

export { requestProfileData, requestGoogleProfileData };

export { NewProfileCard };

export { updateProfile } from './model/slice/profileSlice';
