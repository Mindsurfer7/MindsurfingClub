import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import {
  selectArticleType,
  setPublicID,
  setText,
  textEditorReducer,
} from 'widgets/TextEditor/model/slices/textEditorSlice';
import { publishArticle } from 'widgets/TextEditor/model/services/publishArticle';
import {
  getAllArticleTypeOptions,
  getArticleIsPublished,
  getTextEditorIsLoading,
  getTextEditorPublicID,
  getTextEditorPublicOptions,
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
import { useNavigate, useParams } from 'react-router-dom';
import { getCanEditArticle } from 'entities/Article';
import { getArticleData } from 'entities/Article/model/selectors/getArticleData';
import { uploadImage } from 'features/UploadImage/model/services/uploadImage';
import { ImageUploader } from 'features/UploadImage';
import { updateArticle } from 'widgets/TextEditor/model/services/updateArticle';
import Preloader from 'shared/UI/Preloader/Preloader';
import { Select } from 'shared/UI/Select/Select';
import { requestPublicByModeratotID } from 'entities/Community/model/services/requestPublicByModeratotID';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import Tabs from 'shared/UI/Tabs/Tabs';
import { getArticleTypes } from '../model/services/getArticleTypes';

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
  const isLoading = useSelector(getTextEditorIsLoading);
  const publicSelectOptions = useSelector(getTextEditorPublicOptions);
  const articleTypeOptions = useSelector(getAllArticleTypeOptions);
  const choosenOption = useSelector(getTextEditorPublicID);
  const authorID = useSelector(getGoogleID);
  const article = useSelector(getArticleData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  useEffect(() => {
    authorID && dispatch(requestPublicByModeratotID(authorID));
    dispatch(getArticleTypes());
    if (isEdit) {
      // @ts-ignore
      dispatch(setText(article?.blocks[0].paragraphs[0]));
    }
  }, [dispatch, isEdit, article, authorID]);

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
      dispatch(publishArticle(''));
    }
  }, [dispatch, isLogged]);

  const onSave = useCallback(async () => {
    if (!isLogged) {
      alert('Log in');
    } else {
      await dispatch(updateArticle());
      navigate(`/articles/${article?.id}`);
    }
  }, [dispatch, isLogged, article?.id]);

  const onSelectPublic = (value: string) => {
    dispatch(setPublicID(value));
  };
  const onSelectArticleType = (value: string) => {
    dispatch(selectArticleType(value));
  };

  const mods = {
    [cls['published']]: isPublished,
    [cls['ql-toolbar']]: true,
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        className={classNames(cls.ArticleCreatePage, {}, [className as string])}
      >
        <Text title={t('TextEditor')} align={TextAlign.Center} />

        {/* <Select
          label={'Выбрать тему : '}
          value={choosenOption}
          options={publicSelectOptions}
          onChange={onSelectArticleType}
          subClass={cls.selected}
        /> */}

        <TextEditor
          className={cls.textEditor}
          // text={text}
          // onChangeText={onChangeText}
          clsModification={mods}
        />
        {/* <ImageUploader /> */}

        <Select
          label={'Опубликовать в сообщество : '}
          value={choosenOption}
          options={publicSelectOptions}
          onChange={onSelectPublic}
        />

        <div className={cls.optionList}>
          {' Выберите одну или несколько тем: '}
          {articleTypeOptions?.map((opt) => {
            return (
              <div className={cls.option} key={opt}>
                {opt}
              </div>
            );
          })}
        </div>

        {isEdit ? (
          <Button onClick={onSave} theme={ButtonTheme.OUTLINE}>
            {t('Save')}
          </Button>
        ) : (
          <Button onClick={onPublish} theme={ButtonTheme.OUTLINE}>
            {t('Publish')}
          </Button>
        )}
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticleCreatePage;
