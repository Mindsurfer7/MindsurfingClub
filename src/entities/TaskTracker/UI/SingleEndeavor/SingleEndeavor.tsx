import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleEndeavor.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { increasePoints } from 'entities/Player/model/services/increasePoints';
import { requestPlayerData } from 'entities/Player/model/services/requestPlayerData';
import { setIsDoneDailyAPI } from 'entities/Player/model/services/setIsDoneValue';
import {
  setIsDoneDaily,
  setIsDoneTasks,
} from 'entities/Player/model/slice/playerSlice';
import { decreasePoints } from 'entities/Player/model/services/decreasePoints';
import { setIsDoneTasksAPI } from 'entities/Player/model/services/setIsDoneTasks';

interface SingleEndeavorProps {
  onRemove: (id: string) => Promise<void>;
  onRequest: () => void;
  isHabit?: boolean;
  isTask?: boolean;
  isDaily?: boolean;
  difficulty: number;
  description: string;
  className?: string;
  title: string;
  isDone: boolean;
  tags?: string[];
  id: string;
}
//value={isDone} <input type="checkbox" />
//этот компонент содержит в себе инфу о сложности соответственно он и может контролировать
//сколько очков надо диспатчивть

const SingleEndeavor: React.FC<SingleEndeavorProps> = ({
  onRemove,
  onRequest,
  className,
  title,
  difficulty,
  isDone,
  isDaily = false,
  isHabit = false,
  isTask = false,
  id,
}) => {
  const dispatch = useAppDispatch();
  console.log('singl ende' + isDone);

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

  const onMinusClick = async () => {
    if (difficulty === 1) {
      await dispatch(decreasePoints(10));
      dispatch(requestPlayerData());
    } else if (difficulty === 2) {
      await dispatch(decreasePoints(20));
      dispatch(requestPlayerData());
    } else if (difficulty === 3) {
      await dispatch(decreasePoints(30));
      dispatch(requestPlayerData());
    } else if (difficulty === 4) {
      await dispatch(decreasePoints(40));
      dispatch(requestPlayerData());
    }
  };

  const removeHandler = async () => {
    await onRemove(id);
    onRequest();
  };

  const onCheckBoxChangeDaily = async () => {
    dispatch(setIsDoneDaily({ taskID: id, isDone: !isDone }));
    await dispatch(setIsDoneDailyAPI({ taskID: id, isDone: !isDone }));
    onRequest();

    if (!isDone) {
      onPlusClick();
    } else if (isDone) {
      onMinusClick();
    }
  };
  const onCheckBoxChangeTasks = async () => {
    dispatch(setIsDoneTasks({ taskID: id, isDone: !isDone }));
    await dispatch(setIsDoneTasksAPI({ taskID: id, isDone: !isDone }));
    onRequest();

    if (!isDone) {
      onPlusClick();
    } else if (isDone) {
      onMinusClick();
    }
  };

  const mods = {
    [cls['isDone']]: isDone,
  };

  if (isDaily) {
    return (
      <div
        className={classNames(cls.SingleEndeavor, mods, [className as string])}
      >
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => {
            onCheckBoxChangeDaily();
          }}
        ></input>
        <span>{title}</span>
        <Button onClick={removeHandler} className={cls.xIcon}>
          X
        </Button>
      </div>
    );
  }

  if (isTask) {
    return (
      <div
        className={classNames(cls.SingleEndeavor, mods, [className as string])}
      >
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => {
            onCheckBoxChangeTasks();
          }}
        ></input>
        <span>{title}</span>
        <Button onClick={removeHandler} className={cls.xIcon}>
          X
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.SingleEndeavor, {}, [className as string])}>
      <Button onClick={onPlusClick} className={cls.Plus}>
        +
      </Button>{' '}
      <span>{title}</span>
      <Button onClick={removeHandler} className={cls.xIcon}>
        X
      </Button>
      {/* <Xmark onClick={removeHandler} id="x" className={cls.xIcon} /> */}
    </div>
  );
};

export default SingleEndeavor;
