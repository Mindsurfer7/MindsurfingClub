import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
  first?: string;
  lastname?: string;
  age?: string;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
  //////   Firebase   //////

  photoURL?: string;
  UID?: string;
  coins?: number;
  health?: number;
  level?: number;
  points?: number;
  displayName?: string;
}

export interface ProfileScheme {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
