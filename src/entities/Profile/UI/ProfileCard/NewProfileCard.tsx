import React, { useState } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import Input from 'shared/UI/Input/Input';
import { Profile } from 'entities/Profile/model/types/profile';
import Preloader from 'shared/UI/Preloader/Preloader';
import Text, { TextAlign, TextTheme } from 'shared/UI/Text/Text';
import ProfilePic from 'shared/UI/ProfilePic/ProfilePic';
import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { useSelector } from 'react-redux';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getPlayerProfile } from 'entities/Player/model/selectors/getPlayerData';
import { PlayerData } from 'entities/Player/types/player';

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

const NewProfileCard: React.FC<ProfileCardProps> = ({
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
      <div className={cls.header}>
        {' '}
        {profileData?.photoURL && <ProfilePic src={profileData?.photoURL} />}
        <Text title={profileData?.username} />
      </div>

      <div className={cls.data}>
        <div className={cls.inGameData}>
          Insight Coins: {profileData?.coins}
        </div>
        <div className={cls.inGameData}>Points: {profileData?.points}</div>
        <div className={cls.inGameData}>Level: {profileData?.level}</div>
        <Input
          onChange={onChangeUsername}
          value={profileData?.displayName}
          placeholder={readonly ? '' : 'Your Name'}
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
      </div>
    </div>
  );
};

export default NewProfileCard;

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
