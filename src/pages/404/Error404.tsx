import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Error404.module.scss";

interface Error404Props {
  className?: string;
}

const Error404: React.FC<Error404Props> = ({ className }) => {
  return (
    <div className={classNames(cls.Error404, {}, [className as string])}>
      <h1>Error 404</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default Error404;
