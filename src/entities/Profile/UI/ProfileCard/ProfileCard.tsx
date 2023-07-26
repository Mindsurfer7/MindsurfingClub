import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import {
  getProfileData,
  getProfileError,
  getProfileIsLoading,
} from 'entities/Profile/model/selectors/getProfile';
import { useSelector } from 'react-redux';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';

interface ProfileCardProps {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const profileData = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  console.log(profileData);
  return (
    <div className={classNames(cls.ProfileCard, {}, [className as string])}>
      {/* <div className={cls.account}>
        <span>{profileData?.first}</span>
        <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
          Edit
        </Button>
      </div>
      <div className={cls.data}>
        <Input
          value={profileData?.first}
          placeholder="username"
          className={cls.input}
        />
        <Input value={profileData?.age} placeholder="age" />
      </div> */}
    </div>
  );
};

export default ProfileCard;
