import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Wall.module.scss';
import { useTranslation } from 'react-i18next';
import { textEditorReducer } from 'widgets/TextEditor';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { WallReducer } from '../model/slice/wallSlice';
import { useSelector } from 'react-redux';
import type { PostType } from 'entities/Post';
import { Post } from 'entities/Post';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import type { PublicType } from 'entities/Community';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import { AddPost } from 'features/AddPost';

interface WallProps {
  className?: string;
  onCreatePost: () => void;
  posts: PostType[] | undefined;
  renderData: PublicType | null; // ИЛИ ПРОФИЛЬ ЮЗЕРА ТАЙП
}

const reducers: ReducersList = {
  Wall: WallReducer,
  TextEditor: textEditorReducer,
};

const Wall: React.FC<WallProps> = ({
  posts,
  className,
  renderData,
  onCreatePost,
}) => {
  const { t } = useTranslation('wall');
  const dispatch = useAppDispatch();
  // const isLoading = useSelector(getWallPostsIsLoading);
  const isLogged = useSelector(getGoogleIsLogged);

  // useEffect(() => {
  //   if (publicID) {
  //     dispatch(requestPostsByPublicID(publicID));
  //   } else if (!publicID && authorID) {
  //     dispatch(requestPostsByUserID(authorID));
  //   }
  // }, [publicID, dispatch, authorID]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.Wall, {}, [className as string])}>
        <AddPost
          //className={cls.send}
          // id={}
          onPostClick={onCreatePost}
        />
        <div className={cls.wallWrapper}>
          <div className={cls.content}>
            {posts?.map((post) => {
              return (
                <Post
                  post={post}
                  className={cls.post}
                  renderData={renderData}
                  //@ts-ignore
                  // isLoading={isLoading}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default Wall;

{
  /* <Textarea
            className={cls.textarea}
            // onChange={handleChange}
            // value={singleMessage}
            placeholder={t('write some useful information')}
          /> */
}
