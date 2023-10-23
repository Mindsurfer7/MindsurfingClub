import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Wall.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useTranslation } from 'react-i18next';
import { TextEditor, textEditorReducer } from 'widgets/TextEditor';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { publishPost } from '../model/services/publishPost';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { WallReducer } from '../model/slice/wallSlice';
import { useSelector } from 'react-redux';
import {
  getWallPosts,
  getWallPostsIsLoading,
} from '../model/selectors/getWallPosts';
import { Post } from 'entities/Post';
import { requestPostsByPublicID } from '../model/services/requestPostsByPublicID';
import { AddPost } from 'features/AddPost';
import { getGoogleIsLogged } from 'entities/GoogleProfile';
import { PublicType } from 'entities/Community';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import { Profile } from 'entities/Profile';
import { requestPostsByUserID } from '../model/services/requestPostsByUserID';

interface WallProps {
  className?: string;
  authorID?: string;
  publicID?: string;
  renderData: PublicType | null; // ИЛИ ПРОФИЛЬ ЮЗЕРА ТАЙП
}

const reducers: ReducersList = {
  Wall: WallReducer,
  TextEditor: textEditorReducer,
};

const Wall: React.FC<WallProps> = ({
  className,
  publicID,
  renderData,
  authorID,
}) => {
  const { t } = useTranslation('wall');
  const dispatch = useAppDispatch();
  const posts = useSelector(getWallPosts);
  const isLoading = useSelector(getWallPostsIsLoading);
  const isLogged = useSelector(getGoogleIsLogged);

  useEffect(() => {
    if (publicID) {
      dispatch(requestPostsByPublicID(publicID));
    } else if (!publicID && authorID) {
      dispatch(requestPostsByUserID(authorID));
    }
  }, [publicID, dispatch, authorID]);

  const onPost = useCallback(() => {
    if (!isLogged) {
      alert('Log in');
    }

    if (publicID) {
      dispatch(publishPost(publicID));
    } else if (!publicID && authorID) {
      console.log('yo!');

      dispatch(publishPost('none'));
    }
  }, [publicID, dispatch, isLogged, authorID]);

  console.log(publicID, authorID);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.Wall, {}, [className as string])}>
        <AddPost
          //className={cls.send}
          id={!publicID ? authorID : publicID}
          onPostClick={onPost}
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
                  isLoading={isLoading}
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
