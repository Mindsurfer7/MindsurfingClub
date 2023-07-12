import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { Link, LinkProps } from "react-router-dom";

export enum AppLinkTheme {
  primary = "primary",
  secondary = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

const AppLink: React.FC<AppLinkProps> = ({
  to,
  children,
  className,
  theme,
}) => {
  return (
    <Link
      to={to}
      //@ts-ignore хз че тс выебывается на тему, в вебшторме такого нет
      className={classNames(cls.AppLink, { [cls[theme]]: true }, [
        className as string,
      ])}
    >
      {children}
    </Link>
  );
};

export default AppLink;
