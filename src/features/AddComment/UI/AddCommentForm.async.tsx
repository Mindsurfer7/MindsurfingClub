import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const addCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  () => import('./AddCommentForm'),
);
