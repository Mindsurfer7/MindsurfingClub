import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TextEditor.module.scss';
import { setText, textEditorReducer } from '../model/slices/textEditorSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import {
  getArticleIsPublished,
  getTextEditorValue,
} from '../model/selectors/getTextEditorData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { publishArticle } from '../model/services/publishArticle';

interface TextEditorProps {
  className?: string;
}

const reducers: ReducersList = {
  TextEditor: textEditorReducer,
};

// removeAfterUnmount

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const text = useSelector(getTextEditorValue);
  const isLogged = useSelector(getGoogleIsLogged);
  const isPublished = useSelector(getArticleIsPublished);
  const dispatch = useAppDispatch();

  const onChangeText = useCallback(
    (value: string) => {
      dispatch(setText(value));
    },
    [dispatch],
  );
  const onPublish = useCallback(() => {
    if (!isLogged) {
      alert('Log in');
    } else {
      dispatch(publishArticle());
    }
  }, [dispatch, isLogged]);

  const mods = {
    [cls['published']]: isPublished,
  };
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.TextEditor, {}, [className as string])}>
        <ReactQuill
          value={text}
          onChange={onChangeText}
          placeholder="Write your best ideas here...)"
          theme="snow"
          className={classNames(cls.quill, mods, [className as string])}
        />
        <Button onClick={onPublish} theme={ButtonTheme.OUTLINE}>
          Publish
        </Button>
      </Page>
    </DynamicModuleLoader>
  );
};

export default TextEditor;
