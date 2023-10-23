import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import {
  setText,
  textEditorReducer,
} from 'widgets/TextEditor/model/slices/textEditorSlice';
import { publishArticle } from 'widgets/TextEditor/model/services/publishArticle';
import {
  getArticleIsPublished,
  getTextEditorValue,
} from 'widgets/TextEditor/model/selectors/getTextEditorData';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import Text, { TextAlign } from 'shared/UI/Text/Text';
import { Page } from 'widgets/Page';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TextEditor } from 'widgets/TextEditor';

interface ArticleCreatePageProps {
  className?: string;
}

const reducers: ReducersList = {
  TextEditor: textEditorReducer,
};

const ArticleCreatePage: React.FC<ArticleCreatePageProps> = ({ className }) => {
  const text = useSelector(getTextEditorValue) || '';
  const isLogged = useSelector(getGoogleIsLogged);
  const isPublished = useSelector(getArticleIsPublished);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
      <Page
        className={classNames(cls.ArticleCreatePage, {}, [className as string])}
      >
        <Text title={t('TextEditor')} align={TextAlign.Center} />
        <TextEditor
          // text={text}
          // onChangeText={onChangeText}
          clsModification={mods}
        />
        {/* <ReactQuill
          value={text}
          onChange={onChangeText}
          placeholder="Write your best ideas here...)"
          theme="snow"
          className={classNames(cls.quill, mods, [className as string])}
        /> */}
        <Button onClick={onPublish} theme={ButtonTheme.OUTLINE}>
          {t('Publish')}
        </Button>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticleCreatePage;
