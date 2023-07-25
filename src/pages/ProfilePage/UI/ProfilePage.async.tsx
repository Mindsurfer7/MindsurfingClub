import { FC, lazy } from 'react';
//import { LoginFormProps } from './LoginForm';

export const ProfilePageAsync = lazy(
  //<FC<LoginFormProps>>
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./ProfilePage')), 1500);
    }),
);
