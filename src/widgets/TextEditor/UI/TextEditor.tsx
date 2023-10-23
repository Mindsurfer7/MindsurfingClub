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
import Text, { TextAlign } from 'shared/UI/Text/Text';
import { useTranslation } from 'react-i18next';

interface TextEditorProps {
  className?: string;
  //text: string;
  onPublish?: () => void;
  // onChangeText: (value: string) => void;
  clsModification: any;
}

// removeAfterUnmount https://tiptap.dev/installation/react

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  clsModification,
}) => {
  const text = useSelector(getTextEditorValue) || '';
  const { t } = useTranslation();
  var dispatch = useAppDispatch();
  // const isPublished = useSelector(getArticleIsPublished);

  // const mods = {
  //   [cls['published']]: isPublished,
  // };

  const onChangeText = useCallback(
    (value: string) => {
      dispatch(setText(value));
    },
    [dispatch],
  );

  return (
    <ReactQuill
      value={text}
      onChange={onChangeText}
      placeholder="Write your best ideas here...)"
      theme="snow"
      className={classNames(cls.quill, clsModification, [className as string])}
    />
  );
};

export default TextEditor;
