import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Community.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { createNewChallenge, takePart } from 'entities/Challenge';
import {
  setDescription,
  setTitle,
} from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import Textarea from 'shared/UI/Textarea/Textarea';
import { GroupCreatorModal, createGroup } from 'entities/Community';
import { TaskCreatorModal } from 'pages/PlayerSpace/UI/TaskCreatorModal/TaskCreatorModal';
import { createNewTask } from 'entities/Player/model/services/createNewTask';
import { removeTask } from 'entities/Player/model/services/removeTask';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import GroupCreator from 'entities/Community/UI/GroupCreator/GroupCreator';
import { SingleGroupPage } from 'pages/SingleGroupPage';

interface CommunityProps {
  className?: string;
}

const Community: React.FC<CommunityProps> = ({ className }) => {
  const [val, setVal] = useState('');

  const dispatch = useAppDispatch();

  const onsubmit = (val: string) => {
    dispatch(createNewChallenge(val));
  };

  const onCreateNewTask = async () => {
    await dispatch(createNewTask());
  };

  const onRequestTasks = () => {
    dispatch(requestTasks());
  };

  const onCreateGroup = () => {
    dispatch(createGroup());
  };

  return (
    <div className={classNames(cls.Community, {}, [className as string])}>
      <SingleGroupPage />

      {/* <Input
        placeholder="Challenge title"
        value={val}
        onChange={(val) => onSetTitle(val)}
      />
      
      <Textarea
        placeholder="Опишите смысл объединения и цели"
        value={val}
        onChange={(val) => onSetTitle(val)}
      /> */}
      {/* <GroupCreatorModal onClose={onCloseModal} /> */}

      {/* <TaskCreatorModal
        APIcallback={onCreateNewTask}
        requestCallback={onRequestTasks}
        onClose={onCloseModal}
      /> */}
      <Button theme={ButtonTheme.OUTLINE} onClick={() => onsubmit(val)}>
        new challenge
      </Button>

      {/* <Button theme={ButtonTheme.OUTLINE} onClick={take}>
        Take part!
      </Button> */}
    </div>
  );
};

export default Community;
