import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  NewProfileCard,
  profileReducer,
  requestProfileData,
  updateProfile,
  requestGoogleProfileData,
} from 'entities/Profile';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePageHeader from './Header/ProfilePageHeader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getPlayerProfile } from 'entities/Player/model/selectors/getPlayerData';
import {
  getGoogleID,
  getGoogleIsLogged,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { Wall } from 'entities/Wall';
import { profilePageReducer } from '../model/slice/profilePageSlice';
import { publishPostInProfile } from '../model/services/publishPostInProfile';
import { requestPostsByUserID } from '../model/services/requestPostsByUserID';
import {
  getProfilePageError,
  getProfilePageForm,
  getProfilePageIsLoading,
  getProfilePagePosts,
  getProfilePageProfile,
  getProfilePageReadonly,
} from '../model/selectors/getProfilePageData';
import { getArticleImageLink } from 'widgets/TextEditor/model/selectors/getTextEditorData';
import { updateProfilePicture } from 'entities/GoogleProfile/model/services/updateProfilePicture';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersList = {
  ProfilePage: profilePageReducer,
};

const ProfilePage: React.FC<ProfilePageProps> = memo(({ className }) => {
  /////////// old hooks //////////////////////////////////////////////////
  const { profileID } = useParams<{ profileID: string }>();
  const dispatch = useAppDispatch();
  ///////////firebase version hooks ////////////////////////////////////////
  const isLogged = useSelector(getGoogleIsLogged);
  const profile = useSelector(getProfilePageProfile);
  const posts = useSelector(getProfilePagePosts);
  ///////////////////////////////////////////////////////////////////////////
  const formData = useSelector(getProfilePageForm);
  const error = useSelector(getProfilePageError);
  const isLoading = useSelector(getProfilePageIsLoading);
  const readonly = useSelector(getProfilePageReadonly);
  const imageURL = useSelector(getArticleImageLink);

  useEffect(() => {
    if (profileID) {
      dispatch(requestGoogleProfileData(profileID));
      dispatch(requestPostsByUserID(profileID));
    }
  }, [profileID]);

  const onUpdateProfilePicture = useCallback(async () => {
    console.log('cljfwdnlvnw;e');

    await dispatch(updateProfilePicture());

    if (profileID) {
      dispatch(requestGoogleProfileData(profileID));
    }
  }, [dispatch, profileID]);

  const onCreatePost = useCallback(() => {
    if (!isLogged) {
      alert('Log in');
    }
    if (profileID) {
      dispatch(publishPostInProfile(profileID));
    }
  }, [dispatch, isLogged, profileID]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ProfilePage, {}, [className as string])}>
        <ProfilePageHeader testCallback={onUpdateProfilePicture} />

        <NewProfileCard
          profileData={profile}
          className={cls.profile}
          isLoading={isLoading}
          onChangePic={onUpdateProfilePicture}
          readonly={readonly}
          error={error}
        />

        <Wall
          posts={posts}
          onCreatePost={onCreatePost}
          className={cls.wall}
          //@ts-ignore
          renderData={profile}
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

// onChangeUsername={onChangeUsername}
// onChangeAge={onChangeAge}
// onChangePic={onChangePic}
// onChangeCity={onChangeCity}
// onChangeCountry={onChangeCountry}
// onChangeCurrency={onChangeCurrency}

// const onChangeUsername = useCallback(
//   (value?: string) => {
//     dispatch(updateProfile({ first: value || '' }));
//   },
//   [dispatch],
// );

// const onChangeAge = useCallback(
//   (value?: string) => {
//     dispatch(updateProfile({ age: value || '' }));
//   },
//   [dispatch],
// );
// const onChangeCity = useCallback(
//   (value?: string) => {
//     dispatch(updateProfile({ city: value || '' }));
//   },
//   [dispatch],
// );
// const onChangePic = useCallback(
//   (value?: string) => {
//     dispatch(updateProfile({ avatar: value || '' }));
//   },
//   [dispatch],
// );
// const onChangeCurrency = useCallback(
//   (currency?: Currency) => {
//     dispatch(updateProfile({ currency }));
//   },
//   [dispatch],
// );
// const onChangeCountry = useCallback(
//   (country?: Country) => {
//     dispatch(updateProfile({ country }));
//   },
//   [dispatch],
// );

// useInitialEffect(() => {
//   if (profileID) {
// dispatch(requestProfileData(profileID));
//   }
// });
