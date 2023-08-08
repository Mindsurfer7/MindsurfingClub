import React, { useCallback, useState } from 'react';
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
import { TaskDisplayModal } from 'pages/PlayerSpace/UI/TaskDisplayModal/TaskDisplayModal';
import { ToastContainer, toast } from 'react-toastify';
import { rewardCoins } from 'entities/Player/model/services/InGameActions/rewardCoins';
import { saveNotification } from 'entities/Player/model/services/InGameActions/saveNotification';

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
  tags: string[];
  id: string;
}

const SingleEndeavor: React.FC<SingleEndeavorProps> = (props) => {
  const {
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
  } = props;

  const dispatch = useAppDispatch();
  const [isVisible2, setVisibility2] = useState(false);

  const notify = (points?: number, coins?: number) => {
    toast.success(`You have earned ${points} points!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    dispatch(saveNotification(`You have earned ${points} points!`));

    toast.success(`You have earned ${coins} coins!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    dispatch(saveNotification(`You have earned ${coins} coins!`));
  };

  const onPlusClick = async () => {
    if (difficulty === 1) {
      await dispatch(increasePoints(10));
      await dispatch(rewardCoins(2));
      notify(10, 2);
      dispatch(requestPlayerData());
    } else if (difficulty === 2) {
      await dispatch(increasePoints(20));
      await dispatch(rewardCoins(4));
      notify(20, 4);
      dispatch(requestPlayerData());
    } else if (difficulty === 3) {
      await dispatch(increasePoints(30));
      await dispatch(rewardCoins(7));
      notify(30, 7);
      dispatch(requestPlayerData());
    } else if (difficulty === 4) {
      await dispatch(increasePoints(40));
      await dispatch(rewardCoins(11));
      notify(40, 11);
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

  const onCloseModal2 = useCallback(() => {
    setVisibility2(false);
  }, []);
  const onOpenModal2 = useCallback(() => {
    setVisibility2(true);
  }, []);

  const mods = {
    [cls['isDone']]: isDone,
  };

  if (isDaily) {
    return (
      <div
        className={classNames(cls.SingleEndeavor, mods, [className as string])}
      >
        <div className={cls.Wrapper}>
          <div className={cls.plusBtn}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => {
                onCheckBoxChangeDaily();
              }}
            ></input>
          </div>

          <div onClick={onOpenModal2} className={cls.title}>
            {title}
          </div>
          <div className={cls.deleteBtn}>
            <Button onClick={removeHandler} className={cls.xIcon}>
              X
            </Button>
          </div>
        </div>

        {isVisible2 && (
          <TaskDisplayModal
            isVisible={isVisible2}
            onClose={onCloseModal2}
            {...props}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }

  if (isTask) {
    return (
      <div
        className={classNames(cls.SingleEndeavor, mods, [className as string])}
      >
        <div className={cls.Wrapper}>
          <div className={cls.plusBtn}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => {
                onCheckBoxChangeTasks();
              }}
            ></input>
          </div>

          <div onClick={onOpenModal2} className={cls.title}>
            {title}
          </div>

          <div className={cls.deleteBtn}>
            <Button onClick={removeHandler} className={cls.xIcon}>
              X
            </Button>
          </div>
        </div>

        {isVisible2 && (
          <TaskDisplayModal
            isVisible={isVisible2}
            onClose={onCloseModal2}
            {...props}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }

  return (
    <div className={classNames(cls.SingleEndeavor, {}, [className as string])}>
      <div className={cls.Wrapper}>
        <div className={cls.plusBtn}>
          <Button onClick={onPlusClick} className={cls.Plus}>
            +
          </Button>
        </div>

        <div onClick={onOpenModal2} className={cls.title}>
          {title}
        </div>

        <div className={cls.deleteBtn}>
          <Button onClick={removeHandler} className={cls.xIcon}>
            X
          </Button>
        </div>
      </div>

      {isVisible2 && (
        <TaskDisplayModal
          isVisible={isVisible2}
          onClose={onCloseModal2}
          {...props}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SingleEndeavor;
