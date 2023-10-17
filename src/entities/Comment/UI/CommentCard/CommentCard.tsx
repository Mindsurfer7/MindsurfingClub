import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import Text from 'shared/UI/Text/Text';
import { CommentType } from 'entities/Comment/model/types/comment';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import AppLink from 'shared/UI/AppLink/AppLink';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import { useSelector } from 'react-redux';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getGoogleAvatar } from 'entities/GoogleProfile';

interface CommentCardProps {
  className?: string;
  comment: CommentType;
  isLoading?: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  const photoURL = useSelector(getGoogleAvatar); // надо фетчить гугл акк как профиль целиком а не из редакс

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
      <AppLink
        to={`${RoutePath.Profile}${
          comment.user ? comment.user.id : comment.userID
        }`}
        className={cls.header}
      >
        <Avatar
          size={30}
          src={
            photoURL
              ? photoURL
              : 'https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png?f=webp'
          }
          alt="ava"
        />
        <Text title={comment.user ? comment.user.username : comment.username} />
      </AppLink>
      <Text text={comment.text} />
    </div>
  );
};

export default CommentCard;
