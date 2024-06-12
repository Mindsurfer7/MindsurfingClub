import React, { useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerCard.module.scss';
import Preloader from 'shared/UI/Preloader/Preloader';
import Text, { TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { PlayerData } from 'entities/Player/types/player';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getAllTags,
  getPlayerDataError,
  getPlayerLevel,
  getPlayerPoints,
  getPlayerProfile,
} from 'entities/Player/model/selectors/getPlayerData';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  clearSelectedTag,
  setSelectedTag,
  setShowCharacter,
  setShowCompleted,
  setShowPrinciples,
  setShowTodayTasks,
} from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import {
  getSelectedTag,
  getShowCharacter,
  getShowCompleted,
  getShowPrinciples,
  getShowTodayTasks,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import {
  clearTags,
  displayTasksByTag,
} from 'entities/Player/model/slice/playerSlice';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { ToastContainer, toast } from 'react-toastify';
import { deleteTag } from 'entities/Player/model/services/deleteTag';
import { saveNotification } from 'entities/Player/model/services/InGameActions/saveNotification';
import Spinner from '../../../../shared/assets/icons/Spinner.svg';
import { getShowChallenges, setShowChallenges } from 'entities/Challenge';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/UI/Icon/Icon';
// import loaderIOS from '../../../../shared/assets/icons/loader-ios.svg';
import loaderIOS from '../../../../shared/assets/icons/Spinner.svg';
import LoaderIOS from 'shared/UI/Preloader/LoaderIOS';
interface PlayerCardProps {
  className?: string;
  PlayerData?: PlayerData;
  isLoading?: boolean;
  error?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  className,
  error,
  isLoading,
}) => {
  const account = useSelector(getGoogleProfile);
  const player = useSelector(getPlayerProfile);
  const allTags = useSelector(getAllTags);
  const points = useSelector(getPlayerPoints);
  const level = useSelector(getPlayerLevel);
  const APIerror = useSelector(getPlayerDataError);
  const completed = useSelector(getShowCompleted);
  const isAuth = useSelector(getGoogleIsLogged);
  const selectedTag = useSelector(getSelectedTag);
  const showChallenges = useSelector(getShowChallenges);
  const showTodayTasks = useSelector(getShowTodayTasks);
  const showPrinciples = useSelector(getShowPrinciples);
  const showCharacter = useSelector(getShowCharacter);

  const sortedTags = [...allTags].sort((a, b) => a.length - b.length);

  const [pointsBarLevel, setPointsBarLevel] = useState(0);

  useEffect(() => {
    if (points) {
      setPointsBarLevel(Math.round(points / 10));
    }
  }, [points]);

  const dispatch = useAppDispatch();
  const { t } = useTranslation('PlayerCard');

  const notify = () => {
    toast.success(`You have been leveled up!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    dispatch(saveNotification(`You have been leveled up!`));
  };

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      notify();
    }
  }, [level]);

  // useEffect(() => {
  //   if (!player.new) {
  //     dispatch(requestAllTags());
  //   }
  // }, [dispatch, player.new, isAuth]);

  if (isLoading) {
    return (
      <div
        className={classNames(cls.PlayerCard, { [cls.isLoading]: true }, [
          className,
        ])}
      >
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.PlayerCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={'some error ocuured'}
          text="try 2 refresh the page"
          align={TextAlign.Center}
        />
      </div>
    );
  }

  const onShowPrincilpes = () => {
    dispatch(setShowPrinciples(!showPrinciples));
  };

  const onShowCompleted = () => {
    dispatch(setShowCompleted(!completed));
  };
  const onShowChallenges = () => {
    dispatch(setShowChallenges(!showChallenges));
  };
  const onShowCharacter = () => {
    dispatch(setShowCharacter(!showCharacter));
  };
  const onShowToday = () => {
    dispatch(setShowTodayTasks(!showTodayTasks));
  };

  const onDisplayByTag = (tag: string) => {
    dispatch(displayTasksByTag(tag));
    dispatch(setSelectedTag(tag));
  };
  const onClearTags = () => {
    dispatch(clearTags());
    dispatch(clearSelectedTag());
  };
  const onDeleteTag = (tag: string) => {
    dispatch(deleteTag(tag));
  };

  return (
    <div className={classNames(cls.PlayerCard, {}, [className])}>
      <div className={cls.accWrapper}>
        <div className={cls.user}>
          <div className={cls.pic}>
            {account?.photoURL ? (
              <img
                src={account.photoURL}
                alt="User Avatar"
                className={cls.avatar}
              />
            ) : null}
          </div>
          <div className={cls.userBottom}>
            <div className={cls.name}>{account?.displayName}</div>
            <div className={cls.coins}>{player.coins + ' INS'}</div>
          </div>
        </div>
        <div className={cls.indicators}>
          <div className={cls.health}>
            <span>{t('health')}</span>
            <span>{player.health}</span>
          </div>
          <div className={cls.level}>
            <span>{t('level')}</span>
            <span>{player.level}</span>
          </div>

          {isLoading && <LoaderIOS color="white" height={60} width={60} />}
          <div className={cls.bar}>
            <div
              className={`${cls.fill} ${cls.p}`}
              style={{ width: `${pointsBarLevel}%` }}
            >
              <span>{t('points')}</span>
            </div>
            <span>{player.points}</span>
          </div>

          {/* <div className={cls.points}>
          </div> */}
          <div className={cls.buttnz}>
            <Button
              theme={
                showCharacter ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
              }
              onClick={onShowCharacter}
            >
              {t('Character')}
            </Button>
            <Button
              theme={
                showChallenges ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
              }
              onClick={onShowChallenges}
            >
              {t('challenges')}
            </Button>
            <Button
              theme={completed ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE}
              onClick={onShowCompleted}
            >
              {t('completed')}
            </Button>
            <Button
              theme={
                showTodayTasks ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
              }
              onClick={onShowToday}
            >
              {t('today')}
            </Button>
            <Button
              theme={
                showTodayTasks ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
              }
              // onClick={onShowToday}
            >
              {'Цели'}
            </Button>
            <Button
              theme={
                showPrinciples ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
              }
              onClick={onShowPrincilpes}
            >
              {'Мои принципы'}
            </Button>
            <Button
            // theme={
            //   showPrinciples ? ButtonTheme.FILLED_GREEN : ButtonTheme.OUTLINE
            // }
            // onClick={onShowPrincilpes}
            >
              {'Мантры'}
            </Button>
          </div>
        </div>
        <div className={cls.tags}>
          <div className={cls.tagsWrapper}>
            <div className={cls.header}>{t('tags')}</div>
            <Button
              className={cls.singleTag} //
              theme={ButtonTheme.CLEAR}
              onClick={onClearTags}
            >
              {t('all')}
            </Button>
            {sortedTags?.map((tag) => {
              return (
                <>
                  {' '}
                  <div
                    key={tag}
                    className={
                      selectedTag === tag ? cls.tagSelected : cls.singleTag
                    }
                    // theme={ButtonTheme.CLEAR}
                    onClick={() => onDisplayByTag(tag)}
                  >
                    {tag}{' '}
                    <div
                      className={cls.delTag}
                      onClick={() => onDeleteTag(tag)}
                    >
                      X
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
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

export default PlayerCard;
