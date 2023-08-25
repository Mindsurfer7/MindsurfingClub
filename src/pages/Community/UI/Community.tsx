import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Community.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import {
  GroupCreatorModal,
  PublicScheme,
  createGroup,
  getClubsAreLoading,
  getCommunityData,
  requestAllGroups,
} from 'entities/Community';

import { useSelector } from 'react-redux';
import Text, { TextAlign, TextSize } from 'shared/UI/Text/Text';
import AppLink from 'shared/UI/AppLink/AppLink';
import { AppRoutes } from 'shared/config/routesConfig/routesConfig';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import ClubCardSkeleton from './ClubCardSkeleton';
import { useNavigate } from 'react-router-dom';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({ className }) => {
  const [isVisible, setVisibility] = useState(false);
  const groups = useSelector(getCommunityData);
  const isLoading = useSelector(getClubsAreLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const getSkeletons = () =>
    new Array(6).fill(0).map((item, index) => <ClubCardSkeleton key={index} />);

  if (isLoading) {
    return <div className={cls.Publics}>{getSkeletons()};</div>;
  }

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
          const onOpenClub = () => {
            navigate(`${AppRoutes.SingleGroup}/${group.id}`);
          };

          return (
            <div className={cls.group}>
              <Card className={cls.card} onClick={onOpenClub}>
                <div className={cls.imageWrapper}>
                  <img src={group.posterLink} className={cls.img} />
                </div>

                <Text
                  title={group.title}
                  align={TextAlign.Center}
                  className={cls.title}
                />
                <div className={cls.infoWrapper}>
                  <Text
                    text={group.description}
                    align={TextAlign.Center}
                    className={cls.description}
                  />
                </div>
                <div className={cls.subs}>
                  {t('subscribers')}: {group.members.length}
                </div>

                {/* <Button className={cls.button} theme={ButtonTheme.OUTLINE}>
  Become a member
</Button> */}
              </Card>
            </div>
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
