export interface GoogleProfile {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null | undefined;
}

export interface GoogleProfileScheme {
  isLoading: boolean;
  isLogged: boolean;
  account?: GoogleProfile;
  error?: string;
  inited: boolean;
}
