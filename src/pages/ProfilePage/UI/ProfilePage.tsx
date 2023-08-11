import React, { memo, useCallback, useEffect } from 'react';
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
  updateProfile,
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

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = memo(({ className }) => {
  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (PROJECT !== 'storybook') {
      dispatch(requestProfileData());
    }
  }, [dispatch]);

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
      <div className={classNames(cls.ProfilePage, {}, [className as string])}>
        <ProfilePageHeader />
        <ProfileCard
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
        />
      </div>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
