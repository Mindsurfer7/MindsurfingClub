import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MiniModal.module.scss';
import { NavLink } from 'react-router-dom';
import Button, { ButtonTheme } from '../Button/Button';
import { userLogout } from 'entities/User/model/slice/userSlice';
import { useDispatch } from 'react-redux';
import AppLink from '../AppLink/AppLink';

interface MiniModalProps {
  setIsLogged: (arg: boolean) => void;
  onLogout?: () => void;
  className?: string;
}

const MiniModal: React.FC<MiniModalProps> = ({
  className,
  setIsLogged,
  onLogout,
}) => {
  const handleLogout = useCallback(() => {
    onLogout?.();
    setIsLogged(false);
  }, []);

  return (
    <div className={classNames(cls.MiniModal, {}, [className as string])}>
      <div className={cls.account}>
        <div className={cls.linkWrap}>
          <AppLink to={'/PlayerSpace'}>
            <div>Player Space</div>
          </AppLink>
        </div>

        {/* <NavLink to={'/PlayerSpace'}>
          <div className={'css.WatchList'}>Player Space</div>
        </NavLink>
        <NavLink to={'/tracker'}>
          <div className={'css.WatchList'}>Settings</div>
        </NavLink> */}
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.login}
          onClick={handleLogout}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default MiniModal;
