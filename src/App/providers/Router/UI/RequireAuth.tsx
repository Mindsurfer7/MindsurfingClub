import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './RequireAuth.module.scss';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.Main} state={{ from: location }} replace />;
  }

  return children;
}
