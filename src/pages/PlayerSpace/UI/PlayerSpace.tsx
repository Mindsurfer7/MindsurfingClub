import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerSpace.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { initializePlayer } from 'entities/Player/model/services/initializePlayer';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import {
  getHabits,
  getPlayerProfile,
  getTasks,
} from 'entities/Player/model/selectors/getPlayerData';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import SingleHabit from 'entities/TaskTracker/UI/SingleHabit/SingleHabit';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { setDifficulty } from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import Input from 'shared/UI/Input/Input';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import Textarea from 'shared/UI/Textarea/Textarea';
import TaskCreator from 'entities/TaskTracker/UI/TaskCreator/TaskCreator';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { requestPlayerData } from 'entities/Player/model/services/requestPlayerData';
import { TaskCreatorModal } from './TaskCreatorModal/TaskCreatorModal';
import PlayerCard from 'entities/Player/UI/PlayerCard/PlayerCard';
import { requestTasks } from 'entities/Player/model/services/requestTasks';

interface PlayerSpaceProps {
  className?: string;
}

const PlayerSpace: React.FC<PlayerSpaceProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const account = useSelector(getGoogleProfile);
  const player = useSelector(getPlayerProfile);
  const isAuth = useSelector(getGoogleIsLogged);
  const habits = useSelector(getHabits);
  const tasks = useSelector(getTasks);
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    dispatch(requestPlayerData());
  }, [dispatch, isAuth]); //

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const signUpHandler = async () => {
    await dispatch(initializePlayer());
    dispatch(requestPlayerData());
  };

  useEffect(() => {
    if (!player.new) {
      dispatch(requestHabits());
      dispatch(requestTasks());
      dispatch(requestPlayerData());
    }
  }, [dispatch, player.new, isAuth]);

  if (player.new && isAuth) {
    return (
      <div className={cls.initial}>
        {' '}
        <h2>Welcome to the Mindsurfing Club!</h2>
        Here you can click the Start Gaming button to create your charachter!
        <Button theme={ButtonTheme.OUTLINE} onClick={signUpHandler}>
          Start Gaming
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.PlayerSpace, {}, [className as string])}>
      {isVisible && (
        <TaskCreatorModal onClose={onCloseModal} isVisible={isVisible} />
      )}

      <PlayerCard />

      <div className={cls.tasksWrapper}>
        <div className={cls.taskList}>
          {' '}
          {habits.map((h) => {
            return (
              <SingleHabit
                title={h.title}
                isDone={h.isDone}
                difficulty={h.difficulty}
                description={h.description}
              />
            );
          })}
          <Button
            onClick={onOpenModal}
            theme={ButtonTheme.OUTLINE}
            className={cls.addBtn}
          >
            Create new habit
          </Button>
        </div>
        <div className={cls.daily}>dayliks</div>
        <div className={cls.tasks}>
          {' '}
          {tasks.map((h) => {
            return (
              <SingleHabit
                title={h.title}
                isDone={h.isDone}
                //@ts-ignore
                difficulty={h.difficulty}
                description={h.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerSpace;
