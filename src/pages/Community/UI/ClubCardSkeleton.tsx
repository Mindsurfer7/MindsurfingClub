import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ClubCardSkeleton.module.scss';
import { Card } from 'shared/UI/Card/Card';
import Skeleton from 'shared/UI/Skeleton/Skeleton';

interface ClubCardSkeletonProps {
  className?: string;
}

const ClubCardSkeleton: React.FC<ClubCardSkeletonProps> = ({ className }) => {
  return (
    <div
      className={classNames(cls.ClubCardSkeleton, {}, [className as string])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton
            width={200}
            height={200}
            className={cls.img}
            border={'8px'}
          />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={190} height={16} border={'8px'} />
        </div>
        <Skeleton
          width={190}
          height={50}
          className={cls.title}
          border={'8px'}
        />
      </Card>
    </div>
  );
};

export default ClubCardSkeleton;
