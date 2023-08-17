import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import Input from 'shared/UI/Input/Input';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import { getCommentText } from '../model/selectors/getCommentsData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { addCommentReducer, setText } from '../model/slice/addCommentSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  AddComment: addCommentReducer,
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  className,
  onSendComment,
}) => {
  const text = useSelector(getCommentText);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(setText(value));
    },
    [dispatch],
  );
  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [dispatch, onCommentTextChange, text]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div
        className={classNames(cls.AddCommentForm, {}, [className as string])}
      >
        <Input
          className={cls.input}
          placeholder="ваш комментарий"
          value={text}
          onChange={onCommentTextChange}
        />
        <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
          Comment
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
