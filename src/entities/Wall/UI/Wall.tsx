import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Wall.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useTranslation } from 'react-i18next';

interface WallProps {
  className?: string;
}

const Wall: React.FC<WallProps> = ({ className }) => {
  const { t } = useTranslation('wall');
  return (
    <div className={classNames(cls.Wall, {}, [className as string])}>
      <div className={cls.wallWrapper}>
        <div className={cls.content}></div>
        <div className={cls.send}>
          <Textarea
            className={cls.textarea}
            // onChange={handleChange}
            // value={singleMessage}
            placeholder={t('write some useful information')}
          />

          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.sendBtn}
            // onClick={onSendtoGPT}
          >
            {t('send')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wall;
