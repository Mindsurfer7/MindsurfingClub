import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Principles.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { createNewPrinciple } from './model/createNewPrinciple';

interface PrinciplesProps {
  className?: string;
}

const Principles: React.FC<PrinciplesProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  //   что будет если айди юзера пока что не содерджится в этой колеуции?

  const onAddNewPrinciple = () => {
    dispatch(
      createNewPrinciple({
        name: 'Личная ответственность',
        description: 'да!',
      }),
    );
  };

  return (
    <div className={classNames(cls.Principles, {}, [className as string])}>
      Принициы!! ура
      <div className={cls.box}>
        <Button onClick={onAddNewPrinciple} theme={ButtonTheme.OUTLINE}>
          {'Декларировоать принцип'}
        </Button>
      </div>
    </div>
  );
};

export default Principles;
