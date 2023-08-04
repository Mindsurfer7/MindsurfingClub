import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleHabit.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDiscpatch } from 'App/providers/StoreProvider/config/store';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { increasePoints } from 'entities/Player/model/services/increasePoints';
import { requestPlayerData } from 'entities/Player/model/services/requestPlayerData';

interface SingleHabitProps {
  difficulty: number;
  description: string;
  className?: string;
  title: string;
  isDone: boolean;
  tags?: string[];
}
//value={isDone} <input type="checkbox" />
//этот компонент содержит в себе инфу о сложности соответственно он и может контролировать
//сколько очков надо диспатчивть

const SingleHabit: React.FC<SingleHabitProps> = ({
  className,
  title,
  difficulty,
  isDone,
}) => {
  const dispatch = useAppDispatch();

  const onPlusClick = async () => {
    if (difficulty === 1) {
      await dispatch(increasePoints(10));
      dispatch(requestPlayerData());
    } else if (difficulty === 2) {
      await dispatch(increasePoints(20));
      dispatch(requestPlayerData());
    } else if (difficulty === 3) {
      await dispatch(increasePoints(30));
      dispatch(requestPlayerData());
    } else if (difficulty === 4) {
      await dispatch(increasePoints(40));
      dispatch(requestPlayerData());
    }
  };

  return (
    <div className={classNames(cls.SingleHabit, {}, [className as string])}>
      <Button onClick={onPlusClick} theme={ButtonTheme.OUTLINE}>
        +
      </Button>{' '}
      <span>{title}</span>
    </div>
  );
};

export default SingleHabit;
