import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleGroupPage.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getCommunityData,
  getSinglePublicData,
  requestCommunityByID,
} from 'entities/Community';
import Text, { TextAlign, TextSize } from 'shared/UI/Text/Text';
import Textarea from 'shared/UI/Textarea/Textarea';
import Input from 'shared/UI/Input/Input';
import { ChallengeCreatorModal } from 'entities/Challenge/UI/Modal/ChallengeCreatorModal';
import { getchallenges } from 'entities/Challenge/model/selectors/getChallengeData';
import { ChallengeCard } from 'entities/Challenge';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestChallenges } from 'entities/Challenge/model/services/requestChallenges';
import { becomeCommunityMember } from 'entities/Community/model/services/becomeCommunityMember';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

interface SingleGroupPageProps {
  className?: string;
}

const SingleGroupPage: React.FC<SingleGroupPageProps> = ({ className }) => {
  const community = useSelector(getSinglePublicData);
  const GoogleProfile = useSelector(getGoogleProfile);
  const challengesData = useSelector(getchallenges);
  const userID = useSelector(getGoogleID);
  const { publicID } = useParams();
  const dispatch = useAppDispatch();
  const [isVisible, setVisibility] = useState(false);

  const challenges = challengesData.filter(
    (chal) => chal.communityID === publicID,
  );

  const isMember = community?.members.find((x) => x === userID);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onRequestChallenges = () => {
    dispatch(requestChallenges());
  };
  const onBecomeMember = () => {
    publicID && dispatch(becomeCommunityMember(publicID));
  };

  useEffect(() => {
    publicID && dispatch(requestCommunityByID(publicID));
    dispatch(requestChallenges()); //по идее надо здесь тож паблик айди кидать и только те грузить что принадлежат группе
  }, [dispatch, publicID]);

  return (
    <div className={classNames(cls.SingleGroupPage, {}, [className as string])}>
      {isVisible && publicID && (
        <ChallengeCreatorModal
          communityID={publicID}
          requestCallback={onRequestChallenges}
          onClose={onCloseModal}
          isVisible={isVisible}
        />
      )}
      <Text title={community?.title} align={TextAlign.Center} />
      <div className={cls.groupAbout}>
        <div className={cls.x}>
          <img src={community?.posterLink} className={cls.pic} />
          {isMember ? (
            <Button theme={ButtonTheme.OUTLINE_GREEN}>You are a member</Button>
          ) : (
            <Button theme={ButtonTheme.OUTLINE} onClick={onBecomeMember}>
              Become a member
            </Button>
          )}
        </div>

        <Text title={community?.description} size={TextSize.Mini} />
      </div>

      <Button theme={ButtonTheme.OUTLINE} onClick={onOpenModal}>
        new challenge
      </Button>
      <div className={cls.challenges}>
        <Text title={'Community Challenges:'} align={TextAlign.Center} />
        {challenges?.map((chal) => {
          console.log(chal);

          return (
            <ChallengeCard
              startDate={chal.startDate!} //УБАРТЬ ВОСКЛ ЗНАКИ!!!!!!!!!!!!!!!!!!!!!!!!!1
              endDate={chal.endDate!}
              participants={chal.participantsID}
              title={chal.title}
              //@ts-ignore если поставить большими буквами будет тот айди что в4
              id={chal.id}
              description={chal.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleGroupPage;
