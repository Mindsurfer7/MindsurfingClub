import React, { useState } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import {
  getProfileData,
  getProfileError,
  getProfileIsLoading,
} from 'entities/Profile/model/selectors/getProfile';
import { useSelector } from 'react-redux';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import Preloader from 'shared/UI/Preloader/Preloader';
import Text, { TextAlign, TextTheme } from 'shared/UI/Text/Text';
import ProfilePic from 'shared/UI/ProfilePic/ProfilePic';
import { Select } from 'shared/UI/Select/Select';
import { Country, Currency } from 'shared/const/common';

interface ProfileCardProps {
  className?: string;
  profileData?: Profile; // ?????/ ili string??
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeUsername?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangePic?: (value: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
}

const currOptions = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];
const countryOptions = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
];

const ProfileCard: React.FC<ProfileCardProps> = ({
  className,
  profileData,
  error,
  readonly,
  isLoading,
  onChangeAge,
  onChangeUsername,
  onChangeCity,
  onChangePic,
  onChangeCountry,
  onChangeCurrency,
}) => {
  //const [editMode, setEditMode] = useState(false);

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.isLoading]: true }, [
          className,
        ])}
      >
        <Preloader />
      </div>
    );
  }
  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={'some error ocuured'}
          text="try 2 refresh the page"
          align={TextAlign.Center}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editMode]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className as string])}>
      {profileData?.avatar && <ProfilePic src={profileData?.avatar} />}
      <div className={cls.data}>
        <Input
          onChange={onChangeUsername}
          value={profileData?.first}
          placeholder={readonly ? '' : 'Your Name'}
          className={cls.input}
          readonly={readonly}
        />
        <Input
          value={profileData?.age}
          placeholder={readonly ? '' : 'Your Age'}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          onChange={onChangeCity}
          value={profileData?.city}
          placeholder={readonly ? '' : 'Your city'}
          className={cls.input}
          readonly={readonly}
        />
        {!readonly && (
          <Input
            onChange={onChangePic}
            value={profileData?.avatar}
            placeholder={readonly ? '' : 'Your avatar link'}
            className={cls.input}
            readonly={readonly}
          />
        )}
        <Select
          className={classNames('', {}, [className])}
          label={'Укажите валюту'}
          options={currOptions}
          value={profileData?.currency}
          //@ts-ignore
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <Select
          className={classNames('', {}, [className])}
          label={'Укажите страну'}
          options={countryOptions}
          value={profileData?.country}
          //@ts-ignore
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};

export default ProfileCard;

// if (editMode) {
//   <div className={classNames(cls.ProfileCard, {}, [className as string])}>
//   <div className={cls.data}>
//     <Input
//       value={profileData?.first}
//       placeholder="Username"
//       className={cls.input}
//     />

//     <Input value={profileData?.age} placeholder="Age" />
//   </div>
// </div>
// }

//const element = editMode ? <Input /> : <span />
// <div className={classNames(cls.ProfileCard, {}, [className as string])}>
//   <div className={cls.data}>
//     <span>{profileData?.first}</span>
//     <span>{profileData?.age}</span>

//   </div>
// </div>
