import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import Text from 'shared/UI/Text/Text';
import { CommentType } from 'entities/Comment/model/types/comment';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';

interface CommentCardProps {
  className?: string;
  comment: CommentType;
  isLoading: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width="100%" height={50} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className as string])}>
      <div className={cls.header}>
        <Avatar size={30} />
        <Text title={comment.user.username} />
      </div>
      <Text text={comment.text} />
    </div>
  );
};

export default CommentCard;
