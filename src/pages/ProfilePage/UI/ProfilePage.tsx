import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  ProfileCard,
  NewProfileCard,
  profileReducer,
  requestProfileData,
  updateProfile,
  requestGoogleProfileData,
} from 'entities/Profile';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
} from 'entities/Profile/model/selectors/getProfile';
import ProfilePageHeader from './Header/ProfilePageHeader';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getPlayerProfile } from 'entities/Player/model/selectors/getPlayerData';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { Wall } from 'entities/Wall';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = memo(({ className }) => {
  /////////// old hooks //////////////////////////////////////////////////
  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const { profileID } = useParams<{ profileID: string }>();
  const dispatch = useAppDispatch();
  ///////////firebase version hooks ////////////////////////////////////////
  const profileData = useSelector(getProfileData);
  ///////////////////////////////////////////////////////////////////////////

  useInitialEffect(() => {
    if (profileID) {
      // dispatch(requestProfileData(profileID));
    }
  });

  useEffect(() => {
    if (profileID) {
      dispatch(requestGoogleProfileData(profileID));
    }
  }, [profileID]);

  // useEffect(() => {
  //   if (PROJECT !== 'storybook') {

  //   }
  // }, [dispatch]);

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(updateProfile({ first: value || '' }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(updateProfile({ age: value || '' }));
    },
    [dispatch],
  );
  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(updateProfile({ city: value || '' }));
    },
    [dispatch],
  );
  const onChangePic = useCallback(
    (value?: string) => {
      dispatch(updateProfile({ avatar: value || '' }));
    },
    [dispatch],
  );
  const onChangeCurrency = useCallback(
    (currency?: Currency) => {
      dispatch(updateProfile({ currency }));
    },
    [dispatch],
  );
  const onChangeCountry = useCallback(
    (country?: Country) => {
      dispatch(updateProfile({ country }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ProfilePage, {}, [className as string])}>
        <ProfilePageHeader />

        <NewProfileCard
          onChangeUsername={onChangeUsername}
          onChangeAge={onChangeAge}
          onChangePic={onChangePic}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          profileData={profileData}
          className={cls.profile}
          isLoading={isLoading}
          readonly={readonly}
          error={error}
        />

        <Wall
          //@ts-ignore
          renderData={profileData}
          authorID={profileData?.UID}
        />
      </Page>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;

{
  /* <ProfileCard
          onChangeUsername={onChangeUsername}
          onChangeAge={onChangeAge}
          onChangePic={onChangePic}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          profileData={formData}
          isLoading={isLoading}
          readonly={readonly}
          error={error}
        /> */
}
