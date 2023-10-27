import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddPost.module.scss';
import { TextEditor } from 'widgets/TextEditor';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import Text, { TextAlign } from 'shared/UI/Text/Text';

interface AddPostProps {
  className?: string;
  onPostClick: () => void;
  // id: string | undefined;
}

const AddPost: React.FC<AddPostProps> = ({ className, onPostClick }) => {
  const { t } = useTranslation('wall');

  return (
    <div className={classNames(cls.AddPost, {}, [className as string])}>
      <Text title={t('wallTitle')} align={TextAlign.Center} />

      <div className={cls.send}>
        <TextEditor clsModification={{}} className={cls.postEditor} />

        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.sendBtn}
          onClick={onPostClick}
          // disabled={!id}
        >
          {t('send')}
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
