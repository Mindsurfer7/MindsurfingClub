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

import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { requestPlayerData } from 'entities/Player/model/services/requestPlayerData';
import { TaskCreatorModal } from './TaskCreatorModal/TaskCreatorModal';
import PlayerCard from 'entities/Player/UI/PlayerCard/PlayerCard';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import DailyWrapper from './DailyWrapper/DailyWrapper';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';
import TasksWrapper from './TasksWrapper/TasksWrapper';
import HabitsWrapper from './HabitsWrapper/HabitsWrapper';
import { requestCompleted } from 'entities/Player/model/services/requestCompleted';
import { requestAllTags } from 'entities/Player/model/services/requestAllTags';
import { requestNotifications } from 'entities/Player/model/services/InGameActions/requestNotifications';

interface PlayerSpaceProps {
  className?: string;
}

const PlayerSpace: React.FC<PlayerSpaceProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const account = useSelector(getGoogleProfile);
  const player = useSelector(getPlayerProfile);
  const isAuth = useSelector(getGoogleIsLogged);

  useEffect(() => {
    if (isAuth) {
      dispatch(requestPlayerData());
    }
  }, [dispatch, isAuth]); //

  const signUpHandler = async () => {
    await dispatch(initializePlayer());
    dispatch(requestPlayerData());
  };

  useEffect(() => {
    if (!player.new) {
      dispatch(requestHabits());
      dispatch(requestTasks());
      dispatch(requestDailyz());
      dispatch(requestPlayerData());
      dispatch(requestNotifications());
      dispatch(requestAllTags());
      dispatch(requestCompleted());
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
      <PlayerCard />

      <div className={cls.TrackerWrapper}>
        <HabitsWrapper />

        <DailyWrapper />

        <TasksWrapper />
      </div>
    </div>
  );
};

export default PlayerSpace;
