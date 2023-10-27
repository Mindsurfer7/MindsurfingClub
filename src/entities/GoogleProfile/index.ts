import { requestGoogleProfileData } from './model/services/requestGoogleProfileData';
import {
  getGoogleIsLogged,
  getGoogleAvatar,
} from './model/selectors/getGoogleProfile';
import { GoogleProfile } from 'entities/GoogleProfile/types/GoogleProfile';
import {
  logUserIn,
  logoutAccount,
  initGoogleAuthData,
} from './model/slice/GoogleProfileSlice';
export {
  GoogleProfile,
  logUserIn,
  logoutAccount,
  getGoogleIsLogged,
  getGoogleAvatar,
  initGoogleAuthData,
  requestGoogleProfileData,
};
