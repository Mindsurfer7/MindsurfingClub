import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RequireAuth.module.scss';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';

interface RequireAuthProps {
  className?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ className }) => {
  let auth = useSelector(getUserAuthData);
  let location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.PsyRoom} />;
  }

  return (
    <div
      className={classNames(cls.RequireAuth, {}, [className as string])}
    ></div>
  );
};

export default RequireAuth;
