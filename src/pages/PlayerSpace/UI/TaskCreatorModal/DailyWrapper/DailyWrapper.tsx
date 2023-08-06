import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DailyWrapper.module.scss';
import {
  getDailys,
  getFilteredDaily,
  getIsFilterApplied,
} from 'entities/Player/model/selectors/getPlayerData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TaskCreatorModal } from '../TaskCreatorModal';
import { createNewDaily } from 'entities/Player/model/services/createNewDaily';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';
import { removeDaily } from 'entities/Player/model/services/removeDaily';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';

interface DailyWrapperProps {
  className?: string;
}

const DailyWrapper: React.FC<DailyWrapperProps> = ({ className }) => {
  const Dailys = useSelector(getDailys);
  const filteredHDailys = useSelector(getFilteredDaily);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const dispatch = useAppDispatch();
  const [isVisible, setVisibility] = useState(false);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onCreateNewDaily = async () => {
    await dispatch(createNewDaily());
    console.log('creator');
  };

  const onRequestDailyz = () => {
    console.log('requester');
    dispatch(requestDailyz());
  };

  const onRemoveDaily = async (id: string) => {
    await dispatch(removeDaily(id));
  };

  return (
    <div className={classNames(cls.DailyWrapper, {}, [className as string])}>
      {isVisible && (
        <TaskCreatorModal
          onClose={onCloseModal}
          isVisible={isVisible}
          APIcallback={onCreateNewDaily}
          requestCallback={onRequestDailyz}
        />
      )}
      <div className={cls.header}>My Daily Tasks</div>
      <div className={cls.listWrapper}>
        {filteredHDailys.length > 0
          ? filteredHDailys.map((h) => {
              return (
                <SingleEndeavor
                  id={h.id}
                  key={h.id}
                  title={h.title}
                  isDaily={true}
                  isDone={h.isDone}
                  tags={h.tags}
                  onRemove={onRemoveDaily}
                  onRequest={onRequestDailyz}
                  difficulty={h.difficulty}
                  description={h.description}
                />
              );
            })
          : !isFilterApplied &&
            Dailys.map((h) => {
              return (
                <SingleEndeavor
                  id={h.id}
                  key={h.id}
                  title={h.title}
                  isDaily={true}
                  isDone={h.isDone}
                  tags={h.tags}
                  onRemove={onRemoveDaily}
                  onRequest={onRequestDailyz}
                  difficulty={h.difficulty}
                  description={h.description}
                />
              );
            })}
      </div>

      <div className={cls.createBtn}>
        <Button
          onClick={onOpenModal}
          theme={ButtonTheme.OUTLINE}
          className={cls.addBtn}
        >
          Create new daily
        </Button>
      </div>
    </div>
  );
};

export default DailyWrapper;
