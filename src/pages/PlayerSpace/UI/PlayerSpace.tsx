import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerSpace.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { initializePlayer } from 'entities/Player/model/services/initializePlayer';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import { getPlayerProfile } from 'entities/Player/model/selectors/getPlayerData';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { requestPlayerData } from 'entities/Player/model/services/requestPlayerData';
import PlayerCard from 'entities/Player/UI/PlayerCard/PlayerCard';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import DailyWrapper from './DailyWrapper/DailyWrapper';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';
import TasksWrapper from './TasksWrapper/TasksWrapper';
import HabitsWrapper from './HabitsWrapper/HabitsWrapper';
import { requestCompleted } from 'entities/Player/model/services/requestCompleted';
import { requestAllTags } from 'entities/Player/model/services/requestAllTags';
import { requestNotifications } from 'entities/Player/model/services/InGameActions/requestNotifications';
import { ChallengesList, getShowChallenges } from 'entities/Challenge';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import TodayTasks from 'entities/TaskTracker/UI/TodayTasks/UI/TodayTasks';
import { getShowTodayTasks } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';

interface PlayerSpaceProps {
  className?: string;
}

const PlayerSpace: React.FC<PlayerSpaceProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const player = useSelector(getPlayerProfile);
  const isAuth = useSelector(getGoogleIsLogged);

  const showChallenges = useSelector(getShowChallenges);
  const showTodayTasks = useSelector(getShowTodayTasks);

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

  const { t } = useTranslation();

  if (player.new && isAuth) {
    return (
      <div className={cls.initial}>
        <h2>{t('welcome.title')}</h2>
        {t('welcome.description')}
        <Button theme={ButtonTheme.OUTLINE} onClick={signUpHandler}>
          {t('welcome.startGaming')}
        </Button>
      </div>
    );
  }

  return (
    <Page className={classNames(cls.PlayerSpace, {}, [className as string])}>
      <PlayerCard />
      {showTodayTasks && <TodayTasks />}
      {showChallenges ? (
        <ChallengesList />
      ) : (
        <div className={cls.TrackerWrapper}>
          <HabitsWrapper />

          <DailyWrapper />

          <TasksWrapper />
        </div>
      )}
    </Page>
  );
};

export default PlayerSpace;
