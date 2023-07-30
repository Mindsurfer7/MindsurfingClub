import {
  getProfileUsername,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileForm,
} from './model/selectors/getProfile';
import ProfileCard from './UI/ProfileCard/ProfileCard';
import { requestProfileData } from './model/services/requestProfileData';
import { updateProfileData } from './model/services/updateProfileData';
export { Profile, ProfileScheme } from './model/types/profile';

export { profileReducer } from './model/slice/profileSlice';

export { requestProfileData };
export { updateProfileData };

export { ProfileCard };

export {
  getProfileUsername,
  getProfileData,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly,
  getProfileForm,
};

export { setReadonly, updateProfile } from './model/slice/profileSlice';
