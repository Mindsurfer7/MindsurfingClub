import { GoogleProfile } from 'entities/GoogleProfile';

export interface User {
  id: number;
  username: string;
  avatar?: string;
}

export interface UserScheme {
  authData?: User;
  googleAuthData?: GoogleProfile;
  inited: boolean;
}
