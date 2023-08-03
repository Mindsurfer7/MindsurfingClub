export interface GoogleProfile {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface GoogleProfileScheme {
  isLoading: boolean;
  isLogged: boolean;
  account?: GoogleProfile;
  error?: string;
}
