import React, { HTMLAttributeAnchorTarget, ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
  primary = 'primary',
  secondary = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

const AppLink: React.FC<AppLinkProps> = memo(
  ({ to, children, className, target, theme = AppLinkTheme.primary }) => {
    return (
      <Link
        to={to}
        target={target}
        className={classNames(cls.AppLink, { [cls[theme]]: true }, [
          className as string,
        ])}
      >
        {children}
      </Link>
    );
  },
);

export default AppLink;
