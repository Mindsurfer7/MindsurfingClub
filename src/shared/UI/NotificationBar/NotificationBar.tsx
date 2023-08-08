import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotificationBar.module.scss';
import { useSelector } from 'react-redux';
import { getNotifications } from 'entities/Player/model/selectors/getPlayerData';

interface NotificationBarProps {
  className?: string;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ className }) => {
  const nots = useSelector(getNotifications);
  return (
    <div className={classNames(cls.NotificationBar, {}, [className as string])}>
      {nots.map((n) => {
        return <div className={cls.notify}>{n}</div>;
      })}
    </div>
  );
};

export default NotificationBar;
