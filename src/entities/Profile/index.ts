import { requestGoogleProfileData } from './model/services/requestGoogleProfileData';
import {
  getProfileUsername,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileForm,
} from './model/selectors/getProfile';
import ProfileCard from './UI/ProfileCard/ProfileCard';
import NewProfileCard from './UI/ProfileCard/NewProfileCard';
import { requestProfileData } from './model/services/requestProfileData';
import { updateProfileData } from './model/services/updateProfileData';
export { Profile, ProfileScheme } from './model/types/profile';

export { profileReducer } from './model/slice/profileSlice';

export { requestProfileData, requestGoogleProfileData };
export { updateProfileData };

export { ProfileCard, NewProfileCard };

export {
  getProfileUsername,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileForm,
};

export { setReadonly, updateProfile } from './model/slice/profileSlice';
