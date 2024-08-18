import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerSpace.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { initializePlayer } from 'entities/Player/model/services/initializePlayer';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getPlayerIsLoading,
  getPlayerProfile,
} from 'entities/Player/model/selectors/getPlayerData';
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
import {
  getShowCharacter,
  getShowPrinciples,
  getShowTodayTasks,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import Principles from './Principles/Principles';
import Character from 'entities/Player/UI/PlayerCard/Character/Character';
import Preloader from 'shared/UI/Preloader/Preloader';
import { requestFullPlayerData } from 'entities/Player/model/services/requestFullPlayerData';

interface PlayerSpaceProps {
  className?: string;
}

const PlayerSpace: React.FC<PlayerSpaceProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const player = useSelector(getPlayerProfile);
  const isAuth = useSelector(getGoogleIsLogged);
  const isLoading = useSelector(getPlayerIsLoading);

  const showChallenges = useSelector(getShowChallenges);
  const showTodayTasks = useSelector(getShowTodayTasks);
  const showPrinciples = useSelector(getShowPrinciples);
  const showCharacter = useSelector(getShowCharacter);

  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(requestPlayerData());
  //   }
  // }, [dispatch, isAuth]); //

  const signUpHandler = async () => {
    await dispatch(initializePlayer());
  };

  useEffect(() => {
    console.log('isAuth', isAuth);
    //если неизвестен статус юзера и он залогинен, делаем запрос в бд
    if (player.new === null && isAuth) {
      console.log('неизвестен статус юзера и он залогинен, делаем запрос в бд');
      dispatch(requestPlayerData());
    }

    // если запрос вернул данные и он старый юзер, даем его данные
    if (player.new === false && player.new !== null) {
      console.log('запрос вернул данные и он старый юзер, даем его данные');

      // dispatch(requestFullPlayerData());

      // это все можно сделать 1 запросом, но он почему то пздц долгий
      dispatch(requestHabits());
      dispatch(requestTasks());
      dispatch(requestDailyz());
      dispatch(requestNotifications());
      dispatch(requestAllTags());
      dispatch(requestCompleted());
    }
  }, [dispatch, player.new, isAuth]);

  const { t } = useTranslation();

  if (!isAuth) {
    return (
      <div className={cls.loader}>
        <h2>
          Чтобы создать профиль или войти в свой workspace, залогиньтесь через
          Google
        </h2>
      </div>
    );
  }

  if (isLoading && player.new === null && isAuth) {
    return (
      <div className={cls.loader}>
        <Preloader className={cls.loader} />
      </div>
    );
  }

  if (player.new && isAuth && player.new !== null) {
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

  const showChar = !showChallenges && showCharacter;

  return (
    <Page className={classNames(cls.PlayerSpace, {}, [className as string])}>
      <PlayerCard />
      {showTodayTasks && <TodayTasks />}
      {showPrinciples && <Principles />}

      {showChar ? (
        <Character />
      ) : (
        <div className="">
          {showChallenges ? (
            <ChallengesList />
          ) : (
            <div className={cls.TrackerWrapper}>
              <HabitsWrapper />

              <DailyWrapper />

              <TasksWrapper />
            </div>
          )}
        </div>
      )}
    </Page>
  );
};

export default PlayerSpace;
