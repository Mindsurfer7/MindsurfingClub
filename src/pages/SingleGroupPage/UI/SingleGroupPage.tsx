import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleGroupPage.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { GroupCreatorModal } from 'entities/Community';

interface SingleGroupPageProps {
  className?: string;
}

const SingleGroupPage: React.FC<SingleGroupPageProps> = ({ className }) => {
  const [isVisible, setVisibility] = useState(false);
  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);
  return (
    <div className={classNames(cls.SingleGroupPage, {}, [className as string])}>
      {isVisible && <GroupCreatorModal onClose={onCloseModal} />}

      <Button theme={ButtonTheme.OUTLINE} onClick={onOpenModal}>
        Start Community
      </Button>
    </div>
  );
};

export default SingleGroupPage;
