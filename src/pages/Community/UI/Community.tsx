import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Community.module.scss';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Community, {}, [className as string])}></div>
  );
};

export default Community;
