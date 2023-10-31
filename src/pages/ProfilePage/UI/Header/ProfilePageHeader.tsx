import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePageHeader.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getProfilePageReadonly } from 'pages/ProfilePage/model/selectors/getProfilePageData';
import {
  cancelEdit,
  setReadonly,
} from 'pages/ProfilePage/model/slice/profilePageSlice';

interface ProfilePageHeaderProps {
  className?: string;
  testCallback?: () => void;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({
  testCallback,
  className,
}) => {
  const readonly = useSelector(getProfilePageReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(cancelEdit());
  }, [dispatch]);

  const onSaveEdit = useCallback(() => {
    testCallback?.();
    // dispatch(updateProfileData());
  }, [dispatch, testCallback]);

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
