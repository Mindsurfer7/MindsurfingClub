import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Post.module.scss';
import { PostBlock, PostType } from '../model/types/post';
import ArticleImageBlock from 'entities/Article/UI/ArticleImageBlock/ArticleImageBlock';
import ArticleTextBlock from 'entities/Article/UI/ArticleTextBlock/ArticleTextBlock';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import { PublicType } from 'entities/Community';
import Text from 'shared/UI/Text/Text';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import { Icon } from 'shared/UI/Icon/Icon';
import LikeIcon from '../../../shared/assets/icons/like.svg';
import LikeFilledIcon from '../../../shared/assets/icons/likeFilled.svg';
import x from '../../../shared/assets/icons/Xmark.svg';
import { ProfileInterface } from 'pages/ProfilePage/model/types/profilePageScheme';
import Button from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { likePost } from '../model/services/likePost';
import { useSelector } from 'react-redux';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

interface PostProps {
  className?: string;
  isLoading?: boolean;
  post: PostType;
  renderData: PublicType | null; // ИЛИ ПРОФИЛЬ ЮЗЕРА ТАЙП
}

const Post: React.FC<PostProps> = ({
  className,
  post,
  renderData,
  isLoading = true,
}) => {
  const dispatch = useAppDispatch();
  const myID = useSelector(getGoogleID);
  const renderBlock = useCallback((block: PostBlock) => {
    switch (block.type) {
      case 'IMAGE':
        return (
          <></>
          //   <ArticleImageBlock
          //     key={block.id}
          //     block={block}
          //     className={cls.block}
          //   />
        );
      case 'TEXT':
        return (
          <ArticleTextBlock
            key={block.id}
            className={cls.block}
            //@ts-ignore
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className={classNames(cls.Post, {}, [className])}>
  //       <div className={cls.title}>
  //         <Skeleton width={30} height={30} border="50%" />
  //         <Skeleton
  //           height={16}
  //           width={100}
  //           className={cls.username}
  //           border="20%"
  //         />
  //       </div>
  //       <Skeleton className={cls.text} width="100%" height={50} />
  //     </div>
  //   );
  // }

  const isLiked = post.likes?.filter((like) => like === myID);

  return (
    <div className={classNames(cls.Post, {}, [className as string])}>
      <div className={cls.title}>
        <Avatar
          size={30}
          src={
            renderData
              ? renderData.posterLink
              : 'https://cdn.iconscout.com/icon/free/png-256/free-laptop-user-1-1179329.png?f=webp'
          }
          alt="ava"
        />
        <Text title={renderData ? renderData.title : 'Community Name'} />
      </div>

      {post.blocks.map(renderBlock)}
      <Button onClick={() => dispatch(likePost(post.id))}>
        {isLiked ? (
          <Icon Svg={LikeFilledIcon} className={cls.liked} />
        ) : (
          <Icon Svg={LikeIcon} className={cls.like} />
        )}
      </Button>
      <Icon Svg={x} className={cls.x} />
    </div>
  );
};

export default Post;
