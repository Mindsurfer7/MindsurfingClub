import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoaderIOS.module.scss';
import loaderWhite from '../../assets/icons/loader.svg';
import loaderBlue from '../../assets/icons/loader-blue.svg';

interface LoaderIOSProps {
  className?: string;
  color: string;
  width?: number;
  height?: number;
}

const LoaderIOS: React.FC<LoaderIOSProps> = ({
  className,
  color,
  width = 30,
  height = 30,
}) => {
  return (
    <img
      //@ts-ignore
      src={color === 'white' ? loaderWhite : loaderBlue}
      className={cls.LoaderIOS}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default LoaderIOS;
