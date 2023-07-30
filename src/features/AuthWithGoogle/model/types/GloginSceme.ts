import { GoogleProfile } from 'entities/User/model/types/user';

export interface GoogleProfileScheme {
  isLoading: boolean;
  isLogged: boolean;
  account?: GoogleProfile;
  error?: string;
}
