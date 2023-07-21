import { StateScheme } from 'App/providers/StoreProvider';

export const selectLogingState = (state: StateScheme) => state?.LoginForm;
