import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import CommentCard from '../CommentCard/CommentCard';
import { CommentType } from 'entities/Comment/model/types/comment';
import Text from 'shared/UI/Text/Text';

interface CommentListProps {
  className?: string;
  comments: CommentType[];
  isLoading?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  className,
  comments,
  isLoading,
}) => {
  return (
    <div className={classNames(cls.CommentList, {}, [className as string])}>
      {comments?.length ? (
        comments.map((cm) => {
          return (
            <CommentCard
              isLoading={isLoading}
              className={cls.comment}
              comment={cm}
            />
          );
        })
      ) : (
        <Text text="we ran out of opinions" />
      )}
    </div>
  );
};

export default CommentList;
