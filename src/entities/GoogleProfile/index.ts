import type { GoogleProfile } from './types/GoogleProfile';
import { requestGoogleProfileData } from './model/services/requestGoogleProfileData';
import {
  getGoogleIsLogged,
  getGoogleAvatar,
} from './model/selectors/getGoogleProfile';
import {
  logUserIn,
  logoutAccount,
  initGoogleAuthData,
} from './model/slice/GoogleProfileSlice';

// export type { GoogleProfile };

export {
  GoogleProfile,
  logUserIn,
  logoutAccount,
  getGoogleIsLogged,
  getGoogleAvatar,
  initGoogleAuthData,
  requestGoogleProfileData,
};
