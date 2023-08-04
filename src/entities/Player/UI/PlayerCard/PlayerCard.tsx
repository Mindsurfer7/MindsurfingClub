import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PlayerCard.module.scss';
import Preloader from 'shared/UI/Preloader/Preloader';
import Text, { TextAlign, TextTheme } from 'shared/UI/Text/Text';
import { PlayerData } from 'entities/Player/types/player';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import { getPlayerProfile } from 'entities/Player/model/selectors/getPlayerData';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestHabits } from 'entities/Player/model/services/requestHabits';

interface PlayerCardProps {
  className?: string;
  PlayerData?: PlayerData;
  isLoading?: boolean;
  error?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  className,
  isLoading,
  error,
}) => {
  const account = useSelector(getGoogleProfile);
  const player = useSelector(getPlayerProfile);
  const dispatch = useAppDispatch();

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

  const handler2 = () => {
    dispatch(requestHabits());
  };

  return (
    <div className={classNames(cls.PlayerCard, {}, [className])}>
      <div className={cls.accWrapper}>
        <div className={cls.user}>
          <div className={cls.pic}>
            {account?.photoURL ? (
              <img src={account.photoURL} alt="User Avatar" />
            ) : null}
          </div>
          <div className={cls.userBottom}>
            <div className={cls.name}>{account?.displayName}</div>
            <div className={cls.coins}>{player.coins + ' INS'}</div>
          </div>
        </div>
        <div className={cls.indicators}>
          <div className={cls.health}>
            <span>Health</span>
            <span>{player.health}</span>
          </div>
          <div className={cls.level}>
            {' '}
            <span>Level</span>
            <span>{player.level}</span>{' '}
          </div>
          <div className={cls.points}>
            <span>Points</span>
            <span>{player.points}</span>
          </div>
          <div className={cls.buttnz}>
            <Button theme={ButtonTheme.OUTLINE} onClick={handler2}>
              Habits
            </Button>
            <Button theme={ButtonTheme.OUTLINE}>Tasks</Button>
            <Button theme={ButtonTheme.OUTLINE}>Daily</Button>
          </div>
        </div>
        <div className={cls.tags}>
          <div className={cls.header}>Tags</div>
        </div>
      </div>{' '}
    </div>
  );
};

export default PlayerCard;
