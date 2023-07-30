export interface User {
  id: number;
  username: string;
}

export interface GoogleProfile {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface UserScheme {
  authData?: User;
  googleAuthData?: GoogleProfile;
}
