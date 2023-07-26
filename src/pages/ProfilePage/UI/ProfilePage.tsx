import React, { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  ProfileCard,
  profileReducer,
  requestProfileData,
} from 'entities/Profile';
import { useAppDiscpatch } from 'App/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = memo(({ className }) => {
  const dispatch = useAppDiscpatch();
  //const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestProfileData());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ProfilePage, {}, [className as string])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
