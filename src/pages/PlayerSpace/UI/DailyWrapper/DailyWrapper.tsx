import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { TaskCreatorModal } from '../TaskCreatorModal/TaskCreatorModal';
import { createNewDaily } from 'entities/Player/model/services/createNewDaily';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';
import { removeDaily } from 'entities/Player/model/services/removeDaily';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
import { setIsDoneDailyAPI } from 'entities/Player';
import { useTranslation } from 'react-i18next';

interface DailyWrapperProps {
  className?: string;
}

const DailyWrapper: React.FC<DailyWrapperProps> = ({ className }) => {
  const Dailys = useSelector(getDailys);
  const filteredHDailys = useSelector(getFilteredDaily);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('PlayerCard');
  const [isVisible, setVisibility] = useState(false);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onCreateNewDaily = async () => {
    await dispatch(createNewDaily());
  };

  const onRequestDailyz = async () => {
    await dispatch(requestDailyz());
  };

  const onRemoveDaily = async (id: string) => {
    await dispatch(removeDaily(id));
  };

  useEffect(() => {
    if (Dailys?.length > 0) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const processDailys = async () => {
        for (const d of Dailys) {
          //@ts-ignore
          const taskDate = new Date(d.isDoneTimestamp.seconds * 1000);
          taskDate.setHours(0, 0, 0, 0);

          if (
            taskDate.getTime() < currentDate.getTime() &&
            taskDate.getTime() !== currentDate.getTime() &&
            d.isDone === true
          ) {
            await dispatch(setIsDoneDailyAPI({ taskID: d.id, isDone: false }));
            dispatch(requestDailyz());
          }
        }
      };
      processDailys();
    }
  }, [Dailys, dispatch]);

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
      <div className={cls.header}>{t('myDailyTasks')}</div>
      <div className={cls.listWrapper}>
        {filteredHDailys.length > 0
          ? filteredHDailys.map((h) => {
              return (
                <SingleEndeavor
                  id={h.id}
                  key={h.id}
                  title={h.title}
                  taskType="daily"
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
                  taskType="daily"
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
          {t('createNewDaily')}
        </Button>
      </div>
    </div>
  );
};

export default DailyWrapper;
