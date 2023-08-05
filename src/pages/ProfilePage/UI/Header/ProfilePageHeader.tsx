import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePageHeader.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  Profile,
  getProfileForm,
  getProfileReadonly,
  setReadonly,
  updateProfileData,
} from 'entities/Profile';
import { cancelEdit } from 'entities/Profile/model/slice/profileSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface ProfilePageHeaderProps {
  className?: string;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({ className }) => {
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(cancelEdit());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  //https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg
  // https://avatars.dzeninfra.ru/get-zen_doc/3680683/pub_6007cdab60595f5ffd5fd0e2_6007cf2da1b97e1f1a2ed4f5/scale_1200

  return (
    <div
      className={classNames(cls.ProfilePageHeader, {}, [className as string])}
    >
      <h1> My Profile </h1>

      {readonly ? (
        <Button
          onClick={onEdit}
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          редактировать
        </Button>
      ) : (
        <div className={cls.buttons}>
          <Button
            onClick={onCancelEdit}
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE_RED}
          >
            отменить
          </Button>
          <Button
            onClick={onSaveEdit}
            className={cls.editBtn}
            theme={ButtonTheme.OUTLINE}
          >
            сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePageHeader;
