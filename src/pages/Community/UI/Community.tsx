import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Community.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import {
  GroupCreatorModal,
  PublicScheme,
  createGroup,
  getCommunityData,
  requestAllGroups,
} from 'entities/Community';

import { useSelector } from 'react-redux';
import Text, { TextAlign, TextSize } from 'shared/UI/Text/Text';
import AppLink from 'shared/UI/AppLink/AppLink';
import { AppRoutes } from 'shared/config/routesConfig/routesConfig';
import { useTranslation } from 'react-i18next';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({ className }) => {
  const [isVisible, setVisibility] = useState(false);
  const groups = useSelector(getCommunityData);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('SingleGroupPage');

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  useEffect(() => {
    dispatch(requestAllGroups());
  }, [dispatch]);

  const onCreateGroup = async () => {
    await dispatch(createGroup());
    dispatch(requestAllGroups());
  };

  return (
    <div className={classNames(cls.Community, {}, [className as string])}>
      {isVisible && (
        <GroupCreatorModal
          APIcallback={onCreateGroup}
          onClose={onCloseModal}
          isVisible={isVisible}
        />
      )}
      <div className={cls.Publics}>
        {groups?.map((group: PublicScheme) => {
          return (
            <AppLink to={`${AppRoutes.SingleGroup}/${group.id}`}>
              <div className={cls.group}>
                <img src={group.posterLink} className={cls.pic} />

                <Text title={group.title} align={TextAlign.Center} />

                <span>
                  {t('subscribers')}: {group.members.length}
                </span>

                <Text text={group.description} align={TextAlign.Center} />
                {/* <Button className={cls.button} theme={ButtonTheme.OUTLINE}>
                  Become a member
                </Button> */}
              </div>
            </AppLink>
          );
        })}
      </div>

      <Button theme={ButtonTheme.OUTLINE} onClick={onOpenModal}>
        {t('startCommunity')}
      </Button>
    </div>
  );
};

export default Community;
